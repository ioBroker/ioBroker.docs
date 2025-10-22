![Logo](admin/oekofen-json.png)
# ioBroker.oekofen-json

[![NPM version](https://img.shields.io/npm/v/iobroker.oekofen-json.svg)](https://www.npmjs.com/package/iobroker.oekofen-json)
[![Downloads](https://img.shields.io/npm/dm/iobroker.oekofen-json.svg)](https://www.npmjs.com/package/iobroker.oekofen-json)
![Number of Installations](https://iobroker.live/badges/oekofen-json-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/oekofen-json-stable.svg)
[![Dependency Status](https://img.shields.io/david/chaozmc/iobroker.oekofen-json.svg)](https://david-dm.org/chaozmc/iobroker.oekofen-json)

[![NPM](https://nodei.co/npm/iobroker.oekofen-json.png?downloads=true)](https://nodei.co/npm/iobroker.oekofen-json/)

**Tests:** ![Test and Release](https://github.com/chaozmc/ioBroker.oekofen-json/workflows/Test%20and%20Release/badge.svg)

## oekofen-json adapter for ioBroker

### Description

This adapter connects a OekoFEN heater with the new touch interface (also called [Pelletronic Touch](https://www.oekofen.com/en-gb/pelletronic-touch/)) to ioBroker. As OekoFEN implemented the JSON interface step by step and without public available documentation it should work at least with Version 3.10d and newer.
As there are many combinations of heaters, solarmodules, layer storages, sterling engines etc. out there, this adapters tries to read all available datapoints from the interface and creates the objects on the fly at startup. 

Read-Only datapoints are created as such as these starts mit L_ prefix in their name. Also converts the adapter the number's scaling according to the informations provided by the interface (factor attribute). For example, the heater deals with temperatures in the format XXX and factor 0.1, this will be converted by the adapter to XX.X on read operations and back to XXX on write operations.



### Installation

After installation, it's just required to enter 

* the IP, 
* TCP port, 
* the "so-called" password 
* and the interval 

at which the adapter tries to pull the updates. 

The adapter maintains the connected state, even there's no real permanent connection. If the device sends an error or the adapter isn't able to contact the OekoFEN controller it set's the connected state to false. For example this could happen if there are too many requests on the controller, which answers with HTTP 401 then. Under normal conditions the rate limit of the controller shouldn't be hit (2,5 seconds between requests). 

## Credits

This adapter would not have been possible without the great work of Markus Feiler (chaozmc) <https://github.com/chaozmc>, who created previous releases of this adapter.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0-alpha.9 (2025-10-13)
* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Dependencies have been updated

### 1.0.5 (2023-09-23)
* (chaozmc) set min node version to 18.x (merge pull request #23)

### 1.0.4 (2023-09-22)
* (chaozmc) Removed Node 16.x from Test-and-release (fix Issue #19)
* (chaozmc) updated dependencies
* (chaozmc) updated protobufjs and google-gax
* (chaozmc) updated word-wrap

### 1.0.3 (2023-05-09)
* (chaozmc) Bump version

### 1.0.2 (2023-05-09)
* (chaozmc) Added missing translations
* (chaozmc) Updated Copyright Year
* (chaozmc) Added .releaseconfig.json for release-script
* (chaozmc) changed github workflow config

### **0.0.3**
* (chaozmc) code cleanup, trigger for update & rescan

### **0.0.2**
* (chaozmc) first working release, fixed 0-value updates

### **0.0.1**
* (chaozmc) initial build phase, much try and error

## License
MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 chaozmc <chaozmc@is-jo.org>

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