![Logo](admin/accuweather.png)
# ioBroker.accuweather

![Number of Installations](http://iobroker.live/badges/accuweather-installed.svg) ![Number of Installations](http://iobroker.live/badges/accuweather-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.accuweather.svg)](https://www.npmjs.com/package/iobroker.accuweather)
[![Downloads](https://img.shields.io/npm/dm/iobroker.accuweather.svg)](https://www.npmjs.com/package/iobroker.accuweather)

[![NPM](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)](https://nodei.co/npm/iobroker.accuweather/)

## accuweather adapter for ioBroker
Weather forecast using AccuWeather API.

Adapter receives Current Conditions (updated every hour), 
5 Days daily forecast (update once daily at approximately 7am), 
and 12 hours forecast (updated every six hours at 12am, 6am, 12pm and 6pm). 

## Getting started

### Get API Key
To get API Key, register on https://developer.accuweather.com/ and create application in `My Apps` menu. 
Once the application is created, you will have an API key generated. 
For free use, it is possible to make 50 requests to API per day. 
It was noted that to get the API working, the following settings are preferred (please choose your country!):
![settings](admin/image.png)

### Get Location Key
In order to get location key, go to https://www.accuweather.com/ and enter your city name, or try to enter your coordinates (latitude, longitude) as you have them, e.g., in ioBroker settings. 
Your location key will be the number at the end of the forecast URL.

### Using in Lovelace visualization (starting version 1.1.0)
The summary channel contains a current and by-day forecast with role/types of states supported by type-detector. 
New feature can be used in order to show weather forecast in Lovelace UI. 
For better view a custom lovelace card is created - see https://github.com/algar42/IoB.lovelace.accuweather-card

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.3.1 (2023-08-15)
* (isi07) added the Wind Direction Text und Cloud Cover
* (bluefox) Added json config

### 1.2.4 (2022-02-08)
* (algar42) Depency updates

### 1.2.3 (2021-12-29)
* (algar42) HoursOfSun Parameter added to the Daily forecast

### 1.2.1 (2021-07-22)
* (bluefox) Updated logo

### 1.2.0 (2021-07-03)
* (Garfonso) adjust roles to properly detect weather forecast in Summary folder. (Summary objects need to be deleted and adapter restarted after that)

### 1.1.7 (2021-06-24)
* (bluefox) Create device for device-detector

### v1.1.6 (2021-05-05)
Minor bug fixes to `Object.common` section

### 1.1.5 (2021-01-25)
* (algar42) Resolve log Warning for js-controller 3.2

### 1.1.4
* (HGlab01) small bugfix regarding setTimeout range

### 1.1.3 (2020-03-04)
* (algar42) Minor updates for compact mode

### 1.1.0 (2019-11-09)
* (algar42) Summary channel added to support type-detector and automatic weather device creation

### 1.0.2 (2019-09-12)
* (algar42) Production Release

## License
MIT License

Copyright (c) 2021-2023 algar42 <igor.aleschenkov@gmail.com>

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
