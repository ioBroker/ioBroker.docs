---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: XF2+hzQprkPB7OkEUB7SQOH3vJ57Zhk0PRtGLVgy1As=
---
![标识](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![安装数量（最新）](https://iobroker.live/badges/ems-esp-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/ems-esp-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**测试：** ![测试与发布](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## 带有 km200 / IP-inside 和/或 ems-esp 接口的博世 / 布德鲁斯加热系统
该适配器支持使用 EMS 或 EMS+ 总线连接博世集团的加热系统。
（布德鲁斯/容克斯/Netfit 等）。

## 它可以通过使用 Web-API 调用与加热系统连接：
* km200、km200 hrv、km100、km50、HMC300 或 IP-inside（来自博世集团）

* ems-esp 网关 (https://github.com/emsesp/EMS-ESP32) 具有最新的开发版本（见下文）和 ESP32 芯片。

不再支持带有 API V2 的旧 ESP8266 网关！该适配器针对具有 ESP32 最新固件版本 (> V3.6.0) 的 ems-esp 网关进行了测试

* 不支持新的博世集团云网关（MX300 / EasyControl ...），因为它们不支持 LAN API！

ioBroker ems-esp 适配器可以向两个网关读取和写入数据，以控制所有加热组件。
它可以用于原始博世集团网关或 ems-esp 或两者并行使用。
所有从自己的脚本或对象浏览器更改的状态都必须设置 recognize = false !!!

## 版本 >= 3.0.0 中的新功能：为 EMS-ESP 网关实现 EMS+ 实体（switchPrograms 和 HolidayModes），并且如果找到状态则创建。
ems-esp 网关固件不支持 EMS+ 恒温器（RC310 / RC300 或类似）的 switchPrograms 和 HolidayModes 启用此新功能将向 ems-esp 网关发出原始电报，然后尝试读取响应。
对 hc1 至 hc4、dhw（温水）和循环泵（cp）以及假日模式 hm1-hm5 的 switchProgram A 和 B 进行测试。
找到的扩展实体存储在实例设置中。因此，一旦适配器实例重新启动就会发生。

然后，在找到这些状态之后，对原始响应进行解码并创建类似于 KM200 网关 API 数据的状态。
当 km200 网关启用时，此功能被禁用，以避免重复输入相同名称。
创建的状态由 JSON 结构、枚举值或数组组成，并且是可写的 - 请注意正确的内容。
我建议使用博世/布德鲁斯应用程序进行测试，以确定正确的内容 - 尤其是假期模式。
轮询设置为每 2 分钟一次。

## 新能源记录和统计需要一个活动的数据库实例。
记录需要 InfluxDB 适配器版本 >= 4.0.2，允许删除数据库记录 现在可以读取保留期，记录仅在保留期内存储 - Beta 状态 InfluxDB v2 需要将保留期设置为 > 2 年才能存储所有历史价值。
在 V2 中，这是所有状态的全局参数！

## 新：热需求滞后得到改善。
当实际温度 <= settemp - delta 时打开热需求 当 settemp < 实际温度时关闭 在 settemp - delta 和 settemp 之间不执行任何操作 确保 delta 足够高以避免锅炉启动过多。

## 新：热需求参数可以在活动实例期间更改
在活动实例期间，可以在对象内更改每个恒温器的热需求参数 delta/权重 备注：仅在找到新的热需求时才使用更新的权重 在活动实例期间，可以在对象内更改每个加热电路的热需求参数weighton/weightoff

德语文档：https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

英文文档：https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf

德国ioBroker论坛：https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.0.0 (2024-02-17)
* Node >= 18 required
* update heatdemand weight changes to be effective during active instance
* ems-esp gateway: Raw telegram search for EMS+ thermostats: switchPrograms and holidayModes (RC310/RC300)
* create writable objects / states for switchPrograms and holidayModes
* this function is only active when no km200 gateway is selected - ems-esp gateway only
* improve error messages for km200 (wrong ip / passwords)
* small changes within PDF adapter documentation

### 3.0.0-alpha.2 (2024-02-16)
* Node >= 18 required
* update heatdemand weight changes to be effective during active instance

### 3.0.0-alpha.1 (2024-02-15)
* ems-esp gateway: Raw telegram search for EMS+ thermostats: switchPrograms and holidayModes (RC310/RC300)
* create writable objects / states for switchPrograms and holidayModes
* this function is only active when no km200 gateway is selected - ems-esp gateway only
* improve error messages for km200 (wrong ip / passwords)
* small changes within PDF adapter documentation

### 3.0.0-alpha.0 (2024-02-05)
* Search for ems-esp states for EMS+ thermostats: switchPrograms and holidayModes (RC310/RC300)
* Implement raw telegram search for EMS+ entities and create writable objects / states
* The search is only active when no km200 gateway is selected

### 2.8.0 (2024-02-04)
* influxdb adapter version >= 4.0.2 required 
* store km200 recordings only within defined retention period for influxdb
* delay start of statistics by 5 minutes

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