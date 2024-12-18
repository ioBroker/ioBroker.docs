![Logo](admin/melcloud.png)

_Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/")_

# ioBroker.melcloud

[![NPM version](http://img.shields.io/npm/v/iobroker.melcloud.svg)](https://www.npmjs.com/package/iobroker.melcloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.melcloud.svg)](https://www.npmjs.com/package/iobroker.melcloud)
![Number of Installations (latest)](http://iobroker.live/badges/melcloud-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/melcloud-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/Black-Thunder/ioBroker.melcloud/badge.svg)](https://snyk.io/test/github/Black-Thunder/ioBroker.melcloud)

[![NPM](https://nodei.co/npm/iobroker.melcloud.png?downloads=true)](https://nodei.co/npm/iobroker.melcloud/)

[![Test and Release](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/test-and-release.yml) [![Reviewdog](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/code-quality.yml/badge.svg)](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/code-quality.yml)

## melcloud adapter for ioBroker

This adapter integrates Mitsubishi Electric devices via MELCloud (https://www.melcloud.com/) into ioBroker.

Documentation:

- [English description](https://github.com/Black-Thunder/ioBroker.melcloud/tree/master/docs/en/melcloud.md)
- [Deutsche Beschreibung](https://github.com/Black-Thunder/ioBroker.melcloud/tree/master/docs/de/melcloud.md)

Discussion:

- [ioBroker Forum](https://forum.iobroker.net/topic/40705/)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 2.0.5 (2024-12-11)

- (Black-Thunder) Report data for ATW devices was fixed

### 2.0.4 (2024-11-04)

- (Black-Thunder) Responsive design for settings dialog was added

### 2.0.3 (2024-10-16)

- (Black-Thunder) Responsive design for settings dialog was added

### 2.0.2 (2024-08-14)

- (Black-Thunder) Dependencies were updated

### 2.0.1 (2024-08-08)

- (Black-Thunder) Dependencies were updated

### 2.0.0 (2024-08-07)

- (Black-Thunder) Adapter requires node.js >= 18, admin >= 6 and js-controller >= 5 now

### 1.4.1 (2024-05-24)

- (Black-Thunder) Added new option to ignore SSL errors

### 1.4.0 (2024-02-29)

- (Black-Thunder) Added new option to completely disable polling

### 1.3.7 (2024-02-09)

- (Black-Thunder) Login procedure was refactored to reduce number of calls to the MELCloud servers
- (Black-Thunder) Minimum polling interval was raised to 5 minutes
- (Black-Thunder) Default polling interval was raised to 10 minutes

### 1.3.6 (2023-11-03)

- (Black-Thunder) Minimum Node.js Version was raised to 16
- (Black-Thunder) Dependencies were updated

### 1.3.5 (2023-08-01)

- (Black-Thunder) Memory leak was fixed

### 1.3.4 (2023-05-11)

- (Black-Thunder) Certificate issues were fixed (e.g. "Error: unable to verify the first certificate")

### 1.3.3 (2023-04-14)

- (Black-Thunder) Handling of error data from cloud was improved
- (Black-Thunder) Admin UI has been updated
- (Black-Thunder) ATW devices: New state "heatPumpFrequency" added
- (Black-Thunder) ATW devices: New state "operationState" added
- (Black-Thunder) ATW devices: Commands "operationModeZone1" and "operationModeZone2" fixed

### 1.3.1 (2023-03-24)

- (Black-Thunder) fixed "undefined is not a valid state value" log messages
- (Black-Thunder) fixed crash after connection is lost (e.g. due to missing internet connection)
- (Black-Thunder) updated admin UI and translations
- (Black-Thunder) fixed a lot of adapter checker issues and warnings

### 1.3.0 (2023-03-17)

- (Black-Thunder) added online status to each device (visible in admin object tree)
- (Black-Thunder) added error status to each device (visible in admin object tree)
- (Black-Thunder) added error code and messages to device info
- (Black-Thunder) added new command "timerToggle" to enable/disable device timers

### 1.2.1 (2022-12-06)

- (Black-Thunder) added consumption reports for air to water devices

### 1.2.0 (2022-09-20)

- (Black-Thunder) Added support for air to water devices (e.g., heat pumps)
- (Black-Thunder) Added new device-independent channel "reports" fur cumulative reports across all devices (see documentation for new structure)
- (Black-Thunder) Restructured device-specific channel "reports" and added new sub-channel "lastReportData" (see documentation for new structure)
- (Black-Thunder) Fix: always trigger on "getPowerConsumptionReport" ignoring the state value
- (Black-Thunder) Fixed js-controller warnings

### 1.1.6 (2022-02-06)

- (Black-Thunder) fixed warnings

### 1.1.5 (2022-02-06)

- (Black-Thunder) replaced deprecated package "request" with "axios"
- (Black-Thunder) fix warnings for js-controller v4
- (Black-Thunder) updated dependencies

### 1.1.4 (2021-05-16)

- (Black-Thunder) implemented separate queue for sending device commands to improve robustness when sending multiple commands
- (Black-Thunder) only update "control" state values with ack=true when it was requested by user before

### 1.1.3 (2021-05-12)

- (Black-Thunder) IMPORTANT: The adapter now requires js-controller 3.1 at least
- (Black-Thunder) ignore unchanged state values to decrease network traffic
- (Black-Thunder) only update state values if they are really changed
- (Black-Thunder) extend existing objects to ensure compatibility with js-controller >= v3.2
- (Black-Thunder) only allow values with 0.5 steps for "targetTemp"

### 1.1.2 (2021-04-30)

- (Black-Thunder) added compatibility with js-controller >= v3.2
- (Black-Thunder) updated dependencies

### 1.1.1 (2021-01-10)

**Attention: With this version you must reenter your password in the adapter settings and save again! Otherwise, login will fail.**

- (Black-Thunder) fix: correctly use auto decryption handling for password
- (Black-Thunder) polling interval in adapter settings is now limited to values greater than 0

### 1.1.0 (2021-01-08)

- (Black-Thunder) new functionality: retrieve power consumption reports
- (Black-Thunder) adapter connection state now correctly set accordingly to the cloud connection
- (Black-Thunder) added release-script and Dependabot, updated dependencies

### 1.0.6 28.06.2020

- (Black-Thunder) implemented queue mechanism for sending requests to cloud
- (Black-Thunder) disabled adapter autostart after installation

### 1.0.5 21.06.2020

- (Black-Thunder) added more checks when processing HTTP response
- (Black-Thunder) corrected typo in subscribeStates()
- (Black-Thunder) moved subscribeStates() after init and first successful connection

### 1.0.4 05.06.2020

- (Black-Thunder) added new value for 'vaneHorizontalDirection': 50/50 (1 vane left, 1 vane right - only for models with 2 independent horizontal vanes)

### 1.0.3 03.06.2020

- (Black-Thunder) renamed pre-defined values for 'vaneHorizontalDirection' and 'vaneVerticalDirection'
- (Black-Thunder) refactored polling logic: if connection is lost, a maximum of 3 retries are made; if still not successful, the next retry will be made after 1 hour

### 1.0.2 01.06.2020

- (Black-Thunder) correctly classify 'pollingInterval' as number
- (Black-Thunder) corrected max values for states 'vaneHorizontalDirection' and 'vaneVerticalDirection'
- (Black-Thunder) check 'vaneHorizontalDirection' and 'vaneVerticalDirection' for valid values

### 1.0.1 29.05.2020

- (Black-Thunder) fixed bug in device control when two or more devices are present

### 1.0.0 (first public stable release) 28.05.2020

- (Black-Thunder) re-added "melcloud.X.info" node as it breaks display of connection state otherwise
- (Black-Thunder) some refactoring

### 0.0.3-alpha4 27.05.2020

- (Black-Thunder) technical improvements for setting 'power'

### 0.0.3-alpha3 27.05.2020

- (Black-Thunder) parent for each device is now a channel
- (Black-Thunder) "melcloud.X.info" node removed, state "connection" now directly assigned to "melcloud.X"

### 0.0.3-alpha2 26.05.2020

- (Black-Thunder) optimized performance/reduced DB transactions
- (Black-Thunder) dynamically adjust min/max limits for 'targetTemp' and 'setFanSpeed'
- (Black-Thunder) added more documentation

### 0.0.3 26.05.2020

- (Black-Thunder) added indicator if device is reachable
- (Black-Thunder) corrected role of "targetTemp", "power" and "deviceName"
- (Black-Thunder) added new states "macAddress" and "actualFanSpeed" (indicates fan speed when running in auto mode)
- (Black-Thunder) added translations

### 0.0.2-alpha9 25.05.2020

- (Black-Thunder) fixed crash when devices are assigned to different floors/areas

### 0.0.2-alpha8 25.05.2020

- (Black-Thunder) fixed "Swing" of vanes

### 0.0.2-alpha7 25.05.2020

- (Black-Thunder) fix "power" state

### 0.0.2-alpha6 25.05.2020

- (Black-Thunder) create object folders as channels so that enums can be assigned
- (Black-Thunder) predefined states for fan speed, vane horizontal/vertical, "Swing" added
- (Black-Thunder) changing operation mode doesn't power on device anymore
- (Black-Thunder) min/max for setTemperature added

### 0.0.2-alpha5 25.05.2020

- (Black-Thunder) added more error logging

### 0.0.2-alpha4 25.05.2020

- (Black-Thunder) operation modes "Dry" and "Vent" added, removed confusing mode "Off" (device state is now only controlled by "power")
- (Black-Thunder) control of fan speed, horizontal and vertical vane direction added
- (Black-Thunder) reduced amount of logging entries

### 0.0.2-alpha3 24.05.2020

- (Black-Thunder) fixed 'request' dependency

### 0.0.2-alpha2 24.05.2020

- (Black-Thunder) fixed check of adapter settings
- (Black-Thunder) added more logging

### 0.0.2 24.05.2020

- (Black-Thunder) first implementation of device control (all states under "device.XXX.control")
- (Black-Thunder) added more device options
- (Black-Thunder) extended and optimized logging (e.g., when logging into MelCloud)
- (Black-Thunder) implemented polling of cloud data

### 0.0.1-alpha4 11.05.2020

- (Black-Thunder) fixed password encryption

### 0.0.1-alpha3 11.05.2020

- (Black-Thunder) refactored code
- (Black-Thunder) prepared device control

### 0.0.1-alpha2 11.05.2020

- (Black-Thunder) password stored encrypted
- (Black-Thunder) fixed username check
- (Black-Thunder) implemented adapter connection state based on cloud connection
- (Black-Thunder) handled connection failures to cloud better
- (Black-Thunder) optimized logging

### 0.0.1

- (Black-Thunder) initial release

## License

MIT License

Copyright (c) 2024 Black-Thunder <glwars@aol.de>

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
