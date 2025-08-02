![Logo](admin/swiss-weather-api.png)
# ioBroker.swiss-weather-api

[![NPM version](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)](https://www.npmjs.com/package/iobroker.swiss-weather-api)
[![Downloads](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)](https://www.npmjs.com/package/iobroker.swiss-weather-api)
![Number of Installations (latest)](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/swiss-weather-api-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api)
![GitHub issues](https://img.shields.io/github/issues/baerengraben/ioBroker.swiss-weather-api?logo=github&style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/baerengraben/ioBroker.swiss-weather-api/test-and-release.yml?branch=master&logo=github&style=flat-square)


[![NPM](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)](https://nodei.co/npm/iobroker.swiss-weather-api/)


# swiss-weather-api adapter for ioBroker
Connects to the great SRF weather API - Version 2 (https://developer.srgssr.ch/api-catalog/srf-weather/srf-weather-description).
The SRF Weather REST API allows you to get weather forecasts and reports from more than 25.000 locations across Switzerland. A "Freemium" subscription allows you to get 50 Request/day.

## **Please Be aware:**
1. This adapter only supports locations within Switzerland.
1. This adapter supports SRF Weather API V2.

## **Update procedure Version 1.x.x to 2.0.x**
- Remove the adapter (delete all Adapter-Objects in ioBroker!)
- Install Adapter completly new => New Objects will be generated
- Since SRF has changed the Path-Names, update your Visu: Just [reimport the views](https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views).  

## Getting started
1. Get a free accout on https://developer.srgssr.ch/
1. Go to "Apps" and add new App. Here you can choose a API-Product. "SRF-MeteoProductFreemium" is their free product. If you only want a forecast for one location and get only 50 request per day (every 30min) or/and don't want to pay for more request per day, "SRF-MeteoProductFreemium" is what you want to choose. Now, this will create a specific ConsumerKey and ConsumerSecret
1. Find out Longitude / Latitude (decimal degrees) of the chosen location for which forecast is needed. This information is optional if you have set your location in the ioBroker settings (main settings) (via the map). In this case you could leave the latitude and longitude fields empty. The adapter then ueses the settings of the ioBroker. Latitude and longitude entered in the adapter configuration override the ioBroker settings.
1. Freemium-Users: Please note that the SRG API remembers the location used. From the first request on and for a certain period of time, the subscription used can only deliver requests for this one location.
1. Install this Adapter on ioBroker => This can take several minutes (~7min on a Raspberry Pi 3)
1. On Adapter Configuration fill in
   1. Name of App
   1. ConsumerKey of App
   1. ConsumerSecret of App
   1. Longitude / Latitude of the chosen swiss location for which forecast is needed. => Please use decimal degrees (for example Zürich: 47.36667 / 8.5)
   1. Poll Interval in Minutes (By default 60 minutes - 25 Request/Day)

The first query is made 10s after the adapter was started. After the first start, the query will be executed regularly according to the conifugation parameter (Poll Interval in Minutes).
The Objects in forecast.current_hour will be createt 30s after frist startup and updated every hour by copying the corresponding values from forecast.hours.

### Visualisation Example

###### Prerequisite:
* Adapter [Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign) >= 0.5.7
* Adapter [Vis](https://github.com/iobroker/iobroker.vis/blob/master/README.md)
* [Import Views to Vis](https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views)

###### Example
Simple Example:
![Tablet](doc/Wettervorhersage_visu_anim.gif)

Extended Example:
![Tablet](doc/Wettervorhersage_visu_anim2.gif)

Week-View Example:
![Tablet](doc/Wochensicht_reduziert.png)

## Changelog
### 2.2.2 (2024-11-01)
* (baerengraben) Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/125

### 2.2.1 (2024-11-01)
* (baerengraben) Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/78

### 2.2.0 (2024-10-30)
* (baerengraben) [Wochensicht_reduziert neu als View und mit Legende](https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/112)

### 2.1.1 (2024-10-29)
* (baerengraben) Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/124
* (baerengraben) Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/123
* (baerengraben) Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/122
* (baerengraben) Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/121

### 2.1.0 (2024-01-10)
* (baerengraben) Added additional Week-View. Credits goes to https://github.com/pingus01

## License
MIT License

Copyright (c) 2024 baerengraben <baerengraben@intelli.ch>

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