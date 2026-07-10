---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: sYc1FFNyG/KdRyiwudb7H9czCrpySLFq6D5lDISBLTQ=
---
![标识](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba?label=npm%20downloads&style=flat-square)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.kostal-piko-ba?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.kostal-piko-ba?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.kostal-piko-ba?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/hombach/iobroker.kostal-piko-ba?logo=github&style=flat-square)
![GitHub 工作流状态](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.kostal-piko-ba/test-and-release.yml?branch=main&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)
![Beta](https://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/kostal-piko-ba-stable.svg)
![已安装](https://iobroker.live/badges/kostal-piko-ba-installed.svg)
![NPM](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)

# IoBroker.kostal-piko-ba
[![CodeQL](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.kostal-piko-ba/actions/workflows/codeql-analysis.yml)

## 版本
## 用于读取 Kostal Piko 和 Piko BA 数据的 iOBroker 适配器
这款适配器可读取 Kostal Piko、Piko BA 和 PIKO MP plus 逆变器的数据。

它会创建并按顺序更新多个状态，确保始终提供最新信息。

该适配器专为 Kostal Piko BA、6.0BA、8.0BA 和 10BA 逆变器设计，但也支持多种其他型号，包括：

- 科斯塔尔皮科：3.0、4.2、4.6、5.5、7.0、8.5、10、12、15、17、20 和 36。
- 科斯塔尔 PIKO MP：1.5、3.0、3.6。
- Kostal PIKO MP plus：1.5-1、2.0-1、2.5-1、3.0-1、3.0-2、3.6-1、3.6-2 和 5.0-2。

我们非常欢迎您提供与其他逆变器兼容性方面的反馈。如果您使用其他型号进行了测试，请告知我们。

＃＃ 配置
请确保您的 Piko 或 Piko BA 逆变器已更新至 Kostal UI 版本 6.11 或更高版本。

要连接到 Kostal Piko (BA / MP plus) 逆变器，您必须在设置中配置其 IP 地址。

您可以选择调整实时数据、每日统计数据和历史统计数据的更新频率。

如果您的硬件支持，您还可以启用四个模拟值的读取功能。

## 哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅<a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">Sentry 插件文档</a>！

捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=XFFBB332R4RCQ"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a>如果你喜欢这个项目——或者只是想慷慨解囊，不妨请我喝杯啤酒。干杯！🍻

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 7.0.5 (2026-07-05)

- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now
- (HombachC) removed chai-based unit test dependencies; modernized test harness to Node.js assert
- (HombachC) updated dependencies

### 7.0.4 (2026-06-19)

- (HombachC) fixed adapterchecker warnings
- (HombachC) updated dependencies

### 7.0.3 (2026-06-03)

- (HombachC) fixed instanceObject roles
- (HombachC) fixed warnings of adapter checker
- (HombachC) updated dependencies

### 7.0.2 (2026-05-17)

- (HombachC) fix tsconfig

### 7.0.1 (2026-05-16)

- (HombachC) update typescript from 5.9.3 to 6.0.3
- (HombachC) fix vulnerability in axios
- (HombachC) update dependencies

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2026 C.Hombach <Kostal-Piko-BA@homba.ch>

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