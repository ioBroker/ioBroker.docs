---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pjlink/README.md
title: ioBroker.pjlink
hash: nkmGmjt70xaRl8i7F74+GYPsaaiq/NlgGtOsXAg7dRA=
---
![标识](../../../en/adapterref/iobroker.pjlink/admin/pjlink.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.pjlink.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pjlink.svg)
![安装数量](https://iobroker.live/badges/pjlink-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/pjlink-stable.svg)
![新平台](https://nodei.co/npm/iobroker.pjlink.png?downloads=true)

# IoBroker.pjlink
![测试与发布](https://github.com/Bannsaenger/ioBroker.pjlink/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 pjlink 适配器
PJLink 投影仪控制

**!! 目前仅支持 1 类协议**

## 关于 PJLink
> PJLink 是操作和控制数据投影仪的统一标准。
PJLink 可以集中控制不同供应商生产的投影仪，投影仪可以由控制器操作。
无论制造商是谁，都可以随时随地管理和控制符合 PJLink 标准的设备。
PJLink 是一种新标准，旨在使不同投影仪制造商之间不同的通信接口和通信协议统一和通用。

> PJLink 兼容设备具有跨不同型号和制造商的高度互联互通性，可轻松构建混合不同型号和系统的环境，并轻松更换已存在的系统。

* [摘自 PJLink 主页](https://pjlink.jbmia.or.jp/english/)

## 致谢
该协议是以下公司的商标：**版权所有 © 日本商用机器和信息系统工业协会。保留所有权利，**[PJLink 主页](https://pjlink.jbmia.or.jp/english/)

这项工作基于来自**sy1vain**的带有 pjlink 实现的 nodejs 模块：[https://github.com/sy1vain/node-pjlink](https://github.com/sy1vain/node-pjlink)

待办事项
* 支持node-pjlink项目实现类2
* 返回 github 上的 pjlink 库。目前，由于测试脚本中的错误，该库被本地保存

## 适配器的工作原理
目前仅支持 1 类。这意味着适配器只能轮询状态。
一旦支持 2 类，就可以添加从设备到适配器的主动发送状态信息。

#### PJLink 1 类输入
* 输入必须设置为 2 位数字。第一位数字描述输入类型

| 类型 | 数量 | 可能的输入 |
| ------- | ------ | --------------- |
| RGB | 1 | 1 - 9 |
| 视频 | 2 | 1 - 9 |
| 数字 | 3 | 1 - 9 |
| 存储 | 4 | 1 - 9 |
| 网络 | 5 | 1 - 9 |

启动适配器后，可以在数据库中的 > pjlink.\<instance\>.deviceInfo.availableInputs 下找到可能的输入

您可以在实例配置中编辑输入对象。您可以在那里编辑输入的名称并让数据库对象验证您的输入。

### 电源开关
具有状态（设置为**true**）

> pjlink.\<实例\>.power

投影仪可以根据当前电源状态打开和关闭。

> pjlink.\<实例\>.powerStatus

电源开关将自动返回到**false**。

#### 灯状态
数据库中仅预定义一盏灯。如果灯查询返回多盏灯，则将动态添加其他灯。

#### Ping 功能
如果投影仪长时间无法连接，适配器可以切换到 icmp ping 来检查可达性，例如在 3 次连接失败后。如果一次 ping 得到响应，适配器将尝试再次重新连接，参见[https://github.com/Bannsaenger/ioBroker.pjlink/issues/59](https://github.com/Bannsaenger/ioBroker.pjlink/issues/59)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Bannsaenger) updated dependencies
* (Bannsaenger) added ping feature

### 0.1.1 (2023-01-24)
* (Bannsaenger) temporarily fix the test script error with local libraries

### 0.1.0 (2023-01-23)
* (Bannsaenger) extended configuration to let you choose the frequency and time for information retrieval
* (Bannsaenger) add possibility to customize media.input by the **INST** query and edit the names in instance config
* (Bannsaenger) add non-guaranteed time after power ON (number of skipped short cycles after power ON event)
* (Bannsaenger) moved all status queries to one timer due to authentification issues when queries are executed at the same time
* (Bannsaenger) treat error "unavailabe time" only as warning and log it only once

### 0.0.3 (2022-10-19)
* (Bannsaenger) updated react dependency

### 0.0.2 (2022-10-19)
* (Bannsaenger) changed some info logs to debug. Fixed one power state issue.
* (Bannsaenger) redesign of timer and error handling

### 0.0.1 (2022-10-13)
* (Bannsaenger) initial release

## License
MIT License

Copyright (c) 2022-2025 Bannsaenger <bannsaenger@gmx.de>

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