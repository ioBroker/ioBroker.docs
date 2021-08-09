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

USE AT YOUR OWN RISK!!! ABSOLUTELY NO WARRANTY FOR DAMAGES, ETC.!!!

Help or hints are welcome.

## Donate

Kaffee spendieren/serve a coffee
<https://paypal.me/unltdnetworx>

## Steps

1. Install the adpater

2. Grab the values out of the your stiebel-isg.[x]-object.

## Requirements

* stiebel-eltron/tecalor internet service gateway (ISG)

## Changelog

### 1.7.3

* bugfix

### 1.7.2

* ready for Admin 5 and NodeJS 16

### 1.7.1

* bugfix for translation

### 1.7.0

* new adapter structure, bugfixes for new js-controller

### 1.6.1

* new values for isg-version 12 implemented

### 1.6.0

* isg-sites to read values from, can now be select by the user

### 1.5.3

* bugfix for latest_value added in statistics for database

### 1.5.2

* latest_value added in statistics for database

### 1.5.1

* new adapter testing and security update

### 1.5.0

* support for cooling values and startpage graphs

### 1.4.11

* support for further heatingtyp WPL25A

## License
MIT License

Copyright (c) 2018-2021 Michael Schuster <development@unltd-networx.de>

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
