---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md
title: Руководство по настройке страницы
hash: zISc3A0bK3OM9W+rhq5hkNIFqgAKAleV3JKOV6pL3mE=
---
# Руководство по настройке страницы

## Обзор

Адаптер MCDU отображает страницы на аппаратном дисплее WinWing MCDU. Каждая страница содержит до 13 строк контента (строка 14 — это буфер ввода). Настройка осуществляется для каждого устройства через административный интерфейс.

## Административный интерфейс

Перейдите по пути: **Экземпляры > mcdu.0 > Настройка**

Настройки организованы в 4 вкладки:

- **Общие настройки** — Брокер MQTT, производительность
- **Устройство и страницы** — Выберите устройство, цвет по умолчанию, шаг регулировки яркости, загрузите/сохраните страницы, отредактируйте строки.
- **Функциональные клавиши** — Настройте 11 функциональных клавиш (MENU, DIR, INIT и т. д.)
- **Расширенные настройки и информация о программе** — Журнал отладки, информация о версии

## Макет отображения

```
Row  1: ┌────────────────────────┐  Status bar (breadcrumb + time)
Row  2: │  sub-label (colLabel)  │  Sub-label for row 3
Row  3: │ LEFT CONTENT  RIGHT    │  LSK1 line (left/right buttons)
Row  4: │  sub-label (colLabel)  │  Sub-label for row 5
Row  5: │ LEFT CONTENT  RIGHT    │  LSK2 line
Row  6: │  sub-label (colLabel)  │  Sub-label for row 7
Row  7: │ LEFT CONTENT  RIGHT    │  LSK3 line
Row  8: │  sub-label (colLabel)  │  Sub-label for row 9
Row  9: │ LEFT CONTENT  RIGHT    │  LSK4 line
Row 10: │  sub-label (colLabel)  │  Sub-label for row 11
Row 11: │ LEFT CONTENT  RIGHT    │  LSK5 line
Row 12: │  sub-label (colLabel)  │  Sub-label for row 13
Row 13: │ LEFT CONTENT  RIGHT    │  LSK6 line / status bar
Row 14: └────────────────────────┘  Scratchpad (user input)
```

- **Нечетные строки** (3, 5, 7, 9, 11, 13): строки основного содержимого, каждая с кнопками LSK влево/вправо
- **Четные строки** (2, 4, 6, 8, 10, 12): подзаголовки (цвет от...)`colLabel` по умолчанию используется устройство`defaultColor` )
- **Строка 1** : строка состояния с отображением навигации по хлебным крошкам и временем.
- **Строка 14** : черновик для ввода с клавиатуры.
- Каждая строка **состоит из 24 символов** и разделена на левую (символы 1-12) и правую (символы 13-24) части.

## Модель линейных данных (слева/справа)

Каждая линия имеет две стороны —`left` и`right` Каждая сторона имеет:

| Поле      | Цель                                                                              |
| --------- | --------------------------------------------------------------------------------- |
| `label`   | Подзаголовочный текст (отображается в четной строке выше, в`colLabel` цвет)       |
| `display` | Что отображать с этой стороны (метка, точка данных или пустое поле)?              |
| `button`  | Что происходит при нажатии клавиши LSK (навигация, точка данных или пустое поле)? |

### Типы отображения

**Метка** — статический текст:

```json
{ "type": "label", "text": "WOHNZIMMER", "colLabel": "cyan", "colData": "white" }
```

- `colLabel` : цвет для подзаголовка в четной строке выше (по умолчанию — цвет устройства)`defaultColor` )
- `colData` : цвет текста данных в нечетной строке (по умолчанию используется цвет устройства)`defaultColor` )

**Datapoint** — актуальные данные от ioBroker:

```json
{ "type": "datapoint", "source": "hm-rpc.0.ABC123.TEMPERATURE", "format": "%.1f", "unit": "C", "colLabel": "cyan", "colData": "green" }
```

- `source` : ioBroker state ID
- `format` : формат sprintf (определяется автоматически:`%.1f` для чисел,`%s` (для струнных)
- `unit` : единица измерения дисплея (определяется автоматически на основе метаданных объекта ioBroker)
- `colLabel` : цвет подметки (по умолчанию используется цвет устройства)`defaultColor` )
- `colData` : цвет значения данных (по умолчанию используется цвет устройства)`defaultColor` )

**Пусто** — нет содержимого:

```json
{ "type": "empty" }
```

### Типы кнопок

**Навигация** — перейти на другую страницу:

```json
{ "type": "navigation", "action": "goto", "target": "klima-page" }
```

**Datapoint** — переключение/увеличение/уменьшение состояния ioBroker:

```json
{ "type": "datapoint", "action": "toggle", "target": "hm-rpc.0.ABC123.STATE" }
```

**Пусто** — никаких действий с кнопкой:

```json
{ "type": "empty" }
```

## Взаимодействие LSK с точками данных

При нажатии кнопки LSK на строке, отображающей точку данных (и не имеющей явно настроенной кнопки), адаптер использует **метаданные объекта ioBroker** для определения дальнейших действий. Руководство отсутствует.`editable` Необходим флаг — на адаптере написано`obj.common.write` ,`obj.common.type` ,`obj.common.min` ,`obj.common.max` автоматически.

### Дерево решений

```
LSK pressed on datapoint line:

  1. Is the datapoint writable? (obj.common.write)
     NO  → Nothing happens (read-only sensor, e.g. temperature reading)
     YES → Continue...

  2. Is it a boolean? (obj.common.type === 'boolean')
     YES → Toggle immediately: true↔false
           No scratchpad needed. Display updates instantly.

  3. Is it a number or string?
     YES → Check scratchpad:
           EMPTY    → Nothing happens (type something first)
           HAS TEXT → Validate and write (see below)
```

### Записывание значений с черновика

Чтобы записать значение в числовой или строковый формат, доступный для записи:

1. **Введите значение** на клавиатуре (оно отобразится в буфере ввода на строке 14, например).`22.5*` )
2. **Нажмите LSK** рядом со строкой с целевой точкой данных.
3. Адаптер выполняет проверку и записывает:

| Ситуация                                       | Результат                                                   |
| ---------------------------------------------- | ----------------------------------------------------------- |
| Действительный номер в пределах диапазона      | Написана стоимость, черновик очищен, указано "GESPEICHERT". |
| Нечисловой текст для числового поля            | `FORMAT ERROR` показано в блокноте                          |
| Число вне минимального/максимального диапазона | `ENTRY OUT OF RANGE` показано в блокноте                    |
| строковое значение                             | Написано как есть, черновик очищен.                         |

### Обработка ошибок (шаблон Airbus)

Ошибки соответствуют реальной системе обозначений Airbus MCDU:

- **Ошибки отображаются в черновике** (строка 14) белым текстом, а не на отдельной строке.
- **Автоматическое отключение по истечении заданного времени ожидания** — ошибка сохраняется до тех пор, пока вы не нажмете CLR.
- **Команда \`CLR once\`** → восстанавливает отклоненные входные данные (чтобы вы могли редактировать и повторять попытку).
- **Нажмите CLR дважды** → полностью очистит блокнот.

**Пример схемы работы:**

```
1. Type "999" into scratchpad        → Scratchpad: "999*"
2. Press LSK on temperature (max 30) → Scratchpad: "ENTRY OUT OF RANGE"
3. Press CLR                          → Scratchpad: "999*"  (restored!)
4. Clear and type "22.5"             → Scratchpad: "22.5*"
5. Press LSK again                    → Value written, "GESPEICHERT"
```

### Пример логического переключателя

```
Line 5 shows: "LICHT KUECHE    AN"  (source: hm-rpc.0.ABC.STATE, boolean, writable)

1. Press LSK5L → value toggles to false
2. Display updates: "LICHT KUECHE   AUS"
3. Press LSK5L again → value toggles to true
```

Для логических значений не используется буфер обмена — это прямое переключение.

## Навигация

### Хлебные крошки (строка состояния)

В первой строке показан путь навигации:`HOME > KLIMA > WOHNZIMMER 14:30`

Набор`parent` на страницах для построения иерархии навигации.

### Ключ CLR

- **Блокнот содержит содержимое** → очищает блокнот (или восстанавливает его после ошибки)
- **Блокнот пуст** → переходит на родительскую страницу
- **Двойной CLR** (в течение 1 секунды) → аварийный выход на главную страницу

### Клавиши SLEW (стрелки влево/вправо)

Круговая навигация по соседним страницам (страницам с одним и тем же родительским элементом).

### Функциональные клавиши

11 настраиваемых функциональных клавиш (MENU, INIT, DIR, FPLN, PERF, PROG, SEC, ATC, AIRPORT, DATA, RAD NAV). Каждой из них можно назначить следующую функцию:

- `navigateHome` — перейти на главную страницу
- `navigateTo` — перейти на конкретную страницу
- Отключено — никаких действий не требуется

PREV PAGE / NEXT PAGE обеспечивают пагинацию (встроенная функция, не настраивается).

## Цвета

Доступные цвета дисплея:`white` ,`green` ,`cyan` ,`blue` ,`amber` ,`red` ,`magenta` ,`yellow` ,`grey`

Примечание:`blue` и`cyan` На оборудовании под управлением WinWing отображение идентичное.

### Цветовые поля

Каждая конфигурация дисплея имеет два независимых цветовых поля:

| Поле       | Элементы управления                      | По умолчанию              |
| ---------- | ---------------------------------------- | ------------------------- |
| `colLabel` | Подзаголовочный текст в четных строках   | Устройство `defaultColor` |
| `colData`  | Текст данных/значений в нечетных строках | Устройство`defaultColor`  |

старый сингл`color` Поле больше не поддерживается. Конфигурации с использованием`color` необходимо обновить для использования`colLabel` /`colData` .

### Цвет на уровне страницы

| Поле            | Элементы управления                             | По умолчанию             |
| --------------- | ----------------------------------------------- | ------------------------ |
| `pageNameColor` | Название страницы в строке состояния (строка 1) | Устройство`defaultColor` |

### Цвет устройства по умолчанию

Он`defaultColor` Настраивается для каждого устройства на вкладке «Устройство» в административном интерфейсе. Используется в качестве резервного варианта для всех цветовых полей, которые не заданы явно. Также отображается как доступное для записи состояние устройства по адресу`devices.{deviceId}.config.defaultColor` .

## Пример страницы (текущий формат)

```json
{
  "id": "klima-wohnzimmer",
  "name": "Wohnzimmer",
  "parent": "klima-main",
  "layoutType": "data",
  "pageNameColor": "cyan",
  "lines": [
    {
      "row": 3,
      "left": {
        "label": "IST-TEMPERATUR",
        "display": { "type": "datapoint", "source": "hm-rpc.0.T1.TEMPERATURE", "colLabel": "cyan", "colData": "green" },
        "button": { "type": "empty" }
      },
      "right": {
        "label": "SOLLWERT",
        "display": { "type": "datapoint", "source": "hm-rpc.0.T1.SET_TEMPERATURE", "colLabel": "cyan", "colData": "amber" },
        "button": { "type": "empty" }
      }
    },
    {
      "row": 5,
      "left": {
        "label": "LUFTFEUCHTE",
        "display": { "type": "datapoint", "source": "hm-rpc.0.H1.HUMIDITY", "colLabel": "cyan", "colData": "white" },
        "button": { "type": "empty" }
      },
      "right": {
        "label": "",
        "display": { "type": "empty" },
        "button": { "type": "empty" }
      }
    },
    {
      "row": 7,
      "left": {
        "label": "",
        "display": { "type": "label", "text": "LICHT KUECHE" },
        "button": { "type": "empty" }
      },
      "right": {
        "label": "",
        "display": { "type": "datapoint", "source": "hm-rpc.0.L1.STATE" },
        "button": { "type": "empty" }
      }
    }
  ]
}
```

В этом примере:

- Третий ряд слева: отображает текущую температуру (датчик только для чтения → LSK ничего не делает)
- В третьей правой строке отображается заданное значение (записываемое число → введите значение в буфер обмена, нажмите LSK для записи).
- В 7-м ряду справа отображается состояние подсветки (логическое значение, допускающее запись → нажмите LSK для переключения).

Формат и единица измерения автоматически определяются из метаданных объекта ioBroker. Вам нужно только это указать.`source` .

## Тестовые данные

Для создания тестовых состояний используйте кнопку «Создать тестовые данные» в административном интерфейсе (вкладка «Дополнительно»).`0_userdata.0.mcdu_test` В результате получается:

| Состояние             | Тип        | Записываемый | Мин/Макс |
| --------------------- | ---------- | ------------ | -------- |
| `temperature_living`  | число      | нет          | —        |
| `light_kitchen`       | логический | да           | —        |
| `light_living_dimmer` | число      | да           | 0-100    |
| `setpoint_living`     | число      | да           | 5-30     |
| `setpoint_bedroom`    | число      | да           | 5-30     |
| `text_status`         | нить       | да           | —        |
| `window_bedroom`      | логический | нет          | —        |

Используйте их для проверки взаимодействия LSK:

- ЛСК на`light_kitchen` → переключает логический параметр
- Введите "22" + LSK`setpoint_living` → пишет 22.0
- Введите "999" + LSK`setpoint_living` → "ВХОД ЗА ПРЕДЕЛЫ ДИАПАЗОНА"
- ЛСК на`temperature_living` → ничего (только для чтения)

## Регулировка яркости BRT/DIM

Кнопки BRT и DIM на MCDU регулируют яркость дисплея:

- **BRT** увеличивает значения BACKLIGHT и SCREEN\_BACKLIGHT на заданное значение.
- Функция **DIM** уменьшает значения BACKLIGHT и SCREEN\_BACKLIGHT на заданное значение.
- Значения ограничены диапазоном 0-255.
- Шаг настройки можно задать для каждого устройства отдельно.`display.brightnessStep` (по умолчанию: 20)
- Этот шаг можно изменить в административном интерфейсе (вкладка «Устройство») или через состояние записи.`devices.{deviceId}.display.brightnessStep`

## Советы

1. **Начните с простого** — сначала добавьте страницы с подписями, а затем — точки данных.
2. **Использовать родительскую навигацию** — установить`parent` для автоматической навигации и CLR-back
3. **Только нечетные строки** — используйте строки 3, 5, 7, 9, 11 для основного содержимого (четные строки являются подзаголовками).
4. **Только ASCII** — аппаратный дисплей не может отображать умлауты или специальные символы. Используйте "KUECHE", а не "Kuche", "ZURUECK", а не "Zuruck". Адаптер автоматически выполняет проверку, но использовать ASCII в конфигурации чище.
5. **Нет`editable` Необходим флаг** — адаптер автоматически считывает информацию о возможности записи из метаданных объекта ioBroker.
6. **Автоматическое определение формата/единицы измерения** — если вы не укажете`format` или`unit` Они считываются из объекта ioBroker.