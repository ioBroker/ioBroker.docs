![Logo](admin/pegelalarm.png)
# ioBroker.pegelalarm

[![NPM version](http://img.shields.io/npm/v/iobroker.pegelalarm.svg)](https://www.npmjs.com/package/iobroker.pegelalarm)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pegelalarm.svg)](https://www.npmjs.com/package/iobroker.pegelalarm)
![Number of Installations (latest)](http://iobroker.live/badges/pegelalarm-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/pegelalarm-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/simatec/ioBroker.pegelalarm/badge.svg)](https://snyk.io/test/github/simatec/ioBroker.pegelalarm)
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
### 1.3.8 (2025-02-22)
* (simatec) Dependencies updated
* (simatec) small Fix

### 1.3.7 (2025-01-09)
* (simatec) eslint-config fix
* (simatec) Dependencies updated
* (simatec) Update License

### 1.3.6 (2024-11-25)
* (simatec) Dependencies updated
* (simatec) Issue Action added
* (simatec) eslint-config added

### 1.3.5 (2024-09-21)
* (simatec) small fix

### 1.3.4 (2024-09-20)
* (simatec) Dependencies updated
* (simatec) dev-server added
* (simatec) small fix
* (simatec) Responsive Design added

### 1.3.3 (2024-02-08)
* (simatec) Dependencies updated
* (simatec) Design Fix
* (simatec) gulp deleted
* (simatec) adapter-dev added
* (simatec) Translation updated

### 1.3.2 (2023-11-20)
* (simatec) Dependencies updated

### 1.3.1 (2023-09-04)
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Translation updated

### 1.3.0 (2023-03-18)
* (simatec) Dependencies updated
* (simatec) Repo updated

### 1.2.9 (2022-11-01)
* (simatec) Dependencies updated

### 1.2.8 (2022-06-27)
* (simatec) Bugfix delete stations
* (simatec) Bugfix stations
* (simatec) Dependencies updated

### 1.2.7 (2022-04-25)
* (simatec) Bugfix delete stations

### 1.2.6 (2022-04-25)
* (simatec) Bugfix delete stations
* (simatec) Dependencies updated

### 1.2.5 (2021-12-08)
* (simatec) Bugfix Adapter stop after request error
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.2.4 (2021-11-17)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.2.3 (2021-09-02)
* (simatec) Bugfix States

### 1.2.2 (2021-09-02)
* (simatec) Bugfix States

### 1.2.1 (2021-09-02)
* (simatec) Bugfix API-Request
* (simatec) dependencies updated
* (simatec) small Bugfixes

### 1.2.0 (2021-04-29)
* (simatec) Redesign Gui

### 1.1.7 (2021-04-10)
* (simatec) Bugfix Adapter stop
* (simatec) Bugfix clean old stations

### 1.1.6 (2021-04-09)
* (simatec) Bugfix for latest Repo

### 1.1.5 (2021-04-07)
* (simatec) fetch added
* (simatec) sentry added

### 1.1.4 (2021-04-02)
* (simatec) Improved code for request from measuring stations

### 1.1.3 (2021-03-31)
* (simatec) Settings for 5 measuring station added
* (simatec) Bugfix

### 1.1.2 (2021-03-29)
* (simatec) allStationsJSON state added
* (simatec) code rewritten
* (simatec) small Bugfix
* (simatec) axios added

### 1.1.1 (2021-03-28)
* (simatec) json state added
* (simatec) Configuration menu redesigned
* (simatec) unit added
* (simatec) many small Bugfix
* (simatec) Translations added

### 1.1.0 (2021-03-27)
* (simatec) fork from bazidibavaria
* (simatec) code rewritten
* (simatec) dependencies updated
* (simatec) Bugfix setState
* (simatec) Bugfix getState
* (simatec) License updated

### 1.0.0 (2020-09-01)
* (bazidibavaria) updated packages

### 0.0.1 (2020-08-27)
* (bazidibavaria) released

### 0.0.1-2 (2020-08-10)
* (bazidibavaria) fix api-count in index_m.html

### 0.0.1-1 (2020-08-10)
* (bazidibavaria) added travis support
* (bazidibavaria) add images to readme

### 0.0.1-0 (2020-08-10)
* (bazidibavaria) prerelease

## License
MIT License

Copyright (c) 2020 - 2025 simatec

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