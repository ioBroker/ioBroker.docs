![Logo](admin/rainbird.png)

![Number of Installations](http://iobroker.live/badges/rainbird-installed.svg) [![Downloads](https://img.shields.io/npm/dm/iobroker.rainbird.svg)](https://www.npmjs.com/package/iobroker.rainbird)

[![NPM](https://nodei.co/npm/iobroker.rainbird.png?downloads=true)](https://nodei.co/npm/iobroker.rainbird/)

![Stable](http://iobroker.live/badges/rainbird-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.rainbird.svg)](https://www.npmjs.com/package/iobroker.rainbird)
[![Build Status](https://travis-ci.org/StrathCole/ioBroker.rainbird.svg?branch=master)](https://travis-ci.org/StrathCole/ioBroker.rainbird)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/StrathCole/iobroker.rainbird/blob/master/LICENSE)

# ioBroker.rainbird

An ioBroker adapter for Rain Bird with LNK WiFi adapter. This project has no affiliation with Rain Bird.

Based on the python library "pyrainbird" from https://github.com/jbarrancos/pyrainbird and completely ported to NodeJS. The adapter makes a direct connection to the device through WiFi connection and is not using the Rain Bird cloud service.


## States

`rainbird.X.device.commands.advanceZone` - When current program is running, advance to the next irrigation zone and stop the current one.  
`rainbird.X.device.commands.runProgram` - Run the specified program manually (1 to X) as previously configured in the device.  
`rainbird.X.device.commands.stopIrrigation` - Immediately stop the irrigation in all zones.  

`rainbird.X.device.irrigation.active` - The irrigation is currently active. If false this can mean that you set the switch on the device to "Stop".  
`rainbird.X.device.irrigation.station` - Number of the zone that is currently irrigated.  

`rainbird.X.device.sensors.rain` - True if a rain sensor is attached and rain is detected.  

`rainbird.X.device.settings.rainDelay` - The current irrigation delay (in days) set for the device.  
`rainbird.X.device.settings.seasonalAdjust` - The current seasonal adjust for the water budget.  

`rainbird.X.device.stations.Y.available` - True if zone Y is available in the device.  
`rainbird.X.device.stations.Y.irrigation` - True if zone Y is currently irrigated.  
`rainbird.X.device.stations.Y.remaining` - Remaining irrigation time in seconds
`rainbird.X.device.stations.Y.runZone` - Manually run irrigation on zone Y for the specified amount of minutes.  
`rainbird.X.device.stations.Y.testZone` - Test zone Y.  


## Credits

This adapter would not have been possible without the great work of Marius Burkard <m.burkard@pixcept.de>, who previous releases of this adapter.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.1 (2024-12-15)
* (Feuersturm) Some minor corrections to installations news and some internal changes at pacakging have been applied.

### 2.0.0 (2024-12-13)
* (Feuersturm) BREAKING: The password is stored encrypted now. Please reenter you password at configuration page. This is required only once after migration from release < 2.0.0 to release 2.0.0 or newer.
* (mcm1957) Adapter requires node.js 20 now
* (mcm1957) Adapter requires js-controller 5 and admin 6  now
* (Feuersturm) switch adapter config to jsonconfig
* (mcm1957) Dependencies have been updated

### 1.0.1 (2024-06-06)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Adapter has been move to iobroker-community-adapters organization
* (mcm1957) Adapter-core has been adapter, adapter supports js-controller 6 now.
* (mcm1957) Dependencies have been updated

### 0.2.3
-   Fixed problem with sensor data
-   Added seasonal water budget adjust information

### 0.2.2

-   Added fixes for adapter crashes on failed connection to controller

## License

The MIT License (MIT)

Copyright (c) 2024, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2022 Marius Burkard m.burkard@pixcept.de

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


## Donate
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)
