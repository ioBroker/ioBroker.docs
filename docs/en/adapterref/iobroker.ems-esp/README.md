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

* ems-esp interface (https://github.com/emsesp/EMS-ESP32) with latest dev version (see below) and the ESP32 chip. 
  The old ESP8266 gateways with API V2 is NOT SUPPORTED ANYMORE !!

The ems-esp adapter can read and write data to both gateways to steer all heating components. 
It can be used either for the original Bosch-group gateways or the ems-esp or both in parallel.
All changed states from own scripts or the object browser does have to set acknowledged = false !!!

The adapter is tested for the ems-esp gateway with latest firmware versions of ESP32 >= v3.5.1. 


## important settings in EMS-ESP:

* Formatting Options for Boolean Format has to be 1/0 and for Enum Format Value / Number. 
* The Enable API write commands settings within ems-esp has to be enabled 
* Bypass Access Token authorization on API calls has to be set or the token has to be entered.

While selecting the checkbox either km200-like device structure is used for ems-esp datafields or the original EMS-ESP device view is kept: boiler, thermostat, mixer etc. When using the km200 gateway in parallel it is recommended to use the km200 data structure. Then all entities / states are within same location within ioBroker's object structure.

## polling

This adapter reads after start values from ems-esp and km200 by http get requests and is capable to subscribe on state changes and send the respective http (post) commands back to either ems-esp hardware or the km200 gateway. 

* EMS-ESP read polling is a parameter (standard 60 secs) and can not be set below 15 seconds.
* KM200 polling is a parameter (standard 300 secs) too and minimum value which can be set is 90 seconds.
* km200 recordings (energy consumption and temperature statistics) are updated every hour
 
## km200 

The web-api calls toward/from the km200 gateway is encrypted. For the en-/decryption there are two passords needed:

* the gateway password on an label on the gateway in the form: xxxx-xxxx-xxxx-xxxx (case sensitive)
* the private password set by using the Buderus **MyDevice** App (do not use myBuderus / EasyCom or similar cloud based apps !) 

The fields to be used for the bosch gateway could also be defined by polling the km200-structure (*) or the respective csv-file within the adapter instance parameters. 
For 1st adapter start it is recommended to use a "*" to select all km200 data-fields.
The adapter then creates a km200.csv file within ../iobroker-data/ems-esp/{instance} directory.

This file can be used for next start of adapter-instance.
Not needed lines (fields) can be deleted to reduce the number of km200-fields to be read. (Make a copy & rename the file) 

## km200 recordings (energy and temperature statistics)

Most modern heating systems have an ip-inside gateway and support energy statistics:

* recording for power consumptions and temperature statistics
* For these systems and where this recordings data is available the respective statistics are polled and stored in states. 
Available are hourly, dayly and monthly statistics and stored as array data in states and if an db-instance is selected as well in states filled with db-entries.(statenames start with "_")
* The checkbox recordings has to be enabled and the database instance (mySQL or InfluxDB) has to be defined. SQL or InfluxDB History adapter need to be installed and active to use this option.
* the original recording data read by web-api calls are stored under statestructure km200.
* DB-statistics to be shown in flot graphs or grafana are only available yet for mySQL and InfluxDB databases.
* For InfluxDB V1 the retention policy has to be set to a minimum of 170 weeks. (alter retention policy global on iobroker duration 170w;)
* For InfluxDB V2 the global retention policy is set by the influxdb adapter - please set within influxdb adapter the storage retention time to "no automatic deletion" !

This adapter then creates the respective recording states, enables sql statistics and writes historic database entries using sql commands and is updating the recordings. Update frequency is every hour. 

IMPORTANT: PLEASE DON'T BE IRRITATED IF THE RESPECTIVE STATES VALUES SHOW NULL() VALUES. 
IN SOME CASES THE VALUES ARE NOT SHOWN CORRECTLY WITHIN THE ADMIN OBJECT BROWSER - PLEASE USE FLOT OR GRAFANA TO DISPLAY !!!

## km200 recordings - an explanation

Some field-values are set as "recordable". These fields will then have "recordings".
Depending on the type of heating system these recordings are stored under  recordings/... or energyMonitoring/...

For recorded states every minute a sample is collected within the km200 gateway. 
An hourly value should have 60 samples, a daily 24*60=1440 samples, a monthly 1440 x #days. 
Every timeperiod has to be read within the adapter by 3 api-calls:

* Hourly values: today, yesterday, day before yesterday
* Daily values: actual month, last months, month -2
* Monthly values: actual year, last year, year -2

Within the read data-field by web-api the sum of sample-values is stored within y-value, no of samples within c-value.
(see original values within json-data in km200... fields.)

Since sometimes samples are missing the energy values can be interpolated. Interpolation is configurable (on/off).
For some months (> 12 months ago) some data might be missing. (Bosch errors within code?)

For the actual months energy consumption the adapter calculates the sum of daily values and uses this sum to get more accurate data.


## statistics

Boiler statistics can be enabled showing:
* The polling cycle processing time for ems-esp and/or km200 gateway reads and state processing 
* The number of boiler & ww starts per hour / 24 hours 
* Boiler utilization per hour (0-100%).
* An active database instance (see above) is needed to calculate the statistics.

## boiler efficiency 

Boiler efficiency can be calculated if parameters are filled. (Gas- and Oilboilers only)

* The boiler efficiency can be calculated based on average boiler temp: (boiler temp + return temp) / 2.
* When return temp is not available in km200/ems-esp the efficiency caclulation does not make sense - please disable to avoid errors 
* Look at the datasheet of your boiler to adjust the efficiency table accordingly. 
* On some heating systems this function produces errors - please switch off !!!
* changed logic with release >= v1.30.0

## changes in state-structure

Whenever a new EMS-ESP firmware adds new datafields and/or changes datafield names they are processed during adapter run. Nevertheless obsolete datafields are not deleted automatically by the adapter. 
There is an option to re-build the state-structure by deleting states on adapter re-start (states with history / db entries are kept)

## heatdemand control 

Explanation to heat demand calculation and configuration. Available in German language only:
https://github.com/tp1de/ioBroker.ems-esp/wiki



## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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
