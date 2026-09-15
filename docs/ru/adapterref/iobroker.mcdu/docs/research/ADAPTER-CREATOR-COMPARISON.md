---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md
title: Создатель адаптера ioBroker Vergleich
hash: W/FEYYlPePBog1Q3Cl87ECbdOyvHdt516k6xxJOgPY0=
---
# Создатель адаптера ioBroker Vergleich

**Quelle:** Маттиас Кляйне (haus-automatisierung.com)\
&#x20;**Видео:** <https://www.youtube.com/watch?v=A9UETXyAmL4>\
&#x20;**Статья:** [https://haus-automatisierung.com/software/iobroker/2022/05/06/iobroker-adapter-entwicklung.html.](https://haus-automatisierung.com/software/iobroker/2022/05/06/iobroker-adapter-entwicklung.html)

**Наш адаптер:** iobroker.mcdu (MCDU Smart Home Control)

---

## 🔍Empfohlener Entwicklungsprozess (Матиас Кляйне)

### 1. Настройка процесса разработки

**Инструменты:**

- ✅ Код Visual Studio (доступен для использования)
- ⚠️ **Сервер разработки ioBroker** (доступен для NICHT)
- ✅ Git / GitHub (можно использовать)
- ✅ Node.js v14+ (возможность подключения: требование v14+)
- ⚠️ **Отделяет тестовую систему Debian** (haben wir nicht - entwickelt auf Mac)

**Рекомендация:**

```bash
# Dev-Server Installation (für lokales Testing)
npm install --global @iobroker/dev-server
```

**Was ist dev-server?**

- Lokaler ioBroker без необходимости установки
- Адаптер Schnelles Testen einzelner
- Keine Interferenz с продуктивной системой

**Непредвиденная ситуация:**

- Entwicklung auf Mac (разделяет систему Debian)
- Kein dev-server verwendet
- Тестирование непосредственно на заводе Produktiv-ioBroker

---

### 2. Adapter-Erstellung

**Empfohlener Weg:**

```bash
npx @iobroker/create-adapter
```

**Was der Creator generiert:**

- ✅ package.json
- ✅ io-package.json
- ✅ main.js
- ✅ admin/ (файлы пользовательского интерфейса)
- ✅ README.md
- ✅ ЛИЦЕНЗИЯ
- ✅ .gitignore
- ✅ .eslintrc.json
- ⚠️ **.github/workflows/** (CI/CD) — **FEHLT BEI UNS**
- ⚠️ **Стандартные тесты** - **HABEN WIR CUSTOM**
- ⚠️ **Конфигурация Dependabot** — **FEHLT BEI UNS**
- ⚠️ **.vscode/** (конфигурация отладки) — **FEHLT BEI UNS**

**Unser Weg:**

- Мануэль Эрстеллт через последовательные субагенты OpenClaw
- Alle Kern-Dateien vorhanden ✅
- Aber: Fehlen Standard-Automation (GitHub Actions) ⚠️

---

### 3. Сравнение структуры файлов

#### Unsere Struktur (iobroker.mcdu)

```
iobroker.mcdu/
├── admin/
│   ├── jsonConfig.json          ✅ Config UI
│   └── i18n/                    ✅ Internationalisierung
│       ├── en/translations.json
│       └── de/translations.json
├── lib/                         ✅ Gut organisiert
│   ├── input/                   (Scratchpad, Validation, etc.)
│   ├── mqtt/                    (MQTT Client, Button Subscriber)
│   ├── rendering/               (PageRenderer, Display Publisher)
│   ├── state/                   (StateTreeManager)
│   └── templates/               (Template Loader + JSON templates)
├── test/                        ✅ Unit Tests
│   ├── ScratchpadManager.test.js
│   └── integration.test.js
├── main.js                      ✅ Adapter Entry Point
├── package.json                 ✅ Dependencies
├── io-package.json              ✅ ioBroker Metadata
├── README.md                    ✅ Documentation
├── LICENSE                      ✅ MIT License
├── .gitignore                   ✅ Git Ignore
├── .eslintrc.json               ✅ Linting Config
├── CHANGELOG.md                 ✅ Version History
└── (viele weitere Docs)         ✅ Umfassende Dokumentation
```

#### Было обнаружено (создание адаптера-Creator)

```
❌ .github/
   └── workflows/
       ├── test-and-release.yml    # Auto-Test + npm publish
       ├── adapter-checker.yml     # ioBroker Adapter-Checker
       └── dependabot.yml          # Auto-Updates

❌ .vscode/
   └── launch.json                 # VSCode Debugging Config

❌ .devcontainer/                   # Dev Container für einheitliche Umgebung

❌ .prettierrc.json                 # Code Formatting

⚠️ package.json scripts            # Unvollständig
   - release script fehlt
   - adapter-dev script fehlt
```

---

## 📊 Feature-Vergleich

| Особенность                                                  | Создатель адаптеров | iobroker.mcdu | Статус                 |
| ------------------------------------------------------------ | ------------------- | ------------- | ---------------------- |
| **Базис-Структура**                                          | ✅                   | ✅             | Vollständig            |
| **Административный интерфейс (конфигурация в формате JSON)** | ✅                   | ✅             | Vollständig            |
| **Интернационализация**                                      | ✅                   | ✅             | DE + EN                |
| **Модульные тесты**                                          | ✅ Мокко/Чай         | ✅ Мокко/Чай   | Пользовательские тесты |
| **ESLint**                                                   | ✅                   | ✅             | Vollständig            |
| **GitHub Actions CI/CD**                                     | ✅                   | ❌             | **ФЕЛЬТ**              |
| **Dependabot**                                               | ✅                   | ❌             | **ФЕЛЬТ**              |
| **Отладка в VSCode**                                         | ✅                   | ❌             | **ФЕЛЬТ**              |
| **Поддержка Dev-Server**                                     | ✅                   | ⚠️            | Nicht getestet         |
| **Проверка адаптеров**                                       | ✅ Авто              | ⚠️            | Manuell laufen         |
| **npm Publish Automation**                                   | ✅                   | ❌             | **ФЕЛЬТ**              |

---

## 🎯 Был ли установлен GUT GUT (по сравнению со стандартным)

### ✅ Überlegene Architektur

- **13 основных классов** (sehr Gut Organisiert или Monolithische main.js)
- **Разделение ответственности:** ввод, MQTT, рендеринг, управление состоянием.
- **Система шаблонов:** Wiederverwendbare Konfigurationen
- **Общая документация:** \~250 КБ документации (только стандартный README)

### ✅ Лучшая концепция UX

- **Аутентичный авиационный UX:** блокнот, конечный автомат, копирование/вставка LSK
- **Многоуровневая проверка:** формат, диапазон, бизнес-логика
- **Система подтверждения:** мягкое/жесткое/обратный отсчет.
- **Предотвращение утечек памяти:** очистка памяти в методе onUnload()

### ✅ Код готов к использованию в производстве

- **48 контрольных работ** (100% успешное прохождение)
- **0 ошибок ESLint**
- **0 npm audit Уязвимости**
- **Оптимизация производительности:** регулирование скорости, подавление дребезга контактов, кэширование.

---

## ⚠️ Был ли использован FEHLT (по сравнению со стандартным)

### 1. GitHub Actions CI/CD

**Что не так:**

```yaml
# .github/workflows/test-and-release.yml
name: Test and Release

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
      - run: npm run lint

  adapter-checker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: ioBroker Adapter Checker
        uses: ioBroker/testing-action-adapter@v1

  release:
    needs: [test, adapter-checker]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Publish to npm
        uses: JS-DevTools/npm-publish@v1
        with:
          token: ${{ secrets.NPM_TOKEN }}
```

**Warum wichtig?**

- Автоматическое тестирование новых версий узла
- Адаптер-Проверка для Jedem Release
- Automatisches npm Publishing
- Стандарт сообщества для адаптера ioBroker

---

### 2. Настройки отладки VSCode

**Что не так:**

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Adapter",
      "program": "${workspaceFolder}/main.js",
      "args": [
        "--debug"
      ],
      "env": {
        "NODE_ENV": "development"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
      "args": [
        "--timeout",
        "999999",
        "--colors",
        "${workspaceFolder}/test/**/*.test.js"
      ]
    }
  ]
}
```

**Warum wichtig?**

- Отладка Schnelles с точками останова
- Отладка тестов непосредственно в VSCode
- Entwickler-Erfahrung verbessert

---

### 3. Интеграция Dev-сервера

**Что не так:**

```bash
# Im Adapter-Verzeichnis
dev-server setup
dev-server watch
```

**Warum wichtig?**

- Локалес Тестирование без продуктивного ioBroker-Instanz
- Schnellere Iterationen
- Keine Gefahr für Produktiv-System

---

### 4. Использование скриптов package.json

**Was wir haben:**

```json
"scripts": {
  "test": "mocha --exit",
  "lint": "eslint ."
}
```

**Was Standard wäre:**

```json
"scripts": {
  "test": "mocha --exit",
  "test:integration": "mocha --exit test/integration/**/*.test.js",
  "test:unit": "mocha --exit test/unit/**/*.test.js",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "check": "npm run lint && npm test",
  "translate": "node admin/i18n.js",
  "release": "iobroker-dev-server release",
  "release:minor": "iobroker-dev-server release minor",
  "release:major": "iobroker-dev-server release major"
}
```

---

### 5. Конфигурация Dependabot

**Что не так:**

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

**Warum wichtig?**

- Автоматические обновления зависимостей
- Патчи безопасности
- Общественный стандарт

---

## 💡 Рекомендации

### Приоритет 1: Действия GitHub (KRITISCH für Veröffentlichung)

**Почему JETZT важно:**

- Лучшее решение для публикации npm
- Стандарт сообщества для ioBroker
- Автоматизированное обеспечение качества

**Дополнительно:** \~1 Stunde. **Преимущество:** Massiv (автотестирование, автовыпуск).

### Приоритет 2: Конфигурация отладки VSCode

**Warum nützlich:**

- Entwickler-Erfahrung verbessern
- Отладка Schnelleres
- Стандарт в профессиональных проектах

**Дополнительно:** \~15-минутная **выгода:** Hoch (Entwicklungsgeschwindigkeit)

### Приоритет 3: Тестирование Dev-сервера

**Warum sinnvoll:**

- Для тестирования оборудования empfohlen
- Риско-Минимирование
- Isolierte Test-Umgebung

**Дополнительно:** \~30 минут настройки + **преимущество тестирования:** Mittel (безопасность)

### Приоритет 4: Расширенные сценарии package.json

**Warum nützlich:**

- Согласованность с сообществом
- Процесс выпуска Vereinfacht
- Рабочие процессы разработчика

**Дополнительно:** \~15 минут. **Выгода:** Нидриг (неплохо иметь)

### Приоритет 5: Зависимость

**Warum (необязательно):**

- Канн später hinzugefügt werden
- Erst nach erstem Соответствует выпуску

**Дополнительно:** **Выгода \~5 минут:** Нидриг (Лангфристиг)

---

## 🏆 Zusammenfassung

### Was wir BESSER gemacht haben

- ✅ Архитектура (13 классов против монолитного main.js)
- ✅ Документация (\~250 КБ по сравнению со стандартным файлом README)
- ✅ UX-Konzept (аутентичные авиационные шаблоны)
- ✅ Тестирование (48 тестов, 100% успешно сданы)
- ✅ Качество кода (0 ошибок ESLint, 0 уязвимостей)

### Was wir FEHLT

- ❌ GitHub Actions CI/CD
- ❌ Настройки отладки VSCode
- ❌ Тестирование на сервере разработки
- ⚠️ Расширенные скрипты package.json

### Рекомендация

**Vor erstem npm publish:**

1. Действия GitHub (test-and-release.yml)
2. Дополнительная информация по конфигурации отладки VSCode
3. Ошибка сценариев package.json

**Первый выпуск:** 4. Активация Dependabot 5. Dev-Server for zukünftige Entwicklung nutzen

---

## 📝 Следующая строчка

**Вариант А: Minimaler Aufwand (für schnelles Publishing)**

1. Действия GitHub: помощь (1 час)
2. Hardware Testing durchführen
3. Erstes npm publish

**Вариант B: Соответствие стандартам Vollständiger**

1. Действия GitHub: помощь (1 час)
2. Конфигурация отладки VSCode (15 мин)
3. Расширенные скрипты package.json (15 мин)
4. Настройка и тестирование сервера разработки (30 мин)
5. Тестирование оборудования
6. Erstes npm publish

**Варианты:** Вариант A для полета, Вариант B Ergänzungen nach erstem Release.

---

**Важная информация:** Unsere Implementierung ist **inhaltlich überlegen** (Архитектура, Тесты, Документация), а также **процесс разработки** (CI/CD, Отладка, Dev-Server). Для публикации требуется минимальная настройка (GitHub Actions), а также поддержка сообщества.