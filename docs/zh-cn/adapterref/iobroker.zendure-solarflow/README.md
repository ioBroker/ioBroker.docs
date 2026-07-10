---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: FOzwWSvFOpUsK0/fB2iZjiSBxwNWuvJfzIvLcGuKsN8=
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
- 像在官方应用程序中一样控制您的 Solarflow 设备。大部分设置均可用。
- 控制输入输出限制 - 您不仅限于使用 Shelly Pro EM 来实现零输入。您还可以通过 ioBroker 中的脚本或 Blockly 设计更复杂的场景。
- 若其中一块电池电压过低，则停止输入（电池保护）。仅当通过适配器设置输出限制时才有效。
- 同时控制多个 Solarflow！
获取更精确的计算结果！
- 适用于所有 Zendure SolarFlow 设备！
- **zenSDK 集成**：通过本地 HTTP 通信为兼容设备提供高级通信
- **将 MQTT 消息转发至云端**：设备拥有完整的本地控制权限，数据会转发至 Zendure MQTT 服务器。即使网络中断或 Zendure 服务器离线，您也不会失去控制权。

支持的设备
目前所有 Zendure Solarflow 设备均通过云端提供支持。

## 模式
- **云密钥认证** 这是 Zendure 官方支持的方法。您可以从官方应用获取云密钥。默认情况下使用 zenSDK（设备必须与 ioBroker 实例位于同一网络）。您可以选择仅使用云模式。对于 MQTT 设置为本地服务器的旧设备，现在可以毫无缺点地将数据传输到云端！

- **本地 MQTT** 也可以使用本地模式。目前尚无已知方法让新款 Solarflow 设备直接在设备上设置 MQTT 服务器，因此您需要使用 DNS 中继。

### ZenSDK 兼容设备 ✅
这些设备支持高级 zenSDK 自动化功能，并可对 http 进行完全的**本地**控制：

- **Solarflow 1600 AC Plus** - 完全支持 zenSDK
- **Solarflow 2400 AC** - 完全支持 zenSDK
- **Solarflow 2400 AC Plus** - 完全支持 zenSDK
- **Solarflow 2400 Pro** - 完全支持 zenSDK
- **Solarflow 800** - 完全支持 zenSDK
- **Solarflow 800 Plus** - 完全支持 zenSDK
- **Solarflow 800 Pro** - 完全支持 zenSDK

### 旧设备🔄
这些设备支持**本地** MQTT 模式（Zendure Cloud Disconnector）：

- **HUB 1200** - 支持本地模式，可将消息转发到云端
- **HUB 2000** - 支持本地模式，可将消息转发到云端
- **Hyper 2000** - 支持本地模式，可将消息转发到云端
- **AIO 2400** - 支持本地模式，可将消息转发到云端
- **ACE 1500** - 支持本地模式，可将消息转发到云端

### 本地模式优势 🏠
“传统”设备可以完全断开与 Zendure 云的连接，同时保持全部功能：

- **隐私**：不会向 Zendure 服务器发送任何数据
- **可靠性**：直接本地 MQTT 通信
- **速度**：响应速度更快，无云延迟
- **灵活性**：可根据需要将消息转发到云端
- **控制**：完全本地自动化，无需互联网依赖
- **更新**：您仍然可以通过蓝牙使用官方 Zendure 应用程序进行固件更新。

## 离线模式（断开与 Zendure 云的连接）
作为一项新功能，您可以将 Zendure 设备与云端断开连接。您可以使用 [Reinhard Brandstätter 的 Solarflow Bluetooth Manager（https://github.com/reinhard-brandstaedter/solarflow-bt-manager）或我自己的 Windows 工具 [Zendure Cloud Disconnector](https://github.com/reinhard-brandstaedter/solarflow-bt-manager)。](https://github.com/nograx/zendure-cloud-disconnector) 断开设备与云端的连接。此外，您还可以通过路由器将来自“mq.zen-iot.com”的 DNS 请求重定向到您自己的 MQTT 服务器！

这两个工具都通过蓝牙连接到 Zendure 设备，并将内部 MQTT URL 设置为您需要提供的新 URL/IP 地址。目前，您只能在服务器上使用默认的 MQTT 端口 1883（或启用 SSL 后的 8883）。此外，由于 Zendure 设备使用硬编码密码，您还必须禁用 MQTT 服务器上的身份验证。

您可以将其与云身份验证密钥结合使用，或者使用完全本地模式。

＃＃ 重要的
如果您计划使用脚本/代码块控制设备的充电和输入，我建议使用控制参数“setDeviceAutomationInOutLimit”，因为这样可以在不写入设备闪存的情况下控制设备。您可以使用负值来触发电网充电。

## 注释
此适配器将使用云授权码在官方 MQTT 服务器上进行身份验证，您可以在 Zendure 应用中生成该授权码！

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 4.1.0 (2026-06-19)

- Allow local TLS MQTT Server connection on port 8883 (due to new device firmware) in settings
- Fix batcur calculation

### 4.0.6 (2026-06-06)

- Add productKey 'nVyeqM' for Solarflow 800 Pro 2

### 4.0.5 (2026-06-03)

- Add state 'socStatus' (Auto-calibration) for modern devices (SF 800 upwards)
- Fix adapter start if deviceList is empty
- Improve logging of errors
- Adapter requires node.js >= 22 now

### 4.0.4 (2026-04-14)

- Update dependencies

### 4.0.3 (2026-03-31)

- Fix missing ip address field in settings for local mode
- Add retry loop for zenSDK requests (retry 3 times if connection failed)
- Update battery detection

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