---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# ioBroker MCDU Adapter - Architecture Revision with Authentic UX

**Version:** 2.0  
**Date:** 2026-02-16  
**Status:** Design Phase  
**Author:** Felix Hummel  
**Based on:** UX-CONCEPT.md (authentic MCDU cockpit patterns)

---

## 🎯 Revision Summary

This document extends **IOBROKER-ADAPTER-ARCHITECTURE.md** with **authentic cockpit UX patterns** from aviation MCDUs:

**Key Additions:**
1. **Scratchpad System** (Line 14 input buffer)
2. **Input Mode State Machine** (normal → input → edit)
3. **LSK Copy/Insert Behavior** (aviation-standard interaction)
4. **Keypad Event Handling** (0-9, A-Z, CLR, DEL, OVFY)
5. **Visual Feedback System** (brackets, color codes, validation)
6. **Multi-Level Validation** (keystroke → format → range → business logic)

**Why This Matters:**
- Provides **authentic aviation-grade input experience**
- Matches **muscle memory** of real MCDU users
- Enables **efficient data entry** without cursor/mouse
- Supports **complex workflows** (temperature control, scene editing, scheduling)

---

## 📐 Extended Data Model

### 1. Extended Runtime State

**Original (from IOBROKER-ADAPTER-ARCHITECTURE.md):**
```javascript
runtime: {
  currentPage: "nav-main",
  previousPage: null,
  mode: "normal"
}
```

**Revised (with Input System):**
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

### 2. Extended Line Configuration

**Original:**
```javascript
{
  row: 1,
  leftButton: { type: "navigation", action: "goto", target: "nav-pos", label: "POS" },
  display: { type: "datapoint", source: "simconnect.0.PLANE_LATITUDE", label: "LAT", format: "%.4f°" },
  rightButton: { type: "empty" }
}
```

**Revised (with Editable Fields):**
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

### 3. Extended Page Configuration

**Add Input Hints and Validation Messages:**
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

## 🔄 Input Mode State Machine

### State Diagram

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

### Mode Transitions (Code Logic)

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

## 🎹 Keypad Event Handling

### MQTT Topic Extension

**New Topic: `mcdu/buttons/keypad`**

**Payload:**
```json
{
  "key": "KEY_5",
  "state": "pressed",
  "deviceId": "mcdu-pi-1",
  "timestamp": 1708087234567
}
```

**Key Types:**
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

### Adapter Keypad Handler

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

## 🎨 Visual Feedback & Rendering

### 1. Editable Field Indicators

**Render Logic:**

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

### 2. Validation Feedback

**Error Display:**

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

**Success Feedback:**

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

### 3. Scratchpad Rendering (Line 14)

**Always Reserve Line 14:**

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

## 🔐 Multi-Level Validation

### Validation Hierarchy

**Level 1: Keystroke Validation (Client-Side, RasPi)**
- Rejects invalid characters immediately
- Example: Typing "A" in numeric field → rejected before reaching adapter
- Implementation: RasPi client filters based on field type

**Level 2: Format Validation (Adapter)**
- Checks format of complete scratchpad input
- Examples:
  - Numeric: `"22.5"` ✓ valid, `"22.5.5"` ❌ invalid
  - Time: `"08:30"` ✓ valid, `"25:99"` ❌ invalid
  - Text: Length constraints, allowed characters

**Level 3: Range Validation (Adapter)**
- Checks if value is within allowed range
- Examples:
  - Temperature: `22.5°C` in range [16-30] ✓
  - Temperature: `35°C` out of range ❌

**Level 4: Business Logic Validation (Adapter)**
- Complex rules based on system state
- Examples:
  - Cannot set heating target above cooling target
  - Cannot schedule event in the past
  - Cannot unlock door if alarm is armed

### Validation Implementation

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

## 🎭 Confirmation System

### Confirmation Levels

**Level 1: No Confirmation (Safe Actions)**
- Toggling lights
- Viewing information
- Navigating pages
- Adjusting temperature (within range)

**Level 2: Soft Confirmation (Disruptive Actions)**
- Activating scenes (multiple devices affected)
- Scheduling events
- Deleting items

**Level 3: Hard Confirmation (Critical Actions)**
- Disarming security alarm
- Unlocking doors
- Factory reset
- System shutdown

### Confirmation Dialog Structure

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

## 📊 Updated Implementation Checklist

### Phase 1: Input System Foundation (Week 1)

**Day 1-2: Extended Data Model**
- [ ] Add runtime state fields (scratchpad, selectedLine, mode)
- [ ] Extend line config with editable flags + validation rules
- [ ] Update io-package.json native structure
- [ ] Test object creation with new fields

**Day 3-4: Input Mode Manager**
- [ ] Create InputModeManager class
- [ ] Implement state machine (normal → input → edit)
- [ ] Add keypad event handling (0-9, A-Z)
- [ ] Add CLR key handling (context-aware)
- [ ] Test mode transitions

**Day 5-7: Scratchpad System**
- [ ] Implement scratchpad rendering (Line 14)
- [ ] Add character input to scratchpad
- [ ] Add validation feedback (green/red asterisk)
- [ ] Implement scratchpad clear (CLR)
- [ ] Test scratchpad display

**Deliverable:** Input system works, users can type in scratchpad

---

### Phase 2: LSK Interaction & Validation (Week 2)

**Day 8-9: LSK Copy/Insert Logic**
- [ ] Implement insertFromScratchpad (scratchpad → field)
- [ ] Implement copyToScratchpad (field → scratchpad)
- [ ] Add field selection highlighting
- [ ] Test LSK behavior in different modes

**Day 10-12: Validation Engine**
- [ ] Create ValidationEngine class
- [ ] Implement Level 2 (format validation)
- [ ] Implement Level 3 (range validation)
- [ ] Implement Level 4 (business logic validation)
- [ ] Add validation error display
- [ ] Test validation with various inputs

**Day 13-14: Visual Feedback**
- [ ] Add edit indicators (brackets, arrows, colors)
- [ ] Implement temporary success/error messages
- [ ] Add user-set value tracking (green highlight)
- [ ] Test visual feedback for all actions

**Deliverable:** Complete input flow works end-to-end

---

### Phase 3: Confirmation & Polish (Week 3)

**Day 15-16: Confirmation System**
- [ ] Create ConfirmationDialog class
- [ ] Implement soft confirmation (LSK or OVFY)
- [ ] Implement hard confirmation (OVFY only)
- [ ] Add confirmation dialog rendering
- [ ] Test confirmation flows

**Day 17-18: Special Keys**
- [ ] Implement OVFY key handling
- [ ] Add double-CLR emergency exit
- [ ] Add MENU key (always to HAUPTMENÜ)
- [ ] Test all special key behaviors

**Day 19-20: Edge Cases & Error Handling**
- [ ] Handle invalid state transitions
- [ ] Add timeout for edit mode (auto-cancel after 60s)
- [ ] Handle MQTT disconnects during input
- [ ] Add debug logging for state machine
- [ ] Test edge cases thoroughly

**Day 21: Documentation Update**
- [ ] Update adapter README with input system docs
- [ ] Create user guide for input patterns
- [ ] Document validation rules
- [ ] Add examples for common use cases

**Deliverable:** Production-ready input system

---

## 🎯 Testing Strategy

### Unit Tests

**Input Mode Manager:**
- State transitions (normal → input → edit → normal)
- Scratchpad management (append, clear, validate)
- LSK handling (copy vs insert)
- CLR key context-awareness

**Validation Engine:**
- Format validation (numeric, time, text)
- Range validation (min/max, step)
- Business logic validation (custom rules)
- Error message generation

**Visual Rendering:**
- Edit indicators (brackets, colors)
- Scratchpad display
- Temporary messages (success/error)

### Integration Tests

**End-to-End Input Flow:**
1. Navigate to editable field
2. Type value in scratchpad
3. Press LSK to insert
4. Verify value written to ioBroker state
5. Verify display updates with green highlight

**Validation Flow:**
1. Type invalid value (out of range)
2. Press LSK
3. Verify error message shown (red)
4. Verify scratchpad stays (not cleared)
5. Type valid value
6. Press LSK
7. Verify success

**Confirmation Flow:**
1. Trigger action requiring confirmation
2. Verify dialog shown
3. Press OVFY or LSK (JA)
4. Verify action executes
5. Verify return to normal page

### User Acceptance Tests

**Scenario 1: Set Thermostat**
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

**Scenario 2: Invalid Input (Out of Range)**
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

**Scenario 3: Edit Existing Value**
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

**Scenario 4: Scene Activation (Soft Confirmation)**
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

**Scenario 5: Alarm Disarm (Hard Confirmation)**
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

## 📖 Documentation Updates

### User Guide Additions

**Section: Input System**

**How to Edit Values:**

1. **Navigate** to the page with the value you want to change
2. **Identify** editable fields (shown with arrow `←` or brackets `[  ]`)
3. **Type** the new value on the keypad (0-9, decimal point)
   - Value appears in scratchpad (Line 14) with asterisk: `22.5*`
4. **Press LSK** next to the field
   - If valid: Value transfers, scratchpad clears, field turns green
   - If invalid: Error shown in red, scratchpad stays for correction
5. **Confirm** changes (if required for some actions)

**Scratchpad (Line 14):**
- Always visible at the bottom
- Shows typed input with asterisk: `22.5*`
- Green asterisk = valid input
- Red asterisk = invalid input
- Press CLR to clear scratchpad

**Special Keys:**
- **CLR**: Clear scratchpad OR go back (context-aware)
- **OVFY**: Confirm critical actions
- **MENU**: Return to main menu from anywhere

---

### Developer Documentation Additions

**API: Input Mode Manager**

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

**API: Validation Engine**

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

## ✅ Success Criteria (Updated)

### MVP (Minimum Viable Product)
- ✅ All original MVP criteria (from IOBROKER-ADAPTER-ARCHITECTURE.md)
- ✅ Scratchpad Line 14 renders correctly
- ✅ Users can type values on keypad
- ✅ LSK inserts scratchpad value into field
- ✅ CLR clears scratchpad
- ✅ Basic validation (format + range)
- ✅ Visual feedback (green/red asterisk)

### Production-Ready
- ✅ All MVP criteria
- ✅ Complete state machine (normal → input → edit → confirm)
- ✅ LSK copy/insert behavior (aviation-standard)
- ✅ Multi-level validation (format, range, business logic)
- ✅ Edit indicators (brackets, colors, arrows)
- ✅ Soft + hard confirmation dialogs
- ✅ OVFY key support
- ✅ All special keys (CLR, MENU, OVFY) working
- ✅ Edge case handling (timeouts, disconnects)
- ✅ Complete documentation

### Best-in-Class
- ✅ All production-ready criteria
- ✅ Auto-complete for text fields
- ✅ History/undo for edited values
- ✅ Keyboard shortcuts (double-CLR, etc.)
- ✅ Voice feedback (TTS for confirmations)
- ✅ Advanced validation (cross-field dependencies)
- ✅ User profiles (different validation rules per user)

---

## 📚 References

**Original Architecture:**
- IOBROKER-ADAPTER-ARCHITECTURE.md (base architecture)
- PHASE3A-SPEC.md (MQTT protocol specification)

**UX Design:**
- ux-concept/UX-CONCEPT.md (complete UX patterns)
- ux-concept/MCDU-COCKPIT-RESEARCH.md (aviation MCDU research)
- ux-concept/MCDU-SMARTHOME-MAPPING.md (smart home mapping)

**ioBroker Resources:**
- JSON Config Docs: https://github.com/ioBroker/json-config
- Adapter Dev Guide: https://iobroker.github.io/dev-docs/

---

## 🏁 Conclusion

This revision transforms the MCDU adapter from a **simple display/button controller** into an **authentic cockpit-grade input interface**:

**Achieved:**
- ✅ **Scratchpad Input System** - Aviation-standard buffer-based editing
- ✅ **State Machine** - Clean transitions between modes
- ✅ **LSK Copy/Insert** - Authentic MCDU interaction pattern
- ✅ **Multi-Level Validation** - Robust input checking
- ✅ **Visual Feedback** - Clear indicators for editable fields
- ✅ **Confirmation System** - Soft + hard confirmations for safety

**Benefits:**
- **Familiar to Pilots** - Matches real MCDU muscle memory
- **Efficient Input** - Minimal keystrokes for common tasks
- **Safe Operation** - Multi-level validation prevents errors
- **Professional Feel** - Aviation-grade UX in smart home

**Next Steps:**
1. Review and approve architecture revision
2. Integrate into IOBROKER-ADAPTER-ARCHITECTURE.md
3. Begin implementation (Phase 1: Input System Foundation)

**Expected Development Time:**
- Week 1: Input system foundation (scratchpad, state machine)
- Week 2: LSK interaction + validation
- Week 3: Confirmation system + polish
- **Total: 3 weeks to production-ready adapter with full input system**

---

**Document Version:** 2.0  
**Last Updated:** 2026-02-16  
**Author:** Felix Hummel  
**Status:** Ready for Review & Implementation