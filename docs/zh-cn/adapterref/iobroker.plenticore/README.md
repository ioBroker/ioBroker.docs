---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: uArP6UMVgzTXm8IFmUFIA9RvTSRbxw8eeM0r7Y/lhpk=
---
![标识](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![安装数量](http://iobroker.live/badges/plenticore-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.plenticore.svg)
![NPM](https://nodei.co/npm/iobroker.plenticore.png?downloads=true)
![稳定的](http://iobroker.live/badges/plenticore-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![构建状态](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

Eine deutsche Beschreibung ist [他发现了](https://github.com/StrathCole/ioBroker.plenticore/blob/master/README_de.md)。

# IoBroker.plenticore
用于 KOSTAL Plenticore Plus 逆变器（即 Plenticore Plus 8.5）的 ioBroker 适配器

此适配器使用逆变器的内部网络界面访问逆变器和连接设备（例如电池或智能电表）的属性和设置。要使用适配器，您需要将 ioBroker 实例连接到您的 KOSTAL Plenticore 所在的网络。

此适配器不是 KOSTAL 的官方产品，也不受 KOSTAL 的支持或认可。这是一个仍处于早期开发状态的私人项目，因此使用风险自负！

## 配置
设置您逆变器的 IP 地址（例如 192.168.0.23）和您作为工厂所有者用于连接到逆变器网络界面的密码。轮询间隔以毫秒为单位（即 10000 为 10 秒）。

＃＃ 适配器
适配器不使用屏幕抓取。它使用与 Web 界面相同的 REST API。适配器可能（尚未）使用（许多）功能。

### 为什么不（简单地）使用 modbus？
逆变器启用了 modbus tcp，因此您可以使用 modbus 适配器查询值。不过，KOSTAL 不允许写入任何 modbus 地址。所以你不能设置e。 G。使用 ioBroker 的电池最小 SoC。

### 使用适配器
适配器应填充 plenticore.X 对象树下的一些对象。其中一些是只读的，例如。 G。当前光伏输出或家庭用电量。其他是可变的，e。 G。电池的最小 SoC 或电池管理模式。我在 Plenticore Plus 10 上测试了适配器。

## 对象
以下是此适配器使用和填充的最重要对象的摘录。所有标有 `[**]` 的设置都应该是可编辑的，但并非所有设置都经过测试，可能存在错误。

### Plenticore.X.devices.local
devices.local 树包含有关逆变器和可能连接的智能电表和/或电池的信息。

`plenticore.X.devices.local.Dc_P` - 当前直流功率包括逆变器自用功率。该值应接近 `plenticore.X.devices.local.ac.P`（约 +30-40W）`plenticore.X.devices.local.Pv_P` 的值 - 当前产生的光伏功率。该值由适配器通过汇总 pvx.P 值计算得出。
`plenticore.X.devices.local.Home_P` - 当前使用的总家庭电力 `plenticore.X.devices.local.HomeBat_P` - 当前家庭电力由电池提供 `plenticore.X.devices.local.HomePv_P` - 当前家庭电力直接由工厂提供 `plenticore.X.devices.local.HomeGrid_P` - 当前家庭电网提供的功率 `plenticore.X.devices.local.ToGrid_P` - 发送到电网的当前功率。该值由适配器计算得出，可能不是 100% 准确。
`plenticore.X.devices.local.LimitEvuAbs` - 计算出的可能离开转换器的电流限制。如果工厂产生更多的电力，它将丢失。
`plenticore.X.devices.local.StateKey0` - 如果为真，则逆变器的电池管理已解锁

#### Plenticore.X.devices.local.ac
该通道包含有关逆变器交流侧的信息。最重要的是： `plenticore.X.devices.local.ac.Frequency` - 净频率 `plenticore.X.devices.local.ac.L1_P` - W 中第 1 相的当前功率 `plenticore.X.devices.local.ac.L2_P` - W 中第 2 相的当前功率 `plenticore.X.devices.local.ac.L3_P` - 当前功率W `plenticore.X.devices.local.ac.P` 中的第 3 相 - 逆变器当前发出的总功率，包括电池放电

#### Plenticore.X.devices.local.battery
`plenticore.X.devices.local.battery.Cycles` - 到目前为止的电池寿命 `[**] plenticore.X.devices.local.battery.DynamicSoc` - 如果启用了动态 SoC，则为真（仅当 `SmartBatteryControl` 也为真时） `[**] plenticore.X.devices.local.battery.MinHomeConsumption` - 最小家庭功耗需要使用电池 `[**] plenticore.X.devices.local.battery.MinSoc` - 电池所需的最小 SoC（充电状态）。如果没有太阳能，实际的 SoC 可能会低于这个值。
`plenticore.X.devices.local.battery.MinSocDummy` - 如果在配置中禁用了 MinSoC 管理，则此值由适配器设置。它是为了显示 MinSoC 将被设置为什么值。
`plenticore.X.devices.local.battery.P` - 当前电池电量（充电时为负，放电时为正）`plenticore.X.devices.local.battery.Charge_P` - 当前电池充电功率（放电时为 0）`plenticore.X.devices.local.battery.Discharge_P` - 当前电池放电功率（充电时为 0） ) `[**] plenticore.X.devices.local.battery.SmartBatteryControl` - 如果启用了智能电池管理，则为真。关于官方手册，只有在没有其他交流电源（如涉及第二个逆变器）的情况下才能启用此功能。`[**] plenticore.X.devices.local.battery.ExternControl` - 只能从 Web 界面作为安装者进行设置。要通过 ioBroker 进行控制，请使用状态 ExternControl_DcPowerAbs 和 ExternControl_MaxChargePowerAbs，同时将 ExternControl 设置为 2 (Modbus TCP)。
`[**] plenticore.X.devices.local.battery.ExternControl_DcPowerAbs` - 危险：只有当你知道自己在做什么时才使用它，错误的使用会损坏你的电池！重要提示：该值必须每 3 分钟更新一次，否则 plenticore 会切换到内部控制，除非它收到新值。此状态仅在 ExternControl 设置为 2 (Modbus TCP) 时可用。该值以瓦特为单位，可以在 -10000 到 10000 之间设置。负值表示电池正在放电，正值表示电池正在充电。
`[**] plenticore.X.devices.local.battery.ExternControl_MaxChargePowerAbs` - 危险：只有当你知道自己在做什么时才使用它，错误使用会损坏你的电池！重要提示：该值必须每 3 分钟更新一次，否则 plenticore 会切换到内部控制，除非它收到新值。此状态仅在 ExternControl 设置为 2 (Modbus TCP) 时可用。
`plenticore.X.devices.local.battery.SoC` - 电池的当前充电状态

#### Plenticore.X.devices.local.inverter
`plenticore.X.devices.local.inverter.MaxApparentPower` - 逆变器可以提供的最大功率

#### Plenticore.X.devices.local.pv1 / pv2 / pv3
`plenticore.X.devices.local.pvX.P` - 工厂 X 相提供的当前功率

### Plenticore.X.scb
该频道包含设备本身的信息和设置

#### Plenticore.X.scb.modbus
`[**] plenticore.X.scb.modbus.ModbusEnable` - 如果启用了 modbus tcp，则为真 `[**] plenticore.X.scb.modbus.ModbusUnitId` - 设备的 modbus 单元 ID

#### Plenticore.X.scb.network
`[**] plenticore.X.scb.network.Hostname` - 逆变器的当前主机名 `[**] plenticore.X.scb.network.IPv4Auto` - 使用 DHCP 为逆变器提供 ip 地址设置 `[**] plenticore.X.scb.network.IPv4Address` - 逆变器的当前 ip 地址 `[**] plenticore.X.scb.network.IPv4DNS1` 和 § §SSSSS_4§§ - 当前使用的 DNS 服务器 `[**] plenticore.X.scb.network.IPv4Gateway` - 当前使用的网关 `[**] plenticore.X.scb.network.IPv4Subnetmask` - 网络子网掩码

#### Plenticore.X.scb.time
`[**] plenticore.X.scb.time.NTPservers` - 当前使用的时间服务器 (NTP)。这些可以是多个由空格分隔的。
`[**] plenticore.X.scb.time.NTPuse` - 使用 NTP 设置当前设备时间设置 `[**] plenticore.X.scb.time.Timezone` - 设备的时区

### Plenticore.X.scb.statistic.EnergyFlow
本节中的数据点包含在 Plenticore web UI 中可见的统计信息。以下仅提及 `Day` 数据点，但每个数据点也可用于 `Month`、`Year` 和 `Total`。

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay` - 当天的自给自足百分比 `plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay` - 当天估计节省的 CO2 千克 `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeDay` - 当天的总家庭消耗量 §§SSSSS_3§ § - 光伏电站当天提供的家庭总消耗量 `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay` - 电池当天提供的家庭总消耗量 `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay` - 电网为当天提供的家庭总消耗量current day `plenticore.0.scb.statistic.EnergyFlow.EnergyToGridDay` - 当天发送到电网的总功率 `plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay` - 当天的自身消耗率（发电厂发电未发送到电网） `plenticore.0.scb.statistic.EnergyFlow.YieldDay` -当天植物的总产量

## 预测数据
电力预报功能使用不同的天气数据源。它开箱即用，但您可以通过添加以下一个或多个天气适配器的实例来改进结果：ioBroker.darksky、ioBroker.weatherunderground、ioBroker.daswetter。要使该功能正常工作，您需要配置系统的全球地理位置（经度和纬度）并设置 plenticore 适配器的扩展配置（面板和电池数据，如果适用）。

### 预测是如何工作的
预测功能使用您提供的发电厂和电池数据来计算一天中每个时间可能产生的最大功率。这是通过使用系统的位置来获取太阳高度和方位角并计算太阳辐射值来完成的。这些值与来自不同来源的天气预报数据相结合，以获得一天中每个小时的云量、雾和雨量预报。适配器使用这些数据计算出植物在每次阳光照射下可能产生的能量。

然后，预测值可用于设置电池的 MinSoC，启用或禁用转换器的动态“智能电池管理”（均由适配器在内部完成）或控制家庭中的其他设备，例如。 G。暖气、洗衣机、烘干机、洗碗机等（由用户的外部 JavaScript/Blockly 完成）。

### Plenticore.0.forecast.consumption
`plenticore.0.forecast.consumption.day` - 过去 3 天白天的当前功耗平均值 `plenticore.0.forecast.consumption.night` - 过去 3 天夜间的当前功耗平均值 `plenticore.0.forecast.consumption.remaining` - 当前预报日到日落的估计剩余功耗

### Plenticore.0.forecast.current
`plenticore.0.forecast.current.power.generated` - 当天到当前时间的发电厂发电量 `plenticore.0.forecast.current.power.max` - 晴天（0% 云覆盖率）下计算的最大发电厂发电量 `plenticore.0.forecast.current.power.sky` - 计算出的发电厂发电量考虑了当前云层覆盖率天气适配器 `plenticore.0.forecast.current.power.skyvis` - 考虑当前云覆盖和天气适配器能见度计算的电厂功率 `plenticore.0.forecast.current.power.skyvisrain` - 考虑当前云覆盖、能见度和天气适配器降雨预报的电厂功率计算 `plenticore.0.forecast.current.visibility.*` - 相应天气适配器提供的当前能见度预报 `plenticore.0.forecast.current.rain.*` - 相应天气适配器提供的当前降雨预报 `plenticore.0.forecast.current.rainChance.*` - 相应天气适配器提供的当前降雨概率预报 `plenticore.0.forecast.current.sky.*` - 当前云预报由相应的天气适配器提供 `plenticore.0.forecast.current.sky_high.*` - 当前云预报（高空层）由相应的天气适配器提供 `plenticore.0.forecast.current.sky_medium.*` - 当前云预报（中层空气 la yers) 由相应的天气适配器提供 `plenticore.0.forecast.current.sky_low.*` - 当前云预报（低空气层）由相应的天气适配器提供 `plenticore.0.forecast.current.sun.azimuth` - 当前太阳位置（方位角） `plenticore.0.forecast.current.sun.elevation` - 当前太阳位置（海拔）

### Plenticore.0.forecast.day1——同样适用于day2
`plenticore.0.forecast.day1.power.date` - 当前功率预测信息的日期 `plenticore.0.forecast.day1.power.day` - 当天的总功率预测 `plenticore.0.forecast.day1.power.day_adjusted` - 当天的总功率预测，考虑到现在的发电量并使用预测数据仅适用于剩余的日照时间 `plenticore.0.forecast.day1.power.day_high` - 当天的总功率预测，忽略天气适配器的可见性数据 `plenticore.0.forecast.day1.power.remaining` - 当天的预报总量的剩余功率，基于剩余日照时间的预测 `plenticore.0.forecast.day1.power.Xh.power` - 预计预报日太阳时间 X 的电厂总发电量，其中 1 小时是日出时间降雨数据 `plenticore.0.forecast.day1.power.Xh.time` - `plenticore.0.forecast.power.Xh.power` 的日照时间 `plenticore.0.forecast.day1.sun.sunrise` - 预测日期的日出时间 `plenticore.0.forecast.day1.sun.sunset` - 预测日期的日落时间

## 智能电池控制
KOSTAL 的智能电池控制不使用天气预报。因此，一方面保证电池充满，另一方面尽可能避免馈入限制，并不总能控制得很好。
此适配器尝试对此进行优化。为此提供了两种策略，可以在适配器的设置中选择。
如果 KOSTAL 的智能电池控制处于活动状态，它会决定何时以及有多少电量进入电网或电池。适配器只能决定 KOSTAL 智能控制是否激活，但不能决定它如何运行。

### 策略一：双日预报 vs. 电池容量
简要说明：如果（达到最低 SoC）且（日落前的剩余电量 - 剩余电量 - 可用电池容量）>= 2 * 电池容量，则打开 KOSTAL Smart Management。

### 策略 2：剩余预测与消耗和可用电池容量
仅当（根据预测）满足以下两个条件时，才会激活 KOSTAL 智能管理：

- 至少有一个小时超出了进给限制（否则您不需要智能管理，因为所有内容都可以输入到网格中）。
- 大概有比白天所需更多的电力可供白天消耗和为电池充电（否则，即使没有智能管理，电池中的空间也会全天空闲）

实际控制有点复杂，因为它还防止智能控制多次打开/关闭。

细节：

- 如果所有每小时预测值都低于“最大馈入”，则 KOSTAL 控制不会激活。假设最大馈电低 15%，以预测云引起的变化。
- 下午 3 点之间和日出，科世达智能控制的设置没有改变。 KOSTAL 控制器如果不经常不必要地打开/关闭，它似乎会工作得更好。在此期间，KOSTAL 控制没有劣势。
- 滞后用于减少打开/关闭的频率。当前SoC小于“激活电池管理的最低SoC”或空闲电量低于0时关闭。当前SoC大于“激活电池管理的最低SoC”+1时开启空闲电量大于电池容量的10%。

##捐赠
[![贝宝](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 2.3.0
- (Jey Cee) Added possibility to control battery charging

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