---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lorawan/README.md
title: ioBroker.lorawan
hash: oaqoou6vvpehAbAq3LqCQlfGuultuiw9HVLcvogU/Sg=
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

### 家庭助手传感器发现
对于数值型传感器实体，桥接器会根据适配器的计数器优先约定，为 Home Assistant 分配 `device_class` 和 `state_class` 属性。当前测量值使用 `measurement`。具有 ioBroker 角色 `value.direction.wind` 的风向状态使用设备类 `wind_direction` 和状态类 `measurement_angle`；保留现有单位，如果未定义单位，则添加 `°`。位于 `Wh`、`kWh` 或 `MWh` 中的能量值，以及由 ioBroker 能量或消耗角色标识的值，均被视为消耗计数器，并使用 `total_increasing` 进行 Home Assistant 能量统计。如果无法可靠地区分某个数量与消耗量，则桥牌倾向于使用反向语义：`m³` 和 `ft³` 分别发布为 `gas` 和 `total_increasing`，`L` 分别发布为 `water` 和 `total_increasing`。`mL` 和 `gal` 仍为通用值 `volume`。诸如 `ppm`、`ppb` 或 `µg/m³` 等含义模糊的浓度单位并不指代特定物质。 `L/min`、`L/s` 和 `m³/h` 使用 `volume_flow_rate`。

免责声明
商标和公司名称的权利仍归其所有者所有，与本适配器无关。适配器的运营者必须继续遵守合理使用原则。如果此仓库被 fork，则必须注明其为来源。

LoRa® 是 Semtech Corporation 或其关联公司的注册商标或服务标志。

LoRaWAN® 是注册商标。

我与文中提及的品牌及其子公司、标志或商标没有任何关联，也没有得到它们的认可。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.22.33 (2026-08-19)
- (BenAhrdt) Add Home Assistant wind direction and angle measurement classification

### 1.22.32 (2026-08-19)
- (BenAhrdt) Align Home Assistant sensor device classes, state classes, and units with the current specification

### 1.22.31 (2026-07-09)
- (BenAhrdt) Add selection of ToIob source id

### 1.22.30 (2026-07-07)
- (BenAhrdt) Add PIR Mini device Profile
- (BenAhrdt) Add possibillity to ad states to downlink numbers

### 1.22.29 (2026-07-06)
- (BenAhrdt) Add some roles and units to assignhandler

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