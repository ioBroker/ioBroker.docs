---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.goodwe-sems/README.md
title: ioBroker.goodwe-sems
hash: DSAtIgJpgbtZtdv9oQBZimiH0ETxPNUrKRjChidK/a0=
---
![Логотип](../../../en/adapterref/iobroker.goodwe-sems/admin/goodwe-sems.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.goodwe-sems.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.goodwe-sems.svg)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-00457C?style=flat&logo=paypal&logoColor=white)
![Купи мне кофе](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)

*[Auf Deutsch lesen](README.de.md)*

# IoBroker.goodwe-sems
![Тестирование и выпуск](https://github.com/bueste/ioBroker.goodwe-sems/actions/workflows/test-and-release.yml/badge.svg)

Считывает данные об инверторе, батарее и потоке мощности с адаптера **[[SEMS Portal](https://www.goodwe.com) (облако)** - для установок, которые (например, из-за отсутствия доступа к инвертору по локальной сети) **не могут быть** опрошены с помощью локального [ioBroker.goodwe]](https://github.com/FossyTom/ioBroker.goodwe) (Modbus/UDP, порт 8899).

Для входа в систему используется ваша **обычная учетная запись портала SEMS** (та же, что вы используете на semsportal.com / в приложении SEMS). Учетная запись GoodWe "организация"/OpenAPI **не** требуется.

## Оглавление
- [Зачем этот адаптер?](#why-this-adapter)
- [Происхождение и ограничения API (пожалуйста, прочтите)](#api-origin-and-limitations-please-read)
- [Установка](#installation)
- [Конфигурация](#configuration)
- [Структура объекта/состояния](#objectstate-structure)
- [Обработка ошибок, задержка и ограничения скорости](#error-handling-backoff-and-rate-limits)
- [Уведомления Pushover](#pushover-notifications)
- [Безопасность и конфиденциальность](#безопасность--конфиденциальность)
- [Разработка](#разработка)
- [Список изменений](#changelog)
- [Лицензия](#лицензия)

## Зачем нужен этот адаптер?
Считывание данных с инверторов GoodWe ET/EH/BH/BT обычно осуществляется локально через Modbus/UDP (см. [Если нет доступа к инвертору по локальной сети (например, потому что к порталу SEMS подключен только адаптер WLAN/LTE, а целевая сеть недоступна иным способом), единственным оставшимся вариантом является обходной путь через облачный портал **[SEMS Portal](https://www.semsportal.com)** ([GoodWe](https://www.goodwe.com)), что и так уже используется для мониторинга установки.

## Происхождение и ограничения API (пожалуйста, ознакомьтесь)
Компания GoodWe официально предлагает три API (см. [Техническая документация GoodWe API](https://community.goodwe.com/solution/API)):

- **OpenAPI** - только для учетных записей *организаций* SEMS, требуется активация компанией GoodWe.
- **API для мониторинга данных в реальном времени** - для сторонних разработчиков требуется лицензионное соглашение и белый список устройств.
- **Интерфейс удаленного пакетного управления** - На основе Kafka, только удаленное управление.

Ни один из этих способов недоступен с **обычной** учетной записью портала SEMS (такой, какая есть у большинства частных пользователей). Вместо этого данный адаптер использует тот же **недокументированный HTTPS API**, который использует официальное приложение/веб-сайт SEMS (вход через `CrossLogin`/`SEMS+ cross-login`, получение данных через `GetMonitorDetailByPowerstationId`). Эти конечные точки не были выпущены или задокументированы компанией GoodWe для использования третьими лицами; реализация основана на независимом анализе трафика, а также на следующих проектах с открытым исходным кодом:

- [pygoodwe](https://github.com/yaleman/pygoodwe) (MIT)
- [goodwe-sems-home-assistant](https://github.com/TimSoethout/goodwe-sems-home-assistant)
- [привязка openHAB SEMSPortal](https://www.openhab.org/addons/bindings/semsportal/)

**Последствия:**

— Хорошо. Мы можем изменить API в любое время без предварительного уведомления — в результате адаптер может (временно) перестать работать.
- Отсутствует **документированный механизм передачи данных в реальном времени/push-уведомлений** (websocket/SignalR) для сторонних разработчиков. Поле `msgSocketAdr` появляется в некоторых старых ответах на запросы авторизации, но фактически не используется ни одним из упомянутых выше эталонных проектов — его использование было бы чистой обратной разработкой без надежной документации и сопряжено со значительно более высоким риском (блокировка учетной записи, нестабильное соединение). Поэтому данный адаптер намеренно опрашивает соединение по HTTPS с настраиваемым интервалом (по умолчанию 5 минут) вместо имитации непроверенного соединения websocket.
- Обнаружен **код ограничения скорости запросов (`GY0429`)** (задокументирован, среди прочего, в интеграции с Home Assistant). Адаптер распознает этот код и автоматически приостанавливает работу (по умолчанию 5-минутная задержка), вместо того чтобы подвергать учетную запись опасности повторными запросами.
— Используйте на свой страх и риск, см. [ЛИЦЕНЗИЯ](ЛИЦЕНЗИЯ) (MIT, без гарантий).

**Поля, не возвращаемые этой конечной точкой:** при сравнении с ответом в режиме реального времени в дневное время, ответ шлюза `GetMonitorDetailByPowerstationId`, используемый этим адаптером, не содержит метку времени станции (`info.time`), а также поля генерации/дохода/валюты за текущий месяц (`kpi.month_generation`, `kpi.day_income`, `kpi.total_income`, `kpi.currency`). Соответствующие состояния (`Station.PortalTimestamp`, `KPI.MonthGeneration`, `KPI.TodayIncome`, `KPI.TotalIncome`, `KPI.Currency`) никогда не создаются ни для одной учетной записи/времени суток — это постоянный пробел в самом API шлюза, а не временное отсутствие в часы низкой выработки электроэнергии. Состояния `Battery.*` и `PowerFlow.*` создаются только тогда, когда портал фактически возвращает данные о батарее/потоке энергии для электростанции (например, ключ `powerflow` вообще отсутствует для электростанций без батареи).

## Установка
После того, как этот адаптер появится в официальном репозитории адаптеров ioBroker, установите его обычным способом: **Администрирование -> Адаптеры -> найдите "goodwe-sems" -> установить**.

До тех пор администратор ioBroker может добавить его вручную на хосте ioBroker:

```
iobroker url iobroker.goodwe-sems
```

## Конфигурация
| Поле | Описание |
|---|---|
| Учетная запись / пароль SEMS | Те же учетные данные, что и на semsportal.com. Пароль хранится в зашифрованном виде на ioBroker. |
| Идентификатор завода (необязательно) | Оставьте пустым для автоматического определения (`GetPowerStationIdByOwner`). Для учетных записей с несколькими заводами: скопируйте идентификатор вручную с URL-адреса портала (`.../powerstation/powerstatussnmin/<ID>`). |
| Легковерный | См. [Pushover-уведомления](#pushover-notifications). |
| Pushover | См. [Уведомления Pushover](#pushover-notifications). |

## Структура объекта/состояния
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
goodwe-sems.0.Battery.SOC / .Status
goodwe-sems.0.EVCharger.*                  (only if reported by the portal)

goodwe-sems.0.Inverters.<serial>.Name / .Model / .Status / .WarningCode
goodwe-sems.0.Inverters.<serial>.CurrentPower / .TodayGeneration / .TotalGeneration / .Temperature
goodwe-sems.0.Inverters.<serial>.PV1..4.Voltage / .Current
goodwe-sems.0.Inverters.<serial>.AC_L1..3.Voltage / .Current / .Frequency
goodwe-sems.0.Inverters.<serial>.Battery.SOC / .Voltage / .Current
```

При наличии двух инверторов (как и предполагалось изначально при создании этого адаптера) автоматически создаются две ветви `Inverters.<serial>.*` — их количество не задано жестко, оно определяется исключительно данными, которые портал возвращает для настроенной учетной записи.

Поля, которые портал предоставляет, но о которых этот адаптер (пока) не знает, не теряются: при включенной опции отладки полный необработанный ответ оказывается в формате `info.rawResponse` (JSON), поэтому его можно проверить и добавить через запрос на слияние, если это необходимо.

## Обработка ошибок, задержка и ограничения скорости
- Каждый цикл опроса полностью заключен в блок try/catch; единичная ошибка никогда не сможет окончательно остановить цикл опроса.
— Специальные классы ошибок (`SemsAuthError`, `SemsRateLimitError`, `SemsNetworkError`, `SemsProtocolError`) определяют целенаправленное поведение:
- **Ограничение скорости (`GY0429`)** -> немедленная пауза (по умолчанию 300 с), `info.rateLimited = true`.
- **Сбой входа в систему** -> экспоненциальная задержка (ограниченная 1 часом), чтобы неверные учетные данные не создавали дополнительной нагрузки на аккаунт.
- **Сетевые/протокольные ошибки** -> умеренная задержка.
- После заданного количества последовательных сбоев (по умолчанию 3) установка считается «отключенной», и, если эта функция включена, запускается уведомление Pushover.
- Вся дополнительная информация записывается в лог ioBroker в структурированном виде (`error`/`warn`/`debug` в зависимости от уровня серьезности).

## Уведомления Pushover
Настраивается в трех режимах:

1. **Через существующий экземпляр `ioBroker.pushover`** (`sendTo`) - рекомендуется, исключает дублирование управления учетными данными.
2. **Напрямую через API Pushover** (ваш собственный ключ пользователя + токен API/приложения, хранящийся в зашифрованном виде) — также работает без отдельного экземпляра Pushover.
3. **Оба одновременно.**

Срабатывает при: сбое входа в SEMS, ограничении скорости запросов SEMS, длительном сбое, неожиданной ошибке адаптера — каждое событие можно включить или выключить отдельно. Внутренний период ожидания (по умолчанию 1 час на категорию) предотвращает спам во время текущих проблем.

## Безопасность и конфиденциальность
— Пароль SEMS и токен API Pushover помечены как `encryptedNative`/`protectedNative` в корне файла `io-package.json` и хранятся в зашифрованном виде в ioBroker, никогда не записываясь в лог в открытом виде (имя учетной записи маскируется в сообщениях логов, например, `st***@gmail.com`).
- Адаптер обеспечивает доступ только для чтения (`GetMonitorDetailByPowerstationId`, `GetPowerStationIdByOwner`). Функция удаленного управления/записи намеренно отсутствует (`SaveRemoteControlInverter`) — это представляло бы значительно больший риск для безопасности и ответственности, и не входило в требования.
- Отсутствие сторонних зависимостей для доступа по HTTP: вместо дополнительной HTTP-библиотеки используется встроенная функция `fetch` Node.js >=22 — меньшая поверхность атаки, меньший риск для цепочки поставок.
— Базовый URL-адрес API, возвращаемый в ответе на запрос авторизации, проверяется (HTTPS только на доменах, принадлежащих GoodWe) перед тем, как любой последующий запрос будет его использовать, поэтому измененный ответ на запрос авторизации не сможет перенаправить токен сессии на сторонний хост.
- Все сетевые ошибки перехватываются типизированным способом; никакие непроверенные данные из ответа API никогда не выполняются (`eval`, `Function` и подобные им нигде не используются).

## Разработка
```
npm install
npm run lint
npm test          # unit tests (lib/mapping.js, lib/semsApi.js, lib/notify.js) + package consistency check
```

Дополнительно рекомендуется перед каждым релизом:

```
npx @iobroker/repochecker@latest .
```

Приветствуются запросы на добавление изменений (pull requests), особенно для добавления дополнительных полей, предоставляемых порталом (см. `info.rawResponse` с включенной опцией отладки) или для улучшения переводов.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

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