# ioBroker.energymanager

![Logo](admin/energymanager.png)

=================

[![Build Status](https://api.travis-ci.org/unltdnetworx/ioBroker.energymanager.svg?branch=master)](https://travis-ci.org/unltdnetworx/ioBroker.energymanager)
[![NPM version](https://img.shields.io/npm/v/iobroker.energymanager.svg)](https://www.npmjs.com/package/iobroker.energymanager)
[![Downloads](https://img.shields.io/npm/dm/iobroker.energymanager.svg)](https://www.npmjs.com/package/iobroker.energymanager)

[![NPM](https://nodei.co/npm/iobroker.energymanager.png?downloads=true)](https://nodei.co/npm/iobroker.energymanager/)

This adapter is a ment to read values from devices powered by the kiwigrid network like the E.ON Energymanager into ioBroker. Also confirmed is the Solarwatt manager. It's possible that there are other devices working with this adapter, maybe innogy or enviam.

Help or hints are welcome.


## Requirements

* E.ON Aura energymanger, Solarwatt MyReserve energymanger or other kiwigrid-powered device

## Credits

This adapter would not have been possible without the great work of Michael Schuster <development@unltd-networx.de>, who created previous releases of this adapter.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 2.0.1 (2026-03-05)
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Dependencies have been updated

### 2.0.0 (2025-11-28)
* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Dependencies have been updated

### 1.4.2
* security- and compatibilityupdate

### 1.4.1
* clear version number

### 1.3.5
* changed the year in readme and license

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 Michael Schuster <development@unltd-networx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
