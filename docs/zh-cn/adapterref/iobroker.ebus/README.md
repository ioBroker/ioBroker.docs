---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: OiglQYHB+Y0tGulBl84tjrcZuAP3nee40BEVoh3/xKQ=
---
![标识](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![安装数量](http://iobroker.live/badges/ebus-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.ebus.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.ebus/badge.svg)
![新公共管理](https://nodei.co/npm/iobroker.ebus.png?downloads=true)
![节点](https://img.shields.io/node/v-lts/iobroker.ebus?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.ebus?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.ebus?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)
![GitHub 上次提交](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/rg-engineering/ioBroker.ebus?logo=github&style=flat-square)

# IoBroker.ebus
![GitHub Actions](https://github.com/rg-engineering/ioBroker.ebus/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

**如果您喜欢它，请考虑捐赠：**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

该适配器读取

- 使用 html 格式的 ebusd 数据

在这种情况下，ebusd 必须运行，并且必须能够通过 http://IP:port/data (http://192.168.0.123:8889/data) 向 explorer 等程序发送数据。ebusd 的当前版本（包括配置文件）可从 https://github.com/john30/ebusd 下载。所有包含 data、lastup 和全局部分的字段均已解析。其他字段目前均被忽略。

可以轮询 ebusd 未直接轮询的数据。使用命令“read -f”可以强制通过 ebus 读取数据。

另一个功能是向 ebusd 发送任何命令并接收答案以与脚本一起使用。

**注意** ebusd - 22.1 版的配置路径已更改为 http://cfg.ebusd.eu/。请确保在安装 ebusd 时进行更改。
详情请参阅[变更日志](https://github.com/john30/ebusd/blob/master/ChangeLog.md)

## 如何向 ebusd 发送命令
1. 在数据点 ebus.0.cmd 上写入单个命令或命令列表

如果要使用多个命令，请使用 , 分隔单个命令。
示例：read -f YieldTotal、read LegioProtectionEnabled、read -f -c broadcast outsidetemp

2. 执行命令时，您将在数据点 ebus.0.cmdResult 中收到每个命令的结果

结果也是以逗号分隔的示例：2000，ERR：未找到元素，10.5

注意：执行该命令后，数据点ebus.0.cmd中的命令将被删除！

## 安装/更新
请按照[维基百科](https://github.com/john30/ebusd/wiki/1.-Build-and-install)下的 ebusd 安装说明进行操作

在 /opt/iobroker/node_modules/iobroker.ebus/lib/scripts 中，您可以找到在基于 debian 的系统上安装和更新 SBFspot 的脚本。

## 已知问题
* 如果您发现错误或需要新功能，请在 [github](https://github.com/rg-engineering/ioBroker.ebus/issues) 创建问题

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.6.2 (2025-06-09)
* (René) (Galileo53) #419 avoid Warning and error when history list is empty

### 3.6.1 (2025-06-06)
* (René) changes suggested by adapter checker

### 3.6.0 (2025-06-06)
* (René) new supported ebusd version is 25.1
* (René) version info added in admin

### 3.5.2 (2025-02-27)
* (René) changes requested by adapter checker
* (René) dependencies updated

### 3.5.1 (2025-02-01)
* (René) translations

### 3.5.0 (2025-01-27)
* (René) catch exceptions reportet by sentry
* (René) option to disable check of last update time (see issue #391)

### 3.4.0 (2024-12-10)
* (René) migration to jsonConfig
* (René) see issue #383: add optionally parameters to HTTP call

### 3.3.8 (2024-11-24)
* (René) update dependencies
* (René) issue  #381: install widgets again

### 3.3.7 (2024-11-20)
* (René) see issue #380: support of ebusd 24.1, ATTENTION: ebusd creates datapoints with changed names, folders or in different locations
* (René) see issue #371: test with nodejs@22

### 3.3.6 (2024-08-25)
 * (René) downgrade of "promise-socket" to 7.0.0

### 3.3.5 (2024-08-24)
* (René) update dependencies
* (René) bug fixes based on adapter checker recommendation

### 3.3.4 (2024-07-12)
 * (René) bug fix after 3.3.2 update

### 3.3.3 (2024-07-12)
 * (René) downgrade of "promise-socket" to 7.0.0

### 3.3.2 (2024-07-11)
 * (René) see issue #338: due to error in ebusd json no data are parsed

### 3.3.1 (2024-05-28)
* (René) change of dependencies

### 3.3.0 (2024-05-24)
* (René) remove cron dependency
* (René) data history prepared for VIS-2: just a option here in the adapter and new widget (at this moment GeneralChart widget in vis-2-widgets-weather can be used)

### 3.2.6 (2024-02-11)
* (René) see issue #245: support ebusd 23.3
* (René) fixes reported by eslint

### 3.2.5 (2024-01-12)
* (René) dependencies updated

### 3.2.4 (2023-11-19)
* (René) revert back to flat 5.x

### 3.2.3 (2023-11-18)
* (René) dependencies updated
* (René) fix sentry reported exceptions

### 3.2.2 (2023-07-30)
* (René) dependencies updated

### 3.2.1 (2023-04-07)
* (René) dependencies updated

### 3.2.0 (2023-02-11)
* (René) **Attention** polled variables must be set as active in admin now
* (René) search available variables per circuit added in admin
* (René) DP "find" added to force read of all existing datapoints (Attention: might take a while) and update name in data point tree

### 3.1.1 (2023-01-31)
* (René) support ebusd 23.1
* (René) see issue #77: make sure that only one data request is running at the same time

### 3.1.0 (2022-12-01)
* (René) support ebusd 22.4
* (René) see issue #77: Update data point when read-cmd is used
* (René) see issue #78: remove CR, LF in answer from ebusd for DP ebus.0.cmdResult

### 3.0.7 (2022-08-20)
* (René) support ebusd 22.3

### 3.0.6 (2022-08-19)
* (René) bug fix in tooltip in wizard

### 3.0.4 (2022-08-18)
* (René) tooltip in wizard added
* (René) flot and dependencies updated
* (René) errors from ebusd are shown as warning here in adapter, details schould be checked in logs of ebusd
* (René) bug fix in widget: if less data available x axes grid point were not shown
* (René) except null as valid value from ebusd (e.g. to reset CurrentError)

### 3.0.2 (2022-04-02)
* (René) message for installation added

### 3.0.1 (2022-04-02)
* (René) read interval in admin added

### 3.0.0 (2022-04-02)
* (René) **ATTENTION** change from scheduled to daemon adapter
* (René) bent by axios replaced

### 2.5.1 (2021-12-29)
* (René) adjustable retries to send data if arbitration error appeared

### 2.5.0 (2021-12-28)
* (René) see issue #62: support ebusd 21.3

### 2.4.5 (2021-11-07)
* (René) bug fix color of labels in widget

### 2.4.4 (2021-10-30)
* (René) see issue #59: avoid endless loop
* (René) update flot to 4.2.2
* (René) bug fix missing space in command when using circuit name

### 0.8.0 (2019-02-24)
* (René) hcmode2 value 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (René) add adjustable timeout

### 0.6.0 (2019-01-06)
* (René) support of compact mode

### 0.5.5 (2018-11-04)
* (René) code clean up

### 0.5.4
* (René) arduino support removed

### 0.5.3
* (René) add error information

### 0.5.2
* (René) bug fix: in vis 1.x some values are not stored

### 0.5.1
* (René) bug fix: if nothing to poll then skip telnet connection

### 0.5.0
* (René) write date over TCP to ebusd

### 0.4.2
* (René) bug fix for admin V3

### 0.4.1 
* (René) logo changed

### 0.4.0 
* (René) reading data from ebusd

### 0.3.0 
* (René) support of ebusd 
* (René) admin3 support

### 0.2.0
* (René) add history as JSON for vis
* (René) add flot based widget to display temperatur, status and power graph

### 0.1.0
* (René) scheduled adapter instead of deamon

### 0.0.3
* (René) UTF8 coding

### 0.0.2
* (René) initial release

## License
MIT License

Copyright (c) 2017-2025 René G. <info@rg-engineering.eu>

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