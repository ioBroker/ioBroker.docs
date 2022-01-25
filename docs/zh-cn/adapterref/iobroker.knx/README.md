---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: rXrT4jC7T4e+NWRa1Yj/h88/IlzfPQ9VwsayDPPc0Kg=
---
![标识](../../../en/adapterref/iobroker.knx/admin/knx.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.knx.svg)
![下载](https://img.shields.io/npm/dm/iobroker.knx.svg)
![新PM](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx
＃＃＃＃ 表中的内容
* [描述](#description)
* [要求](#requirements)
* [特征](#features)
* [适配器配置](#adapter-configuration)
    * [安装许可证](#install-the-license)
    * [配置接口](#configuration-interface)
    * [对象](#objects)
    * [用法](#usage)
    * [数据点类型 (DPT)](#data-point-types-dpt)
    * [如何导入](#how-the-import-works)
    * [避免问题](#avoidance-of-problems)
* [GA-工具](#ga-tool)
    * [将非 KNX 状态直接链接到 KNX 反之诗](#direct-link-non-knx-state-to-knx-vice-verse)
* [计划功能](#planned-features)
* [变更日志](#changelog)

＃＃ 描述
en：此适配器允许从 ETS 导入 knxproj 文件。它生成 KNX 组地址和 ioBroker 之间的转换，并将设备放入房间（尤其是 MobileUI）。

茹：[Установка и базовая настройка адаптера](docs/ru/README.md)

它连接到标准 KNX/LAN 网关。

**注意：随着更改为 KNX-Adapter 版本 2.x，许可已更改。您可以从 [https://iobroker.net](https://iobroker.net/)** 获得新许可证

**您还应该将 iobroker js-controller 和 admin 更新到最新版本。**

开始之前： com.Objects 的每个 DPT 都应该在您的 ETS 项目中设置。每个设备都应该分类到您的设施结构中。

＃＃ 要求
* 节点版本 >= 14.15.4
* 管理员版本 >= 5.2.0
* js-controller 版本 >=3.3.20

如果没有此要求，适配器将无法安装或无法正常工作。

＃＃ 特征
* 导入 `knxproj` 文件
* 生成类似 ETS 的对象结构
* 查找和组合行为通道和状态通道（启发式）
* 在开始时更新所有状态
*无需云或互联网
* 向 KNX-Bus 发出 READ，同时写入状态对象
* 使用 GA-Tools 编辑和修改 GA 对象
* 使用 GA-Tools 编辑和修改状态-行为关系
* 新：允许非 KNX 状态直接链接（反之亦然）
* 新：适配器对 GroupValueRead 的响应到 directLink 连接对象
* 新：导入受密码保护的项目文件（感谢 aKzenT）

##适配器配置
安装此适配器后，打开适配器配置。

###安装许可证
第一步是申请许可证。如果您尚未安装许可证，则会应用 500 个数据点。

* (1) 显示您的系统 ID，您需要这个才能获得许可证
* (2) 点击此处申请您的许可证

![knxV2-first-start-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-first-start-mod.jpg)

如果您已经在 [https://iobroker.net](https://iobroker.net/) 下创建了新许可证，则可以将其粘贴到 (2) 中，或者您可以通过单击 (1) 直接在线获取

![knxV2-2-1-Install-License-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-1-Install-License-mod.jpg)

如果您点击了 (1)，请输入您的 iobroker.net 帐户登录。

![knxV2-2-2-Install-License-online-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-2-Install-License-online-mod.jpg)

如果您的数据正确，您将看到您获得的所有许可证。选择您要使用的那个。

![knxV2-2-3-Install-License-online-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-3-Install-License-online-mod.jpg)

如果这成功了，请保存它。

![knxV2-2-4-Install-License-online-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-4-Install-License-online-mod.jpg)

就这样。单击此页面底部的按钮以保存。

### 配置界面
![knxV2-2-5-Install-License-online-applied-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-5-Install-License-online-applied-mod.jpg)

1. KNX-Gateway IP：KNX-LAN网关的IPv4。
2. KNX-Gateway 端口：默认为 3671 端口。
3.物理地址：iobroker knx实例的物理地址**！重要：这不是物理。 LAN 网关的地址！** 并且不能以 0 结尾
4. KNX每秒包数：这限制了包率。如果 KNX 局域网网关重新连接很多或暂时无法访问，则降低此速率。
5.本地iobroker IP：选择要绑定适配器的IP/接口
6. loglevel：通常是级别“Info”，调试时增加级别。
7. 仅导入新数据点：默认启用。在禁用的情况下，将生成新的 GA，并且将重新创建现有的 GA。
8. 按钮上传文件：可在此处拖放或单击文件选择器对话框。在这里，您可以以 `knxproj` 格式上传您的 ETS 导出。

成功导入后，对话框会显示导入对象的数量。现在按“保存并关闭”，适配器应该启动。
在启动适配器时，使用 read-Flag 和 write-Flag 读取所有组地址。这可能需要一段时间，并且会在您的 KNX 总线上产生高负载。但是您的 vis 中的值会在启动后更新。
上传密码保护文件尚不可用。

9. Host-ID：这是iobroker主机的特殊ID。此 ID 是生成和验证许可证所必需的
10. GA-Tools：快速更改 GA 的工具箱

### 对象
这是在 knx.0 下的组地址树，就像您的 ETS 项目中一样。要修改属性，请使用 GA-Tool。

＃＃＃ 用法
如果适配器成功启动，您的数据点将可用于您喜欢做的所有事情。

### 数据点类型 (DPT)
所有符合 KNX 协会“系统规范、互通、数据点类型”的 DPT 均可用。这意味着您可以获得 2 种类型的信息：1) 值或字符串 2) 逗号分隔值或值数组（目前我不知道什么是更好的处理方式）

例如，DPT5.001 编码为 8 位无符号整数。这给出了一个值。 DPT3.007（控制调光）编码为 1Bit(Boolean)+3Bit(unsigned Int)。
这导致例如在像“0,5”这样的值中，其中“0”表示“减少”，“5”表示间隔数。

### 导入的工作原理
1.读取所有通信对象引用（COR）：

    将 groupadressreference ID'd 与相应 COR（如果存在）的 DPT 相结合。

2.组地址结构（GAS）的生成：

    根据 GAR ID 生成 GAS 并设置 DPT（如果尚未完成）

3. 查找状态 一项法案涉及：

在 ets-exports 中没有关于状态和行为地址的信息。适配器解析所有“状态”或“状态”的 GA。如果有 2 个 GA 的相似度超过 90%，那么一个地址将是行动，另一个是状态。还会检查 DPT 是否相似。这就是为什么如果 GA 命名不一致，很难找到对等点。

4. 设备配置中的标志检查：

   标志的处理方式如下：

    | KNX | | |经纪人 | | |
    |-------|-----------|------------|----------|----------|-------------------------------------------------|
    |阅读 |写 |传输 |阅读 |写 |说明 |
    | - | - | - | - | - |该值将由 GroupValueRead| 更新 |
    | x | - | - | x | x |在此状态下发送任何值都会触发 GroupValueRead|
    | - | x | - | - | x |使用 GroupValueWrite| 将值写入 KNX|
    | - | - | x | x | - |状态值将由 GroupValueResponse | 更新 |
    | x | - | x | x | x |在此状态下发送任何值都会触发 GroupValueRead|

6. 创建数据点对等点 (DPP)：

如果 GA、GAR 和 DPT 有效，将创建 DPP。这是适配器正在使用的 DPP。
如果 GA 中缺少 DPT，因为找不到它，则不会创建 DPP。可以使用 GA-Tool 完成。

7. 在适配器启动时：

所有标有“读取”标志的 GA 在开始时都会被检查。这会影响更高的总线流量。最后，所有状态都是最新的。

###避免问题
* 清洁 ETS 编程和更重要的清洁 ETS 编程和最重要的清洁 ETS 编程
*分配DPT！
* GA 名称的统一标签（e.B“EG Wohnen Decke Licht schalten”和“EG Wohnen Decke Licht schalten status”）
* 避免特殊字符“,./;&%$§[]”（可能会导致产生gas问题）
* 检查 KNX/LAN GW 是否可达。如果不是，适配器会尝试连续连接。
* 正确选择物理地址（使用线路耦合器时很重要）。 ！！！注意：此处输入的物理地址不是 LAN 网关的地址，不能以 0 结尾！！！
* LAN接口的端口通常为3671
* 由于状态查询的可能，必须注意一件事：必须保证ioBroker每秒产生的请求不超过40个，因为这些都是可以物理产生的

  不能再由适配器传递到网关。

## GA-工具
GA-Tool 可以轻松更改 GA 的属性。

![knxV2-3-6-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-6-GATools-mod.jpg)

1. 显示 GA 树和选中的 GA
2.在属性部分选择GA的名称
3.设置iobroker标志
4.设置GA DPT
5.公认的行为GA
6.公认的州GA

![knxV2-3-2-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-2-GATools-mod.jpg)

1.显示状态-行为关系
2.如果关系存在，则可以删除

如果不存在关系，则可以通过单击 (2) 为选定的 GA (1) 创建一个新关系。
在对话框 (3) 中可以选择对等体

![knxV2-3-5-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-5-GATools-mod.jpg)

如果有更多 GA 需要更改属性，请使用多选。此功能仅适用于没有关系的 GA。

![knxV2-3-4-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-4-GATools-mod.jpg)

1. 选定的 GA
2.属性改变
3. 没有改变的可能

### 将非 KNX 状态直接链接到 KNX，反之亦然
从适配器版本 2.0.6 开始，可以将非 KNX ioBroker 状态直接链接到 GA。这可用于将时间、日期、任何状态或信息应用于 KNX。 （一个小提示：您可以将任何 IOT 组件直接链接到 KNX 中的 GA（例如，将 homematic 按钮链接到 KNX GA 或将 KNX 按钮传感器链接到您的 sonosplayer））。可以使用 GroupValueRead 读取状态，如果状态更改，它将在 KNX 上自动更新。此外，如果您在 KNX 上进行更改，它将更新链接的非 KNX 物联网设备。

![knxV2-3-7-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-7-GATools-DirectLink-mod.jpg)

1.选择要连接的GA
2.显示选择的GA
3.这个GA必须有**write**属性
4.选择一个有效的数据点类型（如果它们不匹配，它将不起作用）
5. 不允许有行为-状态关系
6. 按钮选择要链接的非 KNX 对象

![knxV2-3-8-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-8-GATools-DirectLink-mod.jpg)

1.选择要链接的非KNX对象
2.点击确定，如果你完成了

![knxV2-3-9-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-9-GATools-DirectLink-mod.jpg)

现在是 KNX-GA **(1)** 与非 KNX iobroker **(2)** 直接链接。使用 **(3)** 您可以删除此关系。

## 计划的功能
* esf-进口
* GA-Mon 总线监控工具

<!-- 下一个版本的占位符（在行首）：

### __工作进行中__ -->
## 异常和错误
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

开发人员无法获得有关系统/配置/用户/环境的任何进一步特殊信息。如果未找到许可证，还会报告适配器版本和主机 ID。

## Changelog
### 2.0.8
* fixed bug with unackn write
* fixed bug in linkedState

### 2.0.7
* fixed bug with unable to write on KNX

### 2.0.6
* fixed problem on ETSv6 import
* many small bugfixes
* implemented GA-Tools directLink feature

### 2.0.5

* fixed problem on ETSv4 import
* corrected some messages
* corrected DPT14.x min and max range

### 2.0.4

* fixed DPT9.xxx calculation
* implemented date-and-time DPT19.00x
* fixed confusing "no license error"
* small bugfixes

### 2.0.3 (2021-12-04)

* fixed counting 1st Datapoint
* automaticly remove old V1 license", preventing confusion after upgrade from V1 to V2

### 2.0.1

* fixed problem with license acceptance

### 2.0.0 (2021-11-15) **Major release**

* Breaking change! => new license is neccessary V1 Licenses will not work => V1 business Licenses can changed to V2
* complete refactoring of knx-admin
* added Tool for handling GA in knx-admin
* fixed many bugs (in knx-stack, on importing ETS Projects, reconnect and timeouts)
* added new datapoint types
* added import till ETS V6
* changed license management

### 1.0.46 (2021-03-23)

* New admin GUI

### 1.0.45 (2021_03_22)

* import of ETS v5.7.5 projects

### 1.0.44 (2021_01_22)

* fixed act and state handling
* added some new datapoint types
* fix facility and room recognition and device allocation

### 1.0.42 (2020_09_03)

* Fixed problem with missing index_m.html

### 1.0.41

* fixed bug on GroupValue_Response event
* corrected connection to Gira GW

### 1.0.40

* fixed some import errors for ETS 5.7.x
* fixed bug on GroupValue_Response event

### 1.0.39

* fixed import error

### 1.0.38

* fixed some bugs on import
* show warning if import-file ist password protected

### 1.0.37 (2010-01-31)

* update for ETS 5.7.3 import

### 1.0.36 (2019-10-16)

* some bugs fixed

### 1.0.35 (2019-09-15)

* fixed permanent reconnects, if no traffic on knx-bus

### 1.0.34 (2019-09-15)

* changes on importer for detecting project-id

### 1.0.33 (2019-09-12)

* fixed bug while writing to bus
* added units to states
* fixed "read/write of undefined" error

### 1.0.32 (2019-09-03)

* updated importer for ETS V5.7.2, some changes in KNX-stack state-machine

### 1.0.31

* some fixes on ETS5.7.2 importer
* small changes in knx-stack statemachine
* added (again) phys address to admin config dialog
* fixed bug in deviceTree generation

### 1.0.30

* new Importer for ETS5.7.2 knxproj files
* extended accepted Data point types
* new adapter configuration menu
* implemented a switch for the user to decide to use "true" and "false" or "0" or "1" for binary values
* fixed bug in GroupValue_Read
* implemented a selector for local network interface for KNX to Gateway communication
* extended State Object for later features
* fixed some small other bugs

### 1.0.20

* fixed bug in handling KNX-data packages, which occurs periodical reconnects
* fixed bug in KNX-project file upload procedure

### 1.0.19

* reverted to true/false handling for DPT1.x

### 1.0.18

* fixed upload issue with ETS5.6.x project files
* switched values for "boolean" from 1 and 0 to true false 
* fixed recognition of role set for DPT1.x to switch
* fixed DPT16.xxx writing to KNX-Bus with values < 14Byte

### 1.0.17 (2018-08-16)

* Better state processing
* Add configurable package rate
* corrected Bug in "import only new objects"

### 1.0.15 (2018-07-18)

* change ChID on reconnect
* on Startup read wait for response of State channel or timeout

### 1.0.13 (2018-07-04)

* elimination of special signs while importing
* small bug-fixes

### 1.0.12 (2018-06-19)

* reduced and sorted log output
* small bug-fixes
* NEW Feature: request State/Val of stateObject from KNX-Bus

### 1.0.11 (2018-05-27)

* fixed DPT1 correcting value problem
* fixed reconnect problem
* other small optimizations and fixes

### 1.0.10 (2018-05-04)

* closing local port in case of undefined connection state
* added advanced debug-level via adapter-config
* many fixes

### 1.0.9 (2018-04-29)

* changed to state-wise processing
* fixed "disconnect-request"
* changed connection handling with knxd
* many small fixes

### 1.0.8 (2018-04-04)

* modified package queue
* fixed ACK if sending to KNX-Bus
* many small fixes

### 1.0.7 (2018-03-16)

* fixed Adapter-lock while uploading projects

### 1.0.6 (2018-03-11)

* fixed connection problem
* corrected package counter

### 1.0.5 (2018-03-01)

* fixed empty objects, related to DPT1 (error message \[object Object\] unknown Input value)
* fixed path variable
* fixed bug with GA's containing a "/" in the name (on proj-import)
* start implementing crosswise property update on corresponding DPT (on proj-import)

### 1.0.4 (2018-02-27)

* schema update for room enumeration coming up with ETS 5.6

### 1.0.2 (2018-02-27)

* kleine Fehler beseitigt

### 1.0.1 (2018-02-26)

* fixed certificate error

### 1.0.0 (2018-02-25)

* substitution of used KNX-stack with own from scratch build stack
* implemented full scale of DPT according to "System Specifications, Interworking, Datapointtypes" from KNX Association
* hardening connection handling for tunneling connections
* upgrade Adapter-configuration Interface to be ready with Admin3
* removed "Delay Slider" because of the new knx-stack
* many other small changes
* fixed post-comma values to scale-value of DPT
* implemented "add" mode for knxproject upload (existing Objects stay as they are, only new Objects where added)

### 0.8.6 (2017-06-17)

* some small bug-fixes
* insert slider to set a sendDelay for slow KNX/LAN Gateways to prevent connection loss

### 0.8.5 (2017-06-05)

* project loader rebuild, dpt13-fix

### 0.8.3 (2017-04-24)

* added act channel update of corresponding state
* fix bug in state-vis update
* optimized knxproj upload

### 0.8.2 (2017-02-26)

* implemented device-config parsing from knxproj
* better choice of state/val of DP objects

### 0.8.1 (2017-02-06)

* fixed DPT1 switch problem

### 0.8.0 (2017-02-xx) comming soon

### 0.7.3 (2016-12-22)

* (chefkoch009) more DPT's are supported
* faster Startup
* implemented generation of room list with device dependencies

### 0.7.2 (2016-11-20)

* (chefkoch009) added necessary dependencies

### 0.7.1 (2016-11-19)

* (chefkoch009) Support standard KNX/LAN Gateways.

### 0.7.0 (2016-10-13)

* (chefkoch009) Support of project export

### 0.6.0 (2016-07-20)

* (chefkoch009) redesign

### 0.5.0

*  (vegetto) include vis widget

#### 0.4.0

* (bluefox) fix errors with grunt

#### 0.2.0

* (bluefox) initial release

## License

For <500 datapoints there is no need of registration or adding a license key. If you have more then 500 datapoints you need a license. You can choose  
between yearly and permanent licence.

To use this adapter in ioBroker you need to accept the source code license of the adapter. The source code of this adapter is available under the CC-NC-BY license.

Additionally you need a license to use the adapter. The license editions are available on [https://iobroker.net/www/pricing](https://iobroker.net/www/pricing)


## License
The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2021 K.Ringmann <info@punktnetzwerk.net>

THE WORK IS PROVIDED UNDER THE TERMS OF THIS CREATIVE
COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY
COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS
AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.

BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE
TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY
BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS
CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND
CONDITIONS.

Read full license text in [LICENSE](LICENSE)