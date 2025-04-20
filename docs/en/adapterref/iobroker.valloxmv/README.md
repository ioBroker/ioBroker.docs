![Logo](admin/valloxmv.png)
# ioBroker.valloxmv

[![NPM version](https://img.shields.io/npm/v/iobroker.valloxmv.svg)](https://www.npmjs.com/package/iobroker.valloxmv)
[![Downloads](https://img.shields.io/npm/dm/iobroker.valloxmv.svg)](https://www.npmjs.com/package/iobroker.valloxmv)
![Number of Installations](https://iobroker.live/badges/valloxmv-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/valloxmv-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.valloxmv.png?downloads=true)](https://nodei.co/npm/iobroker.valloxmv/)

**Tests:** ![Test and Release](https://github.com/hacki11/ioBroker.valloxmv/workflows/Test%20and%20Release/badge.svg)

## ValloxMV adapter for ioBroker

Connects your Vallox Air Ventilation system into your ioBroker home automation.

## Usage
* Install adapter
* Configure device address and poll interval (60 is minimum)
* Read and write states as usual

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.4.1 (2025-04-14)
* Maintenance Release
* Add support for NodeJS 18 as long as iobroker supports
* Add devcontainer for development
* Add release script

### 1.4.0
* Maintenance Release
* Bump engines to NodeJS 20 as minimum version

### 1.3.0
* Maintenance Release
* Updated dependencies (iobroker-core & node)
* Change UI to jsconConfig and fixing issues detected by repository checker
* Update translation using i18n by iobroker/adapter-dev
* Update year in license and readme

### 1.2.0
* Remove NodeJS 10.x support
* Upgrade to js-controller 3.3 and Admin 5

### 1.1.3
* Fixed wrong datatype (number instead of boolean) in profile entries *_ENABLED [#33](https://github.com/hacki11/ioBroker.valloxmv/issues/33).
* Fixed setting connection info without ack value.

### 1.1.2
* Fixed wrong datatype (string) in temperature states instead of numbers

### 1.1.1
* Fix adapter-checker issues

### 1.1.0
* A_CYC_BYPASS_LOCKED added
* A_CYC_SUPP_FAN_BALANCE_BASE added
* A_CYC_EXTR_FAN_BALANCE_BASE added
* A_CYC_IP_ADDRESS added
* A_CYC_CELL_STATE changed to read only

### 1.0.3
* Fix adapter-checker issues

### 1.0.2
* Added subscriptions of own objects to allow write values

### 1.0.1 
* Fixed resetting custom configuration of objects
* Removed subscription of own objects

### 1.0.0
* Fixed empty states
* Canged bool states to switches

### 0.1.3
* added expert settings (@williandalton, @hliebscher)
  * A_CYC_RH_BASIC_LEVEL
  * A_CYC_CO2_THRESHOLD
  * A_CYC_RH_LEVEL_MODE
  * A_CYC_SUPPLY_HEATING_ADJUST_MODE
  * A_CYC_OPT_TEMP_SENSOR_MODE

### 0.1.2
* add State 'NORMAL' to A_CYC_MODE (@williandalton)

### 0.1.1
* fix io-package.json version number

### 0.1.0
* added profile switch and editing

### 0.0.1
* (hacki11) initial release

## License
MIT License

Copyright (c) 2025 hacki11