---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pid/README.md
title: ioBroker.pid
hash: T3lRBLIggbW/x5Eu3EnCKSmX6yzwBn4JHckOhGrlWgk=
---
![标识](../../../en/adapterref/iobroker.pid/admin/pid.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.pid)
![下载](https://img.shields.io/npm/dm/iobroker.pid.svg)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.pid)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.pid)
![GitHub 自最新版本以来提交的内容（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.pid/latest)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.pid)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.pid)
![NPM版本](http://img.shields.io/npm/v/iobroker.pid.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/pid-stable.svg)
![安装数量](https://iobroker.live/badges/pid-installed.svg)

# IoBroker.pid
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/pid/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **版本：** </br> </br> **测试：** </br> [![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.pid/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.pid/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.pid/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.pid/actions/workflows/codeql.yml)

<!--

## Sentry **此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。
-->
## IoBroker 的 PID 适配器
该适配器提供可配置的 PID 控制器。

＃＃ 一般信息
该适配器提供 PID 控制器的功能。

实际上，PID 控制器根据实际值和设定值自动计算系统的校正值。该行为由参数控制。一个日常的例子是汽车的巡航控制系统，如果应用恒定的发动机功率，上山时会降低速度。控制器的 PID 算法通过以受控方式增加发动机的功率输出，以最小的延迟和超调将测量速度恢复到所需速度。 [(c) 维基百科]

在一个适配器实例中，可以配置多个控制器。适配器支持配置参数（P、I、D 分量）和用于计算的周期时间。此外，可以暂停和恢复计算，并且可以重置控制器。作为方便的服务器，可以打开手动模式来直接设置输出。输出可以限制为最小/最大值并包含固定偏移量。

所有相关值（包括内部数据）均可用作诊断目的的状态。

## 文档
[英文文档](docs/en/pid_en.md)<br> [德语文献](docs/de/pid_de.md)

## 学分
如果没有开发node-pid-controller (https://github.com/Philmod/node-pid-controller) 的@Philmod (https://github.com/Philmod) 的伟大工作，提供这个适配器是不可能的。

## 如何报告问题和功能请求
请为此使用 GitHub 问题。

最好的方法是将适配器设置为调试日志模式（实例 -> 专家模式 -> 列日志级别）。然后，请从磁盘获取日志文件（ioBroker 安装目录中的子目录“log”，而不是从管理员获取，因为管理员会截断行）。如果您不喜欢在 GitHub 问题中提供它，您也可以通过电子邮件将其发送给我 (mcm57@gmx.at)。请添加对相关 GitHub 问题的引用，并描述我当时在日志中看到的内容。
"title": "lblCtrlInvert",

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.8 (2023-07-13)

-   (mcm1957) changed: Overall stability during state updates has been increased
-   (mcm1957) changed: Dependencies have been updated

### 0.0.7 (2023-04-24)

-   (mcm1957) changed: Cycle time is now required to be at least 100ms
-   (mcm1957) changed: Recalculations are now controlled by cycle timer only, no extra updates are performed (#62)
-   (mcm1957) changed: Several dependencies have been updated

### 0.0.6 (2023-04-14)

-   (mcm1957) solved: Calculation of sumerr in case of hitting max/min Limits has been corrected

### 0.0.5 (2023-04-14)

-   (mcm1957) new: npm/npmjs support has been added

### 0.0.4 (2023-04-14)

-   (mcm1957) changed: State last_upd_str has been removed
-   (mcm1957) changed: Some roles have been updated
-   (mcm1957) changed: Translations have been updated

### 0.0.3-alpha.1 (2023-04-13)

-   (mcm1957) changed: Setting rst state does no longer trigger a recalculation
-   (mcm1957) changed: State diff now displays error value even if sup is active
-   (mcm1957) changed: Calculation of I-part has been changed, changing Tn effects future calculations only now

### 0.0.3-alpha.0 (2023-04-12)

-   (mcm1957) new: optionally use folder structure for states
-   (mcm1957) changed: reset timer at restart after pausing calculation
-   (mcm1957) changed: use values stored for ack and set when starting adapter
-   (mcm1957) changed: log state changes with unexpected ack=true
-   (mcm1957) changed: fix incorrect updates occuring whenever act is written
-   (mcm1957) changed: fix invert flag not working at all
-   (mcm1957) changed: remove error display whenever adapter is hitting the limits
-   (mcm1957) changed: fix q flag handling
-   (mcm1957) changed: fix unexpected bahavior of sup parameter
-   (mcm1957) changed: rename run state to hold

### 0.0.2-alpha.2 (2023-04-06)

-   (mcm1957) changed: values of 'kp', 'xp' and 'sup' are now verified if set using states
-   (mcm1957) changed: values of 'min' and 'max' are now verified if set using states
-   (mcm1957) changed: activation of 'man' updates output 'y' with current value of 'man_inp' now
-   (mcm1957) changed: 'min' value is now conserved when restarting the instance
-   (mcm1957) changed: conversion between and xp has been fixed at several places
-   (mcm1957) changed: 'kp' or 'xp' are writepotected now depending on 'useXp' parameter

### 0.0.2-alpha.1 (2023-04-04)

-   (mcm1957) changed: some small fixes

### 0.0.2-alpha.0 (2023-04-04)

-   (mcm1957) THIS IS AN ALPHA RELEASE ONLY
-   (mcm1957) major changes after discussion in forum
-   (mcm1957) new initial release

## License

MIT License

Copyright (c) 2023 mcm1957 <mcm57@gmx.at>

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