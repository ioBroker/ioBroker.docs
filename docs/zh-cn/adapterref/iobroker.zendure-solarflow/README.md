---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: xvocCcuZLsdfsukPve8EdU9O4QqVZuU4O7uY5zs2+P8=
---
![标识](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![安装数量](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![捐](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# IoBroker.zendure-solarflow
**测试：** ![测试与发布](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Zendure Solarflow ioBroker 适配器
本项目是一个 ioBroker 适配器，用于从 Zendure Solarflow 云 API 读取数据。

捐赠
如果您觉得这个适配器对您有用，并想支持我的工作，欢迎通过PayPal捐赠。谢谢！（这是我为Nograx设置的个人捐赠链接，与ioBroker项目无关！）<br />

＃＃ 特征
- 获取来自 Solarflow 设备的所有遥测数据，包括官方应用程序中不显示的数据，例如电池电压
- 像在官方应用程序中一样控制您的 Solarflow HUB。大部分设置均可使用。
- 控制输出限制 - 您并非只能使用 Shelly Pro EM 来实现零输入。您还可以通过 ioBroker 中的脚本或 Blockly 设计更复杂的场景。
- 若其中一块电池电压过低，则停止输入（电池保护）。仅当通过适配器设置输出限制时才有效。
- 同时控制多个 Solarflow！
获取更精确的计算结果！
- 适用于所有 Zendure SolarFlow 设备：HUB1200、Hyper2000、HUB2000 和 AIO！

## 离线模式（断开与 Zendure 云的连接）
作为一项新功能，您可以将 Zendure 设备与云端断开连接。您可以使用 [Reinhard Brandstätter 的 Solarflow Bluetooth Manager（https://github.com/reinhard-brandstaedter/solarflow-bt-manager）或我自己的 Windows 工具 [Zendure Cloud Disconnector](https://github.com/reinhard-brandstaedter/solarflow-bt-manager)。](https://github.com/nograx/zendure-cloud-disconnector) 断开设备与云端的连接。此外，您还可以通过路由器将来自“mq.zen-iot.com”的 DNS 请求重定向到您自己的 MQTT 服务器！

这两个工具都通过蓝牙连接到 Zendure 设备，并将内部 MQTT URL 设置为您需要提供的新 URL/IP 地址。目前，您只能使用服务器上的默认 MQTT 端口 1883。此外，由于 Zendure 设备使用硬编码密码，您还必须禁用 MQTT 服务器上的身份验证。

如果 Zendure 设备与您的 MQTT 服务器通信，您可以将此 ioBroker 适配器连接到同一个 MQTT 实例。您需要提供设备型号和设备密钥（显示在 Zendure Cloud Disconnector 应用中）。

您仍然可以使用官方 Zendure 应用程序通过蓝牙进行固件更新，并使用这两个蓝牙工具将设备重新连接到云端！

＃＃ 重要的
如果您计划使用脚本/代码块控制设备的充电和输入，我建议使用控制参数“setDeviceAutomationInOutLimit”，因为这样可以在不写入设备闪存的情况下控制设备。您可以使用负值来触发电网充电。

由于我只拥有 Hyper 2000 设备，其他设备未经我测试，其功能依赖于社区的反馈！

## 注释
此适配器现在将使用云授权码在官方 MQTT 服务器上进行身份验证，您可以在 Zendure 应用程序中生成该授权码！

## Changelog
### 3.5.3 (2026-03-01)

- Fix setDeviceAutomationInOutLimit on certain HEMS devices like 2400 AC(+)

### 3.5.2 (2026-02-28)

- Add productKey '5fG27j' for Solarflow 2400 AC+

### 3.5.1 (2026-02-19)

- Try to update state only if state exist for this device
- Improved error handling

### 3.5.0 (2026-02-18)

- Add productKey '2Qe7C9' for Solarflow 2400 Pro
- Add event handler (log message) for MQTT disconnect

### 3.4.0 (2026-02-16)

- Add productKey '8n77V3' for Solarflow 800 Plus
- Remove passMode, pass and buzzerSwitch from Hyper 2000

### 3.3.2 (2026-02-02)

- Fix another 'has no existing object' message bug on pvPower3 + 4
- Fix Battery identification of AB2000X and calculation of 'energyWhMax'
- Fix Battery identification of AB3000 and calculation of 'energyWhMax'

### 3.3.1 (2026-01-30)

- Fix calculation issue

### 3.3.0 (2026-01-30)

- Fix 'has no existing object' messages on pvPower3 + 4
- Fix AC input limit of SF 800 Pro

### 3.2.2 (2025-12-21)

- Fix reset of calculation states if PV3+4 (SF 800 Pro)

### 3.2.1 (2025-12-17)

- Fix setDeviceAutomation charging mode

### 3.2.0 (2025-12-17)

- Fix inputLimit on certain devices
- Fix calculation of PV3 & 4 again (hopefully now 100%)
- Add some more specific debug messages
- Remove misleading error message on adapter start
- Replace restart on checkStatesJob with a debug message (I think Zendure cloud is stable now)
- Update adapter to adapter-react-v5 (MUI v5)
- Fix commandbar in settings

### 3.1.1 (2025-12-01)

- Fix Uppercase 'a4ss5p' in helpers.ts

### 3.1.0 (2025-12-01)

- Fix setInputLimit (always use positive value!)
- Add calculation states for PV3 & PV4 (used by SF 800 Pro)

### 3.0.8 (2025-10-22)

- Fix missing smartMode state for SF 800 Pro

### 3.0.7 (2025-10-20)

- Fix creation of SF 800 Pro device

### 3.0.5 (2025-10-20)

- Add some more log information on device creation

### 3.0.4 (2025-10-09)

- Fix inputLimit issue
- Fix Wifi status not updating when packData changes

### 3.0.3 (2025-10-07)

- Optimize setting of wifiMode in local mode
- Optimize Debug option

### 3.0.2 (2025-10-06)

- Ignore 'wifiState' for last update value

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

Copyright (c) 2026 Peter Frommert

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