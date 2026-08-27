---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.octopus-energy-monitor/README.md
title: ioBroker.octopus-energy-monitor
hash: +aJKE9pPuMhjqjVldd28gNg+XCFGxx5L6Uun+iIIH6w=
---
![标识](../../../en/adapterref/iobroker.octopus-energy-monitor/admin/octopus-energy-monitor.svg?v=3)

![NPM 版本](https://img.shields.io/npm/v/iobroker.octopus-energy-monitor.svg)
![下载](https://img.shields.io/npm/dm/iobroker.octopus-energy-monitor.svg)
![安装数量](https://iobroker.live/badges/octopus-energy-monitor-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/octopus-energy-monitor-stable.svg)
![NPM](https://nodei.co/npm/iobroker.octopus-energy-monitor.png?downloads=true)

# IoBroker.octopus-energy-monitor
**测试：** ![测试与发布](https://github.com/tipp88/ioBroker.octopus-energy-monitor/workflows/Test%20and%20Release/badge.svg)

## IoBroker.octopus-energy-monitor
**Octopus Energy Monitor** 适配器会定期从 **[Octopus Energy](https://octopus.energy) (Kraken API)** 和 **[Inexogy](https://www.inexogy.com) (Discovergy/Statistics API)** 获取每日用电量数据，并自动将其保存到您的 ioBroker 对象树中。

它的主要用途是识别您的智能电表（Inexogy）和能源供应商（Octopus Energy）之间计费/计量数据的差异。每天晚上，适配器都会比较两组数据，并通过数学方法标记出超过预设阈值的每日差异。

### 🌟 功能
* **完全支持 Kraken GraphQL：** 通过 Octopus JWT 令牌进行身份验证，并动态解析帐户属性以获取精确的消费数据。
* **动态资费及时段支持：** 自动检测您当前使用的八达通资费套餐（例如，八达通智能通）及其具体的使用时段。无需手动配置“八达通”时段！
* **自动成本计算：**根据您的实际电价，自动计算每日、每月和每年的能源成本（以欧元 (€) 为单位）。
* **层级历史：** 将数据结构化为清晰的 `history.YYYY.MM.DD` 树，并自动汇总月份和年份的消费和成本。
* **估算电表读数：** 通过将最新的 Kraken 官方读数与您随后的每日用电量相结合，计算您当前的电表读数。
* **Inexogy（Discovergy）比较：**利用 Inexogy API 将消费数据与您的提供商的数据进行比较，帮助识别账单差异。
* **主数据洞察：** 提供账户余额、计量详情和相关网络运营商 (MOP/DNO) 的透明度。
* **智能充电控制：** 动态获取智能八爪鱼设备（电动汽车/充电器），并直接从 ioBroker 切换智能充电（暂停/恢复）。
* **Inexogy 主数据和实时读数：** 从 Inexogy 获取序列号、位置详细信息和当前仪表读数（Bezug/Einspeisung）。
* **智能缓存：**通过仅追溯同步缺失的数据点（默认 30 天）来最大限度地减少 API 负载。
* **§14a EnWG 价格计算：** 可控消费设备（Steuerbare Verbrauchseinrichtung）的可选关税计算，具有自定义时间窗口（NT/HT）和自动标准关税（ST）回退。
* **自定义计费周期：** 根据您自定义的计费周期开始日期（例如，18 日至 17 日）在 `octopus.periods` 通道下汇总和跟踪能源消耗和成本，并按标准费率档位（例如，Go/Standard）拆分，使用静态的 `current` 文件夹以便于可视化。
* **数据库历史同步：**原生后端集成 InfluxDB、SQL 和历史适配器，可直接推送和回填原始的 15 分钟消费间隔，而不会使 ioBroker 对象树膨胀。

---

### ⚙️ 安装
要将此适配器安装到您的 ioBroker 环境中：

1. 打开您的 ioBroker 管理界面。
2. 导航至“适配器”选项卡。
3. 搜索“章鱼能量监测器”（或“octopus-energy-monitor”）。
4. 点击适配器旁边的**+**（添加）按钮，创建一个新实例。

---

### 🔧 配置
1. **章鱼能量（克拉肯）：**
- 输入您的 Octopus 标准登录凭据（电子邮件和密码）。
- 输入您的账号（通常以“A-”开头）。
- **计费周期起始日：** 您的计费周期开始的日期（默认值为“1”，代表自然月）。如果您的周期是从一个月的18号到下个月的17号，请选择“18”以在“octopus.periods.<startDate>”下生成计费周期文件夹，并创建一个静态别名“octopus.periods.current”，其中包含槽位拆分指标。

2. **非同源性：**
- 输入您的 Inexogy 门户网站邮箱和密码。适配器会自动处理基本身份验证解析，并将其转换为 Discovergy API 查询。

3. **常规设置：**
- **差异阈值：** 定义 Octopus 和 Inexogy 之间必须存在多少 `kWh` 的差异才能触发 `hasDiscrepancy: true` 状态标志。默认值为 `0.1 kWh`。

4. **§14a EnWG 设置（可选）：**
- **启用 § 14a EnWG 计算：** 如果激活，则计算每日能源价格时会考虑可控消费设备的电网费用降低。
- **适用起始日期（YYYY-MM-DD）：** 定义 EnWG 计算的起始日期。更改此日期（或网格费用/时间窗口）将触发所有历史数据的自动追溯重新计算。
- **电网费用：** 输入您当地的 NT、HT 和 ST 电网费用。使用复选框指定输入值是总额（含 19% 增值税）还是净额。
- **配置时间段：**定义您每月本地的 NT（低资费）和 HT（高资费）时段。未定义的时段将自动回退到 ST（标准资费）。同一月份内，不同时段不得重叠。
6. **历史数据库同步（可选）：**
- **启用数据库同步：** 选择目标 ioBroker 历史适配器（例如 InfluxDB）。该适配器将自动注册 15 分钟的状态，并将原始间隔数据点追溯推送到所选数据库中。

配置完成后，适配器会自动处理其余工作！它会根据配置的更新间隔定期同步最近 30 天的数据。数据位于 `octopus-energy-monitor.0.history.YYYY.MM.DD` 路径下。

## Changelog
### 0.7.0 (2026-07-13)
* (tipp88) Implemented native historical database synchronization to automatically push 15-minute intervals directly to InfluxDB, SQL, or History instances.
* (tipp88) Massively optimized Inexogy retroactive API polling by switching to the Discovergy `readings` endpoint, fetching 96 data points in a single request.
* (tipp88) Fixed strict ioBroker JSON schema compliance bugs in `admin/jsonConfig.json` regarding dropdown instance filtering.
* (tipp88) Fixed calculated meter reading (`octopus.info.meterReading`) state missing `kWh` unit
* (tipp88) Fixed permissions in Dependabot auto-merge workflow (`issues: write`)

### 0.6.8 (2026-07-06)
* (tipp88) Fixed `rate.name` from external API being used unsanitized in ioBroker object IDs.
* (tipp88) Fixed `setSmartChargeStatus()` sending the sanitized device ID to Octopus API instead of original ID.
* (tipp88) Optimized database interval sync by consolidating all object scans into a single pre-fetch.

### 0.6.7 (2026-07-01)
* (tipp88) Fixed missing UI translations for the `updateInterval` minimum warning.
* (tipp88) Fixed missing external object ID sanitization (ioBroker repo compliance).
* (tipp88) Enforced a 15-minute minimum for `updateInterval` to prevent excessive cloud polling.
* (tipp88) Refactored `fetchInexogy` and optimized object scanning overhead during history aggregation.
* (tipp88) Capped `syncDays` retroactive data fetching to `retentionDays` to avoid fetching data that would immediately be deleted.

### 0.6.6 (2026-06-29)
* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.6.5 (2026-06-29)
* (tipp88) Fixed ioBroker repository PR compliance issues (added API timeouts, refactored timer logic, removed dead config, implemented data retention, and updated translation keys).
* (tipp88) Upgraded `@iobroker/types` devDependency to 7.2.2.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 tipp88

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