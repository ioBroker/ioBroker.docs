![Logo](admin/fitbit-fitness.png)
# iobroker.fitbit-fitness
[![NPM version](https://img.shields.io/npm/v/iobroker.fitbit-fitness.svg)](https://www.npmjs.com/package/iobroker.fitbit-fitness)
[![Number of Installations (latest)](https://iobroker.live/badges/fitbit-fitness-installed.svg)](https://iobroker.live/badges/fitbit-fitness-installed.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fitbit-fitness)](https://www.npmjs.com/package/iobroker.fitbit-fitness)
![Number of Installations (stable)](https://iobroker.live/badges/fitbit-fitness.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/Chris-656/iobroker.fitbit-fitness/badge.svg)](https://app.snyk.io/org/Chris-656/iobroker.fitbit-fitness)

[![NPM](https://nodei.co/npm/iobroker.fitbit-fitness.png?downloads=true)](https://nodei.co/npm/iobroker.fitbit-fitness/)
## FITBIT adapter for ioBroker

Adapter for fitbit devices
This adapter retrieves fitbit data into iobroker. Ported from @GermanBluefox  from his fitbit-api (great thx) into the new iobroker template structure and added some new features

## Features
- Body, Activities, Food, Sleep are retrieved individually
- Refresh in minutes for continiously retrieving data
- Sleeping records can be loaded 2 times a day to reduce API calls

## Known Bugs
- none at the moment

## Changelog
<!--
    ### **WORK IN PROGRESS**
-->
### 0.5.0 (2023-11-18)
- Maintanance issues

### 0.4.14 (2023-11-18)
- Fixed some minor bugs

### 0.4.13 (2023-10-31)
- make heartrate time series working

### 0.4.12 (2023-10-03)
- changed node dependencies to node 16

### 0.4.11 (2023-09-26)
- Catch unpresent activity data

### 0.4.10 (2023-02-17)
- fixed web page for token

### 0.4.9 (2023-02-14)
- Changed Repo name

### 0.4.8 (2022-10-09)
- added lowBatteryAlarm
- fixed body records undefined

### 0.4.7 (2022-09-20)
- Added Devices request and battery status

### 0.4.6 (2022-08-01)
- Changed the schedule variance also to 2 hours

### 0.4.5 (2022-06-16)
 - bumping version 0.4.5

### 0.4.4 (2022-06-16)
- fixed minor issues with versions and testing

### 0.4.3 (2022-06-14)
- fixed lower case iobroker
- moved axios to normal dependency
- changed node.schedule to random schedule with an hour
- prepared for syncing history data will come in the next versions server request to fitbit is pending.

### 0.4.0 (2022-06-09)
- fixed lower case iobroker
- moved axios to normal dependency
- changed node.schedule to random schedule with an hour
- prepared for syncing history data will come in the next versions

### 0.3.10 (2022-04-16)
- added Resting Heartrate

### 0.3.9 (2022-04-16)
- added ActiveMinutes
- added Floors (activities)

### 0.3.8 (2022-04-09)
- corrected the auth method of the redirection

### 0.3.7 (2022-03-24)
- changed the auth method. Tested also with Chrome

### 0.3.1 (2022-03-24)
- changed the auth method. resolved the bug with iframe. Now also chrome is working

### 0.3.0 (2022-03-22)
- changed logging -> debug for detailed logging
- bug fixes

### 0.2.5 (2022-02-20)
- add possibility to read sleep records only in the morning and evening to reduce traffic

### 0.2.4 (2022-02-17)
- changed the auth method (ported from @GermanBluefox fitbit-api)
- added a debug option to reduce the logs
- some minor changes

### 0.2.3 (2022-02-15)
- added Food: Carbs, Fiber, Sodium
- fixed Water recording

### 0.2.2 (2022-02-14)
- Bug fixes

### 0.2.1 (2022-02-14)
- Minor fixes

### 0.2.0 (2022-02-14)
- renamed repo to fitbit-fitness

### 0.1.3 (2022-02-07)
- Add: Loggings adapted
- Fix: Changes Refresh Time to minutes

### 0.1.2 (2022-02-03)
- added Activity Records
- Fixed refresh rate

### 0.1.1 (2022-02-02)
- Minor Fixes

### 0.1.0 (2022-01-30)
- Initial version
- ported parts from projekt @GermanBluefox fitbit-api [GermanBluefox](https://github.com/GermanBluefox)
- [ iobroker-community-adapters/iobroker.fitbit-fitness-api ](https://github.com/iobroker-community-adapters/iobroker.fitbit-fitness-api)
- and adpated and enhanced
- used the new createadapter script to be on the newest adapter standard
- reduced the parallel reading since the web page blocks after some time
- included food and sleep records to be retrieved

## License
Copyright (c) 2023 Chris <besterquester@live.at>

MIT License

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