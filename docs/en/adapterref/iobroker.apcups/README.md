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

### 1.0.9 (2022-12-12)
 - Optimized reconnection flow
### 1.0.8 (2022-11-16)
 - Added validation on config screen
### 1.0.7 (2022-11-14)
 - Added validation on config screen
### 1.0.6 (2022-11-11)
 - Removed unnecessary Sentry call
### 1.0.5 (2022-11-10)
 - Optimized reconnection flow
### 1.0.4 (2022-11-09)
 - Added UPS host and port to Info folder 
### 1.0.3 (2022-11-07)
 - Fixed issue: unhandled exception for flush with closed socket
### 1.0.2 (2022-10-21)
 - Fixed issue: Failed to unload iobroker.apcups with exception "Error: write after end"

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