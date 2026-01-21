<img src="admin/serial-gps.svg" style="width: 100px;"/>

# ioBroker GPS (serial/USB) Adapter

![Number of Installations](http://iobroker.live/badges/serial-gps-installed.svg)
![Number of Installations](http://iobroker.live/badges/serial-gps-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.serial-gps.svg)](https://www.npmjs.com/package/iobroker.serial-gps)

![Test and Release](https://github.com/ioBroker/ioBroker.serial-gps/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/serial-gps/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.serial-gps.svg)](https://www.npmjs.com/package/iobroker.serial-gps)

This adapter reads GPS data from a serial or USB GPS device and makes it available in ioBroker.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Getting Started
Insert a USB or serial GPS receiver into your ioBroker host system. Make sure the device is recognized by the operating system and note the assigned serial port (e.g. COM3 on Windows or /dev/ttyUSB0 on Linux).
Go to the adapter configuration page and select the serial port and other parameters if necessary (default baud rate is usually 4800 or 9600). Save and start the adapter. After a while, GPS data should appear in the adapter's data points.

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
### 0.0.4 (2025-12-03)
- (@GermanBluefox) Corrected issues for repo checker

### 0.0.3 (2025-12-01)
- (@GermanBluefox) Initial release

## License

The MIT License (MIT)

Copyright (c) 2025 bluefox <dogafox@gmail.com>

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
