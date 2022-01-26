![Logo](admin/wled_logo_akemi.png)
# ioBroker.wled

[![NPM version](http://img.shields.io/npm/v/iobroker.wled.svg)](https://www.npmjs.com/package/iobroker.wled)
[![Downloads](https://img.shields.io/npm/dm/iobroker.wled.svg)](https://www.npmjs.com/package/iobroker.wled)
![Number of Installations (latest)](http://iobroker.live/badges/wled-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/wled-stable.svg)
[![Dependency Status](https://img.shields.io/david/DrozmotiX/iobroker.wled.svg)](https://david-dm.org/DrozmotiX/iobroker.wled)
[![Known Vulnerabilities](https://snyk.io/test/github/DrozmotiX/ioBroker.wled/badge.svg)](https://snyk.io/test/github/DrozmotiX/ioBroker.wled)

[![NPM](https://nodei.co/npm/iobroker.wled.png?downloads=true)](https://nodei.co/npm/iobroker.wled/)
![Test and Release](https://github.com/DrozmotiX/ioBroker.wled/workflows/Test%20and%20Release/badge.svg)

**This adapter uses the service [Sentry.io](https://sentry.io) to automatically report exceptions and code errors and new device schemas to me as the developer.** More details see below!

## wled adapter for ioBroker

A fast and feature-rich implementation of an ESP8266/ESP32 webserver to control NeoPixel (WS2812B, WS2811, SK6812, APA102)LEDs or also SPI based chipsets like the WS2801!

[WLED - Github Project](https://github.com/Aircoookie/WLED) by @Aircoookie

## Instructions

The adapter automatically try's to find WLED devices in your network using Bonjour services.  
Known issues : Networks with VLAN separation mostly don't route broadcast traffic, meaning autodetect will fail.  

Don't worry, in that case you can add the device manually by IP-Address.

1) Ensure your WLED device is running and reachable by network
2) Install the adapter
3) Configure intervall times for data polling and auto-detect cycles  
4 - A) Start the adapter, devices should be detected automatically  
4 - B) If A fails, use the Add-Device button and provide the device IP-Address  
5) Adapter will send changes immediately and polls data every x seconds (configurable)

## Support me
If you like my work, please feel free to provide a personal donation  
(this is a personal Donate link for DutchmanNL, no relation to the ioBroker Project !)  
[![Donate](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/main/admin/button.png)](http://paypal.me/DutchmanNL)

## What is Sentry.io and what is reported to the servers of that company?
Sentry.io is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or another Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of this helps me to provide error free adapters that basically never crashs.  

# Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.6.3 (2021-09-08) - HotFixes
* (DutchmanNL) Missing dropdown for ID of effects added
* (DutchmanNL) HotFix: Missing axios dependency added

### 0.6.1 (2021-09-08)
* (DutchmanNL) Missing state definitions WLED FW 0.13.0-b12 added.

### 0.6.0 (2021-08-31) - Support Websocket connections
* (DutchmanNL) System load reduced
* (DutchmanNL) All warnings related to JS-Controller 3.x checks solved
* (DutchmanNL) Ensure legacy support of WLED FW < 0.12 (fallback to http-API instead of websocket)
* (DutchmanNL) Communication by websocket implemented, this feature allows live data updates (instead of interval polling). Requires WLED firmware >= 12

### 0.5.9 (2021-08-11)
* (DutchmanNL) added new state attributes reported by Sentry
* (DutchmanNL) added min & max for brightness value to support iOT adapter

### 0.5.8 (2021-08-11)
* (DutchmanNL) added new state attributes reported by Sentry
* (DutchmanNL) Bugfix Live override datapoint created as read-only #252
* (DutchmanNL) excluded value "PIR" from data write due to current formatting

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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
