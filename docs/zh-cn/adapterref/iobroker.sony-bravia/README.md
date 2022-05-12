---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sony-bravia/README.md
title: ioBroker.sony-bravia
hash: EYBAcI/Mg99FPl4w5uYns3LSuhJU9dlIDtbqZ839I98=
---
![标识](../../../en/adapterref/iobroker.sony-bravia/admin/sony-bravia.png)

![安装数量](http://iobroker.live/badges/sony-bravia-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sony-bravia.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sony-bravia.svg)

# IoBroker.sony-bravia
![测试和发布](https://github.com/iobroker-community-adapters/iobroker.sony-bravia/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/sony-bravia/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## 用于 ioBroker 的 Sony Bravia Android 智能电视适配器
这是一个 ioBroker 适配器，适用于带有 Android 操作系统的 Sony Bravia 智能电视。用KD-65X8507C测试。

## 电视设置
* 打开你的电视
* 在电视上转到设置 > 网络 > 家庭网络设置 > 远程设备/渲染器 > 开
* 在电视上转到设置 > 网络 > 家庭网络设置 > IP 控制 > 身份验证 > 普通和预共享密钥
* 在电视上转到设置 > 网络 > 家庭网络设置 > 远程设备/渲染器 > 输入预共享密钥 > 0000（或任何您想要的 PSK 密钥）
* 在电视上转到设置 > 网络 > 家庭网络设置 > 远程设备/渲染器 > 简单 IP 控制 > 开

## Changelog
### 1.0.8 (2022-04-25)
* (Apollon77) Fix crash cases reported by sentry

### 1.0.7 (2022-04-24)
* (Apollon77) Fix tier definition

### 1.0.6 (2022-04-23)
* (ThomasBra) Audio volume/mute control
* (ThomasBra) value lists for AV Contents
* (Apollon77) Add Sentry error reporting

### 1.0.5
* (ThomasBra) Fix for content list request for older api versions

### 1.0.4
* (ThomasBra) Added info.modelInformation
* (ThomasBra) Added info.playingContentInfo - title of the used channel or port
* (ThomasBra) Set info.powerStatusActive changeable
* (ThomasBra) Turn over to tv channels - the first 150 listed tv channels
* (ThomasBra) Turn over to AV Content - external input
* (ThomasBra) Starting / Terminate Apps
* (ldittmar) Fixes from adapter checker

### 1.0.3
* (Apollon77) info.powerStatusActive added and other optimizations

### 1.0.2
* (raintonr) Added info.powerStatusActive
* (raintonr) Optimizations

### 1.0.1
* (ldittmar) compact mode compatibility added
* (ldittmar) add chinese support

### 1.0.0
* (ldittmar) Support of admin3

### 0.1.0
* (ldittmar) Test phase terminated. Adapter enabled.

### 0.0.5
* (ldittmar) Open beta test phase - please test it and give me feedback here as a issue or in the forum http://forum.iobroker.net/viewtopic.php?f=23&t=6406

### 0.0.1
* (ldittmar) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2022 ldittmar <iobroker@lmdsoft.de>

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