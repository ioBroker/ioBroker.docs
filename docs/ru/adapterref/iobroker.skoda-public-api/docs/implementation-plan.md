---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md
title: Technische Arbeitsgrundlage und Offene Umsetzung
hash: VnW2Ss694AofYTftOtfKtO2h6svIDGS4vMH/LpGjyKM=
---
# Technische Arbeitsgrundlage und Offene Umsetzung

Этот документ описывает актуальную реализацию и ночную подготовку. Dauerhafte Produkt- und Architekturentscheidungen stehen в[`design-decisions.md`](/#/docs/adapterref/iobroker.skoda-public-api/docs/design-decisions.md) ; дер оперативный статус проекта находится в[`../HANDOFF.md`](/#/docs/adapterref/iobroker.skoda-public-api/HANDOFF.md) .

## 1. Системные границы

Адаптер привязан к официальному публичному API MyŠkoda и ioBroker. Лучшее API в следующих случаях:

- статистик, ключ API-ключа для использования VIN-кодов
- 20 запросов по Stunde и VIN
- ein Lese-Endpunkt und keine Fahrzeugliste
- keine Push-Nachrichten или Webhooks
- Befehlsannahme mit `202 Accepted`, но не операционный статус
- keine autotische Schlüsselnerneuerung
- Версия OpenAPI `v0` mit möglichen Vertragsänderungen

Diese Grenzen machen Quota-Verwaltung, Permanente Zeitfenster, Adaptive Poll-Kadenz und einen vollständigen localen Mock zu Bestandteilen des Produktverhaltens.

## 2. Актуальная архитектура

| Бауштайн                             | Ответственность                                                      |
| ------------------------------------ | -------------------------------------------------------------------- |
| `src/main.ts`                        | ioBroker-Lebenszyklus, Initialisierung und Verdrahtung               |
| `src/lib/config.ts`                  | Проверка, настройки по умолчанию и изменение мгновенной конфигурации |
| `src/lib/i18n.ts`                    | English Backend-Formatierung und mehrsprachige Objektnamen           |
| `src/lib/api/client.ts`              | HTTP-Aufrufe, Header-Metadaten и typisierte Ergebnisse               |
| `src/lib/api/errors.ts`              | Zuordnung der API-Fehler gemäß Abschnitt 5                           |
| `src/lib/api/sanitize.ts`            | Разумная маска Daten vor Log-Ausgaben                                |
| `src/lib/quota/*`                    | ein persister Stunden-Bucket про VIN                                 |
| `src/lib/scheduler/PollScheduler.ts` | Опросы-Reihenfolge, Frische-Backoff и Verifikations-Опросы           |
| `src/lib/commands/CommandQueue.ts`   | TTL, Объединение, Резерв и Повторные попытки                         |
| `src/lib/states/StateWriter.ts`      | Objektanlage, Werte, Quality-Flags und Migrationen                   |
| `src/lib/states/objectOverlay.ts`    | Rollen, Einheiten, Enum-Labels und Anzeigeumrechnungen               |
| `src/lib/states/objectNames.ts`      | немецкое и английское название объекта                               |
| `src/lib/notifications/keyExpiry.ts` | Ablaufüberwachung und ioBroker-Уведомления                           |
| `test/mock/*`                        | Steuerbarer Ersatz для запуска квот Live-API                         |

Начальный уровень является верным: если вы хотите настроить конфигурацию, вы можете использовать постоянные квоты-ведра. Сначала запустите CommandQueue и PollScheduler. Итак, erzeugt eine Neustartschleife kein scheinbar frisches Request-Budget.

## 3. Поведение и инварианты

### Опрос и квота

- Jede VIN besitzt einen eigenen `QuotaManager`.
- Antwortheader sindie Quelle der Wahrheit für Limit, Restbudget und Reset-Zeit.
- Опрос verwendet die Befehlsreserve nicht.
- Ein unveränderter `carCapturedTimestamp` verdoppelt die Poll-Kadenz bis zur configurierten Obergrenze.
- Активируйте или начните с того, что вы должны начать работу.
- Опрос-Durchläufe и сериализация; ein angeforderter Verifikations-Poll geht während eines laufenden Durchlaufs nicht verloren.
- Quota-Daten liegen unter `<vin>.rateLimit.*` und überleben Neustarts.
- Scheduler-Änderungen werden ohne zusätzliche API-Abfragen über `onScheduleChange` и это было сделано в StateWriter. Die Diagnose-Schreibvorgänge werden je VIN серийный номер и vom Adaptor-Lebenszyklus überwacht; sie Blockieren keine Fahrzeugabfragen.
- `<vin>.info.polling.*` После первого опроса терминала, после запуска Neustarts можно использовать API-Abruf и стабильный код состояния. Lokale Schreib-Retries gelten nicht als neue Polls; bei ihnen, laufenden Запросы и опросы `nextPollAt` глейч `0`. Ein HTTP-Erfolg sagt nichts über die Fahrzeugdatenfrische aus.

### Бефеле

- `enabled` bildet den Sollzustand ab; `start` унд `stop` erzwingen einen Aufruf.
- Gleiche Sollwerte werden bei bekannt passendem Ist oder während einer offenen Bestätigung zusammengeführt.
- Die Bestätigungsfrist entspricht der Command-TTL. Ein neuerer Fahrzeugzeitstempel mit passendem Ist bedet sie vorzeitig.
- Будьте осторожны с бюджетом, если он зависит от TTL в очереди.
- Нач `202 Accepted` Wird nach 60 Sekunden ein Verifikations-Poll angefordert.
- `ack=true` Лучше всего использовать API, а не Ausführung im Fahrzeug.
- `info.commandConfirmation.<group>.*` ergänzt pro Steuerungsgruppe den letzten angenommenen Befehl um einen sichtbaren Bestätigungsstatus. Nur passende Werte mit neuerem Zeitstempel im betreffenden fehlerfreien Antwortblock gelten als bestätigt.
- Ein сепаратор локальный таймер Meldet `TIMED_OUT`, без очереди или опросов. Bestätigungen nutzen ausschließlich die bereits vorhandenen Polls. Die Frist начинается с API-Annahme и wird durch Coalescing nicht verlängert.
- Bei Neustart werden zuvor offene Bestätigungen local als `INTERRUPTED` Маркерт; sie werden nicht wieder gesendet. Диагностика с серийным номером VIN.

### Объектная стена

- Объект предназначен для получения желаемого результата.
- Адаптер не работает автоматически.
- Fehlende oder fehlerhafte Teile behalten den letzten Wert mit schlechtem Quality-Flag; zurückkehrende Werte erhalten wieder gute Qualität.
- Ladeprofile возвращается к идентификатору профиля.
- Определения названий объектов и их использование в метаданных. Обратите внимание на стандартные названия и новые ролики адаптера, которые нужно мигрировать.
- Anzeigeumrechnungen betreffen nur State-Werte und Metadaten: Restreichweite wird в км, Lüftungs- und Standheizungsdauer в минутах. API-Antworten, Fixtures und Befehlsdaten bleiben unverändert.

### Datenschutz und Sprache

- API-ключ и S-PIN-код `encryptedNative` унд `protectedNative`.
- VIN, Schlüssel, S-PIN, адрес и данные о позициях для каждого модуля в обычном порядке.
- Пользовательский интерфейс администратора и дополнительные возможности управления объектами.
- Журналы, уведомления и дополнительные тесты на английском языке, если они недоступны для системной практики в Support-Anfragen verständlich bleiben.

## 4. Entwicklung, тесты и выпуск

Lokale Mindestprüfung:

```bash
npm run check
npm run lint
npm test
npm run build
```

Для планирования, квоты, изменения, сохранения, миграции объектов или адаптера-Lebenszyklus ist zusätzlich `npm run test:integration` эрфордерлих. Änderungen am API-Vertrag benötigen `npm run check:spec`, anschließend bei Bedarf `npm run codegen` и умереть Prüfung der Generierten Diffs.

Der Mock — это система Entwicklungssystem for API-Verhalten:

```bash
npm run mock
SKODA_API_BASE_URL=http://127.0.0.1:8099 npx iobroker-dev-server run default
```

Pushes, Pull Requests и Tags для TypeScript, ESLint и адаптерных тестов для Ubuntu, Windows и macOS с Node 22, 24 и 26 или более. Тег версий veröffentlicht nach erfolgreicher Matrix über npm Trusted Publishing и erzeugt den GitHub-Release.

Vor einem Release:

1. offene История изменений-Einträge prüfen
2. vollständige lokale Prüfung einschließlich Integrationstest ausführen
3. vollständigen GitHub-Рабочий процесс вручную ausführen
4. `npm pack --dry-run` prüfen; `build/main.js` и умереть Admin-Übersetzungen müssen enthalten sein
5. Версия мит `npm run release` vorbereiten
6. Release-Commit und Tag pushen
7. npm-пакет и контроль выпуска GitHub

## 5. Fehlerbehandlung

| Муравьиная нить                      | Квота     | Повторить попытку | Реакция                                                   |
| ------------------------------------ | --------- | ----------------- | --------------------------------------------------------- |
| `202 Accepted`                       | джа       | —                 | Verifikations-Poll nach 60 s                              |
| `400 Bad Request`                    | джа       | нет               | Адаптерfehler loggen, Befehl verwerfen                    |
| `401 api-key-expired`                | нет       | нет               | `connection=false`, Уведомление, Опрос einmal pro Stunde |
| `403 api-key-not-authorized`         | нет       | нет               | `connection=false`, Konfigurationshinweis                |
| `403 operation-not-authorized`       | джа       | нет               | Befehl verwerfen und loggen                               |
| `404 Not Found`                      | джа       | нет               | Выбор VIN, Опрос для получения VIN                        |
| `422 operation-not-supported`        | джа       | нет               | Fähigkeit dauerhaft merken, Государственная деактивация   |
| `422 operation-disabled`             | джа       | нет               | Befehl verwerfen, Fähigkeit nicht dauerhaft ändern        |
| `429 rate-limit-exceeded`            | нет       | бис TTL           | `Retry-After` abwarten, Befehl в Queue Lassen             |
| `429 vehicle-not-accepting-requests` | нет       | макс. 3           | `Retry-After` и откат                                     |
| `500`, `503`, `504`                  | джа       | макс. 1           | Джиттер; Нур Оберхальб дер Бефельсрезерв                  |
| Ошибка сети или таймаут              | небеканнт | макс. 1           | консервативный подход к делу                              |

Умереть `RateLimit-*` -Header korrigieren locale Schätzungen. Insbesondere wird `403 operation-not-authorized` Консервативное обращение с цитируемыми материалами требует обязательного использования API-Regel 403-Antworten ausnimmt. Ein Netzwerkfehler cann nach servereitiger Buchung entstehen und zählt deshalb ebenfalls konservativ als verbraucht.

## 6. Offene Umsetzung

### ioBroker Последние новости

- Новая объектная структура из Einer Laufenden Instanz Exportieren und An[`ioBroker.repositories#6592`](https://github.com/ioBroker/ioBroker.repositories/pull/6592) анхенген
- Checker erneut starten und verbleibende Befunde Bearbeiten
- `bluefox` als npm-Owner hinzufügen
- manuellen ioBroker-Review bis zur Aufnahme в `latest` беглетен

### Zusätzliche Schreiboperationen

Das Ladelimit ist über `charging.settings.targetStateOfChargeInPercent` umgesetzt: ein gemeinsamer Lese-/Schreib-State mit autotischer Migration bestehender Objekte, Validierung auf 50 bis 100 % в 10-Prozent-Schritten, eigene Coalescing-Gruppe und Verifikations-Poll. Der State entsteht, sobald das Fahrzeug die Zieleinstellung Lifert; API-Ablehnungen wie wie bei Start/Stop behandelt.

Der Lademodus verwendet den bestehenden State `charging.settings.preferredChargeMode`. Schreibwerte müssen bekannte Modi sein und in den zuletzt gelesenen `availableChargeModes` воркоммен. Bestehende Objekte werden schreibbar migriert.

Профиль имеет нумерованный идентификатор профиля, который используется в формате JSON-State. `chargingProfiles.profiles.<id>.configurationJson`. Vollständige Profil-Payloads действительно действителен; es gibt kein подразумевает Zusammenführen von Teilobjekten und keine Neuanlage. Ein zwischenzeitlicher Poll mit geändertem, entferntem или fehlendem Profil verwirft wartende Updates. Ничто не может быть изменено для других клиентов, которые хотят быть в Рестрисико.

Modus und jedes Profil haben eigene Coalescing-Gruppen. Квота, TTL, обработка запросов, API-Quittierung и Verifikations-Polls, которые могут быть использованы в очереди. Mock- und Integrationstests prüfen die neuen Schreibpfade; ein Praxistest mit passenden Fahrzeugfunktionen steht noch aus.

### Komfortable Profilbearbeitung

Umgesetzt: lokaler `edit` -Bereich mit Einzelfeldern für Name, vorhandene Einstellungen, Timer und Zeitfenster; Wochentage как Schalter. `apply` отправить профиль профиля в очередь, `reset` verwirft den Entwurf ohne Request. Ausgangssnapshot и Laufende Profilbefehle werden vor Versand geprüft. `dirty`, `conflict` унд `message` machen den Bearbeitungsstand sichtbar. Опросы erhalten geänderte Entwürfe; nach Neustart начинает умирать Bearbeitung mit neuen Fahrzeugdaten. Unit- und Integrationstests sichern die Bündelung mehrerer Änderungen und unveränderte API-Aufrufzahlen ab.

Zusätzlich umgesetzt: специальные Einstellungsrollen, vollständige Feldbeschriftungen und Hilfetexte sowie localisierte Auswahlwerte. Alte Objekte werden ohne Verlust eigen Namen или History-Einstellungen migriert. Entfernte beziehungsweise noch nicht frisch bestätigte Editorfelder sind schreibgeschützt und als nicht verfügbar gekennzeichnet; `edit.available` Zeigt die Profilverfügbarkeit. Wiederkehrende Felder weeder reaktiviert. Тесты включают Rollen, Sprache, Migration, Neustart и Verfügbarkeitswechsel ab.

Вы можете проверить регрессионные тесты, используя Rolle/Schreibrecht-Konsistenz, а также для них не использовать кнопки, а также подробные сведения о канале, чтобы увидеть Wiederherstellung nach Rückkehr. Editormeldungen und Diagnose-Labels in allen elf Sprachen verfügbar; Тестирует стабильные коды состояния и лучшую миграцию Label-Zuordnungen ab.

### Laufende Wartung

- Änderungen der OpenAPI-`v0` -Spec prüfen und Codegen anpassen
- Действия и действия GitHub для завершения работы Dependabot
- Verhalten weiterer Fahrzeugtypen mit anonymisierten Fixtures absichern
- Компактный режим сначала включает настройки таймера и режима работы.