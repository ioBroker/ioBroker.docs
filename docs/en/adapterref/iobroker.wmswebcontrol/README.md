![Logo](admin/wmswebcontrol.png)

# ioBroker.wmswebcontrol

[![NPM version](https://img.shields.io/npm/v/iobroker.wmswebcontrol.svg)](https://www.npmjs.com/package/iobroker.wmswebcontrol)
[![Downloads](https://img.shields.io/npm/dm/iobroker.wmswebcontrol.svg)](https://www.npmjs.com/package/iobroker.wmswebcontrol)
![Number of Installations (latest)](https://iobroker.live/badges/wmswebcontrol-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/wmswebcontrol-stable.svg)
[![Dependency Status](https://img.shields.io/david/TA2k/iobroker.wmswebcontrol.svg)](https://david-dm.org/TA2k/iobroker.wmswebcontrol)

[![NPM](https://nodei.co/npm/iobroker.wmswebcontrol.png?downloads=true)](https://nodei.co/npm/iobroker.wmswebcontrol/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.wmswebcontrol/workflows/Test%20and%20Release/badge.svg)

## wmswebcontrol adapter for ioBroker

Adapter for Warema WMS Webcontrol

## Usage

To control your device change the \*Convert values.

`wmswebcontrol.0.Markise+XXXX.setting0Convert`

`wmswebcontrol.0.LED+XXXXXXX.setting1Convert`

`wmswebcontrol.0.Markise.setting2Convert`

Hint: The password which is set in adapter settings shall not have special characters.

## Changelog
### 0.1.4 (2025-01-27)

- ignore certificate errors

### 0.1.3 (2024-10-26)

- fix login

### 0.1.2

- Bugfixes

### 0.0.3

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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
