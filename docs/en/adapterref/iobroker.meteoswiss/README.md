![Logo](admin/meteoswiss.png)

# ioBroker.meteoswiss

[![NPM version](https://img.shields.io/npm/v/iobroker.meteoswiss.svg)](https://www.npmjs.com/package/iobroker.meteoswiss)
[![Downloads](https://img.shields.io/npm/dm/iobroker.meteoswiss.svg)](https://www.npmjs.com/package/iobroker.meteoswiss)
![Number of Installations (latest)](https://iobroker.live/badges/meteoswiss-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/meteoswiss-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.meteoswiss.png?downloads=true)](https://nodei.co/npm/iobroker.meteoswiss/)

**Tests:** ![Test and Release](https://github.com/deMynchi/ioBroker.meteoswiss/workflows/Test%20and%20Release/badge.svg)

## meteoswiss adapter for ioBroker

Provides weather information from MeteoSwiss

## State names

To keep the state IDs short and clear, many states only use numbers to distinguish them. All states have meaningful names, so you may need to enable the "Name" column in ioBroker.admin to understand the meaning of all states.

## Weather updates

MeteoSwiss updates its weather data every 10 minutes. This adapter tries to get the weather data as quickly as possible after it changed and will adapt its refresh timer accordingly. You can expect weather data to usually be no older than 11 minutes.

## Unknown values

Certain values are not always reported by all weather stations or forecast locations. Those states will have the value `null` to clearly distinguish between unknown values and known "0" values.

## Aggregation of values

Certain measurements and predictions are reported more often than the 3 hour interval this adapter provides as states. So, these values are aggregated in a logical way (minimum is the minimum of all values in the range, maximum is the maximum, ...).

## Weather warnings

All `warning-xx` states show the currently most important active warning of the given category. It is possible that at the same time multiple warnings of the same category exist, but this adapter will only show the most important one. Warnings of a higher level and warnings that are not marked as "outlook" are considered more important than warnings of a lower level or marked as "outlook".

If no warning of a given category is active, the `warning-xx.level` state will have the value `0` (None) and all other states of that category will be `null`.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.2 (2026-01-21)

- (deMynchi) Fixes to satisfy code review

### 1.0.1 (2026-01-06)

- (deMynchi) Fixes to satisfy repochecker

### 1.0.0 (2026-01-06)

- (deMynchi) Update to API version 3
- (deMynchi) Remove subscription (no longer working)
- (deMynchi) Use latest create-adapter template
- (deMynchi) Switch to pure TypeScript adapter (no more build)

### 0.2.1 (2021-07-13)

- (deMynchi) Fixed issue where sometimes the wrong warning texts were shown when there are multiple warnings from different categories.

### 0.2.0 (2021-07-08)

- (deMynchi) Added warnings for PLZ entries.

### 0.1.2 (2021-03-22)

- (deMynchi) Fixed connection state always yellow.

### 0.1.1 (2021-03-22)

- (deMynchi) Fixed initial download of sqlite db that was broken

### 0.1.0 (2021-03-21)

- (deMynchi) initial release

## License

MIT License

Copyright (c) 2026 deMynchi

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
