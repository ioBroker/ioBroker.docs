---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.doorbird/README.md
title: ioBroker.doorbird
hash: zbejmqSBx6zSdGTk14KEC5BhMxHrKABP/OtBbL2wL5w=
---
![标识](../../../en/adapterref/iobroker.doorbird/admin/doorbird.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.doorbird.svg)
![下载](https://img.shields.io/npm/dm/iobroker.doorbird.svg)
![测试](https://travis-ci.org/BuZZy1337/ioBroker.doorbird.svg?branch=master)
![新PM](https://nodei.co/npm/iobroker.doorbird.png?downloads=true)

# IoBroker.doorbird
＃＃ 配置
1. 输入适配器应在其上侦听来自 Doorbird 设备的事件的 IP。

（这通常是您的 ioBroker 主机的 IP）。
适配器会尝试使用正确的 IP 为您预填充该字段。如果预填的 IP 不是您的 ioBroker 主机的 IP，请将其更改为正确的 IP。

2. 端口预定义为“8100”。如果端口已被其他服务使用，您可以更改它。

只需尝试使用此端口运行适配器。如果端口不可用，您将在启动适配器时收到错误消息。然后回到这里并更改端口。

3. 输入您的 Doorbird 设备的 IP。您可以单击输入字段左侧的“搜索图标”。单击该图标后，将出现配置屏幕顶部的一条消息。现在您有 60 秒的时间来按下 Doorbird 设备上的响铃按钮。适配器尝试检测 IP 并为您填写所有字段。
4. Doorbird 的设备 ID（不是 IP！）。
5. 需要在 Doorbird 设备上有 API 权限的用户名。
6. 在字段 5 中输入的用户名密码。

![截屏](../../../en/adapterref/iobroker.doorbird/img/configscreen.png)

在配置对话框中输入所有必需的信息后，单击“保存并关闭”。
适配器现在应该重新启动，您就可以开始了！

## Changelog
### 0.1.5 (2018-09-18)
* (BuZZy1337) Check response of Doorbird when triggering relays
* (BuZZy1337) Check if any favorite has to be updated (For example when adapter address or port changes)
* (BuZZy1337) Added state for restarting DoorBird Device (There is a bug in DoorBird Firmware. DoorBird will fix it with next FW Update!)
* (BuZZy1337) Change some Code for working more with responses from DoorBird

### 0.1.0 (2018-09-08)
* (BuZZy1337) "public release"
* (BuZZy1337) Changed Adapter address option from dropdown list to input field
* (BuZZy1337) Added Support for triggering Doorbird-Relays

### 0.0.4
* (BuZZy1337) DO A COMPLETE REINSTALL OF THE ADAPTER (DELETE AND INSTALL THE ADAPTER AGAIN!)
DELETE ALL IOBROKER SCHEDULES AND THEN ALL IOBROKER FAVORITES IN YOUR DOORBIRD APP BEFORE STARTING 0.0.4!
* (BuZZy1337) Added support for more than one Doorbell Button
* (BuZZy1337) Encrypted saving of Doorbird Password
* (BuZZy1337) Detect and create Favorites & Schedules on the Doorbird Device.
* There is a Bug in the Doorbird Firmware for the Motion schedule! You can delete and set the Schedule for the Motion sensor in the App - that's a workaround for now.

### 0.0.3
* (BuZZy1337) Added possibility to choose the AdapterIP Address

### 0.0.2
* (BuZZy1337) Just added the info that the Adapter is not ready yet .. just to be sure! ;)

### 0.0.1
* (BuZZy1337) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2022 BuZZy1337 <buzzy1337@outlook.de>

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