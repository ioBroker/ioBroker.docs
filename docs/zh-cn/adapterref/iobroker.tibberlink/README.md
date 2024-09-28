---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: K8hWv/0WbiSbPH9kxOdbE6JQPnr5DYtafIVCabwcbKs=
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
- 计算器使用频道进行操作，每个频道链接到一个选定的家庭。
- 这些通道可以根据相应的状态被激活或停用。
- 这些状态旨在作为 TibberLink 的外部动态输入，允许您例如从外部来源调整边际成本（“TriggerPrice”）或禁用计算器通道（“Active”）。
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

- “最佳成本 LTF”：有限时间框架 (LTF) 内的“最佳成本”。
- “最佳单小时 LTF”：有限时间框架 (LTF) 内的“最佳单小时”。
- “最佳时段区块 LTF”：在有限时间框架 (LTF) 内的“最佳时段区块”。
- “智能电池缓冲器”：利用“EfficiencyLoss”参数指定电池系统的效率损失。“EfficiencyLoss”参数的范围为 0 到 1，其中 0 表示没有效率损失，1 表示完全效率损失。例如，值为 0.25 表示充电/放电周期的效率损失为 25%。

使用“AmountHours”参数输入所需的电池充电小时数。计算器将在指定的“AmountHours”最便宜的时段内激活电池充电（“值 YES”）并停用电池供电（“值 2 NO”）。相反，它将在成本最高的时段停用电池充电（“值 NO”）并激活电池供电（“值 2 YES”），前提是成本高于最便宜时段中的最高总价。在剩余的正常时段，如果电池的能量缓冲在经济上不可行，则两个输出都将关闭。

- LTF 通道：功能类似于标准通道，但仅在“StartTime”和“StopTime”状态对象定义的时间范围内运行。在“StopTime”之后，通道将自行停用。“StartTime”和“StopTime”可能跨越数天。状态必须用 ISO-8601 格式的日期时间字符串填充，并带有时区偏移，例如：“2024-01-17T21:00:00.000+01:00”。此外，通道有一个名为“RepeatDays”的新状态参数，默认情况下设置为 0。如果将“RepeatDays”设置为正整数值，则一旦达到 StopTime，通道将通过将 StartTime 和 StopTime 增加“RepeatDays”中指定的天数来重复其周期。例如，对于每日重复，将“RepeatDays”设置为 1。

### 提示
逆向使用
例如，为了获得高峰时段而不是最佳时段，只需反转使用情况和参数：![计算器状态逆](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStatesInverse.png)通过交换 true <-> false，您将在第一行收到低成本的 true，在第二行收到高成本的 true（频道名称不是触发器，仍然可以自由选择）。

注意：对于高峰单小时，如示例中，您还需要调整小时数。 原来：5 -> 逆 (24-5) = 19 -> 您将在 5 个高峰时段获得真实结果。

#### LTF 频道
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

### 3.4.10 (2024-09-16)

-   (HombachC) add verification of poll interval (#518)
-   (HombachC) bumb date-fns to 4.0.0

### 3.4.9 (2024-09-15)

-   (HombachC) add adjustable Bridge poll intervall (#518)
-   (HombachC) add node.js 22 to the adapter testing (#519)
-   (HombachC) add docu link to config screen (#504)
-   (HombachC) repository cleanup
-   (HombachC) dependency updates

### 3.4.8 (2024-08-16)

-   (HombachC) updated axios because of vulnerability
-   (HombachC) added tests for Node.js 22

### 3.4.7 (2024-08-10)

-   (HombachC) adapter checker detected optimizations (#493)
-   (HombachC) improved error message (#490)

### 3.4.6 (2024-08-07)

-   (HombachC) Catch wrong OBIS Codes, probably caused by Pulse communication errors
-   (HombachC) code cleanup

### 3.4.5 (2024-07-31)

-   (HombachC) decode meter mode 4 for local Tipper Pulse poll (#477)
-   (HombachC) decode meter mode 1 for local Tipper Pulse poll (#478)
-   (HombachC) fixed wrong Pulse local status names (voltage)
-   (HombachC) add docu on local Pulse poll config screen (#479)
-   (HombachC) code cleanup
-   (HombachC) bump dependencies

### 3.4.4 (2024-07-28)

-   (HombachC) local poll of data - change units Wh to kWh and round to 0,1kWh (#469)

### 3.4.3 (2024-07-14)

-   (HombachC) added unit to Pulse temperature and round to 0,1°C
-   (HombachC) added unit to Pulse battery voltage and round to 100mV
-   (HombachC) added unit to Pulse uptime
-   (HombachC) added state with Pulse uptime as human readable string
-   (HombachC) reinitialize some TibberLocal states upon adapter startup
-   (HombachC) code optimisation
-   (HombachC) bump dependencies

### 3.4.2 (2024-07-13)

-   (HombachC) fix typos in units
-   (HombachC) fix type mismatch for state objects (#455)
-   (HombachC) code optimisation

### 3.4.1 (2024-07-13)

-   (HombachC) fix logging error
-   (HombachC) bump dependencies

### 3.4.0 (2024-07-12)

-   (HombachC) add mode for local poll of Pulse data (#201)

### 3.3.3 (2024-07-04)

-   (HombachC) fix sentry notified possible error
-   (HombachC) try to fix startup error (#444)

### 3.3.2 (2024-06-21)

-   (HombachC) fix 2 security issues in dependencies
-   (HombachC) fix sentry notified possible error

### 3.3.1 (2024-06-13)

-   (HombachC) fix small sentry discovered error (#418)
-   (HombachC) added note for multihomes to documentation (#422)

### 3.3.0 (2024-06-05)

-   (HombachC) implements optional, obsolete api call for total historical cost, incl. grid fees (#405)
-   (HombachC) Updates @iobroker/adapter-core from 3.1.6
-   (HombachC) Updates @iobroker/types from 5.0.19 to 6.0.0

### 3.2.1 (2024-06-03)

-   (HombachC) added unique endpoint string

### 3.2.0 (2024-06-03)

-   (HombachC) IMPORTANT: adapter components had been blocked by Tibber - you have to update!
-   (HombachC) bump base dependencies
-   (HombachC) adapter will use internal output states for calculator if none defined in configuration (#325)
-   (HombachC) implement first run mode in calculator to reduce system load
-   (HombachC) internal optimisations

### 3.1.2 (2024-05-20)

-   (HombachC) deleting unused temp home objects after adapter config (#393)
-   (HombachC) bump dependencies

### 3.1.1 (2024-05-16)

-   (HombachC) throttle down reconnection speed
-   (HombachC) logging optimizations (#396; #217)
-   (HombachC) adaptations to newer environment (#394; #395)

### 3.1.0 (2024-05-07)

-   (HombachC) enable manual control of configured outputs when automation is deactivated (#334)
-   (HombachC) fix not working LTF Channel when using too short LTF (#383)
-   (HombachC) code optimisations
-   (HombachC) update adapter-core to 3.1.4
-   (HombachC) bump dependencies

### 3.0.1 (2024-04-20)

-   (HombachC) updated adapter testing
-   (HombachC) bump dependencies

### 3.0.0 (2024-04-15)

-   (HombachC) BREAKING: dropped support for node.js 16 (#368)
-   (HombachC) BREAKING: js-controller >= 5 is required
-   (HombachC) changed to tier 2 as data provider
-   (HombachC) corrected io-package.json according to new schema (#368)
-   (HombachC) update typescript to 5.4.5
-   (HombachC) update adapter-core to 3.0.6

### 2.3.2 (2024-03-17)

-   (HombachC) code optimizations
-   (HombachC) fix undefined force mode (#349)
-   (HombachC) fix poll of not existing current price state (#348)
-   (HombachC) fix current price poll when configured as not to poll (#350)
-   (HombachC) bump dependencies

### 2.3.1 (2024-03-10)

-   (HombachC) BREAKING: Calculator channels of type 'smart battery buffer' will now switch outputs to 'OFF' only once, directly after setting the channel to Active=false (#332)
-   (HombachC) Fixed error in jsonConfig.json (#329)
-   (HombachC) deleted feed disconnect debug-message, cause warn message already exists
-   (HombachC) bump typescript-eslint to gen 7
-   (HombachC) bump dependencies

### 2.2.2 (2024-02-19)

-   (HombachC) simplify internal state handling
-   (HombachC) shorten home string in Calculator screen (#317)
-   (HombachC) fix feedback loop trap (#321)
-   (HombachC) add some tooltips to config screen (#317)

### 2.2.1 (2024-02-08)

-   (HombachC) fix edge case problems with defect feed data from Tibber server (#312)
-   (HombachC) bump dependencies

### 2.2.0 (2024-02-04)

-   (HombachC) add data points for BestHoursBlock results - period and average cost (#240)
-   (HombachC) fixed wrong error message texts
-   (HombachC) fix some possible edge cases in internal support functions
-   (HombachC) internal code docu optimization
-   (HombachC) bump dependencies

### 2.1.1 (2024-01-27)

-   (HombachC) fix reconnect error for Pulse feed (#300)
-   (HombachC) new error message handler
-   (HombachC) internal code docu optimization

### 2.1.0 (2024-01-21)

-   (HombachC) add repeatablity for LTF channels (#289)
-   (HombachC) tweak Smart Battery Buffer documentation

### 2.0.1 (2024-01-15)

-   (HombachC) modify timing in Tibber Pulse feed connect (#271)
-   (HombachC) bump dependencies

### 2.0.0 (2023-12-23)

-   (HombachC) BREAKING: dropped support for js-controller 3.x (#247)
-   (HombachC) diversificate Tibber server polls to prevent potential DDoS reactions (#252)
-   (HombachC) add data point for averageRemaining of todays prices (#254)
-   (HombachC) add 2 data points for last successfull update of today and tomorrow prices (#261)
-   (HombachC) year 2024 changes
-   (HombachC) fix small error in dynamic feed timing
-   (HombachC) bump dependencies

### 1.8.1 (2023-12-16)

-   (HombachC) add notice about changes in configuration

### 1.8.0 (2023-12-14)

-   (HombachC) implement optional disable of price pull (#232)
-   (HombachC) implement price categorization algorithm for battery buffer applications (#193)
-   (HombachC) Fix 2 errors in pull of prices tomorrow (#235, #232)
-   (HombachC) changed Tibber link in config

### 1.7.2 (2023-12-07)

-   (HombachC) implemented dynamic raise of feed reconnect (#225)
-   (HombachC) small bugfix in pricecalls
-   (HombachC) first changes for "smart battery buffer" (#193)
-   (HombachC) update typescript to 5.3.3

### 1.7.1 (2023-12-04)

-   (HombachC) added hint for consumption data in documentation (#223)
-   (HombachC) mitigate error handling (#217)
-   (HombachC) added description to object Features/RealTimeConsumptionEnabled (#224)
-   (HombachC) bump dependencies

### 1.7.0 (2023-11-30)

-   (HombachC) implement getting historical consumption data from Tibber Server (#163)
-   (HombachC) fix error in adapter unload
-   (HombachC) some code optimisations

### 1.6.1 (2023-11-26)

-   (HombachC) cleanup in documentation and translation handling

### 1.6.0 (2023-11-26)

-   (HombachC) fixed major bug in 1.5.0, not working calculator channels (#212)
-   (HombachC) implement limit calculations to a time frame (#153)
-   (HombachC) fix error of missing price data upon not working tibber server connect at adapter start (#204)
-   (HombachC) fixed possible error with wrong price date in multi home systems
-   (HombachC) fixed possible type error, notified by Sentry
-   (HombachC) added some documentation for inverse use of channels (#202)
-   (HombachC) added Sentry statistics
-   (HombachC) optimize translation handling
-   (HombachC) bump dependencies

### 1.5.0 (2023-11-13)

-   (HombachC) implement calculator channel names (#186)
-   (HombachC) fix error in cron jobs (#190)
-   (HombachC) remove not used calculator channel state objects (#188)
-   (HombachC) code optimizations
-   (HombachC) optimize translation handling

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2024 C.Hombach <TibberLink@homba.ch>