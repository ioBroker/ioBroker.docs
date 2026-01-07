![Logo](admin/ups.png)
# ioBroker.apcups

[![NPM version](https://img.shields.io/npm/v/iobroker.apcups.svg)](https://www.npmjs.com/package/iobroker.apcups)
[![Downloads](https://img.shields.io/npm/dm/iobroker.apcups.svg)](https://www.npmjs.com/package/iobroker.apcups)
![Number of Installations (latest)](https://iobroker.live/badges/apcups-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/apcups-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.apcups.png?downloads=true)](https://nodei.co/npm/iobroker.apcups/)

**Tests:** [![Test and Release](https://github.com/xhunter74/ioBroker.apcups/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/xhunter74/ioBroker.apcups/actions/workflows/test-and-release.yml)

## Apc UPS adapter for ioBroker

Adapter for ioBroker to get information from APS UPSs via apcupsd.

apcupsd home page: http://www.apcupsd.org/

apcupsd is a daemon for controlling APC UPSes. Using this adaptor you can monitor UPS status and make some decisions based on the provided information.

**Install apcupsd on Ubuntu:**

sudo apt-get -y install apcupsd

More useful information about apcupsd config for Ubuntu you can find on https://help.ubuntu.com/community/apcupsd

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
## Changelog
### 5.0.5 (2025-12-25)
  - Fixed admin layout
  - Updated dependencies
### 5.0.3 (2025-10-16)
  - Migration to Trusted Publishing
### 5.0.2 (2025-10-10) 
 - Updated dependencies
### 5.0.0 (2025-05-01)
 - BREAKING! Changed the minimal version of nodejs to 20. Updated dependencies.
### 4.0.5 (2025-03-01) 
 - Updated dependencies
### 4.0.2 (2024-10-16) 
 - Updated dependencies
 - Adjusted admin layout
### 4.0.0 (2024-05-10)
 - BREAKING! 
1. Added support of multiple UPS so states structure was changed. All existed states will be deleted. Please do backup before upgrade the adapter! Also existed configuration will be lost. Please re-configure the adapter and add one or more devices to it.
2. Minimal js-controller version is 5.0.19
3. Minimal admin version is 6.13.16

## License
MIT License

Copyright (c) 2025-2026 Serhiy Krasovskyy xhunter74@gmail.com"

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
