---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.gira-iot?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.gira-iot?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.gira-iot?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.gira-iot?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.gira-iot?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.gira-iot?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.gira-iot?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.gira-iot?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.gira-iot?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.gira-iot/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.gira-iot.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/gira-iot-stable.svg
BADGE-Installed: http://iobroker.live/badges/gira-iot-installed.svg
---
![Logo](../../admin/gira-iot.png)

# ioBroker.gira-iot

## Compatible devices

- Gira X1
- Gira Homeserver (recommended firmware >=4.12)
- Gira One Server

## Getting started

- Install the [iobroker.web](https://github.com/ioBroker/ioBroker.web) adapter and create a new instance
- Configure HTTPS (secure) on that instance and choose the IP address which should be used for external connections
- Choose this web instance in the configuration of the `gira-iot` instance
- Configure IP, user name and password of your Gira X1 (or Home Server) in the instance
- Start the instance

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required
* (@klein0r) Updated dependencies

### 0.6.1 (2025-05-02)

NodeJS >= 20.x and js-controller >= 6 is required

### 0.5.0 (2024-03-28)

NodeJS >= 18.x and js-controller >= 5 is required

### 0.4.0 (2023-10-02)

* (klein0r) Added types for remote access (not documented by Gira)
* (klein0r) Added option for custom callback url (e.g. in Docker environments)

### 0.3.0 (2023-09-13)

* (klein0r) Url preview in instance configuration
* (klein0r) Improved error handling

### 0.2.1 (2023-01-11)

* (klein0r) Added Ukrainian language

## License

MIT License

Copyright (c) 2025-2026 Matthias Kleine <info@haus-automatisierung.com>

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