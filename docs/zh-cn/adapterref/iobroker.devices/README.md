---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.devices/README.md
title: ioBroker.devices
hash: g74lUY4Rg6o5il6Prtz1MtTUYQbwszxqKGBRra9rHHo=
---
![标识](../../../en/adapterref/iobroker.devices/admin/devices.svg)

![安装数量](http://iobroker.live/badges/devices-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.devices.svg)
![下载](https://img.shields.io/npm/dm/iobroker.devices.svg)

# IoBroker.devices
![测试与发布](https://github.com/ioBroker/iobroker.devices/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/devices/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## IoBroker 的设备适配器
管理和创建设备，以便在其他适配器（例如 Material、IoT、Matter 等）中使用。

**重要提示：请在后台管理界面启用日志和脚本选项卡**

![屏幕](../../../en/adapterref/iobroker.devices/img/screen.png)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## IoBroker.devices 适配器用户手册
＃＃＃ 概述
`ioBroker.devices` 适配器是 ioBroker 智能家居平台的一个组件，旨在通过创建和管理虚拟设备来简化设备管理。

这些虚拟设备为物理设备提供了标准化的接口，使得跨不同制造商和协议集成、编写脚本、可视化和控制设备变得更加容易。

该适配器可确保数据点命名和结构的一致性，从而减少硬件变更时修改脚本或可视化效果的需要。

它将ioBroker中的任何状态集合（物理状态**或**虚拟状态）封装成格式良好的**设备**，并包含丰富的信息：

* `type`、`role`、`smartName`、`color`、`room`、`function`、`icon`、`unit` 等等

最终结果可供仪表盘（Material UI、VIS-2）、语音助手（Alexa/Google）、Matter 适配器、**物联网/云**适配器和脚本使用，从而为您提供一个清晰、面向未来的对象树。

**注意：**该适配器**不**轮询硬件。它以仅显示标签页的“网页”实例运行→零CPU/内存占用。

＃＃＃ 目的
`ioBroker.devices` 适配器用于以下用途：

- 标准化：创建具有一致数据点结构的虚拟设备，无论底层硬件或协议如何，来自不同数据点。
- 简化维护：允许用户通过重新映射适配器中的数据点来更换物理设备，而无需更新脚本或可视化。
- 增强兼容性：与可视化适配器（例如 Material UI、VIS）、物联网适配器（例如 Alexa、Google Home）无缝集成。
- 用户友好：简化了初学者的设备管理，同时为高级用户提供了灵活性。

#### 标准化
许多适配器，例如 MQTT、KNX 或类似适配器，会以不同的名称和结构提供数据点。此适配器创建了一个具有一致结构的虚拟设备，从而更易于管理和可视化设备。

它会自动为状态添加角色、单位和名称。

#### 简化维护
`ioBroker.devices`适配器允许用户创建虚拟设备，这些虚拟设备可以轻松地重新映射到不同的物理设备。

这意味着，如果您更换了物理设备，则无需更新脚本、可视化或历史记录设置；只需在适配器中重新映射数据点即可。

#### 增强兼容性
适配器知道设备的外观和使用方法。它会创建一个与物理设备结构相同的虚拟设备，从而更容易与其他适配器集成。

＃＃＃＃ 方便使用的
`ioBroker.devices`适配器设计简洁易用，既方便初学者上手，又为经验丰富的用户提供高级功能。直观的界面使用户无需掌握丰富的技术知识即可创建和管理虚拟设备。

＃＃ 配置
安装完成后，通过 ioBroker 管理界面中的“设备”选项卡配置适配器。

### 创建虚拟设备
打开管理后台的“设备”选项卡。

#### 添加设备
- 点击“+”按钮创建新的虚拟设备。
- 输入设备名称（例如，“客厅灯”）。
- 从预定义列表中选择设备类型（例如，灯、开关、恒温器）。
- （可选）为组织分配一个类别（例如，照明、供暖）。

地图数据点：

对于每个功能（例如，开/关、亮度），将虚拟设备的数据点映射到物理设备的相应状态（例如，Homematic 开关的 `hm-rpc.0.12345.1.STATE`）。

使用该界面浏览和选择其他适配器中的状态。

保存：点击“保存”按钮创建虚拟设备。它将出现在“对象”选项卡中的别名 alias.0.<设备名称> 下。

#### 设备类型
`ioBroker.devices` 适配器支持三种主要的设备创建方法：

1. 自动检测到的设备

某些适配器（例如 ioBroker.zigbee、ioBroker.hm-rpc）已为设备提供了有效的结构，如果已分配类别（功能或房间），则会自动检测到这些设备。

如果没有分配类别，则不会处理自动检测到的设备。

2. 关联设备

链接设备是手动创建的虚拟设备，用于镜像特定物理设备的数据点，其值为 `ioBroker.linkeddevices`。

建议使用 `ioBroker.devices` 和 `alias.0` 分支，而不是 `linkeddevices` 分支。

3. 别名

别名是轻量级的虚拟设备，可以作为现有状态的快捷方式或简化引用，而无需创建完整的设备结构。

您可以在 `alias.0` 分支中创建一个新的虚拟设备。选择设备类型后，您需要填写所有必需状态（标有 *）。您也可以选择添加非必需状态（例如，通过温度传感器获取湿度）。

对于每个必需状态和已填写的可选状态，适配器都会创建一个别名结构。

例如，如果您创建了一个名为 `Temperature` 的温度设备，并提供了温度和湿度两种状态，您将在 `alias.0` 分支中找到以下状态和通道：

- `alias.0.Temperature` - 通道
- `alias.0.Temperature.temperature` - 单位为“°C”的状态。它应该与某个具有实际温度值的状态建立虚拟链接。如果您在 `ioBroker.devices` 适配器中移除此别名，则此状态将保持断开连接的状态。
- `alias.0.Temperature.humidity` - 单位为“%”的状态。它将与实际状态（例如，`hm-rpc.0.JHAGHGJJJ.1.HUMIDITY`）建立虚拟链接。如果您在 `ioBroker.devices` 适配器中移除别名，则此状态将被删除。

几乎每种设备类型都可以有额外的状态（指示器），用于指示电池电量、连接状态、错误状态以及其他一些状态。这些状态是可选的，但某些适配器（例如，`material` 或 `matter`）可以对其进行解析。

对于每个州，您可以提供别名支持的所有设置：

- 读写状态不同
- 转换读写公式

#### 设备管理
编辑设备：在“设备”选项卡中，单击设备旁边的铅笔图标，即可修改其名称、类型、类别、颜色、名称、图标或数据点映射。

删除设备：点击垃圾桶图标即可移除虚拟设备。此操作不会影响物理设备或其适配器。

整理设备：使用类别对设备进行分组（例如，“照明”、“供暖”），以便在可视化中更轻松地进行管理。

## 设备类型
此适配器由 `type-detector` 构建。所有可能的设备均可找到 [这里](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md)

＃＃ 视频
[![视频](https://img.youtube.com/vi/0Aecm5YAk7M/0.jpg)](https://www.youtube.com/watch?v=0Aecm5YAk7M)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.7 (2026-04-09)
* (@GermanBluefox) Added new widgets

### 2.0.6 (2026-03-31)
* (@GermanBluefox) Corrected the layout for visualisation

### 2.0.5 (2026-03-26)
* (@GermanBluefox) Added many new widgets.

### 2.0.3 (2026-03-24)
* (@GermanBluefox) Added widgets' visualisation. Now it is possible to create a GUI within the adapter

### 1.2.14 (2026-02-06)
* (@GermanBluefox) Correcting the scrolling on the touch devices
* (@GermanBluefox) Fixing a problem with `ACTUAL` state
* (@GermanBluefox) Correcting the hover effect under safari

### 1.2.12 (2026-02-04)
* (@GermanBluefox) Show in color if fx is not empty
* (@GermanBluefox) Added for all text fields the clear button

### 1.2.9 (2025-09-08)
* (@GermanBluefox) Created for newly created states of devices the full name and not just last part, like `ACTUAL`

### 1.2.8 (2025-07-21)
* (@GermanBluefox) Corrected error in GUI

### 1.2.7 (2025-06-14)
* (@GermanBluefox) Replaced icon for the state import
* (@GermanBluefox) Corrected the edit dialog

### 1.2.6 (2025-04-29)
* (@GermanBluefox) Type-detector updated
* (@GermanBluefox) Execute the conversion formula on the current value
* (@GermanBluefox) Better categories selector
* (@GermanBluefox) Corrected device importer

### 1.2.4 (2025-04-27)
* (@GermanBluefox) Corrected many GUI issues

### 1.2.1 (2025-04-22)
* (@GermanBluefox) Updated logo
* (@GermanBluefox) Updated type-detector

### 1.2.0 (2025-04-20)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Used vite
* (@GermanBluefox) Used eslint-config of ioBroker
* (@GermanBluefox) Rewritten to TypeScript and corrected all known bugs (Except extension requests)

### 1.1.5 (2023-06-06)
* (Garfonso) fixed: problem with editing imported states
* (Garfonso) fixed: warning
* (Garfonso) fixed: enabling iot again (without setting a custom smartName)
* (Garfonso) fixed: possible crash / typo in 1.1.3.

### 1.1.4 (2023-06-06)
* (bluefox) Updated packages

### 1.1.3 (2023-05-16)
* (bluefox) Better behavior of category selection

### 1.1.2 (2022-11-09)
* (Garfonso) corrected the double states in light devices
* (Garfonso) added CIE color type as equivalent to `rgbSingle` type

### 1.1.1 (2022-11-03)
* (bluefox) Corrected delete dialog
* (bluefox) Added ukrainian translation

### 1.1.0 (2022-09-27)
* (bluefox) Migrated GUI to v5

### 1.0.12 (2022-06-09)
* (bluefox) Allowed to work with devices behind reverse proxy
* (bluefox) Replaced the function icon

### 1.0.11 (2022-06-08)
* (bluefox) Updated some libraries

### 1.0.10 (2022-02-13)
* (bluefox) Corrected edit of folders
* (bluefox) Updated some libraries

### 1.0.9 (2021-07-11)
* (bluefox) Implement the narrow rows

### 1.0.8 (2021-07-04)
* (bluefox) Corrected creation of the devices

### 1.0.7 (2021-06-30)
* (bluefox) Corrected creation the folders

### 1.0.6 (2021-06-27)
* (bluefox) Implemented the filters

### 1.0.5 (2021-06-26)
* (bluefox) Implemented the edit of `states` parameter

### 1.0.4 (2021-06-08)
* (bluefox) Fixed some GUI errors

### 1.0.1 (2021-06-07)
* (bluefox) Added sentry

### 1.0.0 (2021-06-07)
* (bluefox) Added new devices

### 0.3.16 (2021-03-11)
* (bluefox) Fixed the error for IDs with the strange characters

### 0.3.15 (2020-12-13)
* (bluefox) Updated the select ID dialog

### 0.3.13 (2020-08-17)
* (bluefox) Fixed errors by optional states

### 0.3.12 (2020-08-16)
* (bluefox) added the vacuum cleaner

### 0.3.10 (2020-08-12)
* (bluefox) added the air conditioner

### 0.3.6 (2020-04-17)
* (Apollon77) Added Sentry error reporting for Frontend/React

### 0.3.5 (2020-04-17)
* (Apollon77) Fixed typo

### 0.3.4 (2020-03-24)
* (bluefox) Fixed error by device creation

### 0.3.2 (2020-02-09)
* (Apollon77) usage with all kinds of admin ports and reverse proxies optimized

### 0.3.1 (2020-02-09)
* (Apollon77) compatibility with Admin >4.0.0 added

### 0.2.0 (2019-12-20)
* (bluefox) Backend was removed

### 0.1.8 (2019-11-13)
* (bluefox) Allowed the clone of devices

### 0.1.7 (2019-09-15)
* (bluefox) work in progress

### 0.1.2 (2019-09-04)
* (bluefox) work in progress

### 0.1.0 (2019-08-31)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019-2026 bluefox <dogafox@gmail.com>

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