---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: Dyw+8uyBMTmMhGScsOipJmn0VIAUv/lq+yDEbl+uJxg=
---
![商标](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![安装数量](http://iobroker.live/badges/tuya-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.tuya.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tuya.svg)

#ioBroker.tuya
![测试和发布](https://github.com/Apollon77/iobroker.tuya/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tuya/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

ioBroker 适配器，用于连接几个小型廉价 Wifi 设备，这些设备关心连接到涂鸦云，并且主要使用 Smartlife App/Alexa-Skill。一旦与相应的手机应用程序同步，该适配器支持读取实时状态更新和控制这些设备。

涂鸦设备为深圳氙气ESP8266MOD WiFi智能设备。

除了可与 Smart Live 应用程序一起使用的设备外，还应可以使用 Jinvoo 智能应用程序、Xenon Smart 应用程序、eFamilyCloud、io.e（Luminea 等）应用程序。如果成功请反馈。 <img src="https://https://raw.githubusercontent.com/Apollon77/ioBroker.tuya/master/admin/warning.png" width="50" height="50"> **适配器仅适用于涂鸦和兼容应用，只要它们的版本低于 3.14 (!!)**

该适配器经验证可与所有“始终处于 wifi 状态”的设备完美配合。不支持仅在发生事件时联机、发送数据并再次脱机的设备。这意味着**电池供电的设备通常不工作！**

一个适配器实例可以处理一个网络中路由 UDP 包的所有设备。

## 兼容的移动应用程序和版本
当前版本的涂鸦智能和 Smartlife 应用程序**不再兼容**适配器的工作方式，因为涂鸦加密了适配器可以嗅探的所有流量。目前仍有一些旧版本的应用程序工作......

* Smartlife 应用 <3.14，最好 3.12.6！！
* 涂鸦智能应用 <3.14，最好 3.12.x
* STL 智能家居应用程序 1.1.1（最后日期为 2019 年 9 月）
* Ucomen Home 应用程序 (??)

＃＃ 重要的提示
如果未通过其 UDP 包正确检测到设备，您可以通过编辑设备对象手动设置 IP。见 https://github.com/Apollon77/ioBroker.tuya/issues/221#issuecomment-702392636

## 适配器的工作原理
### 基本功能
适配器监视本地网络中涂鸦（旧固件，因此仅未加密）设备的 UDP 数据包。需要将适配器运行所在的ioBroker主机与设备放在同一网段，并且需要路由器支持UDP多播！

所有检测到的设备都被添加到适配器中，作为基础功能，适配器在定义的轮询间隔内请求数据。如果没有与相应的移动应用程序同步（见下文），就不可能有更多的功能，如实时更新或控制。

在您执行设备同步之前，不会显示较新的加密设备（请参阅下一步...）

### 设备同步后的高级功能
为了获得适配器的全部功能并支持具有新加密固件的设备，适配器需要知道加密密钥。

接收此加密密钥的最简单方法是从使用过的移动应用程序中获取它们。为此，适配器提供了一个代理来捕获应用程序与 tuya 服务器的通信并获取所需的信息。

**iOS 用户的重要说明：** 此处描述的代理方法不再有效。一旦您拥有 Smart Life App 版本 3.10 或更高版本，来自 App 的通信就不再对代理可见。但它仍然适用于所有 Android 应用程序版本，因此最好的方法是使用 Androis Emulator，大致描述在 https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte- ger%C3%A4te/19

为此，您首先需要在移动设备上添加自定义根证书。
当您在适配器实例配置中单击“启动代理”时，将为您的系统创建证书并在下载位置显示一个二维码。理想情况下，使用您的移动设备扫描 QR 码并按照流程添加和信任此根证书。
如果无法访问二维码位置（使用 Docker 等时可能会发生），请在浏览器中打开“代理 Web 信息端口”并单击导航中的“Root-CA”，您也可以下载 CA 文件。

现在确保关闭/杀死相应的涂鸦智能应用程序。
之后添加代理端口和 ioBroker 主机作为您手机上 WLAN 连接的“手动”代理。

现在打开相应的涂鸦智能应用程序和/或重新加载。

如果收到相关数据包，Admin 配置将显示成功消息，然后在 10 秒后关闭代理。您现在可以从手机中删除代理并取消信任证书。

在此之后，对象应该使用更有意义的名称进行更新，并从那时起自动接收实时更新，并且应该能够进行通信。

仅在最初或在您向应用程序添加新设备后才需要同步。

某些移动操作系统的一些图像可以在 [代理页面](PROXY.md) 中找到。

## 不适用于电池供电的设备
此适配器通常不支持电池供电设备！原因是他们不是一直在线以节省电量。每当他们收到信号时，他们就会上线，将更新发送到涂鸦云服务器，然后再次下线。它们不会发出任何 UDP 包或在线时间足够长，因此适配器可以连接到它们。
一旦有人找到直接从涂鸦云中获取数据的方法，这种情况可能会改变。

##学分
如果没有@codetheweb、@kueblc 和@NorthernMan54 (https://github.com/codetheweb/tuyapi) 和 https://github.com/clach04/python-tuya 的出色工作，适配器的工作是不可能的还有很多。

＃＃ 去做
* 增强测试：状态检查和 setState 的
* 增强文档

## 如何报告问题和功能请求
请为此使用 GitHub 问题。

最好是将适配器设置为调试日志模式（实例 -> 专家模式 -> 列日志级别）。然后请从磁盘获取日志文件（ioBroker 安装目录中的子目录“log”，而不是从 Admin 获取，因为 Admin 截断了行）。如果您不喜欢在 GitHub 问题中提供它，您也可以通过电子邮件 (iobroker@fischer-ka.de) 将其发送给我。请添加对相关 GitHub 问题的引用，并描述我当时在日志中看到的内容。

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Make sure for enums values are set with correct type

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

Copyright (c) 2018-2021 Apollon77 <iobroker@fischer-ka.de>

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