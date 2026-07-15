---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homewizard/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.homewizard@main/admin/homewizard.svg" width="48" align="top" /> ioBroker.homewizard
hash: Q2t+0YiBYUr835clE8viz19RW8bpanXF/ZD4mSYj9zo=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.homewizard@main/admin/homewizard.svg" width="48" align="top" /> ioBroker.homewizard

![npm 版本](https://img.shields.io/npm/v/iobroker.homewizard)
![稳定的](https://iobroker.live/badges/homewizard-stable.svg)
![安装](https://iobroker.live/badges/homewizard-installed.svg)
![npm 下载](https://img.shields.io/npm/dt/iobroker.homewizard)
![节点](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![哨兵](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

使用 API v2 对 [HomeWizard](https://www.homewizard.com) 能源设备进行实时能源监控。

---

＃＃ 特征
- **HomeWizard API v2** — HTTPS + WebSocket，持有者令牌认证
- **mDNS 配对** — `_homewizard._tcp` 发现，按下设备按钮进行配对
- **WebSocket推送** — 测量数据以约1/秒的速度到达，系统和电池变化实时推送；在WebSocket重新连接期间，REST轮询将接管推送。
- **插入式电池控制** — 充电/放电模式（包括基于预测的“预测性”充电和一次性充满电）以及通过配套的 P1/kWh 电表实现的并网权限。
- **自适应重连** — WiFi 信号弱的设备会切换到更快的重连间隔，并保持 REST 轮询运行，以确保数据传输不中断。
- **加密设备令牌** — 每个设备对象单独存储，配对或移除时无需重启适配器

---

## 哨兵/错误报告
**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 仅当您在 ioBroker 诊断中启用错误报告功能（**系统设置 → 诊断和错误报告**）时，才会进行报告。仅传输匿名安装 ID，不包含姓名、电子邮件地址或 IP 地址。

有关详细信息以及如何禁用此功能，请参阅 [Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)。错误报告需要 js-controller 3.0 或更高版本。

---

＃＃ 要求
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker 管理员 >= 7.8.23**
- **支持 API v2 的 HomeWizard 设备**（固件版本 4.x 及以上，并已启用本地 API）

---

支持的设备
| 设备 | 产品类型 |
| ----------------- | ------------------------------ |
| P1 仪表 | HWE-P1 |
| 单相千瓦时电表 | HWE-KWH1（也以 SDM230 型号销售） |
| 三相千瓦时电表 | HWE-KWH3（也以 SDM630 型号销售） |
| 插入式电池 | HWE-BAT |

插入式电池单独配对，并显示为一个独立的设备。要控制充电/放电模式和并网权限，您需要写入 P1 或 kWh 电表的 `battery.*` 数据点——HomeWizard 会在此处公开电池命令。`predictive` 模式和 `charge_to_full` 开关需要较新的设备固件（电池 API 2.3.0+）；旧版本固件会拒绝这些设置，并且这些值将不会生效。

---

＃＃ 配置
### 先决条件
您的 HomeWizard 设备上必须启用**本地 API**：

1. 在手机上打开**HomeWizard应用程序**
2. 进入**设置** > **计量器** > 选择您的设备 > **本地 API** > **启用**

### 添加设备（通过 mDNS 自动添加）
1. 在 ioBroker 管理后台中，转到“对象”选项卡。
2. 将 `homewizard.0.startPairing` 设置为 `true`
3. **在 60 秒内按下 HomeWizard 设备上的物理按钮**
4. 该设备会自动被发现并显示在 `homewizard.0` 下。

### 添加设备（手动输入 IP 地址）
如果 mDNS 不可用（例如，不同的 VLAN、Docker 或防火墙阻止了组播）：

1. 将 `homewizard.0.pairingIp` 设置为您设备的 IP 地址
2. 将 `homewizard.0.startPairing` 设置为 `true`
3. **在 60 秒内按下设备上的物理按钮**

### 管理设备
所有已配对的设备都列在“对象”选项卡下的“`homewizard.0`”中。每个设备都有自己的文件夹（例如“`hwe-p1_5c2fafaabbcc`”），其中包含测量数据、系统设置和设备信息。

- **移除设备：**将其 `remove` 数据点设置为 `true` — 该设备及其所有数据点将立即被删除。
- **IP地址变更：**自动检测——在3次重新连接失败后，mDNS会搜索新的IP地址。如果找不到，则设备将被标记为离线

---

## 州树
```
homewizard.0.
├── info.connection              — Overall connection status (bool)
├── startPairing                 — Activate pairing mode (button)
├── pairingIp                    — Device IP for manual pairing (string)
└── {productType}_{serial}/      — e.g. hwe-p1_5c2fafaabbcc
    ├── info/
    │   ├── productName          — Device name (string)
    │   ├── productType          — Product type (string)
    │   ├── firmware             — Firmware version (string)
    │   ├── connected            — WebSocket connection status (bool)
    │   ├── wifi_ssid            — WiFi network name / SSID (string)
    │   ├── wifi_rssi_db         — WiFi signal strength (number, dBm)
    │   └── uptime_s             — Device uptime (number, s)
    ├── measurement/             — Measurement data
    │   ├── power_w              — Total power (number, W)
    │   ├── power_l1_w .. l3_w   — Power per phase (number, W)
    │   ├── voltage_v            — Voltage single-phase (number, V)
    │   ├── voltage_l1_v .. l3_v — Voltage per phase (number, V)
    │   ├── current_a            — Current single-phase (number, A)
    │   ├── current_l1_a .. l3_a — Current per phase (number, A)
    │   ├── frequency_hz         — Grid frequency (number, Hz)
    │   ├── energy_import_kwh    — Total import (number, kWh)
    │   ├── energy_import_t1..t4_kwh — Import per tariff (number, kWh)
    │   ├── energy_export_kwh    — Total export (number, kWh)
    │   ├── energy_export_t1..t4_kwh — Export per tariff (number, kWh)
    │   ├── tariff               — Active tariff (number)
    │   ├── state_of_charge_pct  — Battery charge level (number, %)
    │   ├── cycles               — Battery charge cycles (number)
    │   ├── average_power_15m_w  — 15-min average power (number, W, Belgium)
    │   ├── monthly_power_peak_w — Monthly power peak (number, W, Belgium)
    │   ├── monthly_power_peak_timestamp — Monthly peak timestamp (string)
    │   ├── meter_model          — Meter model identifier (string)
    │   ├── timestamp            — Measurement timestamp (string)
    │   ├── quality/             — Power quality counters
    │   │   ├── voltage_sag_l1..l3_count
    │   │   ├── voltage_swell_l1..l3_count
    │   │   ├── power_fail_count
    │   │   └── long_power_fail_count
    │   └── external/            — External meters (gas, water, heat)
    │       └── {type}_{id}/
    │           ├── value        — Meter reading (number)
    │           ├── unit         — Unit (string)
    │           └── timestamp    — Last update (string)
    ├── battery/                 — Battery control (if batteries connected)
    │   ├── mode                 — zero / to_full / standby / predictive (string, R/W)
    │   ├── charge_to_full       — One-shot charge to 100% (bool, R/W)
    │   ├── permissions          — JSON array (string, R/W)
    │   ├── battery_count        — Connected batteries (number)
    │   ├── power_w              — Battery power (number, W)
    │   ├── target_power_w       — Target power (number, W)
    │   ├── max_consumption_w    — Max consumption (number, W)
    │   └── max_production_w     — Max production (number, W)
    ├── remove                   — Remove device (button)
    └── system/                  — System settings
        ├── cloud_enabled        — Cloud communication (bool; R/W on meters, read-only on the Plug-In Battery)
        ├── status_led_brightness_pct — LED brightness 0-100 (number, R/W)
        ├── api_v1_enabled       — Toggle the device's deprecated v1 API (bool, R/W — leave off)
        ├── reboot               — Reboot device (button)
        └── identify             — Blink LED (button)
```

设备状态会根据设备报告的数据动态生成。并非所有设备都具备所有状态。此外，千瓦时电表还会提供视在电流/无功电流、视在功率/无功功率以及功率因数状态。

---

## 故障排除
### 配对过程中未找到设备
- 请确保设备与 ioBroker 服务器位于同一网络/VLAN 中
- 请确认 HomeWizard 应用中已启用**本地 API**（设置 > 计量器 > 您的设备 > 本地 API）
检查您的路由器/防火墙是否阻止了多播/mDNS流量。

WebSocket 连接持续断开
- 检查 `info.wifi_rssi_db` — 高于 -75 dBm 表示正常，低于 -85 dBm 则会导致频繁掉线。
- 对于 WiFi 信号较弱的设备，适配器会切换到更快的重连间隔（60 秒而非 5 分钟），并在后台持续进行 REST 轮询，以避免数据丢失。
WebSocket 层的 ping/pong 心跳机制（ping 约 30 秒，pong 窗口约 10 秒）可以检测到 TCP 流已缓冲但设备已停止响应的半失效连接。此类连接会被自动断开并重新连接——这样就不会再出现“已连接”状态一直显示为过期，而测量值却停止更新的情况。
IP地址变更通过mDNS自动检测，无需手动重新配置。

### 恢复出厂设置后令牌无效
- 将设备的“移除”数据点设置为“true”，然后再次配对

---

## 支持发展
这个适配器是免费开源的。如果您觉得它有用，可以考虑请我喝杯咖啡：

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.14.0 (2026-07-07)

- A brief WiFi dropout no longer makes the adapter wrongly treat a device as having a permanently unstable connection after a single outage
- Power-quality values (voltage sag/swell and power-fail counts) now sit in a named "quality" sub-folder under measurement instead of loose
- The Plug-In Battery's cloud-connection state is now a read-only indicator instead of a switch that could never be toggled
- Corrected state roles (grid frequency, reactive power) and 0–100 bounds (LED brightness, charge level); existing devices pick these up automatically on the next start and keep any names you changed
- Security: after an update, an older device is verified by its serial from the very first connection — its access token no longer briefly crosses a not-fully-verified connection
- Security: device and network-discovery names are cleaned before they reach the log, and pairing now cross-checks the device's serial against its certificate

### 0.13.0 (2026-06-24)

- Security: the adapter now checks each device's certificate, so it only ever talks to your real device
- Pairing a device by manual IP no longer leaves repeated pairing attempts and throwaway tokens behind on the device
- The manual pairing IP field now rejects addresses that are not on your home network
- Fixed a rare crash while a device was connecting or disconnecting
- Meter identifier and protocol version are now available as states

### 0.12.2 (2026-06-11) — stable

- Reboot and identify buttons reset themselves after the action, so they stay clickable in the admin UI
- Re-pairing a removed device no longer inherits the old device's log cooldown — its first connection warning shows up immediately again

### 0.12.1 (2026-06-09)

- Internal refactoring. No user-facing changes.

### 0.12.0 (2026-06-07)

- Added optional Sentry error reporting: crashes are sent to the developer so issues get fixed faster. Active only with ioBroker diagnostics enabled; anonymous.

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