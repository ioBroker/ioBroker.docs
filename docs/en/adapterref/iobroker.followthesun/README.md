![Logo](admin/followthesun.png)
# ioBroker.followthesun

[![NPM version](http://img.shields.io/npm/v/iobroker.followthesun.svg)](https://www.npmjs.com/package/iobroker.followthesun)
![Number of Installations (stable)](http://iobroker.live/badges/followthesun-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.followthesun.svg)](https://www.npmjs.com/package/iobroker.followthesun)
![Number of Installations (latest)](http://iobroker.live/badges/followthesun-installed.svg)
[![Dependency Status](https://img.shields.io/librariesio/release/npm/iobroker.followthesun)](https://libraries.io/npm/iobroker.followthesun)
[![Known Vulnerabilities](https://snyk.io/test/github/HGlab01/ioBroker.followthesun/badge.svg)](https://snyk.io/test/github/HGlab01/ioBroker.followthesun)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun?ref=badge_shield)
![Test and Release](https://github.com/HGlab01/ioBroker.followthesun/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.followthesun.png?downloads=true)](https://nodei.co/npm/iobroker.followthesun/)

## followthesun adapter for ioBroker

This adapter calculates the current altitude and azimuth of the sun based on the geoposition. Additionally compass direction and the movement (sunrise or sunset) of the sun is stored.
It is using the geo-position defined in the configuration. Calculation interval can be defined in instance preferences.
Solar-noon values for some days like today, tomorrow or beginn of spring/summer/autumn/winter are stored as well.  


**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (HGlab01) Improve error log if coordinates are not set

### 0.4.0 (2022-11-19)
* (Jey-Cee) Updated object definitions: use of roles, multilanguage names
* (Jey-Cee) Added missing objects for folders
* (HGlab01) !Breaking change! NodeJS 14.16 or higher required
* (HGlab01) !Breaking change! ioBroker js-controller 4.0 or higher required
* (HGlab01) Update libs

### 0.3.9 (2022-02-24)
* (HGlab01) Bump iobroker-jsonexplorer to v0.1.9
* (HGlab01) js-controller 4.0 readiness
* (HGlab01) fix sometimes today is not today

### 0.3.8 (2021-12-07)
* (HGlab01) Notifiy Sentry about new release

### 0.3.7 (2021-11-29)
* (HGlab01) Bump @alcalzone/release-script to 3.4.0
* (HGlab01) Improve error handling

### 0.3.5 (2021-07-27)
* (HGlab01) Improve state and sentry handling by bump iobroker-jsonexplorer to v0.1.1

## License
MIT License

Copyright (c) 2022 HGlab01 <iobroker.followthesun@gmail.com>

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


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun?ref=badge_large)
