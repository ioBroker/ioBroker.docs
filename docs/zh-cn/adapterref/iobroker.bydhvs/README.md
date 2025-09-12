---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bydhvs/README.md
title: 无标题
hash: KB7RargX+yva7yH7Db8nwbj/wkP5w5DHRtli0soAJ0E=
---
![标识](../../../en/adapterref/iobroker.bydhvs/admin/bydhvs.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.bydhvs.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bydhvs.svg)
![安装数量](https://iobroker.live/badges/bydhvs-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/bydhvs-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.bydhvs.png?downloads=true)

**测试：**![测试和发布](https://github.com/christianh17/ioBroker.bydhvs/workflows/Test%20and%20Release/badge.svg)![CodeQL](https://github.com/christianh17/ioBroker.bydhvs/actions/workflows/codeql.yml/badge.svg?branch=main)

## IoBroker 的 bydhvs 适配器
比亚迪HVS电池调查数据

＃＃ 介绍
此适配器从比亚迪光伏电池 (https://www.bydbatterybox.com/) 获取数据，并将其放入适配器中的数据点。遗憾的是，它没有官方 API 和文档，因此我使用了 wireshark 和 byd-hvs-simulator 来尝试理解通信过程。我的适配器模拟了 byd-app，向设备发送类似的数据包并分析响应。

＃＃ 当心
beConnect 应用程序有两个步骤：第一步获取常规数据；第二步获取所有电池的详细数据（单个电池的温度、电压以及其他一些详细信息）。为了获取详细数据，必须在其中一个数据包发送后延迟一段时间才能得到结果。我认为在此期间所有电池都会被测量，但我不确定。我不确定过于频繁地轮询这些数据是否会损害你的电池，所以请注意：风险自负！

## 支持最多 5 个模块
现在支持最多 5 个 HVS 模块。

＃＃ 设置
间隔：这很简单：数据轮询频率 IP 地址：这不言自明。您可以使用标准地址（192.168.16.254）并更改家中的路由，例如：https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343。优点是：beConnect 应用程序也可以工作。另一种可能性：您可以更改盒子的 IP 地址。但是：请注意：网页上的文字令人困惑，如果您不完全确定您要做的事情：请不要触摸设置。在德国论坛中，我看到有人被锁定在系统之外并且没有办法恢复，要么比亚迪向您发送替换的 HVU，要么您必须购买新的。
电池详细信息：如上所述：您需要电池的详细信息吗？如果是，请设置复选框。
电池详情 - 每...次循环：同样与上述类似，应该清晰可见。测试模式 - 在错误日志中显示数据：如果勾选此框，发送和接收的数据将显示在错误日志中，以便您在出现错误时轻松下载数据并发送给我。
复制粘贴无效 - 数据在最后会被剪切。您必须先下载后才能发送给我。

[链接 zur nativen deutschen 自述文件：](README-German.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (arteck) add current info
* (arteck) add creates into separated file 

### 1.5.4 (2025-08-03)
* (arteck) typo

### 1.5.3 (2025-08-02)
* (arteck) update dependecy

### 1.5.2 (2025-08-02)
* (arteck) add socketConnection DP
* (arteck) use jsconConfig
* (arteck) refactoring to modern Code
* (arteck) use direct socket connection without detour IPClient
* first Version with two towers in NPM

### 1.5.1 (2024-01-15)
* Enable the possibility to get informations from a two tower setup
* BREAKING CHANGE of Structure.

### 1.5.0 (2023-11-04)
* Breaking change: nodejs 16 minimum required
* automated checks and release-script repaired (thanks to mcm1957, he did the work)
* nothing else changed in code

###

## License
MIT License

Copyright (c) 2025 Christian <github@familie-herrmann.de>

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