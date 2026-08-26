---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.goodwe-sems/README.md
title: ioBroker.goodwe-sems
hash: MlCH7nZyW47tswu+Z/QBJgqqK91CEhQAUdG6M3MVUbs=
---
![标识](../../../en/adapterref/iobroker.goodwe-sems/admin/goodwe-sems.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.goodwe-sems.svg)
![下载](https://img.shields.io/npm/dm/iobroker.goodwe-sems.svg)
![捐](https://img.shields.io/badge/Donate-PayPal-00457C?style=flat&logo=paypal&logoColor=white)
![请我喝杯咖啡](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)

*[阅读德语](README.de.md)*

# IoBroker.goodwe-sems
![测试与发布](https://github.com/bueste/ioBroker.goodwe-sems/actions/workflows/test-and-release.yml/badge.svg)

从 **[GoodWe](https://www.goodwe.com) [SEMS Portal](https://www.semsportal.com)（云端）** - 适用于那些（例如，由于逆变器无法通过 LAN 访问）**无法**使用本地 [ioBroker.goodwe](https://www.goodwe) 进行轮询的安装。](https://github.com/FossyTom/ioBroker.goodwe) 适配器（Modbus/UDP，端口 8899）读取逆变器、电池和功率流数据。

登录使用您的**常规 SEMS Portal 帐户**（与您在 semsportal.com 或 SEMS 应用中使用的帐户相同）。**无需** GoodWe“组织”/OpenAPI 帐户。

＃＃ 目录
- [为什么选择这个适配器？](#why-this-adapter)
- [API 来源和限制（请阅读）](#api-origin-and-limitations-please-read)
- [安装](#installation)
- [配置](#configuration)
- [对象/状态结构](#objectstate-structure)
- [错误处理、退避和速率限制](#error-handling-backoff-and-rate-limits)
- [推送通知](#pushover-notifications)
- [安全与隐私](#安全--隐私)
- [开发](#开发)
- [更新日志](#changelog)
- [许可证](#license)

为什么选择这个适配器？
GoodWe ET/EH/BH/BT 逆变器通常可以通过 Modbus/UDP（参见 [如果逆变器无法通过 LAN 访问（例如，因为只有 WLAN/LTE 适配器连接到 SEMS Portal，而目标网络无法访问），则唯一的选择是通过 **[SEMS Portal](https://www.semsportal.com)** ([GoodWe](https://github.com/FossyTom/ioBroker.goodwe)) 进行云端访问。](https://www.goodwe.com)）在本地读取，无论如何，该装置已经通过 Modbus/UDP 进行监控。

## API 的来源和限制（请阅读）
GoodWe 正式提供三个 API（参见 [GoodWe API 技术文档](https://community.goodwe.com/solution/API)）：

- **OpenAPI** - 仅适用于 SEMS *组织* 帐户，需要 GoodWe 激活。
- **实时数据监控 API** - 适用于第三方，需要许可协议和设备白名单。
- **批量远程控制接口** - 基于 Kafka，仅支持远程控制。

这些功能都无法通过**普通**的SEMS Portal账户（大多数私人用户使用的账户）访问。此适配器使用的是与官方SEMS应用/网站相同的**未公开的HTTPS API**（登录通过`CrossLogin`/`SEMS+ cross-login`，数据检索通过`GetMonitorDetailByPowerstationId`）。GoodWe并未向第三方发布或提供这些端点的文档；该实现基于独立的流量分析以及以下开源参考项目：

- [pygoodwe](https://github.com/yaleman/pygoodwe) (MIT)
- [goodwe-sems-home-assistant](https://github.com/TimSoethout/goodwe-sems-home-assistant)
- [openHAB SEMSPortal 绑定](https://www.openhab.org/addons/bindings/semsportal/)

**结果：**

- 好消息：我们可以随时更改 API，恕不另行通知 - 因此适配器可能会（暂时）损坏。
- 目前**没有已记录的实时/推送机制**（WebSocket/SignalR），可供第三方使用。一些较早的登录响应中会出现 `msgSocketAdr` 字段，但上述任何参考项目实际上都没有使用它——使用它纯粹是逆向工程，缺乏可靠的文档，风险也显著更高（账户锁定、连接不稳定）。因此，此适配器特意通过 HTTPS 以可配置的间隔（默认 5 分钟）进行轮询，而不是伪造未经测试的 WebSocket 连接。
- 检测到速率限制代码（`GY0429`），该代码已在 Home Assistant 集成文档中记录。适配器会识别此代码并自动暂停（默认冷却时间为 5 分钟），以避免因重复请求而导致账户被强制关闭。
- 使用风险自负，请参阅[LICENSE](LICENSE)（MIT，无担保）。

**此端点未返回的字段：**经与实时日间响应验证，此适配器使用的网关响应 `GetMonitorDetailByPowerstationId` 不包含站点时间戳 (`info.time`)，也不包含当月至今的发电量/收入/货币字段 (`kpi.month_generation`、`kpi.day_income`、`kpi.total_income`、`kpi.currency`)。因此，对于任何账户/时间段，相应的状态 (`Station.PortalTimestamp`、`KPI.MonthGeneration`、`KPI.TodayIncome`、`KPI.TotalIncome`、`KPI.Currency`) 都不会创建——这是网关 API 本身的永久性缺陷，而非低发电时段的暂时缺失。`PowerFlow.*` 状态仅在门户实际返回电厂潮流数据时才会创建。

**电池数据（可选，实验性功能）：**上述网关端点也不包含电池的充电状态/功率/电压等信息，即使对于配备电池的工厂也是如此——固特异自身的门户网站（`semsplus.goodwe.com`）通过一个*独立*的、完全不同的、未公开的 API 获取这些信息（会话通过 `cross-login` 获取，设备通过 `relatedDevices` 发现，数据通过 `BAT_SYS` 类型设备的自身 `telemetry` 端点获取）。该 API 经过逆向工程，并逐字段地与从 GW8K-ET + LX 电池系统捕获的真实浏览器流量（HAR）进行验证。如果在实例配置中启用“获取电池数据”选项，适配器还会对每个报告已连接的 `BAT_SYS` 设备的逆变器调用此第二个 API，使用已配置的 *相同* SEMS 凭证（无需单独登录）- 并创建 `Inverters.<sn>.Battery.SOC/Power/Voltage/Current/Temperature/MaxChargeCurrent/MaxDischargeCurrent`。

这部分**比适配器的其他部分更脆弱、更不稳定**：它是一个独立的、经过独立认证的、未公开文档的、已签名的 API，GoodWe 可以随时更改、限制速率或阻止它，而无需事先通知，并且完全独立于上述主监控 API。因此，它默认处于关闭状态。如果它停止工作，适配器的其他部分（光伏发电量、KPI、逆变器遥测数据）不受影响——电池遥测故障会被捕获并以调试级别记录在每个逆变器的日志中，而不会被抛出异常。

＃＃ 安装
一旦该适配器被列入官方 ioBroker 适配器存储库，即可按正常方式安装：**管理 -> 适配器 -> 搜索“goodwe-sems” -> 安装**。

在此之前，ioBroker 管理员可以手动将其添加到 ioBroker 主机上：

```
iobroker url iobroker.goodwe-sems
```

＃＃ 配置
| 字段 | 描述 |
|---|---|
| SEMS 账号/密码 | 与 semsportal.com 账号的账号相同。密码由 ioBroker 加密存储。 |
| 工厂 ID（可选）| 留空以自动检测（`GetPowerStationIdByOwner`）。对于拥有多个工厂的账户：请从门户网站 URL 手动复制 ID（`.../powerstation/powerstatussnmin/<ID>`）。|
| 可推翻 | 参见 [Pushover 通知](#pushover-notifications)。 |
| Pushover | 请参阅[Pushover 通知](#pushover-notifications)。 |

## 对象/状态结构
```
goodwe-sems.0.info.connection              SEMS Portal reachable (bool)
goodwe-sems.0.info.lastSuccess             Timestamp of the last successful poll
goodwe-sems.0.info.lastError               Last error message
goodwe-sems.0.info.consecutiveErrors       Number of consecutive failed attempts
goodwe-sems.0.info.rateLimited             SEMS Portal is currently rate-limiting (bool)
goodwe-sems.0.info.activePollInterval      Currently effective interval incl. backoff (s)
goodwe-sems.0.info.rawResponse             Raw JSON response (only when the debug option is enabled)

goodwe-sems.0.Station.Name / .Capacity / .Address / .Latitude / .Longitude / .PortalTimestamp / .Status / .StationId
goodwe-sems.0.KPI.CurrentPower / .TodayGeneration / .MonthGeneration / .TotalGeneration / .TodayIncome / .TotalIncome / .Currency
goodwe-sems.0.PowerFlow.PV / .Load / .Grid / .Battery / .LoadStatus / .GridStatus / .PvStatus / .BatteryStatus
goodwe-sems.0.EVCharger.*                  (only if reported by the portal)

goodwe-sems.0.Inverters.<serial>.Name / .Model / .Status / .WarningCode
goodwe-sems.0.Inverters.<serial>.CurrentPower / .TodayGeneration / .TotalGeneration / .Temperature
goodwe-sems.0.Inverters.<serial>.PV1..4.Voltage / .Current
goodwe-sems.0.Inverters.<serial>.AC_L1..3.Voltage / .Current / .Frequency
goodwe-sems.0.Inverters.<serial>.Battery.SOC / .Power / .Voltage / .Current / .Temperature / .MaxChargeCurrent / .MaxDischargeCurrent
                                            (only with the "Fetch battery data" option enabled AND an attached battery)
```

如果有两个逆变器（就像最初设计此适配器时所要求的那样），则会自动创建两个 `Inverters.<serial>.*` 分支 - 该数字不是硬编码的，而是完全由门户网站为配置帐户返回的内容驱动的。

门户网站提供的字段，但此适配器（尚未）知道的字段不会丢失：启用调试选项后，完整的原始响应最终会保存在 `info.rawResponse` (JSON) 中，因此可以通过 PR 进行检查和添加（如果需要）。

## 错误处理、退避和速率限制
- 每个轮询周期都完全包含在 try/catch 中；单个故障永远不会永久停止轮询循环。
- 专用错误类（`SemsAuthError`、`SemsRateLimitError`、`SemsNetworkError`、`SemsProtocolError`）驱动特定行为：
- **速率限制（`GY0429`）** -> 立即暂停（默认 300 秒），`info.rateLimited = true`。
- **登录失败** -> 指数退避（上限为 1 小时），以避免错误的凭据给帐户带来额外的压力。
- **网络/协议错误** -> 适度退避。
- 在连续发生一定次数的故障（默认为 3 次）后，工厂将被视为“离线”，如果启用此功能，则会触发 Pushover 通知。
- 所有内容还会以结构化的方式写入 ioBroker 日志（根据严重程度，日志会以 `error`/`warn`/`debug` 的形式显示）。

## Pushover 通知
可配置为三种模式：

1. **通过现有的 `ioBroker.pushover` 实例** (`sendTo`) - 推荐，无需重复管理凭证。
2. **直接通过 Pushover API**（您自己的用户密钥 + API/应用程序令牌，以加密形式存储） - 无需单独的 Pushover 实例即可工作。
3. **两者同时进行。**

触发条件：SEMS 登录失败、SEMS 速率限制、长时间中断、意外适配器错误——每个条件均可单独切换。内部冷却时间（默认每个类别 1 小时）可防止在问题持续期间发送垃圾邮件。

## 安全与隐私
- SEMS 密码和 Pushover API 令牌在 `io-package.json` 的根目录下被标记为 `encryptedNative`/`protectedNative`，并由 ioBroker 加密存储，永远不会以明文形式记录（帐户名在日志消息中被屏蔽，例如 `st***@gmail.com`）。
- 该适配器仅执行**只读**访问（`GetMonitorDetailByPowerstationId`、`GetPowerStationIdByOwner`）。特意**没有**远程控制/写入功能（`SaveRemoteControlInverter`）——因为这会带来更大的安全风险和责任风险，而且并非设计需求的一部分。
- HTTP 访问无需第三方依赖：使用 Node.js >=22 内置的 `fetch` 而不是额外的 HTTP 库 - 攻击面更小，供应链风险更低。
- 登录响应返回的 API 基本 URL 会在任何进一步请求使用之前进行验证（仅限 GoodWe 拥有的域上的 HTTPS），因此篡改后的登录响应无法将会话令牌重定向到外国主机。
- 所有网络错误均以类型化的方式捕获；永远不会执行来自 API 响应的任何未经检查的数据（任何地方都不会使用 `eval`、`Function` 和类似函数）。

＃＃ 发展
```
npm install
npm run lint
npm test          # unit tests (lib/mapping.js, lib/semsApi.js, lib/notify.js) + package consistency check
```

建议在每次发布前额外执行：

```
npx @iobroker/repochecker@latest .
```

欢迎提交 Pull Request，特别是添加门户网站提供的更多字段（启用调试选项后请参阅 `info.rawResponse`）或改进翻译。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.0.8 (2026-08-25)

- New (opt-in, experimental): battery telemetry via GoodWe's separate, undocumented web-portal API (own login/session, device discovery via relatedDevices(), data via a BAT_SYS device's telemetry() endpoint). Reverse-engineered and verified field-by-field against real captured browser traffic (thanks to a tester's HAR capture!) from a GW8K-ET + LX battery system, including the gateway's SHA-256 signature scheme. Enable "Fetch battery data" to create Inverters.<sn>.Battery.SOC/Power/Voltage/Current/Temperature/MaxChargeCurrent/MaxDischargeCurrent - uses the same SEMS credentials already configured. Off by default, fully isolated from core monitoring. Also fixed the previous always-empty top-level Battery.SOC/Status states and the guessed-but-wrong per-inverter field names - no migration needed since these states were never actually created.

### 1.0.7 (2026-08-11)

- Fix E1009: Station.Latitude/Longitude used role "value.gps" (reserved for a combined "lon;lat" string) instead of the correct "value.gps.latitude"/"value.gps.longitude" roles, which support numeric values. Added an explicit startup migration so already-running installations get the corrected role, not just fresh installs.

### 1.0.6 (2026-08-11)

- Fix both findings from the follow-up review: added a default ("en") for the notificationLanguage select (was blank on fresh installs) and added pushoverUserKey to encryptedNative/protectedNative alongside pushoverApiToken for encryption at rest. No code changes needed - js-controller handles the encryption migration automatically.

### 1.0.5 (2026-08-09)

- Fix E5005 (false positive): a log message describing why the poll interval was capped contained the literal text "setTimeout(" as part of an explanatory sentence, which the checker's text-based scan flagged as if it were real code. The only actual setTimeout() call in the codebase was already this.setTimeout() (adapter-managed) - verified by running the checker's exact detection regex against every source file. Reworded the log message without changing its meaning. No functional changes.

### 1.0.4 (2026-08-09)

- Fix E3009 (26 errors from the automated Object Structure Check): the per-inverter AC_L1-3, PV1-4 and Battery sub-groups were missing their required intermediate channel object. _applyMonitorDetail() now ensures a channel for each sub-group that actually has at least one mapped state. No migration needed - these are new objects and self-heal on the next poll cycle after upgrading. Verified against a live daytime API response: 0 missing intermediate objects (was 26). No functional regressions.

### 1.0.3 (2026-08-09)

- Docs only: documented, based on a live daytime API response, that the SEMS+ gateway endpoint used by this adapter (GetMonitorDetailByPowerstationId) never returns a station timestamp or month-to-date generation/income/currency fields for any account - these are a permanent gap in the API itself, not a symptom of an incomplete/nighttime object dump as previously assumed during review. Battery/PowerFlow states are correctly created only when the portal actually reports that data for the plant. No code changes.

### 1.0.2 (2026-08-09)

- Fix all findings from the follow-up manual review: translated 6 previously missed German log messages in lib/semsApi.js, fixed a second duplicate German error message, and made _maskAccount() always return English. Implemented proper multi-language support for Pushover notification text (new notificationLanguage config option, English/German, default English). Added a hard ceiling (86400s) on the poll interval to prevent a setTimeout() integer overflow. Corrected the unit of info.activePollInterval from "s" to "sec" as required by the value.interval role. Since js-controller does not reliably re-sync instanceObjects common properties on every adapter update across all versions in the field (see https://github.com/ioBroker/ioBroker.js-controller/issues/769), the unit fix is also applied via an explicit migration on every adapter start, so already-running installations get the corrected value, not just fresh installs. No functional regressions.

### 1.0.1 (2026-08-08)

- Fix: translated all German log messages to English (this.log.*() calls in main.js, the internal log callback in lib/semsApi.js, and lib/notify.js). The internal Pushover notification log line in Notifier.notify() no longer embeds the (intentionally German-language) push title/message into the log entry. Also translated the underlying SemsAuthError/SemsProtocolError/SemsNetworkError messages to English, since those flow into log lines via error.message. The actual Pushover push notification text intentionally stays German. No functional changes.

### 1.0.0 (2026-07-22)

- (Stefan Bühler) First stable release: the adapter has been running reliably against the SEMS+ gateway API in production for several release cycles. This release is metadata only - fixed `common.news` translations for 0.1.15-0.1.19 (some languages were untranslated copies of the English text - flagged by the repochecker as E1144), added a Buy Me a Coffee link next to the PayPal donate badge, and standardized copyright/author metadata. No functional changes.

### 0.1.19 (2026-07-20)

- (Stefan Bühler) removed the classic, version-prefixed `GetMonitorDetailByPowerstationId` endpoint (tried as `/v3`, `/v2`, `/v1` since 0.1.14/0.1.15) entirely - GoodWe has retired it, every account observed during development 404s on all three versions unconditionally. `getMonitorDetail()` now calls the SEMS+ gateway API (introduced in 0.1.16) directly, making every poll cycle faster and avoiding pointless failing requests
- (Stefan Bühler) fix: the gateway session was never automatically refreshed once it expired server-side - the adapter creates a single long-lived API client at startup and reuses its session indefinitely, and unlike the (now removed) classic path, the gateway request helper never re-logged in on a stale session. This caused the adapter to fail permanently after a few hours (confirmed by a real account: worked in the evening, failed every single poll cycle the entire next day) until manually restarted. Every gateway call now automatically re-logs in once and retries on any error before giving up
- (Stefan Bühler) 5 updated/new regression tests (45 unit tests in total) covering the simplified direct-gateway call and the automatic re-login-and-retry behavior (including giving up correctly after exactly one retry)

### 0.1.18 (2026-07-19)

- (Stefan Bühler) fix: SEMS+ login still got rejected with `code=C0602 "account_login_abnormal"` even after the host fix in 0.1.17, because the adapter identified itself as the iOS app (`User-Agent: PVMaster/...`, token `client: "ios"`) - but the called endpoint (`eu-semsplus.goodwe.com`) is, per the real browser capture, only ever used by the SEMS+ *web* client, sending `client: "semsPlusWeb"`, a browser User-Agent, and `Origin`/`Referer` headers. The login call now builds its own matching header identity for just that one request; every other (classic/legacy) endpoint keeps using the established iOS identity, unchanged
- (Stefan Bühler) 1 tightened regression test verifying the login call's client identity and headers

### 0.1.17 (2026-07-19)

- (Stefan Bühler) fix: SEMS+ login failed for some accounts (`code=C0602 "account_login_abnormal"`) because the adapter called the global endpoint (`semsplus.goodwe.com`) instead of the EU-regional one (`eu-semsplus.goodwe.com`). Confirmed via a real browser HAR capture: the identical request body and password hash succeeded against the regional host. Deliberately implemented **without** a host-fallback loop - repeatedly retrying the same credentials against multiple hosts looks like credential stuffing to the backend and risks a real account lockout
- (Stefan Bühler) the login request now also sends the `x-signature` header (matching real browser traffic exactly), and a genuine SEMS+ session token is now correctly accepted by the gateway API introduced in 0.1.16 - previously, the gateway fallback only ever received a Legacy-CrossLogin-derived token, which the gateway rejected with the same C0602 error since it isn't a real SEMS+ session
- (Stefan Bühler) 1 updated regression test verifying the exact login URL and the presence of the login-time signature header

### 0.1.16 (2026-07-19)

- (Stefan Bühler) major finding: some accounts whose SEMS+ login is rejected and fall back to the legacy CrossLogin API do not end up on the classic `semsportal.com`-style backend at all - they get a session for a completely different, modern microservice API ("SEMS+ gateway", `eu-gateway.semsportal.com`), which explains why `GetMonitorDetailByPowerstationId` could never succeed under any of the `v1`/`v2`/`v3` paths tried in 0.1.14/0.1.15. Confirmed via a real account's browser HAR capture (`eu-semsplus.goodwe.com`) showing the actual endpoints in use (`sems-plant/api/stations/...`, `sems-plant/api/equipments/<sn>/telemetry`, etc.)
- (Stefan Bühler) the gateway API additionally requires every request to carry a computed `x-signature` header or it is silently rejected. The signature scheme (`base64(sha256(`${ts}@${uid}@${token}`) + "@" + ts)`) was reverse-engineered empirically from ~230 real request/response pairs captured from the web app - 100% match, no exceptions
- (Stefan Bühler) `getMonitorDetail()` now automatically falls back to this gateway API (station basic info, device list, per-device telemetry/telecounting) when all three classic paths 404, and reshapes the result into the same `info`/`kpi`/`inverter[]` shape the rest of the adapter already expects - no changes needed in the mapping/state-creation layer
- (Stefan Bühler) deliberately conservative first version: only fields with a confirmed unit/shape are populated (current power, today's/total generation, per-inverter AC/PV/temperature values); the station-level power-flow split (PV/load/grid/battery) is not populated yet, since every real-account capture so far happened at night and returned an empty object for it
- (Stefan Bühler) 2 new regression tests (47 unit tests in total), including one that verifies the actual signature computation against the real, reverse-engineered formula

### 0.1.15 (2026-07-19)

- (Stefan Bühler) fix: 0.1.14's v3→v2 fallback for `GetMonitorDetailByPowerstationId` was insufficient - a real-world account's legacy-login backend returned `404 Route Not Found` for **both** the `v2` and `v3` paths. Community references disagree on which version is correct (pygoodwe hardcodes `v2`, a separate 2023 write-up uses `v1`, our own traffic inspection observed `v3`), so `getMonitorDetail()` now tries all three versions in sequence (`v3` → `v2` → `v1`) and uses whichever one doesn't 404
- (Stefan Bühler) diagnostics: debug logs now include the full request URL (including the resolved API base) instead of just the relative path, and the login success log now also prints the resolved API base, making it possible to see exactly which host+path combination is failing
- (Stefan Bühler) 2 updated/new regression tests (45 unit tests in total) covering the three-way version fallback and the case where all three paths fail

### 0.1.14 (2026-07-19)

- (Stefan Bühler) fix: `GetMonitorDetailByPowerstationId` returned `404 Route Not Found` for accounts whose SEMS+ login is rejected (observed: `code=C0602`) and that fall back to the legacy CrossLogin API - that backend serves the endpoint under the `v2` API path, not `v3`. Root cause found via a real account's debug log plus the community reference implementation [pygoodwe](https://github.com/yaleman/pygoodwe), whose legacy-only client hardcodes the `v2` path. `getMonitorDetail()` now tries `v3` first and automatically retries once with `v2` on a detected 404, so both backend variants work without any user-facing configuration change
- (Stefan Bühler) fix: error messages now also surface the API's `error_msg` field (previously silently dropped, resulting in an uninformative "unbekannter Fehler" even when the response body contained a clear error description)
- (Stefan Bühler) 2 new regression tests (44 unit tests in total) covering the v3→v2 fallback and the case where both paths fail

### 0.1.13 (2026-07-19)

- (Stefan Bühler) diagnostics: log the raw JSON envelope of every SEMS API call at debug level, not just the monitor-detail call. Real-account testing surfaced a `SEMS-API-Fehler: ... GetPowerStationIdByOwner ... unbekannter Fehler (code=undefined)` report - the success/error code convention this adapter assumes (`code: 0`/`"0"`/`"00000"`) was only ever validated against test fixtures, not this specific endpoint on a live account. This logging is the fastest way to see the actual response shape and fix the real bug without needing access to anyone's SEMS credentials

### 0.1.12 (2026-07-19)

Further fixes from a repochecker recheck on the `ioBroker.repositories` listing PR:

- (Stefan Bühler) **[E2004]** removed the `0.1.10` entry from `common.news` in `io-package.json` - that version's CI failed before the deploy step, so it was never actually published to npm
- (Stefan Bühler) **[S3014]** declared `needs: check-and-lint` on the `adapter-tests` job so it only runs after linting succeeds
- (Stefan Bühler) **[W0066]** pinned `@types/node` to `^22` (was the open-ended `>=22`, which could resolve to a newer major with mismatched typings)
- (Stefan Bühler) **[W4040]/[W4042]** fixed the JSON schema associations in `.vscode/settings.json`: `fileMatch` entries must not have a leading slash, and the jsonConfig schema must also match `admin/jsonCustom.json` and `admin/jsonTab.json`
- (Stefan Bühler) **[S8913]** added `.github/workflows/automerge-dependabot.yml` (using `iobroker-bot-orga/action-automerge-dependabot@v1`) and `.github/auto-merge.yml` so patch updates (and minor updates for dev dependencies) from Dependabot are merged automatically

### 0.1.11 (2026-07-19)

- (Stefan Bühler) fixed a real CI break introduced in 0.1.10: removed Node.js 20.x from the `adapter-tests` matrix in `.github/workflows/test-and-release.yml`. It is incompatible with `engines.node >=22` (also introduced in 0.1.10) once the official `ioBroker/testing-action-adapter@v1` action runs `npm ci` with `engine-strict` enabled, which crashed that matrix job and cancelled every other job via fail-fast

### 0.1.10 (2026-07-19)

Second round of fixes, addressing further findings from a stricter automated `@iobroker/repochecker` recheck on the `ioBroker.repositories` listing PR:

- (Stefan Bühler) **[W0028]** raised `engines.node` to `>=22`
- (Stefan Bühler) **[W0063]** removed `chai`, `chai-as-promised`, `mocha`, `sinon` from devDependencies (already provided by `@iobroker/testing`)
- (Stefan Bühler) **[S0065]/[S0085]/[S0087]** added `@types/node`, `@tsconfig/node22` and `/tsconfig.json` for editor type-checking support
- (Stefan Bühler) **[S5026]** added the `@alcalzone/release-script-plugin-manual-review` release plugin
- (Stefan Bühler) **[W3013]/[W3015]/[W3017]** rewrote `.github/workflows/test-and-release.yml` to use the official shared `ioBroker/testing-action-check@v1`, `ioBroker/testing-action-adapter@v1` and `ioBroker/testing-action-deploy@v1` GitHub Actions instead of hand-written steps
- (Stefan Bühler) added `test/integration.js` (adapter startup smoke test via `@iobroker/testing`'s integration harness) so `npm run test:integration` succeeds
- (Stefan Bühler) **[E1032]** trimmed `common.news` in `io-package.json` to the 7 entries kept by the repository builder
- (Stefan Bühler) **[E5512]** added the required `size` property to the Pushover section header in `admin/jsonConfig.json`
- (Stefan Bühler) **[S5601]** migrated `admin/i18n` from the long `{lang}/translations.json` format to the short `{lang}.json` format
- (Stefan Bühler) **[S4036]** added `.vscode/settings.json` with JSON schema associations for `io-package.json` and `admin/jsonConfig.json`
- (Stefan Bühler) **[S8901]** added `.github/dependabot.yml` (npm + github-actions, weekly, with a cooldown and an `@types/node` major/minor ignore rule)

### 0.1.9 (2026-07-19)

Addressed the stricter automated `@iobroker/repochecker` findings surfaced on the `ioBroker.repositories` listing PR:

- (Stefan Bühler) **[E1057]** moved `encryptedNative`/`protectedNative` from `common` to the `io-package.json` root, matching the current schema
- (Stefan Bühler) **[E3009]/[E3010]/[E3011]/[E3012]** raised `engines.node` to `>=20`, `@iobroker/adapter-core` to `^3.4.1`, `js-controller` dependency to `>=6.0.11`, `admin` globalDependency to `>=7.6.20`
- (Stefan Bühler) **[E3040]** updated devDependencies (`@iobroker/adapter-dev`, `@iobroker/testing`, mocha, esbuild and others) to current major versions
- (Stefan Bühler) **[E3000-series]** rewrote `.github/workflows/test-and-release.yml` to the current official template: renamed jobs (`check-and-lint`, `adapter-tests`, `adapter-check`, `deploy`), full OS/Node test matrix (ubuntu/windows/macos x 20/22/24), `concurrency` group, deploy job pinned to Node 24
- (Stefan Bühler) **[E5005]** replaced global `setTimeout`/`clearTimeout` with adapter-managed timers (`adapter.setTimeout`/`adapter.clearTimeout`) in `lib/notify.js` and `lib/semsApi.js`
- (Stefan Bühler) **[E5043]** switched to `require("node:crypto")`
- (Stefan Bühler) **[E5507]/[E5510]/[E5512]/[E5612]** fixed `admin/jsonConfig.json`: added missing `lg`/`xl` responsive sizes on every item, replaced a literal label string with a proper i18n key (`loginTab`, added to all 11 translation files)
- (Stefan Bühler) **[E6004]/[E6015]/[W0037]/[W0076]** translated `README.md` to English (required language), moved the previous German content to `README.de.md`, added `CHANGELOG_OLD.md` for older entries
- (Stefan Bühler) **[W9501]** removed the redundant `.npmignore` (superseded by package.json `files`)
- (Stefan Bühler) **[E9006]** added `.commitinfo` to `.gitignore`
- (Stefan Bühler) **[S4036]/[S5026]** added `prettier.config.mjs`, re-formatted the codebase, disabled `jsdoc/reject-any-type` for the opaque Node timer-handle type with a justifying comment

### 0.1.8 (2026-07-19)

Addressed ioBroker adapter-check findings:

- (Stefan Bühler) **[E254]** removed changelog entries for 0.1.1/0.1.2 - those tags were pushed but their npm-publish CI job failed at the time (missing `NPM_TOKEN` / npm CLI too old for OIDC), so the versions never existed on npm
- (Stefan Bühler) **[W132]** this automatically brought the entry count under the repository builder's 7-entry truncation limit for `common.news`
- (Stefan Bühler) **[W184]** removed deprecated `common.title` (superseded by `common.titleLang`) and deprecated/ignored `common.main` (the entry point comes from `package.json`)
- (Stefan Bühler) **[W034]** raised `@iobroker/adapter-core` from ^3.1.6 to ^3.2.2
- (Stefan Bühler) **[W173]/[W174]/[E999]/[W401]**: `password` was already correctly listed in `encryptedNative`/`protectedNative` (verified against the published tarball) - these findings, together with the global axios 404 when fetching `sources-dist-latest.json`, are side effects of the adapter not yet being listed in the official ioBroker repository

### 0.1.7 (2026-07-19)

- (Stefan Bühler) branding: replaced the placeholder icon with the official GoodWe logo (used with permission from GoodWe)

### 0.1.6 (2026-07-18)

- (Stefan Bühler) updated the dev toolchain: mocha 11, sinon 22, @alcalzone/release-script 5, @iobroker/eslint-config 2; remaining transitive CVEs (adm-zip, diff, esbuild, serialize-javascript) resolved via npm `overrides` - `npm audit`: 0 vulnerabilities (including dev dependencies)

Security/quality audit (security tester, maintainer review, fuzzing of the mapping layer):

- (Stefan Bühler) **Security:** inverter serial numbers from the (untrusted) portal response are sanitized before becoming part of ioBroker object IDs (prevents broken/unexpectedly nested object trees caused by special characters such as `.` `*` `]`)
- (Stefan Bühler) **Security:** the API base URL returned by the login server is validated - HTTPS on GoodWe-owned domains only (`*.semsportal.com`, `*.goodwe.com`), otherwise falls back to the known regional URL. A manipulated login response can no longer redirect the session token to a foreign host
- (Stefan Bühler) **Fix:** `null`/broken entries in the portal's `inverter[]` array crashed the entire poll cycle - now skipped, healthy inverters from the same response are still processed
- (Stefan Bühler) **Fix:** numbers in scientific notation (`"1e5"`) were parsed incorrectly (yielded 15 instead of 100000)
- (Stefan Bühler) **Fix:** obviously invalid portal timestamps (`99/99/9999 ...`) produced absurd epoch values via JavaScript's `Date` rollover behaviour - now rejected
- (Stefan Bühler) **Fix:** automatic plant discovery now filters out entries without a usable ID (previously caused permanently failing poll cycles)
- (Stefan Bühler) **Robustness:** no more state writes after adapter unload; the `adapterError` notification dedupe window is also reset after recovery
- (Stefan Bühler) 14 new regression tests (42 unit tests in total); `npm audit`: 0 vulnerabilities in production dependencies (remaining findings were dev-toolchain only)

### 0.1.5 (2026-07-18)

- (Stefan Bühler) fix: corrected the PayPal donation link in the README (button link instead of the old donate link)

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