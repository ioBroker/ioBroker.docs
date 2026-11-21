---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"},"en/adapterref/iobroker.skoda-public-api/docs/stable-release.md":{"title":{"en":"Erste Stable-Aufnahme abgeschlossen"},"content":"en/adapterref/iobroker.skoda-public-api/docs/stable-release.md"},"en/adapterref/iobroker.skoda-public-api/docs/stable-pr.md":{"title":{"en":"Stable application for 0.1.11 — merged"},"content":"en/adapterref/iobroker.skoda-public-api/docs/stable-pr.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.skoda-public-api/HANDOFF.md
title: Передача управления - ioBroker.skoda-public-api
hash: zhoPPyDb7HCHnbVyvt1LqsKctERV+37IS18m2iU1UUs=
---
# Передача управления - ioBroker.skoda-public-api
Diese Datei beschreibt den aktuellen Arbeitsstand und die nächsten notwendigen Schritte. Nutzerinformationen stehen в [`README.md`](/#/adapters/skoda-public-api), dauerhafte technische Entscheidungen в [`docs/design-decisions.md`](/#/docs/adapterref/iobroker.skoda-public-api/docs/design-decisions.md) и technische Arbeitsgrundlage в [`docs/implementation-plan.md`](/#/docs/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md).

## Актуальная подставка
Стенд: 6 ноября 2026 г., после проверки версии `0.1.12`.

- Версия `0.1.12` доступна в [npm](https://www.npmjs.com/package/iobroker.skoda-public-api/v/0.1.12)

als `latest` и als [GitHub-релиз](https://github.com/tmarthy/ioBroker.skoda-public-api/releases/tag/v0.1.12) veröffentlicht. Тег Release доступен для фиксации `ec59043`. Мы рекомендуем использовать API-1.1.0-Steckerfelder с метаданными по миграции.
Bestehende Fallback-Rollen und fehlende Auswahlwerte werden beim nächsten Poll actualisiert; Эйджин Намен, Роллен, Этикетки и история конфигурации bleiben erhalten. Unbekannte Ladezustände behalten den Letzten Schalterwert mit Schlechter Qualität und Durfen keine Stop-Befehle unterdrücken или bestätigen.

- Новые тесты проводятся в Wertepaare, unabhängig fehlende Felder, Wiederkehr und

Neustart, zukünftige Werte, bestehende Objekte und unveränderten Requestverbrauch.
`vehicle-synth-plugged-unlocked.json` beschreibt ausdrücklich Synthetisch den API-Fall «Kabel verbunden, unverriegelt, Ladestatus fehlt». Echte Fahrzeugaufnahmen wurden nicht verändert.

- Локальные возможности: Codegen ohne Änderungen am Generat, TypeScript, Lint,

Сборка, 524 модульных теста, 64 пакетных теста и 15 тестов интеграции контроллеров в компактном режиме (macOS, узел `26.9.0`, js-контроллер `8.0.0-alpha.14-20261106-c3c2ce2df`). Матрица CI-Plattformmatrix с новой комбинацией с Ubuntu, Windows, macOS и Node 22, 24, 26 предназначена для [Release-Tag einschließlich Deploy](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/42273332479) и [основной](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/42273332749) grün. npm bestätigt Version и `latest` с уведомлениями `gitHead` `ec59043`.
В локальном архиве npm `iobroker.skoda-public-api-0.1.12.tgz` предусмотрена возможность компиляции данных.

- Das öffentliche Repository ist

  [`tmarthy/ioBroker.skoda-public-api`](https://github.com/tmarthy/ioBroker.skoda-public-api).

- Версия «0.1.11» работает с npm и GitHub очень эффективно. Die Aufnahme derselben Версия в «стабильной» версии
11 октября 2026 г.

[Репозиторий-PR #6832](https://github.com/ioBroker/ioBroker.repositories/pull/6832) сверхномен. `bluefox` и `tmarthy` с npm-Maintainer.

- Der ausgelieferte [Стабильный каталог](https://download.iobroker.net/sources-dist.json)

Hatte bei der Prüfung am 11. October noch den Stand `2026-10-11T08:35:49.417Z` для их слияния и защиты адаптера noch nicht. Die Sichtbarkeit im Admin folgt nach Actualisierung des Katalogs.

- Lademodus und Ladeprofile wurden am eigenen Fahrzeug erfolgreich getestet.
- Обратная связь с тестером, лучшая информация и поддержка

Octavia 2.0 TDI sowie положительно Ergebnisse beim Superb Hybrid (2025 г.) и Superb iV (2022 г.). Эйн Эльрок (Modelljahr 2027) имеет положительные рекомендации по датированию и парковке. Die Klimatisierung beim Superb Hybrid 2025 wurde im Bericht noch nicht abschließend getestet. Nachweise und die abgeschlossene Stable-Aufnahme stehen в [`docs/stable-release.md`](/#/docs/adapterref/iobroker.skoda-public-api/docs/stable-release.md).

- Der Spec-Wächter шляпа 28 сентября 2026 г., новый опционный Felder

`ChargingStatus.plugConnectionState` и `plugLockState` работают и [Выпуск №4](https://github.com/tmarthy/ioBroker.skoda-public-api/issues/4) eröffnet.
Spec, Codegen und Objektbezeichnungen sind в [PR #5](https://github.com/tmarthy/ioBroker.skoda-public-api/pull/5) актуализируется 28 сентября. Выпуск №4 уже открыт; der anschließende Spec-Workflow на `main` ist grün.

- PR-Matrix - это новая комбинация из Ubuntu, Windows, macOS и

  Узел 22, 24, 26 грюн. В macOS можно найти драгоценности Compact-Group-Test с.

- npm Trusted Publishing предназначен для тегов `.github/workflows/test-and-release.yml`

  айнгерихтет. `NPM_TRUSTED_PUBLISHING=true` активируется в Deploy-Job.

- Die Stable-Vorbereitung wurde mit

[PR #7](https://github.com/tmarthy/ioBroker.skoda-public-api/pull/7) сверхномен; `@iobroker/testing` является актуальным на `^6.3.0`. Die anschließende [CI auf `main`](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/38143355427) ist grün; Stable-PR-Checker объединяет ваши проблемы и предупреждения.
[Checker-Выпуск №6](https://github.com/tmarthy/ioBroker.skoda-public-api/issues/6) - это очень важно.

- Die erste Stable-Aufnahme verwendet das unveränderte npm-Paket `0.1.11`.

  Die danach übernommenen Spec-Metadaten sind mit Version `0.1.12` veröffentlicht.

## Offene Themen в empfohlener Reihenfolge
1. **Auslieferung des Stable-Katalogs kontrollieren.** Nach dem nächsten Katalog-Refresh

den Eintrag für `skoda-public-api` с версией `0.1.11` и Sichtbarkeit im Admin prüfen. Die Aufnahme ist bereitsgenhmigt; ein neues npm-Release ist dafür nicht erforderlich.

2. **Обновить версию `0.1.12` вместе.** Необязательно.

Steckerfelder und die Migration Bestehender Objekte an weiteren Fahrzeugen prüfen.
Veröffentlichung, примечания к выпуску и дополнительная информация о платформе.

3. **Weitere Fahrzeugtests begleiten.** Анонимные светильники для посетителей и

   Гибрид фелен вейтерхин; положительный Forumberichte ersetzen keine Fixture-Abdeckung.

## Funktionsumfang
В адаптере предусмотрены официальные данные MyŠkoda Public API и возможность запуска/остановки нагрузки, климатизации, стоянки и освещения, которые выполняются в соответствии с `charging.settings.targetStateOfChargeInPercent` (50-100 % в 10-процентной документации).
Derselbe Datenpunkt проводит опросы с актуальными Einstellung. VIN-коды загружаются в момент конфигурации, а API имеет определенный диапазон настроек.

`charging.settings.preferredChargeMode` - это то, что нужно Моди Шрайббару. `chargingProfiles.profiles.<id>.configurationJson` enthält ein vollständiges Profil zum Lesen, Ändern und Zurückschreiben. Teilobjekte werden nicht zusammengeführt; unveränderte Felder müssen erhalten bleiben. Профиль был действительным и неактивным для других профилей, Modus, Ladelimit и Start/Stop eingereiht.
Если вы хотите провести опрос в разделе «Профиль» в рамках Wartezeit, то вам понадобится локальный доступ к Schreibzugriff. Gleichzeitige App-Änderungen nach dem Letzten Poll, чтобы узнать больше о том, как API будет обновляться.

Die `*.enabled`-Schalter akzeptieren ausschließlich Boolean `true` и `false`.
Andere Werte werden ohne API-Aufruf, Quittierung или Änderung wartender Befehle ignoriert. `<vin>.refresh` fordert einen vorgezogenen Poll an; Квота, Befehlsreserve и Fehlerwartezeiten gelten dabei weiterhin.

Для `<vin>.info.polling`, `nextPollAt`, `lastSuccessfulPollAt` и `reason` в соответствии с этим планировщиком планировщика, затем используйте API-Abruf и активный планировщик. Die Zeitstempel verwenden Unix-Millisekunden. Der letzte Erfolg bleibt über Neustarts erhalten; `0` bedeutet, dass kein Erfolg gespeichert ist. `nextPollAt` - это laufendem Request, локальный Schreibwiederholungen или ausgesetztem Polling `0`. Диагностика всех API-запросов и недоступность для Frische der Fahrzeugdaten.
Bei gestoppter Instanz bleiben die zuletzt geschriebenen Werte stehen; erst der nächste Start ersetzt den alten Zeitplan. Полный список основных вопросов находится в README.

Для `<vin>.info.commandConfirmation.<group>`, где используется API-интерфейс, используется панель Steuerungsgruppe: `status`, `name`, JSON-`target`, `sentAt`, `expiresAt` и `confirmedAt`. Die Zustände с `WAITING`, `CONFIRMED`, `TIMED_OUT` и нач.
Bestätigungen werden ausschließlich aus bestehenden Poll-Antworten abgeleitet; отдельный локальный таймер, который объединяется с Fristablauf. Это означает, что вы можете использовать API-вызовы во время проверок или автоматических опросов. Семантика `info.lastCommand` и `ack=true` недоступна (API-Annahme).

Поддержка API **20 запросов на Stunde и VIN**. Чтобы использовать VIN-код адаптера, сохраните сегмент Quota-Bucket под `<vin>.rateLimit.*`. Опросы останавливают настройку Befehlsreserve free. Befehle laufen über eine Queue mit Coalescing und TTL; nach einer angenommenen Operation folgt ein Verifikations-Poll.

Объект для `<vin>` после API-Antwort. Сообщается, что это не автоматический процесс нагревания. Fehlende Daten behalten ihren letzten Wert mit schlechtem Quality-Flag. Besondere Darstellungen sind:

- `charging.status.battery.remainingCruisingRangeInMeters`: Километры
- `activeVentilation.durationInSeconds`: Minuten
- `auxiliaryHeating.durationInSeconds`: Minuten
- `parkingPosition.position`: `lat;lon` для карт и геозон
- Ladeprofile под `chargingProfiles.profiles.<id>` statt nach Listenindex

Конфигурация и определенное имя адаптера указаны во всех настройках ioBroker-Sprachen verfügbar. Журналы, Benachrichtigungen und Ergebnisse des Verbindungstests Sind immer auf English. Eine Backend-Sprachauswahl gibt es nicht.

## Архитектура
```text
src/main.ts
  ├─ config + i18n
  ├─ SkodaApiClient ── sanitize + typisierte API-Fehler
  ├─ VehicleQuotaManager ── ein persistenter QuotaManager pro VIN
  ├─ PollScheduler ── Kadenz, Backoff und Verifikations-Polls
  ├─ CommandQueue ── Coalescing, TTL und Retry-Strategie
  ├─ StateWriter ── Objektbaum, Quality-Flags und Metadatenmigration
  └─ KeyExpiryWatcher ── Ablauf-States, Logs und ioBroker-Notifications
```

| Bereich | Dateien |
|---|---|
| API-Vertrag и Codegen | `spec/skoda-openapi.json`, `tools/spec.mjs`, `tools/generate-*.mjs` |
| Квота | `src/lib/quota/QuotaManager.ts`, `VehicleQuotaManager.ts`, `AdapterQuotaStore.ts` |
| Опрос и опрос | `src/lib/scheduler/PollScheduler.ts`, `src/lib/commands/CommandQueue.ts` |
| Государства и метаданные | `src/lib/states/StateWriter.ts`, `objectOverlay.ts`, `objectNames.ts` |
| Übersetzungen | `admin/i18n/*/translations.json`, `src/lib/i18n.ts`, `src/lib/states/objectNames.ts` |
| Entwicklungs-API | `test/mock/server.ts`, `test/fixtures/*.json` |
| Тесты | Тесты не нужны модулям, `test/package`, `test/integration.js` |
| Тесты | Тесты не нужны модулям, `test/package`, `test/integration.js` |

## Разработка и проверка
Voraussetzungen с Node.js 22 или новым и `npm ci`.

```bash
npm run check
npm run lint
npm test
npm run build
```

Der Integrationslauf startet eine echte ioBroker-Testinstanz gegen den lokalen Mock und dauert deutlich länger:

```bash
npm run test:integration
```

Der Mock läuft separat mit:

```bash
npm run mock
curl -H "X-API-Key: mock-api-key" \
  http://127.0.0.1:8099/api/v1/vehicles/TMBJB9NY5RF999999
```

С `SKODA_API_BASE_URL=http://127.0.0.1:8099` можно подключиться к серверу разработки на Mock-сервере. Diese Variable darf auf einem Produktivsystem nicht gesetzt sein. В интерфейсе администратора есть лучшая возможность свободной настройки API-Basis-URL.

Nach Änderungen `src/` или `admin/` будет полезен для сервера разработки в новых пакетах и загрузке данных адаптера. `build/` может быть неверсионным, но нужно, чтобы в npm-пакете он был включен. Die `files`-Список в `package.json` steuert den Paketinhalt; eine `.npmignore` wird dafür nicht verwendet. Для этого выберите Packen den Build.

## CI и релиз
Push auf `main`, теги версий, запросы на извлечение и ручное изменение следующих параметров:

- TypeScript и ESLint в Ubuntu с Node 24.
- дополнительные тесты адаптеров для Ubuntu, Windows и macOS с узлами 22, 24 и 26.

Bei Branch-Pushes überspringt der Pfadfilter reine Markdown-, `docs/`- и `.vscode/`-Änderungen; для запросов на вытягивание позолоченный фильтр nicht.
Der wöchentliche Spec-Wächter läuft montags und kann manuell gestartet werden. Dependabot prüft npm-Abhängigkeiten в 8. и GitHub Actions в 22. jedes Monats.

Release-Prüfung:

```bash
npm run check
npm run lint
npm test
npm run test:integration
npm run build
npm pack --dry-run
npm run check:spec
```

`npm run check:spec` получите от Live-Spec zu. Если вы хотите, чтобы новые параметры были выбраны, региональный код должен быть актуален и указан в `npm run codegen`. Спецификации, генерируемые типы и определения объектов, которые могут быть выбраны и проверены.

## Betriebsrelevante Hinweise
- Ключ API и S-PIN доступны в интерфейсе администратора. Бейде Фельдер и другие

  `encryptedNative` и `protectedNative` с внутренней стороны.

- Der Verbindungstest kostet einen Запросите получение VIN.
- `info.connection` включает `401` и `403` в случае `false`, в пределах квоты

jedoch nicht.

- Ein abgelaufener Schlüssel сокращен до опроса на einmal pro Stunde. Адаптер

  канн кейнен нойен Шлюссель эрцойген.

- Ответ API на сообщение «202 Accepted» и заданный статус операций.

  `ack=true` будет невозможен, если вы обратитесь к API-интерфейсу.

- Журналы и файлы для очистки `sanitize()` laufen; VIN, API-ключ, S-PIN, адрес и

  Parkposition dürfen nicht в Support-Logs erscheinen.

- Версия OpenAPI - v0. Änderungen am Vertrag und am Rate-Limit bleiben ein

laufendes Risiko.

- Nur der Enyaq ist mit echten Fixtures abgedeckt. Für Verbrenner, Hybrid und

Standheizung gibt es zusätzlich позитивный Forumberichte; автоматическая установка DIER Fahrzeuge будет полезна для Spec und Mock.

## Выберите адаптеры
- автоматическое удаление VIN-кодов
- Вер- унд Энтригельн, Хупе или Лихтупе
- Setzen eines beliebigen Ladestroms in Ampere (предустановки профиля `REDUCED`/`MAXIMUM` и другие)
- автоматический Erneuerung des API-Schlüssels
- ПВ-Регелунг; dafür gibt es `examples/pv-surplus-charging.js`
- Sentry oder andere externe Fehlertelemetrie

## Lokale Profilbearbeitung
- `ProfileEditor` работает под `chargingProfiles.profiles.<id>.edit` Einzelfelder,

  Wochentagsschalter sowie `apply`/`reset` берет. Результаты опросов и опросы были сериализованы.

- Feldänderungen bleiben local; Применить nutzt die bestehende Queue mit vollständigem Profil

  и сделать снимок экрана. Keine zusätzlichen Lese- или запросы на проверку.

- `грязный`, `конфликт`, `месседж` beschreiben den Entwurf; ACK должен быть локальным.

  Befehlsstatus und Bestätigung bleiben в `info.lastCommand`/`info.commandConfirmation`.

- Bei Neustart werden Entwürfe erst aus dem nächsten gültigen Poll neu aufgebaut.

  Применить/заблокировать профиль и заблокировать профиль.

- Тесты, связанные с другими конфликтами, идентификаторами таймера, проверкой, отключением Felder,

  Neustart und mehrere Feldänderungen mit genau einem PUT im Integrationstest.

### Metadaten und Verfügbarkeit de Profileditors
- Einstellungsrollen: `switch.setting`, `level.setting.battery`,

`level.setting.battery.min`, `text.setting`, драгоценности eindeutig про канал.
Wiederholte Textfelder verwenden `text`, Wochentage `switch`.
Кнопки Verfügbare bleiben `button`; nicht verfügbare Boolean erhalten `indicator`, Zahlen `value` и строки `text`, драгоценности `read=true`/`write=false`.

- `profileEditorLabels.ts` содержит дополнительные сведения о полях, текстах и сообщениях.

Wochentage kommen aus `Intl` (UTC, zwischengespeichert). `common.states` verwendet Stringwerte в системном языке; ein Sprachwechsel wird nach Neustart wirksam.

- `initialize(vins)` - это самые локальные состояния/объекты и сохраняемые параметры.

  Editorfelder bis zum nächsten gültigen Poll. `edit.available` не нажимайте кнопку Verfügbarkeit.

- Entfernte Felder bleiben mit letztem Wert erhalten: `write=false`, `q=1`, übersetzte

Бесшрайбунг. Rückkehr setzt Metadaten und Qualität zurück. Änderungen an einem lokalen Entwurf bleiben bei Konflikten erhalten; nicht verfügbare Felder без ответа.

- Миграция актуальна при сокращении метаданных. Определенное имя и имя

  andere Einstellungen wie History bleiben erhalten. Keine zusätzlichen Fahrzeugrequests.

### Локализованная диагностика
`diagnosticTranslations.ts` übersetzt Editormeldungen und die Labels der Polling- и Bestätigungsstatus во всех эльфийских языках. Die Systemsprache wird beim Start einmal gelesen; Backendlogs на английском языке, API-Werte и коды состояния непроверены. Перед началом работы `common.states` werden gezielt migriert, abgeschlossene Bestätigungen bereits beim Start. Sprachwechsel benötigen einen Adaptneustart. Тесты prüfen Rollenkonsistenz und Eindeutige Detaillierte Rollen auch nach Ausfall, Wiederkehr und Neustart; der Integrationstest läuft mit deutscher Systemsprache и unveränderter Anzahl an Fahrzeugrequests.