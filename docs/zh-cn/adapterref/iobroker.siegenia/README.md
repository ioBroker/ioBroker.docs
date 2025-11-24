---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.siegenia/README.md
title: ioBroker.siegenia
hash: wlVBOqXKLMOElBCSOcaoQUPD//+JZz14OYxLjkIaZI0=
---
# IoBroker.siegenia

![安装数量](http://iobroker.live/badges/siegenia-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.siegenia.svg)
![下载](https://img.shields.io/npm/dm/iobroker.siegenia.svg)

<img src="./admin/siegenia_logo.jpg"/>

![测试和发布](https://github.com/Apollon77/ioBroker.siegenia/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/siegenia/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

该适配器为 Siegenia 气候和空气控制设备（https://www.siegenia.com）提供 ioBroker 支持。

该适配器至少需要 Nodejs 8.x。

## 功能集
此适配器支持所有当前设备：

* 航空太平洋公司
* AEROMAT VT
* 驱动 axxent DK/MH
* 传感器
* AEROVITAL 氛围
* MHS 家庭
* 美国化学学会
* 气管
* 通用模块
* enOcean 转换模块
* VT升级
* 驱动CL
* AEROPLUS

该适配器能够自动检测与 ioBroker 位于同一网络中的 Siegenia 设备，并将其列在其管理界面中。您只需在检测后更正用户名和密码即可。您也可以手动输入 IP 地址和登录数据。

检测到的设备的所有可用数据字段都显示在对象中，并提供当前数据和/或允许更改数据。

适配器显示计时器和其他更复杂的数据，但只能通过 Siegenia 应用程序进行更改。

## Changelog

### __WORK IN PROGRESS__
* (@Apollon77) Add support for enOcean Converter Module, VT Upgrade, DRIVE CL, and AEROPLUS

### 1.1.1 (2021-07-06)
* (thost96/Apollon77) Optimize for js-controller 3.3

### 1.1.0 (2021-01-22)
* (Apollon77) Prevent crash case (Sentry IOBROKER-SIEGENIA-1)
* (Apollon77) js-controller 2.0 is now required at least

### 1.0.1 (2020-12-24)
* (Apollon77) update dependencies
* (Apollon77) disconnect device if authentication was not successful

### 1.0.0
* (Apollon77) initial release

## License
MIT License

Copyright (c) 2019-2025 Apollon77 iobroker@fischer-ka.de

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