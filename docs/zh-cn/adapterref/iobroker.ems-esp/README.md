---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: 9hBDNYzVDZZYL38ZbRpOkFVFWncEVg88mGYU/94TEVg=
---
![标识](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![安装数量（最新）](https://iobroker.live/badges/ems-esp-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/ems-esp-stable.svg)
![新平台](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**测试：**![测试与发布](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## 带有 km200 / IP-inside 和/或 ems-esp 接口的 Bosch / Buderus 加热系统
该适配器支持使用 EMS 或 EMS+ 总线与博世集团的加热系统进行接口。
（博世 / 布德鲁斯 / 容克斯 / Netfit 等）。

## 适配器可以使用 API 调用与加热系统交互。支持的网关包括：
* km200、km200 hrv、km100、km50、HMC300 或 IP-inside（来自博世集团）

* 带有 ESP32 芯片的 ems-esp 网关（https://github.com/emsesp/EMS-ESP32）。

不再支持带有 API V2 的旧 ESP8266 网关！！该适配器已针对具有最新稳定固件版本的 ems-esp 网关进行了测试。最新开发版本的固件可能无法与 ioBroker 适配器稳定配合使用。使用风险自负。

* 不支持新的博世集团云网关（MX300 / EasyControl...），因为它们不支持 LAN API！

ioBroker ems-esp 适配器可以读取和写入两个网关的数据以控制所有加热组件。
它既可以用于原始 Bosch-Group 网关，也可以用于 ems-esp，或者同时用于两者。
所有来自自身脚本或对象浏览器的更改状态都必须设置 acknowledged = false !!!

德语文档：https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf

英文文档：https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf

德国 ioBroker 论坛：https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* dependabot updates

### 5.1.2 (2024-12-31)
* ems-esp: fix enum errors for setting "Value" 
* dependabot updates

### 5.1.1 (2024-12-26)
* correct statistics on adapter start-up

### 5.1.0 (2024-12-25)
* error correction on enabling statistics

### 5.0.6 (2024-12-03)
* dependabot updates
* ems-esp: send switchprog updates 3 times (test)

### 5.0.5 (2024-11-22)
* Add native entries to io-package

## License
MIT License

Copyright (c) 2025 Thomas Petrick <tp1degit@gmail.com>

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
*OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE."