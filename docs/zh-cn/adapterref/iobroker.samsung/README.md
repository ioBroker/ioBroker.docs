---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.samsung/README.md
title: 无题
hash: yV2UJS2q2NC3u9uj++eNNGbe8+MrMbJdbL2+4YYtkvI=
---
![标识](../../../en/adapterref/iobroker.samsung/admin/samsung.png)

![安装数量](http://iobroker.live/badges/samsung-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.samsung.svg)
![下载](https://img.shields.io/npm/dm/iobroker.samsung.svg)

### IoBroker.三星
![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.samsung/workflows/Test%20and%20Release/badge.svg) <!-- [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/samsung/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) -->

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

**Windows 用户重要提示：此适配器需要系统范围内安装 git**

＃＃＃＃ 描述
三星电视适配器

### 初始创建
此适配器最初由 @soef 在 https://github.com/soef/ioBroker.samsung 创建，但不再维护，因此我们将其移至 iobroker-community，以便修复错误。感谢 @soef 所做的工作。
从那时起，jogibear9988 和 mwp007 扩展了适配器，并增加了更多 Api。

＃＃＃＃ 配置
输入三星电视的 IP。
选择您的 API：三星遥控器 - 2014 年之前的电视安装后，您必须确认电视上的新连接三星 HJ - 2014 年和 2015 年首次连接后，您需要输入电视上显示的 PIN。
Samsung2016 - 不言而喻三星电视 - 2016 年之后的 Tizen 电视

＃＃＃＃ 要求
三星电视<br>我在 UE55HU7200 上测试了 HJ 系列。自 2016 年以来对设备的支持处于实验阶段，如果出现问题，请查看日志。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.0 (2024-05-24)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Adapter uses adapter-core now
* (Apollon77) Only Wake-On-Lan SamsungTVs on adapterstart if no token is configured
* (mcm1957) Dependencies have been updated

### 0.5.11 (2022-06-02)
* (Apollon77) Optimize checkOnOff logic on adapter start

### 0.5.10 (2022-05-27)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.9 (2022-05-27)
* (Apollon77) fix crash when initializing a SamsungTV (Tizen)

### 0.5.8 (2022-04-23)
* (Apollon77) Fix crash cases reported by Sentry

## License
The MIT License (MIT)

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2017 soef <soef@gmx.net>, 2018-2022 ioBroker Community

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