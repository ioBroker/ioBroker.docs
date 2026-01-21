![Logo](admin/hyperion-connector.png)
# ioBroker.hyperion-connector

[![NPM version](https://img.shields.io/npm/v/iobroker.hyperion-connector.svg)](https://www.npmjs.com/package/iobroker.hyperion-connector)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hyperion-connector.svg)](https://www.npmjs.com/package/iobroker.hyperion-connector)
![Number of Installations](https://iobroker.live/badges/hyperion-connector-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/hyperion-connector-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.hyperion-connector.png?downloads=true)](https://nodei.co/npm/iobroker.hyperion-connector/)

**Tests:** ![Test and Release](https://github.com/ticaki/ioBroker.hyperion-connector/workflows/Test%20and%20Release/badge.svg)

## hyperion-connector adapter for ioBroker

Connect to hyperion.ng server. Hyperion Projekt https://hyperion-project.org/forum/

Shortly after starting up, the adapter automatically searches for available Hyperion servers in the local network.
If it finds one, it attempts to connect; if a login is required, it requests a token.
This will cause a pop-up to appear on the Hyperion WebUI, which you must confirm. If the connection is not established after the first confirmation, please wait 1-2 minutes, and another prompt should appear.

Commands that I find useful have been incorporated.

If you require additional commands, please post in the forum or here.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2025-11-11)
* (ticaki) first latest release
* (ticaki) Clean termination of the adapter

### 0.2.0 (2025-10-27)
* (ticaki) controls: adjustment added
* (ticaki) workaround for buggy subscribe in 2.1.1 (maybe adapter only work with 2.1.1)
* (ticaki) update deps

### 0.1.2 (2025-02-05)
* (ticaki) remove unit from admin
* (ticaki) reduced version requirements for js-controller

### 0.1.1 (2025-01-14)
* (ticaki) Renaming repo
* (ticaki) Adjustable reconnection interval. State to activate accelerated reconnection
* (ticaki) Incoming updates for leds are handled (most updates force a complete update of the data unless I have added code to handle - leds, components, effects so far)
* (ticaki) Added a json data point for priorities to allow better access from the javascript adapter
* (ticaki) Added leds update handling
* (ticaki) remove leds subfolders and write all data into a json datapoint (-500 folder/states for me)
* (ticaki) added controls.system
* (ticaki) add info.connection for adapter and device
* (ticaki) initial release
* (ticaki) initial release

## License
MIT License

Copyright (c) 2025-2026 ticaki <github@renopoint.de>

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