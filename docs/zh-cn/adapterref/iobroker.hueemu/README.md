---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hueemu/README.md
title: ioBroker.hueemu
hash: Xd145W3bYz85XXnCJwE6JxjMJPFQcnQ+1E0ebaCnDRk=
---
# IoBroker.hueemu

![npm 版本](https://img.shields.io/npm/v/iobroker.hueemu)
![节点](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![npm 下载](https://img.shields.io/npm/dt/iobroker.hueemu)
![安装](https://iobroker.live/badges/hueemu-installed.svg)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

<img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hueemu@main/admin/hue-emu-logo.svg" width="100" />

模拟 [飞利浦 Hue](https://www.philips-hue.com) 桥接器（v2，BSB002），以便 ioBroker 设备对于仅支持 Hue API 的客户端来说，看起来像 Hue 灯。

---

## 何时使用此适配器
**如果您想通过仅支持 Hue API 的旧设备或应用程序来控制 ioBroker 状态，请使用此功能。** 例如：Logitech Harmony Hub、Bosch 智能家居控制器、旧版 Echo 固件、墙内触摸面板、已弃用的仪表盘应用程序、带有 Hue 插件的旧控制系统。

### 如果您使用的是 Alexa、Google Home 或 Apple Home，请改用 Matter 适配器
现代语音助手都直接支持 Matter。请使用 [ioBroker Matter 适配器](https://github.com/ioBroker/ioBroker.matter)——它是合适的工具。此适配器仅适用于没有 Matter 选项的客户端。

---

＃＃ 特征
- **Hue API v1** — 桥接器型号 BSB002（Hue Bridge v2）
- **UPnP/SSDP 发现** — 任何兼容 Hue 的客户端均可自动检测
- **直接状态映射** — 指向任何 ioBroker 状态，无需桥接脚本
- **灯光类型** — 开/关、可调光、色温、RGB
- **每个设备的值缩放** — 选择如何在源状态中存储亮度和饱和度
- **持久性 TLS 证书** — 客户端只需信任桥接一次，重启后仍保持相同的身份。
- **本地化状态名称** — 管理员标签遵循 ioBroker 系统语言
- **自动迁移** — 旧版 `createLight` 配置在首次启动时会转换为管理员配置

---

＃＃ 要求
- **Node.js >= 22**
- **ioBroker js-controller >= 7.0.7**
- **ioBroker 管理员 >= 7.8.23**

---

端口
| 端口 | 协议 | 用途 | 可配置 |
| ---- | --------- | ---------------------------- | ----------------------------------- |
| 8080 | TCP/HTTP | Hue Bridge API | 是 — 通过 SSDP 通知客户端 |
| 1900 | UDP | SSDP/UPnP 发现 | 否 — 由 UPnP 标准修复 |
| — | TCP/HTTPS | 可选 TLS（如果已配置） | 是 |

---

＃＃ 配置
### 网络设置
| 选项 | 描述 | 默认值 |
| --------------- | ------------------------------------------------------------- | ------- |
| **主机** | 网桥的 IP 地址（必须是真实的网络 IP 地址） | — |
| **HTTP 端口** | Hue API 端口 | 8080 |
| **HTTPS 端口** | 仅当客户端坚持使用 TLS 时才需要；否则留空 | — |
| **MAC 地址** | 桥接 MAC 地址（如果为空则自动生成） | — |

### 添加设备
1. 打开“设备配置”选项卡
2. 点击“+”按钮
3. 输入**名称**（例如“客厅灯”）
4. 选择**灯光类型**
5. 通过对象浏览器映射**状态**（`...`）

### 支持的灯光类型
| 类型 | 状态 | 色调模型 |
| --------------------- | ------------------------------------- | --------- |
| **开/关** | `on` | LWB007 |
| **色温** | `on`, `bri`, `ct` | LTW001 |
| **彩色灯光** | `on`, `bri`, `ct`, `hue`, `sat`, `xy` | LCT003 |
| **彩色灯光** | `on`、`bri`、`ct`、`hue`、`sat`、`xy` | LCT003 |

### 配对
任何客户端连接之前，必须先激活配对功能：

1. ioBroker 对象 → `hueemu.0` → 将 **`startPairing`** 设置为 `true`
2. 请在 **50 秒内**在客户端应用程序中启动设备搜索/配对。
3. 配对成功后，`hueemu.0.clients.*` 下会出现一个新条目。

### 连接 Alexa（旧款无 Matter 材质的 Echo）
> 如果您当前有 Echo，请改用 [物质适配器](https://github.com/ioBroker/ioBroker.matter)。

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
└── clients/             — Paired client devices
    └── {username}       — Client API key (created during pairing)
```

---

## 故障排除
### 从 0.x / 旧版 createLight 模式升级
如果您之前使用旧的 `createLight` JSON 状态定义灯具，您的设备将在首次启动时**自动迁移**。适配器会读取您现有的设备对象，将其转换为新的管理配置格式，然后重启一次。无需任何手动操作——您现有的脚本和自动化流程将继续正常运行。

**可选改进：**旧系统使用内部适配器状态作为中间状态，需要单独的脚本来控制实际设备。现在您可以打开适配器设置，并将状态映射更改为**直接**指向您的设备状态（例如，`hm-rpc.0.dimmer.LEVEL` 而不是 `hueemu.0.1.state.bri`）。

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
- 在管理后台为每个设备选择匹配的亮度/饱和度标度——自动、百分比 (0..100)、标准化 (0..1) 或原始色调 (1..254)。存储 0..100 值的 `level.dimmer` 必须设置为百分比。
- `ct` 的范围是 153–500（Mireds）

---

## 鸣谢
**原作者：** Christopher Holomek ([@holomekc](https://github.com/holomekc))

**现代化：** krobi

---

＃＃ 支持
- [ioBroker 论坛](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/krobipd/ioBroker.hueemu/issues)

### 支持开发
这个适配器是免费开源的。如果您觉得它有用，可以考虑请我喝杯咖啡：

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.5.1 (2026-05-23)

- Changelog rewritten in user-centric style across all versions.

### 1.5.0 (2026-05-22)

- User-modified state names are no longer overwritten on adapter restart

### 1.4.9 (2026-05-21)

- Improved error handling and stability.

### 1.4.8 (2026-05-20)

- Improved security: TLS private key is no longer visible in the admin interface.

### 1.4.7 (2026-05-19)

- TLS private key is now encrypted at rest in the ioBroker object database.

Older entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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