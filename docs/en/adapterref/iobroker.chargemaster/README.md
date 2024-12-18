![Logo](admin/chargemaster.png)

# ioBroker.chargemaster

[![NPM version](https://img.shields.io/npm/v/iobroker.chargemaster?style=flat-square)](https://www.npmjs.com/package/iobroker.chargemaster)
[![Downloads](https://img.shields.io/npm/dm/iobroker.chargemaster?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/iobroker.chargemaster)
![node-lts](https://img.shields.io/node/v-lts/iobroker.chargemaster?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.chargemaster?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/hombach/iobroker.chargemaster?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/hombach/iobroker.chargemaster?logo=github&style=flat-square)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.chargemaster/test-and-release.yml?branch=main&logo=github&style=flat-square)
[![CodeQL](https://github.com/hombach/ioBroker.chargemaster/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.chargemaster/actions/workflows/codeql-analysis.yml)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.chargemaster?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-chargemaster)
[![SNYK Known Vulnerabilities](https://snyk.io/test/github/hombach/ioBroker.chargemaster/badge.svg)](https://snyk.io/test/github/hombach/ioBroker.chargemaster)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.chargemaster.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/chargemaster-stable.svg)
![Installed](https://iobroker.live/badges/chargemaster-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.chargemaster.png?downloads=true)](https://nodei.co/npm/iobroker.chargemaster/)

## Adapter to manage one or multiple EV-chargers with use of PV-energy

**!!! THIS ADAPTER IS STILL REPRESENTING AN DEVELOPMENT STATE !!!**

Adapter to manage one or multiple EV-chargers (wallboxes) with use of PV surplus energy.

## Settings

To connect to the wallboxes type in the states with needed data in the config.

## Sentry

This adapter employs Sentry libraries to automatically report exceptions and code errors to the developers. For more details and information on how to disable error reporting, please consult the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is initiated starting with js-controller 3.0.

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=H5PMQ8JKQL7SL"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a>  
If you enjoyed this project — or just feeling generous, consider buying me a beer. Cheers! :beers:

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 0.12.5 (2024-12-12)

- (HombachC) switch to i18n translation (#572)
- (HombachC) implement ioBroker.eslint-config (#580)
- (HombachC) bump dependencies

### 0.12.4 (2024-11-23)

- (HombachC) implement better state change error handling

### 0.12.3 (2024-11-18)

- (HombachC) fix bug in state subscription
- (HombachC) harmonize project tools
- (HombachC) bump dependencies

### 0.12.2 (2024-10-27)

- (HombachC) migrate eslint to >9.x
- (HombachC) bumped dependencies

### 0.12.1 (2024-10-22)

- (HombachC) fix error in jsonConfig.json

### 0.12.0 (2024-10-22)

- (HombachC) BREAKING: dropped support for admin < 7 (#544)
- (HombachC) optimized responsive design (#544)
- (HombachC) optimized translation handling

### 0.11.1 (2024-09-16)

- (HombachC) add node.js 22 to the adapter testing matrix (#523)
- (HombachC) Bump @iobroker/testing to 5.0.0

### 0.11.0 (2024-08-29)

- (HombachC) implement variable wallbox amount
- (HombachC) fix errors in wallbox control
- (HombachC) complete rework of configuration screen
- (HombachC) move utils to extra class
- (HombachC) switch to ECMA 2022 code
- (HombachC) bumped dependencies

### 0.10.0 (2024-08-18)

- (HombachC) switch to Typescript
- (HombachC) change adapter type to "energy"
- (HombachC) replace deprecated setStateAsync

### 0.9.3 (2024-08-18)

- (HombachC) change translation handling
- (HombachC) code and repository cleanup
- (HombachC) prepare switch to Typescript

### 0.9.2 (2024-08-16)

- (HombachC) fixed vulnerability in dependency
- (HombachC) added tests for node 22

### 0.9.1 (2024-08-06)

- (HombachC) fixed issues detected by repository checker (#494)
- (HombachC) code cleanups

### 0.9.0 (2024-04-20)

- (HombachC) BREAKING: dropped support for node.js 16 (#455)
- (HombachC) BREAKING: js-controller >= 5 is required (#456)

### 0.8.5 (2024-03-27)

- (HombachC) updated CI definitions, switched to node 20 as main test scenario
- (HombachC) corrected io-package.json according to new schema
- (HombachC) bumped dependencies

### 0.8.4 (2023-12-29)

- (HombachC) BREAKING: dropped support for js-controller 3.x
- (HombachC) Year 2024 changes
- (HombachC) Bump axios to 1.6.3 because of vulnerability

### 0.8.3 (2023-10-29)

- (HombachC) Bumb adapter core to 3.x
- (HombachC) Bump axios to 1.6.0 because of vulnerability

### 0.8.2 (2023-10-01)

- (HombachC) Several dependency updates
- (HombachC) Fixed acknowledging of state changes (#339)

### 0.8.1 (2023-08-29)

- (HombachC) bumped dependencies, added min/max to settings state defaults

### 0.8.0 (2023-06-23)

- (HombachC) changed config screen to admin 5 solution

### 0.7.2 (2023-06-19)

- (HombachC) Removed Travis

### 0.7.1 (2023-06-13)

- (HombachC) Fixed typo in docu, added translations

### 0.7.0 (2023-06-11)

- (HombachC) BREAKING: dropped node.js 14 support
- (HombachC) Add tests for node.js 20, removed for node.js 14, bumped dependencies
- (HombachC) BREAKING: dropped ioBroker.admin 4 support

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## Tested with

- 3x go-E Charger & Kostal PikoBA

## License

MIT License

Copyright (c) 2021-2024 Christian Hombach

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
