![Logo](admin/mielecloudservice.svg)
# ioBroker.mielecloudservice
![Number of Installations](http://iobroker.live/badges/mielecloudservice-installed.svg)
![Number of Installations](http://iobroker.live/badges/mielecloudservice-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)](https://www.npmjs.com/package/iobroker.mielecloudservice)
[![Known Vulnerabilities](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice?targetFile=package.json)
[![Test and Release](https://github.com/Grizzelbee/ioBroker.mielecloudservice/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.mielecloudservice/actions/workflows/test-and-release.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/grizzelbee/iobroker.mielecloudservice/blob/master/README.md)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)](https://www.npmjs.com/package/iobroker.mielecloudservice)
[![NPM](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)](https://nodei.co/npm/iobroker.mielecloudservice/)

## mielecloudservice adapter for ioBroker

Get your Miele appliances (XGW3000 & WiFiConn@ct) connected

>If you like this adapter and consider supporting me:<br/>
>[![Donate with PayPal](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## Description
This adapter is for retrieving information about all your Miele@Home devices from the official Miele 3rd-party API.
Regardless if they are connected directly via Wi-Fi or XGW3000 Gateway. It implements the **Miele 3rd Party API V1.0.5**

## Prerequisites
* Miele@Home User (Smartphone App)
* Miele@Home Password (Smartphone App)
* Miele Client_id (from https://www.miele.com/developer/)
* Miele Client_secret (from https://www.miele.com/developer/ )

## Installation
To install, do the following:

1. Install via Admin using the
1. Install via Admin using the
* stable Repo - to get the current stable version
* latest Repo - to get the latest test version (maybe not stable)
* via: https://github.com/Grizzelbee/ioBroker.mielecloudservice.git - to get the latest development version
2. create an App-Account for Miele@Home in the Miele Smartphone App
3. Create a developer account at https://www.miele.com/f/com/en/register_api.aspx
4. Add your Miele-Devices to the App (if not added automatically)
6. Fill in the client_secret and client_id received from Miele-developer Team and account-id and password from the App.

## Features
This adapter currently implements nearly all features of the Miele API V1.0.5 and some parts of API V1.0.6.
The capabilities of the API may (and do so currently) vary from the capabilities of the iOS and Android apps.
E.g. there are no information available on the TwinDos - even the apps have them.
This includes:
* All known and documented appliance types are supported (API V1.0.6).
* Basic information for all appliance types.
* Extended information for all appliance types.
* EcoFeedback (water and/or power consumption) for appliances reporting this.
  `Note: Not all devices report this information - event not if they do so in the iOS or Android apps. Search for the ecoFeedback folder in the device tree.`
* Supported actions you can execute on this device - capabilities of the device are mostly reported by the API itself.

## Known Issues
* The programs are basically supported since v6.0.0 of the adapter. Except programs that need additional parameters like for ovens.

## Configuration
### Basic config
To get this adapter running you'll need at least:
* Miele@Home User (from the Smartphone App)
* Miele@Home Password (from the Smartphone App)
* Miele Client_id (from https://www.miele.com/developer/)
* Miele Client_secret (from https://www.miele.com/developer/ )

### Requesting data from Miele servers
Since V6.2.0 you have the opportunity to chose between 
* Server-Sent Events      (Server-Sent Events Checkbox is checked - default and *highly recommended*) 
* Time based Data-Polling (Server-Sent Events Checkbox is unchecked)
* Delayed Processing

#### Server-sent events (highly recommended)
Server-Sent Events are a very neat method to get data from the miele servers since the servers will send you data 
whenever there are changes. No useless polling every xx seconds ignoring whether there were changes or not. Unfortunately
there are issues using this connection type - it fails pretty often and only restarting the adapter solves this.

#### Time based Data Polling
To improve stability of the adapter I reintroduced data polling as a config option you may use when SSE fails four you.
Nevertheless, SSE is the default, and I highly recommend trying and using it since it saves many resources on your and on 
Mieles side. Beside of that I focus on SSE since Version 5.x.x.
Time based Data-Polling relies on the two config options:
* poll interval
* poll interval unit (seconds/minutes)

#### Delayed Processing
In case you own some Miele appliances and use them at the same time it may happen that the API gets sending many messages 
in a short time period. Depending on your ioBroker hardware this may overload your server and result in unresponsive 
visualization or an unresponsive broker at all. To avoid this, this config option reduces the number of messages being
processed to one message every xxx milliseconds. 
Related config options:
* delayed processing
* message delay

## Controlling your devices
### Actions
All currently supported and documented Actions for all devices are implemented (API V1.0.5).
> Please remember that Actions will only work if you put your device into the appropriate state (e.g. Mobile Control, powerOn, ...).
Please refer to [Miele-Documentation](#documentation) for more Information on actions.

### Programs (Introduced in API V1.0.5)
With API V1.0.5 Miele introduced a new endpoint called "/programs".
The support for this endpoint starts with adapter version 4.5.0. A new datapoint [device.Actions.Program] will be created listing all supported programs as returned by Miele.
**Selecting one of the values will execute the program immediately!**
Currently, only simple programs are supported. E.g. Ovens need some additional information - this will be implemented in a future version.

When publishing the adapter Miele documented a few device categories to support this endpoint and only (at least for me)
a subset of these really work. For my coffee system, washing machine and tumble dryer it only works for the coffee system.
But Miele is working on it and extends the support on a regular basis.
Please refer to the general Miele API documentation (below) for more information.


## Documentation
If you like to get a deeper understanding or need a raw-value translation please refer to [this documentation.](machine_states.md)

## Changelog
 <!--
   Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
 -->
### 6.5.10 (2025-04-03)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Fix: [494](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/494) Fixed some minor issues found by adapter-checker

### 6.5.9 (2025-02-26)
 
- (grizzelbee) Fix: [482](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/482) Fixed broken SSE connection

### 6.5.8 (2025-02-13)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Fixed some minor issues found by adapter-checker
- (grizzelbee) Fix: Added screen size settings in Admin-UI for responsive design
- (grizzelbee) Fix: Fixed sentry MIELECLOUDSERVICE-5V

### 6.5.7 (2024-10-01)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Fixed some minor issues found by adapter-checker
- (grizzelbee) Upd: Added tests for node 22

### 6.5.6 (2024-05-10) (Dying for an Angel)

- (grizzelbee) New: [402](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/402) Added signalDoor to Washing machines, Tumble dryer and Washer dryer
- (grizzelbee) Upd: Dependencies got updated

### 6.5.5 (2024-01-03) (Dying for an Angel)

- (grizzelbee) Upd: Added year 2024 to licence
- (grizzelbee) Upd: Dependencies got updated

### 6.5.4 (2023-05-03) (Dying for an Angel)
* (grizzelbee) New: Added file `.ncurc.json` to prevent axios-oauth-client from being automatically updated by `npx npm-check-updates`

### 6.5.3 (2023-04-26) (Dying for an Angel)
* (grizzelbee) Fix: two minor bug fixes - including a fix that prevents objects from being updated constantly.

### 6.5.2 (2023-04-21) (Dying for an Angel)
* (grizzelbee) Fix: [367](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/367) Fixed "oauth is not a function" error during startup by downgrading axios-oauth-client to v1.5.0

### 6.5.1 (2023-04-21) (Dying for an Angel)
* (grizzelbee) Fix: Some minor fixes for ioBroker adapter checker

### 6.5.0 (2023-04-18) (Dying for an Angel)
* (grizzelbee) New: added device type 74 = Hob with vapour extraction (part of Miele API v1.0.6)
* (grizzelbee) Upd: Updated ReadMe file
* (grizzelbee) Chg: Dependencies got Updated
* (grizzelbee) Chg: Important: Requires at least Node.js 14
* (grizzelbee) Chg: Changed SpinningSpeed from number to string 
* (grizzelbee) New: Added RAW-Value to SpinningSpeed 
* (grizzelbee) Chg: Changed PlateStep-xxx from number to string (related to issue [356](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/356))
* (grizzelbee) New: Added RAW-Value to Platesteps (related to issue [356](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/356))
* (grizzelbee) Fix: [343](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/343) GENERIC_BUSINESS_ERROR occurred when switching ventilationStep
* (grizzelbee) Fix: [356](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/356) In some cases the value 0 (zero) is ignored (e.g. at PlateStep)
* (grizzelbee) Fix: [359](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/359) Fixed "oauth is not a function" error during startup by downgrading axios-oauth-client to v1.5.0

### 6.4.0 (2022-09-07) (Dying for an Angel)
* (grizzelbee) Fix: program names get localized now
* (grizzelbee) New: moved Admin-UI to jsonConfig
* (grizzelbee) Chg: BREAKING CHANGE: removed duplicate en-/decryption of passwords due to jsonConfig
* (grizzelbee) Chg: Moved some documentation from the readme file to machine_states.md

### 0.9.1 (2019-07-26)
* (grizzelbee) Fix: Fixed small bug introduced in V0.9.0 throwing an exception in debugging code

### 0.9.0 (2019-07-26)
* (grizzelbee) Upd: New versioning due to completeness and stability of the adapter (about 90%)
* (grizzelbee) New: make poll interval configurable  (currently 1,2,3,4,5,7,10,15 Minutes)
* (grizzelbee) Fix: fixed ESLint config
* (grizzelbee) Upd: Changed order of config fields in UI
* (grizzelbee) New: Set 5 Minutes poll interval and english response language as default to get initial values
* (grizzelbee) New: Parent-Datapoint of time values will be used to get a pretty readable time in the format h:mm. The deeper datapoints 0 and 1 will still be updated, but his will be removed in a future version to reduce workload.

### 0.0.5 (2019-07-25)
* (grizzelbee) Upd: some code maintenance
* (grizzelbee) New: added reply-language to config
   - Miele API is currently able to reply in German or English, now you can choose.
* (grizzelbee) New: created new Icon
* (grizzelbee) Fix: fixed translation issues and translated adapter UI using gulp
* (grizzelbee) Upd: Made changes to travis requested by apollon77

### 0.0.4
* (hash99) add devices configuration

### 0.0.3
* (hash99) adapter conform

### 0.0.1
* (hash99) initial release

## sentry.io
This adapter uses sentry.io to collect details on crashes and report it automated to the author. The [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry)
plugin is used for it. Please refer to the [plugin homepage](https://github.com/ioBroker/plugin-sentry) for detailed information
on what the plugin does, which information is collected and how to disable it, if you don't like to support the author with
your information on crashes.

## License
The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Copyright
Copyright (c) 2025 grizzelbee <open.source@hingsen.de>
