---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.teslafi/README.md
title: ioBroker.teslafi
hash: KhgkAlZZc0UTF1M0lHLFVxmCTUDao3rnXFVGnOEKgYg=
---
![标识](../../../en/adapterref/iobroker.teslafi/admin/teslafi.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.teslafi.svg)
![下载](https://img.shields.io/npm/dm/iobroker.teslafi.svg)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.teslafi?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.teslafi?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.teslafi?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub 工作流状态](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.teslafi/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.teslafi?branch=master&svg=true)
![SNYK 已知漏洞](https://snyk.io/test/github/hombach/ioBroker.teslafi/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.teslafi.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/teslafi-stable.svg)
![已安装](https://iobroker.live/badges/teslafi-installed.svg)
![NPM](https://nodei.co/npm/iobroker.teslafi.png?downloads=true)

# IoBroker.teslafi
[![CodeQL](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml)

## 版本
## 哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅<a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">Sentry 插件文档</a>！

## IoBroker TeslaFi 适配器 – 为您的智能家居提供无缝的特斯拉数据集成
TeslaFi适配器可让您轻松地将TeslaFi账户中的车辆数据集成到ioBroker系统中。利用这些数据，您可以提升特斯拉驾驶体验并优化智能家居工作流程。

## 为什么选择这款适配器？
该适配器的主要目的是将特斯拉数据集成到 ioBroker 中，而无需直接查询车辆系统。通过利用 TeslaFi 现有的数据轮询机制，该适配器避免了向车辆发出额外的请求，从而延长电池寿命并确保高效的数据访问。

＃＃ 特征
该适配器连接到 TeslaFi API，以获取有关您的特斯拉车辆的详细信息，并使这些数据可在 ioBroker 中访问。所有 TeslaFi 支持的特斯拉车型均完全兼容。目前，以下数据类别可用：

- **热状态**：深入了解热管理系统和温度。
- **电池状态**：电池状态、充电水平和续航里程信息。
- **车辆状态**：车辆的一般状态，包括位置和整体状况。
- **车辆数据**：车辆特定详细信息，例如名称和 VIN。

## 典型应用案例
- **自动化**：根据您的特斯拉的实时状态触发智能家居操作。例如，当车辆到达时自动调节家中的空调温度。
- **能源管理**：通过安排车辆充电时间和直接从 ioBroker 监控电池状态来优化能源消耗。
- **通知和报告**：设置特定车辆状况的警报，例如电池电量低、充电会话已完成或有可用更新。

＃＃ 配置
配置适配器非常简单：

1. 在适配器的配置屏幕中输入您的 TeslaFi API 密钥。
2. 设置所需的轮询间隔，以自定义数据更新的频率。

＃＃ 兼容性
该适配器兼容所有 TeslaFi 支持的特斯拉车型。需要拥有有效的 TeslaFi 账户及 API 访问权限。

## 积极开发和用户贡献
TeslaFi 适配器目前仍在积极维护中，我们会根据用户需求添加更多功能或数据类别。欢迎您提交宝贵意见，帮助我们改进适配器，造福整个社区！

捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=6EE4YUJRK7UWC"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.teslafi/master/docu/bluePayPal.svg" height="40"></a>如果你喜欢这个项目——或者只是想慷慨解囊，不妨请我喝杯啤酒。干杯！🍻

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.0.3 (2026-07-05)

- (hombach) removed unneeded test devDependencies (chai, sinon-chai, proxyquire) and switched tests to Node.js assert
- (hombach) updated axios

### 3.0.2 (2026-06-19)

- (hombach) fixed warnings by adapter checker

### 3.0.1 (2026-06-05)

- (hombach) upgraded TypeScript to 6.x
- (hombach) fixed warnings by adapter checker
- (hombach) updated dependencies

### 3.0.0 (2026-05-05)

- (copilot) BREAKING: adapter requires node.js >= 22 now
- (hombach) update dependencies

### 2.0.7 (2026-04-12)

- (hombach) switch to ES2023 code
- (hombach) fix vulnerability in axios
- (hombach) update dependencies

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 C.Hombach <TeslaFi@homba.ch>

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