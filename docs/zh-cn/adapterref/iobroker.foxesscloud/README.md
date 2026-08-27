---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.foxesscloud/README.md
title: FoxESS Cloud 的 ioBroker 适配器
hash: j3tAwn9sZsaTptBNbAboNgwf1PDEDs9is5loNQ1Gvcw=
---
![标识](../../../en/adapterref/iobroker.foxesscloud/admin/foxesscloud-logo.png)

![安装数量](https://iobroker.live/badges/foxesscloud-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/foxesscloud-stable.svg)
![NPM 版本](https://nodei.co/npm/iobroker.foxesscloud.svg?style=shields&data=v,u,d&color=orange)
![下载](https://img.shields.io/npm/dm/iobroker.foxesscloud.svg)
![社区](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![维护者](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![人工智能](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# FoxESS Cloud 的 ioBroker 适配器
---

## 此适配器的功能
从 FoxESS Cloud API 获取太阳能逆变器（例如，Enpal 系统中使用的逆变器）的数据，并公开 ioBroker 状态以用于家庭自动化：

- 监测太阳能发电量
- 跟踪电池电量状态 (SoC)
- 分析电网消耗和馈入功率
- 基于发电量的自动化
- 在ioBroker仪表盘中可视化能量流

＃＃ 特征
### 功率值
- **`pvPower`**：当前光伏发电量（千瓦）
- **`pv1Power` … `pv24Power`**：单个光伏组串的功率（kW）——仅自动创建设备上存在的组串。
- **`generationPower`**: 总发电/输出功率 (kW)
- **`负载`**：当前负载/消耗功率（千瓦）
- **`gridConsumption`**: 从电网输入的功率 (kW)
- **`feedinPower`**：输出到电网的功率（千瓦）

＃＃＃ 电池
- **`soc`**：电池剩余电量 (%)
- **`batCharge`**：电池充电功率（kW）
- **`batDischarge`**：电池放电功率（kW）
- **`batTemperature`**：电池温度（°C）— 当设备报告该值时自动创建

### 温度和状态
- **`invTemperature`**：逆变器内部温度（°C）— 当设备报告温度值时自动创建；当温度≥65°C和≥80°C时，会在日志中发出警告。
- **`runningState`**: 当前逆变器运行状态（字符串）

### 连接状态
- **`info.connection`**: 连接状态

### 能源报告（可选）
在“报告”选项卡中启用后，适配器会根据 API 返回的生命周期累计值计算周期总计：

- **`report.day.*`**: 今日发电量、上网电价和电网消耗量（千瓦时）
- **`report.week.*`**: 本周总计 (kWh)
- **`report.month.*`**: 本月总计 (kWh)
- **`report.year.*`**: 今年的总计（千瓦时）

### 光伏发电JSON统计信息（可选）
在“统计信息”选项卡中启用后，适配器会跟踪累积的 PV 能量，并发布 JSON 表格以供 VIS 仪表板使用 — 请参阅下面的 [适用于 VIS 仪表板的光伏发电 JSON 统计数据](#pv-power-json-statistics-for-vis-dashboards)。

### API 速率限制（开放 API）
[FoxESS 开放 API](https://www.foxesscloud.com/public/i18n/en/OpenApiDocument.html) 允许每个 API 密钥每天调用 1440 次（而非每个适配器实例）。在 FoxESS **应用程序** 或 **Web 门户** 中的使用不计入此 Open API 配额。

| 设置 | 每日 API 调用次数（24 小时） |
|-------|--------------------------|
| 1 个实例，间隔 60 秒 | 1440（已满配额） |
| 2 个实例 @ 60 秒（同一 API 密钥） | ~2880 → 限制通常在 12 小时后超出 |
| 1 次，间隔 120 秒 | 720 |

按照建议的 **60 秒** 间隔，单个实例将使用全部每日配额（1440 分钟 = 24 小时）。

**重要提示：**所有使用同一 API 密钥的 Open API 客户端共享一个配额——例如多个 ioBroker 实例、Home Assistant 集成或脚本。超出限制可能会导致间歇性 API 错误（例如 `40400`、`40402`）。请在 FoxESS 门户的“配置文件 → API 管理”下查看剩余调用次数。

对于额外的逆变器，请为每个设备创建一个适配器实例（每个实例一个序列号），并相应地规划轮询间隔，或者如果您的帐户允许，可以使用单独的 API 密钥。

## 数据点
适配器会创建以下数据点：

### 实时电力（持续产生）
- `foxesscloud.0.pvPower` - 光伏发电功率 (kW)
- `foxesscloud.0.generationPower` - 发电功率/输出功率 (kW)
- `foxesscloud.0.soc` - 电池电量 (%)
- `foxesscloud.0.load` - 负载功率 (kW)
- `foxesscloud.0.gridConsumption` - 电网消耗/进口 (kW)
- `foxesscloud.0.feedinPower` - 馈入/输出功率 (kW)
- `foxesscloud.0.batCharge` - 电池充电功率 (kW)
- `foxesscloud.0.batDischarge` - 电池放电功率 (kW)
- `foxesscloud.0.runningState` - 逆变器运行状态
- `foxesscloud.0.info.connection` - 连接状态

### 动态（仅在第一个非空值时创建）
- `foxesscloud.0.pv1Power` … `foxesscloud.0.pv24Power` - 光伏组串 1–24 功率 (kW)
- `foxesscloud.0.invTemperature` - 逆变器内部温度 (°C)
- `foxesscloud.0.batTemperature` - 电池温度（摄氏度）

### 能源报告（如果在“报告”选项卡中启用）
- `foxesscloud.0.report.day.generation` - 今日光伏发电量 (kWh)
- `foxesscloud.0.report.day.feedin` - 今日上网电价 (kWh)
- `foxesscloud.0.report.day.gridConsumption` - 今日电网消耗量 (kWh)
- `foxesscloud.0.report.week.generation` - 本周光伏发电量 (kWh)
- `foxesscloud.0.report.week.feedin` - 本周上网电价 (kWh)
- `foxesscloud.0.report.week.gridConsumption` - 本周电网用电量 (kWh)
- `foxesscloud.0.report.month.generation` - 本月光伏发电量 (kWh)
- `foxesscloud.0.report.month.feedin` - 本月上网电价 (kWh)
- `foxesscloud.0.report.month.gridConsumption` - 本月电网用电量 (kWh)
- `foxesscloud.0.report.year.generation` - 今年的光伏发电量（千瓦时）
- `foxesscloud.0.report.year.feedin` - 今年的上网电价 (kWh)
- `foxesscloud.0.report.year.gridConsumption` - 本年度电网消耗量（千瓦时）

### 光伏发电JSON统计信息（如果在“统计信息”选项卡中启用）
- `foxesscloud.0.pvPowerJSON.daily` - 每日能源统计数据（JSON 格式） - 本周从周一到周日
- `foxesscloud.0.pvPowerJSON.weekly` - 每周能源统计数据（JSON 格式） - 包含当月所有周的数据
- `foxesscloud.0.pvPowerJSON.monthly` - 月度能源统计数据（JSON 格式） - 涵盖本年度所有 12 个月

＃＃ 安装
1. 从 ioBroker 管理界面安装适配器
2. 创建一个新实例
3. 配置“常规”选项卡：
- **API令牌**：您从FoxESS云门户获得的API密钥
- **序列号 (SN)**：逆变器的序列号。
- **更新间隔**：数据刷新间隔，单位为秒（默认值：60，最小值：60）
4. （可选）配置**统计信息**选项卡：
- **启用光伏发电JSON生成**：激活VIS组件的JSON表格生成功能
- **每日统计**：生成本周（周一至周日）的每日能源数据
- **每周统计数据**：生成当月所有周的每周能源数据
- **月度统计数据**：生成本年度所有 12 个月的月度能源数据
- **每千瓦时价格**：可选 — 输入您的每千瓦时电价，以便在 JSON 表格中进行成本计算。
- **每日/每周/每月初始值**：如果适配器在生产开始后启用，则可设置运行周期的初始千瓦时值（可选）。
5. （可选）配置**报告**选项卡：
- **启用能源报告**：激活基于周期的能源报告（日/周/月/年）
6. 保存并启动实例

### 如何获取您的 API 凭证
1. 登录 [FoxESS Cloud](https://www.foxesscloud.com)
2. 前往您的个人资料/设置
3. 生成 API 密钥（令牌）
4. 在设备列表中查找逆变器序列号

## 用于 VIS 仪表板的光伏发电 JSON 统计数据
在配置中启用后，适配器会生成包含能源统计信息的 JSON 表格，这些表格可以使用诸如 **inventwo JSON Widget** 之类的控件在 ioBroker VIS 中显示。

### JSON 格式
JSON 表格包含能量数据，其结构如下：

```json
[
  {"date": "Monday", "value": "1.904", "price": "0.58"},
  {"date": "Tuesday", "value": "4.653", "price": "1.42"},
   {"date": "Wednesday", "value": "0.417", "price": "0.13"},
   {"date": "Thursday", "value": "0", "price": "0"},
   {"date": "Friday", "value": "0", "price": "0"},
   {"date": "Saturday", "value": "0", "price": "0"},
   {"date": "Sunday", "value": "0", "price": "0"},
  {"date": "Total", "value": "6.843", "price": "2.09"}
]
```

- **日期**：星期名称（本地化）、周数（KW XX）或月份名称
- **数值**：发电量，单位为千瓦时（保留三位小数）
- **价格**：以欧元为单位的成本（仅当配置了每千瓦时价格时，保留两位小数）

### 数据收集
- **每日显示**：显示当前一周的日历，从星期一到星期日，并实时更新当天信息。
- **每周**：累计每周数据（周一至周日），显示当月所有周的数据，包括当前周。
- **月度**：累计每月数据（1 日至 12 月 31 日），显示当年所有 12 个月的数据，包括当前月份。

如果在生产环境运行期间启用适配器，您可以配置当前日期、当前周和当前月份的可选起始值。这些值会在相应运行周期开始时添加一次。

日期标签（日/周/月名称）的语言会自动适应您的ioBroker系统语言：

- **德语** (de)：Montag、Dienstag、January、Februar 等。
- **English** (en): Monday, Tuesday, Januar, Februar, etc.

### 与 VIS 一起使用
1. 在适配器配置中启用光伏发电 JSON 生成
2. 将 JSON 小部件添加到您的 VIS 仪表板
3. 将小部件绑定到以下状态之一：
- `foxesscloud.0.pvPowerJSON.daily` 用于每日统计数据
- `foxesscloud.0.pvPowerJSON.weekly` 用于获取每周统计数据
- `foxesscloud.0.pvPowerJSON.monthly` 用于获取月度统计数据
4. 配置小部件以表格形式显示能源/价格数据

## 能源报告
在“报告”选项卡中启用“启用能源报告”后，适配器会根据 FoxESS 云 API 返回的生命周期累计值计算周期总计（日/周/月/年）。无需额外的 API 调用——这些值会叠加在常规的实时查询中。

### 工作原理
每次轮询时，适配器都会从 API 读取三个生命周期值：

- “发电量”——自安装以来产生的总能量（千瓦时）
- `feedin` — 自安装以来输送到电网的总能量 (kWh)
- `gridConsumption` — 自安装以来从电网消耗的总能量 (kWh)

在每个周期开始时（新的一天/新的 ISO 周/新的日历月/新的一年），当前生命周期值被存储为基线。报告的状态值始终为 `current lifetime value − baseline`。

基线数据保存在 `report._baselines` 中，因此即使适配器重启，基线数据也能保留下来。

### 报告州
| 状态 | 描述 |
|-------|-------------|
| `foxesscloud.0.report.day.generation` | 今日光伏发电量 (kWh) |
| `foxesscloud.0.report.day.gridConsumption` | 今日电网消耗电量 (kWh) |
| `foxesscloud.0.report.week.generation` | 本周 ISO 光伏发电量 (kWh) |
| `foxesscloud.0.report.week.feedin` | 本周 ISO 上网电价 (kWh) |
| `foxesscloud.0.report.week.gridConsumption` | 本周电网消耗量（千瓦时） |
| `foxesscloud.0.report.month.generation` | 本月光伏发电量（千瓦时） |
| `foxesscloud.0.report.month.feedin` | 本月上网电价 (kWh) |
| `foxesscloud.0.report.month.gridConsumption` | 本月电网用电量 (kWh) |
| `foxesscloud.0.report.year.generation` | 今年光伏发电量（千瓦时） |
| `foxesscloud.0.report.year.feedin` | 今年上网电价 (kWh) |
| `foxesscloud.0.report.year.gridConsumption` | 今年电网消耗量（千瓦时） |
| `foxesscloud.0.report.year.gridConsumption` | 今年电网消耗量（千瓦时） |

## 隐私与数据处理
此适配器仅使用您的个人 API 令牌从 **FoxESS Cloud API** 读取数据。
您的 API 令牌以加密形式存储在 ioBroker 数据库中。

## 较早的更改
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.6.4 (2026-06-10)
- (skvarel) Added meta object types for adapter and instance namespace

### 0.6.3 (2026-06-05)
- (skvarel) Fixed repository checker error E0036

### 0.6.2 (2026-06-02)
- (skvarel) Documented Open API rate limit (per API key, multiple instances) in README and admin General tab
- (skvarel) Migrated project rules from GitHub Copilot to Cursor rules

### 0.6.1 (2026-05-29)
- (skvarel) Revised config and i18n

### 0.6.0 (2026-05-27)
- (StephanBeutel) Added support for up to 24 PV strings with dynamic state creation on first occurrence
- (StephanBeutel) Added report states for daily, weekly, monthly, and yearly energy totals derived from lifetime API values
- (StephanBeutel) Fixed null value handling for inverter and battery temperature states
- (StephanBeutel) Extracted reusable makeApiRequest() method for cleaner API communication
- (StephanBeutel) Centralized all state name translations into a single STATE_NAMES constant
- (skvarel) Fixed report states not updating during current period (values were only written at period rollover)
- (skvarel) Made energy reporting configurable via a new Reporting tab in the admin UI

## License

MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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