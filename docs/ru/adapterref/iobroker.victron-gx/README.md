---
chapters: {"pages":{"en/adapterref/iobroker.victron-gx/README.md":{"title":{"en":"ioBroker Victron GX Adapter"},"content":"en/adapterref/iobroker.victron-gx/README.md"},"en/adapterref/iobroker.victron-gx/docs/README_de.md":{"title":{"en":"ioBroker Victron GX Adapter"},"content":"en/adapterref/iobroker.victron-gx/docs/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.victron-gx/README.md
title: ioBroker Victron GX Adapter
hash: DwvNl2P9BI+snAPG4/qHtfZRJ/Yp+T3Ui7xJDxBd/JI=
---
# ioBroker Victron GX Adapter

![Версия NPM](https://img.shields.io/npm/v/iobroker.victron-gx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.victron-gx.svg)
![Установки](https://iobroker.live/badges/victron-gx-installed.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen)

<img src="admin/victron-gx.png" width="100" align="right">

Этот адаптер обеспечивает **прямое и локальное** подключение ioBroker к устройствам [Victron Energy](https://www.victronenergy.com/) GX ( [Cerbo GX, Venus GX, Ekrano GX](https://www.victronenergy.com/communication-centres) ) — без каких-либо обходных путей через Home Assistant или облако VRM.

[![ко-фи](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/sefinads)

🇩🇪 [Deutsche Anleitung](/#/docs/adapterref/iobroker.victron-gx/docs/README_de.md)

---

## Для чего нужен этот адаптер?

Обеспечивает прямое и локальное подключение ioBroker к устройствам Victron GX через локальный протокол MQTT. Поддерживает чтение всех данных устройства и полное управление системами накопления энергии/инверторами через Modbus TCP.

- Все данные с устройства **обнаруживаются автоматически** и создаются как состояния ioBroker.
- Записываемые точки данных располагаются непосредственно под`devices.*` –`common.write` Отражает, включен ли в данный момент переключатель управления соответствием (Modbus / MQTT).
- Работает с однофазными и трехфазными системами.
- Автоматическое определение идентификатора устройства Modbus
- **Низкий расход оперативной памяти** : стабильно работает при \~130 МБ.
- Виртуальные устройства через Node-RED (`dbus-victron-virtual` ) полностью поддерживаются

---

## Требования

**На устройстве GX:**

- Включить MQTT:`Settings → Integrations → MQTT access → On`
- Для управления по протоколу Modbus:`Settings → Integrations → Modbus TCP Server → Enabled`
- Доступ на запись:`Access level → Write access allowed`

**В ioBroker:**

- Node.js >= 22
- Администратор >= 7.7.28

---

## Установка

### Через административную панель ioBroker (рекомендуется)

Поскольку этот адаптер ещё не включен в официальный репозиторий ioBroker, установите его через вкладку npm в административном интерфейсе:

1. Откройте административную панель ioBroker.
2. Перейти к **адаптерам**
3. Нажмите на **значок GitHub/Cat** (в правом верхнем углу).
4. Выберите вкладку **npm**
5. Входить`iobroker.victron-gx` и нажмите **«Установить»**

### После установки

1. Настройте экземпляр:
   - Введите **IP-адрес** устройства GX
   - Порт MQTT:`1883` (по умолчанию)
   - Дополнительно: **управление по протоколу Modbus** (регистры ESS/инвертора становятся доступными для записи через Modbus TCP).
   - Дополнительно: **управление по протоколу MQTT** (переключатели, зарядное устройство для электромобилей, заданные значения температуры становятся доступными для записи через MQTT).

> **Примечание:** Требуется Node.js версии не ниже 22. Если ваш ioBroker работает на Node.js версии 20, пожалуйста, сначала обновите его.

---

## Конфигурация

![Конфигурация](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-einstellungen.png)

| Поле                         | Описание                                                                                                                           |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| IP-адрес устройства GX       | Локальный IP Cerbo/Venus/Ekrano GX                                                                                                 |
| порт MQTT                    | По умолчанию: 1883                                                                                                                 |
| Имя пользователя/пароль MQTT | Только если на GX настроена аутентификация MQTT.                                                                                   |
| Управление Modbus            | Обеспечивает возможность записи данных ESS/инвертора (vebus, system) через Modbus TCP.                                             |
| порт Modbus                  | По умолчанию: 502                                                                                                                  |
| Управление MQTT              | Позволяет записывать параметры переключателей, зарядного устройства для электромобилей и заданные значения температуры через MQTT. |

---

## Поддерживаемые устройства

Адаптер автоматически обнаруживает все устройства, подключенные к устройству GX:

![Устройства GX](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-GX-Geräte.png)

| Тип устройства | Описание                                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------- |
| `battery`      | Системы на основе батарей (например, SerialBattery/LLT/JBD)                                         |
| `vebus`        | Инверторы MultiPlus/Quattro                                                                         |
| `grid`         | Сетевые счетчики (например, Shelly 3EM, Carlo Gavazzi)                                              |
| `pvinverter`   | фотоэлектрические инверторы                                                                         |
| `acload`       | Нагрузки переменного тока (включая Shelly 1PM с переключаемым выходом)                              |
| `switch`       | Переключаемые выходы (виртуальные переключатели Node-RED, Shelly Pro3/Pro4/1PM, внутреннее реле GX) |
| `evcharger`    | Зарядные устройства для электромобилей (чтение + управление)                                        |
| `temperature`  | Датчики температуры                                                                                 |
| `meteo`        | Метеостанции                                                                                        |
| `tank`         | датчики уровня в резервуаре                                                                         |
| `system`       | Обзор системы                                                                                       |

---

## Структура объекта

![Структура объекта](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-Objektstruktur.png)

```
victron-gx.0
├── devices.*          → All discovered devices - common.write on the individual datapoint tells
│   │                     you whether it's currently writable (see "Writable Data Points" below)
│   ├── battery.*
│   ├── vebus.*                      → Mode, Ac.In1.CurrentLimit, Hub4.* writable (Modbus control)
│   ├── grid.*
│   ├── pvinverter.*
│   ├── acload.<Group>.<Serial>.
│   │   ├── Ac.*                     → measurements (unchanged)
│   │   └── outputs.<N>.             → switchable output, if the device has one (e.g. Shelly 1PM)
│   │       ├── State                    bool, writable (MQTT control)
│   │       ├── Status                   bool, read-only
│   │       ├── Name / CustomName        string
│   │       └── Group                    string
│   ├── switch.<Group>.<Serial>.
│   │   └── outputs.<N>.             → one sub-channel per output (Node-RED: one, Shelly Pro3/4: up to four)
│   │       ├── State / Status / Name / CustomName / Group   (same as above)
│   ├── evcharger.<Serial>.          → SetCurrent, StartStop, Mode writable (MQTT control)
│   ├── temperature.<Serial>.        → Offset, Scale, FilterLength writable (MQTT control)
│   ├── meteo.*
│   ├── tank.*
│   └── system.<Serial>.             → GridSetpoint, EssMode, MinimumSoc, ... writable (Modbus control);
│                                       also carries outputs.0.* for the GX internal relay (MQTT control)
├── overview.*         → System overview (from system/0), read-only
└── info.*             → Connection status
```

`<Group>` Это необязательная промежуточная папка, которая присутствует только в том случае, если для данного канала/устройства задано имя группы. Подробнее см. раздел [«Интеграция с Shelly и поддержка многоканального доступа»](#shelly-integration--multi-channel-support) ниже.

---

## Список устройств (администратор)

![белый список устройств](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-Geräte.png)

На вкладке **«Устройства»** отображаются все обнаруженные устройства с указанием типа, серийного номера, имени и количества точек данных. Список можно загрузить в виде файла JSON — это полезно для запросов в службу поддержки.

---

## Каталог тем (Администратор)

![Все темы](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-AlleTopics.png)

На вкладке **«Все темы»** отображаются все темы MQTT, отправленные устройством GX с момента последнего запуска адаптера. Темы, обработанные адаптером, отмечены знаком ✓. Каталог можно загрузить в виде файла JSON.

---

## Записываемые точки данных

Начиная с **версии 0.10.0** , отдельного модуля нет.`control.*` Дерево больше не существует. Каждая записываемая точка данных находится непосредственно под деревом.`devices.*` , прямо рядом со своими аналогами, доступными только для чтения –`common.write` Информация о самом объекте (а также в административном интерфейсе/визуализации) показывает, доступен ли он в данный момент для записи. Два независимых переключателя конфигурации регулируют этот параметр:

- **Управление по протоколу Modbus** – регистры ESS/инвертора включены.`devices.vebus.*` и`devices.system.*`
- **Управление по протоколу MQTT** – переключатели (`devices.switch.*` /`devices.acload.*` /`devices.system.*` выходы), зарядное устройство для электромобилей и заданные значения калибровки датчика температуры

Если переключатель выключен, точка данных все равно существует (поэтому привязки истории/визуализации и скрипты продолжают работать), но`common.write` является`false` А операции записи игнорируются с предупреждением в журнале — больше никаких незаметных операций записи в точку данных, которая выглядела доступной для записи, но на самом деле таковой не являлась.

### До → после (обновление с версии 0.9.x)

| Старая версия (control.\*, удалена в версии 0.10.0) | Новые (устройства.\*)                            |
| --------------------------------------------------- | ------------------------------------------------ |
| `control.inverter.Mode`                             | `devices.vebus.<Serial>.Mode`                    |
| `control.inverter.AcPowerSetpoint`                  | `devices.vebus.<Serial>.Hub4.L1.AcPowerSetpoint` |
| `control.inverter.AcIn1CurrentLimit`                | `devices.vebus.<Serial>.Ac.In1.CurrentLimit`     |
| `control.inverter.DisableCharge`                    | `devices.vebus.<Serial>.Hub4.DisableCharge`      |
| `control.inverter.DisableFeedIn`                    | `devices.vebus.<Serial>.Hub4.DisableFeedIn`      |
| `control.system.GridSetpoint`                       | `devices.system.<Serial>.GridSetpoint`           |
| `control.system.EssMode`                            | `devices.system.<Serial>.EssMode`                |
| `control.system.MinimumSoc`                         | `devices.system.<Serial>.MinimumSoc`             |
| `control.system.BatteryLifeState`                   | `devices.system.<Serial>.BatteryLifeState`       |
| `control.system.MaxFeedInPower`                     | `devices.system.<Serial>.MaxFeedInPower`         |
| `control.system.AcFeedInEnabled`                    | `devices.system.<Serial>.AcFeedInEnabled`        |
| `control.system.DcFeedInEnabled`                    | `devices.system.<Serial>.DcFeedInEnabled`        |
| `control.system.DvccMaxChargeCurrent`               | `devices.system.<Serial>.DvccMaxChargeCurrent`   |
| `control.system.MaxDischargePower`                  | `devices.system.<Serial>.MaxDischargePower`      |
| `control.evcharger.<Instance>.SetCurrent`           | `devices.evcharger.<Serial>.SetCurrent`          |
| `control.evcharger.<Instance>.StartStop`            | `devices.evcharger.<Serial>.StartStop`           |
| `control.evcharger.<Instance>.Mode`                 | `devices.evcharger.<Serial>.Mode`                |

**Что делать:** обновите все скрипты, виджеты Vis или правила Blockly, которые ссылаются на...`control.*` Напрямую, и убедитесь, что соответствующий переключатель (управление Modbus / управление MQTT) включен в настройках экземпляра, если вы используете запись в любой из этих каналов. Адаптер переименовывает ключ конфигурации.`controlEnabled` к`modbusControlEnabled` автоматически при первом запуске версии 0.10.0 (ваши настройки сохраняются) –`mqttControlEnabled` Остаток не изменился. Однократная очистка удаляет все остатки.`control.*` объектов, и при каждом запуске в версиях 0.10.x/0.11.x в качестве напоминания записывалось предупреждение (удалено в версии 0.12.0).

**Теперь переключатели тоже имеют шлюзы:**`outputs.<N>.State` Раньше запись была доступна без каких-либо условий; теперь для этого требуется включить **управление MQTT** , как и для всего остального, что находится в этом переключателе.

### Примеры

**Уставка ESS Grid Setpoint** (простейший подход) – запись`devices.system.<Serial>.GridSetpoint` \[В]:

- `0` → нулевая подача электроэнергии в сеть (алгоритм Victron ESS поддерживает мощность сети на уровне 0 Вт)
- `-3000` → подача 3000 Вт в сеть (разряд батареи)
- `+500` → Потребляет 500 Вт от сети (зарядка аккумулятора)

Поддержание соединения не требуется — значение сохраняется постоянно.

**ESS Live Setpoint** (прямое управление) – запись`devices.vebus.<Serial>.Hub4.L1.AcPowerSetpoint` \[В]:

- Требует`devices.system.<Serial>.EssMode = 3` (Внешний контроль)
- Адаптер повторно отправляет значение каждые 800 мс, пока оно равно ≠ 0 (сторожевой таймер Victron).
- Установить на`0` вернуть управление алгоритму Victron ESS.

**Отключить зарядку/подачу электроэнергии:**

- `devices.vebus.<Serial>.Hub4.DisableCharge = 1` → батарея не заряжается
- `devices.vebus.<Serial>.Hub4.DisableFeedIn = 1` → Инвертор не будет подавать сигнал в сеть

**Ограничения DVCC** (требуется включение DVCC на GX):

- `devices.system.<Serial>.DvccMaxChargeCurrent` \[A]: общесистемное ограничение тока заряда (-1 = отключено)
- `devices.system.<Serial>.MaxDischargePower` \[Вт]: предел мощности разряда

**Виртуальные коммутаторы** (Node-RED) – настройка`outputs.<N>.State` к`true` /`false` → Запись в MQTT → GX → Node-RED → ретранслятор

**Зарядное устройство для электромобилей** – написать`devices.evcharger.<Serial>.SetCurrent` \[А] /`StartStop` \[логическое значение] /`Mode` (0=Вручную, 1=Автоматически, 2=По расписанию)

**Калибровка датчика температуры** – запись`devices.temperature.<Serial>.Offset` \[°C] /`Scale` /`FilterLength`

---

## Виртуальные устройства (Node-RED)

Адаптер полностью поддерживает виртуальные устройства, созданные через Node-RED.`dbus-victron-virtual` упаковка:

- Виртуальные фотоэлектрические инверторы
- Виртуальные нагрузки переменного тока
- Виртуальные коммутаторы (с групповыми и индивидуальными именами)
- Виртуальные датчики температуры
- Виртуальные метеостанции
- Виртуальные датчики резервуара

---

## Интеграция с Shelly и многоканальная поддержка

Теперь устройства Shelly, подключенные к интеграции GX (Cerbo/Venus/Ekrano), полностью поддерживаются, наряду с виртуальными коммутаторами Node-RED:

- **Shelly Pro3 / Pro4** : каждое физическое устройство сообщает о своих каналах как об отдельных экземплярах MQTT-устройств, имеющих один и тот же серийный номер. Адаптер автоматически объединяет их в единое дерево объектов.`devices.switch.<Group>.<Serial>.outputs.<0..3>.*` ).
- **Шелли 1PM** : значения измерений (`Ac.*` ) и переключаемый выход (`outputs.0.*` ) находятся в том же дереве устройств, что и`devices.acload.<Group>.<Serial>` .
- **Внутреннее реле GX** : реле, встроенное в само устройство GX.`system/0` ) переключается при`devices.system.<Serial>.outputs.0.State` После включения **управления MQTT** (см. [Записываемые точки данных](#writable-data-points) ).

Все переключаемые выходы — независимо от типа устройства — имеют одинаковую подструктуру, поэтому селекторы с подстановочными знаками работают по всей вашей системе:

```javascript
// Every switchable output, any device type, any group
'victron-gx.0.devices.*.*.*.outputs.*.State'

// Just the custom names, for a device overview
'victron-gx.0.devices.*.*.*.outputs.*.CustomName'
```

### ⚠️ Критическое изменение (v0.9.x)

Выходы коммутатора раньше располагались непосредственно под каналом устройства; теперь они находятся под другим каналом.`outputs.<N>` подканал. Node-RED`output_1` нормализовано к`outputs.1` :

| Старая версия (v0.8.x)                   | Новая версия (v0.9.x)                              |
| ---------------------------------------- | -------------------------------------------------- |
| `devices.switch.<Group>.<Serial>.State`  | `devices.switch.<Group>.<Serial>.outputs.1.State`  |
| `devices.switch.<Group>.<Serial>.Status` | `devices.switch.<Group>.<Serial>.outputs.1.Status` |

Обновите все скрипты, виджеты Vis или правила Blockly, которые напрямую ссылаются на старые пути.

Если вы хотите удалить оставшиеся старые объекты, выполните следующую команду в CLI ioBroker (цикл обработки обходит известную ошибку "Invalid ID: undefined" при удалении через административный интерфейс):

```bash
iobroker object list | grep -oP 'victron-gx\.0\.devices\.switch\.[^.]+\.[^.]+\.(State|Status)$' \
  | while read id; do iobroker object del "$id"; done
```

### Автоматическая очистка "осиротевших" каналов (опционально)

Если вы переместите канал в другую группу, отключите канал Shelly или удалите переключатель Node-RED, его тема MQTT исчезнет, но объекты ioBroker останутся. Включите параметр **«Удалять осиротевшие каналы при запуске»** (вкладка «Основные настройки», по умолчанию отключено), чтобы адаптер удалял их автоматически:

- Запускается один раз при каждом запуске адаптера, только примерно через 30 секунд после обнаружения нового канала (поэтому многоканальные устройства, такие как Shelly Pro3, экземпляры которых сообщают о состоянии канала в несколько разное время, не затрагиваются в процессе запуска).
- Только прикосновения`outputs.<N>` каналы. Метаданные на уровне устройства,`Ac.*` измерения и`overview.*` Таким образом, они никогда не удаляются.
- Отключите эту функцию, если ваши устройства часто находятся в автономном режиме — канал, который еще не предоставил данные к моменту запуска проверки, выглядит заброшенным и будет удален.

---

## Changelog

### 0.10.0 (2026-08-01)
- **BREAKING:** the `control.*` branch has been removed - writable datapoints now live directly under `devices.*`, with `common.write` gated by two config toggles (Modbus control / MQTT control). See README section "Writable Data Points" for the full old→new mapping and migration steps.
- **BREAKING:** switches (`outputs.<N>.State`) now require MQTT control to stay writable (previously unconditional).
- **BREAKING:** the config key `controlEnabled` was renamed to `modbusControlEnabled` (value preserved automatically on first start).
- EV charger control is no longer experimental - treated the same as any other device type now.
- Temperature sensor calibration (`Offset`/`Scale`/`FilterLength`) is now writable.
- A migration warning with the full old→new mapping is logged on every start in 0.10.x/0.11.x and will be removed in 0.12.0.

### 0.9.4 (2026-07-29)
- Semantic change: control datapoints (control.system.*, control.inverter.*, control.evcharger.*) are now only created when the matching control switch (controlEnabled / mqttControlEnabled) is active, and are then always writable (no more silently ignored writes). Existing objects are automatically removed when the switch is disabled. If you have scripts targeting control.*, check that the matching switch is enabled in the adapter settings. Note: disabling the switch discards the last known value of the affected control state - relevant for History adapter users (gap in the log).

### 0.9.3 (2026-07-28)
- Fixed race condition during initial object creation that caused 'no existing object' warnings after fresh installs affecting all device types.

### 0.9.2 (2026-07-28)
- Fix: control.evcharger states became writable but stateChange events were never delivered (subscribe only reacted to controlEnabled, not mqttControlEnabled)

### 0.9.1 (2026-07-27)
- Added support for EV chargers (read + experimental control) and generic temperature inputs (dbus-adc). Thanks to Samson71 for the catalog. Community testing appreciated.


### 0.9.0 (2026-07-19)

**⚠️ BREAKING CHANGES**
- Switch and AC-load outputs now live under `outputs.<N>.State/Status` instead of directly at the device folder
- Node-RED virtual switches: previously `.State`, now `.outputs.1.State`
- Anyone referencing these paths in Vis or scripts needs to update them
- Migration guide: see README section "Shelly integration & multi-channel support"

**New: Shelly device integration**
- Full multi-channel support for Shelly devices connected via Cerbo/Venus/Ekrano GX (via dbus-shelly bridge, Venus OS 3.60+)
- Tested with Shelly Plus series (Plus 1/1PM/2PM/Plug S), Shelly Plugs, Shelly Pro3 as switch, Shelly 1PM as acload
- Shelly PM devices: supported from model version 3 onward (in line with Victron's own compatibility list); older models are not supported by Victron's bridge and therefore also not reachable via this adapter
- Multi-instance merging: channels of one Shelly device are automatically merged into a single object tree via their common serial
- Shelly devices with measurement (e.g. 1PM as acload): measurement values and switchable output coexist on the same object
- GX internal relay (system/0) is now switchable as well

**New: Extended AC-load datapoints**
- `Ac.Power` (total power)
- `Ac.Energy.Reverse`, `Ac.L*.Energy.Reverse`
- `Ac.L*.PowerFactor`
- Metadata: `Role`, `IsGenericEnergyMeter`, `PhaseSetting`, `ProductId`

**New: Cleanup toggle**
- New option "Remove orphaned channels on startup" (default off)
- Cleans up leftover objects after group changes or channel deactivation
- Conservative: only removes objects whose serial is still active under another group (no data loss for offline devices)
- Available in all 11 UI languages

**Fixes**
- Object store race during parallel channel/state creation (previously caused occasional invalid-type objects invisible to the sweep)
- Group migration zombies are now removed (channel moved between groups at the GX)
- Instance tile IP address and web UI link now show the configured GX IP of the respective instance (previously showed server IP or IP from instance 0)
- Various smaller log and cosmetic fixes

### 0.8.10 (2026-07-04)
- Review fixes for official repository inclusion: English-only log messages, admin tabs and state labels; sanitized serial numbers in object IDs; completed news and localLinks translations; removed unused pollingInterval; docs cleanup; updated @iobroker/types to 7.2.2

### 0.8.9 (2026-07-02)
- chore: bump @iobroker/adapter-core to 3.4.1

### 0.8.8 (2026-06-14)
- Release 0.8.8

### 0.8.6 (2026-06-14)
- Fix: add Ac.Power to RELEVANT_PATHS for pvinverter, acload and grid devices

### 0.8.5 (2026-06-12)
- docs: add Ko-fi button and improved installation instructions

### 0.8.4 (2026-06-11)
- docs: add Ko-fi support badge

### 0.8.3 (2026-06-11)
- docs: improved installation instructions, added npm download badge

### 0.8.2 (2026-06-11)
- Fix: memory leak caused by stale device timer using native clearTimeout instead of this.clearTimeout; fix: topic catalog now only stores new topics instead of re-allocating on every MQTT message

### 0.8.1 (2026-06-10)
- Fix: remove invalid nodeVersion from io-package.json; add localLinks; add i18n for admin config

### 0.8.0 (2026-06-10)
- Topic Map and Topic Catalog as Admin tabs; dynamic device discovery without timer; Switch CustomName from Node-RED; Node.js >= 22, Admin >= 7.7.28 required

### 0.7.7 (2026-06-09)
- Add localLink to instance overview for direct GX access

### 0.7.5 – 0.7.6
- Fix: remove invalid supportedMessages from io-package.json
- Add localLink to instance overview for direct GX access

### 0.7.3 – 0.7.4
- Performance: static fast-path after 60s discovery reduces RAM to ~100MB stable
- Add meteo device support
- Fix temperature device (Humidity/Pressure)
- Fix CustomName for all devices

### 0.7.0 – 0.7.2
- Performance: state object cache reduces RAM from ~660MB to ~155MB
- Full i18n support for all state names
- Fix object structure (folder/channel hierarchy)

### 0.6.0
- Breaking: `ess.*` renamed to `control.system.*`
- `control.inverter.*` added
- All device datapoints are strictly read-only
- AcPowerSetpoint keepalive every 800ms

### 0.1.0
- Complete read support for all device types

---

[Older changelogs](https://github.com/Sefina-DS/ioBroker.victron-gx/blob/main/CHANGELOG_OLD.md)

[Older changelogs can be found there](https://github.com/Sefina-DS/ioBroker.victron-gx/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Sefina-DS