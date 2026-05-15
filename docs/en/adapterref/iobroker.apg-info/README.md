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
This adapter provides the peak-times for the Austrian Power Grid (Austrian values only!), where power consumption shall be avoided. In addition the adapter provides the PHELIX Day-Ahead (EPEX Spot) prices for Austria, Swiss and Germany (configure in Adapter settngs). Provider fee, tax, grid costs can be added optionally in the config (tab Calculation). 
`[..].marketprice.today.jsonChart` and `[..].marketprice.tomorrow.jsonChart` can be used with https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart.  
With the standard-configuration the adapter runs at 00:00, 13:00 and 15.00 o'clock. It's highly recommended not to remove the run at 00:00, otherwise the day-change (tomorrow --> today) will nit work propperly.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Requires
* Node.js 22 or higher
* ioBroker host (js-controller) 6.0.11 or higher

## Quarter-hourly market prices
These market prices are collected by Exaa and as backup by Entsoe and Energy Charts. Therefore it is recommended to *request an Entsoe token* if quarter-hourly prices are configured.

## Swiss market
For the swiss market a token from entsoe.eu is needed.

## How to get an Entsoe token
Register at the page https://transparency.entsoe.eu/ and send afterwards and email to transparency@entsoe.eu asking for RESTFUL API access for the email address you registered. <br>
For more details check https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html#_authentication_and_authorisation

## Time based grid cost calculation
In markets (like Austria) characterized by time-variable grid costs (e.g., reduced rates during midday hours in summer), parameters are now configurable via a table. A reference table illustrates the required data entry format. The feature is in the adapter configuration in the tab "calculation".  
**Important:** Table view works with Admin 7.7.23 or later. In older versions the date field is not shown propperly (https://github.com/ioBroker/ioBroker.admin/issues/3344). 

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.32 (2026-05-02)
* (HGlab01) Adapter requires node.js >= 22 now
* (HGlab01) fix 'DE' is not the code for an available bidding zone
* (HGlab01) Bump axios to 1.15.2

### 0.1.30 (2026-02-24)
* (HGlab01) finetune timeout management

### 0.1.29 (2026-02-14)
* (HGlab01) add time based grid costs calculation (see above)
* (HGlab01) Bump axios to 1.13.5

### 0.1.28 (2025-12-11)
* (HGlab01) add Energy-Charts as third data provider

### 0.1.27 (2025-11-19)
* (HGlab01) disable data provider Epex (not a stable option)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2023-2026 HGlab01 <myiobrokeradapters@gmail.com>

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

#### Disclaimer data providers
Four data providers are used for this adapter
* Exaa (https://www.exaa.at/)
* Entso-e (https://www.entsoe.eu/data/transparency-platform/)
* Energy Charts (https://api.energy-charts.info/) licensed under the CC BY 4.0 license
* aWATTar (https://www.awattar.at/services/api and https://www.awattar.de/services/api)


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_large)
