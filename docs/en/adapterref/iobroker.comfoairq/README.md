![Logo](admin/comfoairq.png)

# ioBroker.comfoairq

[![NPM version](https://img.shields.io/npm/v/iobroker.comfoairq?style=flat-square)](https://www.npmjs.com/package/iobroker.comfoairq)
[![Downloads](https://img.shields.io/npm/dm/iobroker.comfoairq?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/iobroker.comfoairq)
![node-lts](https://img.shields.io/node/v-lts/iobroker.comfoairq?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.comfoairq?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/klein0r/iobroker.comfoairq?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/klein0r/iobroker.comfoairq?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/klein0r/iobroker.comfoairq?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/klein0r/iobroker.comfoairq?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/klein0r/iobroker.comfoairq?logo=github&style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.comfoairq/test-and-release.yml?branch=master&logo=github&style=flat-square)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.comfoairq.svg?color=red&label=beta)
![Stable](http://iobroker.live/badges/comfoairq-stable.svg)
![Installed](http://iobroker.live/badges/comfoairq-installed.svg)

Connect your Zehnder ComfoAirQ over ComfoConnect LAN C

*Tested with ComfoAirQ 350*

> [!NOTE]
> ComfoConnect LAN C firmware versions before U1.2.6 support just 1 single client - you cannot use the ComfoControl App and the ioBroker adapter at the same time.
> Since firmware U1.2.6, multiple simultaneous connections are supported.

## Sponsored by

[![ioBroker Master Kurs](https://haus-automatisierung.com/images/ads/ioBroker-Kurs.png?2024)](https://haus-automatisierung.com/iobroker-kurs/?refid=iobroker-comfoairq)

## Credits

Development of this ioBroker Adapter was possible on the work performed by:

* Jan Van Belle (https://github.com/herrJones/node-comfoairq)
* Michael Arnauts (https://github.com/michaelarnauts/aiocomfoconnect)
* Marco Hoyer (https://github.com/marco-hoyer/zcan) and its forks on github (djwlindenaar, decontamin4t0R)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.1.0 (2026-10-02)

* (@klein0r) Added installer code and installer mode (read only, `property.*`)
* (@klein0r) Added buttons to switch the installer mode on / off

### 1.0.0 (2026-10-01)

* (@klein0r) Updated comfoairq library to 2.1.0
* (@klein0r) Updated README: multiple simultaneous connections are supported since LAN C firmware U1.2.6
* (@klein0r) Device discovery searches on all network interfaces (and directly on the configured IP address) - removed broadcast address option
* (@klein0r) Added commands: boost 60 / 90 minutes / unlimited, boost and away mode with custom duration, end away mode, extract only ventilation mode, filter change
* (@klein0r) Added settings (`property.*`): filter lifetime / warning, fan flow per level, RMOT heating / cooling limit, sensor based ventilation - and device information (model name, article number, country)
* (@klein0r) Added new sensors (e.g. outdoor air temperature, supply air temperature, filter change state, seconds until next change)
* (@klein0r) Connection state is restored after an automatic reconnect
* (@klein0r) Added value texts (`states`) for mode sensors (e.g. operating mode, fan speed mode, bypass activation mode)
* (@klein0r) Fixed crash (ERR_OUT_OF_RANGE) when a message from the gateway is split across multiple TCP packets
* (@klein0r) Connection state is set again when sensor values are received
* (@klein0r) Sensor values received within the 2 second update limit are no longer dropped - the latest value is written afterwards
* (@klein0r) Added connected devices of the ComfoNet bus (`node.*`) with product, zone, mode - and serial number, firmware version and active errors (alarms)
* (@klein0r) Added command to reset errors
* (@klein0r) Added device name, serial number and firmware version of the ventilation unit (`property.*`)
* (@klein0r) Gateway and ComfoNet version are shown as readable version (e.g. R1.5.1)
* (@klein0r) Commands and settings are sent to the ventilation unit announced by the device (e.g. ComfoAir Flex)
* (@klein0r) Added sensors: heating / cooling season, airflow constraints, analog inputs, subsoil heat exchanger present, ComfoCool state
* (@klein0r) Added ground heat exchanger sensors 416 / 417 / 418 (fixes #28)
* (@klein0r) Added duration (1 - 24 hours) for supply only / extract only ventilation mode (fixes #45)
* (@klein0r) Retry to start the session every minute if the LAN C is not reachable on startup

### 0.6.1 (2026-10-01)

* (@klein0r) Updated dependencies
* (@klein0r) admin 7.8.23 and js-controller 6.0.11 (or later) are required

### 0.6.0 (2026-05-19)

* (copilot) Adapter requires node.js >= 22 now
* (@klein0r) admin 7.6.20 and js-controller 6.0.11 (or later) are required
* (@klein0r) Updated dependencies

### 0.5.1 (2025-04-14)

* (@klein0r) Updated dependencies

## License

MIT License

Copyright (c) 2026 Matthias Kleine <info@haus-automatisierung.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.