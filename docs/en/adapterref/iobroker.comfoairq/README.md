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

**Important:** ComfoConnect LAN C supports just 1 single client. You cannot use the ComfoControl App and the ioBroker adapter at the same time!

## Sponsored by

[![ioBroker Master Kurs](https://haus-automatisierung.com/images/ads/ioBroker-Kurs.png?2024)](https://haus-automatisierung.com/iobroker-kurs/?refid=iobroker-comfoairq)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required
* (@klein0r) Updated dependencies

### 0.5.1 (2025-04-14)

* (@klein0r) Updated dependencies

### 0.5.0 (2025-04-14)

NodeJS >= 20.x and js-controller >= 6 is required

* (@klein0r) Added messagebox for device discovery via admin
* (@klein0r) Added responsive admin layout

### 0.4.0 (2024-03-28)

NodeJS >= 18.x and js-controller >= 5 is required

* (klein0r) Added icons to admin tabs
* (klein0r) Group sensors in admin config
* (klein0r) Limit sensor value refresh interval

### 0.3.0 (2022-12-14)

NodeJS 14.x is required (NodeJS 12.x is EOL)

* (klein0r) Updated depedency for js-controller to 4.0.15
* (klein0r) Dropped Admin 5 support
* (klein0r) Added Ukrainian language

### 0.2.0 (2022-02-25)

* (klein0r) Translated all objects
* (klein0r) Updated dependencies
* (klein0r) Added hint for Admin 4 configuration
* (klein0r) Updated state roles
* (klein0r) Updated dependencies

## Credits

Development of this ioBroker Adapter was possible on the work performed by:

* Jan Van Belle (https://github.com/herrJones/node-comfoairq)
* Michael Arnauts (https://github.com/michaelarnauts/comfoconnect)
* Marco Hoyer (https://github.com/marco-hoyer/zcan) and its forks on github (djwlindenaar, decontamin4t0R)

## License

MIT License

Copyright (c) 2025 Matthias Kleine <info@haus-automatisierung.com>

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
