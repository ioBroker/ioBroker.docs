---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iometer/README.md
title: ioBroker.iometer
hash: P7+3dJhI8bQyzDi4lqLN66jJDgYiu7Ie4l4YeI0hiUs=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.iometer.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iometer.svg)
![Количество установок](https://iobroker.live/badges/iometer-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/iometer-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.iometer.png?downloads=true)
![Тестирование и выпуск](https://github.com/torben-iometer/ioBroker.iometer/workflows/Test%20and%20Release/badge.svg)

<img src="admin/iometer.png" width="128" alt="IOmeter Logo" />

# ioBroker.iometer

## Адаптер iometer для ioBroker

**_Для работы этого адаптера требуется как минимум Node.js версии 22.x!_**

Подключает ioBroker к интеллектуальному счетчику электроэнергии [IOmeter](https://www.iometer.de) и предоставляет показания потребления электроэнергии в режиме реального времени посредством событий Server-Sent Events (SSE). Показания счетчика и состояние устройства обновляются в режиме реального времени, как только устройство их передает.

## Установить

Установите этот адаптер через административную панель ioBroker:

1. Откройте список адаптеров и найдите **IOmeter.**
2. Нажмите **«Установить»**
3. Создайте экземпляр адаптера IOmeter.
4. Введите IP-адрес вашего устройства IOmeter и сохраните изменения.
5. Соединение с устройством устанавливается автоматически, и данные сохраняются в соответствующих каналах.

## Конфигурация

### IP-адрес IOmeter

Локальный IP-адрес вашего устройства IOmeter (например,`192.168.1.100` Эту информацию можно найти в сведениях об устройстве в приложении IOmeter.

Адаптер подключается к`http://<ip>/v1/reading` и`http://<ip>/v1/status` через SSE. Оба потока автоматически переподключаются при потере соединения.

## Штаты

Адаптер динамически создает объекты состояния при первом полученном событии. Номер счетчика, сообщаемый устройством, используется в качестве префикса канала для различения нескольких экземпляров для разных счетчиков.

Идентификационные номера штатов имеют следующий формат:

```
iometer.<instance>.<channel>-<meterNumber>.<state>
```

- `<instance>` — Индекс экземпляра адаптера ioBroker (обычно)`0` )
- `<channel>` - или`reading` (данные счетчика),`device` (состояние оборудования) или`info` (состояние соединения)
- `<meterNumber>` — серийный номер счетчика, сообщаемый устройством (например)`1ISK04051904` )
- `<state>` — отдельная точка данных (см. ниже)

### Читать канал (`reading-<meterNumber>` )

Заполнено из`/v1/reading` Поток SSE (тип события)`readingEvent` ).

| Состояние            | Тип   | Единица | Роль                    | Описание                                                                                                                                      |
| -------------------- | ----- | ------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `power`              | число | В       | `value.power.active`    | Текущая суммарная активная мощность. Использует суммарное значение OBIS, если оно доступно; для однофазных счетчиков переключается на фазу 1. |
| `power_phase1`       | число | В       | `value.power.active`    | Активная мощность на фазе L1                                                                                                                  |
| `power_phase2`       | число | В       | `value.power.active`    | Активная мощность на фазе L2                                                                                                                  |
| `power_phase3`       | число | В       | `value.power.active`    | Активная мощность на фазе L3                                                                                                                  |
| `energy_imported`    | число | кВтч    | `value.energy.consumed` | Общий объем импортируемой энергии                                                                                                             |
| `energy_exported`    | число | кВтч    | `value.energy.produced` | Общий объем экспортируемой энергии                                                                                                            |
| `energy_imported_t1` | число | кВтч    | `value.energy.consumed` | Импортируемая энергия — Тариф 1                                                                                                               |
| `energy_imported_t2` | число | кВтч    | `value.energy.consumed` | Импортируемая энергия — Тариф 2                                                                                                               |

### Канал устройства (`device-<meterNumber>` )

Заполнено из`/v1/status` Поток SSE (тип события)`statusEvent` ).

| Состояние           | Тип   | Единица | Роль            | Описание                                                             |
| ------------------- | ----- | ------- | --------------- | -------------------------------------------------------------------- |
| `id`                | нить  | —       | `info.serial`   | Уникальный идентификатор устройства                                  |
| `meter_number`      | нить  | —       | `info.serial`   | серийный номер счетчика                                              |
| `bridge_rssi`       | число | дБм     | `value`         | Уровень сигнала Wi-Fi мостового модуля                               |
| `bridge_firmware`   | нить  | —       | `info.firmware` | Версия прошивки мостового модуля                                     |
| `core_rssi`         | число | дБм     | `value`         | Уровень мощности радиочастотного сигнала между сердечником и мостом. |
| `core_firmware`     | нить  | —       | `info.firmware` | Версия прошивки основного модуля                                     |
| `battery_level`     | число | %       | `value.battery` | Уровень заряда батареи основного модуля                              |
| `power_status`      | нить  | —       | `info.status`   | Состояние источника питания (например)`wired` ,`battery` )           |
| `attachment_status` | нить  | —       | `info.status`   | Статус подключения основного модуля                                  |

### Состояние соединения

| Состояние         | Описание                                                             |
| ----------------- | -------------------------------------------------------------------- |
| `info.connection` | `true` когда поток чтения получает данные,`false` в противном случае |

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.6 (2026-08-20)
- (torben-iometer) Fixed the adapter crashing on startup with `ERR_PACKAGE_PATH_NOT_EXPORTED` on installations where an older `@iobroker/adapter-core` version got hoisted into node_modules.

### 0.0.5 (2026-08-19)
- (torben-iometer) Sanitized meter numbers before using them in object IDs to prevent invalid states when the device reports characters that are not allowed in ioBroker IDs.
- (torben-iometer) Tightened the IP address validator in the adapter settings to reject invalid octets (e.g. `999.999.999.999`).
- (torben-iometer) Improved error logging for the reading/status streams to show the actual error message instead of an unhelpful JSON dump.
- (torben-iometer) Added missing translations for the adapter description.
- (torben-iometer) Removed the unused visualization widget stub.

### 0.0.4 (2026-08-10)
- (torben-iometer) Changed the state role for `bridge_rssi` and `core_rssi` from the non-existent `value.rssi` to the generic `value` role.

### 0.0.3 (2026-08-07)
- (torben-iometer) Fixed the release workflow (removed the broken Sentry release step, corrected the repository URL format) and the outdated Node.js version requirement in the README.

### 0.0.2 (2026-08-07)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

[Older changelogs can be found there](https://github.com/torben-iometer/ioBroker.iometer/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 torben-iometer <torben@iometer.de>

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