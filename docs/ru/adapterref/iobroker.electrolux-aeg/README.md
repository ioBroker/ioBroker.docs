---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.electrolux-aeg/README.md
title: ioBroker.electrolux-aeg
hash: CTl8e3COeQU7IeL+IfvPeMx7nGPxgNoiSxHUCTj8UAs=
---
![Логотип](../../../en/adapterref/iobroker.electrolux-aeg/admin/electrolux-aeg.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.electrolux-aeg.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.electrolux-aeg.svg)
![Количество установок](https://iobroker.live/badges/electrolux-aeg-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/electrolux-aeg-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.electrolux-aeg.png?downloads=true)

# ioBroker.electrolux-aeg

**Тесты:**![Тестирование и выпуск](https://github.com/TA2k/ioBroker.electrolux-aeg/workflows/Test%20and%20Release/badge.svg)

## адаптер electrolux-aeg для ioBroker

Адаптер для Electrolux и AEG

Управление поддерживаемыми приборами осуществляется через официальные сервисы [Electrolux](https://www.electrolux.com/) и [AEG](https://www.aeg.com/) для подключенных устройств.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Контроль

electrolux-aeg.0.XXXX.remote

## Настройки

electrolux-aeg.0.XXXX.control

Каждая доступная для записи функция, о которой сообщает устройство, становится состоянием в этом канале: выпадающие списки для функций с фиксированным списком значений, переключатели для функций ВКЛ/ВЫКЛ, числа с допустимым диапазоном и кнопки для запуска только записи. Функции, вложенные в контейнер, имеют имена.`container_capability` , например`userSelections_analogTemperature` Запись состояния отправляет изменение на устройство, и значение отражается обратно с устройства при следующем обновлении.

Большинство бытовых приборов принимают только команды, в том числе`remote.START` После того, как функция дистанционного запуска была активирована на самом устройстве, адаптер не может её включить; он регистрирует предупреждение, когда устройство сообщает, что дистанционное управление выключено.

Для некоторых моделей облако отклоняет некоторые настройки. В этом случае запись регистрируется как предупреждение, и состояние возвращается к сообщенному значению; используйте`remote.CustomCommand` в этом случае отправить необработанные данные.

## Статус

electrolux-aeg.0.XXXX.status

## Живые мероприятия

electrolux-aeg.0.XXXX.events

## Производные состояния

Адаптер вычисляет несколько вспомогательных состояний на основе исходных данных, поэтому скриптам это делать не нужно. Они располагаются рядом с исходными значениями.`electrolux-aeg.0.XXXX.status` :

| Состояние       | Значение                                                                                                                                                                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `running`       | Программа находится в стадии реализации.`PAUSED` и`DELAYED_START` считается забегом.                                                                                                                      |
| `finishTime`    | Предполагаемое время окончания выполнения программы в миллисекундах с начала эпохи. Пустое, если программа не запущена. Перезаписывается только в том случае, если оценка изменяется более чем на минуту. |
| `cycleFinished` | `true` для единственного обновления, в котором завершилась программа. Триггер срабатывает при изменении на`true` .                                                                                        |

## Changelog

### 1.0.0 (2026-09-04)

- Breaking: WebSocket updates no longer create a second object tree. Values from `<appliance>.properties.*` now live under `<appliance>.status.*`, and the old tree is deleted on the first start. Update scripts, aliases, VIS and history settings.
- Breaking: `status.finishTime` is a number in milliseconds since the epoch instead of an ISO 8601 string, and `status.timeToEndMinutes` is gone - `status.properties.reported.timeToEnd` carries the remaining time in seconds with a role and a unit.
- Breaking: removed the `status.properties.metadata` tree and the empty `desired` / `metadataDesired` halves of the cloud shadow. The metadata timestamps froze after the first poll; instead every start now stamps the reported values with the moment the appliance changed them.
- Breaking: the enums of the capability document are one JSON list state instead of an empty channel per value, 140 objects on one oven. The empty channels of an older version are removed on the first start.
- Added the derived states `status.running`, `status.finishTime` and `status.cycleFinished`.
- Added a `control` channel with a writable state for every writable capability, so settings no longer have to be sent as a hand written `remote.CustomCommand` payload.
- Well known reported values now carry a role and a unit, so the type detector, VIS and the history adapters can use them.
- The session is kept in the instance data directory and reused after a restart, so a restart no longer needs a new login. The file holds the tokens only, with owner only permissions.
- WebSocket pushes now update the status tree with every derived and control state, not only the `events` channel, and an upgrade the cloud rejects with a 403 refreshes the access token instead of retrying with the dead one. Connect, close and reconnect moved to `debug`, the cloud drops an idle connection every ten minutes.
- Buttons below `remote` are released after the press, `Refresh` in particular stayed pressed for good. Control states the appliance does not report, such as `targetFoodProbeTemperatureC` without a probe, are initialized as empty.
- The network interface commands never become control states - one of them unregisters the appliance from the account - and a command is logged with a warning when the appliance reports remote control as switched off.
- Failures no longer take credentials or the instance with them: a failed request logs neither the Authorization header nor the password, an answer that does not carry what the next step reads is reported instead of ending in a TypeError, the update interval and the appliance brand are validated, and an error while a WebSocket message or a state change is processed is logged instead of ending the adapter process.
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.0.14 (2026-08-06)

- Button states (`remote.Refresh`, `remote.START`, `remote.STOPRESET`) are now write-only (`read: false`) as required by the ioBroker state role specification.
- Sanitize remote command names coming from the cloud API before using them as object IDs; the raw command name is still sent to the API.
- Redact WebSocket debug logs instead of logging the raw payload.
- Await the logout request during unload and give it a shorter timeout than regular requests.
- Update axios to 1.19.0.

### 0.0.13 (2026-07-04)

- Trim old `common.news` entries for repository review.

### 0.0.12 (2026-07-04)

- Exclude `CHANGELOG_OLD.md` and test files from npm publishing.
- Tighten object ID sanitization to replace commas.
- Remove stale commented-out logout code and document raw/sanitized appliance ID mapping.

### 0.0.11 (2026-07-03)

- Republish the latest repository review fixes with npm provenance.
- Remove obsolete ESLint and Prettier dependencies after migrating to `@iobroker/eslint-config`.

Older changes are documented in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2023-2026 TA2k <tombox2020@gmail.com>

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