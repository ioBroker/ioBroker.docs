---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.statistics?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.statistics?label=npm%20downloads&style=flat-square
BADGE-Snyk Vulnerabilities for npm package: https://img.shields.io/snyk/vulnerabilities/npm/iobroker.statistics?label=npm%20vulnerabilities&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.statistics?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.statistics?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.statistics?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/workflow/status/iobroker-community-adapters/iobroker.statistics/Test%20and%20Release?label=Test%20and%20Release&logo=github&style=flat-square
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/iobroker-community-adapters/iobroker.statistics?label=repo%20vulnerabilities&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.statistics.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/statistics-stable.svg
BADGE-Installed: http://iobroker.live/badges/statistics-installed.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.statistics/README.md
title: ioBroker.statistics
hash: dRX6j7tnL0ULrEC1p1dlQsZVItFmIIQWZSZDsmxbGoU=
---
![标识](../../../en/adapterref/iobroker.statistics/../../admin/statistics.png)

# IoBroker.statistics
此适配器将使统计信息的配置更容易。

**适配器仅对状态变化做出反应（state.ack = true），而不是对命令做出反应！**

从以下设置中选择：

*计数脉冲或开/关变化（仅适用于二进制值和上升沿）
* 根据计数值计算成本（仅适用于二进制值）
* 状态为真/开多长时间，假/关多长时间（仅适用于二进制值）
* 记录的模拟值之间的增量（仅用于模拟值）
* 每日最大值、最小值和平均值（不适用于增量计算）
* 全年最小/最大
* 计数在 5 分钟内和每日最大值、最小值和平均值（不适用于增量计算）
* 分组值的总和

适配器订阅配置的对象并在统计树中创建自己的状态。

创建了 2 棵单独的树：

* `statistics.0.save` -> 时间范围的最终值
* `statistics.0.temp` -> 临时值直到传输保存，然后 temp 再次开始

国家的结构是：`statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

## 设置
* 在实例配置页面指定相关组（admin => instances => statistics config）
* 在状态的设置中指定配置（admin => objects）

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
NodeJS 14.5.0 is required

* (klein0r) Added hourly, weekly, monthly, ... averages
* (klein0r) Added promises to avoid parallel execution of tasks (lead to incorrect calculations)
* (klein0r) Fixed init values for save/temp
* (klein0r) Added option to enable statistics for objects via sendTo
* (klein0r) Allow sum delta to substract values (negative delta)
* (klein0r) Delete states when option in unchecked
* (klein0r) Removed dayMin and dayMax from avg (use minmax for that case!)
* (klein0r) Fix: Calculation of avg when no change of value

### 2.2.0 (2022-07-07)
* (klein0r) Added absolute min and max values

### 2.1.1 (2022-06-16)
* (klein0r) Fixed usage of default values for groups

### 2.1.0 (2022-06-16)
* (klein0r) Added support for translated object names
* (klein0r) Fixed sum calculation
* (klein0r) Increased precision to 5 digits
* (klein0r) Translated all objects

### 2.0.0 (2022-06-13)
* (klein0r) Added Admin 5 configuration
* (klein0r) Updated translations

### 1.1.1 (2022-04-17)
* Prevent warn logs when using non-number states as statistic source

## License

The MIT License (MIT)

Copyright (c) 2018-2022 foxthefox <foxthefox@wysiwis.net>,
                        bluefox <dogafox@gmail.com> and
                        Matthias Kleine <info@haus-automatisierung.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.