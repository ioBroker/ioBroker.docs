---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homekit-controller/README.md
title: ioBroker.homekit-控制器
hash: NQucAtiQUOyd1k9Pgl1FFdssx3fMn5PPmENuplDEnWQ=
---
![标识](../../../en/adapterref/iobroker.homekit-controller/admin/homekit-controller.png)

![安装数量（最新）](https://iobroker.live/badges/homekit-controller-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/homekit-controller-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.homekit-controller.svg)
![下载](https://img.shields.io/npm/dm/iobroker.homekit-controller.svg)

# IoBroker.homekit-控制器
![测试和发布](https://github.com/Apollon77/ioBroker.homekit-controller/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/homekit-controller/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## IoBroker 的 homekit-controller 适配器
此适配器允许您配对和直接控制带有“与 HomeKit 一起使用”标志的设备，该标志可与 Apple Home 一起使用。该适配器支持 IP/WLAN 设备以及 BLE（蓝牙 LE）设备。该适配器在您的网络中完全本地工作。

### 适配器不是...
... 提供由 Apple Home 应用程序/系统控制的 ioBroker 设备或状态。如果你想要这个方向，请使用 [呀卡](https://github.com/jensweigele/ioBroker.yahka) 适配器。

... 支持基于线程的设备。 Homekit Thread 规范尚未公开。

###如何使用适配器
适配器侦听网络中的可用设备。

检测到的设备分为三种“类型”：

* **未配对的设备**是已发现并可配对的设备。在 ioBroker 中为这些设备生成一些基本状态，其中包含一些信息和管理状态。通过提供 PIN，您可以将这些设备与此适配器实例配对（请参阅下面的“配对”部分）
* **与此实例配对**设备可以完全控制，将使用订阅（仅限 IP 设备）和数据轮询间隔“实时”更新状态值。该设备也可以从此实例中“取消配对”（请参阅下面的部分）。
* **与其他人配对** 设备是被发现但已与其他控制器配对的设备。这些以调试模式记录，但没有为它们创建状态。如果您想将它们与 ioBroker 一起使用，您首先需要将它们与当前控制器取消配对（有时只能通过硬重置等方式 - 请参阅手册），然后它们应显示为“未配对设备”。

配对后，从设备中读取支持的状态并创建对象和状态。 HomeKit 标准中定义的所有已知数据点都应该以人类可读的方式命名。如果您将 UUID 视为名称，则设备制造商添加了自定义数据。如果知道它们提供的内容，则可以将其添加到适配器（例如为 Elgato 设备添加的适配器），以在下一版本中显示为命名。

数据点是使用适当的状态创建的，如果可用，还有正确的角色。使用其他通用角色。

###识别信息
未与任何控制器配对的设备具有可以用“true”触发的 admin.identify 状态。在这种情况下，相关设备应该识别自己（例如，灯应该闪烁等，以便可以识别）。此功能仅在设备未与控制器配对时可用。

#### 配对信息
要将设备与此适配器实例配对，您需要提供设备上显示的引脚或标签等。 PIN 是 QR 码旁边的 8 个数字。需要以 123-45-678 格式输入数字（当破折号未打印在标签上或屏幕上未显示时也是如此！）

现在需要将 PIN 输入到 admin.pairWithPin 状态 - 很快就会出现管理 UI。

将设备与此实例配对后，无法同时将设备添加到 Apple Home 应用程序等。

可能存在配对仍然存在问题的情况，因为我只能用很少的设备进行测试，所以请报告问题，我将提供说明以获取所需的调试数据。

#### 取消配对信息
要取消配对，只需使用“true”触发“admin.unpair”状态，就会执行取消配对过程 - 很快就会出现管理 UI。

#### IP 设备使用特别注意事项
IP 设备是使用 UDP 包发现的，因此您的主机需要与设备位于同一网络中。目前没有真正的解决方法，因为使用的 MDNS 记录包含配对过程的重要信息。
尤其是在使用 Docker 时，您需要找到方法（主机模式、macvlan、...）来查看 UDP 包。

没有控件或屏幕的基于 WLAN 的 IP 设备的主要挑战是让它们进入您的 WLAN 网络。很可能有制造商特定的移动应用程序最初将设备添加到您的网络。如果此初始过程还将设备与 Apple Home 配对，您可能需要在之后取消配对（例如 https://www.macrumors.com/how-to/delete-homekit-device/）。在此之后，它应该在您的 WLAN 中并且可以与此适配器配对。

一旦 IP 设备配对并且 IP 保持不变，适配器就会在启动时直接连接到设备。所以最好将IP固定在路由器中。如果 IP 已更改，则应在下次发现时建立连接并更新 IP。

#### BLE设备使用特别注意事项
默认情况下，适配器设置中禁用 BLE。启用后可以发现可达的设备。

由于蓝牙设备的限制，无法获得状态变化的“实时更新”。设备将通过触发立即数据刷新的特殊包报告“重要状态变化”（例如“开启”状态变化）。此外，数据会在定义的数据轮询间隔内刷新。不要将它们设置得太短！

重新启动适配器蓝牙设备后无法直接连接 - 系统需要从设备接收至少一个发现包以获取所需的连接详细信息。这意味着 BLE 设备的可用可能会有点延迟。

＃＃＃ 故障排除
配对 mModus Bringen PIN mit bindestrichen eingeben

BLE：iobroker 修复

https://github.com/noble/noble#running-on-linux

Adapterinstanz stoppen im Admin mach eine Shell auf auf den rechner DEBUG=hap* node /opt/iobroker/node_modules/iobroker.homekit-controller/build/main.js 0 --debug --logs Dann im Admin in de Adapter Konfig gehen (适配器 nicht dort nochmal starten ... der läuft schon auf der Kommendozeile) und einmal pairen und warten bis wieder fehler kommt und so Dann Log von der Shell bitte posten。 Da sollte mehr drin sein。 gern als File hier anhängen Zusätzlich bitte im Admin unter Objekte mal das Device Objekt siuchen von dem Gerät und da rechts auf den Stift klicken und auch das JSON posten was da angezeigt wird unter "Raw" oder so

未找到配对设置特征

https://forum.iobroker.net/post/726590

### 资源和链接
* 尝试解码 Elgato 特殊状态的资源：https://gist.github.com/simont77/3f4d4330fa55b83f8ca96388d9004e7d

＃＃＃ 去做
* 检查适配器如何与按钮一起工作（它们没有状态，我没有这样的设备。需要支持）
* 查看支持的视频设备
*查看提供图像的支持设备
* 检查轮询更新可能重叠的所有情况 - 如果有问题需要反馈

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Only use one queue for all BLE devices
* (Apollon77) Store pairing data directly after pair
* (Apollon77) Optimize handing concurrent requests
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