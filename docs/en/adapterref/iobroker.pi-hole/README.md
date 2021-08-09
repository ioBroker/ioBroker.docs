# ioBroker.pi-hole ![Logo](admin/pi-hole.png)

![Number of Installations](http://iobroker.live/badges/pi-hole-installed.svg) ![Number of Installations](http://iobroker.live/badges/pi-hole-stable.svg)

=================

[![Build Status](https://api.travis-ci.org/unltdnetworx/ioBroker.pi-hole.svg?branch=master)](https://travis-ci.org/unltdnetworx/ioBroker.pi-hole)
[![NPM version](https://img.shields.io/npm/v/iobroker.pi-hole.svg)](https://www.npmjs.com/package/iobroker.pi-hole)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pi-hole.svg)](https://www.npmjs.com/package/iobroker.pi-hole)

[![NPM](https://nodei.co/npm/iobroker.pi-hole.png?downloads=true)](https://nodei.co/npm/iobroker.pi-hole/)

This adapter is a ment to read values from a running pi-hole and control the device (start/stop).

USE AT YOUR OWN RISK!!! ABSOLUTELY NO WARRANTY FOR DAMAGES, ETC.!!!

Help or hints are welcome.

## Steps

1. Install the adpater

2. Fill in the fields of the adapter-admin. The ip-adress of the pi-hole device, the API-Token, which you can get from the admin web-interface of the pi-hole device (Settings/API/Get token), and obligatory the intervall to renew the values of the pi-hole (renew statistic in iobroker))

3. Some of the objects are json-tables, you can use inside vis.

4. Activate the filter by clicking the button "activate pi-hole", deactivate the filter by changing the value of "dactivate pi-hole" (0 for permanently, number for amount of seconds)

## Requirements

* running pi-hole device

## Changelog

### 1.3.2

* (unltdnetworx) ready for Admin 5 and NodeJS 16

### 1.3.1

* (unltdnetworx) new adapter testing and security update

### 1.3.0

* (unltdnetworx) info for versions and updates added, updatePiholeAvailable removed

### 1.2.3

* (unltdnetworx) bugfix for numbers with comma

### 1.2.2

* (unltdnetworx) bugfix for objecttypes

### 1.2.1

* (unltdnetworx) bugfix for update notification

### 1.2.0

* (unltdnetworx) datapoint for available update

### 1.1.0

* (unltdnetworx) support for ssl-connection

### 1.0.1

* (unltdnetworx) bugfixes

### 1.0.0

* (unltdnetworx) rise of version-number - stable version

### 0.2.1

* (unltdnetworx) small bugfix for storage

### 0.2.0

* (unltdnetworx) cleanup and bugfix for restart and storage

### 0.1.0

* (unltdnetworx) fully working release for LTE_API

### 0.0.1

* (unltdnetworx) initial release

## Donate

Kaffee spendieren/serve a coffee
<https://paypal.me/unltdnetworx>

## License

MIT License

Copyright (c) 2021 Michael Schuster

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
