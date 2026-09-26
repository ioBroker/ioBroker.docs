---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.skoda-public-api/docs/design-decisions.md
title: Entwurfsentscheidungen - ioBroker.skoda-public-api
hash: zV0G2eT8/11jCgsfrbVf/WJvQ/7B4ftQDSL/x+NdtXo=
---
# Entwurfsentscheidungen — ioBroker.skoda-public-api

Этот документ содержит информацию о продуктах и архитектуре. Если это не так, вы должны быть уверены в том, что были готовы, и что вы должны быть готовы к инвариантности.

## Randbedingungen der API (недоступно)

Quelle: <https://public.api.connect.skoda-auto.cz/docs> , проверьте спецификацию `spec/skoda-openapi.json` (`info.version: v0`).

| Eigenschaft               | Верт                                                                           |
| ------------------------- | ------------------------------------------------------------------------------ |
| Аутентификация            | статишер `X-API-Key`, добавление в приложение MyŠkoda (ab v8.16)               |
| Key-Gültigkeit            | begrenzt, Ablauf nur через заголовок `X-API-Key-Expires-At` sichtbar            |
| Key-Bindung               | an die bei der Erstellung ausgewählten VIN-коды                                |
| Базовый URL               | `https://public.api.connect.skoda-auto.cz/api/v1`                              |
| Lese-Endpunkte            | genau einer: `GET /vehicles/{vin}` (необязательный `?include=`)                 |
| Schreib-Endpunkte         | 8 POST для запуска/остановки плюс 3 PUT для Ladelimit, Lademodus и Ladeprofile |
| Ограничение скорости      | **20 запросов/Stunde pro VIN**                                                 |
| Quota-Verbrauch           | все ответы **далее** 401, 403, 429                                             |
| Rückmeldung auf Befehle   | `202 Accepted`, **ключ Операция-Статус-Конечная точка**                       |
| Список автомобилей        | **существует нет** — VIN должен быть вручную настроен                          |
| Push-уведомления/веб-хуки | кеине                                                                          |

Ничего в API не включено и не работает: Ver-/Entriegeln, Hupe/Lichthupe, Setzen eines beliebigen Ladestroms in Ampere und auto-Key-Rotation. Ziel-SoC, Lademodus und vollständige Ladeprofile с использованием Schreib-States verfügbar. In einem Ladeprofil канн `maxChargingCurrent` ауф `REDUCED` Одер `MAXIMUM` gesetzt werden.

## Entscheidungen

### E1 — Qualitätsniveau: Veröffentlichung über npm и ioBroker

Адаптер работает на npm и GitHub, а также для официального репозитория ioBroker. `latest` gepflegt. `stable` Сначала начните проводить тесты и обратную связь. Grundlage sind eine vollständige `io-package.json`, JSON Config, автоматические тесты, матрица платформ для выпусков и воспроизведения npm-пакетов. **Начало:** Offentliche Verteilung braucht nachvollziehbare Metadaten, Migrationen und Prüfungen über alle unterstützten Plattformen.

### E2 — Имя: `ioBroker.skoda-public-api`

npm-Paket `iobroker.skoda-public-api`. Bindestrich statt Unterstrich (Конвенция: 271 от 797 Repo-Adaptern nutzen Bindestriche, 8 nutzen Unterstriche). Terminologie folgt Škoda («Общественный API MyŠkoda»). **Начало:** Herkunft soll im Namen erkennbar sein, um Verwechslung mit `vw-connect` (неофициальное приложение App-API) отключено.

### E3 — Anwendungsfälle

Мониторинг/ВИС, условия эксплуатации, время/предварительные нагрузки, sowie **eingeschränktes PV-Überschussladen** per Bang-Bang. **Bekannte Einschränkung:** Ohne Strommodulation (API kann sie nicht) ist Überschussladen nur sinnvoll, wenn der AC-Ladestrom в MyŠkoda-App auf `REDUCED` (з. Б. 10 А ≈ 2,3 кВт einphasig) steht. Настенная коробка (Bosch) имеет свободный доступ к Lademanagement и Scheidet als Regelorgan aus.

### E4 — Regellogik оставил адаптеры

Адаптер — это лучшая привязка API. Hysterese, Schwellen и Mindestlaufzeiten используются в сценарии ioBroker. Vorlage commt nach `examples/pv-surplus-charging.js`. **Начало:** Jede PV-Anlage Hat andere State-IDs und Zählersemantik; Вы можете включить мгновенную конфигурацию или нажать на кнопку «Конфигурация и устройство для адаптера без тестовой панели». Die **Quota-Verwaltung bleibt aber im Adaptor** — вам нужен новый скрипт скорости-ограничения-логики.

### E5 — Подробности: очередь с объединением, TTL 10 минут

Befehl kommt в своей очереди, wird ausgeführt sobald Budget da ist, verfällt nach 10 min. Эргебнис в `info.lastCommand.result`: `SENT`, `QUEUED`, `COALESCED`, `EXPIRED`, `REJECTED_BY_VEHICLE`. **Начало:** Bang-Bang-Regelung produziert Schaltnervosität (Wolke zieht durch). Объединение происходит в рамках собственного бюджета, в рамках бюджета.

Auch ein mit `202` angenommener Sollwert darf gleiche Schreibvorgänge nur begrenzt unterdrücken. Die Bestätigungsfrist ab Annahme entspricht der configurierten TTL. Ein passender Ist-Zustand mit neuerem Fahrzeugzeitstempel hebt sie vorzeitig auf. Nach Ablauf werden neue Schreibvorgänge wieder gegen frische Daten geprüft; ohne neuere Daten gilt der Ist также unbekannt. Кейн автоматизирует Наксенден.

Der beobachtete Bestätigungsstatus steht getrennt unter `info.commandConfirmation.<group>.*`: `WAITING`, `CONFIRMED`, `TIMED_OUT` oder nach einem Neustart `INTERRUPTED`. Jede Gruppe beschreibt den letzten angenommenen Befehl, nicht den letzten Schreibversuch. Neue angenommene Befehle derselben Gruppe ersetzen die Beobachtung; Объединение verlängert die Frist nicht. Der ursprüngliche Sendestatus в `info.lastCommand` bleibt unverändert.

**Неизменная квота:** Die Anzeige verwendet ausschließlich bestehende Poll-Antworten. Каждый локальный таймер объединяется с Fristablauf, он отправляется в очередь отправки или в PollScheduler, который вы хотите. Weder zusätzliche API-Abfragen noch autotische Wiederholungen sind zulässig. Bestätigung verlangt einen passenden Wert und einen neueren Zeitstempel des betreffenden fehlerfreien Antwortblocks. Ein Timeout ist kein Nachweis, dass das Fahrzeug den Befehl nicht ausgeführt Hat; nach Fristablauf eintreffende Daten ändern den abgeschlossenen Status nicht nachträglich.

### E6 — Интерфейс Befehls: первый раз, кнопки секунд

`<vin>.charging.enabled`(`role: switch`) trägt den **Soll-Zustand** ; `<vin>.charging.start` /`.stop` (`role: button`) erzwingen einen Aufruf. Логическое определение: `true` генау бей `charging.status.state === 'CHARGING'`. `CONNECT_CABLE`, `READY_FOR_CHARGING`, `CONSERVING` синд `false`. **Begründung:** Coalescing auf einem Soll-Zustand — это тривиальный Vergleich; Кнопки представляют собой эвристический метод. `ack=true` bedeutet **"an die API übergeben"** , nicht "das Auto Hat es Getan" — mehr weiß der Adaptor wegen `202` ohne Status-Endpunkt nicht.

### E7 — Объект: 1:1 — Шпигель API

Вурзель — это VIN. Структура должна быть точной в формате JSON Antwort. **Начало:** Бэй `version: v0` erscheinen neue Felder von Selbst; umbenannte Felder упал в Regenerieren als Compile-Fehler auf stattals State, der все еще aufhört sich zu aktualisieren. **Typisierung** kommt aus der Spec (`type`, `unit`, `role`, `common.states` со стабильными Enum-Labels), unbekannte Felder werden dynamisch mit geratenem Typ angelegt. **Ausnahmen vom 1:1-Принцип:** zusätzlicher State `parkingPosition.position` формат `lat;lon` мит `role: value.gps` для карты VIS и адаптера Geofence.

**Anzeigeeinheiten:** `charging.status.battery.remainingCruisingRangeInMeters` wird durch 1000 geteilt и в км dargestellt. `activeVentilation.durationInSeconds` унд `auxiliaryHeating.durationInSeconds` werden durch 60 geteilt und in Minuten dargestellt. Лучшие идентификаторы можно использовать, а также в случае завершения API-интерфейса. Der StateWriter rechnet ausschließlich empfangene API-Werte um, ohne Rundung, und actualisiert vorhandene Objekteinheiten und Standardbeschreibungen beim nächsten Empfang des Felds. Эйджин Намен Блейбен Эрхальтен. Gespeicherte Zeitreihen werden nicht rückwirkend umgerechnet; Сценарий: Anzeigeeinheiten berücksichtigen. Спецификации, приспособления и дополнительные сведения можно использовать в API-Einheiten.

### E8 — Умганг с неожиданным ответом

Fehlende Teile **nicht** auf `null` сетцен. Letzter Wert bleibt stehen, Флаг качества wird auf "nicht Gut" Gesetzt, `errors[]` landet als JSON in `info.lastErrors`. Zusätzlich `<vin>.info.dataAge` в Sekunden из `carCapturedTimestamp`. **Begründung:** `200` только после этого необходимо вернуться к работе. Ohne diese Regel flackert die VIS; охне `dataAge` Hält man tagagealte Werte für aktuelle.

Der Writer übernimmt vorhandene States und Qualitätsflags beim ersten Poll nach dem Start. Небен Тейльфелерн в `errors[]` markiert er auch verschwundene Felder InternalHalb Gelieferter Teile und entfernte Profile. Absichtlich nicht angeforderte Teile bleiben unverändert. `dataAge` ist eine Momentaufnahme zum letzten erfolgreichen Poll und bezieht sich auf den jüngsten Zeitstempel, nicht auf die Aktualität sämtlicher Einzelwerte.

### E9 — Instanzmodell: eine Instanz = ein API-Key, n VIN

Эйн Квота-Ведро про VIN. API создает 20 запросов для Stunde je Fahrzeug; Antwortheader und Reset-Fenster verschiedener VINs duerfen sich daher nicht gegenseitig ueberschreiben. Джедер Бакет работает `<vin>.rateLimit.*` настойчивый. **Ничего особенного:** больше ключей для мгновенного возврата квоты. Ein API-Key может быть использован для всех вариантов использования Erstellung ausgewaehlten Fahrzeuge abdecken; На сервере необходимо начать с VIN-кода, чтобы мы могли использовать ненужную квоту.

### E10 — Ключ-Ablauf: ioBroker-Notification-System плюс состояния

`info.apiKey.expiresAt`, `info.apiKey.daysRemaining`; Лог-Эскаляция на ул. 14/7/2 Таген; `registerNotification()` in einem eigenen Scope (siehe `io-package.json` →`notifications`). Bei abgelaufenem Key: Опрос со скоростью 1×/ч. `info.connection` вирд `false` bei 401/403, **nicht** bei 429 — ein erschöpftes Budget ist Normalbetrieb. **Начало:** Reparatur erfordert zwingend einen Menschen mit dem Handy in der Hand. Когда вы активируете работу с Ausfall wochenlang nicht auf, weil alte Werte laut E8 stehenbleiben.

### E11 — Стек: TypeScript, минимальный Laufzeitabhängigkeiten

Узел ≥ 22, CI-Matrix 22 и 24. Typen werden aus der eingecheckten Spec Generiert. HTTP-Aufrufe verwenden аборигены `fetch`; einzige direkte Laufzeitabhängigkeit ist `@iobroker/adapter-core`. JSON Config statt HTML-Admin. Ein wöchentlicher CI-Job vergleicht Škodas Live-Spec с отдельной копией. **Начало:** Der Antwortbaum ist fünf Ebenen Tief und auf jeder Ebene необязательно — в JS ist ein `TypeError` ауф `undefined` nur eine Frage der Zeit.

### E12 — Стратегия тестирования: Mock-Server плюс модульные и интеграционные тесты

**Кернпункт: Использование API может быть невозможным.** 20 запросов и около 20 минут отладки. Der Mock — это не Entwicklungssystem, а не тестовая инфраструктура. Эээ мсс `RateLimit-*` реалистичные действия и командование `429`, `401`, `422` und Teil-Fehler in `errors[]` Эрцойген. Базовый URL-адрес не имеет переменной Umgebungs überschreibbar, **его нет** в интерфейсе администратора.

### E13 — Штаты entstehen nur für tatsächlich gelieferte Teile

Кейн Вораб-Анлеген из Спец. **Nie autotisch löschen.** Anlage einmal pro Pfad, danach nur `setStateChanged`. **Mechanismus:** Ohne `include` Lifert die API genau die unterstützten Teile, schweigend. Das ist die eingebaute Fähigkeitserkennung. `include` spart keine Quota.

### E14 — Защита данных

Эйне `sanitize()` -Функция в HTTP-схеме маскировки VIN и API-ключа **при** объединении, прежде чем использовать этот модуль. Nie eine Fehlermeldung aus einer rohen URL bauen. **Начало:** Die VIN указан в URL-адресе; ioBroker-Logs добавляется на форум. Зусаммен мит `formattedAddress` ergäbe das die Heimatadresse im Klartext. Стандартное **положение** парковки; abschaltbar и через `include` gar nicht erst angefordert. Внешняя телеметрия не активна и не дает возможности получить собственные данные.

### E15 — Повторные попытки дифференциала по типу сообщения

См. Таблицу в `implementation-plan.md`, Abschnitt "Fehlerbehandlung". Кернрегель: ** `5xx` verbraucht Quota** → höchstens **ein** Wiederholungsversuch, mit Jitter и nur oberhalb der Befehlsreserve. Бейде `429` sind gratis → dort geduldig sein. Iст. `Retry-After` länger als die Rest-TTL, Befehl sofort als `EXPIRED` верверфен. **Befehls-States entstehen aus derselben Fähigkeitserkennung wie die Lese-States:** Fehlt `auxiliaryHeating` in der Antwort, wird kein `auxiliaryHeating.start` angelegt.

### E16 — Прослушивание: ID-база профиля, JSON-подсказка

`chargingProfiles.profiles.<id>.name` унд `.targetStateOfChargeInPercent` также штаты; `.timersJson` унд `.preferredChargingTimesJson` также JSON-состояния. **Begründung:** Index-basiert (`profiles.0`) Zeigt nach dem Löschen eines Profiles в приложении все еще находится в другом профиле. Die bisherigen Detailzustände bleiben только для чтения. `.configurationJson` Если вы хотите использовать профиль из атомных источников, вы можете использовать API для создания профиля. Это подразумевает наличие обновлений. Strikte Validierung und ein Vergleich mit dem zuletzt gepollten Profil verhindern ungültige Requests und das Überschreiben zwischenzeitlich erkannter Änderungen. Серверные версии не могут быть загружены, если приложение не используется.

### E17 — Profilentwürfe local Bearbeiten, Explizit Gemeinsam Senden

`chargingProfiles.profiles.<id>.edit.*` trennt lokale Eingaben von den gelesenen Fahrzeugdaten. Для обеспечения стабильных идентификаторов, таймера и времени суток; unbekannte API-Felder bleiben erhalten. `apply` übergibt genau ein vollständiges Profil и vorhandene Queue, `reset` verwendet ausschließlich den letzten Опрос. Einzelfeldänderungen и Reset erzeugen keine Requests. ACK в редакторе bedeutet nur local übernommen; Befehlsannahme und Fahrzeugbestätigung stehen weiterhin в диагностических состояниях.

Entwürfe behalten ausgangsversion. Änderungen aus späteren Опросы, блокирующие Применить; die Queue prüft Dieselbe Ausgangsversion nochmals bei Aufnahme und Versand. Ein abweichendes noch laufendes Profilupdate darf durch den Editor nicht überschrieben werden. Видерхольтес Применяйте лучшее средство для коалесценции. Абгелауфен Бефеле сперрен кейне манулен Видерхолунген. Entwürfe werden nach Neustart erst mit einem erfolgreichen Poll neu Initialisiert, nie autotisch wiederhergestellt orer gendet. Формат JSON-Befehle bleiben совместим. Приложение не может быть использовано для просмотра серверов версий, которые можно загрузить в Restrisiko.

Редактор очень важен `.setting` -Rollen und mehrsprachige Metadaten. Wiederholte Textfelder und Wochentage nutzengenerische `text` -/`switch` -Rollen, damit keine Detaillierte Rolle Internalhalb eines Kanals mehrfach vorkommt. Auswahltexte weil als Strings in der System-Sprache подсказка, хорошо `common.states` Стрингверте эрвартет. Bereits vorhandene Objekte werden gazielt migriert; Eigene Namen und History bleiben unangetastet. Entfernte Felder werden nicht gelöscht, sondern mit `write=false`, `q=1` und Verfügbarkeitsbeschreibung behalten. Nicht verfügbare Felder erhalten passende Nur-Lese-Rollen (`indicator`, `value`, `text`) мит `read=true`; insbesondere entstehen keine Buttons с `read=false` унд `write=false`. Bei Rückkehr werden Bedienrollen und Schreibrechte wiederhergestellt. Ein erneuter Poll может быть реактивным. Dasselbe gilt beim Start, bis neue Fahrzeugdaten vorliegen. `edit.available` ist eine lokale Диагностика; weder Migration noch Verfügbarkeitsprüfung erzeugen Fahrzeugrequests.

Редактор, опрос и лучшие настройки обеспечивают стабильные локализованные коды. Anzeigen folgen der Systemsprache, Maschinenwerte und English Backendlogs bleiben unverändert. Bestehende Diagnose-Labels werden ohne Änderung von Benutzer-Metadaten migriert; auch abgeschlossene Befehlsbestätigungen erhalten beim Start aktuelle Labels.

## Bekannte Restrisiken

1. **Bang-Bang bleibt ein Kompromiss.** Die Wirksamkeit des Überschussladens entscheidet sich an der App-Einstellung `REDUCED`, nicht am Adapter.
2. ** `429 vehicle-not-accepting-requests` kommt vom Auto** , nicht von der Quota. Канн Schaltvorgänge blockieren, obwohl Budget da ist. Von außen nicht vorhersehbar.
3. **API список `v0` ** , Ограничение скорости laut Doku ausdrücklich nicht endgültig — в Beide Richtungen.
4. **Нур дер Эньяк — это тестовая полоса.** Все Verbrenner-, Hybrid- и Standheizungsspezifische доступны в Spec plus Mock.
5. **Die Spec hat Fehler.** `Charging` унд `ChargingProfile` enthalten je ein Feld `tings`, das rekursiv auf den eigenen Typ zeigt — offensichtlich ein abgeschnittenes `settings` Генератор от Шкодас. Der Codegen braucht dafür eine Ausnahme, sonst entsteht eine unendliche Typrekursion.
6. **Entwicklung läuft auf Node 26, Produktion auf Node 22.** Bewusst so entschieden (kein Versionsmanager auf dem Mac). Консеквенц: Merkwürdigkeiten im `dev-server` Прежде всего, если версия узла будет изменена, возможно, вы обнаружите ошибку. `js-controller` 7.2.2 declariert `>=18`, это не будет проверено на узле 26.