---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md
title: Концепция: Премиум-интеграция MCDU для домашнего помощника
hash: 8SLbVM5I0lgJop7j+1RMMPkiPcOcFOhtDczddYHi/cU=
---
# Концепция: Премиум-интеграция MCDU для домашнего помощника

**Дата:** 18 августа 2026 г. **Статус:** Entwurf zur Контекст обсуждения **:** Umstieg von ioBroker auf Home Assistant. Адаптер ioBroker-Adapter является лучшим и может использоваться сообществом. Для Home Assistant есть новая, собственная интеграция с Anspruch «Премиум»: удобная конфигурация со всеми MCDU-Seiten, немецкая лучшая поддержка jsonConfig-basierte Admin-UI от ioBroker.

---

## 1. Ausgangslage und Kernerkenntnis

Die heutige Architektur ist bereits sauber in drei Schichten getrennt:

```
ioBroker-Adapter (Gehirn)  <-->  MQTT-Broker  <-->  mcdu-client auf dem Pi (dummes Terminal)  <-->  USB-HID-Hardware
```

**Die entscheidende Erkenntnis:** Der`mcdu-client` на Raspberry Pi мы не работаем с ioBroker. Er spricht ausschließlich das MQTT-Protokoll:

| Рихтунг         | Тема                             | Инхальт                                       |
| --------------- | -------------------------------- | --------------------------------------------- |
| Брокер → Клиент | `mcdu/{deviceId}/display/#`      | Дисплей-Zeilen / Vollbild / Clear             |
| Брокер → Клиент | `mcdu/{deviceId}/led/#`          | LED an/aus, Helligkeit                        |
| Брокер → Клиент | `mcdu/{deviceId}/config/#`       | Конфигурация клиента (например, перезагрузка) |
| Клиент → Брокер | `mcdu/{deviceId}/button/{label}` | Tastendrücke                                  |
| Клиент → Брокер | `mcdu/{deviceId}/status`         | онлайн/офлайн (сохранено, LWT)                |
| Клиент → Брокер | `mcdu/{deviceId}/heartbeat`      | Lebenszeichen                                 |

Дамит позолота: **Pi-Client und Hardware-Treiber werden nicht angefasst.** Для Home Assistant необходимо использовать новые возможности: визуальный рендеринг, навигацию, блокнот/включение, проверку, функциональные возможности, светодиодную логику, а также настройки пользовательского интерфейса.

---

## 2. Стратегия репозитория (Antwort auf die Branch-Frage)

**Кейнское отделение. Ein neues Репозиторий.**

Begründung:

1. **Andere Sprache, Anderes Ökosystem.** Eine HA-интеграция с Python (`custom_components/mcdu/` ), адаптер ioBroker — это Node.js. Es gibt fast keinen gemeinsam nutzbaren Code — nur das Protokoll und den Client.
2. **HACS erfordert eine eigene Repo-Struktur.** HACS (Home Assistant Community Store) в репозитории с`custom_components/<domain>/` im Root plus`hacs.json` . Ваш филиал в ioBroker-Repo не работает.
3. **Сообщество-Continuität.** ioBroker-Repo (`Flixhummel/ioBroker.mcdu` ) bleibt unverändert auf`main` — Проблемы, релизы, npm-Publishing laufen weiter. Ein dauerhaft divergierender Branch Würde nur verwirren und nie Gemerged Werden.
4. **Unabhängige Release-Zyklen.** ioBroker выпустил релиз-скрипт/npm, HA-интеграцию или GitHub-релизы/HACS.

### Empfohlene Repo-Aufteilung (3 репозитория)

| Репо                                   | Инхальт                                       | Цвек                                     |
| -------------------------------------- | --------------------------------------------- | ---------------------------------------- |
| `Flixhummel/ioBroker.mcdu`             | bestehend, unverändert                        | ioBroker-Адаптер, Сообщество-Pflege      |
| `Flixhummel/winwing-mcdu-client` (neu) | `mcdu-client/` + MQTT-Protokoll-Spez          | **Gemeinsamer** Pi-Client для экосистемы |
| `Flixhummel/hass-mcdu` (neu)           | `custom_components/mcdu/` + Панель интерфейса | Die HA-Integration                       |

Извлечение клиентов из собственного репозитория — это лучший Eingriff в лучшем проекте. Альтернативный вариант (прагматичный старт): Клиент должен использовать ioBroker-Repo, чтобы HA-Repo снова перешел в исходное состояние. Извлечение может быть невозможным — если **MQTT-протокол является версионным документом** (например, версия 4), он должен быть интегрирован в плотный клиентский файл.

---

## 3. Форма интеграции: Vergleich und Empfehlung

Für HA gibt es drei Realistische Bauformen:

### Вариант А — встроенная интеграция (Python) ⭐ Empfehlung

- `custom_components/mcdu/` с Config Flow, Geräten, Entitäten, Services.
- Nutzt die **eingebaute MQTT-интеграция** с HA (`dependencies: ["mqtt"]` ) — kein eigener Broker-Client, keine eigenen Credentials, Broker-Konfiguration entfällt komplett für den Nutzer.
- Läuft auf **allen** HA-Installationsarten (HA OS, Container, Core, контролируемый).
- Verteilung über HACS, später ggf. HACS-Default-Repo.
- "Премиум"-Merkmale (Config Flow, Geräteregistrierung, Diagnostics, собственн. Konfigurations-Panel) также не используется в dieser Bauform voll erreichbar.
- Стоимость: Portierung der Business-Logik von JavaScript nach Python (\~3.000 Zeilen, встроенная в Logik, панель Tests).

### Вариант Б — надстройка высокой доступности (Docker, Node.js-Code wiederverwenden)

- Лучший код Node.js можно быстро включить в дополнительный контейнер с Ingress-Web-UI, привязать к HA или WebSocket-API или MQTT.
- Vorteil: минималистичный Portierungsaufwand.
- Доступно: läuft **nur** auf HA OS/Supervised (schließt Container/Core-Nutzer aus), fühlt sich nicht wie eine Integration an (keine Entitäten/Geräte/Services ohne Zusatzaufwand), doppelte Zustandshaltung, kein "Premium-Integration"-Status.

### Вариант C — AppDaemon / Node-RED

- Schneller Hack, keine ernsthafte Option for formulierten Anspruch.

**Возможности: Вариант A.** Der Anspruch «Премиум-интеграция, удобная конфигурация» — это только часть встроенной интеграции. Die Portierung ist überschaubar, weil die Logik klein, modular und durch \~228 Tests spezifiziert ist — die Tests sind de facto die Portierungs-Spezifikation.

---

## 4. MQTT-Protokoll в качестве стабилизатора Vertrag (Фаза 0)

Bevor die HA-Seite entsteht, wird das Protokoll **aus dem Code extrahiert and als`PROTOCOL.md` (v1.0) обновлены** : все темы, схемы полезной нагрузки (кадры дисплея, сегменты для отображения, названия светодиодов, метки кнопок, статус/формат пульса), параметры QoS/сохранения, настройки ASCII, синхронизация клиентов.

Nutzen:

- Beide Integrationen (ioBroker + HA) реализует специальную дизельную спецификацию.
- Сообщество может использовать ioBroker-Adapter, только если у вас есть клиент.
- Protokolländerungen laufen künftig über eine Versionsnummer im Status/Config-Topic.

---

## 5. Zielarchitektur der HA-Integration

```
Home Assistant
├── MQTT-Integration (eingebaut, vorhandener Broker)
│         ▲ ▼
├── custom_components/mcdu/          ← das neue "Gehirn" (Python)
│   ├── Config Flow                  ← Einrichtung + Geräte-Erkennung
│   ├── DeviceCoordinator            ← 1 Instanz je MCDU (mcdu/{deviceId}/status)
│   ├── PageEngine                   ← Port von PageRenderer/Navigation/Pagination
│   ├── InputEngine                  ← Port von Scratchpad/InputMode/Validation/Confirm
│   ├── Entities                     ← Sensoren, Nummern, Schalter, Events
│   ├── Services                     ← mcdu.notify, mcdu.goto_page, mcdu.set_led, ...
│   ├── Storage                      ← Seiten-Konfiguration in .storage/ (versioniert)
│   └── WebSocket-API                ← Backend für das Konfigurations-Panel
│
└── MCDU-Panel (Sidebar, eigenes Frontend)   ← die Premium-Konfigurations-UI
          ▲ ▼ (HA-WebSocket)
     Seiteneditor mit Live-Vorschau
```

Unverändert:`MQTT-Broker <--> mcdu-client (Pi) <--> WinWing MCDU` .

### 5.1 Warum das Entity-Modell von HA ein Geschenk ist

Der ioBroker-Adapter liest`obj.common` (запись, ввод, мин/макс, единица измерения, состояния), um Eingaben zu validieren und Werte zu formieren. HA bietet dasselbe — reicher und einheitlicher:

| ioBroker`obj.common` | Домашний помощник                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `type`               | Домен + `device_class`                                                                                      |
| `write`              | Domain (sensor = read-only, number/switch/light = schreibbar)                                               |
| `min` /`max` /`step` | Атрибут фон`number` /`climate` / `light`                                                                    |
| `unit`               | `unit_of_measurement`                                                                                       |
| `states` (Энум)      | `options` фон`select` /`input_select` режимы работы систем отопления, вентиляции и кондиционирования и т.д. |
| Имя                  | `friendly_name` , Область, Устройство                                                                       |

Zusätzlich kennt HA **Areas, Devices, Labels und Kategorien** — die Grundlage für das spätere Killer-Feature «Seite autotisch aus Raum Generieren» (Abschnitt 7.4).

### 5.2 Entitäten, die die Integration selbst anlegt (je MCDU-Gerät)

- `binary_sensor.mcdu_<id>_online` — Статус клиента (тематика, по которой сохранен статус клиента)
- `sensor.mcdu_<id>_current_page` — aktuelle Seite (für Automationen)
- `sensor.mcdu_<id>_scratchpad` — Scratchpad-Inhalt
- `number.mcdu_<id>_brightness` /`_screen_brightness` — Подсветка
- `switch.mcdu_<id>_led_<name>` — есть светодиод (FAIL, FM, MCDU, ...)
- **События/Device-Trigger** für jeden Tastendruck (`event.mcdu_<id>_button` бзв. Device-Trigger je Taste) — нужно включить MCDU-Tasten непосредственно в HA-Automationen Nutzbar («wenn LSK3L auf Seite X gedrückt ...»), ohne dass eine Seite configuriert sein muss. Это 32 идиоматических режима автоматизации-состояний ioBroker-адаптеров.

### 5.3 Услуги (для автоматизации/скриптов)

- `mcdu.notify` — Добавление в Scratchpad/Notification-Zeile (с Timeout, Farbe)
- `mcdu.goto_page` — Seite aufrufen
- `mcdu.set_led` — LED steuern (также как Switch verfügbar)
- `mcdu.show_dialog` — Bestätigungsdialog aus einer Automation Heraus
- `mcdu.refresh` — Redraw erzwingen

### 5.4 Конфигурационные файлы

Seiten-Konfiguration **не** хранится в Config Entry (zu groß, zu dynamisch), в HA-Storage (`.storage/mcdu.pages_<entry_id>` ,`helpers.storage.Store` , с версией схемы). Чтобы узнать, как **работает форматирование, выберите Alt-Format-Migrationen** — не используйте созданную схему, пока интеграция не будет восстановлена-проблема/выполнена миграция. Экспорт/импорт данных в формате JSON является частью пользовательского интерфейса Panel (для резервного копирования и совместного использования конфигураций).

---

## 6. Пользовательский интерфейс Premium-Konfigurations (das Herzstück)

Это пункт, деклассированная версия HA-версии ioBroker-Adapter. Интерфейс ioBroker-Admin-UI имеет ограниченную структуру jsonConfig (таблицы с более чем 20 областями, несколько резервных jsonConfig-Kopien, некоторое изменение, определенный контекст). В HA bauen wir stattdessen ein **eigenes Sidebar-Panel** (зарегистрируйтесь через`panel_custom` , Frontend в освещении или React, коммуницирует HA-WebSocket-API с Backend).

### 6.1 Kernfunktionen des Panels

1. **Live-Display-Воршау.** Оригинальный размер 14×24-Darstellung (Pixel-Font, 8 Farben) визуализирует выбранный веб-сайт в режиме реального времени — перед этим он работает **с PageEngine в Backend** («предварительный просмотр» через WebSocket), а также может иметь различные варианты реализации рендеринга. Дополнительно: Vorschau mit echten Live-Werten der verknüpften Entitäten.
2. **Зайтенбаум стат Таблель.** Linke Spalte: Navigationshierarchie als Baum (Родитель/Дочерний элемент, перетаскивание), панель навигации Breadcrumb-Logik.
3. **Zeileneditor mit Direktauswahl.** Щелкните на eine Zeile/Seite (links/rechts) в der Vorschau öffnet den Editor, чтобы создать для этого поля — statt Zeilen в 24-Spalten-Tabelle zu suchen.
4. **HA-родной инструмент выбора объектов.** Ziel-/Quell-Datenpunkte werden mit dem HA-Entity-Selector gewählt (Такой фильтр для домена/области/устройства). При выборе **метки, значений, мин/макс, опций перечисления и автоматического изменения параметров** Entity-Metadaten — не отображается, не отображается.
5. **Тип макета как вариант.** меню/данные/список wie bisher, aber als visuelle Auswahl mit Beispielbild; Paginierung/Scroll-Indikatoren zeigt die Vorschau an.
6. **Функциональные индикаторы и графические светодиоды.** Ein MCDU-Frontplattenbild, auf dem man Funktionstasten anklickt und ihnen Seiten/Aktionen zuweist; dito LEDs → Entity-Zuordnung (erledigt UX Phase E gleich mit).
7. **Проверка в режиме онлайн.** Fehler (Pflichtfelder, ungültige Ziele, Nicht-ASCII, zu lange Labels) erscheinen direkt am Feld und in der Vorschau — nicht erst nach dem Speichern auf der Hardware.
8. **Отменить/Повторить, Entwurf против актива.** Сначала необходимо включить оборудование, если выбрано «Активирование»; vorher testet man im Vorschau-Modus (опционально: «Предварительный просмотр на отправке сообщения»-Knopf für 30 Sekunden Echt-Vorschau).

### 6.2 Помощь (собственный комфорт)

- **«Seite aus Area Generieren»:** Raum wählen → Integration schlägt eine Fertige Seite mit allen Lichtern/Schaltern/Sensoren des Raums vor (Domain-Priorisierung, sinnvolle Formate) → Nutzer streicht/ordnet um → Fertig.
- **«Seite aus Domain Generieren»:** z. Б. алле`climate` -Entitäten als Klimaseite.
- **Профиль/Форлаген** (на уровне UX Phase F ab): дополнительные настройки конфигурации (Beleuchtung, Klima, Energie/PV) плюс импорт/экспорт из профиля сообщества.

### 6.3 Техническое обслуживание панелей

- Фронтенд как собственный Build-Artefakt im HA-Repo (`/frontend` , Lit + TypeScript, Vite-Build → eine JS-Datei, для интеграции также необходимо зарегистрироваться в Pfad).
- Передача данных для регистрации WebSocket-Commands (`mcdu/pages/get` ,`mcdu/pages/save` ,`mcdu/render_preview` ,`mcdu/devices/list` , ...), damit Auth, Berechtigungen und Reconnects von HA kommen.
- Панель — это дополнительная панель для Maus **und** Tastatur (Scratchpad-Feeling is nett, aber kein Muss).

---

## 7. Entwicklungsphasen

| Фаза                         | Инхальт                                                                                                                                                                                                                               | Ergebnis                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **0 — Фундамент**            | `PROTOCOL.md` v1.0 дополнительный код; Репос анлеген (`hass-mcdu` , необязательное извлечение клиента); Герюст`custom_components/mcdu` с манифестом, Config Flow (Geräte-Erkennung über сохранен`mcdu/+/status` )                     | HA erkennt die MCDU, всегда онлайн/оффлайн |
| **1 — Display-MVP**          | Порт PageEngine (PageRenderer, Segmente/Farben, sanitizeAscii, Pagination); статистика Seiten aus Storage rendern; Кнопки как HA-Events; ЛСК-Навигация                                                                                | MCDU Zeigt Seiten, Функции навигации       |
| **2 — Werte & Steuern**      | Entity-Werte live auf Seiten (государственная подписка, форматирование с точностью до единицы измерения); LSK-Aktionen: toggle, Service-Call, goto\_page; Светодиоды + Яркость как Entitäten                                          | MCDU steuert echte Geräte                  |
| **3 — Система Эйнгабе**      | Блокнот порта/InputMode/ValidationEngine/ConfirmationDialog; Validierung aus Entity-Metadata; немецкий Meldungen wie gehabt                                                                                                           | Werteingabe über Scratchpad полностью      |
| **4 — Премиум-панель**       | Боковая панель-панель: Vorschau, Seitenbaum, Zeileneditor, Entity-Picker, Funktionstasten-/LED-Zuordnung, Inline-Validierung                                                                                                          | Комфортная конфигурация (der Anspruch)     |
| **5 — Ассистенты и профиль** | Генератор областей/доменов, Форлаген, Импорт/Экспорт; Импорт для лучшей конфигурации ioBroker-Seiten (Формат → Конвертер 1:1, необходимо вручную использовать идентификаторы Entity-ID, чтобы импортер мог использовать их для имени) | Миграция + Комфорт                         |
| **6 — Выпуск**               | HACS-Veröffentlichung (hacs.json, Brands-PR für Logo), Doku, Диагностика, Проблемы с ремонтом, Тесты (pytest +`pytest-homeassistant-custom-component` ), CI (hassfest, HACS-Action)                                                   | Открытая премиум-интеграция                |

Фаза 1–3 с **моим портированием, новейшими испытаниями** : лучшие тесты Mocha-Tests werden als pytest-Tests mitportiert und sichern Verhaltensgleichheit ab. Подводные камни в проектах (0xf0-Init nur einmal pro Power-Cycle, 40 мс Frame-Abstand, светодиоды на дисплее, только ASCII,`effectiveDisplayType()` ) betreffen fast alle den **Client** und bleiben dort gelöst; auf HA-Seite, соответствующий ASCII-Sanitizing und die Segment-/Farblogik.

---

## 8. Качество «Премиум».

**Шкала качества интеграции** HA Hat eine Offizielle (Бронзовый → Платиновый). Пользовательские интеграции не работают в официальном режиме, а также включают в себя:

- Поток конфигурации: статистика YAML, создание и реестр сущностей sauber, отдельные уникальные\_иды
- Übersetzungen (de/en) über`strings.json` /`translations/`
- Диагностика-Экспорт, Ремонт-Проблемы statt Stiller Fehler, Reauth-/Reload-Fähigkeit
- Vollständige Typannotationen, pytest-Abdeckung, hassfest-CI
- Saubere Doku + Beispiel-Blueprints for Button-Automationen

Fernziel (необязательно): Aufnahme в хранилище HACS-Default-Store; Core-Aufnahme ist wegen des eigenen Panels unrealistich und auch nicht notig.

---

## 9. Риски и оффенские баллы

1. **Portierungsaufwand Panel-Frontend** ist der größte Einzelposten (Этап 4). Backend — это калькулятор тестов, панель — Neuland → früh einen Klick-Dummy bauen.
2. **HA-Frontend-API-Stabilität:**`panel_custom` + WebSocket-команды имеют стабильную и большую интеграцию; trotzdem Panel с поддержкой HA-версии (kein Zugriff auf interne Frontend-Module).
3. **Цвей Герне, клиент:** Solange ioBroker- und HA-Integration, работает **в** режиме реального времени для активной публикации. Der Client bleibt dumm; die Protokoll-Doku bekommt einen Hinweis (сохранено отображение тем von zwei Quellen = Flackern).
4. **Community-Übergabe ioBroker:** Repo-Beschreibung um «поддерживается сообществом, первоначальный автор фокусируется на интеграции высокой доступности», например, CONTRIBUTING.md anlegen, ggf. Со-сопровождающий с Schreibrechten suchen. Кейн Бранч нетиг —`main` lebt einfach weiter.
5. **Namensgebung:** Domain`mcdu` в HA prüfen (Kollisionen unwahrscheinlich); Имя репо`hass-mcdu` Одер`homeassistant-winwing-mcdu` .

---

## 10. Zusammenfassung der Entscheidungen

| Фраге          | Муравьиная нить                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Branch für HA? | **Nein.** Neues Repo`hass-mcdu` ; ioBroker-Repo bleibt unverändert für die Community                                                      |
| Что осталось?  | mcdu-client (Pi), MQTT-Protokoll, Hardware-Treiber — unverändert                                                                          |
| Was wird neu?  | Python-Интеграция (Port der Business-Logik) + eigenes Konfigurations-Panel                                                                |
| Бауформ        | Встроенная пользовательская интеграция с HA-MQTT, поддержка HACS                                                                          |
| Конфиг-Комфорт | Боковая панель: Live-Vorschau, Seitenbaum, Entity-Picker с Auto-Befüllung, Area-Generator, Inline-Validierung, Import aus ioBroker-Config |
| Эрстер Шритт   | Фаза 0:`PROTOCOL.md` дополнительный код + Repo-Gerüst                                                                                     |