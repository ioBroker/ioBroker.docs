---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.meross/README.md
title: ioBroker.meross
hash: 64pu2JH3IQGKk7ZQAuxUhXYOGtcOjlIJLb5VGdmAF54=
---
![标识](../../../en/adapterref/iobroker.meross/admin/meross-logo.png)

![安装数量](http://iobroker.live/badges/meross-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.meross.svg)
![下载](https://img.shields.io/npm/dm/iobroker.meross.svg)

# IoBroker.meross
![测试与发布](https://github.com/Apollon77/iobroker.meross/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/meross/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## 免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™或注册®商标。使用它们并不意味着与它们或任何关联子公司有任何隶属关系或认可！此个人项目是业余时间维护的，没有任何商业目标。** **MEROSS是成都Meross科技有限公司的商标**

＃＃ 描述
该适配器允许通过连接到 Meross 云服务器来控制 Meross 设备。

您需要提供您的云登录凭据。适配器连接到您的云帐户并通过 MQTT 订阅所有设备数据。因此，设备需要连接到云。目前尚无已知的方法可以在本地控制设备。

一个适配器实例将显示来自一个 Meross Cloud 帐户的所有设备并允许控制它们。

## 使用MFA时的注意事项
该适配器允许在设置中输入当前的 MFA 代码。请注意，代码的有效期只有 30 秒，因此请快速输入并保存:-)

适配器尝试记住该令牌，但该令牌在一段时间后就会耗尽！因此，使用 MFA 时，这意味着适配器重新启动后无法进行新的登录，因为令牌无效，MFA 代码也无效！在这种情况下，适配器将保持离线状态，直到您输入新的 MFA 代码。

## 已知的工作设备
根据我目前的知识，所有设备都应该可以工作。但请检查日志或报告任何未创建状态的功能或新设备类型（新设备类型需要由我手动添加，因此问题很重要）。

## 如何报告问题和功能请求
请为此使用 GitHub 问题。

最好的方法是将适配器设置为调试日志模式（实例 -> 专家模式 -> 列日志级别）。然后，请从磁盘获取日志文件（ioBroker 安装目录中的子目录“log”，而不是从管理员获取，因为管理员会截断行）。如果您不喜欢在 GitHub 问题中提供它，您也可以通过电子邮件将其发送给我 (iobroker@fischer-ka.de)。请添加对相关 GitHub 问题的引用，并描述我当时在日志中看到的内容。

## Changelog
### 1.17.0 (2023-12-30)
* (Apollon77) Adjust Signin API and add support for MFA
* (Apollon77) Store login token and try to reuse it for reconnections, but also do not log out anymore
* (Apollon77) Add support for DoorWindow Sensor MS200HK

### 1.16.1 (2023-11-27)
* (Apollon77) Fixes initial Temperature/Humidity/Voltage values of MS100 sensors

### 1.16.0 (2023-11-25)
* IMPORTANT: Node.js 16.x or higher is required
* (Apollon77) Prevented crash case reported by Sentry

### 1.15.1 (2023-05-15)
* (Apollon77) Fix an issue when committing devices delayed

### 1.15.0 (2023-01-03)
* (Apollon77) Add support for MAP100 air purifier
* (Apollon77) Add Energy Consumption states

### 1.14.0 (2022-08-12)
* (Apollon77) Add Smoke Sensor

### 1.13.0 (2022-07-12)
* (Apollon77) Add new option to prevent the Cloud communication fallback when the device is not available locally for data queries (enabled by default).

### 1.12.2 (2022-06-27)
* (Apollon7) prevent crash case reported by Sentry

### 1.12.1 (2022-06-27)
* (Apollon7) prevent crash case reported by Sentry

### 1.12.0 (2022-06-24)
* (Apollon77) Add new state to allow controlling whether to connect locally first or not for each device (but global setting takes precedence if set there to never use local connection!)
* (Apollon77) Detect reconnection issues to Meross Cloud and try to handle them better

### 1.11.0 (2022-06-02)
* (Apollon77) Add online status configuration to show online status in Admin UI
* (Apollon77) Optimize device initialization to make sure it finishes also whe not all devices are initialized successfully

### 1.10.5 (2022-04-14)
* (Apollon77) Adjust to recent API changes from Meross services

### 1.10.4 (2022-03-15)
* (Apollon77) Add battery value for ms100 devices in hub if supported

### 1.10.3 (2022-03-11)
* (Apollon77) Fix switch state for thermostats

### 1.10.2 (2022-02-19)
* (Apollon77) Correctly set the garageDoorWorking flag after starting a control action

### 1.10.1 (2022-01-26)
* (Apollon77) Fix pot. crash case

### 1.10.0 (2022-01-20)
* (Apollon77) Optimize Meross Communication to first try to communicate with the device locally before sending data to MQTT - enabled by default, you can disable it in settings!
* (Apollon77) Optimize Meross Communication by using only one MQTT connection instead of one per device when cloud is used
* (Apollon77) Add new state "disabled" to ignore connection error of a device; reconnections are still tried, but no error are logged if not successful
* (Apollon77) Add support for Online status reports from MTS100 hub devices
* (Apollon77) Automatically logout from meross cloud on adapter end; next start will do a new Login
* (Apollon77) Automatically delete old devices if no longer existing (when js-controller >=2.2)
* (Apollon77) Optimize MTS200 handling

### 1.8.0 (2022-01-05)
* (Apollon77) Add support for MTS200 Wifi Thermostat

### 1.7.1 (2021-11-13)
* (Apollon77) Allow to enter passwords with more than 15 characters

### 1.7.0 (2021-11-13)
* (Apollon77) Add support for MTS150 Thermostats
* (Apollon77) Add support for MRS100 RollerShutter devices

### 1.6.3 (2021-06-04)
* (Apollon77) Update translations

### 1.6.2 (2021-05-07)
* (Apollon77) optimize for js-controller 3.3

### 1.6.1 (2021-04-23)
* (Apollon77) prevent crash case (Sentry IOBROKER-MEROSS-Z)

### 1.6.0 (2021-04-18)
* (Apollon77) add MOD100 Diffuser Spray device

### 1.5.1 (2020-12-05)
* (Apollon77) generate an unique uuid for each connection, fixes the "Server not available"

### 1.5.0 (2020-06-25)
* (Apollon77) Prevent crash cases (Sentry IOBROKER-MEROSS-G, IOBROKER-MEROSS-F)
* (Apollon77) Add warning about poll interval and cloud deactivation and reset poll interval to 30s for now

### 1.4.1 (2020-06-12)
* (Apollon77) Fix Admin finally

### 1.4.0 (2020-06-12)
* (Apollon77) Fix Admin
* (Apollon77) Remove the automatic cutting of passwords to 15 characters, but log info message

### 1.3.13 (2020.04.12)
* (Apollon77) add auto decryption handling with js-controller 3.0
* (Apollon77) update meross library to prevent some crash cases

### 1.3.12 (2020.03.08)
* (Apollon77) update dependencies

### 1.3.11 (2020.02.05)
* (Apollon77) optimize error handling
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 1.3.9 (2019.12.18)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.8 (2019.12.07)
* (Apollon77) update dependencies

### 1.3.7 (2019.12.01)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.6 (2019.11.28)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.5 (2019.11.28)
* (Apollon77) Prevent some error cases on disconnects

### 1.3.4 (2019.11.26)
* (Apollon77) Add Temperature/Humidity support for MTS100

### 1.3.1 (2019.11.25)
* (Apollon77) Add names to hub sub devices

### 1.3.0 (2019.11.25)
* (Apollon77) Add msg100 with Garage Door Reed contact
* (Apollon77) Add reconnection handling
* (Apollon77) Add light support (e.g. MSL120 RGB bulb)
* (Apollon77) Add units and roles for electricity
* (Apollon77) Add support for MSXH0 (Air Purifyer)
* (Apollon77) Add support for Hub and Thermostates
* (Apollon77) Allow to control DND mode (LED) - be aware then if controlled via meross app it my get out of sync!
* (Apollon77) Integrate sentry.io for automated error/exception reporting
* (Apollon77) Add support for mts100v3
* (Apollon77) add Compact mode
* (Apollon77) add control option for (rgb) lights

### 1.0.0 (2018.12.16)
* (Apollon77) finalize and move to 1.0.0

### 0.4.1 (2018.11.26)
* (Apollon77) finalize version and allow electricity polling interval to be configured

### 0.3.0 (2018.11.16)
* (Apollon77) add support for mss310 devices

### 0.1.0 (2018.11.14)
* (Apollon77) First release to support ToggleX devices

## License
The MIT License (MIT)

Copyright (c) 2018-2023 Apollon77 <iobroker@fischer-ka.de>

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