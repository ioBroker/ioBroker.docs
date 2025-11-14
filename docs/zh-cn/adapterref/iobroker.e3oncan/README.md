---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: ly78//DTy60i1/39twovzSQq4xN3Sq0/9E0dP0KP8xY=
---
![标识](../../../en/adapterref/iobroker.e3oncan/admin/e3oncan_small.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.e3oncan.svg)
![下载](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)
![安装数量](https://iobroker.live/badges/e3oncan-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/e3oncan-stable.svg)
![NPM](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)

# IoBroker.e3oncan
**测试：** ![测试与发布](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 e3oncan 适配器
# 基本概念
Viessmann E3 系列设备（One Base）在 CAN 总线上进行大量数据交换。

该适配器可以监听此通信并提取许多有用信息。它还支持电能表 E380CA 和 E3100CB。此操作模式称为**采集**。

同时支持**数据点的读取和写入**。可以通过主动请求获取监听无法获取的信息。通过写入数据点，可以更改设定值、日程安排等。甚至可以添加新的日程安排，例如家用热水循环泵的日程安排。这种操作模式称为**UDSonCAN**。UDSonCAN协议（基于CAN总线的**通用诊断服务**）也被其他设备使用，例如知名的WAGO网关。

数据写入操作通过存储未检查（ack=false）的相应状态来触发——没错，就是这么简单！写入后 2.5 秒，系统会再次从设备读取数据点并将其存储到状态中。如果状态未收到确认，请查看日志。

写入操作仅限于使用**白名单**指定的一组数据点。该列表存储在每个设备的 info 部分，例如 `e3oncan.0.vitocal.info.udsDidsWritable`。您可以通过编辑此状态来添加更多数据点。保存状态时，请务必**不要**勾选 `Acknowledged`。

某些数据点即使已列入白名单也无法更改。此时，设备将返回“否定响应”代码。在这种情况下，适配器会使用另一个服务重复写入过程。此方法仅适用于内部 CAN 总线。但是，这种方法也可能失败。通常，写入过程应始终进行检查。

首次启动适配器实例时，系统将进行设备扫描，并提供所有可用 E3 设备列表以供配置对话框使用（电能表不包含在内）。

首次设置期间，应扫描每个 E3 设备的数据点，详情请参见下文。

可使用的操作模式（Collect 和/或 UDSonCAN）取决于您的**设备拓扑结构**。更多信息请参见 [这里](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34)。

有关可能的**用例**，请参阅此[讨论](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35)（建设中）。

该适配器的重要部分基于项目[open3e](https://github.com/open3e)。

还提供了一个基于 Python 的纯监听方法（仅收集）实现，使用 MQTT 消息传递，请参阅 [E3onCAN](https://github.com/MyHomeMyData/E3onCAN)。

＃ 入门
前提条件：

* 您已将（USB 转）CAN 总线适配器连接到 Viessmann E3 设备的外部或内部 CAN 总线。
目前仅支持基于Linux的系统。
* CAN 适配器已启动并在系统中可见，例如显示为“can0”（使用 ifconfig 检查）。
* 更多详情请参阅[open3e项目](https://github.com/open3e/open3e/wiki/020-Inbetriebnahme-CAN-Adapter-am-Raspberry)。
* **请确保在初始设置期间没有其他 UDSonCAN 客户端（例如 open3e）正在运行！** 这可能会导致两个应用程序之间出现通信错误。

此适配器提供的所有服务均基于您特定 Viessmann E3 设置的设备列表。因此，您必须按照以下步骤进行首次设置：

**配置**

* 适配器安装完成后，将出现一个配置对话框，最多可配置两个 CAN 总线适配器（“CAN 适配器”选项卡）。
* 编辑 CAN 适配器的名称，并至少选中一个 CAN 适配器的“连接到适配器”复选框。
完成后，请按“保存”按钮应用更改。此步骤**必须**执行。实例将重启并连接到 CAN 适配器。
* 转到“UDS 设备列表”选项卡，然后点击扫描按钮扫描总线上的可用设备。**此过程需要几秒钟。** 您可以通过查看适配器的日志信息，在第二个浏览器标签页中查看活动情况。
您可以更改第二列中设备的命名。这些名称将用于在 ioBoker 的对象树中存储所有收集的数据。更改完成后，请再次点击“保存”按钮。
实例将重新启动，几秒钟后即可扫描可用数据点。请转到“数据点列表”选项卡，点击“开始扫描...”按钮，然后点击“确定”进行确认。**请耐心等待**，此过程可能需要**最多 5 分钟**。您可以在第二个浏览器标签页中查看适配器的日志信息，以了解扫描进度。

此步骤并非强制性，但强烈建议执行。如果您想要写入数据点，则需要先进行数据点扫描。

数据点扫描成功后，每个设备的数据点都会显示在对象树中。您可以通过选择设备并点击“更新数据点列表”按钮来查看配置中的数据点。点击筛选符号并输入搜索词，即可按名称和/或编解码器进行筛选。此功能仅供参考。请在选择其他设备前禁用筛选功能，以免出现错误信息。
最后一步是在“分配给 UDS CAN 适配器”选项卡上配置请求数据的计划。
* 对于**电能表**（如果您的系统配置中包含），您可以选择启用或禁用。请注意“最小更新时间（秒）”的值。单个数据点的更新速度不会超过此值（默认值为 5 秒）。如果选择 0，则会存储所有接收到的数据。由于电能表发送数据的速度非常快（每秒超过 20 个值），因此建议不要在此处使用 0。这会给 ioBroker 系统带来很高的负载。
如果您已通过 CAN 总线连接了 E3 设备，例如 Vitocal 和 VX3，则可以通过监听实时收集这些设备之间交换的数据。按“+”添加一行，选中“激活”复选框，选择一个设备并编辑“最小更新时间（秒）”。虽然可以使用 0，但我建议设置为 5。
最后，您可以添加通过 UDSonCAN 协议请求数据的计划。再次按下“+”按钮并编辑设置。每个设备可以设置多个计划。这样，您可以更频繁地请求某些数据点。“计划（次）”的默认值为 0 表示，这些数据点仅在实例启动时请求一次。

您可以参考“数据点列表”选项卡中的数据点信息（在第二个选项卡中打开可能会有所帮助）。

如果您已配置连接到**第二个CAN总线**的CAN适配器，则会显示“分配给第二个CAN适配器”选项卡。请在此处配置要收集的设备。
* 就这样。按下“保存并关闭”按钮，然后在对象树中查看收集到的数据。

# 警告：升级 Node.js 后，适配器可能无法正常工作。
**该适配器使用了所谓的本地模块，当 Node.js 版本更改时需要重新构建。** 因此，在您升级 Node.js 后，适配器很可能在下次启动时失败。在这种情况下，请停止适配器，在命令行中输入 `iob rebuild`，然后重新启动适配器。这应该可以解决问题。如果问题仍然存在，请提交 issue。

# E380 数据和单位
最多支持两个 E380 电能表。数据点 ID 取决于设备的 CAN 地址：

CAN地址=97：ID为偶数的数据点

CAN地址=98：具有奇数ID的数据点

| ID | 数据 | 单位 |
| ------|:--- |------|
| 592,593 | 有功功率 L1、L2、L3、总计 | 瓦 |
| 594,595 | 无功功率 L1、L2、L3、总计 | var |
| 596,597 | 绝对电流，L1，L2，L3，cosPhi | A，- |
| 598,599 | 电压、L1、L2、L3、频率 | V、Hz |
| 600,601 | 累计进口、出口 | 千瓦时 |
| 602,603 | 总有功功率，总无功功率 | 瓦特，无功功率 |
| 604,605 | 累计进口量 | 千瓦时 |

# E3100CB 数据和单位
| ID | 数据 | 单位 |
| ------|:--- |------|
| 1385_01 | 累计进口量 | 千瓦时 |
| 1385_02 | 累计出口量 | 千瓦时 |
| 1385_03 | 状态：-1 => 进料 | +1 => 供应 | |
| 1385_04 | 总有功功率 | 瓦 |
| 1385_08 | 有源功率 L1 | 瓦 |
| 1385_12 | 有功功率 L2 | 瓦 |
| 1385_16 | 有功功率 L3 | 瓦 |
| 1385_05 | 总无功功率 | var |
| 1385_09 | 无功功率 L1 | var |
| 1385_13 | 无功功率 L2 | var |
| 1385_17 | 无功功率 L3 | var |
| 1385_06 | 当前，绝对 L1 | A |
| 1385_10 | 电流，绝对值 L2 | A |
| 1385_14 | 电流，绝对值 L3 | A |
| 1385_07 | 电压，L1 | V |
| 1385_11 | 电压，L2 | V |
| 1385_15 | 电压，L3 | V |

提示和限制
## 为什么同时使用数据采集（Collect 模式）和 UDSonCAN？
* 连接 E3 设备后，您即可利用数据交换（[更多详情](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34)）。只需监听，即可实时接收数据变化。因此，您可以立即获取快速变化的数据（例如能量流值）和缓慢变化的数据（例如温度）。这些数据始终保持最新状态。
* 其他数据，如果无法或很少通过采集获得，可以通过 UDSonCAN ReadByDid 添加。通常对于设定点数据，这是最佳方法。
因此，在我看来，将这两种方法结合起来是最好的方法。

## 数据收集的局限性
* 目前，通信协议仅对 Vitocal（监听内部 CAN 总线 ID 0x693）、Vitocharge VX3 和 Vitoair（监听外部和内部 CAN 总线 ID 0x451）有效。

## 数据点扫描范围的限制
* 数据点扫描的数值范围限制为常用数据点列表的最小值和最大值，例如，版本 0.10.14 中为 256 至 3338。
* 您可以使用“ReadByDid”命令扫描特定设备超出此范围的数据点：编辑 `e3oncan.0.<DEVICE>.cmnd.udsReadByDid` 文件，并添加您所需的数据点列表，例如 `[3350,3351,3352,3353]`。如果请求的数据点可用，其值将显示在对象树中。也可以在设备配置的读取计划中使用这些数据点。如果请求的数据点**不可用**，iobroker 日志中将显示错误消息（“Negative response”）。

与 open3e 项目有何不同？
显然，主要区别在于与ioBroker的直接集成。配置可以通过对话框完成，数据获取直接列在对象树中。
* 除了 open3e 之外，还支持通过监听进行实时数据采集。
数据写入非常简单。只需更改相应状态下的数据，然后点击保存按钮即可。
* 并非必须通过 MQTT 交换数据。当然，也可以通过配置数据状态来实现。
* 64 位整数的编码（用于写入数据）仅限于小于 2^52 (4,503,599,627,370,496) 的值。解码（用于读取数据）在整个 64 位范围内都能正常工作。

open3e 可以并行使用吗？
是的，在特定条件下是有可能的：

* 如果您仅在此处进行数据收集，则可以不受限制地使用 open3e。
* 如果您在此处使用 UDSonCAN，请务必不要对与 open3e 相同的设备执行此操作。否则，您将会遇到零星的通信错误。

捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/bluePayPal.svg" height="40"></a>如果你喜欢这个项目——或者只是想慷慨解囊，不妨请我喝杯啤酒。干杯！🍻

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.10.14 (2025-11-03)
* (MyHomeMyData) Added elements to enums.js based of PR no. 182 of open3e
* (MyHomeMyData) Simplified configuration of dids scan limits in source code
* (MyHomeMyData) Extended scan up to did 3338
* (MyHomeMyData) Added hint regarding scan range in Readme
* (MyHomeMyData) Fixes for issue #169 (repository checker)
* (MyHomeMyData) Bugfix: Manual change of device specific dids was not evaluated for collect workers
* (MyHomeMyData) Update of list of data points for E3 devices to version 20251102

### 0.10.13 (2025-09-30)
* (MyHomeMyData) Fix for issue #162

### 0.10.12 (2025-09-15)
* (MyHomeMyData) Migration to ESLint 9, refer to issues #141 and #152

### 0.10.11 (2025-09-06)
* (MyHomeMyData) Fix for issue #152 (repository checker) and #126 (node.js 24)
* (MyHomeMyData) Added hint to readme regarding user action after upgrading version of node.js
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250903

### 0.10.10 (2025-08-07)
* (MyHomeMyData) Fix for issue #142 (WriteByDid not working in case of specific UDS control frame)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250729
* (MyHomeMyData) Added codec for 64-bit integers. Remark: Encoding (for writing of data) is limited to values < 2^52 (4.503.599.627.370.496).

### 0.10.9 (2025-05-22)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250422
* (MyHomeMyData) Fixed version number of enum info
* (MyHomeMyData) Fix for issue #125 (findings of repository checker)

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