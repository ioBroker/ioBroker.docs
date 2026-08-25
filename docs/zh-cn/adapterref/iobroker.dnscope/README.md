---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.dnscope/README.md
title: ioBroker.dnscope
hash: GUqvuCkQoL1L7hW4h0z+PYupm9bYmJVjCrNgGIjGzkQ=
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

此适配器使用服务 `Sentry.io` 自动向我（开发者）报告异常、代码错误和新的设备架构。更多详情请见下文！

---

## 支持适配器开发
如果您喜欢 DNScope，请考虑捐赠：

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

＃＃ 描述
DNScope 允许您直接在 ioBroker 中更新动态 DNS 帐户。

无需任何额外硬件或额外操作，即可使用当前环境的 IP 地址更新 DNS 帐户。

您可以设置检查和更新的间隔。

默认间隔为 10 分钟。

目前支持以下 DynDNS 提供商：

* IPv64
* DuckDNS
* NoIP
* Dynv6
* 风俗

选择 `Custom` 时，可以指定直接更新 URL，以便集成任何支持此功能的提供商。

自定义 URL 中可以使用以下占位符，这些占位符将在运行时替换为当前 IP 地址：

| 占位符 | 描述 |
|---|---|
| `{{ipv4}}` | 当前公网 IPv4 地址 |
| `{{ip}}` | 当前 IP 地址（IPv4 更新时为 IPv4，IPv6 更新时为 IPv6） |
| `{{ip}}` | 当前 IP 地址（IPv4 更新时为 IPv4 地址，IPv6 更新时为 IPv6 地址） |

**例子：**

```
https://dynupdate.example.com/update?hostname=myhome.example.com&myip={{ipv4}}&token=abc123
```

---

## 适配器配置
您需要提供 DynDNS 服务的访问数据才能配置适配器。

根据服务提供商的不同，这可能是令牌或用户名/密码。

您还必须输入要更新的域名。

如果您有多个域名需要更新，则每个域名都需要一个实例。

--- <!-- ### **正在进行中** -->

## Changelog
### 0.3.0 (2026-08-20)
* (simatec) Adapter requires node.js >= 22 now
* (simatec) dependencies updated
* (simatec) Source code cleaned up
* (HJS72) Add detailed debug diagnostics for failed update requests (HTTP status, body, and headers)
* (HJS72) Ship compiled build output with the latest logging changes
* (HJS72) Fix HTTP 400 error when IP address could not be determined (skip update instead)
* (HJS72) Add debug log output for the full update request URL
* (HJS72) Add IP placeholder support for custom update URL (`{{ipv4}}`, `{{ipv6}}`, `{{ip}}`)

### 0.2.9 (2026-04-26)
* (simatec) dependencies updated
* (simatec) Source code cleaned up

### 0.2.8 (2026-03-29)
* (simatec) Fix License
* (simatec) dependencies updated

### 0.2.7 (2025-11-23)
* (simatec) dependencies updated

### 0.2.6 (2025-10-25)
* (simatec) dependencies updated
* (simatec) Fix npm publish

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025 - 2026 simatec

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