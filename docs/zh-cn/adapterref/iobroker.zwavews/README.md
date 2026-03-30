---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zwavews/README.md
title: ioBroker.zwavews
hash: zpQOuWRa/PVC4Q3tAUfv6sFysg3YF58DjzTKdCNdv7I=
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

## 适配器文档
需要安装 zwave-js-ui（可以将 zwave2 设备迁移到 zwave-js-ui。将 /opt/iobroker/iobroker-data/zwave2/ 中的 json 缓存文件复制到 Z-Wave JS UI 的存储目录中，然后启动 zwave-js-ui），并激活 WS 通信。<br>从 zwave2 适配器切换到协调器很容易，因为所有信息都存储在协调器上。<br>您只需唤醒一次电池供电设备，以便 zwave-js-ui 可以再次读取它们或将其从 zwave2 迁移过来。<br>

<img width="1444" height="740" alt="图形" src="https://github.com/user-attachments/assets/876a81d3-04ab-43c6-914e-86772d0188e1" /><p></p>

在 `zwave-js-ui` 中激活 WS 服务器设置，我们使用 Home Assistant 设置来实现此目的：

<img width="1887" height="479" alt="图形" src="https://github.com/user-attachments/assets/6ed8cf36-2d91-435f-91d7-86e430bb0c6c" />

## Changelog
### **WORK IN PROGRESS**
* (arteck) add deviceManager

### 0.0.18 (2026-02-28)
* (arteck) add info.sendMessageAllowed object to allow sending the message to zwave-ui-js
* (arteck) add new checkbox to set info.sendMessageAllowed immediately after starting the adapter

### 0.0.17 (2026-02-20)
* (arteck) fix adapter start
* (arteck) Dependencies have been updated

### 0.0.16 (2026-02-09)
* (arteck) fix warning message

### 0.0.15 (2026-02-09)
* (arteck) typo
* (arteck) fix ready status if status is dead

### 0.0.14 (2026-02-09)
* (arteck) add event ready

### 0.0.13 (2026-02-07)
* (arteck) add event type "value notification"

### 0.0.12 (2026-02-01)
* (arteck) typo
* (arteck) fix dp channel name
* (arteck) add endpoint > 0 to value if exists

### 0.0.11 (2026-01-23)
* (arteck) fix dp types

### 0.0.10 (2026-01-17)
* (arteck) event value added

### 0.0.9 (2026-01-08)
* (arteck) convert status to lower case

### 0.0.8 (2026-01-06)
* (arteck) add warning message for inteview states

### 0.0.7 (2026-01-06)
* (arteck) add name if not in device info tree

### 0.0.6 (2026-01-06)
* (arteck) update title

### 0.0.5 (2026-01-06)
* (arteck) add online status

### 0.0.4 (2026-01-06)
* (arteck) fix overrideState

### 0.0.3 (2026-01-06)
* (arteck) fix title

### 0.0.2 (2026-01-06)
- (arteck) first release

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