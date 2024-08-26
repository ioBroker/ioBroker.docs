---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.yahka/README.md
title: iobroker.yahka
hash: 5kS1aNzjVYFZ7GMXeZQp0GDoEU84l7z6x91GrxmtWbQ=
---
![标识](../../../en/adapterref/iobroker.yahka/admin/yahka.png)

![安装数量](http://iobroker.live/badges/yahka-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.yahka.svg)
![下载](https://img.shields.io/npm/dm/iobroker.yahka.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.yahka.svg?branch=master)
![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

# Iobroker.yahka
## 安装和使用
有关如何安装和配置此适配器的详细信息，请参阅[维基百科](https://github.com/jensweigele/ioBroker.yahka/wiki)

## 先决条件
在安装适配器之前，您需要一些软件包（适用于 Linux）：`sudo apt-get install libavahi-compat-libdnssd-dev`

## 安装最新的**版本**
只需点击 ioBroker 管理面板中“适配器”页面上“Homekit yahka 适配器”后面的“+”按钮即可。

## 安装最新的**Beta**
如果您想抢先测试最新的测试版，您可以通过 GitHub url 安装适配器。

（有时需要额外上传（例如`iobroker upload yahka`）并重新启动适配器）

## 备份和恢复
注意：为了能够在另一个系统上恢复`ioBroker.yahka`，除了通常的`iobroker backup`和`iobroker restore`之外，还必须备份`/opt/iobroker/iobroker-data`下的`yahka.X.hapdata`文件夹，并在必要时恢复。[维基](https://github.com/jensweigele/ioBroker.yahka/wiki/ioBroker.yahka-auf-ein-anderes-System-umziehen) / [问题](https://github.com/jensweigele/ioBroker.yahka/issues/176)

备份和恢复的另一个选项是 [备份](https://github.com/simatec/ioBroker.backitup/blob/master/README.md) 适配器。这会自动备份 `yahka.X.hapdata` 文件夹。
也可以通过 BackItUp GUI 进行恢复。

您可以找到详细的描述[这里](https://github.com/simatec/ioBroker.backitup/wiki/ioBroker.backitup-Wiki-Deutsch#yahka-backup)。

故障排除
### 网桥不工作或设备没有响应
尝试更改网桥的 MAC 地址/用户名或激活 ciao 广告商

### 并非所有新功能都可用：
如果 yahka 更新后并非所有新功能都可用，请尝试上传（例如`iob upload yahka`）并重新启动适配器。

### 缺少 Avahi 守护进程 (linux)
如果您在日志中遇到以下错误：

```
Error:	2016-07-26 18:57:17.989	error	at Error (native)
Error:	2016-07-26 18:57:17.989	error	dns service error: unknown
uncaught	2016-07-26 18:57:17.985	error	exception: dns service error: unknown
```

您必须执行一些额外的步骤：

* 安装 avahi 守护进程：

`sudo apt-get install avahi-daemon -y`

* 编辑 avahi-daemon.conf

`sudo nano avahi-daemon.conf `

改变以下变量：

```
host-name=\<put in your hostname\>
domain-name=local
use-ipv4=yes
use-ipv6=yes
enable-dbus=yes
```

### 缺少 pam-devel 包 (linux)
如果您在日志中遇到以下错误：

```
../authenticate_pam.cc:30:31: fatal error: security/pam_appl.h: Datei oder Verzeichnis nicht gefunden
#include <security/pam_appl.h>
```

您必须安装 pam-devel 包：

* 安装 avahi 守护进程：

`sudo apt-get install pam-devel -y`

### 缺少 bonjour（Windows）
- 下载：`https://www.samuelattard.com/files/bonjourcore2.msi`
- 执行：`msiexec /i bonjourcore2.msi /qn`
- 删除：`del bonjourcore2.msi`
- 下载：`https://www.samuelattard.com/files/bonjoursdksetup.exe`
- 执行：`bonjoursdksetup.exe /quiet`
- 删除：`del bonjoursdksetup.exe`
- 设置：`set BONJOUR_SDK_HOME=C:\Program Files\Bonjour SDK`

然后安装 yahka 适配器。

关于 HomeKit 的一些话
HomeKit的架构如下：

有**设备**作为逻辑实体。每个设备可以有多个**服务**，每个服务有多个**特征**。

最后，特征是一个可以读取或写入值的端点。

服务可以具有哪些特性，由 Apple/HomeKit 定义，并由服务类型决定。服务类型也是由 Apple/HomeKit 定义的。

例子：

车库门开启器是一种可以提供两种服务的设备：

1.车库门开启器
2. 光

车库门开启器服务本身可能具有不同的特性，例如：CurrentDoorState、TargetDoorState 等等。

此外，灯光服务可以具有不同的特性，例如：开启（以及许多其他用于改变灯光颜色等的特性）

## Yahka 做什么
使用 Yahka 可以将 ioBroker 数据点映射到 HomeKit 特征。

由于有时需要映射（例如，车库门的“状态”值在 HomeKit 和其他系统之间是不同的），因此也可以指定函数来转换值。这将在下面描述。

为了避免过多的管理工作，您在 Yahka 中创建的所有设备都位于所谓的“桥接器”后面。使用此桥接器，您只需将桥接器与您的 iOS 设备配对即可访问所有设备。否则，您需要将每个 Yahka 设备与 Homekit 配对。

## 设置桥接并创建设备和服务
每个需要与 Homekit 配对的设备都需要一个“用户名”，其形式为 mac 地址。Yahka 会为每个 yahka 实例自动生成一个随机用户名。

**重要提示：如果您在将 Yahka 与 HomeKit 配对后更改用户名，则需要重新配置 iOS 中的所有设备（房间分配、位置等）。更改用户名意味着 iOS 认为这是一个全新的设备！**

除了用户名之外，您还需要指定一个 PIN 码，该 PIN 码需要在 iOS 设备上输入。
所有这些都可以通过单击 Yahka 管理面板中的“:yahka.0”来指定。（单击列表条目后展开右侧面板）。桥的名称也可以在那里更改。

设置桥接器后，您可以使用顶部的“添加设备”按钮添加您喜欢的设备。
添加/选择设备后，您可以向该设备添加服务。

需要指定服务名称和服务类型。

根据服务类型，可用特性列表会发生变化。

## 设置特征
如果您想要支持某个特性，则必须勾选该特性左侧的“已启用”复选框。
对于每个特性，您可以指定以下属性：

- InOutFunction：你可以指定一个预定义函数，负责将值从 HomeKit 传递到 ioBroker 以及反之亦然
- InOutParameter：您可以在此处为所选的 InOutFunction 指定参数。可用/预期参数取决于所选的函数。下面简要概述了函数和参数。
- ConversionFunction：除了 InOutFunction 之外，您还可以指定一个函数，将来自 HomeKit 的值转换为 ioBroker（反之亦然）
- ConversionParameter：与 InOutParameter 相同 - 可用/预期参数取决于所选函数。

## InOut 函数概述
| 功能 | 预期参数 | 说明 |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| const | 值 | 如果 HomeKit 读取该值，则 const 函数始终将“InOutParameter”中指定的值传递给转换函数。如果 HomeKit 想要写入该值，则此操作被拒绝 |
| ioBroker.State | ioBroker 数据点的名称 | 使用此函数，适配器使用指定的 ioBroker 数据点进行读写操作。所有操作均立即完成，无需缓冲或过滤（值将传递给指定的转换函数）|
| ioBroker.State.Deferred | ioBroker 数据点的名称 | 使用此函数，适配器使用指定的 ioBroker 数据点进行读写操作。HomeKit 的写入操作直接传递给转换函数。ioBroker 的更改会经过 150 毫秒的去抖动 - 这意味着只有在 150 毫秒内没有发生其他更改时，该值才会传输到 HomeKit。|
| ioBroker.State.OnlyACK | ioBroker 数据点的名称 | 使用此函数，适配器使用指定的 ioBroker 数据点进行读写操作。来自 HomeKit 的写入操作直接传递给转换函数。只有设置了值的“已确认”标志，来自 ioBroker 的更改才会转发到 HomeKit。否则，最后确认的值将被传输到 HomeKit |
| ioBroker.homematic。<br> WindowCovering.TargetPosition | HomeMatic 级别数据点的 ID<br>或者<br>带有级别数据点 ID 和工作数据点 ID 的字符串数组 | 此功能专门用于控制 HomeMatic 窗帘。此功能在窗帘移动时将值传输到 HomeKit。这是必要的，以避免 iOS 中的窗帘滑块闪烁 |

## 转换函数概述
| 功能 | 预期参数 | 说明 |
|------------------------------------------------------|------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| passthrough | \<none\> | 来自 ioBroker 的值无需转换即可传递给 HomeKit（反之亦然）|
| HomematicDirectionTo<br>主页Kit位置状态 | \<none\> | 此函数将 Homematic 窗帘的方向枚举映射到 HomeKit 的 PositionState 枚举（并返回）|
| Homematic控制模式<br>Homekit加热冷却状态 | \<none\> | 此函数将 Homematic 的 ControlMode 枚举映射到 HomeKit 的 HeathingCoolingState 枚举（并返回）|
| 级别255 | \<none\> | 此函数将值范围从 0 到 255 的 ioBroker 值缩放为值范围从 0 到 100 的 HomeKit 值（反之亦然）。<br> **示例**：ioBroker 中的 255 对于 HomeKit 转换为 100。|
| scaleInt<br> scaleFloat | `{ "homekit.min": <number>, "homekit.max": <number>, "iobroker.min": <number>, "iobroker.max": <number> }` | 此函数与“level255”类似，但更通用。它将范围从“iobroker.min”（如果省略则为 0）到“iobroker.max”的 ioBroker 值转换为范围从“homekit.min”（如果省略则为 0）到“homekit.max”（反之亦然）的 HomeKit 值。<br> **示例：**如果参数字段为：`{ "homekit.max": 500, "iobroker.max": 250}`<br>事实上，在将 ioBroker 的值发送给 HomeKit 之前，它会被乘以 2。<br> **最小参数仅在 0.8.0 及更高版本中可用** |
| 色调 | \<none\> | 此函数是 scaleInt 的专门版本，带有参数 `iobroker.max=65535` 和 `homekit.max=360`。|
| hue | \<none\> | 此函数是 scaleInt 的专门版本，其参数为 `iobroker.max=65535` 和 `homekit.max=360`。|

## Homematic 百叶窗执行器 \ 窗帘
要集成 Homematic 百叶窗执行器（如 HM-LC-Bl1PBU-FM），需要进行以下设置：

* 为设备添加服务
* 将服务名称设置为某个名称，将服务类型设置为“WindowCovering”。服务子类型可以留空
* 启用并填写以下特性：

| 特性名称 | 1：InOut 函数<br>2：转换函数 | 1：InOut 参数<br>2：转换参数 |
|---------------------|---------------------------------------------------------------------------|----------------------------------------------------------------|
| 当前位置 | 1：ioBroker.State.OnlyACK<br> 2：直通 | 1：_\<path to homematic object\> _.1.级别<br>2：\<empty\> |
| 位置状态 | 1: ioBroker.State.OnlyACK<br> 2：HomematicDirectionToHomekitPositionState | 1：_\<path to homematic object\> _.1.方向<br>2：\<empty\> |
| 目标位置 | 1：ioBroker.homematic.WindowCovering.目标位置<br>2：直通 | 1：_\<path to homematic object\> _.1.级别<br>2：\<empty\> |

值 _\<path to Homematic object\>_ 需要替换为设备的实际路径（例如，hm-rpc.0.NEQ0012345）

有关配置掩码的一般信息，请参阅：TODO

有关配置、输入输出函数和转换函数的更多信息，请参阅：[维基百科](https://github.com/jensweigele/ioBroker.yahka/wiki/Configuration,-InOut-Functions-and-Conversion-Functions)

## 开发人员须知
这个 repo 包含一个子模块，因此在构建之前您还需要关闭/初始化这个子模块，例如，使用`git submodule update --init --recursive` 来更新和获取其内容。

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) Revert renaming of states back: `HomematicControlModeToHomekitHeatingCoolingState => HomematicControlModeToHomekitHeathingCoolingState, Deferred => Defered`

### 1.0.4 (2024-08-12)
* (Apollon77) Important: js-controller 5.0 is required at least
* (tarikweiss) Rewrote community types from submodule (js) to typescript
* (tarikweiss) Added the ability to set an ioBroker state for the availability indication in HomeKit

### 1.0.3 (2023-03-29)
* (TA2K) Corrected empty device list with rebuild

### 1.0.1 (2023-03-24)
* (foxriver76) we ensured controller 5 compatibility
* (bluefox) Formatting

### 0.17.0 (2022-10-17)
* Added AVAHI advertiser as default and updated HomeKit Library to improve performance and stability
* Update release and test scripts

### 0.14.0 (unreleased)
* (jw) added support to group devices in Admin Interface
* (jw) added support to mark services as "primary" and as "hidden"
* (jw) added ioFunctions "round" and "invert"
* (jw) updated dependencies
* (jw) Updated to HAP-NodeJS 0.9.2
* (jw) Fixed crashes due to changes in used HomeKit Library
* (nh) improved changelog in readme

### 0.13.1 (2021-01-14)
* (jw) switched to HAP-NodeJS 0.9.0-beta.113 and added useLegacyAdvertiser option
* (jw) fixed bug which prevented cameras from deletion and duplication

### 0.13.0 (2021-01-08)
* (jw) updated dependencies
* (jw) improved state selector (scrolling and refresh on open)

### 0.12.0 (2020-12-23)
* (jw) updated dependencies
* (jw) added support for linking services to support Television Services
* (jw) added possibility to publish devices without the bridge (necessary for TV service)
* (jw) added support for audio stream in camera 
* (jw) added support for custom characteristics on the services (e.g. to add Wattage characteristic to plugs) 
* (jw) added support for additional services to camera (to enable usage of doorbell service)> 
  (many20) fixed scaleInt conversion - results are now rounded

### 0.11.0 (2020-02-19)
* Intermediate release

### 0.10.0 (2020-02-19)
* (apollon77) updated dependencies, nodejs 12 support

### 0.10.0
* (jw) updated dependencies
* (apollon77) removed support for NodeJS 4 - NodeJS 6 is now the minimum required NodeJS version (merged #109)  
* (yaming116) fixed scale conversion to support min values others than 0

### 0.9.2 (2019-03-12)
* (jw) fixed a bug where the adapter didn't start anymore
* (jw) removed the reference to the git repository of the hap community types

### 0.9.1 (2019-01-29)
* (jw) fixed a bug where the adapter crashes if a state does not exist
* (jw) added io functions for HomeMatic dimmers ([#30](https://github.com/jensweigele/ioBroker.yahka/issues/30) and [#75](https://github.com/jensweigele/ioBroker.yahka/issues/75))
* (jw) fixed a bug where adapter didn't start anymore when using the conversion function "inverse" ([#98](https://github.com/jensweigele/ioBroker.yahka/issues/98))
* (jw) updated to latest HAP-NodeJS library to support TV services and characteristics (available since iOS 12.2 beta 1)<br>Note: that's still in development, not all services are working correctly. For more information see:  ([#89](https://github.com/jensweigele/ioBroker.yahka/issues/89))

### 0.9.0 (2019-01-24)
* (jw) added more services and characteristics (from https://github.com/homespun/hap-nodejs-community-types)
* (jw) improved admin interface to support individual editors for IO/Conversion functions
* (jw) added new conversion function "script" which adds the ability to run JavaScript functions as conversion functions
* (jw) fixed a bug in the scaleInt and scaleFloat methods (thanks to balzreber) 
* (jw) added ioFunction "MultiState" to get multiple states and/or separate between read and write states 
* (jw) added conversion function "map" to customize mappings between ioBroker and HomeKit 
* (jw) added possibility to specify IP for Bonjour broadcasting (for bridge configuration and camera configuration)([#86](https://github.com/jensweigele/ioBroker.yahka/issues/86)) 
* (jw) switched to webpack and refactored admin interface and io/conversion functions 
* (jw) fixed a problem where numeric values where transmitted to homekit as strings ([#87](https://github.com/jensweigele/ioBroker.yahka/issues/87))
* (jw) added possibility to specify "firmware" version for bridge and devices ([#90](https://github.com/jensweigele/ioBroker.yahka/issues/90))
* (jw) added Internet Explorer / MS Edge detection to print error message in admin panel ([#83](https://github.com/jensweigele/ioBroker.yahka/issues/83))
* (jw) added support for new compact mode ([#95](https://github.com/jensweigele/ioBroker.yahka/issues/95))
* (jw) added support for specifying device information via data points ([#91](https://github.com/jensweigele/ioBroker.yahka/issues/91))
* (SchumyHao) added Chinese support

### 0.8.2 (2018-12-09)
* (jw) Removed a bug which flooded logging when starting/stopping the adapter which led to excessive memory consumption

### 0.8.1 (2018-12-04)
* (jw) updated dependencies
* (jw) change default name of new instances
* (foxriver76) remove excessive logging
* (mdietz666) scaleInt and scaleFloat now supports min-values (this allows mapping from e.g. -90 to 90 to 0 to 180)
* (arichter83) added "Duplicate Device" functionality

### 0.7.1 (2018-02-14)
* (jw) fixed a bug where state selection with admin 2.0.9 did not work anymore
* (jw) restructured repository to support install via url

### 0.7.0 (2018-02-01)
* (bluefox) Fixed the ID select dialog in Admin3
* (jw) updated hap-nodejs to support the following new services: Faucet, IrrigationSystem and Valve
* (jw) added ip-package to dependencies to avoid errors on some installations

### 0.6.1 (2018-01-25)
* (jw) fixed startup crash

### 0.6.0 (2018-01-24)
* (jw) add support for IP-Cameras
* (jw) included iOS 11 device definitions
* (jw) allowed negative temperatures for temperature sensors
* (jw) fixed crashes due to duplicate device names
* (oliverschulze) added conversion functions "hue" and "level255"
* (jw) added conversion functions scaleInt, scaleFloat and inverse
* (jw) devices are now sorted by name in the admin panel

### 0.5.5 (2017-05-08)
  (bluefox) allow select ID in configuration dialog

### 0.5.4 (2017-02-08)
* (jw) improve log output
* (jw) added HomematicControlModeToHomekitHeathingCoolingState mapping

### 0.5.3 (2017-02-08)
* (jw) internal release

### 0.5.2 (2016-12-23)
* (jw) fixed issues with empty characteristic values
* (jw) fixed issue with empty adapter.systemConfig.system object

### 0.5.1 (2016-10-05)
* (jw) fixed issue with wrongly displayed logo

### 0.5.0 (2016-10-05)
* (jw) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2024 Jens Weigele (iobroker.yahka@gmail.com)

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