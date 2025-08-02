---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vofo-speedtest/README.md
title: ioBroker.vofo-速度测试
hash: 4PcZ3CeCQZ9Qx74X33H7TCPTDyHpFmQfaMyR6GSextM=
---
![标识](../../../en/adapterref/iobroker.vofo-speedtest/admin/vofo-speedtest.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.vofo-speedtest)
![下载](https://img.shields.io/npm/dm/iobroker.vofo-speedtest.svg)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.vofo-speedtestd)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.vofo-speedtest)
![GitHub 自最新版本以来的提交情况（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.vofo-speedtest/latest)
![GitHub 上次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.vofo-speedtest)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.vofo-speedtest)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vofo-speedtest.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/vofo-speedtest-stable.svg)
![安装数量](https://iobroker.live/badges/vofo-speedtest-installed.svg)

# IoBroker.vofo-速度测试
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/vofo-speedtest/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **版本：** </br> </br> **测试：** </br> [![测试与发布]（https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/actions/workflows/test-and-release.yml/badge.svg）](https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/actions/workflows/test-and-release.yml) [![CodeQL]（https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/actions/workflows/github-code-scanning/codeql/badge.svg）](https://github.com/iobroker-community-adapters/ioBroker.vofo-speedtest/actions/workflows/github-code-scanning/codeql)

## 适用于 ioBroker 的 vofo-speedtest 适配器
Vodafone.de 的速度测试

实现的技术与 https://speedtest.vodafone.de 相同

## 致谢
如果没有 Peter Baumert <ioBroker.unifi-protect@outlook.com> 的出色工作，这个适配器就不可能实现，他实现了这个适配器的初始版本。

## 免责声明
Vodafone 是 Vodafone GmbH 的商标。我与 Vodafone GmbH 或其任何关联子公司、徽标或商标没有任何关联或认可

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2024-03-29)
* (mcm1957) BREAKING: Adapter requires node.js 18, js-controller >= 5 and admin >= 6 now
* (mcm1957) Adapter has been moved to iobroker-community-adapters organisation
* (mcm1957) Metrialize admin UI has been removed as jsonConfig is available
* (mcm1957) Dependencies have been updated

### 1.0.1 (2023-09-13)
* (bluefox) Updated packages and refactored code

### 1.0.0 (2023-09-13)
* (bluefox) Updated packages and refactored code

### 0.0.13 (2022-06-06)
* some more "already running" fixes

### 0.0.12 (2022-05-28)
* re-release for 0.0.11 because of a missing version in io-package.json

### 0.0.11 (2022-05-27)
* updating dependencies
* adding some timeouts trying to fix "already running with pid"
* fix extracting API key from js-code (thanks Zwer2k) [#112][pr112]

### 0.0.10 (2022-01-07)
* Fix version numbers

### 0.0.9 (2022-01-03)
* Fix to work with new Vodafone Endpoint

### 0.0.8 (2021-07-01)
* Renamed Adapter due to legal reasons
* Fixed some dependencies

### 0.0.7 (2021-05-21)
* Fixed some vulnerabilities in dev-dependencies
* Fixed js-controller 3* issues
* Fixed node 16 compatability

### 0.0.6 (2021-01-21)
* Added Sentry.io Integration

### 0.0.5 (2020-05-26)
* Added ping results
* Added calculated values by actual raw data

### 0.0.4 (2020-04-30)
* Changed Adapter start type to scheduled (re-installation might be needed)
* Bug fixes and feedback implementation

### 0.0.3 (2020-04-24)
* Implemented feedback from Forum and GitHub issue

### 0.0.2 (2020-04-19)
* Added actual settings in Admin interface
* first version ready for testing

### 0.0.1 (2020-04-18)
* (Peter Baumert) initial release

## License
MIT License

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2020-2023 Peter Baumert

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