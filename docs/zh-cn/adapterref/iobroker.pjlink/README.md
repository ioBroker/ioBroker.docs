---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pjlink/README.md
title: ioBroker.pjlink
hash: fRFyqywoqjqqH5xW0ND8o/PnzeQLT9fhEDVWAGrmvi8=
---
![标识](../../../en/adapterref/iobroker.pjlink/admin/pjlink.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.pjlink.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pjlink.svg)
![安装数量](https://iobroker.live/badges/pjlink-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/pjlink-stable.svg)
![NPM](https://nodei.co/npm/iobroker.pjlink.png?downloads=true)

# IoBroker.pjlink
![测试与发布](https://github.com/Bannsaenger/ioBroker.pjlink/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 pjlink 适配器
PJLink投影仪控制

**！！目前仅支持1类协议**

## 关于 PJLink
PJLink 是用于操作和控制数据投影机的统一标准。

PJLink 支持对不同厂商生产的投影机进行集中控制，所有投影机均可由控制器进行操作。

符合 PJLink 标准的设备可以随时随地进行管理和控制，不受制造商的限制。

PJLink 是一项旨在统一不同投影机制造商之间通信接口和通信协议的新标准。

> PJLink 兼容设备具有不同型号和制造商之间的高度互连性，可以轻松构建混合不同型号和系统的环境，并可以轻松更换已安装的系统。

* [摘自 PJLink 官网](https://pjlink.jbmia.or.jp/english/)

## 鸣谢
该协议是以下机构的注册商标：**版权所有 © 日本商业机器和信息系统产业协会。保留所有权利。** [PJLink 主页](https://pjlink.jbmia.or.jp/english/)

这项工作基于 **sy1vain** 的 nodejs 模块及其 pjlink 实现：[https://github.com/sy1vain/node-pjlink](https://github.com/sy1vain/node-pjlink)

## 待办事项
* 支持 node-pjlink 项目实现 2 类
* 返回 GitHub 上的 pjlink 库。目前由于测试脚本中的错误，该库暂时保存在本地。

## 适配器的工作原理
目前仅支持 1 类设备。这意味着适配器只能轮询设备状态。

一旦支持 2 类设备，即可添加从设备向适配器主动发送状态信息的功能。

#### PJLink 1 类输入
输入内容必须设置为两位数。第一位数字表示输入类型。

| 类型 | 数字 | 可能的输入项 |
| ------- | ------ | --------------- |
| RGB | 1 | 1 - 9 |
| 视频 | 2 | 1 - 9 |
| 数字版 | 3 | 1 - 9 |
| 存储 | 4 | 1 - 9 |
| 网络 | 5 | 1 - 9 |

适配器启动后，可以在数据库中通过 > pjlink.\<实例\>.deviceInfo.availableInputs 找到可能的输入项。

您可以在实例配置中编辑输入对象。在那里，您可以编辑输入名称，并让数据库对象验证您的输入。

### 电源开关
状态（设置为**true**）

> pjlink.\<实例>.power

投影仪可以根据当前的电源状态开启和关闭。

> pjlink.\<实例>.powerStatus

电源开关将自动恢复为**false**。

#### 指示灯状态
数据库中仅预定义了一盏灯。如果查询结果返回多盏灯，则会动态添加其余灯。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.2 (2025-10-27)
* (Bannsaenger) updated dependencies and issues from repository checker
* (Bannsaenger) migrate to NPM Trusted Publishing
* (Bannsaenger) added tcp-ping feature

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