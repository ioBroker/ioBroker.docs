---
BADGE-Number of Installations: http://iobroker.live/badges/zigbee-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.zigbee.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.zigbee.svg
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zigbee/README.md
title: 适用于 ZigBee 设备的 ioBroker 适配器
hash: pBQ1TmX0jOioZJs9xvX/qgi89TWuyWhI28/2mAtHaXc=
---
# IoBroker 适配器（适用于 ZigBee 设备）
使用 ZigBee 网络协调器可以创建一个专用的 ZigBee 网络，ZigBee 设备（例如灯具、调光器、传感器等）可以加入其中。由于可以直接与协调器交互，ZigBee 适配器无需任何制造商（例如小米/Tradfri/Hue）提供的网关/网桥即可控制这些设备。更多关于 ZigBee 的信息，请参阅[这里](https://github.com/Koenkk/zigbee2mqtt/wiki/ZigBee-network)。

＃＃ 硬件
协调器（见上文）需要额外的硬件来实现 USB 和 ZigBee 无线信号之间的转换。协调器有三种类型：

- Raspberry Pi 的插件模块（不建议使用这些模块。）
- USB 连接模块，可以是开发板或 USB 记忆棒
- 网络协调员

兼容协调器的完整列表可在[这里](https://www.zigbee2mqtt.io/guide/adapters/)找到。我们建议仅使用列为“推荐”的协调器。安装所需固件的说明也可在此处找到。

协调器也预装了固件。适用以下规定：**任何固件兼容 Zigbee2mqtt.io 的协调器均可与 ZigBee 适配器一起使用**。

目前（截至 2025 年 3 月），“Sonoff ZIGBEE 3.0 USB-STICK CC2652P”（CC2652P 和 EZSP 芯片组版本）以及带有 Cod.m 和/或 XTG 固件的网络协调器尤为流行。Conbee II 和 Conbee III 也经常使用。强烈建议不要使用带有 CC2530/CC2531 的 TI 协调器——这些产品现已过时。

连接到 ZigBee 网络的设备会将其状态传输给协调器，并通知其事件（按钮按下、运动检测、温度变化等）。这些信息显示在适配器中相应的 ioBroker 对象下，因此可以在 ioBroker 中进一步处理。此外，还可以向 ZigBee 设备发送命令（例如，更改插座和灯具的状态、设置颜色和亮度等）。

＃＃ 软件
该软件分为“转换器”和“适配器”。

![](../../../de/adapterref/iobroker.zigbee/img/software1.jpg)

- 转换器

该转换器分为两部分：<br> a) ZigBee 无线电信号数据的通用提供方式。此[软件部分](https://github.com/Koenkk/zigbee-herdsman)适用于所有 ZigBee 设备。<br> b) 将数据以设备特定的[加工](https://github.com/Koenkk/zigbee-herdsman-converters) 形式传输到适配器的定义接口。

   - 适配器<br>

此软件部分用于将转换器连接到 ioBroker。[适配器](https://github.com/ioBroker/ioBroker.zigbee) 包含用于管理 ZigBee 设备的图形用户界面，以及用于控制 ZigBee 设备的 ioBroker 对象的创建。

＃＃ 安装
1. 将协调器硬件连接到运行 ioBroker 的计算机（或网络，如果是 LAN/WLan 协调器）。<br>
2. 在服务器上打开控制台。如果是 Unix/Linux 系统，可以通过 ssh 远程操作。根据所使用的操作系统，可能需要其他程序（例如 Windows 上的 puTTY）。<br>
3. 确定协调器路径。在 Unix/Linux 系统上，该路径通常位于 /dev/serial/by-id 目录中。或者，也可以是 /dev/ttyUSB*、/dev/ttyAM* (Unix/Linux)、/dev/tty.usbserial-* (macOS) 或 com* (Windows)。<br>

以下示例展示了 Raspberry Pi 上的 Linux 安装。命令 `ls -la /dev/serial/by-id/` 会产生如图所示的输出。
![](../../../de/adapterref/de/img/Bild2.png)

4. ioBroker -&gt; 安装ZigBee适配器，这里以1.8.10版本为例。<br> ![](../de/img/Bild3.png)<br>这将安装所有必需的软件组件（转换器和适配器）。<br> ![](../../../de/adapterref/iobroker.zigbee/img/Zigbee_config_en.png)<br>
5. 打开适配器配置。上图显示的是 3.0.0 或更新版本的界面。

在这种情况下，管理员指示 ZigBee 子系统是否启动（A）。

6. 输入协调器的端口 (B)。对于 USB 协调器，这是先前确定的设备路径。对于通过网络控制的协调器，必须以 tcp://ip:port 的形式指定网络地址和端口，而不是设备路径。如果适配器本身（而非 Zigbee 子系统）处于活动状态，则会显示可用的串行接口列表供选择。选择时适用以下原则：
- 如果系统上使用多个带有不同 USB 设备的适配器进行通信，则**绝对**应该从 /dev/serial/by-id 目录（如果可用）中选择一个端口。这可确保系统重启后适配器与协调器的关联能够保留。
- 如果只使用一个 USB 设备，则最好使用 /dev/TTY* 端口。这样，在协调器出现故障时，可以直接用相同的设备替换，而无需调整配置。
7.分配网络ID和Pan ID，以将其与无线范围内的其他ZigBee网络区分开来。例如，从适配器版本2.1.0开始，ExtPanID（C）和PanID（D）会自动预先分配随机值，直到保存配置为止。<br>
8. 选择合适的 ZigBee 信道 (E)。请注意，ZigBee 和 2.4GHz Wi-Fi 共享同一频段。因此，最佳信道取决于该区域使用的 Wi-Fi 信道等因素。ZigBee 和 Wi-Fi 的信道名称**不**相同，例如，WIFI 信道 11 和 Zigbee 信道 11 不会互相干扰。建议您将信道选择限制在 ZigBee Light Link 信道（11、15、20、25）内。如果选择的信道不属于 ZigBee Light Link，界面会在输入的信道上方显示一个带有感叹号的黄色三角形。<br>适配器成功启动后，还可以通过配置执行网络通道的扫描。<br>

**注意：**从适配器版本 3.1.0 开始，无需删除配置并重新配对所有设备即可更改通道。个别设备可能无法响应通道更改请求；这些设备将需要重新配对。这种情况通常适用于终端设备。<br>

9. 检查 Zigbee 子系统是否正在启动。为此，请尝试使用“启动/停止”(F) 启动 Zigbee 子系统。您可以在日志中查看启动尝试的进度。当 Herdsman 启动时，图标 (A) 会从黑/红变为黑/橙。如果启动成功，图标会完全消失；否则，图标会再次变为红色，日志中的消息会提供原因线索。<br>

您也可以使用相同的按钮停止 Herdsman。图标也显示为黑色/橙色。**重要提示：在某些情况下，停止可能需要长达 2 分钟，尤其是在使用网络协调器时。**此处需要耐心等待。Herdsman 终止后，图标将显示为黑色/红色，并显示“Herdsman 已停止！”消息。
根据错误情况，Herdsman 无法启动的原因可能有很多。如果“只是”超时，建议您立即重试。如果配置不一致，相关数据将显示在日志中。适配器提供了两种解决冲突的选项：

- 从 NV 备份中读取数据。在这种情况下，适配器的配置会进行调整。
- 删除 NV 备份。在这种情况下，适配器的配置保持不变。这将强制重建网络，从而需要重置并重新训练所有之前训练过的设备。<br>

日志输出也可用于在[ioBroker论坛](https://forum.iobroker.net)中搜索解决方案。请突出显示这些消息并将其**以文本形式**发布到论坛中。

10. Zigbee 网络配置正确且启动正常后，即可将适配器设置为在启动时自动启动网络。具体操作是勾选“自动启动 Zigbee 网络”复选框。

## 配对
每个 ZigBee 设备（开关、灯泡、传感器……）必须与协调器配对（配对）：<br>

- ZigBee设备：

每个 ZigBee 设备只能连接到一个 ZigBee 网络。如果 ZigBee 设备仍保存着其他协调器（例如飞利浦 Hue 桥接器）的配对信息，则必须先将其与该 ZigBee 网络解耦。与旧 ZigBee 网络的解耦最好通过旧 ZigBee 网络的用户界面（例如飞利浦 Hue 应用程序）进行。或者，您也可以将 ZigBee 设备恢复出厂设置。<br>将 ZigBee 设备置于配对模式通常有以下选项<br>

1. 取消 ZigBee 设备与 ZigBee 网络的配对
2. 按下 ZigBee 设备上的配对按钮
3. 关闭ZigBee设备的电源电压，然后重新打开

ZigBee 设备随后会进入配对模式，通常持续 60 秒。与恢复出厂设置的步骤类似，激活配对模式也取决于相应的设备类型（如有必要，请阅读 ZigBee 设备的操作说明）。

- 协调员：

按下绿色按钮使协调器进入配对模式 60 秒。<br> ![](../../../de/adapterref/iobroker.zigbee/img/Zigbee_pairing_en.png)

   - 等到对话框中出现“新设备加入”：<br>

![](../../../de/adapterref/iobroker.zigbee/img/Bild13.png)

- 检查配对：

ioBroker ZigBee 适配器必须支持待配对的设备。最佳情况下，ZigBee 适配器中会显示一个新设备（例如飞利浦灯带），并创建相应的 ioBroker 对象：![](../de/img/Bild14.png) ![](../../../de/adapterref/de/img/Bild15.png)

- 最坏的情况是，该 ZigBee 设备目前不受支持。下一节将介绍如何才能使用该 ZigBee 设备。

## 到目前为止配对的未知 ZigBee 设备
对于以前未知的 ZigBee 设备，配对期间会出现 ZigBee 设备的 ZigBee 名称（例如，HOMA1001），并带有后缀“supported”：false。<br> ![](../../../de/adapterref/de/img/Bild16.png)<br>

旋转此图块可提供有关 ZigBee 设备的详细信息：<br> ![](../de/img/Bild17.png) ![](../../../de/adapterref/iobroker.zigbee/img/Bild18.png)<br>

在[github.com](https://github.com/ioBroker/ioBroker.zigbee/issues)注册后，可以通过“问题”报告丢失的 ZigBee 设备：

![](../../../de/adapterref/de/img/Bild19.png)<br>

在问题中包含该图块的详细信息（见上文），创建一份简短的文档（最好是英文），然后提交。之后会有开发人员回复该问题。

因此，可能出现以下两种情况之一：

- 适配 Zigbee Herdsman 转换器。这需要更新版本的 Zigbee 适配器，该适配器需先进行测试，然后才能在最新存储库中获取。
- 创建“外部转换器”——一个包含 JS 代码的文件，可以复制到 Zigbee 适配器的数据目录并在适配器的配置中指定。

在这两种情况下，只需重新启动适配器即可——适配器将创建相应适配的数据点。如果不再支持数据点，它们将以橙色突出显示，并且适配器将显示一个用于删除孤立数据点的按钮。

## ZigBee 适配器内的符号
| 图标 | 描述 |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![](../../../de/adapterref/de/img/Bild30.png) | **状态清理**<br>删除未连接的 ioBroker 对象。这些对象可以通过“排除”操作创建。|
| ![](../../../de/adapterref/de/img/Bild31.png) | **检查固件更新**<br> Zigbee 适配器支持 OTA 固件升级，前提是连接的设备支持此功能。此按钮会启动新固件的检查——实际升级必须在每个设备上单独启动。|
| ![](../../../de/adapterref/de/img/Bild32.png) | **添加群组**<br> Zigbee 规范支持创建可通过单个命令同时控制的设备组。虽然该规范几乎支持所有命令作为组命令，但 Zigbee 适配器中的实现仅限于灯泡——此按钮可用于创建新组。可以通过设备 | 添加和删除成员。 |
| ![](../../../de/adapterref/de/img/Bild33.png) | **重置并配对 Touchlink**<br> Touchlink 是 Zigbee Light Link (ZLL) 的一项功能，允许物理距离较近的设备无需连接协调器即可相互通信。并非所有设备都支持此功能。要通过 Touchlink 将 Zigbee 设备重置为出厂设置，请将设备靠近（&lt; 10 厘米）Zigbee 协调器，然后按下绿色符号。**警告** 如果 Touchlink 重置过程未正确执行，距离较远的设备也可能会被重置。如有疑问，建议暂时拔掉所有受影响设备的电源。|
| ![](../../../de/adapterref/de/img/Bild34.png) | **使用二维码配对**<br>有些设备需要额外的安全码才能与网络配对。这通常以设备上和/或说明书中的二维码形式提供。只有事先输入相应的安全码，才能与这些设备配对。**注意** 许多说明书都指定了二维码，即使设备不支持安全码，也需要使用制造商特定的应用程序读取这些二维码才能将设备连接到制造商的网关。在这种情况下，当您尝试输入安全码时，适配器会显示错误。如果发生这种情况，请尝试“正常”对设备进行编程。|
| ![](../de/img/Bild34.png) | **与二维码配对**<br>有些设备需要额外的安全码才能与网络配对。这通常以设备上和/或说明书中的二维码形式提供。只有事先输入相应的安全码，才能与这些设备配对。**注意** 许多说明书都指定了二维码，即使设备不支持安全码，也需要使用制造商特定的应用程序读取这些二维码才能将设备连接到制造商的网关。在这种情况下，当您尝试输入安全码时，适配器会显示错误。如果发生这种情况，请尝试“正常”对设备进行编程。| | ![](../../../de/adapterref/de/img/Bild35.png) | **配对**<br>启动新 ZigBee 设备的配对过程。按下此按钮将打开网络，打开时间（可配置，10 到 250 秒之间），以便将新设备添加到网络。 |

## 设备图块
| 图标 | 描述 |
| ![](../../../de/adapterref/de/img/Bild36.png) | 自上次与此 ZigBee 设备进行数据交换以来的时间。|
| ![](../../../de/adapterref/de/img/battery.png) | 电池电量（如果设备报告电池电量）。|
| ![](../de/img/Bild37.png)<br> ！[](../../../de/adapterref/de/img/disconnected.png) | 此 ZigBee 设备上的 ZigBee 无线电信号强度（&lt;10 为差，&lt;50 为中，&gt;50 为好）。ZigBee 是一种无线网状网络。大多数市电供电的 ZigBee 设备（例如飞利浦 Hue 灯）可以充当 ZigBee 路由器，即无线节点。因此，ZigBee 设备不必与协调器建立直接无线连接，而是可以使用网络中的任何路由器进行无线连接。每个 ZigBee 路由器都会扩展网络的无线覆盖范围。所有 ZigBee 设备都会定期检查是否有更好的无线路由并自动切换。但是，此过程可能需要几分钟。<br>手动将设备分配给路由器是不可能的。<br>当设备被视为“未连接”时，会显示红色的划掉符号。|
| ![](../de/img/grp_ok.png) ![](../../../de/adapterref/de/img/grp_nok.png) | 团体状态<br>绿色圆圈表示该组有成员并且可以正常运行；当该组为空或由于其他原因无法使用时，会出现红色 X。|
| ![](../../../de/adapterref/de/img/info.png) | 信息<br>打开设备信息显示。此页面显示的信息直接来自设备。对于未知设备也适用。|
| ![](../../../de/adapterref/de/img/reconfigure.png) | （重新）配置设备。<br>此按钮允许触发设备配置，用于告知设备自动向协调器报告哪些数据。配置项在此设备的*转换器*中定义。请注意，设备必须处于活动状态才能成功配置。如果设备未处于活动状态，则配置尝试将超时，并且设备将被放入待配置设备队列中，以便在下次设备 i 发送消息时进行配置。|
| ![](../../../de/adapterref/de/img/debug.png) | 调试设备<br>启用/禁用此设备的扩展调试消息生成。图标颜色表示当前状态：（黑色/白色：无调试消息；绿色：调试消息 - 可使用此按钮停用；橙色：通过 zigbee.x.info.debugmessages 下的过滤器生成调试消息。）|
| ![](../../../de/adapterref/de/img/on_off.png) | 开/关<br>此按钮可用于激活/停用设备。停用的设备不会进行任何通信。|
| ![](../../../de/adapterref/de/img/edit_image.png) | 分配图像/名称<br>此按钮允许您根据设备或设备类型为设备指定自定义图像和/或名称。即使设备被删除，以此方式进行的设置也会保留。|
| ![](../../../de/adapterref/de/img/edit_grp.png) | 编辑名称/群组<br>此按钮可用于更改设备的名称，以及（如果适用）将设备分配到一个或多个组。|
| ![](../../../de/adapterref/de/img/delete.png) | 删除设备<br>开始删除此设备的过程。|
| ![](../../../de/adapterref/de/img/delete.png) | 删除设备<br>开始删除此设备的过程。|

## 附加信息 Zigbee 适配器与[Zigbee2mqtt](https://www.zigbee2mqtt.io/) 项目 ([Github 链接](https://github.com/Koenkk/zigbee2mqtt))。可以使用 MQTT 或其自带的 [适配器] 直接将 zigbee2mqtt.io 与 ioBroker 一起使用](https://github.com/arteck/ioBroker.zigbee2mqtt) 共享相同的库（zigbee-herdsman、zigbee-herdsman-converters）。<br>由于库是共享的，zigbee2mqtt.io 中支持的任何设备最终都将在 Zigbee 适配器中得到支持。由于需要进行兼容性检查，这可能需要几天或几周的时间。生成描述设备及其 zigbee2mqtt.io 集成的问题通常会导致临时解决方案或适配器更新，以在 Zigbee 适配器中包含支持。<br>与此适配器相关的其他主题也记录在相关的[维基百科](https://github.com/ioBroker/ioBroker.zigbee/wiki)中。

## Changelog
### 3.1.0 (2025-08-02)
* (asgothian) ZHC 24.9.0
* (asgothian) ZH 5.x
* (asgothian) extend and stop pairing countdown

### 3.0.5 (2025-08-27)
* (asgothian) fix random error where devices are not shown due to illegal groups
* (asgothian) drop support for node 18
* (asgothian) Required node Versions Node 20.19.0 or 22.11.0 or newer (courtesy of ZH 4.4.1 / ZHC 24.8.0)

### 3.0.3 (2025-07-27)
* (asgothian) fix 'icon' error for unknown devices
* (asgothian) fix state for level.color.rgb role (hex_color, accepts only #rrggbb values
* (asgothian) ZH 4.4.1
* (asgothian) ZHC 23.72.1
* (asgothian) preparation for breaking change in ZHC 24.0.0

### 3.0.2 (2025-07-07)
* (asgothian) fix images

### 3.0.1 (2025-04-25)
* (AlexHaxe)  Fix for Ikea SOMRIG configuration raising 'definition.endpoint is not a function' error.
* (asgothian) Access to 'zigbee2mqtt options as settings in zigbee adapter (ALPHA Stage !)
* (asgothian) Fix for 'error: zigbee.0 (1118300) zigbee.0 already running' at adapter start (Alpha Stage)
* (asgothian) Updated hardware configuration panel - exchanged text buttons for buttons with icons.
* (asgothian) Limited states on device tiles to states which are read only or which can be modified sensibly via the device tile.
*

### 3.0.0 (2025-04-08)
* (asgothian) Breaking change: Start of zigbee subsystem requires checking the 'start the Zigbee network automatically' checkbox. !!!
* (asgothian) Hardware configuration panel
* (asgothian) Update for external converter - detect /dist/ subfolder
* (asgothian) Update device image: use of icons defined in external converter (beta)
*

### 2.0.5 (2025-03-25)
* (asgothian) ZHC 23.6.0
* (asgothian) ZH 3.3.x
* (asgothian) removed extra logging
* (asgothian) fixed memory issue.
* (asgothian) Configure on Message - 5 attempts.
* (arteck) update transmitPower
* (asgothian) fix crash in ZigbeeController.ByteArrayToString
* (AlexHaxe) device designation for  devices without mapped model (allows use in groups and bindings)
*

### 2.0.4 (2025-03-09)
* (arteck) back to 2.0.2

### 2.0.3 (2025-03-07)
* (asgothian) fix configured info
* (asgothian) fix battery voltage (V -> mV)
* (asgothian) enable debug interface v1.0
* (asgothian) Push Zigbee-Herdsman to 2.5.7
* (asgothian) Push Zigbee-Herdsman-Converters to 23.1.1
* (asgothian) fix configure on message
* (asgothian) remove extra warning messages
* (asgothian) fix Adapter-Checker notes
* (asgothian) improve base64 image detection
* (asgothian) removed unused adaptert objects (info.groups, excludes) from adapter config

### 2.0.2 (2025-03-02)
* (asgothian)  expose generation with expose function requiring a device. (Issue #1842)
* (asgothian) fix failure to configure for devices needing multiple configurations (Issue #2375)
* (asgothian) fix hold/release and press/release action handling (Issue #2387)
* (asgothian) fix lib/legacy requirement for external converters (Issue #2376)
* (asgothian) improved external converter handling
* (asgothian) fix OTA bug
* (asgothian) improved message handling for devices which report values outside their defined ranges
* (asgothian) preparation for ZHC 22.x (model definition loaded on demand
* (asgothian) fix legacy definition for devices
* (asgothian) added action state for remotes.
*

### 2.0.1 (2025-02-25)
* BREAKING CHANGES
*
* switch to converters 21 changes the exposes for a large numbern of devices (mostly remotes)
* new method for controlling color based on subchannels for rgb, hs and xy
* Exposes as default for ALL devices. Use of old definition as option only
* Requires Node 20.x or newer
*
* (asgothian) Fix Pairing
* (asgothian) change ping
* (asgothian) delay map generation until refresh is activated, map messages after generation
* (asgothian) remove bindings tab from zigbee tab
* (asgothian) reorder tabs in configuration
* (asgothian) remove binding tab from configuration
* (asgothian) remove map from configuration
* (asgothian) add debug to zigbee tab
* (asgothian) Herdsman 3.2.5, Converters 21.30.0
* (asgothian) Exposes as default, use of old device definitions as legacy optional
* (asgothian) User specific images (model based, device based)
* (asgothian) Improved group editing - remove members from group card

### 1.10.14 (2025-01-01)
* (arteck) Herdsman 2.1.9, Converters 20.58.0
* (asgothian) Fix: Aqara T1M (CL-L02D)
* (arteck) deleteDeviceStates change to deleteObj

### 1.10.13 (2024-11-10)
* (arteck) corr icon download bug (axios)

### 1.10.12 (2024-11-03)
* (asgothian) corr Channel Scan

### 1.10.11 (2024-11-02)
* BREAKING CHANGE
*
*  bugs : ChannelScan is currently not available
*
*
* (lebrinkma) fix linter errors
* (asgothian) disable map display for deactivated devices
* (asgothian) new option on map: disable physics interaction
* (asgothian) new zigbee-herdsman-converters 20.28.0
* (asgothian) new zigbee-herdsman 2.1.1
* (asgothian) Allow use of keyless converters (used for TuYa and compatible devices in zigbee-herdsman-converters
* (arteck) swap from request to axios
* (arteck) delete groups works again

### 1.10.9 (2024-09-05)
* (arteck) typo admin settings
* (arteck) eslint config

### 1.10.8 (2024-09-05)
* (arteck) corr admin settings
* (arteck) add new eslint version

### 1.10.7 (2024-09-05)
* (arteck) add flow control option
* (asgothian) add new NewHerdsman
* (arteck) add new ezsp coordinator Firmware (7.4.1.0)

### 1.10.5 (2024-06-21)
* (arteck) icon ota device update
* (arteck) icon fix

### 1.10.4 (2024-04-20)
* (arteck) core update
* (arteck) dependency update

### 1.10.3 (2024-04-06)
* (arteck) dependency update

### 1.10.2 (2024-01-25)
* (arteck) dependency update

### 1.10.1 (2024-01-21)
* (arteck) Baudrate is now configurable. works ONLY with Deconz/Conbee(38400)
* (arteck) add nvbackup.json delete button

### 1.10.0 (2024-01-13)
* (arteck) new zigbee-herdsman-converters 18.x
* (arteck) configure message is now a warning

 ***********************************************

### 1.0.0 (2020-01-22)
* Powered by new [zigbee-herdsman](https://github.com/Koenkk/zigbee-herdsman) library and new [converters database](https://github.com/Koenkk/zigbee-herdsman-converters)
* Drop support NodeJS 6
* Serialport 8.0.5 (in zigbee-herdsman)
* More new devices
* Some design update
* Binding


------------------------------------------------------------------------------

## License
The MIT License (MIT)

Copyright (c) 2018-2025 Kirov Ilya <kirovilya@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.