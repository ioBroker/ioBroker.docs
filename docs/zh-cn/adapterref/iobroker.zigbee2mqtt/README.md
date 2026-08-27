---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zigbee2mqtt/README.md
title: ioBroker.zigbee2mqtt
hash: dNJPDuhlYAqNueqx4ywojqlYRdfXKduibo8H+XhjwgA=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.zigbee2mqtt.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zigbee2mqtt.svg)
![安装数量](https://iobroker.live/badges/zigbee2mqtt-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/zigbee2mqtt-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zigbee2mqtt.png?downloads=true)

<img src="admin/zigbee2mqtt.png" width="200" />

# IoBroker.zigbee2mqtt
**测试：** ![测试与发布](https://github.com/arteck/ioBroker.zigbee2mqtt/workflows/Test%20and%20Release/badge.svg) ![CodeQL](https://github.com/arteck/ioBroker.zigbee2mqtt/actions/workflows/codeql.yml/badge.svg?branch=main)

## IoBroker 的 zigbee2mqtt 适配器
该适配器允许控制 ioBroker 中 Zigbee2MQTT 实例的设备的数据点。

## 故障排除
如果在日志中看到一条消息“Caught by controller[1]: /opt/iobroker/node_modules/iobroker.zigbee2mqtt/node_modules/sharp/lib/sharp.js”，请检查您的虚拟机设置。

<img width="619" height="238" alt="图形" src="https://github.com/user-attachments/assets/83879925-96f8-4c33-a6cd-2b68e4b41780" /><img width="618" height="216" alt="图形" src="https://github.com/user-attachments/assets/30c33952-b055-4d6f-99d9-f7cc49831db3" /><img width="711" height="497" alt="图形" src="https://github.com/user-attachments/assets/803340a6-f000-4e64-b53f-8e80f2a13127" />

## 适配器文档
[适配器文档](https://github.com/arteck/ioBroker.zigbee2mqtt/blob/main/docs/wiki.md)

## Changelog
### 3.2.4 (2026-06-26)
* (arteck) Dependencies have been updated
*

### 3.2.3 (2026-06-25)
* (arteck) typo
* (arteck) fix some warnings
* (arteck) fix internal mqtt
* (arteck) fix languages

### 3.2.2 (2026-05-26)
* (arteck) Dependencies have been updated

### 3.2.1 (2026-05-05)
* (copilot) Adapter requires node.js >= 22 now
* (arteck) upd device manager
* (arteck) fix aedes-persistence
* (arteck) fix illuminance

### 3.2.0 (2026-04-26)
* (arteck) del deprectated setStateAsync

## License

MIT License

Copyright (c) 2025-2026 Arthur Rupp <arteck@outlook.com>,

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