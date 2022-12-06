![Logo](admin/ekey.png)
# ioBroker.ekey

[![Greenkeeper badge](https://badges.greenkeeper.io/ioBroker/ioBroker.ekey.svg)](https://greenkeeper.io/)

![Number of Installations](http://iobroker.live/badges/ekey-installed.svg) ![Number of Installations](http://iobroker.live/badges/ekey-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.ekey.svg)](https://www.npmjs.com/package/iobroker.ekey)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ekey.svg)](https://www.npmjs.com/package/iobroker.ekey)
[![Dependency Status](https://gemnasium.com/badges/github.com/ioBroker/ioBroker.ekey.svg)](https://gemnasium.com/github.com/ioBroker/ioBroker.ekey)
[![Code Climate](https://codeclimate.com/github/ioBroker/ioBroker.ekey/badges/gpa.svg)](https://codeclimate.com/github/ioBroker/ioBroker.ekey)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.ekey/master.svg)](https://travis-ci.org/ioBroker/ioBroker.ekey)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.ekey?branch=master&svg=true)](https://ci.appveyor.com/project/ioBroker/ioBroker-ekey/)

[![NPM](https://nodei.co/npm/iobroker.ekey.png?downloads=true)](https://nodei.co/npm/iobroker.ekey/)

This adapter for ioBroker connects to an ekey connector UDP.

Implemented as described in:
- https://descargas.futurasmus-knxgroup.org/doc/en/ekey/13002/operating_instructions_ekey_converter_udp_rs485_id51.pdf
- NET protocol: https://www.ekey.net/wp-content/dokumente/Operating_instructions_ekey_net_4.4_en_web_ID181_3006.pdf (page 189)

![image](img/ekey.png)

## Serial Port
Experimental feature to connect to ekey via serial port. This is not tested yet.

You can activate serial port to receive data via USB RS485 or RS 232 converter.
Actually only finger hash is supported. To help to decode more data from device please open the issue with the data you received.

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 1.2.3 (2022-11-22)
* (bluefox) Added `net` protocol support
* (bluefox) Added serial port support

### 1.1.0
* (bluefox) Added compact mode
* (bluefox) Own port is now configurable

### 1.0.0
* (bluefox) Configuration dialog under firefox was corrected

### 0.2.1
* (bluefox) tests were added

### 0.1.0
* (bluefox) initial release

## License

The MIT License (MIT)

Copyright (c) 2018-2022 ioBroker <dogafox@gmail.com>

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
