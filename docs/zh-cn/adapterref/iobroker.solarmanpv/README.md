---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarmanpv/README.md
title: ioBroker.solarmanpv
hash: QEmnX/veJh16zAHkvrteP/h5/cifw+VnHqwPi9K30i0=
---
![标识](../../../en/adapterref/iobroker.solarmanpv/admin/solarmanpv.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.solarmanpv.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solarmanpv.svg)
![安装数量](https://iobroker.live/badges/solarmanpv-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/solarmanpv-stable.svg)
![依赖状态](https://img.shields.io/david/raschy/iobroker.solarmanpv.svg)
![NPM](https://nodei.co/npm/iobroker.solarmanpv.png?downloads=true)

# IoBroker.solarmanpv
**测试：** ![测试与发布](https://github.com/raschy/ioBroker.solarmanpv/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 solarmanpv 适配器
从阳台发电厂读取数据

＃＃＃ 入门
此适配器用于在ioBroker中显示阳台发电系统的数据，该系统由“Bosswerk MI600”逆变器提供。该逆变器与Deye系列的其他逆变器兼容。

我假设目前该工厂是由“Solarman”应用程序监控的。

该适配器从云端获取数据。

首先，您需要联系 Solarman 技术支持（service@solarmanpv.com）申请所需的凭证（app_id 和 app_secret）。

之后，您可能会收到类似这样的问题：“请问您使用的是哪个平台？您的角色是什么？您是个人用户、运维服务商、制造商还是分销商？能否提供您的邮箱地址以便我申请 API？”。就我而言，之后他们又问了另一个问题：“您申请 API 的目的是什么？”。我礼貌地回答了这个问题，并在第二天收到了所需的数据。

在管理页面上，这 4 个字段必须与描述相符。

此适配器创建为“计划”适配器。

由于云端数据大约每 6 分钟更新一次，因此无需更频繁地启动适配器。

自 0.3.0 版本起，与之前的版本不同，新增了黑名单功能。这意味着 API 提供的所有值都会被读取，用户可以通过黑名单过滤掉不需要的值。相应的数据点可以被删除，从而更清晰地显示对象数量。

自 2023 年 4 月 16 日起，Solarman 已切换至新平台——0.4.0 版本。

API 的进一步适配（如有）未进行任何修改。

在 0.5.2 到 0.6.x 版本中，只进行了开发人员调整。

在 0.7.0 版本中，node-js 版本已升级至推荐的 20.x 版本，并且 js-controller 版本 >6 成为必备条件。邮箱地址和 app-secret 已加密。因此，更新后必须重新输入这两个值！

在 0.7.1 版本中，实例视图仅进行了细微调整。

诸如“activeToken”之类的潜在敏感数据应该加密，但目前的加密方式并不稳定。因此，在0.7.3版本中，我们撤销了这一做法。

＃＃ 兼容性
- 已使用 Node.js 22 进行测试
- 已使用 js-controller 7 进行测试
- 错误输入的现有 ioBroker 状态会在下次适配器运行时自动修复
无需手动删除现有对象

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- Fix dynamic state type handling
- Automatically repair incorrect ioBroker state types
- Improved compatibility with js-controller 7
- Better handling of string based Solarman values

### 0.7.4 (2026-05-29)

- (raschy) Bump axios from 1.13.6 to 1.16.1
- (raschy) Removed the unused 'paket' module
- (raschy) NodeJS >= 22.x is required

### 0.7.3 (2025-11-04)

- (raschy) Bump axios from 1.12.2 to 1.13.1
- (raschy) Token encryption revoked
- (raschy) Dependencies updated according to Dependabot on November 24

### 0.7.2 (2025-10-01)

- (raschy) Bump axios from 1.11.0 to 1.12.2

### 0.7.1 (2025-04-25)

- (raschy) jsonConfig customized

### 0.7.0 (2025-04-23)

- (raschy) NodeJS >= 20.x and js-controller >= 6 is required
- (raschy) email and appsecret is now encrypted, please re-enter!

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2022-2026 raschy <raschy@gmx.de>

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