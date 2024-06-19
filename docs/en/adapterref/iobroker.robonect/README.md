# ioBroker.robonect

![Logo](admin/robonect.png)

[![NPM](https://nodei.co/npm/iobroker.robonect.png?downloads=true)](https://nodei.co/npm/iobroker.robonect/)

![Number of Installations](http://iobroker.live/badges/robonect-installed.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.robonect.svg)](https://www.npmjs.com/package/iobroker.robonect)
![Number of Installations](http://iobroker.live/badges/robonect-stable.svg)
[![Test and Release](https://github.com/Grizzelbee/ioBroker.robonect/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.robonect/actions/workflows/test-and-release.yml)
[![CodeQL](https://github.com/Grizzelbee/ioBroker.robonect/actions/workflows/codeql.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.robonect/actions/workflows/codeql.yml)

This is an ioBroker adapter for your Robonect HX enabled lawn mower.

* It has been tested with Robonect v1.1b (with ZeroConf v1.4) and a Gardena R70Li.
* And it has also been tested with Robonect v1.3b (with ZeroConf v1.9) and a Gardena R40Li.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Settings

* It is required to enter the IP address (like 192.168.x.x) or hostname (like robonect-D247BF) or fully qualified domainname (like robonect-D247BF.fritz.box) of the Robonect module. In case username and password are set, they are required, too.
* ioBroker.robonect polls data at different intervals: By default status information is polled every 60 seconds (1 minute) and other information is polled every 900 seconds (15 minutes).
* It is possible to configure two rest periods to prevent polling e.g. at noon and during the night. Information that can be polled without waking the lawn mower (and make it beep) will still be polled.
* For every API request it is possible to choose the polling interval (status or info) or don't poll at all.
* push service: when activated select the IP address and port the adapter should listen to.

### Password for Robonect

Versions older than v1.3.0 required a simple password - only containing lower- and uppercase letters as well as numbers.
Starting with v1.3.0 strong passwords became possible due to the implementation of HTTP basic authentication. 

### Push service

The robonect module has a config option called "Push Service" - it pushes status information depending on some configurable events.
When activated the adapter will receive push notifications if one of the events happens. With this option activated you may use much longer poll intervalls than the defaults (eg. 6-12h for status and 24h for info).
These data must also be configured in the Robonect module. Even if listening to all IP addresses (0.0.0.0) you need to configure the real IP address in robonect. The IP format to use is like 192.168.x.x:Port

* You can select GET or POST in Robonect - it works both and does exactly the same.
* No username or password are required.

Since only a subset of status information is pushed (WLAN-Signal, Status, Stopped, Mode, duration, hours, distance and battery) pulling is still needed e.g. to get the blade status.

### The Push-Service config should look like this

#### Admin config

![image](./admin/Push-Service-Adapter.png)

#### Robonect config

![image](./admin/Push-Service-Robonect.png)

## Control

### Mode

The mode of the lawn mower can be controlled by changing robonect.0.status.mode. Possible modes are "Auto", "Home", "Manual", "End of day" and "Job" (not fully implemented at the moment).

### Extensions

It is possible to control the extensions GPIO 1, GPIO 2, OUT 1 and OUT 2 of the Robonect module. Requirement is that the mode of the extension is configured as "API" via the Robonect Web-UI. If for example LEDs are connected to OUT1, it is possible to switch them on in the night and off in the morning by setting Robonect.0.extension.out1.status to "true" or "false".

## Known Issues:
* To ensure the robonect is reachable - the adapter pings the device first before sending any requests. 
This ping may fail especially if ioBroker is installed in a container.
It's not an issue with the adapter itself, but since it may happen, and it's pretty difficult to find a solution try
executing  `sudo chmod 4755 /bin/ping` in a shell inside the ioBroker container. This solution assumes that there is a 
permission issue between the iobroker user and the ping utility.

## Changelog

### Work in progress

### 1.3.5 (2024-06-04)

* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Requires at least admin  v6.13.16
* (grizzelbee) Upd: Requires at least nodeJs v18.0.2
* (grizzelbee) Upd: Updated translations
* (grizzelbee) Upd: Reorganized Admin-UI
* (grizzelbee) New: Added Ping-Option to admin 

 
### 1.3.4 (2023-10-10)

* (grizzelbee) Chg: massive code refactoring 
* (grizzelbee) Fix: Fixed false error message when PushService is listening to all IPv4 or IPv6 addresses
* (grizzelbee) Chg: Forcing pollType info for pushService when enabled it's enabled in config

### 1.3.2 (2023-10-04)

* (grizzelbee) Fix: Switching of extensions works now
* (grizzelbee) Fix: Fixed false error message when switching extensions

### 1.3.1 (2023-10-02)

* (grizzelbee) Chg: removed unnecessary Info log entries 

### 1.3.0 (2023-10-02)

* (grizzelbee) Chg: [#28](https://github.com/Grizzelbee/ioBroker.robonect/issues/28) Changed authentication method from URL-Encoding to basic authentication
* (grizzelbee) Chg: [#27](https://github.com/Grizzelbee/ioBroker.robonect/issues/27) Improved error handling
* (grizzelbee) Upd: Dependencies got updated

### 1.2.0 (2023-09-22)

* (mcm1957) Fix: Adapter requires NodeJs >= 16.0.0  
* (crocri)  New: Introduced code to clear errors 
* (crocri)  Upd: Highlighted issues in functions getValueAsync() and testPushServerConfig()
* (grizzelbee) Fix: Fixed functions getValueAsync() and testPushServerConfig() 

### 1.1.5 (2023-09-08)

* (grizzelbee) Fix: Command-URL was invalid when Robonect UI wasn't protected by username and password
* (grizzelbee) Upd: minor code refactoring

### 1.1.4 (2023-09-04)

* (grizzelbee) Fix: Attempting to fix the error: Cannot read properties of null (reading 'val')

### 1.1.3 (2023-09-01)

* (grizzelbee) New: Added release script for easier publishing to stable repo

### 1.1.1 (2023-08-24)

* (grizzelbee) Fix: Fixed status.stopped for push messages.

### 1.1.0 (2023-08-23)

* (grizzelbee) Fix: [#18](https://github.com/Grizzelbee/ioBroker.robonect/issues/18) Showing values for battery with fractions (again)
* (grizzelbee) New: Added START button
* (grizzelbee) New: Added STOP button
* (grizzelbee) New: Added SERVICE button to reboot, shutdown or sleep Robonect module
* (grizzelbee) New: Push states and interval can be set
* (grizzelbee) New: Nickname of the mower can be set
* (grizzelbee) New: Timers of the mower can be set

### 1.0.5 (2023-08-22)

* (grizzelbee) Upd: Added new state #18 - Garage door is opening
* (grizzelbee) Fix: Status.stopped gets correctly updated

### 1.0.4 (2023-08-22)

* (grizzelbee) Upd: Improved error handling

### 1.0.3 (2023-08-21)

* (grizzelbee) Upd: Improved error handling
* (grizzelbee) Fix: some bug fixes
* (grizzelbee) Upd: Renamed jsonConfig.json5 to jsonConfig.json to get better compatibility

### 1.0.2 (2023-08-18)

* (grizzelbee) Fix: Updated package.json to deliver jasonConfig.json5

### 1.0.1 (2023-08-18)

* (grizzelbee) Upd: Documentation got updated

### 1.0.0 (2023-08-17)

* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Some fixes to make adapter-checker happy
* (grizzelbee) Upd: Updated git workflows
* (grizzelbee) New: Dropped request.js since it's deprecated
* (grizzelbee) New: Replaced request.js by axios.js for http requests
* (grizzelbee) New: Add Webserver for Push-Service API
* (grizzelbee) New: Add adapter-dev support
* (grizzelbee) New: Added snyk plugin
* (grizzelbee) New: Swapped Admin UI to V5

### 0.1.4

* (braindead1) changed polling log level from info to debug
* (braindead1) implemented polling of garage door status

### 0.1.3

* (braindead1) implemented JsonLogic & refactoring

### 0.1.2

* (braindead1) fixed GPS

### 0.1.1

* (braindead1) fixed typo

### 0.1.0

* (braindead1) implemented rest times

### 0.0.12

* (braindead1) improved polling

### 0.0.11

* (braindead1) implemented weather and GPS polls

### 0.0.10

* (braindead1) first stable version

### 0.0.9

* (braindead1) adapter improvements

### 0.0.8

* (braindead1) fixed some issues caused by different configurations

### 0.0.7

* (braindead1) prepared adapter for latest repository

### 0.0.6

* (braindead1) fixed minor issues

### 0.0.5

* (braindead1) updated to work with Robonect HX version 1.1b

### 0.0.4

* (braindead1) updated to work with Robonect HX version 1.0 Beta5

### 0.0.3

* (braindead1) support of Admin3

### 0.0.2

* (braindead1) updated to work with Robonect HX version 1.0 Beta2

### 0.0.1

* (StefSign) initial commit

## License

The MIT License (MIT)

Copyright (c) 2024 grizzelbee

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
