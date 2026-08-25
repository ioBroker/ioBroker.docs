---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nut2/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.nut2@main/admin/nut2.svg" width="48" align="top" /> ioBroker.nut2
hash: xYY+80IZaKrJlUbDx3jQP3LX+iqzct2eiJz9d07DMeI=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.nut2@main/admin/nut2.svg" width="48" align="top" /> ioBroker.nut2

![npm 版本](https://img.shields.io/npm/v/iobroker.nut2)
![稳定的](https://iobroker.live/badges/nut2-stable.svg)
![安装](https://iobroker.live/badges/nut2-installed.svg)
![npm 下载](https://img.shields.io/npm/dt/iobroker.nut2)
![节点](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

通过 [网络 UPS 工具 (NUT)](https://networkupstools.org/) 监控不间断电源。所有连接到 NUT 服务器的 UPS 设备都会被自动发现和轮询。

---

＃＃ 特征
- 通过 `LIST UPS` 命令自动发现 NUT 服务器上的所有 UPS 设备
- 根据 `LIST VAR` 动态创建状态——无论您的 UPS 报告显示为 ioBroker 状态。
- 正确的数据类型：数值以数字形式（而非字符串），并带有单位（V、Hz、A、Ah、%、W、VA、s、°C）
- 将 `ups.status` 标志解析为单独的布尔值（在线、电池供电、低电池、充电等）以及计算出的严重程度（0-4）
- 通过按钮状态发送即时命令 (INSTCMD) — 蜂鸣器控制、负载管理、自检
- 可写变量（SET VAR）— 直接从 ioBroker 更改 UPS 设置
- 持久 TCP 连接，具有自动重连和指数退避功能
- 多宿主服务器的网络接口选择器
- 管理界面中的连接测试按钮

---

＃＃ 要求
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker 管理员 >= 7.8.23**
- 一台正在运行的 [NUT 服务器](https://networkupstools.org/) (upsd)，且至少配置了一个 UPS。

---

＃＃ 配置
＃＃＃ 联系
| 选项 | 描述 | 默认值 |
| --------------------- | ---------------------------------------------------------------------- | ------- |
| **NUT 服务器主机** | NUT 服务器的主机名或 IP 地址 | — |
| **端口** | NUT 服务器端口 | `3493` |
| **轮询间隔（秒）** | 查询 NUT 服务器的频率（2–300） | `15` |
| **轮询间隔（秒）** | 查询 NUT 服务器的频率（2–300） | `15` |
| **用户名** | NUT 用户名（可选 — 命令和可写变量需要） | — |
| **密码** | NUT 密码 | — |
| **使用 TLS (STARTTLS)** | 通过 STARTTLS 加密连接 | 关闭 |
| **需要有效证书** | 拒绝自签名/无效证书（仅在启用 TLS 时显示） | 关闭 |

使用**测试连接**按钮验证服务器是否可达，并查看已发现的 UPS 设备。

**关于 TLS：**启用 STARTTLS 会加密连接，这样您的 NUT 用户名和密码就不会再以明文形式在网络上传输。默认设置下，它可以防止被动窃听，但**无法**防止主动中间人攻击，因为大多数 NUT 服务器使用无法验证的自签名证书。为了获得全面保护，请配置一个客户端可以在 NUT 服务器上验证的证书，并启用“要求有效证书”选项。NUT 服务器必须构建时就支持 TLS（`upsd` 以及 `CERTFILE`/`CERTPATH`）；否则，连接测试会报告 TLS 错误。

＃＃＃ 先进的
| 选项 | 描述 | 默认值 |
| ----------------------- | --------------------------------------------------- | ------- |
| **命令超时（秒）** | 单个 NUT 协议命令的超时时间（1–30） | `5` |
| **启用命令** | 允许向 UPS 发送即时命令 (INSTCMD) | 关闭 |
| **启用设置变量** | 允许更改可写的 UPS 变量 | 关闭 |

这两个命令功能都需要在 NUT 服务器上配置具有相应权限的 NUT 用户。

---

## 州树
各州按 NUT 域划分。具体州名取决于您的 UPS 司机的报告。

```
nut2.0.
├── info.connection                    — Connection to NUT server (bool)
└── {ups_name}/                        — Device (e.g. "ups0")
    ├── info/
    │   └── reachable                  — UPS responds / data is fresh (bool)
    ├── battery/
    │   ├── battery.charge             — Battery level (%, number)
    │   ├── battery.charge-low         — Low battery threshold (%)
    │   ├── battery.runtime            — Remaining runtime (s)
    │   ├── battery.type               — Battery chemistry (string)
    │   └── ...
    ├── device/
    │   ├── device.mfr                 — Manufacturer (string)
    │   ├── device.model               — Model name (string)
    │   ├── device.serial              — Serial number (string)
    │   └── ...
    ├── driver/
    │   ├── driver.name                — NUT driver name
    │   ├── driver.version             — Driver version
    │   └── ...
    ├── input/
    │   ├── input.voltage              — Input voltage (V, number)
    │   ├── input.frequency            — Input frequency (Hz, number)
    │   └── ...
    ├── output/
    │   ├── output.voltage             — Output voltage (V, number)
    │   ├── output.frequency           — Output frequency (Hz, number)
    │   └── ...
    ├── ups/
    │   ├── ups.load                   — UPS load (%, number)
    │   ├── ups.power                  — Apparent power (VA, number)
    │   ├── ups.realpower              — Real power (W, number)
    │   ├── ups.status                 — Raw status string (e.g. "OL CHRG")
    │   └── ...
    ├── status/                        — Parsed status flags
    │   ├── raw                        — Original status string
    │   ├── display                    — Human-readable status (e.g. "Online, Charging")
    │   ├── severity                   — 0=OK, 1=Info, 2=Warning, 3=Critical, 4=Emergency
    │   ├── online                     — On line power (bool)
    │   ├── onBattery                  — Running on battery (bool)
    │   ├── lowBattery                 — Battery is low (bool)
    │   ├── charging                   — Battery is charging (bool)
    │   ├── discharging                — Battery is discharging (bool)
    │   ├── replaceBattery             — Battery needs replacement (bool)
    │   ├── overloaded                 — UPS is overloaded (bool)
    │   ├── forcedShutdown             — Forced shutdown in progress (bool)
    │   ├── alarm                      — Alarm active (bool)
    │   ├── ecoMode                    — ECO / high efficiency mode (bool)
    │   ├── testing                    — Self-test in progress (bool)
    │   ├── overheat                   — UPS overheated (bool)
    │   └── ...                        — (19 flags total)
    └── commands/                      — Instant commands (if enabled)
        ├── beeper-enable              — Button: enable beeper
        ├── beeper-disable             — Button: disable beeper
        ├── test-battery-start         — Button: start battery test
        └── ...                        — (from LIST CMD)
```

> **状态 ID：** NUT 变量名称中的第一个点是通道分隔符；任何后续的点都会变成短横线。因此，`battery.charge.low` 存储为 `battery.charge-low`，而即时命令 `test.battery.start` 则存储为 `commands.test-battery-start`。

### 状态严重程度级别
| 级别 | 含义 | 典型标志 |
| ----- | --------- | --------------------------- |
| 0 |好的 | OL、OL CHRG、OL HB |
| 1 | 信息 | 微调、增压、校准 |
| 2 | 警告 | OB（无LB），RB，旁路 |
| 3 | 关键 | OB + LB |
| 4 | 紧急情况 | FSD |

---

## 故障排除
连接失败
- 验证 ioBroker 主机是否可以访问 NUT 服务器：`nc -zv <host> 3493`
- 检查 TCP 端口 3493 的防火墙规则
- 使用管理界面中的“测试连接”按钮。

### 命令无法正常工作
- 确保在“高级”选项卡中选中“启用命令”复选框
- 必须配置具有 `instcmds` 权限的 NUT 用户名和密码
- 检查 NUT 服务器的 `upsd.users` 配置

### 可写变量不起作用
- 确保在“高级”选项卡中选中“启用 SET VAR”复选框
- NUT 用户需要在 NUT 服务器上拥有 `actions = SET` 权限

### 未更新的州
- 检查 `info.connection`——如果为 `false`，则表示 TCP 连接已断开。
- 检查 ioBroker 日志中是否存在 NUT 错误代码（例如，`DATA-STALE` 表示 UPS 驱动程序失去连接）
- 确认轮询间隔是否适合您的设置

---

## 鸣谢
ioBroker 对 NUT 的支持可以追溯到 [阿波罗77](https://github.com/Apollon77)——他的 `iobroker.nut` 适配器在 2016 年将 Network UPS Tools 协议引入该平台，并一直服务到 2025 年。此适配器是独立重写的，与它没有任何代码共享。

---

＃＃ 支持
- [ioBroker 论坛](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/krobipd/ioBroker.nut2/issues)

### 支持开发
这个适配器是免费开源的。如果您觉得它有用，可以考虑请我喝杯咖啡：

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.7.0 (2026-08-12)

- Improved: more UPS values now carry their dedicated ioBroker role — mains frequency, status severity and humidity — so charts, visualisations and automatic device detection recognise them correctly.
- Fixed: a driver flag reporting an unusual value is now kept as a text state instead of being misread as a number, so its type no longer changes between updates.

### 0.6.0 (2026-08-11)

- UPS readings now carry their correct data type instead of plain text, so numeric values, yes/no fields and status values can be charted, compared and used directly in scripts.
- Security fix: the NUT username and password no longer appear in the ioBroker log, where they could previously show up in plain text while commands were exchanged.
- A UPS whose name contains a space, dot or other special character now appears correctly in the object tree instead of a broken or missing device entry.

### 0.5.3 (2026-07-26)

- The version history shown in the adapter manager now lists only versions that actually exist for this adapter.

### 0.5.2 (2026-07-26)

- The poll interval can now go down to 2 seconds — below that the NUT driver itself has no new readings to give.

### 0.5.1 (2026-07-13)

- Writable yes/no UPS settings (e.g. automatic restart after power returns) can now actually be changed from ioBroker — previously toggling them was silently rejected by the NUT server.

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

_Developed with assistance from Claude.ai_