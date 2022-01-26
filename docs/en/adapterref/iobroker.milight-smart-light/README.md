![milight-smart-light Logo](admin/milight-smart-light.png)

# ioBroker.milight-smart-light

[![NPM version](http://img.shields.io/npm/v/iobroker.milight-smart-light.svg)](https://www.npmjs.com/package/milight-smart-light)
[![Downloads](https://img.shields.io/npm/dm/iobroker.milight-smart-light.svg)](https://www.npmjs.com/package/iobroker.milight-smart-light)
[![stable](http://iobroker.live/badges/milight-smart-light-stable.svg)](http://iobroker.live/badges/milight-smart-light-stable.svg)
[![installed](http://iobroker.live/badges/milight-smart-light-installed.svg)](http://iobroker.live/badges/milight-smart-light-installed.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/steiger04/ioBroker.milight-smart-light/badge.svg)](https://snyk.io/test/github/steiger04/ioBroker.milight-smart-light)

![Test and Release](https://github.com/steiger04/ioBroker.milight-smart-light/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.milight-smart-light.png?downloads=true)](https://nodei.co/npm/iobroker.milight-smart-light/)

This adapter for ioBroker controls Milight LED bulbs and LED strips and
based on the node module from mwittig.

mwittig / [node-milight-promise](https://github.com/mwittig/node-milight-promise)

With adapter you can use both: **v6 Bridge** and **Legacy Bridge**.

**v6 Bridge:**
- bridge (only iBox1)
- white
- rgb(w)
- fullColor
- fullColor8Zone

**Legacy Bridge:**
- white
- rgb(w)

**Description**

A detailed description can be found [here](https://steiger04.github.io/milight-smart-light-doku/).

### Versions
- **Node.js**: use v. 14.x or higher
- **iobroker.admin**: use v. 5.1.25 or higher


## Changelog
### 1.2.2 (2021-10-17)
- (steiger04) Compatibility check and testing for Node.js 16 and some CSS adjustments
### 1.2.1 (2021-05-18)
- (steiger04) Compatibility with socketio v3.1.4 
### 1.2.0 (2021-01-16)
- (steiger04) compact mode added
### 1.0.5 (2021-01-10)
- (steiger04) Small bug fix
### 1.0.1 (2020-11-21)
- (steiger04) Added admin-UI based on Vue and Quasar
### 0.6.0 (2020-05-23)
- (steiger04): Added effectBrightness, effectOn, effectOff, effectOnOff for iBox1 and iBox2
### 0.5.0 (2020-05-21)
- (steiger04): Bug fix in rgb(w)

## License
The MIT License (MIT)

Copyright (c) 2017-2021 Steiger04 <steiger04@posteo.de>
