---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.dnscope/README.md
title: ioBroker.dnscope
hash: q1/5Gmkk07joBqUydHoSeR9eI4zDKKfruoBil8eWV2E=
---
![标识](../../../en/adapterref/iobroker.dnscope/admin/dnscope.png)

![安装数量](http://iobroker.live/badges/dnscope-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.dnscope.svg)
![下载](https://img.shields.io/npm/dm/iobroker.dnscope.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.dnscope/badge.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.dnscope?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.dnscope
![测试与发布](https://github.com/simatec/ioBroker.dnscope/workflows/Test%20and%20Release/badge.svg)

此适配器使用服务`Sentry.io`自动向我（开发人员）报告异常和代码错误以及新的设备架构。更多详情见下文！

---

## 支持适配器开发
**如果您喜欢 DNScope，请考虑捐款：**

[![贝宝]（https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif）](https://paypal.me/mk1676)

---

＃＃ 描述
DNScope 允许您直接在 ioBroker 中更新您的动态 DNS 帐户。
可以使用您环境的当前 IP 地址更新您的 DNS 帐户，无需任何绕行或额外的硬件。

您可以确定检查和更新的间隔。
默认间隔为 10 分钟。

目前支持以下 DynDNS 提供商：

* IPv64
* 鸭子DNS
* 无IP
* Dynv6
* 风俗

当选择`Custom`时，可以指定直接更新 URL 以便集成任何支持此功能的提供商。

---

## 适配器配置
适配器配置需要您对 DynDNS 服务的访问数据。
根据提供商的不同，这可能是令牌或用户名/密码。

您还必须输入要更新的域。

如果有多个域需要更新，则每个域需要一个实例

--- <!-- ### **正在进行中** -->

## Changelog
### 0.2.0 (2025-03-23)
* (simatec) Fix Delay
* (simatec) Fix States
* (simatec) dependencies updated

### 0.1.0 (2025-03-16)
* (simatec) First Beta

---

## License
MIT License

Copyright (c) 2025 simatec

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