---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vivitek/README.md
title: ioBroker.vivitek
hash: XMhDgcHa2xqJZkUjWZ9usXlpe33EZqQIJz6Yg40Pdec=
---
![标识](../../../en/adapterref/iobroker.vivitek/admin/vivitek.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.vivitek.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vivitek.svg)
![安装数量（最新）](http://iobroker.live/badges/vivitek-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/vivitek-stable.svg)
![依赖状态](https://img.shields.io/david/Bannsaenger/iobroker.vivitek.svg)
![已知漏洞](https://snyk.io/test/github/Bannsaenger/ioBroker.vivitek/badge.svg)
![新平台](https://nodei.co/npm/iobroker.vivitek.png?downloads=true)

# IoBroker.vivitek
## IoBroker 的 vivitek 适配器
通过网络控制 Vivitek 投影仪（通过 telnet 的 RS 232 命令）

该适配器设计用于通过其 telnet 接口与 vivitek 投影仪进行通信。
这应该像串行端口一样运行。

不幸的是，telnet 实现缺少一些基本命令。
目前，它只能通过网络与 RS232 Com-Server 进行通信。
我使用 Wieseman & Theis Com-Server 运行它。

待办事项
当投影仪端的实现完全正常工作时，应该添加更多命令来完全控制投影仪。
据我所知，该协议涵盖了整个投影仪系列。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.1 (2025-02-25)
* (Bannsaenger) updated admin dependency

### 0.1.0 (2025-02-09)
* (Bannsaenger) updated dependencies and moved to release script
* (Bannsaenger) instance config and object database handling prepared for >= admin5
* (Bannsaenger) json Config
* (Bannsaenger) add errorHandler

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.0.1
* (Bannsaenger) initial release

### 0.0.2
* (Bannsaenger) added engine and prepared for review

## License
MIT License

Copyright (c) 2021-2025 Bannsaenger <bannsaenger@gmx.de>

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