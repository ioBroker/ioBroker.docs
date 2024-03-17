---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sun2000/README.md
title: ioBroker.sun2000
hash: ck6/uyq141if3CicgGBfW2NdEulsmg4uvfIMeUkOofg=
---
![标识](../../../en/adapterref/iobroker.sun2000/admin/sun2000.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.sun2000.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sun2000.svg)
![安装数量](https://iobroker.live/badges/sun2000-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/sun2000-stable.svg)
![文档](https://img.shields.io/badge/Documentation-2D963D?logo=read-the-docs&logoColor=white)
![国家公共管理](https://nodei.co/npm/iobroker.sun2000.png?downloads=true)

# IoBroker.sun2000
**测试：** ![测试与发布](https://github.com/bolliy/ioBroker.sun2000/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**\ 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!\ Sentry 报告从 js-controller 开始使用3.0。

## IoBroker 的 sun2000 适配器
使用Modbus TCP读取华为SUN2000逆变器和LUNA2000电池的寄存器数据。

[华为产品信息](https://solar.huawei.com/en/professionals/all-products?residential-smart-pv)

欢迎关注德语版的讨论[iobroker论坛](https://forum.iobroker.net/topic/71768/test-adapter-sun2000-v0-1-x-huawei-wechselrichter)

## 文档
请参阅 [文档页](./docs/README.md) 或在 [维基百科](https://github.com/bolliy/ioBroker.sun2000/wiki) 中浏览

## 支持的硬件
* 华为逆变器SUN2000系列（M0、M1、M2及更高版本）
* 华为智能适配器-WLAN-FE / 分钟。软件版本：V100R001C00SPC133（SDongleA-05）
* 华为Luna2000电池
* 华为智能功率传感器DTSU666-H或DDSU666-H
* 华为智能记录仪/分钟软件版本：V300R023C10SPC311

## 功能列表
* 最多可处理 5 个逆变器（主/从），每个逆变器配有一个电池模块（最大 15kWh）。
* 以固定间隔读取输入功率、输出功率、充放电功率、电网消耗等实时值。
* 仅针对来自逆变器的更改数据写入状态。这减轻了 iobroker 实例的负担。
* 可以使用“已更新”触发元素来监视“收集”路径中的“inputPower”或“activePower”状态。因为这些状态总是在设定的时间间隔内写入的。
* modbus-proxy：即使逆变器的modbus接口已在使用中，第三方设备（例如wallbox、能源管理器等）也可以接收数据。此外，您还可以将 sun2000 数据镜像到另一个 ioBroker 实例。
* 华为SmartLogger集成：监控和管理光伏发电系统。适配器保存采集到的数据的方式与直接读取逆变器时相同。

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