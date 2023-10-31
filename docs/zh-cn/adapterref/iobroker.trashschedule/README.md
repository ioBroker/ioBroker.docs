---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.trashschedule?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.trashschedule?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.trashschedule?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.trashschedule?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.trashschedule?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.trashschedule/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.trashschedule.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/trashschedule-stable.svg
BADGE-Installed: http://iobroker.live/badges/trashschedule-installed.svg
chapters: {"pages":{"en/adapterref/iobroker.trashschedule/README.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/README.md"},"en/adapterref/iobroker.trashschedule/blockly.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/blockly.md"},"en/adapterref/iobroker.trashschedule/faq.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/faq.md"},"en/adapterref/iobroker.trashschedule/javascript.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/javascript.md"}}}
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.trashschedule/README.md
title: ioBroker.trashschedule
hash: sfrtJ2NXHAZN0t3qfiJRvjKFJI6/1RxBECdMdGaVTsU=
---
![标识](../../../en/admin/trashschedule.png)

# IoBroker.trashschedule
＃＃ 目录
- [Blockly](blockly.md)
- [JavaScript](javascript.md)
- [常见问题解答](faq.md)

＃＃ 要求
1.nodejs 16.0（或更高版本）
2.js-controller 4.0.15（或更高版本）
3. iCal 适配器 1.12.1（或更高版本）
4.管理适配器6.0.0（或更高版本）

## 前提条件
1. 创建[ical适配器]的新实例(https://github.com/iobroker-community-adapters/ioBroker.ical)
2. 配置日历的 URL（例如 google 日历）
3. 将“预览天数”设置为包含每种垃圾类型至少两次的范围（例如 45 天）
4. 如果您使用“事件”选项卡，请确保为每个事件类型启用“显示”复选框，该复选框也应在垃圾计划中使用（否则该事件将被 ical 实例隐藏）

![钙](../../../en/adapterref/iobroker.trashschedule/img/ical.png)

＃＃ 配置
1. 创建一个 ```trashschedule``` 实例并选择 ical 实例作为源
2. 转到垃圾类型选项卡并添加与垃圾类型一样多的类型
3. 为每个新垃圾类型定义名称并配置匹配事件
4.启动实例

**有问题吗？** 检查[常问问题](./faq.md)

![垃圾时间表](../../../en/adapterref/iobroker.trashschedule/img/trashschedule.png)

![垃圾计划类型](../../../en/adapterref/iobroker.trashschedule/img/trashschedule_types.png)

## VIS 小部件（VIS 版本 1.x）
![视觉小部件](../../../en/adapterref/iobroker.trashschedule/img/vis.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.3.0 (2023-10-25)

NodeJS 16.x is required

* (klein0r) Improved log messages
* (klein0r) Added icons in admin tabs

### 2.2.0 (2023-01-16)

* (klein0r) Added completed flag for types

### 2.1.1 (2023-01-11)

* (klein0r) Added Ukrainian language

### 2.1.0 (2022-12-12)

* (klein0r) Dropped Admin 5 support
* (klein0r) Added Ukrainian language

### 2.0.3 (2022-06-02)

* (klein0r) Allow whitespaces in the match pattern

## License

MIT License

Copyright (c) 2023 Matthias Kleine <info@haus-automatisierung.com>

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