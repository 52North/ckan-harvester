var extend = require('extend');
var fs = require('fs');

var defaultOptions = {
  logging: { level: 'info' },
  harvester: {
    ckan: {
      enabled: false,
      url: "http://demo.ckan.org",
      updateInterval: 0,
      rowsPerRequest: 500
    },
    domains: []
  }
};

function readConfig(file) {
  var data, options = {};

  extend(true, options, defaultOptions);

  try {
    data = fs.readFileSync(file, { encoding: 'utf8' });
  } catch(e) {
    // ignore
  }

  if (data) extend(true, options, JSON.parse(data));

  return options;
}

function getPath() {
  if (process.argv.length > 2) {
    return process.argv[2];
  } else {
    return process.cwd() + '/config.json';
  }
}

module.exports = readConfig(getPath());
