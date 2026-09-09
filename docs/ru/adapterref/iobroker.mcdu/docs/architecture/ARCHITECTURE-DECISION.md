---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md
title: Архитектурное решение: RasPi MCDU Unit ↔ ioBroker
hash: NQv2hsuuphsOVGbVZbAX75WFofu0OMVuNWFe1f12/W0=
---
# Архитектурное решение: RasPi MCDU Unit ↔ ioBroker

**Дата:** 14.02.2026\
&#x20;**Статус:** 🤔 Необходимо принять решение до начала 3-го этапа.

## Вопрос

Феликс хочет использовать **Raspberry Pi в качестве выделенного блока MCDU** (умное решение!). Но:

- Где проходит граница между Raspberry Pi и ioBroker?
- Где находится бизнес-логика?
- Как они общаются?
- Что является надёжным, компактным и быстрым?

---

## Как это делают другие системы

### 1. Панели управления Lovelace/Tablet (на основе браузера)

```
┌─────────────┐         HTTP/WebSocket        ┌─────────────┐
│   Tablet    │ ◄─────────────────────────── │  ioBroker   │
│             │                                │             │
│ - Browser   │  Request: "What to show?"     │ - Web Server│
│ - Rendering │  Response: Full HTML/JSON     │ - Logic     │
│ - Touch     │  Send: "Button X pressed"     │ - States    │
│   Events    │                                │ - Templates │
└─────────────┘                                └─────────────┘
```

**Характеристики:**

- Планшет = 100% примитивный (просто рендерит).
- Вся логика реализована в ioBroker.
- Настройка в ioBroker
- Обновления: Только на стороне сервера.

**Плюсы:**

- Простой клиент (просто браузер)
- Централизованная конфигурация
- Простота использования нескольких устройств

**Минусы:**

- Задержка сети для каждого взаимодействия
- Требуется веб-стек

---

### 2. Устройства Zigbee/Z-Wave

```
┌─────────────┐         Zigbee Protocol       ┌─────────────┐
│   Device    │ ◄─────────────────────────── │  Coordinator│
│             │                                │  (USB Stick)│
│ - Firmware  │  Send: "Button pressed"       │             │
│ - Minimal   │  Receive: "LED on/off"        │      ↕      │
│   Logic     │                                │             │
│             │                                │  ioBroker   │
│ - Battery   │                                │  Adapter    │
└─────────────┘                                └─────────────┘
```

**Характеристики:**

- Устройство имеет минимальную версию прошивки (кнопка → сигнал).
- Вся бизнес-логика находится в адаптере ioBroker.
- Координатор Zigbee переводит протокол

**Плюсы:**

- Устройства отличаются исключительной надежностью (минимальная логика).
- энергоэффективный
- Настройка в ioBroker

**Минусы:**

- Требуется специальное оборудование (координатор Zigbee).
- Ограничено возможностями Zigbee.

---

### 3. Sonoff/Tasmota (интеллектуальные устройства на основе MQTT)

```
┌─────────────┐            MQTT               ┌─────────────┐
│  Tasmota    │ ◄─────────────────────────── │MQTT Broker  │
│  Device     │                                │ (Mosquitto) │
│             │  Publish: stat/device/POWER   │             │
│ - Firmware  │  Subscribe: cmnd/device/POWER │      ↕      │
│ - Templates │                                │             │
│ - Rules     │                                │  ioBroker   │
│ - Local     │                                │  (Standard  │
│   Logic     │                                │   MQTT      │
│             │                                │   Adapter)  │
└─────────────┘                                └─────────────┘
```

**Характеристики:**

- Устройство обладает собственной логикой (правилами, шаблонами).
- ioBroker просто подписывается на темы MQTT.
- Настройка на устройстве (веб-интерфейс) ИЛИ через MQTT

**Плюсы:**

- Быстрое реагирование на местах
- Работает в автономном режиме (через ioBroker).
- Стандартный адаптер MQTT

**Минусы:**

- Настройки на каждом устройстве
- Для каждого устройства требуются обновления.
- Два места для логики

---

### 4. Медиасервер Squeezebox/Logitech

```
┌─────────────┐        Squeezebox Protocol    ┌─────────────┐
│  Player     │ ◄─────────────────────────── │    LMS      │
│  (RasPi)    │                                │   Server    │
│             │  Request: "Next track info"   │             │
│ - Renderer  │  Response: Full track data    │ - Library   │
│ - Display   │  Send: "Button: Next"         │ - Playlists │
│   Driver    │                                │ - Logic     │
│ - Audio     │                                │ - Plugins   │
│   Output    │                                │             │
│             │  Cached: Current playlist     │             │
└─────────────┘                                └─────────────┘
```

**Характеристики:**

- Игрок = клиент рендеринга с локальным кэшем
- Сервер полностью контролирует логику воспроизведения музыки.
- Быстрое взаимодействие благодаря кэшированию

**Плюсы:**

- Несколько игроков (спальня, гостиная)
- Централизованная библиотека и конфигурация
- Отзывчивый интерфейс (локальный кэш)

**Минусы:**

- Сложный протокол
- Игроку необходимы некоторые навыки (кэширование).

---

## Рекомендуемая архитектура для MCDU

### Вариант C: **Гибридный подход** (лучшее из обоих миров)

```
┌───────────────────────────────────┐
│     RasPi MCDU Unit               │
│                                   │
│  ┌─────────────────────────────┐ │         MQTT
│  │   mcdu-client.js            │ │    ┌──────────────┐
│  │                             │ │◄───┤ MQTT Broker  │
│  │ - mcdu.js driver            │ │    └──────────────┘
│  │ - MQTT client               │ │           ▲
│  │ - Template cache (local)    │ │           │
│  │ - Display renderer          │ │           │
│  │                             │ │           │
│  │ Subscribe:                  │ │           │
│  │   mcdu/DEVICE_ID/display/#  │ │           │
│  │   mcdu/DEVICE_ID/led/#      │ │           │
│  │   mcdu/DEVICE_ID/template/# │ │           │
│  │                             │ │           │
│  │ Publish:                    │ │           │
│  │   mcdu/DEVICE_ID/button/LSK1L│ │          │
│  │   mcdu/DEVICE_ID/status     │ │           │
│  └─────────────────────────────┘ │           │
│                ↕                  │           │
│  ┌─────────────────────────────┐ │           │
│  │   USB                       │ │           │
│  │   MCDU Hardware             │ │           │
│  └─────────────────────────────┘ │           │
└───────────────────────────────────┘           │
                                                │
                                                │
┌───────────────────────────────────────────────┼───────┐
│     ioBroker Instance                         │       │
│                                               ▼       │
│  ┌─────────────────────────────────────────────────┐ │
│  │   ioBroker.mcdu Adapter                         │ │
│  │                                                  │ │
│  │ - Template Management                           │ │
│  │ - State Mapping (States ↔ Display)             │ │
│  │ - Button Handler (Button Events → Actions)     │ │
│  │ - Multi-MCDU Support                           │ │
│  │                                                  │ │
│  │ Subscribe:                                      │ │
│  │   mcdu/+/button/#    (all devices, all buttons)│ │
│  │   mcdu/+/status                                 │ │
│  │                                                  │ │
│  │ Publish:                                        │ │
│  │   mcdu/DEVICE_ID/display/line1 = "TEXT"        │ │
│  │   mcdu/DEVICE_ID/led/FAIL = 255                │ │
│  │   mcdu/DEVICE_ID/template/current = {...}      │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │   ioBroker States                               │ │
│  │                                                  │ │
│  │   0_userdata.0.solar.power = 5.2 kW            │ │
│  │   0_userdata.0.weather.temp = 22°C             │ │
│  │   hm-rpc.0.washing_machine.STATE = true        │ │
│  └─────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

---

## Протокол связи (темы MQTT)

### RasPi → ioBroker (События кнопок)

```
Topic: mcdu/DEVICE_ID/button/LSK1L
Payload: { "pressed": true, "timestamp": 1707912345 }

Topic: mcdu/DEVICE_ID/button/DIR
Payload: { "pressed": true }
```

### ioBroker → RasPi (Обновления дисплея)

```
Topic: mcdu/DEVICE_ID/display/line1
Payload: "SOLAR POWER"

Topic: mcdu/DEVICE_ID/display/line2
Payload: "5.2 kW"

Topic: mcdu/DEVICE_ID/led/FAIL
Payload: 0

Topic: mcdu/DEVICE_ID/led/RDY
Payload: 255
```

### ioBroker → RasPi (синхронизация шаблонов)

```
Topic: mcdu/DEVICE_ID/template/current
Payload: {
  "name": "solar_overview",
  "lines": [
    { "text": "SOLAR POWER", "color": "W" },
    { "text": "${state:0_userdata.0.solar.power} kW", "color": "G" }
  ],
  "buttons": {
    "LSK1L": { "action": "toggle", "target": "hm-rpc.0.lights.kitchen" }
  }
}
```

---

## Где что живёт?

### Модуль RasPi MCDU (mcdu-client.js)

**Обязанности:**

- ✅ Драйвер оборудования (mcdu.js)
- ✅ MQTT-клиент
- ✅ Кэш шаблонов (для работы в автономном режиме)
- ✅ Отображение на экране (состояние MQTT → отображение MCDU)
- ✅ Чтение с помощью кнопки (кнопка MCDU → публикация MQTT)
- ✅ Управление светодиодами (команда MQTT → MCDU LED)

**Не обрабатывает:**

- ❌ Бизнес-логика (какая кнопка за что отвечает)
- ❌ Подписки по штатам (какие штаты отображать)
- ❌ Создание/редактирование шаблонов

**Размер:** \~500 строк кода\
&#x20;**Зависимости:** node-hid, mqtt\
&#x20;**Конфигурация:** только IP-адрес MQTT-брокера + идентификатор устройства.

---

### Адаптер ioBroker (ioBroker.mcdu)

**Обязанности:**

- ✅ Управление шаблонами (создание/редактирование/сохранение)
- ✅ Сопоставление состояний (состояния ioBroker → отображение в MCDU)
- ✅ Обработка нажатий кнопок (события кнопок → действия ioBroker)
- ✅ Поддержка нескольких MCDU
- ✅ Административный интерфейс (конфигурация в формате JSON)

**Не обрабатывает:**

- ❌ Связь по USB/HID (это реализовано на Raspberry Pi)
- ❌ Отображение изображения (это делает Raspberry Pi)

**Размер:** \~1500 строк кода\
&#x20;**Зависимости:** Стандартные зависимости адаптера ioBroker.

---

## Пример сценария: "Показать солнечную энергию"

### 1. Настройка (в административном интерфейсе ioBroker)

```javascript
// User configures template in ioBroker
{
  "template": "solar_overview",
  "line1": { "text": "SOLAR POWER", "color": "W" },
  "line2": { "text": "${state:0_userdata.0.solar.power} kW", "color": "G" },
  "line3": { "text": "Battery: ${state:0_userdata.0.battery.soc}%", "color": "A" }
}
```

### 2. Синхронизация шаблонов (ioBroker → RasPi)

```
ioBroker publishes to: mcdu/raspi-kitchen/template/solar_overview
RasPi receives and caches template
```

### 3. Изменения состояния (ioBroker → RasPi)

```
Solar power changes: 5.2 kW → 5.5 kW

ioBroker adapter:
1. Detects state change
2. Renders template with new value
3. Publishes: mcdu/raspi-kitchen/display/line2 = "5.5 kW"

RasPi:
1. Receives MQTT message
2. Calls: mcdu.setLine(1, "5.5 kW", "G")
3. Calls: mcdu.updateDisplay()
```

### 4. Нажатие кнопки (RasPi → ioBroker)

```
User presses LSK1L

RasPi:
1. mcdu.js detects button press (bit 0)
2. Looks up button-map.json: bit 0 = "LSK1L"
3. Publishes: mcdu/raspi-kitchen/button/LSK1L = { "pressed": true }

ioBroker adapter:
1. Receives MQTT message
2. Checks template: LSK1L → toggle light
3. Executes: setState("hm-rpc.0.lights.kitchen", !currentState)
4. Updates display if needed
```

---

## Почему именно эта архитектура?

### ✅ Прочный

- Программное обеспечение для Raspberry Pi простое (драйвер + MQTT).
- На Raspberry Pi отсутствует сложная бизнес-логика.
- Сохраняет работоспособность после перезапуска ioBroker (используются кэшированные шаблоны).

### ✅ Быстро

- Обновление дисплея: <50 мс (локальный рендеринг)
- Время отклика кнопки: <100 мс (публикация через MQTT происходит мгновенно)
- Кэширование шаблонов позволяет избежать постоянного сетевого трафика.

### ✅ Компактный

- Код для RasPi: \~500 строк
- Один бинарный файл/сервис
- База данных не требуется.

### ✅ Масштабируемый

- Несколько MCDU: просто ещё больше Raspberry Pi.
- Каждый Raspberry Pi — это независимый клиент.
- Централизованная конфигурация в ioBroker

### ✅ Возможность отладки

- Журналы RasPi: "Получено обновление дисплея для строки 2"
- В логах ioBroker: "Кнопка LSK1L нажата, индикатор загорается."
- MQTT-брокер отображает весь трафик.
- Можно протестировать с помощью`mosquitto_pub` /`mosquitto_sub`

---

## Этапы разработки (пересмотренные)

### Этап 3а: Клиент для Raspberry Pi (1-2 дня)

Строить`mcdu-client.js` :

1. Загрузите драйвер mcdu.js
2. Подключитесь к MQTT-брокеру
3. Подпишитесь на темы, связанные с дисплеями/светодиодами.
4. События кнопки «Опубликовать»
5. Простой кэш шаблонов

**Тестирование без ioBroker:**

```bash
# Publish display update
mosquitto_pub -t "mcdu/test/display/line1" -m "HELLO"

# Subscribe to buttons
mosquitto_sub -t "mcdu/test/button/#"
```

### Этап 3b: Адаптер ioBroker (2-3 дня)

Соберите файл ioBroker.mcdu:

1. MQTT-клиент
2. Управление шаблонами
3. Государственные подписки
4. Обработчики кнопок
5. Пользовательский интерфейс конфигурации JSON

**Тестирование с запущенным Raspberry Pi:**

- Настройка шаблона в ioBroker
- Смотрите его появление на MCDU
- Нажмите кнопку, и вы увидите, что произойдет.

---

## Необходимо принять решение

**Феликс, эта архитектура имеет смысл?**

**Преимущества:**

- Чёткое разделение: RasPi = аппаратное обеспечение, ioBroker = логика.
- MQTT = отраслевой стандарт (надежный, с возможностью отладки)
- Умеет самостоятельно разрабатывать и тестировать клиентское приложение для Raspberry Pi.
- Можно протестировать с помощью`mosquitto_pub` до появления адаптера ioBroker

**Вопросы:**

1. У вас уже запущен MQTT-брокер? (Mosquitto?)
2. Вы хотите, чтобы у каждого Raspberry Pi был свой уникальный идентификатор?
3. Должен ли клиент Raspberry Pi автоматически обнаруживать ioBroker или использовать статическую конфигурацию?

---

**Следующий шаг:** После того, как вы одобрите эту архитектуру, мы сначала создадим Фазу 3a (клиент для Raspberry Pi)!