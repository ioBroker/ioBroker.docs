---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.gira-iot?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.gira-iot?label=npm%20downloads&style=flat-square
BADGE-Snyk Vulnerabilities for npm package: https://img.shields.io/snyk/vulnerabilities/npm/iobroker.gira-iot?label=npm%20vulnerabilities&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.gira-iot?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.gira-iot?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.gira-iot?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.gira-iot?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.gira-iot?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.gira-iot?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.gira-iot?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/workflow/status/klein0r/iobroker.gira-iot/Test%20and%20Release?label=Test%20and%20Release&logo=github&style=flat-square
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/klein0r/iobroker.gira-iot?label=repo%20vulnerabilities&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.gira-iot.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/gira-iot-stable.svg
BADGE-Installed: http://iobroker.live/badges/gira-iot-installed.svg
---
![Logo](../../admin/gira-iot.png)

# ioBroker.gira-iot

## Getting started

- Install the iobroker.web adapter and create a new instance
- Configure HTTPS (secure) on that instance and choose the IP address which should be used for external connections
- Choose this web instance in the configuration of the gira-iot instance
- Configure IP, user name and password of your Gira X1 (or Home Server) in the instance
- Start the instance

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (klein0r) Url preview in instance configuration

### 0.2.1 (2023-01-11)

* (klein0r) Added Ukrainian language

### 0.2.0 (2022-12-12)

* (klein0r) Dropped Admin 5 support
* (klein0r) Added Ukrainian language

### 0.1.3 (2022-10-10)

* (klein0r) Update objects if configuration changed
* (klein0r) Fixed client registration for Gira Home Server

### 0.1.2 (2022-10-01)

* (klein0r) Improved callback registration handling
* (klein0r) Improved error handling

### 0.1.1 (2022-09-29)

* (klein0r) Changed registration of callbacks via web adapter
* (klein0r) Request current values on init
* (klein0r) Updated state roles

## License

MIT License

Copyright (c) 2023 Matthias Kleine <info@haus-automatisierung.com>

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