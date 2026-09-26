---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.skoda-public-api/HANDOFF.md
title: Передача управления - ioBroker.skoda-public-api
hash: sYc0SjDJne3moW2a0RA2tsAzbiVcaVX7ngTyvEW9RIo=
---
# Передача управления — ioBroker.skoda-public-api

Diese Datei beschreibt den aktuellen Arbeitsstand und die nächsten notwendigen Schritte. Nutzerinformationen Stehen в[`README.md`](/#/adapters/skoda-public-api) , dauerhafte technische Entscheidungen в[`docs/design-decisions.md`](/#/docs/adapterref/iobroker.skoda-public-api/docs/design-decisions.md) und die technische Arbeitsgrundlage in[`docs/implementation-plan.md`](/#/docs/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md) .

## Актуальная подставка

- Действующий репозиторий[`tmarthy/ioBroker.skoda-public-api`](https://github.com/tmarthy/ioBroker.skoda-public-api) .
- Версия `0.1.10` где лучше использовать npm и GitHub. Версия `0.1.11` введите исправление объекта ioBroker-Objektprüfung. Versionsangaben, ioBroker-News и README-Changelog с минимальными изменениями. Дер Таг `v0.1.11` Löst die CI-Matrix и bei Erfolg npm Trusted Publishing sowie den GitHub-Release aus.
- Der Antrag auf Aufnahme в ioBroker `latest` ист алс[`ioBroker.repositories#6592`](https://github.com/ioBroker/ioBroker.repositories/pull/6592) weiterhin offen (geprüft, 19 сентября 2026 г.).
- `bluefox` унд `tmarthy` sind als npm-Maintainer eingetragen (am selben Tag geprüft). Die frühere Aufgabe, `bluefox` hinzuzufügen, ist damit erledigt.
- npm Trusted Publishing для тегов `.github/workflows/test-and-release.yml` eingerichtet. `NPM_TRUSTED_PUBLISHING=true` активирует задание развертывания.

## Offene Themen в empfohlener Reihenfolge

1. **Актуальный обзор и стенд для проверки PR № 6592 prüfen.** Frühere Hinweise zu Objektrollen, npm-Ownern, `process.env` Журнал изменений и компактный режим не могут быть отключены от использования Fehler übernehmen. Entsprechende Korrekturen bzw. Unterstützung sind inzwischen vorhanden. Bei Bedarf einen aktuellen Objekt-Export bereitstellen und einen erneuten Check anfordern; Актуальные комментарии не были бы ошибочными.
2. **Lademodus и Ladeprofile am Fahrzeug prüfen.** Die Schreibzugriffe sind mit Mock- und Integrationstests abgedeckt; новый Steuerung benötigt noch einen Praxistest mit einem passenden Fahrzeug und dessen verfügbaren Modi/Profilen.

## Funktionsumfang

Адаптер находится в официальном интерфейсе MyŠkoda Public API и обеспечивает запуск/остановку нагрузки, климатизацию, стоянку и люфтинг для Ladelimit. `charging.settings.targetStateOfChargeInPercent` (50–100 % в 10-Процент-Шриттен). Derselbe Datenpunkt проводит опросы с актуальными Einstellung Einstellung. VIN-коды загружаются в момент конфигурации, а API имеет определенный список требований.

`charging.settings.preferredChargeMode` это для Моди Шрейббара. `chargingProfiles.profiles.<id>.configurationJson` enthält ein vollständiges Profil zum Lesen, Ändern und Zurückschreiben. Teilobjekte werden nicht zusammengeführt; unveränderte Felder müssen erhalten bleiben. Профиль был действительным и неактивным для других профилей, Modus, Ladelimit и Start/Stop eingereiht. Если вы хотите провести опрос в разделе «Профиль» в рамках Wartezeit, то вам понадобится локальный доступ к Schreibzugriff. Gleichzeitige App-Änderungen nach dem Letzten Poll, чтобы узнать больше о том, как API будет обновляться.

Умереть `*.enabled` -Schalter akzeptieren ausschließlich Boolean `true` унд `false`. Andere Werte werden ohne API-Aufruf, Quittierung или Änderung wartender Befehle ignoriert. `<vin>.refresh` fordert einen vorgezogenen Poll an; Квота, Befehlsreserve и Fehlerwartezeiten gelten dabei weiterhin.

Унтер `<vin>.info.polling` zeigen `nextPollAt`, `lastSuccessfulPollAt` унд `reason` этот план Scheduler-Plan, затем Letzten Erfolgreichen API-Abruf и Den aktuellen Wartegrund. Die Zeitstempel verwenden Unix-Millisekunden. Der letzte Erfolg bleibt über Neustarts erhalten; `0` bedeutet, dass kein Erfolg gespeichert ist. `nextPollAt` ist bei laufendem Request, lokalen Schreibwiederholungen или ausgesetztem Опрос `0`. Диагностика всех API-запросов и недоступность для Frische der Fahrzeugdaten. Bei gestoppter Instanz bleiben die zuletzt geschriebenen Werte stehen; erst der nächste Start ersetzt den alten Zeitplan. Полный список основных вопросов находится в README.

Унтер `<vin>.info.commandConfirmation.<group>` Доступ к API-интерфейсу Befehl je Steuerungsgruppe sichtbar: `status`, `name`, JSON-`target`, `sentAt`, `expiresAt` унд `confirmedAt`. Die Zustände sind `WAITING`, `CONFIRMED`, `TIMED_OUT` и найдите нужную конфигурацию Neustart `INTERRUPTED` für zuvor offene Vorgänge. Bestätigungen werden ausschließlich aus bestehenden Poll-Antworten abgeleitet; отдельный локальный таймер, который объединяется с Fristablauf. Это означает, что вы можете использовать API-вызовы во время проверок или автоматических опросов. Семантический фон `info.lastCommand` унд `ack=true` bleibt unverändert (API-Annahme).

Поддержка API **20 запросов по Stunde и VIN** . Чтобы получить VIN-код адаптера, сохраните квоту-ведро `<vin>.rateLimit.*`. Опросы останавливают настройку Befehlsreserve free. Befehle laufen über eine Queue mit Coalescing und TTL; nach einer angenommenen Operation после опроса Verifikations.

Der Objektbaum unter `<vin>` следуйте API-Antwort. Сообщается, что это не автоматический процесс нагревания. Fehlende Daten behalten ihren letzten Wert mit schlechtem Quality-Flag. Besondere Darstellungen sind:

- `charging.status.battery.remainingCruisingRangeInMeters`: Километр
- `activeVentilation.durationInSeconds`: Минута
- `auxiliaryHeating.durationInSeconds`: Минута
- `parkingPosition.position`: `lat;lon` für Karten und Geofencing
- Ladeprofile unter `chargingProfiles.profiles.<id>` statt nach Listenindex

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

| Берейх                  | Файлиен                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------ |
| API-Vertrag und Codegen | `spec/skoda-openapi.json`, `tools/spec.mjs`, `tools/generate-*.mjs`                  |
| HTTP и ошибки           | `src/lib/api/client.ts`, `errors.ts`, `sanitize.ts`                                  |
| Квота                   | `src/lib/quota/QuotaManager.ts`, `VehicleQuotaManager.ts`, `AdapterQuotaStore.ts`    |
| Polling und Befehle     | `src/lib/scheduler/PollScheduler.ts`, `src/lib/commands/CommandQueue.ts`             |
| States und Metadaten    | `src/lib/states/StateWriter.ts`, `objectOverlay.ts`, `objectNames.ts`                |
| Übersetzungen           | `admin/i18n/*/translations.json`, `src/lib/i18n.ts`, `src/lib/states/objectNames.ts` |
| Entwicklungs-API        | `test/mock/server.ts`, `test/fixtures/*.json`                                        |
| Тесты                   | Tests neben den Modulen, `test/package`, `test/integration.js`                        |

## Entwicklung und Prüfung

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

Мит `SKODA_API_BASE_URL=http://127.0.0.1:8099` kann auch der dev-server den Mock verwenden. Diese Variable darf auf einem Produktivsystem nicht gesetzt sein. В пользовательском интерфейсе администратора есть лучшая возможность свободной настройки API-Basis-URL.

Nach Änderungen an `src/` Одер `admin/` Вы можете использовать сервер разработчика в качестве нового пакета и загрузить данные адаптера. `build/` bleibt unversioniert, muss aber im npm-Paket enthalten sein. умереть `files` -Слушайте в `package.json` steuert den Paketinhalt; eine `.npmignore` wird dafür nicht verwendet. Используйте пакет для сборки.

## CI и релиз

Толкает `main`, Теги версий, запросы на включение и ручное изменение следующих параметров:

- TypeScript и ESLint в Ubuntu с Node 24
- Дополнительные тесты адаптеров для Ubuntu, Windows и macOS с узлами 22, 24 и 26

Bei Branch-Pushes überspringt der Pfadfilter reine Markdown-, `docs/` - унд `.vscode/` -Эндерунген; для запросов на вытягивание позолоченный фильтр. Der wöchentliche Spec-Wächter läuft montags und kann manuell gestartet werden. Dependabot prüft npm-Abhängigkeiten в 8. и GitHub Actions в 22. jedes Monats.

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

`npm run check:spec` Получите удовольствие от Live-Spec zu. Bei einer Abweichung zurst die neue Spec prüfen, die locale Kopie mit `node tools/check-spec.mjs --update` aktualisieren und dann `npm run codegen` аусфюрен. Спецификации, генерируемые типы и определения объектов, которые могут быть выбраны и проверены.

## Betriebsrelevante Hinweise

- Ключ API и S-PIN доступны в интерфейсе администратора. Бейде Фельдер и другие `encryptedNative` унд `protectedNative` задняя часть.
- Der Verbindungstest kostet einen Запросите получение VIN.
- `info.connection` wird bei `401` унд `403` ауф `false` gesetzt, bei erschöpfter Quota jedoch nicht.
- Ein abgelaufener Schlüssel сокращает количество опросов на einmal pro Stunde. Адаптер может быть использован в следующих случаях.
- Ответ на API для Befehle mit `202 Accepted` und bietet keinen Operationsstatus. `ack=true` bedeutet daher nur, dass der Befehl и API übergeben wurde.
- Logs und Fehler müssen durch `sanitize()` лауфен; VIN, API-ключ, S-PIN, адрес и позиция парковки не отображаются в журналах поддержки.
- Версия OpenAPI `v0`. Änderungen am Vertrag und am Rate-Limit bleiben ein laufendes Risiko.
- Nur der Enyaq ist mit echten Fixtures abgedeckt. Angaben für Verbrenner, Hybrid und Standheizung beruhen auf Spec und Mock.

## Дополнительная информация по адаптерам

- автоматическое удаление VIN-кодов
- Вер- унд Энтригельн, Хупе или Лихтупе
- Setzen eines beliebigen Ladestroms в Ампере (Profil-Presets) `REDUCED` /`MAXIMUM` sind möglich)
- автоматический Erneuerung des API-Schlüssels
- PV-Regelung; dafür gibt es `examples/pv-surplus-charging.js`
- Sentry oder andere externe Fehlertelemetrie

## Lokale Profilbearbeitung

- `ProfileEditor` stellt unter `chargingProfiles.profiles.<id>.edit` Айнцельфельдер, Wochentagsschalter sowie `apply` /`reset` Берейт. Результаты и опросы были сериализованы.
- Feldänderungen bleiben local; Примените лучший вариант Queue mit vollständigem Profil и ursprünglichem Snapshot. Keine zusätzlichen Lese- или запросы на проверку.
- `dirty`, `conflict`, `message` beschreiben den Entwurf; ACK должен быть локальным. Befehlsstatus und Bestätigung bleiben в `info.lastCommand` /`info.commandConfirmation`.
- Bei Neustart werden Entwürfe erst aus dem nächsten gültigen Poll neu aufgebaut. Применить/заблокировать профиль и заблокировать профиль.
- Тесты проводятся с другими конфликтами, идентификаторами таймеров, проверкой, запуском Felder, Neustart и другими методами с возможностью PUT в Integrationstest.

### Metadaten und Verfügbarkeit des Profileditors

- Einstellungsrollen: `switch.setting`, `level.setting.battery`, `level.setting.battery.min`, `text.setting`, драгоценности eindeutig про канал. Wiederholte Textfelder verwenden `text`, Неделя `switch`. Verfügbare Buttons bleiben `button`; nicht verfügbare Booleans erhalten `indicator`, Зален `value` и струны `text` драгоценности `read=true` /`write=false`.
- `profileEditorLabels.ts` enthält mehrsprachige Feldnamen, Auswahltexte und Hilfen. Wochentage приглашает нас `Intl` (UTC, zwischengespeichert). `common.states` verwendet Stringwerte в системном языке; ein Sprachwechsel wird nach Neustart wirksam.
- `initialize(vins)` Lest ausschließlich lokale States/Objecte und sperrt persistierte Editorfelder bis zum nächsten gültigen Poll. `edit.available` zeigt die Verfügbarkeit.
- Entfernte Felder bleiben mit letztem Wert erhalten: `write=false`, `q=1`, übersetzte Beschreibung. Rückkehr setzt Metadaten und Qualität zurück. Änderungen an einem lokalen Entwurf bleiben bei Konflikten erhalten; nicht verfügbare Felder без ответа.
- Миграция актуальна для сокращения метаданных. Benutzerdefinierte Namen und andere Einstellungen wie History bleiben erhalten. Keine zusätzlichen Fahrzeugrequests.

### Локализованные диагнозы

`diagnosticTranslations.ts` übersetzt Editormeldungen und die Labels der Polling- und Bestätigungsstatus во всех эльфийских языках. Die Systemsprache wird beim Start einmal gelesen; Backendlogs на английском языке, API-Werte и коды состояния непроверены. Форхандене `common.states` werden gezielt migriert, abgeschlossene Bestätigungen bereits beim Start. Sprachwechsel benötigen einen Adaptneustart. Тесты на проверку Rollenkonsistenz und Eindeutige Detaillierte Rollen auch nach Ausfall, Wiederkehr und Neustart; der Integrationstest läuft mit deutscher Systemsprache и unveränderter Anzahl an Fahrzeugrequests.