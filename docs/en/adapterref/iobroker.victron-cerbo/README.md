![Logo](admin/victron-cerbo.png)
# ioBroker Victron Cerbo

![Number of Installations](http://iobroker.live/badges/victron-cerbo-installed.svg)
![Number of Installations](http://iobroker.live/badges/victron-cerbo-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.victron-cerbo.svg)](https://www.npmjs.com/package/iobroker.victron-cerbo)

![Test and Release](https://github.com/ioBroker/ioBroker.victron-cerbo/workflows/Test%20and%20Release/badge.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.victron-cerbo.svg)](https://www.npmjs.com/package/iobroker.victron-cerbo)

## Description
This adapter connects Victron Cerbo GX devices to ioBroker via MQTT.

The Victron Cerbo GX is an advanced monitoring and control hub for Victron Energy systems, including solar chargers, battery monitors, inverters, and other energy components.

## Configuration
- **IP**: IP address of the MQTT broker
- **Port**: MQTT broker port (default: 1883)
- **User/Password**: MQTT authentication credentials
- **Client timeout**: Timeout in seconds for MQTT client connections

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
## Changelog
### 0.2.1 (2026-04-12)
* (@GermanBluefox) Implemented the tests

### 0.1.0 (2026-04-11)
* (@GermanBluefox) Corrected some states

### 0.0.1
* Initial release

## License

The MIT License (MIT)

Copyright (c) 2026, Denis Haev <dogafox@gmail.com>

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
