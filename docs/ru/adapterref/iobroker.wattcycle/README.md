---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wattcycle/README.md
title: ioBroker.wattcycle
hash: iwXC7pbp3GozHWWzpfotm7/hKeirAJWzTUe0012QhEA=
---
<img src="admin/wattcycle.png" width="100" />

# IoBroker.wattcycle
Считывает данные с батарей WattCycle / XDZN BLE (протокол TDT, характеристики fff1/fff2/fffa, аутентификация "HiLink") в ioBroker.

## Функции
- Непрерывно опрашивает настраиваемый список батарей через BLE.
- Состояние каждой батареи: уровень заряда (SoC), напряжение, ток, мощность, емкость, количество циклов, температура MOSFET/печатной платы/ячеек, напряжение отдельных ячеек.
- Встроенная функция сканирования BLE из административного интерфейса для обнаружения MAC-адресов находящихся поблизости устройств.
- Настраиваемый интервал опроса, интервал между батареями и адаптером Bluetooth (HCI).

## Конфигурация
Откройте административный интерфейс и на вкладке **Основные настройки** выберите:

- **Адаптер Bluetooth (hciX)** — идентификатор устройства HCI (`0` = `hci0`).
- **Интервал опроса (мс)** — интервал между полными циклами опроса.
- **Интервал между считываниями состояния батарей (мс)** — пауза между последовательными считываниями состояния батарей в одном цикле.
- **Длительность сканирования (мс)** — продолжительность сканирования BLE.

На вкладке **Батареи** нажмите **Сканировать устройства BLE**, затем скопируйте MAC-адреса ваших батарей в таблицу ниже и присвойте каждой из них имя.

## Штаты
Для каждой сконфигурированной батареи в разделе `wattcycle.<instance>.batteries.<name>` создаются следующие состояния:

| Штат | Тип | Единица измерения | Описание |
|------------------------|---------|------|------------------------------------------|
| `soc` | число | % | Состояние заряда |
| `current` | число | A | Текущий (знаковый, положительный заряд) |
| `power` | число | Вт | Напряжение × ток |
| `remaining_ah` | номер | Ач | Оставшаяся емкость |
| `total_ah` | число | Ач | Общая емкость |
| `design_ah` | число | Ач | Расчетная мощность |
| `cycles` | число | | Количество циклов |
| `cell_spread_mv` | число | мВ | Разница между самым высоким/самым низким значением ячейки |
| `mos_temp` | число | °C | температура MOSFET |
| `pcb_temp` | число | °C | температура печатной платы |
| `cells_v` | строка | | JSON-массив напряжений ячеек (В) |
| `cell_temps` | строка | | Массив JSON с температурами ячеек (°C) |
| `product.model_or_fw` | строка | | Строка модели/прошивки |
| `product.manufacturer` | строка | | Строка производителя |
| `product.serial` | строка | | Серийный номер |
| `lastUpdate` | номер | | Отметка времени последнего успешного чтения |
| `reachable` | логическое значение | | Возвращает true, если последнее чтение прошло успешно |
| `lastError` | строка | | Ошибка последнего неудачного чтения |
| `lastError` | строка | | Ошибка при последнем неудачном чтении |

Кроме того, создается агрегированное устройство `wattcycle.<instance>.total` (предполагается параллельная топология):

| Штат | Тип | Единица | Агрегация |
|-----------------------------|--------|------|-----------------|
| `soc` | число | % | среднее |
| `soc_max` | число | % | максимум |
| `voltage` | число | V | среднее |
| `voltage_min` | число | V | минимум |
| `voltage_max` | число | V | максимум |
| `current` | число | A | сумма |
| `power` | число | W | сумма |
| `remaining_ah` | число | Ах | сумма |
| `total_ah` | число | Ах | сумма |
| `design_ah` | число | Ах | сумма |
| `cycles_avg` | число | | среднее |
| `cell_spread_mv_max` | число | мВ | максимум |
| `mos_temp_max` | число | °C | максимум |
| `pcb_temp_max` | число | °C | максимум |
| `count` | число | | количество достижимых значений |
| `lastUpdate` | число | | агрегат ts |
| `lastUpdate` | число | | агрегат ts |

## Сообщения
```js
// Force an immediate poll cycle
sendTo('wattcycle.0', 'pollNow', null, res => console.log(res));

// Run a BLE scan
sendTo('wattcycle.0', 'scan', { duration: 8000 }, res => console.log(res.devices));
```

## Требования
- Linux с BlueZ (`apt install bluez libbluetooth-dev`).
- Адаптеру должен быть разрешен доступ к сокету HCI (обычно он запускается от имени root или с помощью команды `setcap`).
- Bluetooth-адаптер должен поддерживать Bluetooth 5.0 (LE с большим радиусом действия).

## Changelog
<!--
   Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-07-01)
* (@GermanBluefox) Improved total calculations
* (@GermanBluefox) Updated packages

### 0.2.2 (2026-05-07)
* (@GermanBluefox) Managed timeouts and power off

### 0.2.1 (2026-05-06)
* (@GermanBluefox) Use MAC address as a unique identifier bluetooth adapter

### 0.1.0 (2026-05-05)

* (@GermanBluefox) Initial version.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 bluefox <dogafox@gmail.com>

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