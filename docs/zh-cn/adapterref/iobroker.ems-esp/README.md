---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: YKqB7RRd9ugIYz7MDYcYZ5kAnNsHEO9kEuP5DXpZozo=
---
![标识](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![安装数量（最新）](https://iobroker.live/badges/ems-esp-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/ems-esp-stable.svg)
![依赖状态](https://img.shields.io/david/tp1de/iobroker.ems-esp.svg)
![国家公共管理](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**测试：** ![测试与发布](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## 带有 km200 / IP-inside 和/或 ems-esp 接口的博世 / 布德鲁斯加热系统
该适配器支持使用 EMS 或 EMS+ 总线连接博世集团的加热系统。
（布德鲁斯/容克斯/Netfit 等）。

## 它可以通过使用 Web-API 调用与加热系统连接：
* km200、km200 hrv、km100、km50、HMC300 或 IP-inside（来自博世集团）

* ems-esp 网关 (https://github.com/emsesp/EMS-ESP32) 具有最新的开发版本（见下文）和 ESP32 芯片。

  不再支持带有 API V2 的旧 ESP8266 网关！

* 不支持新的云网关（MX300 ...）！

ioBroker ems-esp 适配器可以向两个网关读取和写入数据，以控制所有加热组件。
它可以用于原始博世集团网关或 ems-esp 或两者并行使用。

## 所有从自己的脚本或对象浏览器更改的状态都必须设置 recognize = false !!!
该适配器针对具有 ESP32 最新固件版本 (V3.6.0) 的 ems-esp 网关进行了测试

## 能源记录和统计需要一个活动的数据库实例。我强烈建议不要使用 InfluxDB V2！
InfluxDB v2 需要将保留期设置为 > 2 年才能存储历史值。在 V2 中，这是所有状态的全局参数！

## 新：实例概览中显示连接状态
德语文档：https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

英文文档：https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.6.0 (2023-10-30)
* Add indicator for connection status of the gateways within instances overview

### 2.5.3 (2023-10-29)
* Replace axios post by axios put for KM200 gateway to secure that write changes are accepted

### 2.5.2 (2023-10-19)
* Update energy statistics and recordings for history and influxdb
* include warning in log that InfluxDB V2 will not be supported in future versions anymore

### 2.5.1 (2023-10-13)
* correct hourly recordings timestamps for km200 (timezone difference)

### 2.5.0 (2023-10-11)
* avoid duplicates on ems-esp energy statistics
* replace request by axios
* some corrections for ems-esp sensors and custom elements
* move database config to parameter page

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