---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lorawan/README.md
title: ioBroker.lorawan
hash: +2AvOJrUWLBQdvNOzwMRYXj8fqtf7D2p6OcPUqw847k=
---
![标识](../../../en/adapterref/iobroker.lorawan/admin/lorawan.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.lorawan.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lorawan.svg)
![安装数量](https://iobroker.live/badges/lorawan-stable.svg)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![NPM](https://nodei.co/npm/iobroker.lorawan.png?downloads=true)

# IoBroker.lorawan
![测试与发布](https://github.com/BenAhrdt/ioBroker.lorawan/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 lorawan 适配器
该适配器通过 MQTT 协议，经由 LoRaWAN 网络服务器与 LoRaWAN 设备进行双向通信。

目前支持“Thinks Network”和“Chirpstack”，未来可能会支持更多设备。

该适配器由 Joerg Froehner（LoraWan@hafenmeister.com）合作开发。

文档 Wiki 在这里：https://github.com/BenAhrdt/ioBroker.lorawan/wiki<br/>目前英文文档可在此处找到：https://wiki.hafenmeister.de

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.22.31 (2026-07-09)
- (BenAhrdt) Add selection of ToIob source id

### 1.22.30 (2026-07-07)
- (BenAhrdt) Add PIR Mini device Profile
- (BenAhrdt) Add possibillity to ad states to downlink numbers

### 1.22.29 (2026-07-06)
- (BenAhrdt) Add some roles and units to assignhandler

### 1.22.28 (2026-07-05)
- (BenAhrdt) Add DewPointTemperature to assignhandler

### 1.22.27 (2026-07-04)
- (BenAhrdt) Bugfix warning for wrong id
- (BenAhrdt) Add Profile to downloadconfig

[Older changes can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 BenAhrdt <bsahrdt@gmail.com>  
Copyright (c) 2025-2026 Joerg Froehner <LoraWan@hafenmeister.com>

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