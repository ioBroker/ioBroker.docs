![Logo](admin/sun2000.png)
# ioBroker.sun2000

[![NPM version](https://img.shields.io/npm/v/iobroker.sun2000.svg)](https://www.npmjs.com/package/iobroker.sun2000)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sun2000.svg)](https://www.npmjs.com/package/iobroker.sun2000)
![Number of Installations](https://iobroker.live/badges/sun2000-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/sun2000-stable.svg)
[![Documentation](https://img.shields.io/badge/Documentation-2D963D?logo=read-the-docs&logoColor=white)](./docs/README.md)

[![NPM](https://nodei.co/npm/iobroker.sun2000.png?downloads=true)](https://nodei.co/npm/iobroker.sun2000/)

**Tests:** ![Test and Release](https://github.com/bolliy/ioBroker.sun2000/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**\
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!\
Sentry reporting is used starting with js-controller 3.0.

## sun2000 adapter for ioBroker

Read register data from Huawei SUN2000 inverter and LUNA2000 battery using Modbus TCP. 

[Huawei product information](https://solar.huawei.com/en/professionals/all-products?residential-smart-pv)

Feel free to follow the discussions in the german [iobroker forum](https://forum.iobroker.net/topic/71768/test-adapter-sun2000-v0-1-x-huawei-wechselrichter)

## Documentation

See the [documentation page](./docs/README.md) or 
browse in the [wiki](https://github.com/bolliy/ioBroker.sun2000/wiki) 

## Supported hardware

* HUAWEI Inverter SUN2000 Serie (M0,M1,M2 and higher) 
* HUAWEI Smart Dongle-WLAN-FE / min. Softwareversion: V100R001C00SPC133 (SDongleA-05)
* HUAWEI Luna2000 Battery
* HUAWEI Smart Power Sensor DTSU666-H or DDSU666-H
* HUAWEI Smart Logger / min. Softwareversion: V300R023C10SPC311

## Feature list

* Maximum 5 inverters (master/slave) can be processed, each with a battery module (max. 15kWh).
* Real-time values such as input power, output power, charging/discharging power and the grid consumption are read out at a fixed interval. 
* States are only written for changed data from the inverter. This relieves the burden on the iobroker instance.
* The states “inputPower” or “activePower” in the “collected” path can be monitored with a “was updated” trigger element. Because these states are always written within the set interval.
* modbus-proxy: Third party device such as wallbox, energy manager etc. can receive data even if the modbus interface of inverter is already in use. In addition you can mirror the sun2000 data to another IoBroker instance.
* Huawei SmartLogger integration: Monitors and manages the PV power system. The adapter saves the collected data in the same way as it does when read out the inverter directly.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.1 (2024-03-11)
* Config page restructured
* read only the required string data
* fix interval medium

### 0.5.0 (2024-03-07)
* Integration of [Huawei SmartLogger](https://support.huawei.com/enterprise/de/doc/EDOC1100130069/d8a00460)
* some meter states the unit was changed (for example sun2000.0.meter.activePowerL1) (#56)
* sun2000 serie M2 or higher can also be processed

### 0.4.1 (2024-03-03)
* read PV string data slower (medium interval)

### 0.4.0 (2024-03-01)
* detect standby mode of inverters (#34)
* devices in standby often give incorrect values. These are assigned "0" (#40)
* the modbus register and the length are stored in the description of the states
* implemented modbus-proxy (read-only cache)
* read register data from SDongleA 
* additional loop interval medium (SDongle data)
* Integration of [NRGkick Wallbox](https://www.nrgkick.com)
* read string data faster (high interval)

### 0.3.1 (2024-02-12)
* state `sun2000.0.collected.chargeDischargePowercharge` is not always refreshed #47

### 0.3.0 (2024-02-10)
* add battery unit information for example temperature #40
* modbus timeout, connect delay and delay can be configured #34
* device status as plain text `sun2000.0.inverter.x.derived.deviceStatus`
* Introduction of a driver model. A separate driver can be created for each device #41

### 0.2.1 (2024-02-02)
* Requirements from [Add sun2000 to latest](https://github.com/ioBroker/ioBroker.repositories/pull/3219)

### 0.2.0 (2024-01-24)
* [Add sun2000 to latest](https://github.com/ioBroker/ioBroker.repositories/pull/3219)
* improve error handling (#34)
* add simple optimizer info 
* Riemann sum of input power with energy loss for new state `dailySolarYield`
* try to recreate the `yield today` from the fusion portal

### 0.1.3 (2024-01-17)
* display the data from PV strings (#27)
* optimize the timing of interval loop
* improved handling of read timeouts from more then 2 inverters

### 0.1.2 (2024-01-12)
* fix: no Data if interval less 20 sec (#24)
* prepare collected values more precisely
* expand up to 5 inverters #18
* fix: problems with multiple inverters

### 0.1.1 (2024-01-07)
* fix some collected values

### 0.1.0 (2024-01-06)
* watchdog implemented #11
* state values are cached - only changed data should be stored 
* derived and collected values for example `inputPowerEffective` or `inputYield`
* deploy more register

### 0.0.2 (2023-12-19)
Dependency and configuration updates

### 0.0.1 
initial release

## License
MIT License

Copyright (c) 2024 bolliy <stephan@mante.info>

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
SOFTWARE.