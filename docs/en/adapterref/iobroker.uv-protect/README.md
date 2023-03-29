![Logo](admin/uv-protect.png)
# ioBroker.uv-protect

[![NPM version](http://img.shields.io/npm/v/iobroker.uv-protect.svg)](https://www.npmjs.com/package/iobroker.uv-protect)
[![Downloads](https://img.shields.io/npm/dm/iobroker.uv-protect.svg)](https://www.npmjs.com/package/iobroker.uv-protect)
![Number of Installations (latest)](http://iobroker.live/badges/uv-protect-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/uv-protect-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/simatec/ioBroker.uv-protect/badge.svg)](https://snyk.io/test/github/simatec/ioBroker.uv-protect)
![Test and Release](https://github.com/simatec/ioBroker.uv-protect/workflows/Test%20and%20Release/badge.svg)

[![License](https://img.shields.io/github/license/simatec/ioBroker.uv-protect?style=flat)](https://github.com/simatec/ioBroker.uv-protect/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mk1676)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/simatec)


## uv-protect adapter for ioBroker

UV-Protect from openUV-API

**************************************************************************************************************

**If you like it, please consider a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

**************************************************************************************************************

### What is Sentry.io and what is reported to the servers of that company?
Sentry.io is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or an other Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of this helps me to provide error free adapters that basically never crashs.

**************************************************************************************************************

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 0.4.0 (2023-03-18)
* (simatec) Dependencies updated
* (simatec) Repo updated

### 0.3.7 (2022-11-01)
* (simatec) Fix Axios Request
* (simatec) Dependencies updated

### 0.3.6 (2022-07-11)
* (simatec) Fix Request
* (simatec) timeout added
* (simatec) Dependencies updated

### 0.3.5 (2022-02-08)
* (simatec) Fix value types
* (simatec) Fix Axios Request
* (simatec) Dependencies updated

### 0.3.4 (2021-11-17)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 0.3.3 (31.07.2021)
* (simatec) Bugfix async/await function

### 0.3.2 (28.07.2021)
* (simatec) Bugfix

### 0.3.1 (28.06.2021)
* (simatec) Date / time formatted

### 0.3.0 (24.06.2021)
* (simatec) code cleaning
* (simatec) added translate to system language for states
* (simatec) Bugfix Timestamp
* (simatec) value formating
* (simatec) Dependencies updated
* (simatec) name for states updated

### 0.2.3 
* (simatec) apiKey auto encrypted

### 0.2.2
* (simatec) apiKey encrypted
* (simatec) fix async function

### 0.2.1
* (simatec) Fix for latest Repo

### 0.2.0
* (simatec) jsonConfig for Admin5 added

### 0.1.0
* (simatec) First Beta

### 0.0.1
* (simatec) initial release

## License
MIT License

Copyright (c) 2021 - 2023 simatec

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