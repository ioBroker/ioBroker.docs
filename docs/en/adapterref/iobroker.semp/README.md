![Logo](admin/semp.png)
# ioBroker.semp

![Number of Installations](http://iobroker.live/badges/semp-installed.svg) ![Number of Installations](http://iobroker.live/badges/semp-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.semp.svg)](https://www.npmjs.com/package/iobroker.semp)
[![NPM version](http://img.shields.io/npm/v/iobroker.semp.svg)](https://www.npmjs.com/package/iobroker.semp)

[![Known Vulnerabilities](https://snyk.io/test/github/rg-engineering/ioBroker.semp/badge.svg)](https://snyk.io/test/github/rg-engineering/ioBroker.semp)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.semp/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.semp.png?downloads=true)](https://nodei.co/npm/iobroker.semp/)

![node-lts](https://img.shields.io/node/v-lts/iobroker.semp?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.semp?label=npm%20dependencies&style=flat-square)


![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.semp?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.semp?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.semp?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.semp?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/rg-engineering/ioBroker.semp?logo=github&style=flat-square)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

**If you like it, please consider a donation:**
                                                                          
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC) 


## SMA SEMP adapter for ioBroker

Interface to SMA SunnyPortal via SunnyHomeManager and SEMP

Add your devices from ioBroker in SunnyPortal. 
SunnyPortal can then better estimate your energy consumption and thus make better predictions and recommendations. But 
you can also have your devices controlled by SunnyPortal. If there is enough solar energy, the SunnyPortal can switch your 
devices on or, if there is not enough solar energy, switch them off again. In this way you optimize your own consumption, 
but you are not dependent on the few devices supported in SunnyPortal. With the adapter, any device from the ioBroker can 
be integrated into the SunnyPortal.
It is not even necessary for the consumption of a single device to be measured. Even estimated values are sufficient.


## user documentation

see [docu](docu/docu_en.md)

For details about protocol and usage check [SMA docu](docu/SMA/SEMP-11ZE3315-Specification-1.0.6.pdf).

An description about general usage of energy requests see [SMA docu](docu/SMA/SSH_KANN-Zeitfenster-TI-de-10.pdf). (german only)

## Features
* add devices from ioBroker in SunnyPortal via SMA SEMP
* informs the SunnyPortal about the current consumption
* let SunnyPortal control these devices (switch on when there is enough PV power and switch off when there is not enough solar energy)

## Requirements


## known issues
* please create issues at [github](https://github.com/rg-engineering/ioBroker.semp/issues) if you find bugs or whish new features

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.3.13 (2023-11-19)
* (René) dependencies updated
* (René) fix exceptions reported by sentry

### 1.3.12 (2023-10-29)
* (René) some bug fixes based on changes in 1.3.11

### 1.3.11 (2023-10-28)
* (René) see issue #30: more OID's can be used with URL for wallbox
* (René) option to set recommnended current instead of power (useful for go-e)

### 1.3.10 (2023-10-03)
* (René) bug fix: removed missing Start() call in wallbox (avoid exception)
* (René) see issue #30: URL can be used to set recommended power to wallbox (attention: still only power, not current as needed for go-e)

### 1.3.9 (2023-09-24)
* (René) see issue #30: bug fix URL as string to be used

### 1.3.8 (2023-09-23)
* (René) see issue #30: URL can now be used directly to get status of wallbox (JSON only)

### 1.3.7 (2023-09-02)
* (René) see issue #30: bug fix for type based status check of wallboxes

### 1.3.6 (2023-08-28)
* (René) see issue #81: smaller bug fixes

### 1.3.5 (2023-08-26)
* (René) see issue #81: wallbox three phase enabler by URL
* (René) see issue #81: wallbox three phase switch time configurable (default 3 minutes)
* (René) see issue #74: check max power consumption added
* (René) dependencies updated

### 1.3.4 (2023-07-30)
* (René) dependencies updated

### 1.3.2 (2023-06-12)
* (René) bug fix: sentry reported exceptions fixed

### 1.3.1 (2023-06-11)
* (René) bug fix: exception in wallbox interface fixed

### 1.3.0 (2023-06-10)
* (René) see #17: additional checks for BaseID
* (René) check BaseId of every DeviceId when adapter starts
* (René) bug fix csv-logging: create file if not exist and complete filename is provided, was working with path name only before
* (René) additional debug: show last timeframe sent to SHM as datapoint for every timeframe

### 1.2.0 (2023-05-29)
* (René) device off at end of maximum running time and latest end overworked; option "Switch Off At End Of Timer" removed

### 1.1.0 (never released)
* (René) issue #30: URL as another option for configuring the wallboy interface

### 1.0.0 (2023-04-07)
* (René) dependencies updated

### 0.4.2 (2023-04-02)
* (René) fast charge is now a boolean and can be enabled/disabled
* (René) wallbox charge time can be defined as 12h, 24h, endles or userdefined

### 0.4.1 (2023-03-24)
* (René) bug fix: avoid exception when no switch is defined for wallbox
* (René) limit to switch between 1phase and 3phase charging of wallbox is adjustable now
* (René) allow one minute disconnected before state change. Sometimes when wallbox switches from 1phase to 3phase it sends "disconnected", but cable is still connected

### 0.4.0 (2023-03-15)
* (René) redesign wallbox feature
* (René) add status ExcessEnergy in timeframes to show when excess energy is used
* (René) bug fix for "cannot read data undefined" when new device was created

### 0.3.1 (2023-02-26)
* (René) issue #27: wallbox fast charging added
* (René) wallbox: some bug fixes

### 0.2.1 (2023-02-17)
* (René) wallboxes: bug fix MinEnergy set to 0

### 0.2.0 (2023-02-16)
* (René) wallboxes: add switch to enable 3phase charge

### 0.1.1 ()
* (René) wallboxes: some bug fixes

### 0.1.0 (2023-01-20)
* (René) wallboxes: see issue #23: wallbox OID can be configured (DP type and set or check value)
* (René) wallboxes: minimum and maximum energy for charging is adjustable by datapoint, default: battery capacity (10% and 100%)
* (René) see issue #24: delete csv logs if older then three days

### 0.0.5 (2022-12-27)
* (René) MinPowerConsumption added
* (René) see issue #20: support of wallboxes

### 0.0.4 (2022-11-07)
* (René) see issue #15: support of more then one time periods for energy requests
* (René) some bug fixes (0.0.3)

### 0.0.2 (2022-10-16)
* (René) threshold for status detection with timer
* (René) csv logger for data to be sent to SHM (for debugging)
* (René) see issue #14: cancel request if device does not turn on
* (René) bug fix issue #19: turn off device at the end of maximum operation time

### 0.0.1 (2022-10-01)
* (René) initial release

## License
MIT License

Copyright (c) 2022-2023 rg-engineering info@rg-engineering.eu

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
