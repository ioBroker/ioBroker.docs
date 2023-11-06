---
BADGE-NPM: https://nodei.co/npm/iobroker.fullybrowser.png?downloads=true
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.fullybrowser.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.fullybrowser.svg
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/arteck/ioBroker.fullybrowser
BADGE-GitHub issues: https://img.shields.io/github/issues/arteck/ioBroker.fullybrowser
BADGE-License: https://img.shields.io/badge/License-MIT-blue.svg
BADGE-Number of Installations: http://iobroker.live/badges/fullybrowser-installed.svg
BADGE-Beta: https://img.shields.io/npm/v/iobroker.fullybrowser.svg?color=red&label=beta
BADGE-Stable: https://iobroker.live/badges/fullybrowser-stable.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fullybrowser/README.md
title: 无题
hash: KsmbgnWJZz4LQf3vFtp3jSzjdp/2sdxgNWfoJ0c0kkc=
---
![标识](../../../en/admin/fully-mqtt_500.png)

## 关于此适配器
使用此适配器，[完全 Kiosk 浏览器](https://www.full-kiosk.com)（带有 Plus 许可证）可以控制。通过 [REST API](https://www.fully-kiosk.com/en/#rest)各种命令，如“屏幕开/关”、“屏幕保护程序开/关”等可以发送到Fully。

此外，[MQTT](https://www.fully-kiosk.com/en/#mqtt) 事件（如“屏幕打开”）始终会立即传送到适配器并设置为相应的状态。此外，Fully Browser 始终至少每 60 秒自动通过 MQTT 发送所有设备信息，并相应地设置为信息状态。请注意，所有命令都是通过 REST API 而不是 MQTT 发送的，因为完全浏览器不支持通过 MQTT 发送命令。

## 完整的浏览器设置
### 激活远程管理
1. 在平板电脑上，打开全面浏览器应用程序，然后打开全面浏览器设置。
1. 打开菜单项**远程管理（PLUS）**
1. 启用**启用远程管理**
1. **远程管理密码**：输入密码
1. 启用**从本地网络进行远程管理**

![标识](../../../en/adapterref/_img/fully-browser-settings-remote-admin.png)

### 激活 MQTT
1. 在平板电脑上，打开“Fully Browser”应用程序，然后打开“设置”。或者，您也可以通过浏览器从另一台设备（例如 PC）打开远程管理，URL 通常始终为 http://ip-address:2323，系统会要求您输入上面分配的密码。
2. 打开：**设置** -> **其他设置** -> **MQTT 集成（PLUS）**
3. 启用 **启用 MQTT**
4. **MQTT Broker URL**：以“mqtt://iobroker-ip-address:3000”格式输入，其中“iobroker-ip-address”是 ioBroker 的 IP 地址，“3000”是用于 MQTT 连接的端口号。
5. **MQTT Broker Username**：这里您可以选择输入用户名
6. **MQTT Broker Password**：这里您可以选择输入密码
7. **MQTT客户端ID**：可以留空
8. **MQTT 设备信息主题**：这里您可以保留默认设置，适配器不会使用它。
8. **MQTT 事件主题**：这里您可以保留默认设置，适配器不会使用它。

![标识](../../../en/adapterref/_img/fully-browser-settings-mqtt.png)

## 适配器设置
### 完全浏览器设备
添加完全浏览器设备，即运行完全浏览器的平板电脑，相应地：

1. **设备名称**：任何名称，也用作对象/状态的一部分，例如`Tablet Flur` 变为 `complete-mqtt.0.Tablet-Flur`。
1. **协议**：保留 `http` 不变。如果应使用“https”：请参阅[远程管理](https://www.fully-kiosk.com/en/#remoteadmin)下的注释。
1. **远程管理密码**：输入上面设置的密码。

### MQTT 配置
 * **端口**：在Fullybrowser MQTT 设置中使用与上述相同的端口号（例如“3000”）。
 * **不验证用户和密码**：可以激活以禁用用户名和密码验证
 * **用户名**：可选
 * **密码**：可选

### 专家设置：MQTT
 * **处理发布的信息的时间不要超过每 x 秒**：根据 [完整文档](https://www.full-kiosk.com/en/#mqtt)，信息仅每 60 秒发布一次，但在我的测试这种情况发生得更频繁，因此可以使用此选项设置限制。
 * **始终更新信息对象**：通常，仅在发生更改时才设置/更新所有信息状态。如果启用此选项，状态将始终更新（使用 ack:true），即使之前的值没有变化。
 * **客户端和连接错误作为日志中的信息**：如果激活，客户端和连接错误始终作为信息输出，而不是日志中的错误。这有助于保持日志干净，而不是仅仅因为平板电脑短暂注销并在几秒钟后再次登录而不必要地填充日志。 “长期”错误和警告始终相应地显示在日志中。

### 专家设置：远程管理（REST API）
 * **请求超时**：在此毫秒数之后，如果不成功，REST API 请求（即发送命令）将中止。

 ## 链接
* [ioBroker-论坛：带有 MQTT 的完全浏览器适配器](https://forum.iobroker.net/topic/69729/)
* [full-kiosk.com REST API](https://www.full-kiosk.com/en/#rest)
* [full-kiosk.com MQTT 集成](https://www.full-kiosk.com/en/#mqtt)

## Changelog
### 3.0.3 (2023-11-04)
 * (arteck) setStringSettings corr

### 3.0.2 (2023-11-02)
* (arteck) add motionDetection
* (arteck) for Rooted Devices add rebootDevice

### 3.0.0 (2023-11-02)
* (arteck) breaking change - new structure from fully-mqtt Adapter from Acgua
* here is the Orginal https://github.com/Acgua/ioBroker.fully-mqtt

#----------------------------------------------------------------------

### 2.2.0 (2023-10-27)
* (arteck) intervall corr

### 2.1.6 (2022-11-23)
* (arteck) add name of device to admin
* (arteck) corr status when login fail
* (arteck) corr psw typo

### 2.1.2 (2022-04-05)
* (arteck) encodeUri in psw

### 2.1.1 (2022-02-07)
* (arteck) js-controller 4.x

### 2.1.0 (2022-02-07)
* (arteck) js-controller 4

### 2.0.14 (2022-01-31)
* (arteck) life tick error


...
...
...

### 1.0.1 (2019-06-20)
* (arteck) encodeURL

## License
The MIT License (MIT)

Copyright (c) 2014-2023 Arthur Rupp arteck@outlook.com

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