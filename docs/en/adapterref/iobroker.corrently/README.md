![Logo](admin/corrently.png)

# ioBroker.corrently

![Number of Installations](http://iobroker.live/badges/corrently-installed.svg) ![Stable Version](http://iobroker.live/badges/corrently-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.corrently.svg)](https://www.npmjs.com/package/iobroker.corrently)
[![Downloads](https://img.shields.io/npm/dm/iobroker.corrently.svg)](https://www.npmjs.com/package/iobroker.corrently)

[![NPM](https://nodei.co/npm/iobroker.corrently.png?downloads=true)](https://nodei.co/npm/iobroker.corrently/)

**Tests:** ![Test and Release](https://github.com/ioBroker/ioBroker.corrently/workflows/Test%20and%20Release/badge.svg)

## corrently adapter for ioBroker

Read green energy index from [https://www.corrently.de/gsi/PLZ](https://www.corrently.de/gsi/80999) .
Following data will be provided:
 - `data.json` - JSON table for next 36 hours with green index
 - `data.start` - start timestamp of the next or current period with green energy 0 - 24
 - `data.duration` - duration of the next or current period with green energy 0 - 24
 - `data.green` - is now green energy or not
 - `data.price` - green price for current moment

## Configuration
Adapter will be executed every hour (can be set as a schedule for instance) and user must enter the post index in the configuration.

<!--
    ### **WORK IN PROGRESS**
-->

## Changelog
### 0.1.2 (2026-10-14)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (@GermanBluefox) Adapter requires node.js >= 22 and admin >= 7.6.17 now
- (@GermanBluefox) Updated packages, migrated to ESLint 9 and removed the outdated admin files
- (@GermanBluefox) The tests run on Windows and macOS too

### 0.1.1 (2023-03-12)
* (Maverick78de) URL was corrected
* (bluefox) Randomize the minutes of the schedule
* (bluefox) Implemented solar chart for the next 5 days

### 0.0.2
* (bluefox) CRON schedule was changed to "1 * * * *"

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019-2026 bluefox

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