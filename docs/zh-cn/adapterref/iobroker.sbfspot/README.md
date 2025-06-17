---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: uzMds3K6zvGp2QE1ulEfXg5DsBuf5j28qI+RwpdccCM=
---
![标识](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![安装数量](http://iobroker.live/badges/sbfspot-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sbfspot.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.sbfspot/badge.svg)
![新公共管理](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)
![节点](https://img.shields.io/node/v-lts/iobroker.sbfspot?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.sbfspot?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.sbfspot?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![GitHub 上次提交](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)

# IoBroker.sbfspot
![GitHub Actions](https://github.com/rg-engineering/ioBroker.sbfspot/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

**如果您喜欢它，请考虑捐赠：**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

此适配器使用 sbfspot 从 SMA 电源逆变器读取数据。
现在支持两种数据库类型（mySQL 和 sqlite）。
自 0.2.3 版本起，我们提供了一个基于 flot 的可视化小部件，用于显示历史数据。

## 安装/更新
请按照 https://github.com/SBFspot/SBFspot/wiki 下的 sbfspot 安装说明进行操作

在 /opt/iobroker/node_modules/iobroker.sbfspot/lib/scripts 中，您可以找到在基于 debian 的系统上安装和更新 SBFspot 的脚本。

## 提示
* 使用来自 https://github.com/SBFspot/SBFspot 的 sbfspot 的最新版本
* 适配器、sbfspot 和数据库（mySQL 或 sqlite）必须在同一系统上运行，例如 Raspberry PI
* Raspberry Pi（或类似产品）上的 sbfspot 安装手册可在 https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite 或 https://www.rg-engineering.eu/index.php/produkte/software/plugin-fuer-iobroker-sbfspot 下找到
* 对于 Raspberry Pi，有一个半自动配置工具，可在 https://github.com/SBFspot/sbfspot-config 下使用

## 已知问题
* 有时 npm 包 sqlite3 的安装会失败。

在这种情况下重新安装所有 npm 包

> cd /opt/iobroker/node_modules/iobroker.sbfspot > sudo npm install

有时必须多次调用 npm intall 才能成功安装所有必要的软件包

* 如果您发现错误或需要新功能，请在 [github](https://github.com/rg-engineering/ioBroker.sbfspot/issues) 创建问题

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 5.0.0 (2025-06-07)
* (René) ATTENTION breaking change: adapter type changed from scheduled to daemon
* (René) update hints added to admin
* (René) suggestions from adapter checker

### 4.4.2 (2025-02-27)
* (René) changes requested by adapter checker
* (René) dependencies updated

### 4.4.1 (2024-12-15)
* (René) translations

### 4.4.0 (2024-12-06)
* (René) migration to admin 5 UI (jsonConfig)

### 4.3.5 (2024-11-24)
* (René) see issue #417: test with nodejs@22
* (René) issue  #435: install widgets again

### 4.3.4 (2024-08-24)
* (René) update dependencies
* (René) bug fixes based on adapter checker recommendation

### 4.3.3 (2024-05-28)
* (René) change of dependencies
* (René) mySql dependency update

### 4.3.1 (2024-05-23)
* (René) bug fix for data history in VIS-2

### 4.3.0 (2024-05-22)
* (René) data history prepared for VIS-2: just a option here in the adapter and new widget (at this moment GeneralChart widget in vis-2-widgets-weather can be used)

### 4.2.4 (2024-01-13)
* (René) upgrade better-sqlite

### 4.2.3 (2024-01-12)
* (René) downgrade better-sqlite

### 4.2.2 (2024-01-12)
* (René) dependencies updated

### 4.2.1 (2023-12-11)
* (René) dependencies updated

### 4.2.0 (2023-12-11)
* (René) dependencies updated

### 4.1.6 (2023-07-30)
* (René) dependencies updated

### 4.1.4 (2023-04-07)
* (René) dependencies updated

### 4.1.3 (2023-01-31)
* (René) dependencies updated

### 4.1.2 (2022-08-20)
* (René) bug fix in AddObject

### 4.1.1 (2022-08-18)
* (René) tooltip in wizard added
* (René) flot and dependencies updated

### 4.0.8 (2021-07-11)
* (René) bug fix color of labels in widget

### 4.0.7 (2021-10-30)
* (René) see issue #62: avoid endless loop
* (René) update flot to 4.2.2

### 4.0.6 (2021-07-09)
* (René) bug fix data types

### 4.0.5 (2021-03-21)
* (René) dependencies updated

### 2.3.3 (2019-02-03)
* (René) due to install problems downgrade of sqlite3 package

### 2.3.1 (2019-02-02)
* (René) bug fix: with sqlite "today" data were not shown

### 2.3.0 (2019-01-20)
* (René) support of compact mode
* (René) add additional error information in log

### 2.2.5 (2018-11-26)
* (René) upgrade packages

### 2.2.5 (2018-11-04)
* (René) reset yield if no new value from today

### 2.2.4 (2018-08-19)
* (René) bugfix for ticks on X

### 2.2.3
* (René) the same as 2.2.2

### 2.2.2
* (René) add timestamp of last update

### 2.2.1
* (René) close of database connection after last query result is available (e.g. to support more than one inverter)

### 2.2.0
* (Nis) background color and border
* (René) bug fixes in admin3

### 2.1.0
* (René) Support MariaDB

### 2.0.1
* (René) Support of admin3

### 2.0.0
* (René) since we always use one graph per widget, only one is supported now
		Attention: widget is not compatible with version 1.x.x; just check settings in widget after installation!

### 1.1.0
* (René) autoscale of y axis
* (René) color for y axis 
* (René) adjustable date format

### 1.0.1
* (René) bug fix for sqlite

### 1.0.0
* (René) first stable release

### 0.2.6
* (René) bug fix for android app > 1.0.6

### 0.2.5
* (René) use install date to calculate historical values

### 0.2.4
* (René) logo changed

### 0.2.3
* (René) adding historical data as datapoint (JSON)
* (René) new vis widget to show historical data

### 0.2.2
* (René) renamed to sbfspot

### 0.2.1
* (René) index.html updated

### 0.2.0
* (René) support of sqlite and license changed to MIT

### 0.1.1
* (René) UTF8 coding

### 0.1.0
* (René) first release

### 0.0.1
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