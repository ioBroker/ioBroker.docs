---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.valuetrackerovertime/README.md
title: ioBroker.valuetracker超时
hash: Gmb/MAAETiwqmKTdg31oR0OtbI4Zud7d2R0CgqvW300=
---
![标识](../../../en/adapterref/iobroker.valuetrackerovertime/admin/ValueTrackerOverTime_Logo.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.valuetrackerovertime.svg)
![下载](https://img.shields.io/npm/dm/iobroker.valuetrackerovertime.svg)
![安装数量（最新）](http://iobroker.live/badges/valuetrackerovertime-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/valuetrackerovertime-stable.svg)
![依赖状态](https://img.shields.io/david/Omega236/iobroker.valuetrackerovertime.svg)
![已知漏洞](https://snyk.io/test/github/Omega236/ioBroker.valuetrackerovertime/badge.svg)
![NPM](https://nodei.co/npm/iobroker.valuetrackerovertime.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Omega236/ioBroker.valuetrackerovertime/master.svg)

# IoBroker.valuetrackerovertime
[![构建状态](https://travis-ci.com/Omega236/ioBroker.valuetrackerovertime.svg?branch=master)](https://travis-ci.com/Omega236/ioBroker.valuetrackerovertime)

## IoBroker 的 valuetrackerovertime 适配器
跟踪所有数字及其增加/减少。然后，这些数据将用于建立变化率的统计数据，以小时、天、周、月、季度和年等时间显示。收集的数据可用于可视化，即图表中的功耗。

## 设置
ValueTrackerOverTime 的设置将在两个地方完成。默认设置将在适配器本身的实例中处理，单个数据点的设置将在包含要跟踪的数据的数据点中完成。

＃＃＃ 默认设置
![阴谋](../../../en/adapterref/iobroker.valuetrackerovertime/admin/DefaultSettings.png) 这些是默认设置，只要您在数据点上激活 ValueTrackerOverTime，就会提示这些设置。对于每个数据点，这些都可以自定义，但最常用的初始值）在此处设置为默认值，因此以后您不必进行多次修改。

#### 详细历史
在“详细历史记录”部分，将选择要创建的数据点。你想为每个人收集数据吗？

* 天
* 星期
* 月
*季度（一年）
* 年
*无限（永不重置）

#### 当前/以前的数据
在“当前/先前数据”部分，您可以选择为每个时间范围生成的每个 ValueTrackerOverTime 数据点收集的数据保留多长时间。
一旦数据结束在另一个数据点内就停止收集数据是有意义的（例如：7 天后，可以在一周内找到数据。4 周后，数据将在一个月内找到自己......）

#### 计数器复位检测
该值应始终启用并设置为 1。它有助于 ValueTrackerOverTime 在重置原始数据点中的值后做出正确的读数。

### 数据点设置
![阴谋](../../../en/adapterref/iobroker.valuetrackerovertime/admin/DatapointSettings.png) 在此设置中，您必须提供一个 nema，它将用作此选择节点的数据点名称。此外，您必须提供您希望收集数据的单位。
因此，如果您想测量雨量，可以添加单位 l/m²，或者您想要测量消耗的能量，单位为瓦特小时 (kWh)。
如果数据点本身使用不同的单位（即 Wh），您可以在此处添加一个乘数（即 60 或 1/60）以将数据转换为所需的单位。

其余设置将覆盖已在适配器实例中设置的默认设置。

＃＃ 数据点
根据要收集的选定时间范围，适配器将为您要跟踪的每个数据点创建它自己的数据点。

图中给出了三个例子。由于截图是在1月3日（年初/月初）截取的，请原谅数据不是那么丰富多彩。

* 您可以看到今天是 0.3 l/m² 的雨量计数器 (Regenmenge)，整个星期都没有变化。
* 在这个冬天的一周里，太阳根本没有发光（对于我的气象站，这意味着它没有比 4,500lm 任何一天更亮）
* 然而，能源消耗将显示计算机的当前日期设置为 0.351kWh，周设置为 1.909 kWh，年设置为 1.393 kWh（这是因为今天是星期日，一周已经 7 天旧的，但它也是 1 月 3 日，这使得这一年只有三天）。

## Changelog
### 1.0.1 (02.03.2023)
* (Omega236) add work setting
* (Omega236) remove Pre Admin 5 support
* (Omega236) add Translation
* (Omega236) update dependencies
* (Omega236) Git Actions instead of travis
### 1.0.0 (26.02.2023)
* (Omega236) Final version 1.0.0 with Infinite Counter
### 0.6.2 (30.01.2022)
* (Omega236) counterResetDetection was missing in customjson
### 0.6.1 (16.01.2022)
* (Omega236) basic Admin 5 support
### 0.6.0 (18.02.2021)
* (Omega236) add function to store history-Data to current-DP history"
### 0.5.4
* (Omega236) optimize RAM-Usage (Remove .toLocaleString)
### 0.5.3
* (Omega236) bugfix startvalue not used after SQL read out
### 0.5.2
* (Omega236) bugfix _getObjectAsync not worked
### 0.5.1
* (Omega236) optimizations, HistoryAnalyse extended and CurrentHistory added
### 0.4.1
* (Omega236) bugfix DetailedYear not saved, bugfix HistoryDetailed not used Multi
### 0.4.0
* (Omega236) HistoryAnalyseDetailed Added, Bugfix KW
### 0.3.5
* (Omega236) reset Detection optimize and bugfix only ack
### 0.3.4
* (Omega236) Check for duplicate Alias and reduce recalcs on start-value changed
### 0.3.3
* (Omega236) bugfix date object changed
### 0.3.2
* (Omega236) reemove selectID.js from index_m.html
### 0.3.1
* (Omega236) first public
### 0.0.1
* (Omega236) initial release

## License
MIT License

Copyright (c) 2023 Omega236 <general.of.omega@googlemail.com>

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