---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: EGNcl5i02TKA3DFfoJ3/aUVhdsdIU2m4DJMliS/Sq/k=
---
![标识](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.homeconnect)
![下载](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.homeconnect)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.homeconnect)
![GitHub 自最新版本以来的提交情况（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.homeconnect/latest)
![GitHub 上次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.homeconnect)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.homeconnect)
![NPM 版本](http://img.shields.io/npm/v/iobroker.homeconnect.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/homeconnect-stable.svg)
![安装数量](https://iobroker.live/badges/homeconnect-installed.svg)

# IoBroker.homeconnect
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/homeconnect/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **版本：** </br> </br> **测试：** </br> [![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml) [![CodeQL]（https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/codeql.yml/badge.svg）](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/codeql.yml)

哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## IoBroker 的 Homeconnect 适配器
## 安装前的要求
- 节点 20、22 或 24
-JS 控制器 >= 6.0.11
- 管理员 >= 7.4.10

适配器需要 ClientID。请使用每个步骤的设置进行注册。

<https://developer.home-connect.com>

![截屏](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

对于**用于测试的默认 Home Connect 用户帐户**，请指定用于发送 Home Connect 应用程序的电子邮件地址。
已注册，这在后续授权过程中也是必需的。

![截屏](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

在“账户类型”中选择“个人”。如有剩余数据，请添加（不知道是否会被勾选）。

![截屏](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

然后转到**应用程序**，然后转到**注册应用程序**。

![截屏](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

在“应用程序 ID”中输入应用程序名称，例如 ioBroker。在“OAuth 流程”中选择“设备流程”。
“Home Connect 测试用户帐户”可以留空。在“成功重定向”中输入 URI，例如 https://example.com。
保存后，您便获得了所需的客户端 ID。

＃＃ 配置
请将 Homeconnect App 用户名、密码和生成的 cleintId 添加到适配器配置中。

＃＃ 描述
🇬🇧[描述](/docs/en/README.md)🇩🇪[描述](/docs/de/README.md)

＃＃ 问题
🇩🇪 [弗拉根](https://forum.iobroker.net/topic/16446/test-adapter-homeconnect-bsh-home-connect-v0-0-x?_=1749842644389)

＃＃ 用法
使用命令中的状态，您可以停止、暂停和恢复程序。
使用设置中的状态，您可以关闭或打开设备。更改 programs.active.BSH_Common_Root_ActiveProgram 的值将启动程序。更新 iQ300：您需要在此变量中设置程序名称。如果复制了 programs.selected.BSH_Common_Root_SelectedProgram，机器用户可以在机器上预定义所需的程序，并通过 ioBroker 启动。更改 programs.selected.BSH_Common_Root_SelectedProgram 的值将选择程序或选项。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (Lucky-ESA) Clean up state roles and code
- (Lucky-ESA) Dependencies updated
- (Lucky-ESA) Added language selection
- (Lucky-ESA) Migrated to ESLint 9
- (Lucky-ESA) Adapter requires js-controller >= 6.0.11 now
- (Lucky-ESA) Adapter requires admin >= 7.4.10 now
- (mcm1957) Adapter requires node.js >= 20 now

### 1.4.3 (2024-11-19)

- (TA2k) fix for -001 devices
- (simatec) Adapter has been adapted to meet Responsive Design rules.

### 1.4.2 (2024-10-25)

- (TA2k) fix for devices with object values

### 1.4.1 (2024-07-02)

- (foxriver76) fixed invalid min/max values

### 1.4.0 (2024-04-18)

- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 1.3.0 (2023-12-15)

- fix login

## License

The MIT License (MIT)

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2023 dna909 <dna909@googlemail.com>, TA2k

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