![Logo](admin/adguard.png)

# ioBroker.adguard

[![NPM version](https://img.shields.io/npm/v/iobroker.adguard.svg)](https://www.npmjs.com/package/iobroker.adguard)
[![Downloads](https://img.shields.io/npm/dm/iobroker.adguard.svg)](https://www.npmjs.com/package/iobroker.adguard)
![Number of Installations (latest)](https://iobroker.live/badges/adguard-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/adguard-stable.svg)
[![Dependency Status](https://img.shields.io/david/o0shojo0o/iobroker.adguard.svg)](https://david-dm.org/o0shojo0o/iobroker.adguard)

[![NPM](https://nodei.co/npm/iobroker.adguard.png?downloads=true)](https://nodei.co/npm/iobroker.adguard/)

**Tests:** ![Test and Release](https://github.com/o0shojo0o/ioBroker.adguard/workflows/Test%20and%20Release/badge.svg)

## AdGuard adapter for ioBroker

AdGuard Home is a network-wide ad- and tracker-blocking DNS server with parental control (adult content blocking) capabilities. The AdGuard adapter allows you to control and monitor your AdGuard Home instance in ioBroker.

## Credits

This adapter would not have been possible without the great work of @o0Shojo0o (https://github.com/o0Shojo0o), who developed former releases of this adapter.

## How to report issues and feature requests

Ideally, please use GitHub issues for this, with the best method achieved by setting the adapter to Debug log mode (Instances -> Expert mode -> Column Log level). Then retrieve the logfile from disk via the  'log' ioBroker subdirectory, **not** from Admin, which will cut lines. 

## Configuration

1. Create a new instance of the adapter
2. Fill the URL/IP from AdGurad server
3. Configur username and password
4. Save the settings
5. Have fun :)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

### 1.0.0 (2024-10-19)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 0.0.8 (2021-08-18)

-   (o0Shojo0o) change UI to JSONConfig

### 0.0.7 (2021-08-01)

-   (o0Shojo0o) better unload handling

### 0.0.6 (2021-08-01)

-   (o0Shojo0o) more resource-efficient handling of the States
-   (o0Shojo0o) better unload handling

## License

MIT License

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Dennis Rathjen <info@bastelbunker.de>

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
