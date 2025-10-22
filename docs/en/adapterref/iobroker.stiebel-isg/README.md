![Logo](admin/stiebel-isg.png)
# ioBroker.stiebel-isg

[![NPM version](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)](https://www.npmjs.com/package/iobroker.stiebel-isg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)](https://www.npmjs.com/package/iobroker.stiebel-isg)
![Number of Installations (latest)](https://iobroker.live/badges/stiebel-isg-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/stiebel-isg-stable.svg)
[![Dependency Status](https://img.shields.io/david/unltdnetworx/iobroker.stiebel-isg.svg)](https://david-dm.org/unltdnetworx/iobroker.stiebel-isg)

[![NPM](https://nodei.co/npm/iobroker.stiebel-isg.png?downloads=true)](https://nodei.co/npm/iobroker.stiebel-isg/)

**Tests:** ![Test and Release](https://github.com/unltdnetworx/ioBroker.stiebel-isg/workflows/Test%20and%20Release/badge.svg)

## stiebel-isg adapter for ioBroker

This adapter is a ment to read values from stiebel-eltron/tecalor internet service gateways (ISG) and control the device.


## Steps

1. Install the adpater
2. Grab the values out of the your stiebel-isg.[x]-object.

## Requirements

* stiebel-eltron/tecalor internet service gateway (ISG)

## Credits

This adapter would not have been possible without the great work of Michael Schuster (unltdnetworx) <https://github.com/unltdnetworx>, who created previous releases of this adapter.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0-alpha.1 (2025-10-21)

- (mcm1957) Adapter has been migrated to iobroker-communita-adapters organisation
- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 1.7.7

* security- and compatibility update

### 1.7.6

* fix error with controller v5

### 1.7.5

* security enhancements

### 1.7.4

* security enhancements

## License
MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 Michael Schuster <development@unltd-networx.de>

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
