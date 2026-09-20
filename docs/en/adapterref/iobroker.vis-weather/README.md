![Logo](admin/vis-weather.png)
# ioBroker.vis-weather

![Number of Installations](http://iobroker.live/badges/vis-weather-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-weather-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-weather.svg)](https://www.npmjs.com/package/iobroker.vis-weather)
[![NPM version](http://img.shields.io/npm/v/iobroker.vis-weather.svg)](https://www.npmjs.com/package/iobroker.vis-weather)

[![Known Vulnerabilities](https://snyk.io/test/github/rg-engineering/ioBroker.vis-weather/badge.svg)](https://snyk.io/test/github/rg-engineering/ioBroker.vis-weather)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.vis-weather/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.vis-weather.png?downloads=true)](https://nodei.co/npm/iobroker.vis-weather/)

![node-lts](https://img.shields.io/node/v-lts/iobroker.vis-weather?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.vis-weather?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.vis-weather?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.vis-weather?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.vis-weather?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.vis-weather?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/rg-engineering/ioBroker.vis-weather?logo=github&style=flat-square)

**If you like it, please consider a donation:**
                                                                          
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC) 

This vis-widget shows weather forecast data from DasWetter.com or weatherunderground
You need DasWetter-Adpater or weatherunderground-Adapter running as well...

In weatherunderground you need forecast of next 36 hours enabled.
In DasWetter.com you need one of four forecast data structures enabled. You can select the one you want to display. 

## ATTENTION
This widget set becomes deprecated in the near future. Please use the new widget sets for vis-2 instead. 

## compatibility with vis-2

This widget is NOT compatible with vis-2.
A new version under the name [vis-2-widgets-weather](https://github.com/rg-engineering/ioBroker.vis-2-widgets-weather) is under preparation.

## Notes / wiki
### Define Forecast hours
By default the forecast diagram shows 40 hours (DasWetter) or 36 hours (wunderground). If you prefer to only show e.g. 10 hours forecast, simply delete the unnecessary OIDs under oid_groups in vis-edit. 

### OID's are not created automatically when using DasWetter
Normally OID's will be created automatically when you select instance or data structure. When you get "no OID's available" then check whether you use "NextDaysDetailed" in DasWetter. 
You might need to enable "NextDaysDetailed".

## known issues
* please create issues at [github](https://github.com/rg-engineering/ioBroker.vis-weather/issues) if you find bugs or whish new features

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.5.14 (2026-09-20)
This widget set becomes deprecated in the near future. Please use the new widget sets for vis-2 instead. 
* (René) dependencies update

### 2.5.13 (2025-10-22)
* (René) changes based on adapter checker suggestions

### 2.5.12 (2025-06-02)
* (René) bug fix: widget was not shown at all sometimes

### 2.5.11 (2025-02-28)
* (René) changes requested by adapter checker
* (René) dependencies updated

### 2.5.10 (2024-05-28)
* (René) suggested changes by adapter checker

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