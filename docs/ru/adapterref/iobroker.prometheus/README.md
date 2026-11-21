---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.prometheus/README.md
title: ioBroker.prometheus
hash: r8Fugf+SQQbOngjvDsxekQqVWucudwrEDaDTbnOPV2g=
---
![Логотип](../../../en/adapterref/iobroker.prometheus/admin/prometheus.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.prometheus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.prometheus.svg)
![Количество установок](https://iobroker.live/badges/prometheus-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/prometheus-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.prometheus.png?downloads=true)
![Тестирование и выпуск](https://github.com/bloop16/ioBroker.prometheus/workflows/Test%20and%20Release/badge.svg)

# ioBroker.prometheus

## Адаптер Prometheus для ioBroker

Обеспечивает двустороннюю связь ioBroker с [Prometheus](https://prometheus.io/) : он опрашивает ваш сервер Prometheus через HTTP API и сохраняет агрегированные результаты запросов в виде состояний ioBroker, а также может отображать выбранные состояния ioBroker на сервере Prometheus. `/metrics` Конечная точка для сбора данных с помощью Prometheus. Все настраивается визуально в административном интерфейсе — **знание PromQL не требуется** .

**Prometheus® — зарегистрированная торговая марка The Linux Foundation. Данный адаптер является независимым проектом сообщества и не связан с проектом Prometheus или The Linux Foundation, а также не получает от них поддержки.**

## Функции

- Один централизованно настроенный сервер Prometheus (URL, дополнительная базовая аутентификация, проверка соединения).
- Любое количество источников: каждый источник объединяет один запрос и один интервал опроса.
- Визуальная настройка запросов:
  - Инструмент выбора **метрик** с функцией автозаполнения, загружаемый в режиме реального времени. `/api/v1/label/__name__/values`
  - **Обзор метрик** : отображает количество рядов данных, а также все метки и их значения для выбранной метрики, что позволяет создавать фильтры без лишних догадок.
  - Выпадающий список **агрегирования** : последнее значение, среднее значение, сумма, минимум, максимум, количество элементов в ряду.
  - **Фильтры** : до 5 пар метка/значение — оба параметра выбираются из выпадающих списков с возможностью поиска и загружаются в режиме реального времени. `/api/v1/labels` и `/api/v1/label/<name>/values` Свободный текст не требуется; удаление метки ("— без фильтра —") снимает фильтр.
  - **Группировка по** : множественный выбор меток; для каждой комбинации значений меток создается отдельное состояние.
  - **Предварительный просмотр в реальном времени** : отображает сгенерированный PromQL-запрос и его текущий результат перед сохранением.
- Запрос PromQL всегда формируется на стороне сервера на основе структурированных полей — никогда на основе свободного текста.
- Надежный опрос: недоступный сервер Prometheus никогда не приводит к сбою адаптера; ошибка регистрируется и записывается в журнал. `error` Опросы общественного мнения и опросы общественного мнения продолжатся в следующем цикле.
- Дополнительная базовая HTTP-аутентификация (применяется ко всем источникам)
- **Экспортер Pull** (активируется отдельно): предоставляет доступ к выбранным состояниям ioBroker. `/metrics` конечная точка — точки данных выбираются в настройках объекта каждого состояния, как и в адаптерах influxdb/history.
- Статистика парсинга: `info.lastScrape`, `info.scrapeCount` и `info.scrapeInterval` показать, как часто Prometheus фактически выполняет парсинг конечной точки
- Поддерживается компактный режим

## Конфигурация

1. Введите базовый URL-адрес вашего сервера Prometheus (например, `http://192.168.1.10:9090` — голый `192.168.1.10:9090` (тоже работает) и используйте **функцию проверки соединения** , чтобы убедиться в этом. Если сервер требует базовой HTTP-аутентификации, введите имя пользователя и пароль. Сохраните конфигурацию один раз, чтобы выпадающие списки в реальном времени использовали настройки сервера.
2. Добавьте источник и выберите метрику из выпадающего списка — список будет загружен в режиме реального времени с сервера.
3. Выберите тип агрегирования, а также, при необходимости, фильтры и метки для группировки.
4. Проверьте предварительный просмотр в реальном времени: он отображает сгенерированный запрос и его текущий результат.
5. Выберите интервал опроса и (при желании) путь к целевой точке данных, затем сохраните.

### HTTPS с внутренним центром сертификации.

Если ваш сервер Prometheus использует сертификат, подписанный внутренним (частным) центром сертификации, вставьте сертификат центра сертификации в формате PEM (включая...). `-----BEGIN CERTIFICATE-----` /`-----END CERTIFICATE-----` строк) в **пользовательский сертификат центра сертификации** . Можно вставить несколько сертификатов (например, корневой и промежуточный) один за другим. Они будут считаться доверенными в дополнение к стандартным корневым сертификатам.

**Не проверяйте, принимает ли TLS-сертификат** какой-либо серверный сертификат. Это предназначено только для тестирования, поскольку в этом случае соединение перестает быть защищенным от атак типа «человек посередине».

## Экспортер (ioBroker в Prometheus)

Адаптер также может работать в обратном направлении: он предоставляет доступ к выбранным состояниям ioBroker. `/metrics` конечная точка (формат текстового представления Prometheus), чтобы ваш сервер Prometheus мог их собирать — как экспортер узлов для вашего умного дома.

1. Включите экспортер в настройках экземпляра (порт, по умолчанию). `9126`).
2. Откройте настройки объекта для любой числовой или логической точки данных и установите флажок **«Включено»** на вкладке адаптера, чтобы экспортировать его. При желании задайте пользовательское имя метрики (по умолчанию: `iobroker_state` (с идентификатором и именем состояния в качестве меток). Нечисловые состояния (строки, объекты) нельзя экспортировать — Prometheus хранит только числа — и вместо настроек отображается уведомление. Изменения вступают в силу немедленно, перезапуск адаптера не требуется.
3. Добавьте задачу по удалению данных в ваш `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: iobroker
    static_configs:
      - targets: ["<iobroker-ip>:9126"]
```

Prometheus сохраняет каждое сканирование как выборку временного ряда, поэтому история и панели мониторинга Grafana работают без проблем. Обратите внимание, что значения, изменяющиеся быстрее, чем интервал сканирования, отбираются, а не записываются полностью; логические значения экспортируются как 0/1.

Данная конечная точка также используется для сбора собственных метрик. `iobroker_exporter_scrapes_total` и `iobroker_exporter_exported_states`, а адаптер отображает статистику сбора данных в состояниях. `info.lastScrape`, `info.scrapeCount` и `info.scrapeInterval` Таким образом, вы можете проверить фактическую частоту сбора данных непосредственно в ioBroker.

## Созданные состояния

Для каждого источника адаптер создает следующие состояния, указанные ниже. `metrics.<target path>` (Путь можно настроить для каждого источника отдельно, по умолчанию используется имя источника):

| Состояние      | Описание                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------- |
| `value`        | Результат запроса (только для запросов без группировки)                                  |
| `<groupValue>` | Одно состояние на каждую комбинацию значений меток (только для запросов с группировкой). |
| `query`        | Сгенерированный PromQL-запрос                                                            |
| `lastUpdate`   | Отметка времени последнего успешного обновления                                          |
| `error`        | Последнее сообщение об ошибке; пустое, хотя всё в порядке.                               |

`info.connection` является `true` при условии, что все включенные источники доступны (запрос, не возвращающий данных, не считается проблемой подключения). При включенном экспортере, `info.lastScrape`, `info.scrapeCount` и `info.scrapeInterval` отразить результаты сбора данных вашим сервером Prometheus.

## Известные ограничения

- Состояния, созданные для значений меток группировки, которые больше не существуют, не удаляются автоматически.
- Все источники обращаются к единственному настроенному серверу Prometheus.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.2 (2026-11-15)
- (bloop16) Object settings: removed the duplicate export checkbox, the built-in "Enabled" checkbox now controls the export alone
- (bloop16) HTTPS servers signed by an internal CA are supported: a custom CA certificate can be configured, certificate verification can optionally be disabled (#15)
- (bloop16) Exporter: unacknowledged commands (ack=false) are no longer exported
- (bloop16) Connection type set to "cloud", as the Prometheus server can be remote
- (bloop16) Added the missing translations of the "Test connection" result
- (bloop16) Dependencies have been updated

### 1.0.1 (2026-10-18)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.0.0 (2026-09-15)

- (Martin Rauscher) initial release
- visual query builder: live metric/label/value dropdowns, metric overview, aggregation,
  filters, group-by and live preview - no PromQL knowledge required
- per-source poll interval; group-by results create one state per label value combination
- pull exporter: expose selected ioBroker states on /metrics (per-datapoint activation in the
  object settings), including scrape statistics

Older changes can be found in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 Martin Rauscher <bloop16@hotmail.com>

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