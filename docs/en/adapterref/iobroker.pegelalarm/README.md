![Logo](admin/pegelalarm.png)
# ioBroker.pegelalarm

[![NPM version](http://img.shields.io/npm/v/iobroker.pegelalarm.svg)](https://www.npmjs.com/package/iobroker.pegelalarm)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pegelalarm.svg)](https://www.npmjs.com/package/iobroker.pegelalarm)
![Number of Installations (latest)](http://iobroker.live/badges/pegelalarm-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/pegelalarm-stable.svg)
![Test and Release](https://github.com/simatec/ioBroker.pegelalarm/workflows/Test%20and%20Release/badge.svg)
[![License](https://img.shields.io/github/license/simatec/ioBroker.pegelalarm?style=flat)](https://github.com/simatec/ioBroker.pegelalarm/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mk1676)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/simatec)


## Pegelalarm adapter for ioBroker
Provides data from Pegelalarm-API (v1.0)

API-Documentation for API 1.1 can be found here
https://github.com/SOBOS-GmbH/pegelalarm_public_pas_doc/wiki/Download-current-water-data

**************************************************************************************************************

### What is Sentry.io and what is reported to the servers of that company?
Sentry.io is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or an other Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of this helps me to provide error free adapters that basically never crashs.

**************************************************************************************************************

**If you like it, please consider a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

**************************************************************************************************************

## Changelog
<!--### __WORK IN PROGRESS__-->
### 1.5.0 (2026-08-19)
* (copilot) Adapter requires node.js >= 22 now
* (simatec) dependencies updated
* (simatec) Fix setTimeout

### 1.4.0 (2026-04-22)
* (simatec) dependencies updated
* (simatec) Request Fix
* (simatec) Timeout Fix
* (simatec) Source code rewritten,
* (simatec) Source code improved
* (simatec) Station names fixed
* (simatec) Header added

### 1.3.13 (2026-03-29)
* (simatec) Fix License
* (simatec) dependencies updated

### 1.3.12 (2025-11-23)
* (simatec) dependencies updated

### 1.3.11 (2025-11-02)
* (simatec) dependencies updated
* (simatec) Fix npm publish

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020 - 2026 simatec

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