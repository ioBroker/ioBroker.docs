---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.statistics?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.statistics?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.statistics?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.statistics?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.statistics?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.statistics/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.statistics.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/statistics-stable.svg
BADGE-Installed: http://iobroker.live/badges/statistics-installed.svg
---
![Logo](../../admin/statistics.png)

# ioBroker.statistics

This adapter will make the configuration of statistics easier.

**The adapter only reacts on state changes (state.ack = true), not on commands!**

Choose from the following settings:

* count impulses or on/off changes (Only for binary values and positive edge)
* calculate costs from the counted values (Only for binary values)
* how long was status true/ON and how long false/OFF (Only for binary values)
* delta between logged analogue values (Only for analog values)
* daily max, min and average (Not for delta calculations)
* min/max over the year
* counts within 5 min and daily max, min and average of it (Not for delta calculations)
* sum up of grouped values

The adapter subscribes to the configured objects and creates his own states in the statistics tree.

2 separate trees are created:
* `statistics.0.save` -> final values of the time frame
* `statistics.0.temp` -> temporary values up to the moment of transfer to save, then temp starts again

The structure of the state is: `statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

## Settings

* specify the relevant groups in the instance configuration page (admin => instances => statistics config)
* specify the configuration in the settings of the state (admin => objects)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__

* (@klein0r) Added option to use a weighted average (based on time delta between changes)
* (@klein0r) Optimized avg calculation (without using a sum)
* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required

### 4.0.0 (2025-04-16)
NodeJS >= 20.x and js-controller >= 6 is required

### 3.1.0 (2024-11-18)

* (@simatec) Added responsive jsonConfig
* (@klein0r) Copy unit of source state to all statistic states

### 3.0.0 (2024-11-15)
NodeJS >= 18.x and js-controller >= 5 is required

### 2.4.0 (2023-11-03)
NodeJS 16.x is required

* (klein0r) Show error if groups are not configured correctly
* (klein0r) Fixed cron expressions for quarter and year
* (klein0r) Added indicators for startup and working

### 2.3.1 (2023-01-11)
* (klein0r) Added Ukrainian language

## License

The MIT License (MIT)

Copyright (c) 2018-2025 foxthefox <foxthefox@wysiwis.net>,
                        bluefox <dogafox@gmail.com> and
                        Matthias Kleine <info@haus-automatisierung.com>

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