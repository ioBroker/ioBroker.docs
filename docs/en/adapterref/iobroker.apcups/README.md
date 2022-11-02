![Logo](admin/ups.png)
# ioBroker.apcups

[![NPM version](https://img.shields.io/npm/v/iobroker.apcups.svg)](https://www.npmjs.com/package/iobroker.apcups)
[![Downloads](https://img.shields.io/npm/dm/iobroker.apcups.svg)](https://www.npmjs.com/package/iobroker.apcups)
![Number of Installations (latest)](https://iobroker.live/badges/apcups-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.apcups.png?downloads=true)](https://nodei.co/npm/iobroker.apcups/)

**Tests:** [![Test and Release](https://github.com/xhunter74/ioBroker.apcups/actions/workflows/main.yml/badge.svg)](https://github.com/xhunter74/ioBroker.apcups/actions/workflows/main.yml)

## Apc UPS adapter for ioBroker

Adapter for ioBroker to get information from APS UPSs via apcupsd.

apcupsd home page: http://www.apcupsd.org/

apcupsd is a daemon for controlling APC UPSes. Using this adaptor you can monitor UPS status and make some decisions based on the provided information.

**Install apcupsd on Ubuntu:**

sudo apt-get -y install apcupsd

More useful information about apcupsd config for Ubuntu you can find on https://help.ubuntu.com/community/apcupsd

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
## Changelog

### 1.0.2 (2022-10-21)
 - Fixed issue: Failed to unload iobroker.apcups with exception "Error: write after end"
### 1.0.1 (2022-10-13)
 - Fixed issue: Failed to unload iobroker.apcups with exception "Error: write after end"
### 1.0.0 (2022-04-26)
 - Fixed sentry issues
### 0.0.9 (2022-02-21)
 - Changed adapter type
### 0.0.8 (2022-02-18)
 - Fixed review issues
### 0.0.7 (2022-02-18)
 - Changed default log level to 'info'
### 0.0.6 (2022-02-17)
 - Cleanup code.
 - Sentry integration
### 0.0.5 (2022-02-16)
 - Fixed issues with uncaught exception.
### 0.0.4 (2022-01-12)
 - Fixed issue with polling interval greater than 15 sec.
### 0.0.3 (2021-10-18)
 - Fixed parse values bugs.
### 0.0.2 (2021-09-13)
 - Initial commit. Alpha Version. 

### **WORK IN PROGRESS**
* (Author) initial release

## License
MIT License

Copyright (c) 2022 Serhiy Krasovskyy xhunter74@gmail.com"

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