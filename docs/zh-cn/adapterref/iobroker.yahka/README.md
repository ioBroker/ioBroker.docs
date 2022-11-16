---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.yahka/README.md
title: iobroker.yahka
hash: yomG4y/Sjkfg98dRYlugZUYP4SrmYntEO3ea8zNuKSs=
---
![标识](../../../en/adapterref/iobroker.yahka/admin/yahka.png)

![安装数量](http://iobroker.live/badges/yahka-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.yahka.svg)
![下载](https://img.shields.io/npm/dm/iobroker.yahka.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.yahka.svg?branch=master)
![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

# Iobroker.yahka
##安装和使用
有关如何安装和配置此适配器的详细信息，请参阅[维基](https://github.com/jensweigele/ioBroker.yahka/wiki)

## 先决条件
在安装适配器之前，您必须安装一些软件包（适用于 Linux）：`sudo apt-get install libavahi-compat-libdnssd-dev`

## 安装最新的**Release**
只需在“适配器”页面的 ioBroker 管理面板中点击“Homekit yahka 适配器”后面的“+”按钮即可。

## 安装最新的**Beta**
如果你想在边缘测试最新的 beta，你可以通过 GitHub url 安装适配器。

（有时需要额外上传（例如`iobroker upload yahka`）并重新启动适配器）

## 备份和恢复
注意：为了能够在另一个系统上恢复`ioBroker.yahka`，除了通常的`iobroker backup`和`iobroker restore`之外，还必须备份`/opt/iobroker/iobroker-data`下的`yahka.X.hapdata`文件夹并在必要时恢复。 [维基](https://github.com/jensweigele/ioBroker.yahka/wiki/ioBroker.yahka-auf-ein-anderes-System-umziehen) / [问题](https://github.com/jensweigele/ioBroker.yahka/issues/176)

＃＃ 故障排除
### 并非所有新功能都可用：
如果在 yahka 更新后并非所有新功能都可用，请尝试上传（例如`iob upload yahka`）并重新启动适配器。

### 缺少 Avahi 守护程序 (linux)
如果您在日志中出现以下错误：

```
Error:	2016-07-26 18:57:17.989	error	at Error (native)
Error:	2016-07-26 18:57:17.989	error	dns service error: unknown
uncaught	2016-07-26 18:57:17.985	error	exception: dns service error: unknown
```

你必须做一些额外的步骤：

* 安装 avahi 守护进程：

`sudo apt-get install avahi-daemon -y`

* 编辑 avahi-daemon.conf

`sudo nano avahi-daemon.conf `

更改以下变量：

```
host-name=\<put in your hostname\>
domain-name=local
use-ipv4=yes
use-ipv6=yes
enable-dbus=yes
```

### 缺少 pam-devel 包 (linux)
如果您在日志中出现以下错误：

```
../authenticate_pam.cc:30:31: fatal error: security/pam_appl.h: Datei oder Verzeichnis nicht gefunden
#include <security/pam_appl.h>
```

您必须安装 pam-devel 软件包：

* 安装 avahi 守护进程：

`sudo apt-get install pam-devel -y`

### 缺少卓悦（Windows）
- 下载：`https://www.samuelattard.com/files/bonjourcore2.msi`
- 执行：`msiexec /i bonjourcore2.msi /qn`
- 删除：`del bonjourcore2.msi`
- 下载：`https://www.samuelattard.com/files/bonjoursdksetup.exe`
- 执行：`bonjoursdksetup.exe /quiet`
- 删除：`del bonjoursdksetup.exe`
- 设置：`set BONJOUR_SDK_HOME=C:\Program Files\Bonjour SDK`

然后安装 yahka 适配器。

## 关于 HomeKit 的一些话
HomeKit 的架构如下：<br>有**设备**作为逻辑实体。每个设备可以有多个**服务**，每个服务有多个**特征**。<br>最后，特征是可以读取或写入值的端点。<br>服务可以具有哪些特征，由 Apple/HomeKit 定义并由服务类型确定。服务类型也由 Apple/HomeKit 定义。

例子：<br>车库门开启器是一种可以有两种服务的设备：<br>

1.车库门开启器
2. 光

Garage Door Opener Service 本身可能具有不同的特征，例如：CurrentDoorState、TargetDoorState 等等。<br>此外，灯光服务可能具有不同的特性，例如：开启（以及许多其他用于更改灯光颜色等）

## Yahka 是做什么的
使用 Yahka 可以将 ioBroker 数据点映射到 HomeKit 特征。<br>由于有时需要映射（例如，车库门的“状态”值在 HomeKit 和其他系统之间是不同的），因此也可以指定函数来转换这些值。这在下面描述。

为避免过多的管理工作，您在 Yahka 中创建的所有设备都位于所谓的“桥”后面。使用此桥接器，您只需将桥接器与您的 iOS 设备配对即可访问所有设备。否则，您需要将每个 Yahka 设备与 Homekit 配对。

## 设置网桥并创建设备和服务
每个需要与 Homekit 配对的设备都需要一个“用户名”，其格式为 mac 地址。 Yahka 自动为每个 yahka 实例生成一个随机用户名。

**重要提示：如果在将 Yahka 与 HomeKit 配对后更改用户名，则需要重新配置 iOS 中的所有设备（房间分配、位置等）。更改用户名意味着 iOS，它是一个全新的设备！**

在用户名旁边，您需要指定需要在 iOS 设备上输入的 PIN 码。
这都可以通过单击 Yahka 管理面板中的“:yahka.0”来指定。 （点击列表条目后展开右侧的面板）。桥的名称也可以在那里更改。

设置网桥后，您可以使用顶部的“添加设备”按钮添加您喜欢的设备。
添加/选择设备后，您可以向该设备添加服务。

需要指定服务名称和服务类型。

根据服务类型，可用特征列表会发生变化。

## 设置特征
如果你想支持一个特性，你必须勾选特性左侧的“启用”复选框。
对于每个特征，您可以指定以下属性：

- InOutFunction：您可以指定一个预定义的函数，负责将值从 HomeKit 传递到 ioBroker，反之亦然
- InOutParameter：在这里您可以为选定的 InOutFunction 指定参数。可用/预期参数取决于所选功能。功能和参数的简要概述如下所述。
- ConversionFunction：除了 InOutFunction，您还可以指定一个函数，将来自 HomeKit 的值转换为 ioBroker（反之亦然）
- ConversionParameter：与 InOutParameter 相同 - 可用/预期参数取决于所选函数。

## InOut 函数概述
|功能|预期参数|说明|
|---|---|---|

|const|Value|如果 HomeKit 读取值，const 函数总是将“InOutParameter”中指定的值传递给转换函数。如果 HomeKit 想写入值，这个动作被拒绝

|ioBroker.State|ioBroker 数据点的名称|使用此函数，适配器使用指定的 ioBroker 数据点进行读取和写入操作。所有操作都立即完成，无需缓冲或过滤（值传递给指定的转换函数）|
|ioBroker.State.Defered|ioBroker 数据点的名称|使用此函数，适配器使用指定的 ioBroker 数据点进行读取和写入操作。来自 HomeKit 的写操作直接传递给转换函数。来自 ioBroker 的更改会在 150 毫秒内消除抖动 - 这意味着只有在 150 毫秒内没有发生其他更改时，该值才会传输到 HomeKit。|
|ioBroker.State.OnlyACK|ioBroker 数据点的名称|通过此函数，适配器使用指定的 ioBroker 数据点进行读取和写入操作。来自 HomeKit 的写操作直接传递给转换函数。如果设置了值的“Acknowledged”-Flag，来自 ioBroker 的更改只会转发到 HomeKit。否则，最后确认的值将被传输到 HomeKit|。 |
|ioBroker.homematic。<br> WindowCovering.TargetPosition|HomeMatic 级别数据点的 ID<br>或者<br>具有关卡数据点 ID 和工作数据点 ID 的字符串数组|此函数专门用于控制 HomeMatic 窗口覆盖。此函数在 Window Covering 移动时延迟将值传输到 HomeKit。这是避免iOS中的窗帘滑块闪烁所必需的|

## 转换函数概述
|功能|预期参数|说明|
|---|---|---|

|passthrough|\<none\>|来自 ioBroker 的值不经转换就传递给 HomeKit（反之亦然）

|Homematic方向到<br>家庭套件位置状态|\<none\> |此函数将 Homematic 窗帘的方向枚举映射到 HomeKit 的 PositionState 枚举（和返回）|
|HomematicControlModeTo<br> HomekitHeathingCoolingState|\<none\> |此函数将 Homematic 的 ControlMode 枚举映射到 HomeKit 的 HeathingCoolingState 枚举（并返回） |
|scaleInt<br> scaleFloat|`{ "homekit.min": <number>, "homekit.max": <number>, "iobroker.min": <number>, "iobroker.max": <number> }`|这个函数类似于“level255”，但更通用。它将范围从“iobroker.min”（如果省略，则为 0）到“iobroker.max”的 ioBroker 值转换为值范围从“homekit.min”（如果省略，则为 0）到“homekit.max”的 HomeKit 值（然后回来）。<br> **示例：** 如果参数字段为：`{ "homekit.max": 500, "iobroker.max": 250}`<br> ioBroker 的值实际上在将其发送到 HomeKit 之前乘以 2。<br> **最小参数仅在 0.8.0 及更高版本中可用**|
|inverse|number|此函数用于从 ioBroker 中“反转”一个值。该参数指定 ioBroker 中值的最大值。公式为：`Parameter - value`<br> **示例：**如果参数字段为`100`，则来自 ioBroker 的值 100 将作为 0 发送到 HomeKit，值 80 将作为 20 发送到 HomeKit 等等。|
|hue|\<none\>|此函数是 scaleInt 的特殊版本，带有参数 `iobroker.max=65535` 和 `homekit.max=360`。|
|hue|\<none\>|这个函数是 scaleInt 的特殊版本，参数为 `iobroker.max=65535` 和 `homekit.max=360`。|

## Homematic 百叶窗执行器 \ 窗帘
要集成 Homematic 百叶窗执行器（如 HM-LC-Bl1PBU-FM），需要进行以下设置：

* 向设备添加服务
* 将服务名称设置为某个名称，将服务类型设置为“WindowCovering”。服务子类型可以留空
* 启用并填写以下特征：

|特征名称|1：InOut函数<br>2：转换函数|1：输入输出参数<br>2：转换参数|
|---|---|---|
|当前位置| 1：ioBroker.State.OnlyACK<br> 2：直通| 1：_\<path to homematic object\> _.1.LEVEL<br> 2：\<empty\> |
|位置状态 | 1：ioBroker.State.OnlyACK<br> 2：HomematicDirectionToHomekitPositionState| 1：_\<path to homematic object\> _。1个方向<br>2：\<empty\> |
|目标位置 | 1：ioBroker.homematic.WindowCovering.TargetPosition<br> 2：直通| 1：_\<path to homematic object\> _.1.LEVEL<br> 2：\<empty\> |

值 _\<homematic 对象的路径\>_ 需要替换为设备的实际路径（例如 hm-rpc.0.NEQ0012345）

有关配置掩码的一般信息，请参阅：TODO<br>有关配置、InOut 函数和转换函数的更多信息，请参阅：[维基](https://github.com/jensweigele/ioBroker.yahka/wiki/Configuration,-InOut-Functions-and-Conversion-Functions)

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog

### 0.17.0 (2022-10-17)
  Added AVAHI advertiser as default and updated HomeKit Library to improve performance and stability
  Update release and test scripts

### 0.14.0 (unreleased)
  (jw) added support to group devices in Admin Interface<br>
  (jw) added support to mark services as "primary" and as "hidden"<br>
  (jw) added ioFunctions "round" and "invert"<br>
  (jw) updated dependencies<br>
  (jw) Updated to HAP-NodeJS 0.9.2<br>
  (jw) Fixed crashes due to changes in used HomeKit Library<br>
  (nh) improved changelog in readme<br>

### 0.13.1 (2021-01-14)
  (jw) switched to HAP-NodeJS 0.9.0-beta.113 and added useLegacyAdvertiser option<br>
  (jw) fixed bug which prevented cameras from deletion and duplication<br>

### 0.13.0 (2021-01-08)
  (jw) updated dependencies<br>
  (jw) improved state selector (scrolling and refresh on open)<br>

### 0.12.0 (2020-12-23)
  (jw) updated dependencies<br>
  (jw) added support for linking services to support Television Services<br> 
  (jw) added possibility to publish devices without the bridge (necessary for TV service)<br> 
  (jw) added support for audio stream in camera<br> 
  (jw) added support for custom characteristics on the services (e.g. to add Wattage characteristic to plugs)<br> 
  (jw) added support for additonal services to camera (to enable usage of doorbell service)<br> 
  (many20) fixed scaleInt conversion - results are now rounded<br> 
  
### 0.11.0 (2020-02-19)
  Intermediate release<br>

### 0.10.0 (2020-02-19)
  (apollon77) updated dependencies, nodejs 12 support<br>

### 0.10.0
  (jw) updated dependencies<br>
  (apollon77) removed support for NodeJS 4 - NodeJS 6 is now the minimum required NodeJS version (merged #109)<br>  
  (yaming116) fixed scale conversion to support min values others than 0<br>

### 0.9.2 (2019-03-12)
  (jw) fixed a bug where the adapter didn't start anymore<br>
  (jw) removed the reference to the git repository of the hap community types<br>

### 0.9.1 (2019-01-29)
  (jw) fixed a bug where the adapter crashes if a state does not exist<br>
  (jw) added io functions for HomeMatic dimmers ([#30](https://github.com/jensweigele/ioBroker.yahka/issues/30) and [#75](https://github.com/jensweigele/ioBroker.yahka/issues/75))<br>
  (jw) fixed a bug where adapter didn't start anymore when using the conversion function "inverse" ([#98](https://github.com/jensweigele/ioBroker.yahka/issues/98))
  (jw) updated to latest HAP-NodeJS library to support TV services and characteristics (available since iOS 12.2 beta 1)<br>Note: that's still in development, not all services are working correctly. For more information see:  ([#89](https://github.com/jensweigele/ioBroker.yahka/issues/89))<br>

### 0.9.0 (2019-01-24)
  (jw) added more services and characteristics (from https://github.com/homespun/hap-nodejs-community-types)<br>
  (jw) improved admin interface to support individual editors for IO/Conversion functions<br>
  (jw) added new conversion function "script" which adds the ability to run JavaScript functions as conversion functions<br>
  (jw) fixed a bug in the scaleInt and scaleFloat methods (thanks to balzreber) <br>
  (jw) added ioFunction "MultiState" to get multiple states and/or seperate between read and write states <br>
  (jw) added conversion function "map" to customize mappings betwen ioBroker and HomeKit <br>
  (jw) added possibility to specifiy IP for Bonjour broadcasting (for bridge configuration and camera configuration)([#86](https://github.com/jensweigele/ioBroker.yahka/issues/86))<br> 
  (jw) switched to webpack and refactored admin interface and io/conversion functions <br>
  (jw) fixed a problem where numeric values where transmitted to homekit as strings ([#87](https://github.com/jensweigele/ioBroker.yahka/issues/87))<br>
  (jw) added possibility to specify "firmware" version for bridge and devices ([#90](https://github.com/jensweigele/ioBroker.yahka/issues/90))<br>
  (jw) added Internet Explorer / MS Edge detection to print error message in admin panel ([#83](https://github.com/jensweigele/ioBroker.yahka/issues/83))<br>
  (jw) added support for new compact mode ([#95](https://github.com/jensweigele/ioBroker.yahka/issues/95))<br>
  (jw) added support for specifiyng device information via datapoints ([#91](https://github.com/jensweigele/ioBroker.yahka/issues/91))<br>
  (SchumyHao) added Chinese support
  
### 0.8.2 (2018-12-09)
  (jw) Removed a bug which flooded logging when starting/stopping the adapter which led to excessive memory consumption<br>

### 0.8.1 (2018-12-04)
  (jw) updated dependencies<br>
  (jw) change default name of new instances<br>
  (foxriver76) remove excessive logging<br>
  (mdietz666) scaleInt and scaleFloat now supports min-values (this allows mapping from e.g. -90 to 90 to 0 to 180)<br>
  (arichter83) added "Duplicate Device" functionality<br>

### 0.7.1 (2018-02-14)
  (jw) fixed a bug where state selection with admin 2.0.9 did not work anymore<br>
  (jw) restructured repository to support install via url<br>

### 0.7.0 (2018-02-01)
  (bluefox) Fixed the ID select dialog in Admin3<br>
  (jw) updated hap-nodejs to support the following new services: Faucet, IrrigationSystem and Valve<br>
  (jw) added ip-package to dependencies to avoid errors on some installations<br>

### 0.6.1 (2018-01-25)
  (jw) fixed startup crash<br>

### 0.6.0 (2018-01-24)
  (jw) add support for IP-Cameras<br>
  (jw) included iOS 11 device definitions<br>
  (jw) allowed negative temperatures for temperature sensors<br>
  (jw) fixed crashes due to duplicate device names<br>
  (oliverschulze) added conversion functions "hue" and "level255"<br>
  (jw) added conversion functions scaleInt, scaleFloat and inverse<br>
  (jw) devices are now sorted by name in the admin panel<br>

### 0.5.5 (2017-05-08)
  (bluefox) allow select ID in configuration dialog<br>

### 0.5.4 (2017-02-08)
  (jw) improve logoutput<br>
  (jw) added HomematicControlModeToHomekitHeathingCoolingState mapping<br>

### 0.5.3 (2017-02-08)
  (jw) internal release<br>

### 0.5.2 (2016-12-23)
  (jw) fixed issues with empty characteristic values<br>
  (jw) fixed issue with empty adapter.systemConfig.system object<br>

### 0.5.1 (2016-10-05)
  (jw) fixed issue with wrongly displayed logo<br>

### 0.5.0 (2016-10-05)
  (jw) initial release<br>

## License
The MIT License (MIT)

Copyright (c) 2016-2022 Jens Weigele (iobroker.yahka@gmail.com)

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