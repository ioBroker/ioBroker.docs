---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: KHM5GpkYTDpCd70rMMRiLrxFl/0kkl5zoIChLlYBnyA=
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
## 哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅<a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">Sentry 插件文档</a>！

## 用于在 ioBroker 中使用 Tibber Energy 数据的适配器
这款适配器可将您 Tibber 账户的 API 数据连接到 ioBroker，无论是单个住宅还是多个住宅。

它还支持通过家庭网络直接读取 Tibber Pulse 传感器的本地数据，从而实现实时监控和数据采集，而无需完全依赖云端 API。

如果您目前还不是 Tibber 用户，如果您能使用我的推荐链接，我将不胜感激：[Tibber推荐链接](https://invite.tibber.com/mu8c82n5)。

## 文档
- [标准配置](#standard-configuration) — 首次设置、API令牌、主页、历史数据
- [计算器配置](docu/CalculatorConfiguration.md) — 基于价格的自动化渠道和智能电池缓冲
- [图表输出配置](docu/GraphOutput.md) — 使用 E-Charts / FlexCharts 可视化价格
- [车辆和充电器配置](docu/VehiclesAndChargers.md) — 用于汽车和壁挂式充电桩的 Tibber 数据 API 设置
- [直接本地轮询 Pulse 数据](docu/LocalPulse.md) — 本地读取 Pulse 数据，支持的计量模式

## 标准配置
首先创建适配器的新实例。
- 您还需要 Tibber 的 API 令牌，您可以从这里获取：[Tibber Developer API](https://developer.tibber.com)。
- 在标准设置中输入您的 Tibber API 令牌，并至少配置一行实时信息流设置（选择“无可用”）。
- 保存设置并退出配置以重新启动适配器；此步骤允许 Tibber 服务器首次查询您的家庭。
- 返回配置界面，选择您希望使用 Tibber Pulse 获取实时数据的家庭。您也可以选择家庭并禁用数据馈送（注意：此功能仅在硬件已安装且 Tibber 服务器已验证与 Pulse 的连接后才有效）。
注意：如果您的 Tibber 帐户中有多个房屋，则必须全部添加，以避免因不需要的房屋而导致错误消息。请添加所有房屋，然后禁用不需要的房屋。
例如，如果您只打算使用 Pulse 实时数据，您可以选择停用今天和明天的价格数据检索功能。
- 您可以选择启用历史消费数据检索功能。请指定小时、天、周、月和年的数据集数量。您可以根据个人喜好，使用“0”禁用一个或多个时间段的数据。
注意：务必注意数据集的大小，因为过大的请求可能会导致 Tibber 服务器无响应。我们建议您尝试不同的数据集大小，以确保最佳功能。调整时间间隔和数据集数量有助于在获取有价值的数据和保持服务器响应速度之间找到合适的平衡点。例如，建议的小时数设置为 48。
- 保存设置。

## 消费数据文档
启用每日历史消费数据后，适配器会提供当月的汇总状态：

- `Homes.<HOME-ID>.Consumption.currentMonthConsumption`

此状态表示当前日历月（`kWh`）的总消耗量，由 Tibber 返回的每日消耗量数据计算得出。如果配置的天数过少，则该值仅反映配置的天数，而非完整的月份。

## 计算器配置
该计算器在 Tibber 连接的基础上增加了基于价格的自动化功能：每个家庭的通道可根据最便宜/最贵的时段切换外部状态、价格阈值、最佳时段、百分比范围、限时范围 (LTF) 和智能电池缓冲模式。

📖 **完整指南：[文档/CalculatorConfiguration.md](docu/CalculatorConfiguration.md)**

## 图形输出配置
该适配器有助于可视化价格趋势和计算器结果——从简单的基于 JSON 的方法（通过“E-Charts”/“FlexCharts”适配器）到完全定制的 JavaScript 解决方案。

📖 **完整指南：[文档/GraphOutput.md](docu/GraphOutput.md)**

## 直接本地轮询 Pulse 数据
该适配器可以通过家庭网络（经由 Tibber Bridge）本地读取 Tibber Pulse 数据，而无需完全依赖云端数据源，并将计量数据每 2 秒写入 ioBroker 状态。它同时支持二进制 SML 和纯文本 OBIS 计量表。

📖 **完整指南（桥接设置、支持的计量模式）：[文档/LocalPulse.md](docu/LocalPulse.md)**

## 车辆和充电器配置
除了主 API 令牌外，该适配器还可以从独立的 **Tibber 数据 API** (`data-api.tibber.com`) 读取物联网设备数据（车辆、充电器），该 API 需要进行 OAuth2 客户端注册和一次性授权。车辆数据写入 `Vehicles.<VIN>.*`，充电器数据写入 `Chargers.<id>.*`。

📖 **完整设置指南（客户端注册、授权、可用状态）：[文档/车辆和充电器.md](docu/VehiclesAndChargers.md)**

捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a>如果你喜欢这个项目——或者只是想慷慨解囊，不妨请我喝杯啤酒。干杯！🍻

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 7.2.2 (2026-08-22)

- (HombachC) fixed local Pulse meter mode 5 (plain OBIS text, e.g. eBZ meters) not being parsed, leaving states frozen (#931)
- (HombachC) documented the supported Pulse meter modes (README + Info/PulseMeterModes.md)
- (HombachC) restructured the README: moved the Calculator, Graph Output, Local Pulse and Vehicles & Chargers guides into separate files under docu/
- (HombachC) updated dependencies

### 7.2.1 (2026-08-10)

- (HombachC) fixed charger devices with an empty externalId (e.g. Wallbox Pulsar Plus) producing an invalid state id; a single bad device no longer aborts the whole Data API poll (#925)
- (HombachC) projectUtils: use extendObject instead of setObject in forceMode so user customizations survive restarts (#927)
- (HombachC) projectUtils: fixed min/max/step value of 0 being dropped from number state definitions
- (HombachC) updated tibber-api to 5.6.0
- (HombachC) updated dependencies

### 7.2.0 (2026-07-30)

- (HombachC) added polling of charger/wallbox devices from the Tibber Data API, written to `Chargers.<id>.*` (#925)
- (HombachC) added a `LastSeen` state (device-reported last-seen timestamp) for vehicles and chargers

### 7.1.5 (2026-07-12)

- (HombachC) added a regression test confirming best single hours LTF no longer switches on the wrong day (#631)
- (HombachC) worked around a Tibber server bug that returns `to` equal to `from` in weekly historical consumption data (#890)
- (HombachC) removed redundant test devDependencies (chai, chai-as-promised, sinon-chai, proxyquire) and switched unit tests to Node's built-in assert

### 7.1.4 (2026-07-09)

- (HombachC) fixed regression where smart battery buffer ignored the EfficiencyLoss parameter (#918)

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2026 C.Hombach <TibberLink@homba.ch>