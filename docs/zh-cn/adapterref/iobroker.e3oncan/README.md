---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: vEBrkfqHrqBSbeIUwbEUTd8tq02mqKlDEBKtSa2iXyc=
---
![标识](../../../en/adapterref/iobroker.e3oncan/admin/e3oncan_small.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.e3oncan.svg)
![下载](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)
![安装数量](https://iobroker.live/badges/e3oncan-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/e3oncan-stable.svg)
![新平台](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)

# IoBroker.e3oncan
**测试：**![测试与发布](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 e3oncan 适配器
# 基本概念
Viessmann E3系列设备（One Base）在CAN总线上进行大量的数据交换。

该适配器可以监听此通信并提取许多有用信息。还支持电表 E380CA 和 E3100CB。这种操作模式称为**收集**。

同时支持**读取和写入数据点**。可以主动请求通过监听无法获得的信息。通过写入数据点，可以更改设定点、计划等。甚至可以添加新的计划，例如用于家用热水循环泵。这种操作模式称为**UDSonCAN**。其他设备（例如著名的 WAGO 网关）也使用 UDSonCAN 协议（基于 CAN 总线的**通用**诊断**服务）。

数据写入通过存储相应状态（`Acknowledged` 未选中（ack=false））来触发 - 是的，就这么简单！写入后 2.5 秒，数据点将再次从设备读取并存储在该状态中。如果状态未得到确认，请查看日志。

使用**白名单**将写入限制到一组数据点。该列表存储在每个设备的信息部分，例如`e3oncan.0.vitocal.info.udsDidsWritable`。您可以通过编辑此状态来添加更多数据点。请确保在保存状态时**不要**检查`Acknowledged`。
某些数据点即使列入白名单也无法更改。然后，设备返回“否定响应”代码。在这种情况下，适配器会使用另一个服务重复写入过程。这仅适用于内部 CAN 总线。但是，这种方法也可能失败。一般来说，应始终检查写入过程。

适配器实例首次启动时，将进行设备扫描，提供配置对话框中所有可用 E3 设备的列表（未列出电能表）。
应在首次设置期间扫描每个 E3 设备的数据点，详情见下文。

可以使用哪些操作模式（收集和/或 UDSonCAN）取决于您的**设备拓扑**。更多信息请参见[这里](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34)。

对于可能的**用例**，请参阅此[讨论](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35)（正在建设中）。

本适配器的重要部分基于项目[open3e](https://github.com/open3e)。

还可以使用基于 Python 的、使用 MQTT 消息传递的纯监听方法（仅收集）实现，请参阅[E3onCAN](https://github.com/MyHomeMyData/E3onCAN)。

＃ 入门
**先决条件：**

* 您有一个 (USB 到) CAN 总线适配器连接到 Viessmann E3 设备的外部或内部 CAN 总线
* 目前仅支持基于 Linux 的系统。
* CAN 适配器已启动并在系统中可见，例如“can0”（使用 ifconfig 检查）。
* 更多详细信息请参阅 [open3e 项目](https://github.com/open3e/open3e/wiki/020-Inbetriebnahme-CAN-Adapter-am-Raspberry)
* **确保初始设置期间没有其他 UDSonCAN 客户端（例如 open3e）正在运行！** 这可能会导致两个应用程序出现通信错误。

此适配器提供的所有服务均基于您特定的 Viessmann E3 设置的设备列表。因此，您必须按照以下步骤进行首次设置：

**配置**

* 适配器安装完成后，将显示一个配置对话框，用于配置最多两个 CAN 总线适配器（标签“CAN ADAPTER”）
* 编辑 CAN 适配器的名称，并至少为一个 CAN 适配器选中“连接到适配器”复选框
* 完成后，按“保存”按钮应用更改。此步骤是**必需的**。实例将重新启动并连接到 CAN 适配器。
* 转到“UDS 设备列表”选项卡，然后按扫描按钮扫描总线上可用的设备。**这将需要几秒钟。**您可以通过查看适配器的日志信息在第二个浏览器选项卡中观察活动。
* 您可以在第二列更改设备的名称。这些名称将用于将所有收集的数据存储在 ioBoker 的对象树中。完成更改后再次按“保存”按钮。
* 实例将再次重新启动，几秒钟后您就可以扫描可用的数据点。转到“数据点列表”选项卡，按下“开始扫描...”按钮，然后单击“确定”确认。**请耐心等待** - 这可能需要**最多 5 分钟**。您可以通过查看适配器的日志信息在第二个浏览器选项卡中查看进度。

此步骤不是强制性的，但强烈建议执行。如果您想要写入数据点，则需要先进行数据点扫描。

* 数据点扫描成功完成后，每个设备的对象树中都会显示数据点。您可以选择设备并按下“更新数据点列表”按钮来查看配置中的数据点。按下过滤符号并输入搜索模式以过滤名称和/或编解码器。这仅供您参考。请在选择其他设备之前停用过滤功能以避免出现错误消息。
* 最后一步是在“分配给 UDS CAN ADAPTER”选项卡上配置请求数据的时间表。
* 对于**能量计**（如果您的设置中可用），您可以激活或不激活。请注意“最小更新时间（秒）”的值。单个数据点的更新不会比给定值更快（默认值为 5 秒）。通过选择零，将存储所有收到的数据。由于能量计发送数据的速度非常快（每秒超过 20 个值），因此建议不要在此处使用零。这会给 ioBroker 系统带来很高的负载。
* 如果您已通过 CAN 总线连接 E3 设备，例如 Vitocal 和 VX3，则可以通过监听实时收集这些设备之间交换的数据。按“+”添加一行，选中“活动”复选框，选择一个设备并编辑“最小更新时间（秒）”。这里可以使用 0 秒，但我建议将其设置为 5 秒。
* 最后，您可以添加通过 UDSonCAN 协议请求数据的时间表。再次按下“+”按钮并编辑设置。每个设备上可以有多个时间表。这样，您可以比其他数据点更频繁地请求某些数据点。“时间表”的默认值为 0，表示在实例启动期间只会请求一次这些数据点。

您可以使用“数据点列表”选项卡上的数据点信息作为参考（打开第二个选项卡可能会有帮助）。

* 如果您已配置连接到**第二条 CAN 总线**的 CAN 适配器，则可以看到“分配给第二条 CAN 适配器”选项卡。请在那里配置要收集的设备。
* 就是这样。按“保存并关闭”按钮并检查对象树中收集的数据。

# E380 数据和单位
最多支持两个 E380 电能表。数据点的 ID 取决于设备 CAN 地址：

CAN-address=97：偶数 ID 的数据点

CAN-address=98：具有奇数 ID 的数据点

| ID | 数据| 单位|
| ------|:--- |------|
| 592,593 | 有功功率 L1、L2、L3、总计 | W |
| 594,595 | 无功功率 L1、L2、L3、总计 | var |
| 596,597 | 绝对电流，L1，L2，L3，cosPhi | A，- |
| 598,599 | 电压，L1，L2，L3，频率 | V，Hz |
| 600,601 | 累计进出口 | 千瓦时 |
| 602,603 | 总有功功率，总无功功率 | W, var |
| 604,605 | 累计进口量 | 千瓦时 |

#E3100CB 数据和单位
| ID | 数据| 单位|
| ------|:--- |------|
| 1385_01 | 累计进口量 | kWh |
| 1385_02 | 累计输出 | kWh |
| 1385_03 | 状态： -1 => 进料 \| +1 => 供应 | |
| 1385_04 | 有功功率总计 | W |
| 1385_08 | 有功功率 L1 | W |
| 1385_12 | 有功功率 L2 | W |
| 1385_16 | 有功功率 L3 | W |
| 1385_05 | 无功功率总计 | var |
| 1385_09 | 无功功率 L1 | var |
| 1385_13 | 无功功率 L2 | var |
| 1385_17 | 无功功率 L3 | var |
| 1385_06 | 电流，绝对 L1 | A |
| 1385_10 | 电流，绝对 L2 | A |
| 1385_14 | 电流，绝对 L3 | A |
| 1385_07 | 电压，L1 | V |
| 1385_11 | 电压，L2 | V |
| 1385_15 | 电压，L3 | V |

# 提示和限制
## 为什么要并行使用数据收集（模式 Collect）和 UDSonCAN？
* 连接 E3 设备后，您就可以从交换的数据中获益（[更多详细信息](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34)）。只需监听，您就可以在变化时实时收到可用数据。因此，您可以在每次变化时直接获得快速变化的数据（例如能量流值）和缓慢变化的数据（例如温度）。您可以随时了解这些值。
* 其他无法或很少通过收集获得的数据，您可以通过 UDSonCAN ReadByDid 添加。通常对于设定点数据，这是最佳方法。
* 因此，从我的角度来看，两种方法的结合是最好的方法。

## 收集数据的限制
* 目前，仅 Vitocal（内部 CAN 上的 CAN id 0x693 上的监听器）、Vitocharge VX3 和 Vitoair（外部 CAN 和内部 CAN 上的 CAN id 0x451 上的监听器）知道该通信协议。

## 与 open3e 项目有何不同？
* 显然，主要区别在于直接集成到 ioBroker。配置可以通过对话框完成，数据直接列在对象树中。
* 除了 open3e 之外，还支持通过监听实时收集数据。
* 写入数据更加简单，只需在相应状态下更改数据，然后按保存按钮即可。
* 无需通过 MQTT 交换数据。但是，当然可以通过配置数据状态来实现。

## Open3e 可以并行使用吗？
是的，在某些条件下这是可能的：

* 如果您在这里只使用数据收集，那么您可以无限制地使用 open3e。
* 如果您在此处使用 UDSonCAN，请务必不要对与 open3e 相同的设备执行此操作。如果您这样做，您将遇到偶尔的通信错误。

## 捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/bluePayPal.svg" height="40"></a>如果你喜欢这个项目 — — 或者只是觉得慷慨，可以考虑给我买杯啤酒。干杯！:beers:

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.10.8 (2025-03-07)
* (MyHomeMyData) Bugfix for issue #117
* (MyHomeMyData) Updated data point 381, refer to discussion https://github.com/open3e/open3e/discussions/212
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250307

### 0.10.7 (2025-02-26)
* (MyHomeMyData) Updated dependencies according to issue #111

### 0.10.6 (2025-02-19)
* (MyHomeMyData) Added missing enum info for data point 2850

### 0.10.5 (2025-02-18)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250217
* (MyHomeMyData) Updated dependencies according to issues #101 and #108

### 0.10.4 (2025-01-15)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250114

### 0.10.3 (2024-11-26)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20241125

### 0.10.2 (2024-11-16)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20241115
* (MyHomeMyData) Fixes for issue #81 (added missing size attributes)

### 0.10.1 (2024-10-20)
* (MyHomeMyData) Fixes for issue #79 (improvements for usability on mobile devices)

### 0.10.0 (2024-10-14)
* (MyHomeMyData) Added extended support for writing of data points.
* (MyHomeMyData) Changed naming for CAN adapter.

### 0.9.5 (2024-09-19)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240916

### 0.9.4 (2024-08-26)
* (MyHomeMyData) Start up an UDS worker for each device to allow writing of data points even when no schedule for reading is defined on this device
* (MyHomeMyData) Update of npm dependencies

### 0.9.3 (2024-08-20)
* (MyHomeMyData) Bugfix: Updating UDS communication statistics, even in case of persistent timeout events
* (MyHomeMyData) Disabled sinon should interface
* (MyHomeMyData) Fixes based on issues #55,#56
* (MyHomeMyData) Bugfix: Time delta between schedules of UDS workes was not working properly

### 0.9.2 (2024-08-09)
* (MyHomeMyData) Update of dependencies, fixes based on issue #53
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240808

### 0.9.1 (2024-05-26)
* (MyHomeMyData) Updated README, added links for description of device topology and to uses cases
* (MyHomeMyData) Added info for data points 2404_BivalenceControlMode and 2831_BivalenceControlAlternativeTemperature
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240505

### 0.9.0 (2024-04-21)
* (MyHomeMyData) Structure of data point 1690 (ElectricalEnergySystemPhotovoltaicStatus) changed based on issue https://github.com/MyHomeMyData/E3onCAN/issues/6. Manual adaptations may be needed, please check!
* (MyHomeMyData) Update of list of data points for E3 devices to version 20240420
* (MyHomeMyData) Added support for energy meter E3100CB
* (MyHomeMyData) Update of list of data points for E380 to version 20240418
* (MyHomeMyData) Main change for E380 id 600/601 (GridEnergy): Now using correct data format. Many thanks to @M4n197 for unveiling the right data format. Manual adaptations may be needed, please check!

### 0.8.0 (2024-03-22)
* (MyHomeMyData) Added support for energy meter E380 with CAN-address=98
* (MyHomeMyData) Update of list of data points for E380 to version 20240320

### 0.7.2 (2024-03-20)
* (MyHomeMyData) Update of data type and role added for device specific data points
* (MyHomeMyData) Update list of writable data points when updating data points to newer version
* (MyHomeMyData) Improved handling of failed CAN communication during scan for data points
* (MyHomeMyData) Update of list of data points to version 20240319

### 0.7.1 (2024-03-15)
* (MyHomeMyData) Bugfix for data point 1190: Scaling changed back to 10.0
* (MyHomeMyData) Update of list of data points to version 20240314

### 0.7.0 (2024-03-13)
* (MyHomeMyData) Store numbers in states of channel "tree" with type "Number" instead of "String"
* (MyHomeMyData) IMPORTANT: This may affect handling of tree states, e.g. in scripts, vis and history
* (MyHomeMyData) Bugfix for Energy Meter E380 data point id 0x25C
* (MyHomeMyData) Update of list of data points to version 20240309
* (MyHomeMyData) Bugfix for update of changed data point structure during start of adapter
* (MyHomeMyData) Changed default values for CAN adapters to can0 and can1
* (MyHomeMyData) Increased value for collect timeout to 2000 ms

### 0.6.19 (2024-02-19)
* (MyHomeMyData) Check for changed structure of data points during startup
* (MyHomeMyData) Update of list of data points to version 20240218
* (MyHomeMyData) Bugfix to avoid warnings on very first start of adapter

### 0.6.18 (2024-02-08)
* (MyHomeMyData) Added versioning to list of data points and check for updates on start of adapter
* (MyHomeMyData) Added optional description in configuration of UDS schedules

### 0.6.17 (2024-01-29)
* (MyHomeMyData) Added/removed data points to/from list of writable dids
* (MyHomeMyData) Preparations for device specific list of writable dids

### 0.6.16 (2024-01-27)
* (MyHomeMyData) Improvements based on findings in review as of 2024-01-25
* (MyHomeMyData) Checkbox for data collectiton on internal bus is now checked per default

### 0.6.15 (2024-01-23)
* (MyHomeMyData) Fix for Utf8 codec for handling of special characters, e.g. umlauts

### 0.6.14 (2024-01-22)
* (MyHomeMyData) Replace '.' by '_' in data point ids to avoid unwanted sub structure in data states
* (MyHomeMyData) Added more informations about white list for writables in Readme.
* (MyHomeMyData) Recognize loss of CAN connection.
* (MyHomeMyData) Improved handling of info.connection.

### 0.6.13 (2024-01-20)
* (MyHomeMyData) Now supports multiple definitions of same schedule on a device 
* (MyHomeMyData) Added unit test cases for codecs

### 0.6.12 (2024-01-19)
* (MyHomeMyData) Added data points to list writable dids
* (MyHomeMyData) Added unit test cases for codecs
* (MyHomeMyData) Improved speed of codes for numerical values
* (MyHomeMyData) Improved error messages on UDS negative response

### 0.6.11 (2024-01-17)
* (MyHomeMyData) Improved layout of configuration dialog for device scan

### 0.6.10 (2024-01-15)
* (MyHomeMyData) Removed code for Rawmode because it's never activated

### 0.6.9 (2024-01-13)
* (MyHomeMyData) Bugfix: Only Linux is supported

### 0.6.8 (2024-01-13)
* (MyHomeMyData) Initial npm version

## License
MIT License

Copyright (c) 2025 MyHomeMyData <juergen.bonfert@gmail.com>

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