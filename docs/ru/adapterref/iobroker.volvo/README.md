---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.volvo/README.md
title: ioBroker.volvo
hash: AAbv6DdI6q3l3O0pGuWeABqjhcpSqk9CYVIsdu4dO+g=
---
![Логотип](../../../en/adapterref/iobroker.volvo/admin/volvo.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.volvo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.volvo.svg)

# IoBroker.volvo
## Адаптер Volvo Cars для ioBroker
Этот адаптер подключает ваш автомобиль Volvo к ioBroker с помощью [[Volvo Connected Vehicle API](https://developer.volvocars.com/apis/) и [Energy API v2]](https://developer.volvocars.com/apis/energy/v2/overview/).

### Поддерживаемые функции
- 🔋 Уровень заряда батареи, запас хода на электротяге, состояние зарядки (PHEV / BEV)
- ⛽ Уровень топлива, показания одометра, статистика поездки
- 🚪 Состояние двери, окна и замка
- 📍 Местоположение по GPS
- 🔧 Диагностика (предупреждения о необходимости технического обслуживания, тормозная жидкость, масло, шины, освещение)
- 🔑 Дистанционное управление (блокировка/разблокировка, звуковой сигнал, мигание фар, климат-контроль)
- 🔄 Автоматическое обновление данных с настраиваемыми интервалами
- 🔐 Сохранение токена — обеспечивает работу адаптера после перезагрузки без повторного входа в систему.

---

## Руководство по настройке
### 1. Получите ключ API VCC
1. Перейдите на сайт [developer.volvocars.com](https://developer.volvocars.com/account/) и войдите в систему (через учетную запись Google или GitHub).
2. Создайте новое **приложение**.
3. Скопируйте **ключ API VCC (основной)**.

![VCC ApiKey](../../../en/adapterref/iobroker.volvo/vccapikey.png)

### 2. Настройка адаптера
1. Откройте настройки адаптера в ioBroker.
2. Введите свой **адрес электронной почты Volvo ID** и **пароль** (те же учетные данные, которые вы используете в приложении Volvo Cars).
3. Вставьте **ключ API VCC**.
4. Установите **интервал обновления** (по умолчанию: 5 минут).

### 3. Вход с помощью OTP
API Volvo использует двухфакторную аутентификацию с одноразовым паролем (OTP):

1. В настройках адаптера нажмите кнопку **"Начать вход в систему (отправить OTP)"**.
2. Проверьте свою электронную почту на наличие OTP-кода от Volvo.
3. Введите код и нажмите **"Отправить OTP"**.
4. Адаптер будет хранить токен обновления, поэтому вам не нужно будет повторять эту процедуру, если только срок действия токена не истечет (обычно через несколько недель/месяцев).

> **Примечание:** Если срок действия токена обновления истечет, адаптер отобразит предупреждение в журнале. Просто повторите вход по одноразовому паролю (OTP) в настройках адаптера.

---

## Точки данных
Адаптер создает следующую структуру точек данных в разделе `volvo.0.<VIN>`:

| Путь | Описание |
|---|---|
| `energy.batteryChargeLevel.*` | Уровень заряда батареи (%), метка времени обновления |
| `energy.chargingStatus.*` | Состояние зарядки (В режиме ожидания, на зарядке и т. д.) |
| `energy.chargerConnectionStatus.*` | Подключение зарядного устройства (ПОДКЛЮЧЕНО, ОТКЛЮЧЕНО) |
| `status.doors.*` | Состояния двери (ОТКРЫТО/ЗАКРЫТО), центральный замок |
| `status.windows.*` | Состояния окон, включая люк |
| `status.fuel.*` | Количество топлива (литры) |
| `status.odometer.*` | Показания одометра (км) |
| `status.diagnostics.*` | Предупреждения о необходимости обслуживания, расстояние/время до места обслуживания |
| `status.statistics.*` | Расход топлива/энергии, счетчики пробега |
| `status.engine-status.*` | Состояние работы двигателя |
| `status.warnings.*` | Световые предупреждения (стоп-сигналы, противотуманные фары, указатели поворота и т. д.) |
| `location.*` | Координаты GPS, направление, метка времени |
| `remote.*` | Дистанционные команды (кнопки) |
| `remote.*` | Удаленные команды (кнопки) |

## Удаленные команды
Для управления транспортным средством используйте кнопки под `volvo.0.<VIN>.remote`:

- `lock` / `unlock` — Заблокировать или разблокировать автомобиль
- `climatization-start` / `climatization-stop` — Запуск или остановка предварительной подготовки
- `гудок` / `мигание` / `гудок-мигание` — Подать звуковой сигнал, включить фонарики или и то, и другое.
- `lock-reduced-guard` — Блокировка с уменьшенным уровнем защиты
- `refresh` — Обновить все данные вручную

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