---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: v6FxPWFAENHd0IH3Y9/brIEtva1r3Zc6X3khIMaTbtI=
---
![标识](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub 工作流状态](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![SNYK 已知漏洞](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.tibberlink.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/tibberlink-stable.svg)
![已安装](https://iobroker.live/badges/tibberlink-installed.svg)
![NPM](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# IoBroker.tibberlink
[![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)

## 版本
## 用于在 ioBroker 中使用 TIBBER 能源数据的适配器
此适配器可帮助您将 Tibber 账户 API 中的数据连接到 ioBroker，无论是单个住宅还是多个住宅，均可使用。

新增功能：该适配器现在支持通过家庭网络直接读取 Tibber 脉搏传感器的本地数据，从而实现实时监控和数据采集，而无需完全依赖云 API。

如果您目前还不是 Tibber 用户，如果您能使用我的推荐链接，我将不胜感激：[Tibber推荐链接](https://invite.tibber.com/mu8c82n5)。

## 标准配置
首先创建适配器的新实例。
- 您还需要 Tibber 的 API 令牌，您可以从这里获取：[Tibber Developer API](https://developer.tibber.com)。
- 在标准设置中输入您的 Tibber API 令牌，并至少配置一行实时信息流设置（选择“无可用”）。
- 保存设置并退出配置以重新启动适配器；此步骤允许 Tibber 服务器首次查询您的家庭。
- 返回配置界面，选择您希望使用 Tibber Pulse 获取实时数据的住宅。您也可以选择住宅并禁用数据馈送（注意：此功能仅在硬件已安装且 Tibber 服务器已验证与 Pulse 的连接后才有效）。
注意：如果您的 Tibber 帐户中有多处房产处于激活状态，则必须添加所有房产才能消除因可能不需要的房产而导致的错误信息。添加所有房产并禁用相关选项。
例如，如果您只打算使用 Pulse 实时数据，您可以选择停用今天和明天的价格数据检索功能。
- 您可以选择启用历史消费数据检索功能。请指定小时、天、周、月和年的数据集数量。您可以根据个人喜好，使用“0”禁用一个或多个时间段的数据。
注意：务必注意数据集的大小，因为过大的请求可能会导致 Tibber 服务器无响应。我们建议您尝试不同的数据集大小，以确保最佳功能。调整时间间隔和数据集数量有助于在获取有价值的数据和保持服务器响应速度之间找到合适的平衡点。例如，48 小时是一个相当不错的数值。
- 保存设置。

## 计算器配置
- 现在 Tibber 连接已经建立并运行，您还可以利用计算器将其他自动化功能集成到 TibberLink 适配器中。
- 该计算器使用通道进行操作，每个通道与选定的家庭相关联。
- 这些状态旨在作为 TibberLink 的外部动态输入，例如，允许您从外部来源调整边际成本（“触发价格”）或启用计算器通道（“活动”）。
- 这些通道需要根据相应的状态激活或停用。
计算器频道的状态位于主页状态旁边，并根据频道编号命名。此处显示的频道名称是您在管理界面中选择的名称，以便更好地识别您的配置。

  ![计算器状态](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStates.png)

- 每个通道的行为由其类型决定：“最佳成本（LTF）”、“最佳单小时（LTF）”、“最佳小时块（LTF）”或“智能电池缓冲”。
每个通道都会填充一个或两个外部状态作为输出，需要在设置选项卡中选择。例如，该状态可以是“0_userdata.0.example_state”或任何其他可写的外部状态。
- 如果没有选择外部输出状态，则会在通道的范围内创建一个内部状态。
- 可以定义写入输出状态的值，用“值 YES”和“值 NO”表示，例如，“true”表示布尔状态，或者写入数字或文本。
- 输出：
- “最佳成本”：以“触发价格”状态作为输入，当当前 Tibber 能源成本低于触发价格时，每小时输出“是”。
- “最佳单小时数”：在成本最低的小时数内生成“YES”输出，该数字在“AmountHours”状态中定义。
- “最佳工时块”：在“AmountHours”状态中指定的工时数范围内，以最具成本效益的工时块输出“YES”。

此外，计算结果会将确定区块的平均总成本写入该通道输入状态附近的“AverageTotalCost”状态。同时，区块的起始时间和结束时间也会分别写入“BlockStartFullHour”和“BlockEndFullHour”状态。

- “最佳百分比”：在价格最低的时段以及价格落在“百分比”设置状态中指定的百分比范围内的任何其他时段，输出“是”。
- “最佳成本 LTF”：在有限时间范围内 (LTF) 的“最佳成本”。
- “LTF 最佳单小时”：在有限时间范围内 (LTF) 的“最佳单小时”。
- “LTF 最佳时段”：在有限时间范围内 (LTF) 的“最佳时段”。
- “最佳百分比 LTF”：在有限时间范围内 (LTF) 的“最佳百分比”。
- “智能电池缓冲器”：
“效率损失”参数定义了电池系统的效率损失。其取值范围为 0 到 1，其中 0 表示无效率损失，1 表示完全能量损失。例如，值为 0.25 表示每次充放电循环的效率损失为 25%。
“AmountHours”参数指定系统可用于电池充电的最大小时数，精确到刻度点。重要提示：这是上限值，并非保证的充电小时数。实际的充电时段数会根据能源价格和效率损失动态调整。系统只会选择那些在经济上划算的时段（即，考虑到效率损失，价格远低于最贵时段的价格）。
- 该计算器的工作原理如下：
- 低价时段：电池充电功能已启用（值为“是”），但向家庭能源系统供电的功能已禁用（值为“否”）。这些时段价格最低，且符合能效筛选条件，最高时长为 AmountHours。
- 高价时段：电池充电功能已禁用（值为“否”），但已启用并入家庭能源系统（值为“是”）。这些时段的价格最高，高于根据最低时段价格和效率损失动态计算的阈值。
- 正常时间段：在充电不经济的情况下，两个输出均被禁用。
这种方法确保电池只在经济上有利可图时才使用，而不是严格遵守固定的使用小时数。
- LTF 通道：这些通道的运行方式与标准通道类似，但仅在由“StartTime”和“StopTime”状态对象定义的时间范围内处于活动状态。“StopTime”过后，通道将自动停用。“StartTime”和“StopTime”可以跨越两个日历日，因为 Tibber 不提供超过 48 小时的数据。两种状态均要求提供 ISO-8601 格式的日期时间字符串，并包含时区偏移量，例如“2024-12-24T18:00:00.000+01:00”。此外，LTF 通道新增了一个名为“RepeatDays”的状态参数，其默认值为 0。当“RepeatDays”设置为正整数时，通道将在“StopTime”到达后，将“StartTime”和“StopTime”分别递增指定的天数，从而重复其循环。例如，将“RepeatDays”设置为 1 可实现每日重复。

## 图形输出配置
该适配器有助于可视化价格趋势和计算器结果。它提供三种复杂度级别，每种级别都提供不同的选项。

这三种方法提供了多种可视化价格趋势和计算器结果的选项。根据您的需求，您可以选择从简单的基于 JSON 的方法到完全定制的 JavaScript 解决方案。

### 1. （开发中）使用“E-Charts”适配器进行可视化
此方法需要单独安装“电子海图”适配器。

- 可以使用在计算器状态部分生成的 JSON 数据，作为 `Output-E-Charts`。
- 由于电子海图适配器的限制，其功能受到限制。

### 2. **使用带有 JSON 的“FlexCharts”（或“功能齐全的 eCharts”）适配器**
此方法需要单独安装“FlexCharts”适配器。

- TibberLink 适配器创建一个名为 `jsonFlexCharts` 的状态。

    ![jsonFlexChartsState.png](../../../en/adapterref/iobroker.tibberlink/docu/jsonFlexChartsState.png)

- FlexCharts适配器通过以下URL呈现此状态：

```
http://[YOUR IP of FLEXCHARTS]:8082/flexcharts/echarts.html?source=state&id=tibberlink.0.Homes.[TIBBER-HOME-ID].PricesTotal.jsonFlexCharts
```

- 有关更多详细信息，请参阅 [FlexCharts 适配器文档](https://github.com/MyHomeMyData/ioBroker.flexcharts)。

#### **JSON模板用法**
- `jsonFlexCharts` 状态是根据通过适配器设置中的 JSON 编辑器配置的模板生成的。
- **重要提示：** ioBroker.Admin 内置的 JSON 编辑器不支持 JSON5，这可能会导致错误的错误消息。
- 可以从以下位置下载示例模板：[TemplateFlexChart01.md](docu/TemplateFlexChart01.md)。
- 将模板复制并粘贴到 JSON 编辑器中。
- 该模板包含占位符：
- `%%xAxisData%%` 和 `%%yAxisData%%`（运行时填充价格信息）。
- `%%CalcChannelsData%%`（填充选定的计算器通道数据）。
- 模板的其余部分遵循 Apache ECharts 配置。有关参考，请参阅[Apache ECharts 示例](https://echarts.apache.org/examples/en/index.html)。
- **建议：** 使用默认字符串，在不使用实际模板的情况下测试 TibberLink 适配器：

```
%%xAxisData%%\n\n%%yAxisData%%\n\n%%CalcChannelsData%%
```

这有助于理解它的功能。

- 可以使用“Output-E-Charts”状态数据在 Apache ECharts 示例页面上测试模板调整。
- 好的模板将在 TibberLink 适配器社区内共享。

### 3. **使用带有自定义 JavaScript 代码的“FlexCharts”**
为了实现最大的灵活性和可定制性，FlexCharts 适配器可以与自定义 JavaScript 一起使用。

- “FlexCharts”和“JavaScript”适配器都需要分别安装。
- 这种方法可以创建多个自定义图表。
- 更多详情请参阅[FlexCharts适配器讨论](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67)。

提示
### 反向用法
例如，要获取高峰时段而不是最佳时段，只需反转用法和参数：![计算器状态的逆](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStatesInverse.png) 通过交换 true <-> false，您将在第一行获得低成本的 true，在第二行获得高成本的 true（通道名称不是触发器，仍然可以自由选择）。

注意：对于高峰时段（例如示例中的时段），您还需要调整小时数。原始值：5 -> 倒数 (24-5) = 19 -> 您将在 5 个高峰时段内获得真实结果。

### LTF通道
该计算基于“多日”数据。由于我们仅掌握“今天”和“明天”（大约13:00后可用）的信息，因此时间范围实际上最多只能覆盖35小时。然而，务必注意这一点，因为计算结果可能会在13:00左右发生变化，届时明天价格的新数据将会发布。

为了观察标准频道时间范围内的这种动态变化，您可以选择跨越数年的有限时间框架 (LTF)。这对于“最佳单小时 LTF”场景尤其有用。

## 直接本地轮询 Pulse 数据
要实现这一点，你需要修改 Bridge 的 Web 界面，使其始终保持启用状态。

marq24 在这里详细介绍了如何为他的 HomeAssistant 集成进行此操作：

https://github.com/marq24/ha-tibber-pulse-local

如果一切正常，计量数据将每 2 秒写入 ioBroker 状态。

## 哨兵
此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关更多详细信息以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始启用。

捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a>如果你喜欢这个项目——或者只是想慷慨解囊，不妨请我喝杯啤酒。干杯！🍻

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (HombachC) BREAKING: change flexcharts x-axis type
- (HombachC) introduce FlexChart output for SBB channels second output
- (HombachC) introduce second name for FlexChart output of SBB channels
- (HombachC) introduce color for FlexChart output of calculator results
- (HombachC) clean code for 15min time slots
- (HombachC) fix schema links (#822)
- (HombachC) update cron
- (HombachC) update dependencies

### 6.0.3 (2025-11-16)

- (HombachC) optimize sentry
- (HombachC) optimize dependabot config (#805)
- (HombachC) update axios and cron
- (HombachC) update FlexChart template

### 6.0.2 (2025-10-24)

- (HombachC) update NPM deployment
- (HombachC) update dependencies

### 6.0.1 (2025-10-09)

- (HombachC) fix error in cleaning tomorrow data
- (HombachC) update release management to 4.x.x

### 6.0.0 (2025-10-06)

- (HombachC) BREAKING: hourly price states (0...23) are now quarterhourly (0...95)
- (HombachC) BREAKING: adapted calculator time blocks need reentry of "AmountHours" values
- (HombachC) change price updates to 15 minutes resolution as default
- (HombachC) change current price updates to use existing today values instead of Tibber calls
- (HombachC) more timely precision for current price and calculator
- (HombachC) adapt chart generation
- (HombachC) fix error in efficiency loss
- (HombachC) adapt calculator time blocks
- (HombachC) update tibber-api to 5.5.2
- (HombachC) update typescript to 5.9.3 (#777)
- (HombachC) add names to price states folders

### 5.0.4 (2025-09-27)

- (HombachC) prepared price updates to 15 minutes resolution (#384)
- (HombachC) update tibber-api to 5.4.2
- (HombachC) update chai system

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2025 C.Hombach <TibberLink@homba.ch>