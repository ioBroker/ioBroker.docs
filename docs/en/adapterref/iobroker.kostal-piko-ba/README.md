![Logo](admin/picoba.png)
# ioBroker.kostal-piko-ba

[![NPM version](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)](https://www.npmjs.com/package/iobroker.kostal-piko-ba)
![NPM version (stable)](https://ioBroker.live/badges/kostal-piko-ba-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba.svg)](https://www.npmjs.com/package/iobroker.kostal-piko-ba)
![Number of Installations (latest)](https://ioBroker.live/badges/kostal-piko-ba-installed.svg)

**CI-Tests:**
![Node.js CI](https://github.com/hombach/ioBroker.kostal-piko-ba/workflows/Node.js%20CI/badge.svg)
[![CodeQL](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-kostal-piko-ba)

[![NPM](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)](https://nodei.co/npm/iobroker.kostal-piko-ba/)


## Adapter for reading Kostal Piko & Piko BA data for iOBroker
Adapter for reading Kostal Piko, Piko BA and PIKO MP plus data. Adapter creates some states and updates them sequentially.
Adapter designed for Kostal Piko 6.0BA, 8.0BA, 10.0BA, BA inverters.
Adapter also working with Kostal Piko 3.0, 4.2, 4.6, 5.5, 7.0, 8.5, 10, 12, 15, 17, 20 & 36 inverters. 
NEW! Adapter now also working with MP plus inverters - tested with Kostal PIKO 1.5-1, 2.0-1, 3.0-1 MP plus.
It's greatly appreciated if you verify functionality with other inverters and please send me a note.

## Settings
Be aware that your Piko or Piko BA inverter has to be updated to Kostal UI >= 6.11!
To connect to the Kostal Piko (BA / MP plus) inverter, setting its IP-address in the config is mandatory.
Optionally you could also edit the update frequencies of live data, daily and livetime statistics.
If needed and supoported by your hardware, set the mark for read-out of the 4 analog values, too.

## Notes
This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers. For more details and for informations on how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 4.0.1 (24.06.2024)

* (HombachC) dependency updates, removed unfunctional snyk tests

### 4.0.0 (21.04.2024)

* (HombachC) BREAKING: Dropped support for Node.js 16 (#591)
* (HombachC) BREAKING: Minimum needed js-controller bumped to 5 (#592)
* (HombachC) changed timeout settings for older Kostal inverters (#589)
* (HombachC) dependency updates
* (HombachC) added tests for node.js 21
* (HombachC) raised minimum poll time for daily statistics
* (HombachC) code optimizations

### 3.1.0 (29.03.2024)

* (HombachC) changed to tier 2 as data provider

### 3.0.11 (29.03.2024)

* (HombachC) corrected io-package.json according to new schema
* (HombachC) bump adapter-core to 3.0.6

### 3.0.10 (03.03.2024)

* (HombachC) fixed vulnerability

### 3.0.9 (23.12.2023)

* (HombachC) year 2024 changes
* (HombachC) several dependency updates 

### 3.0.8 (29.10.2023)

* (HombachC) bump axios to 1.6.0 because of vulnerability
* (HombachC) several dependency updates 

### 3.0.7 (01.10.2023)

* (HombachC) several dependency updates 

### 3.0.6 (27.08.2023)

* (HombachC) improved error handling in case of offline inverters - centralized error handling 

### 3.0.5 (19.08.2023)

* (HombachC) mitigating another sentry notified error in case of network trouble

### 3.0.4 (13.08.2023)

* (HombachC) bumped adapter core to V3

### 3.0.3 (17.07.2023)

* (HombachC) fixing sentry notified error in case of network trouble

### 3.0.2 (14.07.2023)

* (HombachC) fix small error in MP recognition
* (HombachC) sentry notified error in object handling

### 3.0.1 (23.06.2023)

* (HombachC) corrected state description

### 3.0.0 (08.06.2023)

* (HombachC) BREAKING: Dropped support for Node.js 14
* (HombachC) changed config screen to admin 5 solution
* (HombachC) dropped Admin <5 support
* (HombachC) removed tests for node 14

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020 - 2024 HombachC

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
