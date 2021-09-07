---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.benq/README.md
title: ioBroker BenQ 投影仪适配器
hash: LkqF9K34d1UeWB7DB6vf83rG2pjH2T/wKUk11feC7lM=
---
![标识](../../../en/adapterref/iobroker.benq/admin/benq-logo.png)

![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker BenQ 投影仪适配器
ioBroker BenQ 投影仪适配器用于通过 RS232 和 Etnernet 网关控制您的 BenQ 投影仪。
模型和命令列表包含在 `admin/commands.json` 文件中。

＃＃ 硬件
该驱动程序允许您通过 [适配器](http://blog.instalator.ru/archives/744) RS232 转以太网连接到 BenQ 投影机。

作为以太网的 RS232 网关，使用任何需要下载 [这段代码](https://github.com/stepansnigirev/ArduinoSerialToEthernet) 的 Arduino 兼容卡。
您还需要一个 Ethernet Shield W5100 或 W5500 和一个 RS232 到 TTL 转换器。

＃＃ 支持
支持型号：W1200、W1070、W1080待...

## Changelog

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