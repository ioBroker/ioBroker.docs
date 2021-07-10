---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tino/README.md
title: ioBroker.tino
hash: z+wiZ/y+sdVnU+uJ+GMOYAsNHn8nfPUr4zCLYb0CAA4=
---
![商标](../../../en/adapterref/iobroker.tino/admin/tino.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.tino.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tino.svg)
![依赖状态](https://img.shields.io/david/bowao/iobroker.tino.svg)
![已知漏洞](https://snyk.io/test/github/bowao/ioBroker.tino/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.tino.png?downloads=true)
![特拉维斯CI](https://img.shields.io/travis/com/bowao/ioBroker.tino/master)

# IoBroker.tino
## IoBroker TiNo 适配器
（德语版见下文）

读取通过 TiNo 协议版本 1.01 和 TiNo 协议版本 2.2 接收的无线传感器数据。
根据接收到的数据自动检测相应的协议版本。

无线收发器和接收器 TiNo 由 nurazur 开发。

项目页面：https://nurazur.wordpress.com/

Github：https://github.com/nurazur/TiNo

“**TI**ny **NO**de”：电池供电的无线传感器或无线角色。该项目的目标是开发小尺寸、具有成本效益的电池供电无线传感器。传感器与网关通信，如树莓派。目标是：

* 低成本（BOM 低于 5 欧元）
* 非常小的尺寸（火柴盒）
* 超低休眠电流
* 电池寿命长：CR2032 电池可使用 5 年以上
* 远程（这意味着什么:-)，但它真的很长）
* 构建简单
* 通讯安全
* 即插即用固件

传感器几乎可以是任何传感器，如温度、相对湿度、气压、高度计、光强度、紫外线指数、运动探测器、簧片开关等。

在适配器配置中，可以设置串行接口和相关的波特率。
激活学习模式后，将在接收到第一条消息后自动创建带有节点 ID 和所有已识别数据点的传感器。
学习模式会在 10 分钟后自动结束，并且可以通过数据点“learningMode”在“info”下重新激活 10 分钟。
相关的偏移数据点在“config”下创建，以便必要时可以更正传感器值。
计算的数据点绝对湿度和露点是在“计算”下创建的，但前提是传感器提供温度和相对湿度值。

将为接收器协议版本 1.01 创建以下数据点：

* 节点 ID
* RSSI
* 电池电压
* 消息计数器
* 温度
* 湿度
* 心跳（仅在协议版本 1.01 中）
* 中断 1、2 和 3
* 频率错误指示（仅在协议版本 1.01 中）
* RFM69 温度（仅在协议版本 1.01 中）
* 位错误

此外，为接收器协议版本 2.2（如果可用）创建了以下数据点。

* 中断 4 到 8
* 同步
* 链接质量指标
* 频偏
* 距离（仅安装距离传感器）
* 高度（仅安装高度传感器）
* 气压（仅安装气压传感器）
* 触点（仅安装簧片触点）
* 温度 1
* 温度 2

-------------------------------------------------------------------------------------------

## TiNo 适配器用于 ioBroker
Einlesen der vom TiNo Version 1.01 和 TiNo Version 2.2 empfangenen Funksensordaten。
Die entsprechende Protokoll-Version wird automatisch anhand der empfangen Daten erkannt。

Der Funksender und -empfänger TiNo wurden von nurazur entwickelt。

Projekt-Seite：https://nurazur.wordpress.com/

Github：https://github.com/nurazur/TiNo

“**TI**ny **NO**de”：Batteriebetriebener Funksensor 或 Funk-Aktor。 Ziel dieses Projekts ist die Entwicklung schnurloser Funk Sensoren, die über Batterien versorgt werden und z.B. mit dem Raspberry Pi kommunizieren。 Die Entwicklung hat zum Ziel：

* minimume Kosten (Stückkosten unter 5 EUR)
* 最小格罗斯（Streichholzschachtel）
*最小的Stromverbrauch
* maximale Batterielebensdauer (5 Jahre oder mehr)
* 最大帝国
* 最大 einfach nachzubauen
* 即插即用固件

Als Sensor kann man so ziemlich alles verwenden, ob Temperatur, Luftfeuchtigkeit, Luftdruck, Höhenmesser, Lichtintensität, UV Index, Anwesenheitssensoren, Magnetschalter, Erschütterungs-Sensoren, Feuchtigkeitsmesser usw also im Artenzip Sensor alle.

In der Adapter Konfiguration lässt sich die Serielle Schnittstelle und die zugehörige Baudrate einstellen。
Wenn der Anlermodus aktiviertist, werden die Sensoren nach dem ersten Nachrichten-Empfang automatisch mit ihrer Node-Id und allen erkannten Datenpunkten angelegt。
Der Anlernmodus wird nach 10 分钟。 automatisch bedet und kann unter "info" über den Datenpunkt "learningMode" für weitere 10 分钟。 erneut aktiviert werden。
Unter "config" werden die zugehörigen offset Datenpunkte erstellt, damit die Sensorwerte bei Bedarf korrigiert werden können。
Unter "calculated" werden die erechneten Datenpunkte Feuchte absolut und Taupunkt angelegt, jedoch nur wenn der Sensor die Werte Temperatur 和relative Feuchte liefert。

Folgende Datenpunkte werden für das Empfänger-Protokoll Version 1.01 angelegt：

* 节点 ID
* Signalstärke (RSSI)
* 电池组
* Nachrichtenzähler
* 温度
* 福希特
* 心跳（Protokoll 1.01 版中的 Nur）
* 中断 1 bis 3
* Frequenzfehler Indikator（Protokoll 1.01 版中的 Nur）
* RFM69 温度（Protokoll 1.01 版中的 Nur）
* 比特费勒

zusätzlich werden für das Empfänger-Protokoll Version 2.2 folgende Datenpunkte angelegt (wenn vorhanden)。

* 中断 4 至 8
* 同步
* 卡纳尔古特
* 频率转换
* Entfernung (Nur bei installiertem Entfernungssensor)
* Höhe (Nur bei installiertem Höhensensor)
* Luftdruck (Nur bei installiertem Luftdrucksensor)
* Reed-Kontakt (Nur bei installiertem Reed-Kontakt)
* 温度 1
* 温度 2

## Changelog
### 1.1.0
- Add TiNo Protocol V2.2 support
- (Add Datapoints temperature 1 and Temperatur 2)
- (max value of data point temperature increased to 600)
- Add connectionType and dataSource in io-package.json
- Add testing for Node.js 16

### 1.0.3
- Displays the interrupt value only for short time

### 1.0.2
- (AndrObe) Fix for negative temperature values
- (bowao) Update devDependencies

### 1.0.1
- fix bug in interrupt detection for protocol V2

### 1.0.0
- Update dependencies
- BREAKING CHANGE: Drop node 8 support, requires node 10 or above
- BREAKING CHANGE: js-controller v2.4.0 or above required

### 0.1.3
- Update travis.yml, License, Readme

### 0.1.2
- (bowao) learningMode set to true if not defined

### 0.1.1
- (bowao) New learning mode with 10min. auto-timeout

### 0.1.0
- (bowao) Add tino protocol V2.0 support
- (bowao) Add option to search new data points on already created sensors
- (bowao) Add calculated data points humidity_absolute and dew point

### 0.0.5
- (bowao) Add datapoints interrupt an heartbeat
- (bowao) Set default baudrate to 38400
- (bowao) Close serialport on unload and cleanup

### 0.0.4
- (bowao) Resize logo

### 0.0.3
- (bowao) Update readme

### 0.0.2
- (nurazur) Add logo

### 0.0.1
- (bowao) initial release

## License
MIT License

Copyright (c) 2021 bowao <cryolab@web.de>

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