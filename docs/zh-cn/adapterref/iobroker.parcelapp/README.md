---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.parcelapp/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.parcelapp@main/admin/parcelapp.svg" width="48" align="top" /> ioBroker.parcelapp
hash: CzzU2EVq7OkXREMnw8rabS8u8RiGKuEC+cHoym2mXxE=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.parcelapp@main/admin/parcelapp.svg" width="48" align="top" /> ioBroker.parcelapp

![npm 版本](https://img.shields.io/npm/v/iobroker.parcelapp)
![稳定的](https://iobroker.live/badges/parcelapp-stable.svg)
![安装](https://iobroker.live/badges/parcelapp-installed.svg)
![npm 下载](https://img.shields.io/npm/dt/iobroker.parcelapp)
![节点](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![哨兵](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

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

## 哨兵/错误报告
**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 仅当您在 ioBroker 诊断中启用错误报告功能（**系统设置 → 诊断和错误报告**）时，才会进行报告。仅传输匿名安装 ID，不包含姓名、电子邮件地址或 IP 地址。

有关详细信息以及如何禁用此功能，请参阅 [Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)。错误报告需要 js-controller 3.0 或更高版本。

---

＃＃ 要求
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker 管理员 >= 7.8.23**
- **parcel.app 高级订阅** — 需要此订阅才能访问 API

---

＃＃ 配置
| 选项 | 描述 | 默认值 |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| **API 密钥** | 您的 parcel.app API 密钥（可在 [web.parcelapp.net](https://web.parcelapp.net) 获取） | — |
| **轮询间隔** | 获取更新的频率（分钟）。parcel.app 从大约 45-90 分钟的服务器缓存中提供列表，因此较短的间隔通常可以减少刷新通知的延迟。 | 10 |
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
        ├── statusCode           — Status code (0-8, -1 = unknown)
        ├── description          — Package description
        ├── trackingNumber       — Tracking number
        ├── extraInfo            — Extra information (postal code, email)
        ├── deliveryWindow       — Expected delivery time window
        ├── deliveryEstimate     — Human-readable estimate (today, tomorrow)
        ├── lastEvent            — Latest tracking event
        ├── lastLocation         — Last known location
        └── lastUpdated          — Timestamp of the last tracking-data change
```

**状态码**（`statusCode` — 自动化的主要数据点）：

| 代码 | 含义 | 代码 | 含义 |
| ---- | --------------- | ---- | ----------------------- |
| 0 | 已送达 | 5 | 未找到 |
| 1 | 冷冻 | 6 | 配送尝试失败 |
| 2 | 在途 | 7 | 例外 |
| 3 | 等待取货 | 8 | 已收到信息 |
| 4 | 正在派送 | -1 | 未知（意外的 API 值 — 包裹保持可见） |

---

## 通过脚本添加配送
您可以通过 JavaScript/Blockly 脚本添加新的配送信息：

```javascript
sendTo("parcelapp.0", "addDelivery", {
  tracking_number: "1234567890",
  carrier_code: "dhl",
  description: "My package",
  // optional:
  language: "de", // tracking language as an ISO 639-1 code, default "en"
  send_push_confirmation: true, // send a push once the delivery is added, default false
});
```

`tracking_number`、`carrier_code` 和 `description` 为必填项；`language` 和 `send_push_confirmation` 为选填项。包裹将添加到您的 parcel.app 帐户，并立即发起投票（最多每分钟一次）——但新添加的包裹通常尚无跟踪数据（请参阅下方说明）。

**笔记：**

- **POST 速率限制：每天 20 次投递** — 失败的尝试（例如错误的 `carrier_code`）也计入此限制。
- **每个字段最多可包含 512 个字符**，适配器每分钟最多接受 **20 次 addDelivery 调用** — 超过这两个限制，调用将返回 `success: false` 并附带解释性的 `error_message`，而不是到达 parcel.app。
- 新发货的包裹通常在添加后 **45-90 分钟** 内不会有跟踪记录。这是 parcel.app 端的延迟，并非适配器问题。
- **只能在 parcel.app 应用/网页界面中删除包裹**——API 没有删除端点。即使启用了 `autoRemoveDelivered`，适配器仍然会自动从 ioBroker 状态中删除已交付的包裹。

---

## 故障排除
### 连接测试失败
- 请在 [web.parcelapp.net](https://web.parcelapp.net) 验证您的 API 密钥。
- 请确保您拥有有效的 Premium 会员资格
- 检查您的 ioBroker 实例是否可以访问互联网

### 未显示任何送货信息
- API 返回的是缓存数据——新的配送和最新的跟踪事件可能需要 **45-90 分钟** 才能显示（parcel.app 端缓存）
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
### 0.10.0 (2026-07-08)

- Fixed: the admin "Test Connection" button now reports real failures — before, it always showed "Ok" even with a wrong API key.
- Fixed: a package's last-updated timestamp no longer jumps to the restart time after an adapter restart — it only changes when tracking data actually changed.
- Fixed: a stalled API response can no longer freeze polling until a manual restart — every request now has a hard 60-second deadline.
- Fixed: a failed adapter start now triggers an automatic restart instead of leaving the adapter idle until restarted by hand.
- Changed: recurring errors such as a wrong API key are logged once instead of every poll cycle, and stopping the adapter no longer leaves a red error line in the log.
- Changed: short ioBroker database hiccups no longer flip the connection indicator — it now reflects only the parcel.app connection.
- Changed: the fallback package name ("Package …") is localized like all other texts, and the adapter is listed under a fitting admin category (misc-data).
- Changed: the automatic poll after adding a delivery now respects the one-minute pacing, so bulk-adds can no longer exhaust the hourly API budget.

### 0.9.0 (2026-06-23) — stable

- Fixed: tracked packages could disappear from the object tree after a temporary update error or an unexpected API response — a package is now kept until parcel.app actually stops returning it.
- Changed: multi-day delivery windows now show the date on each side (e.g. `12-06 14:30 - 12-08 18:30`) instead of looking same-day; out-of-range or reversed dates no longer produce a misleading window.

### 0.8.0 (2026-06-19)

- The delivery window is now also shown for carriers that report it only as a date/time range, not just when the API provides a Unix timestamp.
- When adding a delivery via script, you can now set an optional tracking language and request a push confirmation.

### 0.7.2 (2026-06-12) — stable

- Much quieter state updates: a package's last-updated timestamp now only changes when its tracking data actually changed, and device entries are no longer rewritten on every poll
- Adding a delivery with a malformed request now returns a clear error message instead of failing cryptically

### 0.7.1 (2026-06-09)

- Fixed a timezone edge case in delivery estimates: when the API reports only a calendar date, the estimate could be off by a day in time zones west of UTC — now stable everywhere.

[Older changelogs can be found there](CHANGELOG_OLD.md)

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

_Developed with assistance from Claude.ai_