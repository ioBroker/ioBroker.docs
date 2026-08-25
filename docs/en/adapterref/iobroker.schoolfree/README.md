![Logo](admin/schoolfree.png)
# ioBroker.schoolfree

![Number of Installations](http://iobroker.live/badges/schoolfree-installed.svg) ![Number of Installations](http://iobroker.live/badges/schoolfree-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.schoolfree.svg)](https://www.npmjs.com/package/iobroker.schoolfree)
[![Downloads](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)](https://www.npmjs.com/package/iobroker.schoolfree)
[![Known Vulnerabilities](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)](https://snyk.io/test/github/simatec/ioBroker.schoolfree)
![Test and Release](https://github.com/simatec/ioBroker.schoolfree/workflows/Test%20and%20Release/badge.svg)

[![License](https://img.shields.io/github/license/simatec/ioBroker.schoolfree?style=flat)](https://github.com/simatec/ioBroker.schoolfree/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mk1676)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/simatec)


This adapter uses the service Sentry.io to automatically report exceptions and code errors and new device schemas to me as the developer. More details see below!


## schoolfree adapter for ioBroker


**If you like it, please consider a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)


*************************************************************************************************************************************

### description:

Schoolfree is an adapter for iobroker installations.
With the adapter, the school holidays can be evaluated and transferred to data points.
The data points can thus be evaluated and processed for other functions such as heating controls, shutter and presence controls.

The current subscription for school holidays is via the API of https://www.mehr-schulferien.de

Currently, the school holidays and days off for Germany are supported.

The following data points are available for further processing with Schoolfree:

* info.current.end: Date for the end of the current holidays
* info.current.name: name of the current school holidays
* info.current.start: Start date of the current holiday
* info.next.end: Date for the end of the next holidays
* info.next.name: name of the next school holidays
* info.next.start: Start date of the next holiday
* info.today: Switch for the current status today (true / false)
* info.tomorrow: switch for the current status tomorrow (true / false)


### What is Sentry.io and what is reported to the servers of that company?
Sentry.io is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or an other Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of this helps me to provide error free adapters that basically never crashs.


*************************************************************************************************************************************

## Changelog
<!--### __WORK IN PROGRESS__-->
### 2.1.0 (2026-08-18)
* (copilot) Adapter requires node.js >= 22 now
* (simatec) dependencies updated

### 2.0.0 (2026-04-06)
* (simatec) Breaking Changes - API Update to v2.1
* (simatec) Update locations
* (simatec) Fix Test & Release

### 1.1.14 (2026-03-29)
* (simatec) Readme updated
* (simatec) Fix License
* (simatec) dependencies updated

### 1.1.13 (2025-11-18)
* (simatec) dependencies updated
* (simatec) update npm publish

### 1.1.12 (2025-08-31)
* (simatec) small fix
* (simatec) dependencies updated

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2019 - 2026 simatec

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