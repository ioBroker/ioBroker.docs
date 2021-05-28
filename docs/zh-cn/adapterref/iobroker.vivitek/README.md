---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vivitek/README.md
title: ioBroker.vivitek
hash: t+Ah+LoEx9Tq5fdmj9fc8ljk00si9IGbuXy7TvSePFo=
---
![商标](../../../en/adapterref/iobroker.vivitek/admin/vivitek.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.vivitek.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.vivitek.svg)
![安装数量（最新）](http://iobroker.live/badges/vivitek-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/vivitek-stable.svg)
![依赖状态](https://img.shields.io/david/Bannsaenger/iobroker.vivitek.svg)
![已知漏洞](https://snyk.io/test/github/Bannsaenger/ioBroker.vivitek/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vivitek.png?downloads=true)

＃ioBroker.vivitek
##适用于ioBroker的vivitek适配器
通过网络控制Vivitek投影仪（通过telnet的RS 232命令）

该适配器旨在通过其telnet界面与vivitek投影仪进行通信。
这应该像串行端口一样。
不幸的是，telnet实现缺少一些基本命令。
目前，它只能通过网络与RS232 comserver进行通信。
我用Wieseman＆Theis Comserver来运行它。

＃＃ 去做
当投影机端的实现完全正常工作时，应添加更多命令以完全控制投影机。
如我目前所知，该协议涵盖了整个projectos系列。

## Changelog

### 0.0.1
* (Bannsaenger) initial release

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

## License
MIT License

Copyright (c) 2021 Bannsaenger <bannsaenger@gmx.de>

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