![Logo](admin/fronius.png)

# ioBroker.fronius

![GitHub license](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.fronius)](https://github.com/iobroker-community-adapters/ioBroker.fronius/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fronius.svg)](https://www.npmjs.com/package/iobroker.fronius)
![GitHub repo size](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.fronius)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/fronius/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.fronius)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.fronius/latest)
![GitHub last commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.fronius)
![GitHub issues](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.fronius)
</br>
**Version:** </br>
[![NPM version](http://img.shields.io/npm/v/iobroker.fronius.svg)](https://www.npmjs.com/package/iobroker.fronius)
![Current version in stable repository](https://iobroker.live/badges/fronius-stable.svg)
![Number of Installations](https://iobroker.live/badges/fronius-installed.svg)
</br>
**Tests:** </br>
[![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/test-and-release.yml)
[![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/codeql.yml)

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## A Fronius inverter adapter for ioBroker

This is an ioBroker adapter for your Fronius PV inverter with Fronius Datalogger Web from version 2.0.4-1 onwards, Fronius Datamanager from version 3.0.3-1 onwards and Symo Gen24.

## Installation

For installation no special setup is needed. Just install the Adapter and start the instance. Then go to the Adapter configuration. In the configuration section enter the IP Address or URL for your Inverter. Then you need to press the "check IP" button. This is needed to trigger a check and reading the system configuration. This system configuration is needed to control the API calls later on.

Note for upgrade from V1 to V2 of the adapter. Please refer to [DatastructureMapping_V1.3-V2.0.pdf](doc/DatastructureMapping_V1.3-V2.0.pdf). It is recommended to check the above document carefully and delete the no longer available or moved states manually.

## Request additional parameters

If you like to have an additional parameter or API call, then please provide in a ticket the call you have executed, a file with the JSON response to that call so this can be added to the System and also to the test environment. In any case please provide the system information from this call http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System so that the system setup is clear.

## Report issues

If you find any issue, please report it on [Github](https://github.com/iobroker-community-adapters/ioBroker.fronius/issues) with the following information

-   Adapter Version installed
-   Detailled log (Log level Debug or Silly) of the current behaviour
-   Detailled description about the issue
-   If usefull the system information from http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System (Adjustment of the IP-Adress is needed)

## Executed API calls

The following request are sent to the API. But the availlable datapoints strongly depends on the specific device on the Bus. Therefore if a datapoint is missing, please check first if the API delivers this information. The IP address and the DeviceId parameter must be adjusted to your own setup.

### General system information

-   http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System

### Inverter data

-   http://192.168.0.1/solar_api/v1/GetInverterInfo.cgi
-   http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=3PInverterData
-   http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CommonInverterData
-   http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxInverterData
-   http://192.168.0.1/solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=02.06.2023&EndDate=02.06.2023&Channel=Current_DC_String_1&Channel=Current_DC_String_2&Channel=Temperature_Powerstage&Channel=Voltage_DC_String_1&Channel=Voltage_DC_String_2

### Ohmpilot data

-   http://192.168.0.1/solar_api/v1/GetOhmPilotRealtimeData.cgi?Scope=System

### Storage data

-   http://192.168.0.1/solar_api/v1/GetStorageRealtimeData.cgi?Scope=Device&DeviceId=0

### Smartmeter data

-   http://192.168.0.1/solar_api/v1/GetMeterRealtimeData.cgi?Scope=Device&DeviceId=0

### Sensorcard data

-   http://192.168.0.1/solar_api/v1/GetSensorRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=NowSensorData
-   http://192.168.0.1/solar_api/v1/GetSensorRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxSensorData

### String data

-   http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=NowStringControlData
-   http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=LastErrorStringControlData
-   http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Day
-   http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Year
-   http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Total

### Powerflow data (Inverter/Site)

-   http://192.168.0.1/solar_api/v1/GetPowerFlowRealtimeData.fcgi

### Site data

-   http://192.168.0.1/solar_api/v1/GetLoggerInfo.cgi

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.1 (2024-07-24)
* (nkleber78) Better handling of empty objects [#374]
* (mcm1957) Some issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated.

### 2.1.0 (2024-04-29)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.0.2 (2023-06-28)
-   (nkleber78) Instability issues fixed. (#306, #313)
-   (nkleber78) Set values for parameters delivered as 'null' from API to 0. (#315)

### 2.0.1 (2023-06-04)

-   (mcm1957) Deploy mechanism at github has been reactivated.

### 2.0.0 (2023-06-04)

-   (nkleber78) Several errors resulting in missing data have been fixed. (#152, #242, #175)
-   (nkleber78) Several errors due to missing objects have been solved. (#206, #129, #76)
-   (nkleber78) The usage of the ping utility has been removed. (#169)
-   (nkleber78) Reading of mpp values has been added. (#78)
-   (nkleber78) 'Request' module has been replaced by 'axios'.
-   (nkleber78) Fixed changes related to GEN24 API update for latest FW incl. object creation for storage objects
-   (nkleber78) Fixed issue #97, Added some new predefined objects
-   (nkleber78) Added Inverter Temperature readout (#86)
-   (mcm1957) Dependencies and toolset have been updated.

## License

The MIT License (MIT)

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 ldittmar <iobroker@lmdsoft.de>

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
