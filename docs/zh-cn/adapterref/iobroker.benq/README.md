---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.benq/README.md
title: ioBroker BenQ 投影仪适配器
hash: YfmCWWyypsOuFfAS5vkeXbUOvtycDdAEiBM8nkinyGM=
---
![标识](../../../en/adapterref/iobroker.benq/admin/benq-logo.png)

![安装数量](http://iobroker.live/badges/benq-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.benq.svg)
![下载](https://img.shields.io/npm/dm/iobroker.benq.svg)
![新平台](https://nodei.co/npm/iobroker.benq.png?downloads=true)
![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker BenQ 投影仪适配器
[![测试]（https://github.com/instalator/iobroker.benq/workflows/Test%20and%20Release/badge.svg）](https://github.com/instalator/ioBroker.benq/actions/)

ioBroker BenQ 投影仪适配器用于通过 RS232 与以太网网关配合使用来控制您的 BenQ 投影仪。
型号和命令列表包含在 `admin/commands.json` 文件中。

＃＃ 硬件
该驱动程序允许您通过[适配器](http://blog.instalator.ru/archives/744) RS232 至以太网连接到 BenQ 投影仪。

作为 RS232 到以太网的网关，可以使用任何需要下载 [此代码](https://github.com/stepansnigirev/ArduinoSerialToEthernet) 的 Arduino 兼容卡。
您还需要一个以太网屏蔽 W5100 或 W5500 和一个 RS232 到 TTL 转换器。

＃＃ 支持
支持型号：W1200、W1070、W1080...

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.0 (2024-04-02)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) changed: Testing has been changed to support node 18 and 20
* (mcm1957) changed: Dependencies have been updated

### 0.2.7
 * (instalator) fix error

### 0.2.4
 * (instalator) change test

### 0.2.2
 * (instalator) fixed clearTimeout

### 0.2.1
 * (instalator) support compact mode
 * (instalator) support admin3
 * (instalator) refactoring

### 0.0.6
  (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2021 instalator <vvvalt@mail.ru>

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