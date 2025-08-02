---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nuki/README.md
title: ioBroker.nuki
hash: tssDUVscG1a2RiJ4PrJZeRDf+6LBX3lQOGdshxvJA8E=
---
![标识](../../../en/adapterref/iobroker.nuki/admin/nuki-logo.png)

![安装数量](http://iobroker.live/badges/nuki-installed.svg)
![稳定版本](http://iobroker.live/badges/nuki-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.nuki.svg)
![自上次发布以来的提交](https://img.shields.io/github/commits-since/smaragdschlange/ioBroker.nuki/latest.svg)
![下载](https://img.shields.io/npm/dm/iobroker.nuki.svg)
![新平台](https://nodei.co/npm/iobroker.nuki.png?downloads=true)

# IoBroker.nuki [![特拉维斯 CI](https://travis-ci.com/smaragdschlange/ioBroker.nuki.svg?branch=master)](https://travis-ci.com/smaragdschlange/ioBroker.nuki)
该 ioBroker 适配器允许使用 Nuki Bridge 的 API 来控制和监控[Nuki智能锁](https://nuki.io/de/)。

＃＃ 要求
* Nuki（硬件或软件）桥。
* Nuki 智能锁和/或 Nuki 开启器。
* ioBroker 的运行实例。

＃＃ 用法
Nuki 适配器的每个实例都代表一个 Nuki 桥。创建实例时，只需输入 Nuki 桥的 IP 地址、端口和令牌。名称是可选的，如果留空，将自动生成。复选框“使用回调”和值“ioBroker 中的回调端口”是可选的，可以设置以使用 Nuki 的回调功能。保存实例后，将创建一个桥接设备，其中包含连接到指定 Nuki 桥的每个 Nuki 锁的通道。通道提供 Nuki 锁的当前状态作为输出参数：

* batteryCritical: 电池电量低指示器
* deviceType：Nuki 设备的类型（智能锁或开启器）
* 模式：Nuki 设备的操作模式
* doorState：当前（数字）门传感器状态（Nuki 原生）
* lockState：指示 Nuki 是否被锁定（仅限 Nuki 智能锁）
* 状态：当前（数字）锁定状态（Nuki 原生）
* 时间戳：最后更新

此外，这些通道还提供输入参数，可实现对 Nuki 锁的基本控制：

* action：设置 Nuki 状态的数字操作代码（Nuki 原生）

锁的有效输入值为：

0（无动作） 1（解锁） 2（锁定） 3（解开闩锁） 4（锁定并进入） 5（锁定并进入，解开闩锁）

* lockAction：用于锁定/解锁 Nuki 的开关（true = 解锁；false = 锁定）
* openAction：用于解锁 Nuki 的按钮
* openLocknGoAction：用于解锁并在几秒后锁定 Nuki 的按钮
* unlockLocknGoAction：用于解锁的按钮，并在几秒后锁定 Nuki

开启器的有效输入值为：

0（无动作） 1（激活 rto） 2（停用 rto） 3（电动锁扣启动） 4（激活连续模式） 5（停用连续模式）

* rtoAction：用于激活/停用 Ring to Open 功能的开关（true = 激活；false = 停用）
* openAction: 电动锁扣启动按钮
* cmActiveAction：激活连续模式的按钮
* cmDeactiveAction：用于停用连续模式的按钮

＃＃ 附加信息
如何获取桥梁令牌：

* 从 LAN 中的任何浏览器调用 http://< bridge_ip >:< bridge_port >/auth -> 网桥打开其 LED
* 30秒内按下桥按钮
* 浏览器调用的结果应该是这样的：

{ "token": “token123”, "success": true } 回调函数：

如果正在使用回调函数，则适配器将尝试在保存实例时自动在 Nuki 桥上设置回调。卸载实例时，回调将再次被删除。激活回调后，Nuki 桥将使所有 Nuki 状态保持最新。
可以使用以下 URL 从任何浏览器设置和删除回调：

放：

* http://< bridge_ip >:< bridge_port >/callback/add?url=http%3A%2F%2F< host_ip >%3A< host_port >%2Fapi%2Fnuki&token=< bridgeToken >

消除：

* http://< bridge_ip >:< bridge_port >/callback/remove?id=< callback_id >&token=< bridgeToken >

＃＃ 更新
从 1.0.x 更新到 1.1.0 或更高版本时，建议在安装新版本之前删除旧版本的所有实例。请注意，版本更改大于补丁级别（-> 仅更改最后一位数字）可能始终包含对数据点的更改，例如 1.1.2 到 1.1.4。
更新到 2.x 时，必须再次输入令牌。

## Changelog

### 2.0.1
* (smaragdschlange) update: dependencie updates

### 2.0.0
* (simatec) jsonConfig added
* (simatec) dependency updated
* (simatec) devdependency updated
* (simatec) translate added
* (simatec) test and release added
* (simatec) Release Script added
* (simatec) Remove Travis

### 1.7.0
* (smaragdschlange) update: implementation of latest bridge API changes (battery charge state)

### 1.6.0
* (smaragdschlange) improvement: support for Nuki Smart Door and Nuki Smart Lock 3.0 (Pro)

### 1.5.0
* (smaragdschlange) bug fix: compatibility with jscontroller 3.3.13

### 1.4.4
* (smaragdschlange) update: changes to comply with admin 5.x.x requirements

### 1.4.3
* (smaragdschlange) update: dependency axios to >=0.21.1

### 1.4.2
* (smaragdschlange) bug fix: common.dataSource type had an invalid type

### 1.4.1
* (smaragdschlange) bug fix: references fixed

### 1.4.0
* (smaragdschlange) improvement: support of keypad battery state 
* (smaragdschlange) improvement: support of ring action states for opener

### 1.3.1
* (smaragdschlange) bug fix: some objects did not get updated

### 1.3.0
* (smaragdschlange) improvement: support of doorsensor states

### 1.2.3
* (smaragdschlange) bug fix: convert to template strings

### 1.2.2
* (smaragdschlange) bug fix: get device type by state name when not provided by bridge (software bridge)

### 1.2.0
* (smaragdschlange) improvement: support of hashed token (set to standard)
* (smaragdschlange) improvement: better use of delay before requests in order to prevent null messages

### 1.1.5
* (smaragdschlange) bug fix: clear all timeouts on unload

### 1.1.4
* (smaragdschlange) bug fix: object was not defined

### 1.1.3
* (smaragdschlange) bug fix: deviceType was undefined in case of Opener
* (smaragdschlange) bug fix: Opener action was not set

### 1.1.2
* (smaragdschlange) improvement: added bridge type as object
* (smaragdschlange) bug fix: force reset deviceType on adapter restart

### 1.1.1
* (smaragdschlange) bug fix: default to Nuki Lock when deviceType unknown

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

Copyright (c) 2018-2024 Smaragdschlange <smaragdschlange@gmx.de>

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