---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homekit-controller/README.md
title: ioBroker.homekit-控制器
hash: +2YzgHirnHHWaBtRjfXGg0pLsndjbJJuAgYkUoisYvA=
---
![商标](../../../en/adapterref/iobroker.homekit-controller/admin/homekit-controller.png)

![安装数量（最新）](https://iobroker.live/badges/homekit-controller-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/homekit-controller-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.homekit-controller.svg)
![下载](https://img.shields.io/npm/dm/iobroker.homekit-controller.svg)

# IoBroker.homekit-控制器
![测试和发布](https://github.com/Apollon77/ioBroker.homekit-controller/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/homekit-controller/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## IoBroker 的 homekit-controller 适配器
此适配器允许您配对并直接控制带有“works with HomeKit”标志的设备，这些设备可与 Apple Home 一起使用。该适配器支持 IP/WLAN 设备以及 BLE（蓝牙 LE）设备。该适配器完全在您的网络本地工作。

### 适配器不是...
... 提供由 Apple Home 应用程序/系统控制的 ioBroker 设备或状态。如果你想要这个方向，请使用 [亚卡](https://github.com/jensweigele/ioBroker.yahka) 适配器。

...支持“仅”基于线程的设备。 Homekit Thread 规范尚未公开。从目前的知识来看，市场上所有的设备也都支持 BLE 或 WLAN，因此适配器将不会使用 Thread，而是使用其他方式进行通信。

### 如何使用适配器
适配器侦听网络中的可用设备。

检测到的设备分为三种“类型”：

* **未配对的设备** 是已发现且可配对的设备。在 ioBroker 中为这些设备生成一些基本状态，其中包含一些信息和管理状态。通过提供 PIN，您可以将这些设备与此适配器实例配对（请参阅下面的“配对”部分）
* **与此实例配对** 设备可以完全控制，将使用订阅（仅限 IP 设备）和数据轮询间隔“实时”更新状态值。该设备也可以从这个实例中“取消配对”（参见下面的部分）。
* **与其他人配对** 设备是已发现但已与其他控制器配对的设备。这些记录在调试模式下，但没有为它们创建状态。如果您想将它们与 ioBroker 一起使用，您首先需要将它们与当前控制器取消配对（有时只能通过硬重置等方式实现 - 请参阅手册），然后它们应显示为“未配对的设备”。

配对后，从设备中读出支持的状态，并创建对象和状态。 HomeKit 标准中定义的所有已知数据点都应以人类可读的方式命名。如果您看到 UUID 作为名称，则设备制造商添加了自定义数据。如果知道他们提供什么，可以将其添加到适配器（例如，为 Elgato 设备添加的适配器）以在下一个版本中显示为命名。

创建的数据点具有适当的状态，如果可用，还具有正确的角色。否则使用通用角色。

### 识别信息
未与任何控制器配对的设备具有 `admin.identify` 状态，可以使用 `true` 触发。在这种情况下，相关设备应该识别自己（例如，灯应该闪烁等，以便它可以被识别）。此功能仅在设备未与控制器配对时可用。

#### 配对信息
要将设备与此适配器实例配对，您需要提供设备上显示的 pin 或标签等。 PIN 是二维码旁边的 8 个数字。数字需要以 123-45-678 的格式输入（即使破折号未打印在标签上或屏幕上也没有显示！）

现在需要将 PIN 输入到 admin.pairWithPin 状态 - 很快就会出现一个管理 UI。

将设备与此实例配对后，无法同时将设备添加到 Apple Home 应用程序等。

可能存在配对问题仍然存在的情况，因为我只能使用很少的设备进行测试，所以请报告问题，我将提供说明以获取所需的调试数据。

#### 解除配对信息
要取消配对，只需触发带有“true”的 `admin.unpair` 状态，然后将执行取消配对过程 - 管理 UI 将很快出现。

#### 使用IP设备的特别注意事项
IP 设备是使用 UDP 包发现的，因此您的主机需要与设备位于同一网络中。目前没有真正的解决方法，因为使用的 MDNS 记录包含配对过程的重要信息。
特别是在使用 Docker 时，您需要找到方法（主机模式、macvlan 等）来查看 UDP 包。

没有控件或屏幕的基于 WLAN 的 IP 设备的主要挑战是让它们进入您的 WLAN 网络。很可能有制造商特定的移动应用程序将设备最初添加到您的网络。如果此初始过程还将设备与 Apple Home 配对，您之后可能需要取消配对（例如 https://www.macrumors.com/how-to/delete-homekit-device/）。在此之后，它应该在您的 WLAN 中并且可以与此适配器配对。

一旦 IP 设备配对并且 IP 保持不变，适配器就会在启动时直接连接到设备。所以最好将 IP 固定在路由器中。如果 IP 已更改，则应在下一次发现时建立连接并更新 IP。

#### BLE设备使用特别注意事项
默认情况下，适配器设置中禁用 BLE。启用后可以发现可访问的设备。

由于蓝牙设备的限制，状态变化的“实时更新”不可用。设备将通过触发立即数据刷新的特殊包报告“重要状态变化”（例如“开启”状态变化）。此外，数据会在定义的数据轮询间隔内刷新。不要将它们设置得太短！

适配器蓝牙设备重启后无法直接连接 - 系统需要从设备接收至少一个发现包以获取所需的连接详细信息。这意味着 BLE 设备的可用时间可能会稍有延迟。

＃＃＃ 故障排除
#### 已知的不兼容设备
如果您在将设备与此适配器配对时遇到问题，请尝试将其与普通的 iOS Apple Home App 配对。如果这不起作用，则设备有问题，然后此适配器也无济于事。锅尝试重置，但没有机会。

例如，目前某些 `Tado Door Locks` 就是这样。他们需要使用 `Tado App` 配对，这会以某种方式将设备注册到 Apple Home，但不是通过官方配对过程。

此外，`Nuki 3 Locks (BLE)` 也无法配对，因为它们使用 Apple 未公开记录的硬件身份验证组件。

对于 Netatmo，用户发现了在出现问题时如何进行配对。请参阅 https://github.com/Apollon77/ioBroker.homekit-controller/issues/233#issuecomment-1311983379

#### 打开工单前要检查的其他潜在问题
##### 用于 BLE 设备
* 如果您遇到 BLE 连接无法正常工作的问题，或者当适配器尝试初始化 BluetoothLE 连接时出现错误，请先运行 `iobroker fix` 以确保正确设置所有权限和所需的功能。
* 如果这没有帮助，请检查 https://github.com/noble/noble#running-on-linux
* 请确保您的系统是最新的，包括内核`apt update && apt dist-upgrade`
* 尝试重置相关的 BLE 设备，例如`sudo hciconfig hci0 重置`
* 对于问题还提供 `uname -a` 和 `lsusb` 的输出
* 可以使用 `sudo hcidump -t -x >log.txt` 获取低级别 BLE 设备日志（在第二个 shell 中另外运行适配器）

##### 一般建议
* 设备是否有配对模式或需要先激活的模式？但也要仔细阅读手册，也许配对模式适用于其他一些遗留协议或桥接器，但不适用于 Apple Home。
* 基本上，如果在尝试配对时弹出错误“未找到配对设置特征”，则设备在当前状态下不支持通过 Homekit 进行配对。适配器cn什么都不做呢！
* 请确保以“XXX-XX-XXX”的形式输入带破折号的 PIN。图书馆应该已经拒绝其他格式的错误，但只是为了确保

##调试
当您遇到问题并想报告问题（见下文）时，增强的调试日志总是有帮助的。

* 请在 iobBroker Admin 中停止适配器实例
* 在相关服务器上打开一个shell
* 使用 `DEBUG=hap* node /opt/iobroker/node_modules/iobroker.homekit-controller/build/main.js 0 --debug --logs` 手动启动适配器
* 然后做任何产生错误的事情并从 shell 中获取日志并发布问题。
* 也在问题中发布控制台日志。这将生成协议级别的日志。
* 此外，在管理员“对象”选项卡中找到相关对象，然后单击右侧的铅笔并提供对象的 JSON。

### 资源和链接
* 试图解码 `Elgato` 特殊状态的资源：https://gist.github.com/simont77/3f4d4330fa55b83f8ca96388d9004e7d

＃＃＃ 去做
* 检查适配器如何与按钮一起工作（它们没有状态，我没有这样的设备。需要对此的支持）
* 查看支持的视频设备
* 查看提供图像的支持设备（有方法但从未实际使用过）

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.6 (2023-01-05)
* (Apollon77) Upgrade noble library

### 0.5.5 (2022-12-31)
* (Apollon77) Downgrade noble library again

### 0.5.3 (2022-12-22)
* (bluefox) Corrected active TAB Background

### 0.5.2 (2022-12-22)
* (bluefox) Updated GUI packages
* (Apollon77) Upgraded noble BLE library

### 0.5.1 (2022-06-10)
* (Apollon77) Optimizations for BLE connections

### 0.5.0 (2022-06-08)
* (Apollon77) Add Connection identifier for Admin object list
* (Apollon77) Count polling errors and reinitialize device connection when too many errors occur
* (Apollon77) Optimize adapter startup to prevent double initialization of devices

### 0.4.4 (2022-05-06)
* (Apollon77) Add Host header to HTTP devices to prevent issues with some devices
* (Apollon77) Fix several edge case issues

### 0.4.3 (2022-01-25)
* (Apollon77) make sure all connections get closed on reconnect

### 0.4.2 (2022-01-25)
* (Apollon77) Reset HTTP connection if timeouts happen on data polling

### 0.4.1 (2022-01-21)
* (Apollon77) Optimize close of connections on adapter stop

### 0.4.0 (2022-01-21)
* (Apollon77) performance increase by using persistent connections to IP devices and many more optimizations
* (Apollon77) Only use one queue for all BLE devices
* (Apollon77) Store pairing data directly after pair
* (Apollon77) Optimize handing of concurrent requests
* (Apollon77) Optimize value update handling and better detect stale data to force an update on next polling

### 0.3.3 (2021-10-26)
* (bluefox) Fix the Discovery checkboxes

### 0.3.1 (2021-10-25)
* (Apollon77) Fix datatype of lastDiscovered state

### 0.3.0 (2021-10-24)
* (Apollon77) BREAKING CHANGE: All channel names will be changed and a number gets added at the end of the name. Please manually delete the ones without such a number

### 0.2.0 (2021-10-23)
* (bluefox) Add Admin UI
* (Apollon77) Store pairing data additionally in an instance directory and retry them on start if objects where deleted or such
* (Apollon77) Add info.lastDiscovered state with a timestamp to allow manual cleanup of devices that are paired somewhere else then with the adapter instance (because such objects would currently not be deleted)
* (Apollon77) Add missing device and channel objects
* (Apollon77) Always convert bool-type to boolean because it might be numbers coming from the devices
* (Apollon77) sort devices for Admin UI to have those with available actions on top
* (Apollon77) Enhance error messages
* (Apollon77) Adjust some roles

### 0.1.0 (2021-10-19)
* (Apollon77) Optimizations and added some Elgato states
* (Apollon77) Initial GitHub release

### 0.0.x
* (Apollon77) Initial commit and Alpha GitHub testing

## License
MIT License

Copyright (c) 2021-2023 Ingo Fischer <github@fischer-ka.de>

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