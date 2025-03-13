---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: ucsrbboNZlZMjao+AU+r2J/q5iskGTbXVBZHtcnYax4=
---
![标识](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)
![节点](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub 上次提交](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub 工作流程状态](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![SNYK 已知漏洞](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![测试版](https://img.shields.io/npm/v/iobroker.tibberlink.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/tibberlink-stable.svg)
![已安装](https://iobroker.live/badges/tibberlink-installed.svg)
![新平台](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# IoBroker.tibberlink
[![CodeQL]（https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg）](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)

## 版本
## 在 ioBroker 中使用 TIBBER 能源数据的适配器
此适配器有助于将您 Tibber 帐户 API 中的数据连接到 ioBroker 中以供使用，无论是用于单个家庭还是多个住宅。
新功能：该适配器现在支持通过您的家庭网络直接本地读取 Tibber 脉冲传感器，从而无需完全依赖云 API 即可进行实时监控和数据收集。

如果您目前不是 Tibber 用户，我将非常感激如果您可以使用我的推荐链接：[Tibber 推荐链接](https://invite.tibber.com/mu8c82n5)。

## 标准配置
- 首先创建适配器的新实例。
- 您还需要来自 Tibber 的 API 令牌，您可以在此处获取：[Tibber 开发人员 API](https://developer.tibber.com)。
- 在标准设置中输入您的 Tibber API 令牌，并为实时源设置配置至少一行（选择“无可用”）。
- 保存设置并退出配置以重新启动适配器；此步骤允许从 Tibber 服务器第一次查询您的主页。
- 返回配置屏幕并选择您希望使用 Tibber Pulse 从中获取实时数据的家庭。您还可以选择家庭并禁用馈送（注意：这仅在安装了硬件并且 Tibber 服务器已验证与 Pulse 的连接时才有效）。
- 注意：如果您的 Tibber 帐户中有多个活跃的主页，则必须添加所有主页，以消除可能不需要的主页导致的错误消息。添加所有主页并禁用选项。
- 您可以选择停用今天和明天的价格数据检索，例如，如果您只想使用 Pulse 实时信息
- 您也可以选择启用历史消费数据检索。请指定小时、天、周、月和年的数据集数量。您可以根据自己的偏好使用“0”来禁用其中一个或多个间隔。
- 注意：务必注意数据集的大小，因为过大的请求可能会导致 Tibber 服务器响应不足。我们建议尝试不同的数据集大小以确保最佳功能。调整间隔和数据集数量有助于在获取有洞察力的数据和保持服务器响应能力之间取得适当的平衡。例如，48 是几个小时内相当不错的数量。
- 保存设置。

## 计算器配置
- 现在 Tibber 连接已启动并运行，您还可以利用计算器将其他自动化功能合并到 TibberLink 适配器中。
- 计算器通过频道进行操作，每个频道链接到一个选定的家庭。
- 这些状态旨在作为 TibberLink 的外部动态输入，允许您例如从外部来源调整边际成本（“TriggerPrice”）或启用计算器通道（“Active”）。
- 这些通道必须根据相应的状态激活或停用。
- 计算器通道的状态位于主状态旁边，并根据通道号命名。因此，管理屏幕中选择的通道名称会显示在此处，以便更好地识别您的配置。

  ![计算器状态](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStates.png)

- 每个渠道的行为由其类型决定：“最佳成本（LTF）”、“最佳单小时（LTF）”、“最佳小时块（LTF）”或“智能电池缓冲区”。
- 每个通道都会填充一个或两个外部状态作为输出，必须在设置选项卡中选择。例如，此状态可能是“0_userdata.0.example_state”或任何其他可写的外部状态。
- 如果未选择外部输出状态，则将创建通道范围内的内部状态。
- 可以在“值 YES”和“值 NO”中定义要写入输出状态的值，例如，布尔状态为“true”，或者要写入的数字或文本。
- 输出：
- “最佳成本”：利用“TriggerPrice”状态作为输入，当当前 Tibber 能源成本低于触发价格时，每小时产生一个“YES”输出。
- “最佳单小时”：在最便宜的时段生成“YES”输出，其数字在“AmountHours”状态中定义。
- “最佳时段”：在最具成本效益的时段内输出“YES”，其小时数在“AmountHours”状态中指定。

此外，确定的区块中的平均总成本被写入该通道输入状态附近的状态“AverageTotalCost”。此外，区块的开始和结束时间也作为计算结果写入“BlockStartFullHour”和“BlockEndFullHour”。

- “最佳百分比”：在最便宜的时段以及价格落在“百分比”设置状态中指定的百分比范围内的任何其他时段输出“是”。
- “最佳成本 LTF”：有限时间框架 (LTF) 内的“最佳成本”。
- “最佳单小时 LTF”：有限时间框架 (LTF) 内的“最佳单小时”。
- “最佳时段区块 LTF”：在有限时间框架 (LTF) 内的“最佳时段区块”。
- “最佳百分比 LTF”：有限时间框架 (LTF) 内的“最佳百分比”。
- “智能电池缓冲器”：利用“EfficiencyLoss”参数指定电池系统的效率损失。“EfficiencyLoss”参数的范围可以从 0 到 1，其中 0 表示没有效率损失，1 表示完全效率损失。例如，值为 0.25 表示充电/放电周期的效率损失为 25%。

使用“AmountHours”参数输入所需的电池充电小时数。计算器将在指定的“AmountHours”最便宜的时段内激活电池充电（“值 YES”）并停用电池供电（“值 2 NO”）。相反，它将在成本最高的时段停用电池充电（“值 NO”）并激活电池供电（“值 2 YES”），前提是成本高于最便宜时段中的最高总价。在剩余的正常时段，如果电池的能量缓冲在经济上不可行，则两个输出都将关闭。

- LTF 通道：这些通道的操作与标准通道类似，但仅在由“StartTime”和“StopTime”状态对象定义的时间范围内处于活动状态。在“StopTime”之后，通道将自动停用。“StartTime”和“StopTime”可以跨越两个日历日，因为 Tibber 不提供超过 48 小时窗口的数据。两种状态都需要带有时区偏移的 ISO-8601 格式的日期时间字符串，例如“2024-12-24T18:00:00.000+01:00”。此外，LTF 通道还具有一个名为“RepeatDays”的新状态参数，默认为 0。当“RepeatDays”设置为正整数时，通道将在达到“StopTime”后通过将“StartTime”和“StopTime”增加指定的天数来重复其循环。例如，将“RepeatDays”设置为 1 以实现每日重复。

## 图形输出配置
该适配器有助于可视化价格趋势和计算器结果。它提供三个复杂程度，每个级别都提供不同的选项。
这三种方法提供了可视化价格趋势和计算器结果的各种选项。根据您的要求，您可以从简单的基于 JSON 的方法到完全定制的 JavaScript 解决方案中进行选择。

### 1.**（正在开发中）使用“E-Charts”适配器进行可视化**
此方法需要单独安装“E-Charts”适配器。

- 可以使用 JSON 数据，在计算器状态部分生成为“Output-E-Charts”。
- 功能受到 E-Charts 适配器的限制。

### 2. **使用带有 JSON 的“FlexCharts”（或“全功能 eCharts”）适配器**
此方法需要单独安装“FlexCharts”适配器。

- TibberLink 适配器创建一个名为“jsonFlexCharts”的状态。

    ![jsonFlexChartsState 示例](../../../en/adapterref/iobroker.tibberlink/docu/jsonFlexChartsState.png)

- FlexCharts 适配器通过以下 URL 呈现此状态：

```
http://[YOUR IP of FLEXCHARTS]:8082/flexcharts/echarts.html?source=state&id=tibberlink.0.Homes.[TIBBER-HOME-ID].PricesTotal.jsonFlexCharts
```

- 有关更多详细信息，请参阅 [FlexCharts 适配器文档](https://github.com/MyHomeMyData/ioBroker.flexcharts)。

#### **JSON 模板使用**
- `jsonFlexCharts` 状态是基于适配器设置中通过 JSON 编辑器配置的模板生成的。
- **重要：**ioBroker.Admin 中的内置 JSON 编辑器不支持 JSON5，这可能会导致错误的错误消息。
- 示例模板可从以下位置下载：[TemplateFlexChart01.md](docu/TemplateFlexChart01.md)。
- 将模板复制并粘贴到 JSON 编辑器中。
- 模板包含占位符：
- `%%xAxisData%%` 和 `%%yAxisData%%`（在运行时填充价格信息）。
- `%%CalcChannelsData%%`（填充了选定的计算器通道数据）。
- 模板的其余部分遵循 Apache ECharts 配置。有关参考，请参阅 [Apache ECharts 示例](https://echarts.apache.org/examples/en/index.html)。
- **建议**：使用默认字符串测试没有真实模板的 TibberLink 适配器：

```
%%xAxisData%%\n\n%%yAxisData%%\n\n%%CalcChannelsData%%
```

这有助于理解其功能。

- 可以使用“Output-E-Charts”状态数据在 Apache ECharts 示例页面上测试模板调整。
- 好的模板将在 TibberLink 适配器社区内共享。

### 3. **使用自定义 JavaScript 代码的“FlexCharts”**
为了实现最大的灵活性和定制化，FlexCharts 适配器可以与自定义 JavaScript 一起使用。

- “FlexCharts”和“JavaScript”适配器都需要单独安装。
- 这种方法允许创建多个自定义图表。
- 有关更多详细信息，请参阅 [FlexCharts 适配器讨论](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67)。

## 提示
### 反向使用
例如，要获得高峰时段而不是最佳时段，只需反转使用情况和参数：![计算器状态逆](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStatesInverse.png)通过交换 true <-> false，您将在第一行收到低成本的 true，在第二行收到高成本的 true（频道名称不是触发器，仍然可以自由选择）。

注意：对于高峰单小时，如示例中，您还需要调整小时数。 原来：5 -> 逆 (24-5) = 19 -> 您将在 5 个高峰时段获得真实结果。

### LTF 通道
计算针对的是“多日”数据。由于我们只有“今天”和“明天”（大约 13:00 后可用）的信息，因此时间范围实际上被限制为最多 35 小时。但是，务必注意这种行为，因为计算结果可能会/将在 13:00 左右发生变化，届时明天的价格新数据将可用。

要观察标准频道时间范围的动态变化，您可以选择跨越数年的有限时间范围 (LTF)。这对于“最佳单小时 LTF”场景特别有用。

## 直接本地轮询 Pulse 数据
为了使其工作，您需要修改 Bridge 的 Web 界面以保持永久启用状态。
marq24 在此处描述了如何出色地实现他的 HomeAssistant 集成：

https://github.com/marq24/ha-tibber-pulse-local

如果一切正常，电表数据将每 2 秒写入 ioBroker 状态一次。

哨兵
此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关如何禁用错误报告的更多详细信息和信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告从 js-controller 3.0 开始启动。

## 捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a>如果你喜欢这个项目 — — 或者只是觉得慷慨，可以考虑给我买杯啤酒。干杯！:beers:

## Changelog

### **WORK IN PROGRESS**

- (HombachC) enable JSON5 parsing starting with admin 7.5.3
- (HombachC) fix vulnerability in axios <1.8.2 (#673)

### 4.5.0 (2025-03-05)

- (HombachC) add calculator channel 'smart battery buffer LTF' (#668)
- (HombachC) rearrange calculator channels in configuration
- (HombachC) improve debugging messages, code optimisations
- (HombachC) fix 2 errors in enable/disable FlexCharts

### 4.4.0 (2025-03-01)

- (HombachC) add generation time cutoffs for graph outputs (#643)
- (HombachC) set admin to minimum 7.4.10 as recommended by ioBroker (#651)
- (HombachC) Code optimisations, preparations to switch to ESM module
- (HombachC) bump cron to 4.x.x (#648)
- (HombachC) bump axios from 1.8.x (#664)

### 4.3.1 (2025-02-23)

- (HombachC) Bump "@iobroker/adapter-dev" to 1.4.0 (#653)
- (HombachC) start using "@alcalzone/release-script" (#650)
- (HombachC) add option to enable/disable FlexCharts-JSON for each channel (#642)
- (HombachC) fix logging for multiple homes (#647)
- (HombachC) fix encrypted element "tibberBridgePassword" (#652)

### 4.3.0 (2025-02-09)

- (HombachC) added ioBroker.FlexCharts - JSON
- (HombachC) Update tibber-api to 5.2.1 - handle obsolete data as default, remove option
- (HombachC) Calculate outputJSON prior to time frame for channels of type 'BestSingleHours', 'BestHoursBlock', 'BestPercentage', 'BestCost' and their LTF variants (#592)
- (HombachC) add outputJSON and outputJSON2 for 'SmartBatteryBuffer' channels (#592)
- (HombachC) calculator and projectUtils code optimizations
- (HombachC) correct role of stats states to json

### 4.2.3 (2025-01-14)

- (HombachC) bump cron to 3.5

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2025 C.Hombach <TibberLink@homba.ch>