---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tapo/README.md
title: ioBroker.tapo
hash: RfiNbbyj4P5BGxOht9yHSwECxWi6Gi6dTc+McamHXX8=
---
![标识](../../../en/adapterref/iobroker.tapo/admin/tapo.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.tapo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tapo.svg)
![安装数量](https://iobroker.live/badges/tapo-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/tapo-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.tapo.svg)
![新PM](https://nodei.co/npm/iobroker.tapo.png?downloads=true)

# IoBroker.tapo
**测试：** ![测试和发布](https://github.com/TA2k/ioBroker.tapo/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 Tapo 适配器
TP-Link Tapo 适配器

基于 https://github.com/apatsufas/homebridge-tapo-p100

## 登录
Die Tapo Mail und Passwort eingeben。 Es werden die Geräte via Cloud abgerufen, aber lokal gesteuert。
Wenn die IP nicht gefunden wird muss sie manuell unter tapo.0.id.ip gesetzt werden。

## 斯图恩
tapo.0.id.remote auf true/false setzen steuert den jeweiligen Befehl。 Der Befehl wird lokal an das Gerät gesendet。

## 讨论和讨论
<https://forum.iobroker.net/topic/57336/test-adapter-tp-link-tapo/>

## Changelog

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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