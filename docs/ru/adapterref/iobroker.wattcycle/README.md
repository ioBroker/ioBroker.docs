---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wattcycle/README.md
title: ioBroker.wattcycle
hash: de2Urgk9fNWVRYzXCiaJndGbwMBecNvZWCSth6Vb5/I=
---
<img src="admin/wattcycle.png" width="100" />

# ioBroker.wattcycle

Считывает данные с батарей WattCycle / XDZN BLE (протокол TDT, характеристики fff1/fff2/fffa, аутентификация "HiLink") в ioBroker.

## Функции

- Осуществляет непрерывный опрос настраиваемого списка батарей через BLE.
- Состояния каждой батареи: уровень заряда (SoC), напряжение, ток, мощность, емкость, количество циклов, температура MOSFET/печатной платы/ячеек, напряжение отдельных ячеек.
- Встроенная функция сканирования BLE из административного интерфейса позволяет обнаруживать MAC-адреса находящихся поблизости устройств.
- Настраиваемый интервал опроса, интервал между батареями и адаптером Bluetooth (HCI).
- Диспетчер устройств: каждая батарея представлена в виде карты с информацией о состоянии заряда (SOC), подключении, состоянии заряда/разряда, напряжении, мощности и температуре; подробная информация обо всех элементах; сканирование, добавление, редактирование, включение/отключение и удаление батарей.
- Плитка для `devices` приложение и виджет для `vis-2` Создано по образцу приложения WattCycle (диаметр заряда, напряжение, ток, мощность, температура, состояние и элементы питания).

## Визуализация

### Приложение для устройств

Добавьте пользовательский виджет типа **«Аккумулятор WattCycle»** и выберите аккумуляторное устройство (`wattcycle.0.batteries.<name>`) или `wattcycle.0.total` для суммы всех батарей.

- `1x1` – Состояние заряда и дуговой разряд
- `2x½` – Индикатор заряда батареи с указанием напряжения, тока и мощности.
- `2x1` – Уровень заряда батареи (SOC) в сочетании с напряжением, током, мощностью и температурой.

Щелчок по плитке открывает диалоговое окно со всей информацией: состояние здоровья, клетки и температура.

### вис-2

В набор виджетов **WattCycle batteries** входит виджет **Battery** . Выберите устройство Battery в его настройках. Макет может изменяться в зависимости от размера виджета (панель, компактный, широкий или полноэкранный режим) или быть зафиксирован в настройках. При нажатии на меньший макет открывается полноэкранный режим.

### Веб-компоненты

Батарея также является компонентом веб-сети (`common.webComponents`,[`@iobroker/web-components`](https://github.com/ioBroker/web-components) ), чтобы Aura, административная панель и любой другой набор веб-компонентов могли его отображать:

- `<iob-wattcycle-battery>` ( **Аккумулятор WattCycle** ) – те же представления, что и в виджете vis-2: дуга SOC с состоянием заряда, индикатор заряда батареи, дуга SOC с напряжением, током, мощностью и температурой, или все с отображением состояния, элементов и температуры. Щелчок по уменьшенным представлениям открывает все в диалоговом окне хоста.

Настройки:

- **Батарея** – батарейное устройство (`wattcycle.<n>.batteries.<name>`) или `wattcycle.<n>.total` для суммы всех батарей
- **Имя** – пустое поле: название устройства
- **Вариант компоновки** – автоматический (по размеру), компактный, барный, широкий или полный.
- **Подробности можно узнать, нажав на кнопку.**

В приложении для устройств вместо одноименного веб-компонента используется собственная **батарея WattCycle** .

### Диспетчер устройств

Вкладка « **Диспетчер устройств»** в настройках экземпляра (или в диспетчере устройств администратора) отображает все настроенные батареи и их общее количество.

## Конфигурация

Откройте административный интерфейс и на вкладке **«Основные настройки»** выберите:

- **Bluetooth-адаптер (hciX)** — идентификатор устройства HCI (`0` =`hci0`).
- **Интервал опроса (мс)** — интервал между полными циклами опроса.
- **Пауза между считываниями показаний батарей (мс)** — пауза между последовательными считываниями показаний батарей в одном цикле.
- **Длительность сканирования (мс)** — продолжительность сканирования BLE.

На вкладке **«Батареи»** нажмите **«Сканировать устройства BLE»** , затем скопируйте MAC-адреса ваших батарей в таблицу ниже и присвойте каждой из них имя.

## Штаты

Для каждой сконфигурированной батареи создаются следующие состояния. `wattcycle.<instance>.batteries.<name>`:

| Состояние              | Тип        | Единица | Описание                                           |
| ---------------------- | ---------- | ------- | -------------------------------------------------- |
| `soc`                  | число      | %       | Обвинение                                          |
| `voltage`              | число      | В       | Напряжение батареи                                 |
| `current`              | число      | А       | Текущий ток (со знаком, положительный заряд)       |
| `power`                | число      | В       | Напряжение × ток                                   |
| `remaining_ah`         | число      | Ах      | Оставшаяся вместимость                             |
| `total_ah`             | число      | Ах      | Общая вместимость                                  |
| `design_ah`            | число      | Ах      | Проектная мощность                                 |
| `cycles`               | число      |         | Подсчет циклов                                     |
| `cell_spread_mv`       | число      | мВ      | Разница между самой высокой и самой низкой ячейкой |
| `mos_temp`             | число      | °С      | температура MOSFET                                 |
| `pcb_temp`             | число      | °С      | температура печатной платы                         |
| `cells_v`              | нить       |         | JSON-массив напряжений ячеек (В)                   |
| `cell_temps`           | нить       |         | JSON-массив температур ячеек (°C)                  |
| `product.model_or_fw`  | нить       |         | Строка модели/прошивки                             |
| `product.manufacturer` | нить       |         | Строка производителя                               |
| `product.serial`       | нить       |         | Серийный номер                                     |
| `lastUpdate`           | число      |         | Отметка времени последнего успешного прочтения     |
| `reachable`            | логический |         | Верно, если последнее прочтение прошло успешно.    |
| `lastError`            | нить       |         | Ошибка при последнем неудачном чтении.             |

Кроме того, агрегированное устройство `wattcycle.<instance>.total` создается (предполагается параллельная топология):

| Состояние            | Тип   | Единица | Агрегация             |
| -------------------- | ----- | ------- | --------------------- |
| `soc`                | число | %       | средний               |
| `soc_min`            | число | %       | минимум               |
| `soc_max`            | число | %       | максимум              |
| `voltage`            | число | В       | средний               |
| `voltage_min`        | число | В       | минимум               |
| `voltage_max`        | число | В       | максимум              |
| `current`            | число | А       | сумма                 |
| `power`              | число | В       | сумма                 |
| `remaining_ah`       | число | Ах      | сумма                 |
| `total_ah`           | число | Ах      | сумма                 |
| `design_ah`          | число | Ах      | сумма                 |
| `cycles_avg`         | число |         | средний               |
| `cell_spread_mv_max` | число | мВ      | максимум              |
| `mos_temp_max`       | число | °С      | максимум              |
| `pcb_temp_max`       | число | °С      | максимум              |
| `count`              | число |         | достижимое количество |
| `lastUpdate`         | число |         | агрегированные ts     |

## Сообщения

```js
// Force an immediate poll cycle
sendTo('wattcycle.0', 'pollNow', null, res => console.log(res));

// Run a BLE scan
sendTo('wattcycle.0', 'scan', { duration: 8000 }, res => console.log(res.devices));
```

## Требования

- Linux с BlueZ (`apt install bluez libbluetooth-dev`).
- Адаптеру должен быть разрешен доступ к сокету HCI (обычно он запускается от имени root или с правами root). `setcap`).
- Bluetooth-адаптер должен поддерживать Bluetooth 5.0 (LE, большой радиус действия).

## Changelog

<!--
   Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (@GermanBluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`

### 2.1.0 (2026-11-08)
* (@GermanBluefox) Added the web component `<iob-wattcycle-battery>` for Aura and other hosts (`common.webComponents`)

### 2.0.4 (2026-11-03)
* (@GermanBluefox) Restored the restriction of the adapter to Linux and macOS

### 2.0.3 (2026-11-02)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Ignore in totals batteries that have not been read for more than an hour

### 2.0.2 (2026-10-28)
* (@GermanBluefox) Fixed the missing translations of the widget set, the widget name and the help in vis-2
* (@GermanBluefox) Replaced the wrong telegram context in the Copilot instructions and stopped the template check from creating duplicate issues (#70)
* (@GermanBluefox) Updated packages

### 2.0.1 (2026-10-14)
* (@GermanBluefox) Restored the supported platforms (Linux and macOS) in package.json
* (@GermanBluefox) Added dependabot updates for the GUI parts

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