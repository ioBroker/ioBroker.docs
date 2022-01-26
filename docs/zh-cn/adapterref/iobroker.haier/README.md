---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.haier/README.md
title: ioBroker 海尔空调适配器
hash: lElAdsQSqdcvWBnza70hSO0PKoEFIk/ZAopUAW9LUCw=
---
![标识](../../../en/adapterref/iobroker.haier/admin/haier_admin.png)

![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

#ioBroker海尔空调适配器
=================

ioBroker Haier 适配器用于通过 UART 结合 TCP 到串行网关来控制您的海尔空调。
在“Lightera”系列的空调上检查工作。

＃＃ 硬件
作为 TCP 到串行网关，我使用这个 [代码]（https://github.com/instalator/ESP8266.TelnetToSerial）和这个[设备](https://blog.instalator.ru/archives/433)。

＃＃ 使用
＃＃＃ 力量
打开和关闭空调。 （真假）

### 温度
室温指示。(°C)

###设置温度
设置温度。 (16 - 30 °C)

＃＃＃ 模式
* **自动**或**0** - 一键给你一个舒适的房间！空调机组可以判断室内温度和湿度，并进行相应的调整。
* **cool** 或 **1** - 冷却室。
* **heat** 或 **2** - 房间供暖。
* **fan** 或 **3** - 只有风扇。
* **干燥**或**4** - 空气除湿。
* **off** 或 **5** - 关闭交流电。

＃＃＃ 风扇转速
* **min** 或 **2** - 风扇速度
* **mid** 或 **1** - 风扇速度
* **max** 或 **0** - 风扇速度
* **自动** 或 **3** - 风扇速度

＃＃＃ 摇摆
* **ud** 或 **1** - 自动向上/向下。
* **lr** 或 **2** - 自动左/右。
* **both** 或 **3** - 双向。
* **false** 或 **0** 或 **off** - 关闭。

＃＃＃ 健康
(true/false) 空调中的水离子发生器可以产生大量的负离子，有效平衡空气中的位置和负离子数量，同时杀灭细菌，加速房间内的灰尘沉积，最终净化室内空气。房间。

### 锁遥控器
锁定红外遥控器（真/假）

### 压缩器
如果压缩机开启

＃＃＃ 新鲜的
(true/false) 排出房间内的污浊空气，吸入新鲜空气。
（此功能在某些型号上不可用。）

＃＃＃ 生的
发送不带起始字节和校验和的 RAW HEX 代码示例：开机 - **0A000000000001014D02**

## Changelog

### 1.0.4
   (instalator) change test

### 1.0.3
   (instalator) support admin3
   (instalator) support compact mode
   (instalator) change smart to auto
   (instalator) added role for state

### 1.0.2
   (instalator) fix error

### 1.0.1
   (instalator) fix error parse packets

### 1.0.0
   (instalator) Up to stable

### 0.1.1
   (instalator) fix reconnect error

### 0.1.0
   (instalator) beta version

### 0.0.4
  (instalator) change level log
  (instalator) fix send command
  (instalator) change for test file setup.js
  (instalator) fix error
  (instalator) added object for send raw code
  
### 0.0.3
  (instalator) alfa version adapter

### 0.0.1
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