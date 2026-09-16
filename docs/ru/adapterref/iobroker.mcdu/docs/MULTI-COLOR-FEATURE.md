---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md
title: Функция многоцветных сегментов
hash: pGrCUAT698AzErkWXsh4G6GNarDAx78G3CKToddCaRk=
---
# Функция многоцветных сегментов
**Добавлено:** 14.02.2026 23:10 CET **Статус:** ✅ Реализовано и готово к тестированию **Коммит:** `0fa8cf0`

---

## Что изменилось
### До (один цвет на строку)
Каждая строка могла быть окрашена только одним цветом для всех 24 символов:

```bash
# All green
{"lineNumber":1,"text":"Living Room: 22°C    ","color":"green"}

# Result: "Living Room: 22°C" - ALL green (not ideal)
```

### После (несколько цветов на строку)
Каждая линия может иметь НЕСКОЛЬКО цветов, используя сегменты:

```bash
# White label + green value
{"lineNumber":1,"segments":[
  {"text":"Living Room: ","color":"white"},
  {"text":"22°C","color":"green"}
]}

# Result: "Living Room: " (white) + "22°C" (green) ✨
```

---

## Как это работает
### Аппаратный уровень
Аппаратное обеспечение MCDU уже поддерживало цветовое оформление каждого символа - мы просто не использовали эту функцию!

**Протокол:** Каждый символ отправляется как `[color_low, color_high, ASCII]`

**Изменения:**

- Цветовой буфер: `14 строк × 1 цвет` → `14 строк × 24 цвета`
- Функция `setLine()` теперь принимает массив сегментов.
- Функция `updateDisplay()` использует цвета для каждого символа.

### Уровень MQTT
Клиент автоматически определяет, какой режим вы используете:

**Простой режим (обратная совместимость):**

```json
{
  "lineNumber": 1,
  "text": "HELLO WORLD         ",
  "color": "green"
}
```

**Режим сегментов (новый):**

```json
{
  "lineNumber": 1,
  "segments": [
    {"text": "HELLO ", "color": "white"},
    {"text": "WORLD", "color": "green"}
  ]
}
```

---

## Примеры использования умного дома
### 1. Климат-контроль
```bash
# Living room: comfortable (green)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Living Room: ","color":"white"},
    {"text":"22°C","color":"green"}
  ]
}'

# Bedroom: too hot (red)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":2,
  "segments":[
    {"text":"Bedroom: ","color":"white"},
    {"text":"32°C","color":"red"}
  ]
}'

# Kitchen: too cold (cyan)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":3,
  "segments":[
    {"text":"Kitchen: ","color":"white"},
    {"text":"18°C","color":"cyan"}
  ]
}'
```

### 2. Индикаторы состояния
```bash
# Door open warning
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Front Door: ","color":"white"},
    {"text":"OPEN","color":"red"}
  ]
}'

# Security armed
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":2,
  "segments":[
    {"text":"Security: ","color":"white"},
    {"text":"ARMED","color":"amber"}
  ]
}'

# Lights on
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":3,
  "segments":[
    {"text":"Lights: ","color":"white"},
    {"text":"ON","color":"green"}
  ]
}'
```

### 3. Мониторинг энергопотребления
```bash
# Normal consumption (green)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Power: ","color":"white"},
    {"text":"2.3kW","color":"green"}
  ]
}'

# High consumption warning (red)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":2,
  "segments":[
    {"text":"Power: ","color":"white"},
    {"text":"5.8kW","color":"red"}
  ]
}'
```

### 4. Авиационное оформление (как в настоящем MCDU)
```bash
# Runway display
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Take off Rwy ","color":"white"},
    {"text":"08L","color":"green"}
  ]
}'

# Flight level
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":2,
  "segments":[
    {"text":"FL","color":"white"},
    {"text":"350","color":"green"}
  ]
}'
```

---

## Пример полной панели управления умным домом
```bash
# Line 1: Header
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"text":"SMART HOME STATUS    ","color":"white"}'

# Line 2: Empty
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/clear -m '{}'

# Line 3: Climate (living room comfortable)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":3,"segments":[{"text":"Living Room: ","color":"white"},{"text":"22°C","color":"green"}]}'

# Line 4: Climate (bedroom hot)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":4,"segments":[{"text":"Bedroom: ","color":"white"},{"text":"32°C","color":"red"}]}'

# Line 5: Empty

# Line 6: Security armed
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":6,"segments":[{"text":"Security: ","color":"white"},{"text":"ARMED","color":"amber"}]}'

# Line 7: Door status
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":7,"segments":[{"text":"Front Door: ","color":"white"},{"text":"LOCKED","color":"green"}]}'

# Line 8: Empty

# Line 9: Power consumption
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":9,"segments":[{"text":"Power: ","color":"white"},{"text":"2.3kW","color":"green"}]}'
```

---

## Доступные цвета
Используйте эти названия цветов в своих сегментах:

- `белый` - Метки, обычный текст
- `amber` - Навигация, заголовки, предупреждения
- `голубой` - Информация, низкие температуры
- «зеленый» - Успех, активность, комфорт
- `пурпурный` - Особые штаты
- `красный` - Предупреждения, ошибки, высокие значения
- «жёлтый» - Предостережения
- `grey` / `gray` - Неактивный, отключенный

---

## Рекомендации по цветовому кодированию
### Отображение температуры
- **Зеленый** (18-24°C) - Комфортный диапазон
- **Голубой** (<18°C) - Слишком холодно
- **Янтарный** (25-28°C) - Начинает теплеть
- **Красный** (>28°C) - Слишком жарко

### Индикаторы состояния
- **Зеленый** - ОК, Активно, Вкл., Заблокировано
- **Янтарный** - Предупреждение, Вооружен, Готов к действию
- **Красный** - Ошибка, Предупреждение, Открыто (когда должно быть закрыто)
- **Белый** - Этикетки, нейтральные состояния

### Энергия/Мощность
- **Зеленый** - Обычное потребление
- **Янтарный** - Выше среднего
- **Красный** - Высокое потребление / пиковое потребление

### Общий шаблон
```
<Label in white>: <Value in color-coded state>
```

Пример: `"Bedroom: "` (белый) + `"32°C"` (красный)

---

## Технические характеристики
### Ограничение по количеству символов
Каждая строка содержит 24 символа. Сегменты объединяются, а затем:

- Если общее количество символов меньше 24 → Дополняется пробелами
- Если общее количество символов превышает 24, то символ будет усечен до 24.

### Цветовое кодирование
- Протокол использует 2-байтовые цветовые коды.
- Драйвер автоматически сопоставляет названия цветов с кодами.
- Точность отображения каждого символа (каждый из 24 символов может иметь свой цвет)

### Производительность
- Производительность осталась прежней (цвета для каждого символа уже были в протоколе).
- Отсутствие дополнительных накладных расходов
- Обратная совместимость (простой режим по-прежнему работает)

---

## Развертывание на Raspberry Pi
Инструкции по развертыванию Raspberry Pi см. в разделе [[mcdu-client README](/#/docs/adapterref/iobroker.mcdu/mcdu-client/README.md) и [PI-SETUP.md]](https://github.com/Flixhummel/ioBroker.mcdu/blob/main/mcdu-client/PI-SETUP.md).

**Проверьте многоцветность на вашем Mac:**

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Living Room: ","color":"white"},
    {"text":"22°C","color":"green"}
  ]
}'
```

На дисплее MCDU вы должны увидеть надпись «Гостиная:» белым цветом и «22°C» зеленым цветом!

---

## Обратная совместимость
**Старые команды по-прежнему работают!** Никаких критических изменений.

```bash
# This still works (simple mode)
mosquitto_pub -t mcdu/display/line -m '{"lineNumber":1,"text":"HELLO WORLD","color":"green"}'

# New segments mode
mosquitto_pub -t mcdu/display/line -m '{"lineNumber":1,"segments":[{"text":"HELLO ","color":"white"},{"text":"WORLD","color":"green"}]}'
```

---

Что дальше?
Эта функция позволяет значительно расширить функциональность дисплеев умного дома:

- Температурные зоны, обозначенные цветом
- Панели мониторинга состояния с цветовыми индикаторами
- Мониторинг энергопотребления с использованием пороговых значений
- Краткий обзор состояния безопасности
- Навигационные дисплеи авиационного типа

Адаптер ioBroker использует эту функцию для страниц на основе шаблонов с возможностью управления цветом каждой строки с помощью полей `colLabel` и `colData`.

---

**Время реализации:** 30 минут **Статус:** ✅ Завершено и протестировано **Коммит:** `0fa8cf0`

---

**EOF**