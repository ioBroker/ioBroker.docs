---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.yamaha/README.md
title: 无题
hash: 7OJuYFsy6VNYKUCbfYG3oHnTo5qf9BztKBSu3G86OrU=
---
![标识](../../../en/adapterref/iobroker.yamaha/admin/yamaha.png)

![安装数量](http://iobroker.live/badges/yamaha-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.yamaha.svg)
![下载](https://img.shields.io/npm/dm/iobroker.yamaha.svg)

## IoBroker.yamaha
![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.yamaha/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/yamaha/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

＃＃＃＃ 描述
雅马哈 AV 接收器适配器

请在 github 或 https://forum.iobroker.net/topic/53174/weiterentwicklung-yamaha-adapter 上进行讨论

### 初始创建
该适配器最初由 @soef 在 https://github.com/soef/ioBroker.yamaha 创建，但不再维护，因此我们将其移至 iobroker-community 以便修复错误。感谢 @soef 的工作。

＃＃＃＃ 配置
目前没有自动发现，您必须输入接收器的 IP

＃＃＃＃ 安装
通过 ioBroker Admin。

否则，在 iobroker 根目录（例如在 /opt/iobroker）中执行以下命令“npm install iobroker.yamaha iobroker upload yamaha”

＃＃＃＃ 即时的
状态发生时，将创建状态。即使用您的红外遥控器并进行一些更改，您将看到新状态。
雅马哈设备仅接受一个连接。

＃＃＃＃ 要求
雅马哈接收器

您必须在接收器配置中启用“网络待机”功能

## Changelog
### 0.5.4 (2024-06-14)
* (foxriver76) updated packages

### 0.5.3 (2022-06-17)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.2 (2022-04-23)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.1 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry
* (Sneak-L8) fix type of pureDirect

### 0.5.0 (2022-03-08)
* IMPORTANT: js-controller 2.0 is needed at least
* (Apollon77) Add Sentry for crash reporting

### 0.4.1
* (Sneak-L8) "toggleMute" now toggle mute state (instead of always muting)

### 0.4.0
* (Garfonso) added admin 3 compatibility and more meta-data stuff.
* (Garfonso) added compact mode support.

### 0.3.20
* (Garfonso) adjusted local copy of soef.js to js-controller 3.0
* (Garfonso) updated meta information (links etc) to iobroker-community-adapters

### 0.3.19
* (soef) Changelog added to readme

### 0.3.18
* (Apollon77) Update utils.js and usage, CI Testing and deps

### 0.3.17
* (Apollon77) update basic package-file testing

### 0.3.16
* (soef) node 0.12 removed from testing

### 0.3.15
* (soef) Enhance CI testing

### 0.3.14
* (soef) Possible exception in reconnect fixed

### 0.3.12
* (soef) Version incr. for npm

### 0.3.11
* (soef) reconnect overworked

### 0.3.10
* (soef) realtime Ping now configurable

### 0.3.8
* (soef) realtime states optimized

### 0.3.7
* (soef) fix typo in creating realtime states

### 0.3.6
* (soef) timeout to connect reduced

<!--

## License
The MIT License (MIT)

Copyright (c) 2015-2024 soef <soef@gmx.net>

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
-->