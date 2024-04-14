---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.firetv/README.md
title: 无题
hash: nJW8Ivl7+3wVKYmhPNOD5TqxvroOmDX/LCe164N51sI=
---
![标识](../../../en/adapterref/iobroker.firetv/admin/firetv.png)

![安装数量](http://iobroker.live/badges/firetv-community-installed.svg)
![稳定版本](http://iobroker.live/badges/firetv-community-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.firetv.svg)
![测试](https://img.shields.io/travis/soef/iobroker.firetv/master.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![构建状态](https://secure.travis-ci.org/soef/iobroker.firetv.svg?branch=master)

### IoBroker.firetv
<!--
[![NPM 版本]（https://badge.fury.io/js/iobroker.firetv.svg）](https://www.npmjs.com/package/iobroker.firetv)
-->

使用此适配器，您可以控制 Fire TV 或 Fire TV Stick 的某些功能。
例如：

- 开关
- 发送关键事件
- 将文本字符串发送到输入字段
- 启动/停止应用程序
- 重启
- 执行 shell 命令

一些信息
此适配器使用“Android 调试桥”的功能，即“adb”。Adb 是 Android 开发者 SDK 的一部分。由于 Fire TV 具有 Android 操作系统，因此可以通过 adb 进行控制。

＃＃＃＃ 要求
要使用此适配器，您必须至少安装 Android SDK 的 adb 包。为了不安装完整的 Android SDK，您应该安装 *Minimal ADB 和 Fastboot*。

在 Google（最小 ADB 和 Fastboot）上搜索最新的下载链接。

或者，您可以使用 *adbLink*

## Changelog
<!-- 
    ### **WORK IN PROGRESS** 
-->
### 2.1.0 (2024-04-07) 
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.0.2 (2023-09-09) 
* (jonaskn) A crash has been fixed (#56)

### 2.0.1 (2023-09-07)
* (Grothesk242) make compatible with Node.js 18+
* (bluefox) a minimum node.js version is 16

### 1.0.0 (2020-04-09)
* (foxriver76) compatibility for js-c 3

## License
The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2016-2023 soef <soef@gmx.net> and Community developers

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