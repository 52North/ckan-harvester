var request = require('request-promise');
var Bluebird = require('bluebird');
var URL = require('url');
var EventEmitter = require('events').EventEmitter;
var isArray = require('util').isArray;

var WMSAnalyzer = require('./wms-analyzer');
var GeoJSONAnalyzer = require('./geojson-analyzer');

var log = require('./logging')('harvester');

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
                if (services.indexOf(val) === -1) {
                    services[val] = key;
                }
            }
        }
        return services;
    }

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
    Bluebird.all([
        this.fetch('gjson'),
        this.fetch('GeoJSON')
    ]).bind(this).then(function(results) {
        // merge the objects to a single array
        return mergeArrays(results);
    }).then(function(servicesWithPackage) {
        return this.resolveOrganizations(servicesWithPackage);
    }, function(err) {
        log.error({err: err}, 'Error resolving orga');
    }).then(function(services) {
        GeoJSONAnalyzer.analyze(services, function(results) {
            log.info("CRS result: "+JSON.stringify(results));
            log.info("Total count: "+GeoJSONAnalyzer.getTotalCount());
            log.info("Error count: "+GeoJSONAnalyzer.getErrorCount());
        });
    }, function(err) {
        log.error({err: err}, 'Error updating');
    });
};

HarvesterManager.prototype.resolveOrganizations = function(servicesWithPackage) {
    var self = this;
    var urls = Object.keys(servicesWithPackage);
    
    var bb = Bluebird.map(urls, function(key) {
        var unknown = "unknown";

        var package = servicesWithPackage[key];

        var options = {
            url: self.config.ckan.url + '/api/3/action/package_show',
            json: true,
            id: package
        };

        return request(options).then(function(body) {
            var result = {};
            result.url = key;
            if (body && body.success && body.result && body.result.organization && body.result.organization.title) {
                log.info("GOT ORG: "+body.result.organization.title);
                result.orga = body.result.organization.title;
            }
            else {
                log.error("no organization for package "+ package);
                result.orga = unknown;
            }
            return result;
        }, function(error) {
            var result = {};
            result.url = key;
            result.orga = unknown;
            return result;
        });
    });

    return bb;
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

            var urls = [];
            body.result.results.forEach(function(p) {
                // resources may contain false positives
                if (p && p.format && p.format.toUpperCase() === format.toUpperCase()) {
                    if (p.url && p.resource_group_id) {
                        p.package_id = p.resource_group_id;
                        urls.push(p);
                    }
                }
            });

            urls.forEach(function(package) {
                if (!package) return;
                try {
                    var serv = URL.parse(package.url);
                    var parsed = serv.protocol + (serv.slashes ? "//" : "") + serv.host + serv.pathname;
                    if (!parsed) {
                        return;
                    }
                    if (!services[parsed]) {
                        services[parsed] = package.package_id;
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
