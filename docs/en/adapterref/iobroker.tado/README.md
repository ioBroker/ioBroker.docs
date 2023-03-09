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
* NodeJS 14.16 or higher
* ioBroker host (js-controller) 4.0 or higher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.4.5 (2023-03-08)
* (HGlab01) Add attribute 'sensorType' (#604)
* (HGlab01) Bump axios to 1.3.4

### 0.4.4 (2023-02-03)
* (HGlab01) Add attribute 'energyIqReminder' and 'specialOffersEnabled'
* (HGlab01) Bump axios to 1.3.1
* (HGlab01) Fix 'Invalid value TADO_MODE' (#585)

### 0.4.3 (2022-12-06)
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.10 (#551)
* (HGlab01) Bump axios to 1.2.1 (final fix for #561)
* (HGlab01) Improve logs

### 0.4.2 (2022-11-27)
* (HGlab01) Downgrade axios to 1.1.3 (#561)

### 0.4.1 (2022-11-24)
* (HGlab01) Add attribute isBalanceAcEligible
* (HGlab01) Bump axios from 0.27.2 to 1.2.0
* (HGlab01) Bump simple-oauth2 from 4.3.0 to 5.0.0

## License
MIT License

Copyright (c) 2022 DutchmanNL <rdrozda@hotmail.com> & HGlab01

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
