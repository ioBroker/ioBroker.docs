---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.parcelapp/README.md
title: ioBroker.parcelapp
hash: HMJiV39ELYn9BaDqr4iqCvqkfdmvJWle3gxBYIeasv0=
---
# IoBroker.parcelapp

![npm 版本](https://img.shields.io/npm/v/iobroker.parcelapp)
![节点](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![npm 下载](https://img.shields.io/npm/dt/iobroker.parcelapp)
![安装](https://iobroker.live/badges/parcelapp-installed.svg)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

<img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.parcelapp@main/admin/parcelapp.svg" width="100" />

适用于 [包裹应用](https://parcelapp.net) API 的 ioBroker 适配器。支持 parcel.app 跟踪的所有承运商。

---

＃＃ 特征
- **所有 parcel.app 支持的承运商** — DHL、FedEx、UPS、Amazon、Hermes、GLS、DPD 以及 parcel.app 支持的其他所有承运商
- **每个包裹的 ioBroker 状态** — 承运商、状态、追踪号码、预计送达时间、上次事件、上次位置
- **汇总信息** — 活跃用户数、今日用户数、合并配送窗口
- **预计送达时间** — 今天、明天、X 天后（包含多个预计送达时间窗口）
- **可配置轮询间隔**（5-60 分钟）
- **可配置的清理功能** — 自动移除已送达的包裹，或保留包裹直至在 parcel.app 中删除。
- **通过脚本或其他适配器，以 sendTo 消息的形式添加投递信息**
- **管理员用户界面**，包含连接测试和轮询设置

---

＃＃ 要求
- **Node.js >= 22**
- **ioBroker js-controller >= 7.0.7**
- **ioBroker 管理员 >= 7.8.23**
- **parcel.app 高级订阅** — 需要此订阅才能访问 API

---

＃＃ 配置
| 选项 | 描述 | 默认值 |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| **API 密钥** | 您的 parcel.app API 密钥（可在 [web.parcelapp.net](https://web.parcelapp.net) 获取） | — |
| **轮询间隔** | 获取更新的频率（分钟） | 10 |
| **自动移除已送达包裹** | 自动从状态中移除已送达包裹。禁用此功能后，包裹将保留在 parcel.app 中，直到被用户删除。 | 是 |

状态标签（`Delivered`、`In Transit`、…）和交货预估（`today`、`tomorrow`、`in X days`）以 ioBroker 系统语言呈现。

---

## 州树
```
parcelapp.0.
├── info.connection              — Connection status (bool)
├── summary.
│   ├── activeCount              — Number of active deliveries
│   ├── todayCount               — Number of deliveries expected today
│   └── deliveryWindow           — Combined delivery window for today
└── deliveries.
    └── {packageId}.             — One device per package
        ├── carrier              — Carrier name (e.g. DHL Express)
        ├── status               — Status text (e.g. In Transit)
        ├── statusCode           — Status code (0-8)
        ├── description          — Package description
        ├── trackingNumber       — Tracking number
        ├── extraInfo            — Extra information (postal code, email)
        ├── deliveryWindow       — Expected delivery time window
        ├── deliveryEstimate     — Human-readable estimate (today, tomorrow)
        ├── lastEvent            — Latest tracking event
        ├── lastLocation         — Last known location
        └── lastUpdated          — Last update timestamp
```

---

## 通过脚本添加配送
您可以通过 JavaScript/Blockly 脚本添加新的配送信息：

```javascript
sendTo("parcelapp.0", "addDelivery", {
  tracking_number: "1234567890",
  carrier_code: "dhl",
  description: "My package",
});
```

包裹递送信息已添加到您的 parcel.app 帐户，并在自动轮询后立即显示在 ioBroker 中。

**笔记：**

- **POST 速率限制：每天 20 次投递** — 失败的尝试（例如错误的 `carrier_code`）也计入此限制。
- 新发货的包裹通常在添加后 **45-90 分钟** 内不会有跟踪记录。这是 parcel.app 端的延迟，并非适配器问题。
- **只能在 parcel.app 应用/网页界面中删除包裹**——API 没有删除端点。即使启用了 `autoRemoveDelivered`，适配器仍然会自动从 ioBroker 状态中删除已交付的包裹。

---

## 故障排除
### 连接测试失败
- 请在 [web.parcelapp.net](https://web.parcelapp.net) 验证您的 API 密钥。
- 请确保您拥有有效的 Premium 会员资格
- 检查您的 ioBroker 实例是否可以访问互联网

### 未显示任何送货信息
API 返回的是缓存数据——新配送信息可能需要几分钟才会显示。
- 查看 parcel.app 中是否有待处理的包裹。

### 速率限制
- GET（轮询）：**每小时 20 次请求** — 为遵守此限制，最小轮询间隔为 5 分钟。
- POST（添加配送）：**每天最多 20 个请求**，失败的尝试也算在内。

---

＃＃ 支持
- [ioBroker 论坛](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/krobipd/ioBroker.parcelapp/issues)

### 支持开发
这个适配器是免费开源的。如果您觉得它有用，可以考虑请我喝杯咖啡：

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.4 (2026-05-13)
- Adapter shuts down cleanly even if the "Test Connection" button was still running — the test request is now aborted at unload along with regular polling.

### 0.4.3 (2026-05-13)
- Debug log now traces previously silent paths: HTTPS request lifecycle, carrier-list fetch outcome, per-delivery updates, admin-message handling and lifecycle anchors. Default log unchanged.

### 0.4.2 (2026-05-10)

- Adapter shuts down cleanly even if parcel.app is slow — pending requests are aborted instead of hanging until kill.
- "Forbidden" responses (e.g. when the Premium subscription is no longer active) now log a clear hint pointing to your parcel.app account, instead of looping reauth as if the API key were just wrong.
- Two parcels whose tracking numbers differ only in special characters no longer overwrite each other in the state tree — the second one gets a hash suffix.
- Defensive: bogus poll-interval values can no longer turn into a tight loop hammering the API; rate-limit cooldowns can no longer get stuck near zero.

### 0.4.1 (2026-05-09)

- Adapter log messages are now English only, in line with the ioBroker community standard. Localized state names (11 languages) are unchanged.

### 0.4.0 (2026-05-06)

- State names now follow your ioBroker system language (11 languages).
- Minimum requirements: Node.js 22 and ioBroker Admin 7.8.23.

Older entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

*Developed with assistance from Claude.ai*