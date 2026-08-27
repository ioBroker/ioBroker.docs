---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zeptrion/README.md
title: ioBroker.zeptrion
hash: ztWGkf72+py74kSJkY91gZHTRmvxRisq5o8YkM5ki4A=
---
# IoBroker.zeptrion
![标识](../../../en/adapterref/iobroker.zeptrion/admin/zeptrion.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.zeptrion.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zeptrion.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg)
![捐](https://img.shields.io/badge/Donate-PayPal-blue.svg)
![请我喝杯咖啡](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)

[![测试](https://github.com/bueste/ioBroker.zeptrion/workflows/Test%20and%20Release/badge.svg)](https://github.com/bueste/ioBroker.zeptrion/actions)

[费勒](https://www.feller.ch/) **[zeptrion / zApp](https://www.feller.ch/de/connected-buildings/zeptrion)** WLAN 执行器适配器（WLAN Nebenstelle 4K = zApp 网关，WLAN Zwischenmodul 2K = zApp 增强器），用于灯光和百叶窗/百叶窗控制，基于 zrap Web 服务 API（Feller 文档 10.ZEPAPI-E.1612 / 版本 1.0，2018 年 8 月 1 日固件）。

_(Eine deutsche Version dieser README ist verfügbar under [README_de.md](README_de.md).)_

## 功能概述
- **通道控制**（`zrap/chctrl`）：开/关/停止/切换，打开/关闭，移动打开/移动关闭，

dim_up/dim_down 包括定时变体（`_t` 以毫秒为单位），以及场景 recall_s1-4 / store_s1-4 / delete_s1-4 - 既作为单独的按钮，也作为自由文本 `command` 字段。

- **通道状态**（`zrap/chscan` 作为周期性重新同步 + `zrap/chnotify` 作为长轮询）

推送近乎实时的更新）和**频道描述**（`zrap/chdes`，读/写：名称、组、图标、类型、类别）。

- **设备信息**（`zrap/id`）：硬件/软件/引导加载程序版本、序列号、

系统名称，设备类型。

- **信号强度**（`zrap/rssi`，轮询）。
- **网络状态**（`zrap/net`，只读）：SSID、IP、MAC、模式、加密方式

掩码，网关。

- **系统命令** (`zrap/sys`): 重启、恢复出厂设置、重置为接入点模式。
- **位置** (`zrap/loc`)、**NTP 配置** (`zrap/ntp`) 和 **日期/时间**

（`zrap/date`）包括一键将设备时钟与 ioBroker 主机同步。

- **mDNS 发现**（API 文档第 4 章）：扫描本地网络以查找

zeptrion 设备，并将发现结果添加到配置表中，处于禁用状态（发现与手动审查/激活相结合）。

- **批量冰雹警报命令**：`control.closeAllShutters` / `openAllShutters` /

`stopAllShutters` 同时控制所有活动设备上的所有已配置通道

- 由于多播捆绑（见下文），每个设备发出一个请求，而不是每个通道发出一个请求。
- **多播命令捆绑**：同一设备在短时间内到达的通道命令

彼此间隔 50 毫秒的请求会自动捆绑到一个 `zrap/chctrl` 多播 POST 请求中（API 文档第 3.6.5 章），而不是多个连续的单独请求。

- **快门位置估计**（可选，`posEstimate`）：由于硬件的限制，根据

文档几乎总是报告快门通道为`-1`（未知），每个设备可以配置电机行程时间；适配器根据移动方向和经过的时间估算位置（尽力而为，没有硬件反馈，可手动校准）。

- **Smartfront 支持**（可选，`zapi/smartfront/*`）：读取温度/亮度/

湿度，设置 LED 背景颜色（仅适用于连接了 Feller Smartfront 开关的设备，在配置中勾选此复选框）。

- 强大的错误处理机制：区分 ECONNREFUSED/超时/DNS 错误，并进行退避

重复故障、单设备连接状态和全局连接状态。此外，mDNS 发现机制还针对由格式错误/无关网络数据包引起的异常情况进行了强化。

未实现（参见“已知限制”）：对 `zrap/net`（更改 WLAN 凭据）、`zrap/scheduler` 的写入访问权限、Smartbutton webhook 编程（`zapi/smartbt/*`）。

＃＃ 安装
管理界面 -> 适配器 -> 搜索“zeptrion” -> 安装。

＃＃ 配置
- **HTTP 超时**：对设备的每次请求超时时间（默认 4000 毫秒）。
- **发现按钮**：通过 mDNS 扫描本地网络（服务类型 `_zapp._tcp`，

对于固件版本低于 01.08.xx 的设备，根据主机名模式 `zapp-YYWWNNNN` 回退到 `_http._tcp`。新发现的设备将以**禁用**状态添加到表中。

- 之后检查该行，分配 ID/名称，核实通道数量

（3340-4-x = 4 个通道，3340-2-x = 2 个通道）并启用它。mDNS 仅在同一网段/VLAN 内工作。

- **设备表**（也可以完全手动填写，无需发现设备）：
- `Active`、`ID`（a-z 0-9 _ -）、`Name`、`IP address/hostname`、

`Channels` (1-4), `Kind` (快门/灯光/未知 - 控制 ioBroker 对象角色，见下文), `Shutter motor travel time` (秒，0=禁用 - 启用 `posEstimate`，见下文，作为所有通道的默认值), `Travel time/channel` (可选，逗号分隔，例如 `22,28` - 单独覆盖每个通道的默认行程时间；适用于两个通道电机行程时间不同的 2K 设备；空条目将回退到默认行程时间), `Smartfront` (复选框，仅当连接了 Feller Smartfront 开关时启用), `Poll (s)` (默认值 30，用于 RSSI + 周期性通道扫描重新同步；实际的通道更新通过 chnotify 长轮询独立运行)。

## 每个设备的对象树 (`zeptrion.0.<id>`)
```
<id>.info.connection / lastError / hw / sw / boot / sn / sys / type / oen / rssi / refresh
<id>.network.ssid / ip / mac / mode / enc / mask / gw / bssid        (read-only)
<id>.system.reboot / unlock / factoryDefault / networkDefault      (buttons; factoryDefault requires unlock within 30s)
<id>.location.name                                                  (read/write)
<id>.ntp.url / per                                                   (read/write)
<id>.date.rfc1123 / tz / dst / syncNow                               (read/write + button)

<id>.channels.chN.val                                    channel state 0-100 / -1 (raw hardware value)
<id>.channels.chN.posEstimate                             only for kind=Shutter: software position estimate
                                                           0=closed/100=open, also manually writable (calibration)
<id>.channels.chN.name / group / icon / type / cat        channel description (read/write)
<id>.channels.chN.command                                 free-text command (string)
<id>.channels.chN.stop / on / off / toggle / open / close /
                  move_open / move_close / dim_up / dim_down        (buttons)
<id>.channels.chN.recall_s1..4 / store_s1..4 / delete_s1..4          (buttons)

<id>.smartfront.temp / lux / hum       only if "Smartfront" is enabled (read)
<id>.smartfront.ledState               current LED status as JSON (read)
<id>.smartfront.ledSet                 set LED(s), JSON array (write)
```

全球的：

```
info.connection                at least one device reachable
control.closeAllShutters       button: ALL configured channels -> "close"
control.openAllShutters        button: ALL configured channels -> "open"
control.stopAllShutters        button: ALL configured channels -> "stop"
```

## 对象角色和“种类”
zrap API 本身并不区分灯光通道和快门通道——这完全取决于线路连接/执行器。为了使可视化（VIS，未来可能集成 ioBroker.iot/Alexa）能够对通道进行有意义的分类，可以为每个设备设置“类型”：

| 类型 | `<ch>.val` 角色 | `stop`/`open`/`close` 角色 |
| 百叶窗/卷帘 | `level.blind` | `button.stop` / `button.open.blind` / `button.close.blind` |
| 光 | `level.dimmer` | 通用 `button` |
| 未知（默认） | `value` | 通用 `button` |
| 未知（默认值） | `值` | 通用 `按钮` |

重要提示：`level.blind` **并非**伪造真实的位置反馈——根据 Feller 文档，快门通道的 `chscan`/`chnotify` 几乎总是返回 `-1`（未知），因为硬件本身不会报告盲区位置。该角色仅用于提高 VIS 小部件的识别率；数值本身通常不具有实际意义。

## 冰雹警报使用
```javascript
// JavaScript adapter example
on({id: 'weather.0.warnings.hail', val: true}, function () {
    setState('zeptrion.0.control.closeAllShutters', true);
});
```

个别设备（离线等）的故障不会中断其余通道——每个故障通道都会被单独记录并记录在`<id>.info.lastError`中。

## 已知局限性/深思熟虑的决定
- **智能按钮 webhook 编程**（`zapi/smartbt/prgm`/`prgn`/`prgs`）

已实现：这将使开关在按钮按下时直接调用 ioBroker 上的 URL（真正的推送，完全无需轮询）。这需要在适配器中配置一个传入的 HTTP 服务器，而目前适配器中尚不存在——这并非一个简单的功能扩展，而是一个较大的架构扩展。已将其记录为未来可能实现的功能增强。

- **尚未实现对 `zrap/net` 的写入权限** - 更改执行器的 WLAN

通过脚本输入凭据存在风险（可能导致连接中断，需要重启）。如有需要，可以添加凭据。

- **调度程序（`zrap/scheduler`）**和**zeptrionAir Smartfront 服务**

（`zapi/smartfront/*`、`zapi/smartbt/*`）未实现，因为它们与快门/冰雹用例无关。`main.js`中现有的`zrapGet`/`zrapPost`结构可以轻松扩展。

根据文档，`chctrl` 返回 HTTP 302 重定向，不包含响应体。

故意不遵守（`maxRedirects: 0`）以避免不必要的额外请求。

- 如果设备反复出现故障，轮询间隔将延长至最大值

5倍（简单退避）。

## 开发/测试
```bash
npm install
npm run lint
npm test              # package consistency + unit tests
npm run test:integration   # starts a real js-controller (takes longer)
```

## Changelog

### 1.0.13 (2026-08-11)

- Fix E5606 (untranslated i18n entries): testDeviceOk was never actually translated for de/es/it/nl/pl/pt (silently kept the English copy). Also fixed the identical issue in fr, missed by the checker's exact-match heuristic due to a spacing difference. Verified with a full sweep of all 11 i18n files against the English source - no other matches found.

### 1.0.12 (2026-08-10)

- Fix a real i18n gap found during independent end-to-end testing of v1.0.11: embedded field-validation messages in the CSV import report stayed English even in the localized report. validateDeviceRow() now returns structured {key, args} entries with two explicit renderers: always-English for logs, I18n.translate() for the UI. Added 13 new i18n keys across all 11 languages. Also added the missing README_de.md to package.json's "files" allowlist - npm auto-includes README.md in every package but NOT README_de.md, so it was silently absent from the published tarball. Verified end-to-end: loaded the real I18n module directly, confirmed log output stays English regardless of active UI language across EN/DE/FR/ZH, and downloaded + extracted the real published npm tarball to confirm packaging.

### 1.0.11 (2026-08-10)

- Fix: v1.0.10 translated all onMessage() UI text to plain English only. Implemented full multi-language support instead, using the official @iobroker/adapter-core I18n module (reads system.config.common.language automatically, falls back to English for unsupported languages). Added a new i18n/ directory with all 11 required languages. ioBroker log entries remain English-only; only the admin-dialog result text is now localized. Also fixed a packaging bug: the new i18n/ folder was missing from package.json's "files" allowlist, which would have excluded it from the published npm package - caught via an actual npm pack + tarball-extraction test before pushing. Verified round-trip in German, English, and French.

### 1.0.10 (2026-08-10)

- Fix all remaining findings from the follow-up review: translated 18 German error messages in validateDeviceRow(), the 5 error-code-to-message translations in handleDeviceError(), 9 German strings in thrown Error objects, and the bonjour-service install-hint rejection message. Per explicit maintainer direction, all UI-facing result text in onMessage (CSV import report, device test results, discovery summary) is now English as well, superseding the earlier decision to keep it German for the target audience. No migration needed - none of these fixes touch persisted object common properties.

### 1.0.9 (2026-08-08)
- Fix: the common.name i18n conversion from 1.0.8 only applied to newly created objects (setObjectNotExistsAsync/ensureState never update existing ones) - any installation upgrading from <=1.0.7 kept the old plain-German name strings forever. migrateObjectRoles() now also force-corrects these on every startup via a value-based lookup table generated from the same translations already used in the object-creation code, plus dedicated regex rules for the two dynamic cases (scene button names, tilt pulse duration). Also fixes two translation gaps that were missed in 1.0.8 (network info fields and the shutter position estimate/move descriptions) which the extraction script used to build the migration table happened to catch. Verified against a live object dump (409 objects, 4 devices): corrects exactly the 385 affected objects, 0 false positives on user-configured device/room names.

### 1.0.8 (2026-08-08)
- Fix all findings from the manual maintainer review (PR #6327): removed the manual npm installation section from README.md/README_de.md (E6012, prohibited regardless of stated intent); added a verified link to the Feller product page; translated all 40+ German log messages to English (UI-facing result text for CSV import/discovery, shown in the admin config dialog, is intentionally kept German and decoupled from the log call); converted all 50 German common.name strings (incl. the CH_BUTTONS constant and dynamic channel/scene names) to full 11-language i18n objects; completed io-package.json instanceObjects translations for 'info' and 'control' (info.connection already had all 11 languages).

### 1.0.7 (2026-07-22)
- Enable global i18n support (jsonConfig i18n: true) with translation files under admin/i18n/ for all 11 supported languages, resolving the checker's i18n warnings the correct way (validatorErrorText stays a plain string per schema; ioBroker resolves the translation via the files, falling back to the English text if no entry is found). Added @iobroker/adapter-dev and @alcalzone/release-script as devDependencies with translate/release npm scripts. (Migrating to @iobroker/eslint-config was evaluated but reverted: its eslint-plugin-import dependency does not yet support eslint 10.x, which broke npm install.)

### 1.0.6 and older

Older changelog entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 Stefan Bühler

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