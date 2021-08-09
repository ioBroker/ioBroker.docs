![Logo](admin/meteoalarm.png)
# ioBroker.meteoalarm

[![NPM version](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)](https://www.npmjs.com/package/iobroker.meteoalarm) [![Build Status Travis](https://travis-ci.com/jack-blackson/ioBroker.meteoalarm.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.meteoalarm) [![Downloads](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)](https://www.npmjs.com/package/iobroker.meteoalarm) ![Number of Installations](http://iobroker.live/badges/meteoalarm-installed.svg) ![Number of Installations](http://iobroker.live/badges/meteoalarm-stable.svg)[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/meteoalarm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) 

[![NPM](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true/)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

meteoalarm Adapter for ioBroker
------------------------------------------------------------------------------
This adapter is pulling weather alarms from https://meteoalarm.org, which includes wind, snow, rain, high and low temperature,etc. This information is available in local language and for detailed regions.

Disclaimer: Time delays between this website and the www.meteoalarm.org website are possible, for the most up to date information about alert levels as published by the participating National Meteorological Services please use https://www.meteoalarm.org.

## How to use it
Choose your country, and afterwards the region you want the warnings for. If you are unsure what your region name is, please go to https://meteoalarm.org and try to find it on the map. 


## Add it to your vis
The easiest way to add it to your vis is by using the widget basic - string, and there choosing the datapoint htmlToday. This gives you a predesigned HTML widget, which you can adjust in the setup.

## Alarm Types
|Alarm Type|Description|                                                                       
|:---:|:---:|
|1|Wind|
|2|Snow/Ice|
|3|Thunder & Lightning|
|4|Fog|
|5|High temperature|
|6|Low temperature|
|7|Coast Event|
|8|Forrest fire|
|9|Avalanche|
|10|Rain|
|11|Unknown|
|12|Flood|
|13|Rain-Flood|

## Setup
"No Background Color in HTML Widget": 
Ability to use the HTML Widget without background color (e.g. if you want to use the color object to fill your whole widget, not just the html widget)

"Define Warning colors": 
Ability to define the colors for the various alarm levels in HEX code. Used for HTML widget and also for the color object to manually assign it to another widget

"Use white icons": 
Use white icons instead of black ones

"Icons": 
Define the size of the icon in the HTML widget

"No symbols in widget":
Don't use the symbol in the HTML widget. You can still access it in the objects. This is usefill if you want to show the icon seperatly from the widget - e.g. in a bigger size.

## Alarm Levels
|Alarm Level|Description|                                                                       
|:---:|:---:|
|Green|There is no warning available at the moment.|
|Yellow|The weather is potentially dangerous. The predicted weather phenomena are not unusual, but increased attention should be paid to activities exposed to meteorological risks. Keep yourself informed about the meteorological conditions to be expected and do not take any avoidable risks.|
|Orange|The weather is dangerous. Unusual meteorological phenomena have been predicted. Damage and accidents are likely. Be very attentive and careful and keep up to date with the expected meteorological conditions. |
|Red|The weather is very dangerous. Unusually intense meteorological phenomena were predicted. Extreme damage and accidents, often over large areas, threaten life and property. |

## Supported countries
* Austria
* Germany
* Belgium
* BosniaHerzegovina
* Croatia
* Cyprus
* Czech Republic
* Denmark
* Estonia
* Finland
* France
* Greece
* Hungary
* Iceland
* Israel
* Italy
* Latvia
* Lithuania
* Luxembourg
* Malta
* Netherlands
* Norway
* Poland
* Romania
* Serbia
* Slovakia
* Slovenia
* Spain
* Sweden
* UK

If you don't find your country, please create an issue on github, and I will be happy to add it

## Not possible countries
* Switzerland (geocode file from meteoalarm.org is probably incorrect)
* Portugal (geocode file from meteoalarm.org is probably incorrect)
* Bulgaria (geocode file from meteoalarm.org is probably incorrect)



## Changelog
## 2.0.1 (2021-07-08)
* (jack-blackson) Changed Alarm Folder Name to Alarm_X
* (jack-blackson) Define in setup which Alarms you want to see
* (jack-blackson) Sort Alarms by effective date
## 2.0.0 (2021-07-06)
* (jack-blackson) Switch to Meteoalarm.org, complete rebuild
## 1.2.1 (2021-06-05)
* (jack-blackson) Bugfix to handle incorrect XML (if country instead of region is used)
* (jack-blackson) Added Luxembourg
## 1.2.0 (2021-05-16)
* (jack-blackson) New Setup: "No Background Color in HTML Widget", "Define Warning colors" and "Use white icons"
* (jack-blackson) New Icons
## 1.1.11 (2021-05-09)
* (jack-blackson) Package Updates
## 1.1.9 (2021-05-07)
* (jack-blackson) Package Updates
## 1.1.5 (2021-05-02)
* (jack-blackson) Bugfix JS-Controller 3.3.1 errors, error handling no language defined
## 1.1.4 (2021-04-05)
* (jack-blackson) Handle ENOTFOUND error message, added Sentry
## 1.1.3 (2021-03-29)
* (jack-blackson) Error fixes adapter checker
## 1.1.2 (2021-03-29)
* (jack-blackson) Bugfix for not working data update, removed link autogeneration due to CORS errors
## 1.1.1 (2020-10-28)
* (jack-blackson) Bugfix HTML Data
## 1.1.0 (2020-03-29)
* (jack-blackson) Bugfix Germany
## 1.0.9 (2020-02-06)
* (jack-blackson) Bugfix Germany
## 1.0.8 (2019-11-15)
* (jack-blackson) Added Poland, Moldova, Greece, Romania
* (jack-blackson) Added new Datapoint to get Link to Weather Map
## 1.0.7 (2019-11-13)
* (jack-blackson) Added Czech Republic, Ireland, Israel, Lithuania, Latvia, Montenegro, Malta, Serbia, Sweden
## 1.0.6 (2019-10-19)
* (jack-blackson) Added Switzerland & Slowakia
## 1.0.5 (2019-09-22)
* (jack-blackson) Small logging adjustments
## 1.0.4 (2019-09-11)
* (jack-blackson) Travis error
## 1.0.3 (2019-09-09)
* (jack-blackson) Small bugfixes, change from type "deamon" to "schedule"
## 1.0.2 (2019-08-25)
* (jack-blackson) Reordered release infos
### 1.0.1 (2019-08-18)
* (jack-blackson) Bugfix no alarm icon
### 1.0.0 (2019-08-12)
* (jack-blackson) Release version
### 0.6.0 (2019-08-05)
* (jack-blackson) Store weather icons local in adapter
### 0.5.0 (2019-07-21)
* (jack-blackson) Handle Timeouts
* (jack-blackson) Translations for all languages
* (jack-blackson) URL checks
### 0.4.0 (2019-07-20)
* (jack-blackson) Added data for NL,NO,HR,FI,ES
* (jack-blackson) Added Type Text, Type is now empty if Level is 1 (No Warning)
* (jack-blackson) Adjusted colors
### 0.3.0 (2019-07-13)
* (jack-blackson) Added HTML Widget
* (jack-blackson) Bugfix icon
### 0.2.0 (2019-07-12)
* (jack-blackson) Added "Tomorrow" data
### 0.1.0 (2019-07-11)
* (jack-blackson) initial version

## Credits
Bell in icon designed by Freepik from www.flaticon.com


## License
The MIT License (MIT)

Copyright (c) 2019-2021 jack-blackson <blacksonj7@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.