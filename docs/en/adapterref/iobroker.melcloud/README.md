![Logo](admin/melcloud.png)

*Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/")*

# ioBroker.melcloud

[![NPM version](http://img.shields.io/npm/v/iobroker.melcloud.svg)](https://www.npmjs.com/package/iobroker.melcloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.melcloud.svg)](https://www.npmjs.com/package/iobroker.melcloud)
![Number of Installations (latest)](http://iobroker.live/badges/melcloud-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/melcloud-stable.svg)
[![Dependency Status](https://img.shields.io/david/Black-Thunder/iobroker.melcloud.svg)](https://david-dm.org/Black-Thunder/iobroker.melcloud)
[![Known Vulnerabilities](https://snyk.io/test/github/Black-Thunder/ioBroker.melcloud/badge.svg)](https://snyk.io/test/github/Black-Thunder/ioBroker.melcloud)

[![NPM](https://nodei.co/npm/iobroker.melcloud.png?downloads=true)](https://nodei.co/npm/iobroker.melcloud/)

[![Test](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/test.yml/badge.svg)](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/test.yml) [![Reviewdog](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/code-quality.yml/badge.svg)](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/code-quality.yml)

## melcloud adapter for ioBroker

This adapter integrates Mitsubishi air conditioning systems via MELCloud (https://www.melcloud.com/) into ioBroker.

Documentation:

* [Forum thread](https://forum.iobroker.net/topic/40705/test-adapter-melcloud-v1-1-x-latest)
* [English description](https://github.com/Black-Thunder/ioBroker.melcloud/tree/master/docs/en/melcloud.md)
* [Deutsche Beschreibung](https://github.com/Black-Thunder/ioBroker.melcloud/tree/master/docs/de/melcloud.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (Black-Thunder) replaced deprecated package "request" with "axios"

### 1.1.4 (2021-05-16)
* (Black-Thunder) implemented separate queue for sending device commands to improve robustness when sending multiple commands
* (Black-Thunder) only update "control" state values with ack=true when it was requested by user before

### 1.1.3 (2021-05-12)
* (Black-Thunder) IMPORTANT: The adapter now requires js-controller 3.1 at least
* (Black-Thunder) ignore unchanged state values to decrease network traffic
* (Black-Thunder) only update state values if they are really changed
* (Black-Thunder) extend existing objects to ensure compatibility with js-controller >= v3.2
* (Black-Thunder) only allow values with 0.5 steps for "targetTemp" 

### 1.1.2 (2021-04-30)
* (Black-Thunder) added compatibility with js-controller >= v3.2
* (Black-Thunder) updated dependencies

### 1.1.1 (2021-01-10)
**Attention: With this version you must reenter your password in the adapter settings and save again! Otherwise, login will fail.**
* (Black-Thunder) fix: correctly use auto decryption handling for password 
* (Black-Thunder) polling interval in adapter settings is now limited to values greater than 0

### 1.1.0 (2021-01-08)
* (Black-Thunder) new functionality: retrieve power consumption reports
* (Black-Thunder) adapter connection state now correctly set accordingly to the cloud connection
* (Black-Thunder) added release-script and Dependabot, updated dependencies

### 1.0.6 28.06.2020
* (Black-Thunder) implemented queue mechanism for sending requests to cloud
* (Black-Thunder) disabled adapter autostart after installation

### 1.0.5 21.06.2020
* (Black-Thunder) added more checks when processing HTTP response
* (Black-Thunder) corrected typo in subscribeStates()
* (Black-Thunder) moved subscribeStates() after init and first successful connection

### 1.0.4 05.06.2020
* (Black-Thunder) added new value for 'vaneHorizontalDirection': 50/50 (1 vane left, 1 vane right - only for models with 2 independent horizontal vanes)

### 1.0.3 03.06.2020
* (Black-Thunder) renamed pre-defined values for 'vaneHorizontalDirection' and 'vaneVerticalDirection'
* (Black-Thunder) refactored polling logic: if connection is lost, a maximum of 3 retries are made; if still not successful, the next retry will be made after 1 hour

### 1.0.2 01.06.2020
* (Black-Thunder) correctly classify 'pollingInterval' as number
* (Black-Thunder) corrected max values for states 'vaneHorizontalDirection' and 'vaneVerticalDirection'
* (Black-Thunder) check 'vaneHorizontalDirection' and 'vaneVerticalDirection' for valid values

### 1.0.1 29.05.2020
* (Black-Thunder) fixed bug in device control when two or more devices are present

### 1.0.0 (first public stable release) 28.05.2020
* (Black-Thunder) re-added "melcloud.X.info" node as it breaks display of connection state otherwise
* (Black-Thunder) some refactoring

### 0.0.3-alpha4 27.05.2020
* (Black-Thunder) technical improvements for setting 'power'

### 0.0.3-alpha3 27.05.2020
* (Black-Thunder) parent for each device is now a channel
* (Black-Thunder) "melcloud.X.info" node removed, state "connection" now directly assigned to "melcloud.X"

### 0.0.3-alpha2 26.05.2020
* (Black-Thunder) optimized performance/reduced DB transactions
* (Black-Thunder) dynamically adjust min/max limits for 'targetTemp' and 'setFanSpeed'
* (Black-Thunder) added more documentation

### 0.0.3 26.05.2020
* (Black-Thunder) added indicator if device is reachable
* (Black-Thunder) corrected role of "targetTemp", "power" and "deviceName"
* (Black-Thunder) added new states "macAddress" and "actualFanSpeed" (indicates fan speed when running in auto mode)
* (Black-Thunder) added translations

### 0.0.2-alpha9 25.05.2020
* (Black-Thunder) fixed crash when devices are assigned to different floors/areas

### 0.0.2-alpha8 25.05.2020
* (Black-Thunder) fixed "Swing" of vanes

### 0.0.2-alpha7 25.05.2020
* (Black-Thunder) fix "power" state

### 0.0.2-alpha6 25.05.2020
* (Black-Thunder) create object folders as channels so that enums can be assigned
* (Black-Thunder) predefined states for fan speed, vane horizontal/vertical, "Swing" added
* (Black-Thunder) changing operation mode doesn't power on device anymore
* (Black-Thunder) min/max for setTemperature added

### 0.0.2-alpha5 25.05.2020
* (Black-Thunder) added more error logging

### 0.0.2-alpha4 25.05.2020
* (Black-Thunder) operation modes "Dry" and "Vent" added, removed confusing mode "Off" (device state is now only controlled by "power")
* (Black-Thunder) control of fan speed, horizontal and vertical vane direction added
* (Black-Thunder) reduced amount of logging entries

### 0.0.2-alpha3 24.05.2020
* (Black-Thunder) fixed 'request' dependency

### 0.0.2-alpha2 24.05.2020
* (Black-Thunder) fixed check of adapter settings
* (Black-Thunder) added more logging

### 0.0.2 24.05.2020
* (Black-Thunder) first implementation of device control (all states under "device.XXX.control")
* (Black-Thunder) added more device options
* (Black-Thunder) extended and optimized logging (e.g., when logging into MelCloud)
* (Black-Thunder) implemented polling of cloud data

### 0.0.1-alpha4 11.05.2020
* (Black-Thunder) fixed password encryption

### 0.0.1-alpha3 11.05.2020
* (Black-Thunder) refactored code
* (Black-Thunder) prepared device control

### 0.0.1-alpha2 11.05.2020
* (Black-Thunder) password stored encrypted
* (Black-Thunder) fixed username check
* (Black-Thunder) implemented adapter connection state based on cloud connection
* (Black-Thunder) handled connection failures to cloud better
* (Black-Thunder) optimized logging

### 0.0.1
* (Black-Thunder) initial release

## License
MIT License

Copyright (c) 2021 Black-Thunder <glwars@aol.de>

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
