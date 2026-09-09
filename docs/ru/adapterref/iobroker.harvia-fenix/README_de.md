---
chapters: {"pages":{"en/adapterref/iobroker.harvia-fenix/README.md":{"title":{"en":"ioBroker.harvia-fenix"},"content":"en/adapterref/iobroker.harvia-fenix/README.md"},"en/adapterref/iobroker.harvia-fenix/README_de.md":{"title":{"en":"ioBroker.harvia-fenix"},"content":"en/adapterref/iobroker.harvia-fenix/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.harvia-fenix/README_de.md
title: ioBroker.harvia-fenix
hash: +YEI6HO92lFOkO4QTx4adok2ZKMdaveijMEPxMN63B8=
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
  <img src="admin/harvia.png" alt="Logo" width="100" />
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

1. Открыть ioBroker-Weboberfläche в браузере einem (z. B.`192.168.1.33:8081` ).
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

1. Открыть ioBroker-Oberfläche в браузере einem (z. B.`192.168.1.33:8081` ).
2. Navigiere zum Reiter **Instantzen** und clicke auf das Einstellungs-Symbol Deiner`harvia-fenix.0` -Инстанц.
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

1. Erstelle für jede Sauna eine eigene Instanz des Adapters (z. B.`harvia-fenix.0` унд`harvia-fenix.1` ).
2. Вручную внесите **идентификатор устройства** в конфигурацию, используемую в данный момент. Дадурч может помочь вам в сауне, если вы не хотите, чтобы ваши собственные даты были проверены и проверены.

### Geteilte Konten / Gast-Zugänge & Die Partner-ID

#### 🟢 Normalfall (Hauptkonto/Besitzer der Sauna)

Чтобы получить доступ к данным входа в систему MyHarvia-Hauptkontos (с доступом к сауне в приложении):

- Lasse sowohl die **Geräte-ID** als auch die **Partner-ID** in den Einstellungen **leer** .
- Адаптер найден в сауне для автоматического запуска.

#### 🟡 Sonderfall: Geteiltes Konto / Gast-Zugang (от ioBroker-Konto)

Если вы хотите, чтобы сауна в приложении MyHarvia 2 была бесплатной, используйте автоматический метод Cloud-API для основных настроек газовой карты (Gast-Konto).`{"devices":[]}` ).

В этом случае **необходимо** вручную **получить идентификатор устройства (идентификатор устройства)** и **идентификатор партнера Hauptkontos** в режиме Einstellungen eingetragen:

**Der 60-Sekunden-Trick, вы можете сказать:**

1. Трагедия в конфигурации адаптера включает в себя данные входа в **систему** (Des Besitzers) и щелчок **мышью** .
2. Открыт журнал ioBroker-Log. Адаптер обеспечивает удобство сауны и возможность использования следующих вариантов:
   - `Found device: ... (ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)` ➡️ Das ist deine **Geräte-ID** .
   - `Using partner ID from user token: ORG/prod:0:6656` ➡️ Das ist deine **Partner-ID** (стандарт:`ORG/prod:0:6656` Одер`ORG/prod:0:6656:0` ).
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

| Пункт данных                    | Тип        | Ролле                 | Зугриф         | Описание                                                                                                                                             |
| ------------------------------- | ---------- | --------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`               | логический | `indicator`           | Нур Лесен      | Статус адаптеров для MyHarvia-Cloud.                                                                                                                 |
| `info.minTemp`                  | число      | `value.temperature`   | Нур Лесен      | Mindest-Zieltemperaturgrenze (`40 °C` ).                                                                                                             |
| `info.maxTemp`                  | число      | `value.temperature`   | Нур Лесен      | Максимальный-Zieltemperaturgrenze (`110 °C` ).                                                                                                       |
| `info.avgHeatingRate`           | число      | `value`               | Нур Лесен      | Gelerntes durchschnittliche Aufheizrate в °C на минуту (`°C/min` ).                                                                                  |
| `info.heatingAnomaly`           | логический | `indicator`           | Нур Лесен      | Вирд`true` , когда aktuelle Aufheizleistung deutlich unter dem historischen Durchschnitt Liegt.                                                      |
| `estimatedHeatingTimeRemaining` | число      | `value.interval`      | Нур Лесен      | Geschätzte verbleibende Aufheizzeit in Minuten bis zur Zieltemperatur (`min` ).                                                                      |
| `online`                        | логический | `indicator.reachable` | Нур Лесен      | Verbindungsstatus der Steuereinheit zur Cloud.                                                                                                       |
| `doorSafety`                    | логический | `indicator.safety`    | Нур Лесен      | Статус дер Türsicherung (z.B.`true` , wenn die Tür sicher geschlossen ist).                                                                          |
| `remoteControl`                 | логический | `indicator`           | Нур Лесен      | Статус дер Fernstart-Bereitschaft. Венн`false` , ist das Starten des Ofens aus der Ferne (переходник) заблокирован.                                  |
| `errorMsg`                      | нить       | `text`                | Нур Лесен      | Aktuelle Fehlermeldungen или Statustexte des Ofens.                                                                                                  |
| `heatOn`                        | логический | `switch.power`        | Lesen/Chreiben | Hauptschalter, um den Saunaofen EIN (`true` ) или AUS (`false` ) zu schalten.                                                                        |
| `heaterPower`                   | число      | `value.power`         | Нур Лесен      | _Примечание:_ Dieses Objekt wird von der API bereitgestellt, часто используется`0 kW` (nicht ausgefüllt). Это возможность резервирования обновлений. |
| `lightOn`                       | логический | `switch.light`        | Lesen/Chreiben | Schalter für die integrierte Saunabeleuchtung.                                                                                                       |
| `maxDuration`                   | число      | `level.timer`         | Lesen/Chreiben | Maximale Heizdauer für die Saunasitzung in Minuten (`min` ).                                                                                         |
| `panelTemp`                     | число      | `value.temperature`   | Нур Лесен      | Температура напрямую на физическую панель.                                                                                                           |
| `targetTemp`                    | число      | `level.temperature`   | Lesen/Chreiben | Zieltemperatur-Sollwert für die Saunakabine (z. B.`90 °C` ).                                                                                         |
| `temp`                          | число      | `value.temperature`   | Нур Лесен      | Актуальная температура в сауне (z.B.`17 °C` ).                                                                                                       |
| `readyNotified10Min`            | логический | `indicator`           | Нур Лесен      | Вирд`true` , wenn die Sauna noch ca. 10 минут при температуре Zieltemperatur (13°C до температуры Ziel).                                             |
| `targetReachedNotified`         | логический | `indicator`           | Нур Лесен      | Вирд`true` , если в сауне выбрана необходимая температура воздуха в сауне, используйте ее.                                                           |
| `totalBathingHours`             | число      | `value.number`        | Нур Лесен      | Historische kumulierte Betriebsstunden der Saunanutzung (`h` ).                                                                                      |
| `totalOperatingHours`           | число      | `value.hours`         | Нур Лесен      | Gesamte Betriebsstunden des Systems (`h` ).                                                                                                          |
| `totalSessions`                 | число      | `value.count`         | Нур Лесен      | Zähler für die Gesamtzahl der durchgeführten Heizvorgänge.                                                                                           |

---

## Интеллектуальные функции и автоматизация

### 1. Адаптивный Aufheizzeit-Prognose и Anomalie-Erkennung

- **Lernende Aufheizdauer (`estimatedHeatingTimeRemaining` &`info.avgHeatingRate` ):**\
  &#x20;Адаптер предназначен для обычного нагревателя (°C за минуту). Während des Aufheizens kombiniert — это исторические исследования с актуальной живой температурой, а также вербальный отдых в соответствии с минутной температурой для прогнозирования.
- **Аномальное обнаружение (`info.heatingAnomaly` ):**\
  &#x20;Если вы активируете 10 минут в режиме Heizen Festgestellt, выберите актуальную информацию, которую вы получите, если хотите получить доступ к электронным устройствам (например, Saunatür nicht richtig geschlossen или Ausfall eines Heizstabs), setzt der Adaptor.`info.heatingAnomaly` ауф`true` и gibt eine Warnung im Log aus.

### 2. Бенахрихтигунген (нажимной курок)

Адаптер, в котором указан индикатор-дата для подключения, специально предназначен для использования в режиме Push-Benachrichtigungen (например, через Telegram, Pushover или Alexa) следующим образом:

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

// Trigger bei Heiz-Anomalie (z. B. Tür offen)
on({ id: 'harvia-fenix.0.info.heatingAnomaly', change: 'ne', val: true }, function () {
    sendTo('telegram.0', 'send', { text: '⚠️ Warnung: Die Sauna heizt ungewöhnlich langsam! Bitte Tür und Ofen prüfen.' });
});
```

_Примечание: Diese Zustände werden autotisch auf`false` zurückgesetzt, когда der Ofen ausgeschaltet wird или начало нового Heizvorgang._

---

## Fehlerbehebung (Устранение неполадок)

### Häufige API-Fehler и Statusmeldungen в`errorMsg`

- **`Action blocked (403 Forbidden). Remote start authorization (Safety Loop) at panel might not be active.`**
  - **Условно:** Die europäische Sicherheitsnorm schreibt vor, dass ein Fernstart nur aktiv sein darf, wenn der Sicherheitskreis/Türsensor geschlossen ist und der Fernstart physch am Saunapanel scharf geschaltet wurde.
  - **Lösung:** Schließe die Saunatür und Drücke am Physischen Harvia-Bedienfeld die **Fernstart** -Taste. Das Fernstart-Symbol auf dem Display muss leuchten. Прежде всего, необходимо использовать бесплатный адаптер.
- **`Cloud lock: Device busy, command discarded.`(Als Debug-Log)**
  - **Ursache:** Блокировка Harvia-API может быть полезна, если вы используете шнеллер, когда он работает (z. B. durch schnelles Klicken in der Vis), um die Hardware zu schützen.
  - **Изображение:** Warte einige Sekunden zwischen den Befehlen. Адаптер автоматически работает со щелчками мыши, и вы можете использовать API-интерфейс для управления.

---

## Задачи

- [ ] Auf offizielle Erlaubnis von Harvia zur Nutzung des Original-Logos warten
- [ ] Automatische Kaltgetränke-Bereitstellungs-Erinnerung für den Saunagang 🍺❄️
- [ ] KI-gestützten Handtuch-Wurf-Roboter für den perfekten Aufguss entwickeln 🧖‍♂️🪣

---

## Änderungsprotokoll (журнал изменений)

### **РАБОТА В ПРОЦЕССЕ**

- (meistermopper) Обновите @alcalzone/release-script-plugin-license до версии 5.2.2

### 0.4.0 (2026-08-13)

- (meistermopper) Добавлена адаптивная функция прогнозирования продолжительности нагрева и обнаружения аномалий.
- (meistermopper) Добавить ярлык скрипта разработчика для отслеживания изменений на сервере разработки в файл package.json
- (meistermopper) Уточните инструкции по настройке идентификатора партнера и гостевой учетной записи.
- (meistermopper) Документирование адаптивного прогнозирования нагрева и обнаружения аномалий
- (meistermopper) Добавить в файл AGENTS.md строгие правила конфиденциальности и анонимизации.
- (meistermopper) Приведите в порядок список дел и добавьте интересные пункты в список желаний на будущее.

### 0.3.2 (2026-08-11)

- (meistermopper) Используйте абсолютные URL-адреса GitHub для ссылок переключения языка в файлах README.
- (meistermopper) Удалите значки последнего репозитория и перевода из файлов README.
- (meistermopper) Отметьте добавление стабильного репозитория как завершенное в списке задач.
- (meistermopper) Удалить прямые инструкции по установке npm из файлов README.
- (dependabot) Обновление axios с версии 1.18.1 до 1.19.0
- (meistermopper) Логотип центрального адаптера в файлах README
- (meistermopper) Добавить значок статуса перевода Weblate в файлы README
- (meistermopper) Добавьте шаг npm run translate в скрипт release-before-commit
- (meistermopper) Замените статический значок "Последняя версия" на динамический значок iobroker.live.

### 0.3.1 (2026-08-04)

- (meistermopper) Обновить GitHub Actions в рабочем процессе автоматического перевода до версии 7.
- (meistermopper) Добавьте правило авторизации для фиксации и отправки изменений в Git в файл AGENTS.md
- (meistermopper) Добавить рабочий процесс автоматического перевода для автоматического перевода i18n.
- (meistermopper) Добавить отсутствующую ссылку CHANGELOG\_OLD в файлы README
- (meistermopper) Исправлены непереведенные записи новостей для версии 0.2.8 в файле io-package.json
- (meistermopper) Добавьте правило перевода common.news в файл AGENTS.md
- (meistermopper) Удалите избыточный значок npm и переместите значки «Тест» и «Релиз» после баннера npm.

### 0.3.0 (2026-07-29)

- (meistermopper) Добавить настраиваемые минимальные/максимальные пределы температуры и maxDuration в административный интерфейс.

### 0.2.8 (2026-07-26)

- (meistermopper) Обратите внимание на доступность последней версии репозитория в разделе установки README.
- (meistermopper) Исправьте роль doorSafety в sensor.door для соответствия требованиям repochecker
- (meistermopper) Добавить отсутствующую ссылку CHANGELOG\_OLD в файл README.md (repochecker S6022)
- (meistermopper) Исправлена ошибка ротации списка изменений в файле README\_de.md для обеспечения ограничения на 5 записей.

[Ältere Einträge können hier gefunden werden](https://github.com/meistermopper/ioBroker.harvia-fenix/blob/main/CHANGELOG_OLD.md)

---

## Лицензия

Лицензия MIT

Авторские права (c) 2026 meistermopper <meister.mopper@gmail.com>