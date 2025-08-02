![Logo](admin/radar-trap.png)

# ioBroker.radar-trap

![Number of Installations](http://iobroker.live/badges/radar-trap-installed.svg) ![Number of Installations](http://iobroker.live/badges/radar-trap-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.radar-trap.svg)](https://www.npmjs.com/package/iobroker.radar-trap)
[![Downloads](https://img.shields.io/npm/dm/iobroker.radar-trap.svg)](https://www.npmjs.com/package/iobroker.radar-trap) [![Test and Release](https://github.com/Steiger04/ioBroker.radar-trap/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Steiger04/ioBroker.radar-trap/actions/workflows/test-and-release.yml)

[![NPM](https://nodei.co/npm/iobroker.radar-trap.png?downloads=true)](https://nodei.co/npm/iobroker.radar-trap/)

<h2 align="center">radar-trap for ioBroker</h2>

## Documentation
[German radar-trap Wiki](https://github.com/Steiger04/ioBroker.radar-trap/wiki/radar-trap-Adapter-(deutsch))

[English radar-trap Wiki](https://github.com/Steiger04/ioBroker.radar-trap/wiki/radar-trap-Adapter-(english))

---

## Changelog
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 2.2.2 (2024-08-04)
* (Steiger04) Deprecated createState, createChannel, createDevice replaced with setObject and delDevice replaced with delObject

### 2.2.1 (2024-07-07)
* (Steiger04) Dependencies updated

### 2.2.0 (2024-05-22)
* (Steiger04) Added counties selection for areas

### 2.1.3 (2024-05-12)
* (Steiger04) new build run

### 2.1.2 (2024-05-12)
* (Steiger04) test-and-release.yml changed

### 2.1.1 (2024-05-12)
* (Steiger04) test-and-release.yml changed

### 2.1.0 (2024-05-12)
* (Steiger04) Dependencies updated
* (Steiger04) Some code optimizations

### 2.0.0 (2024-04-10)
* (Steiger04) !!! No VIS widgets anymore. Continue using v1.3.1 for VIS widgets. Starting from this version, only VIS-2 widgets are supported. !!!
* (Steiger04) Changed Wiki
* (Steiger04) Many optimizations and bug fixes

### 1.3.1 (2024-02-10)
* (Steiger04) Bug fixes trapInfo for traps

### 1.3.0 (2024-02-08)
* Steiger04) new states for new and rejected traps

### 1.2.0 (2024-02-04)
* (Steiger04) Added new state lastUpdated
* (Steiger04) UI optimized

### 1.1.5 (2024-01-23)
* (Steiger04) createTheme added

### 1.1.4 (2024-01-22)
* (Steiger04) legacy-peer-deps added

### 1.1.3 (2024-01-22)
* (Steiger04) Some GUI optimizations

### 1.1.2 (2024-01-15)
* (Steiger04) Fixed version conflict between react 17 and react 18

### 1.1.1 (2024-01-14)
* (Steiger04) Fixed legacy-peer-deps

### 1.1.0 (2024-01-14)
* (Steiger04) Updated on mui5, adapter-react-v5, react 18, react-dom 18
* (Steiger04) Fixed some issues in connection with react 18

### 1.0.13 (2023-12-23)
* (Steiger04) Circle mode added

### 1.0.12 (2023-12-19)
* (Steiger04) test-and-release.yml changed

### 1.0.11 (2023-12-19)
* (Steiger04) figbird.js removed
* (Steiger04) Code optimized
* (Steiger04) packages updated
* (Steiger04) DB moved to files folder

### 1.0.10 (2023-12-02)
* (Steiger04) io-package.json changed (ignoreInVersions)

### 1.0.9 (2023-11-30)
* (Steiger04) Bugfix for using vis

### 1.0.8 (2023-11-29)
* (Steiger04) Install vis-widgets only for using vis
* (Steiger04) vis must not be installed for using radar-trap

### 1.0.7 (2023-09-30)
* (Steiger04) Added features for vis-widgets
* (Steiger04) Added states for counting traps

### 1.0.6 (2023-09-27)
* (Steiger04) nanoid downgraded to 4.0.2

### 1.0.5 (2023-09-27)
* (Steiger04) UI optimized and packages updated

### 1.0.4 (2023-06-17)
* (Steiger04) Added english documentation

### 1.0.3 (2023-05-18)
* (Steiger04) Changed testmatrix in test-and-release.yml

### 1.0.2 (2023-05-18)
* (Steiger04) Added documentation

### 1.0.1 (2023-05-17)
* (Steiger04) initial release

## License

MIT License

Copyright (c) 2023-2024 Steiger04 <steiger04@posteo.de>

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
