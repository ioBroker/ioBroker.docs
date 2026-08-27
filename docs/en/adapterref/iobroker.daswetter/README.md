![Logo](admin/daswettercom.png)
# ioBroker.DasWetter.

![Number of Installations](http://iobroker.live/badges/daswetter-installed.svg) ![Number of Installations](http://iobroker.live/badges/daswetter-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.daswetter.svg)](https://www.npmjs.com/package/iobroker.daswetter)
[![NPM version](http://img.shields.io/npm/v/iobroker.daswetter.svg)](https://www.npmjs.com/package/iobroker.daswetter)

[![Known Vulnerabilities](https://snyk.io/test/github/rg-engineering/ioBroker.daswetter/badge.svg)](https://snyk.io/test/github/rg-engineering/ioBroker.daswetter)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.daswetter/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.daswetter.png?downloads=true)](https://nodei.co/npm/iobroker.daswetter/)

![node-lts](https://img.shields.io/node/v-lts/iobroker.daswetter?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.daswetter?label=npm%20dependencies&style=flat-square)


![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.daswetter?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)


**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.


**If you like it, please consider a donation:**
                                                                          
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

This adapter reads weather forecast data from DasWetter.com.

## update hint v4
This adapter v4 uses the new API (2026). The data structure is now different compared to older versions
of the adapter. Old instances must be deleted and a new instance of adapter must be created.
Every user must enable the new API on the website of DasWetter. There will be API key provided which
must be used in the settings of the adapter.
With new API also new users can be registered on website of [DasWetter](https://dashboard.meteored.com/de/login)

## general functionality
The user must enable the API on the server of [DasWetter](https://dashboard.meteored.com/de/login) first.
With API key, postcode and city name in adapter configuration the adapter is then able to retrieve
forecast data from the server.
At first after adapter start a location check takes place. With postcode we try to find out the nearest
weather station. Typically the server answers with different locations from different countries because
of similar postcodes. The adapter then tries to find out the right weather station with city name.
If the nearest station was found a location hash is stored internally which is later used to request
weather forecast data.
At the moment only two paths are available
* daily forcast
The daily forecast provides general weather forcast data for the next 5 days

* hourly forecast
The hourly forecast provides a more detailed forecast for 24 hours of the current day

We try to reduce the number of requests from server to a minimum. Every user should also 
reduce the requests to a lowest minimum. Meteored provides us the basic plan for free...

### limitations of free plan

![free plan limitations](/docs/free_plan.png "free plan limitations")

### alternatives

If the forecast is only to be displayed on a visualization, the [widget](https://www.daswetter.com/users/de/widget) can also be a good alternative.
A [widget for Vis-2](https://github.com/rg-engineering/ioBroker.vis-2-widgets-weather-and-heating?tab=readme-ov-file#meteored-weather-widget) is already available.

## Hints



## known issues
* please create issues at [github](https://github.com/rg-engineering/ioBroker.daswetter/issues) if you find bugs or whish new features

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.5.9 (2026-07-05)
* (René) dependency updates and translations

### 4.5.6 (2026-06-17)
- (René) see issue #574 and #571: state roles adapted

### 4.5.4 (2026-05-31)
- (copilot) Adapter requires node.js >= 22 now
- (René) see issue 534: bug fix for current hour: time ends at forecast period
- (René) see issue 515: decimal places for temperature adjusable between 0 and 2 in admin
- (René) see issue 515: add a datapoint to show last time when data was downloaded from server

### 4.5.3 (2026-03-08)
* (René) solved lint errors and warnings based on adapter checker
* (René) dependency updates and fixes based on adapter checker recommendations

### 4.5.1 (2026-02-01)
* (René) bug fix: wind url was not set if wind speed was zero
* (René) bug fix: save selected icon type (svg, png or gif) in admin



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
