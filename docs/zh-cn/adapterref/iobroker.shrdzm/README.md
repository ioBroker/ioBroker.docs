---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shrdzm/README.md
title: ioBroker.shrdzm
hash: l+9nKDVCDAgPwp6Es7/uxGbZ1qDsHJ+bzgJNB4u824k=
---
![标识](../../../en/adapterref/iobroker.shrdzm/admin/shrdzm.png)

![GitHub 许可证](https://img.shields.io/github/license/mcm4iob/ioBroker.shrdzm)
![下载](https://img.shields.io/npm/dm/iobroker.shrdzm.svg)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/mcm4iob/ioBroker.shrdzm)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/mcm4iob/ioBroker.shrdzm)
![GitHub 自最新版本以来的提交情况（按日期）](https://img.shields.io/github/commits-since/mcm4iob/ioBroker.shrdzm/latest)
![GitHub 上次提交](https://img.shields.io/github/last-commit/mcm4iob/ioBroker.shrdzm)
![GitHub 问题](https://img.shields.io/github/issues/mcm4iob/ioBroker.shrdzm)
![NPM 版本](http://img.shields.io/npm/v/iobroker.shrdzm.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/shrdzm-stable.svg)
![安装数量](https://iobroker.live/badges/shrdzm-installed.svg)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.shrdzm
**一般信息：**<br> [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/shrdzm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br></br> **版本：**</br></br> **测试：**</br> [![测试与发布](https://github.com/mcm4iob/ioBroker.shrdzm/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/mcm4iob/ioBroker.shrdzm/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/mcm4iob/ioBroker.shrdzm/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/mcm4iob/ioBroker.shrdzm/actions/workflows/github-code-scanning/codeql)<br> **捐款：**</br>

**************************************************************************************************************

## Sentry **此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。
**************************************************************************************************************

## IoBroker 的 shrdzm 适配器
此适配器将 *SHRDZM IT Services e.U.* 提供的 SHRDZM 智能电表接口集成到 ioBroker 中。该接口的说明请参见[这里](https://cms.shrdzm.com/produkt/smartmeter-modul/)。

请注意，此适配器与上述公司没有任何关系，并且不存在任何商业关系。

## 文档
详细文档有多种语言版本：

- **英语**：[doc/en/DOCUMENTATION_en.md](doc/en/DOCUMENTATION_en.md)
- **德语**：[doc/de/DOCUMENTATION_de.md](doc/de/DOCUMENTATION_de.md)

**************************************************************************************************************

## 免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™或注册商标®。使用它们并不意味着与它们或其任何关联子公司有任何关联或认可！本个人项目由业余时间维护，不承担任何商业目的。**

**************************************************************************************************************

＃＃ 配置
按照制造商文档的说明安装并设置 SHRZDM 接口。此适配器使用 UDP (IPv4) 连接连接到接口。开始操作需要以下步骤：

- 按常规方式安装 iobroker 适配器
- 打开ioBroker adminUI界面配置适配器
- 在 adminUI 上选择一个空闲端口，默认设置为端口 9000，但可以使用任何空闲端口。

- 打开 SHRZDM 配置界面（使用网络浏览器）

![替代文本](../../../en/adapterref/iobroker.shrdzm/doc/shrzdm-cloud.pgn)

- 选择云配置
- 在“服务器”字段中输入您的 ioBroker 主机的 IP 地址（仅限 IPv4）和所选的端口号
- 激活“UDP 发送”
- 保存云设置

SHRDZM 设备应按照页面“设置”中配置的间隔立即开始发送数据。

＃＃ 手术
适配器将为从所有设备接收的所有 obos 数据创建状态。如果您安装了多个 SHRZDM 设备，并且想要限制接受的设备，则可以在适配器的配置中输入允许的设备列表。如果未配置任何设备，则将接受来自所有发送方的数据。

＃＃ 常问问题
#### 更新过于频繁
每当从 SHRDZM 设备收到新数据时，都会执行实时数据更新。为了减少设备发送的数据量，请在设备的“设置”页面调整间隔参数。

**************************************************************************************************************

**如果您喜欢这个适配器，请考虑捐赠：**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK_IN_PROGRESS**

### 1.0.0 (2025-08-14)
* (mcm1957) Adapter requires node.js 20.x, js-controller 7.0.7 and admin 7.6.17 now.
* (mcm1957) Dependencies have been updated.

### 0.2.0 (2025-04-06)
* (mcm1957) Online indicator has been added to objectview.
* (mcm1957) Translations have been updated.
* (mcm1957) Descriptions have been added to all states and at adminUI.
* (mcm1957) Raw data received from devices can be stored for analyses now.
* (mcm1957) Adapter can handle multiple networks now. 
* (mcm1957) Dependencies have been updated.

### 0.1.1 (2025-03-17)
* (mcm1957) translations have been reviewed and fixed

### 0.1.0 (2025-03-15)
* (mcm1957) initial release

## License
MIT License

Copyright (c) 2025 mcm1957 <mcm57@gmx.at>

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