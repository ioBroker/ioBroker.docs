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
This adapter provides the peak-times for the Austrian Power Grid, where power consumption shall be avoided. In addition the adapter provides the PHELIX Day-Ahead (EPEX Spot) prices for Austria and Germany (configure in Adapter settngs).<br>
`[..].marketprice.today.jsonChart` and `[..].marketprice.tomorrow.jsonChart` can be used with https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart.  

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Requires
* NodeJS 18 or higher
* ioBroker host (js-controller) 5.0 or higher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.0-alpha.0 (2023-11-28)
* (HGlab01) first minor release
* (HGlab01) NodeJS 18 or higher
* (HGlab01) ioBroker host (js-controller) 5.0 or higher

### 0.0.7 (2023-10-11)
* (HGlab01) Bump json-explorer to 0.1.14
* (HGlab01) add jsonChart-json for market prices

### 0.0.6 (2023-10-04)
* (HGlab01) fix "TypeError: Cannot read properties of undefined (reading 'Warning')"

### 0.0.5 (2023-10-03)
* (HGlab01) switch data provider for prices to EXAA
* (HGlab01) support DE market prices in addiotion to AT prices

### 0.0.3 (2023-09-24)
* (HGlab01) add point in times sorted as array
* (HGlab01) add average price
* (HGlab01) fix bug IOBROKER-APG-INFO-2 notified by sentry

## License
MIT License

Copyright (c) 2023 HGlab01 <myiobrokeradapters@gmail.com>

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
