---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homekit-controller/README.md
title: ioBroker.homekit 控制器
hash: dxxbEvQmOG3+ID91q8935b2l3QqtFA9z/bIkibRDfVY=
---
![标识](../../../en/adapterref/iobroker.homekit-controller/admin/homekit-controller.png)

![安装数量（最新）](https://iobroker.live/badges/homekit-controller-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/homekit-controller-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.homekit-controller.svg)
![下载](https://img.shields.io/npm/dm/iobroker.homekit-controller.svg)

# IoBroker.homekit 控制器
![测试和发布](https://github.com/Apollon77/ioBroker.homekit-controller/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/homekit-controller/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

## IoBroker 的 homekit-controller 适配器
此适配器允许您配对并直接控制带有“Works with HomeKit”标志的设备，该标志可与 Apple Home 一起使用。该适配器支持 IP/WLAN 设备以及 BLE（蓝牙 LE）设备。该适配器在您的网络中完全在本地工作。

### 适配器不是...
... 提供由 Apple Home 应用程序/系统控制的 ioBroker 设备或状态。如果您想要这个方向，请使用 [夜叉](https://github.com/jensweigele/ioBroker.yahka) 适配器。

...支持基于线程的设备。 Homekit Thread 规范尚未公开。

###如何使用适配器
适配器侦听网络中的可用设备。

检测到的设备分为三种“类型”：

* **未配对的设备**是已发现并可配对的设备。在 ioBroker 中为这些设备生成了一些基本状态，其中包含一些信息和管理状态。通过提供 PIN，您可以将这些设备与此适配器实例配对（请参阅下面的“配对”部分）
* **与此实例配对** 设备可以被完全控制，将使用订阅（仅限 IP 设备）和数据轮询间隔“实时”更新状态值。该设备也可以从此实例“取消配对”（请参阅下面的部分）。
* **与其他人配对** 设备是已发现但已与其他控制器配对的设备。这些记录在调试模式下，但没有为它们创建状态。如果您想将它们与 ioBroker 一起使用，您首先需要将它们与当前控制器取消配对（有时只能通过硬重置等方式实现 - 请参阅手册），然后它们应显示为“未配对设备”。

配对后，从设备中读出支持的状态，并创建对象和状态。 HomeKit 标准中定义的所有已知数据点都应以人类可读的方式命名。如果您看到 UUID 作为名称，则设备制造商添加了自定义数据。如果知道它们提供了什么，则可以将其添加到适配器（例如，为 Elgato 设备添加的那些）以在下一版本中显示为命名。

数据点是用正确的状态创建的，如果可用，还有正确的角色。使用其他通用角色。

### 识别信息
未与任何控制器配对的设备具有 admin.identify 状态，可以用“true”触发。在这种情况下，相关设备应识别自身（例如，灯应闪烁等，以便可以识别）。此功能仅在设备未与控制器配对时可用。

####配对信息
要将设备与此适配器实例配对，您需要提供设备上显示的引脚或标签等。 PIN 码是 QR 码旁边的 8 个数字。数字需要以 123-45-678 的格式输入（当破折号未打印在标签上或显示在屏幕上时也是如此！）

现在需要将 PIN 输入到 admin.pairWithPin 状态 - 管理 UI 将很快出现。

将设备与此实例配对后，无法同时将设备添加到 Apple Home 应用程序等。

可能有些情况下配对仍然有问题，因为我只能用很少的设备进行测试，所以请报告问题，我将提供支持以获取所需的调试数据。

####取消配对信息
要取消配对，只需使用“true”触发“admin.unpair”状态，取消配对过程将被执行 - 管理 UI 将很快出现。

####使用IP设备的特别注意事项
IP 设备是使用 UDP 包发现的，因此您的主机需要与设备位于同一网络中。目前没有真正的解决方法，因为使用的 MDNS 记录包含配对过程的重要信息。
尤其是在使用 Docker 时，您需要找到查看 UDP 包的方法（主机模式、macvlan 等）。

没有控件或屏幕的基于 WLAN 的 IP 设备的主要挑战是让它们进入您的 WLAN 网络。很可能有特定于制造商的移动应用程序最初将设备添加到您的网络。如果此初始过程也将设备与 Apple Home 配对，您可能需要在之后取消配对（例如 https://www.macrumors.com/how-to/delete-homekit-device/）。在此之后，它应该在您的 WLAN 中并且可以与此适配器配对。

一旦 IP 设备配对并且 IP 保持不变，适配器就会在启动时直接连接到设备。所以最好在你的路由器中固定 IP。如果 IP 已更改，则应在下一次发现时建立连接，并应更新 IP。

#### BLE 设备使用的特别注意事项
默认情况下，在适配器设置中禁用 BLE。启用后可以发现可达的设备。

由于蓝牙设备的限制，状态变化的“实时更新”不可用。设备将通过将触发立即数据刷新的特殊包报告“重要状态变化”（例如“开启”状态变化）。此外，数据在定义的数据轮询间隔内刷新。不要将它们设置得太短！

适配器重启后蓝牙设备无法直接连接——系统需要从设备接收至少一个发现包以获取所需的连接详细信息。这意味着 BLE 设备的可用时间可能会有所延迟。

### 资源和链接
* 试图解码 Elgato 特殊状态的资源：https://gist.github.com/simon77/3f4d4330fa55b83f8ca96388d9004e7d

*

＃＃＃ 去做
* 检查适配器如何与按钮配合使用（它们没有状态，而且我没有这样的设备。需要对此的支持）
* 研究支持的视频设备
* 研究提供图像的支持设备
*检查轮询更新可能重叠的所有情况-如果有问题需要反馈

## Changelog
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

Copyright (c) 2021 Ingo Fischer <github@fischer-ka.de>

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