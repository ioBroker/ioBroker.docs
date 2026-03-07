---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.garmin/README.md
title: ioBroker.garmin
hash: yaL8xFKSqLKcVWPMRVmFiTfRRdQXLKGHBfBkGyJb+sA=
---
![标识](../../../en/adapterref/iobroker.garmin/admin/garmin.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.garmin.svg)
![下载](https://img.shields.io/npm/dm/iobroker.garmin.svg)
![安装数量](https://iobroker.live/badges/garmin-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/garmin-stable.svg)
![NPM](https://nodei.co/npm/iobroker.garmin.png?downloads=true)

# IoBroker.garmin
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.garmin/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 Garmin 适配器
Garmin Connect 适配器

# 登录
garmin 连接邮件和密码。

## Datenpunkt 过滤器（白名单）
适配器采用标准规格。允许名单中的内容可能是最好的日期。

### 筛选类型
|类型 |说明 |贝斯皮尔 |
| --------------- | ----------------------------------------------- | ------------------------------------------ |
| **准确的钥匙** | Exakte Uebereinstimmung nur mit Feldnamen | Exakte Uebereinstimmung nur mit Feldnamen | Exakte Uebereinstimmung nur mit Feldnamen `bmi` 找到 jedes Feld namens `bmi` |
| **搜索** |关键或 Pfad 中的 Teilstring-Suche | `heart` 查找`heartRate`、`restingHeart` |
| **搜索** |关键或 Pfad 中的 Teilstring-Suche | `heart` findet `heartRate`, `restingHeart` |

### 示例
**Nur bestimmte Feldnamen (ueberall):**

```text
Exact Keys: bmi, weight, bodyfat, bonemass
```

**Nur bestimmte Pfade:**

```text
Exact Paths: weight.dateweightlist.bmi, hydration.valueinml
```

**Alles aus einem Bereich:**

```text
Search: heart, sleep, stress
```

组合：

```text
Exact Keys: bmi
Exact Paths: hydration.valueinml
Search: sleep
```

### 说明
- 过滤器不区分大小写（Gross/Kleinschreibung egal）
- Pfade werden mit Punkt getrennt：`dailysleep.dailysleepdto.sleepscores.overall.value`
- **Wichtig**：Pfade OHNE Array-Indizes angeben（即“weight.dateweightlist.bmi”NICHT“weight.dateweightlist01.bmi”）。 Die Indizes (`01`, `02`, ...) 是 ioBroker hinzugefuegt 之前的版本。
- Leere 白名单 = alle Datenpunkte werdenangelegt
- Leere API-Antworten erzeugen keine Ordner

## 讨论和问题
<https://forum.iobroker.net/topic/59413/test-adapter-garmin>

## Garmin API 身份验证（开发者说明）
### OAuth 凭证
OAuth1 消费者凭证位于 Garmin Connect Mobile APK 的本机库`libsr.so` 版本中。

**萃取：**

```bash
# 1. APK von APKMirror oder APKPure laden (APKM/XAPK = Split APKs)
# 2. APKM umbenennen zu .zip und entpacken
# 3. Native library aus ARM64 Split extrahieren:
unzip split_config.arm64_v8a.apk lib/arm64-v8a/libsr.so -d /tmp/

# 4. Strings durchsuchen - alle Credentials sind kommasepariert in einem langen Block:
strings /tmp/lib/arm64-v8a/libsr.so | grep "apps.googleusercontent.com"
# Output enthält: google_client_id,google_secret,...,oauth1_key,oauth1_secret,GARMIN_CONNECT_MOBILE_ANDROID_DI,...
```

| 凭证 | 价值 |
| ---------------------- | -------------------------------------- |
| OAuth1 消费者密钥 | `fc3e99d2-118c-44b8-8ae3-03370dde24c0` |
| OAuth2 DI 客户端 ID | `GARMIN_CONNECT_MOBILE_ANDROID_DI` |
| OAuth2 DI 客户端 ID | `GARMIN_CONNECT_MOBILE_ANDROID_DI` |

加斯 S3 的替代方案：`https://thegarth.s3.amazonaws.com/oauth_consumer.json`

### 身份验证流程（移动 API）
1. SSO 登录：`POST https://sso.garmin.com/sso/signin` -> 服务单 (ST-xxxxx)
2. OAuth1 令牌：`POST https://connectapi.garmin.com/oauth-service/oauth/preauthorized?ticket=ST-xxxxx` -> oauth_token + oauth_token_secret (HMAC-SHA1 签名)
3. OAuth2 Token：`POST https://connectapi.garmin.com/oauth-service/oauth/exchange/user/2.0` -> access_token + refresh_token (Bearer)
4. 刷新令牌：`POST https://connectapi.garmin.com/di-oauth2-service/oauth/token` mit `grant_type=refresh_token&client_id=GARMIN_CONNECT_MOBILE_ANDROID_DI&refresh_token=...`
5. API 调用：`GET https://connectapi.garmin.com/...` 并附带请求头 `Authorization: Bearer {access_token}`

### API 端点
- `/userprofile-service/socialProfile`
- `/usersummary-service/usersummary/daily/?calendarDate=YYYY-MM-DD`
- `/wellness-service/wellness/...`
- `/activitylist-service/activities/...`

### 参考资料
- [garth](https://github.com/matin/garth) - 用于 Garmin Connect 的 Python 库
- 测试脚本：`test-api.js`（单点登录 + 令牌交换 + API 测试）

## Changelog
### 1.0.0 (2026-01-15)

- fix login and add datapoint filter

### 0.2.0 (2025-03-02)

- rework login process

### 0.0.4

- (TA2k) fix installation problems

### 0.0.3

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022-2030 TA2k <tombox2020@gmail.com>

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