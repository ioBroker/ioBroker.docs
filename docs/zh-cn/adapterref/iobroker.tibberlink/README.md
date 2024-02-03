---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: ED3GjjBJeou0pwxCdD01AuMWY1rrtMYPLzc6uZcLvQQ=
---
![标识](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub 工作流程状态](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=main&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![SNYK 已知漏洞](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![贝塔](https://img.shields.io/npm/v/iobroker.tibberlink.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/tibberlink-stable.svg)
![已安装](https://iobroker.live/badges/tibberlink-installed.svg)
![国家公共管理](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# IoBroker.tibberlink
[![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)

## 版本
## 在 ioBroker 中利用 TIBBER 能源数据的适配器
该适配器有助于连接来自 Tibber 帐户 API 的数据，以便在 ioBroker 内使用，无论是单个家庭还是多个住宅。

如果您当前不是 Tibber 用户，如果您能使用我的推荐链接，我将不胜感激：[蒂伯推荐链接](https://invite.tibber.com/mu8c82n5)。

## 标准配置
- 首先创建适配器的新实例。
- 您还需要 Tibber 的 API 令牌，您可以在此处获取：[Tibber Developer API](https://developer.tibber.com)。
- 在标准设置中输入您的 Tibber API 令牌，并为实时源设置配置至少一行（选择“无可用”）。
- 保存设置并退出配置以重新启动适配器；此步骤允许第一次从 Tibber 服务器查询您的家庭。
- 返回配置屏幕并选择您希望使用 Tibber Pulse 从中获取实时数据的家庭。您还可以选择家庭并禁用源（注意：这仅在安装了硬件并且 Tibber 服务器已验证与 Pulse 的连接时才有效）。
- 例如，如果您只想使用 Pulse 实时提要，您可以选择停用今天和明天的价格数据检索
- 您也可以选择启用历史消耗数据的检索。请指定小时、天、周、月和年的数据集数量。您可以根据您的喜好使用“0”来禁用这些间隔中的一个或多个。
- 注意：必须注意数据集的大小，因为过大的请求可能会导致 Tibber 服务器缺乏响应。我们建议尝试数据集大小以确保最佳功能。调整间隔和数据集数量有助于在获取有洞察力的数据和保持服务器响应能力之间取得适当的平衡。例如。 48 小时是一个相当不错的数量。
- 保存设置。

## 计算器配置
- 既然 Tibber 连接已启动并运行，您还可以利用计算器将其他自动化功能合并到 TibberLink 适配器中。
- 计算器使用频道进行操作，每个频道都链接到选定的家庭。
- 这些通道可以根据相应的状态被激活或停用。
- 这些状态旨在用作 TibberLink 的外部动态输入，例如，允许您从外部源调整边际成本（“TriggerPrice”）或禁用计算器通道（“Active”）。
- 计算器通道的状态位于与主状态相邻的位置，并根据通道编号命名。因此，此处显示在管理屏幕中选择的频道名称，以更好地识别您的配置。

    ![计算器状态](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStates.png)

- 每个通道的行为由其类型决定：“最佳成本 (LTF)”、“最佳单小时 (LTF)”、“最佳小时块 (LTF)”或“智能电池缓冲器”。
- 每个通道填充一个或两个外部状态作为输出，必须在设置选项卡中选择。例如，此状态可能是“0_userdata.0.example_state”或任何其他可写外部状态。
-要写入输出状态的值可以在“值是”和“值否”中定义，例如，“真”表示布尔状态或要写入的数字或文本。
- 输出：
    - “最佳成本”：利用“TriggerPrice”状态作为输入，当当前 Tibber 能源成本低于触发价格时，每小时生成“YES”输出。
    - “最佳单小时”：在最便宜的小时内生成“YES”输出，其数量在“AmountHours”状态中定义。
    -“最佳时间段”：在最具成本效益的时间段内输出“YES”，其中“AmountHours”状态中指定了小时数。

        此外，确定的块中的平均总成本被写入该通道的输入状态附近的状态“AverageTotalCost”。此外，该块的第一个小时和最后一个小时也会作为计算结果写入“BlockStartTime”和“BlockEndTime”。

    - “最佳成本 LTF”：有限时间范围 (LTF) 内的“最佳成本”。
    - “最佳单小时 LTF”：有限时间范围 (LTF) 内的“最佳单小时”。
    - “最佳时间段 LTF”：有限时间范围 (LTF) 内的“最佳时间段”。
    - “智能电池缓冲器”：利用“EfficiencyLoss”参数指定电池系统的效率损失。 “EfficiencyLoss”参数的范围可以从 0 到 1，其中 0 表示没有效率损失，1 表示完全效率损失。例如，值 0.25 表示充电/放电循环的效率损失为 25%。

        使用“AmountHours”参数输入所需的电池充电小时数。计算器将在指定的“AmountHours”最便宜时间内激活电池充电（“值是”）并停用电池供电（“值 2 否”）。相反，它会在成本最高的时段停用电池充电（“值 NO”）并激活电池供电（“值 2 YES”），前提是成本高于便宜时段中的最高总价。在剩余的正常时间内，电池缓冲能量在经济上不可行，两个输出都将关闭。

- LTF 通道：功能与标准通道类似，但仅在“StartTime”和“StopTime”状态对象定义的时间范围内运行。 “StopTime”之后，通道将自行停用。 “StartTime”和“StopTime”可能跨越几天。状态必须使用带有时区偏移量的 ISO-8601 格式的日期时间字符串填充，例如：“2024-01-17T21:00:00.000+01:00”。此外，通道还有一个名为“RepeatDays”的新状态参数，默认设置为 0。如果“RepeatDays”设置为正整数值，则一旦达到 StopTime，通道将通过将 StartTime 和 StopTime 增加“RepeatDays”中指定的天数来重复其循环。例如。对于每日重复，请将“RepeatDays”设置为 1。”

### 提示
#### 逆向用法
例如，要获得高峰时段而不是最佳时段，只需反转使用情况和参数即可：![计算器状态逆](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStatesInverse.png) 通过交换 true <-> false，您将在第一行中以较低的成本收到 true，并在第二行的成本很高（频道名称不是触发器，仍然可以自由选择）。

注意：对于高峰单小时，例如示例中，您还需要调整小时数。原：5 -> 逆(24-5) = 19 -> 您将在5个高峰时段获得真实结果。

#### LTF 频道
计算是针对“多日”数据执行的。由于我们只有“今天”和“明天”的信息（大约 13:00 之后提供），因此时间范围实际上被限制为最多 35 小时。然而，留意这种行为至关重要，因为当明天价格的新数据可用时，计算结果可能会在 13:00 左右发生变化。

要观察标准通道时间范围的动态变化，您可以选择跨越数年的有限时间范围 (LTF)。这对于“最佳单小时 LTF”场景特别有用。

## 哨兵
该适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关如何禁用错误报告的更多详细信息和信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry 报告是从 js-controller 3.0 开始启动的。

## 捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a>如果你喜欢这个项目——或者只是觉得慷慨，可以考虑给我买瓶啤酒。干杯! ：啤酒：

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 2.2.0 (2024-02-xx) - WORK in PROGRESS

-   (HombachC) add data points for BestHoursBlock results - period and average cost (#240)
-   (HombachC) fixed wrong error message texts
-   (HombachC) fix some possible edge cases in internal support functions
-   (HombachC) internal code docu optimization

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

### 1.4.3 (2023-11-08)

-   (HombachC) fix possible type error in first calculator calls notified by Sentry
-   (HombachC) change state object description of production values (#167)
-   (HombachC) optimize pulse feed error message in case of error as object (#176)
-   (HombachC) preparations for calculator object names (#186)
-   (HombachC) bump dependencies

### 1.4.2 (2023-11-03)

-   (HombachC) complete rework of task scheduling for more precise pull timing (#149)
-   (HombachC) critical vulnerability fix for axios
-   (HombachC) fix debug message typos, code optimisations in calculator
-   (HombachC) fix type error in price average calculation notified by Sentry
-   (HombachC) fix error in update prices tomorrow - possible false positive

### 1.4.1 (2023-10-25)

-   (HombachC) implement forced update of all data after adapter restart (#155)
-   (HombachC) Bump actions/setup-node from 3.8.1 to 4.0.0 (#157)
-   (HombachC) remove node.js 16 actions - dependency updates

### 1.4.0 (2023-10-24)

-   (HombachC) implement min/max states (#131)
-   (HombachC) fix error with ignored calculator channel deaktivations (#143)
-   (HombachC) optimize translation handling, code cleanup

### 1.3.1 (2023-10-21)

-   (HombachC) fix initialisiation of channel states (#141)
-   (HombachC) change message "reconnect successful" to level info (#80)
-   (HombachC) documentation tweaks - dependency updates

### 1.3.0 (2023-10-20)

-   (HombachC) implement tibber calculator mode "best hours block" (#16)
-   (HombachC) handle empty calculator destination states - detected by sentry

### 1.2.0 (2023-10-18)

-   (HombachC) implement tibber calculator mode "best single hours" (#16)
-   (HombachC) changed i18n files to inline translations, single files aren't update compatible (#128)
-   (HombachC) fixed error in initial read of calculator states (#129)

### 1.1.2 (2023-10-15)

-   (HombachC) fix timing error in calculator

### 1.1.1 (2023-10-14)

-   (HombachC) fix error in startup of additional channels

### 1.1.0 (2023-10-14)

-   (HombachC) implement tibber calculator mode "best price" (#16)
-   (HombachC) precised pull times of current cost
-   (HombachC) reduced error messages (#80)
-   (HombachC) extend documentation
-   (HombachC) update adapter-core

### 1.0.0 (2023-10-05)

-   (HombachC) Increase to the first major release, as now a stable level is reached
-   (HombachC) Code cleanup

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2024 C.Hombach <TibberLink@homba.ch>