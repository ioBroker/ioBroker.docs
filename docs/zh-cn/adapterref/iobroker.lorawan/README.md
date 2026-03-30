---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lorawan/README.md
title: ioBroker.lorawan
hash: sMZfwV8TUXXWa4qLliB0sgdbz+aEsEcCI6vT/aASaxo=
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

## 免责声明
商标和公司名称的权利仍归其所有者所有，与本适配器无关。

适配器的运营者必须继续遵守合理使用原则。

如果此仓库被 fork，则必须注明其为来源。

LoRa® 是 Semtech Corporation 或其关联公司的注册商标或服务标志。

LoRaWAN® 是注册商标。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.21.8 (2026-03-04)
* (BenAhrdt) update icons

### 1.21.7 (2026-03-04)
* (BenAhrdt) update logic for icons and link building

### 1.21.6 (2026-03-04)
* (BenAhrdt) change logic for TTN link and change base ip handling
* (BenAhrdt) set more devices at default

### 1.21.5 (2026-03-04)
* (BenAhrdt) implements link to Chirpstack / TTN

### 1.21.4 (2026-03-03)
* (BenAhrdt) update the updateBridge function in objectStore
* (BenAhrdt) improve LoraWAN and ToIob funkction (init / update)

### 1.21.3 (2026-03-02)
* (BenAhrdt) add Link to ToIoB Devices

### 1.21.2 (2026-03-02)
* (BenAhrdt) update icon for device link

### 1.21.1 (2026-03-02)
* (BenAhrdt) bring possibility for editing base ip in devce Manager

### 1.21.0 (2026-03-02)
* (BenAhrdt) update deviceManager (dm-utils) to 3.0.0
* (BenAhrdt) add Links for Bridge devices

### 1.20.57 (2026-03-02)
* (BenAhrdt) bugfix query for null

### 1.20.56 (2026-03-02)
* (BenAhrdt) implement deviceId Handling from bridge

### 1.20.55 (2026-03-02)
* (BenAhrdt) catch publishing value (null) and log warning for this id

### 1.20.54 (2026-02-27)
* (BenAhrdt) update dependencies
* (BenAhrdt) bugfix button press

### 1.20.53 (2026-02-21)
* (BenAhrdt) errorhandling in case of aggregat error with mqtt connection

### 1.20.52 (2026-02-20)
* (BenAhrdt) bugfix show ToIob always in device Manager
* (BenAhrdt) correction of wording in downlink Profil Vicki
* (BenAhrdt) add role button.mode.startMotorcalibration

### 1.20.51 (2026-02-14)
* (BenAhrdt) including of more entites in ToIob functionality (light, climate, hummidifier, lock, cover)

### 1.20.50 (2026-02-10)
* (BenAhrdt) implements light to ToIoB function

### Older entries
[here](OLD_CHANGELOG.md)

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