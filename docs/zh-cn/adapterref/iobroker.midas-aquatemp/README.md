---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.midas-aquatemp/README.md
title: ioBroker.midas-aquatemp
hash: rOtzxDCLO1xb0up4n/6LQBft3dt06yVrRXcZ148KB4o=
---
![标识](../../../en/adapterref/iobroker.midas-aquatemp/admin/midas-aquatemp.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.midas-aquatemp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.midas-aquatemp.svg)
![安装数量](https://iobroker.live/badges/midas-aquatemp-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/midas-aquatemp-stable.svg)
![NPM](https://nodei.co/npm/iobroker.midas-aquatemp.png?downloads=true)

# IoBroker.midas-aquatemp
**测试：** ![测试与发布](https://github.com/Miro1310/ioBroker.midas-aquatemp/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 有关禁用错误报告的更多详细信息和说明，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## Midas-aquatemp ioBroker 适配器
## 文档
＃＃＃ 配置
| 字段 | 描述 |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **用户名** | 您的 Linked-Go 云账户电子邮件地址。强烈建议为适配器创建一个专用的第二个账户，因为同时从其他应用程序登录可能会导致冲突。 |
| **密码** | Linked-Go 云账户的密码。 |
| **刷新间隔** | 适配器轮询设备以获取新数据的频率，以秒为单位。最短为 60 秒。 |
| **API 级别** | 用于与设备通信的云 API 版本。请从 **API 3**（默认）开始。如果找不到您的设备或数据缺失，请尝试使用 API 2 或 API 1。 |
| **设备 MAC 地址** | 设备在 Linked-Go 应用中显示的 MAC 地址。仅当启用“使用设备 MAC 地址”时才需要。 |
| **使用设备 MAC 地址** | 如果启用此选项，适配器将跳过自动设备发现，直接使用上述 MAC 地址连接。如果无法通过常规设备列表找到设备，请使用此选项。注意：并非所有设备在此模式下都支持 `flowSwitch` 状态。 |
| **允许不安全的 TLS** | 禁用 TLS 证书验证。**仅用于故障排除，不建议在正常使用中启用。** |

TLS证书验证默认启用。只能通过上述“允许不安全的TLS”适配器设置禁用；启用后，适配器会在启动时记录一条警告信息。

### 支持的设备
经确认，以下设备可与此适配器配合使用。其他使用 Linked-Go 云 API 的 [迈达斯](https://www.midas-gmbh.de/) / Poolsana 设备也可能兼容，但无法保证。

如果您的设备未列出，但您已成功将其与此适配器一起使用，请随时提交问题或拉取请求以添加它。

**已确认可用：**

- Poolsana InverterPro 系列（17、21）带 Wifi 适配器，适用于 Midas 变频加热器
- Poolsana Prime 8
XPS-50，5kW，COP5.1，容积最大可达16m³

如有任何问题，请联系我们。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.3.3 (2026-07-25)

- FIX: #138 Correct power consumption calculation to handle decimal values
- FIX: #126 Repository checker and Claude Review for latest repro

### 1.3.2 (2026-07-05)

- FIX: Code style and linting issues

### 1.3.1 (2026-06-15)

- FIX: Object Structure Check

### 1.3.0 (2026-06-15)

- FIX: Compatibility with the updated Linked-Go cloud API (API level 3 with new endpoint paths and camelCase parameters)
- FIX: Device discovery now tries both deviceList payload formats (default and legacy) to ensure devices are found
  regardless of API behaviour
- FIX: Numerous control and polling issues (mode, silent mode, set temperature, fault detection)
- FIX: Product-specific protocol codes for Poolsana vs. other devices
- FIX: TLS certificate validation enabled by default; optional insecure mode via adapter config or environment variable
- FIX: Invalid or missing sensor values are no longer written as NaN
- FEAT: Add online state — boolean datapoint that indicates whether the device is currently reachable via the cloud API
- CHORE: Update dependencies

### 1.2.5 (2025-08-02)

- Add size attributes to jsonConfig
- Minimal admin version: 7.4.10
- Breaking change: minimal supported node.js version is 20.x

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 MiRo1310 <michael.roling@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.