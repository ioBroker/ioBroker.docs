---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pvoutputorg/README.md
title: ioBroker.pvoutputorg
hash: rqPQB+VIhCx2SsAfv3yu+bdS3GejSh520tifn4ewMf8=
---
![标识](../../../en/adapterref/iobroker.pvoutputorg/admin/pvoutputorg.png)

![安装数量](http://iobroker.live/badges/pvoutputorg-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pvoutputorg.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.pvoutputorg.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.pvoutputorg/badge.svg)
![NPM](https://nodei.co/npm/iobroker.pvoutputorg.png?downloads=true)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.pvoutputorg?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.pvoutputorg?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.pvoutputorg?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.pvoutputorg?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.pvoutputorg?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.pvoutputorg?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/rg-engineering/ioBroker.pvoutputorg?logo=github&style=flat-square)

# IoBroker.pvoutputorg
![GitHub Actions](https://github.com/rg-engineering/ioBroker.pvoutputorg/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

如果您喜欢，请考虑捐赠：

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

适配器连接至 [PvOutput.org](https://pvoutput.org)。连接通过系统 ID 和 API 密钥建立。这两项信息均需在管理页面进行配置。

当前，所有已配置系统的系统状态和统计数据均会被读取并以数据点的形式显示。

生成的能量可以永久上传至 PvOutput.org。

详细信息请参阅[pvoutput.org 帮助](https://pvoutput.org/help/overview.html)

如果您向 pvoutput.org 捐款，我们将为您提供更多功能。目前，这些功能在本适配器中尚不支持。

＃＃ 下载
适配器下载三种类型的数据

* 系统数据
* 状态数据
* 统计数据

为了下载数据，适配器会运行一个可调节的定时任务。下载频率可以在管理页面通过“读取数据的间隔 [分钟]”进行调整。

通常下载频率的值为 15 分钟，但最长不超过 59 分钟。

### 系统数据
适配器检索系统状态信息和实时输出数据。

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#id25)

### 状态数据
状态数据（或实时数据）包括您的系统可用的所有可能系统数据。

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#id16)

### 统计数据
适配器检索系统统计信息。

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#id21)

## 上传
数据上传只是一个可选功能。如果您使用其他应用程序（例如 sbfspot）上传数据，请在适配器中禁用上传功能。

### 上传实时数据
为了上传实时数据/状态数据，适配器会运行一个可调节的定时任务。上传频率可以在管理页面通过“数据写入间隔 [分钟]”进行调整。

上传频率的典型值为 5 到 15 分钟，但最长不超过 59 分钟。

适配器会在每个系统的“上传”文件夹中提供大量数据点。其中只有功率或能量数据点是必须使用的，其他数据点均为可选。

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#add-status-service)

### 功率和能量计算
功率和能量值可以相互推导。当系统仅发送功率值时，相应的能量值会自动计算。

同样，当仅发送能量值时，PVOutput 将计算平均功率。

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#power-and-energy-calculation)

### 累计能量 - 系统配置中的 CumulativeFlag
以下值适用于累计标志。

1 = 能源产生量和能源消耗量均为生命周期能源值。每日开始时，能源消耗量和能源产生量均重置为 0。

2 = 仅能源产生量为生命周期能源值。

3 = 仅能源消耗量为生命周期能源值。

默认值：1

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#cumulative-energy)

### Net Data - 系统配置中的 NetDataFlag
该参数设置为 1 时，表示传递的功率值为净输出/输入值，而非总发电量/总用量。

此选项适用于无法报告总用量数据的设备。提供的输入/输出数据将与现有发电数据合并，以计算用量。

默认值：未选中

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#net-data)

## 上传当日结束数据
最后，会执行单独的上传命令。可以上传多种不同的数据。这些数据以数据点的形式存在于每个系统的上传文件夹中。所有数据点都是可选的。

更多关于[API 文档](https://pvoutput.org/help/api_specification.html#add-output-service)

已知问题
如果您发现错误或希望添加新功能，请在 [github](https://github.com/rg-engineering/ioBroker.pvoutputorg/issues) 创建 issue。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.0.0 (2026-06-30)
* (René) rewritten in typescript
* (René) support of new version of DasWetter adapter
* (copilot) Adapter requires node.js >= 22 now
* (René) update dependencies

### 1.9.7 (2026-03-15)
* (René) update dependencies + changes based on adapter checker

### 1.9.6 (2025-10-26)
* (René) bug fix sentry

### 1.9.5 (2025-10-21)
* (René) update dependencies + changes based on adapter checker

### 1.9.4 (2025-10-04)
* (René) update dependencies + changes based on adapter checker

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2022-2026 René G. <info@rg-engineering.eu>

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