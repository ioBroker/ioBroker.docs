![Logo](admin/govee-local.png)

## govee-local adapter for ioBroker

[![NPM version](https://img.shields.io/npm/v/iobroker.govee-local.svg)](https://www.npmjs.com/package/iobroker.govee-local)
[![Downloads](https://img.shields.io/npm/dm/iobroker.govee-local.svg)](https://www.npmjs.com/package/iobroker.govee-local)
![Number of Installations](https://iobroker.live/badges/govee-local-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/govee-local-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.govee-local.png?downloads=true)](https://nodei.co/npm/iobroker.govee-local/)

**Tests:** ![Test and Release](https://github.com/boergegrunicke/ioBroker.govee-local/workflows/Test%20and%20Release/badge.svg)

Control Govee devices via local access (no cloud)

To be able to control govee deivce locally, the feature needs to be explicitely turned on in the settings of the govve application settings as described in their [documentation](<https://app-h5.govee.com/user-manual/wlan-guide#:~:text=Supported%20Product%20Models%20(continually%20updated)>)
As I currently only have the H6051 lamp, this is the only device I can test with.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.2 (2023-09-06)
-  change icon path and resolution

### 0.1.1 (2023-08-21)

-   fix image

### 0.1.0 (2023-08-09)

-   make search intervals configurable
-   clear all timeouts, when adapter is stopped
-   replace forbidden characters in names
-   update translations
-   update dependecies

### 0.0.6 (2023-05-18)

-   update dependencies

### 0.0.5 (2023-04-02)

-   make pipeline run

### 0.0.4 (2023-04-02)

-   make device status refresh invertal indepentent from device search interval

### 0.0.3 (2023-04-01)

-   update dependecies

### 0.0.2

-   frequently searching for devices and requesting their specific state
-   on / off state, brightness and and color temperature can be controlled

## License

MIT License

Copyright (c) 2023 Børge Grunicke

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
