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
tado° ensures a comfortable and healthy climate while saving up to 31% on your heating bill.

## Things you can steer
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
| tado.[x].[yyyyyy].Home.state.presence | Set HOME or AWAY mode |
| tado.[x].[yyyyyy].Home.masterswitch | Turn all devices on/off |
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | AC mode (only AC devices) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | Fanspeed (only AC devices with V3 and older versions) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel (only AC devices with V3+ version) |
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | Vertical swing (only AC devices with V3+ version) |
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | Horizontal swing (only AC devices with V3 and olderversions) |

## Requires
* NodeJS 16 or higher
* ioBroker host (js-controller) 4.0 or higher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__

-->
### 0.4.10 (2023-09-26)
* (HGlab01) Add attribute 'isBalanceHpEligible'
* (HGlab01) improve axios keep_a_live

### 0.4.9 (2023-07-05)
* (HGlab01) Add attribute 'zonesCount'
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.12

### 0.4.8 (2023-05-12)
* (HGlab01) Add attribute 'isHeatSourceInstalled'
* (HGlab01) Bump axios to 1.4.0

### 0.4.7 (2023-04-26)
* (HGlab01) Add attribute 'generation'
* (HGlab01) improve axios error handling
* (HGlab01) Bump axios to 1.3.6

### 0.4.6 (2023-04-12)
* (HGlab01) Add attribute 'isEnergyIqEligible' (#613)
* (HGlab01) improve ETIMEDOUT issue
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.11
* (HGlab01) js-controller v5 readiness (#618)

## License
MIT License

Copyright (c) 2023 HGlab01 & DutchmanNL <rdrozda@hotmail.com>

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
