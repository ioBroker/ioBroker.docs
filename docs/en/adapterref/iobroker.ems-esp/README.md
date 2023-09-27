![Logo](admin/ems-esp.png)
# ioBroker.ems-esp

[![NPM version](https://img.shields.io/npm/v/iobroker.ems-esp.svg)](https://www.npmjs.com/package/iobroker.ems-esp)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)](https://www.npmjs.com/package/iobroker.ems-esp)
![Number of Installations (latest)](https://iobroker.live/badges/ems-esp-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/ems-esp-stable.svg)
[![Dependency Status](https://img.shields.io/david/tp1de/iobroker.ems-esp.svg)](https://david-dm.org/tp1de/iobroker.ems-esp)

[![NPM](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)](https://nodei.co/npm/iobroker.ems-esp/)

**Tests:** ![Test and Release](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Bosch / Buderus heating systems with km200 / IP-inside and/or ems-esp interface 

The adapter supports an interface towards the heating systems from Bosch Group using EMS or EMS+ bus. 
(Buderus / Junkers / Netfit etc). 

## It can interface towards the heating system with use of Web-API calls toward:

* km200, km200 hrv, km100, km50, HMC300 or IP-inside (from Bosch Group) 

* ems-esp gateway (https://github.com/emsesp/EMS-ESP32) with latest dev version (see below) and the ESP32 chip. 
  The old ESP8266 gateways with API V2 is NOT SUPPORTED ANYMORE !!

* New Cloud-Gateways (MX300 ...) are not supported !

The ioBroker ems-esp adapter can read and write data to both gateways to control all heating components. 
It can be used either for the original Bosch-group gateways or the ems-esp or both in parallel.

## All changed states from own scripts or the object browser does have to set acknowledged = false !!!

The adapter is tested for the ems-esp gateway with latest firmware version (V3.6.0) of ESP32  

German  documentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

English documentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf




## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* replace request by axios
* some corrections for ems-esp sensors and custom elements

### 2.4.1 (2023-09-10)
* add parameter to read ems-esp custom elments

### 2.4.0 (2023-09-03)
* integrate custom entities for ems-esp gateway
* rework async functions

### 2.3.3 (2023-08-28)
* error correction mySQL too many connections
* read database name from db-instance settings

### 2.3.2 (2023-08-27)
* optimize SQL access for energy statistics

### 2.3.1 (2023-08-27)
* avoid sql errors within energy statistics for mySQL

### 2.3.0 (2023-08-26)
* New function: ems-esp gateway energy statistics (consumption)
* change sorting order of enegry statistics & recordings in array from new to old

### 2.2.1 (2023-08-20)
* trim km200 passwords
* require node version >= 16
* update dependencies

### 2.2.0 (2023-08-09)
* enable history adapter for recordings and statistics
* update km200 states for valid range of min/max 
* avoid warnings from v2.1 related to min/max in combination with km200 state-list
* update dependencies

### 2.1.0 (2023-07-30)
* ems-esp V3.6 release preparation
* error corrections for ems-esp state changes

### 2.0.3 (2023-07-25)
* error corrections for km200 read

### 2.0.2 (2023-07-24)
* re-add parameters for room / function
* change statistics update intervall for number of starts to every 5 minutes

### 2.0.1 (2023-07-24)
* without parameters for enum attributes
* Error correction on v2.0.0 for ems-esp datanames and structure

### 2.0.0 (2023-07-23)
* DO NOT USE - DOES NOT WORK correctly !!
* support for ems-esp version 3.6
* message about ems-esp adapter version to use for old gateway v2 users
* rework statistics to avoid slowing down admin adapter
* some minor improvements

### 1.34.0 (2023-07-21)
* avoid warnings on statistics processing for new installations without historic data yet
* allow statistics for polling-time for both gateways without active database
* allow old "dallas" prefix instead of "temperaturesensors"

### 1.33.0 (2023-07-20)
* Rework adapter instance config: Split EMS-ESP and KM200 config pages
* parameters stay the same

### 1.32.0 (2023-07-19)
* ems-esp v3.6 adjustments for dallas/temperaturesensors (not tested yet)
* update dependencies 
* improve processing off errors on statistics
* Small adjustments on parameter screen

### 1.31.0 (2023-07-08)
* correction on JSON errors for ems-esp gateway entities (heatpump)

### 1.30.0 (2023-04-12)
* update efficience calculation to support external sensor for return temperature
* when 3 state fields are empty then standard fields are used.
* when state field(s) are filled, than this state(s) are used - e.g. own sensor for return temp
* coorect error processing when no ems-esp devices found

### 1.29.0 (2023-03-08)
* update dependencies

### 1.28.0 (2023-03-08)
* update dependencies

### 1.27.0 (2023-03-08)
* update dependencies

### 1.26.0 (2023-02-27)
* error corrections due to changes since v1.21

### 1.25.0 (2023-02-26)
* set acknowledge to true when re-reading changed values from ems-esp

### 1.24.0 (2023-02-26)
* error corrections for version 1.22 and 1.23

### 1.23.0 (2023-02-26)
* correct ww states from v1.22

### 1.22.0 (2023-02-17)
* support multiple mixer devices

### 1.21.0 (2023-01-02)
* am200 from ems-esp adjustments to changed structure

### 1.20.0 (2022-12-29)
* am200 from ems-esp - redefine to heatSources/hsa for km200 structure mode

### 1.19.0 (2022-12-29)
* am200 - alternative heatsource adjustments

### 1.18.0 (2022-12-24)
* Statistics
* alternative heat souces (am200)

### 1.17.1 (2022-12-04)
* correct actualweight statistics within heatdemand function

### 1.17.0 (2022-12-02)
* add actual weight per thermostat in heatdemand object structure
* add heatdemand difference values

### 1.16.2 (2022-11-21)
* adjustments for ems-esp sensors v3.5

### 1.16.1 (2022-11-20)
* error correction sensors

### 1.16.0 (2022-11-20)
* ems-esp V2 NOT SUPPORTED ANYMORE !!!!
* pepare for enum as values and not just index
* new parameters for "Room" and "Function" for adapter states
* adjust for latest ems-esp dev version 3.5 
* units of measument for ems-esp sensors
* support name changes within ems-esp for sensors

### 1.15.0 (2022-06-06)
* adjustments for ems-esp RC310 holiday modes

### 1.14.0 (2022-05-18)
* split parameters for dallas & analog sensors
* improve warning messages if sensors are missing

### 1.13.0 (2022-05-17)
* add visibility attributes within ems-esp states
* error processing dallas / analog sensors of ems-esp

### 1.12.1 (2022-05-16)
* corrections for heatdemand function
* enable expert view
* vis views for syslog analysis in expert views

### 1.12.0 (2022-05-15)
* add analog sensors for ems-esp gateway, remove ems-esp settings

### 1.11.2 (2022-04-27)
* code optimization and error processing for ems-esp gateway

### 1.11.1 (2022-04-25)
* error corrections on invalid heatdemand states

### 1.11.0 (2022-04-24)
* corrections on hourly recordings for temperature
* make interpolation (missing of c-counts) in energy recordings configurable (on/off)
* error corrections on heatdemand with empty data

### 1.10.0 (2022-04-23)
* add heatdemand customization & calculation with automatic switch (on/off) per heating circuit 
* error corrections on efficiency calculation - make fields used configurable
* some other error corrections

### 1.9.0 (2022-04-18)
* beta test new version (github only)
* add heatdemand customization & calculation with automatic switch (on/off) per heating circuit

### 1.4.0 (2022-03-16)
* recordings new logic and now working without database instance as well

### 1.3.3 (2022-02-26)
* avoid null values in recordings

### 1.3.2 (2022-02-25)
* correction for recordings without reference object
* corrections for mySQL recordings

### 1.3.1 (2022-02-24)
* correction on temperature recordings (months and days)

### 1.3.0 (2022-02-23)
* new logic and state-structure for km200 recordings
* recordings stored in states [array of values] and within database
* please adjust adapter configuration
* support of Buderus heatpump with Logamatic HMC300 IP-Inside

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

## License
MIT License

Copyright (c) 2023 Thomas Petrick <tp1degit@gmail.com>

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
# iobroker.ems-esp
