---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.volvo/README.md
title: ioBroker.volvo
hash: AAbv6DdI6q3l3O0pGuWeABqjhcpSqk9CYVIsdu4dO+g=
---
![标识](../../../en/adapterref/iobroker.volvo/admin/volvo.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.volvo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.volvo.svg)

# IoBroker.volvo
## 适用于 ioBroker 的沃尔沃汽车适配器
此适配器使用 [沃尔沃互联汽车 API（https://developer.volvocars.com/apis/）和能源 API v2](https://developer.volvocars.com/apis/energy/v2/overview/) 将您的沃尔沃汽车连接到 ioBroker。

### 支持的功能
- 🔋 电池电量、纯电续航里程、充电状态（插电式混合动力/纯电动汽车）
- ⛽ 油量、里程表读数、行程统计
- 🚪 门、窗和锁的状态
- 📍 GPS定位
- 🔧 诊断（保养警告、刹车油、机油、轮胎、灯光）
- 🔑 远程指令（锁定/解锁、鸣笛、闪灯、空调控制）
- 🔄 按可配置的时间间隔自动刷新数据
- 🔐 令牌持久性 — 无需重新登录即可在适配器重启后保留令牌

---

## 安装指南
### 1. 获取 VCC API 密钥
1. 前往 [developer.volvocars.com](https://developer.volvocars.com/account/) 并登录（Google 或 GitHub 帐户）。
2. 创建一个新的**应用程序**。
3. 复制 **VCC API 密钥（主密钥）**。

![VCC API密钥](../../../en/adapterref/iobroker.volvo/vccapikey.png)

### 2. 配置适配器
1. 打开 ioBroker 中的适配器设置。
2. 输入您的 **Volvo ID 电子邮件** 和 **密码**（与您在 Volvo Cars 应用程序中使用的凭据相同）。
3. 粘贴 **VCC API 密钥**。
4. 设置**更新间隔**（默认值：5 分钟）。

### 3. 使用一次性密码登录
沃尔沃 API 使用双因素身份验证流程，并结合一次性密码 (OTP)：

1. 在适配器设置中点击**“开始登录（发送 OTP）”**。
2. 查看您的电子邮件，获取来自沃尔沃的 OTP 验证码。
3. 输入验证码并点击“提交验证码”。
4. 适配器将存储刷新令牌，因此除非令牌过期（通常为几周/几个月），否则您无需重复此操作。

> **注意：**如果刷新令牌过期，适配器将在日志中显示警告。只需在适配器设置中重新进行 OTP 登录即可。

---

## 数据点
适配器在 `volvo.0.<VIN>` 下创建以下数据点结构：

| 路径 | 描述 |
|---|---|
| `energy.batteryChargeLevel.*` | 电池电量（%），更新时间戳 |
| `energy.chargingStatus.*` | 充电状态（空闲、充电中等） |
| `energy.chargerConnectionStatus.*` | 充电器连接（已连接，已断开） |
| `status.doors.*` | 车门状态（开/关），中央门锁 |
| `status.windows.*` | 车窗状态（包括天窗） |
| `status.fuel.*` | 燃油量（升） |
| `status.odometer.*` | 里程表读数（公里） |
| `status.diagnostics.*` | 服务警告，距离/服务时间 |
| `status.statistics.*` | 燃油/能源消耗，行程表 |
| `status.engine-status.*` | 引擎运行状态 |
| `status.warnings.*` | 灯光警告（刹车灯、雾灯、转向灯等） |
| `location.*` | GPS坐标、航向、时间戳 |
| `remote.*` | 远程命令（按钮） |
| `remote.*` | 远程命令（按钮） |

远程命令
使用 `volvo.0.<VIN>.remote` 下方的按钮来控制您的车辆：

- `lock` / `unlock` — 锁定或解锁汽车
- `climatization-start` / `climatization-stop` — 启动或停止预处理
- `honk` / `flash` / `honk-flash` — 鸣笛、闪光灯或两者兼有
- `lock-reduced-guard` — 具有简化保护的锁
- `刷新` — 手动刷新所有数据

---

## Changelog

### 2.0.0
- BREAKING CHANGE: API key now stored encrypted, reenter of API key **required**

### 1.0.5
- Fix: restart-resilient OTP login flow — auth state persists across adapter restarts

### 1.0.4
- Fix: 404 errors for location/energy/vehicle endpoints handled gracefully (GPS off, non-EV vehicles)

### 1.0.3
- Fix: adapter no longer terminates on first start without stored token
- Fix: removed manual password decrypt (now handled by `encryptedNative`)
- Fix: full try-catch in `onReady()` prevents crashes on startup errors

### 1.0.2
- Fix: adapter stays alive waiting for OTP login when no token stored
- Fix: better startup log messages explaining next steps
- Fix: CI deploy job upgraded to Node 24 (resolves `promise-retry` error)

### 1.0.1
- Fix: multi-language support (ru, pt, nl, fr, it, es, pl, uk, zh-cn)
- Fix: jsonConfig admin UI size attributes for all breakpoints
- Fix: `protectedNative` / `encryptedNative` for sensitive fields
- Fix: OTP/sendTo message handlers null-safe
- Chore: added dependabot, `@iobroker/adapter-dev`, `@iobroker/eslint-config`
- Chore: CI `adapter-tests` now runs after linting
- Chore: migrated `.npmignore` to `package.json` `files`

### 1.0.0 🎉

First stable release — complete rewrite of the Volvo ioBroker adapter.

**New Features:**
- **Vehicle Details**: Model, year, color and images fetched from API
- **Retry Logic**: Automatic retry with exponential backoff on API errors (429/5xx)
- **Command Status Tracking**: Polls async command results (up to 5x) and stores status in `lastCommandStatus`
- **Auto-Refresh after Commands**: Doors auto-refresh after lock/unlock, engine-status after climatization
- **Last Update Timestamp**: `lastUpdate` state per vehicle shows last successful data fetch
- **Admin UI: jsonConfig Migration**: Modern React-based settings UI (Admin5) with i18n support
- **Admin UI: Connection Test**: Test API connection directly from adapter settings
- **Admin UI: Vehicle Info**: Display vehicle details from settings page

**Versioning Policy (SemVer):**
- MAJOR: Breaking changes (config changes, removed states, new minimum Node.js)
- MINOR: New features (new data points, commands, UI features)
- PATCH: Bug fixes, dependency updates, cleanup

### 0.2.7

- Extracted inline JavaScript from `admin/index_m.html` into separate `admin/index_m.js`
- Added ESLint config for admin browser JS (jQuery/browser globals)

### 0.2.6

- Removed obsolete files: `.create-adapter.json` (wrong adapter name), `lib/tools.js` (unused), `.prettierrc.js`/`.prettierignore` (Prettier not installed)
- Updated `.npmignore` (removed references to deleted `.eslintrc.json`)
- Updated CI workflow: dropped Node 18 (EOL), testing on Node 20 + 22

### 0.2.5

- Updated all dependencies to latest major versions
- @alcalzone/release-script 3.7 → 5.1, eslint 9 → 10, @iobroker/testing 5.0 → 5.2

### 0.2.4

- Migrated from ESLint 8 to ESLint 9 (flat config) — fixes CVE-2025-50537
- Removed deprecated `.eslintrc.json` and `.eslintignore`

### 0.2.3

- Fixed all npm audit vulnerabilities (0 remaining)
- Added npm overrides for serialize-javascript, diff, esbuild

### 0.2.2

- Fixed ESLint lint error (single quotes)
- Removed credentials and IPs from AGENTS.md, added discovery instructions
- Updated devDependencies: @iobroker/testing 5.2, @types/node 25.5, eslint 8.57

### 0.2.1

- Fixed refresh token not being preserved across token refreshes (caused 401 errors after ~25 minutes)
- Removed dead legacy code: old VOC API (`vocapi.wirelesscar.net`), `request` module, `uuid`, `json-bigint`
- Updated dependencies: axios 1.14, qs 6.15, json2iob 2.6.22, @iobroker/adapter-core 3.3
- Added update migration notice for users upgrading from pre-0.2.0 versions
- Removed unused `newApi` config option from io-package.json

### 0.2.0

- **Complete rewrite of authentication**: Replaced dead `grant_type: password` OAuth flow with new multi-step OTP (one-time password) login via PingFederate
- **All API endpoints updated to v2**: Vehicle list (`connected-vehicle/v2`), Energy (`energy/v2`), Commands (`connected-vehicle/v2/commands`)
- **Fixed remote commands**: Changed `Content-Type` from deprecated vendor-specific format to `application/json` (was causing HTTP 415 errors)
- **Fixed refresh button**: Now triggers a data re-fetch instead of sending an invalid API command (was causing HTTP 404)
- **Buttons are now proper buttons**: Remote controls use `role: button` with auto-reset instead of toggle booleans
- **Fixed Energy API parsing**: `batteryChargeLevel`, `electricRange`, `chargingStatus` etc. now update correctly (v2 response format differs from v1)
- **Added OTP login UI** in adapter settings with step-by-step flow
- **Added token persistence**: Refresh token stored in ioBroker state, survives adapter restarts
- **Removed dead code**: Old VOC API (`vocapi.wirelesscar.net`), `extended-vehicle/v1`, `energy/v1`, `newApi` checkbox — all removed
- **Admin UI localized**: English + German via `words.js`
- **Updated README** with new setup guide

### 0.1.2 (2024-05-02)

- Added support for v2 API

### 0.1.1

- Added location API information

### 0.1.0

- (TA2k) Add new API for electric cars

### 0.0.6

- (TA2k) Fix trip object naming

### 0.0.5

- (TA2k) Fix receiving data

### 0.0.4

- (TA2k) Fix jscontroller

### 0.0.3

- (TA2k) Fix preclimate

### 0.0.2

- (TA2k) Initial release

## License

MIT License

Copyright © 2020-2026 TA2k <tombox2020@gmail.com>

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