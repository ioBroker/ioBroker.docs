![Logo](admin/bayernluft.png)
# ioBroker.bayernluft

[![NPM version](https://img.shields.io/npm/v/iobroker.bayernluft.svg)](https://www.npmjs.com/package/iobroker.bayernluft)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bayernluft.svg)](https://www.npmjs.com/package/iobroker.bayernluft)
![Number of Installations](https://iobroker.live/badges/bayernluft-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/bayernluft-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.bayernluft.png?downloads=true)](https://nodei.co/npm/iobroker.bayernluft/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.bayernluft/workflows/Test%20and%20Release/badge.svg)

## BayernLuft Adapter for ioBroker
Connects ventilation device manufactured by [BayernLuft](https://www.bayernluft.de/) to IoBroker systems.

## Disclaimer
**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**

## What needs to be done?
To use this adapter, you need to change the export template of the device.  
**Be sure to follow the steps below**

## How to change the Template?
1. Go to the Web-Interface of your Device
2. Click on the Settings Gear to head to the Settings
3. Scroll Down until you see the Expert Mode
4. Upload the file 'export_iobroker.txt' from this github repository.
8. Your Done, setup the device in the adapter instance. The standard port of the device is 80.

## Nice to Know
The commands commands.setSpeedIn, commands.setSpeedOut, commands.setSpeedAntiFreeze only work when the device is powered off. If the device is turned on, the commands are acknowledged by the device but nothing will happen (you can check manually in the corresponding states states.speed_in, states.speed_out and states.speed_antifreeze)

## Credits
This adapter would not have been possible without the great work of @Marco15453 (https://github.com/Marco15453), who create V1.x.x of this adapter.
Also a big thanks to the company Bayernluft for their great support

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.0.0 (2025-02-24)
* (boriswerner) **Breaking Change:** All states from the 2.alpha versions have been removed and the adapter has been completely redesigned. The Bayernlüfter devices need a new export configuration file. Please upload export_iobroker.txt to each of your devices and delete old states.
* (mcm1957) Adapter requires node.js 20, js-controller 6 and admin 7 now.
* (boriswerner) Commands have been implemnted for individual fan speeds (see  WS32240427 in https://www.bayernluft.de/de/wlan32_changelist.html):
    When device is turned off, the fans can be set individually (commands: setSpeedIn, setSpeedOut, setSpeedAntiFreeze)
* (boriswerner) States in "states"-folder have been set to read-only
* (boriswerner) Roles of states have been changed
* (boriswerner) Update interval label and set default port have been fixed
* (mcm1957) Missing values from device are set to null and qs flag is set to 0x82 now
* (mcm1957) Units have been added where appropiate
* (mcm1957) Translations have been added for all supported languages
* (mcm1957) Dependencies have been updated

### 2.0.1 (2025-01-16)
* (mcm1957) AdminUI and translations have been fixed.

### 2.0.0 (2025-01-14)
* (mcm1957) Adapter requires node.js 20, js-controller 6 and and admin 6 now.
* (boriswerner) Corrected the API calls to match the new API (rev 2.0 version WS32231301, see: https://www.bayernluft.de/de/wlan32_changelist.html)
* (boriswerner) Corrected the ACK-handling in onStateChange
* (mcm1957) Adapter has been move to iobroker-community-adapters organization
* (mcm1957) Dependencies have been updated

## License
MIT License

Copyright (c) 2024-2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2022 Marco15453 <support@marco15453.xyz>

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
