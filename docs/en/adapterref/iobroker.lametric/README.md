---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.lametric?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.lametric?label=npm%20downloads&style=flat-square
BADGE-Snyk Vulnerabilities for npm package: https://img.shields.io/snyk/vulnerabilities/npm/iobroker.lametric?label=npm%20vulnerabilities&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.lametric?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.lametric?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.lametric?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.lametric/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/klein0r/iobroker.lametric?label=repo%20vulnerabilities&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.lametric.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/lametric-stable.svg
BADGE-Installed: http://iobroker.live/badges/lametric-installed.svg
chapters: {"pages":{"en/adapterref/iobroker.lametric/README.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/README.md"},"en/adapterref/iobroker.lametric/apps.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/apps.md"},"en/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/my-data-diy.md"},"en/adapterref/iobroker.lametric/notifications.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/notifications.md"},"en/adapterref/iobroker.lametric/blockly.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/blockly.md"}}}
---
![Logo](../../admin/lametric.png)

# ioBroker.lametric

## Table of contents

- [Apps](apps.md)
- [Blockly](blockly.md)
- [My Data DIY](my-data-diy.md)
- [Notifications](notifications.md)

## Requirements

- nodejs 14.5 (or later)
- js-controller 4.0.15 (or later)
- Admin Adapter 6.0.0 (or later)
- _LaMetric Time_ with firmware _2.3.6_ (_3.0.16_ on the 2022 model) (or later)

[Firmware-Changelog](https://firmware.lametric.com) [Firmware-Changelog Time2](https://firmware.lametric.com/?product=time2)

## Configuration

You can get your device API key [here](https://developer.lametric.com/user/devices).

![api-key](./img/api-key.png)

## Features

- Set display brightness (percent, auto-mode/manual-mode)
- Set audio volume (percent)
- Configure screensaver (enable/disable, time based, when dark)
- Activate/Deactivate bluetooth and change bluetooth name
- Switch between apps (next, previous, go to specific app)
- Send notifications with blockly (with configurable priority, sound, icons, text, ...)
- Control special apps like `clock`, `radio`, `stopwatch` or `weather`
- Use _My Data (DIY)_ LaMetric App to display persistent information

Features are limited by the [official API features](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/lametric-time-reference.html).

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (klein0r) Added push option for My Data DIY
* (klein0r) Added option to force app reload
* (klein0r) Updated LaMetric firmware version recommendation to 2.3.6 (3.0.16)

### 2.4.2 (2023-09-08)

* (klein0r) Updated LaMetric firmware version recommendation to 2.3.6

### 2.4.1 (2023-06-10)

* (klein0r) Blockly bugfix

### 2.4.0 (2023-05-10)

* (klein0r) Allow to change device mode via state (manual, auto, kiosk, schedule)
* (klein0r) Added state for available firmware update
* (klein0r) Updated LaMetric firmware version recommendation to 2.3.5

### 2.3.2 (2023-02-21)

* (klein0r) Optimized setState logic

### 2.3.1 (2023-02-21)

* (klein0r) Update My Data DIY when object changes data type

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