![Logo](admin/voltoplus.png)
# ioBroker.voltoplus

[![NPM version](https://img.shields.io/npm/v/iobroker.voltoplus.svg)](https://www.npmjs.com/package/iobroker.voltoplus)
[![Downloads](https://img.shields.io/npm/dm/iobroker.voltoplus.svg)](https://www.npmjs.com/package/iobroker.voltoplus)
![Number of Installations](https://iobroker.live/badges/voltoplus-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/voltoplus-stable.svg)
[![Dependency Status](https://img.shields.io/david/Jey-Cee/iobroker.voltoplus.svg)](https://david-dm.org/Jey-Cee/iobroker.voltoplus)

[![NPM](https://nodei.co/npm/iobroker.voltoplus.png?downloads=true)](https://nodei.co/npm/iobroker.voltoplus/)

**Tests:** ![Test and Release](https://github.com/Jey-Cee/ioBroker.voltoplus/workflows/Test%20and%20Release/badge.svg)

## VoltoPlus adapter for ioBroker

Get actual data from VoltoPlus energy meter.

## Sponsors
If you like my work, please feel free to provide a personal donation  
(this is an personal Donate link for Jey Cee, no relation to the ioBroker Project !)  
[![Donate](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

## Usage
Just enter the IP address of the VoltoPlus energy meter in the adapter settings.
The adapter will read the data every second.

## Disclaimer
The developers of this module are in no way endorsed by or affiliated with Wallner Automation GmbH,
or any associated subsidiaries, logos or trademarks.

## Links
[Product](https://www.voltoplus.com/shop/voltoplus/167/voltoplus?c=44)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.1.4 (2024-09-30)
* Update dependencies
* Fix issues found by adapter checker

### 0.1.3 (2023-07-27)
* stable release

### 0.1.2 (2023-07-27)
* stable release

### 0.1.1 (2022-11-17)
* some fixes for relesase

### 0.1.0 (2022-10-18)
* Changed unit of energy_purchased & energy_supplied from W to kWh
* divide value of energy_purchased & energy_supplied by 10
* Update depenendencies

### 0.0.1
* (Jey Cee) initial release

## License
MIT License

Copyright (c) 2024 Jey Cee <jey-cee@live.com>

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