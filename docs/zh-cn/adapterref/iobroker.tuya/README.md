---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: 8HReow5iLosPiWpHlvtVELR3muKwJBg4i470Pj8oH7U=
---
![商标](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![安装数量](http://iobroker.live/badges/tuya-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.tuya.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tuya.svg)

# IoBroker.tuya
![测试和发布](https://github.com/Apollon77/iobroker.tuya/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tuya/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

ioBroker 适配器连接到几个连接到涂鸦云且主要使用 Smartlife App/Alexa-Skill 的小型廉价 Wifi 设备。一旦与相应的手机应用程序同步，适配器就支持读取实时状态更新和控制这些设备。

除了可以使用智能直播应用程序或涂鸦应用程序的设备。

适配器在本地连接到“始终在 wifi 中”的所有设备。仅在发生事件时才上线、发送数据并再次下线的设备（主要是**电池供电设备**）仅支持使用涂鸦物联网平台 MQTT 连接（见下文）。

一个适配器实例可以在本地发现并连接到路由 UDP 包的网络中的所有设备！对于 Docker 环境，这需要额外的操作，并且可能需要 Macvlan 或类似的操作！

##免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™ 或注册® 商标。使用它们并不意味着与它们或任何相关子公司有任何从属关系或认可！这个个人项目是在业余时间维护的，没有商业目标。** **TUYA 是 Tuya Global Inc. 的商标。**

## 功能：仅限本地与云支持的功能
如果需要，此适配器大部分可以在没有 Tuya Cloud 的情况下工作。

如果需要，需要在添加新设备后立即与涂鸦云应用程序帐户进行一次性同步。这可以通过在适配器配置中输入云凭据并为“同步一次”按钮计时来完成。不需要存储云凭据！

**注意：当 App Sync 完成后，涂鸦手机应用程序可能会通知从 Android 设备登录到涂鸦帐户。这是来自适配器！**

然后适配器将侦听本地 UDP 消息以查找设备的本地 IP 并建立本地连接。这只有在 Tuya App 未在任何设备上打开时才有可能，因为大多数设备只允许一个本地连接。

如果您决定将您的 Tuya App 登录凭据（Smart Life App 或 Tuya Smart App）存储在适配器配置中，则设备会随着每个适配器自动启动而更新。另外，本地未连接的设备状态可以通过涂鸦云进行轮询和控制。

支持本地未连接的设备的实时更新，例如电池类设备，您可以另外在涂鸦物联网平台注册一个账号，绑定您的应用账号，使用云-MQTT连接。要在 Tuya IoT 平台上注册自己的帐户，请按照 [涂鸦物联网平台](https://developer.tuya.com/en/docs/iot/Platform_Configuration_smarthome?id=Kamcgamwoevrx) 中的说明进行操作。
**注意：物联网平台账号只有一段时间有效，之后需要按月续费！**

如果您使用涂鸦物联网平台，日志中出现类似“使用应用云轮询，因为最后一次 MQTT 更新是在 29 小时前。请检查您的涂鸦物联网云状态，没有服务过期。”那么这意味着上次没有 MQTT 消息，因此 iot 核心服务很可能已经过期。登录涂鸦物联网平台，查看物联网核心服务状态。如果已过期，则续订（可以每月直接续订，也可以通过涂鸦工作人员的人工审核流程最多续订 6 个月。
直接链接：https://eu.iot.tuya.com/cloud/products?productType=all

使用此功能集，您可以在所有可用选项之间进行选择，并使用或（除了一次性同步之外）不使用 Tuya Cloud 系统。你决定。

“以前的”App-Proxy-Sync 在 Adapter Config 中仍然可用，但不再推荐使用。执行新的一次性云同步要容易得多。

### 如果 UDP 发现不起作用
如果设备未通过其 UDP 包正确检测到，您可以通过将设备的 ip 状态设置为正确的 IP 来手动设置 IP。
前一种选择是编辑设备对象。参见 https://github.com/Apollon77/ioBroker.tuya/issues/221#issuecomment-702392636

### 电池供电设备注意事项
如上所述，仅使用本地连接时，此适配器不支持电池供电设备！原因是它们不是一直在线以节省电量。每当他们收到信号时，他们就会上线，将更新发送到涂鸦云服务器，然后再次下线。它们不发出任何 UDP 包或在线时间足够长，因此适配器可以连接到它们。

使用涂鸦云可以轮询特征数据，但对于门/窗/存在探测器来说，这可能仍然不够。它们应该只适用于涂鸦物联网平台 MQTT 连接。

## 代理同步（后备）：兼容的移动应用程序和版本
当前版本的 Tuya Smart 和 Smartlife App **不再兼容**适配器的工作方式，因为 Tuya 加密了适配器可以嗅探的所有流量。现在仍然有一些旧版本的应用程序可以工作......

* Smartlife App <3.14, 最佳 3.12.6!!
* 涂鸦智能应用程序 <3.14，最佳 3.12.x
* STL 智能家居应用程序 1.1.1（最后日期为 2019 年 9 月）
* Ucomen Home App（？？）

**针对 iOS 用户的重要提示：**此处描述的代理方法不再有效。一旦您拥有 Smart Life App 3.10 或更高版本，来自 App 的通信就不再对代理可见。但它仍然适用于所有 Android 应用程序版本，因此最好的方法是使用 Androis 模拟器，大致描述如下：https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCselte- ger%C3%A4te/19

为此，您首先需要在移动设备上添加自定义根证书。
当您在适配器实例配置中单击“启动代理”时，将为您的系统创建证书并在下载位置显示二维码。最好使用您的移动设备扫描二维码，然后按照流程添加并信任此根证书。
如果无法访问二维码位置（使用 Docker 等时可能会发生），请在浏览器中打开“代理 Web 信息端口”，然后单击导航中的“Root-CA”，您也可以下载 CA 文件。

现在确保关闭/杀死相应的 Tuya smart 应用程序。
之后，将 Proxy-Port 和 ioBroker 主机添加为手机上 WLAN 连接的“手动”代理。

现在打开相应的 Tuya Smart App 和/或重新加载。

如果收到相关数据包，管理配置将显示一条成功消息，然后将在 10 秒后关闭代理。您现在可以从手机中删除代理，也可以取消信任证书。

在此之后，对象应该立即更新为更有意义的名称，并从那时起自动接收实时更新，并且应该能够进行通信。

仅在最初或在您将新设备添加到您的应用程序之后才需要同步。

某些移动操作系统的一些图像可以在 [代理页面](PROXY.md) 找到。

## 不提供最新数据的设备
我们发现一些设备——很可能是具有电源/当前状态的设备——可能会产生这样的效果，即当移动应用程序连接到它们时，它们只会显示最新值。当应用程序关闭时，它们会保留旧值。

在大多数情况下，这些设备目前只能通过“轮询间隔”工作。他们不会自己提供最新的价值。您可以尝试使用 Tuya 的物联网平台并启用 MQTT 选项来解决这个问题。

其中一些设备在使用轮询时也不会提供最新值。如果您有这样的设备，则可能需要对设备进行不同的轮询。这可以手动配置。请执行以下操作：

* 停止涂鸦实例
* 在“对象”选项卡上使用管理并找到受影响设备的类型为“设备”的对象。在 Admin Objects 视图的这一行中，单击铅笔图标。
* 在对象的 JSON 视图中，您会看到“本机”部分。在本机部分中添加一个新的 json 键：

```json
"native": {
    "useRefreshToGet": true,
    ...
}
```

* 保存对象并重新启动适配器并检查值是否现在已更新。

## 红外网关功能
对象树中有不同类型的红外设备

### 红外网关/发送器设备
这是您作为硬件拥有的真实设备。此设备由移动应用程序（见下文）中定义的子设备使用，可用于学习和发送自定义 IR 代码。

该设备中的“ir-learn”状态是一个触发器，可用于学习 IR 代码。然后以“202”状态接收学习到的代码作为 base64 编码数据。

“ir-send”状态可用于将 base64 编码的 IR 代码发送到设备。这可用于从“ir-learn”状态发送学习代码。

**这种控制方式仅适用于“主红外设备”。**

### 红外子设备
IR 子设备有很多“ir-*”状态，它们都是触发相应按钮/IR 代码的按钮。 ir 状态应与移动应用程序中按钮的布局相匹配。

某些设备具有组合状态，如“M0_T20_S3”（由 Daikin 空调发现），表示模式 0、温度 20 和（风扇）-速度 3。实际上，您需要选择正确的按钮。直到现在我们还没有找到一种通用/自动的方法来找出哪个按钮是哪个。
移动应用程序本身也会尝试记住这些设置，因此一旦您使用适配器（或设备的真实红外控制器）触发任何操作，来自应用程序的信息就会过时。

## 场景功能
当输入并存储应用程序云凭据时，适配器还会从应用程序中读取场景并将它们创建为适配器中的对象。可以通过将场景状态设置为 true 来触发场景。

然后将触发发送到云端。

## 分组功能
适配器还读出定义的组并在适配器中创建相应的状态。组值也从云中轮询并在适配器中更新。
当控制组时，这也是通过云完成的，否则组状态将不同步。

## 转换/增强的数据点
来自某些数据点的数据经过编码，因此如果允许更改则需要解密和重新加密。

### 位图字段
有些字段包含位图，这意味着它们是一个数字，这个数字中的每一位代表一个状态。适配器将这些字段转换为子状态，如 X-0（对于位 0）、X-1（对于位 1）等。位的标签被设置添加到状态的名称中。
目前，位域是不可写的。

### RGB 颜色状态（IDs 24/5/colour/colour_data）
RGB 颜色数据点被解码为对象 5-rgb/24-rgb 作为 RGB 值，格式为“#rrggbb”。当前颜色被解码为该状态，也可以通过设置该状态来设置。
确保使用正确的灯模式（白色/彩色），因为只有当颜色模式处于活动状态时，颜色才相关。

### 功率测量状态（IDs 5/6/7/phase_a/phase_b/phase_c）
功率测量状态被解码为对象 X-电流、X-功率和 X-电压。 X-power 仅对某些设备有价值。
这些状态不可写。

### 设备报警状态（IDs 17/alarm_set_2）
警报状态被解码为一个 17 解码对象，以 json 作为值。 JSON 包含一个数组，其中包含定义的警报类型及其阈值的列表。
您可以修改和设置该 JSON 以更改警报设置。以下警报类型是已知的（但可能并非所有设备都支持所有类型）：

*过流
* three_phase_current_imbalance
* ammeter_overvoltage
*欠电压
* three_phase_current_loss
* 电源（检测）失败
* 磁的
* 余额不足
*欠款
* battery_overvoltage
* 封面打开
* meter_cover_open
* 过错

##学分
如果没有@codetheweb、@kueblc 和@NorthernMan54 (https://github.com/codetheweb/tuyapi) 和 https://github.com/clach04/python-tuya 的出色工作，适配器的工作是不可能的, https://github.com/uzlonewolf/tinytuya 等等。

## 如何报告问题和功能请求
请为此使用 GitHub 问题。

最好是将适配器设置为调试日志模式（实例 -> 专家模式 -> 列日志级别）。然后请从磁盘中获取日志文件（ioBroker 安装目录中的子目录“log”，而不是从 Admin 中获取，因为 Admin 会截断这些行）。如果您不喜欢在 GitHub 问题中提供它，您也可以通过电子邮件 (iobroker@fischer-ka.de) 将它发送给我。请添加对相关 GitHub 问题的引用，并说明我当时在日志中看到的内容。

当 Tuya App Cloud 同步出现问题时，可以通过以下过程生成额外的日志记录：

* 在管理员中停止适配器
* 在 ioBroker 主机上打开一个 shell
* 执行`DEBUG=@tuyapi/cloud* iobroker debug tuya`
* 从命令行获取日志

将参考生成的 GitHub 问题的日志发送至 iobroker@fischer-ka.de

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Add generic support for gateways (and so also WLAN Gateways)
* (Apollon77) More schema information added/updated

### 3.12.1 (2023-01-03)
* (Apollon77) More schema information added/updated

### 3.12.0 (2022-12-29)
* (Apollon77) Added decoding of phase_a/b/c and alarm_set_2
* (Apollon77) Added fallback for cloud polling when no values were updated using MQTT connection
* (Apollon77) Added decoding of bitmaps (read only for now)

### 3.11.4 (2022-12-28)
* (Apollon77) A crash case reported by Sentry is prevented
* (Apollon77) More schema information added/updated

### 3.11.3 (2022-12-22)
* (Apollon77) A crash case reported by Sentry is prevented
* (Apollon77) More schema information added/updated

### 3.11.2 (2022-12-20)
* (Apollon77) More schema information added/updated
* (Apollon77) A crash case reported by Sentry is prevented

### 3.11.1 (2022-12-15)
* (Apollon77) More schema information added/updated
* (Apollon77) Prevent crash case reported by Sentry

### 3.11.0 (2022-12-14)
* (Apollon77) Added support to control Zigbee Devices via Hubs locally
* (Apollon77) Prevent crash case when new unencrypted device is discovered
* (Apollon77) More schema information added/updated

### 3.10.2 (2022-12-05)
* (Apollon77) Optimize IR - now works locally and via cloud in all cases

### 3.10.1 (2022-12-05)
* (Apollon77) Make info.ip writable to allow manual setting of IP address

### 3.10.0 (2022-12-05)
* (Apollon77) Added support for groups
* (Apollon77) Add support for a second type of IR blaster
* (Apollon77) Added cloud session refresh while adapter is running
* (Apollon77) Add custom handling for bright_value fields with missing scale factor (10..1000 will be now 1..100);
* (Apollon77) Base64 encoded raw values are now decoded again when the decoded value is readable ascii
* (Apollon77) Allow to flag devices manually that need "refresh instead of get" to get current data - use "useRefreshToGet: true" in device object native section
* (Apollon77) More schema information added/updated

### 3.9.4 (2022-11-19)
* (Apollon77) More schema information added/updated

### 3.9.3 (2022-11-17)
* (Apollon77) Optimize Tuya protocol 3.4 discovery
* (Apollon77) Prevent restart schedules that are too short when cloud is used
* (Apollon77) Fix crash cases reported by Sentry
* (Apollon77) More schema information added/updated

### 3.9.2 (2022-11-16)
* (Apollon77) Optimize discovery and device connection checks
* (Apollon77) IPs of unconnected devices can be set via the ip state now
* (Apollon77) Fix crash cases reported by Sentry

### 3.9.1 (2022-11-14)
* (Apollon77) Add support for local control of Tuya protocols 3.2 and 3.4
* (TA2k/Apollon77) Add basic support for IR devices (Gateway and Sub Devices)
* (Apollon77) Convert special colour/colour_data values to an additional rgb state
* (Apollon77) Allow to define that devices do not connect locally (this prevents error logs, and they work via cloud if data are provided)
* (Apollon77) Add support for more cloud MQTT notifications
* (Apollon77) More schema information added/updated

### 3.8.1 (2022-11-06)
* (TA2k/Apollon77) Add App-Cloud Sync deceasing the proxy
* (Apollon77) Add support for device polling using App-Cloud for devices not connected
* (Apollon77) Add support for realtime cloud state updates using Tuya IoT Platform MQTT connection
* (Apollon77) Allow to update names of device objects when changed in App
* (Apollon77) Use read Schema details from Sync instead the already contained ones
* (Apollon77) React to device infos from MQTT connection and update/add device objects
* (Apollon77) When Datapoints (e.g sockets) have custom names, also use them as State Names
* (Apollon77) More schema information added

### 3.7.2 (2022-10-23)
* (Apollon77) Prevent warnings for invalid min/max values

### 3.7.0 (2022-10-22)
* (Apollon77) Optimizations for Proxy mode to prevent certificate issues
* (Apollon77) Allow to also "click" on the certificate to download the certificate file
* (Apollon77) Adjust min/max values if a scale is defined
* (Apollon77) More schema information added

### 3.6.15 (2022-01-24)
* (Apollon77) More schema information added
* (Apollon77) Recreate Proxy SSL certificates once older than 3 months to prevent ssl errors

### 3.6.14 (2021-11-07)
* (Apollon77) More schema information added

### 3.6.13 (2021-10-28)
* (Apollon77) More schema information added

### 3.6.11 (2021-09-05)
* (Apollon77) More schema information added

### 3.6.9 (2021-07-18)
* (Apollon77) Adjust reconnect handling on initialization

### 3.6.8 (2021-07-18)
* (Apollon77) Another fix on reconnect handling

### 3.6.7 (2021-07-18)
* (Apollon77) Another fix on reconnect handling

### 3.6.6 (2021-07-17)
* (Apollon77) Fix reconnect handling
* (Apollon77) More schema information added

### 3.6.5 (2021-06-23)
* (Apollon77) Make sure for enums values are set with correct type
* (Apollon77) More schema information added

### 3.6.3 (2021-06-04)
* (Apollon77) More schema information added
* (Apollon77) Update tuyapi

### 3.6.2 (2021-05-10)
* (Apollon77) type "bitmap" is a number
* (Apollon77) More schema information added

### 3.6.1 (2021-04-11)
* (Apollon77) More schema information added

### 3.6.0 (2021-04-02)
* (Apollon77) Fix broken data updates because of tuyaapi change
* (Apollon77) Optimize "json unvalid" cases by refreshing data manually differently 
* (Apollon77) More schema information added

### 3.5.9 (2021-03-28)
* (Apollon77) More schema information added

### 3.5.8 (2021-03-24)
* (Apollon77) More schema information added

### 3.5.7 (2021-03-18)
* (Apollon77) Fix crash case (Sentry IOBROKER-TUYA-P9)
* (Apollon77) More schema information added

### 3.5.6 (2021-02-09)
* (Apollon77) More schema information added

### 3.5.4 (2021-01-30)
* (Apollon77) Prevent crash cases (Sentry IOBROKER-TUYA-MG)
* (Apollon77) More schema information added

### 3.5.3 (2021-01-13)
* (Apollon77) More schema information added

### 3.5.2 (2020-12-24)
* (Apollon77) More schema information added

### 3.5.0 (2020-12-10)
* (Apollon77) More schema information added
* (Apollon77) Try to decode "raw" values via base64

### 3.4.3 (2020-11-29)
* (Apollon77) More schema information added

### 3.4.2 (2020-11-19)
* (Apollon77) More schema information added

### 3.4.1 (2020-11-05)
* (Apollon77) More schema information added
* (Apollon77) fix IP lookup via UDP

### 3.4.0 (2020-10-29)
* (Apollon77) update tuya-api library

### 3.3.15 (2020-10-29)
* (Apollon77) More schema information added

### 3.3.14 (2020-09-15)
* (Apollon77) More schema information added

### 3.3.12 (2020-08-26)
* (Apollon77) More schema information added
* (Apollon77) Crash case prevented (Sentry IOBROKER-TUYA-89)

### 3.3.11 (2020-08-18)
* (Apollon77) More schema information added

### 3.3.10 (2020-08-02)
* (Apollon77) More schema information added

### 3.3.9 (2020-07-16)
* (Apollon77) More schema information added

### 3.3.8 (2020-07-09)
* (Apollon77) Work around invalid data that are returned by some devices
* (Apollon77) More schema information added

### 3.3.7 (2020-07-01)
* (Apollon77) More schema information added

### 3.3.6 (2020-06-29)
* (Apollon77) More schema information added

### 3.3.5 (2020-06-11)
* (Apollon77) More schema information added
* (Apollon77) Optimizations and fixes

### 3.3.2 (2020-03-19)
* (Apollon77) Many new schemas added

### 3.2.3 (2020-03-08)
* (Apollon77) Many new schemas added

### 3.2.2 (2020-02-08)
* (Apollon77) New schemas added
* (Apollon77) Better handle strange case where qrcode library is not existing

### 3.2.0 (2020-02-05)
* (Apollon77) Many new schemas added
* (Apollon77) Add Infos about compatible App versions with link to enhanced docs
* (Apollon77) try to detect unsupported apps when trying to sync and write warning in logfile
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 3.1.16 (2019-12-26)
* (Apollon77) New schemas added
* (Apollon77) prevent crash when proxy request had no hosts array

### 3.1.15 (2019-12-24)
* (Apollon77) New schemas added
* (Apollon77) prevent usage of invalid Port numbers

### 3.1.14 (2019-12-20)
* (Apollon77) New schemas added
* (Apollon77) prevent usage of invalid Port numbers

### 3.1.13 (2019-12-11)
* (Apollon77) New schemas added

### 3.1.12 (2019-12-07)
* (Apollon77) New schemas added
* (Apollon77) Dependency update

### 3.1.11 (2019-12-06)
* (Apollon77) New schemas added
* (Apollon77) Dependency update

### 3.1.10 (2019-12-05)
* (Apollon77) New schemas added

### 3.1.9 (2019-11-30)
* (Apollon77) New schemas added
* (Apollon77) Improve error handling for proxy web port

### 3.1.8 (2019-11-28)
* (Apollon77) New schemas added
* (Apollon77) Add check for invalid proxy port

### 3.1.7 (2019-11-26)
* (Apollon77) New schemas added

### 3.1.6 (2019-11-25)
* (Apollon77) New schemas added
* (Apollon77) Optimize Sentry integration and dedupe errors

### 3.1.4 (2019-11-24)
* (Apollon77) New schemas added

### 3.1.3 (2019-11-24)
* (Apollon77) try to get rid of SSL errors with new proxies
* (Apollon77) Many new schemas added
* (Apollon77) Sentry added for error/exception/schema reporting
* (Apollon77) Compact Mode added

### 3.0.0 (2019-09-03)
* (Apollon77) Switch from AnyProxy to mitm ... hopefully get SSL-Proxy working again. Important: The Proxy is called "NodeMITMProxyCA"!

### 2.0.4 (2019-08-01)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.3 (2019-07-11)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.2 (2019-06-27)
* (Apollon77) New schemas added
* (Apollon77) Update all Dependencies
* (Apollon77) Nodejs 6.x no longer supported!
* (Apollon77) Support encrypted devices

### 1.0.8 (2019-03-08) [Unreleased]
* (Apollon77) New schemas added

### 1.0.7 (2018-11-23)
* (Apollon77) New schemas added, fixed one error

### 1.0.5 (2018-11-18)
* (Apollon77) preserve device name too, New schemas

### 1.0.4 (2018-11-16)
* (Apollon77) New schemas added

### 1.0.3
* (Apollon77) New schemas added

### 1.0.2
* (Apollon77) New schemas added
* (Apollon77) Data are requested from the device after controlling because sometimes not all data seems to be updated automatically

### 1.0.1
* (Apollon77) Automatically convert some value types like booleans better

### 1.0.0
* (Apollon77) Add several new schema definitions
* (Apollon77) Optimizations and bug fixes

### 0.1.3
* (Apollon77) Add several new schema definitions
* (Apollon77) Try to preserve names of objects. Sync with App via proxy will overwrite in any case!
* (Apollon77) Optimizations and bug fixes

### 0.1.2
* (BuZZy1337) Optimized Admin, thank you very much!

### 0.1.0/1
* (Apollon77) development and first tests

## License

The MIT License (MIT)

Copyright (c) 2018-2023 Apollon77 <iobroker@fischer-ka.de>

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