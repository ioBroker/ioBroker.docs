---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hassemu/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hassemu@main/admin/hassemu.svg" width="48" align="top" /> ioBroker.hassemu
hash: /lJG327SVBLROodZOHrPZr6Y++7D0fw3o4O92npA/kU=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hassemu@main/admin/hassemu.svg" width="48" align="top" /> ioBroker.hassemu

![npm 版本](https://img.shields.io/npm/v/iobroker.hassemu)
![稳定的](https://iobroker.live/badges/hassemu-stable.svg)
![安装](https://iobroker.live/badges/hassemu-installed.svg)
![npm 下载](https://img.shields.io/npm/dt/iobroker.hassemu)
![节点](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![哨兵](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

模拟 Home Assistant 服务器，使仅接受 HA 仪表板的显示器显示任何 Web URL。

---

它的用途
显示屏完成 HA 入驻流程后，会显示您指向的任何 Web URL——VIS、VIS-2、Aura、Grafana、Node-RED 以及任何 HTTP 服务。

典型客户端：Shelly Wall Display 系列（内置 HA 页面；固件版本 2.6.0 及以上可通过设备端 HA 应用访问）、Home Assistant Companion App（Android 墙面板、侧载应用）。任何使用相同 HA 引导流程的设备都应该可以正常工作——如果您的设备无法正常工作，请提交问题报告并附上故障端点跟踪信息。

---

＃＃ 特征
每个显示器使用一个 URL，或者使用一个全局 URL 用于所有显示器。
- 通过 mDNS 自动发现，并自动检测主机上安装的每个 VIS / VIS-2 / Aura 实例（请参阅下面的 [支持的仪表板](#supported-dashboards)）
- 并行运行两个 HA 登录流程——一个是适用于旧版客户端的经典 JSON `login_flow`，另一个是 Shelly Wall Display 2.6.0+ 设备上的 HA 应用使用的浏览器 OAuth2 登录流程。
- 模拟移动应用注册，以便 HA Companion App 完成注册流程
- 基于 Cookie：显示器在重启、IP 地址更改或重命名后仍保持其 URL。

---

## 哨兵/错误报告
**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 仅当您在 ioBroker 诊断中启用错误报告功能（**系统设置 → 诊断和错误报告**）时，才会进行报告。仅传输匿名安装 ID，不包含姓名、电子邮件地址或 IP 地址。

有关详细信息以及如何禁用此功能，请参阅 [Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)。错误报告需要 js-controller 3.0 或更高版本。

---

## 支持的仪表盘
模式下拉菜单会自动检测您的 ioBroker 主机上已安装的内容。您始终可以选择粘贴任何其他 HTTP URL 作为 `manual`。

| 来源 | 发现的内容 | 注释 |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ioBroker VIS** (`vis.0`+) | 每个项目一个条目，每个项目内的每个视图一个条目 | 适用于所有 `web.*` 实例 — 多个 Web 实例的标签会带有 `(web.X)` 后缀 |
| **ioBroker Aura** (`aura.0`+) | 每个正在运行的 Aura 实例对应一个条目，指向其前端 | 读取 Aura 中配置的实际 `native.port`（默认 8095，忽略 Aura `localLinks` 模板中的硬编码值）— 可与 `https` 和 `customUrl` 覆盖一起使用 |
| **管理磁贴** | 适配器通过 `common.localLinks` / `common.welcomeScreen` 通告的所有内容（jarvis、material、grafana、自定义 UI 等） | 解析 `%ip%`、`%port%`、`%protocol%`、`%bind%` 以及跨实例引用，例如 `%web.0_port%` |
| **手动 URL** | 您选择的自由文本 URL — Grafana、Node-RED、自定义 HTML、任何 HTTP/HTTPS 内容 | 将显示的 `mode` 设置为 `manual`，并将 URL 设置为 `manualUrl`。出于安全考虑，`javascript:`、`data:` 和 `file:` 将被禁用。 |
| **手动 URL** | 您可以选择一个自由文本 URL，例如 Grafana、Node-RED、自定义 HTML 或任何 HTTP/HTTPS 内容 | 将显示的 `mode` 设置为 `manual`，并将 URL 设置为 `manualUrl`。出于安全考虑，`javascript:`、`data:` 和 `file:` 将被禁用。 |

想要添加适配器无法自动检测到的 URL？设置 `manual` 并粘贴即可。

---

＃＃ 要求
- Node.js ≥ 22
- ioBroker js-controller ≥ 7.2.2
- ioBroker 管理员 ≥ 7.8.23

---

端口
| 端口 | 用途 |
| ---------- | ----------------------------------- |
| 8123 / TCP | 高可用性仿真（固定，高可用性标准） |
| 5353 / UDP | mDNS 广播（仅当 mDNS 启用时） |

每个主机运行一个实例。端口 8123 已实现高可用性。如果同一局域网内有多个 ioBroker 主机，则只有其中一台运行 hassemu。

所有流量均为纯 HTTP 协议——HA 客户端不支持此流上的 HTTPS。请将端口 8123 视为仅限局域网使用，切勿将其转发到互联网。启用身份验证后，用户名、密码和令牌将以未加密的方式在您的局域网内传输，因此身份验证功能可以保护 HA API 免受其他局域网设备的访问——它并非互联网暴露保护。

---

## 第一步
1. 在 ioBroker 中启动 hassemu 实例。
2. 在显示屏上，添加 Home Assistant 服务器。如果启用了 mDNS，它会自动显示；否则，请手动输入 `http://<ioBroker-IP>:8123`。
3. 在显示屏上完成高可用性 (HA) 部署。如果身份验证关闭，您可以点击登录；如果身份验证开启，请从实例设置中输入用户名和密码。
4. 显示屏现在显示带有其自身设备 ID 的**登录页面**——这意味着它已连接并正在等待 URL。
5. 在 ioBroker 中，打开对象浏览器，并为该设备设置 `hassemu.0.clients.<id>.mode`：从下拉列表中选择一个已发现的 URL，或者选择 `manual` 并将任何 URL 放入 `clients.<id>.manualUrl` 中。
6. 显示屏会在大约 30 秒内重新加载并显示您的网址。

想要在每个显示器上使用相同的 URL？设置 `global.mode`（加上 `global.manualUrl` 可获得一个免费 URL），然后打开 `global.enabled` 主开关，而不是配置每个客户端。

---

＃＃ 配置
| 选项 | 内容 | 默认值 |
| ------------------- | --------------------------------------------------------------------------------- | --------- |
| 绑定 | 网络接口 | 0.0.0.0 |
| 服务名称 | 显示屏看到的名称 | ioBroker |
| mDNS | LAN 自动发现。关闭 → 手动在显示屏上设置 `http://<ioBroker-IP>:8123`。 | 开启 |
| 身份验证 | 需要登录（保护局域网上的 HA API；凭据以纯 HTTP 方式传输） | 关闭 |
| 用户名/密码 | 身份验证开启时 | admin / — |
| 信任代理 | 仅在受信任的反向代理之后，该代理会终止 TLS 并移除 X-Forwarded-* | 关闭 |

---

## 州树
```
hassemu.0.
├── info.
│   ├── connection      — server is running
│   ├── serverUuid      — server identity (read-only)
│   └── refreshUrls     — re-scan URL list (button, set to true)
├── global.
│   ├── enabled         — master switch
│   ├── mode            — URL choice used by every client whose mode is `global`
│   └── manualUrl       — free-text URL, used when global.mode = `manual`
└── clients.
    └── <id>            — one channel per display (channel name = hostname or IP)
        ├── mode        — per-client URL choice
        ├── manualUrl   — free-text URL, used when mode = `manual`
        ├── ip          — last seen client IP
        └── remove      — forget this client (button, set to true)
```

### 显示屏获取的是哪个网址？
| `mode` | URL |
| `global` | 使用 `global.mode` |
| `manual` | 使用 `manualUrl` |
| `manual` | 使用 `manualUrl` |
| 空 (`---`) | 着陆页 |
| 空白（`---`） | 着陆页 |

主开关：

- **开启** — 所有显示器都遵循 `global.mode`
- **关闭** — 所有显示恢复为 `---`
- 新显示内容总是从 `---` 开始

---

＃＃ 刷新
URL更改后，显示屏会在大约30秒内重新加载。

添加或重命名 VIS-2 项目或视图后，将 `info.refreshUrls` 设置为 `true`，使其显示在下拉列表中。

如果 Hassemu 在显示器运行时离线，显示器会在大约 1.5 分钟后切换到带有刷新按钮的离线页面，并在 Hassemu 恢复后自动返回到您的控制面板。限制：如果显示器在 Hassemu 关闭期间冷启动，则无法加载该页面，并会显示连接错误，直到适配器重新启动。

---

## 故障排除
首先将实例日志级别设置为 `debug`——自 v1.31.1 版本起，适配器会跟踪每个决策点（识别、OAuth2、URL 发现、解析器链、移动应用 Webhook、主开关）。仅凭该日志即可对大多数症状进行分类。

**显示器找不到服务器** — 启用 mDNS 后，日志应显示 `mDNS: Broadcasting`。如果缺少该行，则表示 mDNS 绑定失败（端口 5353/UDP）。解决方法：在实例配置中关闭 mDNS，然后手动将显示器指向 `http://<ioBroker-IP>:8123`。

**显示错误的 URL 或登录页面** — 打开对象浏览器，检查 `clients.<id>.mode`（如果模式为 `manual`，则还需检查 `manualUrl`）。在 `mode='global'`，同时检查 `global.mode` / `global.manualUrl`。设备 ID 显示在登录页面上，并存储在 `clients.<id>.ip`。调试日志显示每个请求的完整解析器链（`chain=global→manual→…`）。

**显示器丢失了其身份（每次访问都会生成新的 ID）**——显示器无法保存 cookie。常见原因：启用了严格的隐私模式、恢复出厂设置、清除了浏览器缓存。旧的 `clients.<id>` 通道可以通过 `remove` 按钮移除，但根本原因在于显示器端，而非 hassemu 本身。

**HA Companion App 显示“服务器不是 Home Assistant”** — 请将应用指向 `http://<ioBroker-IP>:8123`，而不是 ioBroker 管理端口。如果 hassemu 前面使用了反向代理，请确保 `/manifest.json` 未经修改地通过——应用会解析 `name === "Home Assistant"` 来验证服务器。

**下拉菜单中的 Aura 条目指向错误的端口** — Aura 实例的 `native.port` 必须与其实际监听的端口匹配。修复 Aura 配置后，触发 `info.refreshUrls = true` 以重新运行发现。

---

＃＃ 升级
适配器启动时，迁移会自动运行。

是否有脚本仍然写入 `visUrl`？更新它们——改为写入 `manualUrl`，并将 `mode` 设置为 `manual`。

**如果您的 Shelly Wall Display 固件版本为 2.6.0 或更高版本，请确保您的 hassemu 版本 **≥ 1.29.2**。固件 2.6.0 中引入的设备端 HA 应用需要服务器身份探测、移动应用注册步骤以及 WebView“已连接”信号——这三项均在 v1.29.0 至 v1.29.2 版本中已包含。升级后，请再次运行设备端 HA 的设置流程。

---

## 支持发展
这个适配器是免费开源的。如果您觉得它有用，可以考虑请我喝杯咖啡：

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.37.0 (2026-07-09)

- A custom name you give a display now survives even when its network hostname resolves later — the name you set sticks.
- A display that keeps losing its identity no longer fills ioBroker with unused entries over time.
- A display connection that simply goes away (a panel powered off) is now cleaned up instead of lingering until the adapter restarts.
- The manual URL-refresh datapoint is now `info.refreshUrls` (was `info.refresh_urls`); the old one is removed automatically on upgrade — update any script that wrote to the old name.
- Corrected the configuration help texts and the README to match the current setup, documented the offline behaviour, and added a first-steps guide.

### 1.36.0 (2026-06-22) — stable

- Fixed a rare adapter crash and restart loop that a malformed connection message could trigger — it briefly took all connected displays offline until the adapter recovered.
- A custom name you give a display (its channel name) is no longer overwritten with the device's IP address when that IP changes.
- With authentication enabled, a display again reloads automatically after you change its target URL.
- With authentication enabled, a password is now required — the settings can no longer be saved with an empty password.

### 1.35.3 (2026-06-15)

- Fixed Home Assistant discovery pointing the display at the wrong address on multi-interface hosts; it now uses the address the adapter actually listens on.

### 1.35.2 (2026-06-12)

- Displays whose registration became stale after an adapter restart now re-register automatically — the server previously answered in a way the companion app did not recognize as "please register again"
- Removing a display now also clears its leftover app registration, so a re-added display starts with a fresh one

### 1.35.1 (2026-06-09)

- Internal cleanup. No user-facing changes.

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

<!-- prettier-ignore -->
*Developed with assistance from Claude.ai*