---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.influxdb-prologger/README.md
title: ioBroker.influxdb-prologger
hash: 790TWubjJyY0CR5rsVb581LTViLkEz9OZK5TcWf39MM=
---
![Логотип](../../../en/adapterref/iobroker.influxdb-prologger/admin/influxdb-prologger.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.influxdb-prologger.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.influxdb-prologger.svg)
![Количество установок](https://iobroker.live/badges/influxdb-prologger-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/influxdb-prologger-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.influxdb-prologger.png?downloads=true)

# IoBroker.influxdb-prologger
**Тесты:** ![Тестирование и выпуск](https://github.com/simpros/ioBroker.influxdb-prologger/workflows/Test%20and%20Release/badge.svg)

## Адаптер InfluxDB ProLogger для ioBroker
Гибкий регистратор данных InfluxDB v2 с настраиваемыми группами логирования, поддержкой нескольких сегментов, триггерами на основе cron и триггерами при изменении.

> **Важно:** Этот адаптер является **регистратором данных только для записи**. Он отправляет значения состояния ioBroker *в* InfluxDB v2 — он **не** считывает исторические данные обратно в ioBroker и не реализует стандартный интерфейс адаптера истории ioBroker. Если вам необходимо запрашивать сохраненные исторические данные внутри ioBroker (например, для графиков или скриптов через `getHistory`), используйте вместо этого официальный [адаптер ioBroker InfluxDB](https://github.com/ioBroker/ioBroker.influxdb).
> > Цель этого адаптера — предоставить вам больше гибкости в *способе* записи данных в InfluxDB: вы можете определить несколько групп логирования с различными сегментами, типами триггеров (cron или on-change), пользовательскими именами измерений, ключами полей и тегами — независимо от встроенной системы истории ioBroker.

## Функции
- **Несколько групп логирования** - Определяйте отдельные группы с различными сегментами InfluxDB и типами триггеров.
- **Ведение логов на основе Cron** - Периодический сбор и пакетная запись данных (например, каждые 15 минут)
- **Журнал изменений** - Мгновенная запись данных в InfluxDB при изменении значения состояния (спонтанные записи)
- **Несколько сегментов** - Каждая группа логирования может записывать данные в отдельный сегмент InfluxDB.
- **Протокол InfluxDB v2** - Запись данных через собственный HTTP API с использованием протокола InfluxDB
- **Повторная попытка с экспоненциальной задержкой** - Настраиваемая логика повторных попыток для неудачных операций записи.
- **Зашифрованное хранение токенов** - API-токен хранится в зашифрованном виде в базе данных ioBroker.
- **Проверка соединения** - Проверьте подключение к InfluxDB непосредственно из административного интерфейса.
- **Административный интерфейс** - Полностью настраивается через административный интерфейс ioBroker (конфигурация в формате JSON)

## Требования
- ioBroker с js-контроллером >= 6.0.11
- ioBroker Admin >= 7.0.23
- Node.js >= 20
- Экземпляр InfluxDB v2

## Конфигурация
### 1. Вкладка «Подключение»
Настройте подключение к InfluxDB v2:

| Настройки | Описание |
|---------|-------------|
| Протокол | HTTP или HTTPS |
| Хост | Имя хоста или IP-адрес сервера InfluxDB (например, `192.168.10.191`) |
| Порт | Порт сервера InfluxDB (по умолчанию: `8086`) |
| Организация | Название вашей организации в InfluxDB |
| API-токен | API-токен InfluxDB (хранится в зашифрованном виде) |

Для проверки подключения используйте кнопку **Проверить соединение**.

### 2. Вкладка «Группы ведения журналов»
Определите одну или несколько групп ведения журналов. Каждая группа включает в себя:

| Настройки | Описание |
|---------|-------------|
| Включено | Включить/отключить эту группу |
| Название группы | Уникальное название для этой группы (используется в качестве ориентира для точек данных) |
| Корзина | Корзина InfluxDB для записи |
| Тип триггера | `Cron (periodic)` или `On Change` |
| Выражение Cron | Расписание Cron (только для групп cron), например, `*/15 *** *` |
| Пакетная обработка | Включить пакетную запись (для групп cron) |

**Примеры групп:**

| Имя | Корзина | Триггер | Cron |
|------|--------|---------|------|
| Бетрибсстунден | иоброкер | Крон | `*/15 * * * *` |
| Спонтанверте | iob_спонтанверте | Об изменении | - |

### 3. Вкладка «Точки данных»
Настройте, какие состояния ioBroker следует регистрировать. Каждая точка данных должна ссылаться на группу логирования:

| Настройки | Описание |
|---------|-------------|
| Включено | Включить/отключить эту точку данных |
| Группа | Название группы ведения журнала (должно совпадать с группой из вкладки 2) |
| Идентификатор объекта | Состояние ioBroker для чтения (используйте браузер объектов) |
| Измерение | Название измерения InfluxDB |
| Поле | Название поля InfluxDB |
| Теги | Теги InfluxDB в формате `key=value` (например, `area=kitchen,floor=eg`) |

**Примеры данных:**

| Группа | Идентификатор объекта | Измерение | Поле | Теги |
|-------|-----------|-------------|-------|------|
| Бетрибсстунден | `0_userdata.0.Heizkessel` | betriebsсекунды | Целерстенд | `area=heizkessel` |
| Спонтанверте | `shelly.1.EM0.TotalActivePower` | энергия | электрише_лейстунг_хаус | `area=gesamtenergiebedarf` |

### 4. Вкладка «Дополнительно»
| Настройки | Описание |
|---------|-------------|
| Таймаут записи | Таймаут HTTP-запроса в мс (по умолчанию: 5000) |
| Повторная попытка при ошибке | Повторная попытка записи при неудачных операциях с экспоненциальной задержкой |
| Максимальное количество попыток | Максимальное количество попыток повтора (по умолчанию: 3) |
| Ведение отладочного журнала | Включить подробное ведение отладочного журнала |

## Как это работает
### Группы Cron (периодическое логирование)
1. С каждым интервалом cron адаптер считывает все настроенные значения состояния в группе.
2. Значения отформатированы в соответствии с протоколом InfluxDB.
3. Все строки записываются в InfluxDB пакетом за один HTTP POST-запрос.

### Группы изменений (спонтанная регистрация событий)
1. Адаптер подписывается на состояние ioBroker каждой точки данных.
2. При изменении значения состояния новое значение немедленно записывается в InfluxDB.
3. Каждое изменение запускает отдельный HTTP POST-запрос.

### Протокол InfluxDB
Данные записываются с использованием протокола InfluxDB v2:

```
measurement,tag1=value1,tag2=value2 field=value
```

Пример:

```
betriebssekunden,area=heizkessel zaehlerstand=12345.6
energie,area=gesamtenergiebedarf elektrische_leistung_haus=4521.3
```

## Миграция со скриптов ioBroker
Если вы в настоящее время используете JavaScript-скрипты ioBroker для ведения журналов InfluxDB, вы можете перейти на этот адаптер:

1. Установите адаптер.
2. Настройте подключение к InfluxDB (используйте тот же хост, порт, организацию и токен).
3. Создайте группы логирования, соответствующие настройкам вашего скрипта:
- Скрипты, использующие `on({ id: ..., val: true })` с состоянием триггера -> Создание группы **Cron**
- Скрипты, использующие `on({ id: objectId })` для каждого состояния -> Создайте группу **При изменении**
4. Добавьте все точки данных из ваших массивов `loggingTemplate`.
5. Отключите старые скрипты.
6. Убедитесь, что данные поступают в InfluxDB.

## Скрипты в `package.json`
| Название скрипта | Описание |
|-------------|-------------|
| `build` | Компиляция исходного кода TypeScript |
| `test:ts` | Выполнить тесты, определенные в файлах `*.test.ts` |
| `test:package` | Убедитесь, что `package.json` и `io-package.json` являются допустимыми |
| `test` | Выполните минимальный запуск тестирования файлов пакета и ваших тестов |
| `check` | Выполнить проверку типов вашего кода (без компиляции) |
| `lint` | Запустите ESLint, чтобы проверить код на наличие ошибок форматирования и потенциальных ошибок |
| `translate` | Перевод текстов в адаптере на все необходимые языки |
| `release` | Создать новый релиз |
| `релиз` | Создать новый релиз |

## Changelog
### 1.1.0 (2026-06-26)

* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (Simon Prosen) Reduced excess spacing in the admin UI header by keeping configuration tab labels on a single line
* (Simon Prosen) Spontaneous (on-change) writes are now buffered with a configurable flush window (default 5000ms, adjustable per bucket)

### 1.0.1 (2026-04-13)

* (Simon Prosen) Fixed ack handling for on-change writes so acknowledged updates are processed correctly
* (Simon Prosen) Improved admin UI responsiveness on small screens with scrollable tabs and more flexible layouts
* (Simon Prosen) Removed the batch-write toggle from the admin UI and enforce batching based on trigger type
* (Simon Prosen) Added and improved translations for additional languages in the admin UI
* (Simon Prosen) Moved admin UI packages to `devDependencies` and consolidated the project package setup
* (Simon Prosen) Updated admin logo assets and added an SVG variant
* (Simon Prosen) Refreshed build, test, TypeScript, and dependency configuration from the current template and dependency updates

### 1.0.0 (2026-03-21)
* (Simon Prosen) InfluxDB v2.x support via native HTTP API with token-based authentication
* (Simon Prosen) Dual-mode logging: cron-based periodic collection and on-change real-time writes
* (Simon Prosen) Multiple logging groups with independent bucket, trigger type, and cron schedule
* (Simon Prosen) Configurable data points with custom measurement names, field keys, and InfluxDB tags
* (Simon Prosen) InfluxDB line protocol formatting with proper type handling for strings, booleans, and numbers
* (Simon Prosen) Batch writing for cron groups combining all data points into a single HTTP request
* (Simon Prosen) Exponential backoff retry logic with smart classification (4xx no-retry, 429/5xx retry)
* (Simon Prosen) Configurable write timeout and retry attempts
* (Simon Prosen) Encrypted API token storage using ioBroker's native encryption
* (Simon Prosen) Connection health check on startup with `info.connection` state indicator
* (Simon Prosen) Admin UI with Connection, Logging Groups, Data Points, and Advanced tabs
* (Simon Prosen) Object browser for visual ioBroker state selection in admin UI
* (Simon Prosen) Connection test button for validating InfluxDB connectivity from admin UI
* (Simon Prosen) Cascading group rename updates across all referencing data points
* (Simon Prosen) Startup validation with warnings for missing or misconfigured groups and data points
* (Simon Prosen) Graceful shutdown with cron job cleanup and subscription removal
* (Simon Prosen) Debug logging mode for troubleshooting
* (Simon Prosen) English and German translations

### 0.0.1 (2026-03-20)
* (Simon Prosen) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Simon Prosen <simon@prosen.dev>

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