---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md
title: Техническая архитектура контроллера умного дома MCDU
hash: X33cmLAI5LzxTgTwPyI7Sug19o1JRW+zCsRn27bxwjw=
---
# Техническая архитектура контроллера умного дома MCDU

**Версия:** 1.0\
&#x20;**Дата:** 14.02.2026\
&#x20;**Статус:** Предложение\
&#x20;**Целевая аудитория:** Разработчики, внедряющие контроллер умного дома MCDU.

---

## Оглавление

1. [Обзор архитектуры](#architecture-overview)
2. [Рекомендации по программному стеку](#software-stack-recommendation)
3. [Границы компонентов](#component-boundaries)
4. [Проектирование страниц](#page-system-design)
5. [Поток данных](#data-flow)
6. [Уровень конфигурации](#configuration-layer)
7. [Этапы реализации](#implementation-phases)
8. [Архитектура развертывания](#deployment-architecture)

---

## Обзор архитектуры

### Архитектура высокого уровня

```
┌─────────────────────────────────────────────────────────────┐
│                    ioBroker Smart Home                      │
│  ┌──────────────┬──────────────┬──────────────────────┐   │
│  │   Lights     │   Climate    │   Solar/Battery      │   │
│  │   Adapter    │   Adapter    │   Adapter            │   │
│  └──────────────┴──────────────┴──────────────────────┘   │
│                          │                                  │
│                    ┌─────┴─────┐                           │
│                    │ States DB  │                           │
│                    └─────┬─────┘                           │
│                          │                                  │
│         ┌────────────────┼────────────────┐               │
│         │                │                │               │
│    ┌────▼─────┐   ┌──────▼──────┐  ┌────▼────┐          │
│    │ REST API │   │  WebSocket  │  │ Adapter │          │
│    │(simple-api)  │ (socket.io) │  │   API   │          │
│    └────┬─────┘   └──────┬──────┘  └────┬────┘          │
└─────────┼────────────────┼──────────────┼────────────────┘
          │                │              │
          │         Network (HTTP/WS)     │
          │                │              │
┌─────────▼────────────────▼──────────────▼────────────────┐
│          MCDU Controller Application (Node.js)            │
│  ┌──────────────────────────────────────────────────┐   │
│  │          Integration Layer (ioBroker)            │   │
│  │  - WebSocket client (@iobroker/socket-client)    │   │
│  │  - State subscription & caching                   │   │
│  │  - Command execution                              │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   │                                       │
│  ┌────────────────▼──────────────────────────────────┐   │
│  │          Business Logic Layer                     │   │
│  │  - Page manager (navigation, state machine)       │   │
│  │  - Input handler (button press → action)          │   │
│  │  - Display renderer (state → MCDU display)        │   │
│  │  - Configuration loader (YAML/JSON)               │   │
│  └────────────────┬──────────────────────────────────┘   │
│                   │                                       │
│  ┌────────────────▼──────────────────────────────────┐   │
│  │          Hardware Driver Layer                    │   │
│  │  - USB HID interface (node-hid)                   │   │
│  │  - Button reader (HID input → events)             │   │
│  │  - Display writer (text → HID output)             │   │
│  │  - LED controller                                 │   │
│  └────────────────┬──────────────────────────────────┘   │
└───────────────────┼───────────────────────────────────────┘
                    │
                USB │
                    │
         ┌──────────▼──────────┐
         │  WinWing MCDU       │
         │  (HID Device)       │
         │  Vendor: 0x4098     │
         │  Product: 0xbb36    │
         └─────────────────────┘
```

### Принципы проектирования

1. **Многоуровневая архитектура:** Четкое разделение задач (оборудование ↔ бизнес-логика ↔ интеграция)
2. **Управление конфигурацией:** страницы и привязки определяются в формате YAML/JSON, а не задаются жестко в коде.
3. **Событийно-ориентированный подход:** нажатия кнопок и изменения состояния запускают события (а не циклы опроса).
4. **Возможность горячей перезагрузки:** изменения конфигурации не требуют полной перезагрузки.
5. **Отказоустойчивость:** отключения USB и тайм-ауты ioBroker обрабатываются корректно.
6. **Тестируемость:** Каждый слой может быть протестирован независимо.

---

## Рекомендации по программному стеку

### Этап 1: Прототип (быстрая проверка)

**Язык программирования:** Python 3.9+\
&#x20;**Цель:** Проверка аппаратного протокола, тестирование базовой интеграции с ioBroker.

**Зависимости:**

- `hidapi` - USB HID-связь
- `requests` - HTTP-клиент для REST API
- `pyyaml` - Анализ конфигурационного файла

**Цели прототипа:**

- Считывание нажатий кнопок с MCDU
- Вывести текст на экран MCDU
- Чтение/запись состояний ioBroker через REST API
- Проверка сквозного процесса

**Объем работ по прототипированию:**

- Единая жестко закодированная страница "ДАННЫЕ"
- Обновление состояния ioBroker на основе опроса (интервал 1-2 секунды)
- Отсутствие сложной навигации и настроек.

**Ориентировочные сроки:** 2-3 дня

---

### Этап 2+: Внедрение в производство

**Язык программирования:** Node.js 18+ (LTS) с TypeScript (необязательно, но рекомендуется).\
&#x20;**Обоснование:**

- ✅ Улучшенная поддержка WebSocket (`@iobroker/socket-client` (это библиотека Node.js)
- ✅ Модель Async/await идеально подходит для архитектуры, управляемой событиями.
- ✅ Развитая экосистема (логирование, управление конфигурацией, тестирование)
- ✅ Путь к адаптеру ioBroker (адаптеры основаны на Node.js)
- ✅ Проще найти участников проекта (Node.js более распространен в сообществе ioBroker, чем Python)

**Основные зависимости:**

| Упаковка                  | Цель                           | Версия   |
| ------------------------- | ------------------------------ | -------- |
| `node-hid`                | USB HID-интерфейс              | ^2.1.0   |
| `@iobroker/socket-client` | ioBroker WebSocket клиент      | ^2.0.0   |
| `yaml`                    | Анализ конфигурационного файла | ^2.3.0   |
| `winston`                 | Ведение журнала                | ^3.11.0  |
| `eventemitter3`           | Автобус для мероприятий        | ^5.0.0   |
| `joi`                     | Проверка конфигурации          | ^17.11.0 |

**Зависимости для разработки:**

| Упаковка      | Цель                                             |
| ------------- | ------------------------------------------------ |
| `typescript`  | Тип безопасности                                 |
| `@types/node` | Типы Node.js                                     |
| `jest`        | Тестовая среда                                   |
| `eslint`      | Качество кода                                    |
| `prettier`    | Форматирование кода                              |
| `nodemon`     | Автоматический перезапуск при внесении изменений |

**Преимущества TypeScript (рекомендуется):**

- Типобезопасность для структур протокола USB
- Улучшенная функция автозаполнения в IDE.
- Упрощенный рефакторинг
- Обнаружение ошибок на этапе компиляции

**Альтернативный вариант (JavaScript):**

- Более быстрое прототипирование
- Более низкий порог входа
- Готов к серийному производству, успешно прошёл тестирование.

---

## Границы компонентов

### Уровень 1: Драйвер оборудования (`/lib/hardware/` )

**Обязанности:** Преобразование интерфейса обмена данными USB HID в высокоуровневый API.

**Модули:**

#### `MCDUDevice.js` (или`.ts` )

```javascript
class MCDUDevice {
  constructor(vendorId, productId)
  
  // Lifecycle
  async connect()
  async disconnect()
  isConnected(): boolean
  
  // Input
  on('buttonPress', (button: string) => void)
  on('buttonRelease', (button: string) => void)
  getLightSensorValue(): number
  
  // Output
  setDisplayText(text: string, colors?: ColorMap)
  clearDisplay()
  setLED(led: LEDName, state: boolean)
  setDisplayBrightness(value: 0-255)
  setButtonBrightness(value: 0-255)
  
  // Low-level (internal use)
  _readHID(): Buffer
  _writeHID(data: Buffer)
  _initDisplay()
}
```

**Основные характеристики:**

- Генератор событий для нажатий кнопок (без опроса в верхних уровнях)
- Автоматическое переподключение при отключении USB
- Абстракция кодировки текста для отображения (ASCII → 3-байтовый формат MCDU)
- Вспомогательные средства для регулировки яркости светодиодов

**Зависимости:** `node-hid`

---

#### `DisplayRenderer.js`

```javascript
class DisplayRenderer {
  constructor(device: MCDUDevice)
  
  // High-level rendering
  renderPage(pageContent: PageLayout)
  renderLine(lineNumber: 0-13, text: string, color?: Color)
  renderCharAt(row: number, col: number, char: string, attrs: CharAttrs)
  
  // Text formatting
  setFont(size: 'normal' | 'small')
  setColor(color: 'white' | 'green' | 'cyan' | 'amber' | 'magenta')
  
  // Utilities
  clearLine(lineNumber: number)
  centerText(lineNumber: number, text: string)
  rightAlignText(lineNumber: number, text: string)
  
  // Low-level (internal)
  _encodeCharacter(char: string, attrs: CharAttrs): Buffer
  _buildDisplayPackets(content: string): Buffer[]
}
```

**Основные характеристики:**

- Преобразует высокоуровневые команды отображения в USB-пакеты.
- Обрабатывает перенос текста, выравнивание и форматирование.
- Кодировка символов (UTF-8 → 3-байтовый формат MCDU)
- Поддержка специальных символов (стрелок, символов).

---

### Уровень 2: Бизнес-логика (`/lib/core/` )

#### `PageManager.js`

```javascript
class PageManager {
  constructor(config: PageConfig, renderer: DisplayRenderer)
  
  // Page navigation
  navigateTo(pageName: string)
  getCurrentPage(): Page
  goBack()
  
  // Page lifecycle
  async loadPage(pageName: string): Page
  async renderCurrentPage()
  
  // Input handling
  handleButton(button: string)
  handleInput(text: string)
  
  // State management
  getPageContext(): object
  setPageContext(key: string, value: any)
}
```

**Основные характеристики:**

- Конечный автомат для навигации по страницам (ДАННЫЕ → КЛИМАТ → ЭНЕРГИЯ)
- Отображение страницы на основе состояния ioBroker.
- Учет контекста кнопок (L1-L6, R1-R6 сопоставляются с действиями на странице)
- Управление входным буфером (для полей ввода текста)

---

#### `InputHandler.js`

```javascript
class InputHandler {
  constructor(pageManager: PageManager, iobroker: IoBrokerClient)
  
  // Button mapping
  onButton(button: string, handler: Function)
  mapButton(button: string, action: ButtonAction)
  
  // Action execution
  async executeAction(action: ButtonAction)
  
  // Scratchpad (text input)
  scratchpadAppend(char: string)
  scratchpadClear()
  scratchpadGet(): string
}
```

**Поддерживаемые действия кнопок:**

- `navigatePage` - Переключиться на другую страницу
- `toggleState` - Переключить логическое состояние ioBroker
- `setState` - Установить состояние на определенное значение
- `incrementValue` - Отрегулируйте числовое значение (например, температура +/-)
- `scratchpadInput` - Добавить символ во входной буфер

---

### Уровень 3: Интеграция (`/lib/integration/` )

#### `IoBrokerClient.js`

```javascript
class IoBrokerClient {
  constructor(host: string, port: number, options?: object)
  
  // Connection
  async connect(username?: string, password?: string)
  disconnect()
  isConnected(): boolean
  
  // State operations
  async getState(stateId: string): StateValue
  async setState(stateId: string, value: any, ack: boolean = false)
  async getStates(pattern: string): StateMap
  
  // Subscriptions (event-driven)
  subscribe(pattern: string, callback: (id, state) => void)
  unsubscribe(pattern: string)
  
  // Object operations
  async getObject(objectId: string): Object
  async getObjects(pattern: string): ObjectMap
  
  // Caching
  getCachedState(stateId: string): StateValue | null
  invalidateCache(stateId: string)
}
```

**Основные характеристики:**

- Соединение WebSocket с ioBroker (через`@iobroker/socket-client` )
- Подписка на состояние в реальном времени (без опроса)
- Локальный кэш состояния (снижение нагрузки на ioBroker)
- Автоматическое переподключение при отключении
- Обработка ошибок и управление таймаутами

**Зависимости:**`@iobroker/socket-client`

---

### Уровень 4: Конфигурация (`/lib/config/` )

#### `ConfigLoader.js`

```javascript
class ConfigLoader {
  constructor(configPath: string)
  
  // Loading
  async loadConfig(): Config
  async reloadConfig()
  watchForChanges(callback: Function)
  
  // Validation
  validateConfig(config: object): boolean
  
  // Access
  getPages(): PageConfig[]
  getIoBrokerSettings(): IoBrokerConfig
  getHardwareSettings(): HardwareConfig
}
```

**Формат файла конфигурации:** YAML (удобочитаемый, с поддержкой комментариев)

**Пример структуры (подробности см. в разделе «Уровень конфигурации» ниже)**

---

## Проектирование страниц

### Концепция страницы

**Страница** представляет собой логический экран на панели MCDU, отображающий соответствующую информацию об умном доме с контекстно-зависимыми назначениями кнопок.

**Примеры страниц:**

- `DATA` - Обзор (погода, солнечная энергия, батарея, бытовая техника)
- `CLIMATE` - Регулировка температуры во всех комнатах
- `ENERGY`- Производство солнечной энергии, аккумуляторы, импорт/экспорт электроэнергии из сети.
- `APPLIANCES` - Индивидуальное управление отдельными устройствами (стиральная машина, сушилка, освещение)
- `SECURITY` - Двери, окна, камеры
- `SETTINGS` - Настройка MCDU (яркость, автоматическое затемнение)

### Структура страницы

#### Макет отображения

**Площадь дисплея MCDU (типовая):**

```
 Title Line                    <-- Line 0 (Header)
                               <-- Line 1 (Subheader)
Label 1       Value 1     <L1> <-- Line 2 (LSK L1/R1)
Label 2       Value 2     <L2> <-- Line 3 (LSK L2/R2)
Label 3       Value 3     <L3> <-- Line 4 (LSK L3/R3)
Label 4       Value 4     <L4> <-- Line 5 (LSK L4/R4)
Label 5       Value 5     <L5> <-- Line 6 (LSK L5/R5)
Label 6       Value 6     <L6> <-- Line 7 (LSK L6/R6)
                               <-- Line 8 (Empty)
Scratchpad: __________         <-- Line 9 (Input buffer)
```

**Клавиши выбора строки (LSK):**

- Строки 2-7 соответствуют парам кнопок L1/R1 — L6/R6
- Левая кнопка (L1-L6): Обычно обозначает действие/метку
- Правая кнопка (R1-R6): обычно отображает значение или переключает режимы.

#### Определение страницы (конфигурация YAML)

```yaml
pages:
  - name: DATA
    title: "SYSTEM DATA"
    refresh_interval: 2  # seconds (0 = event-driven only)
    lines:
      - line: 2
        label: "WEATHER"
        value: "{{weather.0.current.temperature}}°C"
        button_left: null
        button_right:
          action: navigatePage
          target: CLIMATE
      - line: 3
        label: "SOLAR"
        value: "{{solar.0.power}}W"
        color: "{{solar.0.power > 0 ? 'green' : 'white'}}"
        button_right:
          action: navigatePage
          target: ENERGY
      - line: 4
        label: "WASHING"
        value: "{{washing.0.status}}"
        button_right:
          action: navigatePage
          target: APPLIANCES
    function_keys:
      PROG:
        action: navigatePage
        target: SETTINGS
      F-PLN:
        action: navigatePage
        target: CLIMATE
```

### Алгоритм отрисовки страницы

**Шаг 1: Сбор данных о штате**

```javascript
async function renderPage(pageName) {
  const page = config.getPage(pageName);
  const stateData = {};
  
  // Collect all referenced states
  for (const line of page.lines) {
    const stateIds = extractStateReferences(line.value);
    for (const id of stateIds) {
      stateData[id] = await iobroker.getState(id);
    }
  }
  
  return { page, stateData };
}
```

**Шаг 2: Оценка шаблона**

```javascript
function evaluateLine(lineConfig, stateData) {
  // Replace {{state.id}} with actual values
  let text = lineConfig.value;
  text = text.replace(/\{\{([^}]+)\}\}/g, (match, expr) => {
    return evaluateExpression(expr, stateData);
  });
  
  // Evaluate color expressions
  const color = evaluateExpression(lineConfig.color, stateData);
  
  return { text, color };
}
```

**Шаг 3: Обновление дисплея**

```javascript
function updateDisplay(page, stateData) {
  renderer.clearDisplay();
  renderer.renderLine(0, page.title, 'white');
  
  for (const lineConfig of page.lines) {
    const { text, color } = evaluateLine(lineConfig, stateData);
    renderer.renderLine(lineConfig.line, text, color);
  }
}
```

### Конечный автомат навигации по страницам

```
       ┌──────┐
       │ INIT │
       └───┬──┘
           │ (Power on)
           ▼
       ┌──────┐    DATA button    ┌──────┐
   ┌──▶│ DATA │◀──────────────────│  ANY │
   │   └──┬───┘                   └───▲──┘
   │      │                           │
   │      │ R1 (Weather)              │ MCDU MENU
   │      ▼                           │
   │   ┌─────────┐                    │
   │   │ CLIMATE │────────────────────┘
   │   └─────────┘
   │      │
   │      │ R2 (Solar)
   │      ▼
   │   ┌────────┐
   │   │ ENERGY │
   │   └────────┘
   │      │
   │      │ Left Arrow (Back)
   └──────┘
```

**Реализация конечного автомата:**

```javascript
class PageStateMachine {
  constructor() {
    this.currentPage = 'DATA';
    this.history = [];
  }
  
  navigateTo(pageName) {
    this.history.push(this.currentPage);
    this.currentPage = pageName;
    emit('pageChanged', pageName);
  }
  
  goBack() {
    if (this.history.length > 0) {
      this.currentPage = this.history.pop();
      emit('pageChanged', this.currentPage);
    }
  }
  
  handleButton(button) {
    const page = config.getPage(this.currentPage);
    const action = page.getButtonAction(button);
    
    if (action.type === 'navigatePage') {
      this.navigateTo(action.target);
    } else if (action.type === 'goBack') {
      this.goBack();
    }
    // ... other action types
  }
}
```

---

## Поток данных

### Сценарий 1: Нажатие кнопки → Команда ioBroker

**Пример:** Пользователь нажимает R3, чтобы включить/выключить свет в гостиной.

```
1. User presses R3 button on MCDU
2. USB HID report received by node-hid
3. MCDUDevice emits 'buttonPress' event with button='R3'
4. InputHandler receives event
5. PageManager looks up R3 action on current page
6. Action: toggleState('lights.living.STATE')
7. IoBrokerClient reads current state (false)
8. IoBrokerClient sends setState('lights.living.STATE', true, ack=false)
9. ioBroker processes command and updates state
10. ioBroker sends stateChange event via WebSocket
11. IoBrokerClient receives update (val=true, ack=true)
12. PageManager triggers display refresh
13. DisplayRenderer updates line showing "LIVING ▶ON"
14. LED "RDY" blinks to confirm action
```

**Целевая задержка:** <200 мс (нажатие кнопки → обновление дисплея)

---

### Сценарий 2: Изменение состояния ioBroker → Обновление отображения MCDU

**Пример:** Стиральная машина завершает цикл.

```
1. Washing machine adapter updates state:
   washing.0.status = "finished"
2. ioBroker broadcasts stateChange event
3. IoBrokerClient receives WebSocket event (subscribed to washing.0.*)
4. IoBrokerClient updates local cache
5. IoBrokerClient emits 'stateUpdate' event
6. PageManager checks if current page references washing.0.status
7. If yes: triggers display refresh
8. DisplayRenderer updates line: "WASHING [FINISHED]" (green)
9. Optional: Blink "RDY" LED to alert user
10. Optional: Play notification sound (if MCDU has speaker)
```

**Целевая задержка:** <500 мс (обновление ioBroker → отображение MCDU)

---

### Сценарий 3: Навигация по страницам

**Пример:** Пользователь переходит в раздел ДАННЫЕ → КЛИМАТ

```
1. User presses "F-PLN" function key
2. InputHandler receives buttonPress('F-PLN')
3. PageManager.handleButton() looks up action: navigatePage('CLIMATE')
4. PageStateMachine.navigateTo('CLIMATE')
5. PageManager.loadPage('CLIMATE')
6. IoBrokerClient fetches all states referenced in CLIMATE page config
7. PageManager.renderCurrentPage()
8. DisplayRenderer clears display
9. DisplayRenderer renders CLIMATE page title
10. DisplayRenderer renders temperature values for each room
11. DisplayRenderer updates LSK labels (L1="LIVING", etc.)
12. User sees new page within ~300ms
```

---

## Уровень конфигурации

### Файл конфигурации:`config.yaml`

```yaml
# ioBroker connection settings
iobroker:
  host: "192.168.1.100"
  port: 8082  # WebSocket port (socket.io adapter)
  username: "mcdu-controller"  # Optional
  password: "secret"           # Optional
  reconnect_interval: 5000     # ms
  timeout: 10000               # ms

# MCDU hardware settings
hardware:
  vendor_id: "0x4098"
  product_id: "0xbb36"  # CAPTAIN mode
  auto_brightness: true  # Use light sensors
  brightness:
    display: 200  # 0-255
    buttons: 150
  reconnect_on_disconnect: true

# Display settings
display:
  refresh_rate: 5  # Hz (max updates per second)
  default_color: "white"
  title_color: "cyan"
  error_color: "amber"

# Logging
logging:
  level: "info"  # debug, info, warn, error
  file: "/var/log/mcdu-controller.log"
  console: true

# Pages configuration
pages:
  # DATA page - System overview
  - name: DATA
    title: "SYSTEM DATA"
    default: true  # Show on startup
    refresh_interval: 2  # Auto-refresh every 2 seconds
    
    lines:
      - line: 2
        label: "WEATHER"
        value: "{{weather.0.current.temperature}}°C / {{weather.0.current.humidity}}%"
        color: "white"
        button_left: null
        button_right:
          action: navigatePage
          target: CLIMATE
          
      - line: 3
        label: "SOLAR"
        value: "{{solar.0.power}}W"
        color: "{{solar.0.power > 0 ? 'green' : 'white'}}"
        button_right:
          action: navigatePage
          target: ENERGY
          
      - line: 4
        label: "BATTERY"
        value: "{{battery.0.soc}}% ({{battery.0.power}}W)"
        color: "{{battery.0.soc < 20 ? 'amber' : 'green'}}"
        button_right:
          action: navigatePage
          target: ENERGY
          
      - line: 5
        label: "WASHING"
        value: "{{washing.0.status}}"
        color: "{{washing.0.status == 'finished' ? 'green' : 'white'}}"
        button_right:
          action: navigatePage
          target: APPLIANCES
          
      - line: 6
        label: "DRYER"
        value: "{{dryer.0.status}}"
        button_right:
          action: navigatePage
          target: APPLIANCES
    
    function_keys:
      DATA:
        action: navigatePage
        target: DATA
      F-PLN:
        action: navigatePage
        target: CLIMATE
      PROG:
        action: navigatePage
        target: SETTINGS
      PERF:
        action: navigatePage
        target: ENERGY

  # CLIMATE page - Temperature control
  - name: CLIMATE
    title: "CLIMATE CONTROL"
    refresh_interval: 5
    
    lines:
      - line: 2
        label: "LIVING"
        value: "{{climate.living.current}}° → {{climate.living.target}}°"
        button_left:
          action: incrementValue
          state_id: "climate.living.target"
          step: -0.5
        button_right:
          action: incrementValue
          state_id: "climate.living.target"
          step: 0.5
          
      - line: 3
        label: "BEDROOM"
        value: "{{climate.bedroom.current}}° → {{climate.bedroom.target}}°"
        button_left:
          action: incrementValue
          state_id: "climate.bedroom.target"
          step: -0.5
        button_right:
          action: incrementValue
          state_id: "climate.bedroom.target"
          step: 0.5
          
      - line: 4
        label: "KITCHEN"
        value: "{{climate.kitchen.current}}° → {{climate.kitchen.target}}°"
        button_left:
          action: incrementValue
          state_id: "climate.kitchen.target"
          step: -0.5
        button_right:
          action: incrementValue
          state_id: "climate.kitchen.target"
          step: 0.5
    
    function_keys:
      DATA:
        action: navigatePage
        target: DATA
      "Left Arrow":
        action: goBack

  # ENERGY page - Solar and battery
  - name: ENERGY
    title: "ENERGY MANAGEMENT"
    refresh_interval: 1  # Fast updates for real-time data
    
    lines:
      - line: 2
        label: "SOLAR"
        value: "{{solar.0.power}}W"
        color: "green"
        
      - line: 3
        label: "BATTERY"
        value: "{{battery.0.soc}}% ({{battery.0.power}}W)"
        color: "{{battery.0.power > 0 ? 'green' : 'amber'}}"
        
      - line: 4
        label: "GRID"
        value: "{{grid.0.power}}W {{grid.0.power > 0 ? 'IMPORT' : 'EXPORT'}}"
        color: "{{grid.0.power > 0 ? 'amber' : 'green'}}"
        
      - line: 5
        label: "CONSUMPTION"
        value: "{{consumption.0.total}}W"
        color: "white"
    
    function_keys:
      DATA:
        action: navigatePage
        target: DATA

  # APPLIANCES page - Device controls
  - name: APPLIANCES
    title: "APPLIANCES"
    refresh_interval: 3
    
    lines:
      - line: 2
        label: "LIVING LIGHT"
        value: "{{lights.living.STATE ? '▶ON' : '◀OFF'}}"
        color: "{{lights.living.STATE ? 'green' : 'white'}}"
        button_right:
          action: toggleState
          state_id: "lights.living.STATE"
          
      - line: 3
        label: "BEDROOM LIGHT"
        value: "{{lights.bedroom.STATE ? '▶ON' : '◀OFF'}}"
        button_right:
          action: toggleState
          state_id: "lights.bedroom.STATE"
          
      - line: 4
        label: "WASHING"
        value: "{{washing.0.status}}"
        color: "{{washing.0.status == 'finished' ? 'green' : 'white'}}"
        button_right:
          action: setState
          state_id: "washing.0.command"
          value: "start"
          confirm: true  # Show confirmation dialog
    
    function_keys:
      DATA:
        action: navigatePage
        target: DATA

# State aliases (optional - for cleaner templates)
aliases:
  weather_temp: "weather.0.current.temperature"
  solar_power: "solar.0.power"
  battery_soc: "battery.0.soc"
```

### Проверка конфигурации

**Схема (с использованием Joi):**

```javascript
const configSchema = Joi.object({
  iobroker: Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().required(),
    username: Joi.string().optional(),
    password: Joi.string().optional(),
    reconnect_interval: Joi.number().min(1000).default(5000),
    timeout: Joi.number().min(1000).default(10000)
  }).required(),
  
  hardware: Joi.object({
    vendor_id: Joi.string().pattern(/^0x[0-9a-fA-F]{4}$/).required(),
    product_id: Joi.string().pattern(/^0x[0-9a-fA-F]{4}$/).required(),
    auto_brightness: Joi.boolean().default(true),
    brightness: Joi.object({
      display: Joi.number().min(0).max(255).default(200),
      buttons: Joi.number().min(0).max(255).default(150)
    })
  }).required(),
  
  pages: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      title: Joi.string().max(24).required(),
      default: Joi.boolean().default(false),
      refresh_interval: Joi.number().min(0).default(0),
      lines: Joi.array().items(/* line schema */),
      function_keys: Joi.object()
    })
  ).min(1).required()
});
```

---

## Этапы реализации

### Этап 1: Установка драйвера оборудования (ориентировочно: 3-5 дней)

**Цель:** Установить надежную USB-связь с MCDU.

**Задачи:**

1. Настройка проекта Node.js с использованием TypeScript
2. Установить`node-hid` и обнаружение тестового устройства
3. Осуществлять`MCDUDevice` сорт:
   - Открытие/закрытие USB-порта с обработкой ошибок
   - Чтение отчетов HID (петля ввода кнопки)
   - Создание отчетов HID (базовый тест дисплея)
4. Осуществлять`DisplayRenderer` :
   - Кодировка символов (ASCII → 3-байтовый формат)
   - Отображение последовательности инициализации
   - Отображение текста (в одну строку, затем на весь экран)
5. Проверка светодиода и регулировки яркости.
6. Реализовать логику повторного подключения USB.
7. Напишите модульные тесты для функций кодирования.

**Критерии успеха:**

- ✅ Надежно считывает все нажатия кнопок
- ✅ Отображение произвольного текста в MCDU
- ✅ Управление всеми светодиодами
- ✅ Отрегулируйте яркость
- ✅ Управление отключением/повторным подключением USB-устройства

---

### Этап 2: Интеграция ioBroker (оценка: 2–3 дня)

**Цель:** Подключиться к ioBroker и читать/записывать состояния.

**Задачи:**

1. Установить`@iobroker/socket-client`
2. Осуществлять`IoBrokerClient` сорт:
   - Соединение WebSocket с аутентификацией
   - Читать одно состояние (`getState` )
   - Записать состояние (`setState` )
   - Подпишитесь на шаблоны состояний
   - Обработка ошибок подключения и переподключение.
3. Создать локальный кэш состояния
4. Тестирование с использованием реального экземпляра ioBroker:
   - Считывание показаний датчиков температуры
   - Тумблерные выключатели света
   - Подпишитесь на обновления статуса стиральной машины
5. Напишите интеграционные тесты (имитируйте сервер ioBroker).

**Критерии успеха:**

- ✅ Подключение к ioBroker через WebSocket
- ✅ Успешное чтение и запись состояний.
- ✅ Получайте обновления состояния в режиме реального времени
- ✅ Обеспечивает корректную обработку перезапуска ioBroker

---

### Этап 3: Разработка бизнес-логики (ориентировочно: 5-7 дней)

**Цель:** Реализация системы страниц и навигации.

**Задачи:**

1. Разработка и внедрение`PageManager` :
   - Загрузка конфигурации страницы из YAML
   - Отобразить страницу на дисплее MCDU
   - Обработка навигации по страницам
2. Осуществлять`InputHandler` :
   - Нажатия кнопок на карту для выполнения действий
   - Выполнение действий (навигация, переключение, установка значения)
3. Создайте конечный автомат для навигации по страницам.
4. Реализовать механизм оценки шаблонов:
   - Заменять`{{state.id}}` со значениями
   - Поддержка условных выражений
5. Создайте примеры страниц (ДАННЫЕ, КЛИМАТ, ЭНЕРГЕТИКА).
6. Протестируйте полный процесс:
   - Нажатие кнопки → навигация
   - Изменение состояния → обновление дисплея
7. Добавить обработку ошибок (отсутствующие состояния, недопустимые действия).

**Критерии успеха:**

- ✅ Перемещайтесь между страницами с помощью кнопок
- ✅ Отображение реальных данных ioBroker на страницах
- ✅ Изменение состояния осуществляется с помощью кнопок MCDU
- ✅ Обновление отображения в реальном времени при изменении состояния

---

### Этап 4: Настройка и доработка (ориентировочно: 3-4 дня)

**Цель:** Готовность к эксплуатации конфигурации и улучшение пользовательского интерфейса.

**Задачи:**

1. Осуществлять`ConfigLoader` :
   - Анализ YAML-конфигурации
   - Проверка с использованием схемы Joi
   - Горячая перезагрузка при изменении конфигурации (отслеживание изменений в файле конфигурации)
2. Добавить логирование (Уинстон):
   - Записывать все нажатия кнопок
   - Записывать в лог все команды ioBroker
   - Регистрируйте ошибки и предупреждения.
3. Улучшить обработку ошибок:
   - Отображение сообщений об ошибках в MCDU
   - Повторите неудачные команды ioBroker.
4. Добавить светодиодные индикаторы состояния:
   - Светодиод "MCDU": мигает при активации.
   - Светодиод "RDY": мигает при подтверждении действия.
   - Светодиод "FAIL": загорается ошибка.
5. Реализовать автоматическую регулировку яркости (с помощью датчиков освещенности).
6. Создайте службу systemd для автозапуска.
7. Напишите пользовательскую документацию (README, примеры конфигурации).

**Критерии успеха:**

- ✅ Файл конфигурации управляет всем поведением.
- ✅ Полное ведение журнала
- ✅ Корректная обработка ошибок
- ✅ Готово к развертыванию в производственной среде

---

### Этап 5: Расширенные функции (опционально - ориентировочно 5-10 дней)

**Цель:** Функционал для опытных пользователей и улучшение пользовательского опыта.

**Задачи:**

1. Ввод данных в блокнот:
   - Ввод текста с использованием буквенно-цифровых клавиш
   - Используется для установки значений температуры и т. д.
2. История/графики:
   - Отображение миниатюрных линейных графиков (изменение выработки солнечной энергии во времени).
   - Требуется доступ к адаптеру истории ioBroker.
3. Уведомления:
   - Система очередей для оповещений («Стирка завершена!»)
   - Мигание светодиодов + отображение страницы уведомлений
4. Ярлыки:
   - Длительное нажатие кнопок для выполнения альтернативных действий
   - Удерживайте функциональную клавишу + LSK для быстрых действий.
5. Поддержка нескольких пользователей:
   - Различные варианты оформления страниц для каждого пользователя.
   - Смена пользователя с помощью PIN-кода на черновике
6. Веб-панель управления:
   - Отобразить текущий экран MCDU в браузере
   - Дистанционное управление через веб-интерфейс

**Критерии успеха:**

- ✅ Работают расширенные методы ввода
- ✅ Уведомления удобны для пользователя
- ✅ Сочетания клавиш для опытных пользователей повышают эффективность.

---

## Архитектура развертывания

### Настройка разработки

```
Developer Machine
├── Node.js 18+
├── Code editor (VS Code recommended)
├── MCDU connected via USB
└── ioBroker test instance (local or VM)
```

**Процесс разработки:**

1. Отредактируйте код в`/src`
2. `npm run dev` (автоматический перезапуск с помощью nodemon)
3. Тестирование на физическом оборудовании MCDU.
4. Выполните команду \`git commit\` и \`git push\`.

---

### Внедрение в производство (Вариант 1: Автономный сервис)

**Цель:** Выделенный сервер/одноплатный компьютер с подключенным модулем MCDU.

```
Raspberry Pi 4 / Intel NUC
├── OS: Ubuntu 22.04 / Debian 12
├── Node.js 18 LTS
├── MCDU Controller (systemd service)
│   ├── Config: /etc/mcdu-controller/config.yaml
│   ├── Logs: /var/log/mcdu-controller/
│   └── Code: /opt/mcdu-controller/
└── USB: WinWing MCDU (vendor 0x4098)

Network Connection → ioBroker Server
```

**Служба Systemd (`/etc/systemd/system/mcdu-controller.service` ):**

```ini
[Unit]
Description=MCDU Smart Home Controller
After=network.target

[Service]
Type=simple
User=mcdu
WorkingDirectory=/opt/mcdu-controller
ExecStart=/usr/bin/node /opt/mcdu-controller/dist/index.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

**Этапы установки:**

```bash
# 1. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 2. Clone repo
sudo git clone <repo-url> /opt/mcdu-controller
cd /opt/mcdu-controller

# 3. Install dependencies
sudo npm ci --production

# 4. Build (if TypeScript)
sudo npm run build

# 5. Configure
sudo cp config.example.yaml /etc/mcdu-controller/config.yaml
sudo nano /etc/mcdu-controller/config.yaml  # Edit settings

# 6. Set up udev rules (USB permissions)
sudo tee /etc/udev/rules.d/99-winwing-mcdu.rules <<EOF
SUBSYSTEM=="usb", ATTRS{idVendor}=="4098", MODE="0666"
EOF
sudo udevadm control --reload-rules

# 7. Create user
sudo useradd -r -s /bin/false mcdu

# 8. Install systemd service
sudo cp mcdu-controller.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable mcdu-controller
sudo systemctl start mcdu-controller

# 9. Check status
sudo systemctl status mcdu-controller
sudo journalctl -u mcdu-controller -f  # View logs
```

---

### Развертывание в производственной среде (Вариант 2: адаптер ioBroker)

**Цель:** Запуск в качестве нативного адаптера ioBroker.

```
ioBroker Server
├── Adapters:
│   ├── iobroker.admin
│   ├── iobroker.socketio
│   └── iobroker.mcdu-controller  ← Custom adapter
│       ├── USB: WinWing MCDU
│       ├── States: mcdu.0.*
│       └── Config: via Admin UI
└── States Database
```

**Состояния адаптера:**

```
mcdu.0.connected         (boolean) - USB connection status
mcdu.0.current_page      (string)  - Current page name
mcdu.0.brightness.display (number) - Display brightness 0-255
mcdu.0.brightness.buttons (number) - Button brightness 0-255
mcdu.0.button.L1         (boolean) - Button L1 pressed
mcdu.0.button.R1         (boolean) - Button R1 pressed
...
```

**Преимущества:**

- ✅ Интегрировано в административный интерфейс ioBroker
- ✅ Жизненный цикл адаптера управляется ioBroker
- ✅ Простая установка для других пользователей
- ✅ Может передавать состояние MCDU другим адаптерам

**Компромиссы:**

- ❌ Более сложная упаковка
- ❌ Необходимо соблюдать соглашения об использовании адаптера ioBroker.

---

## Целевые показатели эффективности

| Метрика                                  | Цель    | Приемлемый |
| ---------------------------------------- | ------- | ---------- |
| Задержка нажатия кнопки                  | <100 мс | <200 мс    |
| ioBroker state read                      | <50 мс  | <100 мс    |
| Обновление дисплея (локальное)           | <100 мс | <200 мс    |
| Обновление дисплея (из события ioBroker) | <300 мс | <500 мс    |
| Навигация по страницам                   | <200 мс | <400 мс    |
| Время повторного подключения USB         | <2с     | <5с        |
| Перезагрузка конфигурации                | <500 мс | <1с        |
| Использование памяти                     | <50 МБ  | <100 МБ    |
| Использование ЦП (в режиме ожидания)     | <5%     | <10%       |

---

## Вопросы безопасности

### Аутентификация ioBroker

- **Рекомендация:** Используйте выделенную учетную запись пользователя для MCDU.
- **Права доступа:** только для чтения для датчиков, только для записи для управляемых устройств.
- **Учетные данные:** хранить в переменных окружения, а не в файле конфигурации.

### Доступ к USB-устройству

- **Linux:** Используйте правила udev для предоставления доступа конкретному пользователю (не root).
- **Принцип:** Запускать службу с минимальными привилегиями.

### Файл конфигурации

- **Расположение:**`/etc/mcdu-controller/config.yaml`
- **Права доступа:**`chmod 600` (Только для чтения и записи владельцем)
- **Секреты:** При желании можно использовать переменные окружения для паролей.

---

## Стратегия тестирования

### Модульные тесты

- Функции кодирования/декодирования протокола USB
- Отображение текста
- Проверка конфигурации
- механизм оценки шаблонов

### Интеграционные тесты

- Подключение через ioBroker (имитация WebSocket-сервера)
- USB-связь (аппаратное обеспечение в контуре обратной связи)
- Сквозной процесс: нажатие кнопки → ioBroker → обновление дисплея

### Ручное тестирование

- Протестируйте все страницы с использованием реального экземпляра ioBroker.
- Проверьте все назначения кнопок.
- Тестовые сценарии ошибок (отключение USB, отключение ioBroker)

---

## Заключение

Эта архитектура обеспечивает **масштабируемую и поддерживаемую основу** для контроллера умного дома MCDU. Многоуровневая конструкция гарантирует:

- ✅ **Четкое разделение задач** (аппаратное обеспечение ↔ логика ↔ интеграция)
- ✅ **Тестируемость** (каждый слой можно протестировать независимо)
- ✅ **Гибкость** (управление конфигурацией, отсутствие жестко закодированных страниц)
- ✅ **Расширяемость** (легко добавлять новые страницы и действия)
- ✅ **Готово к использованию в производственной среде** (ведение журналов, обработка ошибок, служба systemd)

**Рекомендуемые дальнейшие шаги:**

1. Обсудите эту архитектуру с заинтересованными сторонами проекта.
2. Настройте среду разработки (Node.js, оборудование MCDU, тестовый экземпляр ioBroker).
3. Начало реализации первого этапа (драйвер оборудования)
4. Внедряйте итерации на основе реальных испытаний.

**Ориентировочный общий срок выполнения:** 4-6 недель (для этапов 1-4)

---

**Статус документа:** Окончательное предложение\
&#x20;**Последнее обновление:** 14.02.2026\
&#x20;**Автор:** Subagent (mcdu-research)\
&#x20;**Следующие шаги:** Встреча по запуску внедрения.