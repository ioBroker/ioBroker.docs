# ioBroker.warp

[![NPM version](https://img.shields.io/npm/v/iobroker.warp.svg)](https://www.npmjs.com/package/iobroker.warp)
[![Downloads](https://img.shields.io/npm/dm/iobroker.warp.svg)](https://www.npmjs.com/package/iobroker.warp)
![Number of Installations](https://iobroker.live/badges/warp-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/warp-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.warp.png?downloads=true)](https://nodei.co/npm/iobroker.warp/)

**Tests:** ![Test and Release](https://github.com/pottio/ioBroker.warp/workflows/Test%20and%20Release/badge.svg)

## WARP charger adapter for ioBroker

This adapter monitors and controls a wallbox [(WARP charger)](https://www.warp-charger.com/) by [Tinkerforge](https://www.tinkerforge.com/de/) via ioBroker. The connection will be established via WebSockets.

#### Only WARP firmware versions >= 2.0.0 are supported since adapter version 1.0.0

Why using this adapter - it is also possible to connect the wallbox to ioBroker via MQTT ?! 

However, no individual states are sent via MQTT, but complex JSON objects. The warp adapter resolves the complex JSON objects into single states. This makes it easier to react on value changes of a single state. In addition, each state is provided with the corresponding description, unit and further information, which can be found in the [official API documentation](https://www.warp-charger.com/api.html). To top it off some commands like starting/stopping charging, setting upper limits of allowed charging current, resetting meter readings, scanning nearby WLAN networks and customizing the display name are possible. The change of all system parameters, such as network configuration, MQTT settings, user administration or load manager, are only possible via the web interface for security reasons.

### Supported WARP chargers

- [WARP charger](https://www.warp-charger.com/index_warp1.html)
  - Smart
  - Pro
- [WARP2 charger](https://www.warp-charger.com/index.html)
  - Smart
  - Pro

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.2 (2022-07-01)
* (pottio) API changes
* (pottio) Dependency updates

### 1.2.1 (2022-05-18)
* (pottio) Fixed bug

### 1.2.0 (2022-05-17)
* (pottio) Minor improvements

### 1.1.0 (2022-05-05)
* (pottio) Dependency updates
* (pottio) API changes (WARP firmware versions 2.0.2, 2.0.3, 2.0.4) [[#27]](https://github.com/pottio/ioBroker.warp/issues/27)

### 1.0.1 (2022-04-28)
* (pottio) fixed bug [[#15]](https://github.com/pottio/ioBroker.warp/issues/15)

### 1.0.0 (2022-04-14)
* (pottio) [Breaking Changes] Added support for WARP firmware >= 2.0.0 - older firmware versions are no longer supported
* (pottio) Automatic WARP product and model detection on startup
* (pottio) Split of array in single states is now configurable in admin settings
* (pottio) Dependency updates

### 0.0.4 (2022-04-06)
* (pottio) fixed bug

### 0.0.3 (2022-03-22)
* (pottio) fixed bugs
* (pottio) added instance link

### 0.0.2 (2022-03-21)
* (pottio) initial release

## License
MIT License

Copyright (c) 2022 pottio

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
