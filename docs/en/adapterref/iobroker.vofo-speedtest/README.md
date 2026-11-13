![Logo](admin/vofo-speedtest.png)
# ioBroker.vofo-speedtest

[![GitHub license](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.vofo-speedtest)](https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/blob/master/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vofo-speedtest.svg)](https://www.npmjs.com/package/iobroker.vofo-speedtest)
![GitHub repo size](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.vofo-speedtestd)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/vofo-speedtest/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.vofo-speedtest)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.vofo-speedtest/latest)
![GitHub last commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.vofo-speedtest)
![GitHub issues](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.vofo-speedtest)

**Version:**

[![NPM version](http://img.shields.io/npm/v/iobroker.vofo-speedtest.svg)](https://www.npmjs.com/package/iobroker.vofo-speedtest)
![Current version in stable repository](https://iobroker.live/badges/vofo-speedtest-stable.svg)
![Number of Installations](https://iobroker.live/badges/vofo-speedtest-installed.svg)

**Tests:**

[![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/actions/workflows/test-and-release.yml)
[![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/actions/workflows/github-code-scanning/codeql)

## vofo-speedtest adapter for ioBroker

Speedtest of Vodafone.de

Implements same as technique as https://speedtest.vodafone.de

The test also runs on connections of other providers. Vodafone reports the booked speed only for its own customers, so without a Vodafone connection `downstreamBooked` and `upstreamBooked` stay empty, and the widgets show no percentage of the booked speed.

## Starting a test

The adapter runs permanently and starts the test itself:

- by the schedule in the instance settings (default: at minute 11 and 41 of every hour); leave it empty to start tests only on demand,
- when `true` is written to `vofo-speedtest.0.test.start`, e.g. by the button in the instance settings or of the widgets, or by a script.

A start during a running test is ignored.

| State               | Meaning                                                                   |
|---------------------|---------------------------------------------------------------------------|
| `test.start`        | Write `true` to start a test                                              |
| `test.running`      | A test is in progress                                                     |
| `test.phase`        | Phase of the test: `init`, `download`, `upload`, `ping`, empty when idle  |
| `test.speed`        | Current speed during the download and the upload in Mb/s                  |
| `test.error`        | Error of the last test, empty if it succeeded. Also says if the ping server did not answer: download and upload are valid then |

## Widgets

The adapter brings the same view for three front-ends: gauges for download and upload, the percentage of the booked speed (if the provider reports it), ping, packet loss, the time of the last test and a button that starts a test. During a test the gauges show the current speed.

- **vis-2**: the widget set `vofo-speedtest`
- **ioBroker.devices**: a tile in the sizes 1x1, 2x0.5 and 2x1
- **Web component**: `<iob-vofo-speedtest>` for every host of `@iobroker/web-components`, e.g. Aura

## Credits
This adapter would not have been possible without the great work of Peter Baumert <ioBroker.unifi-protect@outlook.com> who implemented the inital release of this adapter.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (bluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`

### 3.0.1 (2026-11-08)
- (mcm1957) Issues detected by repositorychecker have been fixed

### 3.0.0 (2026-11-08)
- (copilot) BREAKING: Adapter requires node.js >= 22.19.0 now
- (copilot) BREAKING: Adapter requires admin >= 8.3.10 now
- (copilot) BREAKING: Adapter requires js-controller >= 6.0.11 now
- (bluefox) BREAKING: The adapter runs permanently now and starts the test by itself. A schedule changed in the instance settings is taken over
- (bluefox) BREAKING: The option "Use curl" has been removed. node-libcurl is not used anymore, download and upload run over node.js https
- (bluefox) Added: start a test with the state `test.start` (#153), and the states `test.running`, `test.phase`, `test.speed` and `test.error`
- (bluefox) Added: the instance settings show the result and the running test, with a button to start a test
- (bluefox) Added: `test.error` tells if the ping server did not answer
- (bluefox) Added: a vis-2 widget, a tile for ioBroker.devices and the web component `<iob-vofo-speedtest>`
- (bluefox) Fixed: upload values were missing without curl (#253)
- (bluefox) Fixed: the adapter did not stop if the API key could not be found on speedtest.vodafone.de, the next start failed with "already running" (#239, #208)
- (bluefox) Fixed: the download test without curl used outdated server paths
- (bluefox) The option "Local address" is evaluated now
- (bluefox) The adapter was refactored to TypeScript

### 2.0.1 (2024-04-29)
* (mcm1957) Dependencies have been updated

### 2.0.0 (2024-03-29)
* (mcm1957) BREAKING: Adapter requires node.js 18, js-controller >= 5 and admin >= 6 now
* (mcm1957) Adapter has been moved to iobroker-community-adapters organisation
* (mcm1957) Metrialize admin UI has been removed as jsonConfig is available
* (mcm1957) Dependencies have been updated

### 1.0.1 (2023-09-13)
* (bluefox) Updated packages and refactored code

## Disclaimer
Vodafone is a trademark of Vodafone GmbH. I am in no way endorsed by or affiliated with Vodafone GmbH, or any associated subsidiaries, logos or trademarks

## License
MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2023 Peter Baumert <ioBroker.unifi-protect@outlook.com>

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