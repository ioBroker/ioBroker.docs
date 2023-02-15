---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.birthdays?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.birthdays?label=npm%20downloads&style=flat-square
BADGE-Snyk Vulnerabilities for npm package: https://img.shields.io/snyk/vulnerabilities/npm/iobroker.birthdays?label=npm%20vulnerabilities&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.birthdays?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.birthdays?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.birthdays?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.birthdays?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.birthdays?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.birthdays?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.birthdays?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/workflow/status/klein0r/iobroker.birthdays/Test%20and%20Release?label=Test%20and%20Release&logo=github&style=flat-square
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/klein0r/iobroker.birthdays?label=repo%20vulnerabilities&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.birthdays.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/birthdays-stable.svg
BADGE-Installed: http://iobroker.live/badges/birthdays-installed.svg
chapters: {"pages":{"en/adapterref/iobroker.birthdays/README.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/README.md"},"en/adapterref/iobroker.birthdays/ical.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/ical.md"},"en/adapterref/iobroker.birthdays/carddav.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/carddav.md"},"en/adapterref/iobroker.birthdays/blockly.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/blockly.md"},"en/adapterref/iobroker.birthdays/javascript.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/javascript.md"}}}
---
![Logo](../../admin/birthdays.png)

# ioBroker.birthdays

## Table of contents

- [iCal](ical.md)
- [CardDAV](carddav.md)
- [Blockly](blockly.md)
- [JavaScript](javascript.md)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.2.1 (2023-02-13)

NodeJS 14.5 is required

* (klein0r) Allow spaces in text separator
* (klein0r) Added Ukrainian language

### 2.2.0 (2022-12-12)

* (klein0r) Dropped Admin 5 support
* (klein0r) Added Ukrainian language

### 2.1.0 (2022-05-31)

* (klein0r) Added username and password option for iCal

### 2.0.0 (2022-05-16)

NodeJS 14.x is required (NodeJS 12.x is EOL)

* (klein0r) Added next significant birthdays
* (klein0r) Allow to use local ical files by path
* (klein0r) Updated depedency for js-controller to 4.0.15

### 1.2.1 (2022-04-08)

* (klein0r) Removed tsdav
* (klein0r) Allow carddav url without valid certificate (configurable)

## License

The MIT License (MIT)

Copyright (c) 2023 Matthias Kleine <info@haus-automatisierung.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.