---
chapters: {"pages":{"en/adapterref/iobroker.victron-gx/README.md":{"title":{"en":"ioBroker Victron GX Adapter"},"content":"en/adapterref/iobroker.victron-gx/README.md"},"en/adapterref/iobroker.victron-gx/docs/README_de.md":{"title":{"en":"ioBroker Victron GX Adapter"},"content":"en/adapterref/iobroker.victron-gx/docs/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.victron-gx/docs/README_de.md
title: ioBroker Victron GX Adapter
hash: lYFB5JdF6xchktrZOm7Fn6Cnyoh5b5rPvtFrivdKqP8=
---
# ioBroker Victron GX Adapter

![Версия NPM](https://img.shields.io/npm/v/iobroker.victron-gx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.victron-gx.svg)
![Установки](https://iobroker.live/badges/victron-gx-installed.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen)

<img src="../admin/victron-gx.png" width="100" align="right">

Адаптер для ioBroker **напрямую и локально** с устройством [Victron Energy](https://www.victronenergy.com/) GX ( [Cerbo GX, Venus GX, Ekrano GX](https://www.victronenergy.com/communication-centres) ) – от Umweg über Home Assistant или VRM Cloud.

[![ко-фи](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/sefinads)

---

## Что делает этот адаптер?

Используйте ioBroker напрямую и локально с Victron GX, используя локальный протокол MQTT. Unterstützt das Lesen aller Gerätedaten und die vollständige ESS/Wechselrichter-Steuerung через Modbus TCP.

- Все необходимые данные **автоматически** выполняются и все состояния ioBroker являются ангельскими.
- Schreibbare Datenpunkte лежать прямо под`devices.*` –`common.write` Когда вы перейдете в режим Steuer-Schalter (Modbus/MQTT), он будет активен
- Функционирование с системой ein- und dreiphasigen
- Автоматическое определение идентификатора устройства Modbus
- **Geringer RAM-Verbrauch** : \~130 МБ стабильно
- Virtuelle Geräte через Node-RED (`dbus-victron-virtual` ) werden vollständig unterstützt

---

## Voraussetzungen

**Am GX-Gerät:**

- Активировать MQTT:`Einstellungen → Integrationen → MQTT-Zugang → Ein`
- Для управления Modbus:`Einstellungen → Integrationen → Modbus TCP-Server → Aktiviert`
- Zugriffsberechtigungen:`Zugangslevel → Schreiben erlaubt`

**В ioBroker:**

- Node.js >= 22
- Администратор >= 7.7.28

---

## Установка

### Убер-администратор ioBroker (empfohlen)

Если этот адаптер не используется в официальном репозитории ioBroker, необходимо перейти на вкладку npm-Tab при установке администратора:

1. ioBroker Admin öffnen
2. **Adapter** aufrufen
3. Обращение к **GitHub/Katzen-Symbol по** клику
4. Den **npm** Tab auswählen
5. `iobroker.victron-gx` eingeben und auf **Installieren** clicken

### После установки

1. Instanz konfigurieren:
   - **IP-адрес** GX-Geräts eintragen
   - MQTT-порт:`1883` (Стандарт)
   - Дополнительно: **Modbus-Steuerung** (ESS/Wechselrichter-Register werden über Modbus TCP schreibbar)
   - Дополнительно: **MQTT-Steuerung** (Schalter, EV-Charger, Temperatur-Sollwerte werden über MQTT schreibbar)

> **Примечание:** Node.js >= 22 — это ошибка. Выпадает ioBroker сегодня с Node.js 20 дней, немного позже, когда будет обновлено.

---

## Конфигурация

| Поле                           | Описание                                                                                        |
| ------------------------------ | ----------------------------------------------------------------------------------------------- |
| IP-адрес GX-устройства         | Локальный IP-адрес Cerbo/Venus/Ekrano GX                                                        |
| MQTT-порт                      | Стандарт: 1883                                                                                  |
| Имя пользователя MQTT / Пароль | Ну, если MQTT-Auth настроен в GX                                                                |
| Modbus-Steuerung               | Macht ESS/Wechselrichter-Datenpunkte (сетевая шина, система) или шина Modbus TCP                |
| Modbus-порт                    | Стандарт: 502                                                                                   |
| Управление MQTT                | Macht Schalter, зарядное устройство для электромобилей и температурный режим со шрейббаром MQTT |

---

## Unterstützte Geräte

Адаптер автоматически работает при использовании GX-Gerät в следующих случаях:

| Gerätetyp     | Описание                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------- |
| `battery`     | Система аккумуляторов (zB SerialBattery/LLT/JBD)                                            |
| `vebus`       | MultiPlus/Quattro Wechselrichter                                                            |
| `grid`        | Нетцаншлюсс-Целер (zB Shelly 3EM, Карло Гавацци)                                            |
| `pvinverter`  | PV-Wechselrichter                                                                           |
| `acload`      | AC-Verbraucher (вкл. Shelly 1PM, mit Schaltausgang)                                         |
| `switch`      | Schaltausgänge (виртуальные коммутаторы Node-RED, Shelly Pro3/Pro4/1PM, GX-internes Relais) |
| `evcharger`   | Зарядное устройство для электромобилей (обучение + управление)                              |
| `temperature` | Датчики температуры                                                                         |
| `meteo`       | Ветерстанцияен                                                                              |
| `tank`        | Датчик уровня топлива в баке                                                                |
| `system`      | Systemübersicht                                                                             |

---

## Объектная структура

```
victron-gx.0
├── devices.*          → Alle erkannten Geräte - common.write am einzelnen Datenpunkt zeigt an, ob
│   │                     er gerade schreibbar ist (siehe "Schreibbare Datenpunkte" unten)
│   ├── battery.*
│   ├── vebus.*                      → Mode, Ac.In1.CurrentLimit, Hub4.* schreibbar (Modbus-Steuerung)
│   ├── grid.*
│   ├── pvinverter.*
│   ├── acload.<Group>.<Serial>.
│   │   ├── Ac.*                     → Messwerte (unverändert)
│   │   └── outputs.<N>.             → Schaltausgang, falls vorhanden (z.B. Shelly 1PM)
│   │       ├── State                    bool, schreibbar (MQTT-Steuerung)
│   │       ├── Status                   bool, nur lesend
│   │       ├── Name / CustomName        string
│   │       └── Group                    string
│   ├── switch.<Group>.<Serial>.
│   │   └── outputs.<N>.             → ein Sub-Kanal pro Ausgang (Node-RED: einer, Shelly Pro3/4: bis zu vier)
│   │       ├── State / Status / Name / CustomName / Group   (wie oben)
│   ├── evcharger.<Serial>.          → SetCurrent, StartStop, Mode schreibbar (MQTT-Steuerung)
│   ├── temperature.<Serial>.        → Offset, Scale, FilterLength schreibbar (MQTT-Steuerung)
│   ├── meteo.*
│   ├── tank.*
│   └── system.<Serial>.             → GridSetpoint, EssMode, MinimumSoc, ... schreibbar
│                                       (Modbus-Steuerung); trägt auch outputs.0.* für das
│                                       GX-interne Relais (MQTT-Steuerung)
├── overview.*         → Systemübersicht (aus system/0), nur lesend
└── info.*             → Verbindungsstatus
```

`<Group>` Это необязательный вариант Zwischenordner – при необходимости, если вам нужен ювелирный канал/das Gerät ein Gruppenname configuriert ist. Подробнее siehe [Shelly-Integration & Multi-Kanal-Unterstützung](#shelly-integration--multi-kanal-unterstützung) weiter unten.

---

## Schreibbare Datenpunkte

Seit **0.10.0** gibt es keinen отдельно`control.*` -Баум мехр. Jeder schreibbare Datenpunkt прямо под прямым углом`devices.*` , genau neben seinen nur-lesbaren Geschwistern –`common.write` am Objekt selbst zeigt (также в Admin-UI/VIS) и, ob erade schreibbar ist. Невозможно выполнить настройку конфигурации:

- **Modbus-Steuerung** – ESS/Wechselrichter-Register unter`devices.vebus.*` унд`devices.system.*`
- **MQTT-Steuerung** – Schalter (`devices.switch.*` /`devices.acload.*` /`devices.system.*` Выходы), зарядное устройство для электромобилей и калибровка датчика температуры.

Ist ein Schalter aus, Existiert der Datenpunkt weiterhin (History/Vis-Bindings und Skripte funktionieren также weiter), aber`common.write` ист`false` und Schreibversuche werden mit einer Log-Warnung ignoriert – keine все еще verschluckten Schreibzugriffe mehr auf einen Datenpunkt, der schreibbar aussah, es aber nicht war.

### Ворхер → Нахер (Обновление 0.9.x)

| Alt (control.\*, присутствует в 0.10.0)   | Neu (devices.\*)                                 |
| ----------------------------------------- | ------------------------------------------------ |
| `control.inverter.Mode`                   | `devices.vebus.<Serial>.Mode`                    |
| `control.inverter.AcPowerSetpoint`        | `devices.vebus.<Serial>.Hub4.L1.AcPowerSetpoint` |
| `control.inverter.AcIn1CurrentLimit`      | `devices.vebus.<Serial>.Ac.In1.CurrentLimit`     |
| `control.inverter.DisableCharge`          | `devices.vebus.<Serial>.Hub4.DisableCharge`      |
| `control.inverter.DisableFeedIn`          | `devices.vebus.<Serial>.Hub4.DisableFeedIn`      |
| `control.system.GridSetpoint`             | `devices.system.<Serial>.GridSetpoint`           |
| `control.system.EssMode`                  | `devices.system.<Serial>.EssMode`                |
| `control.system.MinimumSoc`               | `devices.system.<Serial>.MinimumSoc`             |
| `control.system.BatteryLifeState`         | `devices.system.<Serial>.BatteryLifeState`       |
| `control.system.MaxFeedInPower`           | `devices.system.<Serial>.MaxFeedInPower`         |
| `control.system.AcFeedInEnabled`          | `devices.system.<Serial>.AcFeedInEnabled`        |
| `control.system.DcFeedInEnabled`          | `devices.system.<Serial>.DcFeedInEnabled`        |
| `control.system.DvccMaxChargeCurrent`     | `devices.system.<Serial>.DvccMaxChargeCurrent`   |
| `control.system.MaxDischargePower`        | `devices.system.<Serial>.MaxDischargePower`      |
| `control.evcharger.<Instance>.SetCurrent` | `devices.evcharger.<Serial>.SetCurrent`          |
| `control.evcharger.<Instance>.StartStop`  | `devices.evcharger.<Serial>.StartStop`           |
| `control.evcharger.<Instance>.Mode`       | `devices.evcharger.<Serial>.Mode`                |

**Было ли это сделано:** Скрипт, Vis-Widgets или Blockly-Regeln, die`control.*` прямые референсы, актуализированные и значки, дасс дер пассенде Шалтер (Modbus-Steuerung / MQTT-Steuerung) в момент мгновенной активации, падает на auf einen dieser Datenpunkte schreibst. Адаптер подходит для Config-Schlüssel`controlEnabled` beim ersten 0.10.0-Автоматический запуск в`modbusControlEnabled` хм (dein Wert bleibt erhalten) –`mqttControlEnabled` ändert sich nicht. Ein einmaliger Aufräum-Sweep entfernt evtl. ночь ворхандене`control.*` -Объект, а также предупреждение, которое можно запустить в версии 0.10.x/0.11.x также как Erinnerung (в версии 0.12.0).

**Schalter sind jetzt ebenfalls заявил:**`outputs.<N>.State` военный бишер бедингунгслос шрайббар; jetzt ist dafür wie bei allem anderen unter diesem Schalter **MQTT-Steuerung** notig.

### Beispiele

**ESS Grid Sollwert** (einfachste Methode) –`devices.system.<Serial>.GridSetpoint` \[W] schreiben:

- `0` → Нулевая подача питания (алгоритм Victron ESS останавливает сеть до 0 Вт)
- `-3000` → 3000 Вт от сети Netz einspeisen (аккумуляторная батарея)
- `+500` → 500 Вт в сети (Batterie lädt)

Kein Keepalive nötig – Wert wird Permanent Gespeichert.

**ESS Live-Sollwert** (директ Steuerung) –`devices.vebus.<Serial>.Hub4.L1.AcPowerSetpoint` \[W] schreiben:

- Эрфордерт`devices.system.<Serial>.EssMode = 3` (Externe Steuerung)
- Отправка адаптера через 800 мс после ≠ 0 (Victron Watchdog)
- Ауф`0` setzen um die Steuerung an den Victron ESS-Algorithmus zurückzugeben

**Laden / Einspeisung deaktivieren:**

- `devices.vebus.<Serial>.Hub4.DisableCharge = 1` → Batterie lädt nicht
- `devices.vebus.<Serial>.Hub4.DisableFeedIn = 1` → Wechselrichter speist nicht ein

**Ограничения DVCC** (активация DVCC am GX):

- `devices.system.<Serial>.DvccMaxChargeCurrent` \[A]: Systemweite Ladestrom-Begrenzung (-1 = деактивировать)
- `devices.system.<Serial>.MaxDischargePower` \[W]: Entladeleistungs-Begrenzung

**Виртуэль Шальтер** (Node-RED) –`outputs.<N>.State` ауф`true` /`false` setzen → MQTT Write → GX → Node-RED → Relais

**Зарядное устройство для электромобилей** –`devices.evcharger.<Serial>.SetCurrent` \[А] /`StartStop` \[логическое значение] /`Mode` (0=Мануэль, 1=Авто, 2=Цайтплан)

**Калибровка датчика температуры** –`devices.temperature.<Serial>.Offset` \[°C] /`Scale` /`FilterLength` schreiben

---

## Виртуальные устройства (Node-RED)

Адаптер может быть подключен через Node-RED с пакетом`dbus-victron-virtual` erstellt wurden:

- Virtuelle PV-Wechselrichter
- Virtuelle AC-Verbraucher
- Virtuelle Schalter (с группой и индивидуальным именем)
- Виртуальные датчики температуры
- Виртуальные станции погоды
- Датчики Virtuelle Tankfüllstands

---

## Интеграция Shelly и многоканальное обучение

Если вы хотите, чтобы GX (Cerbo/Venus/Ekrano) был интегрирован, вы должны выполнить следующие действия, связанные с виртуальными коммутаторами Node-RED:

- **Shelly Pro3/Pro4** : физическое соединение объединяет несколько каналов с отдельными экземплярами MQTT-DeviceInstances с идентификационным серийным номером. Адаптер автоматически работает при работе с объектами (`devices.switch.<Group>.<Serial>.outputs.<0..3>.*` ).
- **Шелли 13:00** : Messwerte (`Ac.*` ) und der Schaltausgang (`outputs.0.*` )liegen am selben Geräte-Baum unter`devices.acload.<Group>.<Serial>` .
- **Внутреннее реле GX** : das im GX-Gerät eingebaute Relais (`system/0` ) ist schaltbar unter`devices.system.<Serial>.outputs.0.State` , поэтому **MQTT-Steuerung** aktiviert ist (siehe [Schreibbare Datenpunkte](#schreibbare-datenpunkte) ).

Все изменения, которые необходимо выполнить при выборе типа дизельного топлива, выполняются с помощью Wildcard-Selektoren über die Samte, следующие функции установки:

```javascript
// Alle Schaltausgänge, egal welcher Gerätetyp, egal welche Gruppe
'victron-gx.0.devices.*.*.*.outputs.*.State'

// Nur die Custom-Namen, für eine Geräteübersicht
'victron-gx.0.devices.*.*.*.outputs.*.CustomName'
```

### ⚠️ Критические изменения (v0.9.x)

Schaltausgänge lagen bisher direkt unter dem Geräte-Kanal; Sie Ligen Jetzt Unter Einem`outputs.<N>` -Подканал. Узел RED.`output_1` wird auf`outputs.1` нормирт:

| Alt (v0.8.x)                             | Neu (v0.9.x)                                       |
| ---------------------------------------- | -------------------------------------------------- |
| `devices.switch.<Group>.<Serial>.State`  | `devices.switch.<Group>.<Serial>.outputs.1.State`  |
| `devices.switch.<Group>.<Serial>.Status` | `devices.switch.<Group>.<Serial>.outputs.1.Status` |

Скрипты, Vis-Widgets или Blockly-Regeln, другие варианты прямых ссылок, могут быть изменены.

Если будут выбраны другие потерянные объекты, в ioBroker-CLI будет использоваться (ключевое слово umgeht den bekannten «Invalid ID: undefine»-Fehler beim Löschen über die Admin-UI):

```bash
iobroker object list | grep -oP 'victron-gx\.0\.devices\.switch\.[^.]+\.[^.]+\.(State|Status)$' \
  | while read id; do iobroker object del "$id"; done
```

### Automatisches Aufräumen verwaister Kanäle (опционально)

Когда канал входит в другую группу, Shelly-Kanal деактивируется или используется Node-RED-Switch, и вы можете изменить тему MQTT – объект ioBroker-Objekte bleiben aber bestehen. **При запуске канала** (вкладка «Haupteinstellungen», стандартный вариант) автоматически включается адаптер:

- Läuft einmal pro Adaptor-Start, merst nachdem ca. В течение 30 секунд вы можете использовать несколько каналов (если вы используете многоканальный канал Shelly Pro3, эти экземпляры не будут использоваться повторно, но не начнутся раньше).
- Betrift ausschließlich`outputs.<N>` -Kanäle. Geräte-Metadaten,`Ac.*` -Messwerte und`overview.*` werden davon nie entfernt.
- В автономном режиме вы можете найти опцию, которая деактивирована – на канале, где вы находитесь в режиме Sweep-Zeitpunkt, но ничего не происходит, если вы не знаете, как это сделать.

---

## Лицензия

Лицензия MIT

Авторские права (c) 2026 Sefina-DS

## Changelog

Den vollständigen Changelog gibt es in der englischen README:
→ [README.md Changelog](/#/adapters/victron-gx#changelog)

---