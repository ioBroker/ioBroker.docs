---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.elero-usb-transmitter/README.md
title: ioBroker.elero-usb-transmitter
hash: dbtCfAzLwhx75Bh5Qzq9vqCcnyHahwTpKweS8O/cphM=
---
# ioBroker.elero-usb-transmitter

![Версия NPM](http://img.shields.io/npm/v/iobroker.elero-usb-transmitter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.elero-usb-transmitter.svg)
![Количество установок (последние)](http://iobroker.live/badges/elero-usb-transmitter-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/elero-usb-transmitter-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/marc2016/ioBroker.elero-usb-transmitter/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.elero-usb-transmitter.png?downloads=true)

![Логотип](../../../en/adapterref/iobroker.elero-usb-transmitter/admin/elero-usb-transmitter.png)

## адаптер elero-usb-transmitter для ioBroker

Адаптер для управления устройствами Elero с помощью USB-передатчика Elero. Вам потребуется USB-передатчик, к которому необходимо подключить существующие двигатели рольставней. Адаптер автоматически определяет активные каналы и добавляет устройства. В настройках можно задать имена устройств и интервал обновления.

## Конфигурация

1. **Путь к USB-накопителю** : путь к вашему USB-передатчику (например,`/dev/ttyUSB0` или`COM3` ).
2. **Интервал обновления** : время в минутах, необходимое для обновления состояния устройства.
3. **Настройки устройства** : В настройках адаптера можно сопоставить номера каналов с пользовательскими именами.

## Использование

Адаптер создает устройство для каждого активного канала, обнаруженного на устройстве. Каждое устройство содержит следующие состояния:

| Состояние        | Роль        | Описание                                                                                 |
| :--------------- | :---------- | :--------------------------------------------------------------------------------------- |
| `channel`        | текст       | Номер канала устройства.                                                                 |
| `info`           | текст       | Информация о текущем состоянии, возвращаемая устройством.                                |
| `open`           | выключатель | Основной элемент управления. Установить на`true` ОТКРЫТЬ (ВВЕРХ),`false` ЗАКРЫТЬ (ВНИЗ). |
| `controlCommand` | состояние   | Отправляйте конкретные команды напрямую.                                                 |

### Команды управления

Вы можете записать следующие значения в`controlCommand` состояние:

- `16` : ОСТАНАВЛИВАТЬСЯ
- `32` : ВВЕРХ
- `36` : Вентиляция/Наклон
- `64` : ВНИЗ
- `68` Промежуточная позиция

### Простые команды

- `74` : ЛЕГКАЯ\_ПРОВЕРКА
- `75` : EASY\_CONFIRM
- `76` : EASY\_SEND
- `77` : EASY\_ACK
- `78` : EASY\_INFO

### Значения статуса

Он`info` Отображает текущее состояние устройства. Часто встречающиеся значения:

| Ценить                               | Описание                                                     |
| :----------------------------------- | :----------------------------------------------------------- |
| `INFO_UNKNOWN`                       | Неизвестный статус (-1).                                     |
| `INFO_NO_INFORMATION`                | Информация отсутствует (0).                                  |
| `INFO_TOP_POSITION_STOP`             | Остановился в верхнем положении (1).                         |
| `INFO_BOTTOM_POSITION_STOP`          | Остановился в нижнем положении (2).                          |
| `INFO_INTERMEDIATE_POSITION_STOP`    | Остановился в промежуточном положении (3).                   |
| `INFO_TILT_VENTILATION_POS_STOP`     | Остановка в положении наклона/вентиляции (4).                |
| `INFO_BLOCKING`                      | Обнаружена блокировка (5).                                   |
| `INFO_OVERHEATED`                    | Подвесной двигатель (6).                                     |
| `INFO_TIMEOUT`                       | Тайм-аут (7).                                                |
| `INFO_START_TO_MOVE_UP`              | Начинает подниматься вверх (8).                              |
| `INFO_START_TO_MOVE_DOWN`            | Начинает смещаться вниз (9).                                 |
| `INFO_MOVING_UP`                     | Поднимаемся вверх (10).                                      |
| `INFO_MOVING_DOWN`                   | Спускаясь вниз (11).                                         |
| `INFO_STOPPED_IN_UNDEFINED_POSITION` | Остановился в неопределенном положении (13).                 |
| `INFO_TOP_POS_STOP_WICH_TILT_POS`    | Остановка верхнего положения с положением наклона (14).      |
| `INFO_BOTTOM_POS_STOP_WICH_INT_POS`  | Остановка нижнего положения с промежуточным положением (15). |
| `INFO_SWITCHING_DEVICE_SWITCHED_OFF` | Выключение устройства (16).                                  |
| `INFO_SWITCHING_DEVICE_SWITCHED_ON`  | Включение устройства (17).                                   |

## Примеры

### JavaScript / Blockly

Чтобы открыть ставни (Канал 1):

```javascript
setState('elero-usb-transmitter.0.channel_1.open', true); // Moves UP
```

Чтобы остановить движущийся затвор:

```javascript
setState('elero-usb-transmitter.0.channel_1.controlCommand', 16); // STOP command
```

## Changelog
### 1.0.7 (2026-07-25)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.

### 1.0.6 (2026-05-24)

- Serialize USB access (`runExclusive`) for `getInfo` and control commands
- Retry control commands and reconnect the stick on failure; update `info.connection`
- Adjust burst polling after commands (10s interval, 6 runs)
- Update dependencies
>>>>>>> origin/main

### 1.0.5 (2025-12-31)

-   Fixed reliability issue with fast polling (burst mode)

### 1.0.4 (2025-12-30)

-   Adjusted release configuration
-   Implemented fast polling after command execution

### 1.0.3 (2025-12-30)

- Release script configuration improved (added missing plugins)
- Bug fix: Status update handling (async + validation)
- Improvement: Connection retry logic implemented
- Improvement: All tests converted to TypeScript

Older changelogs can be found there## License

MIT License

Copyright (c) 2025-2026 marc <marc@lammers.dev>

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