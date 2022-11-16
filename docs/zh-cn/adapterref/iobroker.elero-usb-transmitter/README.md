---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.elero-usb-transmitter/README.md
title: ioBroker.elero-usb-transmitter
hash: +jchsQ7wvg3ef2f53maFtyqUjc+JBFjWfQ1PKo9sK3g=
---
![标识](../../../en/adapterref/iobroker.elero-usb-transmitter/admin/elero-usb-transmitter.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.elero-usb-transmitter.svg)
![下载](https://img.shields.io/npm/dm/iobroker.elero-usb-transmitter.svg)
![安装数量（最新）](http://iobroker.live/badges/elero-usb-transmitter-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/elero-usb-transmitter-stable.svg)
![已知漏洞](https://snyk.io/test/github/marc2016/ioBroker.elero-usb-transmitter/badge.svg)
![新PM](https://nodei.co/npm/iobroker.elero-usb-transmitter.png?downloads=true)

# IoBroker.elero-usb-transmitter
## 用于 ioBroker 的 elero-usb-transmitter 适配器
使用 Elero USB 发射器棒控制 Elero 设备的适配器。
您需要 USB 发射器棒，并且必须将现有的卷帘电机连接到棒。适配器会自动检测活动通道并添加设备。在设置中，您可以设置设备名称和更新间隔

## Changelog

### 0.5.2

- Missing translation for title and description added

### 0.5.1

- Translation added

### 0.5.0

- Translations added
- Ignore state changes with ack=true in onStateChanged handler
- messages handler removed
- node-scheduler package removed

### 0.4.0

- Added channel for connection info.

### 0.3.0

- Use only open state to controle devices.

### 0.1.0

- Transmission time removed and code clean up.

### 0.0.3"

- Log messages added.

### 0.0.2

- bug fixes

### 0.0.1

- initial release

## License

MIT License

Copyright (c) 2022 marc <marc@lammers.dev>

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