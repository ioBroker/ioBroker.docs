---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bidirectional-counter/README.md
title: ioBroker.bidirectional-counter
hash: VQRM1yPne/H+CEd1AsSojSOan53JJwXTJWyQGzsSyyU=
---
![标识](../../../en/adapterref/iobroker.bidirectional-counter/admin/bidirectional-counter.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.bidirectional-counter.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bidirectional-counter.svg)
![安装数量](https://iobroker.live/badges/bidirectional-counter-installed.svg)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![新PM](https://nodei.co/npm/iobroker.bidirectional-counter.png?downloads=true)

# IoBroker.bidirectional-counter
![测试和发布](https://github.com/BenAhrdt/ioBroker.bidirectional-counter/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的双向计数器适配器
反对单独消费（积极变化）和交付（消极变化）

使用此计数器，您可以选择自定义配置中类型编号的每个状态。
适配器将在内部创建 3 个状态。 （累计、交付和总计）。
如果检测到订阅状态的积极变化，将分配消费。
如果检测到订阅状态的负面变化，将分配交付。
将在每种情况下分配总数。

例如该适配器可用于模拟来自外部设备的具有给定能量值的能量计。
例如，shelly 将在重新启动的情况下将通道的能量设置回零。
适配器将忽略零，并保存计数器值以在其他适配器/脚本中使用。
当下次壳层能量状态增加时，计数器状态将从其保存的值增加。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 2.0.8 (2022-06-17) - Readme updated
* (BenAhrdt) readme updated with paypal link

### 2.0.7 (2022-06-16) - loglevel query deleted
* (BenAhrdt) dont check loglevel before log.debug()

### 2.0.6 (2022-06-13) - adapter type changed
* (BenAhrdt) change adapter type into misc-data

### 2.0.5 (2022-06-08) - rewrite additional state with ack true
* (BenAhrdt) write ack = true in case of additional state is subscribed

### 2.0.4 (2022-06-08) - do not unsubscribe
* (BenAhrdt) unsubscribe fixed

### 2.0.3 (2022-06-06)
* (BenAhrdt) readme fixed

### 2.0.2 (2022-06-04)
* (BenAhrdt) fixed a comment Bug

### 2.0.1 (2022-06-04)
* (BenAhrdt) first try to release and push with Token

### 2.0.0 (2022-06-03)
* (BenAhrdt) release script implemented

### 1.14.9
* (BenAhrdt) fixed some changes in readme

### 1.13.8
* (BenAhrdt) fixed changes for official version
  use seState to write internal adapter states

### 1.8.7
* (BenAhrdt) edit changelog

### 1.8.6
* (BenAhrdt) first official version

## License
MIT License

Copyright (c) 2022 BenAhrdt <bsahrdt@gmail.com>

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