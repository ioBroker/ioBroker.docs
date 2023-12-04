![Logo](admin/fuelpricemonitor.png)
# ioBroker.fuelpricemonitor

[![NPM version](http://img.shields.io/npm/v/iobroker.fuelpricemonitor.svg)](https://www.npmjs.com/package/iobroker.fuelpricemonitor)
![Number of Installations (stable)](http://iobroker.live/badges/fuelpricemonitor-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fuelpricemonitor.svg)](https://www.npmjs.com/package/iobroker.fuelpricemonitor)
![Number of Installations (latest)](http://iobroker.live/badges/fuelpricemonitor-installed.svg)
[![Dependency Status](https://img.shields.io/librariesio/release/npm/iobroker.fuelpricemonitor)](https://libraries.io/npm/iobroker.fuelpricemonitor)
[![Known Vulnerabilities](https://snyk.io/test/github/HGlab01/ioBroker.fuelpricemonitor/badge.svg)](https://snyk.io/test/github/HGlab01/ioBroker.fuelpricemonitor)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_shield)
![Test and Release](https://github.com/HGlab01/ioBroker.fuelpricemonitor/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.fuelpricemonitor.png?downloads=true)](https://nodei.co/npm/iobroker.fuelpricemonitor/)

## fuelpricemonitor adapter for ioBroker
This adapter retrieves the fuel (Diesel, Super95 and CNG) prices from the offical Austria database based on your configered geo-position. The API delivers the prices only for the first 5 station. For the other 5 stations the prices are not available. Additional locations can be added.
Default schedule is done every 20 minutes as cron job in the instance tab.  

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Requires
* Node.js 18 or higher
* ioBroker host (js-controller) 5.0 or higher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (HGlab01) Breaking changes
    - Node.js 18.0 or higher
    - ioBroker host (js-controller) 5.0 or higher
* (HGlab01) Bump axios to 1.6.2

### 0.3.6 (2023-08-10)
* (HGlab01) switch to Admin5 UI for configuration

### 0.3.5 (2023-07-07)
* (HGlab01) Spread API calls
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.12

### 0.3.4 (2023-02-05)
* (HGlab01) Cheapest station from experimental to stable
* (HGlab01) Bump axios to 1.3.2

### 0.3.3 (2022-12-22)
* (HGlab01) Cheapest station now per fuel type (#445)

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


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_large)
