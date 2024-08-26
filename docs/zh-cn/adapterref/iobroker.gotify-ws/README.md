---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.gotify-ws/README.md
title: ioBroker.gotify-ws
hash: 7ZfcQLE4vzTByHNxXthzOoL0iaydL0n0MW1hS0f3g14=
---
![标识](../../../en/adapterref/iobroker.gotify-ws/admin/gotify-ws.png)

![安装数量](http://iobroker.live/badges/gotify-ws-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.gotify-ws.svg)
![下载](https://img.shields.io/npm/dm/iobroker.gotify-ws.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.gotify-ws/badge.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.gotify-ws?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.gotify-ws
![测试与发布](https://github.com/simatec/ioBroker.gotify-ws/workflows/Test%20and%20Release/badge.svg)

此适配器使用服务`Sentry.io`自动向我（开发人员）报告异常和代码错误以及新的设备架构。更多详情见下文！

---

## 支持适配器开发
**如果您喜欢 ioBroker.gotify-ws，请考虑捐款：**

[![贝宝]（https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif）](https://paypal.me/mk1676)

---

## 用于 ioBroker 的 gotify-ws 适配器
Gotify-WS 是一个适配器，它与 Gotify 服务器建立 websocket 连接，因此可以接收和处理来自服务器的所有消息。

对我来说，后台缺少与所有常见系统的连接。
例如，没有适合 IOS 的应用程序。

然而，随着 Gotify 越来越流行并且现在也作为通知服务进入 Proxmox 等许多系统，我需要一个解决方案。

这就是 Gotify-WS 发挥作用的地方。
Gotify-WS 接收消息并将其转发到 ioBroker 支持的通知服务。这意味着可以将消息转发到 Telegram 等。

Spotify-WS 目前支持以下通知服务

* 电子邮件
* 矩阵
* 通知管理器
* 容易被打败
* 不和谐
* 信号
* 电报
* WhatsApp

---

## 适配器配置
适配器的配置非常简单。

您在 Gotify 服务器上创建一个新客户端，并复制客户端生成的令牌。
您在 Gotify-WS 适配器配置中输入此令牌。
Gotify-WS 还需要 Gotify 服务器的 IP 地址或域和端口。

这样就建立了连接并且适配器可以接收来自 Gotify 服务器的所有传入消息。

然后，您可以配置您选择的通知服务进行转发。

--- <!-- ### **正在进行中** -->

## Changelog
### **WORK IN PROGRESS**
* (simatec) Fix Adapter Check
* (simatec) Dependencies updated

### 0.1.5 (2024-07-22)
* (simatec) small fix

### 0.1.4 (2024-07-19)
* (simatec) Dependencies updated

### 0.1.3 (2024-07-17)
* (simatec) Fix Test & Release
* (simatec) Fix Timeout

### 0.1.2 (2024-06-26)
* (simatec) Fix io-package
* (simatec) Notification-Manager added

### 0.1.1 (2024-06-19)
* (simatec) Fix Branch

### 0.1.0 (2024-06-19)
* (simatec) First Release

### 0.0.1 (2024-03-15)
* (simatec) initial release

---

## License

MIT License

Copyright (c) 2024 simatec

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