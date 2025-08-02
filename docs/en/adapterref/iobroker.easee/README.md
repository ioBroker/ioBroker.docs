![Logo](admin/easee.png)
# ioBroker.easee

[![NPM version](http://img.shields.io/npm/v/iobroker.easee.svg)](https://www.npmjs.com/package/iobroker.easee)
[![Downloads](https://img.shields.io/npm/dm/iobroker.easee.svg)](https://www.npmjs.com/package/iobroker.easee)
![Number of Installations (latest)](http://iobroker.live/badges/easee-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/easee-stable.svg)
[![Dependency Status](https://img.shields.io/david/Newan/iobroker.easee.svg)](https://david-dm.org/Newan/iobroker.easee)
[![Known Vulnerabilities](https://snyk.io/test/github/Newan/ioBroker.easee/badge.svg)](https://snyk.io/test/github/Newan/ioBroker.easee)

[![NPM](https://nodei.co/npm/iobroker.easee.png?downloads=true)](https://nodei.co/npm/iobroker.easee/)

**Tests:** ![Test and Release](https://github.com/Newan/ioBroker.easee/workflows/Test%20and%20Release/badge.svg)

## easee adapter for ioBroker

Adapter to connect Easee Wallbox

## Help

chargerOpMode =
    Offline: 0,
    Disconnected: 1,
    AwaitingStart: 2,
    Charging: 3,
    Completed: 4,
    Error: 5,
    ReadyToCharge: 6

dynamicCircuitCurrentPX -> All phases must be set within 500ms (script) otherwise the phase will be set to 0.    


## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.0.10 (2023-07-27)
* (Newan) fix version number

### 1.0.9 (2023-07-27)
* (walburgf)  changed API URL from api.easee.cloud to api.easee.com
* (walburgf)  created addition parameter in admin config to reduce/steer logging information for user
* (walburgf)  modified internationalization to use jsonConfig.json. this needs at least ioBroker.admin version 5
* (walburgf)  added dependency to admin >=v5.1.28

### 1.0.8 (2023-07-02)
* (Newan)  small fixes

### 1.0.7
* (Newan) Changed login URL

### 1.0.6
* (Newan) Changed that smart charging is editable

### 1.0.5
* (marwin79) More Features supported and convert values to expected datatypes

### 1.0.4
* (Newan) dynamicCircuitCurrentPX writeable (set all Phases in 500ms) to limit ampere

### 1.0.3
* (Newan) Adapter crash fixed an other bugfixes

### 1.0.1
* (Newan) Add circuitMaxCurrentPX to limit current ampere

### 1.0.0
* (Newan) Stable Version with SignalR

## Donation
[![](https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L55UBQJKJEUJL)

## License
MIT License

Copyright (c) 2025 Newan <iobroker@newan.de>

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
