---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hoymiles/README.md
title: ioBroker.hoymiles
hash: FtJh55Z2gjr0Hh112SdEK6wS2PH9dp+pYzWggw2Pq8s=
---
![标识](../../../en/adapterref/iobroker.hoymiles/admin/hoymiles.png)

![安装数量](https://iobroker.live/badges/hoymiles-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/hoymiles-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.hoymiles.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hoymiles.svg)
![执照](https://img.shields.io/github/license/Eistee82/ioBroker.hoymiles)
![捐](https://img.shields.io/badge/Donate-PayPal-blue.svg)

# IoBroker.hoymiles
[![测试和发布](https://github.com/Eistee82/ioBroker.hoymiles/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Eistee82/ioBroker.hoymiles/actions/workflows/test-and-release.yml)

如果您喜欢这款适配器，请考虑捐赠：

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/eistee)

## 免责声明
**所有产品和公司名称或标识均为其各自所有者的商标™或注册商标®。使用这些名称或标识并不意味着与上述所有者或其任何关联子公司有任何关联或得到其认可！此个人项目为业余时间维护，不以盈利为目的。**

**本软件按“原样”提供，不提供任何形式的担保。** 使用风险自负。作者不对您的逆变器、DTU 或任何其他设备的损坏负责。此适配器直接与您的硬件通信——错误使用命令（功率限制、重启、开/关）可能会影响您的太阳能装置。

本适配器与 Hoymiles Power Electronics Inc. 没有任何关联、认可或联系。

＃＃ 描述
ioBroker 适配器，适用于 [霍伊迈尔斯](https://www.hoymiles.com/) **HMS-xxxW-xT** 和 **HMS-xxx-xWB** 微型逆变器，集成 WiFi/蓝牙 DTU (DTUBI)。

两种连接模式（可独立配置）：

- **本地：**通过端口 10081 进行直接 TCP/Protobuf 通信——无需云端，也无需网关
- **云端：** Hoymiles S-Miles 云 API — 每月/每年能源消耗、二氧化碳减排量和收入计算

## 文档
- 🇺🇸 [英文文档](docs/en/README.md)
- 🇩🇪 [德国文档](docs/de/README.md)

＃＃ 特征
双模式：本地 TCP/Protobuf 和/或 S-Miles 云 API
- 持久 TCP 连接，带 protobuf 心跳（每 20 秒自动保持空闲连接）
- 可配置数据间隔（0 = 最快，每个周期约 1 秒）
- 云中继：代表 DTU 将逆变器数据转发到 Hoymiles 云，因此本地连接不再阻止云端上传。
- 根据 DTU 的 sendTime 配置自动获取云轮询时间
- 协议帧中的序列号（0-60000 循环，与原始应用程序匹配）
- 对较新的 DTU 固件支持 AES-128-CBC 加密（从 encRand 派生 SHA-256 密钥）
- 实时数据：功率、电压、电流、频率、能量、温度
- 单面板监控 (PV0/PV1) — 本地和云端
- 每个逆变器的云端数据：功率、电压、频率、温度（Protobuf图表API）
- 能源总量：日、月、年、总计（千瓦时）
- 基于电价（云端）的收入计算
- 二氧化碳减排量追踪（云端）
- 命令：功率限制（2-100%）、逆变器开/关/重启、DTU重启、功率因数限制、无功功率限制、清除警告、清除接地故障、锁定/解锁逆变器
- 报警和警告监控（223 个代码，支持所有 11 种语言）
- 状态质量（`q`）：断开连接时将数据标记为过期，作为云端回退的替代方案，重新连接后自动重置
- 5分钟空闲超时，自动重连
- ioBroker.discovery 的网络发现模块
- TypeScript、ESLint、Prettier、GitHub CI/CD
- 完整国际化：en、de、ru、pt、nl、fr、it、es、pl、uk、zh-cn

＃＃ 配置
在ioBroker管理界面中打开适配器配置。

### 本地连接（TCP）
| 设置 | 默认值 | 说明 |
|---------|---------|-------------|
| **启用本地连接** | 开启 | 启用直接 TCP/Protobuf 连接 |
| **DTU 设备** | （空） | DTU IP 地址/主机名表。每个 DTU 添加一行。 |
| **数据查询间隔** | 5秒 | 数据请求之间的秒数（0-300）。设置为0表示速度最快（请求之间无延迟）。 |
| **配置/告警轮询因子** | 6 | 配置和告警每隔 N 个数据周期查询一次。 |
| **云中继** | 开启 | 代表 DTU 将实时数据转发至 Hoymiles 云。防止本地连接阻塞云端上传。 |

### 云连接（S-Miles）
| 设置 | 默认值 | 说明 |
|---------|---------|-------------|
| **启用云服务** | 关闭 | 启用 Hoymiles S-Miles 云 API |
| **S-Miles 电子邮件** | — | 您的 S-Miles 帐户电子邮件 |
| **S-Miles 密码** | — | 您的 S-Miles 账户密码（加密存储） |

您云账户中的所有逆变器都会自动被发现，无需手动配置序列号。

两种连接可以同时启用。本地数据优先——当 DTU 离线时（例如夜间），云数据会作为补充。

支持的逆变器
该适配器专为**带有集成 WiFi（或 WiFi + 蓝牙）DTU**（DTUBI）的 Hoymiles HMS 微型逆变器而设计。

**本地** = 端口 10081 上的直接 TCP/Protobuf 连接。**云** = S-Miles 云 API — 自动发现、实时数据（快速突发通道 ~1.5–3 秒）、能量聚合、电网曲线、逆变器开/关 + 重启、DTU 重启。

| 模型 | 字符串 | 本地 (TCP) | 云端 | 状态 |
|-------|:---:|:---:|:---:|--------|
| HMS-300W-1T | 1 | ✅ | ✅ | 未经测试 |
| HMS-350W-1T | 1 | ✅ | ✅ | 未经测试 |
| HMS-400W-1T | 1 | ✅ | ✅ | 未经测试 |
| HMS-450W-1T | 1 | ✅ | ✅ | 未经测试 |
| HMS-500W-1T | 1 | ✅ | ✅ | 未经测试 |
| HMS-600W-2T | 2 | ✅ | ✅ | 未经测试 |
| HMS-700W-2T | 2 | ✅ | ✅ | 未经测试 |
| HMS-800W-2T | 2 | ✅ | ✅ | **已测试**（本地 + 云端） |
| HMS-900W-2T | 2 | ✅ | ✅ | 未经测试 |
| HMS-1000W-2T | 2 | ✅ | ✅ | **已测试**（本地） |
| HMS-1600DW-4T | 4 | ✅ | ✅ | 未经测试 |
| HMS-1800DW-4T | 4 | ✅ | ✅ | 未经测试 |
| HMS-2000DW-4T | 4 | ✅ | ✅ | 未经测试 |
| HMS-600-2WB | 2 | ❌¹ | ✅ | 未经测试 |
| HMS-700-2WB | 2 | ❌¹ | ✅ | 未经测试 |
| HMS-800-2WB | 2 | ❌¹ | ✅ | **已测试**（云端：实时突发、网格配置文件、开关机+重启、DTU重启） |
| HMS-900-2WB | 2 | ❌¹ | ✅ | 未经测试 |
| HMS-1000-2WB | 2 | ❌¹ | ✅ | 未经测试 |
| HMS-1600-4WB | 4 | ❌¹ | ✅ | 未经测试 |
| HMS-1800-4WB | 4 | ❌¹ | ✅ | 未经测试 |
| HMS-2000-4WB | 4 | ❌¹ | ✅ | 未经测试 |

¹ WB系列（以“HiFlow Pro”品牌销售）没有本地TCP端口——其唯一的本地通道是低功耗蓝牙（Bluetooth LE），所有数据都传输到Hoymiles云端。因此，这些逆变器只能通过云端工作：启用云连接后，适配器会通过S-Miles API（实时突发功率、能量、电网特性）读取数据，并可以发送逆变器的开关机、重启和DTU重启命令。所有WB型号都使用同一平台；目前仅测试了HMS-800-2WB型号。

**纯云端操作：**您 S-Miles 账户中任何受支持的逆变器都无需本地连接即可工作——适配器会自动发现逆变器，并通过云端提供实时功率（突发通道）、能量聚合、电网曲线以及逆变器开关、重启和 DTU 重启命令。其余命令（功率限制、锁定、清理警告等）则需要本地 TCP 连接。

**重要提示：**此适配器**仅**适用于**内置 WiFi**的 HMS 型号。它**不**适用于以下型号： > - 不带“DW”的 HMS-1600/1800/2000-4T（这些型号使用 Sub-1G 射频，需要外接 DTU） > - HM 系列（无 WiFi，仅射频） > - MI 系列（无 WiFi，仅射频） > - 带有外接 DTU-Pro 或 DTU-WLite 适配器的 HMS/HMT > - HMT 三相型号

## 多逆变器
此适配器支持在单个实例中连接多个逆变器：

- **本地：** 在设备表中添加多个 DTU IP 地址
- **云端：**您账户中的所有逆变器和站点都会自动被发现

每个DTU使用其序列号作为ID创建一个设备节点（例如`hoymiles.0.4143A01CEDE4.*`）。

云站点创建聚合设备节点（例如`hoymiles.0.station-12345.*`）。

## Changelog

### **WORK IN PROGRESS**
- (@Eistee82) Cloud: inverters whose model name does not end in "T" (e.g. HMS-2000-4WB) no longer lose their extra PV strings — voltage and current were only polled for the first two strings, so strings 3 and 4 showed power but nothing else. The number of PV inputs is now taken from Hoymiles' own rule dictionary, looked up by inverter serial number prefix, which is the same source the S-Miles app uses; the model name and the number of strings seen in the live data remain as fallbacks
- (@Eistee82) Cloud: support inverters with more than six PV strings (up to 12), matching the port counts the cloud actually publishes
- (@Eistee82) CI/tests: upgraded the coverage tool (c8 11 → 12) so the unit-test coverage step runs on Node 26 as well, and added Node 26 to the test matrix (now 22 / 24 / 26)
- (@Eistee82) Security (dev dependencies only): cleared several advisories in the development toolchain — js-yaml and brace-expansion via `npm audit fix`, plus targeted same-major overrides for brace-expansion (1.1.16) and adm-zip (0.6.0). No change to the shipped adapter (these packages are not part of the published npm package)
- (@Eistee82) Device Manager: inverters and cloud stations now appear on the ioBroker Device Manager tab, each inverter titled after its cloud station (the name given in the S-Miles app) plus its DTU serial, with live status, original per-type device icons (also used for the device objects in the object tree, replacing the generic adapter icon), live values right on the card (current power, today's energy, per-PV-string power and inverter temperature), per-device controls (on/off, power limit, power factor, reactive power, lock, reboot inverter/DTU, clear warnings/grounding fault, persistent power limit, cloud send interval), a settings dialog and a read-only details view. Cloud-only inverters show just the cloud-actuatable controls; instance actions cover network scan and cloud-login test. Controls reuse the existing command path, so no behaviour changes for the underlying states

### 0.4.1 (2026-07-18)
- (@Eistee82) Packaging: removed the npm `prepare` install script — installs from GitHub now use the committed `build/` output directly, so no dev dependencies are downloaded onto the target system; npm releases are still built freshly via `prepublishOnly`
- (@Eistee82) CI/test reliability: added a global Mocha timeout and switched the test TLS certificates to fast EC keys, so the adapter-tests no longer time out on loaded CI runners

### 0.4.0 (2026-07-17)
- (@Eistee82) Cloud-only support for WB inverters ("HiFlow Pro", e.g. HMS-800-2WB): read power and energy over the S-Miles cloud and switch the inverter on/off, reboot it or reboot the DTU — no local connection needed
- (@Eistee82) Faster live values: new realtime channel updates power every few seconds instead of every ~80 s, like the app's live view
- (@Eistee82) More local data: inverter grid profile, a persistent power limit, per-string error codes and complete alarm lists
- (@Eistee82) More reliable and readable: alarm texts in your ioBroker language, fixed offline/online detection, S-Miles Home account support, and better data quality handling
- (@Eistee82) Maintenance and security: dependency and GitHub Actions updates that close known security advisories, admin translations migrated to the current i18n file format, and connection timers are now managed by ioBroker so they are reliably cleaned up on stop/restart

### 0.3.5 (2026-05-13)
- (copilot) Adapter requires node.js >= 22 now
- (@Eistee82) Stop retry loop on permanent cloud auth errors to prevent Hoymiles account lockout
- (@Eistee82) Add `info.cloudLastError` state and raise an ioBroker alert notification with reset instructions on permanent cloud auth errors
- (@Eistee82) Bump axios to 1.15.0 and protobufjs to 8.0.1
- (@Eistee82) Add S-Miles Home account support (Argon2id login + `/pvmc/.../*_c` data API)
- (@Eistee82) Decide cloud profile (installer / home) via a post-login probe against `/pvm/.../select_by_page` instead of `pre-insp.v` — Hoymiles unified all accounts onto Argon2id in 2026
- (@Eistee82) Drop the dead v0 auth fallback
- (@Eistee82) Skip cloud-station states for fields the home-profile API doesn't provide (no empty placeholders for `latitude`/`longitude`/firmware version strings)
- (@Eistee82) Add a "Test cloud login" diagnostic button to the admin UI with per-phase results (`region_c`, `pre-insp`, `login`, `probe`) for forum bug reports
- (@Eistee82) Bump `protobufjs` to 8.2.0 to address seven security advisories (4 high, 3 medium — code injection, prototype pollution, DoS variants) affecting 8.0.0–8.0.1
- (dependabot) Bump dev-only transitive `follow-redirects` to 1.16.0 (security: leaked auth headers on cross-domain redirects) and `deepl-node` to 1.27.0 (drops the unused `uuid` dependency)

### 0.3.4 (2026-04-08)
- (@Eistee82) Fix disabled property type in jsonConfig table items (string, not boolean)
- (@Eistee82) Add local repochecker script (`npm run test:repo`)

### 0.3.3 (2026-04-08)
- (@Eistee82) Fix jsonConfig schema warnings: button color, remove unsupported table properties

Older entries: see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 Eistee82

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