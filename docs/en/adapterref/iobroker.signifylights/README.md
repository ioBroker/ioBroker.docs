![Logo](admin/signifylights.png)
# ioBroker.signifylights

[![NPM version](https://img.shields.io/npm/v/iobroker.signifylights.svg)](https://www.npmjs.com/package/iobroker.signifylights)
[![Downloads](https://img.shields.io/npm/dm/iobroker.signifylights.svg)](https://www.npmjs.com/package/iobroker.signifylights)
![Number of Installations](https://iobroker.live/badges/signifylights-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/signifylights-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.signifylights.png?downloads=true)](https://nodei.co/npm/iobroker.signifylights/)

**Tests:** ![Test and Release](https://github.com/disaster123/ioBroker.signifylights/workflows/Test%20and%20Release/badge.svg)

## signifylights adapter for ioBroker

Signify Lights adapter for all Types of Signify WLAN lights like WIZ, Philips WLAN and many more...

Questions and discussion here: https://forum.iobroker.net/topic/69656/test-adapter-signifylights

### DISCLAIMER

This project is NOT affiliated with, funded, or in any way associated with WIZ, Signify
or Philips. All brand and product names are trademarks or registered trademarks of their respective holders. 
Reference to a company or a product name does not imply approval or recommendation of 
that company or product to the exclusion of others.

## Changelog
### 0.4.2 (2024-11-06)
* implement responsive design in config page (thx simatec)

### 0.4.1 (2024-11-02)
* fix eslint 9.x
* add ESP26_SHRGB_01: WIZ Wi-Fi BLE ST64 E27 822-65 RGB CL
* add ESP25_SHRGB_01: added (WiZ Wi-Fi BLE 60W A60 E27 822-65 RGB)
* various stuff from adapter check

### 0.3.1 (2023-11-27)
* fix scenes for ESP03_SHTWP_31, ESP24_SHRGBW_01, ESP06_SHTW1_01
* retry to release v0.3.1

### 0.3.0 (2023-10-27)
* several translation fixes
* replace logo
* use adapter interval instead of timeout
* new DEVICES: ESP24_SHRGBC_01 + ESP25_SHWRGB_01 + ESP15_SHRGB1S_01I
* config: allow to run without udp mac and ip set

### 0.2.0 (2023-05-02)
* more setTimeout fixes

### 0.1.1 (2023-05-01)
* fix setTimeout calls in async functions

### 0.1.0 (2023-05-01)
* various fixes and changes to become an official adapter

### 0.0.6 (2023-04-30)
* first release under new name

## License
MIT License

Copyright (c) 2024 disaster123 <stefan-iobroker@prie.be>

originally developed by Copyright (c) 2022 nxtstep <privat@konzeptplus.net>

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
