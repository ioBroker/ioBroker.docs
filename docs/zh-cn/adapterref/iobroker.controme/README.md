---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.controme/README.md
title: ioBroker.controme
hash: xmYok2X8iUdUdS8sgIwcr1Pp5ueo2SW3ybxGWddh3Ls=
---
![标识](../../../en/adapterref/iobroker.controme/admin/controme.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.controme.svg)
![下载](https://img.shields.io/npm/dm/iobroker.controme.svg)
![安装数量（最新）](http://iobroker.live/badges/controme-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/controme-stable.svg)
![依赖状态](https://img.shields.io/david/MadErstam/iobroker.controme.svg)
![已知漏洞](https://snyk.io/test/github/MadErstam/ioBroker.controme/badge.svg)
![新平台](https://nodei.co/npm/iobroker.controme.png?downloads=true)

# IoBroker.controme
**测试：**![测试与发布](https://github.com/MadErstam/ioBroker.controme/workflows/Test%20and%20Release/badge.svg)

## Controme 迷你服务器的 ioBroker 适配器
使用官方 API 连接到本地 Controme 迷你服务器。

Controme 是一种供暖控制系统，您可以使用它来控制地板供暖、中央供暖系统、散热器或其他形式的气候控制。Controme 智能供暖系统的核心是 Controme 迷你服务器，这是一个基于 Raspberry Pi 的本地系统。有关 Controme 智能供暖系统的更多信息，请参阅[Controme 网站](https://www.controme.com/)。

该适配器定期从迷你服务器读取房间温度，并允许从 ioBroker 设置服务器上的设定温度。要使用此适配器，您需要让 Controme 激活 API。该适配器并非旨在取代 Controme UI，而是应提供基本数据和功能，以便将 Controme 与其他智能家居设备和服务集成在一起。

适配器为 Controme UI 中定义的每个房间提供以下数据：

| 对象 | 类型 | 描述 | 读/写 |
| --- | --- | --- | --- |
| 房间ID | 设备 | 每个房间都以其 Controme 房间 ID 和房间名称作为设备名称表示。| |
| roomID.actualTemperature | state | 房间的实际温度，角色为 level.temperature。此状态为只读。如果没有定义特定房间的室温传感器，则从 Controme mini 服务器返回的实际温度为空。| read |
| roomID.hydrity | state | 房间湿度，作用为 level.hydrity。此状态为只读。如果房间的传感器未检测到湿度，则此状态为空。| read |
| roomID.setpointTemperature | state | 房间的目标/设定点温度，具有 value.temperature 的角色。| 读/写 |
| roomID.setpointTemperaturePerm | state | 房间的永久目标/设定点温度，具有 value.temperature 的作用。| 读/写 |
| roomID.temperatureOffset | state | 房间的偏移温度，传感器测量值与房间的实际温度之间的差异。温度偏移值可以在 Controme UI 中手动设置，此外还可以通过各种 Controme 模块计算得出。| read |
| roomID.mode | state | 描述房间的运行模式，例如“加热”。| 读取 |
| roomID.is_temporary_mode | state | 表示对 setPointTemperature 的临时更改正在生效。| read |
| roomID.temporary_mode_end | state | 当房间处于临时模式时，此状态表示临时状态何时结束。如果没有临时状态处于活动状态，则此状态为空。| read |
| roomID.temporary_mode_remaining | state | 当房间的临时模式处于活动状态时，此状态表示临时状态处于活动的剩余秒数。如果没有临时状态处于活动状态，则此状态为空。对此状态的更改将反映回 Controme，并将更改临时模式的剩余时间，其中设定点温度在状态 setpointTemperate 中定义。| 读/写 |
| roomID.offsets | channel | 偏移量是从设定点室温中添加或减去的。此通道将属于相应房间的所有偏移量分组。| |
| roomID.offsets.[OFFSET-GROUP] | channel | 每个偏移源都由偏移所属房间的偏移通道内的专用通道表示。| |
| roomID.offsets.[OFFSET-GROUP].[OFFSET] | 状态 | 各个偏移状态代表 Controme 迷你服务器所做的不同调整。| 阅读 |
| roomID.offsets.api | channel | 这个偏移组很特殊，因为它的状态可以被写入并可以用来操纵实际的房间偏移。| |
| roomID.offsets.api.api | state | 此偏移状态由适配器默认创建。您可以使用它来操作实际的房间偏移。服务器每 10 分钟重置一次偏移值。| 读/写 |
| roomID.sensors | channel | 传感器提供与房间相关的实际测量值。此通道将分配给相应房间的所有传感器分组。| |
| roomID.sensors.[SENSOR-ID] | device | 每个传感器都由其被分配到的房间的传感器通道内的一个设备表示。| |
| roomID.sensors.[SENSOR-ID].isRoomTemperatureSensor | state | 此布尔状态表示传感器是否用作室温传感器。对于每个房间，只能使用一个传感器作为室温传感器。| read |
| roomID.sensors.[SENSOR-ID].actualTemperature | state | 此状态表示传感器测量的实际温度。该状态是读/写的，但只有 1Wire 传感器或虚拟传感器才会接受提供的值。如果您将值写入真实传感器，则下次读取时该值将被覆盖。| 读/写 |
| roomID.outputs | channel | 输出通常控制控制房间供暖的阀门。此通道将分配给相应房间的所有输出分组。| |
| roomID.outputs.[OUTPUT-ID] | state | 每个输出由其所属房间的输出通道内的状态表示。输出 ID 号表示网关上的输出编号。| read |
| gatewayMAC | device | 每个网关都以其 MAC 地址和网关名称作为设备名称表示。| |
| gatewayMAC.gatewayType | state | 网关类型，目前有四种网关：floor gateway smart、floor gateway pro、universal gateway mini、universal gateway pro。 | read |
| gatewayMAC.isUniversal | state | 指示网关是否为通用网关之一。来自通用网关的数据需要以不同的方式轮询。|
| gatewayMAC.outputs | channel | 输出通常控制控制房间供暖的阀门，用于地板网关或供暖室内的设备（泵、阀门）。此通道将相应网关的所有输出分组。| read |
| gatewayMAC.outputs.[OUTPUT-ID] | state | 每个输出都由其所分配到的网关的输出通道内的状态表示。输出 ID 号表示配置中设置的网关上的输出编号。| read |

可以在 Controme 网站上找到 [API 文档](https://support.controme.com/api/)。

要启动适配器，需要在适配器实例的管理设置页面中提供以下数据：

| 数据字段 | 类型 | 描述 |
| --- | --- | --- |
| url | text | Controme 迷你服务器的 URL。可以是 IP 地址或名称。|
| 房屋 ID | 号码 | Controme 安装的 ID。根据 API 文档，这应该是 1 或 2。|
| 间隔 | 数字 | 从服务器轮询数据的间隔（以秒为单位）。此值应介于 15 秒和 3600 秒之间。太低的值没有意义，因为 Controme 仅每 3-5 分钟更新一次传感器值。|
| forceReInit | checkbox | 如果选中此复选框，Controme 将清除 ioBroker 数据库中的对象结构并从服务器重新加载房间。仅当 Controme 服务器上的房间结构发生变化时才需要此设置。|
| warnOnNull | checkbox | 如果设置了此复选框，则当传感器返回 NULL 值时，适配器会写入日志警告。对于窗口传感器，返回 NULL 值是预期行为，但对于温度传感器，则表示存在连接问题。API 不允许辨别 |
| 用户名 | 文本 | 用于访问 Controme API 的用户名。这通常是主 Controme 用户的用户名。|
| 密码 | 密码 | 用于访问 Controme API 的用户密码。此密码已加密。|
| 网关 | 表 | 适配器应轮询数据的所有网关都必须配置三个值：|
| gateways.gatewayMAC | 字符串 | 单个网关的 MAC 地址。|
| gateways.type | string | 相应网关的类型。可以是 Floor Gateway Smart/Pro、Universal Gateway Mini 或 Universal Gateway Pro。|
| gateways.name | 字符串 | 相应网关的名称。|
| gatewayOutputs | table | 适配器应轮询数据的所有网关的所有输出都必须配置三个值：|
| gatewayOutputs.gatewayMAC | 字符串 | 单个网关的 MAC 地址。这必须与网关表中配置的网关 MAC 值之一匹配。请注意，目前，适配器不会验证网关 MAC 地址是否与网关表中配置的 MAC 地址匹配。因此，请注意网关 MAC 地址在两个表中都匹配。|
| gatewayOutputs.outputID | number | 应轮询的相应网关的输出 ID。对于小型网关，此数字必须是 1 到 8，对于其他网关，可以是 1 到 15。|
| gatewayOutputs.outputName | 字符串 | 网关各自输出的名称。|

## 待办事项
1.（进行中）测试，测试，测试
2. 经过全面测试后将适配器发布到稳定版

## 了解 Bug
1. ...

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.5.7 (2025-02-22)
* (MadErstam) Made adapter safe to handle different versions of API
* (MadErstam) Switched from got to axios for future compatibility

### 0.5.6 (2025-02-21)
* (MadErstam) Bugfixing regarding invalid API responses or invalid sensor values

### 0.5.5 (2025-02-20)
* (MadErstam) Bugfixing regarding async and promise

### 0.5.4 (2025-02-15)
* (MadErstam) Made sensor names safe
* (MadErstam) Bugfixing in getOutputs

### 0.5.3 (2024-11-27)
* (MadErstam) Various smaller bugfixes and improvements

### 0.5.2 (2024-11-25)
* (MadErstam) Make object IDs for offsets safe

### 0.5.1 (2024-11-06)
* (MadErstam) Minor bugfixing

### 0.5.0 (2024-11-05)
* (MadErstam) Added handling of temporary mode
* (MadErstam) Conducted code refactoring to improve readability and maintainability
* (MadErstam) Again moved admin translations to make it compatible with automatic translations

### 0.4.7 (2024-11-04)
* (MadErstam) Moved admin translations to separate files

### 0.4.6 (2024-11-04)
* (MadErstam) Added translations of admin form to Ukrainian

### 0.4.5 (2024-11-03)
* (MadErstam) Fixed remaining warnings of automated adapter checker

### 0.4.4 (2024-11-03)
* (MadErstam) Cleaned up warnings of automated adapter checker

### 0.4.3 (2024-11-03)
* (MadErstam) Cleaned up errors of automated adapter checker

### 0.4.2 (2024-11-02)
* (MadErstam) Preparations for adapter package release

### 0.4.1 (2024-11-02)
* (MadErstam) Preparations for adapter package release

### 0.4.0 (2024-10-31)
* (MadErstam) Extended api calls to include humidity and temporary mode states
* (MadErstam) Changed dependencies

### 0.3.4-alpha.2 (2022-06-01)
* (MadErstam) Added validation of setTargetTemp, setSetpointTemp, setActualTemp, setOffsetTemp values
* (MadErstam) Changed dependencies
* (MadErstam) Cleaning up

### 0.3.4-alpha.1 (2022-04-25)
* (MadErstam) Prepare for release

### 0.3.4-alpha.0 (2022-04-25)
* (MadErstam) Prepare for release

### 0.3.3 (2022-04-25)
* (MadErstam) Updated dependencies

### 0.3.2 (2022-04-25)
* (MadErstam) Prepare for release

### 0.3.1 (2022-04-25)
* (MadErstam) Cleaning up adapter, bugfixing, extended readme

### 0.3.0
* (MadErstam) Extended API polling (outputs, gateways)

### 0.2.4
* (MadErstam) Bugfixing

### 0.2.3
* (MadErstam) Bugfixing

### 0.2.2
* (MadErstam) Bugfixing in offset handling

### 0.2.1
* (MadErstam) Improved offset handling

### 0.2.0
* (MadErstam) Added sensors and offsets

### 0.1.2
* (MadErstam) Preparations for adapter package release

### 0.1.1
* (MadErstam) Minor bug fixes

### 0.1.0
* (MadErstam) initial release

## License
Copyright (c) 2025 MadErstam <erstam@gmx.de>

MIT License

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