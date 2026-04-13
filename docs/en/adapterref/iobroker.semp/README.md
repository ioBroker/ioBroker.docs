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

see [docu](https://github.com/rg-engineering/ioBroker.semp/blob/master/docu/docu_en.md)

For details about protocol and usage check [SMA docu](https://github.com/rg-engineering/ioBroker.semp/blob/master/docu/SMA/SEMP-11ZE3315-Specification-1.0.6.pdf).

An description about general usage of energy requests see [SMA docu](https://github.com/rg-engineering/ioBroker.semp/blob/master/docu/SMA/SSH_KANN-Zeitfenster-TI-de-10.pdf). (german only)

## Features
* add devices from ioBroker in SunnyPortal via SMA SEMP
* informs the SunnyPortal about the current consumption
* let SunnyPortal control these devices (switch on when there is enough PV power and switch off when there is not enough solar energy)

## Requirements


## Dishwasher Mode: Functionality of the Adapter

The adapter allows you to control a dishwasher or other devices that consume standby power. It works as follows:

- The user manually switches the device on as usual.  
- Instead of starting immediately, the device is switched off and remains paused.  
- Once enough solar energy is available, the device will automatically start and run until the program is completed.  
- Any recommendations from the Smart Home Manager (SHM) to switch off the device will be ignored during this process.

> **Note:**  
> Detailed information about the technical implementation can be found in [Issue #333](https://github.com/rg-engineering/ioBroker.semp/issues/333) and in the flow chart below.

![Flowchart](https://github.com/rg-engineering/ioBroker.semp/blob/master/docu/settings/semp_dishwasher_sequence.png)



## known issues
* please create issues at [github](https://github.com/rg-engineering/ioBroker.semp/issues) if you find bugs or whish new features

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.0.8 (2026-04-12)
* (René) bug fix in admin, see issue #442: time settings in energy request corrected

### 2.0.7 (2026-04-06)
* (René) github workflow with node@24
* (René) see issue #433: make sure this.device.WallboxOID is defined before using it

### 2.0.5 (2026-03-17)
* (René) update dependencies + changes based on adapter checker

### 2.0.3 (2026-03-01)
 * (René) lint reported errors solved

### 2.0.0 (2026-03-01)
* (René) admin overworked completely with react and vite. **ATTENTION**: breaking changes in admin settings !!!
* (René) backend complete overworked with typescript

## License
MIT License

Copyright (c) 2022-2026 René G. <info@rg-engineering.eu>

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
