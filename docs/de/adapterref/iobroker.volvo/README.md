---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.volvo/README.md
title: ioBroker.volvo
hash: AAbv6DdI6q3l3O0pGuWeABqjhcpSqk9CYVIsdu4dO+g=
---
![Logo](../../../en/adapterref/iobroker.volvo/admin/volvo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.volvo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.volvo.svg)

# IoBroker.volvo
## Volvo Cars Adapter für ioBroker
Dieser Adapter verbindet Ihr Volvo-Fahrzeug über [Volvo Connected Vehicle API](https://developer.volvocars.com/apis/) und [Energy API v2]](https://developer.volvocars.com/apis/energy/v2/overview/) mit ioBroker.

### Unterstützte Funktionen
- 🔋 Batterieladestand, elektrische Reichweite, Ladestatus (PHEV / BEV)
- ⛽ Kraftstoffstand, Kilometerzähler, Reisestatistik
- 🚪 Tür-, Fenster- und Schlossstatus
- 📍 GPS-Standort
- 🔧 Diagnose (Servicewarnungen, Bremsflüssigkeit, Öl, Reifen, Beleuchtung)
- 🔑 Fernbedienungsbefehle (Verriegeln/Entriegeln, Hupen, Blinken, Klimatisierung)
- 🔄 Automatische Datenaktualisierung in konfigurierbaren Intervallen
- 🔐 Token-Persistenz — übersteht Adapterneustarts ohne erneute Anmeldung

---

## Einrichtungsanleitung
### 1. Einen VCC-API-Schlüssel anfordern
1. Gehen Sie zu [developer.volvocars.com](https://developer.volvocars.com/account/) und melden Sie sich an (mit Ihrem Google- oder GitHub-Konto).
2. Erstellen Sie eine neue **Anwendung**.
3. Kopieren Sie den **VCC API-Schlüssel (Primär)**.

![VCC API-Schlüssel](../../../en/adapterref/iobroker.volvo/vccapikey.png)

### 2. Adapter konfigurieren
1. Öffnen Sie die Adaptereinstellungen in ioBroker.
2. Geben Sie Ihre **Volvo ID-E-Mail-Adresse** und Ihr **Passwort** ein (die gleichen Anmeldedaten, die Sie in der Volvo Cars App verwenden).
3. Fügen Sie den **VCC-API-Schlüssel** ein.
4. Stellen Sie das **Aktualisierungsintervall** ein (Standard: 5 Minuten).

### 3. Mit OTP anmelden
Die Volvo-API verwendet einen Zwei-Faktor-Authentifizierungsprozess mit einem Einmalpasswort (OTP):

1. Klicken Sie in den Adaptereinstellungen auf **"Start Login (Send OTP)"**.
2. Prüfen Sie Ihre E-Mails auf den OTP-Code von Volvo.
3. Geben Sie den Code ein und klicken Sie auf **"OTP senden"**.
4. Der Adapter speichert das Aktualisierungstoken, sodass Sie dies nicht wiederholen müssen, es sei denn, das Token läuft ab (typischerweise nach Wochen/Monaten).

**Hinweis:** Wenn das Aktualisierungstoken abläuft, zeigt der Adapter eine Warnung im Protokoll an. Wiederholen Sie einfach die OTP-Anmeldung in den Adaptereinstellungen.

---

## Datenpunkte
Der Adapter erzeugt unter `volvo.0.<VIN>` die folgende Datenpunktstruktur:

| Pfad | Beschreibung |
|---|---|
| `energy.batteryChargeLevel.*` | Akkuladestand (%), aktualisierter Zeitstempel |
| `energy.chargingStatus.*` | Ladestatus (LEERLAUF, LÄDT, etc.) |
| `energy.chargerConnectionStatus.*` | Ladeanschluss (VERBUNDEN, GETRENNT) |
| `status.doors.*` | Türzustände (OFFEN/GESCHLOSSEN), Zentralverriegelung |
| `status.windows.*` | Fensterzustände einschließlich Schiebedach |
| `status.fuel.*` | Kraftstoffmenge (Liter) |
| `status.odometer.*` | Kilometerstand (km) |
| `status.diagnostics.*` | Servicewarnungen, Entfernung/Zeit bis zum Service |
| `status.statistics.*` | Kraftstoff-/Energieverbrauch, Tageskilometerzähler |
| `status.engine-status.*` | Motorlaufzustand |
| `status.warnings.*` | Lichtwarnungen (Bremslichter, Nebelscheinwerfer, Blinker usw.) |
| `location.*` | GPS-Koordinaten, Kurs, Zeitstempel |
| `remote.*` | Fernbedienungsbefehle (Tasten) |
| `remote.*` | Fernsteuerungsbefehle (Tasten) |

## Fernbefehle
Verwenden Sie die Tasten unter `volvo.0.<VIN>.remote`, um Ihr Fahrzeug zu steuern:

- `lock` / `unlock` — Fahrzeug verriegeln oder entriegeln
- `climatization-start` / `climatization-stop` — Vorkonditionierung starten oder stoppen
- `hupen` / `blinken` / `hupen-blinken` — Hupen, Lichthupe oder beides
- `lock-reduced-guard` — Sperre mit reduziertem Schutz
- `refresh` — Alle Daten manuell aktualisieren

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