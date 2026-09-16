---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md
title: Адаптер ioBroker MCDU - пересмотр архитектуры с аутентичным пользовательским интерфейсом.
hash: gzw1HbSJ9ML0qTv+bOZDIMbkvd4u/mjc7wkGo1YiLOc=
---
# Адаптер ioBroker MCDU — пересмотр архитектуры с аутентичным пользовательским интерфейсом.

**Версия:** 2.0\
&#x20;**Дата:** 16.02.2026\
&#x20;**Статус:** Этап проектирования\
&#x20;**Автор:** Феликс Хуммель\
&#x20;**Основано на:** UX-CONCEPT.md (аутентичные шаблоны кабины MCDU)

---

## 🎯 Краткий обзор изменений

Данный документ расширяет файл **IOBROKER-ADAPTER-ARCHITECTURE.md** , добавляя **аутентичные шаблоны пользовательского интерфейса кабины пилота** из авиационных многофункциональных панелей управления:

**Ключевые нововведения:**

1. **Система для временного хранения данных** (входной буфер строки 14)
2. **Конечный автомат режима ввода** (обычный → ввод → редактирование)
3. **LSK Копирование/Вставка** (взаимодействие в соответствии со стандартами авиационной отрасли)
4. **Обработка событий клавиатуры** (0-9, AZ, CLR, DEL, OVFY)
5. **Система визуальной обратной связи** (скобки, цветовые коды, проверка достоверности)
6. **Многоуровневая проверка** (нажатие клавиши → формат → диапазон → бизнес-логика)

**Почему это важно:**

- Обеспечивает **реалистичный ввод данных авиационного уровня.**
- Воспроизводит **мышечную память** реальных пользователей MCDU.
- Обеспечивает **эффективный ввод данных** без использования курсора/мыши.
- Поддерживает **сложные рабочие процессы** (контроль температуры, редактирование сцен, планирование).

---

## 📐 Расширенная модель данных

### 1. Расширенное состояние выполнения

**Оригинал (из IOBROKER-ADAPTER-ARCHITECTURE.md):**

```javascript
runtime: {
  currentPage: "nav-main",
  previousPage: null,
  mode: "normal"
}
```

**Пересмотрено (с системой ввода):**

```javascript
runtime: {
  // Page Navigation
  currentPage: "nav-main",           // Current page ID
  previousPage: "home-main",         // For back navigation (CLR)
  pageHistory: ["home", "nav"],      // Breadcrumb trail
  
  // Input Mode
  mode: "normal",                    // "normal" | "input" | "edit" | "confirm"
  scratchpad: "",                    // Input buffer (Line 14 content)
  scratchpadValid: true,             // Validation status
  scratchpadColor: "white",          // white | green | amber | red
  
  // Edit State
  selectedLine: null,                // Which line (1-13) is being edited
  selectedSide: null,                // "left" | "right" | "display"
  editField: null,                   // Full field path: "pages.nav-main.lines.1.display"
  editFieldType: null,               // "numeric" | "text" | "select" | "time"
  editFieldConfig: null,             // Validation rules from page config
  
  // Visual Feedback
  lastAction: null,                  // "insert" | "copy" | "toggle" | "navigate"
  actionTimestamp: 0,                // For temporary visual feedback
  errorMessage: null,                // Current error (if any)
  confirmationPending: null          // Confirmation dialog data (if active)
}
```

### 2. Расширенная конфигурация линии

**Оригинал:**

```javascript
{
  row: 1,
  leftButton: { type: "navigation", action: "goto", target: "nav-pos", label: "POS" },
  display: { type: "datapoint", source: "simconnect.0.PLANE_LATITUDE", label: "LAT", format: "%.4f°" },
  rightButton: { type: "empty" }
}
```

**Изменено (с возможностью редактирования полей):**

```javascript
{
  row: 1,
  
  leftButton: {
    type: "navigation",         // "navigation" | "datapoint" | "empty"
    action: "goto",              // "goto" | "toggle" | "increment" | "decrement"
    target: "nav-pos",           // Page ID or state ID
    label: "POS",                // Button label
    editable: false              // ← NEW: Can this button action be edited?
  },
  
  display: {
    type: "datapoint",           // "datapoint" | "label" | "empty"
    source: "thermostat.0.target",  // ioBroker state ID
    label: "SOLL",               // Prefix label
    format: "%.1f",              // sprintf-style format
    unit: "°C",                  // Unit suffix
    color: "white",              // Base color
    align: "left",               // "left" | "center" | "right"
    
    // ← NEW: Editable Field Config
    editable: true,              // Can user edit this field?
    inputType: "numeric",        // "numeric" | "text" | "select" | "time" | "date"
    
    // Validation Rules
    validation: {
      required: false,           // Must have value?
      min: 16.0,                 // Min value (numeric)
      max: 30.0,                 // Max value (numeric)
      step: 0.5,                 // Increment step
      maxLength: 20,             // Max chars (text)
      pattern: "^[0-9.]+$",      // Regex pattern (text)
      options: null,             // Array of valid options (select)
      custom: null               // Custom validation function name
    },
    
    // Visual Feedback for Editable Fields
    editIndicator: "bracket",    // "bracket" | "arrow" | "underline"
    editColor: "amber",          // Color when field is editable
    activeColor: "green",        // Color when value is user-set
    errorColor: "red",           // Color on validation error
    
    // Color Rules (Dynamic based on value)
    colorRules: [
      { condition: "< 18", color: "cyan" },      // Cool
      { condition: ">= 18 && < 22", color: "green" },  // Comfortable
      { condition: ">= 22", color: "amber" }     // Warm
    ]
  },
  
  rightButton: {
    type: "datapoint",
    action: "toggle",
    target: "lights.0.living.main",
    label: "LIGHT",
    editable: false
  }
}
```

### 3. Расширенная настройка страницы

**Добавьте подсказки для ввода и сообщения об ошибке проверки:**

```javascript
{
  id: "climate-room",
  name: "WOHNZIMMER",
  parent: "climate-main",
  
  // ← NEW: Page-Level Settings
  scratchpadEnabled: true,       // Show Line 14 scratchpad?
  scratchpadPlaceholder: "____",  // What to show when empty
  
  // Input Hints (shown when field is selected)
  hints: {
    "line.2.display": "BEREICH 16-30°C",
    "line.3.display": "AUTO | MANUELL | AUS"
  },
  
  // Validation Error Messages
  errorMessages: {
    "min": "ZU NIEDRIG",
    "max": "ZU HOCH",
    "required": "PFLICHTFELD",
    "format": "UNGÜLTIGES FORMAT"
  },
  
  lines: [...]
}
```

---

## 🔄 Конечный автомат в режиме ввода

### Диаграмма состояний

```
┌─────────────────────────────────────────────────────────────┐
│                         NORMAL MODE                          │
│  • Display shows current page data                          │
│  • LSK selects items or navigates                           │
│  • Scratchpad Line 14 empty (or shows "____")               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ User types on keypad (0-9, A-Z)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                         INPUT MODE                           │
│  • Scratchpad Line 14 shows typed characters                │
│  • Characters appear with asterisk: "22.5*"                 │
│  • Page display unchanged (waiting for action)              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ├─▶ User presses CLR → Back to NORMAL
                     │
                     ├─▶ User presses LSK next to editable field
                     │   → Validate & Transfer to field
                     │   → If valid: Go to NORMAL (scratchpad clears)
                     │   → If invalid: Stay in INPUT (show error)
                     │
                     └─▶ User presses LSK next to non-editable
                         → Copy field value to scratchpad
                         → Stay in INPUT (scratchpad now has value)

┌─────────────────────────────────────────────────────────────┐
│                          EDIT MODE                           │
│  • Field highlighted with brackets: [22.0°C]                │
│  • User can type directly (replaces value in scratchpad)    │
│  • Visual indicator shows which field is active             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ├─▶ User presses CLR → Cancel edit, back to NORMAL
                     │
                     ├─▶ User presses LSK (same field) → Confirm change
                     │   → Validate & apply → Back to NORMAL
                     │
                     └─▶ User presses different LSK → Switch to that field

┌─────────────────────────────────────────────────────────────┐
│                       CONFIRM MODE                           │
│  • Confirmation dialog shown (soft or hard)                 │
│  • Options: < NEIN (cancel) | JA* (confirm) >              │
│  • Or: DRÜCKE OVFY (hard confirmation)                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ├─▶ User presses CLR or LSK (NEIN) → Cancel → NORMAL
                     │
                     ├─▶ User presses LSK (JA) or OVFY → Execute action
                     │   → Back to NORMAL
                     │
                     └─▶ Timeout (if countdown) → Auto-execute or cancel
```

### Переходы между режимами (логика кода)

```javascript
class InputModeManager {
    constructor(adapter) {
        this.adapter = adapter;
        this.state = {
            mode: 'normal',
            scratchpad: '',
            selectedLine: null,
            selectedSide: null,
            editField: null
        };
    }
    
    /**
     * Handle keypad character input (0-9, A-Z)
     */
    async handleKeyInput(char) {
        // Transition: NORMAL → INPUT
        if (this.state.mode === 'normal') {
            this.state.mode = 'input';
            this.state.scratchpad = char;
            await this.renderScratchpad();
            return;
        }
        
        // Stay in INPUT mode, append character
        if (this.state.mode === 'input' || this.state.mode === 'edit') {
            this.state.scratchpad += char;
            
            // Validate scratchpad content (if field selected)
            if (this.state.editField) {
                const valid = this.validateScratchpad();
                await this.renderScratchpad(valid ? 'green' : 'red');
            } else {
                await this.renderScratchpad('white');
            }
        }
    }
    
    /**
     * Handle CLR key press
     */
    async handleCLR() {
        // Priority 1: Clear scratchpad if it has content
        if (this.state.scratchpad.length > 0) {
            this.state.scratchpad = '';
            await this.renderScratchpad();
            return;
        }
        
        // Priority 2: Exit edit mode
        if (this.state.mode === 'edit') {
            this.state.mode = 'normal';
            this.state.selectedLine = null;
            this.state.selectedSide = null;
            this.state.editField = null;
            await this.adapter.renderCurrentPage();
            return;
        }
        
        // Priority 3: Navigate back (if on sub-page)
        const previousPage = await this.adapter.getStateAsync('runtime.previousPage');
        if (previousPage && previousPage.val) {
            await this.adapter.switchToPage(previousPage.val);
        }
    }
    
    /**
     * Handle LSK press (Line Select Key)
     */
    async handleLSK(side, lineNumber) {
        const currentPage = await this.getCurrentPageConfig();
        const lineConfig = currentPage.lines.find(l => l.row === lineNumber);
        
        if (!lineConfig) return;
        
        const field = lineConfig[side === 'left' ? 'leftButton' : 
                                side === 'right' ? 'rightButton' : 'display'];
        
        // Case 1: Scratchpad has content → INSERT
        if (this.state.scratchpad.length > 0 && field.editable) {
            await this.insertFromScratchpad(field);
            return;
        }
        
        // Case 2: Scratchpad empty, field editable → COPY
        if (this.state.scratchpad.length === 0 && field.editable) {
            await this.copyToScratchpad(field);
            return;
        }
        
        // Case 3: Field not editable → Execute action (navigation, toggle)
        if (!field.editable) {
            await this.executeFieldAction(field);
            return;
        }
    }
    
    /**
     * Insert scratchpad content into field (with validation)
     */
    async insertFromScratchpad(field) {
        // Validate
        const validation = this.validateScratchpadForField(field);
        
        if (!validation.valid) {
            // Show error, stay in INPUT mode
            await this.showError(validation.error);
            await this.renderScratchpad('red');
            return;
        }
        
        // Convert scratchpad to appropriate type
        let value = this.state.scratchpad;
        if (field.inputType === 'numeric') {
            value = parseFloat(value);
        }
        
        // Write to ioBroker state
        await this.adapter.setForeignStateAsync(field.source, value);
        
        // Clear scratchpad, return to NORMAL
        this.state.scratchpad = '';
        this.state.mode = 'normal';
        this.state.selectedLine = null;
        
        // Show success feedback
        await this.showSuccess('✓ GESPEICHERT');
        await this.adapter.renderCurrentPage();
    }
    
    /**
     * Copy field value to scratchpad
     */
    async copyToScratchpad(field) {
        // Read current value from ioBroker
        const state = await this.adapter.getForeignStateAsync(field.source);
        const value = state?.val;
        
        if (value === null || value === undefined) {
            this.state.scratchpad = '';
        } else {
            // Format value for editing
            if (field.inputType === 'numeric') {
                this.state.scratchpad = String(value);
            } else {
                this.state.scratchpad = String(value);
            }
        }
        
        // Enter EDIT mode
        this.state.mode = 'edit';
        this.state.selectedLine = field.row;
        this.state.selectedSide = field.side;
        this.state.editField = field;
        
        // Render with edit indicators
        await this.renderScratchpad('amber');
        await this.adapter.renderCurrentPage();
    }
    
    /**
     * Validate scratchpad content for specific field
     */
    validateScratchpadForField(field) {
        const value = this.state.scratchpad;
        const rules = field.validation || {};
        
        // Required check
        if (rules.required && value.length === 0) {
            return { valid: false, error: 'PFLICHTFELD' };
        }
        
        // Numeric validation
        if (field.inputType === 'numeric') {
            const num = parseFloat(value);
            if (isNaN(num)) {
                return { valid: false, error: 'UNGÜLTIGES FORMAT' };
            }
            if (rules.min !== undefined && num < rules.min) {
                return { valid: false, error: `MINIMUM ${rules.min}` };
            }
            if (rules.max !== undefined && num > rules.max) {
                return { valid: false, error: `MAXIMUM ${rules.max}` };
            }
        }
        
        // Text validation
        if (field.inputType === 'text') {
            if (rules.maxLength && value.length > rules.maxLength) {
                return { valid: false, error: `MAX ${rules.maxLength} ZEICHEN` };
            }
            if (rules.pattern) {
                const regex = new RegExp(rules.pattern);
                if (!regex.test(value)) {
                    return { valid: false, error: 'UNGÜLTIGES FORMAT' };
                }
            }
        }
        
        // Time validation (HH:MM format)
        if (field.inputType === 'time') {
            const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
            if (!timeRegex.test(value)) {
                return { valid: false, error: 'FORMAT: HH:MM' };
            }
        }
        
        return { valid: true };
    }
    
    /**
     * Render scratchpad Line 14
     */
    async renderScratchpad(color = 'white') {
        const display = this.state.scratchpad.length > 0 
            ? `${this.state.scratchpad}*`  // Asterisk indicates input
            : '____';  // Placeholder when empty
        
        const topicPrefix = this.adapter.config.mqtt?.topicPrefix || 'mcdu';
        
        const payload = {
            line: 14,
            content: display,
            color: color,
            timestamp: Date.now()
        };
        
        this.adapter.mqttClient.publish(
            `${topicPrefix}/display/line`,
            JSON.stringify(payload),
            { qos: 1 }
        );
    }
}
```

---

## 🎹 Обработка событий клавиатуры

### Расширение темы MQTT

**Новая тема:`mcdu/buttons/keypad`**

**Полезная нагрузка:**

```json
{
  "key": "KEY_5",
  "state": "pressed",
  "deviceId": "mcdu-pi-1",
  "timestamp": 1708087234567
}
```

**Основные типы:**

```javascript
const KEYPAD_KEYS = {
  // Numeric
  'KEY_0': '0',
  'KEY_1': '1',
  'KEY_2': '2',
  'KEY_3': '3',
  'KEY_4': '4',
  'KEY_5': '5',
  'KEY_6': '6',
  'KEY_7': '7',
  'KEY_8': '8',
  'KEY_9': '9',
  
  // Alphanumeric (if available)
  'KEY_A': 'A',
  'KEY_B': 'B',
  // ... (Z)
  
  // Special
  'KEY_DOT': '.',
  'KEY_SLASH': '/',
  'KEY_SPACE': ' ',
  'KEY_PLUS': '+',
  'KEY_MINUS': '-'
};
```

### Обработчик адаптерной клавиатуры

```javascript
/**
 * Handle keypad events from MQTT
 */
handleKeypadEvent(event) {
    const { key, state, deviceId } = event;
    
    // Only process press events (not release)
    if (state !== 'pressed') return;
    
    // Map hardware key to character
    const char = KEYPAD_KEYS[key];
    if (!char) {
        this.log.warn(`Unknown keypad key: ${key}`);
        return;
    }
    
    // Delegate to input mode manager
    this.inputModeManager.handleKeyInput(char);
}

/**
 * Subscribe to keypad MQTT topic
 */
subscribeToKeypad() {
    const topicPrefix = this.config.mqtt?.topicPrefix || 'mcdu';
    this.mqttClient.subscribe(`${topicPrefix}/buttons/keypad`, { qos: 1 });
}
```

---

## 🎨 Визуальная обратная связь и рендеринг

### 1. Редактируемые индикаторы полей

**Логика рендеринга:**

```javascript
/**
 * Render a line with edit indicators
 */
renderLine(lineConfig, lineNumber, isEditActive = false) {
    const display = lineConfig.display;
    
    // Get current value
    const state = await this.getForeignStateAsync(display.source);
    const value = state?.val;
    
    // Format value
    let formattedValue = this.formatValue(value, display.format);
    
    // Add unit
    if (display.unit) {
        formattedValue += display.unit;
    }
    
    // Build content with label
    let content = `${display.label}${display.label ? ' ' : ''}${formattedValue}`;
    
    // Determine color
    let color = display.color || 'white';
    
    // Apply edit indicators if editable
    if (display.editable) {
        if (isEditActive) {
            // Field currently being edited → brackets + amber
            content = `[${formattedValue}]`;
            color = 'amber';
        } else if (this.isUserSetValue(display.source)) {
            // User recently set this value → green
            color = 'green';
        } else {
            // Editable but not active → show subtle indicator
            content = `${content} ←`;  // Arrow indicates LSK available
            color = 'amber';
        }
    }
    
    // Apply color rules (dynamic based on value)
    if (display.colorRules && display.colorRules.length > 0) {
        for (const rule of display.colorRules) {
            if (this.evaluateCondition(value, rule.condition)) {
                color = rule.color;
                break;
            }
        }
    }
    
    // Apply alignment
    const columns = this.config.display?.columns || 24;
    content = this.alignText(content, display.align || 'left', columns);
    
    return { content, color };
}
```

### 2. Обратная связь по результатам проверки

**Отображение ошибки:**

```javascript
/**
 * Show validation error on display
 */
async showValidationError(errorMessage) {
    // Temporarily override Line 13 (or dedicated error line)
    const topicPrefix = this.config.mqtt?.topicPrefix || 'mcdu';
    
    const payload = {
        line: 13,
        content: `❌ ${errorMessage}`,
        color: 'red',
        duration: 3000  // Clear after 3 seconds
    };
    
    this.mqttClient.publish(
        `${topicPrefix}/display/line`,
        JSON.stringify(payload),
        { qos: 1 }
    );
    
    // Restore normal content after duration
    setTimeout(() => {
        this.renderCurrentPage();
    }, 3000);
}
```

**Отзывы об успехе:**

```javascript
/**
 * Show success confirmation
 */
async showSuccess(message = '✓ GESPEICHERT') {
    const topicPrefix = this.config.mqtt?.topicPrefix || 'mcdu';
    
    const payload = {
        line: 13,
        content: message,
        color: 'green',
        duration: 2000
    };
    
    this.mqttClient.publish(
        `${topicPrefix}/display/line`,
        JSON.stringify(payload),
        { qos: 1 }
    );
    
    setTimeout(() => {
        this.renderCurrentPage();
    }, 2000);
}
```

### 3. Отображение в черновике (строка 14)

**Всегда бронируйте место в очереди 14:**

```javascript
/**
 * Render complete page (14 lines)
 */
async renderCurrentPage() {
    const pageConfig = this.getCurrentPageConfig();
    const lines = [];
    const colors = [];
    
    // Lines 1-13: Page content
    for (let row = 1; row <= 13; row++) {
        const lineConfig = pageConfig.lines.find(l => l.row === row);
        
        if (!lineConfig || !lineConfig.display || lineConfig.display.type === 'empty') {
            lines.push('');
            colors.push('white');
        } else {
            const isEditActive = (this.inputModeManager.state.selectedLine === row);
            const { content, color } = this.renderLine(lineConfig, row, isEditActive);
            lines.push(content);
            colors.push(color);
        }
    }
    
    // Line 14: ALWAYS scratchpad (even if empty)
    const scratchpad = this.inputModeManager.state.scratchpad;
    const scratchpadDisplay = scratchpad.length > 0 
        ? `${scratchpad}*`  // Show input with asterisk
        : '____';           // Show placeholder when empty
    
    const scratchpadColor = this.inputModeManager.getScratchpadColor();
    
    lines.push(scratchpadDisplay);
    colors.push(scratchpadColor);
    
    // Send to MCDU via MQTT
    const topicPrefix = this.config.mqtt?.topicPrefix || 'mcdu';
    const payload = {
        lines: lines,
        colors: colors,
        timestamp: Date.now()
    };
    
    this.mqttClient.publish(
        `${topicPrefix}/display/render`,
        JSON.stringify(payload),
        { qos: 1 }
    );
}
```

---

## 🔐 Многоуровневая проверка

### Иерархия валидации

**Уровень 1: Проверка нажатия клавиш (на стороне клиента, Raspberry Pi)**

- Немедленно отклоняет недопустимые символы.
- Пример: ввод буквы «A» в числовое поле → запрос отклонен до достижения адаптера.
- Реализация: клиент Raspberry Pi фильтрует данные на основе типа поля.

**Уровень 2: Проверка формата (адаптер)**

- Проверяет формат всего введенного текста в блокноте.
- Примеры:
  - Числовой:`"22.5"` ✓ Действительно,`"22.5.5"` ❌ недействительно
  - Время:`"08:30"` ✓ Действительно,`"25:99"` ❌ недействительно
  - Текст: Ограничения по длине, допустимое количество символов

**Уровень 3: Проверка диапазона (адаптер)**

- Проверяет, находится ли значение в допустимом диапазоне.
- Примеры:
  - Температура:`22.5°C` в диапазоне \[16-30] ✓
  - Температура:`35°C` вне зоны действия ❌

**Уровень 4: Проверка бизнес-логики (адаптер)**

- Сложные правила, основанные на состоянии системы.
- Примеры:
  - Невозможно установить целевой уровень нагрева выше целевого уровня охлаждения.
  - Невозможно запланировать мероприятие на прошедшее время.
  - Дверь невозможно открыть, если включена сигнализация.

### Реализация проверки

```javascript
class ValidationEngine {
    /**
     * Level 2: Format Validation
     */
    validateFormat(value, inputType) {
        switch (inputType) {
            case 'numeric':
                const num = parseFloat(value);
                if (isNaN(num)) {
                    return { valid: false, error: 'UNGÜLTIGES FORMAT' };
                }
                // Check for multiple decimals, trailing dots, etc.
                if (!/^-?\d+\.?\d*$/.test(value)) {
                    return { valid: false, error: 'UNGÜLTIGES FORMAT' };
                }
                return { valid: true };
                
            case 'time':
                const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
                if (!timeRegex.test(value)) {
                    return { valid: false, error: 'FORMAT: HH:MM' };
                }
                return { valid: true };
                
            case 'text':
                // Basic format checks (no control chars, etc.)
                if (/[\x00-\x1F\x7F]/.test(value)) {
                    return { valid: false, error: 'UNGÜLTIGE ZEICHEN' };
                }
                return { valid: true };
                
            default:
                return { valid: true };
        }
    }
    
    /**
     * Level 3: Range Validation
     */
    validateRange(value, rules) {
        // Numeric range
        if (rules.min !== undefined && value < rules.min) {
            return { valid: false, error: `MINIMUM ${rules.min}` };
        }
        if (rules.max !== undefined && value > rules.max) {
            return { valid: false, error: `MAXIMUM ${rules.max}` };
        }
        
        // Text length
        if (rules.maxLength && value.length > rules.maxLength) {
            return { valid: false, error: `MAX ${rules.maxLength} ZEICHEN` };
        }
        
        // Step constraint (numeric only)
        if (rules.step && typeof value === 'number') {
            const remainder = (value - (rules.min || 0)) % rules.step;
            if (Math.abs(remainder) > 0.001) {  // Floating point tolerance
                return { valid: false, error: `SCHRITT ${rules.step}` };
            }
        }
        
        return { valid: true };
    }
    
    /**
     * Level 4: Business Logic Validation
     */
    async validateBusinessLogic(field, value, adapter) {
        // Custom validation based on field
        if (field.validation?.custom) {
            const customFn = this[field.validation.custom];
            if (customFn) {
                return await customFn.call(this, field, value, adapter);
            }
        }
        
        return { valid: true };
    }
    
    /**
     * Example custom validation: Heating target
     */
    async validateHeatingTarget(field, value, adapter) {
        // Check if heating target exceeds cooling target
        const coolingTarget = await adapter.getForeignStateAsync('climate.0.cooling.target');
        
        if (coolingTarget && value >= coolingTarget.val) {
            return { 
                valid: false, 
                error: `MAX KÜHLUNG: ${coolingTarget.val}°C` 
            };
        }
        
        return { valid: true };
    }
    
    /**
     * Complete validation chain
     */
    async validate(value, field, adapter) {
        // Level 2: Format
        const formatCheck = this.validateFormat(value, field.inputType);
        if (!formatCheck.valid) return formatCheck;
        
        // Convert to appropriate type
        let typedValue = value;
        if (field.inputType === 'numeric') {
            typedValue = parseFloat(value);
        }
        
        // Level 3: Range
        const rangeCheck = this.validateRange(typedValue, field.validation || {});
        if (!rangeCheck.valid) return rangeCheck;
        
        // Level 4: Business Logic
        const businessCheck = await this.validateBusinessLogic(field, typedValue, adapter);
        if (!businessCheck.valid) return businessCheck;
        
        return { valid: true };
    }
}
```

---

## 🎭 Система подтверждения

### Уровни подтверждения

**Уровень 1: Без подтверждения (безопасные действия)**

- Переключение света
- Просмотр информации
- Навигация по страницам
- Регулировка температуры (в пределах допустимого диапазона)

**Уровень 2: Мягкое подтверждение (деструктивные действия)**

- Активация сценариев (затронуто несколько устройств)
- Планирование событий
- Удаление элементов

**Уровень 3: Жесткое подтверждение (критические действия)**

- Снятие охранной сигнализации с охраны
- Открытие дверей
- Сброс к заводским настройкам
- выключение системы

### Структура диалога подтверждения

```javascript
class ConfirmationDialog {
    /**
     * Show soft confirmation
     */
    async showSoftConfirmation(title, details, onConfirm, onCancel) {
        const dialog = {
            type: 'soft',
            title: title,
            details: details,
            buttons: [
                { label: 'NEIN', side: 'left', key: 'LSK1L', action: onCancel },
                { label: 'JA*', side: 'right', key: 'LSK6R', action: onConfirm }
            ],
            acceptKeys: ['LSK6R', 'OVFY'],  // Either LSK or OVFY works
            cancelKeys: ['LSK1L', 'CLR']
        };
        
        this.adapter.inputModeManager.state.mode = 'confirm';
        this.adapter.inputModeManager.state.confirmationPending = dialog;
        
        await this.renderConfirmationDialog(dialog);
    }
    
    /**
     * Show hard confirmation (OVFY only)
     */
    async showHardConfirmation(title, warning, details, onConfirm, onCancel) {
        const dialog = {
            type: 'hard',
            title: title,
            warning: warning,
            details: details,
            instruction: 'DRÜCKE OVFY',
            acceptKeys: ['OVFY'],  // ONLY OVFY accepted
            cancelKeys: ['CLR', 'LSK1L']
        };
        
        this.adapter.inputModeManager.state.mode = 'confirm';
        this.adapter.inputModeManager.state.confirmationPending = dialog;
        
        await this.renderConfirmationDialog(dialog);
    }
    
    /**
     * Render confirmation dialog (overrides current page)
     */
    async renderConfirmationDialog(dialog) {
        const lines = [];
        const colors = [];
        
        // Line 1: Title
        lines.push(dialog.title);
        colors.push('white');
        
        // Line 2: Warning (if hard confirmation)
        if (dialog.type === 'hard') {
            lines.push(`⚠️  ${dialog.warning}`);
            colors.push('red');
        } else {
            lines.push('');
            colors.push('white');
        }
        
        // Line 3: Separator
        lines.push('---');
        colors.push('white');
        
        // Lines 4-10: Details
        const detailLines = dialog.details.split('\n');
        for (let i = 0; i < 7; i++) {
            lines.push(detailLines[i] || '');
            colors.push('white');
        }
        
        // Line 11: Empty
        lines.push('');
        colors.push('white');
        
        // Line 12: Instruction (for hard confirmation)
        if (dialog.type === 'hard') {
            lines.push(dialog.instruction);
            colors.push('amber');
        } else {
            lines.push('');
            colors.push('white');
        }
        
        // Line 13: Buttons
        if (dialog.type === 'soft') {
            lines.push('< NEIN               JA*');
            colors.push('white');
        } else {
            lines.push('< ABBRECHEN');
            colors.push('white');
        }
        
        // Line 14: Scratchpad ignored during confirmation
        lines.push('');
        colors.push('white');
        
        // Send to MCDU
        const topicPrefix = this.adapter.config.mqtt?.topicPrefix || 'mcdu';
        const payload = {
            lines: lines,
            colors: colors,
            timestamp: Date.now()
        };
        
        this.adapter.mqttClient.publish(
            `${topicPrefix}/display/render`,
            JSON.stringify(payload),
            { qos: 1 }
        );
    }
    
    /**
     * Handle confirmation response
     */
    async handleConfirmationResponse(key) {
        const dialog = this.adapter.inputModeManager.state.confirmationPending;
        
        if (!dialog) return;
        
        // Check if key is accept key
        if (dialog.acceptKeys.includes(key)) {
            // Execute action
            if (dialog.onConfirm) {
                await dialog.onConfirm();
            }
            
            // Clear confirmation state
            this.adapter.inputModeManager.state.mode = 'normal';
            this.adapter.inputModeManager.state.confirmationPending = null;
            
            // Return to normal page
            await this.adapter.renderCurrentPage();
        }
        // Check if key is cancel key
        else if (dialog.cancelKeys.includes(key)) {
            // Cancel action
            if (dialog.onCancel) {
                await dialog.onCancel();
            }
            
            // Clear confirmation state
            this.adapter.inputModeManager.state.mode = 'normal';
            this.adapter.inputModeManager.state.confirmationPending = null;
            
            // Return to normal page
            await this.adapter.renderCurrentPage();
        }
    }
}
```

---

## 📊 Обновленный контрольный список внедрения

### Этап 1: Основы системы ввода (Неделя 1)

**День 1-2: Расширенная модель данных**

- [ ] Добавить поля состояния во время выполнения (черновик, выбранная строка, режим).
- [ ] Расширьте конфигурацию строки с помощью редактируемых флагов и правил проверки.
- [ ] Обновите структуру нативного файла io-package.json.
- [ ] Тестирование создания объекта с новыми полями.

**День 3-4: Менеджер режимов ввода**

- [ ] Создайте класс InputModeManager
- [ ] Реализуйте конечный автомат (обычный → ввод → редактирование).
- [ ] Добавить обработку событий клавиатуры (0-9, AZ)
- [ ] Добавить обработку клавиш CLR (с учетом контекста).
- [ ] Переходы в тестовый режим

**Дни 5-7: Система черновиков**

- [ ] Реализуйте отрисовку временной панели (строка 14)
- [ ] Добавить ввод символов в блокнот
- [ ] Добавить обратную связь по проверке (зеленая/красная звездочка)
- [ ] Реализуйте функцию очистки блокнота (CLR).
- [ ] Тестовый экран блокнота

**Результат:** Система ввода работает, пользователи могут печатать в блокноте.

---

### Этап 2: Взаимодействие с LSK и валидация (Неделя 2)

**День 8-9: Логика копирования/вставки LSK**

- [ ] Реализуйте метод insertFromScratchpad (scratchpad → field)
- [ ] Реализуйте функцию copyToScratchpad (поле → блокнот).
- [ ] Добавить подсветку выделения полей
- [ ] Проверьте работу LSK в различных режимах.

**День 10-12: Механизм валидации**

- [ ] Создайте класс ValidationEngine.
- [ ] Внедрить уровень 2 (проверка формата)
- [ ] Внедрить уровень 3 (проверка диапазона).
- [ ] Внедрить уровень 4 (проверка бизнес-логики).
- [ ] Добавить отображение ошибки проверки
- [ ] Проверка достоверности результатов с использованием различных входных данных.

**День 13-14: Визуальная обратная связь**

- [ ] Добавить индикаторы редактирования (скобки, стрелки, цвета).
- [ ] Внедрить временные сообщения об успешном завершении/ошибке.
- [ ] Добавить отслеживание значений, заданных пользователем (выделено зеленым).
- [ ] Проверьте визуальную обратную связь для всех действий.

**Результат:** Полный цикл обработки входных данных от начала до конца.

---

### Этап 3: Подтверждение и доработка (3-я неделя)

**Дни 15-16: Система подтверждения**

- [ ] Создайте класс ConfirmationDialog.
- [ ] Внедрите мягкое подтверждение (LSK или OVFY).
- [ ] Внедрить жесткое подтверждение (только для OVFY)
- [ ] Добавить отображение диалогового окна подтверждения
- [ ] Процессы подтверждения тестирования

**День 17-18: Особые ключи**

- [ ] Реализовать обработку клавиш OVFY.
- [ ] Добавить двойной аварийный выход CLR
- [ ] Добавить клавишу MENU (всегда на HAUPTMENÜ)
- [ ] Проверьте все варианты поведения специальных клавиш.

**День 19-20: Крайние случаи и обработка ошибок**

- [ ] Обработка недопустимых переходов состояний
- [ ] Добавить тайм-аут для режима редактирования (автоматическая отмена через 60 секунд).
- [ ] Обработка разрывов соединения MQTT во время ввода
- [ ] Добавить отладочное логирование для конечного автомата
- [ ] Тщательно протестируйте крайние случаи.

**День 21: Обновление документации**

- [ ] Обновите файл README адаптера, добавив в него документацию по системе ввода.
- [ ] Создайте руководство пользователя для шаблонов ввода.
- [ ] Правила проверки документов
- [ ] Добавьте примеры для распространенных сценариев использования.

**Результат:** Готовая к производству система ввода данных.

---

## 🎯 Стратегия тестирования

### Модульные тесты

**Менеджер режимов ввода:**

- Переходы состояний (нормальный → ввод → редактирование → нормальный)
- Управление временными файлами (добавление, очистка, проверка)
- Обработка LSK (копирование против вставки)
- CLR ключевая контекстная осведомленность

**Механизм проверки:**

- Проверка формата (числовой, временной, текстовый)
- Проверка диапазона (мин/макс, шаг)
- Проверка бизнес-логики (пользовательские правила)
- Генерация сообщений об ошибках

**Визуальное отображение:**

- Редактировать индикаторы (скобки, цвета)
- Демонстрация блокнота для заметок
- Временные сообщения (успех/ошибка)

### Интеграционные тесты

**Сквозной поток ввода данных:**

1. Перейдите к редактируемому полю
2. Введите значение в блокноте.
3. Нажмите LSK для вставки
4. Проверьте значение, записанное в состояние ioBroker.
5. Подтверждение обновления дисплея отображается с помощью зеленой подсветки.

**Процесс валидации:**

1. Введите недопустимое значение (выходит за пределы диапазона).
2. Нажмите ЛСК
3. Проверьте отображаемое сообщение об ошибке (красным).
4. Убедитесь, что блокнот не очищен.
5. Введите допустимое значение
6. Нажмите ЛСК
7. Подтвердите успех

**Процедура подтверждения:**

1. Запустить действие, требующее подтверждения.
2. Проверьте отображаемое диалоговое окно
3. Нажмите OVFY или LSK (JA)
4. Проверка выполнения действия
5. Проверьте возможность возврата на обычную страницу.

### Пользовательские приемочные тесты

**Сценарий 1: Настройка термостата**

```
User wants to set living room temperature to 22.5°C

1. Press function key KLIMA (or navigate via MENU)
2. Display shows: KLIMA > WOHNZIMMER
3. Line 2 shows: SOLL: 21.0°C ←
4. User types: "22.5"
5. Scratchpad shows: 22.5*
6. User presses LSK2L (next to SOLL field)
7. Value transfers: SOLL: 22.5°C (green)
8. Scratchpad clears
9. Success message: ✓ GESPEICHERT (2s)
10. Thermostat receives new target

✅ Expected result: Temperature changed, visual confirmation
```

**Сценарий 2: Недопустимый ввод (выход за пределы допустимого диапазона)**

```
User tries to set temperature to 35°C (above max 30°C)

1. Navigate to KLIMA > WOHNZIMMER
2. Type: "35"
3. Scratchpad shows: 35* (white)
4. Press LSK2L
5. Validation fails
6. Scratchpad updates: 35* (RED)
7. Error line shows: MAXIMUM 30°C (red)
8. Scratchpad stays (user can correct)
9. Press CLR
10. Scratchpad clears
11. Type: "22.5"
12. Press LSK2L
13. Success (green)

✅ Expected result: Invalid input rejected, user can retry
```

**Сценарий 3: Редактирование существующего значения**

```
User wants to change existing temperature from 21.0°C to 22.0°C

1. Navigate to KLIMA > WOHNZIMMER
2. Display shows: SOLL: 21.0°C ←
3. Press LSK2L (scratchpad empty)
4. Current value copies to scratchpad: 21.0*
5. Field highlights: [21.0°C]
6. User presses CLR (clears scratchpad)
7. User types: "22"
8. Scratchpad: 22*
9. Press LSK2L again
10. Value updates: SOLL: 22.0°C (green)
11. Success message

✅ Expected result: Existing value edited successfully
```

**Сценарий 4: Активация сцены (мягкое подтверждение)**

```
User activates "GUTE NACHT" scene (turns off all lights)

1. Press function key SZENEN
2. Display shows scene list
3. Press LSK (GUTE NACHT)
4. Confirmation dialog appears:
   SZENE STARTEN?
   GUTE NACHT
   ---
   12 LICHTER AUS
   3 TÜREN SPERREN
   ---
   < NEIN         JA*
5. User presses OVFY (or LSK6R)
6. Scene activates
7. Success: ✓ SZENE AKTIV
8. Return to scene list

✅ Expected result: Scene executes after confirmation
```

**Сценарий 5: Снятие сигнализации с охраны (подтверждение подтверждения)**

```
User disarms security alarm (requires OVFY only)

1. Navigate to SICHERHEIT > ALARMANLAGE
2. Press LSK (DEAKTIVIEREN)
3. Hard confirmation dialog:
   ALARM DEAKTIVIEREN?
   ⚠️  SICHERHEIT REDUZIERT
   ---
   ALLE SENSOREN INAKTIV
   ---
   DRÜCKE OVFY
   < ABBRECHEN
4. User presses LSK (JA) → REJECTED (not allowed)
5. User presses OVFY → Accepted
6. Alarm disarms
7. Success: ✓ ALARM DEAKTIVIERT
8. Return to alarm page

✅ Expected result: Critical action requires OVFY key
```

---

## 📖 Обновления документации

### Дополнения к руководству пользователя

**Раздел: Система ввода**

**Как редактировать значения:**

1. **Перейдите** на страницу с нужным значением.
2. **Определите** редактируемые поля (обозначены стрелкой).`←` или скобки`[  ]` )
3. **Введите** новое значение на клавиатуре (0-9, десятичная точка).
   - Значение отображается в буфере временного хранения (строка 14) со звездочкой:`22.5*`
4. **Нажмите LSK** рядом с полем
   - Если корректно: происходит перевод средств, буфер очистки очищается, поле становится зеленым.
   - Если ошибка недействительна: ошибка отображается красным цветом, буфер обработки остается для исправления.
5. **Подтвердите** изменения (если это необходимо для выполнения некоторых действий).

**Черновик (строка 14):**

- Всегда виден внизу
- Отображает введенный текст, отмеченный звездочкой:`22.5*`
- Зеленая звездочка = допустимый ввод
- Красная звездочка = неверный ввод
- Нажмите CLR, чтобы очистить буфер обмена.

**Специальные клавиши:**

- **CLR** : Очистить блокнот ИЛИ вернуться назад (с учетом контекста)
- **OVFY** : Подтвердите критически важные действия
- **МЕНЮ** : Вернуться в главное меню из любого места

---

### Дополнения к документации для разработчиков

**API: Менеджер режимов ввода**

```javascript
// Check current input mode
const mode = adapter.inputModeManager.state.mode;
// modes: 'normal' | 'input' | 'edit' | 'confirm'

// Programmatically set scratchpad
adapter.inputModeManager.setScratchpad('22.5');

// Trigger validation
const valid = adapter.inputModeManager.validateScratchpad();

// Force exit input mode
adapter.inputModeManager.cancelInput();
```

**API: Механизм проверки**

```javascript
// Custom validation function
validationEngine.customValidators['myValidator'] = async (field, value, adapter) => {
    // Your logic here
    if (someCondition) {
        return { valid: false, error: 'CUSTOM ERROR' };
    }
    return { valid: true };
};

// Use in field config
{
    display: {
        editable: true,
        validation: {
            custom: 'myValidator'
        }
    }
}
```

---

## ✅ Критерии успеха (обновлены)

### MVP (минимально жизнеспособный продукт)

- ✅ Все исходные критерии MVP (из IOBROKER-ADAPTER-ARCHITECTURE.md)
- ✅ Строка 14 в блокноте отображается корректно.
- ✅ Пользователи могут вводить значения с помощью клавиатуры.
- ✅ LSK вставляет значение из буфера временных данных в поле
- ✅ CLR очищает блокнот
- ✅ Базовая проверка (формат + диапазон)
- ✅ Визуальная обратная связь (зеленая/красная звездочка)

### Готов к производству

- ✅ Соответствует всем критериям MVP
- ✅ Полный конечный автомат (обычный → ввод → редактирование → подтверждение)
- ✅ Поведение копирования/вставки LSK (авиационный стандарт)
- ✅ Многоуровневая проверка (формат, диапазон, бизнес-логика)
- ✅ Редактирование индикаторов (скобки, цвета, стрелки)
- ✅ Диалоги подтверждения (мягкое и жесткое)
- ✅ Поддержка клавиш OVFY
- ✅ Все специальные клавиши (CLR, MENU, OVFY) работают.
- ✅ Обработка граничных случаев (тайм-ауты, разрывы соединения)
- ✅ Полная документация

### Лучший в своем классе

- ✅ Все критерии готовности к производству
- ✅ Автозаполнение текстовых полей
- ✅ История/отмена изменений для отредактированных значений
- ✅ Сочетания клавиш (двойное нажатие CLR и т. д.)
- ✅ Голосовая обратная связь (TTS для подтверждений)
- ✅ Расширенная проверка (зависимости между полями)
- ✅ Профили пользователей (различные правила проверки для каждого пользователя)

---

## 📚 Ссылки

**Оригинальная архитектура:**

- IOBROKER-ADAPTER-ARCHITECTURE.md (базовая архитектура)
- PHASE3A-SPEC.md (спецификация протокола MQTT)

**UX-дизайн:**

- ux-concept/UX-CONCEPT.md (полный набор шаблонов UX)
- ux-concept/MCDU-COCKPIT-RESEARCH.md (исследования в области MCDU в авиации)
- ux-concept/MCDU-SMARTHOME-MAPPING.md (картирование умного дома)

**Ресурсы ioBroker:**

- Документация по настройке JSON: <https://github.com/ioBroker/json-config>
- Руководство разработчика по адаптеру: <https://iobroker.github.io/dev-docs/>

---

## 🏁 Заключение

В этой модификации адаптер MCDU превращается из **простого контроллера с дисплеем и кнопками** в **полноценный интерфейс ввода, подобный тем, что используются в кабине пилота** :

**Достигнуто:**

- ✅ **Система ввода данных в блокноте** — редактирование на основе буфера, соответствующее авиационным стандартам.
- ✅ **Конечный автомат** — плавные переходы между режимами
- ✅ **LSK Копирование/Вставка** - Аутентичный шаблон взаимодействия MCDU
- ✅ **Многоуровневая проверка** — надежная проверка входных данных
- ✅ **Визуальная обратная связь** — четкие индикаторы для редактируемых полей
- ✅ **Система подтверждения** — мягкое и жесткое подтверждение для обеспечения безопасности

**Преимущества:**

- **Знакомо пилотам** — соответствует реальной мышечной памяти MCDU.
- **Эффективный ввод** — минимальное количество нажатий клавиш для выполнения распространенных задач.
- **Безопасная эксплуатация** — многоуровневая проверка предотвращает ошибки.
- **Профессиональный уровень комфорта** — пользовательский интерфейс авиационного класса в системе «умный дом».

**Следующие шаги:**

1. Проверка и утверждение изменений в архитектуре.
2. Интегрировать в IOBROKER-ADAPTER-ARCHITECTURE.md
3. Начало внедрения (Этап 1: Основы системы ввода)

**Ожидаемое время разработки:**

- Неделя 1: Основы систем ввода (черновик, конечный автомат)
- Неделя 2: Взаимодействие с LSK + валидация
- Неделя 3: Система подтверждения + доработка.
- **Итого: 3 недели до изготовления готового к производству адаптера с полной входной системой.**

---

**Версия документа:** 2.0\
&#x20;**Последнее обновление:** 16.02.2026\
&#x20;**Автор:** Феликс Хуммель\
&#x20;**Статус:** Готово к рассмотрению и внедрению.