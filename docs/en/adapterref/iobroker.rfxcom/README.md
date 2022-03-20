![Logo](admin/rfxcom.png)
# ioBroker.rfxcom

![Number of Installations](http://iobroker.live/badges/rfxcom-installed.svg)
![Number of Installations](http://iobroker.live/badges/rfxcom-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.rfxcom.svg)](https://www.npmjs.com/package/iobroker.rfxcom)

![Test and Release](https://github.com/ioBroker/ioBroker.rfxcom/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/rfxcom/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.rfxcom.svg)](https://www.npmjs.com/package/iobroker.rfxcom)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

This adapter communicates with [rfxcom](http://www.rfxcom.com).
Used for receiving the data from weather sensors and wireless power switches.

Read detailed documentation for RfxCom [here](http://www.rfxcom.com/WebRoot/StoreNL2/Shops/78165469/MediaGallery/Downloads/RFXtrx_User_Guide.pdf)

## Usage
To enable the learning of sensors you must activate "Inclusion mode". 
The inclusion mode by default will be enabled for 5 minutes (300000 ms) and after 5 minutes will be disabled automatically.

To enable inclusion mode forever, just set "Inclusion timeout" to 0.

## Pair
The devices get the new address every time the battery changed.

So after the battery changed it must be learned anew.

To do that press the pair button just before inserting the battery and the device will be learned with new address.

## ToDo
**Just now only Somfy, Curtain and Lighting3 devices are supported.**

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
## Changelog

### 2.0.2 (2021-11-10)
* (bluefox) Fixed error by deleting of object

### 2.0.1 (2021-06-29)
* (peterbaumert) update packages
* (bluefox) Breaking change: no linux with 32 bit support

### 1.0.1 (2020-08-05)
* (bluefox) Compact mode
* (bluefox) Support of node 10 added
* (bluefox) Refactoring

### 0.1.0 (2016-07-05)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2021, Bluefox<dogafox@gmail.com>

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
