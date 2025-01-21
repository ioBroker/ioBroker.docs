---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.contactid/README.md
title: ioBroker.contactid
hash: ef7bEhZLeiDsv/qf+MW61JRKcB4Wxlzl17KVOfvq2jE=
---
![标识](../../../en/adapterref/iobroker.contactid/admin/contactid.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.contactid.svg)
![下载](https://img.shields.io/npm/dm/iobroker.contactid.svg)
![安装数量（最新）](http://iobroker.live/badges/contactid-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/contactid-stable.svg)
![已知漏洞](https://snyk.io/test/github/schmupu/ioBroker.contactid/badge.svg)
![新平台](https://nodei.co/npm/iobroker.contactid.png?downloads=true)

# IoBroker.contactid
**测试：**![测试与发布](https://github.com/schmupu/ioBroker.contactid/workflows/Test%20and%20Release/badge.svg)

报警系统与中央站通信时使用的联系 ID 协议。

此适配器是 Contact ID 服务器。当触发警报事件时，警报系统通过 IP 将 Contact ID 消息发送到中央站。
您可以将 ioBroker 与此适配器一起使用作为中央站。例如，您可以通过 Conntact ID 发送电报消息以发出警报。

Contact-ID 消息

SSSS 18QEEEGGZZZC

- SSSS – 用户。这四位数字用于向中央站识别特定的报警系统或客户。ioBroker 允许使用更长的用户名称。

- 18 - 消息类型。基本上，此字段应始终为“18”。
- Q – 赛事资格。
- EEE——事件代码。
- GG – 组/分区编号。
- ZZZ – 防区编号 (001 - 999)。这是触发警报的防区的编号。
- C—校验和。

[Contact ID 协议](http://www.technoimport.com.co/Producto/pdfs/ADEMCO%20-%20DC05_Contact_ID.pdf)

## 安装和配置
1. 安装适配器
2.适配器的配置：

选择用于监听 Conctact-ID 请求的 IP 地址和端口。
注册您的订阅者名称以识别您的防盗警报消息并选择您的防盗警报类型。

3. 配置防盗系统以发送 Contact ID 信息

Lupusec XT1：

设置 -> 联系人 ID：rptn://subcriber@ip-address-iobroker:port 例如：rptn://test@192.168.20.1:50000

Lupusec XT1+/XT2/XT2+/XT3/XT4：

安装 -> 联系 ID ： ip://subscriber@ip-address-iobroker:port/CID 示例：ip://test@192.168.20.1:50000/CID

4. 测试适配器

打开命令 shell 并输入

```
telnet ip-address-iobroker port
Example: telnet 192.168.20.1 50000

```

现在您可以发送 Conntact ID 消息。对于 Lupsec 防盗报警系统，该消息以 [ 和 ] 开头和结尾。输入您的 telnet 会话：

```
[SSSS 18QEEEGGZZZC]
Example: [test 18160201010B]
```

现在您可以在 ioBroker 对象中看到该消息

## Changelog

### **WORK IN PROGRESS**

- (Stübi) Fixed Notification from ioBroker Check and Service Bot (Issue #46)

### 2.0.0 (2025-01-18)

- (Stübi) Redesign of Contact ID Adapter.
- (Stübi) Wokring now with nodejs 20 and 22
- (Stübi) js-controller in version 6 and 7 will be supported (Issue #19, #28)
- (Stübi) nodejs 20 and nodejs 22 will be suported (Issue #20, #36)
- (Stübi) states moved to channel subscriber
- (Stübi) add Lupusec XT4 to list of alarm systems
- (Stübi) migration to eslint 9 (Issue #39)
- (Stübi) change admin configuration (Issue #38)
- (Stübi) fixed dependency ot iobroker adapter-core (Issue #37)
- (Stübi) fixed iobroker notifications (Issue 35)

### 1.0.2 (2020.12.13)

- (Stübi) Bugfixing, ACK-invalid Format - Issue #14
- (Stübi) Bugfixing, Issue #9

## License

MIT License

Copyright (c) 2025 Thorsten Stueben <thorsten@stueben.de>

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