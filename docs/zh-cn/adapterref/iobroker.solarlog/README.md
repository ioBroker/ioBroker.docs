---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarlog/README.md
title: ioBroker.solarlog
hash: UtVn9GVkjp8SYpSa8bJN2uXEIWi7fFoTMfg70z9NaCE=
---
![商标](../../../en/adapterref/iobroker.solarlog/admin/solarlog.png)

![安装数量](http://iobroker.live/badges/solarlog-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.solarlog.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solarlog.svg)
![新PM](https://nodei.co/npm/iobroker.solarlog.png?downloads=true)

# IoBroker.solarlog
Solarlog 的 ioBroker 适配器 - 设备

## Solarlog - 设置
必须在 Solarlog 的配置菜单中激活开放的 JSON 接口 (offene Json-Schnittstelle) (Konfiguration - System - Zugangskontrolle - Offene Json-Schnittstelle: aktivieren.)

## 适配器 - 设置
＃＃＃ 基本设置
设置 Solarlog - IP 地址 (192.XXX.X.XXX)、端口（可选）和轮询 - 以秒为单位的消耗/生产间隔（“实时”- 数据，最少 10 秒）。

安全性：您可以激活 Solarlog 中的“用户”密码和“激活用户登录”复选框并在适配器配置中添加您的密码，或者您可以在没有用户密码的情况下运行 Solarlog 和适配器。如果激活了用户登录，建议在使用 solarlog - 用户界面时停止适配器（否则您需要在适配器每次请求后重新登录）。

＃＃＃ 高级设置
检查是否要收集所有逆变器/子表/设备/智能能源-数据。

设置轮询 - 以分钟为单位的平均值和汇总值的间隔（最少 5 分钟）。

检查是否要收集历史数据并设置更新历史数据对象的时间。

预测：可选地，适配器使用 Forecast.Solar API 获取预测数据。实际上，今天和明天的总千瓦时是预测的，每小时刷新一次。可根据要求提供更详细或附加的数据（请打开一个问题）。

＃＃ 硬件
测试：Solarlog 200PM+ / 300PM+ / 500 / 1200Meter / 50

SolarLog 50：没有开放的 JSON 接口@SolarLog 50 设备。因此，“信息”和“状态”通道中的某些值将是“拒绝访问”。如果您更喜欢其他解决方案，请打开一个问题或在相应的问题中发布您的偏好。

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### **WORK IN PROGRESS**

### 2.2.2
-   set ready for js-controller 4.x

### 2.2.1
-   replaced 'request' by 'got', node.js >= 12.

### 2.1.5
-   bugfix (variable type).

### 2.1.4
-   history-/selfconsumption-data for SL500 added.

### 2.1.3
-   bugfixes (js-controller 3.3.x)

### 2.1.1
-   Cockpit- (consumption/production/battery/feed) and LCD-display data added. Polling structure optimized for a faster polling of certain values ('live'-data).

### 2.0.2
-   smart energy 'switch group' data added.

### 2.0.1
-   bugfix (better timing to set inverter data).

### 2.0.0
-   Complete code redesign to reduce traffic between adapter and solarlog. NEW: System informations (info) and solarlogs setpoint-values for year, current and all month and current day (forecast).

### 1.3.0
-   user-login possibility added.

### 1.2.4
-   .npmignore and .gitignore added, small bugfix

### 1.2.3
-   Readme/License update.

### 1.2.2
-   It is now possible to set the time when historic data is requested.

### 1.2.1
-   'Forecast' - bug fixed (forecast request now only submitted if forecast is activated), dependencies updated.

### 1.2.0
-   Shows now forecast data: today's and tomorrow's total kWh. Completed translations in words.js.

### 1.1.0
-   Shows detailed information on self - consumption. Imports yearly & monthly historic data.

### 1.0.0
-   Reads now device types, -brands and -classes. Sets correct params for batteries. Displays self-consumption @'status'

### 0.1.6
-   Reads now battery data

### 0.1.5
-   Reads now historic data (yearly sum per Inverter), testing update

### 0.1.4
-   Readme - update

### 0.1.3
-   Core Files/Testing Update and introduce adapter-core

### 0.1.2
-   Inverter/meter - detection optimized

### 0.1.1
-   support for compact mode

### 0.1.0
-   optional port declaration, readme updated

### 0.0.9
-   another bugfix daysum - function

### 0.0.8
-   bugfix daysum - function

### 0.0.7
-   import of daily sum of production/consumption per inverter/meter in Wh
-   info connection state fixed

### 0.0.6
-   optimized evaluation of number of inverters/meters to import

### 0.0.5
-   better readme
-   correct labels in config-dialogue

Planned for next version: reading solarlog smart energy settings and states

### 0.0.4
-   Inverter-import optional
-   Error - logs refer to functions
-   better readme

Planned for next version: reading solarlog smart energy settings and states

### 0.0.3
New functions added!

-   reads all defined inverters/meters
-   set objects named as in solarlog
-   get values (current production/consumption) and states for each inverter

Planned for next version: reading solarlog smart energy settings and states

### 0.0.2 First running version
Defined objects:

-   Time last data sync
-   Installed generator power
-   Total output PAC from all the inverters and meters in inverter mode.
-   Total output PAC from all the inverters
-   Average voltage UAC from the inverter
-   Average voltage UDC from the inverter
-   Total yield for the day from all the inverters
-   Total yield for the previous day from all the inverters
-   Total yield for the month from all the inverters
-   Total yield for the year from all the inverters
-   Total yield from all the inverters
-   Current total consumption PAC from all the consumption meters
-   Total consumption from all the consumption meters
-   Total consumption for the previous day; all the consumption meters
-   Total consumption for the month; all the consumption meters
-   Total consumption for the year; all the consumption meters
-   Accumulated total consumption, all Consumption meter

Planned Objects:
-   Description/Yield/Consumption of all connected inverters and meters

## License

The MIT License (MIT)

Copyright (c) 2018-2022 forelleblau marceladam@gmx.ch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.