---
BADGE-Number of Installations: http://iobroker.live/badges/sprinklecontrol-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sprinklecontrol.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sprinklecontrol.svg
BADGE-Dependency Status: https://img.shields.io/david/Dirk-Peter-md/iobroker.sprinklecontrol.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Dirk-Peter-md/ioBroker.sprinklecontrol/badge.svg
BADGE-Travis-CI: http://img.shields.io/travis/Dirk-Peter-md/ioBroker.sprinklecontrol/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sprinklecontrol.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sprinklecontrol/README.md
title: 洒水控制
hash: zYzTZ3/dX2jdrqbMzeM+/sc625qzpXC07eTKAWwSwJA=
---
![商标](../../../en/adapterref/iobroker.sprinklecontrol/img/sprinklecontrol.png)

# 洒水控制
### *用于依赖天气的自动花园灌溉的适配器。*（通过天气传感器 HmIP-SWO-PL – plus）
不幸的是，我的英语知识对于适配器描述来说太少了。
对于翻译方面的任何帮助，我将不胜感激。

---
---

##行动模式
- - -

环境数据（温度、湿度、亮度、风速、雨量）在 Sprinkle Control 中进行评估。
以这种方式确定的蒸发量用于确定各个灌区的理论土壤水分。
在“时间设置”下指定的时间点，低于特定百分比的浇水回路被激活。
然后以不超过最大泵输出 (l / h) 和最大灌溉回路数量的方式控制这些不同的灌溉回路。
两者都是可定制的。

![schaltverhalten.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/schaltverhalten.jpg)

**一天的开关行为示例（所有阀门的开始时间：6:00）**

我的灌溉使用 Homematic IP 天气传感器 plus (HmIP-SWO-PL) 和 ** 只测试过这个**。
然而，在 ioBroker 论坛中，也有一些通过 Sainlogic 适配器对气象站进行的测试。

---
---

＃＃ 安装
- - -

Sprinkle Control Adapter 实例是通过 ioBroker Admin 界面通过单击加号 (+) 安装的。
根据管理适配器中指定的活动存储库，将安装稳定版（默认）或测试版（最新）。

---
---

## 适配器配置 - 主要设置
- - -

![截图1.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot1.jpg)

* 1: 转到 GitHub 上的 Sprinkle Control 页面
* 2：从文件加载适配器配置
* 3：从文件中保存适配器配置
* 4：添加一个新的浇水圈
* 5：复选框启用/禁用灌溉电路
* 6：选择ID时自动从对象中读取灌溉圈的名称，然后可以根据需要更改。
* 7：对象中要控制的数据点的唯一ID
* 8：改变选择的灌溉执行器
* 9：开启各自灌溉回路的个别配置
* 10：移动行位置
* 11：删除所有配置数据的浇水电路！

- - -

### 灌溉回路的个性化配置
- - -

打开各个灌溉回路的单独配置

![截图2.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot2.jpg)

**灌溉设置**

- *浇水时间以分钟为单位：*以分钟为单位设置浇水时间。这会延长触发低于“最低土壤水分百分比”的程度。
- *以百分比表示的最大灌溉延长：* 以百分比表示的灌溉持续时间的限制（100% = 灌溉持续时间未延长）。
- *浇水间隔以分钟为单位：*浇水时间分为一个间隔。 （例如，开 5 分钟，至少关 5 分钟，开 5 分钟等）
    - **提示：** 和我一起，我在入口处有一个草坪炉排。这里的水只有在灌溉时才会沿着斜坡流下。我能够通过间隔浇注来抵消这一点。

**浇水的接通点**

- *灌溉阀的开启点（土壤湿度）%：* 开启阈值：如果未达到该值，则从开始时间开始浇水。
- *灌溉后土壤湿度 = 100%：* 激活后，灌溉后土壤湿度设置为 100%。否则，由于灌溉过程中的蒸发，它会停留在它的正下方。

**最大土壤湿度**

- *灌溉后的最大土壤水分（毫米）：* 灌溉后土壤中的最大理论含水量。该值越高，浇水间隔越长。
  - **提示：**草坪网格：5；花坛：10；草坪面积：14
- *雨后最大土壤水分（mm）：*大雨后土壤中的最大理论含水量。这个值必须大于灌水后！
  - **提示：**草坪网格：6；花坛：15；草坪面积：19

- - -

#### 灌溉回路的个性化配置 - 主要设置
- - -

![截图3.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot3.jpg)

**喷头消耗量**

- *以升/小时为单位的流量：*当前灌溉站的比流量
    - **提示：** 经常在使用说明书或互联网上找到
- *助推器：* 从网络中移除所有活动的灌溉电路 30 秒，然后再次打开它们
    - **提示：** 我的泵的最大流量为 1800 升/小时，而我的草坪洒水器需要 1400 升/小时，但需要全压才能启动它们。借助增压功能，我还可以使用仅需要 300 l/h 的滴水管给针叶树浇水。

    > - **危险：** 这个功能应该非常谨慎地使用，因为一次只有一个灌溉回路可以用一个有源增压器浇水。

---
---

#### 灌溉回路的个性化配置 - 泵设置
- - -

![截图4.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot4.jpg)

**阀门设置**

- *阀门的控制电压：* 单击 (+) 符号打开 Select-ID State 窗口。您可以在此处为阀门的控制电压选择 STATE。只要其中一个阀门处于活动状态，该输出就会变为活动状态。

  如果您不需要此状态，请将此字段留空！

- *阀门的最大并行操作：* 活动阀门的数量可以在这里限制。例如，如果控制变压器的输出不足以并行切换多个阀门。
- *以毫秒为单位的阀门之间的切换距离：*以毫秒为单位输入时间。这是切换下一个阀门之前的等待时间，例如，这意味着 6 个输出一个接一个地切换，而不是同时切换。

**泵的设置**

- *主泵：* 单击 (+) 符号打开选择 ID 窗口。负责供水的泵的 CONDITION 保存在此处。
- *主泵的最大泵输出（l/h）：* 最大泵输出保存在此处。这样就限制了灌溉回路，以便仍然向阀门施加足够的压力。
  - **危险：** 必须在此处指定实际泵输出。不是铭牌上的那个。例如，我有一个“Gardena 5000/5 LCD”，由于线的长度，它只能产生 1800 l/h 的输出，而不是 4500 l/h，如铭牌上所述。

**添加水箱泵**

- *添加水箱泵作为优先泵*
    - *蓄水池泵：* 在此处输入蓄水池泵。如果水箱中的水位太低，这将被停用。在这种情况下，主泵继续供水。
    - *以升/小时为单位的水箱最大泵容量：* 以升/小时为单位的最大泵输出量保存在此处。参见调整主泵。
    - *水箱中的液位传感器：*液位传感器的状态，用于确定 0 ... 100% 的液位。
      - *内置：* HomeMatic 的 Hm-Sen-Wa-Od 电容式电平表。
    - *孢囊的最低填充水平%：* 如果未达到，切换点将切换到主泵，并根据浇水运行时消耗的量调整阀门。

---
---

## 适配器配置 - 时间设置
- - -

![截图5.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot5.jpg)

可以在此选项卡上设置喷洒控制的开始时间。

###设置开始时间
- *灌溉开始时间：*
  - *以固定的开始时间开始：*可以在此处设置**一周的开始时间**。
 - *日出开始时间：*这是日出开始时间。它可以通过 ** 以分钟为单位的时间偏移** 从 -120 分钟转移到 + 120 分钟。
  - *黄金时段结束时的开始时间：*

###周末开始时间的设置
- *周末不同的开始时间：*例如，如果您想在周末的不同时间开始浇水以免打扰邻居，您可以在此处激活它。
- *周末开始时间：*

###公共假期开始时间的设置
- *公共假期的开始时间为周末：*如果公共假期应该像周末一样对待，可以在此处激活。
- *公共假期实例* 然后必须在此处选择外部公共假期实例（例如适配器“Deutsche Feiertage”）。

---
---

## 适配器配置 - 额外设置
- - -

![截图6.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot6.jpg)

###天文设置
SprinkleControl 从 ioBroker 系统设置中获取纬度和经度。
SprinkleControl 使用这些值来计算太阳的位置和用于蒸发的外星辐射。

###调试设置
激活后，日志中会显示附加信息。这允许更快速地分析错误。

### 附加通知设置
激活通知选项卡。然后在新的通知选项卡上进行通信设置。

### 用于计算蒸发量的传感器“（Homematic HmIP-SWO-PL）”
> - **危险：** 该程序适用于“HomeMatic 气象站 HmIP-SWO-PL”，用于计算蒸发量！没有这些数据，就不会触发灌溉回路。

- 但我从论坛上听说该程序还可以通过“Sainlogic Adapter”处理天气数据。
- 传感器根据 Penman ETp 计算潜在蒸散的最大可能蒸发量，从而控制灌溉系统。

  每次温度变化时都会发生这种情况。

＃＃＃ 天气预报
- 如果您激活“使用天气预报”框，将出现一个选择框。此处必须选择适配器“Das Wetter”的实例。

必须在“Das Wetter”适配器中填写“路径 2：包含 5 天天气预报和每 3 小时详细信息的 XML 文件”，以便 SprinkleControl 可以访问对象 **“daswetter.0.NextDaysDetailed.Location_1.Day_1” .rain_value"**。然后，该值用于在应该下雨时推迟浇水。

---
---

## 适配器配置 - 通知
- - -

![截图7.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot7.jpg)

- 激活通知选项卡后，您可以选择通知方式并在此处输入您的详细信息。
- 支持以下通知方式：
  - 电子邮件
  - 推倒
  - 电报
  - 微信

---
---

## Admin => Objekte => splashcontrol.0。
- - -

![截图8.jpg](../../../en/adapterref/iobroker.sprinklecontrol/img/screenshot8.jpg)

＃＃＃ 控制
- **Holiday:** 如果“Holiday”设置为true，如果启用周末设置，浇水将像周末一样开始。这里也可以连接日历。
- **autoOnOff:** 当设置为“关闭”时，灌溉系统的自动模式被禁用。
- **parallelOfMax:** 例如 (3: 4)。四个可能的灌溉圈中的三个在这里活跃。 （这只是一个广告！）
- **restFlow:** 显示泵可能的剩余流量。 （这只是一个广告！）

###蒸发
- **ETpCurrent:** 这是当前蒸发量，以毫米/天为单位的每日值。
- **ETpToday:** 此处显示当前的每日蒸发值。这将在 00:05 移至 ETpYesterday，然后重置为 0。
- **ETpYesterday:** 昨天的蒸发显示在这里。

###信息
- **cisternState** 如有必要，此处显示蓄水池的状态及其状态。
- **nextAutoStart** 指示灌溉系统的下一次启动。
- **rainToday** 今天的降水预报显示在这里。为此需要适配器"天气"。
- **rainTomorrow** 来自适配器“天气”的明天降水预报。

###洒。*。
- **历史**
  - **curCalWeekConsumed:** 当前每周灌溉回路的消耗量（以升为单位）
  - **curCalWeekRunningTime:** 当前灌溉回路的每周总运行时间
  - **lastCalWeekConsumed:** 上次每周消耗量（以升为单位的灌溉回路）
  - **lastCalWeekRunningTime:** 浇水周期的最后一周总运行时间
  - **lastConsumed:** 最后一次浇水的耗水量（以升为单位）
  - **lastOn:** 最后开始浇水周期 (05.07 14:14)
  - **lastRunningTime:** 上次浇水持续时间
- **actualSoilMoisture** 这是当前虚拟土壤湿度百分比 => 触发标准（灌溉后最大 100%，大雨后超过 100%）。注意：该值可能与实际土壤湿度有很大差异。
- **autoOn** 自动开启（在这里您可以关闭此电路的自动浇水，例如在维修期间，可以随时手动浇水。）
- **倒计时**剩余浇水时间
- **runningTime** 浇水持续时间
  - 如果在此处输入大于 0 的数字，则浇水周期将在指定的时间（以分钟为单位）开始。
  - 如果输入0，则结束浇水圈的浇水。
- **sprinklerState** 显示灌溉电路的状态。
  - off(0) → 灌溉电路关闭。
  - wait(1) → 灌溉回路正在等待泵容量可用。
  - on(2) → 灌溉圈开启。
  - break(3) → 浇水周期被中断（配置，浇水间隔）
  - Boost(4) → 当前灌溉电路的升压功能激活（配置，升压开启）。
  - off(Boost)(5) → 由于升压功能处于活动状态，灌溉电路中断了 30 秒。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.1.7 (22.05.2021)
* (Dirk-Peter-md) Beschreibung in englischer Sprache hinzugefügt
* (Dirk-Peter-md) bereit für stable

### 0.1.6 (18.05.2021)
* (Dirk-Peter-md) AutoOn-Schalter pro Bewässerungskreis hinzugefügt
* (Dirk-Peter-md) weitere Fehler beseitigt (js-Controller)
* (Dirk-Peter-md) Niederschlagszähler von der Verdunstung gelöst

### 0.1.5 (05.05.2021)
* (Dirk-Peter-md) Zurücksetzen der Regenmenge im 24-Stunden-Modus hinzugefügt

### 0.1.4 (21.04.2021)
* (Dirk-Peter-md) Fehler bei deaktivierter Wettervorhersage behoben

### 0.1.3 (18.04.2021)
* (Dirk-Peter-md) Schaltabstand zwischen den Ventilen eingebaut, main.js aufgeteilt

### 0.1.2 (30.12.2020)
* (Dirk-Peter-md) Beschreibung von SprinkleControl überarbeitet

### 0.1.1 (08.11.2020)
* (Dirk-Peter-md) Integration von Nachrichten per Telegramm, E-Mail, Pushover und WhatsApp

### 0.0.12 (10.10.2020)
* (Dirk-Peter-md) Bewässerung über eine 2. Pumpe (Zisterne mit Vorrangschaltung) in abhängigkeit vom Füllstand hinzugefügt.

### 0.0.11 (30.08.2020)
* (Dirk-Peter-md) Bug in der Verarbeitung der Regenvorhersage vom Adapter "Das Wetter"
* (Dirk-Peter-md) Bug auf Travis CI


*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2021 Dirk Peter <dirk.peter@freenet.de>

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