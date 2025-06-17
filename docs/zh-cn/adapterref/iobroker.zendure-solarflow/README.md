---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: oUHjm0l2gox7du7bio9yb01Ho+BUKdegEe8BVpEQ3Ww=
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

## Zendure Solarflow ioBroker 适配器
该项目是一个 ioBroker 适配器，用于从 Zendure Solarflow Cloud API 读取数据。

## 捐赠
如果您觉得该适配器对您有用，并希望支持我的工作，欢迎通过 Paypal 捐款。谢谢！（这是 Nograx 的个人捐款链接，与 ioBroker 项目无关！）<br />

＃＃ 特征
- 获取 Solarflow 设备的所有遥测数据，包括官方应用程序中不可见的数据 - 例如电池电压
- 像官方应用程序一样控制您的 Solarflow HUB。大多数设置均可使用。
- 控制输出限值 - 您不仅限于使用 Shelly Pro EM 来实现零馈入。您还可以通过 ioBroker 中的脚本或 Blockly 设计更复杂的场景。
- 如果一块电池电压过低（电池保护），则停止输入。仅在通过适配器设置输出限制时有效。
- 同时控制多个 Solarflow！
- 获得更精确的计算！
- 适用于所有 Zendure SolarFlow 设备：HUB1200、Hyper2000、HUB2000 和 AIO！

## 离线模式（与 Zendure Cloud 断开连接）
作为一项新功能，您可以断开 Zendure 设备与云端的连接。您可以使用 [Solarflow 蓝牙管理器](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) 来自 Reinhard Brandstätter 或我自己的 Windows 工具 [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector) 断开设备与云端的连接。您还可以使用路由器将 DNS 请求从“mq.zen-iot.com”重定向到您自己的 MQTT 服务器！

这两个工具都通过蓝牙连接到 Zendure 设备，只需将内部 MQTT URL 设置为您必须提供的新 URL/IP 地址即可。目前，您必须在服务器上使用默认的 MQTT 端口 1883。由于 Zendure 设备使用硬编码密码，您还必须停用 MQTT 服务器上的身份验证。

如果 Zendure 设备与您的 MQTT 服务器通信，您可以将此 ioBroker 适配器连接到同一个 MQTT 实例。您必须提供设备型号和设备密钥（显示在 Zendure Cloud Disconnector 应用中）。

您仍然可以通过蓝牙使用官方 Zendure 应用程序进行固件更新，并使用这两种蓝牙工具将设备重新连接到云端！

## 注释
1. 请停用/取消选中 Zendure App 中的所有模式，否则无法设置输出限制！

   ![Solarflow设置窗口](https://raw.github.com/nograx/ioBroker.zendure-solarflow/master/Screenshots/ZendureSolarflowSettings.png)

2. 使用 ioBroker 适配器登录后，您将退出官方 iOS 或 Android 应用程序。这是正常现象。为了解决这个问题，您可以使用另一个电子邮件地址创建第二个 Zendure 帐户，并授予此帐户访问 Solarflow HUB 的权限。然后使用第二个帐户访问 ioBroker/Zendure Solarflow 适配器。

## 致谢
感谢 https://github.com/reinhard-brandstaedter/solarflow，它帮助我了解了 Zendure 的 MQTT 服务器！谢谢！

## Changelog
### 1.14.3 (2025-06-09)

- Fix input and output limit for Solarflow 2400 AC

### 1.14.2 (2025-06-07)

- Fix control states not writable.

### 1.14.1 (2025-06-07)

- IMPORTANT: This version will use a new way to check which states should be created for the device, so maybe something is broken on state creation!
- Add support for AC2400, Solarflow 800 and Solarflow 800 Pro. All devices are untested as Zendure won't allow to share data to other users on these new devices AND I don't own any of the devices!
- Removed the "standby usage" on batteries, as it confused some people.

### 1.13.2 (2025-05-07)

- Fix AC Mode showing unknown parameter on ACE 1500

### 1.13.1 (2025-05-05)

- TEST: Set Smart CT Mode and Smart Matching Mode correctly - Feedback needed!
- Removed efficiency from calculation, as it seems Zendure already included it in charge and discharge values

### 1.13.0 (2025-04-30)

- Add possibility to deactivate automatic restart of adapter in adapter settings (recommended only on local mode!)
- Fixed missing control state "hubState"

### 1.12.7 (2025-03-24)

- Add productKey "gDa3tb" for Hyper 2000

### 1.12.6 (2025-03-21)

- Fix onMessage Debug message

### 1.12.5 (2025-03-21)

- Add Debug messages on log level debug
- Add schedule for adapter refresh on local mode
- Fix Change of Discharge limit to 0

### 1.12.4 (2025-03-19)

- Fix calculation of SOC if "local" mode is used

### 1.12.3 (2025-03-19)

- Add 2 more devices if "local" mode is used
- Fix mqtt subscription of 2. device in "local" mode

### 1.12.2 (2025-03-18)

- Fix reset of calculation values on "local" mode

### 1.12.1 (2025-03-17)

- Fix IOT subscription

### 1.12.0 (2025-03-17)

- Added possibility to use "local" mode. You have to either route dns request to your own MQTT server or use a tool to modify the Zendure device
- Some improvements on value calculation
- Some improvements on AIO 2400 device

### 1.11.0 (2025-02-11)

- Drop Standby usage to 7W and 14W if HUB connected with ACE as it is more accurate
- Added heatState and autoModel (system operation mode) state
- Added possibility to set the operation mode (autoModel)
- Fix gridPower state

### 1.10.7 (2025-01-21)

- Fix reset calculation values of ACE if connected to HUB

### 1.10.6 (2025-01-16)

- Fix start of calculation if HUB is connected with Ace

### 1.10.4 (2025-01-14)

- Fix "Grid Input Power" state if connected with Ace

### 1.10.1 (2025-01-06)

- Fix input limit when hub is bundled with ace
- Fix calculation when low voltage block is activated

### 1.10.0 (2024-12-02)

- Add setting to perform a full charge if SOC from Zendure is greater than 50% when on low voltage
- Bugfixes

### 1.9.3 (2024-11-22)

- Fix for Low Voltage Block not deactivated

### 1.9.2 (2024-11-21)

- Fix some state definitions

### 1.9.1 (2024-11-21)

- Improvement for 'Low Voltage Block'.
- Changed the state "hubState" a an option value.

### 1.9.0 (2024-11-20)

- New option to force Solarflow device to go offline when "Low Voltage Block"-option is used.

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