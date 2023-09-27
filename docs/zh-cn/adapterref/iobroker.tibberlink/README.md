---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: q6tcD9V+1vd5xqcZioq6ggdpTrbdXmpu6Fb7CjcRpVM=
---
![标识](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.tibberlink.svg)
![NPM版本（稳定）](https://iobroker.live/badges/tibberlink-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tibberlink.svg)
![安装数量（最新）](https://iobroker.live/badges/tibberlink-installed.svg)
![已知漏洞](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![国家公共管理](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# IoBroker.tibberlink
**CI 测试：** ![测试与发布](https://github.com/hombach/ioBroker.tibberlink/workflows/Test%20and%20Release/badge.svg) [![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)

## 在 iOBroker 中使用 TIBBER 能源数据的适配器
用于链接来自 Tibber 帐户 API 的数据以在 ioBroker 中使用的适配器

如果您现在还不是 Tibber 用户，那么当您使用我的 reveral 链接时，我们将不胜感激：

[https://invite.tibber.com/2gwuign3。](https://invite.tibber.com/2gwuign3.)

＃＃ 配置
1. 创建适配器的新实例
2. 您还需要 Tibber 提供的 API 令牌。在这里获取：[https://developer.tibber.com/](https://developer.tibber.com/)
3. 填写您的 Tibber API 令牌 -> 创建至少一行实时源配置（选择“无可用”）
4. 保存设置并保留配置以重新启动适配器（现在将从 Tibber 服务器轮询您的家庭）
4. 返回配置屏幕并选择主目录以从 Tibber Pulse 提取实时数据，或者选择主目录并禁用源 -（！！仅在安装了硬件且 Tibber 服务器验证了与 Pulse 的连接时才有效）
5. 保存设置

## 注释
该适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关更多详细信息以及有关如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## Changelog
! Note that missing version entries are typically dependency updates for improved security.

### 0.4.1 (2023-09-24)
* (HombachC) Hardened 2 typeerrors uppon sentry recognition
* (HombachC) Fix error with not deleted averages of tomorrow pricing (#95)
* (HombachC) preparations for tibber calculator
### 0.4.0 (2023-09-20)
* (HombachC) Added daily average price values (#89)
### 0.3.3 (2023-09-17)
* (HombachC) Fixed false positive connection message (#87)
* (HombachC) Updated translations with ChatGPT
* (HombachC) preparations for tibber calculator
### 0.3.2 (2023-09-14)
* (HombachC) Fixed error when starting adapter first time (#82)
* (HombachC) Fixed error in admin config from 0.3.0 (#81)
### 0.3.1 (2023-09-13)
* (HombachC) Mitigate error in admin config from 0.3.0 (#81)
* (HombachC) Change logging of TibberFeed errors from type error to type warn - because of too many downtimes of Tibber server (#80)
### 0.3.0 (2023-09-12)
* (HombachC) BREAKING: change Pulse usage to be configurable for all homes seperately (#41)
* (HombachC) optimize code again to mitigate set state timing for long JSON states (#68)
* (HombachC) preparations for tibber calculator
### 0.2.7 (2023-09-07)
* (HombachC) reducing polls at Tibber server by precheck of current price data
* (HombachC) preparations for tibber calculator
### 0.2.6 (2023-09-04)
* (HombachC) fix error with boolean states
### 0.2.5 (2023-09-03)
* (HombachC) optimize code to mitigate set state timing for long JSON states (#68) 
### 0.2.4 (2023-08-30)
* (HombachC) enable correct price poll also for adapter running in different timezones (#63) 
### 0.2.3 (2023-08-27)
* (HombachC) fix error in 0.2.2 in start conditions of adapter
### 0.2.2 (2023-08-24)
* (HombachC) reducing polls at Tibber server by precheck of known data
* (HombachC) code optimizations
* (HombachC) fix config screen (#55)
### 0.2.1 (2023-08-21)
* (HombachC) double timeout for Tibber server queries
### 0.2.0 (2023-08-18)
* (HombachC) introduces JSONs for prices sorted by price ascending
* (HombachC) fix stupid error for obsolete next day pricing (#23, #50)
### 0.1.10 (2023-08-15)
* (HombachC) bump dependencies, code cleanups
* (HombachC) preparations for tibber calculator
* (HombachC) mitigate multi homes & pulse problems (#41)
* (HombachC) add documentation to config screen (#47)
### 0.1.9 (2023-08-14)
* (HombachC) optimizing fetching homes list (#32) after Tibber server error, restart adapter in case of trouble
### 0.1.8 (2023-08-12)
* (HombachC) bump dev-dependencies, fix eslint/prettier issue
### 0.1.7 (2023-08-11)
* (HombachC) code cleanup, fix error for obsolete next day pricing (#23)
* (HombachC) add another try/catch while fetching homes list (#32)
### 0.1.6 (2023-07-30)
* (HombachC) add units for live data, bump adapter-core to 3.x
### 0.1.5 (2023-07-18)
* (HombachC) fix error in sentry logging
### 0.1.4 (2023-07-17)
* (HombachC) BREAKING: encrypted API-Token in ioBroker
* (HombachC) rearranged configuration options
* (HombachC) fixed bug in state generation
### 0.1.3 (2023-07-17)
* (HombachC) all log messages in English
* (HombachC) remove unused state change handler
* (HombachC) fixed state roles
### 0.1.2 (2023-07-17)
* (HombachC) round grid consumption meter values to Wh accuracy
* (HombachC) hide unused checkboxes in config
* (HombachC) fix snyc and appveyor
### 0.1.1 (2023-07-16)
* (HombachC) remove release script and dev-server
### 0.1.0 (2023-07-14)
* (HombachC) initial version

## License
GNU General Public License v3.0 only

Copyright (c) 2023 Hombach <TibberLink@homba.ch>