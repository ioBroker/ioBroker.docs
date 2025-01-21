# ioBroker.tado 
<img src="./admin/tado.png" width="50" height="50">

![Number of Installations](http://iobroker.live/badges/tado-installed.svg) ![Number of Installations](http://iobroker.live/badges/tado-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.tado.svg)](https://www.npmjs.com/package/iobroker.tado)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tado.svg)](https://www.npmjs.com/package/iobroker.tado)
[![Known Vulnerabilities](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)](https://snyk.io/test/github/DrozmotiX/ioBroker.tado)
[![Dependency Status](https://img.shields.io/librariesio/release/npm/iobroker.tado)](https://libraries.io/npm/iobroker.tado)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
![Test and Release](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.tado.png?downloads=true)](https://nodei.co/npm/iobroker.tado/)

## tado adapter for ioBroker
Tado° (https://www.tado.com) is the expert in smart heating and energy management for your home, designed and developed in Germany. Save energy and cut costs for good with us – enjoy a cosy and sustainable home.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Tado° X
Basic support for Tado° X available.
If your setup is not working, please raise a [ticket](https://github.com/DrozmotiX/ioBroker.tado/issues/new?assignees=HGlab01&labels=enhancement&projects=&template=Enhancement.md&title=). You will need to support some debugging session and interact with the adapter developer to improve Tado° X features.

## Things you can steer on Tado° V3+, V3, V2
| State | Description |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | Turn device on/off |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.celsius | Define temperature |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone | Switch to automatic mode |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp | Set time table mode |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds | Set how long the time table mode shall apply |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius | Temperature offset |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled | Child Lock on/off |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id | Select active time table |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled | Enable/Disable open window detection on thermostat |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds | Timeout how long thermostats are turned off when an open window is detected |
| tado.[x].[yyyyyy].Rooms.[z].activateOpenWindow | Switch thermostats off when an open window is detected (only works if the thermostat detects an open window) | 
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | AC mode (only AC devices) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | Fanspeed (only AC devices with V3 and older versions) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel (only AC devices with V3+ version) |
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | Vertical swing (only AC devices with V3+ version) |
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | Horizontal swing (only AC devices with V3 and olderversions) |
| tado.[x].[yyyyyy].Home.state.presence | Set HOME, AWAY or AUTO mode |
| tado.[x].[yyyyyy].Home.masterswitch | Turn all devices on/off |
| tado.[x].[yyyyyy].meterReadings | JSON-Object with {"date":"YYYY-MM-DD","reading": 1234} can be used to upload meter-readings to Energy IQ |

## Things you can steer on Tado° X
| State | Description |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | Turn device on/off |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.value | Define temperature |
| tado.[x].[yyyyyy].Rooms.[z].manualControlTermination.controlType | Set time table mode |
| tado.[x].[yyyyyy].Rooms.[z].manualControlTermination.remainingTimeInSeconds | Duration time for timer mode |
| tado.[x].[yyyyyy].Rooms.[z].resumeScheduleRoom | Back to automatic mode for this room |
| tado.[x].[yyyyyy].Rooms.resumeScheduleHome | Back to automatic mode for all rooms |
| tado.[x].[yyyyyy].Rooms.allOff | Switch all rooms off |
| tado.[x].[yyyyyy].Rooms.boost | Switch all rooms to boost mode |
| tado.[x].[yyyyyy].Home.state.presence | Set HOME, AWAY or AUTO mode |
| tado.[x].[yyyyyy].meterReadings | JSON-Object with {"date":"YYYY-MM-DD","reading": 1234} can be used to upload meter-readings to Energy IQ |

## Requires
* Node.js 18 or higher
* ioBroker host (js-controller) 5.0 or higher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.6.1 (2024-11-04)
* (HGlab01) Add attributes 'expiryInSeconds' and 'activated'
* (HGlab01) Extend timeout back to 20s
* (HGlab01) Tado° X improvements

### 0.6.0 (2024-10-23)
* (HGlab01) Start supporting Tado° X

### 0.5.9 (2024-10-16)
* (HGlab01) Improve axios promise handling

### 0.5.7 (2024-09-30)
* (HGlab01) Change of attribute "light" supported
* (HGlab01) Add attribute 'connection'
* (HGlab01) Add attribute 'supportsFlowTemperatureOptimization'
* (HGlab01) Bump axios to 1.7.7
* (HGlab01) EnergyIQ meter-readings can be uploaded

### 0.5.6 (2024-08-06)
* (HGlab01) Improve AccessToken Management
* (HGlab01) Bump axios to 1.7.3
* (HGlab01) Add attribute 'language'
* (HGlab01) Add attribute 'isHeatPumpInstalled'

## License
MIT License

Copyright (c) 2025 HGlab01 <myiobrokeradapters@gmail.com> & DutchmanNL <oss@drozmotix.eu>

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
