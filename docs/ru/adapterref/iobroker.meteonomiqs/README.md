---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.meteonomiqs/README.md
title: ioBroker.meteonomiqs
hash: YhiZxaehmR1e3HgaGORNP59tHROkAb3hIIkjmaclZjA=
---
![Логотип](../../../en/adapterref/iobroker.meteonomiqs/admin/meteonomiqs.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.meteonomiqs.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.meteonomiqs.svg)
![Количество установок](https://iobroker.live/badges/meteonomiqs-installed.svg)
![Лицензия](https://img.shields.io/github/license/Schimi1983/ioBroker.meteonomiqs)
![НПМ](https://nodei.co/npm/iobroker.meteonomiqs.png?downloads=true)

# ioBroker.meteonomiqs

[![Тестирование и выпуск](https://github.com/Schimi1983/ioBroker.meteonomiqs/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Schimi1983/ioBroker.meteonomiqs/actions/workflows/test-and-release.yml)

Прогноз погоды от **wetter.com** через [API общедоступной погоды Meteonomiqs v4.0](https://doc.meteonomiqs.com/doc/forecast_v4_0.html).

Прогноз погоды на срок до 14 дней, данные по дням, почасовые значения, текущий час, предупреждения о погоде, данные о Солнце и Луне — все из одного источника. **одинокий** API-запрос за один запрос. Адаптер построен с учетом того, что бесплатный тарифный план позволяет совершать только 100 запросов в месяц.

---

## Функции

|                             |                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Ежедневный прогноз**      | 1–14 дней: температура, осадки, ветер, облачность, влажность, продолжительность солнечного сияния, давление. |
| **Дневные разделы**         | Утро, день, вечер и ночь в течение дня                                                                       |
| **Почасовые значения**      | На один или несколько дней, с расчётами в часовом поясе места прогнозирования.                               |
| **`current` папка**         | Идёт час, освежился **каждый час без вызова API**                                                            |
| **Предупреждения о погоде** | Групповой, текстовый и числовой уровень серьезности (0–4) — сравнение строк в скриптах не требуется.         |
| **Солнце и луна**           | Восход солнца, закат, сумерки, продолжительность дня, восход луны, фаза луны, зодиакальный знак              |
| **Снег**                    | Снежная линия, свежий снег, эквивалент воды в снеге                                                          |
| **JSON-агрегаты**           | `forecast_json` и `hourly_json` для виджетов VIS, Jarvis и Material                                          |
| **Управление бюджетом**     | Приоритетные уровни, которые плавно снижают приоритет, а не останавливаются.                                 |
| **Правильные значки**       | Использует значок, предоставляемый API, включая варианты для ночного времени, грозы и ветра.                 |

---

## Установка

Установите адаптер через административный интерфейс ioBroker.

### ключ API

Для использования необходим ключ, который можно получить по адресу: [Метеономики](https://www.meteonomiqs.com/de/wetter-api/)Бесплатный тарифный план в настоящее время включает 100 звонков в месяц, что точно соответствует расписанию по умолчанию. Ключ хранится **зашифрованный** в конфигурации экземпляра.

---

## Конфигурация

### Общий

| Параметр                                     | Значение                                                                                                                                 |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| ключ API                                     | Ваш ключ Meteonomiqs. Хранится в зашифрованном виде.                                                                                     |
| Используйте местоположение системы ioBroker. | Получает широту/долготу из _Настройки → Система → Местоположени&#x435;_&#x41E;тключите эту функцию, чтобы не вводить координаты вручную. |
| Язык текстов о погоде                        | Применяется к описаниям, предоставляемым API. Пусто = системный язык ioBroker.                                                           |
| Прогнозируемые дни                           | 1–14. Снижение значения удаляет папки с днями, которые больше не нужны.                                                                  |

### Расписание

Время выборки — это таблица `HH:MM` плюс **приоритет**По умолчанию:

| Время | Приоритет | Цель                                                                                       |
| ----- | --------- | ------------------------------------------------------------------------------------------ |
| 01:10 | 1         | Планирование дня — полный прогноз погоды составляется еще до того, как кто-либо проснется. |
| 11:40 | 2         | Коррекция перед критическим днем: грозы, порывы ветра, пик жары.                           |
| 18:40 | 3         | Ночь и завтра: заморозки, грозы, прогноз на следующее утро.                                |

Каждая установка сдвигает эти временные интервалы на фиксированное смещение до 15 минут, определяемое по UUID установки ioBroker — в противном случае каждая установка этого адаптера обращалась бы к API в одну и ту же минуту. Смещение одинаково для всех трех временных интервалов, поэтому промежутки между ними остаются точно такими, как настроено. Фактически используемое время записывается в журнал при запуске.

**Минимальное количество часов между обновлениями** Это таймер перезарядки, предотвращающий зацикливание перезапуска. Он должен быть _меньший_ чем кратчайший промежуток между двумя запросами — в противном случае каждый день пропускается один запрос. Адаптер проверяет это при запуске и записывает ошибку в журнал, если эти значения не совпадают.

### бюджет API

Три запроса в день приводят к 93 звонкам за 31 день месяца — на 7 меньше, чем 100 звонков в бесплатном плане. Вместо того чтобы достигать предела в конце месяца, каждый запрос имеет свой приоритетный уровень:

> Поиск объектов уровня N выполняется только до тех пор, пока остаются средства в бюджете. **N звонков в день** до конца месяца.

Когда ситуация становится напряженной, вечерний сбор данных прекращается первым, затем дневной. Ночной сбор данных длится дольше всего и в экстренной ситуации переключается на сбор данных через день, вместо того чтобы прекращаться вовсе. Подтверждено в течение целого смоделированного месяца:

| Отправная точка                  | Использованные звонки | 01:10 | 11:40 | 18:40 |
| -------------------------------- | --------------------- | ----- | ----- | ----- |
| Чистый месяц (31 день)           | 93 / 100              | 31    | 31    | 31    |
| 20 звонков уже потрачены впустую | 98 / 100              | 31    | 31    | 16    |
| 40 звонков уже потрачены впустую | 99 / 100              | 31    | 28    | 0     |
| 70 звонков уже потрачены впустую | 100 / 100             | 30    | 0     | 0     |

Счетчик — это **местная оценка** — API не сообщает об оставшемся объеме квоты. Только HTTP-код 429 является достоверной информацией. `info.reset_counter` Если вам когда-либо понадобится, он обнулит это значение.

### Данные

Все данные поступают из одного и того же API-ответа, поэтому включение большего количества групп влечет за собой дополнительные расходы. **никаких дополнительных звонков** — только больше объектов. Примерные размеры на 7 дней прогноза:

| Конфигурация                                     | Объекты |
| ------------------------------------------------ | ------- |
| Всё включено, почасовая оплата в течение 2 дней. | \~2430  |
| Почасовая оплата в течение 1 дня                 | \~1780  |
| Почасовой отпуск                                 | \~1130  |
| Только суточные значения                         | \~380   |

На Raspberry Pi разумным компромиссом является отображение почасовых значений за сутки.

---

## Дерево штата

```
meteonomiqs.0
├── info
│   ├── connection            Connected to the API
│   ├── status                ok / no API key / HTTP 429 / …
│   ├── last_sync             Last successful fetch
│   ├── requests_month        Local estimate of calls used this month
│   ├── requests_left         Remaining calls
│   ├── force_update          Button: fetch now (skips the cooldown)
│   └── reset_counter         Button: reset the monthly counter
├── current                   The hour in progress, refreshed hourly
│   ├── temp, weather_text, weather_icon, is_night, …
│   ├── temp_min_today, temp_max_today, sunrise, sunset
│   ├── valid                 false when no data covers this hour
│   └── source                Which state the values were copied from
├── day_0 … day_N
│   ├── date, day_name, temp_min, temp_max, weather_icon, …
│   ├── warn_active, warn_severity_int
│   ├── astro                 sunrise, sunset, moon phase, day length …
│   ├── spaces                morning, afternoon, evening, night
│   └── hourly                00 … 23
├── forecast_json
└── hourly_json
```

### Две вещи, которые стоит знать об этом дереве.

**`day_N.spaces.night` ночь _после_ в тот день.** Таким образом, его минимум приходится на ранние часы `day_N+1`Чтение `day_0.spaces.night.temp_min` Отображает минимальный уровень за сегодня, а не за прошлую ночь.

**`wind_significant` поясняет значение значка.** API помечает сильный ветер в имени файла значка (`d_w_60.svg` вместо `d_60.svg`) независимо от `warn_active`В течение дня может наблюдаться изменение направления ветра без какого-либо официального предупреждения, поэтому значок и штаты, выдающие предупреждения, могут расходиться.

### `current` — как это работает

`current` отражает структуру `daswetter` и `open-meteo-weather` адаптеры, с двумя преднамеренными выборами:

**Обновление происходит ежечасно, а не только при получении данных.** А `current` Папка, которая обновляется только при запросе к API, к вечеру устареет на семь часов. Отдельный почасовой таймер копирует значения каждый полный час — это ничего не стоит, поскольку почасовые данные уже находятся в дереве объектов.

**Читайте из США, а не из тайника.** Чтение данных из кэша привело бы к следующему результату: `current` Пустое поле после каждого перезапуска адаптера до следующего запланированного запроса. Чтение из `day_N.hourly.HH.*` Всегда работает.

День решается посредством `date_iso` а не фиксированный индекс. Между полуночью и первым запросом данных за день "сегодняшний день" всё ещё существует. `day_1` — жестко закодированный `day_0` Это приводило бы к неправильному отображению значений в этом окне каждую ночь.

`current` является **прогноз** Это данные на текущий час, а не результаты измерения. Для получения значений в реальном времени потребуется следующее: `/nowcast` или `/stations` конечные точки, стоимость каждого запроса которых составляет один вызов и которые не вписываются в тарифный план на 100 вызовов.

---

## Разработка

```bash
npm install          # install dependencies
npm run build        # compile TypeScript to build/
npm run watch        # rebuild on change
npm run check        # type check without emitting
npm run lint         # ESLint
npm run test:ts      # unit tests
npm run test:package # validate package.json / io-package.json
npm run test:integration  # boots a real js-controller
npm run translate    # @iobroker/adapter-dev translation helper
```

Локальный тестовый экземпляр с [dev-сервер](https://github.com/ioBroker/dev-server):

```bash
npm install --global @iobroker/dev-server
dev-server setup
dev-server watch
```

---

Данные о погоде © [wetter.com GmbH / Meteonomiqs](https://www.meteonomiqs.com)Данный адаптер не связан с сайтом wetter.com.

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.7 (2026-09-06)

- Raised the required `@iobroker/adapter-core` to `^3.4.3` (`[W0034]`) and the release-script license plugin to `^5.2.2` (`[S0064]`). Both caret ranges already resolved to those versions; only the declared minimums lagged behind, so nothing changes at runtime

### 0.2.6 (2026-08-16)

- The buttons `info.force_update` and `info.reset_counter` are write-only now. A state with role `button` carries no value to read, and `read: true` made the admin offer it as a readable one (repository review)
- The `warn_severity_int` states in the day, day-section and hourly subtrees carry the generic `value` role. `value.severity` is not part of the ioBroker role catalogue (repository review)
- Both corrections reach existing installations on the next adapter start — the object metadata is compared and rewritten on drift

### 0.2.5 (2026-08-16)

- The field tables are covered by tests now: 138 of them, running every getter against a hand-built API response, plus the structural rules — unique ids, both label languages, roles from the ioBroker catalogue, unit and precision only on numbers. Every leaf of the fixture carries a value that appears nowhere else, so a getter reading `min` where it should read `max` cannot pass
- The admin translations moved to the short i18n form, `admin/i18n/<lang>.json` instead of `admin/i18n/<lang>/translations.json` (`[S5601]`)
- Added `.vscode/settings.json` with the ioBroker JSON schemas for `io-package.json` and `jsonConfig.json` (`[S4036]`)
- Nothing changes for an installation: no state, no role, no unit and no configuration option is affected

### 0.2.4 (2026-08-16)

- Raised the minimum admin version to 7.8.23 and `@types/node` to the major that matches `engines.node` — both proposed by the ioBroker bot

### 0.2.3 (2026-08-16)

- Installing from GitHub works again without an install lifecycle script. The compiled `build/` folder is committed to the repository, which is what the repository checker asks for (`[E5019]`), so the `prepare` script added in 0.2.1 could be dropped again (`[E0092]`)
- Trimmed `common.news` in io-package.json to the seven entries the repository builder keeps (`[E1032]`); the older ones moved to CHANGELOG_OLD.md (`[W6020]`)

### 0.2.2 (2026-08-16)

- Removed `mocha` from the devDependencies. It is a dependency of `@iobroker/testing`, so npm hoists it and the test scripts still find the binary — this clears the last error the repository checker reported (`[E0063]`)

### 0.2.1 (2026-08-16)

- The adapter can be installed straight from GitHub again. Since the compiled `build/` folder was removed from the repository (`[E5019]`), a GitHub installation had nothing to start; a `prepare` script now makes npm compile the TypeScript sources during such an installation. Installing from npm is unaffected — the published package already contains the compiled files

[Older changelogs can be found there](CHANGELOG_OLD.md)

---

## License

The MIT License (MIT)

Copyright (c) 2026 Schimi <szymon.haiduk@world-mg.de>

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