![Logo](admin/tinker.png)

# ioBroker.tinker
---

[![NPM version](http://img.shields.io/npm/v/iobroker.tinker.svg)](https://www.npmjs.com/package/iobroker.tinker)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tinker.svg)](https://www.npmjs.com/package/iobroker.tinker)
![Number of Installations (latest)](http://iobroker.live/badges/tinker-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/tinker-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/simatec/ioBroker.tinker/badge.svg)](https://snyk.io/test/github/simatec/ioBroker.tinker)
![Test and Release](https://github.com/simatec/ioBroker.tinker/workflows/Test%20and%20Release/badge.svg)

[![License](https://img.shields.io/github/license/simatec/ioBroker.tinker?style=flat)](https://github.com/simatec/ioBroker.tinker/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mk1676)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/simatec)


Tinker Board Monitor adapter is Modified Version of Raspberry PI Monitor adapter and OrangePi Monitor adapter for ioBroker


## Support adapter development
**If you like it, please consider a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Important Information

tested Hardware: Asus Tinker Board


## Following Objects are available after selection:

### CPU
* cpu_frequency
* load1
* load5
* load15

### Memory
* memory_available
* memory_free
* memory_total

### Network (eth0)
* net_received
* net_send

### sdcard
* sdcard_root_total
* sdcard_root_used

### Swap
* swap_total
* swap_used

### Temperature
* soc_temp

### Uptime
* uptime

### WLAN
* wifi_received
* wifi_send

---

## Configuration
On configuration page you can select following modules:

* CPU
* Memory
* Network
* sdcard
* Swap
* Temperature
* Uptime
* WLAN

---

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 1.3.4 (2024-09-26)
* (simatec) Fix for Admin 7.1.5

### 1.3.3 (2024-09-21)
* (simatec) Dependencies updated
* (simatec) Docu updated
* (simatec) dev-server added
* (simatec) Repo Check fix
* (simatec) Design Fix

### 1.3.2 (2024-02-14)
* (simatec) Design Fix
* (simatec) Source code cleaned up

### 1.3.1 (2024-02-11)
* (simatec) Dependencies updated
* (simatec) Design Fix
* (simatec) Translation added
* (simatec) jsonConfig added
* (simatec) gulp deleted
* (simatec) adapter-dev added

### 1.3.0 (2024-01-07)
* (simatec) Dependencies updated
* (simatec) many smal Fix
* (simatec) Translation added

### 1.2.1 (2023-11-20)
* (simatec) Dependencies updated

### 1.2.0 (2023-03-18)
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Repo updated

### 1.1.1 (2021-11-18)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.1.0 (2020-04-08)
* (simatec) delete sync-exec
* (simatec) Rewritten code on child_process
* (simatec) code cleaned

### 1.0.0 (2020-04-07)
* (simatec) Release 1.0.0

### 0.1.3 (2019-03-14)
* (simatec) Ready for latest

### 0.1.1 (2019-01-08)
* Fix for new iobroker Installer

### 0.1.0 (2018-07-03)
* First Beta

### 0.0.1 (2018-07-03)
* initial Version

## License

The MIT License (MIT)

Copyright (c) 2018-2024 simatec

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
