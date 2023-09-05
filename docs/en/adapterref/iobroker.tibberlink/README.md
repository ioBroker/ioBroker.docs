![Logo](admin/tibberlink.png)
# ioBroker.tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.tibberlink.svg)](https://www.npmjs.com/package/iobroker.tibberlink)
![NPM version (stable)](https://iobroker.live/badges/tibberlink-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tibberlink.svg)](https://www.npmjs.com/package/iobroker.tibberlink)
![Number of Installations (latest)](https://iobroker.live/badges/tibberlink-installed.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)](https://snyk.io/test/github/hombach/ioBroker.tibberlink)

**CI-Tests:**
![Test and Release](https://github.com/hombach/ioBroker.tibberlink/workflows/Test%20and%20Release/badge.svg)
[![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-tibberlink)

[![NPM](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)](https://nodei.co/npm/iobroker.tibberlink/)


## Adapter for using TIBBER energy data in iOBroker
Adapter for linking data from your Tibber account API to be used in ioBroker

If you're not a Tibber user right now, it's greatly appreciated when you're using my reveral link:

[https://invite.tibber.com/2gwuign3.](https://invite.tibber.com/2gwuign3.)

## Configuration
1. Create a new instance of the adapter
2. You will also need an API token from Tibber. Get it here: [https://developer.tibber.com/](https://developer.tibber.com/)
3. Fill in your Tibber API token
4. Choose to also pull data from your Tibber Pulse  -  !! Only working if hardware is installed
5. Save the settings

## Notes
This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers. For more details and for informations on how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Changelog
! Note that missing version entries are typically dependency updates for improved security.

### 0.2.6 (2023-09-04)
* (HombachC) fix error with boolean states
### 0.2.5 (2023-09-03)
* (HombachC) optimize code to mitigate set state timing for long JSON states (#68) 
### 0.2.4 (2023-08-30)
* (HombachC) enable correct price poll also for adapter running in different timezones (#63) 
### 0.2.3 (2023-08-27)
* (HombachC) fix error in 0.2.2 in start conditions of adapter
### 0.2.2 (2023-08-24)
* (HombachC) reducing polls at Tibber server by precheck of known data
* (HombachC) code optimizations
* (HombachC) fix config screen (#55)
### 0.2.1 (2023-08-21)
* (HombachC) double timeout for Tibber server queries
### 0.2.0 (2023-08-18)
* (HombachC) introduces JSONs for prices sorted by price ascending
* (HombachC) fix stupid error for obsolete next day pricing (#23, #50)
### 0.1.10 (2023-08-15)
* (HombachC) bump dependencies, code cleanups
* (HombachC) preparations for tibber calculator
* (HombachC) mitigate multi homes & pulse problems (#41)
* (HombachC) add documentation to config screen (#47)
### 0.1.9 (2023-08-14)
* (HombachC) optimizing fetching homes list (#32) after Tibber server error, restart adapter in case of trouble
### 0.1.8 (2023-08-12)
* (HombachC) bump dev-dependencies, fix eslint/prettier issue
### 0.1.7 (2023-08-11)
* (HombachC) code cleanup, fix error for obsolete next day pricing (#23)
* (HombachC) add another try/catch while fetching homes list (#32)
### 0.1.6 (2023-07-30)
* (HombachC) add units for live data, bump adapter-core to 3.x
### 0.1.5 (2023-07-18)
* (HombachC) fix error in sentry logging
### 0.1.4 (2023-07-17)
* (HombachC) BREAKING: encrypted API-Token in ioBroker
* (HombachC) rearranged configuration options
* (HombachC) fixed bug in state generation
### 0.1.3 (2023-07-17)
* (HombachC) all log messages in English
* (HombachC) remove unused state change handler
* (HombachC) fixed state roles
### 0.1.2 (2023-07-17)
* (HombachC) round grid consumption meter values to Wh accuracy
* (HombachC) hide unused checkboxes in config
* (HombachC) fix snyc and appveyor
### 0.1.1 (2023-07-16)
* (HombachC) remove release script and dev-server
### 0.1.0 (2023-07-14)
* (HombachC) initial version

## License
GNU General Public License v3.0 only

Copyright (c) 2023 Hombach <TibberLink@homba.ch>
