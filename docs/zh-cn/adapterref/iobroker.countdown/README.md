---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.countdown/README.md
title: ioBroker.倒计时
hash: Mshzbk4TQhCKT93kVH8aGuM+N/0LseiLQ95SkaHMHck=
---
![标识](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![绿地管理员徽章](https://snyk.io/test/github/jack-blackson/ioBroker.countdown/badge.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.countdown.svg)
![下载](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![安装数量](http://iobroker.live/badges/countdown-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# IoBroker.倒计时
[![构建状态 Travis](https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/countdown/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

ioBroker 倒计时适配器 ------------------------------------------------------------------------------

该适配器的目标是为您提供对未来事件进行倒计时的功能，包括年、月、日、小时和分钟。它将分别提供每个值，以及两个字符串，分别包含短日期和长日期。

如何使用
[英文描述](docs/en/countdown.md) [德意志通讯社](docs/de/countdown.md)

## 要添加的功能
* 可以添加脚本作为参数并在倒计时结束时启动它
* 可以在 addminutes 和其他加法函数中使用加号和减号

## 致谢
如果没有@jack-blackson (https://github.com/jack-blackson) 的出色工作，这个适配器是不可能实现的，他创建了此适配器的 V3.x.x 之前的版本。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**0
-->
### 3.0.0 (2025-06-05)
* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation.
* (mcm1957) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.4.10 now.
* (mcm1957) @iobroker/eslint-config has been added and linter error have been fixed.
* (mcm1957) Dependencies have been updated.

### 2.3.0 (2024-09-20) 
* (jack-blackson) Compatibility for js-controller 7
* (jack-blackson/bagsik) Added new object fullJSON with all objects included - thanks to bagsik who had the idea and created the code!

### 2.2.1 (2024-09-14) 
* (jack-blackson) Additional check to avoid not allowed signs in countdown name
* (jack-blackson) Updated dependencies
* (jack-blackson) Small adjustments in package files

### 2.2.0 (2023-08-25) 
* (jack-blackson) Added ability to maintain, adjust and delete countdowns in adapter settings
* (jack-blackson) Bugfix with incorrect spaces as first character in "in words long" and "in words short"
* (jack-blackson) Bugfix incorrect calculation totalYears
* (bagsik) added "totalJSON" object in each countdown

### 2.1.0 (2023-07-22) 
* (jack-blackson) Ability to use the countdown "backwards" - e.g. for calculating age of a baby
* (jack-blackson) Adjustments for "in words" -> fixed year/years and adjusted which detail level is shown at which point of time

## License
The MIT License (MIT)

Copyright (c) 2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2019-2024 jack-blackson <blacksonj7@gmail.com>

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