---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: r4Xvby0it7js6RYm5F4gfMQb8Ffqie79977L1g6vXSc=
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

## 新能源记录和统计需要一个活动的数据库实例。
记录需要 InfluxDB 适配器版本 >= 4.0.2，允许删除数据库记录 现在可以读取保留期，记录仅在保留期内存储 - Beta 状态 InfluxDB v2 需要将保留期设置为 > 2 年才能存储所有历史价值。
在 V2 中，这是所有状态的全局参数！

## 新：热需求滞后得到改善。
当实际温度低于（目标温度 - 增量）时，每个恒温器的热需求处于活动状态。
当实际温度高于目标温度时，热需求无效。
确保增量足够高以避免锅炉启动过多。

## 新：热需求参数可以在活动实例期间更改
在活动实例期间，可以在对象内更改每个恒温器的热需求参数 delta/权重 在活动实例期间，可以在对象内更改每个加热电路的热需求参数weighton/weightoff

德语文档：https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

英文文档：https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* influxdb adapter version >= 4.0.2 required 
* store km200 recordings only within defined retention period for influxdb
* delay start of statistics by 5 minutes

### 2.7.5 (2024-02-02)
* allow only positive deltam in config for heat demand function

### 2.7.4 (2024-02-01)
* avoid sql errors on instance start

### 2.7.3 (2024-01-31)
* error correction for heat demand function

### 2.7.2 (2024-01-31)
* error correction for heat demand function

### 2.7.1 (2024-01-30)
* improve error processing for wrongly defined heat demand states

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