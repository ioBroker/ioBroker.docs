---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: LT/LhbUF0XVZzj2ztND+GmoRHWjQULtqliGgbKeB0qc=
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
该适配器有助于连接来自 Tibber 账户 API 的数据，以便在 ioBroker 内使用，无论是单个家庭还是多个住宅。

如果您当前不是 Tibber 用户，如果您能使用我的推荐链接，我将不胜感激：[蒂伯推荐链接](https://invite.tibber.com/mu8c82n5)。

## 标准配置
- 首先创建适配器的新实例。
- 您还需要 Tibber 提供的 API 令牌，您可以在此处获取：[Tibber Developer API](https://developer.tibber.com)。
- 在标准设置中输入您的 Tibber API 令牌，并为实时源设置配置至少一行（选择“无可用”）。
- 保存设置并退出配置以重新启动适配器；此步骤允许从 Tibber 服务器查询您的家庭。
- 返回配置屏幕并选择您希望使用 Tibber Pulse 从中获取实时数据的家庭。您还可以选择家庭并禁用源（注意：这仅在安装了硬件并且 Tibber 服务器已验证与 Pulse 的连接时才有效）。
- 保存设置。

## 计算器配置
- 既然 Tibber 连接已启动并运行，您还可以利用计算器将其他自动化功能合并到 TibberLink 适配器中。
- 计算器使用频道进行操作，每个频道都链接到选定的家庭。
- 这些通道可以根据相应的状态被激活或停用。
- 这些状态旨在用作 TibberLink 的外部动态输入，例如，允许您从外部源调整边际成本（“TriggerPrice”）或禁用计算器通道（“Active”）。
- 计算器通道的状态位于与主状态相邻的位置，并根据通道编号命名。

    ![计算器状态](../../../en/adapterref/iobroker.tibberlink/admin/calculatorStates.png)

- 每个渠道的行为由其类型决定：“最佳成本”、“最佳单小时”或“最佳小时块”。
- 每个通道都会填充一个外部状态作为输出，必须在设置选项卡中选择该状态。例如，此状态可能是“0_userdata.0.example_state”或任何其他可写外部状态。
-要写入输出状态的值可以在“值是”和“值否”中定义，例如，“真”表示布尔状态或要写入的数字或文本。
- 输出：
    - “最佳成本”：利用“TriggerPrice”状态作为输入，当当前 Tibber 能源成本低于触发价格时，每小时输出“YES”。
    - “最佳单小时”：在最便宜的小时数期间输出为“YES”，该数字在“AmountHours”状态中定义。
    - “最佳时间块”：在最佳时间块期间输出为“YES”，其中小时数在“AmountHours”状态中定义。

## 注释
该适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关如何禁用错误报告的更多详细信息和信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry 报告是从 js-controller 3.0 开始启动的。

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 1.4.2 (2023-11-xx) WORK in PROGRESS

-   (HombachC) complete rework of task scheduling for more precise pull timing (#149)
-   (HombachC) critical vulnerability fix for axios
-   (HombachC) fix debug message typos, code optimisations
-   (HombachC) fix type error in price average calculation notified by Sentry

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

### 0.4.2 (2023-10-03)

-   (HombachC) fixed error with polling multiple homes live data (#108)
-   (HombachC) Lots of dependency updates; code optimizations

### 0.4.1 (2023-09-24)

-   (HombachC) Hardened 2 typeerrors uppon sentry recognition
-   (HombachC) Fix error with not deleted averages of tomorrow pricing (#95)
-   (HombachC) preparations for tibber calculator

### 0.4.0 (2023-09-20)

-   (HombachC) Added daily average price values (#89)

### 0.3.3 (2023-09-17)

-   (HombachC) Fixed false positive connection message (#87)
-   (HombachC) Updated translations with ChatGPT
-   (HombachC) preparations for tibber calculator

### 0.3.2 (2023-09-14)

-   (HombachC) Fixed error when starting adapter first time (#82)
-   (HombachC) Fixed error in admin config from 0.3.0 (#81)

### 0.3.1 (2023-09-13)

-   (HombachC) Mitigate error in admin config from 0.3.0 (#81)
-   (HombachC) Change logging of TibberFeed errors from type error to type warn - because of too many downtimes of Tibber server (#80)

### 0.3.0 (2023-09-12)

-   (HombachC) BREAKING: change Pulse usage to be configurable for all homes seperately (#41)
-   (HombachC) optimize code again to mitigate set state timing for long JSON states (#68)
-   (HombachC) preparations for tibber calculator

### 0.2.7 (2023-09-07)

-   (HombachC) reducing polls at Tibber server by precheck of current price data
-   (HombachC) preparations for tibber calculator

### 0.2.6 (2023-09-04)

-   (HombachC) fix error with boolean states

### 0.2.5 (2023-09-03)

-   (HombachC) optimize code to mitigate set state timing for long JSON states (#68)

### 0.2.4 (2023-08-30)

-   (HombachC) enable correct price poll also for adapter running in different timezones (#63)

### 0.2.3 (2023-08-27)

-   (HombachC) fix error in 0.2.2 in start conditions of adapter

### 0.2.2 (2023-08-24)

-   (HombachC) reducing polls at Tibber server by precheck of known data
-   (HombachC) code optimizations
-   (HombachC) fix config screen (#55)

### 0.2.1 (2023-08-21)

-   (HombachC) double timeout for Tibber server queries

### 0.2.0 (2023-08-18)

-   (HombachC) introduces JSONs for prices sorted by price ascending
-   (HombachC) fix stupid error for obsolete next day pricing (#23, #50)

### 0.1.10 (2023-08-15)

-   (HombachC) bump dependencies, code cleanups
-   (HombachC) preparations for tibber calculator
-   (HombachC) mitigate multi homes & pulse problems (#41)
-   (HombachC) add documentation to config screen (#47)

### 0.1.9 (2023-08-14)

-   (HombachC) optimizing fetching homes list (#32) after Tibber server error, restart adapter in case of trouble

### 0.1.8 (2023-08-12)

-   (HombachC) bump dev-dependencies, fix eslint/prettier issue

### 0.1.7 (2023-08-11)

-   (HombachC) code cleanup, fix error for obsolete next day pricing (#23)
-   (HombachC) add another try/catch while fetching homes list (#32)

### 0.1.6 (2023-07-30)

-   (HombachC) add units for live data, bump adapter-core to 3.x

### 0.1.5 (2023-07-18)

-   (HombachC) fix error in sentry logging

### 0.1.4 (2023-07-17)

-   (HombachC) BREAKING: encrypted API-Token in ioBroker
-   (HombachC) rearranged configuration options
-   (HombachC) fixed bug in state generation

### 0.1.3 (2023-07-17)

-   (HombachC) all log messages in English
-   (HombachC) remove unused state change handler
-   (HombachC) fixed state roles

### 0.1.2 (2023-07-17)

-   (HombachC) round grid consumption meter values to Wh accuracy
-   (HombachC) hide unused checkboxes in config
-   (HombachC) fix snyc and appveyor

### 0.1.1 (2023-07-16)

-   (HombachC) remove release script and dev-server

### 0.1.0 (2023-07-14)

-   (HombachC) initial version

## License

GNU General Public License v3.0 only

Copyright (c) 2023 Hombach <TibberLink@homba.ch>