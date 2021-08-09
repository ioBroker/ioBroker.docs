---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kecontact/README.md
title: 用于 KEBA KeContact P20 或 P30 和 BMW i wallbox 的 ioBroker 适配器
hash: LjZdhIBc51HwBzjb27or5MaAFejnGQIfGy9+Tgmbfj4=
---
![适配器标志](../../../en/adapterref/iobroker.kecontact/admin/charger.png)

![安装数量](http://iobroker.live/badges/kecontact-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.kecontact.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![特拉维斯](https://img.shields.io/travis/iobroker-community-adapters/ioBroker.kecontact.svg)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.kecontact.svg)

# 用于 KEBA KeContact P20 或 P30 和 BMW i wallbox 的 ioBroker 适配器
使用其 UDP 协议提供有关 KEBA KeContact 墙盒当前状态的信息。

＃＃ 安装
通过 ioBroker Admin 安装此适配器：

1. 打开实例配置对话框
2. 输入您的 KEBA KeContact 墙盒的 IP 地址
3.根据需要调整刷新间隔
4. 保存配置
5.启动适配器

＃＃ 配置
### KeContact IP 地址
这是您的 KEBA KeContact 或 BMW i Wallbox 的 IP 地址。

###固件检查
适配器将每天检查一次 KEBA 网站上是否有更新的固件可用。此信息将被打印以作为警告记录。

###被动模式
如果您想自己控制 Wallbox 并且不希望此适配器执行某些自动操作，请激活此选项。在这种情况下，所有有关 PV 自动和功率限制的后续选项都将被忽略。

### 加载充电会话
您可以选中此选项以定期从壁挂盒下载最新的充电会话 (30)。
v1.1.1 及以下版本的用户注意：您必须选中此选项才能继续接收充电会话！

＃＃＃ 刷新间隔
这是应该以秒为单位查询墙盒以获取新充电值的间隔。

默认值为 10 分钟，这是 KeConnect 的负载和 ioBroker 中的最新信息之间的良好平衡。

### PV 自动装置
为了给您的车辆相应地充电到剩余（例如通过光伏），您还可以定义代表剩余和主电源的状态。这些值用于计算可用于充电的安培数。通过附加值，您可以定义

* 如果您想使用充电站的X1输入来控制是全功率充电还是光伏自动充电，请切换X1选项
* 与默认 6 A 不同的最小安培数（仅适用于例如 Renault Zoe）
* 可用于开始充电的关注功率值（这意味着即使没有足够的剩余电量也会开始充电 - 建议 0 W 用于 1 相充电，500 W 至 2000 W 用于 3 相充电）
* 电流增量（建议 500 mA）
* 可以暂时用于维持充电会话的关注值（这意味着即使不再有足够的剩余，充电也会在稍后停止 - 将添加开始关注 - 建议 500 W）
* 充电会话的最短持续时间（即使剩余不再足够，充电会话将至少持续这次 - 建议 300 秒）
* 每次剩余时间不再充足时继续充电的时间（在阴天弥补时间）

###功率限制
您还可以限制最大值。墙盒的电源以限制主电源。例如。运行夜间蓄热式加热器时，您可能必须遵守最大功率限制。
如果您输入一个值，您的 wallbox 将被连续限制以不超过您的功率限制。
最多可以指定三种电能表状态进行限制。将所有值相加以计算电流消耗。
一个额外的复选框用于指定是否包括壁箱功率（在这种情况下，壁箱功率将从状态值中减去）。

### 动态选项
此外，还有一些状态会影响动态自动光伏的行为，例如通过您自己的脚本根据您的需要更新这些值）

* kecontact.0.automatic.photovoltaics - 激活光伏自动（真）或设置为假时以最大功率为车辆充电
* kecontact.0.automatic.calcPhases - 定义用于充电计算的当前阶段数。这是 Keba Deutschland 版所必需的，可用于所有充电站的初始充电会话
* kecontact.0.automatic.addPower - 定义允许为您的车辆充电的瓦数（与选项相同）
* kecontact.0.automatic.pauseWallbox - 只要设置为 true，就会立即停止每个充电会话
* kecontact.0.automatic.limitCurrent - 将您的充电限制为以 mA 为单位的指定安培数（0 = 无限制）

示例：要在不考虑剩余电流的情况下以 6A 的恒定电流为您的车辆充电，请将 PV 设置为 false 并将 limitCurrent 设置为 6000。

＃＃ 合法的
该项目与 KEBA AG 公司没有直接或间接的关联。

KeConnect 是 KEBA AG 的注册商标。

## Changelog

### 1.2.2 (2021-07-28)
* (Sneak-L8) new: limit max. charging current dynamically
* (Sneak-L8) support BMW charging station (Keba OEM, Sentry IOBROKER-KECONTACT-3)
* (Sneak-L8) support P20 charging station (Sentry IOBROKER-KECONTACT-B)
* (Sneak-L8) optimized power calculation for Deutschland edition

### 1.2.1 (2021-07-20)
* (Sneak-L8) support X1 contact of charging station to switch photovoltaics automatic
* (Sneak-L8) prevent a crash case (Sentry IOBROKER-KECONTACT-2)

### 1.2.0 (2021-06-07)
* (Sneak-L8) support for compact mode
* (Sneak-L8) using sentry.io to track errors
* (Sneak-L8) support for KeContact P30 Deutschland edition

### 1.1.3 (2021-04-26)
* (Sneak-L8) new time option to continue charging session with regard
* (Sneak-L8) optimized calculation of surplus (prevent alternating amperage)

### 1.1.2 (2021-04-02)
* (Sneak-L8) default state of photovoltaics automatic set to true for new users
* (Sneak-L8) new option to select whether charging sessions list should be downloaded and be saved in states or not, do so only once an hour
             ATTENTION for users from version v1.1.1 and below: you have to check this option to still receive for charging sessions!
* (Sneak-L8) firmware version check
* (Sneak-L8) expanded readme

### 1.1.1 (2021-02-25)
* (Sneak-L8) internal state update prevented recognition of state change

### 1.1.0 (2021-02-20)
* (Sneak-L8) intermediate results saved as states values
* (Sneak-L8) additional power for charging session as state

### 1.0.3 (2021-02-08)
* (Sneak-L8) new options for minimal amerage (e.g. Renault Zoe) and permanent regard value

### 1.0.2
* Added readout of last 30 Charging Sessions from Wallbox; Enabled 'setenergy' State to send and set Charging Goal in Wh to Wallbox

### 1.0.1 (2020-08-20)
* (Sneak-L8) add missing german translation for IP address setting

### 1.0.0 (2020-08-20)
* (UncleSam) change settings layout to material design, first offical version

### 0.3.2 (2020-08-04)
* (Sneak-L8) in PV automatics mode wallbox will be disabled as long as no vehicle is plugged

### 0.3.1 (2020-07-23)
* (Sneak-L8) do not start charging when vehicle is plugged even if current is too low for photovoltaics automation

### 0.3.0 (2020-07-21)
* (Sneak-L8) regulate wallbox by PV automatics independant from state curr user

### 0.2.6 (2020-07-20)
* (Sneak-L8) try again to regulate wallbox by currtime instead of curr as suggested

### 0.2.3 (2020-05-24)
* (Sneak-L8) fix call to display PV automatics after vehicle is plugged, fix object in energy meter states

### 0.2.2 (2020-05-13)
* (Sneak-L8) display information about photovoltaics automatic also at begin of charging
* (Sneak-L8) delayed display of photovoltaics automatic when vehicle is plugged (8 sec)

### 0.2.1 (2019-11-14)
* (Sneak-L8) handle values of undefined in getStates
* (Sneak-L8) better recognition of max power function

### 0.2.0 (2019-02-05)
* (Sneak-L8) added automatic regulation by output photovoltaics unit
* (Sneak-L8) added possibility to limit wallbox to keep total power below a limit
* (Sneak-L8) added state to display text on wallbox

### 0.1.0 (2019-01-12)
* (Apollon77) Updated CI testing, update basic files

### 0.0.3 (2017-07-04)
* (UncleSamSwiss) Improved UDP datagram sending
* (UncleSamSwiss) Added all known writable states

### 0.0.2 (2017-06-25)
* (UncleSamSwiss) Improved UDP socket handling (thanks to ehome)
* (UncleSamSwiss) Added reading all known states

### 0.0.1 (2017-06-11)
* (UncleSamSwiss) Initial version

## License

Copyright (c) 2020-2021 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.