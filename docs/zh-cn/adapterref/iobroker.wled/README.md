---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wled/README.md
title: ioBroker.wled
hash: pStvbquMEGwMuxEmQzOyowIP4eNECtJUsXFGkpvHiAA=
---
![标识](../../../en/adapterref/iobroker.wled/admin/wled_logo_akemi.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.wled.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wled.svg)
![安装数量（最新）](http://iobroker.live/badges/wled-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/wled-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.wled.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.wled/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.wled.png?downloads=true)

# IoBroker.wled
![测试和发布](https://github.com/DrozmotiX/ioBroker.wled/workflows/Test%20and%20Release/badge.svg)

**此适配器使用服务 [Sentry.io](https://sentry.io) 自动向作为开发人员的我报告异常和代码错误以及新设备架构。** 更多详细信息见下文！

## IoBroker 的 wled 适配器
ESP8266/ESP32 网络服务器的快速且功能丰富的实现，用于控制 NeoPixel（WS2812B、WS2811、SK6812、APA102）LED 或基于 SPI 的芯片组，如 WS2801！

[WLED - Github 项目](https://github.com/Aircoookie/WLED)@Aircoookie

＃＃ 指示
适配器会使用 Bonjour 服务自动尝试在您的网络中查找 WLED 设备。
已知问题：具有 VLAN 分离的网络大多不路由广播流量，这意味着自动检测将失败。

别担心，在这种情况下，您可以通过 IP 地址手动添加设备。

1) 确保您的 WLED 设备正在运行并可通过网络访问 2) 安装适配器 3) 配置数据轮询和自动检测周期的间隔时间 4 - A) 启动适配器，设备应自动检测 4 - B) 如果 A 失败, 使用 Add-Device 按钮并提供设备 IP 地址 5) 适配器将立即发送更改并每 x 秒轮询数据（可配置）

＃＃ 支持我
如果您喜欢我的作品，请随时提供个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/main/admin/button.png)](http://paypal.me/DutchmanNL)

## 什么是 Sentry.io 以及向该公司的服务器报告什么？
Sentry.io 是一项服务，供开发人员从他们的应用程序中获取有关错误的概述。而这正是在这个适配器中实现的。

当适配器崩溃或发生其他代码错误时，此错误消息也会出现在 ioBroker 日志中，并提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，您的安装 ID（这只是一个唯一 ID **没有**关于您、电子邮件、姓名等的任何其他信息）也包括在内。这允许 Sentry 对错误进行分组并显示有多少唯一用户受到此类错误的影响。所有这些都帮助我提供基本上从不崩溃的无错误适配器。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.6.3 (2021-09-08) - HotFixes
* (DutchmanNL) Missing dropdown for ID of effects added
* (DutchmanNL) HotFix: Missing axios dependency added

### 0.6.1 (2021-09-08)
* (DutchmanNL) Missing state definitions WLED FW 0.13.0-b12 added.

### 0.6.0 (2021-08-31) - Support Websocket connections
* (DutchmanNL) System load reduced
* (DutchmanNL) All warnings related to JS-Controller 3.x checks solved
* (DutchmanNL) Ensure legacy support of WLED FW < 0.12 (fallback to http-API instead of websocket)
* (DutchmanNL) Communication by websocket implemented, this feature allows live data updates (instead of interval polling). Requires WLED firmware >= 12

### 0.5.9 (2021-08-11)
* (DutchmanNL) added new state attributes reported by Sentry
* (DutchmanNL) added min & max for brightness value to support iOT adapter

### 0.5.8 (2021-08-11)
* (DutchmanNL) added new state attributes reported by Sentry
* (DutchmanNL) Bugfix Live override datapoint created as read-only #252
* (DutchmanNL) excluded value "PIR" from data write due to current formatting

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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