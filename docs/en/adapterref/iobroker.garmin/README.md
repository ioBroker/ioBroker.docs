![Logo](admin/garmin.png)

# ioBroker.garmin

[![NPM version](https://img.shields.io/npm/v/iobroker.garmin.svg)](https://www.npmjs.com/package/iobroker.garmin)
[![Downloads](https://img.shields.io/npm/dm/iobroker.garmin.svg)](https://www.npmjs.com/package/iobroker.garmin)
![Number of Installations](https://iobroker.live/badges/garmin-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/garmin-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.garmin.png?downloads=true)](https://nodei.co/npm/iobroker.garmin/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.garmin/workflows/Test%20and%20Release/badge.svg)

## garmin adapter for ioBroker

Adapter for Garmin Connect

# Loginablauf

Die garmin connect Mail und Passwort eingeben.

## Datenpunkt Filter (Allowlist)

Der Adapter erzeugt standardmaessig viele Datenpunkte. Mit der Allowlist koennen gezielt nur bestimmte Datenpunkte angelegt werden.

### Filter Typen

| Typ             | Beschreibung                                    | Beispiel                                   |
| --------------- | ----------------------------------------------- | ------------------------------------------ |
| **Exact Keys**  | Exakte Uebereinstimmung nur mit Feldnamen       | `bmi` findet jedes Feld namens `bmi`       |
| **Exact Paths** | Exakte Uebereinstimmung mit vollstaendigem Pfad | `weight.dateweightlist.bmi`                |
| **Search**      | Teilstring-Suche in Key oder Pfad               | `heart` findet `heartRate`, `restingHeart` |

### Beispiele

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

**Kombination:**

```text
Exact Keys: bmi
Exact Paths: hydration.valueinml
Search: sleep
```

### Hinweise

- Filter sind case-insensitive (Gross/Kleinschreibung egal)
- Pfade werden mit Punkt getrennt: `dailysleep.dailysleepdto.sleepscores.overall.value`
- **Wichtig**: Pfade OHNE Array-Indizes angeben (z.B. `weight.dateweightlist.bmi` NICHT `weight.dateweightlist01.bmi`). Die Indizes (`01`, `02`, ...) werden erst von ioBroker hinzugefuegt.
- Leere Allowlist = alle Datenpunkte werden angelegt
- Leere API-Antworten erzeugen keine Ordner

## Diskussion und Fragen

<https://forum.iobroker.net/topic/59413/test-adapter-garmin>

## Garmin API Authentication (Developer Notes)

### OAuth Credentials

Die OAuth1 Consumer Credentials sind in der Garmin Connect Mobile APK in der native library `libsr.so` versteckt.

**Extraction:**

```bash
# 1. APK von APKMirror oder APKPure laden (APKM/XAPK = Split APKs)
# 2. APKM umbenennen zu .zip und entpacken
# 3. Native library aus ARM64 Split extrahieren:
unzip split_config.arm64_v8a.apk lib/arm64-v8a/libsr.so -d /tmp/

# 4. Strings durchsuchen - alle Credentials sind kommasepariert in einem langen Block:
strings /tmp/lib/arm64-v8a/libsr.so | grep "apps.googleusercontent.com"
# Output enthält: google_client_id,google_secret,...,oauth1_key,oauth1_secret,GARMIN_CONNECT_MOBILE_ANDROID_DI,...
```

| Credential             | Value                                  |
| ---------------------- | -------------------------------------- |
| OAuth1 Consumer Key    | `fc3e99d2-118c-44b8-8ae3-03370dde24c0` |
| OAuth1 Consumer Secret | `E08WAR897WEy2knn7aFBrvegVAf0AFdWBBF`  |
| OAuth2 DI Client ID    | `GARMIN_CONNECT_MOBILE_ANDROID_DI`     |

Alternativ von garth S3: `https://thegarth.s3.amazonaws.com/oauth_consumer.json`

### Auth Flow (Mobile API)

1. SSO Login: `POST https://sso.garmin.com/sso/signin` -> Service Ticket (ST-xxxxx)
2. OAuth1 Token: `POST https://connectapi.garmin.com/oauth-service/oauth/preauthorized?ticket=ST-xxxxx` -> oauth_token + oauth_token_secret (HMAC-SHA1 signiert)
3. OAuth2 Token: `POST https://connectapi.garmin.com/oauth-service/oauth/exchange/user/2.0` -> access_token + refresh_token (Bearer)
4. Refresh Token: `POST https://connectapi.garmin.com/di-oauth2-service/oauth/token` mit `grant_type=refresh_token&client_id=GARMIN_CONNECT_MOBILE_ANDROID_DI&refresh_token=...`
5. API Calls: `GET https://connectapi.garmin.com/...` mit Header `Authorization: Bearer {access_token}`

### API Endpoints

- `/userprofile-service/socialProfile`
- `/usersummary-service/usersummary/daily/?calendarDate=YYYY-MM-DD`
- `/wellness-service/wellness/...`
- `/activitylist-service/activities/...`

### Referenz

- [garth](https://github.com/matin/garth) - Python library for Garmin Connect
- Test-Script: `test-api.js` (SSO Login + Token Exchange + API Test)

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
