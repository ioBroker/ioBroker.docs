---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/README.md
title: Документация к контроллеру умного дома MCDU
hash: OZgdvqEoiQx+AdLFsp72LzwCkCyMcHTQHQL4XN2Nqxg=
---
# Документация к контроллеру умного дома MCDU

Полная проектная документация для адаптера ioBroker MCDU (версия 0.1.0, предварительная).

## Структура документации

### Корневая документация

- **[PAGE-CONFIGURATION-GUIDE.md](/#/docs/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md)** - Справочник по настройке страниц (начните здесь с настройки страницы)
- **[AUTOMATION-QUICKSTART.md](/#/docs/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md)** — Скрипт для домашней автоматизации с 32 состояниями автоматизации.
- **[MQTT-TEST-COMMANDS.md](/#/docs/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md)** — команды тестирования MQTT для ручной отладки.
- **[MULTI-COLOR-FEATURE.md](/#/docs/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md)** - Многоцветные сегменты отображения (цвета для каждого символа)
- **[GETTING-STARTED.md](/#/docs/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md)** - Оригинальные пояснения к проекту (исторические)

### `/architecture/`

Архитектурные решения и проектирование системы:

- **[ARCHITECTURE.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md)** - Общая архитектура системы
- **[ARCHITECTURE-DECISION.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md)** - Почему стоит использовать адаптер ioBroker?
- **[ARCHITECTURE-REVISION.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md)** - Перепроектирование многоустройственной архитектуры
- **[IOBROKER-ADAPTER-ARCHITECTURE.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md)** - Подробная архитектура адаптера

### `/research/`

Исследование, требования и анализ:

- **[RESEARCH.md](/#/docs/adapterref/iobroker.mcdu/docs/research/RESEARCH.md)** - Первые результаты исследования
- **[REFERENCES.md](/#/docs/adapterref/iobroker.mcdu/docs/research/REFERENCES.md)** - Справочник по API и внешняя документация
- **[ADAPTER-CREATOR-COMPARISON.md](/#/docs/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md)** - Сравнение инструментов
- **[requirements.md](/#/docs/adapterref/iobroker.mcdu/docs/research/requirements.md)** - Требования к проекту

### `/ux-concept/`

Документация по UX-дизайну и пользовательскому опыту:

- **[UX-CONCEPT.md](/#/docs/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md)** - Аутентичные шаблоны пользовательского интерфейса кабины MCDU
- Система буфера ввода, режимы ввода, поведение LSK.
- Визуальная обратная связь, проверка достоверности, конечные автоматы

## Быстрые ссылки

- **Настройки страницы:** [PAGE-CONFIGURATION-GUIDE.md](/#/docs/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md)
- **Обзор архитектуры:** [architecture/ARCHITECTURE-REVISION.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md)
- **UX-дизайн:** [ux-concept/UX-CONCEPT.md](/#/docs/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md)

## Техническая документация

Основной файл README репозитория: [../README.md](/#/adapters/mcdu)

Документацию по адаптерному коду см.:

- `/lib/` - Основные модули библиотеки (mqtt, rendering, input, state, templates)
- `/mcdu-client/` - Клиент для Raspberry Pi ( [README](/#/docs/adapterref/iobroker.mcdu/mcdu-client/README.md) , [Настройка Pi](https://github.com/Flixhummel/ioBroker.mcdu/blob/main/mcdu-client/PI-SETUP.md) )
- `/admin/` - Настройка административного интерфейса (jsonConfig)