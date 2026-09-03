![Logo](admin/goodwe-sems.png)

*[Auf Deutsch lesen](README.de.md)*

# ioBroker.goodwe-sems

[![NPM version](https://img.shields.io/npm/v/iobroker.goodwe-sems.svg)](https://www.npmjs.com/package/iobroker.goodwe-sems)
[![Downloads](https://img.shields.io/npm/dm/iobroker.goodwe-sems.svg)](https://www.npmjs.com/package/iobroker.goodwe-sems)
![Test and Release](https://github.com/bueste/ioBroker.goodwe-sems/actions/workflows/test-and-release.yml/badge.svg)
[![Donate](https://img.shields.io/badge/Donate-PayPal-00457C?style=flat&logo=paypal&logoColor=white)](https://www.paypal.com/ncp/payment/TT6MTBLXX9L9U)
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/stefanbuehler)

Reads inverter, battery and power-flow data from the **[GoodWe](https://www.goodwe.com) [SEMS Portal](https://www.semsportal.com) (cloud)** - for installations that (e.g. because there is no LAN access to the inverter) **cannot** be polled with the local [ioBroker.goodwe](https://github.com/FossyTom/ioBroker.goodwe) adapter (Modbus/UDP, port 8899).

Login uses your **normal SEMS Portal account** (the same one you use at semsportal.com / in the SEMS app). A GoodWe "organization"/OpenAPI account is **not** required.

## Table of contents

- [Why this adapter?](#why-this-adapter)
- [API origin and limitations (please read)](#api-origin-and-limitations-please-read)
- [Installation](#installation)
- [Configuration](#configuration)
- [Object/state structure](#objectstate-structure)
- [Error handling, backoff and rate limits](#error-handling-backoff-and-rate-limits)
- [Pushover notifications](#pushover-notifications)
- [Security & privacy](#security--privacy)
- [Development](#development)
- [Changelog](#changelog)
- [License](#license)

## Why this adapter?

GoodWe ET/EH/BH/BT inverters can normally be read out locally via Modbus/UDP (see [ioBroker.goodwe](https://github.com/FossyTom/ioBroker.goodwe)). If there is no LAN access to the inverter (e.g. because only a WLAN/LTE stick is connected to the SEMS Portal and the target network is otherwise unreachable), the only remaining option is the cloud detour via the **[SEMS Portal](https://www.semsportal.com)** ([GoodWe](https://www.goodwe.com)) that the installation is already being monitored through anyway.

## API origin and limitations (please read)

GoodWe officially offers three APIs (see the [GoodWe API technical document](https://community.goodwe.com/solution/API)):

- **OpenAPI** - only for SEMS *organization* accounts, requires activation by GoodWe.
- **Real-time Data Monitoring API** - for third parties, requires a license agreement plus a device whitelist.
- **Batch Remote Control Interface** - Kafka-based, remote control only.

None of these are accessible with a **normal** SEMS Portal account (the kind most private users have). This adapter instead speaks the same **undocumented HTTPS API** that the official SEMS app/website itself uses (login via `CrossLogin`/`SEMS+ cross-login`, data retrieval via `GetMonitorDetailByPowerstationId`). These endpoints have not been released or documented by GoodWe for third-party use; the implementation is based on independent traffic analysis as well as the following open-source reference projects:

- [pygoodwe](https://github.com/yaleman/pygoodwe) (MIT)
- [goodwe-sems-home-assistant](https://github.com/TimSoethout/goodwe-sems-home-assistant)
- [openHAB SEMSPortal binding](https://www.openhab.org/addons/bindings/semsportal/)

**Consequences:**

- GoodWe can change the API at any time without notice - the adapter may (temporarily) break as a result.
- There is **no documented real-time/push mechanism** (websocket/SignalR) for third parties. An `msgSocketAdr` field appears in some older login responses but is not actually used by any of the reference projects above - using it would be pure reverse engineering without reliable documentation and a significantly higher risk (account lockout, unstable connection). This adapter therefore deliberately polls over HTTPS at a configurable interval (default 5 minutes) instead of faking an untested websocket connection.
- A **rate-limit code (`GY0429`)** has been observed (documented, among others, in the Home Assistant integration). The adapter recognizes this code and automatically pauses (default 5-minute cool-down) instead of endangering the account with repeated requests.
- Use at your own risk, see [LICENSE](LICENSE) (MIT, no warranty).

**Fields not returned by this endpoint:** verified against a live daytime response, the `GetMonitorDetailByPowerstationId` gateway response used by this adapter does not include a station timestamp (`info.time`), nor month-to-date generation/income/currency fields (`kpi.month_generation`, `kpi.day_income`, `kpi.total_income`, `kpi.currency`). The corresponding states (`Station.PortalTimestamp`, `KPI.MonthGeneration`, `KPI.TodayIncome`, `KPI.TotalIncome`, `KPI.Currency`) are therefore never created for any account/time of day - this is a permanent gap in the gateway API itself, not a temporary absence during low-generation hours. `PowerFlow.*` states are created only when the portal actually returns power-flow data for the plant.

**Battery data (opt-in, experimental):** the gateway endpoint above does not include battery state of charge/power/voltage/etc. either, even for plants that do have a battery - GoodWe's own web portal (`semsplus.goodwe.com`) retrieves this via a *separate*, entirely different, undocumented API (session obtained via `cross-login`, device discovery via `relatedDevices`, data via a `BAT_SYS`-typed device's own `telemetry` endpoint). This was reverse-engineered and verified field-by-field against real captured browser traffic (HAR) from a GW8K-ET + LX battery system. If you enable the **"Fetch battery data"** option in the instance configuration, the adapter additionally calls this second API for every inverter that reports an attached `BAT_SYS` device, using the *same* SEMS credentials already configured (no separate login needed) - and creates `Inverters.<sn>.Battery.SOC/Power/Voltage/Current/Temperature/MaxChargeCurrent/MaxDischargeCurrent`.

This is **more fragile and less certain than the rest of the adapter**: it is a second, independently-authenticated, undocumented, signed API that GoodWe could change, rate-limit, or block without notice, entirely separately from the main monitoring API above. It is therefore off by default. If it stops working, the rest of the adapter (PV generation, KPIs, inverter telemetry) is unaffected - a battery-telemetry failure is caught and logged at debug level per inverter, never thrown.

## Installation

Once this adapter is listed in the official ioBroker adapter repository, install it the normal way: **Admin -> Adapters -> search for "goodwe-sems" -> install**.

Until then, an ioBroker administrator can add it manually on the ioBroker host:

```
iobroker url iobroker.goodwe-sems
```

## Configuration

| Field | Description |
|---|---|
| SEMS account / password | Same credentials as at semsportal.com. The password is stored encrypted by ioBroker. |
| Plant ID (optional) | Leave empty for automatic detection (`GetPowerStationIdByOwner`). For accounts with several plants: copy the ID manually from the portal URL (`.../powerstation/powerstatussnmin/<ID>`). |
| Poll interval | Default 300 s. The adapter enforces a minimum of 60 s regardless of configuration. |
| Pushover | See [Pushover notifications](#pushover-notifications). |

## Object/state structure

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

With two inverters (as in the original requirement this adapter was built for), two `Inverters.<serial>.*` branches are created automatically - the number is not hardcoded, it is driven entirely by what the portal returns for the configured account.

Fields that the portal delivers but this adapter does not (yet) know about are not lost: with the debug option enabled, the full raw response ends up in `info.rawResponse` (JSON), so it can be inspected and added via PR if needed.

## Error handling, backoff and rate limits

- Every poll cycle is fully wrapped in try/catch; a single failure can never permanently stop the polling loop.
- Dedicated error classes (`SemsAuthError`, `SemsRateLimitError`, `SemsNetworkError`, `SemsProtocolError`) drive targeted behaviour:
  - **Rate limit (`GY0429`)** -> immediate pause (default 300 s), `info.rateLimited = true`.
  - **Login failure** -> exponential backoff (capped at 1 h) so that wrong credentials do not put additional strain on the account.
  - **Network/protocol errors** -> moderate backoff.
- After a configurable number of consecutive failures (default 3), the plant is considered "offline" and, if enabled, a Pushover notification is triggered.
- Everything is additionally written to the ioBroker log in a structured way (`error`/`warn`/`debug` depending on severity).

## Pushover notifications

Configurable in three modes:

1. **Via an existing `ioBroker.pushover` instance** (`sendTo`) - recommended, no duplicate credential management.
2. **Directly via the Pushover API** (your own user key + API/app token, stored encrypted) - also works without a separate Pushover instance.
3. **Both at the same time.**

Triggered on: SEMS login failure, SEMS rate limit, a prolonged outage, unexpected adapter error - each individually toggleable. An internal cool-down (default 1 h per category) prevents spam during ongoing issues.

## Security & privacy

- The SEMS password and the Pushover API token are marked as `encryptedNative`/`protectedNative` at the root of `io-package.json` and are stored encrypted by ioBroker, never logged in plain text (the account name is masked in log messages, e.g. `st***@gmail.com`).
- The adapter performs **read-only** access only (`GetMonitorDetailByPowerstationId`, `GetPowerStationIdByOwner`). There is deliberately **no** remote-control/write function (`SaveRemoteControlInverter`) - that would be a considerably larger security and liability risk and was not part of the requirement.
- No third-party dependency for HTTP access: the built-in `fetch` of Node.js >=22 is used instead of an additional HTTP library - a smaller attack surface, less supply-chain risk.
- The API base URL returned by the login response is validated (HTTPS on GoodWe-owned domains only) before any further request uses it, so a manipulated login response cannot redirect the session token to a foreign host.
- All network errors are caught in a typed way; no unchecked data from the API response is ever executed (`eval`, `Function`, and similar are not used anywhere).

## Development

```
npm install
npm run lint
npm test          # unit tests (lib/mapping.js, lib/semsApi.js, lib/notify.js) + package consistency check
```

Recommended additionally before every release:

```
npx @iobroker/repochecker@latest .
```

Pull requests are welcome, especially to add further fields delivered by the portal (see `info.rawResponse` with the debug option enabled) or to improve translations.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.0.9 (2026-08-26)

- Fix: remove the leftover top-level "Battery" channel that v1.0.8 no longer populates (reported by a tester after updating). Stopped creating it, and added a startup migration that removes it from already-running installations after confirming via getObjectListAsync() that it has no child objects.

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
