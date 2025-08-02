![Logo](admin/mbus.png)
# ioBroker.mbus
======================

![Number of Installations (latest)](https://iobroker.live/badges/mbus-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/mbus-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.mbus.svg)](https://www.npmjs.com/package/iobroker.mbus)

![Test and Release](https://github.com/Apollon77/ioBroker.mbus/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/mbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mbus.svg)](https://www.npmjs.com/package/iobroker.mbus)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

This adapter for ioBroker connects to a M-Bus Master via TCP or serial to provide the status and details of connected M-Bus devices.

## Description of parameters
### Gateway IP / TCP Port
IP address and port of the M-Bus Master/Gateway when using TCP.

### Serial port / baud rate
Serial Port and Baud rate of M-Bus Master/Gateway.

### Update Interval
Interval in Seconds to update the data. Default (if empty) is 3600s (1h). Consider how the devices on the M-Bus bus are powered to prevent draining batteries. If you set the interval to 0 then the device is read only once on adapter start, but then no longer automatically.

### Device IDs
You can use primary (1-250) and secondary (16 characters long) M-Bus IDs

## How to read the Device on request?
In the created states for each device one state exists called "updateNow". When you set this to true (as control action with ack=false) the device is updated immediately. If an interval is configured the interval restarts after the data are received.

## Todo
* encrypted payload handling (if needed by anyone)

## How to report issues and feature requests

Please use GitHub issues for this.

Best is to set the adapter to Debug log mode (Instances -> Expert mode -> Column Log level). Then please get the logfile from disk (subdirectory "log" in ioBroker installation directory and not from Admin because Admin cuts the lines). If you do not like providing it in GitHub issue you can also send it to me via email (iobroker@fischer-ka.de). Please add a reference to the relevant GitHub issue AND also describe what I see in the log at which time.

## Changelog
### 2.7.0 (2024-04-05)
* (Apollon77) Add IPv6 support for TCP connections
* (Apollon77) Fixed baudrate 1200 for Windows (2400 was used before)

### 2.6.1 (2023-11-25)
* IMPORTANT: Node.js 16.x is now required at least
* (Apollon77) Upgrade dependencies

### 2.5.0 (2023-08-11)
* IMPORTANT: Node.js 14.x is now required at least
* (Apollon77) Update dependencies to also support Node.js 20

### 2.4.0 (2022-06-30)
* IMPORTANT: Node.js 12.x is now required at least
* (Apollon77) Several updates and optimizations

### 2.3.4 (2021-03-07)
* (Apollon77) Send a reset to the device before reading data

### 2.3.2 (2021-02-27)
* (Apollon77) Prevent crash case(Sentry IOBROKER-MBUS-H)

### 2.3.1 (2020-10-30)
* (Apollon77) Prevent crash case (Sentry IOBROKER-MBUS-F)

### 2.3.0 (2020-08-02)
* (Apollon77) mbus library updated

### 2.2.3 (2020-07-26)
* (Apollon77) crash prevented (Sentry IOBROKER-MBUS-C)

### 2.2.2 (2020-07-23)
* (Apollon77) crash prevented (Sentry IOBROKER-MBUS-B)

### 2.2.1 (2020-06-30)
* (Apollon77) prevent crash (Sentry IOBROKER-MBUS-7)

### 2.2.0 (2020-04-13)
* (Apollon77) make compatible with nodejs 13+

### 2.1.6 (2020-04-12)
* (Apollon77) update dependencies

### 2.1.5 (2020-03-08)
* (Apollon77) update dependencies

### 2.1.4 (2020-02-08)
* (Apollon77) optimize adapter stop logic to prevent crashes (again)

### 2.1.3 (2020-02-05)
* (Apollon77) optimize adapter stop logic to prevent crashes
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 2.1.0 (2019-12-18)
* add compact mode
* move to more flexible serial port configuration
* add Sentry for error reporting

### 2.0.0 (2019-10-16)
* (lvogt) **BREAKING CHANGE** better handling for values with changing scaling based on the value - maybe incompatible with old values!
* (lvogt) add setting to force kWh values for energy

### 1.1.1 (2018-12-10)
* (Apollon77) make sure adapter is not communicating too fast at the beginning

### 1.1.0 (2018-05-06)
* (bluefox) Error tolerance
* (apollon77) Fix Admin

### 0.1.8 (2018-04-03)
* (apollon77) fix config dialog

### 0.1.7 (2018-04-02)
* (apollon77) allow to set "0" as update interval that will cause in no automatic updates, so only manually using updateNow is possible.

### 0.1.6 (2018-03-26)
* (apollon77) disconnect/reconnect for each query

### 0.1.5 (2018-03-26)
* (apollon77) update to node-mbus 0.5 with shorter timeouts

### 0.1.4 (2018-03-26)
* (apollon77) add "updateNow" states to all devices to trigger manual update
* (apollon77) update to node-mbus 0.4.1 with shorter timeouts

### 0.1.2
* (apollon77) official released version

### 0.0.1
* (apollon77) initial release for testing

## License

The MIT License (MIT)

Copyright (c) 2018-2024 Apollon77 <ingo@fischer-ka.de>

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
