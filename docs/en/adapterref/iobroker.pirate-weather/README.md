![Logo](admin/pirate-weather.png)

# ioBroker.pirate-weather

[![NPM version](https://img.shields.io/npm/v/iobroker.pirate-weather.svg)](https://www.npmjs.com/package/iobroker.pirate-weather)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pirate-weather.svg)](https://www.npmjs.com/package/iobroker.pirate-weather)
![Number of Installations](https://iobroker.live/badges/pirate-weather-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/pirate-weather-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.pirate-weather.png?downloads=true)](https://nodei.co/npm/iobroker.pirate-weather/)

**Tests:** ![Test and Release](https://github.com/ticaki/ioBroker.pirate-weather/workflows/Test%20and%20Release/badge.svg)

## pirate-weather adapter for ioBroker

Retrieve data from Pirate-Weather.

You can get the required Api token here: https://docs.pirateweather.net/en/latest/ The rest should be self-explanatory.
The explanation of what the individual data points mean can be found here: https://docs.pirateweather.net/en/latest/API/

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.5.0 (2025-09-24)
- (ticaki) Code migration from axios to node:fetch
- (ticaki) Corrected roles for visualisation (lovelance) fixes #19

### 0.4.1 (2025-09-12)
- (ticaki) Humidity is now displayed correctly in percent.  fixes #15
- (ticaki) Wind direction text is now translated into the system iobroker language. fixes #16

### 0.4.0 (2025-08-28)
- (ticaki) In the CA system of units, precipAccumulation is now output in mm.
- (ticaki) Use api version 2

### 0.3.0 (2025-08-25)
- (ticaki) update deps - inital latest release
- (ticaki) increase delay by 1.5 seconds

### 0.2.0 (2025-08-16)
- (ticaki) Configuration option to enter an interval in minutes. In the event of an error, no accelerated reconnection is used here.
- (ticaki) Use system language for summaries.

### 0.1.4 (2025-08-15)
- (ticaki) Ignore ECONNABORTED error code
- (ticaki) In the event of an error, new connection attempt in 10 minutes
- (ticaki) missing % added
- (ticaki) Startup log message added.

### 0.1.3 (2025-08-12)
- (ticaki) BREAKING: cloudCover, precipProbability, humidity and moonPhase are now percentage values

### 0.1.2 (2025-08-10)
- (ticaki) update icon

### 0.1.1 (2025-08-10)
- (ticaki) First version for the iobroker repository

### 0.1.0 (2025-08-09)
- (ticaki) units (us, ca, uk) added
- (ticaki) beautiful states :)
- (ticaki) Zero minutes and seconds in the interval.
- (ticaki) fixed: Language undefined not exist!

### 0.0.7 (2025-08-09)
- (ticaki) data removed from enumeration names

## License

MIT License

Copyright (c) 2025 ticaki <github@renopoint.de>

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
