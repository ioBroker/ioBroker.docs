---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.brunner-eas3/README.md
title: ioBroker.brunner-eas3
hash: c/OP6XPydI74q7mpQKoD0wzg885HvMTnM6y1yFd+vMA=
---
![标识](../../../en/adapterref/iobroker.brunner-eas3/admin/brunner-eas3.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.brunner-eas3.svg)
![下载](https://img.shields.io/npm/dm/iobroker.brunner-eas3.svg)
![安装数量](https://iobroker.live/badges/brunner-eas3-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/brunner-eas3-stable.svg)
![NPM](https://nodei.co/npm/iobroker.brunner-eas3.png?downloads=true)

# IoBroker.brunner-eas3
**测试：** ![测试与发布](https://github.com/JR-Home/ioBroker.brunner-eas3/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 brunner-eas3 适配器
用于读取 Brunner 燃烧控制系统 EAS 3 数据的适配器。数据通过 WLAN 广播消息发布。

如果与 EAS 3 的连接断开，燃烧温度将设置为 -99。

燃烧状态：

* -1 - 状态不可用，连接丢失
* 0 - 门已打开
* 1 - 点火
* 2 - 火步骤 2
* 5 - 火灾结束
* 6 - 错误/超时，未检测到点火
* 7 - 火已烧完。

### 免责声明
此适配器并非 Urlich Brunner GmbH 的官方产品，而是由开源社区成员开发和维护。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.1 (2026-03-26)
* (JR-HOME) release - updating roles of IOBroker objects, corrected add more wood status

### 1.0.7 (2026-03-06)
* (JR-HOME) release - correction for publishing adapter on IOBroker dev portal

### 1.0.6 (2026-03-01)
* (JR-HOME) release

## License
MIT License

Copyright (c) 2026 JR-Home 

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