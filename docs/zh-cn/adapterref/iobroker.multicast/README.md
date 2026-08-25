---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.multicast/README.md
title: ioBroker 的多播 API 适配器
hash: KU4BUtGyVANFwAVICfRb68GWFKRcE1QIyYZRdKvt8is=
---
![NPM 版本](http://img.shields.io/npm/v/iobroker.multicast.svg)
![下载](https://img.shields.io/npm/dm/iobroker.multicast.svg)
![安装数量（最新）](http://iobroker.live/badges/multicast-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/multicast-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/ioBroker.multicast.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.multicast/badge.svg)
![NPM](https://nodei.co/npm/ioBroker.multicast.png?downloads=true)

<h1>

<img  src="admin/multicast.png"  width="64" alt=""/>ioBroker.多播

</h1>

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

# IoBroker 的多播 API 适配器
该适配器提供基于组播通信协议的 API，用于向具有自定义固件的设备发送和接收状态。

该适配器的用途是：

* 提供 HTTP POST 和 MQTT 协议的替代方案
* 提供基于多播通信和 JSON 格式数据传输的统一 API
* 安装一个零接触适配器，以便集成任何以太网设备（例如：基于 ESP 的板卡 EQ Wemos D1 mini），如 Vansware/Gosound 智能插头或其他定制的自动化设备。

### 零接触？
该 API 的设计方式无需最终用户对适配器或设备进行任何额外配置。

如果使用 Wi-Fi 连接，则只需提供 Wi-Fi 凭据（基于 LAN 的设备将完全自动处理）。

这需要开发者编写二进制文件并将其刷写到相关的芯片组（例如基于 ESP 的芯片组）上。

当固件遵循 API 的所有规则（详见下文）时，通信处理方式如下：

* 设备通过 UDP 多播发送状态值
适配器识别此消息并检查 ioBroker 中是否存在此设备的状态。

#### 新设备
根据之前的消息，适配器指示未找到设备，将按以下步骤进行处理：

* ioBroker 发送广播消息以初始化设备
* 设备将所有状态和相关结构发送到 ioBroker
* ioBroker 创建新设备及所有必需状态
* 当所有状态都创建完毕后，ioBroker 会向设备发送握手信号，表示“已准备好接收数据”。
* 设备开始按时间间隔或通过变化发送其状态（由固件配置定义）

#### 现有设备重新连接
根据之前的消息，适配器指示设备已存在，将按以下步骤处理：

* ioBroker 检查配置是否设置为“恢复”
* 恢复功能激活后，ioBroker 会将所有状态（信息状态除外）发送到设备。
* 当所有状态都接收到后，设备会向 ioBroker 发送握手信号，表示“准备接收数据”。
* ioBroker 确认
* 设备开始按时间间隔或通过变化发送其状态（由固件配置定义）

#### 状态变化
该适配器设计为最多重试 5 次，以确保设备接收到所有状态更改。此过程按如下方式处理：

* ioBroker 中的状态已更改
适配器识别到数值变化后，会将新值发送给设备。
* 设备必须在 500 毫秒内确认消息
如果消息未得到确认，适配器将再次发送该值。
* 此操作最多会尝试 5 次，之后将显示错误消息，指示通信丢失。

### API 结构和文档
待完成/进行中

## 待办事项计划：
* [ ] 实现队列机制，设备状态改变后等待 20 毫秒，并发送包含所有状态更新的数组
* [x] 通过 API 实现过期值
* [x] 优化状态重试，不要每隔 500 毫秒就触发一次，增加排队时间
* [x] 如果收到 Harbert 且与设备的连接为 FALSE，则发送恢复数据
* [x] 实现状态（值列表的功能）
* [x] 正确处理主机名和主机名更改

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (DutchmanNL) Dependencies updated to current versions
* (DutchmanNL) Resolved remaining repository checker findings

### 0.2.0-ALpha.1
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings
* ([Andiling](https://github.com/andiling)) Expire value by API implemented
* (DutchmanNL) Rebuild retry functionality

### 0.1.6 (2021-03-23)
* (DutchmanNL) Dependency updates

### 0.1.5
* (Dutchman & Andiling) Stable-Release candidate

### 0.1.4
* (DutchmanNL) Fix Device Name
* (DutchmanNL) improved way of handling info channel values compatible with old firmware

### 0.1.3
* (Dutchman) Optimise state retry, don't fire every 500ms more queuing
* (Dutchman) Send recovery data if Harbeat is received and connection to device is FALSE
* (Dutchman) Implement states (capability for value list)

### 0.1.2
* (Dutchman) Optimise state retry, don't fire every 500ms more queuing
* (Dutchman) Correct handling of hostname and hostname changes

### 0.1.1
* (Dutchman) Send recovery data if Harbeat is received and connection to device is FALSE
* (Dutchman) Implement states (capability for value list)

### 0.1.0

* (Dutchman & Andiling) initial release

## License

MIT License

Copyright (c) 2021 Dutchman & Andiling

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