var cluster = require('cluster');
var os = require('os');
var log = require('../logging')('master');

var harvester;
var workers = {
  harvester: null,
  proxy: {}
};

function start() {
  log.info('Forking...');
  forkHarvesterWorker();
}

function restart(worker, code, signal) {
  log.info('worker ' + worker.process.pid + ' died:', signal || code);

  if (worker.id === workers.harvester.id) {
    forkHarvesterWorker();
  }
}

function forkHarvesterWorker() {
  // keep track of the harvester worker
  workers.harvester = cluster.fork({ WORKER_TYPE: 'harvester' });
  workers.harvester.on('message', function(message) {
    log.trace('Received message from harvester worker');
    if (message && message.cmd === 'harvester.update') {
      // save the harvester for newly created proxy workers
      harvester = message.harvester;
    }
  });
  return workers.harvester;
}

module.exports = function() {
  cluster.on('exit', restart);
  start();
};