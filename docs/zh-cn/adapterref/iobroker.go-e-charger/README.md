---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.go-e-charger/README.md
title: ioBroker.go-eCharger
hash: 5xvlWK8KdbisRC8OiSukNL90CCh9HoBuH2Pu7c305UA=
---
![标识](../../../en/adapterref/iobroker.go-e-charger/admin/go-eCharger.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.go-e-charger?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.go-e-charger?label=npm%20downloads&style=flat-square)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.go-e-charger?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.go-e-charger?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.go-e-charger?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub 工作流状态](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.go-e-charger/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.go-e-charger?branch=master&svg=true)
![SNYK 已知漏洞](https://snyk.io/test/github/hombach/ioBroker.go-e-charger/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.go-e-charger.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/go-e-charger-stable.svg)
![已安装](https://iobroker.live/badges/go-e-charger-installed.svg)
![NPM](https://nodei.co/npm/iobroker.go-e-charger.png?downloads=true)

# IoBroker.go-eCharger
[![CodeQL](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml)

## 版本
## IoBroker 适配器，适用于 go-e Charger 电动汽车壁挂式充电桩
该适配器可将一个或多个 go-e Charger 壁挂式充电桩集成到您的 ioBroker 家庭自动化系统中。它会通过本地 HTTP API 周期性地轮询每个壁挂式充电桩，提供 ioBroker 声明的所有相关数据，并允许您直接从智能家居控制充电。

有关 go-e 充电器硬件的更多信息，请访问制造商的网站：[go-e GmbH](https://go-e.com)。

＃＃＃ 特征
- 支持在单个适配器实例中使用多个 go-e 充电器
- 监测车辆状态、充电功率、充电电流、电网相位和能量统计数据
- **ChargeNOW** – 立即以可配置的电流开始充电
- **充电管理器** – 自动光伏发电盈余充电：充电电流会根据可用的太阳能功率持续调整，同时考虑家庭用电量和家用电池的电量。电动汽车的充电可以延迟，直到家用电池达到可设置的最低电量。

> **注意：** 光伏剩余充电功能目前仅设计用于控制**单个**充电器。当多个充电器同时启用 ChargeManager 时，它们之间的充电电流无法协调，导致太阳能剩余电量的计算结果不准确。我们将很快推出支持多充电器负载协调管理的扩展功能。

- 在单相和三相充电之间切换（硬件第三代及更新版本）
- 每张RFID卡的能源统计数据（卡名、ID和充电能量）
- 每个壁挂式充电桩的只读模式——仅监控充电桩，不向其发送**任何**控制指令（不释放电量、不控制充电电流、不进行相位切换），例如，当充电由其他地方控制或通过RFID标签管理访问权限时。

已使用固件版本 V033、V040.0、V041.0、V054.7、V054.11、V055.5、V055.7、V055.8、V56.1、V56.2、V56.8、V56.9、V56.11、V57.0、V57.1、V59.4、V60.0、V60.1、V60.2 进行测试，并可同时使用最多 3 个充电器。

＃＃＃ 要求
- 对于第 3 代和第 4 代硬件，您必须在 go-e 应用中启用“HTTP API v1”。
- 对于相位切换，您还需要在 go-e 应用中启用“HTTP API v2”（硬件第 3 代及更新版本）。

＃＃ 配置
在墙装式充电器列表中为每个 go-e 充电器添加一个条目，并输入其 IP 地址。您也可以选择为每个充电器指定一个名称。

如果适配器仅需读取充电器的数据而不写入数据，请启用充电器的**只读模式**。在只读模式下，适配器不会发送任何控制命令——无论是释放充电、充电电流还是相位切换。ChargeNOW 和 ChargeManager 状态仍然可以切换，但它们对只读充电器无效。当壁挂式充电桩的充电由其他系统控制或通过 RFID 标签进行本地管理时，请使用此模式。

对于使用 ChargeManager 进行光伏剩余电量充电，请配置光伏系统中以下状态的对象 ID：

- 目前可用的太阳能发电量 [W]
- 当前家庭用电量 [W]
- 家用电池当前电量百分比

如果墙盒的功耗已包含在您的家庭功耗值中，请启用相应的复选框，以便适配器能够正确计算可用剩余电量。

轮询周期时间定义了适配器从充电器读取数据并调整充电电流的频率（最短 3 秒，默认 10 秒）。

## 哨兵
此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关更多详细信息以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！

捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=76GBRV9BX5US8"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.go-e-charger/master/docu/bluePayPal.svg" height="40"></a>如果你喜欢这个项目——或者只是想慷慨解囊——不妨请我喝杯啤酒。干杯！🍻

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (hombach) removed chai-based unit test dependencies; modernized test harness to Node.js assert (fixes Appveyor, #836)

### 1.1.0 (2026-07-05)

- (hombach) fixed reading of "unlocked by RFID" (uby) on gen 3+ chargers via API V2
- (hombach) read-only mode now suppresses all control commands (charge release, charging current, phase switching)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.0.4 (2026-07-04)

- (hombach) harmonized i18n files
- (hombach) improved README and English texts
- (hombach) reworked translations in all languages
- (hombach) added 5s timeout to all HTTP requests to chargers
- (hombach) fixed adapter stop when no charger is reachable at startup; warn per unreachable charger
- (hombach) fixed German fallback text for RFID card channel names
- (hombach) added upper bound validation for cycle time
- (hombach) added link to manufacturer's website
- (hombach) code optimizations

### 1.0.3 (2026-07-03)

- (hombach) added translations
- (hombach) fixed state roles

### 1.0.2 (2026-07-01)

- (hombach) fix RFID data readout for gen 3+ chargers via API V2 (#802)
- (hombach) prepared for beta repo
- (hombach) eliminate yarn
- (hombach) upgraded adapter-core
- (hombach) updated axios
- (hombach) updated dependencies

### 1.0.1 (2026-05-17)

- (hombach) fix total stats
- (hombach) fix adapter checker findings
- (hombach) fix docu
- (hombach) fix tsconfig

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2026 C.Hombach

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