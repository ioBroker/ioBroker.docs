---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hueemu/README.md
title: ioBroker.hueemu
hash: xRmGafv1z08eAddFLKqkMZ4Uo7UHJqH8fT/d0atoxvE=
---
# IoBroker.hueemu

![npm 版本](https://img.shields.io/npm/v/iobroker.hueemu)
![节点](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![npm 下载](https://img.shields.io/npm/dt/iobroker.hueemu)
![安装](https://iobroker.live/badges/hueemu-installed.svg)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

<img src="https://raw.githubusercontent.com/krobipd/ioBroker.hueemu/main/admin/hue-emu-logo.png" width="100" />

模拟 [飞利浦 Hue](https://www.philips-hue.com) 桥接器（v2，BSB002），以便可以通过 Alexa、Google Home 和其他 Hue 兼容的智能家居系统控制 ioBroker 设备。

---

＃＃ 特征
- **Hue Bridge 模拟** — 完全兼容 Hue API v1
- **UPnP/SSDP 发现** — 智能家居系统自动检测
- **现代化管理界面** — 使用 JSON 配置，轻松配置设备
- **灵活的设备类型** — 开关、可调光、色温、RGB灯

---

＃＃ 要求
- **Node.js 版本 >= 20**
- **ioBroker js-controller >= 7.0.0**
- **ioBroker 管理员 >= 7.6.20**

---

端口
| 端口 | 协议 | 用途 | 可配置 |
|------|----------|---------|--------------|
| 8080 | TCP/HTTP | Hue Bridge API | 是 — 通过 SSDP 通知客户端 |
| 1900 | UDP | SSDP/UPnP 发现 | 否 — 固定（所有 UPnP 客户端，包括 Harmony、Alexa、Google Home，都会扫描此端口） |
| — | TCP/HTTPS | 可选 TLS（如果已配置） | 是 |

---

＃＃ 配置
### 网络设置
| 选项 | 描述 | 默认值 |
|--------|-------------|---------|
| **主机** | 网桥的 IP 地址（必须是真实的网络 IP 地址） | — |
| **HTTP 端口** | Hue API 端口 | 8080 |
| **HTTPS 端口** | 可选 HTTPS 端口 | — |
| **MAC 地址** | 桥接 MAC 地址（如果为空则自动生成） | — |

### 添加设备
1. 打开“设备配置”选项卡
2. 点击“+”按钮
3. 输入**名称**（例如“客厅灯”）
4. 选择**灯光类型**
5. 通过对象浏览器映射**状态**（`...`）

### 支持的灯光类型
| 类型 | 状态 | 色调模型 |
|------|--------|-----------|
| **开/关** | `on` | LWB007 |
| **色温** | `on`, `bri`, `ct` | LTW001 |
| **彩色灯光** | `on`, `bri`, `ct`, `hue`, `sat`, `xy` | LCT003 |
| **彩色灯光** | `on`、`bri`、`ct`、`hue`、`sat`、`xy` | LCT003 |

### 配对
任何客户端（Alexa、Google Home、Harmony Hub 等）连接之前，必须先激活配对功能：

1. ioBroker 对象 → `hueemu.0` → 将 **`startPairing`** 设置为 `true`
2. 请在 **50 秒内**在客户端应用程序中启动设备搜索/配对。
3. 配对成功后，`hueemu.0.clients.*` 下会出现一个新条目。

### 连接 Alexa
> **提示：**如果 Alexa 找不到桥接器，请尝试在适配器设置中将 HTTP 端口更改为 **80** — 某些 Alexa 固件版本只能通过端口 80 发现桥接器。

1. 激活配对（见上文）
2. Alexa 应用 → 设备 → `+` → Philips Hue
3. 桥梁会自动被发现

### 连接 Logitech Harmony Hub
1. 激活配对（见上文）
2. 在 Harmony 设置软件中：添加设备 → 照明 → Philips Hue → 搜索桥接器
3. 请在 50 秒内确认配对

---

## 州树
```
hueemu.0.
├── startPairing         — Enable pairing mode for 50 seconds (button)
├── disableAuth          — Disable authentication (switch)
└── clients/             — Paired client devices (Alexa, Google Home, Harmony Hub, etc.)
    └── {username}       — Client API key (created during pairing)
```

---

## 故障排除
### 从 0.x / 旧版 createLight 模式升级
如果您之前使用旧的 `createLight` JSON 状态定义灯具，您的设备将在首次启动时**自动迁移**。适配器会读取您现有的设备对象，将其转换为新的管理配置格式，然后重启一次。无需任何手动操作——您现有的脚本和自动化流程将继续正常运行。

**可选改进：**旧系统使用内部适配器状态作为中间状态，需要单独的脚本来控制实际设备。现在，您可以打开适配器设置，更改状态映射，使其**直接**指向您的设备状态（例如，使用 `hm-rpc.0.dimmer.LEVEL` 而不是 `hueemu.0.1.state.bri`）。这样就完全不需要桥接脚本了。

### 未找到桥接器
- 确保 UPnP 端口 (1900) 未被防火墙阻止
- **主机** IP 必须是实际的网络 IP，而不是 `0.0.0.0`
- 检查 ioBroker 主机上的防火墙规则

客户端未找到任何设备/配对失败
- 在客户端启动设备搜索之前，请在 ioBroker 对象 → `hueemu.0` 中将 `startPairing` 设置为 `true` — 您有 50 秒的时间。
确保至少配置一台设备
- 检查适配器日志是否存在错误

### 状态更改不起作用
- 验证设备配置中的状态 ID
- 检查值范围：`bri` 0–100 或 0–1，`ct` 153–500（Mireds）

---

## 鸣谢
**原作者：** Christopher Holomek ([@holomekc](https://github.com/holomekc))

**现代化（2026）：**克罗比

---

＃＃ 支持
- [ioBroker 论坛](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/krobipd/ioBroker.hueemu/issues)

### 支持开发
这个适配器是免费开源的。如果您觉得它有用，可以考虑请我喝杯咖啡：

---

## Changelog

### 1.2.3 (2026-04-11)
- Extract shared `sanitizeId` utility module (DRY)
- Add Hue API value range constants for readability
- Add pairing timeout constant
- Improve callback error handling in UserService
- Replace `as any` with type-safe casts in DeviceBindingService
- Enforce `no-floating-promises` as error
- Split monolithic test file into focused modules (146 tests)
- Fix duplicate io-package.json news entry

### 1.2.2 (2026-04-11)
- Remove redundant `actions/checkout@v6` from CI workflow (ioBroker testing actions handle checkout internally)
- Fix `readme` URL in io-package.json (master → main)

### 1.2.1 (2026-04-08)
- Restore standard integration tests (create-adapter compatible)
- Add FORBIDDEN_CHARS sanitization for all external object IDs
- Remove CHANGELOG.md (changelog in README + CHANGELOG_OLD.md)
- Remove dead code, clean up empty JSDoc stubs

### 1.2.0 (2026-04-06)
- Rename `user` folder to `clients` — clearer naming for paired endpoints (Alexa, Harmony, etc.)
- Automatic migration of existing paired clients on startup

### 1.1.4 (2026-04-05)
- Clean up obsolete `info.connection` state, remove empty parent folders after state cleanup

### 1.1.3 (2026-04-05)
- Remove unused `info.connection` state (no external connection to track)

### 1.1.2 (2026-04-05)
- Compact startup log, move detail logs to debug level

Older entries have been moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

---

## License

MIT License

Copyright (c) 2020-2024 Christopher Holomek <holomekc.github@gmail.com>  
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