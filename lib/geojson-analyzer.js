var request = require('request-promise');
var Bluebird = require('bluebird');

var writer = require('./writer');
var log = require('./logging')('geojson-analyzer');

var CRS4326 = ["EPSG:4326"];
var CRS4258 = ["EPSG:4258"];
var CRS3035 = ["EPSG:3035"];
var CRS3857 = ["EPSG:3857"];

var totalCount = 0;
var errorCount = 0;

function analyze(services, callback) {
    callback({msg: "not implemented yet"});
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
