---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-tibberlink/README.md
title: ioBroker.vis-2-widgets-tibberlink
hash: X6Db+uWN+Bz9V0ZoKn1m9nOnxIoH2alS7CFXEzJb6iI=
---
![标识](../../../en/adapterref/iobroker.vis-2-widgets-tibberlink/admin/vis-2-widgets-tibberlink.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)
![安装数量](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)
![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-tibberlink.png?downloads=true)

# IoBroker.vis-2-widgets-tibberlink
**测试：** ![测试与发布](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 vis-2-widgets-tibberlink 适配器
VIS-2 小部件用于可视化 Tibber 动态电价数据：当前价格、最便宜的时间窗口和月度费用。

有关 Tibber 及其动态资费的更多信息：<https://tibber.com/>

## 先决条件
此组件适配器**不**从 Tibber 本身获取任何数据。它读取由数据适配器 [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink) 创建的状态。在使用这些组件之前，请安装并配置 `tibberlink`：

1. 安装 `iobroker.tibberlink` 并输入您的 Tibber API 令牌（来自 <https://developer.tibber.com/settings/accesstoken>）。
2. 在 tibberlink 设置中，启用“历史消费数据检索”，并将每日数据集计数设置为至少 31（小部件 3 需要此设置）。
3. 一旦 tibberlink 运行，价格小部件（小部件 1 和 2）就会自动工作——不需要计算器通道。

您的 **Home ID** 是 ioBroker 对象树中 `tibberlink.0.Homes.<UUID>` 下的可见 UUID，例如 `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`。

## 小部件
### 小部件 1 — 当前 Tibber 价格
![当前 Tibber 价格](../../../en/adapterref/iobroker.vis-2-widgets-tibberlink/docs/img/vis-2-widget-Strompreis.png)

以大字显示当前电价，颜色编码的等级徽章（非常便宜……非常昂贵），有效期，以及可选的费用明细。

| 选项 | 默认值 | 描述 |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | 总价（欧元/千瓦时） |
| `oid_tax` | `…CurrentPrice.tax` | 税费/附加费（欧元/千瓦时） |
| `oid_level` | `…CurrentPrice.level` | 价格水平字符串 |
| `oid_startsAt` | `…CurrentPrice.startsAt` | 当前小时的 ISO 时间戳 |
| `show_breakdown` | `true` | 显示能源和税收板块 |
| `currency` | `ct/kWh` | 价格后显示单位标签 |
| `tib_darkmode` | `true` | 深色（默认）或浅色主题 |
| `tib_darkmode` | `true` | 深色（默认）或浅色主题 |

---

### 小部件 2 — 最便宜的时间窗口
![最便宜的时间窗口](../../../en/adapterref/iobroker.vis-2-widgets-tibberlink/docs/img/vis-2-widget-Cheapest-Window.png)

使用滑动窗口算法，从今天（以及可选的明天）的价格数据中查找最便宜的连续 N 小时时段。显示开始和结束时间、平均价格以及彩色迷你柱状图。时段时长（15 分钟/60 分钟）自动检测。

| 选项 | 默认值 | 描述 |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | 今日价格区间的 JSON 数组 |
| `amount_hours` | `3` | 窗口大小（小时） |
| `future_only` | `true` | 忽略已结束的时段 |
| `show_tomorrow` | `true` | 包含明日价格 |
| `tib_darkmode` | `true` | 深色（默认）或浅色主题 |
| `tib_darkmode` | `true` | 深色（默认）或浅色主题 |

---

### 小部件 3 — 实时功耗
以大字体实时显示功率消耗，同时显示最小值、平均值和最大值，以及每日累计消耗量和费用。需要将 **Tibber Pulse** 设备连接到您的电表。

| 选项 | 默认值 | 描述 |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | 当前功率（单位：瓦特） |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | 会话平均功率（瓦特） |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | 会话最大值（单位：W） |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | 日耗电量（千瓦时） |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | 每日费用（欧元） |
| `tib_darkmode` | `true` | 深色（默认）或浅色主题 |
| `tib_darkmode` | `true` | 深色（默认）或浅色主题 |

---

### 小部件 4 — 每月电费
![每月电费](../../../en/adapterref/iobroker.vis-2-widgets-tibberlink/docs/img/vis-2-widget-Monatskosten.png)

汇总 tibberlink `jsonDaily` 当前日历月的消费数据。显示总成本、总消费量、平均价格、月末预测以及指示当前月份进度的进度条。需要 tibberlink 中启用“历史消费数据检索”功能，且每日数据集数量至少为 31。

| 选项 | 默认值 | 描述 |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | 每日消费记录的 JSON 数组 |
| `show_base_fee` | `false` | 将固定月基本费用加到总计中 |
| `base_fee_per_month` | `0` | 基本费用（欧元）（当 `show_base_fee` 启用时使用） |
| `tib_darkmode` | `true` | 深色（默认）或浅色主题 |
| `tib_darkmode` | `true` | 深色（默认）或浅色主题 |

## 文档
- 🇬🇧 英语 — 此文件
- 🇩🇪 [德语](docs/de/README.md)
- 🇷🇺 [Русский](docs/ru/README.md)
- 🇳🇱 [荷兰语](docs/nl/README.md)
- 🇫🇷 [法语](docs/fr/README.md)
- 🇮🇹 [意大利语](docs/it/README.md)
- 🇪🇸 [西班牙语](docs/es/README.md)
- 🇵🇱 [波兰语](docs/pl/README.md)
- 🇵🇹 [葡萄牙语](docs/pt/README.md)
- 🇺🇦 [Українська](docs/uk/README.md)
- 🇨🇳 [简体中文](docs/zh-cn/README.md)

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 0.4.5 (2026-04-29)
* (ssbingo) Fix common.news to remove unpublished versions; fix Dependabot config for src-widgets

### 0.4.4 (2026-04-29)
* (ssbingo) Fix widget build output directory so vis-2 can load customWidgets.js from the correct path

### 0.4.3 (2026-04-29)
* (ssbingo) Add widget screenshots to documentation

### 0.4.2 (2026-04-29)
* (ssbingo) Fix widget file path so vis-2 can load customWidgets.js correctly

### 0.4.1 (2026-04-29)
* (ssbingo) Fix live view widget positioning; fix monthly cost widget showing previous month instead of current month

### 0.4.0 (2026-04-28)
* (ssbingo) Migrate all widgets to React/Module Federation (proper install/uninstall lifecycle, no more widgets.html patching)

### 0.3.3 (2026-04-26)
* (ssbingo) Update documentation

### 0.3.2 (2026-04-26)
* (ssbingo) Widget 2: replace price chart with TibberCheapestWindow (cheapest N-hour sliding window with sparkline)

### 0.3.1 (2026-04-25)
* (ssbingo) Widget 1: rename oid_price→oid_total, add oid_startsAt, show_breakdown and currency options

### 0.3.0 (2026-04-24)
* (ssbingo) New widget: monthly electricity cost with consumption, avg. price and projection

Older changelog entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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