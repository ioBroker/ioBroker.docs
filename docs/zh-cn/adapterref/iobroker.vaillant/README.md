---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vaillant/README.md
title: ioBroker.vaillant
hash: k9BpmGloXbMyoDS+FBzvqKGDSzZzftDtDpX1+W57qp4=
---
![标识](../../../en/adapterref/iobroker.vaillant/admin/vaillant.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.vaillant.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vaillant.svg)
![安装数量（最新）](http://iobroker.live/badges/vaillant-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/vaillant-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.vaillant.svg)
![已知漏洞](https://snyk.io/test/github/TA2k/ioBroker.vaillant/badge.svg)
![新PM](https://nodei.co/npm/iobroker.vaillant.png?downloads=true)

# IoBroker.vaillant
## IoBroker 的 vaillant 适配器
威能 multiMatic VR900/VR920 适配器

＃＃＃ 入门
在 den Instanzoptionen 邮件和密码 der multimatic /senso app eingeben。

配置 können geändert werde in dem sie unter dem Unterpunkt 配置 angepasst werden。 Manche configuration werden erst angewendet wenn der Modus auf ON oder MANUAL ist und nicht AUTO oder TIME_CONTROLLED

## **贝斯皮尔：**
**Warmwasser**：vaillant.0.serialnummer.systemcontrol/tli.dhw.hotwater.configuration.hotwater_temperature_setpoint **Heizung**：Erst auf MANUAL vaillant.0.serialnummber.systemcontrol/tli.zones03.heating.configuration.operation_mode MANUAL Dann die Temperatur vaillant.0.serial.systemcontrol/tli.zones03.heat.configuration.manual_mode_temperature_setpoint Und am Ende operation_mode auf TIME_CONTROLLED

参数 können über den Punkt parameterValue angepasst werden dabei beachten welche Werte im Objekt 定义 erlaubt sind。

## Changelog
### 0.0.15

-   bugfixes
### 0.0.14

-   add rooms support
### 0.0.13

-   fix livereport order
### 0.0.11

-   fix issue with js-controller 3.2
### 0.0.10

-   fix issue with js-controller 3

### 0.0.8

-   (TA2k) Fix Authorization problem and missing configuration states

### 0.0.6

-   (TA2k) initial release

## License

MIT License

Copyright (c) 2020 TA2k <tombox2020@gmail.com>

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