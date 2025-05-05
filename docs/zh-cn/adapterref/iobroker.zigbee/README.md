---
BADGE-Number of Installations: http://iobroker.live/badges/zigbee-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.zigbee.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.zigbee.svg
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zigbee/README.md
title: 适用于 ZigBee 设备的 ioBroker 适配器
hash: FhTiVlh4uaDR9CsBwSdMRXkOU9S+qgIoxUFu7yEeReo=
---
# IoBroker 适配器（适用于 ZigBee 设备）
使用 ZigBee 网络协调器，创建一个专用的 ZigBee 网络，ZigBee 设备（灯、调光器、传感器等）可以加入该网络。由于与协调器直接交互，ZigBee 适配器允许控制设备，而无需任何来自制造商（小米/Tradfri/Hue）的网关/网桥。有关 ZigBee 的更多信息，请参见[这里](https://github.com/Koenkk/zigbee2mqtt/wiki/ZigBee-network)。

＃＃ 硬件
协调器（见上文）需要额外的硬件来实现 USB 和 ZigBee 无线信号之间的转换。协调员有三种类型：

- Raspberry Pi 的插件模块（不建议使用这些模块。）
- USB 连接模块，可以是开发板或 USB 记忆棒
- 网络协调员

兼容协调员的完整列表可在[这里](https://www.zigbee2mqtt.io/guide/adapters/)中找到。我们建议仅使用列为“推荐”的协调员。您还可以在那里找到安装所需固件的说明。

协调器也与预装固件一起出售。适用以下内容：**任何固件与 Zigbee2mqtt.io 兼容的协调器也可以与 ZigBee 适配器一起使用**。

目前（截至 2025 年 3 月），“Sonoff ZIGBEE 3.0 USB-STICK CC2652P”（CC2652P 和 EZSP 芯片组版本）和带有 Cod.m 和/或 XTG 固件的网络协调器特别受欢迎。 Conbee II 和 Conbee III 也经常使用。强烈建议不要将 TI 协调器与 CC2530/CC2531 一起使用 - 这些现在被认为已经过时了。

连接到 ZigBee 网络的设备将其状态传输给协调器并通知其事件（按钮按下、运动检测、温度变化等）。此信息显示在相应 ioBroker 对象下的适配器中，因此可以在 ioBroker 中进一步处理。还可以向 ZigBee 设备发送命令（改变插座和灯的状态、颜色和亮度设置等）。

＃＃ 软件
该软件分为“转换器”和“适配器”。

![](../../../de/adapterref/iobroker.zigbee/img/software1.jpg)

   - 转换器

该转换器分为两部分：<br> a) 一般提供来自 ZigBee 无线电信号的数据。此[软件部分](https://github.com/Koenkk/zigbee-herdsman)适用于所有 ZigBee 设备。<br> b) 将数据以设备特定的[加工](https://github.com/Koenkk/zigbee-herdsman-converters) 形式传输到适配器的定义接口。

   - 适配器<br>

      该软件部分是转换器与ioBroker的连接。 [适配器](https://github.com/ioBroker/ioBroker.zigbee) 包括用于管理 ZigBee 设备的图形用户界面和用于控制 ZigBee 设备的 ioBroker 对象的创建。

＃＃ 安装
1. 将协调器硬件连接到运行 ioBroker 的计算机（或网络，如果是 LAN/WLan 协调器）。<br>
2. 在服务器上打开控制台。对于基于 Unix/Linux 的系统，可以通过 ssh 远程完成此操作。根据所使用的操作系统，可能需要其他程序（例如 Windows 上的 puTTY）。<br>
3.确定协调器路径。在 Unix/Linux 系统上，它通常位于 /dev/serial/by-id 目录中。或者，需要 /dev/ttyUSB*、/dev/ttyAM* (Unix/Linux)、/dev/tty.usbserial-* (macOS) 或 com* (Windows)。<br>

以下示例展示了 Raspberry Pi 上的 Linux 安装。命令`ls -la /dev/serial/by-id/`产生图像中所示的输出。
![](../../../de/adapterref/de/img/Bild2.png)

4. ioBroker -&gt; 安装ZigBee适配器，这里以1.8.10版本为例。<br> ![](../de/img/Bild3.png)<br>这将安装所有必需的软件组件（转换器和适配器）。<br> ![](../../../de/adapterref/iobroker.zigbee/img/Zigbee_config_en.png)<br>
5.打开适配器配置。上图显示的是 3.0.0 或更新版本的界面。

在这种情况下，管理员指示 ZigBee 子系统是否启动（A）。

6. 输入协调器 (B) 的端口。对于 USB 协调器来说，这是先前确定的设备路径。对于通过网络控制的协调器，必须以 tcp://ip:port 的形式指定网络地址和端口，而不是设备路径。如果适配器本身（而不是 Zigbee 子系统）处于活动状态，则可以选择可用的串行接口列表。选择时适用以下规定：
- 如果系统上使用具有不同 USB 设备的多个适配器进行通信，则绝对应该选择 /dev/serial/by-id 目录中的端口（如果可用）。这可确保在系统重新启动时保留适配器与协调器的关联。
- 如果仅使用一个 USB 设备，则最好使用 /dev/TTY* 端口。这样，在出现缺陷时就可以用相同的设备替换协调器，而无需调整配置。
7. 分配网络 ID 和 Pan ID，以区别于无线范围内的其他 ZigBee 网络。例如，从适配器版本 2.1.0 开始，ExtPanID（C）和 PanID（D）会自动预先分配随机值，直到保存配置为止。<br>
8. 选择合适的 ZigBee 通道（E）。请注意，ZigBee 和 2.4GHz Wi-Fi 共享相同的频段。因此，最佳信道取决于该区域使用的 Wi-Fi 信道等因素。 ZigBee 和 Wi-Fi 的频道名称**不**相同，例如 WIFI 频道 11 和 Zigbee 频道 11 不会互相干扰。还建议将您的选择限制在 ZigBee Light Link 通道（11、15、20、25）内。如果选择的频道不属于ZLL，界面会在输入的频道上方显示一个带有感叹号的黄色三角形。<br>适配器成功启动后，还可以通过配置执行网络通道的扫描。<br>

**注意：**从适配器版本 2.1.0 开始，无需删除配置和重新学习所有设备即可更改频道。但是，**此功能仍处于实验阶段**——个别设备可能无法响应频道变化；这些设备随后将需要重新学习。<br>

9.检查Zigbee子系统是否正在启动。为此，尝试使用 *Start/Stop* (F) 启动 Zigbee 子系统。您可以在日志中观察启动尝试的进度。当牧民开始时，图标（A）从黑色/红色变为黑色/橙色。如果尝试成功，图标将完全消失；否则，它会再次变为红色，并且日志中的消息会提供有关原因的线索。<br>

也可以使用相同的按钮来停止牧民。该图标也显示为黑色/橙色。 **重要提示：在某些情况下，停止可能需要长达 2 分钟 - 尤其是在使用网络协调器时。**这里需要耐心。牧民被终止后，图标会显示黑色/红色，并显示消息“牧民已停止！”出現。
根据错误情况，Herdsman 无法启动可能有多种原因。如果“只是”超时，当然建议立即重新尝试。如果配置不一致，则会在日志中显示相关数据。适配器提供了两种解决冲突的选项：

- 从 NV 备份读取数据。在这种情况下，适配器的配置会被调整。
- 删除 NV 备份。在这种情况下，适配器的配置保持不变。这**强制**重建网络，随后要求重置和重新训练所有先前训练过的设备。<br>

日志输出还可用于在[ioBroker论坛](https://forum.iobroker.net)中搜索解决方案。请突出显示消息并将其以文本形式发布到论坛中。

## 配对
每个 ZigBee 设备（开关、灯泡、传感器……）必须与协调器配对（配对）：<br>

   - ZigBee设备：

每个 ZigBee 设备只能连接到 1 个 ZigBee 网络。如果 ZigBee 设备仍保存有不同协调器（例如 Philips Hue Bridge）的配对信息，则必须先将其与该 ZigBee 网络分离。与旧 ZigBee 网络的分离最好通过旧 ZigBee 网络的用户界面（例如 Philips Hue 应用程序）来完成。或者，您可以将 ZigBee 设备重置为出厂设置。<br>将 ZigBee 设备置于配对模式通常有以下选项<br>

        1. 取消 ZigBee 设备与 ZigBee 网络的配对
        2. 按下 ZigBee 设备上的配对按钮
        3. 关闭ZigBee设备的电源电压，然后重新打开

然后，ZigBee 设备处于配对模式，通常持续 60 秒。与恢复出厂设置的过程类似，激活配对模式也取决于相应的设备类型（如有必要，请阅读 ZigBee 设备的操作说明）。

   - 协调员：

按下绿色按钮使协调器进入配对模式 60 秒。<br> ![](../../../de/adapterref/iobroker.zigbee/img/Zigbee_pairing_en.png)

   - 等到对话框中出现“新设备加入”：<br>

![](../../../de/adapterref/iobroker.zigbee/img/Bild13.png)

   - 检查配对：

要配对的设备必须得到 ioBroker ZigBee 适配器的支持。在最佳情况下，ZigBee 适配器中会显示一个新设备（例如飞利浦光带），并创建相应的 ioBroker 对象：![](../de/img/Bild14.png) ![](../../../de/adapterref/de/img/Bild15.png)

   - 最坏的情况是，ZigBee 设备目前不受支持。下一节将介绍使用此 ZigBee 设备需要做什么。

## 到目前为止配对的未知 ZigBee 设备
对于以前未知的 ZigBee 设备，配对期间会出现 ZigBee 设备的 ZigBee 名称（例如，HOMA1001），并带有后缀“supported”：false。<br> ![](../../../de/adapterref/de/img/Bild16.png)<br>

旋转此图块可提供有关 ZigBee 设备的详细信息：<br> ![](../de/img/Bild17.png) ![](../../../de/adapterref/iobroker.zigbee/img/Bild18.png)<br>

在[github.com](https://github.com/ioBroker/ioBroker.zigbee/issues)注册后，可以通过“问题”报告丢失的 ZigBee 设备：

![](../../../de/adapterref/de/img/Bild19.png)<br>

在问题中包含有关图块的详细信息（见上文），创建简短的文档（最好是英文），然后提交。然后开发人员将会对该问题做出回应。

因此，可能出现以下两种情况之一：

- 适配Zigbee Herdsman转换器。这需要更新版本的 Zigbee 适配器，该适配器首先经过测试，然后在最新存储库中提供。
- 创建“外部转换器”——一个包含 JS 代码的文件，可以复制到 Zigbee 适配器的数据目录并在适配器的配置中指定。

在这两种情况下，重新启动适配器就足够了——将创建适配器相应适应的数据点。如果数据点不再受支持，它们将以橙色突出显示，并且适配器将显示一个用于删除孤立数据点的按钮。

## ZigBee 适配器内的符号
|图标 |描述 |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![](../../../de/adapterref/de/img/Bild30.png) | **状态清理**<br>删除未连接的 ioBroker 对象。这些可以通过“排除”操作来创建。 |
| ![](../../../de/adapterref/de/img/Bild31.png) | **检查固件更新**<br> Zigbee 适配器支持 OTA 固件升级，前提是连接的设备支持。此按钮启动对较新固件的检查 - 然后必须在每个设备上单独启动实际升级。 |
| ![](../../../de/adapterref/de/img/Bild32.png) | **添加群组**<br> Zigbee 规范支持创建可通过单个命令一起控制的设备组。虽然规范支持几乎任何命令作为组命令，但 Zigbee 适配器中的实现仅限于灯泡 - 此按钮可用于创建新组。可以通过设备添加和删除成员|
| ![](../../../de/adapterref/de/img/Bild33.png) | **重置并配对 Touchlink**<br> Touchlink 是 Zigbee Light Link (ZLL) 的一项功能，允许物理上彼此靠近的设备无需连接到协调器即可相互通信。并非所有设备都支持此功能。要通过 Touchlink 将 Zigbee 设备重置为出厂设置，请将设备靠近（&lt; 10 厘米）Zigbee 协调器，然后按下绿色符号。 **警告** 如果 Touchlink 重置过程未正确执行，则距离较远的设备也可能会被重置。如果有疑问，建议暂时拔掉所有受影响的设备。 |
| ![](../../../de/adapterref/de/img/Bild34.png) | **通过二维码配对**<br>有些设备需要额外的安全代码才能与网络配对。这通常以设备上和/或说明书中的二维码形式提供。只有事先输入相应的代码才有可能与这些设备配对。 **注意** 许多说明都指定了二维码，应该使用制造商特定的应用程序读取这些二维码，以便将设备连接到制造商的网关，即使设备不支持安全代码。在这种情况下，当您尝试输入代码时，适配器会显示错误。如果发生这种情况，尝试以“正常”方式对设备进行编程是有意义的。 |
| ![](../de/img/Bild34.png) | **通过二维码配对**<br>有些设备需要额外的安全代码才能与网络配对。这通常以设备上和/或说明书中的二维码形式提供。只有事先输入相应的代码才有可能与这些设备配对。 **注意** 许多说明都指定了二维码，应该使用制造商特定的应用程序读取这些二维码，以便将设备连接到制造商的网关，即使设备不支持安全代码。在这种情况下，当您尝试输入代码时，适配器会显示错误。如果发生这种情况，尝试以“正常”方式对设备进行编程是有意义的。 | | ![](../../../de/adapterref/de/img/Bild35.png) | **配对**<br>开始新 ZigBee 设备的配对过程。按下此按钮将打开网络（可配置）10 到 250 秒之间的时间，以便将新设备添加到网络。 |

## 设备图块
|图标 |描述 |
| ![](../../../de/adapterref/de/img/Bild36.png) |自上次与该 ZigBee 设备进行数据交换以来的时间。 |
| ![](../../../de/adapterref/de/img/battery.png) |电池电量（如果设备报告电池电量）。 |
| ![](../de/img/Bild37.png)<br> ！[](../../../de/adapterref/de/img/disconnected.png) |此 ZigBee 设备上的 ZigBee 无线电信号强度（&lt;10 差，&lt;50 中，&gt;50 好）。 ZigBee 是一种无线网状网络。大多数由主电源供电的 ZigBee 设备（例如飞利浦 Hue 灯）可以充当 ZigBee 路由器，即无线节点。因此，ZigBee 设备不一定必须与协调器建立直接无线连接，而是可以使用网络中的任何路由器进行无线连接。每个 ZigBee 路由器都会扩展网络的无线范围。所有ZigBee设备都会定期检查是否有更好的无线路由并自动切换。然而，这个过程可能需要几分钟。<br>手动将设备分配给路由器是不可能的。<br>当设备被视为“未连接”时，会显示红色的划掉符号。 |
| ![](../de/img/grp_ok.png) ![](../../../de/adapterref/de/img/grp_nok.png) |群组状态<br>绿色圆圈表示该群组有成员且可以正常运作；当组为空或由于其他原因无法使用时，会出现红色 X。 |
| ![](../../../de/adapterref/de/img/info.png) |信息<br>打开设备的信息显示。此页面显示的信息直接来自设备。它也适用于未知设备。 |
| ![](../../../de/adapterref/de/img/debug.png) |调试设备<br>启用/禁用此设备扩展调试消息的生成。图标的颜色表示当前状态：（黑色/白色：无调试消息，绿色：调试消息 - 可以使用此按钮停用。橙色：通过 zigbee.x.info.debugmessages 下的过滤器调试消息。|
| ![](../../../de/adapterref/de/img/on_off.png) |开/关<br>此按钮可用于激活/停用设备。已停用的设备不会进行任何通信。 |
| ![](../../../de/adapterref/de/img/edit_image.png) |分配图像/名称<br>此按钮允许您根据设备或设备类型为设备指定自定义图像和/或名称。即使删除设备，以此方式进行的设置也会保留。 |
| ![](../../../de/adapterref/de/img/edit_grp.png) |编辑姓名/群组<br>此按钮可用于更改设备的名称，以及（如果适用）将设备分配到一个或多个组。 |
| ![](../../../de/adapterref/de/img/delete.png) |删除设备<br>开始此设备的删除过程。 |
| ![](../../../de/adapterref/de/img/delete.png) |删除设备<br>开始删除此设备的过程。 |

## 附加信息 Zigbee 适配器与[Zigbee2mqtt](https://www.zigbee2mqtt.io/) 项目 ([Github 链接](https://github.com/Koenkk/zigbee2mqtt))。可以使用 MQTT 或它自己的 [适配器] 直接将 zigbee2mqtt.io 与 ioBroker 一起使用](https://github.com/arteck/ioBroker.zigbee2mqtt) 共享相同的库（zigbee-herdsman、zigbee-herdsman-converters）。<br>由于库是共享的，zigbee2mqtt.io 支持的任何设备最终也将在 Zigbee 适配器中得到支持。由于需要进行兼容性检查，这可能需要几天或几周的时间。生成描述设备及其 zigbee2mqtt.io 集成的问题通常会导致临时解决方案或适配器更新以包括 zigbee 适配器中的支持。<br>与此适配器相关的其他主题也记录在相关的[维基百科](https://github.com/ioBroker/ioBroker.zigbee/wiki)中。

## Changelog
### 3.0.0 (2025-04-08)
* (asgothian) Breaking change: Start of zigbee subsystem requires configuration entry !!!
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