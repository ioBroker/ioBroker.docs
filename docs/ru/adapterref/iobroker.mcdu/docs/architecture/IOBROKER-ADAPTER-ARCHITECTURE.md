---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md
title: Спецификация архитектуры адаптера ioBroker MCDU
hash: 7eR3iOKDB75rTo+XZ+2zv2M0CeeVjPYF6N+fxKWuruk=
---
# Спецификация архитектуры адаптера ioBroker MCDU

**Версия:** 1.0\
&#x20;**Дата:** 16.02.2026\
&#x20;**Статус:** Этап проектирования\
&#x20;**Автор:** Феликс Хуммель (на основе исследования лучших практик ioBroker)

---

## 🎯 Краткое изложение

В этом документе описывается архитектура готового к производственному использованию адаптера ioBroker, который подключает оборудование WINWING MCDU к системе домашней автоматизации ioBroker через протокол MQTT.

**Основные характеристики:**

- ✅ **Гибкая система страниц:** иерархические страницы с настраиваемым содержимым
- ✅ **Интеллектуальная интеграция:** автоматическое обнаружение точек данных ioBroker
- ✅ **Система шаблонов:** готовые конфигурации страниц
- ✅ **Соответствует стандартам:** соответствует передовым методам работы адаптера ioBroker.
- ✅ **Готовность к использованию сообществом:** хорошо документирован, удобен в поддержке, пригоден для публикации.

**Архитектурный подход:** конфигурация в формате JSON с возможностью использования пользовательских компонентов.

**Срок разработки:** 2-3 недели до получения готового к производству адаптера.

---

## 📐 Системная архитектура

### Обзор компонентов

```
┌─────────────────────────────────────────────────────────────┐
│                     ioBroker System                          │
│                                                              │
│  ┌────────────────┐         ┌──────────────────┐           │
│  │  Admin UI      │────────▶│  MCDU Adapter    │           │
│  │  (JSON Config) │         │  (Node.js)       │           │
│  └────────────────┘         └──────────────────┘           │
│                                      │                       │
│                                      │ MQTT Client          │
└──────────────────────────────────────┼──────────────────────┘
                                       │
                                       │ MQTT Broker
                                       │ (YOUR_BROKER_IP:1883)
                                       │
                         ┌─────────────┴─────────────┐
                         │                           │
                    ┌────▼─────┐              ┌─────▼────┐
                    │ MCDU #1  │              │ MCDU #2  │
                    │ (RasPi)  │              │ (RasPi)  │
                    └──────────┘              └──────────┘
```

### Поток данных

**Обновления дисплея:**

```
ioBroker State Change → Adapter subscribes → Render page → 
MQTT publish (mcdu/display/render) → RasPi Client → MCDU Display
```

**События кнопок:**

```
MCDU Button Press → RasPi Client → MQTT publish (mcdu/buttons/event) → 
Adapter receives → Handle action → Update ioBroker State
```

---

## 🗂️ Модель данных

### 1. Структура конфигурации (собственная)

Хранится в`io-package.json` под`native` :

```javascript
{
  "native": {
    // Global Settings
    "mqtt": {
      "broker": "YOUR_BROKER_IP",
      "port": 1883,
      "username": "iobroker",
      "topicPrefix": "mcdu"
    },
    
    "display": {
      "columns": 24,
      "rows": 14,
      "defaultColor": "white"
    },
    
    // Page Definitions
    "pages": [
      {
        "id": "nav-main",           // Unique page ID
        "name": "Navigation",        // Display name
        "parent": null,              // Parent page ID (null = root)
        "icon": "navigation",        // Optional icon
        
        // 14 lines (rows) configuration
        "lines": [
          {
            "row": 1,                // Line number (1-14)
            
            // Left Button (LSK 1-6, every other line)
            "leftButton": {
              "type": "navigation",  // navigation | datapoint | empty
              "action": "goto",      // goto | toggle | increment
              "target": "nav-pos",   // Target page ID or state ID
              "label": "POS"         // Button label
            },
            
            // Display Content
            "display": {
              "type": "datapoint",   // datapoint | label | empty
              "source": "simconnect.0.PLANE_LATITUDE",  // State ID
              "label": "LAT",        // Prefix label
              "format": "%.4f°",     // sprintf-style format
              "unit": "°",           // Unit (auto-read from state)
              "color": "green",      // white|green|blue|amber|red|magenta|cyan|yellow
              "align": "left",       // left | center | right
              
              // Color thresholds (optional)
              "colorRules": [
                {"condition": "< 0", "color": "red"},
                {"condition": ">= 0", "color": "green"}
              ]
            },
            
            // Right Button (RSK 1-6, every other line)
            "rightButton": {
              "type": "datapoint",
              "action": "toggle",
              "target": "lights.0.living.main",
              "label": "LIGHT"
            }
          },
          
          // Lines 2-14 follow same structure
          // ...
        ]
      },
      
      // Additional pages
      {
        "id": "nav-pos",
        "name": "Position",
        "parent": "nav-main",  // Child of nav-main
        "lines": [...]
      }
    ],
    
    // Template Definitions
    "templates": {
      "enabled": true,
      "library": [
        {
          "id": "template-nav",
          "name": "Navigation Page",
          "category": "Aviation",
          "description": "GPS position, heading, altitude, speed",
          "preview": "base64-encoded-image",
          "config": {
            "pages": [
              // Pre-configured page structure
              // User customizes data sources after loading
            ]
          }
        }
      ]
    }
  }
}
```

### 2. Дерево объектов времени выполнения

Создано адаптером в базе данных объектов ioBroker:

```
mcdu.0
│
├── info/                          # Adapter info (auto-created)
│   ├── connection (state)         # MQTT connection status
│   └── devicesOnline (state)      # Number of connected MCDUs
│
├── devices/                       # Connected MCDU devices
│   ├── mcdu-pi-1/                 # Device ID from MQTT
│   │   ├── info (channel)
│   │   ├── online (state)         # Device online status
│   │   ├── lastSeen (state)       # Last heartbeat timestamp
│   │   └── buttons/ (channel)     # Button states for monitoring
│   │
│   └── mcdu-pi-2/
│       └── ...
│
├── pages/                         # Page definitions (from config)
│   ├── nav-main/ (channel)
│   │   ├── info (state)           # Page metadata
│   │   ├── active (state)         # Currently displayed?
│   │   └── lines/
│   │       ├── 1/ (channel)
│   │       │   ├── leftButton (state)
│   │       │   ├── display (state)
│   │       │   └── rightButton (state)
│   │       ├── 2/ (channel)
│   │       └── ...
│   │
│   └── nav-pos/ (channel)
│       └── ...
│
├── runtime/                       # Current state
│   ├── currentPage (state)        # Active page ID
│   ├── previousPage (state)       # For back navigation
│   ├── activeLine (state)         # Selected line (for input)
│   ├── keyBuffer (state)          # Keyboard input buffer
│   └── mode (state)               # normal | input | menu
│
└── control/                       # Control interface
    ├── switchPage (state)         # Write page ID to switch
    ├── goBack (state)             # Trigger: go to previous page
    └── refresh (state)            # Trigger: re-render display
```

### 3. Определения типов объектов

**Страница канала:**

```javascript
{
  type: 'channel',
  common: {
    name: 'Navigation',
    role: 'page'
  },
  native: {
    id: 'nav-main',
    parent: null,
    config: { /* page config from native.pages */ }
  }
}
```

**Состояние отображения строки:**

```javascript
{
  type: 'state',
  common: {
    name: 'Line 1 Display',
    type: 'string',
    role: 'text',
    read: true,
    write: false
  },
  native: {
    row: 1,
    config: { /* line display config */ }
  }
}
```

**Состояние кнопки:**

```javascript
{
  type: 'state',
  common: {
    name: 'Left Button 1',
    type: 'string',
    role: 'button',
    read: true,
    write: true  // Allow external triggering
  },
  native: {
    row: 1,
    side: 'left',
    config: { /* button config */ }
  }
}
```

---

## 🎨 Пользовательский интерфейс настройки (конфигурация в формате JSON)

### Структура файла jsonConfig.json

```json5
{
  "i18n": true,
  "type": "tabs",
  "items": {
    
    // Tab 1: General Settings
    "generalTab": {
      "type": "panel",
      "label": "General Settings",
      "icon": "settings",
      "items": {
        
        "mqttSettings": {
          "type": "panel",
          "label": "MQTT Connection",
          "items": {
            "mqtt.broker": {
              "type": "text",
              "label": "Broker Address",
              "default": "YOUR_BROKER_IP"
            },
            "mqtt.port": {
              "type": "number",
              "label": "Port",
              "default": 1883,
              "min": 1,
              "max": 65535
            },
            "mqtt.username": {
              "type": "text",
              "label": "Username"
            },
            "mqtt.password": {
              "type": "password",
              "label": "Password"
            }
          }
        },
        
        "displaySettings": {
          "type": "panel",
          "label": "Display Settings",
          "items": {
            "display.columns": {
              "type": "number",
              "label": "Columns",
              "default": 24,
              "disabled": true  // Fixed by hardware
            },
            "display.rows": {
              "type": "number",
              "label": "Rows",
              "default": 14,
              "disabled": true  // Fixed by hardware
            },
            "display.defaultColor": {
              "type": "select",
              "label": "Default Color",
              "options": [
                {"label": "White", "value": "white"},
                {"label": "Green", "value": "green"},
                {"label": "Blue", "value": "blue"},
                {"label": "Amber", "value": "amber"},
                {"label": "Red", "value": "red"},
                {"label": "Magenta", "value": "magenta"},
                {"label": "Cyan", "value": "cyan"},
                {"label": "Yellow", "value": "yellow"}
              ],
              "default": "white"
            }
          }
        }
      }
    },
    
    // Tab 2: Pages Configuration
    "pagesTab": {
      "type": "panel",
      "label": "Pages",
      "icon": "pages",
      "items": {
        
        // Template Loader
        "templatePanel": {
          "type": "panel",
          "label": "Templates",
          "items": {
            "selectedTemplate": {
              "type": "select",
              "label": "Load Template",
              "options": [
                {"label": "-- Select Template --", "value": ""},
                {"label": "Home Automation", "value": "home"},
                {"label": "Climate Control", "value": "climate"},
                {"label": "Lighting", "value": "lights"},
                {"label": "Energy Monitoring", "value": "energy"},
                {"label": "Security", "value": "security"},
                {"label": "Custom (Blank)", "value": "custom"}
              ]
            },
            "loadTemplateButton": {
              "type": "sendTo",
              "command": "loadTemplate",
              "jsonData": "{\"templateId\": \"${data.selectedTemplate}\"}",
              "variant": "contained",
              "label": "Load Template",
              "useNative": true,  // Auto-populate pages array
              "disabled": "${data.selectedTemplate === ''}"
            }
          }
        },
        
        // Pages Configuration (Accordion for collapsible pages)
        "pages": {
          "type": "accordion",
          "label": "MCDU Pages",
          "titleAttr": "name",  // Show page name in accordion header
          "clone": true,        // Enable duplicate button
          "items": {
            
            // Page Metadata
            "id": {
              "type": "text",
              "label": "Page ID",
              "placeholder": "nav-main",
              "pattern": "^[a-z0-9-]+$",
              "help": "Unique identifier (lowercase, hyphens only)"
            },
            "name": {
              "type": "text",
              "label": "Page Name",
              "placeholder": "Navigation"
            },
            "parent": {
              "type": "autocompleteSendTo",
              "label": "Parent Page",
              "command": "getPageList",
              "allowNonListValues": true,  // Allow manual entry
              "help": "Leave empty for root page"
            },
            "icon": {
              "type": "text",
              "label": "Icon",
              "placeholder": "navigation"
            },
            
            // Lines Configuration (Table for 14 lines)
            "lines": {
              "type": "table",
              "label": "Lines Configuration",
              "maxRows": 14,
              "items": [
                
                // Row Number
                {
                  "type": "number",
                  "attr": "row",
                  "title": "Row",
                  "width": "60px",
                  "min": 1,
                  "max": 14,
                  "default": 1
                },
                
                // Left Button Config
                {
                  "type": "panel",
                  "attr": "leftButton",
                  "title": "Left Button",
                  "width": "300px",
                  "items": {
                    "type": {
                      "type": "select",
                      "label": "Type",
                      "options": [
                        {"label": "Empty", "value": "empty"},
                        {"label": "Navigation", "value": "navigation"},
                        {"label": "Data Point", "value": "datapoint"}
                      ],
                      "default": "empty"
                    },
                    "label": {
                      "type": "text",
                      "label": "Label",
                      "hidden": "${data.leftButton.type === 'empty'}"
                    },
                    "action": {
                      "type": "select",
                      "label": "Action",
                      "options": [
                        {"label": "Go To", "value": "goto"},
                        {"label": "Toggle", "value": "toggle"},
                        {"label": "Increment", "value": "increment"},
                        {"label": "Decrement", "value": "decrement"}
                      ],
                      "hidden": "${data.leftButton.type === 'empty'}"
                    },
                    "target": {
                      "type": "objectId",
                      "label": "Target",
                      "types": ["state", "channel"],
                      "hidden": "${data.leftButton.type === 'empty'}"
                    }
                  }
                },
                
                // Display Config
                {
                  "type": "panel",
                  "attr": "display",
                  "title": "Display",
                  "width": "400px",
                  "items": {
                    "type": {
                      "type": "select",
                      "label": "Type",
                      "options": [
                        {"label": "Empty", "value": "empty"},
                        {"label": "Label (Static)", "value": "label"},
                        {"label": "Data Point", "value": "datapoint"}
                      ],
                      "default": "empty"
                    },
                    "label": {
                      "type": "text",
                      "label": "Label",
                      "hidden": "${data.display.type === 'empty'}"
                    },
                    "source": {
                      "type": "objectId",
                      "label": "Data Source",
                      "types": ["state"],
                      "hidden": "${data.display.type !== 'datapoint'}"
                    },
                    "format": {
                      "type": "text",
                      "label": "Format",
                      "placeholder": "%.2f",
                      "help": "sprintf-style format string",
                      "hidden": "${data.display.type !== 'datapoint'}"
                    },
                    "unit": {
                      "type": "text",
                      "label": "Unit",
                      "placeholder": "°C",
                      "help": "Auto-read from state if empty",
                      "hidden": "${data.display.type !== 'datapoint'}"
                    },
                    "color": {
                      "type": "select",
                      "label": "Color",
                      "options": [
                        {"label": "White", "value": "white"},
                        {"label": "Green", "value": "green"},
                        {"label": "Blue", "value": "blue"},
                        {"label": "Amber", "value": "amber"},
                        {"label": "Red", "value": "red"},
                        {"label": "Magenta", "value": "magenta"},
                        {"label": "Cyan", "value": "cyan"},
                        {"label": "Yellow", "value": "yellow"}
                      ],
                      "default": "white",
                      "hidden": "${data.display.type === 'empty'}"
                    },
                    "align": {
                      "type": "select",
                      "label": "Alignment",
                      "options": [
                        {"label": "Left", "value": "left"},
                        {"label": "Center", "value": "center"},
                        {"label": "Right", "value": "right"}
                      ],
                      "default": "left",
                      "hidden": "${data.display.type === 'empty'}"
                    },
                    
                    // Color Rules (Advanced)
                    "colorRules": {
                      "type": "table",
                      "label": "Color Rules",
                      "hidden": "${data.display.type !== 'datapoint'}",
                      "items": [
                        {
                          "type": "text",
                          "attr": "condition",
                          "title": "Condition",
                          "placeholder": "> 30"
                        },
                        {
                          "type": "select",
                          "attr": "color",
                          "title": "Color",
                          "options": ["white", "green", "blue", "amber", "red", "magenta", "cyan", "yellow"]
                        }
                      ]
                    }
                  }
                },
                
                // Right Button Config (same structure as leftButton)
                {
                  "type": "panel",
                  "attr": "rightButton",
                  "title": "Right Button",
                  "width": "300px",
                  "items": {
                    // Same structure as leftButton
                    // ... (omitted for brevity)
                  }
                }
              ]
            }
          }
        }
      }
    },
    
    // Tab 3: Devices
    "devicesTab": {
      "type": "panel",
      "label": "Devices",
      "icon": "devices",
      "items": {
        "devicesTable": {
          "type": "table",
          "label": "Connected MCDU Devices",
          "noAdd": true,      // Read-only, populated by adapter
          "noDelete": true,
          "items": [
            {"type": "text", "attr": "deviceId", "title": "Device ID", "width": "200px"},
            {"type": "text", "attr": "hostname", "title": "Hostname", "width": "150px"},
            {"type": "text", "attr": "ipAddress", "title": "IP Address", "width": "150px"},
            {"type": "text", "attr": "status", "title": "Status", "width": "100px"},
            {"type": "text", "attr": "lastSeen", "title": "Last Seen", "width": "200px"}
          ]
        }
      }
    },
    
    // Tab 4: Advanced
    "advancedTab": {
      "type": "panel",
      "label": "Advanced",
      "icon": "build",
      "items": {
        "debugSettings": {
          "type": "panel",
          "label": "Debug",
          "items": {
            "debug.enabled": {
              "type": "checkbox",
              "label": "Enable Debug Logging"
            },
            "debug.logMqtt": {
              "type": "checkbox",
              "label": "Log MQTT Messages"
            }
          }
        },
        
        "performanceSettings": {
          "type": "panel",
          "label": "Performance",
          "items": {
            "performance.renderThrottle": {
              "type": "number",
              "label": "Render Throttle (ms)",
              "default": 100,
              "min": 50,
              "max": 1000,
              "help": "Minimum time between display updates"
            },
            "performance.maxQueueSize": {
              "type": "number",
              "label": "Max Queue Size",
              "default": 100,
              "min": 10,
              "max": 1000
            }
          }
        }
      }
    }
  }
}
```

---

## 💻 Реализация бэкэнда (main.js)

### Структура класса адаптера

```javascript
'use strict';

const utils = require('@iobroker/adapter-core');
const mqtt = require('mqtt');
const sprintf = require('sprintf-js').sprintf;

class McduAdapter extends utils.Adapter {
    constructor(options) {
        super({
            ...options,
            name: 'mcdu',
        });
        
        this.mqttClient = null;
        this.pageCache = new Map();      // Cache rendered pages
        this.subscriptions = new Set();  // Track subscribed states
        this.deviceRegistry = new Map(); // Track connected devices
        
        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('message', this.onMessage.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }
    
    /**
     * Adapter startup
     */
    async onReady() {
        this.log.info('MCDU Adapter starting...');
        
        try {
            // 1. Setup object tree
            await this.setupObjects();
            
            // 2. Connect to MQTT broker
            await this.connectMqtt();
            
            // 3. Subscribe to data sources
            await this.subscribeToDataSources();
            
            // 4. Initialize runtime state
            await this.initializeRuntime();
            
            // 5. Render initial display
            await this.renderCurrentPage();
            
            this.log.info('MCDU Adapter ready!');
            
        } catch (error) {
            this.log.error(`Startup failed: ${error.message}`);
        }
    }
    
    /**
     * Setup ioBroker object tree
     */
    async setupObjects() {
        this.log.debug('Setting up object tree...');
        
        // Create info objects
        await this.setObjectNotExistsAsync('info.connection', {
            type: 'state',
            common: {
                name: 'MQTT Connection',
                type: 'boolean',
                role: 'indicator.connected',
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setObjectNotExistsAsync('info.devicesOnline', {
            type: 'state',
            common: {
                name: 'Devices Online',
                type: 'number',
                role: 'value',
                read: true,
                write: false,
                min: 0
            },
            native: {}
        });
        
        // Create page objects from config
        const pages = this.config.pages || [];
        for (const page of pages) {
            await this.createPageObjects(page);
        }
        
        // Create runtime objects
        await this.createRuntimeObjects();
        
        // Create control objects
        await this.createControlObjects();
    }
    
    /**
     * Create objects for a page
     */
    async createPageObjects(pageConfig) {
        const pageId = pageConfig.id;
        
        // Page channel
        await this.setObjectNotExistsAsync(`pages.${pageId}`, {
            type: 'channel',
            common: {
                name: pageConfig.name,
                role: 'page'
            },
            native: {
                id: pageId,
                parent: pageConfig.parent,
                config: pageConfig
            }
        });
        
        // Page info state
        await this.setObjectNotExistsAsync(`pages.${pageId}.info`, {
            type: 'state',
            common: {
                name: 'Page Info',
                type: 'object',
                role: 'json',
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setStateAsync(`pages.${pageId}.info`, {
            val: JSON.stringify({
                id: pageId,
                name: pageConfig.name,
                parent: pageConfig.parent,
                linesCount: pageConfig.lines?.length || 0
            }),
            ack: true
        });
        
        // Page active state
        await this.setObjectNotExistsAsync(`pages.${pageId}.active`, {
            type: 'state',
            common: {
                name: 'Page Active',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false
            },
            native: {}
        });
        
        // Create line objects
        const lines = pageConfig.lines || [];
        for (const line of lines) {
            await this.createLineObjects(pageId, line);
        }
    }
    
    /**
     * Create objects for a line
     */
    async createLineObjects(pageId, lineConfig) {
        const row = lineConfig.row;
        
        // Line channel
        await this.setObjectNotExistsAsync(`pages.${pageId}.lines.${row}`, {
            type: 'channel',
            common: {
                name: `Line ${row}`,
                role: 'line'
            },
            native: {
                row: row,
                config: lineConfig
            }
        });
        
        // Left button state
        if (lineConfig.leftButton && lineConfig.leftButton.type !== 'empty') {
            await this.setObjectNotExistsAsync(`pages.${pageId}.lines.${row}.leftButton`, {
                type: 'state',
                common: {
                    name: `Left Button ${row}`,
                    type: 'string',
                    role: 'button',
                    read: true,
                    write: true
                },
                native: {
                    side: 'left',
                    config: lineConfig.leftButton
                }
            });
        }
        
        // Display state
        await this.setObjectNotExistsAsync(`pages.${pageId}.lines.${row}.display`, {
            type: 'state',
            common: {
                name: `Display ${row}`,
                type: 'string',
                role: 'text',
                read: true,
                write: false
            },
            native: {
                config: lineConfig.display
            }
        });
        
        // Right button state
        if (lineConfig.rightButton && lineConfig.rightButton.type !== 'empty') {
            await this.setObjectNotExistsAsync(`pages.${pageId}.lines.${row}.rightButton`, {
                type: 'state',
                common: {
                    name: `Right Button ${row}`,
                    type: 'string',
                    role: 'button',
                    read: true,
                    write: true
                },
                native: {
                    side: 'right',
                    config: lineConfig.rightButton
                }
            });
        }
    }
    
    /**
     * Create runtime objects
     */
    async createRuntimeObjects() {
        await this.setObjectNotExistsAsync('runtime', {
            type: 'channel',
            common: { name: 'Runtime State' },
            native: {}
        });
        
        await this.setObjectNotExistsAsync('runtime.currentPage', {
            type: 'state',
            common: {
                name: 'Current Page',
                type: 'string',
                role: 'state',
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setObjectNotExistsAsync('runtime.previousPage', {
            type: 'state',
            common: {
                name: 'Previous Page',
                type: 'string',
                role: 'state',
                read: true,
                write: false
            },
            native: {}
        });
        
        await this.setObjectNotExistsAsync('runtime.mode', {
            type: 'state',
            common: {
                name: 'Mode',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
                states: {
                    'normal': 'Normal',
                    'input': 'Input',
                    'menu': 'Menu'
                }
            },
            native: {}
        });
    }
    
    /**
     * Create control objects
     */
    async createControlObjects() {
        await this.setObjectNotExistsAsync('control', {
            type: 'channel',
            common: { name: 'Control' },
            native: {}
        });
        
        await this.setObjectNotExistsAsync('control.switchPage', {
            type: 'state',
            common: {
                name: 'Switch Page',
                type: 'string',
                role: 'state',
                read: true,
                write: true
            },
            native: {}
        });
        
        this.subscribeStates('control.switchPage');
        
        await this.setObjectNotExistsAsync('control.goBack', {
            type: 'state',
            common: {
                name: 'Go Back',
                type: 'boolean',
                role: 'button',
                read: false,
                write: true
            },
            native: {}
        });
        
        this.subscribeStates('control.goBack');
        
        await this.setObjectNotExistsAsync('control.refresh', {
            type: 'state',
            common: {
                name: 'Refresh Display',
                type: 'boolean',
                role: 'button',
                read: false,
                write: true
            },
            native: {}
        });
        
        this.subscribeStates('control.refresh');
    }
    
    /**
     * Connect to MQTT broker
     */
    async connectMqtt() {
        return new Promise((resolve, reject) => {
            const mqttConfig = this.config.mqtt || {};
            const url = `mqtt://${mqttConfig.broker}:${mqttConfig.port}`;
            
            this.log.info(`Connecting to MQTT broker: ${url}`);
            
            const options = {
                username: mqttConfig.username,
                password: mqttConfig.password,
                clientId: `iobroker-mcdu-${this.instance}`,
                will: {
                    topic: `${mqttConfig.topicPrefix}/adapter/status`,
                    payload: 'offline',
                    qos: 1,
                    retain: true
                }
            };
            
            this.mqttClient = mqtt.connect(url, options);
            
            this.mqttClient.on('connect', async () => {
                this.log.info('MQTT connected!');
                await this.setStateAsync('info.connection', true, true);
                
                // Subscribe to MQTT topics
                const prefix = mqttConfig.topicPrefix || 'mcdu';
                this.mqttClient.subscribe(`${prefix}/buttons/event`, { qos: 1 });
                this.mqttClient.subscribe(`${prefix}/status/online`, { qos: 0 });
                
                // Publish adapter online status
                this.mqttClient.publish(
                    `${prefix}/adapter/status`,
                    'online',
                    { qos: 1, retain: true }
                );
                
                resolve();
            });
            
            this.mqttClient.on('message', this.handleMqttMessage.bind(this));
            
            this.mqttClient.on('error', (error) => {
                this.log.error(`MQTT error: ${error.message}`);
                this.setStateAsync('info.connection', false, true);
                reject(error);
            });
            
            this.mqttClient.on('close', () => {
                this.log.warn('MQTT connection closed');
                this.setStateAsync('info.connection', false, true);
            });
        });
    }
    
    /**
     * Handle incoming MQTT messages
     */
    handleMqttMessage(topic, message) {
        const topicPrefix = this.config.mqtt?.topicPrefix || 'mcdu';
        
        try {
            if (topic === `${topicPrefix}/buttons/event`) {
                const event = JSON.parse(message.toString());
                this.handleButtonEvent(event);
            }
            else if (topic === `${topicPrefix}/status/online`) {
                const status = JSON.parse(message.toString());
                this.handleDeviceStatus(status);
            }
        } catch (error) {
            this.log.error(`Failed to handle MQTT message: ${error.message}`);
        }
    }
    
    /**
     * Handle button press events
     */
    async handleButtonEvent(event) {
        this.log.debug(`Button event: ${JSON.stringify(event)}`);
        
        const { button, state, deviceId } = event;
        
        if (state !== 'pressed') return;  // Only handle press, not release
        
        // Get current page
        const currentPageState = await this.getStateAsync('runtime.currentPage');
        const currentPageId = currentPageState?.val;
        
        if (!currentPageId) {
            this.log.warn('No current page set');
            return;
        }
        
        // Find page config
        const pageConfig = this.config.pages.find(p => p.id === currentPageId);
        if (!pageConfig) {
            this.log.error(`Page config not found: ${currentPageId}`);
            return;
        }
        
        // Map button to line (LSK1 = line 1/2, LSK2 = line 3/4, etc.)
        let lineConfig, buttonConfig, side;
        
        if (button.startsWith('LSK')) {
            side = 'left';
            const lskNum = parseInt(button.substring(3));
            const row = (lskNum * 2) - 1;  // LSK1 -> row 1, LSK2 -> row 3, etc.
            lineConfig = pageConfig.lines.find(l => l.row === row);
            buttonConfig = lineConfig?.leftButton;
        }
        else if (button.startsWith('RSK')) {
            side = 'right';
            const rskNum = parseInt(button.substring(3));
            const row = (rskNum * 2) - 1;  // RSK1 -> row 1, RSK2 -> row 3, etc.
            lineConfig = pageConfig.lines.find(l => l.row === row);
            buttonConfig = lineConfig?.rightButton;
        }
        
        if (!buttonConfig || buttonConfig.type === 'empty') {
            this.log.debug(`Button not configured: ${button}`);
            return;
        }
        
        // Execute button action
        await this.executeButtonAction(buttonConfig);
    }
    
    /**
     * Execute button action
     */
    async executeButtonAction(buttonConfig) {
        const { type, action, target } = buttonConfig;
        
        try {
            if (type === 'navigation' && action === 'goto') {
                // Switch to target page
                await this.switchToPage(target);
            }
            else if (type === 'datapoint') {
                if (action === 'toggle') {
                    // Toggle boolean state
                    const state = await this.getForeignStateAsync(target);
                    await this.setForeignStateAsync(target, !state?.val);
                }
                else if (action === 'increment') {
                    // Increment numeric state
                    const state = await this.getForeignStateAsync(target);
                    const newVal = (parseFloat(state?.val) || 0) + 1;
                    await this.setForeignStateAsync(target, newVal);
                }
                else if (action === 'decrement') {
                    // Decrement numeric state
                    const state = await this.getForeignStateAsync(target);
                    const newVal = (parseFloat(state?.val) || 0) - 1;
                    await this.setForeignStateAsync(target, newVal);
                }
            }
        } catch (error) {
            this.log.error(`Failed to execute button action: ${error.message}`);
        }
    }
    
    /**
     * Switch to a different page
     */
    async switchToPage(pageId) {
        this.log.info(`Switching to page: ${pageId}`);
        
        // Store previous page for back navigation
        const currentPageState = await this.getStateAsync('runtime.currentPage');
        const previousPage = currentPageState?.val;
        
        if (previousPage) {
            await this.setStateAsync('runtime.previousPage', previousPage, true);
            await this.setStateAsync(`pages.${previousPage}.active`, false, true);
        }
        
        // Set new page
        await this.setStateAsync('runtime.currentPage', pageId, true);
        await this.setStateAsync(`pages.${pageId}.active`, true, true);
        
        // Clear page cache to force re-render
        this.pageCache.delete(pageId);
        
        // Render new page
        await this.renderCurrentPage();
    }
    
    /**
     * Handle device online/offline status
     */
    async handleDeviceStatus(status) {
        const { deviceId, online, hostname, ipAddress } = status;
        
        this.log.debug(`Device ${deviceId}: ${online ? 'online' : 'offline'}`);
        
        if (online) {
            this.deviceRegistry.set(deviceId, {
                deviceId,
                hostname,
                ipAddress,
                lastSeen: Date.now()
            });
            
            // Create device objects
            await this.setObjectNotExistsAsync(`devices.${deviceId}`, {
                type: 'channel',
                common: { name: hostname || deviceId },
                native: { deviceId, hostname, ipAddress }
            });
            
            await this.setObjectNotExistsAsync(`devices.${deviceId}.online`, {
                type: 'state',
                common: {
                    name: 'Online',
                    type: 'boolean',
                    role: 'indicator.connected',
                    read: true,
                    write: false
                },
                native: {}
            });
            
            await this.setStateAsync(`devices.${deviceId}.online`, true, true);
        }
        else {
            this.deviceRegistry.delete(deviceId);
            await this.setStateAsync(`devices.${deviceId}.online`, false, true);
        }
        
        // Update devices online count
        await this.setStateAsync('info.devicesOnline', this.deviceRegistry.size, true);
    }
    
    /**
     * Subscribe to all data sources configured in pages
     */
    async subscribeToDataSources() {
        this.log.debug('Subscribing to data sources...');
        
        const pages = this.config.pages || [];
        for (const page of pages) {
            const lines = page.lines || [];
            for (const line of lines) {
                // Subscribe to display data source
                if (line.display?.type === 'datapoint' && line.display.source) {
                    const stateId = line.display.source;
                    if (!this.subscriptions.has(stateId)) {
                        this.subscribeForeignStates(stateId);
                        this.subscriptions.add(stateId);
                        this.log.debug(`Subscribed to: ${stateId}`);
                    }
                }
                
                // Subscribe to button target (for monitoring)
                if (line.leftButton?.target && line.leftButton.type === 'datapoint') {
                    const stateId = line.leftButton.target;
                    if (!this.subscriptions.has(stateId)) {
                        this.subscribeForeignStates(stateId);
                        this.subscriptions.add(stateId);
                    }
                }
                
                if (line.rightButton?.target && line.rightButton.type === 'datapoint') {
                    const stateId = line.rightButton.target;
                    if (!this.subscriptions.has(stateId)) {
                        this.subscribeForeignStates(stateId);
                        this.subscriptions.add(stateId);
                    }
                }
            }
        }
        
        this.log.info(`Subscribed to ${this.subscriptions.size} data sources`);
    }
    
    /**
     * Initialize runtime state
     */
    async initializeRuntime() {
        // Set first page as current if not already set
        const currentPageState = await this.getStateAsync('runtime.currentPage');
        if (!currentPageState || !currentPageState.val) {
            const firstPage = this.config.pages?.[0];
            if (firstPage) {
                await this.setStateAsync('runtime.currentPage', firstPage.id, true);
                await this.setStateAsync(`pages.${firstPage.id}.active`, true, true);
            }
        }
        
        // Set initial mode
        await this.setStateAsync('runtime.mode', 'normal', true);
    }
    
    /**
     * State change handler
     */
    async onStateChange(id, state) {
        if (!state || state.ack) return;
        
        // Handle control states
        if (id === `${this.namespace}.control.switchPage`) {
            await this.switchToPage(state.val);
            await this.setStateAsync('control.switchPage', state.val, true);
        }
        else if (id === `${this.namespace}.control.goBack`) {
            const previousPageState = await this.getStateAsync('runtime.previousPage');
            if (previousPageState?.val) {
                await this.switchToPage(previousPageState.val);
            }
            await this.setStateAsync('control.goBack', false, true);
        }
        else if (id === `${this.namespace}.control.refresh`) {
            await this.renderCurrentPage();
            await this.setStateAsync('control.refresh', false, true);
        }
        
        // Handle data source changes
        if (this.subscriptions.has(id)) {
            // Re-render current page
            await this.renderCurrentPage();
        }
    }
    
    /**
     * Render current page and send to MCDU
     */
    async renderCurrentPage() {
        const currentPageState = await this.getStateAsync('runtime.currentPage');
        const currentPageId = currentPageState?.val;
        
        if (!currentPageId) {
            this.log.warn('No current page to render');
            return;
        }
        
        // Check cache
        const cacheKey = currentPageId;
        const now = Date.now();
        const renderThrottle = this.config.performance?.renderThrottle || 100;
        
        if (this.pageCache.has(cacheKey)) {
            const cached = this.pageCache.get(cacheKey);
            if (now - cached.timestamp < renderThrottle) {
                this.log.debug('Using cached page render');
                return;
            }
        }
        
        // Find page config
        const pageConfig = this.config.pages.find(p => p.id === currentPageId);
        if (!pageConfig) {
            this.log.error(`Page config not found: ${currentPageId}`);
            return;
        }
        
        // Render page
        const lines = [];
        const colors = [];
        
        for (let row = 1; row <= 14; row++) {
            const lineConfig = pageConfig.lines.find(l => l.row === row);
            
            if (!lineConfig || !lineConfig.display || lineConfig.display.type === 'empty') {
                lines.push('');
                colors.push('white');
                continue;
            }
            
            const display = lineConfig.display;
            let content = '';
            let color = display.color || 'white';
            
            if (display.type === 'label') {
                // Static label
                content = display.label || '';
            }
            else if (display.type === 'datapoint') {
                // Dynamic data point
                const state = await this.getForeignStateAsync(display.source);
                const value = state?.val;
                
                // Format value
                let formattedValue = '';
                if (value !== null && value !== undefined) {
                    if (display.format) {
                        try {
                            formattedValue = sprintf(display.format, value);
                        } catch (error) {
                            this.log.error(`Format error: ${error.message}`);
                            formattedValue = String(value);
                        }
                    } else {
                        formattedValue = String(value);
                    }
                }
                
                // Apply color rules
                if (display.colorRules && display.colorRules.length > 0) {
                    for (const rule of display.colorRules) {
                        if (this.evaluateCondition(value, rule.condition)) {
                            color = rule.color;
                            break;
                        }
                    }
                }
                
                // Build content with label
                const label = display.label || '';
                const unit = display.unit || '';
                content = `${label}${label ? ' ' : ''}${formattedValue}${unit}`;
                
                // Apply alignment
                const columns = this.config.display?.columns || 24;
                content = this.alignText(content, display.align || 'left', columns);
            }
            
            lines.push(content);
            colors.push(color);
            
            // Update line display state
            await this.setStateAsync(`pages.${currentPageId}.lines.${row}.display`, content, true);
        }
        
        // Send to MCDU via MQTT
        const topicPrefix = this.config.mqtt?.topicPrefix || 'mcdu';
        
        const payload = {
            lines: lines,
            colors: colors,
            timestamp: now
        };
        
        this.mqttClient.publish(
            `${topicPrefix}/display/render`,
            JSON.stringify(payload),
            { qos: 1 }
        );
        
        // Update cache
        this.pageCache.set(cacheKey, {
            timestamp: now,
            content: lines
        });
        
        this.log.debug(`Rendered page: ${currentPageId}`);
    }
    
    /**
     * Evaluate a condition expression
     */
    evaluateCondition(value, condition) {
        try {
            // Simple expression evaluation
            // Examples: "> 30", "<= 0", "== true"
            const match = condition.match(/^([<>=!]+)\s*(.+)$/);
            if (!match) return false;
            
            const operator = match[1];
            const threshold = parseFloat(match[2]) || match[2];
            
            switch (operator) {
                case '>': return value > threshold;
                case '>=': return value >= threshold;
                case '<': return value < threshold;
                case '<=': return value <= threshold;
                case '==': return value == threshold;
                case '!=': return value != threshold;
                default: return false;
            }
        } catch (error) {
            this.log.error(`Condition evaluation error: ${error.message}`);
            return false;
        }
    }
    
    /**
     * Align text within column width
     */
    alignText(text, align, width) {
        if (text.length >= width) return text.substring(0, width);
        
        const padding = width - text.length;
        
        if (align === 'center') {
            const leftPad = Math.floor(padding / 2);
            const rightPad = padding - leftPad;
            return ' '.repeat(leftPad) + text + ' '.repeat(rightPad);
        }
        else if (align === 'right') {
            return ' '.repeat(padding) + text;
        }
        else {
            // left (default)
            return text + ' '.repeat(padding);
        }
    }
    
    /**
     * Message handler (sendTo commands)
     */
    onMessage(obj) {
        if (typeof obj === 'object' && obj.command) {
            switch (obj.command) {
                case 'loadTemplate':
                    this.handleLoadTemplate(obj);
                    break;
                case 'getPageList':
                    this.handleGetPageList(obj);
                    break;
                case 'discoverDataPoints':
                    this.handleDiscoverDataPoints(obj);
                    break;
                default:
                    this.log.warn(`Unknown command: ${obj.command}`);
                    this.sendTo(obj.from, obj.command, { error: 'Unknown command' }, obj.callback);
            }
        }
    }
    
    /**
     * Handle loadTemplate command
     */
    handleLoadTemplate(obj) {
        const templateId = obj.message?.templateId || obj.message;
        
        this.log.info(`Loading template: ${templateId}`);
        
        const templates = this.getTemplates();
        const template = templates[templateId];
        
        if (template) {
            this.sendTo(obj.from, obj.command, { pages: template.pages }, obj.callback);
        } else {
            this.sendTo(obj.from, obj.command, { error: 'Template not found' }, obj.callback);
        }
    }
    
    /**
     * Handle getPageList command
     */
    handleGetPageList(obj) {
        const pages = this.config.pages || [];
        const pageList = pages.map(p => ({
            label: p.name,
            value: p.id
        }));
        
        this.sendTo(obj.from, obj.command, pageList, obj.callback);
    }
    
    /**
     * Handle discoverDataPoints command
     */
    async handleDiscoverDataPoints(obj) {
        const category = obj.message?.category;
        
        this.log.info(`Discovering data points: ${category || 'all'}`);
        
        try {
            // Define search patterns per category
            const patterns = {
                temperature: ['*.temperature', '*.temp', '*.TEMPERATURE'],
                humidity: ['*.humidity', '*.HUMIDITY'],
                light: ['*.light*', '*.lamp*', '*.LIGHT*'],
                switch: ['*.switch*', '*.SWITCH*'],
                sensor: ['*.sensor*', '*.SENSOR*'],
                all: ['*']
            };
            
            const searchPatterns = patterns[category] || patterns.all;
            const results = [];
            
            for (const pattern of searchPatterns) {
                const objects = await this.getForeignObjectsAsync(pattern, 'state');
                for (const [id, obj] of Object.entries(objects)) {
                    if (obj && obj.common) {
                        results.push({
                            value: id,
                            label: obj.common.name || id,
                            unit: obj.common.unit || '',
                            type: obj.common.type || 'mixed',
                            role: obj.common.role || ''
                        });
                    }
                }
            }
            
            // Remove duplicates
            const unique = results.filter((item, index, self) =>
                index === self.findIndex(t => t.value === item.value)
            );
            
            this.sendTo(obj.from, obj.command, unique, obj.callback);
            
        } catch (error) {
            this.log.error(`Discovery error: ${error.message}`);
            this.sendTo(obj.from, obj.command, { error: error.message }, obj.callback);
        }
    }
    
    /**
     * Get available templates
     */
    getTemplates() {
        return {
            'home': {
                pages: [
                    {
                        id: 'home-main',
                        name: 'Home',
                        parent: null,
                        lines: [
                            {
                                row: 1,
                                leftButton: { type: 'navigation', action: 'goto', target: 'lights', label: 'LIGHTS' },
                                display: { type: 'label', label: 'HOME AUTOMATION', color: 'green' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 3,
                                leftButton: { type: 'navigation', action: 'goto', target: 'climate', label: 'CLIMATE' },
                                display: { type: 'label', label: 'Climate Control' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 5,
                                leftButton: { type: 'navigation', action: 'goto', target: 'security', label: 'SECURITY' },
                                display: { type: 'label', label: 'Security System' },
                                rightButton: { type: 'empty' }
                            }
                        ]
                    }
                ]
            },
            
            'climate': {
                pages: [
                    {
                        id: 'climate-main',
                        name: 'Climate',
                        parent: null,
                        lines: [
                            {
                                row: 1,
                                leftButton: { type: 'empty' },
                                display: { type: 'label', label: 'CLIMATE CONTROL', color: 'green' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 3,
                                leftButton: { type: 'empty' },
                                display: { type: 'datapoint', label: 'Living Room:', source: '', format: '%.1f', unit: '°C' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 5,
                                leftButton: { type: 'empty' },
                                display: { type: 'datapoint', label: 'Bedroom:', source: '', format: '%.1f', unit: '°C' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 7,
                                leftButton: { type: 'empty' },
                                display: { type: 'datapoint', label: 'Outside:', source: '', format: '%.1f', unit: '°C' },
                                rightButton: { type: 'empty' }
                            }
                        ]
                    }
                ]
            },
            
            'lights': {
                pages: [
                    {
                        id: 'lights-main',
                        name: 'Lighting',
                        parent: null,
                        lines: [
                            {
                                row: 1,
                                leftButton: { type: 'datapoint', action: 'toggle', target: '', label: 'LIVING' },
                                display: { type: 'datapoint', label: 'Living Room', source: '' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 3,
                                leftButton: { type: 'datapoint', action: 'toggle', target: '', label: 'KITCHEN' },
                                display: { type: 'datapoint', label: 'Kitchen', source: '' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 5,
                                leftButton: { type: 'datapoint', action: 'toggle', target: '', label: 'BEDROOM' },
                                display: { type: 'datapoint', label: 'Bedroom', source: '' },
                                rightButton: { type: 'empty' }
                            }
                        ]
                    }
                ]
            },
            
            'energy': {
                pages: [
                    {
                        id: 'energy-main',
                        name: 'Energy',
                        parent: null,
                        lines: [
                            {
                                row: 1,
                                leftButton: { type: 'empty' },
                                display: { type: 'label', label: 'ENERGY MONITORING', color: 'green' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 3,
                                leftButton: { type: 'empty' },
                                display: { type: 'datapoint', label: 'Solar:', source: '', format: '%.0f', unit: 'W' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 5,
                                leftButton: { type: 'empty' },
                                display: { type: 'datapoint', label: 'Grid:', source: '', format: '%.0f', unit: 'W' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 7,
                                leftButton: { type: 'empty' },
                                display: { type: 'datapoint', label: 'Battery:', source: '', format: '%.0f', unit: '%' },
                                rightButton: { type: 'empty' }
                            }
                        ]
                    }
                ]
            },
            
            'security': {
                pages: [
                    {
                        id: 'security-main',
                        name: 'Security',
                        parent: null,
                        lines: [
                            {
                                row: 1,
                                leftButton: { type: 'empty' },
                                display: { type: 'label', label: 'SECURITY SYSTEM', color: 'green' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 3,
                                leftButton: { type: 'datapoint', action: 'toggle', target: '', label: 'ARM' },
                                display: { type: 'datapoint', label: 'System:', source: '' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 5,
                                leftButton: { type: 'empty' },
                                display: { type: 'datapoint', label: 'Front Door:', source: '' },
                                rightButton: { type: 'empty' }
                            },
                            {
                                row: 7,
                                leftButton: { type: 'empty' },
                                display: { type: 'datapoint', label: 'Back Door:', source: '' },
                                rightButton: { type: 'empty' }
                            }
                        ]
                    }
                ]
            },
            
            'custom': {
                pages: [
                    {
                        id: 'custom-page',
                        name: 'Custom Page',
                        parent: null,
                        lines: []
                    }
                ]
            }
        };
    }
    
    /**
     * Cleanup on adapter stop
     */
    onUnload(callback) {
        try {
            this.log.info('Cleaning up...');
            
            // Disconnect MQTT
            if (this.mqttClient) {
                const topicPrefix = this.config.mqtt?.topicPrefix || 'mcdu';
                this.mqttClient.publish(
                    `${topicPrefix}/adapter/status`,
                    'offline',
                    { qos: 1, retain: true }
                );
                this.mqttClient.end();
            }
            
            callback();
        } catch (e) {
            callback();
        }
    }
}

// Export adapter
if (require.main !== module) {
    module.exports = (options) => new McduAdapter(options);
} else {
    new McduAdapter();
}
```

---

## 🔄 Система шаблонов

### Структура шаблона

Шаблоны — это предварительно настроенные структуры страниц, которые пользователи могут загружать и настраивать:

**Встроенные шаблоны:**

- `home` - Обзор системы домашней автоматизации с навигацией по подстраницам.
- `climate` - Контроль температуры и управление термостатом
- `lights` - Выключатели света с тумблерными кнопками
- `energy` - Мониторинг солнечной энергии/сети/аккумуляторов
- `security` - Сигнализация и дверные датчики
- `custom` — Пустая страница для ручной настройки

**Процесс загрузки шаблонов:**

1. Пользователь выбирает шаблон из выпадающего списка.
2. Нажимает кнопку «Загрузить шаблон».
3. Адаптер принимает`sendTo` команда
4. Возвращает предварительно настроенную структуру страницы.
5. JSON Config автоматически заполняет форму (`useNative: true` )
6. Пользователь настраивает источники данных
7. Сохраняет конфигурацию

**Настройка шаблона:**

- Пользователи могут изменять метки, цвета и выравнивание.
- Замените источники данных-заполнители на фактические состояния ioBroker.
- Добавить/удалить строки
- Изменить действия кнопок
- Клонируйте страницы для создания похожих макетов.

---

## 🚀 План реализации

### Этап 1: Основы (Неделя 1)

**День 1-2: Подготовка проекта**

- [ ] Создайте структуру адаптера с помощью`npx @iobroker/create-adapter`
- [ ] Настройка`io-package.json` (adminUI, нативная структура)
- [ ] Создать базовый`main.js` скелет
- [ ] Настройка MQTT-соединения

**День 3-4: Структура объекта**

- [ ] Осуществлять`setupObjects()` метод
- [ ] Создайте логику для создания объектов страниц/строк.
- [ ] Создание объектов среды выполнения/управления
- [ ] Создание дерева тестовых объектов

**День 5-7: Пользовательский интерфейс настройки**

- [ ] Создавать`jsonConfig.json` структура
- [ ] Добавить страницы в аккордеон с таблицей
- [ ] Добавить панель общих настроек
- [ ] Вкладка «Добавить устройства»
- [ ] Тестовый административный интерфейс

**Результат:** Адаптер устанавливается и отображает пользовательский интерфейс конфигурации.

---

### Этап 2: Основные функции (Неделя 2)

**День 8-9: Интеграция данных**

- [ ] Осуществлять`subscribeToDataSources()`
- [ ] Добавить обработчик изменения состояния
- [ ] Реализовать автоматическое обнаружение точек данных.
- [ ] Тестирование подписок на состояние

**День 10-12: Отображение результатов**

- [ ] Осуществлять`renderCurrentPage()` метод
- [ ] Добавить форматирование текста (sprintf)
- [ ] Добавить оценку правил цвета
- [ ] Добавить логику выравнивания
- [ ] Тестирование обновлений дисплея MQTT

**День 13-14: Работа с кнопками**

- [ ] Осуществлять`handleButtonEvent()` метод
- [ ] Добавить сопоставление кнопки и строки
- [ ] Добавить выполнение действий (навигация, переключение, увеличение).
- [ ] Протестируйте сквозной процесс нажатия кнопок.

**Результат работы:** Функциональный адаптер с работающим дисплеем и кнопками.

---

### Этап 3: Польский язык (3-я неделя)

**День 15-16: Система шаблонов**

- [ ] Осуществлять`getTemplates()` метод
- [ ] Добавлять`loadTemplate` обработчик сообщений
- [ ] Создайте 5-6 встроенных шаблонов.
- [ ] Загрузка тестового шаблона

**День 17-18: Управление устройствами**

- [ ] Добавить отслеживание в реестре устройств
- [ ] Добавить обработку состояния устройства
- [ ] Вкладка «Обновить устройства» в административном интерфейсе.
- [ ] Проверка поддержки нескольких устройств

**День 19-20: Обработка ошибок и тестирование**

- [ ] Добавить проверку входных данных
- [ ] Добавить функцию восстановления после ошибок
- [ ] Добавить отладочное логирование
- [ ] Сквозное тестирование

**День 21: Документирование**

- [ ] Напишите файл README.md
- [ ] Создать руководство пользователя
- [ ] система шаблонов документов
- [ ] Добавить комментарии к коду

**Результат:** Адаптер, готовый к производству.

---

### Этап 4: Дополнительные опции (с 4-й недели)

**Пользовательский компонент React:**

- Предварительный показ MCDU в прямом эфире
- Визуальный линейный монтаж
- Источники данных, перетаскиваемые мышью.
- Тестовый режим с примерами данных

**Расширенные возможности:**

- История страниц/хлебные крошки
- Режим ввода (ввод с клавиатуры)
- Пользовательские фоны страниц
- поддержка анимации

---

## 📊 Стратегия тестирования

### Модульные тесты

- Логика создания объекта
- Форматирование и выравнивание текста
- Оценка правил цветового оформления
- Анализ условий

### Интеграционные тесты

- Подключение по протоколу MQTT и обработка сообщений
- Государственная подписка и обновления
- Обработка событий нажатия кнопки
- Отображение страницы

### Сквозные тесты

1. Установите адаптер
2. Настройка MQTT-соединения
3. Загрузить шаблон
4. Настройка источников данных
5. Сохранение конфигурации
6. Подключите устройство MCDU
7. Проверка нажатий кнопок
8. Проверьте обновления дисплея.
9. Тестовая навигация по страницам
10. Тестирование многоустройственной конфигурации

---

## 🔧 Рекомендации по техническому обслуживанию

### Организация кода

- **main.js** - Логика адаптера (\~1000 строк)
- **lib/templates.js** — Определения шаблонов (отдельный файл)
- **lib/formatter.js** — утилиты для форматирования текста
- **lib/mqtt-handler.js** - Обработка протокола MQTT

### Стратегия лесозаготовки

- **info** - События жизненного цикла (запуск, подключение, ошибки)
- **debug** - Подробная информация о работе (рендеринг, подписки, сообщения)
- **Предупреждение** — Устранимые проблемы (отсутствует конфигурация, разрывы соединения)
- **Ошибка** — Критические сбои (потеря соединения, неверная конфигурация)

### Вопросы производительности

- **Регулировка скорости рендеринга** — максимум 10 обновлений в секунду (настраивается).
- **Кэширование страниц** — кэширование отрендеренного контента на 100 мс.
- **Пакетная обработка состояний** — объединение нескольких изменений состояния в один рендер.
- **MQTT QoS** — используйте QoS 1 для команд, QoS 0 для статуса.

---

## 🌟 Будущие расширения

### Возможные улучшения

**1. Расширенные режимы отображения**

- Полноэкранные уведомления (оповещения, сообщения)
- Блок-схемы (поток энергии, поток воды)
- Диаграммы/графики (тенденции изменения температуры)
- Пользовательские ASCII-изображения

**2. Режим ввода**

- Ввод данных с цифровой клавиатуры для термостатов
- Текстовое поле для ввода меток
- Списки выбора (выпадающие меню)

**3. Поддержка скриптов**

- Выражения JavaScript в действиях кнопок
- Условное форматирование отображения
- Пользовательская логика рендеринга

**4. Интеграция голосовых функций**

- Озвучивание текста
- Ввод голосовых команд

**5. Поддержка нескольких пользователей**

- Профили пользователей с различными наборами страниц.
- Контроль доступа на каждой странице
- Журналирование активности

**6. Синхронизация с облаком**

- Резервное копирование/восстановление конфигураций
- Делитесь шаблонами с сообществом
- Удаленный доступ через облако ioBroker

---

## 📚 Требования к документации

### Пользовательская документация

1. **Инструкция по установке**
   - Предварительные требования
   - Этапы установки
   - Начальная конфигурация

2. **Руководство по настройке**
   - Настройка MQTT
   - Создание страницы
   - выбор точек данных
   - Использование шаблонов

3. **Руководство по шаблонам**
   - Доступные шаблоны
   - Примеры настройки
   - Создание пользовательских шаблонов

4. **Руководство по устранению неполадок**
   - Общие проблемы
   - Ведение отладочной документации
   - Вспомогательные ресурсы

### Документация для разработчиков

1. **Обзор архитектуры** (данный документ)

2. **Справочник API**
   - Обработчики сообщений (команды sendTo)
   - Структура объекта
   - протокол MQTT

3. **Руководство для участников**
   - Стиль кода
   - Требования к тестированию
   - Процесс обработки запросов на слияние

4. **Руководство по созданию шаблонов**
   - Структура шаблона
   - Передовые методы
   - Процесс подачи заявки

---

## ✅ Критерии приемки

### Минимально жизнеспособный продукт (МВП)

- ✅ Адаптер успешно установлен
- ✅ Административный интерфейс позволяет настраивать страницы
- ✅ Подключается к MQTT-брокеру
- ✅ Отображает состояния ioBroker на MCDU
- ✅ Обрабатывает нажатия кнопок
- ✅ Поддерживает навигацию по страницам
- ✅ Не менее 3 встроенных шаблонов
- ✅ Автоматическое обнаружение точек данных
- ✅ Поддерживает несколько устройств MCDU
- ✅ Базовая документация

### Готов к производству

- ✅ Соответствует всем критериям MVP
- ✅ Комплексная обработка ошибок
- ✅ Проверка входных данных
- ✅ Ведение отладочной информации
- ✅ Модульные тесты
- ✅ Интеграционные тесты
- ✅ Полная документация
- ✅ Примеры конфигураций
- ✅ Поддержка интернационализации (английский + немецкий)

### Лучший в своем классе (опционально)

- ✅ Все критерии готовности к производству
- ✅ Пользовательский компонент редактора React
- ✅ Предварительный просмотр MCDU в прямом эфире
- ✅ Расширенные режимы отображения
- ✅ Библиотека шаблонов сообщества
- ✅ Видеоуроки

---

## 📖 Ссылки

### Ресурсы ioBroker

- **Документация по настройке JSON:** <https://github.com/ioBroker/json-config>
- **Руководство разработчика по адаптеру:** <https://iobroker.github.io/dev-docs/>
- **adapter-react-v5:** <https://github.com/ioBroker/adapter-react-v5>
- **Примеры адаптеров:**
  - виз-2: <https://github.com/ioBroker/ioBroker.vis-2>
  - Сцены: <https://github.com/ioBroker/ioBroker.scenes>
  - Администратор: <https://github.com/ioBroker/ioBroker.admin>

### Ресурсы MCDU

- **Спецификация фазы 3а:** [PHASE3A-SPEC.md](https://github.com/Flixhummel/ioBroker.mcdu/blob/main/docs/architecture/PHASE3A-SPEC.md)
- **Протокол MQTT:** [MQTT-TEST-COMMANDS.md](https://github.com/Flixhummel/ioBroker.mcdu/blob/main/docs/architecture/MQTT-TEST-COMMANDS.md)
- **Драйвер оборудования:** [lib/mcdu.js](https://github.com/Flixhummel/ioBroker.mcdu/blob/main/docs/architecture/lib/mcdu.js)

---

## 🏁 Заключение

Данная архитектура обеспечивает **готовую к использованию в производственной среде основу** для адаптера MCDU ioBroker:

**Сильные стороны:**

- ✅ Соответствует рекомендациям ioBroker
- ✅ Соответствует стандартам и готов к использованию сообществом
- ✅ Хорошо документировано и легко поддерживается
- ✅ Гибкий и расширяемый
- ✅ Быстрый срок разработки (2-3 недели)

**Следующие шаги:**

1. Проверка и утверждение архитектуры
2. Создание структуры проекта адаптера
3. Начало реализации первого этапа.
4. Дорабатывайте систему на основе отзывов, полученных в ходе тестирования.

**Ориентировочное время разработки:**

- Неделя 1: Основы (структура объектов, пользовательский интерфейс конфигурации)
- Неделя 2: Основные функции (рендеринг, кнопки)
- Неделя 3: Польский язык (шаблоны, документы, тестирование)
- Неделя 4+: Дополнительные возможности (пользовательский редактор)

**Ожидаемый результат:** Профессиональный, готовый к публикации адаптер для сообщества ioBroker!

---

**Версия документа:** 1.0\
&#x20;**Последнее обновление:** 16.02.2026\
&#x20;**Автор:** Феликс Хуммель\
&#x20;**Статус:** Готово к проверке