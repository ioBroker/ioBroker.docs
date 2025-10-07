---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: DuZMTwYVqm7rd5887ZeukvOJr6IJs4sHJJGY7LJY/dc=
---
![标识](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![安装数量](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![捐](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# IoBroker.zendure-solarflow
**测试：**![测试和发布](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 Zendure Solarflow 适配器
该项目是一个 ioBroker 适配器，用于从 Zendure Solarflow Cloud API 读取数据。

## 捐赠
如果您觉得该适配器对您有用，并希望支持我的工作，欢迎通过 Paypal 捐款。谢谢！（这是 Nograx 的个人捐款链接，与 ioBroker 项目无关！）<br />

＃＃ 特征
- 获取 Solarflow 设备的所有遥测数据，包括官方应用程序中不可见的数据 - 例如电池电压
- 像官方应用程序一样控制您的 Solarflow HUB。大多数设置均可使用。
- 控制输出限值 - 您不仅限于使用 Shelly Pro EM 来实现零馈入。您还可以通过 ioBroker 中的脚本或 Blockly 设计更复杂的场景。
- 如果其中一块电池电压过低（电池保护），则停止输入。仅当通过适配器设置输出限制时有效
- 同时控制多个 Solarflow！
- 获得更精确的计算！
- 适用于所有 Zendure SolarFlow 设备：HUB1200、Hyper2000、HUB2000 和 AIO！

## 离线模式（与 Zendure Cloud 断开连接）
作为一项新功能，您可以断开 Zendure 设备与云端的连接。您可以使用 [Solarflow 蓝牙管理器](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) 来自 Reinhard Brandstätter 或我自己的 Windows 工具 [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector) 断开设备与云端的连接。您也可以使用路由器将 DNS 请求从“mq.zen-iot.com”重定向到您自己的 MQTT 服务器！

这两个工具都通过蓝牙连接到 Zendure 设备，只需将内部 MQTT URL 设置为您必须提供的新 URL/IP 地址即可。目前，您必须在服务器上使用默认的 MQTT 端口 1883。由于 Zendure 设备使用硬编码密码，您还必须停用 MQTT 服务器上的身份验证。

如果 Zendure 设备与您的 MQTT 服务器通信，您可以将此 ioBroker 适配器连接到同一 MQTT 实例。您必须提供设备型号和设备密钥（显示在 Zendure Cloud Disconnector 应用中）。

您仍然可以通过蓝牙使用官方 Zendure 应用程序进行固件更新，并使用这两种蓝牙工具将设备重新连接到云端！

＃＃ 重要的
如果您计划使用脚本/Blockly控制设备的充电和供电，我建议使用控制参数“setDeviceAutomationInOutLimit”，因为它可以在不写入设备闪存的情况下控制设备。如果您拥有带ACE 1500的HUB 1200/2000，最好将控制状态“smartMode”设置为true，因为它还会强制设备将“acMode”更改写入RAM而不是闪存。

### Hyper 2000、SF 2400 AC 或 SF 800（专业版）
在 Hyper 2000、SF 2400 AC 或 SF 800 (pro) 等设备上，您可以使用负值触发电网充电。SF 2400 AC 或 SF 800 (pro) 目前**未经测试**！

### HUB 1200 / HUB 2000 / ACE 1500 组合
在 HUB 1200 / HUB 2000 / ACE 1500 组合中，您必须使用“setDeviceAutomationInOutLimit”进行供电，并手动切换 acMode 和“setInputLimit”以从电网充电。在这种情况下，强烈建议将“smartMode”设置为 true！

## 注释
此适配器现在将使用云授权码在官方 mqtt 服务器上进行身份验证，您可以在 Zendure 应用程序中生成该授权码！

## Changelog
### 3.0.1 (2025-10-02)

- Update 'lastUpdate' when a battery value changes
- Add deviceKey 'R3mn8U' for Solarflow 800 Pro

### 3.0.0 (2025-09-30)

- Breaking Change: Change authentication to "authentication cloud key". You can generate a key in the official zendure app
- Removed fallback server
- Add deviceKey 'a4ss5P' for Solarflow 800
- Refactor a lot of code

### 2.0.4 (2025-09-12)

- Fix creation of control states on new Hyper 2000 v3
- Updates dependencies

### 2.0.3 (2025-09-09)

- Added 'B3Dxda' as new Hyper 2000 productKey
- Removed parameter 'upTime' and 'pullTime' from 'setDeviceAutomationInOutLimit'
- TEST: Use 'setDeviceAutomationInOutLimit' to let HUB1200/HUB2000 charge with connected ACE 1500

### 2.0.1 (2025-07-22)

- Small fix MQTT service

### 2.0.0 (2025-07-21)

- Breaking Change: Add control parameter 'setDeviceAutomationInOutLimit' which emulates Zendure's Smart Matching mode. I recommend using this device automation instead of 'setInputLimit'/'setOutputLimit' from now on, as there were concerns that setting limits/modes would be stored in the flash memory. You can use negative values for charging and positive for feed in. On HUB 1200/2000 with ACE 1500 you can use "smartMode" to prevent switching AC mode trigger writing to the flash memory. Check you the readme for more details or participate in the ioBroker forum.

### 1.15.4 (2025-07-17)

- Add smart mode control parameter for more devices

### 1.15.3 (2025-07-17)

- Match case sensitive product key for SF 2400 AC and SF 800 in settings if local mode is used
- Add sensor and control of "SmartMode"

### 1.15.2 (2025-07-14)

- Fix missing SF 800 & 2400 AC in local mode settings

### 1.15.1 (2025-07-11)

- Fix missing Solar Input 3 & 4 on Solarflow 800 Pro
- Fix 'packPower' state did not set to 0 if no input/output

### 1.15.0 (2025-06-27)

- Add 'packPower' state, which shows combined power from (packInputPower and outputPackPower). Discharging will be shown with a negative value.
- Add 'hyperTmp' to Solarflow 800 devices in hope this will show the temperature of the Solarflow 800 (can not test it due to lack of test device).

## License

MIT License

Copyright (c) 2025 Peter Frommert

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