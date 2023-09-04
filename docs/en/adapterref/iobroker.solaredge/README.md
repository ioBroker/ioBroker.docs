![Logo](admin/solaredge.png)
# ioBroker.solaredge

[![NPM version](http://img.shields.io/npm/v/iobroker.solaredge.svg)](https://www.npmjs.com/package/iobroker.solaredge)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solaredge.svg)](https://www.npmjs.com/package/iobroker.solaredge)
![Number of Installations (latest)](http://iobroker.live/badges/solaredge-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/solaredge-stable.svg)
[![Dependency Status](https://img.shields.io/david/92lleo/iobroker.solaredge.svg)](https://david-dm.org/92lleo/iobroker.solaredge)
[![Known Vulnerabilities](https://snyk.io/test/github/92lleo/ioBroker.solaredge/badge.svg)](https://snyk.io/test/github/92lleo/ioBroker.solaredge)

[![NPM](https://nodei.co/npm/iobroker.solaredge.png?downloads=true)](https://nodei.co/npm/iobroker.solaredge/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/92lleo/ioBroker.solaredge/master.svg)](https://travis-ci.org/92lleo/ioBroker.solaredge)

## solaredge adapter for ioBroker

Get data from solaredge monitoring portal.
Currently, only the /overview data point is used to get the current power and day/month/year/lifetime energy readings.

You can also enable modbus on your solaredge device if it's a newer one and read the data directly. 

You need your site id and api key to use this adapter. To get these, go to https://monitoring.solaredge.com  
site id: log in, site id is the "ID" on the right, eg 12345  
api key: log in, go to the admin settings and enable api access there. If you don't see admin settings, send a mail to solaredge to enable admin for your account.

Roadmap:
* Add power and energy details
* Add other devices than inverters

## Changelog

### 0.3.0
* (Apollon77) Address review feedback from adapter review (see #19)

### 0.2.0
* (92lleo) Add default values for native config vars
* (92lleo) Set schedule to 15s to match api update rate
* (92lleo) Fix updating already created states (broken since new js-controller, see #9)
* (92lleo) Update dependencies
* (92lleo) Clear timer on unload
* (92lleo) Add connection type and dataSource

### 0.1.1
* (92lleo) fix "object data is invalid" issue, now works with new js-controller
* (92lleo) update dependencies

### 0.1.0
* (92lleo) first beta release. overview data from inteverters are available

### 0.0.1
* (92lleo) initial release

## License
MIT License

Copyright (c) 2019-2021 Leonhard Kuenzler <leonhard@kuenzler.io>

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