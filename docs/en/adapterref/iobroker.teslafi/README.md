![Logo](admin/teslafi.png)

# ioBroker.teslafi

[![NPM version](https://img.shields.io/npm/v/iobroker.teslafi.svg)](https://www.npmjs.com/package/iobroker.teslafi)
[![Downloads](https://img.shields.io/npm/dm/iobroker.teslafi.svg)](https://www.npmjs.com/package/iobroker.teslafi)
![node-lts](https://img.shields.io/node/v-lts/iobroker.teslafi?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.teslafi?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/hombach/iobroker.teslafi?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/hombach/iobroker.teslafi?logo=github&style=flat-square)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.teslafi/test-and-release.yml?branch=master&logo=github&style=flat-square)
[![CodeQL](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.teslafi?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-teslafi)
[![SNYK Known Vulnerabilities](https://snyk.io/test/github/hombach/ioBroker.teslafi/badge.svg)](https://snyk.io/test/github/hombach/ioBroker.teslafi)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.teslafi.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/teslafi-stable.svg)
![Installed](https://iobroker.live/badges/teslafi-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.teslafi.png?downloads=true)](https://nodei.co/npm/iobroker.teslafi/)

## Sentry

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable error reporting, see <a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">Sentry-Plugin Documentation</a>!

## ioBroker TeslaFi Adapter – Seamless Tesla Data Integration for Your Smart Home

The TeslaFi adapter enables effortless integration of vehicle data from your TeslaFi account into the ioBroker system. Leverage this data to enhance your Tesla experience and optimize home automation workflows.

## Why This Adapter?

The main purpose of this adapter is to integrate Tesla data into ioBroker without directly querying the vehicle's systems. By utilizing TeslaFi’s existing data polling, the adapter avoids additional requests to the vehicle, preserving battery life and ensuring efficient data access.

## Features

The adapter connects to the TeslaFi API to retrieve comprehensive details about your Tesla vehicle and makes this data accessible within ioBroker. All Tesla models supported by TeslaFi are fully compatible. Currently, the following data categories are available:

- **Thermal State**: Insights into the thermal management system and temperatures.
- **Battery State**: Information on battery status, charge level, and range.
- **Vehicle State**: General vehicle status, including position and overall condition.
- **Vehicle Data**: Vehicle-specific details such as name, and VIN.

## Typical Use Cases

- **Automation**: Trigger smart home actions based on the real-time status of your Tesla. For instance, automatically adjust home climate control when the vehicle arrives.
- **Energy Management**: Optimize energy consumption by scheduling vehicle charging times and monitoring battery status directly from ioBroker.
- **Notifications and Reporting**: Set up alerts for specific vehicle conditions, such as low battery level, completed charging sessions or available updates.

## Configuration

Configuring the adapter is straightforward:

1. Enter your TeslaFi API key in the adapter's configuration screen.
2. Set the desired polling interval to customize how frequently data is updated.

## Compatibility

The adapter is compatible with all Tesla models supported by TeslaFi. A valid TeslaFi account with API access is required.

## Active Development and User Contributions

The TeslaFi adapter is actively maintained, and additional features or data categories can be added based on user requests. Feel free to submit your ideas and help improve the adapter for the entire community!

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=6EE4YUJRK7UWC"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.teslafi/master/docu/bluePayPal.svg" height="40"></a>
If you enjoyed this project — or just feeling generous, consider buying me a beer. Cheers! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.0.3 (2026-07-05)

- (hombach) removed unneeded test devDependencies (chai, sinon-chai, proxyquire) and switched tests to Node.js assert
- (hombach) updated axios

### 3.0.2 (2026-06-19)

- (hombach) fixed warnings by adapter checker

### 3.0.1 (2026-06-05)

- (hombach) upgraded TypeScript to 6.x
- (hombach) fixed warnings by adapter checker
- (hombach) updated dependencies

### 3.0.0 (2026-05-05)

- (copilot) BREAKING: adapter requires node.js >= 22 now
- (hombach) update dependencies

### 2.0.7 (2026-04-12)

- (hombach) switch to ES2023 code
- (hombach) fix vulnerability in axios
- (hombach) update dependencies

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 C.Hombach <TeslaFi@homba.ch>

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
