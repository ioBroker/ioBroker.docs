---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hannah/README.md
title: ioBroker.hannah
hash: HqDS0Y/zCb1zlBV1IlhxoNDIo6KwMrRPI96etnk6goA=
---
![Логотип](../../../en/adapterref/iobroker.hannah/admin/hannah.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.hannah.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hannah.svg)
![Тестирование и выпуск](https://github.com/NurPech/ioBroker.hannah/workflows/Test%20and%20Release/badge.svg)

# ioBroker.hannah

## Адаптер Hannah для ioBroker

Устанавливает соединение между ioBroker и голосовым помощником [Hannah](https://github.com/NurPech/hannah) через двунаправленный поток gRPC. Состояния устройств, информация о присутствии и текстовые команды передаются от ioBroker к Hannah в режиме реального времени; Hannah отправляет команды SetState обратно, когда управляет устройствами.

Этот адаптер заменяет предыдущую интеграцию на основе MQTT и устраняет проблемы зацикливания сообщений, которые возникали при использовании сохраняемых тем и подписок с подстановочными знаками.

## Функции

- **Двунаправленный поток gRPC** — постоянное соединение с автоматическим переподключением.
- **Обнаружение устройств** с помощью перечислений ioBroker (комнаты × функции) с настраиваемыми фильтрами.
- **Дополнительные префиксы штатов** — подписка на любое дополнительное дерево штатов (например, трекер автомобилей, адаптер погоды)
- **Снимок состояния при подключении** — текущие значения состояния передаются в Hannah сразу после подключения, заменяя сохраненные сообщения MQTT.
- **Присутствие резидента** — пересылает изменения состояния присутствия из адаптера для резидентов.
- **Текстовые команды** — запись в `hannah.<instance>.textCommand` отправлять текстовые запросы Ханне
- **SetState** — Ханна может устанавливать состояния ioBroker напрямую через тот же канал gRPC.
- **Уведомления** — пересылать сообщения Ханне через `sendTo` или встроенный менеджер уведомлений ioBroker; переформулировка LLM для системных сообщений, прямая передача TTS для `sendDirect`
- **Объявления** — воспроизведение TTS в определенных залах и/или для конкретного человека через `sendTo` со списком комнат и/или идентификатором соседа по комнате, без LLM или Telegram.
- **Поддержка Blockly** — настраиваемые блоки для личных сообщений и объявлений о комнатах/персонах.

## Требования

- ioBroker js-controller ≥ 5.0
- Node.js ≥ 22
- Запущенный экземпляр [Hannah Core](https://github.com/NurPech/hannah) с включенным gRPC (порт по умолчанию 50051)

## Установка

Установка производится через административный интерфейс ioBroker.

## Конфигурация

### вкладка "Подключение"

| Поле       | Описание                                   | По умолчанию |
| ---------- | ------------------------------------------ | ------------ |
| Ханна Хост | IP-адрес или имя хоста сервера Hannah Core | `127.0.0.1`  |
| Порт gRPC  | Центр поддержки Порт-Ханны слушает         | `50051`      |

### вкладка «Обнаружение устройств»

Выберите, о каких **комнатах** и **функциях** Ханне следует знать. Если оставить оба списка пустыми, будет включено все.

Подробнее о том, как работает назначение комнат/функций и как организовать расположение устройств, чтобы Ханна могла их найти, см. [в руководстве по интеграции с системами «умного дома».](https://hannah-docs.leonie.network/manual/smart-home-integration/)

**Дополнительные префиксы состояний** — дополнительные префиксы идентификаторов состояний ioBroker для передачи данных Ханне, например:

| Вариант использования             | Префикс                           |
| --------------------------------- | --------------------------------- |
| Автомобильный трекер (VW-Connect) | `javascript.0.virtualDevice.Auto` |
| Погода (адаптер OpenWeatherMap)   | `openweathermap.0.forecast`       |
| Пользовательские переменные       | `0_userdata.0`                    |

### вкладка «Интеграции»

| Поле                           | Описание                                                          |
| ------------------------------ | ----------------------------------------------------------------- |
| Экземпляр адаптера для жителей | Номер экземпляра адаптера Residents для отслеживания присутствия. |

### Пользовательские настройки состояния

Если Ханна не понимает устройство так, как вам нужно, вам не нужно изменять объекты ioBroker. Для каждого состояния есть диалоговое окно «Пользовательские настройки» на вкладке «Объекты» в административной панели (значок гаечного ключа), с разделом для этого экземпляра адаптера. Отметьте **«Включено»** (переключатель вверху раздела, он предоставляется администратором), затем настройте необходимые параметры. Настройки применяются только к самому состоянию, никогда к каналу или устройству. На вкладке **«Диагностика** » адаптера вы можете проверить, как Ханна интерпретирует настройки.

| Поле                        | Ключ              | Что это делает                                                                                                                                                                                                                                                                                                                             |
| --------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Включено                    | `enabled`         | Включает функцию переопределения. Без неё ничего ниже не читается. Переключатель задаётся администратором, у адаптера нет для этого отдельного поля.                                                                                                                                                                                       |
| Имя, соответствующее голосу | `name`            | Вместо имени ioBroker Ханна использует имя устройства в голосовых командах и объявлениях. Объект ioBroker не переименовывается. Любое состояние устройства может иметь это имя. Если состояния одного устройства имеют разные имена, ни одно из них не используется, и на вкладке «Диагностика» указывается, какие состояния не совпадают. |
| Категория устройства        | `type`            | Подсказка, указывающая на тип устройства. Не команда: тип устройства определяется его слотами, подсказка решает проблему в сомнительных случаях (выключатель, который является светильником, уровень, который является положением для слепых зон).                                                                                         |
| Канонический ключ состояния | `canonicalKey`    | Что означает это состояние в устаревшем понимании. В Hannah Core 0.94.0 или более новых версиях используйте вместо этого **Slot** .                                                                                                                                                                                                        |
| Слот                        | `slot`            | Слот устройства, который занимает это состояние. Он превосходит предположение Ханны, основанное на роли, юните и имени. Если несколько состояний устройства указывают на один и тот же слот, ни один из них не используется. Несуществующий слот игнорируется. Требуется Hannah Core 0.94.0 или более поздняя версия.                      |
| Перевернутая штора          | `shutterInverted` | Для жалюзи, у которых процентное значение означает 0 % = открыто, а 100 % = закрыто (некоторые модели с приводами Homematic и KNX).                                                                                                                                                                                                        |
| Минимальный уровень доверия | `neededTrust`     | Изменять это состояние через Hannah могут только пользователи с уровнем доверия не ниже этого (0–10). Чтение никогда не ограничивается. Требуется ядро Hannah, поддерживающее эту функцию.                                                                                                                                                 |

**Категория устройства** (`type`): `light`, `socket`, `climate`, `blind`, `window`, `door`, `thermostat`, `temperature_sensor`, `humidity_sensor`, `illuminance_sensor`, `air_quality_sensor` Вы также можете ввести собственное значение.

**Канонический ключ состояния** (`canonicalKey`): `on`, `level`, `color`, `colorTemp`, `current`, `expected`, `illuminance`, `open`, `iaq`, `co2_equiv`, `voc_equiv`, `power` Вы также можете ввести собственное значение.

**Слоты** (`slot`):

| Слот                 | Значение                                   |
| -------------------- | ------------------------------------------ |
| `on`                 | включен или выключен                       |
| `brightness`         | яркость, 0–100 %                           |
| `color`              | цвет (RGB)                                 |
| `color_temperature`  | цветовая температура в Кельвинах           |
| `position`           | Положение жалюзи, 100 % = открыто          |
| `tilt`               | наклон ламелей жалюзи                      |
| `stop`               | команда остановки слепого                  |
| `target_temperature` | Уставка термостата или кондиционера, в °C  |
| `temperature`        | измеренная температура, в °C               |
| `humidity`           | относительная влажность                    |
| `illuminance`        | окружающая яркость                         |
| `pressure`           | давление воздуха                           |
| `co2`                | Значение CO₂                               |
| `iaq`                | индекс качества воздуха                    |
| `voc`                | значение ЛОС                               |
| `power`              | мощность, в Вт                             |
| `energy`             | энергия, в кВт·ч                           |
| `voltage`            | напряжение, в В                            |
| `current`            | текущий, в А                               |
| `open`               | Контакт открыт или закрыт (окно, дверь)    |
| `motion`             | Обнаружено движение                        |
| `valve`              | положение клапана                          |
| `mode`               | режим работы кондиционера                  |
| `fan_speed`          | скорость вращения вентилятора кондиционера |

Примеры можно найти [в руководстве по интеграции систем «умного дома»](https://hannah-docs.leonie.network/manual/smart-home-integration/) .

## Состояния адаптера

| Состояние                           | Тип        | Описание                                                                |
| ----------------------------------- | ---------- | ----------------------------------------------------------------------- |
| `hannah.<instance>.info.connection` | логический | `true` при подключении к Ханне Кор                                      |
| `hannah.<instance>.textCommand`     | нить       | Напишите здесь текстовый запрос (ack=false), чтобы отправить его Ханне. |

## Сообщения для скриптов и агентов искусственного интеллекта.

`sendTo('hannah.0', 'help', {})` ответы `{ help, commands }`: описание всех сообщений (`announce`, `ask`, `sendDirect`, `sendNotification`...) и состояний для агентов ИИ (например, pi-agent) и авторов скриптов, а также список всех команд с `write` (`true` (если команда имеет эффект, например, произносит команду или меняет спутник).

## Основная конфигурация Ханны

Адаптер ожидает `HannahService.AgentConnect` Доступен на настроенном хосте/порту. Дополнительная настройка на стороне Hannah не требуется — адаптер автоматически идентифицируется при подключении.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.10.0 (2026-11-21)
- Added: the WiFi password fields of the flash dialog, the NVS dialog and the Satellite Defaults tab have a show/hide button, and they warn when the password starts or ends with a space or another whitespace character, a typical leftover of copy and paste from a router page. The value is not changed and writing is not blocked, a WiFi password may contain spaces. Before, a stray space was invisible and the satellite just never joined the WiFi.
- Added: a "Reflash" button on every satellite in the Satellite Manager, next to "Configure" and "NVS". It writes the firmware from the Firmware Source URL onto the satellite over the USB cable (WebSerial) and leaves the settings alone: WiFi, MQTT, OTA and asset settings, the name and the room stay as they are, there is no new pairing seed and the satellite stays registered as it was. Use it when OTA cannot help, for example a satellite that crashes before an update arrives. Before, only "Flash new satellite" could put firmware on a satellite, and it needed all settings again.

### 1.9.1 (2026-11-20)
- Fixed (with a `hannah.v2` Core): the colour of a lamp composed from hue and saturation (1.9.0) did not work on real lamps, for example Matter lamps: hue and saturation stayed generic slots and Hannah answered that the lamp cannot be recoloured. Hue, saturation and colour temperature are numbers, they were taken for colours.
- Added: the "Firmware Source URL" (tab Firmware) and the "OTA URL" (Satellite Defaults and the flash dialog) now say what belongs into them. The first is the full link to the installation package, the second only the address of the update server, the satellite appends the rest itself. Before, nothing told the two apart, and the address of the server alone in the first field made the download fail with "Downloaded file is not a valid ZIP archive".
- Fixed: flashing or downloading the image of a satellite in the Satellite Manager stopped with "crypto.randomUUID is not a function" when the ioBroker admin is opened over plain HTTP (not HTTPS or localhost). The pairing seed is created in every case now. Flashing directly from the browser (WebSerial) still needs HTTPS or localhost, the download of the image for esptool.py does not.
- Fixed: if the firmware download for the Satellite Manager returns something that is no ZIP archive, the error now says what came back (HTTP status, content type, size and the start of a text answer) and what it usually means, for example that the URL points at the version information (JSON) instead of the file, or that a web page of a proxy or firewall answered. Before, it only said "Downloaded file is not a valid ZIP archive".
- Fixed: flashing a satellite or writing its settings directly from the browser in the Satellite Manager said "WebSerial is not supported by this browser (Chrome/Edge required)" when the ioBroker admin is opened over plain HTTP, although the browser is fine: Chrome and Edge only offer WebSerial over HTTPS or on localhost. The message now says that, and that "Download image" together with the web flasher of Espressif works without it.

### 1.9.0 (2026-11-19)
- (@GermanBluefox) Added: the message "help", a description of all messages for AI agents (e.g. pi-agent), and common.supportedMessages.help
- Added (with a `hannah.v2` Core): a device is reported as unreachable when a state with the role `indicator.reachable` in the same device is `false`, and as reachable again when it turns `true`. Before, every device counted as reachable. A device without such a state stays reachable. The state is no slot of the device any more (it was a generic slot before). Only the role counts, `indicator.unreach` is not used.
- Added (with a `hannah.v2` Core): a lamp that has a hue and a saturation state (roles `level.color.hue` and `level.color.saturation`) but no RGB state now gets a colour slot, so Hannah can colour it. The colour is composed from the two states at full brightness (the brightness stays the lamp's own slot), and the requested colour is written back as hue and saturation. The scale comes from the range of the states (0-360 and 0-100 if they name none). A real RGB state still comes first. The two states are no separate slots of the lamp any more. A lamp with only xy states is not covered yet.

### 1.8.1 (2026-11-15)
- Fixed: the custom settings dialog of a state showed two checkboxes for the same switch, "Enabled" from the admin and "Override for Hannah" below it. Only the one from the admin is left.
- Changed: the help text of the "Slot" field names the Hannah Core version it needs (0.94.0) instead of the name of the API.

### 1.8.0 (2026-11-15)
- Fixed (with a `hannah.v2` Core): a read-only number with the plain role `value` in a light function, such as the `rssi` (dBm) of a Shelly, is no longer taken for the brightness of a light when the whole device is in the room and function. It stays a generic value, and the diagnostics say that its unit does not fit a brightness. A brightness in percent or without a unit is not affected.
- Fixed: a notification forwarded from ioBroker to Hannah now starts with the title of its category (for example "Firmware-Update verfügbar: Power Strip 4 Gen4"). Before, only the messages were forwarded, and a message that is only a date or a device name left Hannah without any hint what it was about. A message that already contains the title is not doubled.
- Fixed: the same notification from ioBroker is announced by Hannah only once a day, no matter how often the sending adapter repeats it (for example a firmware notice every 15 minutes). Alerts are never held back. After a restart of this adapter a notification is announced once more.
- Fixed (with a `hannah.v2` Core): the `name` override in the custom settings of a state now counts wherever it sits on the device. Before, it only worked on the state the adapter read first, and for combined channels the name of the device object won. If the states of one device carry different names, none is used and the Diagnostics tab says which states disagree.
- Added (with a `hannah.v2` Core): a `slot` override in the custom settings of a state (new field "Slot"). It says which slot of the device the state fills, for example `on`, `brightness` or `target_temperature`, and beats Hannah's own guess from role, unit and name. If several states of a device name the same slot, none is used, and a slot that does not exist is ignored. The Diagnostics tab reports both.

### 1.7.1 (2026-11-06)
- Changed: the adapter names the host it runs on to Hannah Core with every call, so a Hannah Core that lists its components (such as the version overview) shows the adapter by host instead of a random ID. It is the name the log collector shows for the adapter: `HANNAH_LOG_INSTANCE`, else the host name, `container` for a container without its own host name. This needs `@m1kad0/hannah-grpc-lib` 0.12 and `@m1kad0/hannah-proto` 5.6, both come along. Nothing changes for a Hannah Core that does not use it

### 1.7.0 (2026-10-23)
- Added: a Diagnostics tab in the adapter settings. "Check devices" shows what Hannah gets from the setup with the room and function selection of the form, saved or not: the devices with their slots, and the states that are not read, with the reason (no room, no function, or a room or function that is not selected) and what to change in ioBroker. A state that stays a generic slot, or whose states fit one slot with no clear winner, is named, too
- Fixed (with a `hannah.v2` Core): only the channels of one device are put together to one device (a switch channel and a power channel of one plug). Devices below a folder, such as two lamps in a room folder that each have a switch, were treated like channels as well, and two of them with different states could be put together to one lamp. They are devices of their own now
- Changed: the `type`, `name` and `shutterInverted` overrides in `common.custom` are only read from the state itself. They were also read from the device or channel the state sits in, but ioBroker offers custom settings on states only, so that could only be set by editing the object by hand
- Added (with a Hannah Core that supports it): every satellite has a new state `satellites.rooms.<room>.<device>.led_brightness` (0–100 %) for the brightness of its LED ring, 0 switches the ring off. It shows the value Hannah Core keeps for the satellite and writing it changes the ring, for example to dim it at night from a script or a scene. The satellite is also in the device manager with a slider for it. With an older Hannah Core the state stays as it is, the adapter writes one warning to the log and keeps working as before

### 1.6.1 (2026-10-20)
- Fixed: if the ioBroker database was unavailable or restarting while the adapter (re)connected to Hannah Core, the sync right after the connect could fail or hang and was never repeated. The adapter then stayed connected without Hannah Core having its devices, and commands were rejected as an unknown slot until the adapter was restarted. A sync that fails or has no result after 120 seconds now closes the connection and connects again after 10 seconds, until the sync goes through. A failing read of the room and function enums fails the sync, too, instead of carrying on with an empty discovery

### 1.6.0 (2026-10-03)
- Added (with a `hannah.v2` Core): devices are now also recognized with the ioBroker type detector (`@iobroker/type-detector`, pinned to 6.0.1). It tells a dimmer from a plain light, a socket from a switch, and which state of a thermostat, blind, air conditioner, air quality sensor or contact plays which part (setpoint, actual temperature, humidity, power, consumption, mode, fan speed, position, ...). A `canonicalKey` or `type` set in `common.custom` still wins, and a state the detector has no part for is handled as before
- Changed (with a `hannah.v2` Core): a device none of whose states is recognized (a config channel such as a Shelly's cloud or WiFi settings, or a block of status values) is no longer reported to Hannah. The states a recognized device has beyond what Hannah knows are still reported as generic slots
- Fixed (with a `hannah.v2` Core): a writable boolean with the plain role `state` is only taken for a switch if its name says so (`state`, `on`, `power`, ...). Before, settings such as an LED indication or a debug mode made a motion sensor a socket. A value named `raw` no longer ties with the value itself, so the illuminance of a Zigbee motion sensor is found
- Fixed: a device or channel assigned to a function (the usual way for Bosch, Shelly, Zigbee2MQTT or HomeMatic devices) is now subscribed with all the states below it. Before, only a state itself was subscribed, so nothing below a device or channel in a function ever reached Hannah
- Changed (with a `hannah.v2` Core): a state directly at the top level of an instance (for example `alias.0.Lamp`) is now a device of its own, named after itself, instead of being thrown together with every other state of that instance. A function assigned to a device or channel now counts for the states below it, like a room does. Channels of one device (same room, same function) that use different slots, such as a switch channel and a power channel, now become one device, while the relays of a multi-relay plug stay devices of their own
- Added (with a `hannah.v2` Core): an alias state without a role, type, unit or range takes them from the state it points to, so it is recognized like that state. If the alias converts the value with a read or write function, unit and range are not taken over
- Added (with a `hannah.v2` Core): values are now reported on the scale Hannah expects, from the unit and range of the state: brightness and cover position as 0-100 % (also from 0-255 or 0-1), colour temperature in Kelvin (also from mired), temperature in °C (also from °F or K), power in W (also from kW or mW) and energy in kWh (also from Wh or MWh). A colour is also understood as `rrggbb`, `0xrrggbb`, `#rgb` and `rgb(r, g, b)`, and is written back in the notation the state already has
- Changed (with a `hannah.v2` Core): if several states of a device fit one slot, the adapter now narrows them down by exact role, then unit, then writability and only then by name. A temperature in °C wins over a °F duplicate, a state in mA is no power, and a consumption role is energy rather than power. If there is still no clear winner, none is picked and the states stay generic slots

### 1.5.5 (2026-10-03)
- Fixed: the adapter's notification texts (name, description and the "trust levels not supported" category) are now translated into all supported languages
- Changed: updated the test dependency `@iobroker/testing` to 6.3.0
- Changed: adapter names itself and its version in every call to Hannah Core, so Core can tell which version is connected and name it in its notice about outdated components. Requires `hannah-grpc-lib` 0.8 (below 0.09.0)
- Changed: Telegram tells Hannah Core every 30 seconds that it is running, so Core still knows it when it holds no open connection. Needs a Core that knows the call, an older Core is left alone after one log line. Requires `hannah-grpc-lib` 0.09.0 (below 0.10.0)

### 1.5.4 (2026-10-01)
- Added (with a `hannah.v2` Core): when Hannah starts watching a state for a trigger, the adapter now also reports the state's current value, so conditions like "only if" or "unless" know their state right after a Hannah restart instead of after the next change. Hannah does not run any trigger because of this start value
- Added (with a `hannah.v2` Core): every slot of a device now names the ioBroker state behind it, so Hannah's trigger editor can offer the device's slots directly
- Changed: updated to hannah-proto 5.2.0

### 1.5.3 (2026-10-01)
- Added: the adapter now speaks the new `hannah.v2` API to Hannah Core and reports your devices as typed devices (light, socket, thermostat, air conditioner, blind, sensor, door/window contact, …) with their capabilities instead of single states. Hannah then knows what a device can do and answers honestly when it can't do something. Older Hannah Cores (`hannah.v1` only) keep working with the previous behavior
- Fixed (with a `hannah.v2` Core): a light's colour and colour temperature no longer end up on the same value, and each is recognised by its role (`level.color.rgb`, `level.color.temperature`)
- Changed: updated to hannah-proto 5.1.0 and hannah-grpc-lib 0.7.0. The fallback to the unversioned Hannah API, which predates `hannah.v1`, is gone: the adapter no longer connects to a Hannah Core that old

### 1.5.2 (2026-09-29)
- Fixed: live value updates for states with an unusual name no longer freeze at their first value — the adapter now tells Hannah Core which role a state has instead of leaving Core to guess it from the state name (needs hannah-proto 4.8 on the Core side; older Cores behave as before)
- Changed: updated to hannah-proto 4.8.0

### 1.5.1 (2026-09-28)
- Fixed: writing to `satellites.rooms.all.announcement`/`.announcementSsml`/`.announcementRephrase`/`.dnd`/`.mute` (the virtual "all" room) logged a debug line but never actually reached Hannah

### 1.5.0 (2026-09-27)
- Added: minimum trust level per state (`neededTrust`, 0–10, in the state's "Custom settings" dialog) — only users with at least this trust level may switch the state via Hannah; reading it is never restricted. Leave empty for no restriction. Changes take effect without restarting the adapter
- Added: ioBroker notification when a minimum trust level is set but the connected Hannah Core doesn't support it yet — those states aren't protected until Hannah Core is updated. The notification is cleared automatically once an updated Hannah Core confirms support
- Changed: updated to hannah-proto 4.7.0

### 1.4.2 (2026-09-27)
- Fixed: the labels "Location" and "not supported / deprecated" in the adapter settings are now translated into all languages instead of showing in English

### 1.4.1 (2026-09-27)
- Changed: logs go to the Hannah log collector's versioned API `hannah.v1`. A log collector too old for it still gets them over the previous API

### 1.4.0 (2026-09-27)
- Changed: the adapter uses Hannah Core's new versioned API (`hannah.v1`, Hannah Core with hannah-proto 4.6.0 or newer). With an older Hannah Core it automatically falls back to the previous API and logs a warning once per connection that Hannah Core should be updated, so the adapter can be updated before Hannah Core
- Changed: log shipping to the Hannah log collector now uses the same fallback and keeps working with older and newer Hannah Core versions

### 1.3.1 (2026-09-26)
- Changed: when ioBroker runs in Docker, the adapter's logs in the Hannah log collector no longer show up under a new name after every container recreate. They appear as `container`, or under the name set in the `HANNAH_LOG_INSTANCE` environment variable

### 1.3.0 (2026-09-26)
- Fixed: with "daswetter" selected as weather source, Hannah never received any weather data — its object tree differs completely from openweathermap's, and the discovery only understood the latter. daswetter now has its own dedicated handling: forecast days and current conditions (taken from the hourly forecast slot that is running right now) are read by state name, wind speed is converted from km/h, and days are matched by their own date, so a delayed download doesn't shift "today" and "tomorrow"
- Added: "Location" selection in the Weather tab for daswetter, listing the locations configured in the selected daswetter instance. Defaults to the first location, so existing setups work without any change
- Changed: "accuweather" as weather source is marked as not supported / deprecated — AccuWeather no longer offers a free API, so its data can't be supported reliably. Existing settings keep loading, but no weather data is forwarded and a warning is logged at startup; please switch to another weather source

### 1.2.0 (2026-09-24)
- Added: the adapter sends its logs to the Hannah log collector as well, as soon as Hannah reports one, so they are included when you download the logs of all Hannah components. The ioBroker log stays exactly as it is, and without a log collector nothing changes. Passwords and tokens from the adapter settings are masked before a line is sent

### 1.1.6 (2026-09-21)
- Fixed: a device whose room was assigned directly to its state instead of the parent channel/device was never discovered — Hannah never learned about it at all

### 1.1.5 (2026-09-18)
- Changed: when Hannah pushes a presence update, the adapter can now set the individual "away"/"home"/"asleep" flag instead of always overwriting the combined presence state — avoids Hannah accidentally clobbering an unrelated flag (e.g. clearing "asleep" while only meaning to update "away"). No visible change until Hannah Core starts sending the new, more precise update.
- Changed: satellite online/offline log messages downgraded from "info" to "debug" — too noisy for the default log level

### 1.1.4 (2026-09-13)
- Fixed: the residents snapshot sent on every reconnect reported a resident as "away" whenever their presence state couldn't be read as a number, instead of leaving it unset — collapsing "genuinely away" and "no value read" into the same signal
- Changed: updated to hannah-proto 4.0.0 — no functional change for this adapter, just keeping the protocol-version check in lockstep with Hannah Core

### 1.1.3 (2026-09-09)
- Added: new "Inverted Rolladen/Markise" custom setting for Rolladen/Markise (blind) devices — enable it for actors whose raw percentage means 0%=open/100%=closed instead of Hannah's default (e.g. some Homematic/KNX actors), so voice commands and status announcements stay correct

### 1.1.2 (2026-09-08)
- Fixed: a satellite disconnected at adapter startup could end up with a duplicate, permanently "offline" entry on the Hannah Satellites page (and in the object tree) once it reconnected, for rooms whose display name differs in formatting from its technical room ID (e.g. umlauts, or "Hobbyraum" vs. "hobbyroom")

### 1.1.1 (2026-09-06)
- Added: the `enabled`/`type`/`canonicalKey` override for Hannah (previously only settable by hand-editing the object in Expert Mode) now shows up in the regular "Custom settings" dialog of any state, with a proper form and autocomplete suggestions for known device categories/state keys
- Added: `common.custom` override for a device's voice-matching name (`name`, alongside the existing `type`/`canonicalKey` overrides and its own field in the "Custom settings" dialog) — lets you fix the name Hannah uses for voice commands and announcements without renaming the actual ioBroker object

### 1.1.0 (2026-09-05)
- Changed: updated to hannah-proto 3.8.0 — the adapter now tells Hannah directly which device a state belongs to and what role it plays (on/off, dimmer level, color, ...), instead of Hannah having to guess both from the ioBroker object ID. Devices with unusual or missing role information can still be corrected via a `common.custom` override on the state, same as the existing device-type override.

### 1.0.2 (2026-08-09)
- Changed: updated to hannah-proto 3.2.0 — the gRPC connection now also sends a per-message compatibility marker alongside the existing protocol-version check, so future breaking changes elsewhere in the protocol won't unnecessarily disconnect this adapter
- Fixed: satellite-related types (`Satellite`, `GetSatellitesResponse`, `SetSatelliteDisplayNameRequest`) moved to their own module in a prior hannah-proto release — this adapter hadn't picked that up yet, which would have broken the build against any hannah-proto newer than 2.x

### 1.0.1 (2026-08-06)
- Fixed: the per-satellite do-not-disturb state stayed unconfirmed (`ack:false`) forever after a write — no way to tell whether it actually took effect. Now confirmed with `ack:true`, matching mute/volume

### 1.0.0 (2026-08-06)
- Changed: announcement, do-not-disturb, "Hannah is speaking" and "last transcript" now live on each satellite individually (`satellites.rooms.<room>.<device>.*`), not just shared per room — matches how mute/volume already worked. Room-level announcement/dnd/mute stay available as a convenience to control every satellite in a room at once. "Hannah is speaking"/"last transcript" per satellite are not wired up to live data yet (planned separately)

### 0.34.2 (2026-08-05)
- Fixed: forecast weather for tomorrow/the week was still empty after 0.34.1 — openweathermap only creates an object for day0's forecast, day1+ are bare states with no parent object at all, so the channel-based discovery never found them. Discovery now scans states directly instead of walking channel objects, so it no longer depends on one existing

### 0.34.1 (2026-08-05)
- Fixed: forecast weather ("Wie wird das Wetter morgen?" and week overviews) always came back empty on openweathermap, even the "today" max temperature — forecast-day states carry a `.forecast.N` suffix on their role that wasn't recognized, so none of them ever matched. Current conditions were unaffected

### 0.34.0 (2026-08-05)
- New: generic weather-source discovery — a new "Weather" settings tab lets you pick a known ioBroker weather adapter (openweathermap, accuweather, daswetter) or map your own state IDs manually ("Custom"), and forwards current conditions + a multi-day forecast to Hannah. Replaces Hannah's previous hardcoded openweathermap-only MQTT parsing with a generic, vendor-independent path

### 0.33.4 (2026-08-04)
- Fixed: a resident's display name could get wiped back to empty shortly after every adapter restart, for any resident whose presence changes live (most noticeably real, actively-tracked people). Presence-only updates no longer send an empty name — they omit it entirely, so Hannah keeps the name it already knows instead of overwriting it with a blank

### 0.33.3 (2026-08-03)
- Changed: admin UI migrated from the deprecated `@iobroker/adapter-react-v5` to `@iobroker/gui-components`

### 0.33.2 (2026-08-01)
- Changed: satellite cards in the Device Manager now show the satellite's display name as the title and its MAC as the identifier ("MAC:") instead of the room; the room is now shown as its own field on the card

### 0.33.1 (2026-08-01)
- Added: satellites in the Device Manager now show an update indicator (firmware version + available-update badge) and two card actions — "Update firmware" and "Restart satellite" (with confirmation) — instead of only being reachable through the states tree
- Added: satellite detail panel now also shows last seen, firmware version and update-available status

### 0.33.0 (2026-08-01)
- Added: "Restart satellite" button per satellite (`satellites.rooms.<room>.<device>.restart`), triggers an ordered remote restart over MQTT — no more walking over to the device or pulling power
- Fixed: satellite `last_seen` no longer freezes after a device (re-)registers — it now keeps advancing in step with Hannah's live heartbeat instead of only reflecting the last connect/reconnect

### 0.32.6 (2026-07-26)
- Fixed: a failed/unreachable `GetSatellites` call was treated the same as Core reporting zero satellites, deleting every satellite object as "stale" whenever Core was merely unreachable at that moment

### 0.32.5 (2026-07-15)
- Fixed: `iaq`/`iaq_accuracy`/`co2_equiv`/`voc_equiv` sensor states no longer log "has no existing object" warnings if a satellite's first sensor update arrives before BSEC2 has produced a valid IAQ reading

### 0.32.4 (2026-07-13)
- Fixed: `last_seen` satellite state now uses role `date` instead of `value.time` (which requires a numeric epoch timestamp, not the ISO string this adapter stores)
- Fixed: satellite/room online indicators now use role `indicator.reachable` instead of `indicator.connected` (reserved for instances)
- Fixed: firmware version state now uses role `info.firmware` instead of the generic `text`
- Fixed: the virtual "all" satellite room folder no longer has a German name
- Fixed: BLE tag states no longer have German object names, and tag labels are now sanitized before being used in object IDs
- Fixed: sensor `pressure` state now uses unit `mbar` instead of `hPa` per the role definition, and satellite device IDs are now sanitized before being used in sensor object IDs
- Fixed: `textCommand`/`textAnswer` states now use role `text` instead of the generic `state`, and a typo in `textCommand`'s display name was corrected
- Fixed: a pending `ask` (`sendTo` with a `resident_answered` callback) is no longer left dangling forever if Hannah Core disconnects before an answer arrives
- Fixed: HTTP requests to a satellite's NVS endpoint and to the firmware update server now time out instead of hanging indefinitely if the target is unreachable
- Changed: satellite default credentials (WiFi/MQTT passwords, OTA/asset/NVS tokens) are now encrypted and protected in the adapter configuration, matching the existing firmware source token
- Fixed: removed a stale, untranslated `Write NVS` key from the non-English admin UI translations

### 0.32.3 (2026-07-12)
- Added: device snapshot now reports whether each state is writable (`AgentDevice.writable`, from ioBroker's `common.write`) — lets Hannah/the WebUI exclude read-only states (sensors, etc.) from control actions
- Changed: `@m1kad0/hannah-proto` bumped to 0.5.2

### 0.32.2 (2026-07-12)
- Added: `state-watcher.ts`'s device-type detection now recognizes a "Szene"/"scene" function, resolving to type `scene` — lets room-scoped scene states be enum-discovered like any other device without being pulled into "Licht"-category group commands

### 0.32.1 (2026-07-11)
- Changed: `@m1kad0/hannah-proto` bumped to 0.5.0. No functional change for this adapter (it never called the removed `Routine*` RPCs).

### 0.32.0 (2026-07-11)
- Added: `state-watcher.ts` now classifies each state's value type (Boolean/Numeric/Enum/Color/Text) from ioBroker's own `common.type`/`role`/`states` and sends it to Hannah Core alongside the existing snapshot data — lets Hannah build a proper trigger-editor dropdown instead of requiring a free-text state ID

### 0.31.3 (2026-07-09)
- Added: `NvsDialog` ("Rewrite NVS") now offers a Serial/Wireless toggle — Wireless pushes WiFi, MQTT broker/port, OTA channel and the OTA/asset tokens straight to an already-connected satellite via its `POST /nvs` endpoint, no cable needed. Wireless is only enabled for satellites that are currently online; anything outside that field set (WiFi user/pass for MQTT, OTA/asset URLs, TLS skip) still requires Serial
- Fixed: `FlashDialog`/`NvsDialog` now also write the satellite's wireless-update bearer token (`satNvsToken` from the Satellite Defaults) into NVS during flash/rewrite — previously it was never set on a fresh flash and got silently wiped on every Serial rewrite, leaving the wireless write path permanently disabled
- Added: `NvsDialog`'s "Display Name" field now actually renames an already-paired satellite (via the new `setSatelliteDisplayName` sendTo command) — previously it was silently discarded, since it was only ever sent through the pre-pairing `provisionSatellite` call, which has no effect on an already-paired device. Requires the new "Your Hannah User ID" setting (Satellite Defaults tab) to be configured; without it, renaming is skipped rather than failing the whole write

### 0.31.2 (2026-07-09)
- Fixed: `FlashDialog`/`NvsDialog` no longer leave a permanent, unclaimed pending satellite registered with Hannah Core when a WebSerial flash fails or is never attempted (unsupported browser, missing driver, non-HTTPS page, cancelled port picker) — the satellite is now registered only once a live connection to the ESP is confirmed, right before the actual flash write
- Changed: `NvsDialog` ("Rewrite NVS") no longer regenerates the satellite's pairing seed or re-registers it with Hannah Core on every rewrite — editing an already-known satellite's settings no longer forces an unwanted re-pairing

### 0.31.1 (2026-07-08)
- Fixed: a satellite could end up with two separate room object trees (e.g. `Leonie_Schlafzimmer` and `leonie_schlafzimmer`) if its room string changed case or formatting between updates — room paths are now built from a case-insensitive canonical key, and an offline update reporting a differently-formatted room than the satellite was last online with now also cleans up the old path instead of only the online case

### 0.31.0 (2026-07-08)
- Fixed: a satellite's object tree is now cleaned up from its old room immediately when a room reassignment arrives, instead of leaving a stale path behind until the satellite happened to reconnect

### 0.30.3 (2026-07-05)
- Changed: replaced the manually-synced `hannah.proto` files and `@grpc/proto-loader` with the published `@m1kad0/hannah-proto` npm package (typed `@grpc/grpc-js` client, no local codegen). No functional change.

### 0.30.2 (2026-07-04)
- Added: the adapter now sends a protocol-version header with every request to Hannah Core, so version mismatches between the two are caught with a clear error instead of unexplained misbehavior

### 0.30.1 (2026-07-03)
- Changed: `hannah.proto` split by scope into several files on the Hannah side; the adapter's proto loader now resolves `import` statements between them (`includeDirs`). No functional change.
- Fixed: `npm run build` only copied `hannah.proto` into `build/proto/`, not the other scope files added above — adapter crashed on startup (`ENOENT: .../build/proto/shared.proto`) once installed from a packaged build

### 0.30.0 (2026-07-02)
- Added: illuminance/lux sensors are now recognized as their own device category (`illuminance_sensor`) — via the `value.brightness` role, or a read-only state under a "Helligkeit"/"Lux" function

### 0.29.2 (2026-06-30)
- Fixed: stale satellite/room object trees that Hannah Core no longer reports are now actually removed instead of just marked offline — `markUnknownOffline()` renamed `removeUnknownSatellites()`. Hannah's satellite tracking is stateful now (reports every known satellite regardless of connection status, pushes `satellite_deleted` on real deletion), so "not reported at all" reliably means genuinely gone (#83)

### 0.29.1 (2026-06-30)
- Added: Blockly "Hannah announce" block now has a "Person (optional)" input, generating the new `person` field

### 0.29.0 (2026-06-30)
- Added: `owner` state under `satellites.rooms.<room>.<device>.*` — shows the Person a satellite is assigned to in Hannah Core, if any (populated from the extended `GetSatellites` response, refreshed on (re)connect like `last_seen`/`room_mismatch`)
- Added: `sendTo('announce', ...)` accepts a new optional `person` field (roomie ID, e.g. `"leonie"`) to target a specific Person directly, in addition to or independent of `room`/`rooms` — routes through Hannah Core's `Announce` RPC instead of the room-only `satellite_control` stream path used otherwise

### 0.28.0 (2026-06-29)
- Added: virtual `satellites.rooms.all` room ("Alle") — always present, not tied to any satellite. Exposes `announcement`/`announcementSsml`/`announcementRephrase`, `dnd` and `mute` states that broadcast to every connected satellite (Hannah Core already resolves `room == "all"` as a broadcast target).

### 0.27.1 (2026-06-27)
- Changed: `GrpcClient.getSatellites()` now returns every satellite Hannah Core knows about (not just currently-connected ones), with new `room_id`/`room_display_name`/`last_seen`/`connected`/`room_mismatch` fields. `onConnected`'s initial sync now uses `connected` instead of assuming every returned satellite is online, and falls back to the DB-assigned room when a satellite isn't currently connected (its live room is empty then) — lets provisioned-but-never-connected satellites show up correctly instead of being skipped
- Added: `last_seen` and `room_mismatch` states under `satellites.rooms.<room>.<device>.*`, populated from the extended `GetSatellites` response
- Fixed: `updateSatelliteNvs` now rejects with a clear "not connected" error instead of pushing to an empty IP when the target satellite is known but currently offline

### 0.27.0 (2026-06-26)
- Added: `updateSatelliteNvs` `sendTo` command — pushes a key-value map to a satellite's new `POST /nvs` HTTP endpoint to remotely update WiFi/MQTT/OTA-channel/seed/wakeword-threshold settings without physical access. Resolves the satellite's IP via `GrpcClient.getSatellites()`, authenticates with the new `satNvsToken` admin config field (Satellite Defaults tab)

### 0.26.1 (2026-06-25)
- Added: `ResidentsWatcher.handleSetResidentMood()` — writes an incoming `AgentSetResidentMood` command to `residents.<instance>.<segment>.<id>.mood.state`, same path pattern as the existing presence write; dispatched in `main.ts` alongside the existing `set_resident` case

### 0.26.0 (2026-06-21)
- Added: `ResidentsWatcher` now also tracks pets (`residents.<instance>.pet.*`), not just roomies/guests — presence updates and the resident snapshot carry a `type` field (`ROOMIE`/`GUEST`/`PET`) instead of the removed `is_guest` boolean
- Fixed: the resident snapshot sent to Hannah Core always reported `presence_state: 0` regardless of the actual state; it now reads the real value from `<resident>.presence.state`
- Added: resident snapshot now includes `mood_level`, read from `<resident>.mood.state` if present

### 0.25.0 (2026-06-20)
- Added: `resolveType()` now maps role `value.humidity` to the new `humidity_sensor` device type (Refs https://dev.kernstock.net/gessinger/voice/hannah/-/work_items/47)
- Changed: satellite deletion now happens via the new `satellite_deleted` `AgentCommand` sent by Hannah Core (`SatelliteWatcher.deleteSatellite()` + `SensorWatcher.deleteSensors()` are unchanged, only the trigger moved); the AdminUI "Remove" button and the `deleteSatellite` `sendTo` handler are removed — deletion is now done from Hannah's own Web UI satellite list, the only place that also clears RoomManager's DB entry (Refs https://dev.kernstock.net/gessinger/voice/hannah/-/work_items/42)

### 0.24.1 (2026-06-20)
- Fixed: `StateWatcher.onStateChange()` dropped every state change with `ack:false`, including states subscribed via `AgentWatchMore` (trigger_engine) — manually/directly written flags (e.g. `0_userdata` booleans with no backing device to confirm them) never received an explicit `ack:true` and were silently never forwarded to Hannah Core. WatchMore states are monitoring-only (never written to via `handleSetState`), so there's no feedback-loop risk in forwarding them regardless of `ack` — the filter now only applies to enum-discovered device states

### 0.24.0 (2026-06-19)
- Fixed: `StateWatcher.resolveType()` read a non-standard `common.hannah.type` field for the device-type override, which is never reliably persisted by ioBroker — now reads the officially documented `common.custom["<adapter-namespace>"]` structure (`{enabled: true, type: "..."}`), matching the convention from the ioBroker objects schema docs

### 0.23.0 (2026-06-19)
- Added: `FlashDialog` — "Download image" button combines firmware partitions + generated NVS into a single flat binary and triggers a browser download, as an alternative to WebSerial flashing (works in any browser, e.g. Safari) (Refs #61)
- Fixed: `FlashDialog.prepareFirmwareAndNvs()` now checks `result.ok`/`result.error` from the `provisionSatellite` sendTo call instead of always logging "Satellite registered." — provisioning failures (e.g. unknown room) are now surfaced instead of silently swallowed (Refs #66)
- Added: `StateWatcher` sends the full `enum.rooms.*` catalog to Hannah Core (`send_rooms`, independent of devices) on connect and on enum change, so Hannah's `RoomManager` knows about rooms before any device/satellite exists in them (Refs #66)

### 0.22.0 (2026-06-19)
- Fixed: `SatelliteWatcher.handleSatelliteUpdate` now skips satellites with empty room and `online=true` to prevent invalid ioBroker state IDs ending in `.` (Refs #37)

### 0.21.1 (2026-06-19)
- Fixed: `FlashDialog` room dropdown was empty — used `getForeignObjects('enum.rooms.*')` (not valid for `enum` object type) instead of `getEnums('rooms')`, the method already used correctly in `app.tsx`

### 0.21.0 (2026-06-18)
- Changed: `NvsDialog` — removed `room` field; re-flashing NVS no longer requires room selection; `provisionSatellite` call no longer passes `roomId` (Refs #35)
- Changed: `FlashDialog` — room free-text field replaced with dropdown populated from `enum.rooms.*`; `provisionSatellite` now called before flash with `seed` + `roomId`; `seed` written to NVS partition (Refs #35)
- Changed: `provisionSatellite` sendTo handler — `roomId` is now optional; enables seed-only re-provisioning without changing the satellite's room assignment (Refs #35)

### 0.20.0 (2026-06-18)
- Changed: `StateWatcher` sends enum ID segment as `room` (e.g. `wohnzimmer`) and all `common.name` languages as `room_names` map — language-neutral object keys (Refs #58)
- Changed: satellite state paths use room ID from `AgentSatelliteUpdate.room` → `satellites.rooms.wohnzimmer` instead of `satellites.rooms.Wohnzimmer` (Refs #58)

### 0.19.1 (2026-06-18)
- Fixed: Added missing 'ble' folder to resolve E3009.

### 0.19.0 (2026-06-18)
- Changed: `handleSatelliteUpdate` accepts optional `displayName` parameter; uses it (falling back to `deviceId`) for `common.name` in ioBroker (Refs #52)
- Changed: `_ensureSatelliteStates` calls `extendObject` after `setObjectNotExistsAsync` so renames are applied to already-existing objects (Refs #52)
- Updated: proto — `AgentSatelliteUpdate.display_name` (field 8), `Satellite.display_name` (field 5) — Core now sends the provisioned human-readable name to the adapter (Refs #52)
- Changed: `device_id` is now always the eFuse MAC — `serial` field removed from adapter API; `handleSatelliteUpdate`, `getSatellites` return type, and `markUnknownOffline` no longer reference serial (Refs #54)
- Updated: proto — `serial` fields removed from `Satellite`, `SatelliteRegistration`, `AgentSatelliteUpdate`; field numbers 4/7 reserved (Refs #54)
- Changed: NvsDialog — removed `device_id` NVS write (eFuse MAC is now computed on device); renamed "Device ID" field to "Display Name"; Display Name is sent to Hannah Core via `provisionSatellite` only (Refs #54)

### 0.18.0 (2026-06-18)
- Added: Satellite Identity (Refs #52) — paired satellites now use their eFuse-MAC-based hardware serial as stable ioBroker object key (`satellites.rooms.<room>.<serial>.*`) instead of the mutable device_id; unpaired/UDP satellites fall back to device_id as before
- Added: `provisionSatellite` sendTo command — generates a pairing seed in Hannah Core before flashing so the satellite can auto-pair on first connect
- Added: NVS flash dialog now registers the satellite in Hannah Core (via `provisionSatellite`) and writes the pairing seed to NVS so the satellite links its hardware serial to the pre-configured identity on first boot
- Updated: proto — `Satellite.serial` (field 4), `SatelliteRegistration.serial/seed` (fields 4+5), `AgentSatelliteUpdate.serial` (field 7), `ProvisionSatellite` RPC + `ProvisionSatelliteRequest` message

### 0.17.0 (2026-06-16)
- Added: IAQ, IAQ accuracy, CO₂ equivalent and VOC equivalent states under `satellites.sensors.<device>` — populated when satellite uses BME680 with BSEC2 (Refs #17)

### 0.16.0 (2026-06-16)
- Added: `ask` command for `sendTo` — pose a question to a resident via Hannah TTS; the resident's spoken answer is returned as `{ answer: string }` in the `sendTo` callback; payload: `{ room?: string, text: string }`
- Updated: proto — `AgentAskResident` gains `correlation_id`; new `AgentResidentAnswered` message and `resident_answered` variant in `AgentCommand` oneof

### 0.15.3 (2026-06-13)
- Added: "Disable TLS certificate validation" checkbox in flash and NVS-rewrite dialogs — stored as NVS key `tls_skip`; default off; useful for satellites connecting to servers with self-signed certificates
- Added: same option in the satellite defaults tab of the adapter settings

### 0.15.2 (2026-06-12)
- Fixed: firmware download failed with "Invalid character in header content [Authorization]" when the configured firmware source token contained a trailing newline or whitespace — the token is now trimmed before being used as a Bearer header
- Fixed: deleting a satellite left orphaned objects behind — the sensor tree (`satellites.sensors.<device>`, a separate object branch) and the room container (`satellites.rooms.<room>`, including its shared room-level states) were never removed; deletion now runs in the backend via a `deleteSatellite` command that removes the satellite tree, the sensor tree, and the room container when it becomes empty (no `device` children left)
- Fixed: the WebSerial port in the flash dialog was not released when the overlay was closed (only the monitor reader was cancelled, never `port.close()`) — the serial connection stayed locked until the whole page was left; closing the dialog, pressing "Stop monitor", or unmounting now fully releases the reader, esptool transport and port
- Changed: the delete button in the satellites tab is hidden for online satellites — an online satellite would immediately re-register itself via its own updates, so only offline ones can be removed

### 0.15.1 (2026-06-11)
- Fixed: `wakeword` NVS key removed from flash and NVS-rewrite dialogs — wake-word on/off is compile-time only; `ww_threshold` remains
- Fixed: adapter checker E0058 — removed unsupported `allowScripts` field from `package.json`
- Fixed: adapter checker E1084/E1105 — removed deprecated `fa-icon` and `icon` from `adminTab`, converted `adminTab.name` to i18n object, fixed `adminUI.tab` value to `"html"`
- Fixed: adapter checker E5043 — changed `'http'` and `'https'` imports to `'node:http'` / `'node:https'` in `firmware-manager.ts`
- Fixed: adapter checker W1073/W1074 — added `firmwareSourceToken` to `protectedNative` and `encryptedNative` in `io-package.json`

### 0.15.0 (2026-06-11)
- Added: web flasher — flash new satellites directly from the admin UI via WebSerial with full device provisioning (WiFi, MQTT, OTA, asset server) written as NVS partition in one step
- Added: serial monitor mode in flash dialog — streams the full boot log immediately after flashing
- Fixed: NVS CRC was calculated incorrectly by `esp-nvs-utils`; switched to `@m1kad0/esp-nvs-utils` — ESP-IDF 6.0 no longer erases the NVS partition on first boot

### 0.14.0 (2026-06-09)
- Added: satellite `address` state (`info.ip` role) — populated from `AgentSatelliteUpdate.address` on registration; IP extracted from `ip:port` UDP address
- Added: admin tab "Hannah Satellites" — card view per satellite showing name, room, online status, firmware version badge, and link to satellite HTTP config page (`http://<ip>/`)
- Added: `SatelliteWatcher.markUnknownOffline()` — on connect, sets `online: false` for satellite device objects not reported by Hannah Core, preventing stale online states after rename/reassignment
- Added: delete button per satellite card in admin tab — removes full ioBroker object tree on confirmation

### 0.13.0 (2026-06-05)
- Fixed: `info` channel object was missing — adapter checker E3009; created before `info.connection` state in `onReady`
- Fixed: satellite room objects were `channel` type — adapter checker E2003 (device after channel); changed to `folder` so satellite devices remain valid under them
- Fixed: `indicator.update` role on `update_available` state is unknown — changed to `indicator`
- Fixed: room and device names containing spaces (e.g. "Leonie Schlafzimmer") produced invalid state IDs — `sanitizeId()` now replaces non-`[a-zA-Z0-9_,-]` characters with `_` in ID paths; `common.name` retains the original name; `satellite_control` gRPC messages use the original room name via reverse map

### 0.12.1 (2026-06-04)
- Fixed: `announcementSsml` and `announcementRephrase` states were silently ignored by Hannah Core — proto-loader uses `keepCase: true` so field names must be snake_case on the wire; added explicit `protoKey` mapping in `satellites.ts`

### 0.12.0 (2026-06-04)
- Added: `announcementRephrase` state per room — writes text to Hannah Core as `AgentSatelliteControl.announcement_rephrase`; Hannah LLM reformulates before TTS

### 0.11.3 (2026-06-02)
- Changed: update dependencies (`@grpc/grpc-js` to 1.14.4, `@grpc/proto-loader` to 0.8.1, `@iobroker/types` to 7.1.2)
- Changed: update dev dependencies (`@tsconfig/node20` → `@tsconfig/node22`)
- Fixed: replace `process.exit(1)` with `throw new Error()` in verify-package-contents script

### 0.11.2 (2026-06-01)
- Changed: minimum Node.js version bumped to 22
- Changed: CI pipeline updated to Node 22 (lint/check) and Node 24 (deploy)
- Changed: `@alcalzone/release-script` and plugins updated to 5.2.0
- Changed: use `this.setTimeout`/`this.clearTimeout` in adapter class
- Changed: removed outdated i18n keys from all translation files
- Fixed: added link to `CHANGELOG_OLD.md` at end of changelog section

### 0.11.1 (2026-06-01)
- Fixed: deduplicate notification messages before joining to prevent doubled text when ioBroker registers the same message twice for an adapter instance

### 0.11.0 (2026-05-27)
- Changed: volume and mute states moved from room-level (`satellites.rooms.<room>.volume/mute`) to per-satellite (`satellites.rooms.<room>.<deviceId>.volume/mute`)
- Changed: `AgentSatelliteControl` now supports optional `device_id` for per-satellite volume/mute commands; room-level commands (dnd, announcement) unchanged
- Changed: `AgentSatelliteUpdate` now carries optional `volume` and `mute` fields — adapter updates per-satellite states when received

### 0.10.0 (2026-05-25)
- New: `climate` device type — detected via funcId keywords (`klima`, `aircon`, `climate`); supports `mode`, `fanSpeed`, `current`, and `expected` states

### 0.9.0 (2026-05-24)
- New: `SensorWatcher` — handles `AgentSensorUpdate` commands; creates `hannah.<instance>.satellites.sensors.<device>.{temperature,pressure,humidity,gas_resistance}` states on first update
- Fixed: `satellites.sensors` folder object is created before the per-device channel to avoid state creation failure

### 0.8.0 (2026-05-24)
- New: `BleWatcher` — handles `AgentBleUpdate` commands from Hannah Core; creates `hannah.<instance>.ble.<label>.room`, `.satellite`, and `.rssi` states on first update and keeps them current on every location change

### 0.7.0 (2026-05-23)
- New: Per-satellite state `satellites.rooms.<room>.<device>.firmware_version` — updated whenever the satellite reports its running firmware version at boot
- New: Per-satellite state `satellites.rooms.<room>.<device>.update_available` (`indicator.update`) — set to `true` when the satellite reports a pending OTA update, reset to `false` on the next boot version report
- New: Per-satellite button `satellites.rooms.<room>.<device>.update_now` — triggers an immediate firmware update (bypasses residents/away check) via `TriggerFirmwareUpdate` gRPC RPC
- Changed: Build artifacts (`build/`, `admin/build/`) removed from git; `prepack` hook builds automatically on `npm pack`/`npm publish`; Auto-Build GitHub Action removed
- Changed: `nogit: true` set in `io-package.json` — adapter is distributed via npm only

### 0.6.0 (2026-05-22)
- New: ioBroker DeviceManager support — satellites are shown as devices with mute toggle and volume slider controls
- New: Satellite objects are now created as `type: device` (previously `channel`) for DeviceManager compatibility

### 0.5.0 (2026-05-06)
- New: `AgentDevice` proto carries a `device_type` field (field 5) — resolved from `common.hannah.type` override, ioBroker role (e.g. `level.temperature` → `thermostat`, `sensor.window` → `window`), or function enum IDs; supported types: `light`, `socket`, `thermostat`, `temperature_sensor`, `window`, `door`, `blind`

### 0.4.2 (2026-05-04)
- Fixed: automated TypeScript build via GitHub Actions

### 0.4.1 (2026-05-04)
- Fixed: Deployment Issues. Not all required files where inside the package

### 0.4.0 (2026-05-03)
- Fixed: States may only be set if the state is writable (`common.write === true`).
- New: `AgentDevice` now includes a `floor` field — resolved from `common.floor` on the device object, with a fallback that scans the state ID path for known floor abbreviations (EG, OG, UG, DG, KG, ZG).
- New: Configurable floor mappings — define custom label→abbreviation pairs in the Device Discovery tab (e.g. "Erdgeschoss" → "EG"); mappings normalize both `common.floor` values and ID path segments, and extend (not replace) the built-in abbreviation set.

### 0.3.2 (2026-05-03)
- Fixed: Device names in Telegram and Hannah were showing the full state ID instead of the readable name

### 0.3.1 (2026-05-02)
- Fixed: The adapter sends too much data to Hannah

### 0.3.0 (2026-05-02)

- New: Device snapshot on connect — the adapter now sends room, device name, function and current value for every subscribed state immediately after connecting, so Hannah Core no longer needs to query the ioBroker REST API for device discovery
- New: Resident snapshot on connect — all known residents are forwarded to Hannah Core once after connecting, replacing the previous API-based resident lookup
- New: `AgentDevice` proto message carries full metadata (room, device, functions, current value) per state; `AgentDeviceSnapshot` wraps the complete list
- Improved: Enum lookups during snapshot are now fetched once and reused across all states instead of once per state, significantly reducing startup time for large installations

### 0.2.1 (2026-05-01)
- Fixed: Hannah could set any state. That could be a security Issue. Hannah can now only edit the states that the adapter actively manages.

### 0.2.0 (2026-04-30)

- New: Send direct messages to Hannah via `sendTo('hannah.<instance>', 'sendDirect', { text: '...' })` — plays via TTS on all satellites and forwards to Telegram, no LLM involved
- New: Native ioBroker Notification Manager integration — system notifications are automatically forwarded to Hannah and reformulated by the LLM before being spoken and sent to Telegram
- New: Announcements via `sendTo('hannah.<instance>', 'announce', { rooms: ['Wohnzimmer', 'Küche'], text: '...' })` — plays TTS in specific rooms only, bypasses LLM and Telegram. Use `rooms: ['all']` to address every satellite
- New: Blockly block **"Hannah say"** for direct voice messages
- New: Blockly block **"Hannah announce"** with a list input for target rooms
- Fixed: Duplicate gRPC connections on reconnect — old stream is now properly closed before opening a new one
- Fixed: `prepublishOnly` instead of `prepack` — installing the adapter locally no longer triggers a full build

### 0.1.0 (2026-04-30)
- New: Native AgentTextAnswer via gRPC pushes responses directly to hannah.<instance>.textAnswer
- New: Dedicated resident_set gRPC command for residents.set_presence() to eliminate the final MQTT dependency
- New: Satellite state management integrated into adapter via GetSatellites() and gRPC subscriptions (NotifySatelliteRegistered/Gone)
- New: Automatic satellite state initialization under hannah.<instance>.satellites.- at startup
- Fixed: Removed redundant residentsPrefix from StateWatcher to prevent duplicate state_update transmissions
- Fixed: Consolidated resident tracking into ResidentsWatcher for a single, clean telemetry path
- Fixed: Replaced legacy JavaScript satellite/room logic with native adapter functionality
- Fixed: Full deprecation of the ioBroker-to-Hannah MQTT feedback channel in favor of gRPC streams

### 0.0.2 (2026-04-28)
- Fixed: ControlDevice feedback channel — device state updates correctly after Hannah sets a state
- Fixed: Wildcard pattern matching for subscribed states
- Fixed: Resident presence subscription restricted to configured instance
- Fixed: Only forward confirmed states (ack=true) to Hannah; commands (ack=false) are ignored
- New: Text command state moved into adapter namespace (`hannah.<instance>.textCommand`)
- New: Automatic reloading of enum subscriptions when rooms or functions change in ioBroker

### 0.0.1 (2026-04-27)
- Initial release
- Bidirectional gRPC stream (state updates, resident presence, text commands, SetState)
- Enum-based device discovery with room × function filtering
- Extra state prefix support for arbitrary state trees
- Snapshot-on-connect replaces MQTT retained messages

For older entries see CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 M1kad0 <leonie+iobroker@sgessinger.de>

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