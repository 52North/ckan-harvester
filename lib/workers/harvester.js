var config = require('../config');
var HarvesterManager = require('../harvester').Manager;
var log = require('../logging')('harvester-worker');

module.exports = function() {
  log.info("Starting Worker...");
  HarvesterManager
    .create(config.harvester)
    .on('update', function(harvester) {
      log.trace('Sending harvester to master');
      process.send({
        cmd: 'harvester.update',
        harvester: harvester.get()
      });
    });
};