---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/PROTOCOL.md
title: Спецификация протокола MQTT MCDU
hash: 331w3+W+MQ8Zz0k7BGWFagSiq+udXfDK1uv/MhPzFa8=
---
# Спецификация протокола MQTT MCDU

**Версия:** 1.0 **Статус:** Стабильная — это контракт между любым «мозгом» (адаптер ioBroker, интеграция с Home Assistant и т. д.) и`mcdu-client` работает на Raspberry Pi.

Клиент представляет собой простой терминал: он отображает полученные данные и сообщает о нажатиях кнопок. Вся бизнес-логика (страницы, навигация, ввод, валидация) находится на стороне «мозга». Любая интеграция, реализующая эту спецификацию, может управлять MCDU без изменений в клиентской части.

```
Brain (adapter/integration)  <-- MQTT broker -->  mcdu-client (Pi)  <-- USB HID -->  WinWing MCDU
```

**ВАЖНО — правило единого источника данных:** только ОДИН источник данных может активно публиковать данные на данное устройство одновременно. Темы отображения сохраняются; два источника данных вызывают мерцание и неопределенное состояние дисплея. При переходе между интеграциями сначала остановите старую.

---

## 1. Структура темы

Все темы:`{prefix}/{deviceId}/{suffix}`

- `prefix` : по умолчанию`mcdu` (конфигурация клиента)`mqtt.topicPrefix` конфигурация адаптера`topicPrefix` )
- `deviceId` : MQTT клиента`clientId` (конфигурация клиента)`mqtt.clientId` например`mcdu-client-pi` )

### Мозг → Клиент (клиент подписывается, QoS 1)

| Суффикс темы    | Цель                                          |
| --------------- | --------------------------------------------- |
| `display/set`   | Полное обновление дисплея (все 14 строк)      |
| `display/line`  | Обновление в одну строку                      |
| `display/clear` | Очистить дисплей                              |
| `leds/set`      | Запустите несколько светодиодов одновременно. |
| `leds/single`   | Установить один светодиод                     |
| `status/ping`   | Запрос на проверку состояния здоровья         |

### Клиент → Мозг

| Суффикс темы      | QoS | Удерживать | Цель                                          |
| ----------------- | --- | ---------- | --------------------------------------------- |
| `status/online`   | 1   | да         | Статус онлайн/офлайн (также тема LWT)         |
| `status/announce` | 1   | нет        | Объявление об устройстве в Connect            |
| `buttons/event`   | 1   | нет        | События нажатия/отпускания кнопок             |
| `status/pong`     | 0   | нет        | Ответ на запрос о проверке состояния здоровья |
| `status/error`    | 1   | нет        | Отчет об ошибке на стороне клиента            |

### Только мозг

| Тема                      | Цель                                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `{prefix}/adapter/status` | Мозг в режиме онлайн/офлайн (сохраняется, LWT). Только для ознакомления; клиент не потребляет информацию. |

---

## 2. Полезная нагрузка

Все данные представлены в формате JSON (UTF-8).`timestamp` Поля представляют собой миллисекунды Unix.

### 2.1`display/set` — Полное отображение (сохранено)

```json
{
  "lines": [
    { "text": "        MCDU MENU       ", "color": "white" },
    { "text": "<IOBROKER               ", "color": "cyan",
      "segments": [
        { "text": "<IOBROKER   ", "color": "cyan" },
        { "text": "  SETTINGS> ", "color": "amber" }
      ]
    }
  ],
  "timestamp": 1755500000000
}
```

Правила:

- `lines` Должен содержать ровно 14 записей (индекс массива 0 = верхняя строка ... 13 = черновик).
- `text` Должно быть ровно 24 символа (дополнить пробелами / усечь). Только ASCII-символы — не-ASCII символы приводят к пропуску кадров на экране.
- `color` : один из`white` ,`amber` ,`cyan` ,`green` ,`magenta` ,`red` ,`yellow` ,`grey` ,`blue` Неизвестные цвета возвращаются к`white` . (`blue` соответствует тому же аппаратному коду, что и`cyan` .)
- `segments` (необязательно): многоцветное отображение одной строки. Текстовые сегменты объединяются слева направо; их общая длина должна составлять 24. Когда`segments` Если присутствует, то имеет приоритет над уровнем строки.`color` ;`text` В качестве резервного/кэшируемого значения должна по-прежнему содержаться вся строка из 24 символов.
- Публикуется с сохранением данных, поэтому при повторном подключении клиент немедленно отображает текущую страницу (клиент захватывает сохраненный кадр во время инициализации оборудования).

### 2.2`display/line` — одна строка (сохранена)

```json
{ "lineNumber": 3, "text": "LIVING ROOM 21.5 C      ", "color": "green", "timestamp": 1755500000000 }
```

- `lineNumber` имеет **индексацию с 1** (1..14) — в отличие от массива с индексацией с 0 в`display/set` .
- `segments` поддерживается так же, как и в`display/set` (затем`text` /`color` может быть опущено).

### 2.3`display/clear` (сохранено)

```json
{ "timestamp": 1755500000000 }
```

Обнуляет все 14 строк, оставляя их пустыми (белыми).

### 2.4`leds/set`

```json
{ "leds": { "FAIL": true, "MCDU": false, "BACKLIGHT": 180 } }
```

- Значения: логическое (вкл/выкл) или число от 0 до 255 (яркость, с ограничением).
- Названия неизвестных светодиодов игнорируются с предупреждением.

### 2.5`leds/single`

```json
{ "name": "RDY", "state": true }
{ "name": "SCREEN_BACKLIGHT", "brightness": 128 }
```

- Или`state` (логическое значение) или`brightness` (0–255).`brightness` побеждает, если присутствуют оба.

Названия светодиодов (11):`FAIL` ,`FM` ,`MCDU` ,`MENU` ,`FM1` ,`IND` ,`RDY` ,`STATUS` ,`FM2` ,`BACKLIGHT` ,`SCREEN_BACKLIGHT` Обе подсветки по умолчанию включены при запуске клиента.

### 2.6`status/ping` →`status/pong`

Запрос:`{ "requestId": "abc123" }`

Ответ:

```json
{
  "requestId": "abc123",
  "uptime": 3600,
  "buttonsSent": 42,
  "displaysRendered": 100,
  "mqttMessagesReceived": 150,
  "errors": 0,
  "timestamp": 1755500000000
}
```

### 2.7`status/online` (сохранено, LWT)

В режиме подключения:

```json
{
  "status": "online",
  "hostname": "mcdu2",
  "clientId": "mcdu-client-pi",
  "version": "1.0.0",
  "mockMode": false,
  "timestamp": 1755500000000
}
```

LWT / корректное завершение работы:`{ "status": "offline", "timestamp": ... }`

Поскольку эта информация сохраняется, мозг может **обнаруживать устройства** , подписавшись на рассылку.`{prefix}/+/status/online` .

### 2.8`status/announce`

Публикуется один раз при каждом подключении клиента (не сохраняется):

```json
{
  "deviceId": "mcdu-client-pi",
  "hostname": "mcdu2",
  "ipAddress": "10.10.2.228",
  "version": "1.0.0",
  "timestamp": 1755500000000
}
```

### 2.9`buttons/event`

```json
{ "button": "LSK1L", "action": "press", "timestamp": 1755500000000 }
```

- `action` :`press` или`release` .
- Названия кнопок (см.`mcdu-client/lib/button-map.json` (для получения авторитетного списка):
  - ЛСК:`LSK1L` ...`LSK6L` ,`LSK1R` ...`LSK6R`
  - Функциональные клавиши:`DIR` ,`PROG` ,`PERF` ,`INIT` ,`DATA` ,`FPLN` ,`RAD` ,`FUEL` ,`SEC` ,`ATC` ,`MENU` ,`AIRPORT`
  - Убить:`SLEW_LEFT` ,`SLEW_UP` ,`SLEW_RIGHT` ,`SLEW_DOWN`
  - Буквенно-цифровой:`A` ...`Z` ,`0` ...`9` ,`DOT` ,`PLUSMINUS` ,`SLASH` ,`SPACE`
  - Особенный:`OVFY` ,`CLR` ,`BRT` ,`DIM` ,`EMPTY_LEFT` ,`EMPTY_RIGHT`

### 2.10`status/error`

```json
{ "error": "Display update error", "code": "USB_WRITE", "stack": "...", "timestamp": 1755500000000 }
```

---

## 3. Поведенческие требования к мозгу

1. **Обновления отображения скорости передачи данных.** Клиенту требуется около 560 мс для отправки полного кадра по USB (14 строк × 40 мс). Эталонный адаптер ограничивает скорость до максимум 10 публикаций в секунду и удаляет дубликаты неизмененных кадров. «Мозги» ДОЛЖНЫ делать то же самое.
2. **Сохраненные темы отображения — это состояние отображения.** Опубликовать`display/set` Благодаря функции сохранения данных, повторное подключение клиентов позволяет восстановить работу экрана без взаимодействия с системой управления.
3. **Только ASCII-символы.** Перед публикацией весь текст должен быть приведен к печатному ASCII-символу.
4. **Светодиоды после дисплея.** Если вы меняете дисплей и светодиоды «одновременно», сначала опубликуйте обновление дисплея (ограничение оборудования учитывается клиентом, но порядок обновления по сети позволяет избежать видимых сбоев).
5. **Обнаружение устройств.** Подпишитесь на`{prefix}/+/status/online` (сохраненный) и/или`{prefix}/+/status/announce` .

---

## 4. Устаревшее / зарезервированное (не внедрять)

- `mcdu-client/lib/mqtt-handler.js` Это **устаревший код** с более старой схемой тем (`display/line{N}` ,`display/color{N}` ,`led/{NAME}` ,`config/#` ,`button/{label}` ,`heartbeat` Он не подключен к проводке.`mcdu-client.js` Не следует противодействовать этому.
- `buttons/keypad` : адаптер-источник подписывается на него по историческим причинам; текущий клиент никогда его не публикует. Зарезервировано.

---

## 5. Версионирование

- Этот документ соответствует протоколу **версии 1.0** (соответствует).`version: "1.0.0"` (в данных о состоянии клиента).
- Внесенные изменения, несовместимые с предыдущими версиями, приводят к повышению основной версии и ДОЛЖНЫ быть согласованы между адаптером ioBroker, интеграцией с Home Assistant и клиентским приложением.