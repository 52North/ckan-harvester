var request = require('request-promise');
var Bluebird = require('bluebird');

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

var totalCount = 0;
var errorCount = 0;

function analyze(services, callback) {
    totalCount = services.length;
    var count = 0;
    
    var bb = Bluebird.map(services, function(d) {
        var url = d.url + "?REQUEST=GetCapabilities&SERVICE=WMS";
        var options = {
            url: url
        };

        return request(options).then(
            function (body) {
                var result = {};
                result.url = d.url;
                result.organization = d.orga;
                if (body) {
                    if (body.indexOf("WMT_MS_Capabilities") > -1 && body.indexOf('version="1.1.0"') > -1) {
                        result.crs = parseWMS110(body);
                    }
                    else if (body.indexOf("WMT_MS_Capabilities") > -1 && body.indexOf('version="1.1.1"') > -1) {
                        result.crs = parseWMS111(body);
                    }
                    else if (body.indexOf("WMS_Capabilities") > -1 && body.indexOf('version="1.3.0"') > -1) {
                        result.crs = parseWMS130(body);
                    }
                }
                
                return result;
            }, function(error) {
                log.error("could not access WMS at " +d.url);
            });
    });
    
    bb.then(function(results) {
        log.info(results.length);
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
        }
        
        callback(crsAmongOrgas);
        writer.write("./wms-crs.json", crsAmongOrgas);
    });
    
}

function parseWMS110(body) {
    var context = new Jsonix.Context([mapping110]);
    return processContent(body, context, true);
}

function parseWMS111(body) {
    var context = new Jsonix.Context([mapping111]);
    return processContent(body, context);
}

function parseWMS130(body) {
    var context = new Jsonix.Context([mapping130]);
    return processContent(body, context);
}

function processContent(body, context, debug) {
    var unmarshaller = context.createUnmarshaller();
    var doc = Jsonix.DOM.parse(body);
    var result = unmarshaller.unmarshalDocument(doc, this);
    
    
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