---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hydrawise/README.md
title: ioBroker.Hydrawise
hash: AJvlcGfJ5pFFewhbPFRr+t7Qj/UIS1/pv0MCsQN8/cQ=
---
![标识](../../../en/adapterref/iobroker.hydrawise/admin/hydrawise.jpg)

![NPM版本](https://img.shields.io/npm/v/iobroker.hydrawise.svg?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.hydrawise.svg?label=npm%20downloads&style=flat-square)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.hydrawise?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.hydrawise?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/sentiq/iobroker.hydrawise?style=flat-square)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub 工作流程状态](https://img.shields.io/github/actions/workflow/status/sentiq/iobroker.hydrawise/test-and-release.yml?branch=master&logo=github&style=flat-square)
![贝塔](https://img.shields.io/npm/v/iobroker.hydrawise.svg?color=red&label=beta)
![稳定的](http://iobroker.live/badges/hydrawise-stable.svg)
![已安装](http://iobroker.live/badges/hydrawise-installed.svg)

# IoBroker.Hydrawise
## 版本
将您的 Hydrawise 控制器集成到 iobroker 中。
您可以查看所有控制器信息、时间表和传感器。也可以将计划的浇水暂停 x 秒。

## 文档
- 登录 https://app.Hydrawise.com/config/account-details
- 通过点击“账户设置”下的“生成 API 密钥”来生成 API 密钥
- 将密钥粘贴到适配器设置中
- API 文档：https://support.Hydrawise.com/hc/en-us/articles/360008965753-Hydrawise-API-Information

> **注意** > 从 0.0.15 更新后，您必须重新输入您的 API 密钥

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.2 (2023-08-22)

-   (SentiQ) added link to api docu

### 0.1.1 (2023-08-22)

-   (SentiQ) fixed random crash, when api domain can't be resolved by dns
-   (SentiQ) added time string of last api call

### 0.0.19 (2023-08-05)

-   (SentiQ) fixed button roles

### 0.0.18 (2023-08-05)

-   (SentiQ) fixed timeout

### 0.0.17 (2023-08-03)

-   (SentiQ) fixed adapter crash

### 0.0.16 (2023-08-02)

-   (SentiQ) added more information to README
-   (SentiQ) encrypted apiKey
-   (SentiQ) removed logging of apiKey
-   (SentiQ) added filtering of invalid characters in ids
-   (SentiQ) added check of ack flag
-   (SentiQ) fixed roles
-   (SentiQ) fixed error message
-   (SentiQ) removed usage of clearTimeout

### 0.0.15 (2023-06-29)

-   (SentiQ) updated dependencies

### 0.0.14 (2023-06-29)

-   (SentiQ) fixing version

### 0.0.12 (2023-06-29)

-   (SentiQ) changed value of `last_contact` to date string format

### 0.0.11 (2023-06-28)

-   (SentiQ) raised timeouts
-   (SentiQ) fixed types

### 0.0.10 (2023-06-27)

-   (SentiQ) fixed adapter crash
-   (SentiQ) changed value of `timestr` to date string format

### 0.0.9 (2023-05-25)

-   (SentiQ) added more translations

### 0.0.8 (2023-05-25)

-   (SentiQ) improved log messages

### 0.0.7 (2023-05-25)

-   (SentiQ) fixed author

### 0.0.6 (2023-05-24)

-   (SentiQ) lowered min node version to 14.5.0

### 0.0.5 (2023-05-24)

-   (SentiQ) updated packages

### 0.0.4 (2023-05-24)

-   (SentiQ) testing

### 0.0.3 (2023-05-24)

-   (SentiQ) added zone controls and Ukrainian language

### 0.0.2 (2023-05-23)

-   (SentiQ) refactoring code

### 0.0.1 (2023-01-26)

-   (aDabbelju) Initial commit by adapter creator

## License

MIT License

Copyright (c) 2023 SentiQ <fischer.yves@web.de>

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