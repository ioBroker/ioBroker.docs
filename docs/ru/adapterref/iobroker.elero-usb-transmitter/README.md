---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.elero-usb-transmitter/README.md
title: ioBroker.elero-usb-transmitter
hash: B4BFyXjQg2PIiZv5FCRU1GoOannx8Mw96nu2B4cAgdU=
---
# IoBroker.elero-usb-transmitter
![Логотип](../../../en/adapterref/iobroker.elero-usb-transmitter/admin/elero-usb-transmitter.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.elero-usb-transmitter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.elero-usb-transmitter.svg)
![Количество установок (последние)](http://iobroker.live/badges/elero-usb-transmitter-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/elero-usb-transmitter-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/marc2016/ioBroker.elero-usb-transmitter/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.elero-usb-transmitter.png?downloads=true)

## Адаптер elero-usb-transmitter для ioBroker
Адаптер для управления устройствами Elero с помощью USB-передатчика Elero.
Вам потребуется USB-передатчик, и необходимо подключить к нему существующие двигатели рольставней. Адаптер автоматически определяет активные каналы и добавляет устройства. В настройках можно задать имена устройств и интервал обновления.

## Конфигурация
1. **Путь к USB-накопителю**: Путь к вашему USB-передатчику (например, `/dev/ttyUSB0` или `COM3`).
2. **Интервал обновления**: Время в минутах, необходимое для обновления состояния устройства.
3. **Настройки устройства**: В настройках адаптера можно сопоставить номера каналов с пользовательскими именами.

## Использование
Адаптер создает устройство для каждого активного канала, обнаруженного на устройстве. Каждое устройство содержит следующие состояния:

| Штат | Роль | Описание |
| :--- | :--- | :--- |
| `channel` | текст | Номер канала устройства. |
| `open` | переключатель | Главный элемент управления. Установите `true` для ОТКРЫТИЯ (ВВЕРХ), `false` для ЗАКРЫТИЯ (ВНИЗ). |
| `controlCommand` | состояние | Отправлять конкретные команды напрямую. |
| `controlCommand` | state | Отправлять конкретные команды напрямую. |

### Команды управления
В состояние `controlCommand` можно записать следующие значения:

* `16`: СТОП
* `32`: ВВЕРХ
* `36`: ВНИЗ
* `64`: STEP_UP
* `68`: STEP_DOWN

## Примеры
### Javascript / Blockly
Чтобы открыть ставни (Канал 1):

```javascript
setState('elero-usb-transmitter.0.channel_1.open', true); // Moves UP
```

Чтобы остановить движущийся затвор:

```javascript
setState('elero-usb-transmitter.0.channel_1.controlCommand', 16); // STOP command
```

## Changelog
### 1.0.2 (2025-12-24)

- Replaced deprecated createState/createDevice methods with setObjectNotExistsAsync

### 1.0.1 (2025-12-24)

- Dependencies updated

### 1.0.0 (2025-12-23)

- Refactor main.ts (split into smaller modules)
- Cleanup unused code (src/lib/tools.ts)
- Admin UI migrated to jsonConfig
- Dependencies updated
- ESLint migrated to v9
- Tests validation improved
- Bug fix: Async iteration in device refresh
- TypeScript configuration updated

### 0.5.2

- Missing translation for title and description added

### 0.5.1

- Translation added

### 0.5.0

- Translations added
- Ignore state changes with ack=true in onStateChanged handler
- messages handler removed
- node-scheduler package removed

### 0.4.0

- Added channel for connection info.

### 0.3.0

- Use only open state to controle devices.

### 0.1.0

- Transmission time removed and code clean up.

### 0.0.3"

- Log messages added.

### 0.0.2

- bug fixes

### 0.0.1

- initial release

## License

MIT License

Copyright (c) 2022 marc <marc@lammers.dev>

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