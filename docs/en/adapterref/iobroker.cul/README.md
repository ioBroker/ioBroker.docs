![Logo](admin/busware.jpg)
# ioBroker.cul

![Number of Installations](http://iobroker.live/badges/cul-installed.svg)
![Number of Installations](http://iobroker.live/badges/cul-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.cul.svg)](https://www.npmjs.com/package/iobroker.cul)

![Test and Release](https://github.com/ioBroker/ioBroker.cul/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/cul/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.cul.svg)](https://www.npmjs.com/package/iobroker.cul)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

ioBroker adapter to control FS20, Max!, HMS and other devices via [CUL](http://busware.de/tiki-index.php?page=CUL) /
[culfw](http://culfw.de). Depends on https://github.com/hobbyquaker/cul

## Supported devices

- *EM* - EM1000WZ, EMWZ
- *FS20*, incl. ESA1000/2000
- *HMS* - HMS100-TF, HMS100-T, HMS100-WD, RM100-2, HMS100-TFK, HMS100-MG, HMS100-CO, HMS100-FIT
- *MORITZ* - MAX!
- *WS* - KS300TH, S300TH, WS2000/WS7000

## HowTo

### Send a command to a FS20 Device in e.g. JavaScript
```sendTo("cul.0", "send", {"protocol":"FS20", "housecode":"A1B2", "address":"01", "command":"00"});```

### Send a raw command (to a InterTechno device for example) using JavaScript
```sendTo("cul.0", "sendraw", {"command": 'is0FFFFF0FFFFF'});```

These commands use the CUL Library of this adapter to send the commands a Device.
Javascript/Node.js based `Busware CUL USB / culfw` adapter

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.0.2 (2026-09-02)
* (@GermanBluefox) Removed a prepare script

### 3.0.1 (2026-08-25)
* (@GermanBluefox) The serial port can be entered manually now, so a symlink below `/dev/serial/by-id` can be used (#150)
* (@GermanBluefox) The port list offers the `/dev/serial/by-id` symlinks in addition to the `/dev/ttyUSBx` devices on Linux. They are not hidden behind the experimental option any more and do not replace the device paths any more

### 3.0.0 (2026-08-25)
* (bluefox) BREAKING: The adapter requires node.js >= 22, js-controller >= 6.0.11 and admin >= 7.0.0 now
* (bluefox) The adapter was rewritten in TypeScript. The sources are in `src/`, the published code in `build/`
* (bluefox) Updated the `cul` package to 1.0.0. It uses serialport 13, so no build tools are required for the installation any more
* (bluefox) BREAKING: `cul` 1.0.0 renamed some datapoints: `battery` is now `batteryLow`/`batteryState`, `window`/`isopen` is now `open`, `valveposition` is now `valvePosition`. The old states are not written any more and can be deleted
* (bluefox) Fixed the swapped `Mode` and `Type` labels in the configuration dialog
* (bluefox) Fixed the port list in experimental mode: the `/dev/serial/by-id` entries were built from an undefined value
* (bluefox) The HTML configuration dialog and the gulpfile were removed
* (bluefox) The debug driver, that replayed `lib/rawData.txt` when the environment variable `DEBUG` was set, was removed

### 2.2.0 (2023-04-17)
* (jpk) Select port by ID instead of name as an option
* (bluefox) Updated GUI for admin 6

### 2.0.2 (2022-05-11)
* IMPORTANT: Nodejs 12.x is now needed at least!
* (Apollon77/achimmm) Add support for devices with address 0
* (bluefox) Updated serialport package

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2014-2026 hobbyquaker
