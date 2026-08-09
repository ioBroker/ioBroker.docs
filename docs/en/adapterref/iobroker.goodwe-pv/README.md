![Logo](admin/goodwe-pv.png)

# iobroker.goodwe-pv

[![NPM version](https://img.shields.io/npm/v/iobroker.goodwe-pv.svg)](https://www.npmjs.com/package/iobroker.goodwe-pv)
[![Downloads](https://img.shields.io/npm/dm/iobroker.goodwe-pv.svg)](https://www.npmjs.com/package/iobroker.goodwe-pv)
![node-lts](https://img.shields.io/node/v-lts/iobroker.goodwe-pv?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.goodwe-pv?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/hombach/iobroker.goodwe-pv?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/hombach/iobroker.goodwe-pv?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/hombach/iobroker.goodwe-pv?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/hombach/iobroker.goodwe-pv?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/hombach/iobroker.goodwe-pv?logo=github&style=flat-square)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.goodwe-pv/test-and-release.yml?branch=master&logo=github&style=flat-square)
[![CodeQL](https://github.com/hombach/iobroker.goodwe-pv/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/iobroker.goodwe-pv/actions/workflows/codeql-analysis.yml)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/iobroker.goodwe-pv?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-goodwePV)
[![SNYK Known Vulnerabilities](https://snyk.io/test/github/hombach/iobroker.goodwe-pv/badge.svg)](https://snyk.io/test/github/hombach/iobroker.goodwe-pv)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.goodwe-pv.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/goodwe-pv-stable.svg)
![Installed](https://iobroker.live/badges/goodwe-pv-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.goodwe-pv.png?downloads=true)](https://nodei.co/npm/iobroker.goodwe-pv/)

## Sentry

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable error reporting, see <a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">Sentry-Plugin Documentation</a>!

## goodwe-pv adapter for ioBroker

Communication with [GoodWe](https://www.goodwe.com) hybrid inverters of the ET, EH, BH and BT series via the local UDP interface (port 8899). No cloud connection required — the adapter talks directly to the inverter on your LAN.

### Supported devices

All GoodWe hybrid inverters that expose the local Modbus-over-UDP interface on port 8899:

- ET series (e.g. GW5-ET, GW8-ET, …)
- EH series
- BH series
- BT series

## Configuration

**IP address** — Local IP address of the GoodWe inverter (default: `127.0.0.1`). Find it in your router's DHCP lease table or in the SEMS portal / ShinePhone app under "Device Info". A static IP or DHCP reservation is recommended.

**Poll cycle** — How often in seconds each data group is re-read from the inverter (default: `10`). The four data groups (DeviceInfo, RunningData, ExtComData, BMSInfo) are staggered so only one UDP request is in flight per second.

> **Tip:** Find the inverter's IP address in your router's DHCP lease table, or check the GoodWe SEMS portal / ShinePhone app under "Device Info". Assigning a static IP or DHCP reservation is recommended so the address does not change.

## Based on

This adapter is based on [ioBroker.goodwe](https://github.com/FossyTom/ioBroker.goodwe) by [FossyTom](https://github.com/FossyTom) (Thomas Schönberger), licensed under MIT.
Copyright (c) 2023 Thomas Schönberger <SchoenbergerThomas@freenet.de>

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=GR6PERNQHJQ2A"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a>  
If you enjoyed this project — or just feeling generous, consider buying me a beer. Cheers! :beers:

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (hombach) updated dependencies

### 0.2.4 (2026-08-07)

- (hombach) add missing descriptions to DeviceInfo and BMSInfo states
- (hombach) remove placeholder desc "-" from states without a meaningful description
- (hombach) remove unused Rtc field from GoodWeRunningData type
- (hombach) updated dependencies

### 0.2.3 (2026-07-18)

- (hombach) replace deprecated role value.power.consumption with value.energy.consumed
- (hombach) replace value.power.produced with value.energy.produced for accumulated kWh states
- (hombach) replace invalid roles value.power.apparent and value.signal with valid alternatives

### 0.2.2 (2026-07-12)

- (hombach) assign semantic ioBroker roles to many states
- (hombach) fix PowerFactor scaling: signed int / 1000 instead of uint / 100
- (hombach) fix TotalReactivePower sign: use signed int (VAR can be negative)
- (hombach) fix EnergyTotalSell/Buy unit: GM3000 meter float is in Wh, divide by 1000

### 0.2.1 (2026-07-12)

- (hombach) add GoodWe manufacturer link to README
- (hombach) remove debug code (checkPasswordAsync/checkGroupAsync) from onReady
- (hombach) disable unused onStateChange handler (no writable states)
- (hombach) add runtime validation for pollCycle config parameter
- (hombach) expose DerateFlag as ioBroker state in RunningData
- (hombach) fix UTF-8 encoding corruption in all i18n translation files

### 0.2.0 (2026-07-05)

- (hombach) added units
- (hombach) replace chai/sinon-chai test dependencies with node:assert
- (hombach) fix test runner TS5011 rootDir error
- (hombach) remove redundant mocha/@types/mocha devDependencies (already included in @iobroker/testing)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 hombach <goodwePV@homba.ch>

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
