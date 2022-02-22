![Logo](admin/ems-esp.png)
# ioBroker.ems-esp

[![NPM version](https://img.shields.io/npm/v/iobroker.ems-esp.svg)](https://www.npmjs.com/package/iobroker.ems-esp)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)](https://www.npmjs.com/package/iobroker.ems-esp)
![Number of Installations (latest)](https://iobroker.live/badges/ems-esp-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/ems-esp-stable.svg)
[![Dependency Status](https://img.shields.io/david/tp1de/iobroker.ems-esp.svg)](https://david-dm.org/tp1de/iobroker.ems-esp)

[![NPM](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)](https://nodei.co/npm/iobroker.ems-esp/)

**Tests:** ![Test and Release](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## ems-esp and km200 / IP-inside adapter 

The adapter supports an interface towards the heating systems from Bosch Group using EMS or EMS+ bus. 
(Buderus / Junkers /Netfit etc). 

It can interface towards the heating system with use of Web-API calls toward:
* km200, km200 hrv, km100, km50 or IP-inside (from Bosch Group) 
* ems-esp interface (https://github.com/emsesp/EMS-ESP32) with latest dev version (see below) and the ESP32 chip. 
* The old ESP8266 gateways with API V2 are supported until this version as well.

The ems-esp adapter can read and write data to the ems-bus steering all heating components. 
It can be used either for the original Bosch-group gateways or the ems-esp or both in parallel.

The adapter is tested for the ems-esp gateway with latest firmware versions of ESP32 >= v3.3.1. 
Old systems with an ESP 8266 are only supported until this adapter version.

IMPORTANT SETTINGS in EMS-ESP:

* API V2: MQTT Settings have to be boolean format 1/0 !
* API V3: Formatting Options for Boolean Format has to be 1/0 and for Enum Format Number 
* The Enable API write commands settings within ems-esp has to be enabled 
* Bypass Access Token authorization on API calls has to be set or the token has to be entered.

While selecting the checkbox either km200-like device structure is used for ems-esp datafields or the original EMS-ESP device view is kept: boiler, thermostat, mixer etc. When using the km200 gateway in parallel it is recommended to use the km200 data structure. Then all entities / states are within same location within ioBroker's object structure.

Unlike the km200 adapter the fields to be used could be defined by the respective csv-file within the adapter instance parameters. For 1st adapter start it is recommended to use a "*" so select all km200 data-fields. The adapter then creates a km200.csv file within ../iobroker-data/ems-esp/{instance} directory. This file can be used for next start of adapter-instance.Not needed lines (fields) can be deleted to reduce the number of km200-fields to be read. (Make a copy)  

This adapter reads after start values from ems-esp and km200 by http get requests and is capable to subscribe on state changes and send the respective http (post) commands back to either ems-esp hardware or the km200 gateway. 

* EMS-ESP read polling is a parameter (standard 60 secs) and can not be set below 15 seconds.
* KM200 polling is a parameter (standard 300 secs) too and minimum value which can be set is 90 seconds.
 
Most modern heating systems have an ip-inside gateway and support energy statistics:
* recording for total power consumption and warm water (dhw)
* For these systems and where this data is available the powerconsumption statistics for total and warm water power consumption can be read (hourly / dayly / monthly).
* The checkbox recordings has to be enabled and the database instance (mySQL or InfluxDB) has to be defined. 
SQL or InfluxDB History adapter need to be installed and active to use this option.
* This is only tested yet for mySQL and InfluxDB databases
* For InfluxDB < V2 the retention policy has to be set to a minimum of 170 weeks. 
* (alter retention policy global on iobroker duration 170w;)

This adapter then creates the respective recording states, enables sql statistics and writes historic database entries using sql commands and is updating the recordings. Update frequency is every hour. The values can then be shown by using charting tools e.g. the Flot Charts adapter or Grafana.

Boiler statistics can be enabled showing:
* The polling cycle processing time for ems-esp and/or km200 gateway reads and state processing 
* The number of boiler & ww starts per hour / 24 hours 
* Boiler utilization per hour (0-100%).

Boiler efficiency can be calculated if parameters are filled.
* The boiler efficiency can be calculated based on average boiler temp: (boiler temp + return temp) / 2.
* Since return temp is not available anymore in km200 the return temp is calculated with boilertemp -10 °C when no ems-esp is available. 
* Look at the datasheet of your boiler to adjust the efficiency table accordingly. 
* A database instance (see above) is needed to calculate the statistics.

Whenever a new EMS-ESP firmware adds new datafields and/or changes datafield names they are processed during adapter run. Nevertheless obsolete datafields are not deleted automatically by the adapter. 
There is an option to re-build the state-structure by deleting states on adapter re-start (states with history / db entries are kept)


## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* new logic and state-structure for km200 recordings
* support Buderus heatpump with Logamatic HMC300 IP-Inside

### 1.2.1 (2022-02-18)
* adjust for js-controller v4 - part 2
* private password encryption by admin instead of own code (if necessary please re-enter pw)

### 1.2.0 (2022-02-18)
* Adjust for js-controller v4 - part 1
* private password encryption by admin instead of own code (if necessary please re-enter pw)

### 1.1.1 (2022-02-11)
* Improve tests on km200 ip-address and passwords

### 1.1.0 (2022-02-07)
* last tested version for old ems-esp ESP8266 with API V2.
* support for KM200 HRV (ventilation)
* corrections for km200 recordings and statistics module
* prepare for ems-esp firmware 3.4

### 1.0.14 (2022-02-07)
* adjust paths in io-package.json

### 1.0.13 (2022-02-07)
* last tested version for old ems-esp ESP8266 with API V2.
* No support for future adapter versions anymore - please upgrade to ESP32.
* support for KM200 HRV (ventilation)
* corrections for km200 recordings and statistics module
* prepare for ems-esp firmware 3.4

### 1.0.12 (2022-02-06)
* update statistics states

### 1.0.11 (2022-02-01)
* support for KM200 HRV (ventilation)
* corrections on recordings for 1st day of month

### 1.0.10 (2022-01-28)
* Further adjustments for ems firmware 3.4 and error corrections 1.0.9

### 1.0.9 (2022-01-27)
* New code to avoid mysql duplicate key errors
* Further adjustments for ems firmware 3.4

### 1.0.8 (2022-01-24)
* Adjustments for ems-esp firmware 3.4 part 2

### 1.0.7 (2022-01-24)
* Adjustments for ems-esp firmware 3.4

### 1.0.6 (2022-01-21) 
* Adjustments for non-UTF-8 json data from ems-esp
* Recalculate km200 recordings based on actual no of samples vs. theroretical max. samples

### 1.0.5
* first stable version for ioBroker repository

### 1.0.4
* Prepare for ioBroker repository

### 1.0.3
* Corrections within statistics module

### 1.0.2
* Corrections on km200 energy consumptions

### 1.0.1 
* prepare for compact-mode, re-write code

### 0.9.8 and 0.9.9
* Supporting Dallas Sensors on ems-esp gateway

### 0.9.7
* Fixes for IP-adresses

### 0.9.6
* Corrections for writing switchpoints and array-data back to km200

### 0.9.5
* Corrections for different enum-formats in API V3 (text and numbers)

### 0.9.4
* Support for old ESP8266 EMS-ESP gateways and API V2 and new ESP32 with API V3

### 0.9.3
* Polling time for EMS-ESP and KM200 is now a parameter

### 0.9.2
* Adjust for enum formats

### 0.9.1
* Adjust for different boolean formats

### 0.9.0
* Rework Adapter for some statistics and prepare for heating control (under development)

### 0.8.0
* REST API V3 and js-controller v3.3.x and support of influxdb for recordings

## License
MIT License

Copyright (c) 2022 Thomas Petrick <tp1degit@gmail.com>

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
SOFTWARE."
# iobroker.ems-esp"
