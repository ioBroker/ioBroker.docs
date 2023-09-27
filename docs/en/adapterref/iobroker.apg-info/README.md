![Logo](admin/apg-info.png)
# ioBroker.apg-info

[![NPM version](http://img.shields.io/npm/v/iobroker.apg-info.svg)](https://www.npmjs.com/package/iobroker.apg-info)
![Number of Installations (stable)](http://iobroker.live/badges/apg-info-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.apg-info.svg)](https://www.npmjs.com/package/iobroker.apg-info)
![Number of Installations (latest)](http://iobroker.live/badges/apg-info-installed.svg)
[![Dependency Status](https://img.shields.io/librariesio/release/npm/iobroker.apg-info)](https://libraries.io/npm/iobroker.apg-info)
[![Known Vulnerabilities](https://snyk.io/test/github/HGlab01/ioBroker.apg-info/badge.svg)](https://snyk.io/test/github/HGlab01/ioBroker.apg-info)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_shield)
![Test and Release](https://github.com/HGlab01/ioBroker.apg-info/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.apg-info.png?downloads=true)](https://nodei.co/npm/iobroker.apg-info/)

## apg-info adapter for ioBroker
This adapter provides the peak-times for the Austrian Power Grid, where power consumption shall be avoided. In addition the adapter provides the PHELIX-AT Day-Ahead (EPEX Spot) prices for Austria.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Requires
* NodeJS 16 or higher
* ioBroker host (js-controller) 4.0 or higher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.0.3 (2023-09-24)
* (HGlab01) add point in times sorted as array
* (HGlab01) add average price
* (HGlab01) fix bug IOBROKER-APG-INFO-2 notified by sentry

### 0.0.2 (2023-09-14)
* (HGlab01) add number of days below/above treshold
* (HGlab01) add states sorted by price

### 0.0.1 (2023-09-11)
* (HGlab01) first release

## License
MIT License

Copyright (c) 2023 HGlab01 <iobroker.followthesun@gmail.com>

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

#### Disclaimer apg-powermonitor
More about the security of supply & all data, facts and figures regarding the world of electricity and the energy transition can be found at www.apg-powermonitor.at.


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_large)
