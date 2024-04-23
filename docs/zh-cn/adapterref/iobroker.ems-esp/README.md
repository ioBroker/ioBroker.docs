---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: tDqMsfwdHnBhTrnQMUFXYtGUx0Uvwep6ITJ82u84Aq4=
---
![标识](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![安装数量（最新）](https://iobroker.live/badges/ems-esp-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/ems-esp-stable.svg)
![新平台](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**测试：**![测试与发布](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## 带有 km200 / IP-inside 和/或 ems-esp 接口的 Bosch / Buderus 加热系统
该适配器支持使用 EMS 或 EMS+ 总线与博世集团供暖系统进行接口。
（Buderus / Junkers / Netfit 等）。

## 它可以通过使用 Web-API 调用与加热系统交互：
* km200、km200 hrv、km100、km50、HMC300 或 IP-inside（来自博世集团）

* ems-esp 网关（https://github.com/emsesp/EMS-ESP32）具有最新开发版本（见下文）和 ESP32 芯片。

不再支持带有 API V2 的旧 ESP8266 网关！！该适配器针对 ems-esp 网关进行了测试，固件版本为 ESP32 最新固件版本 (> V3.6.0)。最新开发版本的固件可能无法与 ioBroker 适配器稳定配合使用。使用风险自负。

* 不支持新的博世集团云网关（MX300 / EasyControl...），因为它们不支持 LAN API！

ioBroker ems-esp 适配器可以读取和写入两个网关的数据以控制所有加热组件。
它既可以用于原始 Bosch-Group 网关，也可以用于 ems-esp，或者同时用于两者。
所有来自自身脚本或对象浏览器的更改状态都必须设置 acknowledged = false !!!

## 版本 >= 3.3.0 中的新功能：引入使用非生产性 ems-esp 固件的警告。
## 版本 >= 3.0.0 中的新功能：为 EMS-ESP 网关实现了 EMS+ 实体（switchPrograms 和 holidayModes），并且如果发现状态则创建。
ems-esp 网关固件不支持 EMS+ 恒温器（RC310 / RC300 或类似产品）的 switchPrograms 和 holidayModes。启用此新功能将向 ems-esp 网关发出原始电报，然后尝试读取响应。
针对 hc1 至 hc4、dhw（温水）和循环泵 (cp) 以及 holidayModes hm1-hm5 的 switchPrograms A 和 B 进行测试。
找到的扩展实体存储在实例设置中。因此，一旦适配器实例重新启动就会发生。

然后，在找到这些状态后，解码原始响应并创建类似于 KM200 网关 API 数据的状态。
启用 km200 网关后，将禁用此功能以避免使用相同名称进行重复输入。
创建的状态由 JSON 结构、枚举值或数组组成，并且是可写的 - 请小心使用正确的内容。
我建议使用 Bosch/Buderus 应用程序进行测试以识别正确的内容 - 尤其是对于 holidayModes。
轮询设置为每 2 分钟一次。

## 新的能源记录和统计需要一个活动的数据库实例。
记录需要 InfluxDB 适配器版本 >= 4.0.2，它允许删除 db-records。现在读取保留期，并且记录仅存储在保留期内 - Beta 状态 InfluxDB v2 需要将保留期设置为 > 2 年，以存储所有历史值。
在 V2 中，这是所有状态的全局参数！

## 新功能：热需求滞后得到改善。
当实际温度 <= 设定温度 - 增量时，打开加热需求；当设定温度 < 实际温度时，关闭加热需求；在设定温度 - 增量和设定温度之间不执行任何操作；确保增量足够高，以避免锅炉启动过多。

## 新功能：热需求参数可以在活动实例期间更改
在活动实例中，可以在对象内更改每个恒温器的热需求参数 delta / weight 备注：仅当发现新的热需求时才使用更新的权重 在活动实例中，可以在对象内更改每个加热回路的热需求参数 weighton / weightoff

德语文档：https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

英文文档：https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf

德国 ioBroker 论坛：https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.4.0 (2024-04-22)
* changes for ems-esp firmware 3.7.0 
* introduce warnings in log for using ems-esp dev firmware

### 3.3.0 (2024-04-20)
* introduce a new check for ems-esp gateway formatting settings for boolean and enum values
* stop ems-esp polling if wrong settings are detected !

### 3.2.1 (2024-04-17)
* update release script

### 3.2.0 (2024-04-17)
* change for ems-esp firmware 3.7 - add dhw tag

### 3.1.1 (2024-04-11)
* update dependencies and release  script

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