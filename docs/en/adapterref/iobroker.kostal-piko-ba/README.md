![Logo](admin/picoba.png)

# ioBroker.kostal-piko-ba

[![NPM version](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)](https://www.npmjs.com/package/iobroker.kostal-piko-ba)
[![Downloads](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/iobroker.kostal-piko-ba)
![node-lts](https://img.shields.io/node/v-lts/iobroker.kostal-piko-ba?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.kostal-piko-ba?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/hombach/iobroker.kostal-piko-ba?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.kostal-piko-ba/test-and-release.yml?branch=main&logo=github&style=flat-square)
[![CodeQL](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-kostal-piko-ba)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/kostal-piko-ba-stable.svg)
![Installed](https://iobroker.live/badges/kostal-piko-ba-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)](https://nodei.co/npm/iobroker.kostal-piko-ba/)

## Adapter for Reading Kostal Piko & Piko BA Data for iOBroker

This adapter allows for reading data from Kostal Piko, Piko BA, and PIKO MP plus inverters.
It creates and sequentially updates several states, ensuring that the latest information is always available.
The adapter is specifically designed for Kostal Piko BA, 6.0BA, 8.0BA, and 10BA inverters, but it also supports a wide range of other models, including:

- Kostal Piko: 3.0, 4.2, 4.6, 5.5, 7.0, 8.5, 10, 12, 15, 17, 20, and 36.
- Kostal PIKO MP: 1.5, 3.0, 3.6.
- Kostal PIKO MP plus: 1.5-1, 2.0-1, 2.5-1, 3.0-1, 3.0-2, 3.6-1, 3.6-2 and 5.0-2.

We appreciate any feedback on functionality with other inverters. Please send us a note if you test it with additional models.

## Configuration

Ensure that your Piko or Piko BA inverter is updated to Kostal UI version 6.11 or higher.
To connect to the Kostal Piko (BA / MP plus) inverter, you must configure its IP address in the settings.
Optionally, you can adjust the update frequencies for live data, daily statistics, and lifetime statistics.
If your hardware supports it, you can also enable the read-out of the four analog values.

## Sentry

This adapter employs Sentry libraries to automatically report exceptions and code errors to the developers. For more details and information on how to disable error reporting, please consult the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is initiated starting with js-controller 3.0.

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=XFFBB332R4RCQ"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a>  
If you enjoyed this project — or just feeling generous, consider buying me a beer. Cheers! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 6.0.2 (2025-09-14)

- (HombachC) update axios (#829)
- (HombachC) min admin 7.6.17 as recommended (#817)
- (HombachC) bump dependencies

### 6.0.1 (2025-08-17)

- (HombachC) bump TypeScript to 5.9
- (HombachC) add test for node.js 24 (#801)
- (HombachC) bump dependency with security vulnerability

### 6.0.0 (2025-05-04)

- (HombachC) BREAKING: Dropped support for Node.js 18 (#797)
- (HombachC) BREAKING: Dropped support for js-controller 5 (#797)
- (HombachC) bump dependencies

### 5.1.2 (2025-03-22)

- (HombachC) fix vulnerability in axios (#786)
- (HombachC) bump dependencies

### 5.1.1 (2025-03-05)

- (HombachC) bump dependencies

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2025 C.Hombach <Kostal-Piko-BA@homba.ch>

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
