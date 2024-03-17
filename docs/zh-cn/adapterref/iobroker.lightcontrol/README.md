---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lightcontrol/README.md
title: ioBroker.lightcontrol
hash: 2C8lox7QJJk3YWndhJjKQTbbN03SjxFzwB2yH3gvwgI=
---
![标识](../../../en/adapterref/iobroker.lightcontrol/admin/lightcontrol.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.lightcontrol.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lightcontrol.svg)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.lightcontrol?style=flat-square)
![GitHub](https://img.shields.io/github/license/schmakus/iobroker.lightcontrol?style=flat-square)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![国家公共管理](https://nodei.co/npm/iobroker.lightcontrol.png?downloads=true)
![贝塔](https://img.shields.io/npm/v/iobroker.lightcontrol.svg?color=red&label=beta)
![稳定的](http://iobroker.live/badges/lightcontrol-stable.svg)
![已安装](http://iobroker.live/badges/lightcontrol-installed.svg)
![贝宝捐赠](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)

# IoBroker.lightcontrol
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/lightcontrol/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

![测试与发布](https://github.com/Schmakus/ioBroker.lightcontrol/workflows/Test%20and%20Release/badge.svg)

## 版本
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## 如果你喜欢我的工作：
＃＃ 安装
请使用 ioBroker 中的“适配器列表”和稳定存储库来安装此适配器的版本。您还可以使用 CLI 安装此适配器：

```
iobroker add lightcontrol
```

## 文档
[🇺🇸 文档](./en/lightcontrol.md)

[🇩🇪 文档](./docs/de/lightcontrol.md)

＃＃ 去做
- 为一个对象 ID 选择多个 LightGroup（jsonCustom Select multible 的错误）
- 可以在自动关闭之前以较低的亮度和定义的秒数发出通知

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.5.0 (2024-03-01)

-   (Schmakus) update dependencies
-   (Schmakus) update license year
-   (Schmakus) fixed AutoOnLux (Cannot read properties of undefined (reading 'minLux'))

### 0.4.0 (2023-08-16)

-   (Schmakus) Node >=16 and NPM >=7 necessary!
-   (Schmakus) fixed rampOff.time
-   (Schmakus) update dependencies

### 0.3.0 (2023-07-17)

-   (Schmakus) (thoml95) Changed conversion of color-temperature (edit of ct-states required)
-   (Schmakus) (thoml95) fixed some bugs related to powerCleaningLight
-   (Schmakus) Some code improvements
-   (Schmakus) Update Docu

### 0.2.18 (2023-07-08)

-   (Schmakus) Fixed CtReverse [#149]
-   (Schmakus) Fixed translation for light [#136]
-   (Schmakus) Fixed warning min/max of ct-state [#148]
-   (Schmakus) Fixed Set Color-Temperature (set null value)

### 0.2.17 (2023-05-17)

-   (Schmakus) Fix error by init of customConfig, if no light description is available
-   (Schmakus) Fix error by set Ct, Color,... if no lights or groups defined
-   (Schmakus) Some code improvements

## License

MIT License

Copyright (c) 2024 Schmakus <schmakus@gmail.com>

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