---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pondpump/README.md
title: ioBroker.pondpump
hash: 7nZvGqyFhkU7WKkes9h0x0HW3MPW88FZnAbT2JqHK8I=
---
![标识](../../../en/adapterref/iobroker.pondpump/admin/pondpump.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.pondpump.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pondpump.svg)
![安装数量](https://iobroker.live/badges/pondpump-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/pondpump-stable.svg)
![NPM](https://nodei.co/npm/iobroker.pondpump.png?downloads=true)

# IoBroker.pondpump
**测试：** ![测试与发布](https://github.com/ssbingo/ioBroker.pondpump/workflows/Test%20and%20Release/badge.svg)

---

<p align="center"> <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a> </p>

---

## IoBroker 的池塘泵适配器
通过 **OASE Garden Controller Cloud (EGC)** 本地和云端控制和监控 **OASE AquaMax Eco Titanium** 池塘水泵。

厂商产品页面：

- [OASE AquaMax Eco Titanium](https://www.oase.com/)（池塘水泵，货号 73656）
- [OASE 花园控制器云](https://www.oase.com/)（EGC 网关，产品编号 55317）

### 免责声明
这是一个**非官方社区项目**。它与 OASE GmbH 没有任何关联，也未获得其认可或支持。

“OASE”、“AquaMax”及相关产品名称均为 OASE GmbH 的商标，在此仅用于描述设备兼容性。

通信协议已进行独立分析——使用此适配器需自行承担风险。

致谢：[mr-suw/ioBroker.oasecontrol](https://github.com/mr-suw/ioBroker.oasecontrol)（EGC 插座控制器适配器，FM-Master EGC）提供了宝贵的协议参考。本适配器未抄袭任何代码，专为智能池塘水泵设计，完全由我们自主编写。

### 支持的硬件
| 设备 | 货号 | 功能 |
| --- | --- | --- |
| OASE Garden Controller Cloud (EGC) | 55317 | 网关 (`GatewayCloud`) |
| OASE AquaMax Eco Titanium | 73656 | 池塘水泵（花园水泵） |

### 项目状态
- **阶段 1 — 云端只读** ✓ 轮询 OASE 云端库存；网关以及两个泵的实时状态
- **第二阶段 — 云控制** ✓ 泵的开关和转速可通过云隧道写入
- **第四阶段 — 实时遥测** ✓ 每次轮询实时读取功率、电机转速、温度和市电电压
- **阶段 3 — 本地（局域网）传输** ✓ 连接模式“本地”使整个适配器在本地网络上运行

无需云端：通过局域网即可实现库存管理、实时遥测、开关机及速度控制等功能。

**云身份验证：** OASE 云使用 **Azure AD B2C** (`account.oase.com`)。适配器使用无头环境友好的**刷新令牌授权**进行身份验证：只需从 OASE 应用登录中获取一次刷新令牌，并将其（加密后）粘贴到适配器设置中。适配器会将其交换为短期访问令牌，并透明地轮换刷新令牌。**适配器绝不会输入或存储您的帐户密码。** 如果没有刷新令牌，适配器可以启动，但会报告 `info.connection = false` 并发出明确的警告。

＃＃＃ 配置
所有设置均可在管理界面（JSON 配置）中找到：

| 设置 | 描述 |
| --- | --- |
| 连接模式 | `cloud` 或 `local`（互斥） |
| 轮询间隔 | 轮询间隔，单位为秒（默认 30） |
| 云用户名/密码 | OASE 云账户凭证（密码加密存储） |
| 控制器 IP | EGC 网关的 IP 地址（本地模式） |
| 设备密码 | 用于本地身份验证的设备密码（加密存储） |
| 绑定地址/端口 | 控制器连接回的本地 TLS 服务器 |

## 文档
📖 **新手手册：** [英文](doc/handbook/en/manual.md) ([PDF](doc/handbook/en/manual.pdf)) · [德语](doc/handbook/de/manual.md) ([PDF](doc/handbook/de/manual.pdf))

翻译文档：

- 🇩🇪 [德国文档](doc/de/README.md)
- 🇷🇺 [Документация на русском](doc/ru/README.md)
- 🇳🇱 [荷兰文档](doc/nl/README.md)
- 🇫🇷 [法语文档](doc/fr/README.md)
- 🇮🇹 [意大利文档](doc/it/README.md)
- 🇪🇸 [西班牙语文档](doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](doc/pl/README.md)
- 🇵🇹 [葡萄牙语文档](doc/pt/README.md)
- 🇺🇦 [Документація українською](doc/uk/README.md)
- 🇨🇳 [简体中文文档](doc/zh-cn/README.md)

较早的变更日志可以在[变更日志_旧版.md](CHANGELOG_OLD.md)中找到。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.2.1 (2026-08-14)

- (ssbingo) Maintenance: synced the auto-merged repository updates — Dependabot bumps (`@iobroker/json-config` 9.0.18, `@iobroker/gui-components` 10.1.0, `@module-federation/vite` 1.20.4) with the admin and widget bundles rebuilt to match, plus ioBroker template updates (`node:` import prefixes, `CHANGELOG_OLD.md`, Dependabot/CI tuning)

### 0.2.0 (2026-08-05)

- (ssbingo) **Requires ioBroker admin ≥ 8.0.0.** The admin scheduler component is migrated to the admin-8 UI stack — **React 19 + MUI 9** via `@iobroker/gui-components` and `@iobroker/json-config` 9 (replacing `@iobroker/adapter-react-v5`, which has no React 19 release). The vis-2 widgets stay on the vis-2 host stack (React 18 / MUI 6)
- (ssbingo) Minimum requirements raised: **js-controller ≥ 6.0.11, admin ≥ 8.0.0, Node.js ≥ 22**

### 0.1.0 (2026-07-26)

- (ssbingo) **Milestone release.** Consolidates the full feature set — cloud & local control with live telemetry, **SFC** (Seasonal Flow Control), two **vis-2 widgets**, and **per-pump time schedules** — into the first **0.1.x** milestone
- (ssbingo) Maintenance: the ioBroker adapter checker is clean (no errors, no suggestions) — Dependabot now uses randomised cron schedules and the deploy action is pinned to its major version (`@v1`)

### 0.0.9 (2026-07-26)

- (ssbingo) **Phase 9 — per-pump time schedules.** The adapter settings gain a **Schedules** section (bottom of the Connection tab) that lists the detected pumps; enable a pump and it gets its own **“Scheduler – &lt;pump&gt;” tab** where you set a **base power** (applied outside all windows) and a sorted list of **time windows**, each setting a power % or switching **SFC** on/off. The adapter runs the schedule and applies the target at the window boundaries. **Overlapping windows are rejected** — the editor validates live and the backend re-checks before applying

### 0.0.8 (2026-07-25)

- (ssbingo) Control widget: a dropdown next to the power slider lets you set the power in precise **5 % steps** (0–100 %). It writes the same setpoint as the quick buttons and is disabled while SFC controls the flow; it can be hidden via the new “Show 5 % dropdown” option

### 0.0.7 (2026-07-24)

- (ssbingo) Widgets: during Seasonal Flow Control (SFC) the pump visualization now reflects the **real** pump speed — the ice crystal spins by the actual (SFC-driven) speed like the impeller, the “Power” value shows the real output, and the control widget’s power slider shows the actual output (disabled while SFC controls the flow). Uses a live rpm-per-percent calibration learned during normal operation
- (ssbingo) Dependencies: processed the pending Dependabot updates — `@iobroker/adapter-react-v5` → 8.3.2 and `@module-federation/vite` → 1.19.1 (a leaner widget bundle), plus CI action bumps. Major bumps that would break vis-2 host compatibility (React 19, MUI 9, Vite 8, plugin-react 6, TypeScript 7) are pinned via Dependabot ignore rules, because the vis-2 host shares React 18 + MUI 6 as module-federation singletons

### 0.0.6 (2026-07-24)

- (ssbingo) Maintenance: updated the CI deploy action (`testing-action-deploy` 1.5.1 → 1.5.2) and tidied up the repository (removed stale/merged and open Dependabot branches). No functional changes to the adapter

### 0.0.5 (2026-07-24)

- (ssbingo) Phase 6 — the adapter now ships two **vis-2 widgets**. *Pump visualization* shows an impeller that spins with the pump speed (in 10 % steps), a rotating ice crystal while frost-protection (SFC) mode is active, and a red cross with a still impeller when the pump is off, plus live power (W), motor speed (rpm) and the “Power” setpoint (%). *Pump control* offers on/off, a speed slider and quick presets. Both widgets have an instance and pump selector and derive their state IDs themselves; vis-2 is restarted automatically on install so the widgets appear immediately
- (ssbingo) Seasonal Flow Control (SFC) can now be switched from the adapter: the SFC on/off command (ONet `0x5000`) was reverse-engineered, exposed as a new writable `control.sfc` state, and wired into the control widget's SFC button; the pump visualization reflects the active SFC state. SFC is OASE's temperature-dependent seasonal throughput reduction (up to −50 %), not frost protection
- (ssbingo) Hardening: all transport timers are now adapter-managed (auto-cancelled on unload — compact-mode safe), and a batch of ioBroker adapter-checker findings were resolved (CI/deploy on Node 24, dependabot cooldown + auto-merge migration, `io-package.json` metadata)

### 0.0.4 (2026-07-24)

- (ssbingo) Phase 7 — cloud and local are now mutually exclusive: the `both` connection mode was removed (a saved `both` is migrated to `cloud`). When you switch between `cloud` and `local`, the device objects are rebuilt cleanly so the two never mix, and the new `info.connectionType` state shows which data source is active

### 0.0.3 (2026-07-23)

- (ssbingo) Phase 3 — local (LAN) transport is complete: connection mode `local` runs the whole adapter over the local network without the cloud. The adapter wakes the controller over UDP, the controller connects back over TLS (legacy cipher, self-signed certificate), authenticates with the device password, then reads the gateway and pumps, polls live telemetry (power, speed, temperature, voltage) and controls on/off and speed — all over the LAN. The poll and command path is transport-agnostic (local preferred, cloud fallback), and on/off is derived from live telemetry. Note: the speed setpoint value is not read back over the local channel yet
- (ssbingo) Documentation: multilingual README docs in 11 languages (under `doc/<lang>/`), beginner handbooks in English and German with a step-by-step mitmproxy guide (available as PDF), a Documentation section and CHANGELOG_OLD.md

### 0.0.2 (2026-07-23)

- (ssbingo) Phase 1 – cloud read-only: connects to the OASE Garden Controller Cloud (Azure AD B2C refresh-token auth), discovers the gateway and pumps, and polls live speed and status
- (ssbingo) Phase 2 – cloud control: pump on/off and speed (0–100 %) are writable and sent through the cloud SendONetPacket tunnel, verified byte-for-byte against the app
- (ssbingo) Phase 4 – live telemetry: power (W), motor speed (rpm), temperature (°C) and mains voltage (V) are read live each poll; still-unmapped sensors are exposed as raw values for classification
- (ssbingo) Pumps are named after their controller name; new stylized adapter icon (own illustration, not the product photo)
- (ssbingo) Extensive, component-tagged logging so any failure can be pinpointed from the logs, with secrets never logged

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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