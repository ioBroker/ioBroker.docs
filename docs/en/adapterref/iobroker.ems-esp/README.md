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
(Bosch / Buderus / Junkers / Netfit etc). 

## The adapter can interface towards the heating system using API calls. Supported gateways are:

* km200, km200 hrv, km100, km50, HMC300 or IP-inside (from Bosch Group) 

* ems-esp gateway (https://github.com/emsesp/EMS-ESP32) with the ESP32 chip. 
  The adapter is tested for the ems-esp gateway with latest stable firmware version
  Latest dev versions of firmware might not work stable with the ioBroker adapter. Use is on own risk.

  PLEASE BE AWARE OF REGULAR CHANGES OF EMS_ESP FIRMWARE - THE ioBROKER ADAPTER MIGHT NOT WORK WITH !!!

* New Bosch-Group Cloud-Gateways (MX300 / EasyControl ...) are not supported since they do not support LAN API !

The ioBroker ems-esp adapter can read and write data to both gateways to control all heating components. 
It can be used either for the original Bosch-Group gateways or the ems-esp or both in parallel.
All changed states from own scripts or the object browser does have to set acknowledged = false !!!


German  documentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

English documentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf

German ioBroker forum: https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen


* New version for ems-esp module: All entity types are now read without being selected by checkboxes:
  temperature- and analogsensor, custom and scheduler entities 

* The adapterversion >= 7.0.0 supports only ems-esp firmware versions >= 7.2.0  
  


## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 7.0.0 (2025-12-09)
* ems-esp: rework of coding --> this adapter version only supports firmware >= 3.7.2 !!!
* ems-esp: All entity types are now read without being selected by checkboxes

### 6.0.5 (2025-12-04)
* ems-esp: reduce read timeout error messages

### 6.0.4 (2025-12-03)
* ems-esp: return to version 6.0.2 for error handling

### 6.0.3 (2025-12-01)
* dependabot updates 
* update error message for ems-esp gateway

### 6.0.2 (2025-11-01)
* increase axios timeout for km200 reads
* dependabot updates
* updating pdf docu in respect to energy statistics for ems-esp gateways
* Migrate to NPM Trusted Publishing

## License
MIT License

Copyright (c) 2025 Thomas Petrick (tp1de)

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
*OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE."
# iobroker.ems-esp
