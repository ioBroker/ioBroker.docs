---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: y7oFnc7+gxrXSaUyk35hgP0rwcK4nxcTWMA1i1i0qMg=
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
＃＃ 目录
- [概述](#概述)
- [快速入门](#quick-start)
- [配置指南](#configuration-guide)
- [步骤 1 – CAN 适配器](#step-1--can-adapter)
- [步骤 2 – 设备扫描](#step-2--device-scan)
- [步骤 3 – 数据点扫描](#step-3--data-point-scan)
- [步骤 4 – 任务和时间表](#step-4--assignments-and-schedules)
- [读取数据点](#reading-data-points)
- [写入数据点](#writing-data-points)
- [数据点和元数据](#data-points-and-metadata)
- [电能表](#energy-meters)
- [E380 数据和单位](#e380-data-and-units)
- [E3100CB 数据和单位](#e3100cb-data-and-units)
- [常见问题解答和限制](#faq-and-limitations)
- [捐赠](#捐赠)
- [更新日志](#changelog)

---

＃＃ 概述
威能 E3 系列设备（One Base 生态系统）通过 CAN 总线交换大量数据。该适配器接入该通信，并将数据提供给 ioBroker 使用。

两种运行模式独立运行，也可以组合使用：

| 模式 | 描述 |
|---|---|
| **数据采集** | 被动监听 CAN 总线，并在设备交换数据时实时提取数据。不发送任何请求。非常适合快速变化的数值，例如能量流。 |
| **UDSonCAN** | 使用 UDS 协议（基于 CAN 总线的通用诊断服务）主动读取和写入数据点。用于设置点数、计划任务以及不会自动广播的数据。 |

可用的模式取决于您的设备拓扑结构。请参阅[设备拓扑结构讨论（https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34）详细介绍了相关内容。如需了解如何使用适配器，请参阅用例讨论。](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35)。

> 此适配器的重要部分基于 [open3e](https://github.com/open3e) 项目。

> [E3onCAN](https://github.com/MyHomeMyData/E3onCAN) 提供了一个基于 Python 的仅收集模式的 MQTT 实现。

---

快速入门
**先决条件**

- 连接到 Viessmann E3 设备的外部或内部 CAN 总线的 USB 转 CAN 或 CAN 适配器。
- 基于 Linux 的主机系统（仅支持 Linux）。
- CAN 适配器已启动并在系统中可见，例如显示为 `can0`（使用 `ifconfig` 进行验证）。
- 有关 CAN 适配器设置的详细信息，请参阅 [open3e 项目 wiki](https://github.com/open3e/open3e/wiki/020-Inbetriebnahme-CAN-Adapter-am-Raspberry)。

**重要提示：**首次设置此适配器时，请确保没有其他 UDSonCAN 客户端（例如 open3e）正在运行。并行 UDS 通信会导致两个应用程序都出现错误。

首次设置概览

1. 安装适配器并打开其配置对话框。
2. 在 **CAN 适配器** 选项卡上配置您的 CAN 适配器并保存。
3. 在**UDS 设备列表**选项卡上扫描 E3 设备。
4. 在“数据点列表”选项卡上扫描数据点（最多需要 5 分钟）。
5. 在“任务”选项卡上设置阅读计划并保存。

详细步骤如下[配置指南](#configuration-guide)所示。

> **升级 Node.js 后：** 当 Node.js 版本更改时，此适配器使用的原生模块必须重新构建。如果 Node.js 升级后适配器无法启动，请停止适配器，在命令行运行 `iob rebuild`，然后重新启动适配器。

---

配置指南
### 步骤 1 – CAN 适配器
打开适配器配置对话框，然后转到**CAN适配器**选项卡。

- 输入您的 CAN 接口名称（默认值：`can0`）。
- 勾选要使用的每个接口的**连接到适配器**。
- 按下**保存**按钮。适配器实例将重启并连接到CAN总线。

如果您有第二个 CAN 总线（例如内部总线），请在此处将其配置为第二个适配器。配置第二个适配器后，将显示第二个“分配”选项卡。

### 步骤 2 – 设备扫描
转到“**UDS 设备列表**”选项卡，然后按“**扫描**”按钮。

扫描需要几秒钟时间。您可以在适配器日志中查看进度（打开另一个浏览器标签页）。
- 公交车上所有E3设备都将被列出。电能表（E380、E3100CB）不在此列出，它们单独配置。
您可以在第二列中重命名设备。这些名称将用作ioBroker对象树中的标识符。
完成后，请按**保存**。实例将重启。

在设备扫描过程中，适配器还会读取设备的数据格式配置（数据点 382），包括温度单位（摄氏度或华氏度）和日期/时间格式。这些信息将被存储，并在后续的数据点扫描中使用。

### 步骤 3 – 数据点扫描
转到**数据点列表**选项卡，按**开始扫描…**，然后按**确定**确认。

请耐心等待——扫描可能需要长达 5 分钟。进度会在适配器日志中显示。

扫描的作用：

- 发现每个设备的所有可用数据点。
- 为每个数据点对象添加元数据（描述、单位、读/写访问权限）。
- 根据步骤 2 中找到的设备格式配置设置物理单位。
- 为 ioBroker 中的每个设备创建完整的对象树。

对于只读使用，此步骤并非绝对必要，但**强烈建议**执行此步骤；如果要写入任何数据点，则**必须**执行此步骤。

扫描完成后，您可以通过选择设备并点击“更新数据点列表”按钮，在配置对话框中浏览已发现的数据点。使用筛选器图标可以按名称或编解码器进行搜索。切换到其他设备前，请先停用筛选器。

### 第四步——任务分配和时间安排
转到“分配给 UDS CAN 适配器”选项卡（如果适用，还要转到第二个适配器选项卡）。

**电能表（采集模式）**

如果您使用的是 E380 或 E3100CB 电能表，可以在此处启用监听功能。设置“最小更新时间（秒）”来控制数值存储的频率。建议使用默认值 5 秒——电能表每秒传输超过 20 个数值，将其设置为 0 会给 ioBroker 带来过高的负载。

**E3 设备采集（采集模式）**

按**+**添加设备。勾选**启用**，选择设备，然后设置**最小更新时间（秒）**。建议设置为5秒；也可以设置为0秒（存储每个接收到的值），但这会增加系统负载。

此模式可实时捕获 E3 设备之间交换的数据，而无需发送任何请求。有关哪些设备支持此功能的详细信息，请参阅 [常问问题](#faq-and-limitations)。

**UDSonCAN 阅读日程表**

按**+**添加计划。选择设备和要读取的数据点列表，然后设置间隔时间（以秒为单位）。值为0表示在适配器启动时读取一次数据点。

您可以为每个设备添加多个日程安排，以便更频繁地请求某些数据点。请参考“数据点列表”选项卡（在第二个浏览器标签页中打开）。

完成后，请按**保存并关闭**。检查对象树以确认数据正在收集。

---

## 读取数据点
数据点会根据您配置的计划自动读取。值会出现在 ioBroker 的对象树中，位于设备名称下，并组织成 `json`、`raw` 和 `tree` 子对象，这些子对象具有易于理解的名称和元数据。

**按需读取特定数据点**

您可以随时通过编辑状态 `e3oncan.0.<DEVICE>.cmnd.udsReadByDid` 并输入数据点 ID 列表（例如 `[3350, 3351, 3352]`）来请求任何数据点。如果设备上存在该数据点，则该值将出现在对象树中，并可用于读取计划。

数值扫描范围目前有限（例如，0.11.0 版本中的 256–3338）。使用 `udsReadByDid` 来探测此范围之外的数据点。

---

## 写入数据点
写入操作刻意简化：只需更改 ioBroker 中相应状态的值并保存，**无需**勾选 `Acknowledged`（确认）复选框。适配器会检测到未确认的写入操作并将其发送到设备。

写入数据约 2.5 秒后，适配器会从设备读取数据点并存储确认值。如果此后未收到状态确认，请检查适配器日志以获取错误详情。

**可写数据点白名单**

写入操作仅限于存储在以下位置的白名单中的数据点：

```
e3oncan.0.<DEVICE>.info.udsDidsWritable
```

您可以通过编辑此状态来扩展列表。保存时**不要**选中`Acknowledged`。

即使已将某些数据点列入白名单，也无法更改——设备将返回否定响应。然后，适配器会尝试使用备用服务（仅限内部 CAN 总线）。务必通过检查值是否已被确认来验证写入操作。

---

## 数据点和元数据
有关数据点的结构、变体数据点和元数据的工作原理以及温度/日期/时间格式的处理方式的详细信息，请参阅[数据点.md](data-points.md)。

---

## 电能表
### E380 数据和单位
最多支持两个 E380 电能表。数据点 ID 取决于设备的 CAN 地址：

- **CAN 地址 97：** 偶数 ID 的数据点
- **CAN 地址 98：** 具有奇数 ID 的数据点

| ID | 数据 | 单位 |
|---|---|---|
| 592、593 | 有功功率 L1、L2、L3、总计 | 瓦 |
| 594, 595 | 无功功率 L1、L2、L3、总计 | var |
| 596, 597 | 绝对电流 L1, L2, L3; cosPhi | A, — |
| 598, 599 | 电压 L1, L2, L3；频率 | V, Hz |
| 600, 601 | 累计进口, 累计出口 | 千瓦时 |
| 602, 603 | 总有功功率, 总无功功率 | 瓦特, 无功功率 |
| 604、605 | 累计进口量 | 千瓦时 |

### E3100CB 数据和单位
| ID | 数据 | 单位 |
|---|---|---|
| 1385_01 | 累计进口量 | 千瓦时 |
| 1385_02 | 累计出口量 | 千瓦时 |
| 1385_03 | 状态：−1 = 馈入 / +1 = 供应 | — |
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
| 1385_07 | 电压 L1 | V |
| 1385_11 | 电压 L2 | V |
| 1385_15 | 电压 L3 | V |

---

## 常见问题解答和限制
**为什么要同时使用 Collect 和 UDSonCAN？**

Collect 功能可提供设备间所有数据交换的实时信息，包括快速变化的数值（例如能量流）和缓慢变化的数值（例如温度），所有数据都会在发生变化时立即更新。UDSonCAN 功能则允许您访问非自发广播的数据，通常是设定点和配置值。将两者结合使用，即可获得最完整、最新的系统状态信息。

哪些设备支持采集模式？

目前，collect 协议已知具有以下特点：

- Vitocal（监听 CAN ID `0x693`，内部 CAN 总线）
- Vitocharge VX3 和 Vitoair（监听 CAN ID `0x451`，外部和内部 CAN 总线）

我可以同时使用 open3e 吗？

是的，但有一些条件。如果您仅在此适配器中使用 Collect 模式，则 open3e 可以与其同时运行，没有任何限制。如果您在此处使用 UDSonCAN，请勿同时对同一设备运行 open3e——这会导致两个应用程序出现零星的通信错误。

Node.js升级后，适配器停止工作了。我该怎么办？

此适配器使用原生模块，当 Node.js 版本更改时必须重新构建这些模块。请停止适配器，在命令行运行 `iob rebuild`，然后重新启动适配器。如果问题仍然存在，请提交 issue。

与 open3e 项目有何不同？

- 直接集成到 ioBroker 中：通过对话框进行配置，数据直接在对象树中可见。
- 除了 UDSonCAN 之外，还支持实时采集模式。
- 写入数据更简单：只需更改状态值并保存，无需确认。
- 无需 MQTT（尽管 MQTT 当然可以通过正常的 ioBroker 配置获得）。
- 写入操作的 64 位整数编码仅限于小于 2^52 (4,503,599,627,370,496) 的值。解码在整个 64 位范围内都能正常工作。

我可以请求扫描范围之外的数据点吗？

是的。编辑状态 `e3oncan.0.<DEVICE>.cmnd.udsReadByDid`，并输入数据点 ID 列表，例如 `[3350, 3351, 3352, 3353]`。可用的数据点将显示在对象树中，并可用于读取计划。不可用的数据点将在日志中生成“否定响应”消息。

---

捐赠
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/bluePayPal.svg" height="40"></a>如果你喜欢这个项目——或者只是想慷慨解囊，不妨请我喝杯啤酒。干杯！🍻

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (MyHomeMyData) To take full advantage of the variant data points and metadata, please perform a device scan followed by a data point scan
* (MyHomeMyData) Added handling for variant data points and for device's data format configuration, refer to https://github.com/MyHomeMyData/ioBroker.e3oncan/data-points.md for details
* (MyHomeMyData) Added metadata to several data points, e.g. description, unit, link to further info
* (MyHomeMyData) During scan of data points now metadata are added to data point objects
* (MyHomeMyData) Changed handling of writable data points; this info now also is available within definition of data point; however, there is no change to handling of the whitelist of writables
* (MyHomeMyData) During device scan the information about used data formats (data point 382) is evaluated
* (MyHomeMyData) Updated structure of the following data points: 268,269,271,274,279,282,284,285,286,287,288,289,290,291,318,320,321,324,531,1659,1684,1768,1769,1770,1771,1772,2084,2085,2087,2088,2090,2091,2093,2094,2096,2097,2099,2100,2102,2103,2105,2106,2108,2109,2111,2112,2114,2115,2117,2118,2120,2121,2123,2124,2126,2127,2129,2130,2132,2133,2135,2136,2138,2139,2141,2142,2240,2260,2261,2263,2264,2266,2267,2269,2270,2272,2273,2275,2276,2278,2279,2281,2282,2284,2285,2287,2288,2290,2291,2293,2294,2296,2297,2299,2300,2302,2303,2305,2306,2308,2309,2311,2312,2314,2315,2317,2318,2320,2333,2334,2351,2352,2593,2735,2806,3014,3015,3016,3017,3018,3032,3034,3035,3036
* (MyHomeMyData) Hint: For all sensor data points the last entry "Unknown" was changed to "SensorStatus". That's why the list of changed data points is so long.
* (MyHomeMyData) Hint: For the frequently used data points 531, 1415..1418, 2351, 2532 and 2735 the numerical value has been moved to the sub "ID": 0531_DomesticHotWaterOperationState, 1415_MixerOneCircuitOperationState.State.ID, 2351_HeatPumpCompressor.PowerState.ID, 2352_AdditionalElectricHeater.PowerState.ID, 2735_FourThreeWayValveValveCurrentPosition.ID

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

Copyright (c) 2024-2026 MyHomeMyData <juergen.bonfert@gmail.com>

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