---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.maveo/README.md
title: ioBroker.maveo
hash: +GQ5WqtQ2YUxOnIFrRAURFLWvp9VbO/KPPHm/Qut4m0=
---
![标识](../../../en/adapterref/iobroker.maveo/admin/maveo.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.maveo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.maveo.svg)
![安装数量](https://iobroker.live/badges/maveo-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/maveo-stable.svg)
![NPM](https://nodei.co/npm/iobroker.maveo.png?downloads=true)

# IoBroker.maveo
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.maveo/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 maveo 适配器
适用于 Marantec maveo 车库门系统的适配器。两种操作模式：

- **云模式（默认）** — 通过 Marantec 云（Amazon Cognito）登录，

通过 Nymea 隧道 `wss://remoteproxy.nymea.io` 进行控制。

需要通过 maveo 应用**通过蓝牙配对**（应用会在配对过程中将 Cognito 身份 ID 写入设备）。

如果设备仅在本地添加，则云设备列表为空；在这种情况下，适配器会在日志中提示，您可以切换到 LAN 模式。

- **局域网模式** — 直接通过 JSON-RPC 连接到设备（`<boxIp>:2222`）。

默认使用 TLS 加密。首次启动时，将执行一键身份验证：请在 60 秒内按下 Maveo 设备背面的黄色按钮。生成的令牌将存储在适配器中。此方法独立于 Cognito 帐户，并且在设备可通过本地网络访问时是可靠的选择。

状态更新（位置、移动、传感器）在两种模式下均通过 `Integrations.StateChanged` 以推送通知的形式到达；打开/关闭通过 `Integrations.ExecuteAction` 发出。

＃＃ 配置
| 字段 | 含义 | 默认值 |
|---|---|---|
| `App Email` / `App Password` | maveo 应用的凭据（仅限云模式） | — |
| `IoT wake topic` | 用于唤醒设备的可选 AWS IoT 主题 | 为空 |
| `Maveo box IP` | 设置后启用 LAN 模式 | 空 |
| `Port` | JSON-RPC 端口 | 2222 |
| `TLS` | JSON-RPC 套接字的 SSL | 开启 |
| `TLS` | JSON-RPC 套接字的 SSL | 开启 |

Cognito 池/客户端 ID 和 IoT 端点是从 maveo 应用 2.6.1 硬编码而来，并且与区域相关。本地按钮令牌以加密形式存储在 `native.localToken` 中。

＃＃ 控制
对于每个事物，适配器都会在 `maveo.<inst>.<thingId>.remote.<action>` 下创建可写状态（例如 `open`、`close`）。

向此类状态写入任何值都会触发 `Integrations.ExecuteAction`。

状态变更会以推送更新的形式自动生效，并记录在 `maveo.<inst>.<thingId>.<stateTypeId>` 中。

＃＃ 讨论
https://forum.iobroker.net/topic/48101/test-adapter-maveo-v-0-0-x

## 哨兵
此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry 插件文档](https://github.com/ioBroker/plugin-sentry)。

## Changelog

### 0.1.0

* Two operating modes: cloud (Cognito + Nymea tunnel) and LAN (direct
  connection to the box with push-button auth). Region selectable (EU/US).
  Cognito pool/client IDs and cloud endpoints verified against the maveo app
  2.6.1 (Ghidra decompile). Thing/action discovery over Nymea, push-based
  state updates, working remote control, message buffering and exponential
  reconnect back-off.

### 0.0.5

* (TA2k) update login keys

### 0.0.4

* (TA2k) fix status

### 0.0.1

* (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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