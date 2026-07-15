![Logo](admin/amtronwallbox.png)
# ioBroker.amtronwallbox

![Number of Installations](http://iobroker.live/badges/amtronwallbox-installed.svg) ![Number of Installations](http://iobroker.live/badges/amtronwallbox-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.amtronwallbox.svg)](https://www.npmjs.com/package/iobroker.amtronwallbox)
[![NPM version](http://img.shields.io/npm/v/iobroker.amtronwallbox.svg)](https://www.npmjs.com/package/iobroker.amtronwallbox)

[![Known Vulnerabilities](https://snyk.io/test/github/rg-engineering/ioBroker.amtronwallbox/badge.svg)](https://snyk.io/test/github/rg-engineering/ioBroker.amtronwallbox)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.amtronwallbox/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.amtronwallbox.png?downloads=true)](https://nodei.co/npm/iobroker.amtronwallbox/)

![node-lts](https://img.shields.io/node/v-lts/iobroker.amtronwallbox?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.amtronwallbox?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.amtronwallbox?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.amtronwallbox?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.amtronwallbox?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.amtronwallbox?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/rg-engineering/ioBroker.amtronwallbox?logo=github&style=flat-square)


**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.


**If you like it, please consider a donation:**
                                                                          
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC) 

The adapter serves as an interface to various [Amtron wallboxes](https://www.mennekes.de/emobility/produkte/amtron-wallboxen/). The data provided by the box is read out and made available as a data point in the adapter. 
The data is only processed locally, a cloud connection is not necessary. For wallboxes that also support write access, the adapter can write data (e.g. charging current).
The following Amtron wallboxes are supported:
* Amtron Xtra
* Amtron ChargeControl
* Amtron Compact

The adapter can manage multiple boxes.

If you own a wallbox that is not supported yet, please contact the developer.

## Configuration
Only the type of box, its IP address and, if necessary, an API key need to be configured.

![Configuration](/admin/docs/Amtron_Config.PNG)


Note: Since the boxes have different interfaces, it may be that not all interfaces work directly. In this case please contact the developer. 

## known issues
* please create issues at [github](https://github.com/rg-engineering/ioBroker.amtronwallbox/issues) if you find bugs or whish new features.
   
## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.0.0 (2026-04-25)
* (René) see issue ##423: parser for ChargeControl overworked, compatibility with new datapoints of v5.33 of wallbox firmware
* (René) adapter rewritten in typescript

### 0.3.6 (2026-03-15)
* (René) update dependencies + changes based on adapter checker

### 0.3.5 (2025-10-26)
* (René) bug fix sentry

### 0.3.4 (2025-10-21)
* (René) update dependencies + changes based on adapter checker

### 0.3.3 (2025-10-04)
* (René) update dependencies + changes based on adapter checker

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2022-2026 René G. <info@rg-engineering.eu>

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
