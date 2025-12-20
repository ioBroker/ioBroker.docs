![Logo](admin/teltonika.png)
# ioBroker Teltonika

![Number of Installations](http://iobroker.live/badges/teltonika-installed.svg)
![Number of Installations](http://iobroker.live/badges/teltonika-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.teltonika.svg)](https://www.npmjs.com/package/iobroker.teltonika)

![Test and Release](https://github.com/ioBroker/ioBroker.teltonika/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/teltonika/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.teltonika.svg)](https://www.npmjs.com/package/iobroker.teltonika)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

This adapter reads data from Teltonika routers via MQTT.
It can read the following information: 
- temperature ('RUT2', 'RUT9', 'RUTX', 'RUT3', 'RUT1', 'TRB2', 'TRB5', 'OTD', 'RUTM', 'RUTC')
- signal strength
- mobile operator
- network state
- connection type (2G/3G/4G)
- wan IP address
- uptime
- name
- digital input 1 ('RUT9')
- digital input 2 ('RUT9')
- analog input ('RUT9', 'TRB2', 'TRB141')
- pin 2 status ('TRB2')
- pin 3 status ('RUT1', 'RUT2', 'RUT9', 'RUTX', 'RUT3', 'TRB1', 'TRB2', 'TRB5', 'RUTM')
- pin 4 status ('RUT1', 'RUT2', 'RUT9', 'RUTX', 'RUT3', 'TRB1', 'TRB2', 'TRB5', 'RUTM')

## Usage
Steps:
- Start the instance first
- Go to your router and open MQTT settings
  ![Settings](img/settings.png)
  - Enable MQTT publisher
  - Set the MQTT broker address to the address of your ioBroker instance
  - Set the MQTT broker port. Important: the default port of this adapter is 1885 to not interfere with other MQTT adapters
  - Save the settings
  - Some routers need a restart to apply the settings
- After some time, the data points will be created in the adapter instance

**Notice**: tested is only with `RUTC` device.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
## Changelog
### 0.1.0 (2025-12-07)
* (bluefox) Changed roles of the states

### 0.0.2 (2025-12-03)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2025, bluefox <dogafox@gmail.com>

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
