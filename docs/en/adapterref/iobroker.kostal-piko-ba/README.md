![Logo](admin/picoba.png)
# ioBroker.kostal-piko-ba

[![NPM version](http://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)](https://www.npmjs.com/package/iobroker.kostal-piko-ba)
![NPM version (stable)](http://ioBroker.live/badges/kostal-piko-ba-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba.svg)](https://www.npmjs.com/package/iobroker.kostal-piko-ba)
![Number of Installations (latest)](http://ioBroker.live/badges/kostal-piko-ba-installed.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba/badge.svg)](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba)

CI-Tests:
![Node.js CI](https://github.com/hombach/ioBroker.kostal-piko-ba/workflows/Node.js%20CI/badge.svg)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-kostal-piko-ba)

[![NPM](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)](https://nodei.co/npm/iobroker.kostal-piko-ba/)

## Adapter for reading Kostal Piko & Piko BA data for iOBroker
Adapter for reading Kostal Piko & Piko BA data. Adapter creates some states and updates them sequentially.
Adapter working with Kostal Piko 6.0BA, 8.0BA, 10.0BA, 5.5, 7.0, 10, 12, 15, 17 & 20 inverters. 
It's greatly appreciated if you verify functionality with other inverters and please send me a note.

## Settings
Be aware that your inverter has to be updated to Kostal UI >= 6.11!
To connect to the Kostal Pico (BA) inverter, setting its IP-address in the config is mandatory.
You could also edit the update frequencies of live data, daily and livetime statistics.
If needed, set the mark for read-out of the 4 analog values, too.

## Notes
This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers. For more details and for informations on how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Changelog

! Note that missing version entries are typically dependency updates for security.

### 2.1.1 (29.12.2022)
* (HombachC) year 2023 changes
* (HombachC) bumped dependencies
### 2.1.0 (04.11.2022)
* (HombachC) added ukrainian translations
* (HombachC) bumped dependencies
### 2.0.2 (16.10.2022)
* (HombachC) fixed small sentry reported error
* (HombachC) optimized error logging
* (HombachC) bumped dependencies
### 2.0.1 (11.10.2022)
* (HombachC) optimized error logging
* (HombachC) bumped dependencies
### 2.0.0 (28.08.2022)
* (HombachC) BREAKING: Dropped support for Node.js 12
* (HombachC) changed the minimal required js-controller version to 3.2.16
* (HombachC) added state of inverter as string
* (HombachC) bumped dependencies
### 1.5.0 (05.08.2022)
* (HombachC) added minimum values for poll times to prevent communication errors
* (HombachC) bumped dependencies
### 1.4.7 (26.06.2022)
* (HombachC) bumped dependency because of security vulnerability
### 1.4.6 (06.06.2022)
* (HombachC) removed gulp, bumped dependencies, added tests for node.js 18
* (HombachC) removed tests for node.js 12 -> it's recommended to switch to node.js 14, adapter still working with node 12
### 1.4.5 (03.05.2022)
* (HombachC) added UI version to sentry feedback and documentation
### 1.4.4 (01.05.2022)
* (HombachC) optimized sentry feedback and documentation
### 1.4.3 (24.04.2022)
* (HombachC) normalizing of analog values added, bumped dependencies
### 1.4.2 (01.02.2022)
* (HombachC) added support for inverter type, version and name
* (HombachC) fixed timing error
### 1.4.1 (31.01.2022)
* (HombachC) optimized logging; bumped dependencies
### 1.4.0 (30.01.2022)
* (HombachC) added support for grid 1-3 current, voltage and power
* (HombachC) bumped dependencies
### 1.3.1 (23.01.2022)
* (HombachC) correct rounding of analog values; bumped dependencies
* (HombachC) added validation of configured IPv4 address
### 1.3.0 (01.01.2022)
* (HombachC) added optional support for analog inputs
### 1.2.1 (24.12.2021)
* (HombachC) introduced rounding of battery temp
### 1.2.0 (16.12.2021)
* (HombachC) dropped node.js 10 support; bumped dependencies; fixed vulnerability
### 1.1.13 (16.10.2021)
* (HombachC) bumped dependencies; fixed vulnerability
### 1.1.12 (07.10.2021)
* (GermanBlueFox) fixed icon link
* (HombachC) bumped dependencies
### 1.1.7 (09.05.2021)
* (HombachC) added tests for node.js 16; fixed vulnerability
### 1.1.3 (23.11.2020)
* (HombachC) added battery.Voltage; added additional error handler; bumped dependencies
### 1.1.1 (09.10.2020) stable
* (HombachC) minor documentation tweaks; DC current accuracy changed to mA
### 1.1.0 (09.10.2020)
* (tobstare) added DC1-3 current, voltage and power
* (HombachC) added battery.ChargeCycles
* (HombachC) bumped dependencies; added battery.temperature
### 1.0.2 (23.09.2020)
* (HombachC) public release for stable repo
### 0.8.0 (18.08.2020)
* (HombachC) seperate editable poll timer for statistics data
### 0.7.4 (03.07.2020)
* (HombachC) added sentry.io support
### 0.6.1 (28.06.2020)
* (HombachC) poll of statistics data separated
### 0.1.0 (15.05.2020)
* (HombachC) initial working release

## License
MIT License

Copyright (c) 2020 - 2023 HombachC

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
