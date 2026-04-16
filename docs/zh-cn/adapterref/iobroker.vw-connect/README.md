---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vw-connect/README.md
title: ioBroker.vw-connect
hash: uSySW6XTQD7Ml8Wf5ZMTTDDlxCoRRftoS2wshs7h1RI=
---
![标识](../../../en/adapterref/iobroker.vw-connect/admin/vw-connect.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.vw-connect.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vw-connect.svg)
![依赖状态](https://img.shields.io/david/ta2k/iobroker.vw-connect.svg)
![已知漏洞](https://snyk.io/test/github/ta2k/ioBroker.vw-connect/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vw-connect.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/ta2k/ioBroker.vw-connect/master.svg)

# IoBroker.vw-connect
## IoBroker 的 vw-connect 适配器
适用于大众 We Connect、We Connect ID、We Charge、myAudi、斯柯达 Connect、西雅特 Connect 和 We Connect Go 的适配器

请将您的系统更新至 Node 10。

<https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten>

＃＃ 用法
使用远程控制状态下的设置，即可远程控制您的车辆。

正常刷新是指从大众汽车集团 (VAG) 云平台接收数据的轮询间隔。强制刷新适用于非电动汽车，用于强制刷新数据。此刷新次数由大众汽车集团 (VAG) 限制，直至车辆再次启动。

行程数据仅适用于非电动汽车。

您可以在 .climate.settings.targetTemperature.content 中设置气候温度。

## 讨论和提问
<https://forum.iobroker.net/topic/26438/test-adapter-vw-connect-für-vw-id-audi-seat-skoda>

## 状态字段说明
### 条目列表
```

```

### 0.7.16 (2026-03-18)
- 修复 MySkoda MQTT 连接

### 0.7.15 (2025-11-26)
- 修复大众汽车刷新令牌

### 0.7.14 (2025-11-25)
- 修复大众汽车ID登录问题

### 0.7.13 (2025-11-09)
- 修复斯柯达登录问题

### 0.7.12 (2025-05-05)
- 修复了斯柯达刷新令牌的问题
- 修复通风系统启动问题
- 添加新的不支持的端点

### 0.7.9 (2025-03-20)
- 修复了墙式充电器的 ID 问题

### 0.7.7 (2025-03-02)
- 修复斯柯达辅助加热和持续时间问题
- 修复斯柯达车门锁/解锁问题

### 0.7.6 (2025-02-28)
- 修复了仅在启动时更新充电状态的问题
- 修复斯柯达 ismoving 状态

### 0.7.3 (2025-02-26)
- 修复了 setTemperature 的问题
- 修复斯柯达解锁锁问题

### 0.7.0 (2025-02-25)
- 斯柯达和西雅特车型的修复方案
- 状态结构已完全更改，请删除对象下的旧状态。

### 0.6.1 (2024-10-01)
- 修复斯柯达登录问题

### 0.6.0 (2024-04-11)
- 添加额外的铜矿状态

### 0.5.4 (2024-03-17)
- 修复门窗状态

### 0.4.1
- 修复大众汽车状态更新

### 0.0.65
修复 Cupra 登录问题

### 0.0.63
- 修复大众/斯柯达 etron 登录问题

### 0.0.62
修复奥迪etron登录问题

### 0.0.61
- 修复 ID 登录问题

### 0.0.60
- 一些小改进。WeCharge 的最小充电间隔现在为 15 分钟。

### 0.0.55
- 修复 ID 状态更新

### 0.0.51
- 修复奥迪etron登录问题

### 0.0.48
- 修复登录问题，修复音频更新问题，增加 Wallbox 的使用限制

### 0.0.43
- 增加刷新令牌超时时间

### 0.0.42
- 修复斯柯达登录问题

### 0.0.40
- 为新款车型添加气候控制v3功能。添加Powerpass和Seat Elli功能。

### 0.0.39
- 修复登录 ID

### 0.0.36
- 添加对斯柯达 Enyaq 的支持

### 0.0.35
- 添加对 NodeJS v10 的兼容性

### 0.0.34
- 添加自动接受新隐私同意的功能

### 0.0.32
- 正确选择最近几次旅行

### 0.0.31
- 启用多种行程类型的选择

### 0.0.30
- 修复多车问题，添加 VWv2 模式，目前 VW 和 VWv2 之间没有区别。

### 0.0.29
- 修复斯柯达 refreshToken 问题，以及其他一些小改进

### 0.0.26
- 修复错误

### 0.0.25
- 另加费用

### 0.0.24
- 添加远程状态更新

### 0.0.23
- 新增座椅和新的空调系统 v2

### 0.0.22
- 计算斯柯达和奥迪的室外温度（单位：摄氏度）

### 0.0.21
- 添加 ID 的远程控制

### 0.0.20
- 修复audi登录问题，添加ID登录

### 0.0.19
- 将状态对象按 ID 而不是连续数字保存到状态中

### 0.0.18
- 修复 2020 款车型的电池状态显示问题

### 0.0.17
- 增加对 2020 款机型的支持

### 0.0.16
- 修复 js.controller 3 的问题

### 0.0.11
- 修复奥迪车辆多车故障
- 如果功能不可用，则隐藏状态更新错误

## License

MIT License

Copyright (c) 2019-2030 ta2k <tombox2020@gmail.com>

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