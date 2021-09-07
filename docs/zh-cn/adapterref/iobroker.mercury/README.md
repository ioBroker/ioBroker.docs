---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mercury/README.md
title: ioBroker.mercury
hash: B8aBskRWNbWqLE5g80MXlpxViTRGiSaL4UuK8MkhiHQ=
---
![标识](../../../en/adapterref/iobroker.mercury/admin/mercury.png)

![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker.mercury
## IoBroker 的 Mercury 适配器
从电表 Mercury 接收数据。
支持 TCP/IP 和串行连接。

支持以下电表：

* 水星-200
* 水星-201
* 水星-206
* 水星-203
* Mercury-203.2TD
* 水星-204
* 水星-208
* 水星-230
* 水星-231
* 水星-233
* 水星-234
* 水星-236
* 水星-238

## 对象
**RAW** - 发送 RAW 命令并接收响应。
命令不带地址和 CRC，字节以空格分隔。示例：对于 1 相计数器 - 读取当月能量

```
32 0F
```

以字符串形式返回缓冲区

```"{"type":"Buffer","data":[0,14,31,155,50,7,0,99,0,255,255,255,255,255,255,255,255,255,255,255,255,127,86]}"```

## Changelog

### 0.1.5
* (instalator) fixed a bug with polling multiple counters

### 0.1.4
* (instalator) added frequency for 1 fase
* (instalator) added powerQTotal for 1 fase
* (instalator) added powerSTotal for 1 fase
* (instalator) added cosfTotal for 1 fase
* (instalator) change recconect

### 0.1.3
* (instalator) fixed error [issues 11](https://github.com/instalator/ioBroker.mercury/issues/11)
* (instalator) fixed warn [issues 8](https://github.com/instalator/ioBroker.mercury/issues/8)

### 0.1.2
* (instalator) fixed error serial memory

### 0.1.1
* (instalator) fixed Unsigned value current
* (instalator) fix for serial number > 240
* (instalator) change recconect SerialPort
* (instalator) refactoring

### 0.1.0
* (instalator) beta

### 0.0.15
* (instalator) fixed error Power

### 0.0.13
* (SanSanysch) translate
* (instalator) added translate
* (instalator) added temperature, frequency, full power
* (instalator) fix error

### 0.0.11
* (instalator) added translate function (PLEASE HELP WITH THE TRANSLATION)
* (instalator) fix error

### 0.0.10
* (instalator) Added setting Polling period main parameters
* (instalator) Added setting Polling period of non-main parameters
* (instalator) Refactoring and fix error

### 0.0.8
* (instalator) fixed error

### 0.0.4
* (instalator) added unit for state

### 0.0.3
* (instalator) added object send RAW command
* (instalator) refactor and fix error

### 0.0.2
* (instalator) added serial connect
* (instalator) fixed many error

### 0.0.1
* (instalator) initial release

## License
The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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