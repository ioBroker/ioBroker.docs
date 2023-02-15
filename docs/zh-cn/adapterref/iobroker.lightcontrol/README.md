---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lightcontrol/README.md
title: ioBroker.lightcontrol 文件
hash: OHsNc1pxcioW6s/KRjss1CYZEq1NrFzmK+4zOyQZyLE=
---
![标识](../../../en/adapterref/iobroker.lightcontrol/admin/lightcontrol.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.lightcontrol.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lightcontrol.svg)
![安装数量](https://iobroker.live/badges/lightcontrol-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/lightcontrol-stable.svg)
![NPM](https://nodei.co/npm/iobroker.lightcontrol.png?downloads=true)
![贝宝捐赠](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)

#ioBroker.lightcontrol
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/lightcontrol/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：** ![测试和发布](https://github.com/Schmakus/ioBroker.lightcontrol/workflows/Test%20and%20Release/badge.svg)

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## IoBroker 的 LightControl 适配器
各厂家灯具的光控

[德意志研究报](docs/de/lightcontrol.md)

[英文说明在这里](docs/en/lightcontrol.md)

＃＃ 去做
- 为一个对象 ID 选择多个 LightGroup（jsonCustom Select multible 的错误）
- 在自动关闭前以较低的亮度和定义的秒数通知的可用性
- 直接为灯设置 Ct、Sat 和颜色，即使它已关闭。
- 仅在电平/亮度状态和无开关状态下打开/关闭灯的可用性

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**

	-   (Schmakus) Add: Set Ct, Sat and Color directly to the lamp, also if it's switched off.
-->

### **WORK IN PROGRESS**

-   (Schmakus) Update adaptername translations in io-package.json

### 0.1.3 (2023-01-17)

-   (Schmakus) Added AdaptiveCt functionality. Was not implemented in older versions.

### 0.1.2 (2023-01-14)

-   (Schmakus) Some different small bugfixes and code cleaning
-   (Schmakus) Fix: Update for ioBroker Beta-Repo
-   (Schmakus) Fix: Adaptive Color-Temperature (failure by reading settings minCt and maxCt)

### 0.1.1 (2023-01-04)

-   (Schmakus) Add Sentry Plugin
-   (Schmakus) Fix issue [#80](https://github.com/Schmakus/ioBroker.lightcontrol/issues/80)
-   (Schmakus) general translation updates and translation of states

### 0.1.0 (2023-01-02)

-   (Schmakus) Latest Release

### 0.0.8 (2023-01-02)

-   (Schmakus) Ability to remove unused lights and sensors when deleting the light group
-   (Schmakus) Some code cleaning and update debug logs
-   (Schmakus) Update dependencies
-   (Schmakus) Update translations

### 0.0.6 (2022-12-29)

-   (Schmakus) New: [#61](https://github.com/Schmakus/ioBroker.lightcontrol/issues/61) Added infinite blinking. Please read the documentation.
-   (Schmakus) Fix: some little things.

### 0.0.5 (2022-12-27)

-   (Schmakus) Fix: [#66](https://github.com/Schmakus/ioBroker.lightcontrol/issues/66) Adding more than one lamp to group
-   (Schmakus) Fix: CustomConfig Color definitions
-   (Schmakus) Deleting hole light from group if it contains no states
-   (Schmakus) Updating CreateState Function for extended debugging

### 0.0.4 (2022-12-23)

-   (Schmakus) Fix: Warning by adding motion sensor to group
-   (Schmakus) New: Add Default Values for WarmWhite and DayLight at Color-State
-   (Schmakus) updating translations

### 0.0.3 (2022-12-22)

-   (Schmakus) Fix: Moving sensors and lights to other group
-   (Schmakus) Fix: Adding sensor to groups
-   (Schmakus) Update German Docu

### 0.0.2 (2022-12-20)

-   (Schmakus) first Alpha Release

### 0.0.1 (2022-12-01)

-   (Schmakus) Initial Release

## License

MIT License

Copyright (c) 2023 Schmakus <schmakus@gmail.com>

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