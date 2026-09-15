---
chapters: {"pages":{"en/adapterref/iobroker.metermaster/README.md":{"title":{"en":"ioBroker.metermaster"},"content":"en/adapterref/iobroker.metermaster/README.md"},"en/adapterref/iobroker.metermaster/INSTALLATION.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.metermaster/INSTALLATION.md"}}}
---
## MeterMaster Adapter – Installation

This document supplements the [README](/#/adapters/metermaster) with additional installation notes.

### Standard installation

1. Open **ioBroker Admin** → **Adapters**
2. Search for **MeterMaster**
3. Click **Install** and create an instance
4. Start the instance

Command line on the ioBroker host:

```bash
iobroker add metermaster
iobroker start metermaster
```

### Firewall

If the MeterMaster app cannot reach the adapter, open port 8089:

```bash
sudo ufw allow 8089/tcp
```

### Instance configuration

| Setting | Default | Description |
|---|---|---|
| HTTP port | `8089` | Port the adapter listens on |
| Username | `metermaster` | Basic auth username |
| Password | – | Basic auth password |
| Verbose logging | enabled | Show DEBUG entries in log viewer |
| Log buffer | `500` | Max. stored log entries |
| Keep history | `0` | 0 = unlimited |

### Update

```bash
iobroker upgrade metermaster
iobroker restart metermaster.0
```

### Troubleshooting

Check adapter status:

```bash
iobroker status metermaster.0
```

View logs:

```bash
iobroker logs metermaster.0
```

If port 8089 is already in use, choose a different port in the adapter instance configuration.