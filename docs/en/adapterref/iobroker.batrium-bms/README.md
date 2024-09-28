![Logo](admin/batrium-bms.png)
# ioBroker.batrium-bms

[![NPM version](https://img.shields.io/npm/v/iobroker.batrium-bms.svg)](https://www.npmjs.com/package/iobroker.batrium-bms)
[![Downloads](https://img.shields.io/npm/dm/iobroker.batrium-bms.svg)](https://www.npmjs.com/package/iobroker.batrium-bms)
![Test and Release](https://github.com/bembelstemmer/ioBroker.batrium-bms/workflows/Test%20and%20Release/badge.svg)
<!--
![Number of Installations](https://iobroker.live/badges/batrium-bms-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/batrium-bms-stable.svg)
-->

[![NPM](https://nodei.co/npm/iobroker.batrium-bms.png?downloads=true)](https://nodei.co/npm/iobroker.batrium-bms/)

## batrium-bms adapter for ioBroker

An ioBroker Adapter to track Metrics of your Batrium BMS published via UDP.

!!! This adapter is not officially supported by Batrium !!!

This Adapter is based on the official Batrium WatchMonUdpListener Implementation on:
https://github.com/Batrium/WatchMonUdpListener

Message Support is still limited and will be increased in further versions.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* Drop Support for Node v16
* Various Package Upgrades
* Increased min js-controller version to 5.0.19

### 0.5.0 (2023-09-10)
* Various Package Upgrades (inc. Update to ioBroker Adapter lib v3)
* Adding of Tests for Node Version 20.x
* Fixed marking of properties writeable even if they're not
* Fixed wrong Naming of Object 5732.ShuntStatus
* Reworked Object Roles to better match their meaning (where meaning was known)

### 0.4.0 (2023-03-22)
* Added Message Type 4232 (Cell Status Full)

### 0.3.0 (2023-03-05)
* Added Message Type 415a (Cell Status Small)
* Added Configuration per Message Type
* Added Rate Limit function per Message Type to reduce load on ioBroker DB

### 0.2.1 (2023-02-04)
* Readded build folder

### 0.2.0 (2023-02-04)
* Minor Type Fixes
* Added Message Type 6831

### 0.1.0 (2023-02-03)
* Optimized Parser Structure
* Finished up Message Type 5732
* Finished up Message Type 3233

### 0.0.2 (2023-01-31)
* Initial Test Release

## License
MIT License

Copyright (c) 2023 Bembelstemmer <kontakt[at]it-amm[dot]de>

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