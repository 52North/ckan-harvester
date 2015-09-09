# CKAN CORS Proxy

## Installation

```sh
npm install -g '52North/ckan-harvester'
```

`ckan-harvester` uses [`bunyan`][bunyan] as the logging component. The JSON output of `bunyan` can be best viewed using the `bunyan` CLI tool:

```sh
npm install -g bunyan
```

### systemd
Add a `node` user:
```sh
useradd -rUmd /var/lib/node -s /bin/bash node
```

Create a unit file:
```sh
cat > /etc/systemd/system/ckan-harvester.service <<EOF
[Unit]
Description=CKAN Proxy Server
After=network.target
Requires=network.target

[Service]
ExecStart=/usr/bin/ckan-harvester /etc/ckan-harvester.json
User=node
Group=node
Restart=always

[Install]
WantedBy=multi-user.target
EOF
```

Create a minimal configuration in `/etc/ckan-harvester.json`:
```sh
echo '{}' > /etc/ckan-harvester.json
```

Start and enable the `ckan-harvester` service:
```sh
systemctl daemon-reload
systemctl enable ckan-harvester.service
systemctl start ckan-harvester.service
```

To view the log files (requires `bunyan`):
```sh
journalctl -f -u ckan-harvester.service -o cat | bunyan
```

## Configuration

Call `ckan-harvester` with the path to a JSON configuration file as the first argument. E.g. `ckan-harvester /etc/ckan-harvester.json`.


### Default Configuration Options

```json
{
  "logging": {
    "level": "info"
  },
  "proxy": {
    "port": 9090,
    "cors": {
      "allowedHeaders": [
        "accept",
        "accept-charset",
        "accept-encoding",
        "accept-language",
        "authorization",
        "content-length",
        "content-type",
        "host",
        "origin",
        "proxy-connection",
        "referer",
        "user-agent",
        "x-requested-with"
      ],
      "allowedMethods": [
        "HEAD",
        "POST",
        "GET",
        "PUT",
        "PATCH",
        "DELETE"
      ]
    }
  },
  "whitelist": {
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
