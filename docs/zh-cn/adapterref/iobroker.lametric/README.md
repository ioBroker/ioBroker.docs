---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.lametric?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.lametric?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.lametric?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.lametric?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.lametric?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.lametric/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.lametric.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/lametric-stable.svg
BADGE-Installed: http://iobroker.live/badges/lametric-installed.svg
chapters: {"pages":{"en/adapterref/iobroker.lametric/README.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/README.md"},"en/adapterref/iobroker.lametric/apps.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/apps.md"},"en/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/my-data-diy.md"},"en/adapterref/iobroker.lametric/notifications.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/notifications.md"},"en/adapterref/iobroker.lametric/blockly.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lametric/README.md
title: ioBroker.lametric
hash: byiO25Mnsddj/XIeN8UjJ+MooB/qM+eBrz8jX0M3Sqg=
---
![标识](../../../en/admin/lametric.png)

# IoBroker.lametric
＃＃ 目录
- [应用程序](apps.md)
- [Blockly](blockly.md)
- [我的数据 DIY](my-data-diy.md)
- [通知](notifications.md)

＃＃ 要求
- nodejs 18（或更高版本）
- js-controller 5.0.19 (或更高版本)
- 管理适配器 6.0.0（或更高版本）
- _LaMetric Time_ 固件版本为 _3.1.2_（或更高版本）
- 旧型号（2022 年之前生产）固件 _2.3.9_（或更高版本）

[固件更新日志](https://firmware.lametric.com) [固件更新日志时间2](https://firmware.lametric.com/?product=time2)

＃＃ 配置
1. 将 LaMetric Time 添加到您的本地网络
- LaMetric Time App（2017 年至 2021 年） - [iOS](https://apps.apple.com/de/app/lametric-time/id987445829)、[Google Play 商店](https://play.google.com/store/apps/details?id=com.smartatoms.lametric)
- LaMetric App（2022 至今） - [iOS](https://apps.apple.com/de/app/lametric/id1502981694)、[Google Play Store](https://play.google.com/store/apps/details?id=com.lametric.platform)
2. 从应用程序复制设备 API 密钥（仅限 2022 及更新型号）。旧型号请使用以下网站：

您可以获取您的设备 API 密钥[这里](https://developer.lametric.com/user/devices)。

![API 密钥](../../../en/adapterref/iobroker.lametric/img/api-key.png)

＃＃ 特征
- 设置显示亮度（百分比，自动模式/手动模式）
- 设置音量（百分比）
- 配置屏幕保护程序（启用/禁用、基于时间、黑暗时）
- 激活/停用蓝牙并更改蓝牙名称
- 在应用程序之间切换（下一个、上一个、转到特定应用程序）
- 使用 blockly 发送通知（具有可配置的优先级、声音、图标、文本等）
- 控制特殊应用程序，如“时钟”、“收音机”、“秒表”或“天气”
- 使用“我的数据（DIY）”LaMetric 应用程序显示持久信息

功能受到[官方 API 功能](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/lametric-time-reference.html)的限制。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.4.0 (2024-09-06)

* (@klein0r) Updated LaMetric firmware version recommendation to 2.3.9 (3.1.2)
* (@klein0r) Added support for notification manager
* (@klein0r) Added validator for icon inputs
* (@klein0r) Fixed some missing translations

### 3.3.0 (2024-08-05)

* (@klein0r) Added api version as state (and check value)

### 3.2.3 (2024-07-21)

* (@klein0r) Fixed blockly definitions

### 3.2.2 (2024-07-13)

* (@klein0r) Updated LaMetric firmware version recommendation to 2.3.9 (3.1.1)

### 3.2.1 (2024-06-12)

* (@klein0r) Updated LaMetric firmware version recommendation to 2.3.8 (3.1.0)
* (@klein0r) Updated dependencies

## License

The MIT License (MIT)

Copyright (c) 2024 Matthias Kleine <info@haus-automatisierung.com>

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