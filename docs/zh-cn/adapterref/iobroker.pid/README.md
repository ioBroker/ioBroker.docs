---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pid/README.md
title: ioBroker.pid
hash: drpnQNpZlM+9gT9kDsZI9pC30PxYja3++prE3EBhJjc=
---
![标识](../../../en/adapterref/iobroker.pid/admin/pid.png)

![GitHub 许可证](https://img.shields.io/github/license/mcm4iob/ioBroker.pid)
![下载](https://img.shields.io/npm/dm/iobroker.pid.svg)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/mcm4iob/ioBroker.pid)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/mcm4iob/ioBroker.pid)
![GitHub 自最新版本以来的提交情况（按日期）](https://img.shields.io/github/commits-since/mcm4iob/ioBroker.pid/latest)
![GitHub 上次提交](https://img.shields.io/github/last-commit/mcm4iob/ioBroker.pid)
![GitHub 问题](https://img.shields.io/github/issues/mcm4iob/ioBroker.pid)
![NPM 版本](http://img.shields.io/npm/v/iobroker.pid.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/pid-stable.svg)
![安装数量](https://iobroker.live/badges/pid-installed.svg)

# IoBroker.pid
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/pid/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **版本：** </br> </br> **测试：** </br> [![测试与发布](https://github.com/mcm4iob/ioBroker.pid/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/mcm4iob/ioBroker.pid/actions/workflows/test-and-release.yml) [![CodeQL]（https://github.com/mcm4iob/ioBroker.pid/actions/workflows/github-code-scanning/codeql/badge.svg）](https://github.com/mcm4iob/ioBroker.pid/actions/workflows/github-code-scanning/codeql)

哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## IoBroker 的 PID 适配器
该适配器提供可配置的 PID 控制器。

＃＃ 一般信息
该适配器提供 PID 控制器的功能。

实际应用中，PID 控制器会根据实际值和设定值自动计算系统的校正值。其行为由参数控制。一个常见的例子是汽车的巡航控制，如果发动机功率恒定，上坡时车速会降低。控制器的 PID 算法会以受控的方式增加发动机的功率输出，从而将测量速度恢复到所需速度，并最大程度地减少延迟和过冲。[(c) 维基百科]

在一个适配器实例中可以配置多个控制器。适配器支持配置参数（P、I、D 组件）以及用于计算的循环时间。此外，计算可以暂停和恢复，控制器也可以完全重置。作为便捷的服务器，可以切换手动模式直接设置输出。输出可以限制为最小/最大值，并包含固定偏移量。

所有相关值（包括内部数据）均可作为诊断目的的状态。

## 文档
[英文文件](docs/en/pid_en.md)<br> [德国文献](docs/de/pid_de.md)

## 致谢
如果没有开发 node-pid-controller (https://github.com/Philmod/node-pid-controller) 的 @Philmod (https://github.com/Philmod) 的出色工作，提供此适配器是不可能的。

## 如何报告问题和功能请求
请使用 GitHub 问题来解决此问题。

最好将适配器设置为“调试”日志模式（实例 -> 专家模式 -> 列日志级别）。然后请从磁盘获取日志文件（ioBroker 安装目录中的“log”子目录，而不是管理员目录，因为管理员会截断线路）。如果您不想在 GitHub 问题中提供日志文件，也可以通过电子邮件 (mcm57@gmx.at) 发送给我。请添加相关 GitHub 问题的引用，并描述我当时在日志中看到的内容。
“title”：“lblCtrlInvert”，

**************************************************************************************************************

**如果您喜欢它，请考虑捐赠：**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.3 (2024-03-22)

-   (mcm1957) Adapter uses sentry to report errors now.

### 1.0.0 (2024-03-11)

-   (mcm1957) BREAKING: Adapter requires node.js 18 or newer now
-   (mcm1957) BREAKING: Adapter requires js-controller 5.x.x and admin 6.x.x or newer now
-   (mcm1957) BREAKING: Adapter requires node.js 18 or newer now
-   (mcm1957) Incorrect error message whenever no controllers have been defied has been removed. [#68]
-   (mcm1957) State roles have been reviewed and adapted. [#88]
-   (mcm1957) Dependencies have been updated.

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

Copyright (c) 2023-2024 mcm1957 <mcm57@gmx.at>

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