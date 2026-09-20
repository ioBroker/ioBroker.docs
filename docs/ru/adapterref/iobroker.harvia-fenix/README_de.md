---
chapters: {"pages":{"en/adapterref/iobroker.harvia-fenix/README.md":{"title":{"en":"ioBroker.harvia-fenix"},"content":"en/adapterref/iobroker.harvia-fenix/README.md"},"en/adapterref/iobroker.harvia-fenix/README_de.md":{"title":{"en":"ioBroker.harvia-fenix"},"content":"en/adapterref/iobroker.harvia-fenix/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.harvia-fenix/README_de.md
title: ioBroker.harvia-fenix
hash: gDGRWUA6Gt3YqueeZ/a+FPm7a5nKWes0s/2jOybUQP0=
---
![Загрузки](https://img.shields.io/npm/dm/iobroker.harvia-fenix.svg)
![узел](https://img.shields.io/node/v/iobroker.harvia-fenix.svg)
![Лицензия](https://img.shields.io/npm/l/iobroker.harvia-fenix.svg)
![Проблемы на GitHub](https://img.shields.io/github/issues/meistermopper/ioBroker.harvia-fenix.svg)
![Количество установок](https://iobroker.live/badges/harvia-fenix-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/harvia-fenix-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.harvia-fenix.png?downloads=true)
![Тестирование и выпуск](https://github.com/meistermopper/ioBroker.harvia-fenix/workflows/Test%20and%20Release/badge.svg)

<p align="center">
  <img src="admin/fenix.png" alt="Logo" width="200" />
</p>

# ioBroker.harvia-fenix

**[Нажмите здесь, чтобы просмотреть англоязычную версию документации.](/#/adapters/harvia-fenix)**

### Адаптер ioBroker для интеграции и управления **Harvia Fenix** Saunasteuerung über die MyHarvia Cloud-Infrastruktur.

Für weitere Informationen über Harvia und deren Saunasteuerungen beuche bitte die [offizielle Harvia-Website](https://www.harvia.com) .

---

## ⚠️ КРИТИШЕР ЗИКЕРХАЙТШИНВЕЙС И ХАФТУНГСАУСШЛУСС

**Der Fernbetrieb eines Saunaofens unterliegt strengen Sicherheitsvorschriften!** Gemäß der europäischen Sicherheitsnorm **EN 60335-2-53** в сочетании с **EN 60335-1** и Brandschutzmaßnahmen für Fernsteuerungssysteme zwingend erforderlich. Die Saunakabine muss mit einem zugelassenen Türsensor или einem Sicherheits-Abschaltsystem ausgestattet sein. Dies stellt sicher, dass der Ofen nicht aus der Ferne или для таймера gestartet werden kann, wenn ein brennbarer Gegenstand (z. B. ein Handtuch) auf oder in der Nähe des Ofens vergessen wurde.

- **Основные сведения:** Адаптеры для ввода данных должны быть полностью проверены, приведены в инструкции по эксплуатации или на сайте Haftung für Schäden, Brände, Verletzungen или решены проблемы, которые могут возникнуть в результате Nutzung или Fehlconfiguration dieser Software. Вы можете воспользоваться этой интеграцией на собственном риске.
- **Markenhinweis:** Harvia и MyHarvia 2 являются собственной маркой группы Harvia. Адаптер Dieser является единым, базовым проектом с открытым исходным кодом и доступен официальному поставщику Harvia в качестве поставщика, и его необходимо использовать только сейчас.

---

## Установка

Адаптер является официальной версией репозитория ioBroker. Вы можете напрямую установить ioBroker Admin-Weboberfläche.

### Über ioBroker Admin

1. Открыть ioBroker-Weboberfläche в браузере einem (z. B. `192.168.1.33:8081`).
2. Нажмите на **адаптер** Reiter.
3. Используйте «harvia-fenix» в разделе «Фильтр».
4. Нажмите на один из пунктов и на символ «+» адаптеров **Harvia Fenix** , чтобы получить мгновенный сигнал.

---

## Einrichtung (Setup)

Установка адаптера должна осуществляться с помощью конфигурации MyHarvia-Kontodaten.

### Voraussetzungen

1. **Node.js >= 22**
2. Зарегистрируйтесь в официальном приложении для смартфонов **MyHarvia 2** .
3. Gültige Login-Data:
   - **Адрес электронной почты**
   - **Пароль**

_Примечание: Es wird ein разделяет Konto für ioBroker в приложении Harvia 2, эмпфолен и эти данные в Instanz zu verwenden._

### ioBroker-Конфигурация

1. Открыть ioBroker-Oberfläche в браузере einem (z. B. `192.168.1.33:8081`).
2. Navigiere zum Reiter **Instantzen** und clicke auf das Einstellungs-Symbol Deiner `harvia-fenix.0` -Инстанц.
3. Укажите **адрес электронной почты** и **пароль** , указанные в MyHarvia-Kontos.
4. Когда вы получите **ID-код** , вы увидите, что адаптер будет автоматически запускаться после того, как вы нажмете на него соответствующий значок. Er verwendet das erste gefundene Gerät als aktive Einheit.
5. Необязательный параметр Passe bei Bei Darf: **Abfrageintervall** (секунды), **Mindest-/Maximal-Zieltemperatur** (°C) и **Maximale Heizdauer** (минуты).
6. Нажмите на **Speichern & Schließen** .

---

## Gerätekonfiguration & Multi-Geräte-Unterstützung

#### Automatische Erkennung (Открытие)

Если вы выбрали **идентификатор адаптера** в разделе «Адаптер-Einstellungen», вы увидите, что адаптер будет автоматически запускаться после активации, когда он будет проверен. Er verwendet das erste gefundene Gerät als aktive Einheit. Введенный идентификатор в журнале ioBroker-Log.

#### Мануэль Герате-ID

Для работы с сауной необходимо автоматически включить сауну. Если вы хотите, чтобы идентификатор был сохранен в журнале копий и в конфигурации, вы можете получить стабильное подключение к специальному оборудованию для использования.

#### Мехрере Саунен

Wenn dein MyHarvia-Konto meherere Steuereinheiten verwaltet (z. B. eine zu Hause und eine im Ferienhaus):

1. Erstelle für jede Sauna eine eigene Instanz des Adapters (z. B. `harvia-fenix.0` унд `harvia-fenix.1`).
2. Вручную внесите **идентификатор устройства** в конфигурацию, используемую в данный момент. Дадурч может помочь вам в сауне, если вы не хотите, чтобы ваши собственные даты были проверены и проверены.

### Geteilte Konten / Gast-Zugänge & Die Partner-ID

#### 🟢 Normalfall (Hauptkonto/Besitzer der Sauna)

Чтобы получить доступ к данным входа в систему MyHarvia-Hauptkontos (с доступом к сауне в приложении):

- Lasse sowohl die **Geräte-ID** als auch die **Partner-ID** in den Einstellungen **leer** .
- Адаптер найден в сауне для автоматического запуска.

#### 🟡 Sonderfall: Geteiltes Konto / Gast-Zugang (от ioBroker-Konto)

Если вы хотите, чтобы сауна в приложении MyHarvia 2 была бесплатной, используйте автоматический метод Cloud-API для основных настроек газовой карты (Gast-Konto). `{"devices":[]}`).

В этом случае **необходимо** вручную **получить идентификатор устройства (идентификатор устройства)** и **идентификатор партнера Hauptkontos** в режиме Einstellungen eingetragen:

**Der 60-Sekunden-Trick, вы можете сказать:**

1. Трагедия в конфигурации адаптера включает в себя данные входа в **систему** (Des Besitzers) и щелчок **мышью** .
2. Открыт журнал ioBroker-Log. Адаптер обеспечивает удобство сауны и возможность использования следующих вариантов:
   - `Found device: ... (ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)` ➡️ Das ist deine **Geräte-ID** .
   - `Using partner ID from user token: ORG/prod:0:6656` ➡️ Das ist deine **Partner-ID** (Стандарт: `ORG/prod:0:6656` Одер `ORG/prod:0:6656:0`).
3. Kopiere beide Werte in die Zwischenablage.
4. Если вы не хотите использовать Einstellungen, вы увидите, что в Zugangsdaten указан **Gast-Kontos** , вы можете скопировать **Geräte-ID** и **Partner-ID** в необязательных полях и щелкнуть по **Speichern & Schließen** .

Danach steuert das Gast-Konto die Sauna dauerhaft und zuverlässig an!

---

## Kompatibilitätshinweis

- **Используйте** **Harvia Fenix** Steuereinheiten, чтобы использовать приложение **MyHarvia 2** .
- **NICHT unterstützt:** **Harvia Xenio** Serie (z. B. Xenio WiFi/CX001WIFI). Серия Xenio базируется на альтернативной аппаратной системе и позволяет выбрать приложение _«MyHarvia for Xenio»_ , несовместимое с базовым API-интерфейсом адаптера.

---

## Verwendung (Usage)

### Verfügbare Datenpunkte

| Пункт данных                    | Тип        | Ролле                 | Зугриф          | Описание                                                                                                                                             |
| ------------------------------- | ---------- | --------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`               | логический | `indicator`           | Нур Лесен       | Статус адаптеров для MyHarvia-Cloud.                                                                                                                 |
| `info.minTemp`                  | число      | `value.temperature`   | Нур Лесен       | Mindest-Zieltemperaturgrenze (`40 °C`).                                                                                                             |
| `info.maxTemp`                  | число      | `value.temperature`   | Нур Лесен       | Максимальный-Zieltemperaturgrenze (`110 °C`).                                                                                                       |
| `info.avgHeatingRate`           | число      | `value`               | Нур Лесен       | Gelerntes durchschnittliche Aufheizrate в °C на минуту (`°C/min`).                                                                                  |
| `info.heatingAnomaly`           | логический | `indicator`           | Нур Лесен       | Wechselt auf `true`, когда актуальная Heizleistung deutlich vom historischen Durchschnitt abweicht (zu langsam oder zu schnell).                     |
| `info.heatingAnomalyType`       | нить       | `text`                | Нур Лесен       | Искусство аномалии: `'none'` (Нормальное обслуживание), `'too_slow'` (< 50 % des Schnitts) oder `'too_fast'` (> 180 % des Schnitts).                    |
| `info.heatingAnomalyDesc`       | нить       | `text`                | Нур Лесен       | Klartext-Diagnose und empfohlene Prüfschritte für Visualisierungen или Benachrichtigungen.                                                           |
| `estimatedHeatingTimeRemaining` | число      | `value.interval`      | Нур Лесен       | Geschätzte verbleibende Aufheizzeit in Minuten bis zur Zieltemperatur (`min`).                                                                      |
| `online`                        | логический | `indicator.reachable` | Нур Лесен       | Verbindungsstatus der Steuereinheit zur Cloud.                                                                                                       |
| `doorSafety`                    | логический | `indicator.safety`    | Нур Лесен       | Статус дер Türsicherung (z.B. `true`, wenn die Tür sicher geschlossen ist).                                                                          |
| `remoteControl`                 | логический | `indicator`           | Нур Лесен       | Статус дер Fernstart-Bereitschaft. Венн `false`, ist das Starten des Ofens aus der Ferne (переходник) заблокирован.                                  |
| `errorMsg`                      | нить       | `text`                | Нур Лесен       | Aktuelle Fehlermeldungen или Statustexte des Ofens.                                                                                                  |
| `heatOn`                        | логический | `switch.power`        | Lesen/Schreiben | Hauptschalter, um den Saunaofen EIN (`true`) или AUS (`false`) zu schalten.                                                                        |
| `heaterPower`                   | число      | `value.power`         | Нур Лесен       | _Примечание:_ Dieses Objekt wird von der API bereitgestellt, часто используется `0 kW` (nicht ausgefüllt). Это возможность резервирования обновлений. |
| `lightOn`                       | логический | `switch.light`        | Lesen/Chreiben  | Schalter für die integrierte Saunabeleuchtung.                                                                                                       |
| `maxDuration`                   | число      | `level.timer`         | Lesen/Chreiben  | Maximale Heizdauer für die Saunasitzung in Minuten (`min`).                                                                                         |
| `panelTemp`                     | число      | `value.temperature`   | Нур Лесен       | Temperaturmesswert Direct an der Physischen Steuereinheit / Panel.                                                                                   |
| `targetTemp`                    | число      | `level.temperature`   | Lesen/Schreiben | Zieltemperatur-Sollwert für die Saunakabine (z.B. `90 °C`).                                                                                          |
| `temp`                          | число      | `value.temperature`   | Нур Лесен       | Актуальная температура в сауне (z.B. `17 °C`).                                                                                                       |
| `readyNotified10Min`            | логический | `indicator`           | Нур Лесен       | Вирд `true`, wenn die Sauna noch ca. 10 минут при температуре Zieltemperatur (13°C до температуры Ziel).                                             |
| `targetReachedNotified`         | логический | `indicator`           | Нур Лесен       | Вирд `true`, если в сауне выбрана необходимая температура воздуха в сауне, используйте ее.                                                           |
| `totalBathingHours`             | число      | `value.number`        | Нур Лесен       | Historische kumulierte Betriebsstunden der Saunanutzung (`h`).                                                                                      |
| `totalOperatingHours`           | число      | `value.hours`         | Нур Лесен       | Gesamte Betriebsstunden des Systems (`h`).                                                                                                          |
| `totalSessions`                 | число      | `value.count`         | Нур Лесен       | Zähler für die Gesamtzahl der durchgeführten Heizvorgänge.                                                                                           |
| `readyAt`                       | нить       | `text`                | Нур Лесен       | Geschätzte Uhrzeit der Fertigstellung (z.B. `17:57`).                                                                                                |
| `readyAtMessage`                | нить       | `text`                | Нур Лесен       | Lesbare Bereitschafts-Statusmeldung (z.B. `Ready at 17:57 if turned on now`).                                                                        |
| `timeToTargetFormatted`         | нить       | `text`                | Нур Лесен       | Formatierte verbleibende Aufheizzeit (z.B. `39 min 30 sec`).                                                                                         |
| `heatingCurve`                  | нить       | `json`                | Нур Лесен       | JSON-Array der Stützstellen-Aufheizzeiten pro 10°C-Intervall für VIS/Diagramme.                                                                      |
| `profiles`                      | нить       | `json`                | Нур Лесен       | JSON-массив der verfügbaren Saunaprofile (z. B. Cozy и т. д.).                                                                                       |
| `activeProfile`                 | число      | `level`               | Lesen/Schreiben | Индекс актуальных активных профилей сауны (`0` = мягкий, `1` = уютный, `2` = горячий).                                                                 |
| `events.lastEvent`              | нить       | `text`                | Нур Лесен       | Код или Bezeichner des Letzten Ereignisses aus dem Harvia Events Service.                                                                            |
| `events.lastEventType`          | нить       | `text`                | Нур Лесен       | Kategorie des Letzten Ereignisses (`SAFETY`, `ERROR`, `SYSTEM` и т. д.).                                                                             |
| `events.lastEventSeverity`      | нить       | `text`                | Нур Лесен       | Schweregrad des Letzten Ereignisses (англ. `info`, `warn`, `error`, `critical`).                                                                     |
| `events.lastEventMessage`       | нить       | `text`                | Нур Лесен       | Lesbare Beschreibung или Klartextmeldung des Letzten Ereignisses.                                                                                    |
| `events.lastEventTime`          | нить       | `date`                | Нур Лесен       | ISO-Zeitstempel des Letzten Ereignisses.                                                                                                             |
| `events.safetyTripped`          | логический | `sensor.alarm`        | Нур Лесен       | Zeigt an, ob eine aktive Sicherheitsabschaltung или Unterbrechung vorliegt.                                                                          |
| `events.safetyReason`           | нить       | `text`                | Нур Лесен       | Grund / Ursache der aktiven Sicherheitsauslösung.                                                                                                    |
| `events.history`                | нить       | `json`                | Нур Лесен       | JSON-Array с открытыми строками (до 15 раз).                                                                                                         |

---

## Интеллектуальные функции и автоматизация

### 1. Адаптивный Aufheizzeit-Prognose и Anomalie-Erkennung

- **Lernende Aufheizdauer (`estimatedHeatingTimeRemaining` &`info.avgHeatingRate`):**\
  &#x20;Адаптер предназначен для обычного нагревателя (°C за минуту). Während des Aufheizens kombiniert — это исторические исследования с актуальной живой температурой, а также вербальный отдых в соответствии с минутной температурой для прогнозирования.
- **Beidseitige Anomalie-Erkennung (`info.heatingAnomaly`, `info.heatingAnomalyType`, `info.heatingAnomalyDesc`):**\
  &#x20;После 10-минутной активации адаптера вы сможете проверить его эффективность с помощью следующих настроек:
  - **Zu langsam (`too_slow`):** Fällt die Heizrate unter 50 % des Schnitts (z. B. Saunatür angelehnt oder Ausfall eines Heizstabs), wird `info.heatingAnomaly` ауф `true` gesetzt.
  - **Zu schnell (`too_fast`):** Steigt die Heizrate über 180 % des Schnitts (z. B. Temperaturfühler verrutscht, Hitzestau am Sensor oder klebendes Schütz), wird `info.heatingAnomaly` ауф `true` gesetzt.
  - `info.heatingAnomalyDesc` Liefert eine verständliche Fehlerbeschreibung für Push-Benachrichtigungen или Visualisierungen.

### 2. Бенахрихтигунген (нажимной курок)

Адаптер, в котором указаны индикаторы-даты для подключения, специально для использования в Push-Benachrichtigungen (z.B. через Telegram, Pushover или Alexa), выглядит следующим образом:

```javascript
// Trigger für die 10-Minuten-Vorwarnung
on({ id: 'harvia-fenix.0.readyNotified10Min', change: 'ne', val: true }, function () {
    const targetTemp = getState('harvia-fenix.0.targetTemp').val;
    sendTo('telegram.0', 'send', { text: `🧖 Die Sauna erreicht in ca. 10 Minuten ihre Zieltemperatur (${targetTemp}°C).` });
});

// Trigger wenn die Sauna vollständig bereit ist
on({ id: 'harvia-fenix.0.targetReachedNotified', change: 'ne', val: true }, function () {
    const targetTemp = getState('harvia-fenix.0.targetTemp').val;
    sendTo('telegram.0', 'send', { text: `♨️ Die Sauna hat ihre Zieltemperatur von ${targetTemp}°C erreicht und ist bereit!` });
});

// Trigger bei Heiz-Anomalie (zu langsam oder zu schnell)
on({ id: 'harvia-fenix.0.info.heatingAnomaly', change: 'ne', val: true }, function () {
    const desc = getState('harvia-fenix.0.info.heatingAnomalyDesc').val;
    sendTo('telegram.0', 'send', { text: desc });
});
```

_Примечание: Diese Zustände werden autotisch auf `false` zurückgesetzt, когда der Ofen ausgeschaltet wird или начало нового Heizvorgang._

### 3. Профиль сауны и программы (`profiles` &`activeProfile`)

- **Доступный профиль (`profiles`):**\
  &#x20;Harvia Fenix включает заданную и оптимизированную программу сауны (например, _Mild_ , _Cozy_ , _Hot_ ), которая может быть настроена в **приложении MyHarvia 2** . Адаптер отображает список структурированных JSON в `profiles` (включая Zieltemperatur und Dauer).
- **Profil aktivieren (`activeProfile`):**\
  &#x20;Dieser Datenpunkt ist **schreibbar** und verwendet einen 0-basierten Index:
  - `0` = **мягкий**
  - `1` = **уютный**
  - `2` = **горячий**
  - Beim Ändern des Werts (например, VIS, Buttons или Skripte) отправляет адаптер с помощью Befehl непосредственно в Harvia-Cloud (`PATCH /devices/profile`), woraufhin die Sauna die Solltemperatur und Heizdauer des gewählten Profils übernimmt.
  - **Пример (Skrippt):**
  ```javascript
  // Wechselt auf das Cozy-Saunaprofil
  setState('harvia-fenix.0.activeProfile', 1);
  ```

### 4. Ereignis- und Sicherheits-Hub (`events.*`)

- **Sicherheitskreis-Überwachung (англ. `events.safetyTripped` &`events.safetyReason`):**\
  &#x20;Der Adaptor überwacht Türkontakte, Überhitzungssschutz und Sicherheitsschalter-Unterbrechungen от Harvia Events Service. Bei einem aktiven Sicherheitsalarm während des Heizens Schaltet `events.safetyTripped` ауф `true` mit einer verständlichen Begründung в `events.safetyReason`.
- **Ereignisverlauf (`events.history`):**\
  &#x20;Führt eine Historie der Letzten 15 System-, Tür-, Fehler- und Sicherheitsereignisse als JSON-Array for VIS-Dashboards und Protokollierung.

---

## Fehlerbehebung (Устранение неполадок)

### Häufige API-Fehler и Statusmeldungen в `errorMsg`

- ** `Action blocked (403 Forbidden). Remote start authorization (Safety Loop) at panel might not be active.` **
  - **Условно:** Die europäische Sicherheitsnorm schreibt vor, dass ein Fernstart nur aktiv sein darf, wenn der Sicherheitskreis/Türsensor geschlossen ist und der Fernstart physch am Saunapanel scharf geschaltet wurde.
  - **Lösung:** Schließe die Saunatür und Drücke am Physischen Harvia-Bedienfeld die **Fernstart** -Taste. Das Fernstart-Symbol auf dem Display muss leuchten. Прежде всего, необходимо использовать бесплатный адаптер.
- ** `Cloud lock: Device busy, command discarded.`(Als Debug-Log)**
  - **Ursache:** Блокировка Harvia-API может быть полезна, когда вы используете шнеллер, когда он работает (z. B. durch schnelles Klicken in der Vis), um die Hardware zu schützen.
  - **Изображение:** Warte einige Sekunden zwischen den Befehlen. Адаптер автоматически работает со щелчками мыши, и вы можете использовать API-интерфейс для управления.

---

## Задачи

- [ ] Automatische Kaltgetränke-Bereitstellungs-Erinnerung für den Saunagang 🍺❄️
- [ ] KI-gestützten Handtuch-Wurf-Roboter für den perfekten Aufguss entwickeln 🧖‍♂️🪣

---

## Änderungsprotokoll (журнал изменений)

### **РАБОТА В ПРОЦЕССЕ**

- (meistermopper) Standard-Zuordnung fuer activeProfile (0=мягко, 1=уютно, 2=горячо) документация

### 1.1.0 (2026-09-17)

- (meistermopper) Центр событий и безопасности с собственными событиями-Channel und Datenpunkten
- (meistermopper) Sicherheits-Erkennung, Alarm-Indikatoren und Ereignisverlauf hinzugefügt
- (meistermopper) Конечный пункт activeProfile в исправлении /devices/profile
- (meistermopper) Профиль сауны (профили, activeProfile) в документации

### 1.0.0 (2026-09-17)

- (meistermopper) AWS AppSync WebSocket Push-клиент реального времени
- (meistermopper) Token-Actualisierung ueber /auth/refresh с RefreshToken

### 0.6.0 (2026-09-16)

- (meistermopper) Datenpunkte ReadyAt, ReadyAtMessage и timeToTargetFormatted ergänzt
- (meistermopper) Harvia-Heizkurvenberechnung с 13 интервалами реализации
- (meistermopper) Профиль сауны (профили, активный профиль) и прогноз режима ожидания
- (meistermopper) Логотип-Anzeigegroesse в README-Dateien на 200 пикселей вердоппельта
- (meistermopper) Breaking-Changes-Hinweise und Altrelease-Support für Release-Notes
- (meistermopper) Автоматическое создание примечаний к выпуску для GitHub eingerichtet
- (meistermopper) check:repo Скрипт добавлен и в тесте:local integriert
- (meistermopper) Электронная почта в Lizenz-Copyrightzeilen wiederhergestellt (S4050, S4051)
- (meistermopper) Lizenzabschnitt в README gemäß Repochecker-Regel W6034 korrigiert

### 0.5.1 (2026-09-12)

- (meistermopper) Адаптер-логотип durch MyFenix-Hommage ersetzt
- (meistermopper) Актуальные @iobroker/adapter-core для версии 3.4.3 и @iobroker/testing для версии 6.2.1
- (meistermopper) Behebe Mocha 12 Создание модуля Unit-Test Runner для узла 22

### 0.5.0 (2026-09-09)

- (meistermopper) Beidseitige Heizanomalie-Erkennung hinzugefügt (zu langsam/schnell)
- (meistermopper) Обновите @alcalzone/release-script-plugin-license до версии 5.2.2
- (meistermopper) Node.js 26 для проверки Testmatrix

---

## Лицензия

Лицензия MIT

Авторские права (c) 2026 meistermopper <meister.mopper@gmail.com>

Вы можете получить лицензию Lizenzbedingungen, введя дату [ЛИЦЕНЗИИ,](https://github.com/meistermopper/ioBroker.harvia-fenix/blob/main/LICENSE) которую вы найдете.