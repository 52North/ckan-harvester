# CKAN Harvester

## Installation

```sh
npm install -g '52North/ckan-harvester'
```

`ckan-harvester` uses [`bunyan`][bunyan] as the logging component. The JSON output of `bunyan` can be best viewed using the `bunyan` CLI tool:

```sh
npm install -g bunyan
```

## Configuration

Call `ckan-harvester` with the path to a JSON configuration file as the first argument. E.g. `ckan-harvester /etc/ckan-harvester.json`.


### Default Configuration Options

```json
{
  "logging": {
    "level": "info"
  },
  "harvester": {
    "ckan": {
      "enabled": false,
      "url": "http://demo.ckan.org",
      "updateInterval": 0,
      "rowsPerRequest": 500
    },
    "domains": []
  }
}
```
### Logging

You can use `bunyan` [configuration options](https://github.com/trentm/node-bunyan#streams) in the settings:

```json
{
  "logging": {
    "level": "info",
    "type": "rotating-file",
    "path": "/var/log/ckan-harvester.log",
    "period": "1d",
    "count": 3
  }
}
```

[bunyan]: <https://github.com/trentm/node-bunyan> "bunyan"
