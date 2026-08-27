---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.helios/README.md
title: ioBroker.helios
hash: aLHvTFftXrhYG9JsAVweaQyMa8O6Me8byCb00XAYof0=
---
![标识](../../../en/adapterref/iobroker.helios/admin/helios.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.helios.svg)
![下载](https://img.shields.io/npm/dm/iobroker.helios.svg)
![安装数量（最新）](https://iobroker.live/badges/helios-installed.svg)
![安装数量（稳定版）](https://iobroker.live/badges/helios-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.helios.svg)
![NPM](https://nodei.co/npm/iobroker.helios.png?downloads=true)

# IoBroker.helios
**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.helios/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 helios 适配器
Helios KWL 简易控制

通过向可写数据点写入值，可以执行远程命令。

需要更新的数据点：

1：初始调试 (inbetr.htm) 2： 3：派对模式/静音模式 (party.htm + ruhe.htm) 4：当前风扇转速/模式 (info.htm) 5：预热程序 (nachheiz.htm) 6：假期程序 (urlaub.htm) 7：设备数据/序列号等 (tinfo.htm) 8：系统状态（运行模式、风扇转速、当前温度） (anzeig.htm) 9：每周程序 (woche.htm) 10：网络设置（IP、DNS 等） (web.htm) 11：预热时间/运行小时数等 (syst.htm) 12：设备配置/更换过滤器/旁通控制 (gaer.htm) 13：风扇电压 (luft.htm) 14：传感器配置 (fueh.htm) 15：更改密码 (lost.htm) 16: 错误概览 (fehl.htm) 17: 931:

## 讨论和提问
https://forum.iobroker.net/topic/47762/test-helios-kwl-v0-0-x

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-05-10)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now

### 0.1.0 (2024-04-17)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 0.0.1
* (iobroker-community-adapters) initial release

## License
MIT License

Copyright (c) 2021-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>

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