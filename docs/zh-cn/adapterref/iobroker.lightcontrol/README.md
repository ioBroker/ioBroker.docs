---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lightcontrol/README.md
title: ioBroker.lightcontrol
hash: m3NWqQj1pYY8F65fMOr+iFCErlFj3TL6bgzpWhoQFJI=
---
![标识](../../../en/adapterref/iobroker.lightcontrol/admin/lightcontrol.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.lightcontrol.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lightcontrol.svg)
![节点](https://img.shields.io/node/v-lts/iobroker.lightcontrol?style=flat-square)
![GitHub](https://img.shields.io/github/license/schmakus/iobroker.lightcontrol?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub 上次提交](https://img.shields.io/github/last-commit/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![新平台](https://nodei.co/npm/iobroker.lightcontrol.png?downloads=true)
![测试版](https://img.shields.io/npm/v/iobroker.lightcontrol.svg?color=red&label=beta)
![稳定的](http://iobroker.live/badges/lightcontrol-stable.svg)
![已安装](http://iobroker.live/badges/lightcontrol-installed.svg)
![Paypal 捐款](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)

# IoBroker.lightcontrol
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/lightcontrol/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

![测试与发布](https://github.com/Schmakus/ioBroker.lightcontrol/workflows/Test%20and%20Release/badge.svg)

## 版本
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## 如果你喜欢我的作品：
＃＃ 安装
请使用 ioBroker 中的“适配器列表”和稳定存储库安装此适配器的某个版本。您也可以使用 CLI 安装此适配器：

```
iobroker add lightcontrol
```

## 文档
[🇺🇸 文档](https://github.com/Schmakus/ioBroker.lightcontrol/blob/2dc2cb6784338c4e13758f4a7d3e4b16578d8db2/docs/en/lightcontrol.md)

[🇩🇪 文档](https://github.com/Schmakus/ioBroker.lightcontrol/blob/2dc2cb6784338c4e13758f4a7d3e4b16578d8db2/docs/de/lightcontrol.md)

待办事项
- 为一个 Object-ID 选择多个 LightGroup（jsonCustom 选择多个存在错误）
- 可在自动关闭前以较低的亮度和定义的秒数发出通知

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

-   (Schmakus) fix responsive issues

### 2.0.0 (2025-03-06)

-   (Schmakus) update dependencies
-   (Schmakus) Admin 7.4.10 required
-   (Schmakus) Node 20 required
-   (Schmakus) fix responive issues

### 1.0.1 (2024-09-02)

-   (Schmakus) update dependencies

### 1.0.0 (2024-09-02)

-   (Schmakus) update dependencies

### 0.8.0 (2024-08-16)

-   (Schmakus) Adapter requires node.js >= 18 and Admin >=6 now
-   (Schmakus) Dependencies have been updated
-   (Schmakus) Fixed repo checker issues

### 0.7.0 (2024-07-02)

-   (Schmakus) Dependencies have been updated

## License

MIT License

Copyright (c) 2025 Schmakus <schmakus@gmail.com>

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