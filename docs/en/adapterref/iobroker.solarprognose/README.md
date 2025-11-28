![Logo](admin/solarprognose.png)

# ioBroker.solarprognose

[![NPM version](https://img.shields.io/npm/v/iobroker.solarprognose.svg)](https://www.npmjs.com/package/iobroker.solarprognose)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solarprognose.svg)](https://www.npmjs.com/package/iobroker.solarprognose)
![Number of Installations](https://iobroker.live/badges/solarprognose-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/solarprognose-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.solarprognose.png?downloads=true)](https://nodei.co/npm/iobroker.solarprognose/)

**Tests:** ![Test and Release](https://github.com/Scrounger/ioBroker.solarprognose/workflows/Test%20and%20Release/badge.svg)

## solarprognose adapter for ioBroker

Solar forecast based on the API from [solarprognose.de](https://www.solarprognose.de/)

## API Configuration

1. Under Settings -> API Overview create an access token

2. Under Settings -> User profile all time zone `UTC (UTC -00:00)` must be selected

   ![img](doc/api_timezone.png)

3. Under Settings -> User settings, `Use the user timezone in the API` must be activated

   ![img](doc/api_use_timezone.png)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2025-10-23)

- (Scrounger) !!! breaking changes - states structure has been completely revised !!!
- (Scrounger) dependencies updated
- (Scrounger) node minimum set to 20
- (Scrounger) converted to esm
- (Scrounger) eslint 9 added

### 1.2.2 (2025-02-08)

- (Scrounger) bug fixes

### 1.2.1 (2024-10-18)

- (Scrounger) bug fixes

### 1.2.0 (2024-10-17)

- (Scrounger) calc accuracy on state changed
- (Scrounger) update energy now and energy from now every hour
- (Scrounger) optional interpolate daily energy values (energy now and energy from now)

### 1.1.0 (2024-10-15)

- (Scrounger) accuracy calculation added
- (Scrounger) energy now added
- (Scrounger) energy from now added
- (Scrounger) bug fixes

### 1.0.0 (2024-10-08)

- (Scrounger) initial release

## License

MIT License

Copyright (c) 2025 Scrounger <scrounger@gmx.net>

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
