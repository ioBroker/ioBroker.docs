---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hueemu/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hueemu@main/admin/hue-emu-logo.svg" width="48" align="top" /> ioBroker.hueemu
hash: PNYFNKNFdn+kQybZ0zLalPuIAizKMhqWXSWjxVNtmT8=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hueemu@main/admin/hue-emu-logo.svg" width="48" align="top" /> ioBroker.hueemu

![npm 版本](https://img.shields.io/npm/v/iobroker.hueemu)
![稳定的](https://iobroker.live/badges/hueemu-stable.svg)
![安装](https://iobroker.live/badges/hueemu-installed.svg)
![npm 下载](https://img.shields.io/npm/dt/iobroker.hueemu)
![节点](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![哨兵](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

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
- **设备助手** — 扫描 ioBroker 中可映射的灯具并自动添加，或手动添加和编辑每个灯具。
- **灯光类型** — 开/关、可调光、色温、RGB
- **每个设备的值缩放** — 选择如何在源状态中存储亮度和饱和度
- **持久性 TLS 证书** — 客户端只需信任桥接一次，重启后仍保持相同的身份。
- **本地化状态名称** — 管理员标签遵循 ioBroker 系统语言
- **自动迁移** — 旧版 `createLight` 配置在首次启动时会转换为管理员配置

---

## 哨兵/错误报告
**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 仅当您在 ioBroker 诊断中启用错误报告功能（**系统设置 → 诊断和错误报告**）时，才会进行报告。仅传输匿名安装 ID，不包含姓名、电子邮件地址或 IP 地址。

有关详细信息以及如何禁用此功能，请参阅 [Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)。错误报告需要 js-controller 3.0 或更高版本。

---

＃＃ 要求
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
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
| ----------------- | -------------------------------------------------------------------------------------------------------------- | ------- |
| **主机** | 要绑定的网络接口。选择 `0.0.0.0` 可监听所有接口（即使 IP 地址更改，仍保持可达性） | 0.0.0.0 |
| **通告 IP 地址** | 向客户端通告以供发现的可达 IP 地址。留空则自动检测主接口 | 自动 |
| **HTTP 端口** | Hue API 端口 | 8080 |
| **HTTPS 端口** | 仅当客户端坚持使用 TLS 时才需要；否则留空 | — |
| **MAC 地址** | 桥接 MAC 地址（如果为空则自动生成） | — |

### 添加设备
打开“设备配置”选项卡。有两种方法可以添加灯具：

**手动** — 点击 **添加灯光**，输入名称，选择灯光类型，并将 ioBroker 状态映射到对象浏览器。

**自动** — 点击**搜索灯光**。适配器会扫描您的物体，查找类似灯光的物体（开关、调光器、色温和彩色灯光），并添加可以映射的灯光。对于检测到但无法映射的物体（例如 RGB 通道设备），适配器会进行报告，以便您手动添加。

每个灯都显示为一张卡片——使用**编辑**更改其映射，或使用**删除**将其移除。

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
### 1.11.0 (2026-07-09)

- The devices tab can now scan ioBroker for dimmer, colour-temperature and colour lights and add the mappable ones. Manual add still works.

### 1.10.0 (2026-07-09)

- Fixed the adapter looking like it was running but ignoring all light changes when UDP port 1900 was already in use (common on Windows); it now recovers cleanly and stays reachable
- A light's on/off source state holding text such as "off", "no" or "disabled" is now correctly read as off instead of on
- Closed a brief moment during startup where requests could still be challenged for a password even though authentication was turned off in the configuration
- Upgrading from the old light setup no longer leaves stray leftover entries behind in the object tree
- Colour coordinates written as a spaced list such as "0.3, 0.4" are now parsed correctly instead of falling back to white
- The port fields in the settings now warn you if the chosen port is already in use by another adapter instance
- Hue and colour-temperature source states can now be given a scale: hue in degrees (0–360) and colour temperature in Kelvin are converted correctly, alongside the native Hue units

### 1.9.0 (2026-06-21) — stable

- You can now listen on all network interfaces (`0.0.0.0`) and set a separate advertised IP, so discovery keeps working even if the bridge's IP address changes
- Color lights mapped with only hue or only saturation now report the correct colour instead of falling back to a default white
- Fixed already-paired clients being wrongly rejected until a restart after a transient error while loading clients at startup
- A configured source state that no longer exists now produces a one-time warning in the log instead of a silently dead light

### 1.8.1 (2026-06-12) — stable

- Number values read from light states are now parsed strictly: text with extra characters after the number falls back to the default instead of being half-parsed
- Faster bridge config responses for clients that poll every second (such as Echo devices) by reusing the timestamp formatter instead of rebuilding it on every request

### 1.8.0 (2026-06-09)

- Color lights mapped via hue and saturation (without an XY state) now report the correct color mode, so apps that honor it show the actual color instead of a default white.

[Older changelogs can be found there](CHANGELOG_OLD.md)

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

_Developed with assistance from Claude.ai_