---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: 6p3kCLVVzilY/rhsudJNUVqqhuVsPsXcjbbzJWX0n+Q=
---
![标识](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![安装数量](http://iobroker.live/badges/comfoair-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![下载](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![新平台](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)

# IoBroker.comfoair
哨兵
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## Zehnder Comfoair 的 ioBroker 适配器
这是用于 Zehnder Comfoair“CA”通风设备的 ioBroker 适配器（即 ComfoAir CA350，而不是 ComfoAir Q350...）。

＃＃ 联系
### 通过 IP / LAN
使用 RS232 转 LAN 或 WiFi 转换器将 ioBroker 与您的 Zehnder Comfoair 连接起来。
安装用于 TCP 连接到 comfoair 的硬件：即 RS232 转 LAN 适配器连接到 comfoair 的串行接口。仅连接引脚 2、3 和 5（也应与 cc-Ease 连接的 TX、RX 和 GND 触点配合使用）。

### 串行连接
将 comfoair 的串行接口连接到运行 ioBroker 的设备的串行接口。即使用 RS232toUSB 电缆或 RS232toTTL 适配器连接到 Raspberry Pis UART - 引脚。

## 配置
选择您喜欢的连接模式（IP 或串行），设置 comfoair - IP 地址和端口或指定您的串行设备，定义 (RS232) comfoair 连接模式（参见“适配器和 CC Ease”）并定义轮询 - 间隔。

## 适配器和 CC 便利
一般情况下，不建议在 RS232 串行通信中将数据从 2 个发射器发送到一个接收器。CCEase 和适配器的并行使用可能会导致错误，或者在最坏的情况下损坏您的 comfoair 控制器！因此，当您启动 ComfoAir 适配器时，您的 CC Ease 应该断开连接或关闭。
comfoair 本身知道 4 种不同的 rs232 模式：CCEaseonly、PConly、PCMaster、PCLogmode。在 PConly 和 PCMaster 下，CC-Ease 处于关闭状态。
在实例配置中，您可以选择以下连接模式之一。请仅勾选其中一种！一旦适配器在仅适配器或并行模式下运行，您就可以切换 comfoair 的 rs232 模式（不建议这样做，因为特定的连接模式需要特定的 rs232 模式！）。

### 仅限适配器
CC Ease 断开连接（推荐）或在适配器启动时关闭，您只能使用 ioBroker 控制您的 comfoair（rs232 模式为 PCMaster）。此模式为默认模式且推荐。

### 仅供聆听
适配器捕获从 comfoair 或 CC Ease 发送的数据。CC Ease 正在运行，适配器无法发送任何命令。在此模式下，您只能获得一组基本值（温度、通风状态）。在此模式下，也不会出现通信错误/损坏的风险，因为适配器与 comfoair 之间没有通信。

### 并行模式
CC Ease 和适配器正在运行。comfoiar rs232mode 设置为“PCLogmode”。适配器正在“监听”基本值（温度、通风水平）并轮询其他值（错误、过滤器计时器）。设置延长轮询间隔以降低通信错误的风险。您可以使用 ioBroker 和 CC Ease 单元控制 ComfoAir。在发送命令（包括轮询）之前，rs232 模式切换到 PC Master。发送每个命令时，也会进行轮询。测试表明没有错误 - 并行运行更长的时间。但是：您自行承担运行此模式的风险。

### 恒定 PC 对数模式下的并行模式
一些用户在 PC-Log 模式下持续运行 comfoair 时获得了积极的体验。此模式具有与仅适配器模式相同的功能，但运行 CC Ease。但是：运行此模式需要您自行承担风险。

## 使用适配器
您的 comfoair 的值应在“状态”和“温度”通道中可见。更改连接模式后，请刷新对象 - 视图。

通过设置/更改“控制”通道中的值，您可以控制 comfoair 通风设备。“控制”通道中的所有值都必须设置为 ACK=false，才能被识别为适配器的命令。

增压模式：设置增压时间并启动。增压时间过后，通风将恢复到先前的水平。如果在增压时间内改变通风水平，则取消返回。

在 comfoair CA350 上测试。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.2.0 (2024-04-14)

* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.9 (2024-03-08)

-   (mcm1957) German title of adapter has been corrected
-   (mcm1957) Dependencies have been updated

### 1.1.8

-   boost-error fixed (sentry)

### 1.1.7

-   dependencies updated, serialport 10.x - update

### 1.1.6

-   boostmode enhanced, dependencies updated

### 1.1.5

-   Bugfix (js-controller update)

### 1.1.3

-   boostmode added

### 1.1.2

-   adapter - internal filter-h counter added

### 1.1.1

-   Periodical self-test with restart in case of fail added

### 1.1.0

-   displays now working hours of different ventilation levels, preheating, bypass and frost-protection.

### 1.0.0

-   offers now the possibility of a direct serial connection besides the connection over IP/LAN.

### 0.3.2

-   Bypass - error bug fixed.

### 0.3.1

-   new connection mode: parallel in constant PC-Logmode.

### 0.3.0

-   new connection modes, i.e. 'listening only', selftest-function and setting filter-timer added.

### 0.2.1

-   smaller bugfixes.

### 0.2.0

-   New rs232 - Modes, reading enthalpie-values, handling connection-errors.

### 0.1.4

-   README-Update 'NO PARALLEL USE', discard 'Safe-Mode'.

### 0.1.3

-   RS - 232 interface: manual- or safe - mode possible.

### 0.1.2

-   ReadME updated, minor bugfixes.

### 0.1.1

-   bugfix ventlevels, reading errors

### 0.1.0

-   ReadME Update

### 0.0.7

-   Core Files/Testing Update and introduce adapter-core

### 0.0.6

-   Filter - change - indicator.

### 0.0.5

-   bugfix set vent levels.

### 0.0.4

-   gets & sets vent levels, gets filter-timer.

### 0.0.3

-   minor bugfixes, sets comfort-temperature and resets filter-hours.

### 0.0.2

-   First running Version. Gets temp, vent, bypass and filter states, sets fan level.

### 0.0.1

-   In development stage, contributions welcome

## License

The MIT License (MIT)

Copyright (c) 2023-2024 forelleblau marceladam@gmx.ch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.