<h1>
	<img src="admin/linkeddevices.png" width="32"/>
	ioBroker.linkeddevices
</h1>

![Number of Installations](http://iobroker.live/badges/linkeddevices-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.linkeddevices.svg)](https://www.npmjs.com/package/iobroker.linkeddevices)
[![Number of Installations](http://iobroker.live/badges/linkeddevices-installed.svg)](https://www.npmjs.com/package/iobroker.linkeddevices)
[![Downloads](https://img.shields.io/npm/dm/iobroker.linkeddevices.svg)](https://www.npmjs.com/package/iobroker.linkeddevices)
[![Dependency Status](https://img.shields.io/david/Scrounger/iobroker.linkeddevices.svg)](https://david-dm.org/Scrounger/iobroker.linkeddevices)
[![Known Vulnerabilities](https://snyk.io/test/github/Scrounger/ioBroker.linkeddevices/badge.svg)](https://snyk.io/test/github/Scrounger/ioBroker.linkeddevices)

[![NPM](https://nodei.co/npm/iobroker.linkeddevices.png?downloads=true)](https://nodei.co/npm/iobroker.linkeddevices/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/Scrounger/ioBroker.linkeddevices/master.svg)](https://travis-ci.org/Scrounger/ioBroker.linkeddevices)

## linkeddevices adapter for ioBroker
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)

linkeddevices creates linked objects (datapoints) of devices with a
self-defined structure. This makes it possible to create a structure
in ioBroker, where all objects are centralized, e.g. to be used in vis
views or scripts. This offers for example the advantage that with
hardware exchange, only the linked objects must be recreated and all
vis views and scripts works again.

With the adapter you can also convert objects or convert them to
other types (not yet fully implemented).

![Strukture](screenshots/structure.png)

This adapter is inspired from [virtual devices script by Pman](https://forum.iobroker.net/topic/7751/virtual-devices).

## Configuration
* [English description](doc/en/README.md)
* [deutsche Beschreibung](doc/de/README.md)

## Changelog

### 1.1.1
* (Scrounger) string to number bug fix

### 1.1.0
* (Scrounger) option to merge linkedObject on adapter restart added
* (Scrounger) string to number conversion added
* (algar42) russian translation corrected

### 1.0.1
* (Scrounger) adapter configuration: repair function added
* (Scrounger) receive system messages added

### 1.0.0
* (Scrounger) bug fixes

### 0.5.6
* (Scrounger) bug fixes

### 0.5.5
* (Scrounger) custom dialog: role change for linked object added
* (Scrounger) adapter configuration: auto generate globale script - check if object always linked added
* (SchumyHao, Scrounger) create channel objects for linked Objects
* (Scrounger) adapter configuration: layout revised, progressbar added
* (Scrounger) custom dialog: layout revised

### 0.5.0
* (Scrounger) custom dialog: suggestion dropdown list added to input fields
* (Scrounger) adapter configuration: button to remove links added
* (Scrounger) expert settings: Converter string (readonly) to duration, date and / or datetime added
* (Scrounger) adapter configuration: layout revised
* (Scrounger) expert settings number: allow negative values for min / max
* (Scrounger) adapter configuration: auto generate globale script - optional create setState funtion for readonly objects
* (Scrounger) adapter configuration: auto generate globale script - now optional recognize also manual created objects
* (Scrounger) bug fixes

### 0.4.1
* (Scrounger) Bug fix: auto generate globale script for [Javascript Script Engine](https://github.com/iobroker/ioBroker.javascript/blob/master/README.md) with variables for all linked Object

### 0.4.0
* (Scrounger) expertsettings for string: convert to boolean
* (Scrounger) custom settings of linked object: added button to open custom settings of parent object
* (Scrounger) adapter configuration: auto generate globale script for [Javascript Script Engine](https://github.com/iobroker/ioBroker.javascript/blob/master/README.md) with variables for all linked Object
* (Scrounger) Bug fix: native data stored in linked object if available
* (Scrounger) bug fixes

### 0.3.2
* (Scrounger) expertsettings for string: add prefix and suffix to string
* (Scrounger) expertsettings for number (readonly): convert to duration
* (Scrounger) expertsettings for number (readonly): convert to date, time or datetime
* (Scrounger) bug fixes

### 0.3.0
* (Scrounger) linked devices overview added to adapter configuration
* (Scrounger) bug fixes

### 0.2.1
* (Scrounger) boolean to string converter added
* (Scrounger) bug fixes

### 0.2.0
* (Scrounger) number to boolean converter added
* (Scrounger) number expert settings for min, max added
* (Scrounger) bug fixes

### 0.1.5
* (Scrounger) expert settings properties renamed -> you must recreate your expert settings for all parent objects !!!
* (Scrounger) custom dialog prepared for convert to other type
* (Scrounger) bug fixes

### 0.1.0
* (Scrounger) custom dialog layout changed
* (Scrounger) conversion bug fixes
* (Scrounger) change unit bug fixes

### 0.0.4
* (Scrounger) main function added
* (Scrounger) change unit for linked objects
* (Scrounger) set number of decimal places for linked objects
* (Scrounger) set conversion for read only linked objects

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2019 Scrounger

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