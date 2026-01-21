![Logo](admin/yeelight.png)

![Number of Installations](http://iobroker.live/badges/yeelight-2-installed.svg)
![Number of Installations](http://iobroker.live/badges/yeelight-2-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.yeelight-2.svg)](https://www.npmjs.com/package/iobroker.yeelight-2)

![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.yeelight-2/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/yeelight-2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.yeelight-2.svg)](https://www.npmjs.com/package/iobroker.yeelight-2)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

# ioBroker.yeelight-2

[Deutsche Beschreibung hier](README_de.md)

This adapter controls your Yeelight devices over your local network.

## Installation

For all the Yeelights you want to control, you need to enable "LAN Control" in the yeelight app settings.

![](admin/lan.jpg)

## Config

You can add devices manually or find devices on the network. The default port is 55443. If you want, you can change the name, IP, port and smartname.

### smartname

If you enter a smartname, the device will be added to the iobroker.cloud and can be controlled by Alexa.

### Find device

With this button you can scan your network for devices, if something is found, the devices will be added to the table. It takes about 20 seconds to scan the network. if the devices are not found, "LAN Control" is not enabled or the devices are in a different network.

### Device not in the list

If your device is not in the list, e.g. YLTD003, use another lamp with the same features in this case (desklamp or Color or something else).

## set_scene

Usage: This method is used to set the Smart LED directly to a specified state. If the device is off, it is first turned on and then the specified command is applied.

Parameters: 3 ~ 4.

"class" can be "color", "hsv", "ct", "cf", "auto_dealy_off".

-   "color" means to change the smart LED to the specified color and brightness.
-   "hsv" means to change the Smart LED to specified color and brightness.
-   "ct" means to change the Smart LED to specified ct and brightness.
-   "cf" means start a color flow in specified way.
-   "auto_delay_off" means to turn on the Smart LED to specified brightness and start a sleep timer to turn off the light after the specified minutes.

"val1", "val2", "val3" are class-specific.

Request Example:

-   `["color", 65280, 70]`
-   `["hsv", 300, 70, 100]`
-   `["ct", 5400, 100]`
-   `["cf",0,0,"500,1,255,100,1000,1,16776960,70"]`
-   `["auto_delay_off", 50, 5]`

NOTE: Accepted in both "on" and "off" states.

For the above examples:

-   The first is to set color to "652280" and brightness to 70%.
-   The second is to set color to hue:300, saturation:70 and max brightness.
-   The third is to set CT to 5400K and 100% brightness.
-   The fourth is to start an infinite color flow on two flow tuples.
-   The fifth is to turn on the light to 50% brightness and then turn it off after 5 minutes.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.5.2 (2025-02-28)

-   (Black-Thunder) Incompatibilities with the dependency "joy" have been fixed and "joy" has been updated.

### 1.5.1 (2025-02-26)

-   (mcm1957) Update of joi has been reverted due to incompatibilities.

### 1.5.0 (2025-02-26)

-   (mcm1957) Adapter requires node.js >= 20, js-controller >= 6 and admin >= 6 now
-   (Black-Thunder) Online status for each device has been added (visible in admin object tree).
-   (Black-Thunder) Support for compact mode has been added.
-   (Black-Thunder) Code has been partially refeactored.
-   (mcm1957) Dependencies have been updated

### 1.4.0 (2024-04-29)

-   (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
-   (mcm1957) Dependencies have been updated

### 1.3.1 (2024-02-15)

-   (mcm1957) BREAKING: adapter requires node.js 18 or newer now.
-   (Black-Thunder) Crashes at startup of adapter have been fixed. [#271, #227 and #222]
-   (mcm1957) Testing has been changed to support node 18 and 20
-   (mcm1957) Dependencies have been updated
-   (Apollon77) make sure reconnects work correctly

## License

The MIT License (MIT)

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2024 MeisterTR <meistertr.smarthome@gmail.com>, cahek2202 <cahek2202@mail.ru>

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
