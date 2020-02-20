---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nuki/README.md
title: ioBroker.nuki
hash: IFCxG7+BEae80E0Z4nCOc2h/bFT1gpT77yBDwio7Akg=
---
![商标](../../../en/adapterref/iobroker.nuki/admin/nuki-logo.png)

![安装数量](http://iobroker.live/badges/nuki-stable.svg)

＃ioBroker.nuki
此ioBroker适配器允许使用Nuki Bridge的API控制和监视[Nuki智能锁](https://nuki.io/de/)。

＃＃ 要求
* Nuki Smart Lock（显然）和Nuki（硬件或软件）网桥。
* ioBroker的运行实例。

##用法
Nuki适配器的每个实例都代表一个Nuki桥。创建实例时，只需输入Nuki网桥的IP地址，端口和令牌。该名称是可选的，如果留空则将自动生成。复选框“使用回调”和值“ ioBroker中的回调端口”是可选的，可以进行设置以便利用Nuki的回调功能。保存实例后，将创建一个桥设备，该桥设备具有一个通道，用于连接到指定Nuki桥的每个Nuki锁。通道提供Nuki锁定的当前状态作为输出参数：

*电池严重：电池电量低指示器
* lockState：指示Nuki是否已锁定（仅Nuki Lock）
*状态：当前（数字）锁定状态（Nuki本机）
*时间戳：最近更新

此外，通道还提供输入参数，可对Nuki锁进行基本控制：

* action：用于设置Nuki状态的数字操作代码（Nuki本机）

锁的有效输入值为：

0（无动作）1（解锁）2（锁定）3（解锁）4（锁定“ n”前进）5（锁定“ n”并解锁）

* lockAction：锁定/解锁Nuki的开关（true =解锁； false =锁定）
* openAction：用于解锁Nuki的按钮
* openLocknGoAction：解锁按钮，并在几秒钟后锁定Nuki
* unlockLocknGoAction：用于解锁并在锁定Nuki几秒钟后的按钮

开罐器的有效输入值为：

0（无动作）1（激活rto）2（禁用rto）3（电击致动）4（激活连续模式）5（取消连续模式）

* rtoAction：启用/禁用“打开振铃”功能的开关（true =激活； false =禁用）
* openAction：电击致动按钮
* cmActiveAction：用于激活连续模式的按钮
* cmDeactiveAction：用于禁用连续模式的按钮

＃＃ 附加信息
如何获取网桥令牌：

*从局域网中的任何浏览器调用http：// <bridge_ip>：<bridge_port> / auth-> bridge点亮其LED
*在30秒内按桥的按钮
*浏览器调用的结果应如下所示：

{“ token”：“ token123”，“ success”：true}回调函数：

如果使用了回调函数，则在保存实例时，适配器将尝试在Nuki桥上自动设置回调。实例卸载后，回调将再次被删除。激活回调时，Nuki桥将使所有Nuki状态保持最新。
可以使用以下网址从任何浏览器中设置和删除回调：

组：

* http：// <bridge_ip>：<bridge_port> / callback / add？url = http％3A％2F％2F <host_ip>％3A <host_port>％2Fapi％2Fnuki＆token = <bridgeToken>

去掉：

* http：// <bridge_ip>：<bridge_port> / callback / remove？id = <callback_id>＆token = <bridgeToken>

##更新
从0.1.x更新到0.2.0或更高版本时，建议在安装新版本之前删除所有旧版本的实例。请注意，版本更改大于补丁程序级别（->仅更改最后一位数字）可能始终包含对数据点的更改，例如0.1.3至0.2.0

## Changelog

### 1.1.0
* (smaragdschlange) improvement: support for Nuki Opener

### 1.0.7
* (smaragdschlange) bug fix: impact on other Nuki-connected gateways

### 1.0.6
* (smaragdschlange) dependencies update

### 1.0.5
* (ldittmar81) add gulp auto translation
* (smaragdschlange) add license

### 1.0.4
* (smaragdschlange) improvement: added Support for Compact mode (js-Controller 2.0 Feature)

### 1.0.3
* (smaragdschlange) bug fix: action buttons were not working properly

### 1.0.1
* (smaragdschlange) version synch

### 1.0.0
* (smaragdschlange) initial release on npm

### 0.2.0
* (smaragdschlange) periodic state updates added
* (smaragdschlange) restructure objects

### 0.1.3
* (smaragdschlange) timestamp bug fixed

### 0.1.2
* (smaragdschlange) minor bugfixes
* (smaragdschlange) added delay before each Nuki request to avoid null responses

### 0.1.1
* (smaragdschlange) callback will be removed when instance is unloading

### 0.1.0
* (smaragdschlange) callback finally working
* (smaragdschlange) added another State

### 0.0.6
* (smaragdschlange) additional states/actions and improved compatibility (callback still not completely working)

### 0.0.5
* (smaragdschlange) added support for nuki bridge callback (web server still to be added)

### 0.0.4
* (smaragdschlange) added input parameter for lock actions

### 0.0.3
* (smaragdschlange) bug fixes and restructure

### 0.0.2
* (smaragdschlange) added input parameters

### 0.0.1
* (smaragdschlange) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Smaragdschlange <smaragdschlange@gmx.de>

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