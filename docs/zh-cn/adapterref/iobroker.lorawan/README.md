---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lorawan/README.md
title: ioBroker.lorawan
hash: mBAY+nBFksMkwrSN+wskFlL+vKx7miJ5PR5A7FluxOY=
---
![标识](../../../en/adapterref/iobroker.lorawan/admin/lorawan.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.lorawan.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lorawan.svg)
![安装数量](https://iobroker.live/badges/lorawan-installed.svg)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![国家公共管理](https://nodei.co/npm/iobroker.lorawan.png?downloads=true)

# IoBroker.lorawan
![测试与发布](https://github.com/BenAhrdt/ioBroker.lorawan/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 lorawan 适配器
该适配器通过 LoRaWAN 网络服务器通过 MQTT 协议与 LoraWan 设备进行双向通信。
现在支持“The Thinks Network”和“Chirpstack”，以后可能会支持更多。
适配器是与 Joerg Froehner 合作创建的 LoraWan@hafenmeister.com

对于文档，请使用 doc 文件夹。
目前这里有英文文档：http://www.hafenmeister.com/LoraWan/Iobroker-Adapter.pdf

## 免责声明
商标和公司名称的权利归其所有者所有，与此适配器无关。
适配器运营商必须继续遵守公平使用政策。
如果此存储库是分叉的，则必须将其引用为源。

LoRa® 是 Semtech Corporation 或其附属公司的注册商标或服务标志。

LoRaWAN® 是一个许可商标。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (BenAhrdt) some more functions

### 0.3.4 (2024-02-20)
* (BenAhrdt) put some debug and silly logging to code

### 0.3.3 (2024-02-19)
* (BenAhrdt) set infos into native

### 0.3.2 (2024-02-16)
* (BenAhrdt) wording recieved => received in messageing

### 0.3.1 (2024-02-15)
* (BenAhrdt) rebuild with better messageing

### 0.3.0 (2024-02-15)
* (BenAhrdt) define user friendly Blockly Blocks with result

### 0.2.1 (2024-02-13)
* (BenAhrdt) check types of messaging values and implements more blockly blocks

### 0.2.0 (2024-02-12)
* (BenAhrdt) more functionality in messageing

### 0.1.13 (2024-02-12)
* (BenAhrdt) building of directory changed and message implemented

### 0.1.12 (2024-02-09)
* (BenAhrdt) default value crc config bug fixed

### 0.1.11 (2024-02-09)
* (BenAhrdt) min / max values for downlink-configs (number)

### 0.1.10 (2024-02-08)
* (BenAhrdt) default of crc changed

### 0.1.9 (2024-02-07)
* (BenAhrdt) crc calculation improoved

### 0.1.8 (2024-02-07)
* (BenAhrdt) implement crc calculation

### 0.1.7 (2024-02-06)
* (BenAhrdt) change filter on statechange

### 0.1.6 (2024-02-05)
* (BenAhrdt) implments byte swap

### 0.1.5 (2024-02-02)
* (BenAhrdt) remove units and insert roles

### 0.1.4 (2024-02-01)
* (BenAhrdt) change input of length and validate hex inputs

### 0.1.3 (2024-02-01)
* (BenAhrdt) change internal Base devices

### 0.1.2 (2024-01-31)
* (BenAhrdt) concept of config changed

### 0.1.1 (2024-01-30)
* (BenAhrdt) reduceing calling changeInfo > create expersettings to send downlinks with uplink

### 0.1.0 (2024-01-26)
* (BenAhrdt) removing downlink/configuration path and first tests of send downlink with uplink

### 0.0.18 (2024-01-25)
* (BenAhrdt) remove wrong warn logging

### 0.0.17 (2024-01-25)
* (BenAhrdt) changed Handling of standard configurations

### 0.0.16 (2024-01-22)
* (BenAhrdt) romeve reacheble object directory / improoved object === NULL

### 0.0.15 (2024-01-21)
* (BenAhrdt) bugfix chirpstack directory at downlink queued

### 0.0.14 (2024-01-21)
* (BenAhrdt) bugfix chirpstack directory

### 0.0.13 (2024-01-21)
* (BenAhrdt) change device id selecting in chirpstack out of directory (for downlink queued)

### 0.0.12 (2024-01-21)
* (BenAhrdt) change flow of downlink

### 0.0.11 (2024-01-20)
* (BenAhrdt) toSend und lastSend added to folders

### 0.0.10 (2024-01-19)
* (BenAhrdt) changes in length calculation

### 0.0.9 (2024-01-19)
* (BenAhrdt) first version for beta

### 0.0.8 (2024-01-18)
* (BenAhrdt) first implementation of chirpstack

### 0.0.7 (2024-01-17)
* (BenAhrdt) hex to Upper case, more units for decoded payload values

### 0.0.6 (2024-01-16)
* (BenAhrdt) insert whole translation for config and move some functions

### 0.0.5 (2024-01-15)
* (BenAhrdt) delete not configed states at startup

### 0.0.4 (2024-01-15)
* (BenAhrdt) implements buttons and standard downlink control ind json (push / replace)

### 0.0.3 (2024-01-14)
* (BenAhrdt) first config for downlinks inputed

### 0.0.2 (2024-01-12)
* (BenAhrdt) initial release

## License
MIT License

Copyright (c) 2024 BenAhrdt <bsahrdt@gmail.com>
Copyright (c) 2024 Joerg Froehner <LoraWan@hafenmeister.com>

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