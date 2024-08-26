![Logo](admin/bascloud.png)

# ioBroker.bascloud

[![NPM version](https://img.shields.io/npm/v/iobroker.bascloud.svg)](https://www.npmjs.com/package/iobroker.bascloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bascloud.svg)](https://www.npmjs.com/package/iobroker.bascloud)
![Number of Installations](https://iobroker.live/badges/bascloud-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/bascloud-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.bascloud.png?downloads=true)](https://nodei.co/npm/iobroker.bascloud/)

![Test and Release](https://github.com/BAScloud/ioBroker.bascloud/workflows/Test%20and%20Release/badge.svg)

## BAScloud adapter for ioBroker

[BAScloud](https://bascloud.net/) is a secure platform for networking and storing building information across properties. In addition to historical and current measured values and general information on data points, it stores master data of buildings centrally in a private cloud.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.4.0 (2024-07-15)

- (Yanick) fixes from feedback
- (Yanick) upgrade js-controller and admin dependency
- (Yanick) filter invalid characters
- (Yanick) fix various crashes and timeouts
- (Yanick) add translations to all labels
- (Yanick) set correct types and values
- (Yanick) add testing for windows and macos

### 0.3.0 (2024-06-05)

- (Yanick) always send function
- (Yanick) add function to send on start

### 0.2.0 (2024-06-04)

- (Yanick) fixes for automated adapter testing

### 0.1.2 (2024-06-04)

- (Yanick) fix for 0 values
- (Yanick) translation updates

### 0.1.1 (2024-06-03)

- (Yanick) small fixes, add build folder

### 0.1.0 (2024-06-03)

- (Yanick) initial release

## License

MIT License

Copyright (c) 2024 Yanick Stephan <stephan@bascloud.net>

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
