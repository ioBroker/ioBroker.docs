---
BADGE-Number of Installations: http://iobroker.live/badges/sma-em-installed.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sma-em.svg
BADGE-Stable version: http://iobroker.live/badges/sma-em-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sma-em.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sma-em.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sma-em/README.md
title: SMA 电表适配器文档
hash: JYOczVv4WHkgpzr0qUX+rTgxvi+M7KfhoBpM/5kJfAo=
---
# SMA 能量计适配器文档
＃＃ 一般信息
SMA Energy Meter Adapter 从 Energy Meter 或 Sunny Home Manager 接收多播数据报。它们每秒或更频繁地将数据包及其测量数据发送到网络中。可以在 Sunny Portal 中设置 200ms、600ms 或 1000ms 的传输间隔。

## 管理/管理页面
![Adapter_admin_config](img/adminpage1-en.png)![Adapter_admin_config2](../../../en/adapterref/iobroker.sma-em/img/adminpage2-en.png)

- 选项卡组播设置
  - 多播 IP：SMA 预定义的默认设置是 IP 地址 239.12.255.254。
  - 组播端口：SMA 预定义的默认设置是 UDP 端口 9522。

- 选项卡选项
  - 扩展模式：提供更详细的信息，例如无功功率、视在功率、cosphi、电压、安培数等。默认情况下禁用此设置。
  - 详细信息 L1 - L3：这些选择点可用于显示每个阶段的详细信息。
  - 实时更新周期：设置瞬时功率或电网频率等实时数据的更新周期。这用于减少系统负载。示例：对于 5/s 的数据包速率（200ms 传输间隔），所有值在一秒的实时更新间隔内求和，仅在间隔结束时是频率的平均值或中值和在相应的 ioBroker 数据点中更新阶段。
  - 非实时更新周期：此处设置非实时数据（如抄表）的更新周期。此处最后接收到的值仅在间隔结束时在相应的 ioBroker 数据点中更新。

## 文件夹结构/对象
![适配器_概述](../../../en/adapterref/iobroker.sma-em/img/overview-en.png)

安装并启动适配器后，将创建如图所示的文件夹结构。 Energy Meter 的全部数据位于根文件夹中。如果已配置，则各个阶段的值位于子文件夹 L1-L3 中。
如果网络中有多个 Energy Meter 或 Sunny Home Manager，则每个设备的对象文件夹都在同一个 sma-em 实例中创建。

## 对象ID的解释
字母 p、q 和 s 源自电气工程，代表：

- P - 有功功率
- Q - 无功功率
- S - 视在功率

——这里的“regard”是“消费”的意思。 （从电网接收的电力）
——这里的“余”字就是“馈入”的意思。 （馈入电网的功率）
- 这里的“计数器”是指“能量计”。

由此，对象名称被放在一起，例如

- pregard - 从电网接收到的有功功率
- psurplus - 馈入电网的有功功率
- pregardcounter - 从电网接收到的有功功率的电能表
- qregard - 从电网接收到的无功功率
- ...

## Changelog
### 0.7.0 (2023-03-14)

- (pdbjjens) New: Configurable data point update intervals to reduce system load
- (pdbjjens) New: Use JSON config

### 0.6.6 (2023-02-28)  2023 maintenance release

- (pdbjjens) Updated dependencies
- (pdbjjens) New: Use adapter-dev instead of gulp translate

### 0.6.5 (2022-02-19)

- Updated dependencies
- Compatibility check for js-controller 4.0
- Prevent onUnload warnings

### 0.6.4 (2021-08-19)

- (TGuybrush) Bug fixes
- Prevent warnings regarding non-existent objects upon adapter instance creation and start-up under js-controller 3.2.x
- Improved check of SMA Energy Meter multicast messages to prevent ghost devices and warnings regarding unknown OBIS values.

### 0.6.3 (2021-03-04)

- (TGuybrush) The adapter binds now to all external IPv4 addresses.

## License

The MIT License (MIT)

Copyright (c) 2023 IoBroker-Community

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