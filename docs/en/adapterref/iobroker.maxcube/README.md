![Logo](admin/maxcube.png)
# ioBroker.maxcube
==================================
![Number of Installations](http://iobroker.live/badges/maxcube-installed.svg)
![Number of Installations](http://iobroker.live/badges/maxcube-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.maxcube.svg)](https://www.npmjs.com/package/iobroker.maxcube)

![Test and Release](https://github.com/ioBroker/ioBroker.maxcube/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/maxcube/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.maxcube.svg)](https://www.npmjs.com/package/iobroker.maxcube)

ioBroker adapter to control Max! via Cube

## Supported devices
- Thermostat
- Door/window sensor
- Push button (only battery status)

## Usage
Before using you must first connect all devices to MAX! Cube via MAX! Firmware. 

## Changelog

### 1.0.4 (2021-07-15)
* (thost96/Apollon77) optimize for js-controller 3.3

### 1.0.3 (2021-04-10)
* (thost96) fixed state has no existing object for info.serial_number

### 1.0.3 (2021-04-11)
* (thost96) Prevent js-controller 3.2 warnings

### 1.0.2 (2020-07-28)
* (Apollon77) Update dependencies
* (Apollon77) make compatible with js-controller 3

### 1.0.1 (2018-07-06)
* (stabilostick) initialization of working state
* (stabilostick) setpoint rounding to 0.5
* (stabilostick) upstream only changed states
* (stabilostick) stabilize state display for setpoint and mode values

### 1.0.0 (2018-05-24)
* (bluefox) refactoring
* (bluefox) added admin3

### 0.1.2 (2017-06-11)
* (paul53) Try to read wall thermostat

### 0.1.1 (2017-06-07)
* (bluefox) use local maxcube lib

### 0.1.0 (2017-06-05)
* (bluefox) intial commit

## License

MIT Copyright (c) 2017-2021 bluefox
