var request = require('request-promise');
var Bluebird = require('bluebird');
var URL = require('url');
var EventEmitter = require('events').EventEmitter;
var isArray = require('util').isArray;
var moment = require('moment');

var writer = require('./writer');
var WMSAnalyzer = require('./wms-analyzer');
var GeoJSONAnalyzer = require('./geojson-analyzer');

var log = require('./logging')('harvester');

var debugPageCount = 0;

function HarvesterManager(config) {
    EventEmitter.call(this);
    this.config = config;
    this.harvester = new Harvester();

    process.nextTick(this.refresh.bind(this));
}

HarvesterManager.prototype = Object.create(EventEmitter.prototype);

HarvesterManager.prototype.refresh = function() {

    if (!this.config.ckan.enabled) return;

    log.info('Updating HarvesterManager');

    var mergeArrays = function(results) {
        if (!results.length) {
            return [];
        }
        var services = results[0];

        var i, key, val;
        for (i = 1; i < results.length; ++i) {
            for (key in results[i]) {
                val = results[i][key];
                if (!services[val]) {
                    services[val] = key;
                }
            }
        }
        return services;
    };
    

    //WMS
    Bluebird.all([
        this.fetch('WMS')
    ]).bind(this).then(function(results) {
        // merge the objects to a single array
        return mergeArrays(results);
    }).then(function(servicesWithPackage) {
        return this.resolveOrganizations(servicesWithPackage);
    }, function(err) {
        log.error({err: err}, 'Error resolving orga');
    }).then(function(services) {
        WMSAnalyzer.analyze(services, function(results) {
            log.info("CRS result: "+JSON.stringify(results));
            log.info("Total count: "+WMSAnalyzer.getTotalCount());
            log.info("Error count: "+WMSAnalyzer.getErrorCount());
        });
    }, function(err) {
        log.error({err: err}, 'Error updating');
    });
  
    //geojson
//    Bluebird.all([
//        this.fetch('gjson'),
//        this.fetch('GeoJSON')
//    ]).bind(this).then(function(results) {
//        // merge the objects to a single array
//        return mergeArrays(results);
//    }).then(function(servicesWithPackage) {
//        return this.resolveOrganizations(servicesWithPackage);
//    }, function(err) {
//        log.error({err: err}, 'Error resolving orga');
//    }).then(function(services) {
//        GeoJSONAnalyzer.analyze(services, function(results) {
//            log.info("CRS result: "+JSON.stringify(results));
//            log.info("Total count: "+GeoJSONAnalyzer.getTotalCount());
//            log.info("Error count: "+GeoJSONAnalyzer.getErrorCount());
//        });
//    }, function(err) {
//        log.error({err: err}, 'Error updating');
//    });
};

HarvesterManager.prototype.resolveOrganizations = function(servicesWithPackage) {
    var self = this;

    return request({url: self.config.ckan.url +"/api/3/action/package_search?fq=res_format:WMS&rows=10000", json:true}).then(function(body) {
        var resultArray = [];
        var packageToOrg = {};
        
        if (body && body.success && body.result && body.result.results) {
            var packages = body.result.results;
            packages.forEach(function(pack) {
                log.info(JSON.stringify(pack));
                if (!packageToOrg[pack.id]) {
                    log.info("urrrrrg "+ pack.id);
                    packageToOrg[pack.id] = pack.organization.title;
                }
            });
    
        }
        
        var serviceWithoutOrga = [];
        
        var urls = Object.keys(servicesWithPackage);
        urls.forEach(function(url) {
            var package = servicesWithPackage[url];
            var r = {};
            r.url = url;
            r.package = package;
            
            if (!packageToOrg[package]) {
                r.orga = "unknown";
                serviceWithoutOrga.push(r);
            }
            else {
                r.orga = packageToOrg[package];
            }
            
            resultArray.push(r);
        });
        
        log.info("Got services: "+JSON.stringify(resultArray));
        
        if (serviceWithoutOrga.length > 0) {
            log.warn("Services without orgnanization: "+ JSON.stringify(serviceWithoutOrga));
            var now = moment().format("YYYY-MM-DD_HH-mm-ss");
            writer.write("./missing-orga-"+now+".json", serviceWithoutOrga);
        }
        
        return resultArray;
    }, function(error) {
        log.error(error);
        process.exit(1);
    });
};

HarvesterManager.prototype.fetch = function(format) {
    var self = this;

    return new Bluebird(function(resolve, reject) {
        var options = {
            url: self.config.ckan.url + '/api/3/action/resource_search',
            json: true,
            qs: {
                order_by: 'id',
                limit: self.config.ckan.rowsPerRequest,
                offset: 0,
                query: 'format:' + format
            }
        };
        
        var services = {};

        logRequest(options);

        request(options).then(function onResponse(body) {
            if (body && body.success && body.result) {
                extractServices(body, services);
                if (body.result.count > (options.qs.offset + options.qs.limit)) {
                    options.qs.offset += options.qs.limit;
                    logRequest(options);
                    request(options).then(onResponse, reject);
                } else {
                    resolve(services);
                }
            }
        }, reject);

        function extractServices(body, services) {
            if (!body.result.results) return services;

//            var debugServiceUrls = [];
            var urls = [];
            body.result.results.forEach(function(p) {
                // resources may contain false positives
                var debugUrl;
                if (p && p.format && p.format.toUpperCase() === format.toUpperCase()) {
                    if (p.url && p.package_id) {
                        urls.push(p);
                    }
                    else {
                        log.info("no url and package_id!");
                    }
//                    debugUrl = {};
//                    debugUrl.url = p.url;
//                    debugUrl.package = p.package_id;
//                    debugServiceUrls.push(debugUrl);
                }
                else {
                    log.info("format does not match!");
                }
            });
            
//            writer.write("./wms-urls"+debugPageCount++ +".json", debugServiceUrls);

            urls.forEach(function(package) {
                if (!package) return;
                try {
                    var serv = URL.parse(package.url);
                    var parsed = URL.format(serv);
                    if (!parsed) {
                        return;
                    }
                    if (!services[parsed]) {
                        services[parsed] = package.package_id;
                    }
                    else {
                        log.info("WMS already present: "+ parsed);
                    }
                } catch (e) {
                    log.warn("Error parsing service", e);
                }
            });
            return services;
        }

        function logRequest(options) {
            var url = options.url;
            if (options.qs) {
                url += '?' + Object.keys(options.qs).map(function(key) {
                    return key + '=' + encodeURIComponent(options.qs[key]);
                }).join('&');
            }
            log.debug('Requesting', url);
        }

    }).bind(this);
};

HarvesterManager.create = function(options) {
    return new HarvesterManager(options);
};

function Harvester() {
}

Harvester.prototype.get = function() {
    return Object.keys(this._services);
};

Harvester.prototype.set = function(services) {
    if (!services) {
        this._services = {};
    }else if (isArray(services)) {
        this._services = services.reduce(function(o, x) {
            o[x] = true; return o; }, {});
    } else if (services instanceof Harvester) {
        this.set(services.get());
    } else {
        this._services = services;
    }
};

Harvester.prototype.contains = function(service) {
    return service && !!this._services[service];
};

module.exports = Harvester;
module.exports.Manager = HarvesterManager;
