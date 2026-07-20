---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: wXIczJacqbskGLq1SulPllz5UnBhihq/qg5LFf8dh8M=
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
> **注意：** 本文档中的导航链接在 GitHub 上查看时效果最佳 [在 GitHub 上](https://github.com/MyHomeMyData/ioBroker.e3oncan#readme)。其他文档的相对链接（例如 [data-points.md]）。](https://github.com/MyHomeMyData/ioBroker.e3oncan/blob/main/lib/data-points.md)) 也可打开。

> Eine deutsche Version dieser Dokumentation ist verfügbar: [README.de.md](README.de.md)

＃＃ 目录
- [概述](#概述)
- [v1.1.0 版本新增功能](#whats-new-in-v110)
- [v1.0.3 版本新增内容](#whats-new-in-v103)
- [v1.0.0 版本新增内容](#whats-new-in-v100)
- [v0.11.x 版本新增功能](#whats-new-in-v011x)
- [快速入门](#quick-start)
- [配置指南](#configuration-guide)
- [步骤 1 – CAN 适配器](#step-1--can-adapter)
- [步骤 2 – 设备扫描和电表检测](#step-2--device-scan-and-energy-meter-detection)
- [步骤 3 – 数据点扫描](#step-3--data-point-scan)
- [步骤 4 – 任务和时间表](#step-4--assignments-and-schedules)
- [总线拓扑分析](#bus-topology-analysis)
- [e3oncan 数据点选项卡](#e3oncan-datapoints-tab)
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

## V1.1.1 版本新增功能
### 更新的数据点定义
数据点定义已更新至版本 20260705（通用）和 20260630（变体）。

### 新的 O3ESwitch 编解码器
新增了一种编解码器 `O3ESwitch`，用于处理结构取决于设备类型鉴别字节的数据点。第一个字节从一组预定义的编解码器分支中选择当前激活的变体。这使得 ZigBee 设备时隙 DID（2086–2143、2262）能够进行完全结构化解码，其中解码字段因设备类型（例如，气候传感器、温控阀、地板恒温器、执行器）而异。

### 数字编解码器的十进制舍入
数值编解码器（`O3EInt8`、`O3EInt16`、`O3EInt32`、`O3EInt64`、`O3EFloat32`）现在支持可选参数 `decimals`。当设置为大于 0 的值时，解码结果将四舍五入到该小数位数。例如，对于 `SignalLevel`（比例 2.55，小数位数 2），使用此功能可以避免浮点数值过长。

### 启动时设置单位和元数据，以更改数据点结构
当适配器在启动时检测到数据点的结构已更改（`didsE3var.json` 或 `didsE3.json` 中的新版本）时，它现在可以正确地为重建树的所有子状态注册单位和描述。以前，单位仅在数据点扫描期间设置；结构更新后，需要进行后续扫描才能填充它们。

---

## V1.0.3 版本新增内容
### Node.js 升级后无需再重新构建
原生 CAN 模块 `socketcan` 已更新至 4.2.1 版本，该版本使用稳定的 **N-API** 接口。Node.js 版本变更时，不再需要重新编译该模块。升级 Node.js（例如从 22 升级到 24）后，不再需要运行 `iob rebuild`——适配器无需任何额外步骤即可启动。

### 数据点选项卡中的计划数据点筛选器
现在，点击设备卡片上显示已安排数据点数量的绿色徽章，即可**筛选卡片，仅显示已安排的数据点**。这样可以方便地查看或调整特定设备的日程安排。再次点击该徽章或卡片标题即可恢复完整视图。

### 保护自定义变体数据点定义
现在可以通过在条目中添加 `"protected": true` 来**保护 `e3oncan.0.<DEVICE>.info.udsDidsSpecific` 中的用户自定义结构免受自动更新**。保护生效时，系统会记录一个可选的 `"reason"` 字段。如果没有保护，则变体数据点定义（也列在 `didsE3var.json` 中）会在有新定义可用时自动更新——此行为保持不变。有关详细信息，请参阅 [文档](lib/data-points.md#user-defined-data-point-structures-in-udsdidsspecific)。

### 更新的数据点定义
数据点定义已更新至版本 20260528（通用）和 20260527（变体）。重点内容：

- ZigBee DID 2084–2319 完全结构化（设备属性，57 字节和 68 字节变体的当前值）
- 房间 DID 1884–1943 结构化（名称、类型、温度控制、窗户检测、最小/最大湿度）
- 基于 ViGuide 的新型 DID 结构，用于燃料电池指标、能源覆盖范围和电池/逆变器订阅
- `Unknown*` 字段现在统一使用 `RawCodec`

---

## V1.0.0 版本新增内容
### 数据点选项卡
一个新的 **e3oncan 数据点** 页面已直接固定在 ioBroker 实例视图中适配器的实例行上。点击<img src="admin/icon_open_tab.svg" height="20">点击实例行中的按钮即可打开它。它提供了一个专用的用户界面，用于管理日程安排和收集每个设备和数据点的设置——无需为日常更改打开完整的适配器配置对话框。

### 电能表自动检测
现在，在设备扫描过程中，通过对两个 CAN 通道进行被动 CAN 监听，可以**自动**检测到电能表（E380 和 E3100CB）。状态名称会根据检测到的 CAN 地址和通道自动分配。每个电能表的激活/非激活切换和采集延迟均可在“数据点”选项卡中进行配置。

从早期版本升级后首次启动时，之前的电能表配置会自动迁移。

### 自动检测具备收集功能的设备
在数据点扫描期间，适配器会被动监听 CAN 总线，以检测哪些设备支持收集模式。检测到的设备会在数据点选项卡的设备卡标题中以图钉图标突出显示。

### 灵活数据点扫描
新增的“扫描期间将数据点值保存到对象树”选项控制扫描期间是否将当前值写入对象树。禁用此选项后，适配器仍会更新所有现有数据点对象的值和元数据，只是在扫描期间不会创建新对象。这有助于在迁移后刷新元数据，而无需重写所有状态值。

### 总线拓扑分析
数据点扫描完成后，适配器会自动分析扫描过程中收集的总线拓扑数据并生成摘要。结果存储在 `info` 通道的两个新状态中：

- `info.topology` – 结构化的 JSON，包含所有已发现的 UDS 可访问设备和拓扑元素（在所有拓扑矩阵中去重）。
- `info.topologyHtml` – 一个渲染后的 HTML 表格，按总线类型（CanInternal、CanExternal、CanRaw、ModBus、ServiceBus）进行颜色编码，并在可通过 UDS 访问的设备上显示 UDS 徽章。可在 vis、jarvis 或任何支持 HTML 的小部件中显示。

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

---

配置指南
### 步骤 1 – CAN 适配器
打开适配器配置对话框，然后转到**CAN适配器**选项卡。

- 输入您的 CAN 接口名称（默认值：`can0`）。
- 勾选要使用的每个接口的**连接到适配器**。
- 按下**保存**按钮。适配器实例将重启并连接到CAN总线。

如果您有第二个 CAN 总线（例如内部总线），请在此处将其配置为第二个适配器。配置第二个适配器后，将显示第二个“分配”选项卡。

### 步骤 2 – 设备扫描和电能表检测
转到“**UDS 设备列表**”选项卡，然后按“**扫描**”按钮。

扫描需要几秒钟时间。您可以在适配器日志中查看进度（打开另一个浏览器标签页）。
- 总线上所有 E3 设备都将被列出。您可以在第二列中重命名设备——这些名称将用作 ioBroker 对象树中的标识符。
完成后，请按**保存**。实例将重启。

在设备扫描过程中，适配器还会读取设备的数据格式配置（数据点 382），包括温度单位（摄氏度或华氏度）和日期/时间格式。这些信息将被存储，并在后续的数据点扫描中使用。

**电能表检测**

设备扫描运行时，适配器会被动监听 CAN 总线上来自 E380 和 E3100CB 电能表的广播。无需额外的扫描时间——检测并行进行。结果将被存储并显示：

- 在适配器配置对话框（“UDS 设备列表”选项卡）中以文本摘要的形式显示。
- 在 **e3oncan 数据点** 页面中，每个检测到的仪表类型都会显示单独的卡片（见[下方](#e3oncan-datapoints-tab)）。

### 步骤 3 – 数据点扫描
转到**数据点列表**选项卡，按**开始扫描…**，然后按**确定**确认。

请耐心等待——扫描可能需要长达 5 分钟。进度会在适配器日志中显示。

扫描的作用：

- 发现每个设备的所有可用数据点。
- 为每个数据点对象添加元数据（描述、单位、读/写访问权限）。
- 根据步骤 2 中找到的设备格式配置设置物理单位。
- 为 ioBroker 中的每个设备创建完整的对象树。
- 通过被动监听 CAN 总线上的时间广播来检测支持数据采集功能的设备（无需额外扫描时间，并行运行）。检测到的每个设备都会在 **e3oncan 数据点** 页面的设备卡标题中显示一个图钉图标。

对于只读使用，此步骤并非绝对必要，但**强烈建议**执行此步骤；如果要写入任何数据点，则**必须**执行此步骤。

扫描过程中将数据点值保存到对象树中

默认情况下，扫描还会将每个数据点的当前值写入对象树（`json`、`raw`、`tree` 状态）。您可以使用扫描按钮上方的“扫描期间将数据点值保存到对象树”选项来调整此行为。如果禁用此选项，适配器将更新现有数据点对象的值和元数据，但不会创建新对象——这些对象会在扫描后首次接收到数据时自动创建。

如果您希望在扫描期间避免大量状态写入（例如，在拥有大量设备的系统上），此选项非常有用。如果您之前运行过已存储值的扫描，现在想要清除所有数据，则可以安全地从 ioBroker 对象树中删除任何设备的 `json`、`raw` 或 `tree` 子对象——适配器将在下次接收到数据时自动重新创建它们。**注意：**一次性删除大量对象会导致 ioBroker 同时触发许多内部事件，这可能会短暂地导致 RAM 使用量激增。如果您的系统内存紧张，请分批删除。

> **关于历史适配器的说明：** 删除对象**不会**删除历史适配器（History、InfluxDB、SQL）存储的历史数据。记录的值会保留在适配器的后端，并在状态 ID 重新创建后重新出现在图表中。但是，删除对象时，历史订阅配置（对象上的“启用”标志）会丢失，必须在新对象上手动重新启用。

**警告：**切勿删除`info`通道（例如`e3oncan.0.info`）。该通道保存扫描结果、电能表检测信息、延迟、活动标志、总线拓扑结构摘要以及CAN连接状态。删除该通道会导致配置丢失，且无法自动恢复。

总线拓扑分析

扫描完成后，适配器会自动生成总线拓扑摘要，并将其以两种状态存储在`info`通道中：`info.topology`（JSON）和`info.topologyHtml`（HTML）。详情请参见下文[总线拓扑分析](#bus-topology-analysis)。

扫描完成后，使用 **e3oncan 数据点** 页面浏览和管理已发现的数据点（参见 [以下](#e3oncan-datapoints-tab)）。

### 第四步——任务分配和时间安排
配置读取计划和每个设备的收集模式的推荐方法是使用 **e3oncan 数据点** 页面（参见 [以下](#e3oncan-datapoints-tab)）。

**电能表**

如果设备扫描检测到 E380 或 E3100CB 电能表，则每个检测到的电能表都会在 **e3oncan 数据点** 页面中显示一张卡片。点击卡片上的 **采集** 开关即可激活数据采集。使用 **延迟 (秒)** 字段设置 ioBroker 中数值更新的最小间隔。建议使用默认值 5 秒——电能表每秒传输超过 20 个数值，将其设置为 0 会给 ioBroker 带来显著的负载。

完成后，请按“保存并关闭”。检查对象树以确认数据正在收集。

---

## 总线拓扑分析
数据点扫描完成后，适配器分析扫描期间收集的所有总线拓扑数据，并将结果以两种状态存储在 `info` 通道中：

| 状态 | 角色 | 内容 |
|---|---|---|
| `info.topology` | `json` | 结构化 JSON：UDS 可访问设备列表和所有拓扑元素，已在所有拓扑矩阵中去重 |
| `info.topologyHtml` | `html` | 渲染后的 HTML 表格，按总线类型进行颜色编码，支持 UDS 的设备带有 **UDS** 徽章 |

**显示 HTML 表格**

在ioBroker中显示拓扑的最简单方法是使用可以渲染HTML状态的仪表盘工具：

- **jarvis**：添加一个 **stateHTML** 小部件 → 选择 `e3oncan.x.info.topologyHtml`。
- **vis / vis2**：添加一个**基本 - 字符串（未转义）**或**HTML**小部件 → 选择`e3oncan.x.info.topologyHtml`。

> **注意：**状态字符串 `info.topology` 和 `info.topologyHtml` 可能过长，无法在标准的 ioBroker 管理界面中正常显示。这是管理界面处理大型字符串状态的已知限制。这些状态字符串的写入是正确的，脚本和组件可以正常使用它们。

---

## E3oncan 数据点选项卡
**e3oncan 数据点** 页面是浏览数据点、配置 UDSonCAN 读取计划和每个设备的采集模式的主要位置。当您在 ioBroker 管理实例视图中单击适配器实例行中的**数据点**链接按钮时，它会在新的浏览器标签页中打开。

**浏览数据点**

所有设备和检测到的电能表均以可展开卡片的形式显示，初始状态为折叠状态，方便您一目了然地了解整个系统概况。点击卡片标题即可展开。搜索框可按名称或 ID 进行筛选，匹配的卡片会自动展开。

如果尚未对设备执行数据点扫描，页面顶部会显示警告横幅提醒。如果已执行扫描，但 v1.x 版本中引入的“收集”自动检测功能尚未运行，则会显示信息横幅建议运行新的数据点扫描。可以使用“不再显示”按钮永久关闭此提示。

设备卡

每张设备卡片都会列出其数据点，包括 ID、名称、编解码器和计划设置。卡片标题中会显示“采集”开关和最小更新时间。如果在数据点扫描期间检测到来自该设备的采集流量，卡片标题中会显示一个绿色图钉图标作为确认。如果已安排任何数据点，则会显示一个绿色的“**N 个已安排**”徽章——点击该徽章即可展开卡片，仅显示已安排的数据点。再次点击该徽章可移除筛选器；点击卡片标题会移除筛选器，并根据徽章是否已展开卡片，折叠或完全展开卡片。

**能源计量卡**

如果在设备扫描期间检测到电能表（参见[步骤 2](#step-2--device-scan-and-energy-meter-detection)），则页面顶部会显示每个检测到的电能表的卡片。使用**收集**开关激活数据收集，并使用**延迟（秒）**字段设置ioBroker中数值更新的最小间隔。

**日程安排**

对于每个数据点，您可以：

- 检查 **启动时** – 适配器启动时读取一次数据点。
- 输入一个**间隔（秒）** – 数据点将按该间隔重复读取。

两种选项可以结合使用。使用日程筛选器（全部/开始时/间隔）可以快速找到已安排的数据点。

拓扑结构

工具栏中的“拓扑”按钮会在模态对话框中打开总线拓扑图。该图会在每次数据点扫描后自动生成（参见[总线拓扑分析](#bus-topology-analysis)）。在拓扑数据可用之前，该按钮处于禁用状态。

**保存**

按“保存”按钮即可应用更改，无需关闭标签页。“保存并关闭”按钮会保存并关闭标签页，返回实例视图。“放弃并关闭”按钮会关闭标签页而不保存更改——不会触发适配器重启。当有待保存的更改时，会显示“未保存的更改”徽章。

**注意：**保存时，此选项卡中显示的所有设备的计划将根据当前 UI 状态重新构建。未在此处列出的设备（例如，直接在适配器配置对话框中添加的设备）的计划将保持不变。如果同一设备在两个位置都有计划，则保存时以“数据点”选项卡中的计划为准。重复条目将自动删除。

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

即使已将某些数据点加入白名单，也无法更改——设备将返回否定响应。然后，适配器会尝试使用备用服务（仅限内部 CAN 总线）。务必通过检查值是否已被确认来验证写入操作。

---

## 数据点和元数据
有关数据点的结构、变体数据点和元数据的工作原理以及温度/日期/时间格式的处理方式的详细信息，请参阅[数据点.md](lib/data-points.md)。

---

## 电能表
设备扫描过程中会自动检测电能表，无需手动配置。适配器会根据每个电能表的发现位置，在 ioBroker 的对象树中分配一个状态名称：

| 通道 | CAN 地址 | 州名 |
|---|---|---|
| UDS CAN | 98 | `e380` |
| 第二届加拿大 | 98 | `e380_98` |
| 第二届加拿大 | 97 | `e380_97` |
| 第二届加拿大 | 97 | `e380_97` |

`e380`（无后缀）用于UDS CAN通道上的CAN地址98，以保持与现有安装的向后兼容性。`e3100cb`始终用于E3100CB。

采集延迟（默认 5 秒）可在 **e3oncan 数据点** 页面中针对每种仪表类型进行调整。更改将在适配器重启后生效。

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

- Vitocal / HPMUMASTER（收集 ID `0x693`，内部 CAN 总线）
- Vitocharge VX3 和 Vitoair / EMCUMASTER（收集 ID `0x451`，外部和内部 CAN 总线）

在设备扫描期间，收集 CAN ID 会根据 UDS 设备名称自动分配。未在上方列出的设备不会自动分配收集 ID；需要手动在适配器配置中输入。

我可以同时使用 open3e 吗？

是的，但有一些条件。如果您仅在此适配器中使用 Collect 模式，则 open3e 可以与其同时运行，没有任何限制。如果您在此处使用 UDSonCAN，请勿同时对同一设备运行 open3e——这会导致两个应用程序出现零星的通信错误。

Node.js升级后，适配器停止工作了。我该怎么办？

从适配器版本 1.0.3 开始，原生 CAN 模块 (socketcan) 使用 N-API，因此在 Node.js 升级后不再需要重新构建。如果您使用的是旧版本，请先升级适配器。如果升级后问题仍然存在，请提交 issue。

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
* (MyHomeMyData) Fixed missing update of meta data (unit, description) when user changes device specific data point definition

### 1.1.1 (2026-07-06)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20260705 (common)
* (MyHomeMyData) Fixed duplicate display of variant data points in data point list of WebUI

### 1.1.0 (2026-07-05)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20260701 (common) and 20260630 (variant)
* (MyHomeMyData) Added codec `O3ESwitch` for device-dependent data point structures selected by a discriminator byte
* (MyHomeMyData) Added optional `decimals` parameter to numeric codecs to round decoded values
* (MyHomeMyData) Added update of meta data during startup, when structure of data point has changed

### 1.0.3 (2026-06-02)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20260528 for common and 20260527 for variant data points; For details see this [changelog](lib/data-points.md#changelog-of-data-point-definitions)
* (MyHomeMyData) Suppress spurious variant-did warning when common dict covers the length
* (MyHomeMyData) User-defined variant data point structures in `udsDidsSpecific` can now be protected from automatic updates by adding `"protected": true` (and an optional `"reason"` text) to the entry; see [documentation](lib/data-points.md#user-defined-data-point-structures-in-udsdidsspecific)
* (MyHomeMyData) Updated socketcan dependency to 4.2.1 (N-API) — the native CAN module no longer needs to be rebuilt after a Node.js upgrade

### 1.0.2 (2026-05-17)
* (MyHomeMyData) Improved error message when native module socketcan fails to load after a Node.js version upgrade — adapter now logs a clear hint to run `iob rebuild`

### 1.0.1 (2026-05-11)
* (MyHomeMyData) Clicking the green scheduled badge on a device card filters the view to show only its scheduled data points; clicking the badge again or the card header restores the full view
* (MyHomeMyData) Fixed: saving from the datapoints tab now preserves inactive schedules (disabled in the old config UI) for full backward compatibility

### 1.0.0 (2026-05-06)
* (MyHomeMyData) Adapter requires node.js >= 22 now
* (MyHomeMyData) Improved scan status detection: uses `udsDidsWritable` instead of `didsMetaDict` to reliably detect whether a data point scan has been performed
* (MyHomeMyData) Added re-scan recommendation hint in datapoints tab when a scan exists but Collect auto-detection has not yet been run

### Older versions

Older changelog entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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