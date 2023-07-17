![Logo](admin/swiss-weather-api.png)
# ioBroker.swiss-weather-api

[![NPM version](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)](https://www.npmjs.com/package/iobroker.swiss-weather-api)
[![Downloads](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)](https://www.npmjs.com/package/iobroker.swiss-weather-api)
![Number of Installations (latest)](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/swiss-weather-api-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api)

[![NPM](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)](https://nodei.co/npm/iobroker.swiss-weather-api/)

**Tests:** ![Test and Release](https://github.com/baerengraben/ioBroker.swiss-weather-api/workflows/Test%20and%20Release/badge.svg)

## swiss-weather-api adapter for ioBroker
Connects to the great SRF weather API (https://developer.srgssr.ch/apis/srf-weather).
The SRF Weather REST API allows you to get weather forecasts and reports from more than 25.000 locations across Switzerland. A "Freemium" subscription allows you to get 50 Request/day.

##**Please Be aware:
1. that this adapter only supports locations within Switzerland. And
1. that this adapter only supports RF Weather REST API Version 1 - Version 2 is comming soon

**Update procedure Version 1.0.1 to 1.0.x**
- Just update in ioBroker. No special additional steps necessary

### Getting started
1. Get a free accout on https://developer.srgssr.ch/
1. Go to "My Apps" and create a new App. Here you can choose a Product. "Freemium" is their free product. If you only want a forecast for one location and get only 50 request per day (every 30min) or/and don't want to pay for more request per day, "Freemium" is what you want to choose. Now, this will create a specific ConsumerKey and ConsumerSecret
1. Find out Longitude / Latitude (decimal degrees) of the chosen location for which forecast is needed. This information is optional if you have set your location in the ioBroker settings (main settings) (via the map). In this case you could leave the latitude and longitude fields empty. The adapter then takes over the settings of the ioBroker. Latitude and longitude entered in the adapter configuration override the ioBroker settings.
1. Install this Adapter on ioBroker => This can take several minutes (~7min on a Raspberry Pi 3)
1. On Adapter Configuration fill in
   1. Name of App
   1. ConsumerKey of App
   1. ConsumerSecret of App
   1. Longitude / Latitude of the chosen swiss location for which forecast is needed. => Please use decimal degrees (for example Zürich: 47.36667 / 8.5)
   1. Poll Interval in Minutes (By default 30 minutes - 50 Request/Day)

The first query is made 10s after the adapter was started. After the first start, the query will be executed regularly according to the conifugation parameter (Poll Interval in Minutes).
The Objects in forecast.current_hour will be createt 30s after frist startup and updated every hour by copying the corresponding values from forecast.60minutes.

### Visualisation Example

###### Prerequisite:
* Adapter [Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign) >= 0.5.7
* Adapter [Vis](https://github.com/iobroker/iobroker.vis/blob/master/README.md)
* [Import Views to Vis](https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views)

###### Example
![Tablet](doc/Wettervorhersage_visu_anim.gif)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 1.0.6
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/78
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/93
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/97

### 1.0.5
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/81
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/76
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/75

### 1.0.4
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/85
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/82

### 1.0.3
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/67
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/66
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/52

### 1.0.2
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/51
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/53

### 1.0.1
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/57
This change makes it necessary to regenerate IDs. So, to install version 1.0.1, the currently running adapter instance must be completely removed and replaced with a new instance.

### 1.0.0
* (baerengraben) Bugfix https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/64

## License
MIT License

Copyright (c) 2023 baerengraben <baerengraben@intelli.ch>

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