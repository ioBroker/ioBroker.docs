---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.envertech-pv/README.md
title: ioBroker.envertech-pv
hash: Vq7iar6NNmmjOdsLJp1/JylkdRzeQf6X9aAzZplySno=
---
![标识](../../../en/adapterref/iobroker.envertech-pv/admin/envertech-pv.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.envertech-pv)
![下载](https://img.shields.io/npm/dm/iobroker.envertech-pv.svg)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.envertech-pv)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.envertech-pv)
![GitHub 自最新版本以来的提交情况（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.envertech-pv/latest)
![GitHub 上次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.envertech-pv)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.envertech-pv)
![NPM 版本](http://img.shields.io/npm/v/iobroker.envertech-pv.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/envertech-pv-stable.svg)
![安装数量](https://iobroker.live/badges/envertech-pv-installed.svg)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.envertech-pv
**一般信息：**<br> [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/envertech-pv/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br></br> **版本：**</br></br> **测试：**</br> [![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/test-and-release.yml) [![CodeQL]（https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/codeql.yml/badge.svg）](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/codeql.yml)<br> **捐款：**</br>

**************************************************************************************************************

## Sentry **此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。
**************************************************************************************************************

## Envertech-pv ioBroker 适配器
ioBroker.envertech-pv 适配器使您能够轻松访问和收集来自[恩沃云服务](www.envertecportal.com)的数据。通过定期轮询 Web 服务，此适配器可确保所有有价值的信息都能被及时检索并存储在易于访问的状态中。

**************************************************************************************************************

## 免责声明
**所有产品和公司名称或标识均为其各自所有者的商标™或注册商标®。使用它们并不意味着与它们或其任何关联子公司有任何关联或认可！本个人项目由闲暇时间维护，不用于任何商业目的。** **Envertech®是浙江恩沃科技股份有限公司的注册商标**

**************************************************************************************************************

## 文档
[**英文**文档](docs/en/envertech.md) [**德语**文档](docs/de/envertech.md)

## 致谢
如果没有@adcrafter27（https://github.com/adcrafter27）的出色工作，这个适配器是不可能实现的，他分析并记录了用于访问 envertech 云服务的 REST API。

## 如何报告问题和功能请求
理想情况下，请使用 GitHub Issues 来实现此目的，最佳方法是将适配器设置为“调试”日志模式（实例 -> 专家模式 -> 列日志级别）。然后通过 ioBroker 的“log”子目录从磁盘检索日志文件，**而不是**从管理员处检索，因为管理员处会截断行。如果您不想在 GitHub Issues 中提供日志文件，请给我发送电子邮件 (mcm57@gmx.at)。请引用相关的**GitHub Issue**，提供相应的**描述性注释**，并在适当的情况下添加**日志时间戳**。

**************************************************************************************************************

**如果您喜欢这个适配器，请考虑捐赠：**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.5.0 (2025-08-16)
-   (mcm1957) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.6.17 now.
-   (mcm1957) Dependencies have been updated.

### 1.4.0 (2024-11-14)
-   (mcm1957) Adapter has been changes to meet Responsive Design Rules.
-   (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
-   (mcm1957) Dependencies have been updated.

### 1.3.2 (2024-03-28)
-   (mcm1957) Adapter supports multiple pages returned from Envertech now. This will allow more than 20 inverters per station.
-   (mcm1957) Adapter requires js-controller >= 5 now.
-   (mcm1957) Dependencies have been updated.

### 1.2.0 (2024-03-21)
-   (mcm1957) New states GridPower and LoadPower have been added [#147].
-   (mcm1957) Processing of strIncome has been fixed [#46].
-   (mcm1957) Incorrect description has been corrected [#50].
-   (mcm1957) State roles have been checked and adapter [#75].
-   (mcm1957) Dependencies have been updated.

### 1.1.0 (2023-11-12)
-   (mcm1957) Adapter requires nodejs 18 now.
-   (mcm1957) Incorrect energy units have been corrected. [#113]
-   (mcm1957) New internal information returned by api is no longer reported as unknown. [#110]
-   (mcm1957) Dependencies have been updated.

### 1.0.2 (2023-03-31)

-   (mcm1957) changed: Handling of statuscode '2' has been added (#44).
-   (mcm1957) changed: Unload code has been fixed.
-   (mcm1957) changed: Some translations have been updated.
-   (mcm1957) changed: Dependencies have been updated.

### 1.0.1 (2023-03-23)

-   (mcm1957) NEW: Support to retrieve station-id by username and password has been added.
-   (mcm1957) NEW: Support to check multiple stations within one instance has been added.
-   (mcm1957) changed: Units and roles for states have been reconfigured.
-   (mcm1957) changed: State structure has been changed to support multiple stations (and for future local access).
-   (mcm1957) changed: Userinterface has been migrated to jsonConfig (admin5).
-   (mcm1957) changed: The adapter is running as daemon.
-   (mcm1957) changed: The communication has been changed from deprecated "request" to "axios" package.
-   (mcm1957) changed: The adapter has been moved to iobroker-community-adapters organisation.

### 0.0.8

-   (adcrafter27) add setting for more log output

### 0.0.7

-   (adcrafter27) add more functions

### 0.0.6

-   (adcrafter27) code fix

### 0.0.5

-   (adcrafter27) release

### 0.0.3

-   (adcrafter27) Update new functions

### 0.0.2

-   (adcrafter27) First test release

### 0.0.1

-   (adcrafter27) initial release

## License

MIT License

Copyright (c) 2023-2025 mcm1957 <mcm57@gmx.at>, adcrafter27 <adcrafter27@gmail.com>

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