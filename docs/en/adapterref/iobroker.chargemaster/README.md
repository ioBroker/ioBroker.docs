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

### 0.13.2 (2025-03-22)

- (HombachC) fix axios vulnerability
- (HombachC) bump dependencies

### 0.13.1 (2025-03-06)

- (HombachC) bump dependencies

### 0.13.0 (2025-02-23)

- (HombachC) bump needed admin to 7.4.10 as recommended by ioBroker (#623)

### 0.12.9 (2025-02-23)

- (HombachC) Bump @iobroker/adapter-dev to 1.4.0 (#621)
- (HombachC) Using "@alcalzone/release-script" (#624)

### 0.12.8 (2025-02-16)

- (HombachC) Sentry changes
- (HombachC) bump dependencies

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## Tested with

- 3x go-E Charger & Kostal PikoBA

## License

MIT License

Copyright (c) 2021-2025 Christian Hombach

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
