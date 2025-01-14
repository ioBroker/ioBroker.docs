---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ta-blnet/README.md
title: ioBroker.ta-blnet
hash: toqB4XA2zoRCMjH4AFYkafT1vyKsl+cT7eN9urhOvf4=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.ta-blnet.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ta-blnet.svg)
![安装数量](https://iobroker.live/badges/ta-blnet-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/ta-blnet-stable.svg)
![新平台](https://nodei.co/npm/iobroker.ta-blnet.png?downloads=true)

<img src="admin/ta-blnet.png" alt="标识" style="width:20%;" />

# IoBroker.ta-blnet
**测试：**![测试与发布](https://github.com/weberk/ioBroker.ta-blnet/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 ta-blnet 适配器
ioBroker 适配器，用于通过 BL-NET 从一台或最多八台气候控制器读取数据。或者将无限数量的气候控制器连接到 CMI。

安装后，您需要创建一个实例并配置自定义值，即实例应使用的 IP 地址、端口号和更新间隔。

请确保您拥有 BL-NET 设备或较新的 CMI 产品。

BL-NET 设备如下所示：![BL网络](../../../en/adapterref/iobroker.ta-blnet/doc/BL-NET.png) 您可以在此处找到 BL-NET 的手册：https://www.ta.co.at/fileadmin/Downloads/Betriebsanleitungen/00_Auslauftypen/BL-NET/Manual_BL-Net_V2.19-2_EN.pdf

CMI 设备如下所示：![BL网络](doc/CMI.png) 您可以在此处找到 CMI 的手册：[https://www.ta.co.at/download/datei/805](https://www.ta.co.at/download/datei/805)

## 适配器描述
适配器定期从加热控制系统读取当前数据。它通过以太网与以下设备建立联系：

- BL-NET 引导加载程序或
- CMI 控制和监控接口。

BL-NET 和 CMI 是“Technische Alternative”公司的产品，允许通过 CAN 总线或数据线总线读取和缓冲各种加热控制的数据。

＃＃ 安装
可以通过以下方式进行安装：

- **ioBroker GUI**: 进入专家模式 > 适配器 > 从 URL 安装并输入 `https://github.com/weberk/ioBroker.ta-blnet`
- **CLI**：运行以下命令：

```sh
iobroker url iobroker.ta-blnet@latest
```

## Changelog

<!--
Placeholder for next version:  ### **WORK IN PROGRESS**
-->
### 1.0.36 (2025-01-04)

- added CMI support to adapters summary description

### 1.0.35 (2024-12-22)

- port number is taken from config for communication with CMI

### 1.0.34 (2024-12-22)

- improved retry logic for requests to CMI

### 1.0.33 (2024-12-20)

- improved error handling for calls to CMI JSON API

### 1.0.32 (2024-12-19)

- introduced increasing wait time between successive CMI request attempts

### 1.0.31 (2024-12-18)

- removed port number constraint to allow port 80 for CMI

### 1.0.30 (2024-12-16)

- added eslint9 config, removed eslint8 config

### 1.0.29 (2024-12-13)

- added translation and documentation to data object config

### 1.0.28 (2024-12-13)

- improved JSON Status Code logging
- added data_objects per can_node to config for CMI requests

### 1.0.27 (2024-12-13)

- added additional sections processing to CMI mode

### 1.0.26 (2024-12-12)

- used uvr_type_code as capital letter string
- node name for channel is now 4 digid

### 1.0.25 (2024-12-10)

- improved error handling on CMI return codes
- improved node names

### 1.0.24 (2024-12-08)

- fixed lint errors

### 1.0.23 (2024-12-08)

- added initial CMI support

### 1.0.22 (2024-12-01)

- fixed negative current_heat_power

### 1.0.21 (2024-12-01)

- added 2DL reading
- renamed main class to TaBlnet and port to 'TA port'
- fixed negative current_heat_power

### 1.0.20 (2024-11-30)

- renamed adapter and git repo from ioBroker.uvr16xx-blnet to ioBroker.ta-blnet
- published new package to npm

### 1.0.19 (2024-11-29)

- removed onStateChange;
- streamlined object node names;
- improved node typing;
- explicitely created every node;
- improved outputs value filter;
- ensured calls to setObjectNotExistsAsync happen only once;
- removed data_frame_number parameter
- introduced limit for poll intervall
- removed obsolete react admin GUI settings and artefacts
- use this.setTimeout instead of this.setInterval
- finalized changes because of review findings

### 1.0.18 (2024-11-28)

- introduced multiple data_frame_reading and population of multiple devices in adapter object tree

### 1.0.17 (2024-11-26)

- added number of CAN frames to uvr_mode_str
- improved recognition of retry necessity on 'keep patient' messages from BL-NET

### 1.0.16 (2024-11-25)

- improved reading of flow rate
- code refactoring

### 1.0.15 (2024-11-24)

- refactorings and improved code documentation

### 1.0.14 (2024-11-23)

- added frame index to options

### 1.0.13 (2024-11-22)

- improved CAN bus mode reading

### 1.0.12 (2024-11-22)

- lint fixes

### 1.0.11 (2024-11-22)

- improved CAN bus mode reading

### 1.0.10 (2024-11-21)

- improved reading device info
- fixed handling of negative temperatures

### 1.0.9 (2024-11-21)

- improved logging and introduced a new socket for each command

### 1.0.8 (2024-11-21)

- improving logging in order to analyse system using CAN bus
- added retry for reading UVR HEADER in order to identify uvr_mode

### 1.0.7 (2024-11-19)

- testing deployment via "npm run release"

### 1.0.6 (2024-11-19)

- testing deployment via "npm run release"

### 1.0.5 (2024-11-17)

- improve build and deploy using github workflow (workflow>test-and-release.yml, ioBroker Check and Service Bot)
- added compliance with ioBrokers adapter repository (https://github.com/ioBroker/ioBroker.repositories?tab=readme-ov-file#how-to-publish-on-npm)

### 1.0.1 (2024-11-17)

- improve build and deploy

### 1.0.0 (2024-11-17)

- (Klaus Weber) initial release

### 0.0.1

- initial working version

## License

MIT License

Copyright (c) 2025 Klaus Weber <klausatweberesprit@gmail.com>

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