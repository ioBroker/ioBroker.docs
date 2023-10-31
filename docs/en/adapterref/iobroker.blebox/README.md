![Logo](admin/blebox.png)
# ioBroker.blebox

[![NPM version](http://img.shields.io/npm/v/iobroker.blebox.svg)](https://www.npmjs.com/package/iobroker.blebox)
[![Downloads](https://img.shields.io/npm/dm/iobroker.blebox.svg)](https://www.npmjs.com/package/iobroker.blebox)
[![Known Vulnerabilities](https://snyk.io/test/github/ka-vaNu/ioBroker.blebox/badge.svg)](https://snyk.io/test/github/ka-vaNu/ioBroker.blebox)

[![NPM](https://nodei.co/npm/iobroker.blebox.png?downloads=true)](https://nodei.co/npm/iobroker.blebox/)

## blebox adapter for ioBroker

Adapter for controlling the Smarthome devices of the manufacturer [blebox](https://blebox.eu/). The API description can be found [here](https://technical.blebox.eu/). The implementation has taken place without the support of the manufacturer.

An incomplete and outdated API simulation can be downloaded [here](https://github.com/blebox/blebox-virtual-devices).

The following devices are currently supported:

* shutterbox
* switchbox
* saunabox
* tempsensor
* gatebox
* tvlift
* multisensor - not tested with real hardware, up to 4 sensors are supported

## Changelog

<!--
    Placeholder for the next version:
    ### **WORK IN PROGRESS**
-->

### 2.1.0 (2023-10-13)

* (Kai van Nuis) Support for multiSensor

### 2.0.1 (2023-03-12)

* (Kai van Nuis) Update dependecies

### 2.0.0 (2022-09-18)

* (Kai van Nuis) Change to Admin UI 5

### 1.1.0

* Support for gateBox implemented and eslint converted

### 0.1.2

* Fixes due to code review
### 0.1.1

* First stable release

## License
MIT License

Copyright (c) 2023 Kai van Nuis <kai@vannuis.de>

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
