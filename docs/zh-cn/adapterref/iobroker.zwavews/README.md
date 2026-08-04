---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zwavews/README.md
title: ioBroker.zwavews
hash: Jzz1xQZ/yZ3i20BwMrCmoH/VqcEeBrAzoBtWjXCGoK8=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.zwavews.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zwavews.svg)
![安装数量](https://iobroker.live/badges/zwavews-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/zwavews-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zwavews.png?downloads=true)

<img src="admin/zwavews.png" width="200" />

# IoBroker.zwavews
**测试：** ![测试与发布](https://github.com/arteck/ioBroker.zwavews/workflows/Test%20and%20Release/badge.svg) ![CodeQL](https://github.com/arteck/ioBroker.zwavews/actions/workflows/codeql.yml/badge.svg?branch=main)

## IoBroker 的 zwave-WS 适配器
`zwavews` 适配器将 [`zwave-js-ui`](https://zwave-js.github.io/zwave-js-ui/#/) 连接到 ioBroker，并为设备、值和状态创建相应的数据点。这使得 Z-Wave 设备可以方便地用于可视化、逻辑和自动化。

＃＃＃ 特征
* **实时通信**：通过 WebSocket 或 MQTT 即时接收设备值和状态的更新。
* **自动发现**：从 `zwave-js-ui` 节点自动创建和更新 ioBroker 中的设备和状态结构。
* **设备管理**：直接从 ioBroker 界面查看电池电量、连接状态和详细的设备指标。
* **固件更新**：通过适配器的日志和状态直接观察固件更新进度。
* **状态控制**：通过 ioBroker 对象树原生发送命令和更新值。
* **支持多种协议**：您可以使用 WebSocket、外部 MQTT 或内部虚拟 MQTT 服务器连接到 `zwave-js-ui`。

## 适配器文档
需要安装 zwave-js-ui（可以将 zwave2 设备迁移到 zwave-js-ui。将 /opt/iobroker/iobroker-data/zwave2/ 中的 json 缓存文件复制到 Z-Wave JS UI 的存储目录中，然后启动 zwave-js-ui），并激活 WS 通信。<br>从 zwave2 适配器切换到协调器很容易，因为所有信息都存储在协调器上。<br>您只需唤醒一次电池供电设备，以便 zwave-js-ui 可以再次读取它们或将其从 zwave2 迁移过来。<br>

<img width="1444" height="740" alt="图形" src="https://github.com/user-attachments/assets/876a81d3-04ab-43c6-914e-86772d0188e1" /><p></p>

在 `zwave-js-ui` 中激活 WS 服务器设置，我们使用 Home Assistant 设置来实现此目的：

<img width="1887" height="479" alt="图形" src="https://github.com/user-attachments/assets/6ed8cf36-2d91-435f-91d7-86e430bb0c6c" />

### **正在进行中**
* (arteck) 修复重新连接 ws

## Changelog
### 1.0.4 (2026-07-23)
* (arteck) reconnect optimization
* (arteck) notification handling
* (arteck) fix energy values

### 1.0.3 (2026-07-15)
* (arteck) fix thermostat set point

### 1.0.2 (2026-07-15)
* (arteck) fix notification messages (check you scripts)

### 1.0.1 (2026-07-15)
* (arteck) fix bulb set color
* (arteck) add delete null states button into adapter settings

### 1.0.0 (2026-07-08)
* (arteck) add notification

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Arthur Rupp <arteck@outlook.com>,

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