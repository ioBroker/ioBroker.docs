![Logo](admin/sofarcloud.jpg)
# ioBroker.sofarcloud

[![NPM version](https://img.shields.io/npm/v/iobroker.sofarcloud.svg)](https://www.npmjs.com/package/iobroker.sofarcloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sofarcloud.svg)](https://www.npmjs.com/package/iobroker.sofarcloud)
![Number of Installations](https://iobroker.live/badges/sofarcloud-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/sofarcloud-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.sofarcloud.png?downloads=true)](https://nodei.co/npm/iobroker.sofarcloud/)

**Tests:** ![Test and Release](https://github.com/ltspicer/ioBroker.sofarcloud/workflows/Test%20and%20Release/badge.svg)

## sofarcloud adapter for ioBroker

This adapter reads the data from the SofarCloud server and stores it in the data point sofarcloud.

The SofarCloud server stores data from Sofar inverters.

First, install the app ( https://de.sofarsolar.com/cloud.html ) and register your Sofar inverter.

You must then enter your login details in the adapter (email & password).

The data can be sent to another system via MQTT if desired.

The received data can also be saved as JSON (sofar_realtime.json).


## Changelog
### 3.2.7 (2025-10-14)

- "Invalid station ID" message as warning instead of info
- "Start cloud query after..." as info instead of debug

### 3.2.6 (2025-10-14)

- station_id.length < 9 instead 18
- delay up to 177s

### 3.2.5 (2025-10-10)

- Added query to check whether valid station ID is available

### 3.2.4 (2025-10-07)

- package.json edited

### 3.2.3 (2025-10-04)

- Security issue (my email address)

### 3.2.2 (2025-09-19)

- Typos corrected

### 3.2.1 (2025-09-16)

- Increment failed login attempts only if username or password is wrong

### 3.2.0 (2025-09-16)

- More login info. No increment failed login attempts if server error

### 3.1.0 (2025-09-14)

- DataReceived flag added

### 3.0.1 (2025-08-29)

- Normalize values before write

### 3.0.0 (2025-08-29)

- Check whether configuration has changed
- Cleaner termination
- Passwords encrypted
- Stop after 3 failed logins

### 2.0.0 (2025-08-27)

- Type & Role set more precisely

### 1.0.2 (2025-08-18)

- Delay 0-57s added

### 1.0.1 (2025-08-15)

- Div dependencies

### 1.0.0 (2025-08-15)
- Initial release

## License
MIT License

Copyright (c) 2025 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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
