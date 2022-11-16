---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: MYjfwSdN3P5i/uZkVuIQGEgFVoIL99N3czASpakjnlU=
---
![标识](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![安装数量](http://iobroker.live/badges/plenticore-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.plenticore.svg)
![新PM](https://nodei.co/npm/iobroker.plenticore.png?downloads=true)
![稳定的](http://iobroker.live/badges/plenticore-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![构建状态](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

Eine deutsche Beschreibung ist [找人](https://github.com/StrathCole/ioBroker.plenticore/blob/master/README_de.md)。

# IoBroker.plenticore
用于 KOSTAL Plenticore Plus 逆变器的 ioBroker 适配器（即 Plenticore Plus 8.5）

此适配器使用逆变器的内部 Web 界面访问逆变器和连接设备（例如电池或智能电表）的属性和设置。要使用适配器，您需要将 ioBroker 实例连接到您的 KOSTAL Plenticore 所在的网络。

此适配器不是 KOSTAL 的官方产品，也不受 KOSTAL 的支持或认可。它是一个仍处于早期开发状态的私人项目，因此使用风险自负！

## 配置
设置您的逆变器的 IP 地址（例如 192.168.0.23）和您用于以工厂所有者身份连接到逆变器 Web 界面的密码。轮询间隔以毫秒为单位（即 10000 是 10 秒）。

＃＃ 适配器
适配器不使用屏幕抓取。它使用与 Web 界面相同的 REST API。适配器可能（尚未）使用（许多）功能。

### 为什么不（简单地）使用 modbus？
逆变器启用了 modbus tcp，因此您可以使用 modbus 适配器查询值。不过，KOSTAL 不允许写入任何 modbus 地址。所以你不能设置 e。 G。使用 ioBroker 的电池最小 SoC。

### 使用适配器
适配器应该填充 lenticore.X 对象树下的一些对象。其中一些是只读的，例如。 G。当前光伏输出或家庭用电量。其他是可变的，例如。 G。电池的最小 SoC 或电池管理模式。我在 Plenticore Plus 10 上测试了适配器。

## 对象
以下是此适配器使用和填充的最重要对象的摘录。所有标有`[**]`的设置都应该是可编辑的，但并非所有设置都经过测试并且可能存在错误。

### Plenticore.X.devices.local
devices.local 树包含有关逆变器和可能连接的智能电表和/或电池的信息。

`plenticore.X.devices.local.Dc_P` - 当前直流功率，包括逆变器自用功率。这个值应该接近`plenticore.X.devices.local.ac.P`（大约+30-40W）`plenticore.X.devices.local.Pv_P`的值——当前产生的光伏功率。该值由适配器通过汇总 pvx.P 值来计算。
`plenticore.X.devices.local.Home_P` - 当前家庭使用的总电量 `plenticore.X.devices.local.HomeBat_P` - 电池提供的当前家庭电量 `plenticore.X.devices.local.HomePv_P` - 工厂直接提供的当前家庭电量 `plenticore.X.devices.local.HomeGrid_P` - 当前家庭电网提供的功率 `plenticore.X.devices.local.ToGrid_P` - 当前发送到电网的功率。该值由适配器计算得出，可能不是 100% 准确的。
`plenticore.X.devices.local.LimitEvuAbs` - 计算出的可能离开转换器的功率电流限制。如果工厂产生更多的电力，它就会失去。
`plenticore.X.devices.local.StateKey0` - 如果为真，则逆变器的电池管理已解锁

#### Plenticore.X.devices.local.ac
该通道包含有关逆变器交流侧的信息。最重要的是： `plenticore.X.devices.local.ac.Frequency` - 净频率 `plenticore.X.devices.local.ac.L1_P` - W 相 1 的当前功率 `plenticore.X.devices.local.ac.L2_P` - W 相 2 的当前功率 `plenticore.X.devices.local.ac.L3_P` - 当前功率W `plenticore.X.devices.local.ac.P`中的第 3 相 - 逆变器发出的当前总功率，包括电池放电

#### Plenticore.X.devices.local.battery
`plenticore.X.devices.local.battery.Cycles` - 迄今为止的电池寿命周期 `[**] plenticore.X.devices.local.battery.DynamicSoc` - 如果启用了动态 SoC，则为真（仅当 `SmartBatteryControl` 也为真时）`[**] plenticore.X.devices.local.battery.MinHomeConsumption` - 最低家庭功耗需要使用电池`[**] plenticore.X.devices.local.battery.MinSoc` - 电池所需的最小 SoC（充电状态）。如果缺乏太阳能，实际的 SoC 可能会低于此值。
`plenticore.X.devices.local.battery.MinSocDummy` - 如果在配置中禁用 MinSoC 管理，则此值由适配器设置。这是为了显示 MinSoC 将设置的值。
`plenticore.X.devices.local.battery.P` - 当前电池电量（充电时为负极，放电时为正极） `plenticore.X.devices.local.battery.Charge_P` - 当前电池充电电量（放电时为 0） `plenticore.X.devices.local.battery.Discharge_P` - 当前电池放电电量（充电时为 0 ) `[**] plenticore.X.devices.local.battery.SmartBatteryControl` - 如果启用了智能电池管理，则为 true。关于官方手册，只有在没有其他交流电源（如涉及第二个逆变器）时才启用此功能`[**] plenticore.X.devices.local.battery.ExternControl` - 0 启用内部控制，1 用于外部数字 I/O，2 用于外部 Modbus TCP §§SSSSS_11§ § - 电池的当前充电状态

#### Plenticore.X.devices.local.inverter
`plenticore.X.devices.local.inverter.MaxApparentPower` - 逆变器可以提供的最大功率

#### Plenticore.X.devices.local.pv1 / pv2 / pv3
`plenticore.X.devices.local.pvX.P` - 工厂 X 相提供的当前功率

### Plenticore.X.scb
此频道包含设备本身的信息和设置

#### Plenticore.X.scb.modbus
`[**] plenticore.X.scb.modbus.ModbusEnable` - 如果启用了 modbus tcp，则为 true `[**] plenticore.X.scb.modbus.ModbusUnitId` - 设备的 modbus 单元 ID

#### Plenticore.X.scb.network
`[**] plenticore.X.scb.network.Hostname` - 逆变器的当前主机名 `[**] plenticore.X.scb.network.IPv4Auto` - 使用 DHCP 为逆变器提供 IP 地址设置 `[**] plenticore.X.scb.network.IPv4Address` - 逆变器的当前 IP 地址 `[**] plenticore.X.scb.network.IPv4DNS1` 和 § §SSSSS_4§§ - 当前使用的 DNS 服务器 `[**] plenticore.X.scb.network.IPv4Gateway` - 当前使用的网络网关 `[**] plenticore.X.scb.network.IPv4Subnetmask` - 网络子网掩码

#### Plenticore.X.scb.time
`[**] plenticore.X.scb.time.NTPservers` - 当前使用的时间服务器 (NTP)。这些可以是多个由空格分隔的。
`[**] plenticore.X.scb.time.NTPuse` - 使用 NTP 设置当前设备时间设置 `[**] plenticore.X.scb.time.Timezone` - 设备的时区

### Pleenticore.X.scb.statistic.EnergyFlow
本节中的数据点包含在 Plenticore Web UI 中可见的统计信息。仅在 `Day` 数据点之后提及，但它们中的每一个也可用于 `Month`、`Year` 和 `Total`。

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay` - 当天的自给自足百分比 `plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay` - 估计当天节省的二氧化碳（kg） `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeDay` - 当天的家庭总消耗量（Wh）§§SSSSS_3§ § - 光伏电站当天提供的家庭总消耗量 `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay` - 电池组提供的当天家庭总消耗量 `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay` - 电网提供的家庭总消耗量当天 `plenticore.0.scb.statistic.EnergyFlow.EnergyToGridDay` - 当天发送到电网的总功率 `plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay` - 当天的自身消耗率（产生的工厂电力未发送到电网） `plenticore.0.scb.statistic.EnergyFlow.YieldDay` -当天植物的总产量

## 预测数据
电力预测功能使用不同的天气数据源。它开箱即用，但您可以通过添加以下一个或多个天气适配器的实例来改进结果：ioBroker.darksky、ioBroker.weatherunderground、ioBroker.daswetter。要使该功能正常工作，您需要配置系统的全球地理位置（经度和纬度）并设置 plenticore 适配器的扩展配置（面板和电池数据，如果适用）。

### 预测如何工作
预测功能使用提供的发电厂和电池数据来计算一天中每个时间可能产生的最大功率。这是通过使用系统的位置来获取太阳高度和方位角并计算太阳辐射值来完成的。这些值与来自不同来源的天气预报数据相结合，以获得一天中每个小时的云量、雾和雨预报。使用这些数据，适配器计算植物在每个阳光下可能产生的功率。

然后，预测值可用于设置电池的 MinSoC、启用或禁用转换器的动态“智能电池管理”（均由适配器在内部完成）或控制家庭中的其他设备，例如。 G。加热、洗衣机、烘干机、洗碗机等（由用户的外部 JavaScript/Blockly 完成）。

### Plenticore.0.forecast.consumption
`plenticore.0.forecast.consumption.day` - 过去 3 天白天的当前平均功耗 `plenticore.0.forecast.consumption.night` - 过去 3 天夜间的当前平均功耗 `plenticore.0.forecast.consumption.remaining` - 当前预测日到日落的估计剩余功耗

### Plenticore.0.forecast.current
`plenticore.0.forecast.current.power.generated` - 从当天到当前时间产生的电厂功率 `plenticore.0.forecast.current.power.max` - 在晴朗的天空（0% 云覆盖）计算的最大电厂功率 `plenticore.0.forecast.current.power.sky` - 考虑到当前云覆盖率计算的电厂功率天气适配器 `plenticore.0.forecast.current.power.skyvis` - 考虑当前云覆盖和天气适配器的能见度计算的植物功率 `plenticore.0.forecast.current.power.skyvisrain` - 计算的植物功率考虑了天气适配器的当前云覆盖、能见度和降雨预报 `plenticore.0.forecast.current.visibility.*` - 相应天气适配器提供的当前能见度预报 `plenticore.0.forecast.current.rain.*` - 相应天气适配器提供的当前降雨预报 `plenticore.0.forecast.current.rainChance.*` - 相应天气适配器提供的当前降雨概率预报 `plenticore.0.forecast.current.sky.*` - 当前云预报由相应的天气适配器提供 `plenticore.0.forecast.current.sky_high.*` - 当前云预报（上层空气层）由相应的天气适配器提供 `plenticore.0.forecast.current.sky_medium.*` - 当前云预报（中层空气 la yers）由相应的天气适配器提供 `plenticore.0.forecast.current.sky_low.*` - 当前云预报（低层空气层）由相应的天气适配器提供 `plenticore.0.forecast.current.sun.azimuth` - 当前太阳位置（方位角） `plenticore.0.forecast.current.sun.elevation` - 当前太阳位置（海拔）

### Pleenticore.0.forecast.day1 – 同样适用于 day2
`plenticore.0.forecast.day1.power.date` - 当前电力预测信息的日期 `plenticore.0.forecast.day1.power.day` - 当天的总电力预测 `plenticore.0.forecast.day1.power.day_adjusted` - 当天的总电力预测，考虑到现在的发电量并使用预测数据仅适用于剩余日照时数 `plenticore.0.forecast.day1.power.day_high` - 忽略天气适配器的能见度数据的当天总功率预测 `plenticore.0.forecast.day1.power.remaining` - 基于剩余日照时数预测的当天预测总剩余电量`plenticore.0.forecast.day1.power.Xh.power` - 在预报日的太阳时 X 时估计的电站总功率，其中 1 小时是日出时 `plenticore.0.forecast.day1.power.Xh.power_high` - 在预报日的太阳时 X 时估计的电站总功率，但不考虑能见度或降雨数据 `plenticore.0.forecast.day1.power.Xh.time` - `plenticore.0.forecast.power.Xh.power` 的太阳小时开始时间 `plenticore.0.forecast.day1.sun.sunrise` - 预报日期的日出时间 `plenticore.0.forecast.day1.sun.sunset` - 预报日期的日落时间

##智能电池控制
KOSTAL 的智能电池控制不使用天气预报。因此，它并不总是理想地控制一方面确保电池充满电，另一方面尽可能避免馈入限制。
此适配器尝试对此进行优化。为此提供了两种策略，可以在适配器的设置中进行选择。
如果 KOSTAL 的智能电池控制处于活动状态，它将决定何时以及多少电量进入电网或电池。适配器只能决定 KOSTAL 智能控制是否处于活动状态，而不能决定它的运行方式。

### 策略1：双日预测与电池容量
简要说明：如果（达到最低 SoC）和（日落前的剩余电量 - 剩余电量 - 可用电池容量）>= 2 * 电池容量，则打开 KOSTAL 智能管理。

### 策略 2：剩余预测与消耗和可用电池容量
仅当（根据预后）同时满足以下两个条件时，才会激活 KOSTAL 智能管理：

- 至少有一小时超过馈电限制（否则您不需要智能管理，因为所有东西都可以馈入电网）。
- 可能比白天所需的电量更多，可用于白天消耗和为电池充电（否则，即使没有智能管理，电池中的空间也会全天空闲）

实际控制要复杂一些，因为它还可以防止智能控制被多次打开/关闭。

细节：

- 如果所有每小时预测值都低于“最大馈电”，则不会激活 KOSTAL 控制。为了预测云引起的变化，假设最大馈电降低了 15%。
- 下午 3 点之间和日出，科世达智能控制的设置没有改变。如果不经常不必要地打开/关闭 KOSTAL 控件，它似乎会更好地工作。在此期间，KOSTAL 控制没有劣势。
- 滞后用于减少打开/关闭频率。当前 SoC 小于“激活电池管理的最小 SoC”或剩余电量低于 0 时关闭。当前 SoC 大于“激活电池管理的最小 SoC”+1 时打开并且剩余电量大于电池容量的10%。

##捐赠
[![贝宝](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 2.2.2
- Added alternative smart battery strategy (Description see above) [PastCoder]

### 2.2.1
- Fixed forecast zickzack [PastCoder]

### 2.2.0
- Fixed state value types for new version of js-controller  
  Warning: Please delete state object scb.export.LastExportOk after update and restart adapter
- Allow providing a custom port for connection to converter
- Allow using https connection to converter
- Fixed some state object types

### 2.1.9
- Fixed met.no rain forecast value

### 2.1.8
- Update of met.no API to locationforecast 2.0
- Removed xml2js library
- Update of base library

### 2.1.7
- Updated base library to support js controller 3.2

### 2.1.6
- Copyright year updated

### 2.1.5
- Package information fixed

### 2.1.4
- Disable smart battery control as long as SoC is lower than MinSoC + 8% to avoid using grid power on consumption peaks
- Disable darksky usage (service discontinued)

### 2.1.3
-   Fixed wrong hour of weather forecast from daswetter adapter

### 2.1.2
-   Added setting for minimum SoC to enable battery management

### 2.1.1
-   Fixed problems in config and translations

### 2.1.0
-   Added further forecast sources to provide better power forecasts
-   Added second day forecast
-   Improved code and fixed some minor issues
-   New dependency for xml2js
-   Updated readme

### 2.0.0

-   Code rework
-   Outsourced many functions to libraries
-   This version has new dependencies and requires a newer adapter-core version!
-   Several fixes

### 1.1.1

-   No changes

### 1.1.0

-   Added support for weatherunderground weather adapter. The adapter can be choosen as alternative forecast source over the DarkSky adapter.

### 1.0.2

-   Fixed a warning message occuring far too often

### 1.0.1

-   Added forecast features to readme

### 1.0.0

-	Added power forecast feature

### 0.1.5

-   Added translations
-   Fixed shadow management handling.

### 0.1.4

-   Added shadow management datapoint.

### 0.1.3

-   Do not query battery values if battery management is not unlocked.

### 0.1.2

-   Resolved adapter check issues, see https://github.com/StrathCole/ioBroker.plenticore/issues/1
-   Added statistics data points.

### 0.1.1

-   Removed admin adapter dependency

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2022 Marius Burkard

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