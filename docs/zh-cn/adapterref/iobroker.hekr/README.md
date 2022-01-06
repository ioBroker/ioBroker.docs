---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hekr/README.md
title: ioBroker.hekr
hash: /5C1XJSnWxGJjGbsjCn9PIRw6CU+e2Dt+QNrFoYSmY8=
---
![标识](../../../en/adapterref/iobroker.hekr/admin/hekr.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.hekr.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hekr.svg)
![安装数量](https://iobroker.live/badges/hekr-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/hekr-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.hekr.svg)
![新产品管理](https://nodei.co/npm/iobroker.hekr.png?downloads=true)

# IoBroker.hekr
**测试：** ![测试和发布](https://github.com/TA2k/ioBroker.hekr/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 hekr 适配器
Hekr Wisen Elro 应用程序的适配器

## 登录名
Die Wisen App Mail 和 Passwort eingeben。

## Befehle im lokalen Netzwerk senden
Befehle werden im lokalen Netzwerk an das Gerät gesendet。

##斯图恩
Einschalten/Ausschalten hekr.0.{ID}.status.sw auf 1 oder 0 setzen hekr.0.{ID}.status.light_Sw auf 1 oder 0 setzen hekr.0.{ID}.status.Statue 0 = Aus, 1 = Standby, 2 = Licht an / L�after an hekr.0.{ID}.status.cleaning auf 0 stzen l�scht die Info Filterwechsel.
hekr.0.{ID}.status.rgb Wechselt die Farbe der Haube。 Nur Hex erlaubt Bsp。 #65ff00 oder 65ff00 hekr.0.{ID}.status.speed Geschwindigkeit 1, 2, 3 和 4 m.glich。
hekr.0.{ID}.status.time Zeit von IOBroker wird �bertragen。
hekr.0.{ID}.status.tm_Minutes Automatische Abschaltung Wert 1-60 m.glich hekr.0.{ID}.status.B Kann nicht gesteuert werden。 Anzeige der aktuelle Farbe。
hekr.0.{ID}.status.G Kann nicht gesteuert werden。 Anzeige der aktuelle Farbe。
hekr.0.{ID}.status.R Kann nicht gesteuert werden。 Anzeige der aktuelle Farbe。
hekr.0.{ID}.status.fitter 1 muss der Kohlefilter gewechselt oder gereinigt werden。

## 讨论和 Fragen
<https://forum.iobroker.net/topic/48262/test-adapter-hekr-wisen-elro-app-v0-0-x>

## Changelog

### 0.0.3

* (TA2k) initial release

## License

MIT License

Copyright (c) 2021 TA2k <tombox2020@gmail.com>

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