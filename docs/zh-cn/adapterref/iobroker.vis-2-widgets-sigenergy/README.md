---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-sigenergy/README.md
title: ioBroker.vis-2-widgets-sigenergy
hash: rOh8CIKMyKu6fpFtXuPSVtxHOnNBruhKJu8FB0UP78g=
---
![标识](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/admin/vis-2-widgets-sigenergy.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.vis-2-widgets-sigenergy.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-sigenergy.svg)
![安装数量](https://iobroker.live/badges/vis-2-widgets-sigenergy-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/vis-2-widgets-sigenergy-stable.svg)
![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-sigenergy.png?downloads=true)

# IoBroker.vis-2-widgets-sigenergy
**测试：** ![测试与发布](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 vis-2-widgets-sigenergy 适配器
适用于 Sigenergy 储能适配器 (`ioBroker.sigenergy`) 的 VIS-2 小部件集。

包含 8 个小部件，用于可视化和控制能量流、电池状态、实时功率、每日统计数据、交流充电器、直流充电器、逆变器和 SigenMicro 微型逆变器概览。

＃＃ 要求
- 已安装并配置 `sigenergy` 适配器的 ioBroker
- ioBroker VIS-2 适配器（≥ 2.0.0）

## 小部件
### 能量流图
以动画 SVG 图的形式展示太阳能电池板、蓄电池、电网和房屋之间的当前能量流动。

动画箭头实时可视化各种连接。

**OID：** `pvPower`, `essPower`, `gridActivePower`, `housePower`, `essSoc`

![能量流图](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-energiefluss.png)

#### 流向
| 数据点 | 值 > 0 | 值 < 0 |
|---|---|---|
| `essPower` | 电池充电 → 箭头从中心指向电池 | 电池放电 → 箭头从电池指向中心 |
| `pvPower` | PV 产生 → 从 PV 指向中心的箭头 | — |
| `housePower` | 房屋消耗 → 从中心指向房屋的箭头 | — |
| `housePower` | 房屋耗电 → 从中心指向房屋的箭头 | — |

### 电池状态及预测
显示 SOC、SOH、充电功率，并预测充满电所需时间、剩余运行时间、自耗电量和自给自足率。

**OID：** `essSoc`, `essSoh`, `essPower`, `batteryTimeToFull`, `batteryTimeRemaining`, `selfConsumptionRate`, `autarkyRate`

![电池状态及预测](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-batterie.png)

### 实时功率
以简洁的列表视图显示所有当前功率值，并带有颜色编码的方向指示器。

**OID：** `pvPower`, `essPower`, `gridActivePower`, `housePower`, `essSoc`

![实时功率](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-leistung.png)

### 能源统计数据
每日概览，包括自给率、自消耗量、SOC 历史记录、充电/放电能量和电池覆盖率。

**OID：** `autarkyRate`, `selfConsumptionRate`, `dayMaxSoc`, `dayMinSoc`, `essDailyChargeEnergy`, `essDailyDischargeEnergy`, `batteryCoverageToday`, `batteryDailyChargeTime`

![能源统计](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-statistiken.png)

### 交流充电器（Sigen EVAC）
对Sigenergy交流充电器（EVAC）进行监控和控制。显示充电功率、系统状态、额定功率、额定电流和总能耗。报警信息以彩色高亮显示。充电电流可通过滑块直接设置（6–32 A）。

**OID：** `acCharger.systemState`, `acCharger.chargingPower`, `acCharger.totalEnergyConsumed`, `acCharger.ratedPower`, `acCharger.ratedCurrent`, `acCharger.alarm1/2/3`, `acCharger.control.startStop`, `acCharger.control.outputCurrent`

![交流充电器](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-ac-charger.png)

### 直流充电器
对Sigenergy直流充电器进行监控和控制。显示输出功率、车辆荷电状态（带进度条）、车辆电池电压、充电电流以及当前充电过程的能量和持续时间。

**OID：** `dcCharger.outputPower`, `dcCharger.vehicleSoc`, `dcCharger.vehicleBatteryVoltage`, `dcCharger.chargingCurrent`, `dcCharger.currentChargingCapacity`, `dcCharger.currentChargingDuration`, `dcCharger.control.startStop`

![直流充电器](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-dc-charger.png)

### 逆变器
通过标签导航对逆变器进行全面监控和控制。显示运行状态、功率数据、电池温度、相电压、所有5个报警寄存器和设备信息（型号、序列号、固件）。

| 标签页 | 内容 |
|---|---|
| **功率** | 有功功率、光伏功率、电池充放电功率、功率分配滑块（-100% 至 +100%） |
| **电池** | SOC 和 SOH 状态（带柱状图）、平均电池温度/电压、最高/最低温度 |
| **电网** | 相电压 L1/L2/L3、电网频率、功率因数、PCS 内部温度 |
| **报警** | 5 个报警寄存器（PCS ×2、ESS、网关、直流充电器），带有十六进制代码和颜色标记 |
| **信息** | 型号、序列号、固件版本、远程EMS开关 |

![逆变器](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-inverter.png)

**OID：** `inverter.activePower`, `inverter.pvPower`, `inverter.essChargeDischargePower`, `inverter.runningState`, `inverter.essBatterySoc/Soh`, `inverter.essAvgCellTemperature/Voltage`, `inverter.phaseA/B/CVoltage`, `inverter.gridFrequency`, `inverter.pcsInternalTemp`, `inverter.alarm1–5`, `inverter.firmwareVersion`, `inverter.modelType`, `inverter.serialNumber`, `inverter.control.startStop`, `inverter.control.remoteEmsDispatchEnable`, `inverter.control.activePowerPercent`

### 光伏发电
最多可显示 3 个光伏串的实时功率值和指向混合逆变器的动画流向箭头。箭头颜色根据功率等级动态变化（橙色 <1 kW，黄色 <2 kW，绿色 >2 kW）。

#### 小部件设置
| 参数 | 类型 | 默认值 | 描述 |
|---|---|---|---|
| oid_pv1 … oid_pv3 | OID | sigenergy.0.plant.pv1Power … pv3Power | 光伏组串功率 OID |
| oid_pvtotal | OID | sigenergy.0.plant.pvPower | 总光伏发电量 OID |
| sig_title | 文本 | 光伏发电 | 小部件标题 |
| sig_name1 … sig_name3 | 文本 | 字符串 1 … 字符串 3 | 每个字符串可配置名称 |
| sig_darkmode | 复选框 | true | 深色/浅色模式 |

![光伏发电](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/PV-PowerOverview.png)

**OID：** `plant.pv1Power`, `plant.pv2Power`, `plant.pv3Power`, `plant.pvPower`

### SigenMicro 概述
本页面概述并详细展示了所有通过 Modbus 连接的 SigenMicro 微型逆变器。标签 1 以动画网络段的形式显示所有设备（以太网总线拓扑结构，带有垂直下拉线）。每个后续标签按升序显示相应设备的全部 15 个寄存器。

| 标签 | 内容 |
|---|---|
| **概览** | 所有设备以动画总线拓扑结构和汇总图块形式呈现（总功率、日产量、生命周期产量、在线数量） |
| **设备 01–20** | 设备图像位于左上角（偏移 10 像素），包含型号/序列号/固件/状态标识，以及所有 15 个寄存器（01–15）的值、单位和 OID 路径 |

#### 网络片段动画
水平主干线和垂直垂线在设备处于活动状态（运行中）时会显示沿线缆流动的动态虚线。非活动设备（待机/故障）仅显示无动画的黑色基线。

#### 动态布局
| 设备 | 行 | 图片大小 |
|---|---|---|
| 1–5 | 1 行 | 80 × 90 像素 |
| 6–10 | 1 行 | 52 × 60 像素 |
| 11–15 | 2 行 | 46 × 52 像素 |
| 16–20 | 2 行 | 40 × 46 像素 |

#### 小部件设置
| 参数 | 类型 | 默认值 | 描述 |
|---|---|---|---|
| micro_count | 数字 (1–20) | 3 | 要显示的微型逆变器数量 |
| sig_title | 文本 | SigenMicro 微型逆变器 | 小部件标题 |
| sig_darkmode | 复选框 | true | 深色/浅色模式 |
| oid_micro1 … oid_micro20 | OID | — | 每个设备的锚定 OID（例如 sigenergy.0.sigenmicro.11.outputPower） |

![SigenMicro Übersicht — Übersichts-Tab](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-microinverter_01.png)

![SigenMicro Übersicht — 详细信息选项卡](../../../en/adapterref/iobroker.vis-2-widgets-sigenergy/img/widget-microinverter_02.png)

**OID（每个设备，前缀为 sigenergy.0.sigenmicro.<slaveId>）：** modelType、serialNumber、firmwareVersion、runningState、outputPower、gridFrequency、temperature、mppt1Voltage、mppt1Current、mppt1Power、mppt2Voltage、mppt2Current、mppt2Power、dailyYield、totalYield

＃＃ 外貌
所有小部件均支持**浅色和深色模式**，可通过小部件设置`Dark mode`进行切换。

## 文档
- 🇬🇧 [英文](README.md) — 此文件
- 🇩🇪 [德语](doc/de/README.md)
- 🇷🇺 [Русский](doc/ru/README.md)
- 🇳🇱 [荷兰语](doc/nl/README.md)
- 🇫🇷 [法语](doc/fr/README.md)
- 🇮🇹 [意大利语](doc/it/README.md)
- 🇪🇸 [西班牙语](doc/es/README.md)
- 🇵🇱 [Polski](doc/pl/README.md)
- 🇵🇹 [葡萄牙语](doc/pt/README.md)

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.7.7 (2026-04-20)
* (ssbingo) Text no longer distorts under non-uniform scaling — letters keep their proportions while containers continue to fill the widget area

### 1.7.6 (2026-04-20)
* (ssbingo) Scaling is now non-uniform: width and height react independently to container changes, keeping both axes individually adjustable

### 1.7.5 (2026-04-20)
* (ssbingo) Widget scaling now also reacts to height changes — content scales proportionally on both axes and is centered within the widget

### 1.7.4 (2026-04-20)
* (ssbingo) All 9 widgets now scale their content responsively with the widget size (fonts, padding, SVG, images)

### 1.7.3 (2026-04-20)
* (ssbingo) All 9 widgets now share a unified background based on the PV-Power widget design

Older changelog entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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