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

## The adapter can interface towards the heating system using API calls. Supported gateways are:

* km200, km200 hrv, km100, km50, HMC300 or IP-inside (from Bosch Group) 

* ems-esp gateway (https://github.com/emsesp/EMS-ESP32) with the ESP32 chip. 
  The old ESP8266 gateways with API V2 are not supported anymore !!
  The adapter is tested for the ems-esp gateway with latest stable firmware version (V3.6.5)
  Latest dev versions of firmware might not work stable with the ioBroker adapter. Use is on own risk.

* New Bosch-Group Cloud-Gateways (MX300 / EasyControl ...) are not supported since they do not support LAN API !

The ioBroker ems-esp adapter can read and write data to both gateways to control all heating components. 
It can be used either for the original Bosch-Group gateways or the ems-esp or both in parallel.
All changed states from own scripts or the object browser does have to set acknowledged = false !!!


German  documentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf
English documentation: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf
German ioBroker forum: https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen


## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 4.9.1 (2024-10-01)
* update dependencies
* update translations

### 4.9.0 (2024-09-26)
* ems-esp: improve reading for temperatureSensors
* support small screens
* update dependencies
* update translations

### 4.8.0 (2024-08-27)
* ems-esp: disabled parameter to search for extended EMS+ entities due to memory limitations in gateway

### 4.7.2 (2024-08-17)
* ems-esp: enable writing on custom entities

### 4.7.1 (2024-08-17)
* ems-esp: custom entities are now under object structure "custom"

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
*OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE."
# iobroker.ems-esp
