---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sigenergy/README.md
title: ioBroker Sigenergy 适配器
hash: F6Nt6sPKMmmrscCaDo0zQj9MCUOGXOTA+qjdkn8pD4g=
---
# IoBroker Sigenergy 适配器

![NPM 版本](https://img.shields.io/npm/v/iobroker.sigenergy.svg)
![许可证：MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**用于通过 Modbus TCP/RTU 连接 [西格能源](https://www.sigenergy.com) 太阳能系统的适配器**

支持 Sigenergy Modbus 协议 V2.9（发布于 2026 年 5 月 13 日）。

---

<p align="center"> <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a> </p>

---

＃＃ 特征
- 📡 **Modbus TCP**（以太网/WLAN/光纤/4G）— 端口 502
- 🔗 **Modbus RTU**（RS485 串口）
- ⚡ **完全寄存器支持** — 所有符合 V2.9 规范的工厂、逆变器、PSS 和 PID 寄存器
- 🔋 **电池统计信息** — 充满电所需时间、剩余使用时间、每日覆盖率
- ☀️ **光伏统计数据** — 自用率、自给率
- 🔌 **交流充电器**（Sigen EVAC）— 可选
- ⚡ **直流充电器** — 可选
- 🏗️ **PSS**（电站开关）— 可选，用于中/低压开关设备和配电柜监控
- 🔍 **PID**（光伏绝缘检测）— 可选
- 🌡️ **ESS 预热** — 分时电价方案，30 个可配置时间窗口（M1-HYA/HYB）
- 📈 **扩展寄存器** — 智能负载 1–24、累计能量、电网规范参数
- ☀️ **SigenMicro** — 支持微型逆变器（自动扫描）
- 📊 **计算值** — 每次投票周期更新的衍生统计数据
- 🖥️ **VIS 小部件** — 能量流、电池状态、统计面板

---

支持的硬件
| 类别 | 型号 |
|-----------------|--------|
| **混合投资** | SigenStor EC SP/TP、Sigen Hybrid SP/TP/TPLV、Sigen PV M1-HYA、PG 控制器 |
| **光伏投资** | Sigen PV Max SP/TP、Sigen PV M1 |
| **EVAC（交流）** | Sigen EVAC 7/11/22 kW，PG EVAC |

---

## 默认 Modbus 地址
| 设备 | 地址 |
|--------|---------|
| 植物（读/写） | **24/7** |
| 植物广播（写，不回复） | **0** |
| 逆变器 | **1** |
| 交流充电器（EVAC） | **2** |
| PSS（电源站开关） | **5**（默认值，可配置） |
| PID（光伏绝缘检测） | **6**（默认值，可配置） |

---

## 设备类型
自 v2.4.0 版本起，每个适配器实例仅支持一种 Sigenergy 系统类型（严格的二选一）。

请在“组件”选项卡中选择系统类型，或使用“从设备自动检测”功能从硬件读取。

寄存器组的设置遵循官方 Modbus 协议 V2.9 的模型脚注：

|能力|思根存储 |西根混合动力 |思根光伏M1-HYB |仅 PV（PV 最大）|仅限 SigenMicro |
|---|---|---|---|---|---|
| ESS / 电池寄存器 | 始终 | 可选 | 可选 | — | — |
| 直流充电器 | ✓ | ✓ | — | — | — |
| 网格代码 (40051-40068) | ✓ | ✓ | — | — | — |
| ESS 预热 (50000-50183) | — | — | ✓ | — | — |
| PCC功率因数（40157/40158） | — | — | ✓ | — | — |
| 工厂登记册（从属 247） | ✓ | ✓ | ✓ | ✓ | — |
| SigenMicro 微型逆变器 | 可选 | 可选 | 可选 | 可选 | ✓ |

一个 Modbus 端点（IP/总线）对应一个实例。一个带有额外 SigenMicro 微型逆变器的 SigenStor 设备应位于**单个**实例中——微型逆变器是附加组件，而非独立类型。

2.4.0 版本之前的现有配置将自动迁移（派生类型会在启动时记录——请查看“组件”选项卡）。

＃＃ 配置
### 连接选项卡
- **连接类型**：TCP（以太网）或串口（RS485）
- **TCP主机**：逆变器的IP地址
- **TCP端口**：502（默认）
- **工厂 Modbus ID**：247（默认）
- **逆变器 Modbus ID**：1（默认值）

### 组件选项卡
选择已安装的设备：

- 电池/储能系统
- 光伏板
- 交流充电器（EVAC）
- 直流充电器
- PSS（电站开关）
- PID（光伏绝缘检测）
- ESS 预热（仅限 M1-HYA/HYB）
- SigenMicro（微型逆变器）

### 统计标签页
选择要计算的统计值：

- 电池充满电所需时间
剩余电池时间
- 每日充电时间
- 电池续航时间
自用率
自给率

---

## 数据对象
### 植物 (`plant.*`)
| 状态 | 描述 | 单位 |
| `plant.gridActivePower` | 电网功率（>0 进口，<0 出口） | 千瓦 |
| `plant.pvPower` | 光伏发电量 | 千瓦 |
| `plant.essPower` | 电池功率（<0 放电） | 千瓦 |
| `plant.essSoc` | 电池电量 | % |
| `plant.activePower` | 电厂总有功功率 | kW |
| `plant.runningState` | 工厂状态（0=待机，1=运行……） | - |
| `plant.runningState` | 植物状态（0=待机，1=运行中...） | - |

### 逆变器 (`inverter.*`)
| 状态 | 描述 | 单位 |
| `inverter.pvPower` | 逆变器光伏功率 | 千瓦 |
| `inverter.essBatterySoc` | 电池 SOC | % |
| `inverter.essBatterySoh` | 电池健康状态 | % |
| `inverter.essBatteryTemperature` | 电池温度 | °C |
| `inverter.phaseAVoltage` | A相电压 | V |
| `inverter.gridFrequency` | 网格频率 | 赫兹 |
| `inverter.gridFrequency` | 电网频率 | Hz |

### 统计数据 (`statistics.*`)
| 状态 | 描述 | 单位 |
| `statistics.batteryTimeToFull` | 剩余电量（分钟） | 分钟 |
| `statistics.batteryTimeRemaining` | 剩余电量分钟数 | 分钟 |
| `statistics.selfConsumptionRate` | 自用率 | % |
| `statistics.autarkyRate` |自给自足率| % |
| `statistics.housePower` | 计算出的家庭用电量 | 千瓦 |
| `statistics.housePower` | 计算出的家庭用电量 | 千瓦 |

---

## 紧急切换 — 保护外部光伏系统
＃＃＃ 背景
Sigenergy混合逆变器包含一个可选的**应急电源网关**，当市电断电时，该网关会自动切换到离网/孤岛模式。在此模式下，Sigenergy系统会利用电池供电，建立自己的本地交流电网。

如果第二个光伏系统（例如阳台光伏电站、微型逆变器或第三方组串式逆变器）连接到同一家庭电路，它将继续向这个独立的本地电网供电。大多数并网逆变器并非为这种情况设计，可能会出现以下问题：

- 使 Sigenergy 电池管理系统过载
- 导致岛屿电网电压或频率不稳定
- 因异常操作条件而受损

唯一安全的解决方法是，当 Sigenergy 进入离网模式时，**立即断开**外部系统。

### 适配器如何处理此问题
适配器在每个轮询周期内监视 `plant.onOffGridStatus` 状态。

**电网故障时**（`onOffGridStatus` = 1 或 2）：

所有已配置的应急设备立即启动
- 发送 Telegram 通知（可选）

**网格返回时**（`onOffGridStatus` = 0）：

- 启动可配置的稳定性计时器（默认值：10 分钟）
- 如果电网在整个过程中保持稳定，设备即可恢复运行。
- 如果在定时器运行期间电网再次发生故障，则定时器失效，设备保持关闭状态。
- 恢复成功后，会发送 Telegram 通知（可选）

### 启用该功能
**步骤 1 — 组件选项卡** 勾选“紧急网关（离网切换）”。

“紧急切换”选项卡随即显示。

**步骤 2 — 紧急切换选项卡**

#### 设备
| 字段 | 描述 |
|---|---|
| **稳定延迟时间（分钟）** | 电网必须保持稳定多长时间后才能重新启动设备。建议 10 分钟。 |
| **设备 1 — 对象 ID** | 外部系统主交换机的 ioBroker 状态 ID。电网故障时设置为 `false`；稳定恢复后设置为 `true`。 |
| **设备 2–4 — 对象 ID** | 其他可选设备。 |
| **设备 2–4 — 方向** | *故障时关闭，恢复后开启* 或 *故障时开启，恢复后关闭*。 |

#### Telegram 通知（可选）
| 字段 | 描述 |
|---|---|
| **启用 Telegram 通知** | 启用电网故障和恢复通知。 |
| **Telegram 实例** | 选择要使用的 `telegram.x` 适配器实例。 |
| **聊天 ID** | 可选：仅限发送至特定聊天。留空则发送至所有已配置的聊天。 |

### 示例 — 阳台发电厂
Shelly Plus 1 继电器与阳台电源装置的供电电缆串联。其 ioBroker 状态 ID 为 `shelly.0.SHPLUS1-ABC123.Relay0.Switch`。

配置：

- **设备 1**: `shelly.0.SHPLUS1-ABC123.Relay0.Switch`

→ 电网故障时继电器断开（`false`），稳定恢复后闭合（`true`）。

阳台上的发电装置现在已实现自动保护。

---

## VIS 小部件
> **注意：**所有 7 个控件均由单独的 [ioBroker.vis-2-widgets-sigenergy](https://github.com/ssbingo/ioBroker.vis-2-widgets-sigenergy) 适配器提供。请将其与此适配器一起安装，以便在 VIS-2 中使用这些控件。

### 能量流小部件
动画展示了光伏发电→电池↔电网→房屋之间的能量流动。

### 电池状态小部件
显示 SOC 条形图、SOH 徽章、充满/耗尽时间、当前功率。

### 电源概览小部件
实时读取所有四个能量流。

### 统计小部件
今日自给自足、自消耗、SOC 最小值/最大值、电池续航时间。

### 逆变器小部件
逆变器实时数据：光伏功率、电网频率、相电压、温度。

### 交流充电器小部件（EVAC）
Sigen EVAC充电站的状态和功率读数。

### 直流充电器小部件
直流充电器的状态和功率读数。

---

## 通信协议
- Modbus TCP：TCP 模式，全双工，端口 502（从站）
- Modbus RTU：半双工，9600 bps，8N1
- 最小轮询间隔：1000 毫秒（1 秒），符合 Sigenergy 规范
- 超时时间：根据 Sigenergy 规范，为 1000 毫秒

---

## 文档
- 🇩🇪 [德国文档](doc/de/README.md)
- 🇷🇺 [Документация на русском](doc/ru/README.md)
- 🇳🇱 [荷兰文档](doc/nl/README.md)
- 🇫🇷 [法语文档](doc/fr/README.md)
- 🇮🇹 [意大利文档](doc/it/README.md)
- 🇪🇸 [西班牙语文档](doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](doc/pl/README.md)
- 🇵🇹 [葡萄牙语文档](doc/pt/README.md)
- 🇺🇦 [Документація українською](doc/uk/README.md)
- 🇨🇳 [简体中文文档](doc/zh-cn/README.md)

## Changelog

### 3.0.10 (2026-06-29)
- (ssbingo) chore: bump js-yaml from 4.1.1 to 4.3.0

### 3.0.9 (2026-06-29)
- (ssbingo) chore: pin CI actions to major version (@v1) instead of patch version

### 3.0.8 (2026-06-29)
- (ssbingo) fix: add missing i18n translations for SigenMicro scan UI strings (es, fr, it, nl, pl, pt, uk, zh-cn)

### 3.0.7 (2026-06-28)
- (ssbingo) chore: update dependencies (@iobroker/adapter-core 3.4.1, @types/node 22.20.0, testing-action-adapter 1.1.1, testing-action-deploy 1.5.0, http-proxy-middleware 3.0.7)

### 3.0.6 (2026-06-14)
- (ssbingo) fix: remove duplicate common.license field — licenseInformation already present

### 3.0.5 (2026-06-14)
- (ssbingo) fix: add missing license field to io-package.json common block

### 3.0.4 (2026-06-14)
- (ssbingo) fix: emergency Telegram notification now sent only once per grid-failure event (not repeated every poll); device switching limited to 3 attempts max (initial + 2 retries) while off-grid

### 3.0.3 (2026-06-13)
- (ssbingo) fix: remove non-functional welcomeText from io-package.json; add visible warning staticText in Emergency Switching config tab (yellow box, i18n in all 11 languages)

### 3.0.2 (2026-06-13)
- (ssbingo) fix: ESLint/Prettier errors in emergency switching methods — remove unused variable, fix indentation, add JSDoc @param types

### 3.0.1 (2026-06-13)
- (ssbingo) feat: add welcomeText to io-package.json — multilingual notice about emergency gateway switching feature

### 3.0.0 (2026-06-13)
- (ssbingo) feat: emergency gateway switching — automatic disconnection of external PV systems (balcony power plants, micro-inverters) on grid failure; configurable stability timer on grid return; optional Telegram notifications
- (ssbingo) docs: emergency switching documentation added in all 11 languages

### 2.5.2 (2026-06-12)
- (ssbingo) fix: URL-encode spaces in Buy Me a Coffee button src — image was not rendering on GitHub

### 2.5.1 (2026-06-12)
- (ssbingo) fix: correct instanceObject role for info.modelType from 'info.name' to 'text' (W1133/W1135 adapter-checker warnings)

### 2.5.0 (2026-06-12)

- (ssbingo) Architectural write safety: Modbus writes are rejected in the write dispatcher itself when the target register is not valid for the configured device type (models gating in onStateChange, plant guard for SigenMicro-only)
- (ssbingo) TypeScript type check fixed — new `lib/adapter-config.d.ts` with full AdapterConfig declaration, typed modbus-serial constructor, ioBroker.CommonType/SettableObject annotations; new `npm run check` script passes with 0 errors
- (ssbingo) ESLint configuration allows JSDoc `@type` tags in this checked-JavaScript project (jsdoc/check-tag-names with typed:false)

### 2.4.0 (2026-06-12)

- (ssbingo) Device type architecture: mandatory selector (SigenStor / Sigen Hybrid / Sigen PV M1-HYB / PV-only inverter / SigenMicro-only) with strict either/or register gating per protocol V2.9 model footnotes
- (ssbingo) Sigen Hybrid and PV-only inverters (Sigen PV / PV Max) officially supported
- (ssbingo) Auto-detect device type from hardware in the admin UI (registers 30500 / 31024)
- (ssbingo) Model verification on startup — warns when configuration and detected hardware mismatch (new state info.modelType)
- (ssbingo) Dynamic PV string registers: PV5-PV16 voltage/current enabled by the string count reported in register 31025
- (ssbingo) PCC power factor controls (40157/40158) gated to Sigen PV M1-HYB; ESS preheating gated to M1-HYB; DC charger and grid code gated to SigenStor/Sigen Hybrid
- (ssbingo) Automatic migration of pre-2.4.0 configurations and cleanup of channels that are invalid for the selected device type

### 2.3.4 (2026-06-12)
- (ssbingo) fix: correct protocol level detection — use proper register quantities for probes, descend from V2.9 to V2.6, distinguish transport errors from device exceptions to avoid false pre-V2.6 report

### 2.3.3 (2026-06-11)
- (ssbingo) fix: suppress repeated register read warnings after first occurrence for plant/inverter/acCharger/dcCharger/pss/pid; subsequent failures log at debug level only

### 2.3.2 (2026-06-10)
- (ssbingo) fix: show 'pre-V2.6' instead of 'unknown' when device responds but has no extended plant registers; add per-probe debug log with Modbus exception message

### 2.3.1 (2026-06-10)
- (ssbingo) feat: detect Modbus protocol level on startup by probing registers 30088/30200/30228/30286; read firmware version (30525); log result and store as info.protocolLevel state

### 2.3.0 (2026-06-10)
- (ssbingo) feat: add common.states enum maps for emsWorkMode/runningState/remoteEmsMode/dcCharger.runningState; wire PSS/PID/AC Charger write registers (FC06/FC10) with subscribe and onStateChange handlers

### 2.2.7 (2026-06-10)
- (ssbingo) fix: add missing native defaults enableSmartLoads/enableCumulativeEnergy/enableGridCode to io-package.json
- (ssbingo) fix: update register 30003 desc with V2.7 EMS modes 5 (FullFeedIn) and 9 (Custom)

### 2.2.6 (2026-06-10)
- (ssbingo) feat: V2.9 register audit — add missing register 30279 (current control command value), move DC Charger PV registers 31509/31511 to dcCharger namespace, fix ESS Preheating TOU time gain (null→1)
- (ssbingo) feat: implement control write-back for plant.control.*, plant.gridCode.*, inverter.control.*, dcCharger.control.* (FC06/FC10); read RW holding registers on startup
- (ssbingo) fix: suppress repeated ESS Preheating warn after device reports unsupported registers; downgrade control register startup read errors to debug

### 2.2.4 (2026-06-10)
- (ssbingo) fix: implement ESS Preheating TOU polling (FC03, 50000–50183, 94 registers) and write-back via onStateChange; add encodeValue to ModbusConnection

### 2.2.3 (2026-06-10)
- (ssbingo) fix: add 25 missing admin i18n keys for PSS, PID, ESS Preheating, Extended Registers across all 11 languages

### 2.2.2 (2026-06-09)
- (ssbingo) docs: update all READMEs to Modbus Protocol V2.9 — add PSS, PID, ESS Preheating, Extended Registers, SigenMicro; correct protocol version reference

### 2.2.1 (2026-06-09)
- (ssbingo) fix: correct PSS register table to 122 entries per official spec V2.9 (addresses, gains, types); fix PSS write registers to 6 WO entries; fix PID registers 33055-33060 (types, gains, 2 missing entries)

### 2.2.0 (2026-06-09)
- (ssbingo) feat: PSS (Power Station Switch) and PID (PV Insulation Detection) support; ESS Preheating TOU schedule registers; new admin options for PSS/PID slave IDs

### 2.1.1 (2026-06-09)
- (ssbingo) fix: wire feature flags (enableSmartLoads, enableCumulativeEnergy, enableGridCode) into polling and object creation; add Extended Registers admin tab

### 2.1.0 (2026-06-09)
- (ssbingo) feat: extended statistics — plant statistics (30088–30097), smart loads 1–24 (30098–30193), cumulative energy (30194–30271), adjustment feedback (30613–30619), grid code parameters (40049–40068)

### 2.0.0 (2026-06-09)
- (ssbingo) feat: Modbus Protocol V2.9 — new plant/inverter/DC charger registers, remove deprecated registers, extend enums


---

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