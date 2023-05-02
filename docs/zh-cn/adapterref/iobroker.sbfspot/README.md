---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: Nu1nQOSXWDiKNtL/Z0rrhwfFTJzjxTb5rRgmBUpy9xk=
---
![标识](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![安装数量](http://iobroker.live/badges/sbfspot-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sbfspot.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.sbfspot/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)

#ioBroker.sbfspot
![GitHub 操作](https://github.com/rg-engineering/ioBroker.sbfspot/workflows/Test%20and%20Release/badge.svg)

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

**如果喜欢，请考虑捐款：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

此适配器使用 sbfspot 从 SMA 电源逆变器读取数据。
现在支持两种数据库类型（mySQL 和 sqlite）。
自版本 0.2.3 以来，有一个基于 flot 的可视化小部件可用于显示历史数据。

＃＃ 安装
请按照 https://github.com/SBFspot/SBFspot/wiki 下的 sbfspot 安装说明进行操作

[在基于 arm 的系统上的详细安装](docs/en/install_arm.md)

## 提示
* 使用来自 https://github.com/SBFspot/SBFspot 的 sbfspot 的最新版本
* 适配器、sbfspot 和数据库（mySQL 或 sqlite）必须在同一系统上运行，例如树莓派
* 可以在 https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite 或 https://www.rg-engineering.eu/index 下找到 sbfspot 在 Raspberry Pi（或类似设备）上的安装手册。 php/produkte/software/plugin-fuer-iobroker-sbfspot
* 对于 Raspberry Pi，在 https://github.com/SBFspot/sbfspot-config 下有一个半自动配置工具

＃＃ 已知的问题
* 有时 npm 包 sqlite3 安装失败。

在那种情况下重新安装所有 npm 包

> cd /opt/iobroker/node_modules/iobroker.sbfspot > 须藤 npm 安装

有时必须多次调用 npm intall 才能成功安装所有 necessray 包

* 如果您发现错误或想要新功能，请在 [github](https://github.com/rg-engineering/ioBroker.sbfspot/issues) 创建问题

## 4.0.4 (2021-02-14)
* (René) 依赖更新

## 4.0.3 (2021-01-15)
* (René) 基于 CI 测试的错误修复

## 4.0.2 (2020-10-09)
* (René) 基于 CI 测试的错误修复

## 4.0.0 (2020-07-28)
* (René) 返工以使用 async/await
* (René) 使用 mysql2

## 3.0.0 (2020-04-25)
* (René) sqlite3 包替换为 better-sqlite3
* (René) DP 的角色过度劳累
* (René) 请参阅问题 #19：仅在日光作为选项添加时获取数据
* (René) 请参阅问题 #29：小部件轴标签的默认颜色已更改
* (René) 小部件：添加了小部件太小时的日志

## 2.4.3 (2020-04-02)
* (René) 用于小部件的 DB_CalcHistory_Today 中的错误修复

## 2.4.2 (2020-02-01)
* (René) 错误修复小部件

## 2.4.0 (2019-12-28)
* (René) 更新到我自己的 flot 3.0

## 2.3.4 (2019-10-31)
* (René) 将 flot 更新到 3.0 版

### 2.3.3 (2019-02-03)
* (René) 由于 sqlite3 包的安装问题降级

### 2.3.1 (2019-02-02)
* (René) 错误修复：使用 sqlite“今天”数据未显示

### 2.3.0 (2019-01-20)
* (René) 支持紧凑模式
* (René) 在日志中添加额外的错误信息

### 2.2.5 (2018-11-26)
* (René) 升级包

### 2.2.5 (2018-11-04)
* (René) 如果今天没有新值，则重置收益率

### 2.2.4 (2018-08-19)
* (René) X 上刻度的错误修正

### 2.2.3
* (René) 与 2.2.2 相同

### 2.2.2
* (René) 添加上次更新的时间戳

### 2.2.1
* (René) 在最后一个查询结果可用后关闭数据库连接（例如支持多个逆变器）

### 2.2.0
* (Nis) 背景颜色和边框
* (René) admin3 中的错误修复

### 2.1.0
* (René) 支持 MariaDB

### 2.0.1
* (René) 支持 admin3

### 2.0.0
* (René) 因为我们总是为每个小部件使用一个图表，所以现在只支持一个

注意：widget 与 1.x.x 版本不兼容；安装后只需检查小部件中的设置！

### 1.1.0
* (René) y 轴自动缩放
* y 轴的 (René) 颜色
* (René) 可调日期格式

### 1.0.1
* (René) sqlite 错误修复

### 1.0.0
* (René) 第一个稳定版

### 0.2.6
* (René) Android 应用 > 1.0.6 的错误修复

### 0.2.5
* (René) 使用安装日期来计算历史价值

### 0.2.4
* (René) 徽标已更改

### 0.2.3
* (René) 添加历史数据作为数据点 (JSON)
* (René) 新的 vis 小部件来显示历史数据

### 0.2.2
* (René) 更名为 sbfspot

### 0.2.1
* (René) index.html 已更新

### 0.2.0
* (René) 对 sqlite 的支持和许可证更改为 MIT

### 0.1.1
* (René) UTF8 编码

### 0.1.0
* (René) 首发

### 0.0.1
* (René) 初始版本

## Changelog

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

## License
MIT License

Copyright (c) 2017-2023 rg-engineering info@rg-engineering.eu

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