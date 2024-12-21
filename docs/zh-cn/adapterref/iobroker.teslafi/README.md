---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.teslafi/README.md
title: ioBroker.teslafi
hash: MFeotZ8hkjwmdHiXxk+qNPxZ3kM1dwoMGTw2Ef24lLw=
---
![标识](../../../en/adapterref/iobroker.teslafi/admin/teslafi.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.teslafi.svg)
![下载](https://img.shields.io/npm/dm/iobroker.teslafi.svg)
![节点](https://img.shields.io/node/v-lts/iobroker.teslafi?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.teslafi?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.teslafi?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub 上次提交](https://img.shields.io/github/last-commit/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub 工作流程状态](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.teslafi/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.teslafi?branch=master&svg=true)
![SNYK 已知漏洞](https://snyk.io/test/github/hombach/ioBroker.teslafi/badge.svg)
![测试版](https://img.shields.io/npm/v/iobroker.teslafi.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/teslafi-stable.svg)
![已安装](https://iobroker.live/badges/teslafi-installed.svg)
![新平台](https://nodei.co/npm/iobroker.teslafi.png?downloads=true)

# IoBroker.teslafi
[![CodeQL]（https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml/badge.svg）](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml)

## 版本
# IoBroker TeslaFi 适配器 – 为您的智能家居无缝集成特斯拉数据
TeslaFi 适配器可轻松将 TeslaFi 帐户中的车辆数据集成到 ioBroker 系统中。利用这些数据来增强您的 Tesla 体验并优化家庭自动化工作流程。

## 为什么选择这个适配器？
该适配器的主要目的是将特斯拉数据集成到 ioBroker 中，而无需直接查询车辆系统。通过利用 TeslaFi 现有的数据轮询，该适配器可避免向车辆发出额外请求，从而延长电池寿命并确保高效的数据访问。

＃＃ 特征
该适配器连接到 TeslaFi API 以检索有关您的特斯拉车辆的全面详细信息，并使这些数据可在 ioBroker 中访问。TeslaFi 支持的所有特斯拉车型都完全兼容。目前，可用的数据类别如下：

- **热状态**：了解热管理系统和温度。
- **电池状态**：有关电池状态、电量和续航里程的信息。
- **车辆状态**：车辆的一般状态，包括位置和整体状况。
- **车辆数据**：车辆具体细节，如名称和 VIN。

典型用例
- **自动化**：根据特斯拉的实时状态触发智能家居操作。例如，当车辆到达时自动调节家庭气候控制。
- **能源管理**：通过安排车辆充电时间和直接从 ioBroker 监控电池状态来优化能源消耗。
- **通知和报告**：为特定车辆状况设置警报，例如电池电量低、充电完成或可用更新。

＃＃ 配置
配置适配器很简单：

1. 在适配器的配置屏幕中输入您的 TeslaFi API 密钥。
2. 设置所需的轮询间隔以定制数据更新的频率。

＃＃ 兼容性
该适配器与 TeslaFi 支持的所有特斯拉车型兼容。需要具有 API 访问权限的有效 TeslaFi 帐户。

## 积极开发和用户贡献
TeslaFi 适配器得到积极维护，并且可以根据用户请求添加其他功能或数据类别。欢迎随时提交您的想法并帮助整个社区改进适配器！

哨兵
此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关如何禁用错误报告的更多详细信息和信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告从 js-controller 3.0 开始启动。

## 捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=6EE4YUJRK7UWC"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.teslafi/master/docu/bluePayPal.svg" height="40"></a>如果你喜欢这个项目 — — 或者只是觉得慷慨，可以考虑给我买杯啤酒。干杯！:beers:

## Changelog

### 0.4.6 (2024-12-21)

- (hombach) fix chai-as-promised
- (hombach) enrich documentation

### 0.4.5 (2024-12-11)

- (hombach) change some state roles

### 0.4.4 (2024-12-10)

- (hombach) add roles to projectUtils

### 0.4.3 (2024-12-09)

- (hombach) use of ioBroker.setInterval

### 0.4.2 (2024-12-06)

- (hombach) intruduce i18n for translations (#41)

### 0.4.1 (2024-11-28)

- (hombach) intruduce 'iobroker/eslint-config' (#67)
- (hombach) add axios timeout
- (hombach) optimized code stability
- (hombach) fix typo
- (hombach) remove message handler

### 0.4.0 (2024-11-10)

- (hombach) implement managed charging time (#29)
- (hombach) implement battery range
- (hombach) fixed errors in 'time to finish charge'
- (hombach) changed min update interval to 10 sec
- (hombach) fixed typos

### 0.3.0 (2024-11-08)

- (hombach) implement string for time to finish charge (#42)
- (hombach) reorganize data in folders (#43)
- (hombach) show 3rd row seat heater only if 3rd row is available (#40)
- (hombach) implement 'charging_state' (#37)

### 0.2.1 (2024-11-08)

- (hombach) change 'time_to_full_charge' type to number (#38)
- (hombach) total rework of vehicle data parser
- (hombach) set speed to 0 if null in API data (#39)

### 0.2.0 (2024-11-07)

- (hombach) implement raw data state (#26)
- (hombach) implement charger_phases (#28)
- (hombach) implement driver_temp_setting (#31)
- (hombach) implement seat and steeringwheel heater states (#30)

### 0.1.5 (2024-11-06)

- (hombach) harmonize project tools
- (hombach) removed doubled texts in state names

### 0.1.4 (2024-11-01)

- (hombach) fix conversion error

### 0.1.3 (2024-10-30)

- (hombach) fix typo in error text
- (hombach) optimize responsive design
- (hombach) bump dependencies

### 0.1.2 (2024-10-28)

- (hombach) introduce to ioBroker latest repo
- (hombach) bump dependencies

### 0.1.1 (2024-10-26)

- (hombach) fix npm error

### 0.1.0 (2024-10-26)

- (hombach) first working version

### 0.0.1 (2024-10-24)

- (hombach) initial release

## License

MIT License

Copyright (c) 2024 C.Hombach <TeslaFi@homba.ch>

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