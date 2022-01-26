---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: o04OO9LDv6ceGFyCmuMYEXkwyoaesyhuZY70xjz9wE4=
---
![标识](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![安装数量（最新）](https://iobroker.live/badges/tesla-motors-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/tesla-motors-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)
![新产品管理](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
**测试：** ![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

##特斯拉适配器为ioBroker
Es werden alle Tesla Modelle 和 Powerwalls aus der Tesla App angezeigt und aktualisiert。

**Remote Befehle für Tesla und Powerwall sind möglich unter** tesla-motors.0.id.remote

**登录：**

- 在 den Instanzoptionen den Auth Link klicken。
- Die Logindaten eingeben und gegebenenfalls Captcha/reCaptcha 和 MFA eingeben。
- Auf der Page not Found Seite die komplette URL aus dem Browser kopieren und in die Instanzoptionen einfügen und auf Speichen und Schließen klicken。
- Die ersten Daten kommen unter Umständen erst nach der ersten Fahrt

**字段说明**

- df 驱动程序前端
- 司机后方博士
- pf 前排乘客
- 公关乘客后方
- 英尺前行李箱
- rt 后备箱

[选项代码 Erklärung](https://tesla-api.timdorr.com/vehicle/optioncodes)

## Fragen 和 Diskussionen：
https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0

## Changelog

### 1.0.2
* (iobroker-community-adapters) ALLE DATENPUNKTE SIND NEU, Vis muss angepasst werden. Neue Version mit neuen Zuständen für Tesla und Powerwalls.

## License
MIT License

Copyright (c) 2021 iobroker-community

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