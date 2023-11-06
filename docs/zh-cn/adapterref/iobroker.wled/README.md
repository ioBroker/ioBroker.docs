---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wled/README.md
title: ioBroker.wled
hash: VTksfi1/AiTQrA42JyJUFQycy0eZ5oh1cQtDRG20hgw=
---
![标识](../../../en/adapterref/iobroker.wled/admin/wled_logo_akemi.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.wled.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wled.svg)
![安装数量](https://iobroker.live/badges/wled-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/wled-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.wled.svg)
![国家公共管理](https://nodei.co/npm/iobroker.wled.png?downloads=true)

# IoBroker.wled
**测试：** ![测试与发布](https://github.com/DrozmotiX/iobroker.wled/workflows/Test%20and%20Release/badge.svg)

**此适配器使用服务[哨兵大作战](https://sentry.io)自动向我（作为开发人员）报告异常和代码错误以及新设备架构。**更多详细信息请参见下文！

## IoBroker 的 wled 适配器
ESP8266/ESP32 网络服务器的快速且功能丰富的实现，用于控制 NeoPixel（WS2812B、WS2811、SK6812、APA102）LED 或基于 SPI 的芯片组（如 WS2801）！

[WLED - Github 项目](https://github.com/Aircoookie/WLED) 作者：@Aircoookie

＃＃ 指示
适配器会自动尝试使用 Bonjour 服务在您的网络中查找 WLED 设备。
已知问题：具有 VLAN 分离的网络大多不路由广播流量，这意味着自动检测将失败。

不用担心，在这种情况下您可以通过 IP 地址手动添加设备。

1) 确保您的 WLED 设备正在运行并且可通过网络访问 2) 安装适配器 3) 配置数据轮询和自动检测周期的间隔时间 4 - A) 启动适配器，应自动检测设备 4 - B) 如果 A 失败，使用添加设备按钮并提供设备 IP 地址 5) 适配器将立即发送更改并每 x 秒轮询数据（可配置）

＃＃ 支持我
如果您喜欢我的工作，请随时提供个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Sentry.io 是什么以及向该公司的服务器报告什么？
Sentry.io 是一项服务，供开发人员获取有关应用程序错误的概述。这正是在这个适配器中实现的。

当适配器崩溃或发生其他代码错误时，也会出现在 ioBroker 日志中的此错误消息会提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，您的安装 ID（这只是一个唯一的 ID **没有**关于您、电子邮件、姓名等的任何其他信息）也包含在内。这允许 Sentry 对错误进行分组并显示有多少唯一用户受到此类错误的影响。所有这些都有助于我提供基本上不会崩溃的无错误适配器。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.7.2 (2023-10-31) - Improve online visibility of devices
* (DutchmanNL) Show online state of device in object tree
* (DutchmanNL) Bugfix: Update online state correctly in situation connection is lost, fixes #611
* (DutchmanNL) Reset brightness to 0 and on to false during adapter start and if a device disconnects, fixes #565

### 0.7.1 (2023-10-02)
* several fixes by [HaggardFFM](https://github.com/HaggardFFM) fixes #479, #423
* (DutchmanNL) missing state attribute definitions added
* implement white color channel by [HaggardFFM](https://github.com/HaggardFFM), fixes #306, #306
* (DutchmanNL) Removed error message if definitions are missing, no impact on functionality

### 0.6.7 (2022-06-08) - Bugfix [#400](https://github.com/DrozmotiX/ioBroker.wled/issues/400)
* (DutchmanNL) Bugfix: Cannot read property 'initialized' of undefined handleStates solved [#400](https://github.com/DrozmotiX/ioBroker.wled/issues/400)

### 0.6.6 (2022-06-08) - Log messages and error reporting improved
* (DutchmanNL) Log messages and error reporting improved
* (DutchmanNL) Don't send missing attribute definitions to Sentry

### 0.6.5 (2022-06-04) - Correct indication of connection state
* (DutchmanNL) Dependency updates
* (DutchmanNL) Bugfix: Correct indication of connection state #307
* (DutchmanNL) Improve error messages & sentry reporting

## License
MIT License

Copyright (c) 2023 DutchmanNL <oss@drozmotix.eu>

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