---
BADGE-Number of Installations: http://iobroker.live/badges/sprinklecontrol-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sprinklecontrol.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sprinklecontrol.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Dirk-Peter-md/ioBroker.sprinklecontrol/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sprinklecontrol.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sprinklecontrol/README.md
title: 洒水控制
hash: jJPlgbNVw7KbNgVcGJSJNM9F4mMbea1rhb5BUTL+hyQ=
---
![标识](../../../en/adapterref/iobroker.sprinklecontrol/img/sprinklecontrol.png)

# 洒水控制
### *用于依赖天气的自动花园灌溉的适配器。*（通过天气传感器 HmIP-SWO-PL – plus）
遗憾的是，我的英语水平太低，无法完成适配器描述。
如有任何翻译方面的帮助，我将不胜感激。

---
---

## 作用方式
- - -

喷灌控制会评估环境数据（温度、湿度、亮度、风速、降雨量）。
以此方式确定的蒸发量可用于确定各个灌溉区域的理论土壤湿度。
在“时间设置”下指定的时间点，低于一定百分比的灌溉回路将被激活。
然后，这些不同的灌溉回路将受到控制，以确保不超过最大泵输出量（升/小时）和最大灌溉回路数量。
两者均可自定义。

![沙尔特事件.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/schaltverhalten.jpg)

**一天的切换行为示例（所有阀门的启动时间：6:00）**

我的灌溉系统与 Homematic IP 气象传感器 plus (HmIP-SWO-PL) 配合使用，**仅用它进行了测试**。不过，在 ioBroker 论坛上，也有一些通过 Sainlogic 适配器使用气象站进行的测试。

---
---

＃＃ 安装
- - -

通过点击 ioBroker 管理界面上的加号 (+)，即可安装 Sprinkle 控制适配器的实例。
根据管理适配器中指定的活动存储库，将安装稳定版（默认）或测试版（最新）。

---
---

## 适配器配置 - 主要设置
- - -

![屏幕截图1.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot1.jpg)

* 1：转到 GitHub 上的 Sprinkle Control 页面
* 2：从文件加载适配器配置
* 3：从文件保存适配器配置
* 4：添加新的浇水圈
* 5：复选框以启用/禁用灌溉电路
* 6：选择ID时，灌溉圈的名称会自动从对象中读取，然后可以根据需要进行更改。
* 7：对象中需要控制的数据点的唯一ID
* 8：更改选定的灌溉执行器
* 9：打开相应灌溉回路的单独配置
* 10：移动线位置
* 11：删除浇水回路及其所有配置数据！

- - -

### 灌溉回路的单独配置
- - -

打开相应灌溉回路的单独配置

![截图2.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot2.jpg)

**灌溉设置**

- *浇水时间（分钟）：* 设置浇水时间（分钟）。当土壤湿度低于“最低百分比”时，浇水时间会延长。
- *最大灌溉延长百分比：*灌溉持续时间的限制百分比（100% = 灌溉持续时间不延长）。
- *浇水间隔（分钟）：浇水时间分为几个间隔。（例如，5 分钟开，至少 5 分钟关，5 分钟开，等等）
- **提示**：我的草坪入口处有一个草坪格栅。只有灌溉时，水才会顺着斜坡流下来。我可以通过间歇浇水来解决这个问题。

**浇水开关**

- *灌溉阀门的开启点（土壤湿度）以 % 表示：*开启阈值：如果未达到此值，则从开始时间开始浇水。
- *灌溉后土壤湿度 = 100%*：启用后，浇水后土壤湿度将设置为 100%。否则，由于灌溉期间的蒸发，土壤湿度将略低于 100%。

**最大土壤湿度**

- *灌溉后土壤最大含水量（毫米）：* 灌溉后土壤中理论最大含水量。该值越高，浇水间隔越长。
- **提示：**草坪网格：5；花坛：10；草坪面积：14
- *雨后土壤最大含水量（毫米）：* 大雨后土壤理论最大含水量。此值必须大于灌溉后的值！
- **提示：**草坪网格：6；花坛：15；草坪面积：19

- - -

#### 灌溉回路的单独配置 - 主要设置
- - -

![截图3.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot3.jpg)

**洒水器消耗**

- *流量（升/小时）：* 当前灌溉站的具体流量
- **提示：**通常在说明书或互联网上找到
- *助推器：*从网络中删除所有活动的灌溉电路 30 秒，然后再次打开它们
- **提示**：我的水泵最大供水量为每小时1800升，而我的草坪洒水器需要每小时1400升，但需要全压才能启动。有了增压功能，我还可以用滴灌管浇灌针叶树，每小时只需要300升。

> - **危险**：此功能应谨慎使用，因为一次只有一个灌溉回路可以通过活动助推器浇水。

---
---

#### 灌溉回路的单独配置 - 泵设置
- - -

![截图4.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot4.jpg)

**阀门设置**

- *阀门控制电压*：点击 (+) 符号打开 Select-ID State 窗口。您可以在此处选择阀门控制电压的“状态”。只要其中一个阀门处于活动状态，此输出就会生效。

如果您不需要此状态，请将此字段留空！

- *阀门的最大并联操作*：可在此处限制激活阀门的数量。例如，当控制变压器的输出不足以并联切换多个阀门时。
- *阀门之间的切换距离（毫秒）：* 输入以毫秒为单位的时间。这是等待下一个阀门切换的时间，例如，6个输出将依次切换，而不是同时切换。

**泵的设置**

- *主泵*：点击 (+) 符号打开“选择 ID”窗口。负责供水的泵的状况将保存在此处。
- *主泵最大泵输出量（升/小时）：* 此处保存最大泵输出量。这会限制灌溉回路，确保阀门仍能获得足够的压力。
- **危险**：必须在此处注明泵的实际输出功率，而不是铭牌上的功率。例如，我有一台“Gardena 5000/5 LCD”，由于管路长度较长，其输出功率仅为 1800 升/小时，而不是铭牌上标称的 4500 升/小时。

**添加水箱泵**

- *添加水箱泵作为优先泵*
- *水箱泵*：此处输入水箱泵。如果水箱水位过低，则停用该泵。在这种情况下，主泵将继续供水。
- *水箱最大泵流量（升/小时）：*此处保存的是水箱最大泵流量（升/小时）。请参阅“调节主泵”。
- *水箱水位传感器：*水位传感器的状态用于确定 0 ... 100% 的水位。
- *内置：* HomeMatic 的 Hm-Sen-Wa-Od 电容式液位计。
- *囊肿的最低填充水平（百分比）：*如果没有达到，则切换点将切换到主泵，并根据浇水运行时消耗的量来调整阀门。

---
---

## 适配器配置 - 时间设置
- - -

![截图5.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot5.jpg)

可以在此选项卡上设置洒水控制的开始时间。

###开始时间的设置
- *灌溉开始时间：*
- *以固定开始时间开始*：可以在此处设置**一周的开始时间**。
- *日出开始时间*：这是日出开始时间。可以通过**时间偏移（分钟）**将其从 -120 分钟调整为 +120 分钟。
- *黄金时段结束的开始时间：*

###周末开始时间的设置
- *周末的开始时间不同：*例如，如果您想在周末的不同时间开始浇水，以免打扰邻居，您可以在此处激活它。
- *周末开始时间：*

###公共假日开始时间的设置
- *公共假期的开始时间与周末相同：*如果要将公共假期视为周末，可以在此处激活。
- *公共假期实例* 然后必须在此处选择外部公共假期实例（例如适配器“Deutsche Feiertage”）。

---
---

## 适配器配置 - 额外设置
- - -

![截图6.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot6.jpg)

### Astro 设置
SprinkleControl 从 ioBroker 系统设置中获取经纬度。
SprinkleControl 使用这些值来计算太阳位置和用于蒸发的地外辐射。

### 调试设置
激活后，日志中将显示更多信息。这可以更快地分析错误。

### 附加通知设置
激活“通知”选项卡。然后在新的“通知”选项卡上进行通信设置。

### 用于计算蒸发量的传感器“（Homematic HmIP-SWO-PL）”
> - **危险**：该程序适用于“HomeMatic 气象站 HmIP-SWO-PL”，用于计算蒸发量！没有这些数据，就不会触发灌溉电路。

- 但我从论坛上听说该程序还可以通过“Sainlogic Adapter”处理天气数据。
- 传感器根据 Penman ETp 计算潜在蒸散量的最大可能蒸发量，从而控制灌溉系统。

每次温度变化时都会发生这种情况。

### 天气预报
- 如果您勾选“使用天气预报”复选框，将会出现一个选择框。此处必须选择“Das Wetter”适配器的实例。

必须在“Das Wetter”适配器中填写“路径2：包含5天天气预报和每3小时详细信息的XML文件”，以便SprinkleControl能够访问对象“daswetter.0.NextDaysDetailed.Location_1.Day_1.rain_value”。该值用于在预计下雨时推迟浇水。

---
---

## 适配器配置 - 通知
- - -

![截图7.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot7.jpg)

- 一旦激活“通知”选项卡，您可以选择通知方法并在此处输入您的详细信息。
- 支持以下通知方式：
  - 电子邮件
- 推倒
- 电报
- WhatsApp

---
---

## 管理=>对象=>洒水控制.0。
- - -

![截图8.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot8.jpg)

＃＃＃ 控制
- **假日**：如果“假日”设置为 true，且启用了周末设置，则浇水将像周末一样开始。此处也可以连接日历。
- **addStartTimeSwitch** - 仅在配置、附加启动时间下选择了使用外部信号启动时显示。
- **autoOnOff：**当设置为“关闭”时，灌溉系统的自动模式被禁用。
- **autoStart** - 开始灌溉 => 所有活动电路均已启动！
- **parallelOfMax**：例如 (3: 4)。四个可能的灌溉循环中有三个处于活动状态。（这只是一个广告！）
- **剩余流量**：显示泵可能的剩余流量。（这只是一个广告！）

###蒸发
- **ETpCurrent：**这是当前蒸发量的每日值，以毫米/天为单位。
- **今日蒸发量**：此处显示当前每日蒸发量值。该值将于 00:05 移至昨日蒸发量，然后重置为 0。
- **ETpYesterday：**这里显示昨天的蒸发量。

###信息
- **cisternState** 如果需要的话，水箱的状态和状态会在这里显示。
- **nextAutoStart** 表示灌溉系统的下一次启动。
- **rainToday** 此处显示今天的降水预报。需要使用“天气”适配器。
- **rainTomorrow** 来自适配器“天气”的明天降水预报。

### 撒上。*。
- **历史**
- **curCalWeekConsumed**：当前每周灌溉回路消耗量（升）
- **curCalWeekRunningTime**：灌溉回路当前每周总运行时间
- **lastCalWeekConsumed**：上周灌溉回路的消耗量（升）
- **lastCalWeekRunningTime：**上周浇水周期的总运行时间
- **lastConsumed：** 上次浇水时的用水量（升）
- **lastOn：**最后一次开始浇水周期（05.07 14:14）
  - **lastRunningTime：**上次浇水持续时间
- **actualSoilMoisture** 这是当前虚拟土壤湿度的百分比 => 触发条件（灌溉后最高为 100%，大雨后超过 100%）。注意：该值可能与实际土壤湿度存在很大差异。
- **autoOn** 自动开启（在这里您可以关闭该电路的自动浇水，例如在维修期间，可随时手动浇水。）
- **倒计时** 剩余浇水时间
- **runningTime** 浇水时长
- 如果在此处输入大于 0 的数字，则浇水周期将以分钟为单位开始指定的时间。
- 如果输入 0，浇水圈的浇水将结束。
- **sprinklerState** 显示灌溉回路的状态。
- off(0) → 灌溉电路关闭。
- 等待(1) → 灌溉回路正在等待泵容量可用。
- on(2) → 灌溉循环开启。
- 中断（3）→浇水周期被中断（配置，浇水间隔）
- 增压(4) → 当前灌溉电路的增压功能处于活动状态（配置，增压器开启）。
- 关闭（升压）（5）→ 由于升压功能处于活动状态，灌溉电路中断 30 秒。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.2.15 (2025-06-01)
* (Dirk-Peter-md) Readme updated
* (Dirk-Peter-md) Fixed an error when switching off with autoOnOff
* (Dirk-Peter-md) ioBroker-Bot [W028]

### 0.2.14 (2025-03-15)
* (Dirk-Peter-md) eslint-config added
* (Dirk-Peter-md) Dependencies updated
* (Dirk-Peter-md) Update License
* (Dirk-Peter-md) issue #92 Sprinkler im Gewächshaus solved
* (Dirk-Peter-md) add Button control.autoStart

### 0.2.13 (2022-09-06)
* (Dirk-Peter-md) various bugs fixed
* (Dirk-Peter-md) Preparing the stable release

### 0.2.12 (2022-07-17)
* (Dirk-Peter-md) fixDay(twoNd,threeRd) => postpone by one day
* (Dirk-Peter-md) Bug fixed => autoOn
* (Dirk-Peter-md) Additional post-watering => in case of high evaporation / switchable externally

### 0.2.11 (2022-05-22)
* (Dirk-Peter-md) Bug fixed => analog soil moisture sensor with negative characteristic
* (Dirk-Peter-md) Attention => maximum soil moisture in rain now in %

## License
MIT License

Copyright (c) 2020 - 2025     Dirk Peter     <dirk.peter@freenet.de>

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
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.