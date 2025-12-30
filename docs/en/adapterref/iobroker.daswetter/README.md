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
### 4.1.0 (2025-12-28)
* (René) see issue #457: forecast download for daily and hourly can now be disabled to reduce number of DP's
* (René) see issue #456: combination of postcode and free text search for location API added, if location not found by postcode a free text search is executed
* (René) see issue #458: unit for pressure changed to millibar / hPa
* (René) see issue #459: bug fix to be able to edit custom path for moon symbols
* (René) if API provides night specific symbol description, it will be shown now
* (René) datapoint descriptions changed

### 4.0.0 (2025-12-27)
**Breaking Changes**
instances of older versions **must be deleted** and a new instance must be created
* (René, copilot) rework with typescript
* (René, copilot) support of new api from DasWetter.com
* (René) adapter type changed from "scheduled" to "deamon"

### 3.2.8 (2025-11-02)
* (René) see issue #444: avoid crash if no data received, show response status in debug log

### 3.2.7 (2025-11-02)
* (René) enable / disable each path separately in admin

### 3.2.6 (2025-10-22)
* (René) #417: bug fix: allow 14 minutes between two data requests to avoid unnecessary warnings

### 3.2.5 (2025-10-21)
* (René) #442: bug fix for state of wind direction
* (René) #417: info, if data query is too often (max. 4 times per hour)
* (René) update dependencies + changes based on adapter checker

### 3.2.4 (2025-10-04)
* (René) new testing
* (René) update dependencies + changes based on adapter checker

### 3.2.3 (2025-02-26)
* (René) changes requested by adapter checker
* (René) dependencies updated

### 3.2.2 (2024-12-15)
* (René) translations
* (René) see issue #408: hint regarding user registration limitation added

### 3.2.1 (2024-12-06)
* (René) see issue #411: jsonConfig fixed

### 3.2.0 (2024-12-04)
* (René) see issue #406: test with nodejs@22
* (René) update dependencies
* (René) migration to admin 5 UI (jsonConfig)

### 3.1.16 (2024-08-18)
* (René) update dependencies
* (René) bug fixes based on adapter checker recommendation

### 3.1.15 (2024-05-28)
* (René) see issue #354: change of dependencies

### 3.1.13 (2024-01-12)
* (René) update dependencies

### 3.1.12 (2023-12-24)
* (René) see issue #217: additional log added to understand root cause, please copy&past log output into github issue

### 3.1.11 (2023-11-18)
* (René) update dependencies

### 3.1.10 (2023-07-30)
* (René) update dependencies

### 3.1.8 (2023-04-07)
* (René) update dependencies

### 3.1.7 (2023-01-31)
* (René) update dependencies

### 3.1.6 (2022-12-23)
* (René) see issue #153: package Axios downgraded

### 3.1.5 (2022-12-04)
* (René) update dependencies

### 3.1.4 (2022-08-19)
* (René) update dependencies
* (dipts) Added missing / corrected inappropriate icons for galeria 1

### 3.1.3 (2022-05-05)
* (René) see issue #139: bug fix moon icon

### 3.1.2 (2022-03-20)
* (René) see issue #130: bug fix json data

### 3.1.1 (2022-03-19)
* (René) bug fix UV index

### 3.1.0 (2022-03-19)
* (René) replace bent by axios
* (René) dependencies updated
* (René) see issue #128: add UV index

### 3.0.9 (2021-11-09)
* (René) dependencies updated
* (René) see issue #114: "connectionType" and "dataSource" fixed

### 3.0.8 (2021-09-22)
* (DutchmanNL) Warn messages for channels solved
* (DutchmanNL) Optimize log message at adapter termination
* (DutchmanNL) Ensure adapter will always handle data at start

### 3.0.7 (2021-05-03)
* (René) issue #91: remove warnings with js-controller 3.3.

### 3.0.5 (2021-03-21)
* (René) dependencies updated

### 3.0.4 (2020-10-16)
* (René) see issue #76: parse rain values as float instead integer

### 3.0.3 (2020-09-19)
* (René) see issue #66: parse numbers added

### 3.0.1 (2020-05-01)
* (René) breaking change: old data structure is not supported anymore
* (René) "request" replaced by "bent"
* (René) "xml2js" replaced by "xml2json"
* (René) manual from DasWetter updated in folder \docs
* (René) see issue #39: create copy of data in hourly data path for next 1, 2, 3 or 6 hours (as an option)
* (René) copy for current can be disabled now

### 2.8.2 (2020-03-20)
* (René) some more logs to find parser errors

### 2.8.1 (2019-09-08)
* (René) bug fix: some datapoints were created as number instead of string

### 2.8.0 (2019-03-19)
* (René) moon and wind icon set added in admin !!path to wind icons changed!!
* (René) path to customized icon set added 
* (René) exit code changed

### 2.7.3 (2019-02-24)
* (René) bug fix: some values are number instead of string

### 2.7.2 (2019-02-14)
* (bluefox) Serialization of the objects deletion

### 2.6.1 (2019-02-10)
* (René) update dependencies

### 2.6.0 (2019-01-20)
* (René) support of compact mode
* (René) new icons for galeria5 (color or white; svg or png) selectable in admin
* (René) auto-repair for path4

### 2.5.0 (2018-11-30)
* (René) since app has problems with svg we can use png instead. svg's are converted to png. In admin a new option is available to use original svg's or converted png's 
* (René) max. 500 datapoints are deleted per call to reduce work load, so it might take a few calls until all old data points are removed

### 2.4.0 (2018-11-26)
* (René) sunshine duration added
* (René) current in NextHours_Day1 and NextHours2_Day1 added

### 2.3.1 (2018-11-04)
* (René) clean up code

### 2.3.0 (2018-08-23)
* (René) support of 4. path (json)

### 2.2.0 (2018-08-20)
* (René) delete unused data structure

### 2.1.3 (2018-08-17)
* (René) typo fixed
* (René) missing Icon-URL's added

### 2.1.2 (2018-08-14)
* (bluefox) Configuration dialog was fixed

### 2.1.1 (2018-08-04)
* (René) parse timeout added
* (René) missing roles and states added
* (René) using of units from data structure

### 2.1.0 (2018-07-30)
* (bluefox) Added URLs to icons
* (bluefox) Added the roles and the names to states
* (bluefox) Icons moved to admin directory

### 2.0.0
* (René) new datastructure !not compatible to version 1.x!
now parsing all data from xml and store them in datapoints
for compatibility: in configuration old data structure can be enabled 
needs also 2.x of vis-weather-widget

## License

MIT License

Copyright (c) 2017-2025 René G. <info@rg-engineering.eu>

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
