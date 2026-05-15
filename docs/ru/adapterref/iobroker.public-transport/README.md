---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.public-transport/README.md
title: ioBroker.public-transport
hash: 4U3wRVMIBOFFMtvgY3jnuoabQJYcj18Y3MTtijrN9q8=
---
![Логотип](../../../en/adapterref/iobroker.public-transport/admin/iconAdapter.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.public-transport.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.public-transport.svg)
![Количество установок](https://iobroker.live/badges/public-transport-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/public-transport-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.public-transport.png?downloads=true)

# IoBroker.public-transport
**Тесты:** ![Тестирование и выпуск](https://github.com/tt-tom17/ioBroker.public-transport/workflows/Test%20and%20Release/badge.svg)

## Адаптер для общественного транспорта для ioBroker
Адаптер для общественного транспорта обеспечивает бесшовную интеграцию информации о расписании общественного транспорта в режиме реального времени в вашу систему умного дома ioBroker. С помощью этого адаптера вы можете получать время отправления с остановок различных транспортных операторов в Германии, Австрии и других странах и использовать его для автоматизации.

[🇩🇪 Немецкая документация](doc/de/README.de.md)

## Оглавление
- [Основные характеристики](#ключевые-характеристики)
- [Установка](#installation)
- [Поддерживаемые транспортные сети](#supported-transport-networks)
- [Конфигурация](#configuration)
- [Структура данных](#data-structure)
- [Примеры использования](#usage-examples)
- [Список изменений](#changelog)
- [Лицензия](#лицензия)

## Основные характеристики
- **Множество транспортных сервисов**: Полная поддержка API HAFAS и DB Vendo.
- **Гибкая конфигурация станций**: настройте любое количество остановок.
- **Данные в реальном времени**: Получайте актуальное время отправления с информацией о задержках.
- **Автоматические обновления**: Регулярный опрос времени отправления с настраиваемыми интервалами.
- **Расширенные возможности фильтрации**: Фильтрация по видам транспорта (автобус, поезд, трамвай, метро, паром и т. д.)
- **Гибкая временная смещение**: отображение отправлений из определенной точки в будущем.
- **Настраиваемое количество запросов**: Определите, сколько отправлений с каждой станции должно отображаться.
- **Настраиваемые имена**: Присваивайте индивидуальные имена своим станциям и соединениям.

## Установка
### Предварительные условия
- Установка ioBroker (требуется Node.js версии 20.x или выше)
- Доступ в Интернет для получения данных расписания.

### Установка через административную панель ioBroker
1. Откройте административный интерфейс ioBroker.
2. Перейдите в раздел «Адаптеры».
3. Найдите в поиске "общественный транспорт".
4. Нажмите «Установить»

## Поддерживаемые транспортные сети
### Профили HAFAS
Адаптер использует API HAFAS (HaCon Timetable Information System) и поддерживает множество транспортных сетей и операторов:

#### Германия
- **VBB** - Verkehrsverbund Берлин-Бранденбург

#### Австрия
- **ÖBB** — Österreichische Bundesbahnen (по всей стране)

### Vendo
API Vendo для получения данных из Deutsche Bahn (DB)

## Конфигурация
### Общие настройки
1. **Выберите тип услуги**
— Выберите между `HAFAS` и `Vendo` в зависимости от вашего транспортного оператора.

2. **Выберите профиль** (только для HAFAS)
— Выберите соответствующий профиль транспортной сети из выпадающего списка.
   - Пример: «db» для Deutsche Bahn, «vbb» для Берлина-Бранденбурга.

3. **Интервал запроса**
- Укажите, как часто следует обновлять данные (в минутах).
- Рекомендуется: 2-5 минут для получения данных в режиме реального времени.
- Минимум: 1 минута

### Добавление станции
Для каждой остановки можно настроить следующие параметры:

#### Параметры конфигурации
- **Имя пользователя** (необязательно)
- Индивидуальное название станции в ioBroker
- Пример: "Bus_Stop_Work" вместо официального обозначения.

- **Количество вылетов**
— Сколько отправлений следует восстановить?
- По умолчанию: 5
Диапазон: 1-20

- **Смещение времени (минуты)**
- Показать информацию об отправлении рейсов с этого момента в будущем.
- По умолчанию: 0 (сразу)
- Пример: 5 = показывать только отправления в течение 5 минут и более.
- Полезно для сокрытия вылетов, на которые вы больше не сможете попасть.

- **Период времени (минуты)**
- Максимальный период времени для отображаемых отправлений
- По умолчанию: 60
- Пример: 30 = только отправления в течение следующих 30 минут

- **Фильтр режима транспорта**
— Выберите, какие виды транспорта должны отображаться:
- Автобус
- S-Bahn (пригородная линия)
- Метро (U-Bahn)
- Трамвай
- Региональный поезд
- Национальный поезд
    - Перевозить
    - Выражать
- Такси
- Возможен множественный выбор

### Добавление путешествия
Функция «Поездки» позволяет запрашивать информацию о соединениях между двумя станциями. Можно настроить следующие параметры:

#### Параметры конфигурации маршрута
- **Имя пользователя** (необязательно)
- Индивидуальное название для маршрута в ioBroker
- Пример: "Home_to_Work" для более точной идентификации

- **От станции** (обязательно)
- Начальная станция путешествия
- Выберите из доступных станций

- **К станции** (обязательно)
- Станция назначения поездки
- Выберите из доступных станций

- **Количество результатов**
— Сколько вариантов маршрута следует получить?
- По умолчанию: 3
Диапазон: 1-10

- **Фильтр режима транспорта**
— То же самое, что и для станций (см. выше)
- Ограничивает виды транспорта, используемые в поездке.

## Структура данных
### Структура данных станции
Адаптер создает дерево объектов в ioBroker для каждой настроенной станции:

```
public-transport.0
├── Stations
│   └── <Station-ID>                 // Station ID (e.g., 900350163)
│       ├── json                     // Raw departure data (JSON)
│       ├── enabled                  // Station enabled (boolean)
│       ├── Departures_00            // First departure
│       │   ├── Departure            // Actual departure time
│       │   ├── DeparturePlanned     // Planned departure time
│       │   ├── Delay                // Delay in seconds
│       │   ├── DepartureDelayed     // Is delayed (boolean)
│       │   ├── DepartureOnTime      // Is on time (boolean)
│       │   ├── Platform             // Platform/stop
│       │   ├── PlatformPlanned      // Planned platform/stop
│       │   ├── Direction            // Direction/destination
│       │   ├── Name                 // Line name (e.g., "891")
│       │   ├── Product              // Product type (e.g., "bus")
│       │   ├── Operator             // Operator name
│       │   ├── Mode                 // Transport mode (bus, train, etc.)
│       │   ├── Remarks              // Remarks and notifications
│       │   │   ├── Hint             // General hints
│       │   │   ├── Status           // Status messages
│       │   │   └── Warning          // Warnings
│       │   └── Stop                 // Stop information
│       │       ├── Id               // Stop ID
│       │       ├── Name             // Stop name
│       │       └── Type             // Stop type (e.g., "stop")
│       ├── Departures_01            // Second departure
│       │   └── ...
│       └── ...
```

### Структура данных путешествия
Для каждого настроенного маршрута адаптер создает следующую структуру:

```
public-transport.0
├── Journeys
│   └── journey_<ID>                     // Journey configuration ID
│       ├── Journey_00                   // First journey option
│       │   ├── json                     // Raw journey data (JSON)
│       │   ├── Arrival                  // Arrival time at destination
│       │   ├── ArrivalPlanned           // Planned arrival time
│       │   ├── ArrivalDelay             // Arrival delay in seconds
│       │   ├── ArrivalDelayed           // Delayed arrival (boolean)
│       │   ├── ArrivalOnTime            // On-time arrival (boolean)
│       │   ├── Departure                // Departure time from start
│       │   ├── DeparturePlanned         // Planned departure time
│       │   ├── DepartureDelay           // Departure delay in seconds
│       │   ├── DepartureDelayed         // Delayed departure (boolean)
│       │   ├── DepartureOnTime          // On-time departure (boolean)
│       │   ├── Changes                  // Number of transfers
│       │   ├── DurationMinutes          // Journey duration in minutes
│       │   ├── Leg_00                   // First leg/segment
│       │   │   ├── json                 // Raw leg data (JSON)
│       │   │   ├── Arrival              // Segment arrival time
│       │   │   ├── ArrivalPlanned       // Planned segment arrival
│       │   │   ├── ArrivalDelay         // Segment arrival delay (seconds)
│       │   │   ├── ArrivalDelayed       // Delayed arrival (boolean)
│       │   │   ├── ArrivalOnTime        // On-time arrival (boolean)
│       │   │   ├── Departure            // Segment departure time
│       │   │   ├── DeparturePlanned     // Planned segment departure
│       │   │   ├── DepartureDelay       // Segment departure delay (seconds)
│       │   │   ├── DepartureDelayed     // Delayed departure (boolean)
│       │   │   ├── DepartureOnTime      // On-time departure (boolean)
│       │   │   ├── Distance             // Distance in meters
│       │   │   ├── Reachable            // Segment reachable (boolean)
│       │   │   ├── Line                 // Line information
│       │   │   │   ├── Direction        // Direction/destination
│       │   │   │   ├── Mode             // Transport mode (train, bus, etc.)
│       │   │   │   ├── Name             // Line name (e.g., "RE3")
│       │   │   │   ├── Operator         // Transport operator
│       │   │   │   └── Product          // Product type (e.g., "regional")
│       │   │   └── Remarks              // Remarks and notifications
│       │   │       ├── Hints            // General hints
│       │   │       ├── Status           // Status messages
│       │   │       └── Warnings         // Warnings
│       │   ├── Leg_01                   // Second leg/segment
│       │   │   └── ...
│       │   └── ...
│       ├── Journey_01                   // Second journey option
│       │   └── ...
│       └── ...
```

### Типы данных и примеры значений
| Штат | Тип | Пример | Описание |
|-------|------|---------|-------------|
| задержка | число | `3` | Задержка в минутах (0 = вовремя) |
| departureTime | string | `2026-02-16T14:33:00.000Z` | Фактическое время отправления, включая задержку |
| направление | строка | `S Potsdam Hauptbahnhof` | Конечный пункт назначения |
| строка | строка | `S7` | Обозначение строки |
| платформа | строка | `3` | Путь/платформа/автобусная остановка |
| тип | строка | `suburban` | Тип режима передачи |
| отменено | логическое значение | `false` | Отмена поездки |
| отменено | логическое значение | `false` | Отмена поездки |

## Примеры использования
### 1. Визуальный дисплей
Vis1/2 включает отдельный виджет для отображения расписаний отправлений и пересадок. Для отображения используются данные в формате JSON.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (tt-tom17) added productName to states
* (tt-tom17) connections widget: show remarks icons (warning/hint/status) per leg in journey detail popup
* (tt-tom17) connections widget: show remarks icons in main table (new Info column)
* (tt-tom17) connections widget: highlight delayed journeys/legs with red left border

### 0.4.0 (2026-05-06)
* (tt-tom17) fix select Products
* (tt-tom17) add Profil VBN (Bremen/Niedersachsen)

### 0.3.0 (2026-05-02)
* (tt-tom17) fix issues for latest Repo
* (tt-tom17) fix deaktivieren von Verbindungen
* (tt-tom17) Adapter requires node.js >= 22 now

### 0.2.2 (2026-04-25)
* (tt-tom17) fix countEntries for journeys

### 0.2.1 (2026-04-24)
* (tt-tom17) fix Vendo forbidden -> change dbnav to db

### 0.2.0 (2026-04-21)  
* (tt-tom17) Widget departures: add popup for hints and warnings

### 0.1.1 (2026-04-19)   
* (tt-tom17) fix App.tsx
* (tt-tom17) Fix [Bug]: Abfahrten-JSON bleibt leer oder alle gleich [#28](https://github.com/tt-tom17/ioBroker.public-transport/issues/28)

### 0.1.0 (2026-04-01)  
* (tt-tom17) begin beta-test

### 0.0.6 (2026-03-12)
* (tt-tom17) Widget for Journey
* (tt-tom17) Refactor admin UI: convert class components to functional components
* (tt-tom17) Add confirmation dialog for station and journey deletion
* (tt-tom17) Auto-save and delete ioBroker object tree on station/journey removal
* (tt-tom17) Upgrade admin dependencies

### 0.0.5 (2026-03-03)  
* (tt-tom17) Upgrade dependency

### 0.0.4 (2026-02-16)
* (tt-tom17)   optimization react pages

### 0.0.1-preAlpha.0 (2025-12-01)
* (tt-tom17) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025 - 2026 tt-tom17 <tgb@kabelmail.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.