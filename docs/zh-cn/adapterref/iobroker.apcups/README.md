---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.apcups/README.md
title: ioBroker.apcups
hash: FM26q1o/yfLjfIRKYni4eBA4ezWrIXiLWFHtxRiXLRI=
---
![标识](../../../en/adapterref/iobroker.apcups/admin/ups.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.apcups.svg)
![下载](https://img.shields.io/npm/dm/iobroker.apcups.svg)
![安装数量（最新）](https://iobroker.live/badges/apcups-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/apcups-stable.svg)
![新平台](https://nodei.co/npm/iobroker.apcups.png?downloads=true)

# IoBroker.apcups
**测试：**[![测试与发布]（https://github.com/xhunter74/ioBroker.apcups/actions/workflows/test-and-release.yml/badge.svg）](https://github.com/xhunter74/ioBroker.apcups/actions/workflows/test-and-release.yml)

## 用于 ioBroker 的 Apc UPS 适配器
ioBroker 适配器通过 apcupsd 从 APS UPS 获取信息。

apcupsd 主页：http://www.apcupsd.org/

apcupsd 是用于控制 APC UPS 的守护进程。使用此适配器，您可以监控 UPS 状态并根据提供的信息做出一些决定。

**在 Ubuntu 上安装 apcupsd：**

sudo apt-get -y 安装 apcupsd

您可以在 https://help.ubuntu.com/community/apcupsd 上找到有关 Ubuntu 的 apcupsd 配置的更多有用信息

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## Changelog
### 4.0.0 (2024-05-10)
 - BREAKING! 
1. Added support of multiple UPS so states structure was changed. All existed states will be deleted. Please do backup before upgrade the adapter! Also existed configuration will be lost. Please re-configure the adapter and add one or more devices to it.
2. Minimal js-controller version is 5.0.19
3. Minimal admin version is 6.13.16
### 3.0.1 (2024-04-25)
 - Update dependencies
### 3.0.0 (2024-04-22)
 - BREAKING! Changed the minimal version of nodejs to 18, js-controller to 4.0.0
### 2.0.0 (2024-02-17)
 - BREAKING! Changed the minimal version of nodejs to 16 
### 1.0.15 (2023-04-25)
 - Changed approach how to states are creating
### 1.0.13 (2023-04-24)
 - Added 'END APC' and 'BATDATE' fields 
### 1.0.10 (2022-12-22)
 - Added Ukrainian language
### 1.0.9 (2022-12-12)
 - Optimized reconnection flow
### 1.0.8 (2022-11-16)
 - Added validation on config screen
### 1.0.7 (2022-11-14)
 - Added validation on config screen

## License
MIT License

Copyright (c) 2024 Serhiy Krasovskyy xhunter74@gmail.com"

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