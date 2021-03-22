# Schema of ioBroker
## Namespaces

ioBroker has different namespaces. Some exist on every ioBroker installation, some are specific for running instances of an Adapter:

* `system.`             - System objects and states
* `system.host.`        - Controller processes
* `system.config.`      - System settings, like default language
* `system.meta.`        - System meta data
* `system.user.`        - Users
* `system.group.`       - Groups
* `system.adapter.<adapter-name>` - default config of an adapter
* `<adapter-name>.`     - objects for specific adapter.
* `<adapter-name>.meta.` - common meta-data used by all instances of this adapter
* `<adapter-name>.<instance-number>.` - An adapters instance namespace
* `enum.`               - Enumerations
* `history.`            - History Data
* `scripts.`            - Script Engine Scripts
* `scripts.js.`         - javascript Script Engine Scripts
* `scripts.py.`         - python Script Engine Scripts (future)



Below you find two examples of Namespaces, system.config and system.host:

### Namespace system.config.

```
{
    _id:   id,
    type: 'config',
    common: {
        language:     'en',         // Default language for adapters. Adapters can use different values.
        tempUnit:     '°C',         // Default temperature units.
        currency:     '€',          // Default currency sign.
        dateFormat:   'DD.MM.YYYY'  // Default date format.
        isFloatComma: true,         // Default float divider ('.' - false, ',' - true)
        "activeRepo": "online1",    // active repository
        "listRepo": {               // list of possible repositories
            "default": "conf/sources-dist.json",
            "online1": "https://raw.githubusercontent.com/ioBroker/ioBroker.nodejs/master/conf/sources-dist.json"
        }
    }
}
```

### Namespace system.host.&lt;hostname&gt;

```
{
    _id:   id,
    type: 'host',
    common: {
        name:       id,
        process:    title,           // iobroker.ctrl
        version:    version,         // Vx.xx.xx
        platform:   'javascript/Node.js',
        cmd:        process.argv[0] + ' ' + process.execArgv.join(' ') + ' ' + process.argv.slice(1).join(' '),
        hostname:   hostname,
        address:    ipArr,
        defaultIP:  ???
    },
    native: {
        process: {
            title:      process.title,
            pid:        process.pid,
            versions:   process.versions,
            env:        process.env
        },
        os: {
            hostname:   hostname,
            type:       os.type(),
            platform:   os.platform(),
            arch:       os.arch(),
            release:    os.release(),
            uptime:     os.uptime(),
            endianness: os.endianness(),
            tmpdir:     os.tmpdir()
        },
        hardware: {
            cpus:       os.cpus(),
            totalmem:   os.totalmem(),
            networkInterfaces: os.networkInterfaces()
        }
    }
};
```