![Logo](admin/wled_logo_akemi.png)
# ioBroker.wled

[![NPM version](https://img.shields.io/npm/v/iobroker.wled.svg)](https://www.npmjs.com/package/iobroker.wled)
[![Downloads](https://img.shields.io/npm/dm/iobroker.wled.svg)](https://www.npmjs.com/package/iobroker.wled)
![Number of Installations](https://iobroker.live/badges/wled-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/wled-stable.svg)
[![Dependency Status](https://img.shields.io/david/DrozmotiX/iobroker.wled.svg)](https://david-dm.org/DrozmotiX/iobroker.wled)

[![NPM](https://nodei.co/npm/iobroker.wled.png?downloads=true)](https://nodei.co/npm/iobroker.wled/)

**Tests:** ![Test and Release](https://github.com/DrozmotiX/iobroker.wled/workflows/Test%20and%20Release/badge.svg)

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
3) Configure interval times for data polling and auto-detect cycles  
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

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (ticaki) allow sending of raw json from state

### 0.7.3 (2024-10-26)
* (HaggardFFM) allow write on segments, solves #688 #706
* (DutchmanNL) Fixed error when a device is not available Solves #698

### 0.7.2 (2023-10-31) - Improve online visibility of devices
* (DutchmanNL) Show online state of device in object tree
* (DutchmanNL) Bugfix: Update online state correctly in situation connection is lost, fixes #611
* (DutchmanNL) Reset brightness to 0 and on to false during adapter start and if a device disconnects, fixes #565

### 0.7.1 (2023-10-02)
* several fixes by [HaggardFFM](https://github.com/HaggardFFM) fixes #479, #423
* (DutchmanNL) missing state attribute definitions added
* implement white color channel by [HaggardFFM](https://github.com/HaggardFFM), fixes #306, #306
* (DutchmanNL) Removed error message if definitions are missing, no impact on functionality

### 0.6.7 (2022-06-08) - Bugfix [#400](https://github.com/DrozmotiX/ioBroker.wled/issues/400)
* (DutchmanNL) Bugfix: Cannot read property 'initialized' of undefined handleStates solved [#400](https://github.com/DrozmotiX/ioBroker.wled/issues/400)

### 0.6.6 (2022-06-08) - Log messages and error reporting improved
* (DutchmanNL) Log messages and error reporting improved
* (DutchmanNL) Don't send missing attribute definitions to Sentry

## License
MIT License

Copyright (c) 2024 DutchmanNL <oss@drozmotix.eu>

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
