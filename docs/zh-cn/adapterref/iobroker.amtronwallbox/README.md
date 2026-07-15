---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.amtronwallbox/README.md
title: ioBroker.amtronwallbox
hash: OtfRBmI1ATOdGfHZjkf+WDMsBy/AgNxeaayNiVF4itY=
---
![标识](../../../en/adapterref/iobroker.amtronwallbox/admin/amtronwallbox.png)

![安装数量](http://iobroker.live/badges/amtronwallbox-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.amtronwallbox.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.amtronwallbox.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.amtronwallbox/badge.svg)
![NPM](https://nodei.co/npm/iobroker.amtronwallbox.png?downloads=true)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.amtronwallbox?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.amtronwallbox?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.amtronwallbox?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.amtronwallbox?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.amtronwallbox?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.amtronwallbox?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/rg-engineering/ioBroker.amtronwallbox?logo=github&style=flat-square)

# IoBroker.amtronwallbox
![GitHub Actions](https://github.com/rg-engineering/ioBroker.amtronwallbox/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

如果您喜欢，请考虑捐赠：

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

该适配器作为各种 [Amtron墙装式插座](https://www.mennekes.de/emobility/produkte/amtron-wallboxen/) 的接口。适配器读取充电盒提供的数据，并将其作为数据点提供给适配器。

数据仅在本地处理，无需云连接。对于支持写入权限的壁挂式充电盒，适配器可以写入数据（例如充电电流）。

支持以下 Amtron 壁挂式充电盒：

* Amtron Xtra
* Amtron充电控制器
* Amtron Compact

该适配器可以管理多个设备。

如果您拥有的壁挂式电视盒尚未获得支持，请联系开发者。

＃＃ 配置
只需要配置盒子类型、IP 地址，以及（如有必要）API 密钥。

![配置](../../../en/adapterref/iobroker.amtronwallbox/admin/docs/Amtron_Config.PNG)

注意：由于不同设备的接口各不相同，可能并非所有接口都能直接使用。如果遇到这种情况，请联系开发者。

已知问题
如果您发现错误或希望添加新功能，请在 [github](https://github.com/rg-engineering/ioBroker.amtronwallbox/issues) 创建问题。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.3.6 (2026-03-15)
* (René) update dependencies + changes based on adapter checker

### 0.3.5 (2025-10-26)
* (René) bug fix sentry

### 0.3.4 (2025-10-21)
* (René) update dependencies + changes based on adapter checker

### 0.3.3 (2025-10-04)
* (René) update dependencies + changes based on adapter checker

### 0.3.2 (2025-06-28)
* (René) update dependencies
* (René) new testing

### 0.3.1 (2025-02-27)
* (René) changes requested by adapter checker
* (René) dependencies updated

### 0.3.0 (2024-12-17)
* (René) see issue #284: test with nodejs@22
* (René) update dependencies
* (René) migration to jsonConfig

### 0.2.16 (2024-08-24)
* (René) update dependencies
* (René) bug fixes based on adapter checker recommendation

### 0.2.15 (2024-05-28)
* (René) change of dependencies
* (René) show cron job in log after creation

### 0.2.14 (2024-01-12)
* (René) dependencies updated

### 0.2.13 (2023-12-23)
* (René) just a sentry test

### 0.2.12 (2023-12-23)
* (René) see issue #162: ignore unused data from wallbox

### 0.2.11 (2023-12-16)
* (René) type of adapter changed back to "energy"

### 0.2.9 (2023-12-16)
* (René) dependencies updated

### 0.2.8 (2023-11-26)
* (René) role of states overworked

### 0.2.7 (2023-11-19)
* (René) dependencies updated

### 0.2.6 (2023-09-23)
* (René) bug fix for reported exceptions by sentry

### 0.2.5 (2023-08-27)
* (René) smaller bug fixes, see issue #59

### 0.2.4 (2023-07-30)
* (René) dependencies updated

### 0.2.3 (2023-06-01)
* (René) some changes to fullfill requirements to bring the adapter to latest

### 0.2.2 (2023-04-07)
* (René) dependencies updated

### 0.2.0 (2023-01-31)
* (René) see issue #1: write data to XTRA wallbox (experimentel)

### 0.1.0 (2022-12-18)
* (René) see issue #1: support of XTRA

### 0.0.3 (2022-08-18)
* (René) some bug fixes
* (René) change to cron
* (René) update of dependencies

### 0.0.1 (2022-05-19)
* (René) initial release

## License
MIT License

Copyright (c) 2022-2026 René G. <info@rg-engineering.eu>

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