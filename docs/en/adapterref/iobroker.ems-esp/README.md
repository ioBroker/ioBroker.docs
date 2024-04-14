![Logo](admin/ems-esp.png)
# ioBroker.ems-esp

[![NPM version](https://img.shields.io/npm/v/iobroker.ems-esp.svg)](https://www.npmjs.com/package/iobroker.ems-esp)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)](https://www.npmjs.com/package/iobroker.ems-esp)
![Number of Installations (latest)](https://iobroker.live/badges/ems-esp-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/ems-esp-stable.svg)


[![NPM](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)](https://nodei.co/npm/iobroker.ems-esp/)

**Tests:** ![Test and Release](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Bosch / Buderus heating systems with km200 / IP-inside and/or ems-esp interface 

The adapter supports an interface towards the heating systems from Bosch Group using EMS or EMS+ bus. 
(Buderus / Junkers / Netfit etc). 

## It can interface towards the heating system with use of Web-API calls toward:

* km200, km200 hrv, km100, km50, HMC300 or IP-inside (from Bosch Group) 

* ems-esp gateway (https://github.com/emsesp/EMS-ESP32) with latest dev version (see below) and the ESP32 chip. 
  The old ESP8266 gateways with API V2 are NOT SUPPORTED ANYMORE !!
  The adapter is tested for the ems-esp gateway with latest firmware version (> V3.6.0) of ESP32

* New Bosch-Group Cloud-Gateways (MX300 / EasyControl ...) are not supported since they do not support LAN API !

The ioBroker ems-esp adapter can read and write data to both gateways to control all heating components. 
It can be used either for the original Bosch-Group gateways or the ems-esp or both in parallel.
All changed states from own scripts or the object browser does have to set acknowledged = false !!!


## NEW in Version >= 3.0.0: EMS+ entities (switchPrograms and holidayModes) are implemented for EMS-ESP gateway and if found states are created. 
	The ems-esp gateway firmware does not support switchPrograms and holidayModes for EMS+ thermostats (RC310 / RC300 or similar)
	Enabling this new function will issue raw telegrams toward the ems-esp gateway and then try to read the response.
	Testing is done for switchPrograms A and B for hc1 to hc4, dhw (warm water) and circulation pump (cp) and holidayModes hm1-hm5.
	The found extended entities are stored within instance settings. Therfore once an adapter instance restart will happen.
		
	Then after these found states the raw response is decoded and states are created similar to KM200 gateway API data.
	When the km200 gateway is enabled then this function is disabled to avoid double entries with same name.
	The states created consist of JSON structures, enum values or arrays and are writable - Be carefull with the right content.
	I recommend to test by using the Bosch/Buderus apps to identify the right content - especially for holidayModes.
	Polling is set to every 2 minutes.

## NEW Energy recordings and statistics need an active database instance. 
	Recordings require a InfluxDB adapter version >= 4.0.2 which allows deleting of db-records
	Retition period is now read and recordings are only stored within retention period -- Beta status
	InfluxDB v2 needs the retention period to be set to > 2 years for storing all historic values. 
	In V2 this is a global parameter for all states ! 
	
## NEW: Heat Demand hysteresis improved. 
	Switch heat demand on when actual temp <= settemp - delta
	Switch off when settemp < actual temp
	Do nothing between settemp - delta and settemp
	Make sure that delta is high enough to avoid too many boiler starts.

## NEW: Heat Demand parameters can be changed during active instance
	Heat demand parameters delta / weight for each thermostat can be changed within objects during active instance
	Remark: Updated weight is only used wen a new Heat Demand is found
	Heat demand parameters weighton / weightoff for each heating circuit can be changed within objects during active instance


German  documentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

English documentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf

German ioBroker forum: https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen


## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.1.1 (2024-04-11)
* update dependencies and release  script

### 3.1.0 (2024-04-07)
* Update km200 gateway encryption test for wrong passwords
* avoid json error on adapter start for field /gateway/firmware

### 3.0.5 (2024-04-07)
* avoid json error on adapter start for field /gateway/firmware
* update test-and-release worflow
* update license info

### 3.0.4 (2024-04-07)
* avoid json error on adapter start for field /gateway/firmware

### 3.0.3 (2024-03-09)
* improve km200 data read to avoid errors

## License
MIT License

Copyright (c) 2024 Thomas Petrick <tp1degit@gmail.com>

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
