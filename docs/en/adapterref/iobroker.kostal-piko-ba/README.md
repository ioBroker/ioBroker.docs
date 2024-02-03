![Logo](admin/picoba.png)
# ioBroker.kostal-piko-ba

[![NPM version](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)](https://www.npmjs.com/package/iobroker.kostal-piko-ba)
![NPM version (stable)](https://ioBroker.live/badges/kostal-piko-ba-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba.svg)](https://www.npmjs.com/package/iobroker.kostal-piko-ba)
![Number of Installations (latest)](https://ioBroker.live/badges/kostal-piko-ba-installed.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba/badge.svg)](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba)

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

### 3.0.10 (xx.01.2024)
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
### 2.5.2 (02.06.2023)
* (HombachC) fixed a wording error
* (HombachC) bumped dependencies, added tests for node.js 20
* (HombachC) it's recommended to switch to minimum node.js 16, adapter still working with node 14
### 2.5.1 (25.04.2023)
* (HombachC) fixed a sentry reported error
### 2.5.0 (22.04.2023)
* (HombachC) implemented battery power calculation
### 2.4.7 (13.04.2023)
* (HombachC) improved error handling
### 2.4.6 (09.04.2023)
* (HombachC) fixed vulnerability in xml2js
### 2.4.5 (07.04.2023)
* (HombachC) improved error handling
### 2.4.4 (04.04.2023)
* (HombachC) improved error handling
### 2.4.3 (03.04.2023)
* (HombachC) improved error handling
### 2.4.2 (07.03.2023)
* (HombachC) fixed error in Piko MP Plus AC current
* (HombachC) added Piko MP Plus total yield
### 2.4.1 (06.03.2023)
* (HombachC) fixed Piko MP Plus support for two channel hardware
### 2.4.0 (06.03.2023)
* (HombachC) added support of AC and DC power values for Piko MP inverters
### 2.3.1 (05.03.2023)
* (HombachC) fix error with zero values in DC & AC
### 2.3.0 (26.02.2023)
* (HombachC) replaced got by axios
* (HombachC) added warning for not supported Piko MP inverters
* (HombachC) removed travis
### 2.2.2 (14.02.2023)
* (HombachC) fixed error with missing grid limitation response
### 2.2.0 (03.02.2023)
* (HombachC) added support for phase 1-3 of homeconsumption power
* (HombachC) enhanced sentry support
### 2.1.3 (03.02.2023)
* (HombachC) optimized debug data
### 2.1.2 (29.01.2023)
* (HombachC) fixed errors with single phase inverters (Piko 3)
### 2.1.1 (29.12.2022)
* (HombachC) year 2023 changes
### 2.1.0 (04.11.2022)
* (HombachC) added ukrainian translations
### 2.0.2 (16.10.2022)
* (HombachC) fixed small sentry reported error
* (HombachC) optimized error logging
### 2.0.1 (11.10.2022)
* (HombachC) optimized error logging
### 2.0.0 (28.08.2022)
* (HombachC) BREAKING: Dropped support for Node.js 12
* (HombachC) changed the minimal required js-controller version to 3.2.16
* (HombachC) added state of inverter as string
### 1.5.0 (05.08.2022)
* (HombachC) added minimum values for poll times to prevent communication errors
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
* (HombachC) normalizing of analog values added
### 1.4.2 (01.02.2022)
* (HombachC) added support for inverter type, version and name
* (HombachC) fixed timing error
### 1.4.1 (31.01.2022)
* (HombachC) optimized logging
### 1.4.0 (30.01.2022)
* (HombachC) added support for grid 1-3 current, voltage and power
### 1.3.1 (23.01.2022)
* (HombachC) correct rounding of analog values
* (HombachC) added validation of configured IPv4 address
### 1.3.0 (01.01.2022)
* (HombachC) added optional support for analog inputs
### 1.2.1 (24.12.2021)
* (HombachC) introduced rounding of battery temp
### 1.2.0 (16.12.2021)
* (HombachC) dropped node.js 10 support
* (HombachC) fixed vulnerability
### 1.1.13 (16.10.2021)
* (HombachC) fixed vulnerability
### 1.1.12 (07.10.2021)
* (GermanBlueFox) fixed icon link
### 1.1.7 (09.05.2021)
* (HombachC) added tests for node.js 16
* (HombachC) fixed vulnerability
### 1.1.3 (23.11.2020)
* (HombachC) added battery.Voltage
* (HombachC) added additional error handler
### 1.1.1 (09.10.2020) stable
* (HombachC) minor documentation tweaks
* (HombachC) DC current accuracy changed to mA
### 1.1.0 (09.10.2020)
* (tobstare) added DC1-3 current, voltage and power
* (HombachC) added battery.ChargeCycles
* (HombachC) added battery.temperature
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
