var request = require('request');
var Bluebird = require('bluebird');
var moment = require('moment');

var writer = require('./writer');
var log = require('./logging')('wms-analyzer');

var Jsonix = require('jsonix').Jsonix;
var mapping130 = require('../mappings/WMS130').WMS130;
var mapping111 = require('../mappings/WMS111').WMS111;
var mapping110 = require('../mappings/WMS110').WMS110;

var CRS4326 = ["EPSG:4326"];
var CRS4258 = ["EPSG:4258"];
var CRS3035 = ["EPSG:3035"];
var CRS3857 = ["EPSG:3857"];

var totalCount = 1;
var errorCount = 1;

function analyze(services, callback) {
    log.info("analyzing services: "+services.length);
    
    var results = [];
    
    var incrementTotalCount = function() {
        totalCount++;
        if (totalCount % 100 === 0 || services.length - totalCount < 10) {
            log.info("Current count: "+ totalCount +"/"+services.length);
        }
    };

    var nextIndex = 0;
    var nextUrl = function() {
        if (nextIndex + 1 < services.length) {
            return services[nextIndex++]
        }
        return null;
    }

    var callNext = function(d) {
        var url = d.url;
        var lowerUrl = url.toLowerCase();
        var hasQuery = false;
        if (lowerUrl.indexOf("?") > -1) {
            hasQuery = true;
        }

        if (lowerUrl.indexOf("request=") === -1) {
            url = url + (hasQuery ? "&" : "?") + "request=GetCapabilities";
            hasQuery = true;
        }
        if (lowerUrl.indexOf("service=") === -1) {
            url = url + (hasQuery ? "&" : "?") + "&service=WMS";
        }
        
        if (d.orga === "GDI-DE") {
            log.info("GDI-DE @ " +url);
        }
        
        request({timeout: 15000, method: 'GET', uri: url, gzip: true},
            function(error, response, body) {
                var result = {};
                result.url = d.url;
                result.organization = d.orga;

                if (error) {
                    log.error("could not access WMS at " +d.url);
                }
                else if (body) {
                    var parsed;
                    if (body.indexOf("WMT_MS_Capabilities") > -1 && body.indexOf('version="1.1.0"') > -1) {
                        var parsed = parseWMS110(body);
                    }
                    else if (body.indexOf("WMT_MS_Capabilities") > -1 && body.indexOf('version="1.1.1"') > -1) {
                        var parsed = parseWMS111(body);
                    }
                    else if (body.indexOf("WMS_Capabilities") > -1 && body.indexOf('version="1.3.0"') > -1) {
                        var parsed = parseWMS130(body);
                    }

                    if (parsed) {
                        result.crs = parsed.crs;
                        result.wmsVersion = parsed.wmsVersion;
                    }
                }

                results.push(result);
                var n = nextUrl();
                if (n) {
                    callNext(n);
                }
                
                incrementTotalCount();
                if (!result.crs || result.crs.length === 0) {
                    errorCount++;
                }
                
                if (totalCount === services.length) {
                    saveResults(results, callback);
                }
            }
        );
    }
    
    /* spawn 10 async callbacks*/
    for (var j = 0; j < 10; j++) {
        callNext(nextUrl());
    }
    
}

function saveResults(results, callback) { 
    var crsAmongOrgas = {};

    for (var i = 0; i < results.length; i++) {
        var service = results[i];

        if (!service) {
            continue;
        }

        if (!crsAmongOrgas[service.organization]) {
            var crsResults = {};
            crsResults.crs4326 = 0;
            crsResults.crs4258 = 0;
            crsResults.crs3035 = 0;
            crsResults.crs3857 = 0;
            crsResults.wms110 = 0;
            crsResults.wms111 = 0;
            crsResults.wms130 = 0;
            crsAmongOrgas[service.organization] = crsResults;
        }

        var crsArray = service.crs;
        for (var k in crsArray) {
            var v = crsArray[k];

            if (CRS3035.indexOf(v) > -1) {
                crsAmongOrgas[service.organization].crs3035++;
            }
            else if (CRS3857.indexOf(v) > -1) {
                crsAmongOrgas[service.organization].crs3857++;
            }
            else if (CRS4258.indexOf(v) > -1) {
                crsAmongOrgas[service.organization].crs4258++;
            }
            else if (CRS4326.indexOf(v) > -1) {
                crsAmongOrgas[service.organization].crs4326++;
            }
        }

        if (service.wmsVersion === "1.1.0") {
            crsAmongOrgas[service.organization].wms110++;
        }
        else if (service.wmsVersion === "1.1.1") {
            crsAmongOrgas[service.organization].wms111++;
        }
        else if (service.wmsVersion === "1.3.0") {
            crsAmongOrgas[service.organization].wms130++;
        }
    }

    crsAmongOrgas.totalCount = totalCount;
    crsAmongOrgas.errorCount = errorCount;

    callback(crsAmongOrgas);
    var now = moment().format("YYYY-MM-DD_HH-mm-ss");
    writer.write("./wms-crs-"+now+".json", crsAmongOrgas);
}

function parseWMS110(body) {
    var context = new Jsonix.Context([mapping110]);
    var result = {};
    result.crs = processContent(body, context);
    result.wmsVersion = "1.1.0";
    return result;
}

function parseWMS111(body) {
    var context = new Jsonix.Context([mapping111]);
    var result = {};
    result.crs = processContent(body, context);
    result.wmsVersion = "1.1.1";
    return result;
}

function parseWMS130(body) {
    var context = new Jsonix.Context([mapping130]);
    var result = {};
    result.crs = processContent(body, context);
    result.wmsVersion = "1.3.0";
    return result;
}

function processContent(body, context, debug) {
    var unmarshaller = context.createUnmarshaller();
    var doc = Jsonix.DOM.parse(body);
    try {
        var result = unmarshaller.unmarshalDocument(doc, this);
    } catch (e) {
        log.error("could not parse capabilities");
        return [];
    }
    
    
    var crsArray = [];
    if (result && result.value && result.value.capability &&
        result.value.capability.layer) {
        if (result.value.capability.layer.crs) {
            crsArray = result.value.capability.layer.crs;
        }
        else if (result.value.capability.layer.srs) {
            if (result.value.capability.layer.srs instanceof String) {
                //WMS 1.1.0
                crsArray = [];
                crsArray[0] = result.value.capability.layer.srs;
            }
            else {
                //WMS 1.1.1
                crsArray = result.value.capability.layer.srs;
            }
        }
    }
    
    return crsArray;
}

function getTotalCount() {
    return totalCount;
}

function getErrorCount() {
    return errorCount;
}

exports.analyze = analyze;
exports.getTotalCount = getTotalCount;
exports.getErrorCount = getErrorCount;