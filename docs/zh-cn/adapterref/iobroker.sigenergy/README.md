---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sigenergy/README.md
title: ioBroker Sigenergy 适配器
hash: T33yFfhPpFE1SZDVmbMc42UIXeEGY6UuQvHlqA7YqvA=
---
# IoBroker Sigenergy 适配器

![NPM 版本](https://img.shields.io/npm/v/iobroker.sigenergy.svg)
![许可证：MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**通过 Modbus TCP/RTU 连接 Sigenergy 太阳能系统的适配器**

支持 Sigenergy Modbus 协议 V2.5（发布于 2025 年 2 月 19 日）。

---

＃＃ 特征
- 📡 **Modbus TCP**（以太网/WLAN/光纤/4G）— 端口 502
- 🔗 **Modbus RTU**（RS485 串口）
- ⚡ **完全寄存器支持** — 所有工厂和逆变器寄存器均符合 V2.5 规范
- 🔋 **电池统计信息** — 充满电所需时间、剩余使用时间、每日覆盖率
- ☀️ **光伏统计数据** — 自用率、自给率
- 🔌 **交流充电器**（Sigen EVAC）— 可选
- ⚡ **直流充电器** — 可选
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

---

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
直流充电器

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

### 1.9.9 (2026-05-14)
- (ssbingo) chore: dependency bumps via Dependabot: protobufjs, @protobufjs/utf8, fast-uri
- (ssbingo) chore: requires Node.js >= 22 now

### 1.9.8 (2026-04-22)
- (ssbingo) fix: deduplicated connection/poll error logs to prevent log flooding and improve Sentry-readiness
- (ssbingo) fix: shutdown guards and extendForeignObject prevent race conditions on unload and with admin UI
- (ssbingo) fix: closed socket leak on Modbus timeout; testConnection pauses polling; removed empty control channels

### 1.9.7 (2026-04-16)
- (ssbingo) feat: added calculated states plant.pv1Power, plant.pv2Power, plant.pv3Power


### 1.9.6 (2026-04-16)
- (ssbingo) feat: added calculated states plant.pv1Power, plant.pv2Power, plant.pv3Power


### 1.9.5 (2026-04-08)
- (ssbingo) fix: removed unused common.schedule from io-package.json

### 1.9.4 (2026-04-08)
- (ssbingo) fix: Changelog / adding CHANGELOG_OLD.md

### 1.9.3 (2026-04-08)
- (ssbingo) fix remove admin/index.html

### 1.9.2 (2026-04-08)
- (ssbingo) fixes

### 1.9.1 (2026-04-08)
- (ssbingo) Fixed admin UI: removed legacy index.html/index_m.html/words.js; fixed jsonData type in jsonConfig sendTo buttons

### 1.9.0 (2026-03-26)
- (ssbingo) Test abgeschlossen

### 1.8.23 (2026-03-26)
- (ssbingo) Fixed copyright year to 2026 in LICENSE and README; technical corrections: CI/CD workflow, linting, tests

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