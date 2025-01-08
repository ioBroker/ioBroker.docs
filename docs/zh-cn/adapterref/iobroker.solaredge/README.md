---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solaredge/README.md
title: ioBroker.solaredge
hash: Uv/BNDX4bW4701AQMXPQLGoV5zYgoXQHED+G7shQuY0=
---
![标识](../../../en/adapterref/iobroker.solaredge/admin/solaredge.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.solaredge)
![下载](https://img.shields.io/npm/dm/iobroker.solaredge.svg)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.solaredge)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.solaredge)
![GitHub 自最新版本以来的提交情况（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.solaredge/latest)
![GitHub 上次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.solaredge)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.solaredge)
![NPM 版本](http://img.shields.io/npm/v/iobroker.solaredge.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/solaredge-stable.svg)
![安装数量](https://iobroker.live/badges/solaredge-installed.svg)

# IoBroker.solaredge
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/solaredge/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **版本：** </br> </br> **测试：** </br> [![测试与发布]（https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml/badge.svg）](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml) [![CodeQL]（https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml/badge.svg）](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml)

<!--

## Sentry **此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。
-->
## 适用于 ioBroker 的 Solaredge 适配器
从 solaredge 监控门户获取数据。
目前，仅使用 /overview 数据点来获取当前功率和日/月/年/终身能量读数。

如果您的 solaredge 设备较新，您还可以在其上启用 modbus 并直接读取数据。

您需要您的站点 ID 和 API 密钥才能使用此适配器。要获取这些，请访问 https://monitoring.solaredge.com

- 站点id：登录，站点id就是右边的“ID”，例如12345。
- api 密钥：登录，转到管理员设置并在那里启用 api 访问。如果您没有看到管理员设置，请发送邮件至 solaredge 为您的帐户启用管理员。

## 致谢
如果没有@92lleo (https://github.com/92lleo) 的出色工作，这个适配器就不可能实现，他编写了初始版本的代码并将其发布到 ioborker-community-adapters。

<!--

### **正在进行中** -->

## Changelog
### 1.4.1 (2024-04-28)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.3.0 (2024-02-15)
* (mcm1957) BREAKING: adapter requires node.js 18 or newer now.
* (mcm1957) Adapter translations have been linked to weblate.
* (mcm1957) Dependencies have been updated.

### 1.2.2 (2023-12-14)
* (bluefox) Added random seconds to the schedule
* (bluefox) Updated packages
* (bluefox) Allowed adapter execution by restart

### 1.2.0 (2023-12-06)
* (mcm1957) Adapter did not terminate in case of an exception. This has been fixed.
* (mcm1957) A response timeout has been added to network calls.
* (mcm1957) Adapter has been moved to iobroker-community-adapters organization
* (mcm1957) Dependencies have been updated

### 1.1.0 (2023-11-16)
* (bluefox) Added the current power flow data

### 1.0.1 (2023-08-18)
* (bluefox) Added JSON config and replaced `require` module with `axios`

### 0.3.0
* (Apollon77) Address review feedback from adapter review (see #19)

### 0.2.0
* (92lleo) Add default values for native config vars
* (92lleo) Set schedule to 15s to match api update rate
* (92lleo) Fix updating already created states (broken since new js-controller, see #9)
* (92lleo) Update dependencies
* (92lleo) Clear timer on unload
* (92lleo) Add a connection type and dataSource

### 0.1.1
* (92lleo) fix "object data is invalid" issue, now works with new js-controller
* (92lleo) update dependencies

### 0.1.0
* (92lleo) first beta release. overview data from inteverters are available

### 0.0.1
* (92lleo) initial release

## License
MIT License

Copyright (c) 2023-2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2019-2023 Leonhard Kuenzler <leonhard@kuenzler.io>

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