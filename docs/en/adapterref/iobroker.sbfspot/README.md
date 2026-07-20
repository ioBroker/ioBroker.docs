![Logo](admin/sbfspot.png)
# ioBroker.sbfspot

![Number of Installations](http://iobroker.live/badges/sbfspot-installed.svg) ![Number of Installations](http://iobroker.live/badges/sbfspot-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)](https://www.npmjs.com/package/iobroker.sbfspot)
[![NPM version](http://img.shields.io/npm/v/iobroker.sbfspot.svg)](https://www.npmjs.com/package/iobroker.sbfspot)

[![Known Vulnerabilities](https://snyk.io/test/github/rg-engineering/ioBroker.sbfspot/badge.svg)](https://snyk.io/test/github/rg-engineering/ioBroker.sbfspot)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.sbfspot/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)](https://nodei.co/npm/iobroker.sbfspot/)

![node-lts](https://img.shields.io/node/v-lts/iobroker.sbfspot?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.sbfspot?label=npm%20dependencies&style=flat-square)


![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.sbfspot?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.


**If you like it, please consider a donation:**
                                                                          
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC) 

This adapter reads data from SMA power inverters using sbfspot.
Now both database types (mySQL and sqlite) are supported.
Since version 0.2.3 there is a own vis widget based on flot available to show historical data.

## Installation / Update

please follow installation instructions for sbfspot under https://github.com/SBFspot/SBFspot/wiki


in /opt/iobroker/node_modules/iobroker.sbfspot/lib/scripts you can find a scripts to install and update SBFspot on debian based systems.


## Hints
* use latest version from sbfspot from https://github.com/SBFspot/SBFspot 
* adapter, sbfspot and databases (mySQL or sqlite) must run on the same system e.g. Raspberry PI
* installation manual for sbfspot on Raspberry Pi (or similar) can be found under https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite or https://www.rg-engineering.eu/index.php/produkte/software/plugin-fuer-iobroker-sbfspot
* for Raspberry Pi there is a semi-automated configuration tool available under https://github.com/SBFspot/sbfspot-config

## known issues



* please create issues at [github](https://github.com/rg-engineering/ioBroker.sbfspot/issues) if you find bugs or whish new features

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 5.0.7 (2026-07-09)
* (copilot) Adapter requires node.js >= 22 now
* (René) update dependencies
* (René) changes based on adapter checker

### 5.0.6 (2026-04-06)
* (René) changes based on adapter checker

### 5.0.5 (2026-03-17)
* (René) update dependencies + changes based on adapter checker

### 5.0.4 (2025-10-26)
* (René) bug fix sentry

### 5.0.3 (2025-10-21)
* (René) see issue #510: read interval minimum reduced to 1 minute
* (René) update dependencies + changes based on adapter checker

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2017-2026 René G. <info@rg-engineering.eu>

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
