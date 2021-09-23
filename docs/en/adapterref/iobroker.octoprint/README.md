![Logo](admin/octoprint.png)

# ioBroker.octoprint

[![NPM version](http://img.shields.io/npm/v/iobroker.octoprint.svg)](https://www.npmjs.com/package/iobroker.octoprint)
[![Downloads](https://img.shields.io/npm/dm/iobroker.octoprint.svg)](https://www.npmjs.com/package/iobroker.octoprint)
[![Stable](http://iobroker.live/badges/octoprint-stable.svg)](http://iobroker.live/badges/octoprint-stable.svg)
[![installed](http://iobroker.live/badges/octoprint-installed.svg)](http://iobroker.live/badges/octoprint-installed.svg)
[![Dependency Status](https://img.shields.io/david/klein0r/iobroker.octoprint.svg)](https://david-dm.org/klein0r/iobroker.octoprint)
[![Known Vulnerabilities](https://snyk.io/test/github/klein0r/ioBroker.octoprint/badge.svg)](https://snyk.io/test/github/klein0r/ioBroker.octoprint)
[![Build Status](http://img.shields.io/travis/klein0r/ioBroker.octoprint.svg)](https://travis-ci.com/klein0r/ioBroker.octoprint)

[![NPM](https://nodei.co/npm/iobroker.octoprint.png?downloads=true)](https://nodei.co/npm/iobroker.octoprint/)

Adapter to connect OctoPrint to ioBroker

Tested with OctoPrint 1.6.0

## Features

### Information

- Get version information
- Get printer information
- Get current print job information
- Get file list information

### Temperatures

- Set tool temperature
- Set bed temperature

### Commands

- Printer: Connect, disconnect and home
- Job: Start, Cancel, Restart
- SD-Card: Init, Refresh, Release
- Custom Printer Commands
- System Commands
- Jog X, Y and Z axis
- Select a file or print it

## Important!

DO NOT restart the octoprint instance (or any other instance) with code like this:

```javascript
var obj = getObject('system.adapter.octoprint.0');
obj.common.enabled = false;
setObject('system.adapter.octoprint.0', obj);
```

Since the API key is a protected attribute since version 1.1.0, this will remove the configured API key. The reason is, that `getObject` doesn't return protected information (so the api key is not included in the returned object). When you save the object, you will save an object without the key.

Please use state `system.adapter.octoprint.0.alive` to stop/start the instance.

## Changelog

### 1.1.2

* (klein0r) Updated file refresh handling

### 1.1.1

* (klein0r) Minor fixes

### 1.1.0

* (klein0r) Encrypt sensitive information **(BREAKING CHANGE - RE-ENTER YOUR API KEY)**

### 1.0.10

* (klein0r) Fixed printjob state format issues

### 1.0.9

* (klein0r) nodejs 12 required

### 1.0.8

* (klein0r) Avoid constant refresh of file list

### 1.0.7

* (klein0r) Fixed async object creation

### 1.0.6

* (foxriver76) Avoid spamming the same error again and again

### 1.0.5

* (klein0r) Allow to select and print files using objects
* (klein0r) Fixed .toFixed exception when no job is running

### 1.0.4

* (klein0r) Fixed .toFixed exception when no job is running

### 1.0.3

* (klein0r) Fixed filament information (volume and length)

### 1.0.2

* (klein0r) Added name for OctoPrint Instance
* (klein0r) Fixed admin translation issue (syntax error)

### 1.0.1

* (klein0r) Added iobroker sentry

### 1.0.0

* (klein0r) First stable release

### 0.0.6

* (klein0r) Improved error handling

### 0.0.5

* (klein0r) Switched to axios lib (replaced request - deprecated)

### 0.0.4

* (klein0r) Added missing translations
* (klein0r) Changed default port to 80

### 0.0.3

* (klein0r) Updated depencencies

### 0.0.2

* (klein0r) fixed several issues, new class based structure

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2021 Matthias Kleine <info@haus-automatisierung.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
