---
BADGE-Number of Installations: http://iobroker.live/badges/sonnen-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sonnen.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sonnen.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sonnen.png?downloads=true
---
![Logo](admin/sonnen.png)
# ioBroker.sonnen
===========================

![Build Status](https://github.com/foxriver76/ioBroker.sonnen/workflows/Test%20and%20Release/badge.svg)
![Number of Installations](http://iobroker.live/badges/sonnen-installed.svg) ![Number of Installations](http://iobroker.live/badges/sonnen-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.sonnen.svg)](https://www.npmjs.com/package/iobroker.sonnen)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sonnen.svg)](https://www.npmjs.com/package/iobroker.sonnen)


[![NPM](https://nodei.co/npm/iobroker.sonnen.png?downloads=true)](https://nodei.co/npm/iobroker.sonnen/)
## Disclaimer
The developers of this module are in no way endorsed by or affiliated with sonnen GmbH,
or any associated subsidiaries, logos or trademarks.

## Widget
From version 1.8.0 on, the adapter comes with a vis widget. The widget only works with the port 8080 API.
![Widget](/docs/en/media/widgetPreview.png)

## Installation
You can either install the adapter via the ioBroker web interface or on your local machine via npm.

### Browser-based
1. Open your ioBroker web interface in a browser (eg: 192.168.30.70:8081)
2. Click on Tab "Adapters"
3. Type "sonnen" in the filter
4. Click on the three points and then on the "+" symbol of the sonnen adapter<br/>
![Add Adapter](/docs/en/media/addInstance.png)

### Local machine
Navigate into your iobroker folder and execute the following command: 
```bash
npm i iobroker.sonnen
```

## Setup
Additional to the adapter installation you have to add an instance of the adapter.

### ioBroker 
1. Open your ioBroker interface in a browser (eg: 192.168.1.33:8081)
2. Navigate to Tab "Adapters"
3. Click on the three points and then on the "+" symbol of the sonnen adapter
![Add Adapter](/docs/en/media/addInstance.png)
4. Now you can see the main settings of the adapter configuration page --> type in the ip-address of your sonnen battery.
__It is also strongly recommended, to provide an API key, which can be found in the webinterface of your sonnen battery (Tab: Software Integration). Otherwise, the adapter uses the unofficial API.__
![Main Settings](/docs/en/media/mainSettings.png)
5. If you want to change the interval in which the states are polled, click on the tab "Advanced Settings"
6. You can set the poll interval between 2000 ms (2 seconds) and 60000 ms (1 minute), the default value is 7 seconds
![Advanced Settings](/docs/en/media/advancedSettings.png)
7. If you want to avoid requests from your battery to the sonnen server, you can deactivate the online status polling (only relevant for 8080 API - e.g. eco8 and newer)
8. Click on Save & Close

## Usage
Here you can find a description of the states and how to use them. The most states of this adapter are read-only states.
Note, that there are two different sonnen API's so if you are missing states, they are probably not supported.

### States
Note: The old and legacy API states (API port 3480/7979) are currently not or only partially documented

#### Channel: configurations
With API v2 the new channel configurations can be used, for write states you can also change the configuration, like Operating Mode.

#### Channel: info

* info.connection

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-only boolean which is true if the adapter is connected to the battery.*
   
* info.lastSync

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |timestamp|R|

   *Read-only timestamp w. r. t. the last successful synchronization time.*
   
* info.configuration

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|

   *Read-only JSON string, which contains configuration information of your battery.*
   *Only API v1, v2 has the channel `configurations`*

* info.powerMeter

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|

   *Read-only JSON string, which contains power metering information of your battery.*
   
* info.inverter.*

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-only number, which contains inverter information of your battery.*

* info.ios.*

    |Data type|Permission|
    |:---:|:---:|
    |boolean|R|

   *Read-only boolean which contains discrete IO information of your battery.*

#### Channel: status
   
* status.consumption

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-only number, which represents the current consumption of your house in watts.*
   
* status.production

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-only number, which represents the current production of you photovoltaics system in watts.*
   
* status.pacTotal

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-only number, which represents the inverter AC Power in watts. If the value is greater than 0 the battery is discharging, if less than zero it is charging.*
   
* status.relativeSoc

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-only number, which represents the state of charge of your battery in percent.*
   
* status.userSoc

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-only number, which represents the state of charge of your battery in percent.*
   
* status.acFrequency

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-only number, which represents the AC Frequency in hertz.*
   
* status.acVoltage

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-only number, which represents the current AC voltage of your inverter.*
   
* status.batteryVoltage

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-only number, which represents the current DC voltage of the battery.*
   
* status.systemTime

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |date|R|

   *Read-only ISO date, which represents the system time of your battery.*
   
* status.systemInstalled

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-only boolean indicator. True if system is installed otherwise false.*
   
* status.batteryCharging

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-only boolean indicator. True if battery is charging, otherwise false.*
   
* status.flowConsumptionBattery

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-only boolean indicator. True if you are consuming from battery, otherwise false.*
   
* status.flowConsumptionGrid

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-only boolean indicator. True if you are consuming from grid, otherwise false.*
   
* status.flowConsumptionProduction

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-only boolean indicator. True if you are consuming from your current production, otherwise false.*
   
* status.flowGridBattery

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-only boolean indicator. True if grid charges battery, otherwise false.*
   
* status.flowProductionBattery

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-only boolean indicator. True if production charges battery, otherwise false.*
   
* status.flowProductionGrid

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-only boolean indicator. True if production flows into grid, otherwise false.*
   
* status.gridFeedIn

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-only number, which represents the amount of watts consuming from or feeding in grid. If the number is positive you are feeding the grid, if negative you are consuming from grid.*
  
* status.onlineStatus

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-only boolean which is true if your sonnen battery is online.* 

* status.systemStatus

  |Data type|Permission|                                                                       
  |:---:|:---:|
  |string|R|

  *Read-only string, which indicates if the battery is connected to the grid.*

#### Channel: control

* control.charge

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R/W|

   *Number-value which allows you to control the charging rate of the battery in watts. If you set garbage here it will also be acknowledged, because acknowldging just means that the battery received your command.*
    *The corresponding value of the setpoint is kept until the battery receives a new charging or discharging value.
    If VPP is active, the request will be rejected.*
       
   *Example:*
    ```javascript
    setState('sonnen.0.control.charge', 1250); // Do not charge more than 1250 watts
    ```
   
* control.discharge

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R/W|

   *Number-value which allows you to control the discharging rate of the battery in watts. If you set garbage here it will also be acknowledged, because acknowldging just means that the battery received your command.*
   *The corresponding value of the setpoint is kept until the battery receives a new charging or discharging value.
    If VPP is active, the request will be rejected.*
   
   *Example:*
    ```javascript
    setState('sonnen.0.control.discharge', 1250); // Do not discharge more than 1250 watts
    ```
#### Channel: powermeter
This channel has two subchannels, e.g. `4_1` and `4_2` where one represents consumption and the other one production.
E.g. `4_1.kwh_imported` represents the overall production since installation of the battery.
 
The both channels have the identical states. All states are read-only numbers.

### Channel: inverter
The channel consists of read-only states of type `number`, providing information about the inverter of your battery.

### Channel: ios
The channel consists of read-only states of type `boolean`, providing information about the discrete IO states of your battery.

### Channel: configurations
The channel allows reading and writing configuration values of the battery.

### Channel: battery
The channel provides battery specific information like the number of cycle count.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.18.1 (2024-04-14)
* (foxriver76) fixed detection of legacy API

### 1.18.0 (2024-03-18)
* (foxriver76) added new inverter and powermeter states

### 1.17.0 (2023-12-20)
* (foxriver76) sync brightness status of eclipse led
* (foxriver76) fixed issue with eclipse led status (closes #293)

### 1.16.0 (2023-02-02)
* (foxriver76) added state `battery.balanceChargeRequest` (closes #258)

### 1.15.6 (2022-12-18)
* (foxriver76) added two GPIOs for CHP status

### 1.15.5 (2022-12-17)
* (foxriver76) added state list for `configurations.SH_HeaterOperatingMode'`
* (foxriver76) marked some datapoints as read-only and fixed state types

### 1.15.4 (2022-12-16)
* (foxriver76) fixed crash if v2 configurations endpoint is not available (closes #228)

### 1.15.3 (2022-12-14)
* (foxriver76) internal optimizations (Axios port)

### 1.15.2 (2022-12-14)
* (foxriver76) internal optimization (ES6 class)

### 1.15.1 (2022-12-13)
* (foxriver76) added `battery.cyclecount` state (closes #194)

### 1.15.0 (2022-12-13)
* (foxriver76) full port to v2 API (Software Version >= 1.8.7)
* (foxriver76) brings back `ios` and `inverter` endpoints
* (foxriver76) configuration request is now handled by a single call instead of one for each attribute
* (foxriver76) we fixed a lot of state roles

### 1.14.0 (2022-12-02)
* (foxriver76) implemented new state `latestData.dcShutdownReason` (closes #213)

### 1.13.1 (2022-11-24)
* (foxriver76) minor performance optimization
* (foxriver76) `info.lastSync` and `status.systemTime` are now type number
* (foxriver76) implemented silent fail on `ios` endpoint to support both API versions

### 1.13.0 (2022-10-28)
* (foxriver76) added `latestData` endpoint providing eclipse LED status and time since last full charge

### 1.12.3 (2022-10-27)
* (foxriver76) readded widget (closes #189)

### 1.12.2 (2022-10-27)
* (foxriver76) fixed issue with data types of configuration

### 1.12.1 (2022-09-26)
* (foxriver76) we now use the V2 API for the powermeter endpoint
* (foxriver76) we have ported the code to TypeScript
* (foxriver76) added configuration for V2 API, including ability to change it via adapter

### 1.11.0 (2022-06-22)
* (foxriver76) added `status.systemStatus` to indicate if the battery is connected to the grid (closes #139)

### 1.10.0 (2022-04-18)
* (rivengh) added battery discrete io states

### 1.9.8 (2021-09-27)
* (foxriver76) make requesting online status optional for 8080 api (closes #76)

### 1.9.6 (2021-08-03)
* (foxriver76) fix for horizontal flow animations in Safari (broken with 1.9.4)

### 1.9.4 (2021-07-17)
* (foxriver76) widget: make the svg smaller by using a flexbox to center the svg correctly inside the div

### 1.9.3 (2021-07-16)
* (foxriver76) also poll the configuration instead of updating it only once at start (closes #70)

### 1.9.2 (2021-07-16)
* (foxriver76) fix for legacy API

### 1.9.1 (2021-07-16)
* (foxriver76) use legacy API if old API is not completely implemented

### 1.9.0 (2021-07-16)
* (foxriver76) we now also support the legacy API (port 3480)
* (foxriver76) switch from intervals to timeouts to avoid overlapping poll runs

### 1.8.6 (2021-07-04)
* (foxriver76) widget: we removed debug logging and unnecessary template functions
* (foxriver76) widget: we now cache the jquery selectors to improve the performance

### 1.8.5 (2021-07-02)
* (foxriver76) widget: stroke width can now be configured

### 1.8.4 (2021-07-01)
* (foxriver76) widget: we made ID names more adapter specific to avoid getting wrong translations

### 1.8.3 (2021-07-01)
* (foxriver76) widget: we now allow defining the used adapter instance

### 1.8.2 (2021-06-30)
* (foxriver76) widget: css classes now have adapter specific names to avoid conflicts

### 1.8.1 (2021-06-30)
* (foxriver76) widget now has flow directions

### 1.8.0 (2021-06-30)
* (foxriver76) added widget

### 1.7.3 (2021-05-01)
* (foxriver76) we now update objects if attributes are updated, but preserve common.name attribute

### 1.7.2 (2021-04-30)
* (foxriver76) we fixed some type issues (fixes #58)

### 1.7.1 (2021-03-19)
* (foxriver76) do not log warnings on inverter endpoint if battery does not support it (closes #55)

### 1.7.0 (2020-11-12)
* (foxriver76) new channels for powermeter and inverter

### 1.6.1 (2020-11-11)
* (foxriver76) fixed charge and discharge not working with api v2

### 1.6.0 (2020-08-09)
* (foxriver76) added support for official api, automatically used when auth token is given by user

### 1.5.3 (2020-05-18)
* (foxriver76) poll online status always again if not confirmed that there are differences in api (old solution could lead to false negative)
* (foxriver76) more specific error handling

### 1.5.2 (2020-05-16)
* (foxriver76) check if onlineStatus is supported at adapter start - else do not poll it

### 1.5.0 (2020-05-04)
* (foxriver76) added online status indicator

### 1.4.2 (2020-04-16)
* (foxriver76) added more translations
* (foxriver76) optimizations for compact mode

### 1.4.0
* (foxriver76) introducing new states with power metering and inverter information (supported on :8080 API)
* (foxriver76) only minimum support until we know what users need as states

### 1.3.0
* (foxriver76) introducing new state with configuration information (supported on :8080 API)

### 1.2.0
* (foxriver76) support of another sonnen api

### 1.1.2
* (foxriver76) bugfix for control states

### 1.1.1
* (foxriver76) add compact mode compatibility

### 1.0.2
* (foxriver76) use adapter-core module

### 1.0.1
* (foxriver76) take timezone offset into account on time states

### 1.0.0
* (foxriver76) formal version increment

### 0.0.8
* (foxriver76) Enhanced debug logging
* (foxriver76) Prevent crashing when a return code is received

### 0.0.7
* (foxriver76) Only set info.connection on change

### 0.0.6
* (foxriver76) Only set states if request was successfull --> prevents adapter crash

### 0.0.5
* (foxriver76) translations on index_m.html
* (foxriver76) use 7000 as interval if poll interval is undefined

### 0.0.3
* (foxriver76) fixed links to bugs, repo etc

### 0.0.2
* (foxriver76) bugfixes on control states
* (foxriver76) big readme update
* (foxriver76) addded more states
* (foxriver76) added advanced settings

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2024 Moritz Heusinger <moritz.heusinger@gmail.com>

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