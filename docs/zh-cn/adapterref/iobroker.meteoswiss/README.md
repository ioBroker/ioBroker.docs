---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.meteoswiss/README.md
title: ioBroker.meteoswiss
hash: ExtNW5ClzTt/fCQctltaZFRRN0cIVzBOkc+0+aFZnmw=
---
![标识](../../../en/adapterref/iobroker.meteoswiss/admin/meteoswiss.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.meteoswiss.svg)
![下载](https://img.shields.io/npm/dm/iobroker.meteoswiss.svg)
![安装数量（最新）](https://iobroker.live/badges/meteoswiss-installed.svg)
![安装数量（稳定版）](https://iobroker.live/badges/meteoswiss-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meteoswiss.png?downloads=true)

# IoBroker.meteoswiss
**测试：** ![测试与发布](https://github.com/deMynchi/ioBroker.meteoswiss/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 meteoswiss 适配器
提供来自瑞士气象局的天气信息。

## 州名
为了保持州 ID 简洁明了，许多州仅使用数字来区分。所有州都有有意义的名称，因此您可能需要在 ioBroker.admin 中启用“名称”列才能了解所有州的含义。

## 天气更新
MeteoSwiss 每 10 分钟更新一次天气数据。此适配器会在天气数据发生变化后尽快获取，并相应地调整刷新时间。通常情况下，您收到的天气数据不会超过 11 分钟。

## 未知值
某些数值并非所有气象站或预报地点都会报告。这些状态将显示为 `null`，以便明确区分未知值和已知的“0”值。

## 值聚合
某些测量值和预测值的报告频率高于此适配器提供的 3 小时间隔状态。因此，这些值会以逻辑方式进行聚合（最小值是该范围内所有值的最小值，最大值是最大值，……）。

## 天气预警
所有 `warning-xx` 状态均显示给定类别中当前最重要的活动警告。同一类别可能同时存在多个警告，但此适配器只会显示最重要的警告。级别更高的警告以及未标记为“outlook”的警告比级别更低或标记为“outlook”的警告更重要。

如果某个类别没有激活任何警告，则 `warning-xx.level` 状态的值将为 `0`（无），该类别的所有其他状态将为 `null`。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.2 (2026-01-21)

- (deMynchi) Fixes to satisfy code review

### 1.0.1 (2026-01-06)

- (deMynchi) Fixes to satisfy repochecker

### 1.0.0 (2026-01-06)

- (deMynchi) Update to API version 3
- (deMynchi) Remove subscription (no longer working)
- (deMynchi) Use latest create-adapter template
- (deMynchi) Switch to pure TypeScript adapter (no more build)

### 0.2.1 (2021-07-13)

- (deMynchi) Fixed issue where sometimes the wrong warning texts were shown when there are multiple warnings from different categories.

### 0.2.0 (2021-07-08)

- (deMynchi) Added warnings for PLZ entries.

### 0.1.2 (2021-03-22)

- (deMynchi) Fixed connection state always yellow.

### 0.1.1 (2021-03-22)

- (deMynchi) Fixed initial download of sqlite db that was broken

### 0.1.0 (2021-03-21)

- (deMynchi) initial release

## License

MIT License

Copyright (c) 2026 deMynchi

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