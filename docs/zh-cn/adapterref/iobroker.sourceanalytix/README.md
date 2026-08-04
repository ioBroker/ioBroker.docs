---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sourceanalytix/README.md
title: SourceAnalytix
hash: XCKmJ2EPbS52X84K8YwmuIUkMNQH/9qZ7LOHloy0ME0=
---
# SourceAnalytix

![NPM 版本](https://img.shields.io/npm/v/iobroker.sourceanalytix.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sourceanalytix.svg)
![安装数量（最新）](https://iobroker.live/badges/sourceanalytix-installed.svg)
![安装数量（稳定版）](https://iobroker.live/badges/sourceanalytix-stable.svg)

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/sourceanalytix/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) [![测试和发布](https://github.com/DrozmotiX/ioBroker.sourceanalytix/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/DrozmotiX/ioBroker.sourceanalytix/actions/workflows/test-and-release.yml)

SourceAnalytix 将累计电表读数或定期更新的功率值转化为用电量、输送量、成本和收益统计数据。它支持固定价格、计划价格变动、来自 ioBroker 状态的动态电价以及选择器控制的电价。

该适配器需要 **Admin 7.6.20 或更高版本**、**js-controller 6.0.11 或更高版本** 和 **Node.js 22 或更高版本**。

## Sentry.io 是什么？它会向该公司的服务器报告哪些信息？
此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

当适配器崩溃或发生其他代码错误时，错误信息（也会出现在 ioBroker 日志中）会提交给 Sentry。如果您允许 ioBroker GmbH 收集诊断数据，则您的安装 ID 也包含在内。这是一个匿名标识符，不包含您的姓名或电子邮件地址等个人信息。它允许对错误进行分组，并显示受影响的安装数量。

＃＃ 特征
- 当前日、周、月、季度和年度总计
- 可选的前期值以及当年的星期、周、月和季度数据
- 每个日历年下方可选择显示存档的周、月和季度统计数据
- 消耗量和交付量计算
- 包含可选月度基本费用的成本和收益计算
- 固定、定时、国家提供和选择器控制的单位价格
- 保留已计算成本的带时间戳的价格历史记录
- 兼容的能量、体积、质量和公制长度单位之间的自动转换
- 对实际更新间隔内的功率读数进行积分，可选择忽略负值读数
- 重启后，根据请求或通过每小时检查恢复错过的日历翻转。
- 处理电表重置、电表更换和小幅反向波动
每个活跃源对应一个简洁、自动更新的统计信息 JSON 状态

＃＃ 设置
### 1. 配置适配器实例
“常规设置”选项卡控制要创建的详细统计信息。禁用某个选项会移除相应的可选状态，但会保留当前期间的常规总计和现有存档年份。

![常规设置](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/mainSettings.png)

| 设置 | 结果 |
| --- | --- |
| 年度统计：周/月/季度 | 以下列出的是已完成的数值，用于历史比较。 |
| 当前年份：周/月/季度 | 存储以下每个期间的值 `<source>.currentYear`。 |
| 当前年份：周/月/季度 | 存储以下每个周期的值<source>.currentYear`。 |
| 舍入：消耗量数值保留小数 | 计算量和计量读数保留小数，默认值为`3`。 |
| 舍入：成本值保留小数 | 计算成本和收益保留小数，默认值为`2`。 |
| 四舍五入：成本值保留小数；计算成本和收益保留小数，默认值为 2。 |

两种舍入设置均接受 `-1` 来存储不进行舍入的精确计算值。单个数据源可以偏离这些设置：其“消耗值小数位数”和“成本值小数位数”字段会覆盖全局设置，并在这些字段为空时使用全局设置。舍入仅影响写入状态的值；内部计算、累计读取和持久化内存始终保持完整精度，因此不会随时间推移而丢失精度。

SourceAnalytix 会记住上次成功处理的日历周期。如果适配器或 ioBroker 在午夜未运行，则错过的日、周、月、季度和年变更将在下次启动时处理一次。

无需重启实例即可触发实例轮换，这在午夜过后不久发现实例宕机时非常有用：

- 将 `sourceanalytix.<instance>.info.recoverPeriods` 设置为 `true`。运行结束后，按钮会自动重置。
或者从脚本发送消息：`sendTo('sourceanalytix.<instance>', 'recoverPeriods', {}, result => log(result.recovered))`。回复包含已处理滚动更新的数据源数量。

每小时一次的检查会自动执行相同的恢复操作，因此，如果适配器在主机挂起或系统时间校正后仍持续运行，导致轮换失败，则会自动进行校正。每条路由都是幂等的：周期已更新的源将被跳过。

### 2. 创建价格定义
打开**价格定义**，并添加来源州应使用的类别。

![价格定义](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/priceSettings.png)

| 字段 | 描述 |
| --- | --- |
| 类别 | 源状态的“选择价格定义”字段中显示的唯一标识符。 |
| 说明 | 资费的自由文本描述。 |
| 成本类型 | 选择 `costs`/`consumed` 或 `earnings`/`delivered` 结果类别。 |
| 单位 | 目标消费单位，也是单价的分母。 |
| 价格来源 | 固定价格、ioBroker 数值状态或资费选择器。 |
| 单价 | 固定资费的单价，或选择器的非激活/基础价格。 |
| 价格状态 | 数字价格状态或资费选择器状态的完整 ID。 |
| 当前价格 | 选择器处于激活状态时使用的价格。 |
| 激活选择器值 | 可选的精确值，用于激活备用资费方案。 |
| 生效日期 | 可选日期，指资费方案（包括每月基本价格）生效的日期。 |
| 每月价格 | 每月基本价格，仅适用于已启用“包含基本费率”选项的数据源。 |

#### 固定价格和定期价格
选择“固定价格”，然后输入“单价”。更改价格时，请将“生效日期”设置为新价格生效的日期。之前的价格将保留在历史记录中，不会追溯生效。

#### 动态价格状态
选择“状态值”，然后选择包含当前单价的州/省。SourceAnalytix 会订阅该州/省，并记录每次价格变更及其时间戳。系统接受数字和以点号或逗号分隔的数字字符串。

状态值必须表示所选目标单位的系统货币，例如，当价格定义使用 `kWh` 时，状态值为货币/千瓦时。在使用源适配器或脚本中的值（例如每千瓦时美分）之前，请先进行转换。

#### 资费选择器
选择**资费选择器**，选择日间/夜间、中继、接触或其他两种价格资费方案：

- **单价**为非活跃/基础价格。
- 当选择器处于激活状态时，将使用**当前有效价格**。
- 如果没有 **Active selector value**，则 `true`、非零数字和常见的真值字符串将激活备用资费。
- 对于**活动选择器值**，只有完全匹配的字符串表示形式才能激活备用资费。

#### 可写入的当前价格
每个类别都公开 `sourceanalytix.<instance>.priceDefinitions.<category>.currentPrice` 状态。脚本和可视化工具可以向此状态写入数值，以便立即应用新价格。该值还会附加到带有时间戳的价格历史记录中。

#### 历史价格计算
价格随时间变化。新价格仅从其变更时间戳起生效，绝不会改变先前消费已累积的成本。

对于累计式电表，SourceAnalytix 可以获知两次读数之间的用电量差。如果在该时间间隔内发生了一次或多次价格变动，则该差额将按比例分配到各个时间段，每个时间段均按该时间段的有效价格计费。如果价格变动恰好发生在后一次读数的时间戳，则该变动将应用于下一个时间间隔。

精确的成本累积器和价格历史记录在适配器重启后仍然存在。目前尚未实现对旧历史数据的显式重新计算。

#### 月基本价格
启用“包含基本费率”选项，即可在数据源中添加已配置的月度价格。“生效日期”选项还定义了此费用生效的首月。基本费率会在资费首次生效时收取一次，之后每个自然月的月初收取一次。如果当月价格发生变动，则该变动将应用于下一个月的预订，而之前的月份保持不变。对于没有生效日期的现有资费方案，其生效日期仍为当前自然年的年初，并沿用之前的做法。

日累计和周累计仅包含预订日期在该期间内的全额月费。月累计、季度累计和年累计则包含其各自日历期间内预订的全部费用。

### 3. 激活源状态
SourceAnalytix 通过 ioBroker 中每个源状态的自定义设置进行配置。打开“对象”，单击所需状态的扳手/配置图标，然后展开 SourceAnalytix 实例。

![自定义设置图标](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/settingKey.png)

![源状态设置](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)

| 设置 | 描述 |
| --- | --- |
| 已启用 | 为选定的 SourceAnalytix 实例激活此数据源。 |
| 别名 | 生成的设备的可选显示名称。它不会更改生成的状态 ID。 |
| 选择价格定义 | 从适配器的价格定义中选择必填类别。 |
| 选择单位 | 源单位。如果源对象具有正确的支持单位，则保持自动检测。 |
| 计算成本 | 创建和更新成本或收益状态。 |
| 包含基本费率 | 添加价格定义中的每月基本价格。 |
| 计算消耗量 | 创建和更新消耗量或交付量状态。 |
| 两次更新之间的平均功率值 | 功率状态的可选计算模式；参见[权力状态](#power-states)。 |
| 忽略负功率值 | 将负功率读数计为“0 W”；参见[功率状态](#power-states)。 |
| 存储计量值 | 存储已启用时间段内的计量读数。 |
| 设备值重置检测 | 仪表重置或更换后，继续计算累计总数。 |
| 阈值 | 忽略为测量抖动的最大反向波动，以目标单位表示。 |

源状态 ID 通过将点号替换为双下划线转换为生成的 SourceAnalytix 设备 ID。

## 来源数值和单位
### 累积源状态
使用通常只会递增的累计总数，例如 Tasmota `ENERGY_Total` 或智能电表的总消耗量。不要使用像 `ENERGY_Today` 这样每天都会重置的值。如果没有可用的累计总数，请在上游适配器或脚本中创建一个。

对于累计来源，消耗量计算如下：

```text
current cumulative reading - reading at the beginning of the period
```

首次激活时，SourceAnalytix 会将日、周、月、季度和年的初始值初始化为空或零，并使用当前标准化后的电表读数。这样可以防止现有电表累计用量被识别为新的用量。这些值始终可编辑，并且在后续启动时不会被覆盖。

![期间起始值](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateStartValues.png)

在价格定义中选择的**目标单位**中，手动输入起始值。每个值必须代表该期间开始时的电表读数，而不是该期间的用电量。

### 权力状态
诸如 `W` 或 `kW` 之类的功率值，会在状态更新之间的实际时间内进行积分，从而产生能量。首次读数用于建立基线，不产生能量消耗。

默认情况下，前一次的功率值将被视为在整个时间间隔内有效。对于定期上报且功率变化缓慢的传感器，启用“更新间平均功率值”功能；SourceAnalytix 将使用前一次和当前功率值的平均值。对于在更新标记切换事件时功率会突然变化的设备，请禁用此功能。

某些逆变器在关机状态下会报告极低的功率值，否则这些值会被计入负能量，从而降低累计发电量。启用“忽略负功率值”选项，即可将此类读数计为 `0 W`。该读数会被钳位而非丢弃，因此时间间隔仍会继续推进；如果丢弃该读数，则会将最后一个正功率值作为基线，并将其计入整个停机时间。

### 支持的单元
SourceAnalytix 仅自动转换兼容量之间的值：

| 数量 | 支持的单位 |
| --- | --- |
| 电源 | `GW`, `MW`, `kW`, `W`, `mW` |
| 立方体积 | `km³`, `m³`, `dm³`, `cm³`, `mm³` |
| 液体体积 | `hl`, `l`, `dl`, `cl`, `ml` |
| 质量 | `t`, `kg`, `g` |
| 公制长度 | `km`, `m`, `dm`, `cm`, `mm`, `µm`, `nm` |
| 公制长度 | `km`、`m`、`dm`、`cm`、`mm`、`µm`、`nm` |

升和立方米单位可以相互转换。不兼容的转换，例如千克到千瓦时或米到升，会被拒绝，以免产生误导性结果。

## 生成的状态
对于每个数据源，SourceAnalytix 都会创建一个 `cumulativeReading` 以及启用的结果树：

| 路径 | 内容 |
| --- | --- |
| `<source>.currentYear.consumed` | 各成本类别的当前消耗总量。 |
| `<source>.currentYear.costs` | 当前总成本。 |
| `<source>.currentYear.earnings` | 当前收益总额。 |
| `<source>.currentYear.meterReadings` | 按启用时间段的可选计量读数。 |
| `<source>.<year>` | 可选的已存档周、月和季度统计数据。 |
| `<source>.statisticsJson` | VIS、脚本和其他适配器的精简版本年度统计数据。 |
| `<source> .statisticsJson` | 为 VIS、脚本和其他适配器提供精简的当年统计数据。 |

基本当前状态和可选先前状态使用诸如 `01_currentDay`、`02_currentWeek`、`03_currentMonth`、`04_currentQuarter`、`05_currentYear` 及其 `previous` 等名称。

先前的值会以其所属周期的时间戳写入，例如，在周期的最后一天会显示为 `23:59:59`，而不是以周期翻转发生的时刻写入。因此，历史适配器会记录该周期内的完整日期、周、月、季度或年份，这正是 Flot 等可视化工具所需要的。

### 统计信息 JSON
每个活动源都会自动公开一个只读状态 `statisticsJson`，角色为 `json`；无需额外设置。它包含与各个状态相同的计算值，不会执行单独的计算。

```json
{
  "schemaVersion": 1,
  "year": 2026,
  "source": {
    "id": "smartmeter.0.total",
    "name": "Electricity meter",
    "unit": "kWh"
  },
  "quantity": {
    "type": "consumed",
    "current": {
      "day": 4.21,
      "week": 28.65,
      "month": 114.32,
      "quarter": 301.77,
      "year": 894.15
    },
    "previous": null,
    "periods": {
      "weekdays": null,
      "previousWeekdays": null,
      "weeks": {},
      "months": {},
      "quarters": {}
    }
  },
  "financial": {
    "type": "costs",
    "currency": "EUR",
    "current": {
      "day": 1.24,
      "week": 8.47,
      "month": 34.19,
      "quarter": 89.51,
      "year": 261.42
    },
    "previous": null,
    "periods": {
      "weekdays": null,
      "previousWeekdays": null,
      "weeks": {},
      "months": {},
      "quarters": {}
    }
  },
  "meterReadings": null
}
```

`quantity` 代表 `consumed` 或 `delivered` 的值。`financial` 代表 `costs` 或 `earnings` 的值。启用计量值存储时，`meterReadings` 会被填充。禁用的计算和周期收集由 `null` 表示，因此该模式保持可预测性。

工作日使用 `1` 表示星期一，`7` 表示星期日。周和月键会用零填充，季度键使用 `1` 到 `4`。仅包含当年的集合和可选的上一周期值，以防止状态无限增长。ioBroker 状态时间戳指示 JSON 上次更改的时间。

适配器启动时，状态会根据现有统计信息重建，其写入操作会在正常计算期间进行打包。如果某个数据源被禁用或删除，则会保留最后一个 JSON 值以及其他计算历史记录，并且不再更新。

## 仪表重置和校正
启用重置检测后，大于**阈值**的下降值将被视为实际的电表重置或更换。SourceAnalytix 会存储一个偏移量，并继续进行累计读数，而不会丢失之前的消耗量。较小的回落变化将被视为抖动并被忽略。阈值设置为`0`时，每次下降值都会被视为重置。

如果禁用重置检测，则会接受递减的源读数，这可能会导致计算出的总数减少。此模式仅适用于预期会出现这种行为的源。

为了更正一个已经错误的`cumulativeReading`：

1. 停止 SourceAnalytix 实例。
2. 打开**对象**并启用专家模式。
3. 正确<source>.cumulativeReading`。
4. 打开源状态的 SourceAnalytix 自定义设置，并在同一目标单位中更正受影响的期间起始值。
5. 再次启动适配器并验证当前周期的结果。

![修正累积读数](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/cumulativeReading-Reset.png)

更改当前单价不会重新计算历史成本。目前没有用户触发的历史成本重新计算功能。

## 故障排除
### 源未初始化
- 确认已为正确的 SourceAnalytix 实例启用自定义配置。
- 选择一个现有的价格定义。即使仅启用消费量，也必须定义价格。
- 确保可以从物体中检测到信号源单元，或者手动选择它。
- 检查源单位和目标单位是否代表相等的数量。
- 查看适配器日志，了解确切的拒绝状态或配置值。

### 用量计算从完整的计量表读数开始。
这通常表示旧的或手动输入的周期起始值。将日、周、月、季度和年的起始值设置为相应的历史计量读数。对于今天的值，通常为：

```text
current cumulative reading - consumption since the beginning of today
```

### 动态价格似乎不正确
- 确认价格状态使用目标单位的货币，而不是美分，除非该值已转换。
- 检查价格状态的时间戳和源计量读数。
- 请记住，由于没有更精细的消费曲线，因此跨越价格变化的计量差值要除以经过的时间。
- 检查 `priceDefinitions.<category>.currentPrice` 以获取当前价格。

## 已知局限性
- 自动历史数据重新计算功能已被有意禁用，目前还没有明确的重新计算操作可用。
- 未实现用户可配置的滚动周期。
- 不支持无单位计数器、时间单位和数字尺寸单位。

## 鸣谢
该适配器的起源可以追溯到 pix 在 2016 年的工作：[ioBroker 论坛帖子](https://forum.iobroker.net/viewtopic.php?f=21&t=2262)

后来由`@hadering`改进，并发布为[homematic_verbrauchszaehler](https://github.com/hdering/homematic_verbrauchszaehler)。

## 支持我
如果您喜欢我的作品，请考虑个人捐赠。

这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关。

[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](https://paypal.me/DutchmanNL)

<!-- 下一版本的占位符（位于行首）：

### __正在进行中__ -->

## Changelog
### 0.5.6 (2026-08-02)
* The monthly basic price is booked as a full charge when the tariff first becomes valid and at the beginning of every following calendar month, instead of being spread over the days of a month ([#1193](https://github.com/DrozmotiX/ioBroker.sourceanalytix/pull/1193)).
* **Valid from** now also defines the first month the monthly basic price is charged, while tariffs without a validity date keep starting at the beginning of the current calendar year ([#1193](https://github.com/DrozmotiX/ioBroker.sourceanalytix/pull/1193)).
* Monthly basic prices are recorded in their own `basicPriceHistory` state, so a price change during a month only applies to the next monthly booking and already booked months stay unchanged ([#1193](https://github.com/DrozmotiX/ioBroker.sourceanalytix/pull/1193)).
* **Valid from** is available for every price source, not only for fixed prices, and a selected date becomes effective at local midnight ([#1193](https://github.com/DrozmotiX/ioBroker.sourceanalytix/pull/1193)).

### 0.5.5 (2026-08-01)
* Previous day, week, month, quarter and year values are written with the timestamp of the period they belong to (23:59:59 on its last day), so history adapters and Flot plot them in the correct period ([#497](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/497)).
* The number of decimals for consumption and cost values is configurable globally and per source, including an option to store the exact value without rounding ([#934](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/934)).
* A missed calendar rollover can be processed without restarting the instance, through the new `info.recoverPeriods` button or a `recoverPeriods` message, and an hourly check recovers a rollover the scheduler missed while the adapter kept running ([#905](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/905)).
* The midnight scheduler can no longer raise an unhandled rejection, and its cron job and timers are stopped when the instance shuts down ([#904](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/904)).

### 0.5.4 (2026-08-01)
* Each active source automatically exposes a compact `statisticsJson` state containing its current-year quantity, financial and optional meter-reading statistics ([#361](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/361), [#967](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/967)).
* Monthly basic prices are no longer imported into the variable-cost accumulator and added a second time after a restart ([#1188](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/1188)).

### 0.5.3 (2026-07-28)
* Power states can optionally ignore negative readings, so inverters which report a negative power while switched off no longer reduce the accumulated yield ([#466](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/466)).

### 0.5.2 (2026-07-28)
* The npm release workflow no longer fails at the Sentry step: commit association is disabled because the previous release commit is not reachable in the shallow, squash-merged history ([#1179](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/1179)).
* README now carries the standard Sentry notice required by the ioBroker repository checker ([#1179](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/1179)).

[Older changelog entries](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2022-2026 DrozmotiX Services B.V.

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