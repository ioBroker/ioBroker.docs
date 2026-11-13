<img src="admin/serial-gps.svg" style="width: 100px;"/>

# ioBroker GPS (serial/USB) Adapter

![Number of Installations](http://iobroker.live/badges/serial-gps-installed.svg)
![Number of Installations](http://iobroker.live/badges/serial-gps-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.serial-gps.svg)](https://www.npmjs.com/package/iobroker.serial-gps)

![Test and Release](https://github.com/ioBroker/ioBroker.serial-gps/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/serial-gps/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.serial-gps.svg)](https://www.npmjs.com/package/iobroker.serial-gps)

This adapter reads GPS data from a serial or USB GPS device and makes it available in ioBroker.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Getting Started
Insert a USB or serial GPS receiver into your ioBroker host system. Make sure the device is recognized by the operating system and note the assigned serial port (e.g. COM3 on Windows or /dev/ttyUSB0 on Linux).
Go to the adapter configuration page and select the serial port and other parameters if necessary (default baud rate is usually 4800 or 9600). Save and start the adapter. After a while, GPS data should appear in the adapter's data points.

## Current position in admin
The tab **Current position** of the instance settings shows the position of the receiver live on an OpenStreetMap map (arrow in the direction of travel, dot when standing, with the track since the tab was opened) together with connection, fix, satellites, coordinates, altitude, speed, course and DOP values. The map is shown only while the instance is running and needs internet access in the browser (map tiles and the Leaflet library). It shows the values of the data points, so the options below apply to it as well.

## Update of values
Most receivers send a new fix every second, so the GPS data points change every second too. These options in the adapter configuration reduce the number of updates (all are off with `0`):
- **Minimal update interval** (seconds): each GPS value is written at most once in this interval. A value that changes in between is written with the next update after the interval.
- **Minimal position change** (meters): `latitude`, `longitude`, `position` and `latlon` are only updated after the receiver moved at least this distance from the last written position. This suppresses the jitter of a standing receiver.
- **Minimal direction change** (degrees): `course` is only updated after it changed at least by this angle from the last written value (359° → 1° counts as 2°).
- **Minimal speed for direction** (km/h): `course` is only updated while the speed is at least this value, e.g. `2`. A standing receiver reports random directions; this way the last direction of travel is kept.

The interval applies on top of the distance and the direction, so all set conditions must be fulfilled, e.g. `10` s and `5` m: the position is updated at most every 10 seconds, and only if it changed by more than 5 meters. Other values (speed, satellites, time, ...) only follow the interval. `info.connection` is always updated immediately.

## Tested devices
Normally, all devices that deliver NMEA data via serial or USB should work. Here are some devices that have been tested:
- GlobalSat BU-353N5 USB-GNSS-Receiver
- VK-162 G-Mouse USB GPS
- G72 G-Mouse USB

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
## Changelog
### 1.1.0 (2026-11-05)
* (@GermanBluefox) Added options to limit the updates of the GPS values: a minimal update interval, a minimal position change, a minimal direction change and a minimal speed for the direction
* (@GermanBluefox) The settings are split into tabs. The new tab "Current position" shows the position on an OpenStreetMap map and the current GPS values. Admin 7.7.28+ is required

### 1.0.2 (2026-10-13)
* (@GermanBluefox) Admin 7.6.20+ is required. Corrected the roles of some states. Fixed the integration test
* (@GermanBluefox) The adapter reports the serial port it has open (and in test mode the UDP port 50547) to js-controller 8, which keeps a per-host registry of the occupied resources (`system.host.<name>.usedResources`). A second instance configured for the same GPS receiver is visible as a conflict, and the log names the other instance before the port is opened. An older js-controller is unaffected

### 1.0.1 (2026-10-07)
- (iobroker-bot) Adapter requires node.js >= 22 now.
- (@GermanBluefox) By test of the port that already used by same instance, the port will be released for tests.

### 1.0.0 (2026-05-29)
- (@GermanBluefox) Added possibility to select GPS device by name instead of path

### 0.0.4 (2025-12-03)
- (@GermanBluefox) Corrected issues for repo checker

## License

The MIT License (MIT)

Copyright (c) 2025-2026 bluefox <dogafox@gmail.com>

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