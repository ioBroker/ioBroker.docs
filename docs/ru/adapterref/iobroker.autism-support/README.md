---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.autism-support/README.md
title: ioBroker.autism-support
hash: 7DvbEYbOQSlbMEUSRB1kQwIZZsGkD+Hs0vSy6WqWSI4=
---
# ioBroker.autism-support

Поддержка людей с аутизмом в ioBroker: **визуальный обратный отсчет** , **ежедневное расписание с временной шкалой** и пиктограммы.

Источник пиктограммы и термины: [ARASAAC](https://arasaac.org) . Отображение предназначено для планшетов, настенных дисплеев или аналогичных устройств с использованием **технологии VIS-2** .

## Визуальный обратный отсчет

Визуальный обратный отсчет в виде геометрической рамки (по умолчанию: квадратная) с круговым индикатором прогресса, начинающимся от центра.

### Штаты (`autism-support.0.timer.*`)

| Состояние                                | Описание                           |
| ---------------------------------------- | ---------------------------------- |
| `duration`                               | Общая продолжительность в секундах |
| `remaining`                              | Осталось секунд                    |
| `elapsed`                                | Прошедшие секунды                  |
| `running` /`paused` /`finished`          | Статус                             |
| `start` /`pause` /`resume` /`stop`       | Команды (запись) `true`)           |
| `setDurationHours` /`setDurationMinutes` | Установить продолжительность       |

### Виджеты VIS-2

| Виджет                                          | Цель                             |
| ----------------------------------------------- | -------------------------------- |
| **Визуальный обратный отсчет (в прямом эфире)** | Большой дисплей для пользователя |
| **Визуальный обратный отсчет (Настройки)**      | Контроль за родителями/опекунами |

## Ежедневное расписание с указанием времени.

Гибкий список пиктограмм с индивидуальными временными интервалами. **Цветная полоса, отображающая период дня** справа, адаптируется к **количеству и продолжительности пиктограмм** (временной интервал от первой до последней записи), а также включает маркер **текущего момента** .

### Администратор: дневные периоды

На вкладке «Администрирование» **«Дневные периоды»** можно настроить начало/конец (ЧЧ:ММ) и цвет для каждого периода. Ночной режим может переходить за полночь (например, с 21:00 до 06:00). В виджете **«Ежедневное расписание (Настройка)»** периоды можно дополнительно включать или отключать.

### Еженедельный план

Виджет **«Ежедневное/еженедельное расписание (настройка)»** позволяет редактировать всю неделю (вкладки «Пн–Вс»), копировать один день в другие будние дни, а также сохранять/загружать именованные еженедельные шаблоны. Вкладка «Администрирование» в разделе « **Еженедельный план»** устанавливает цвета фона будних дней и отображает список сохраненных шаблонов (переименовывать/удалять; **●** = загружены/активны в данный момент). Включите опцию **«Загружать ежедневный план из еженедельного плана каждый день»** , чтобы `schedule.plan` Заполняется автоматически из сегодняшнего буднего дня.

### Штаты (`autism-support.0.schedule.*`)

| Состояние             | Описание                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| `plan`                | Ежедневный план в формате JSON с записями (метка, начало/конец, источник пиктограммы)                |
| `weeklyPlan`          | Активный недельный план (JSON, планы на понедельник-воскресенье)                                     |
| `weeklyPlansLibrary`  | Сохраненные еженедельные шаблоны +`activeId` загруженного плана                                      |
| `loadDailyFromWeekly` | Скопируйте сегодняшнее еженедельное расписание в `plan` каждый день                                   |
| `weekdayColors`       | Цвета будних дней из административной панели (JSON, только для чтения)                               |
| `periods`             | Периоды суток из конфигурации администратора (JSON, только для чтения)                               |
| `periodOverrides`     | Переопределение параметров включения/выключения из виджета конфигурации (JSON, доступен для записи). |
| `clearAfterLast`      | Очистить план после окончания последней пиктограммы (логическое значение)                            |
| `nowMinutes`          | Текущее количество минут с полуночи (местное время)                                                  |
| `currentPeriod`       | Идентификатор текущего дня                                                                           |
| `currentItemIndex`    | Указатель активных записей плана (`-1` = нет)                                                        |

### Виджеты VIS-2

| Виджет                                                   | Цель                                                                                                                                   |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Расписание на день (в режиме реального времени)**      | Пиктограммы сегодняшнего дня + временная шкала                                                                                         |
| **Еженедельное расписание (в режиме реального времени)** | Обзор недели с цветовой маркировкой дней недели в административной панели.                                                             |
| **Ежедневное/еженедельное расписание (настройка)**       | Вкладки с днями недели, копирование дней, сохранение/загрузка шаблонов, ежедневная синхронизация, ARASAAC/пользовательские пиктограммы |

### Источники пиктограмм

1. **ARASAAC (внешний)** – хранится только идентификатор пиктограммы; изображение загружается во время выполнения из `static.arasaac.org` В пакете адаптера отсутствуют файлы ARASAAC.
2. **Пользовательская загрузка** — через настройки экземпляра адаптера в разделе «Администрирование» (вкладка «Пиктограммы»). Виджеты vis-2 не могут надежно загружать файлы.

Пользовательские изображения хранятся в файловом хранилище **vis-2** по адресу: `vis-2.0/Autism Support/pictograms/` (URL `/vis-2.0/Autism Support/pictograms/...`). `pictograms` Папка создается автоматически при запуске адаптера. Загрузка изображений осуществляется через Администрирование → **Файлы** (или по ссылке в настройках экземпляра).

## Разработка

Требования: Node.js ≥ 22, ioBroker с `vis-2`.

```bash
npm install
cd src-widgets-ts && npm install && cd ..
npm run build
npm run dev-server setup
npm run dev-server watch
```

Разработка виджетов (параллельно):

```bash
cd src-widgets-ts
npm run start
```

## Автор

Маттиас Ульрих ( [@MatthiasUlrich1](https://github.com/MatthiasUlrich1) )

## Changelog

See CHANGELOG_OLD.md for older entries.

### 0.2.14

* Fix red instance after 0.2.13 update: migrate pictograms from old German vis-2 folder to 'Autism Support', robust startup without vis-2

### 0.2.13

* Latest-repo review fixes: English vis-2 folder names, widget i18n translations, ARASAAC fetch timeout, modern nogit build setup

### 0.2.12

* Remove leftover Admin sidebar tab that could not be opened

### 0.2.11

* Latest repository review fixes: English package description, translations, remove unused custom config, responsive admin tabs

### 0.2.10
- Repo-check compliance: remove unpublished versions from `common.news`, update README changelog

### 0.2.8
- Fix startup crash/restart loop: no `system.adapter` native write on boot; cancel in-flight ready on unload

### 0.2.7
- Fix restart loop (native config diff) and CI lint formatting

### 0.2.5
- Fix `system.adapter` config path (`extendForeignObject`); trim news for E1032

### 0.2.2
- Fix object structure for latest-repo review: `timer` channel, `value.interval` roles, button `read: false`

### 0.2.1
- Weekly plans: weekday tabs in Config, copy to other days, named templates (save/load)
- Admin: weekday colors + list of saved plans with active/loaded marker
- New Live widget: week overview; optional daily sync from weekly plan

### 0.1.27
- ioBroker compliance: max 7 news entries, jsonConfig schema, admin i18n keys, English title/desc

## License

Copyright (c) 2026 Matthias Ulrich <MatthiasUlrich1@gmail.com>

### This adapter

**MIT** – see [LICENSE](https://github.com/MatthiasUlrich1/ioBroker.autism-support/blob/main/LICENSE).

### ARASAAC pictograms (external content)

This adapter **does not contain or redistribute** ARASAAC image files.

- **Source:** [ARASAAC](https://arasaac.org) / [API](https://api.arasaac.org) / CDN `https://static.arasaac.org`
- **License:** [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
- **Author:** Sergio Palao · **Owner:** Government of Aragon

Recommended attribution:

> The pictographic symbols used are the property of the Government of Aragon and have been created by Sergio Palao for ARASAAC (https://arasaac.org), which distributes them under a Creative Commons license (BY-NC-SA).

Live/config widgets show this attribution when the plan contains ARASAAC entries.

Official terms: [ARASAAC Terms of Use](https://aulaabierta.arasaac.org/en/terms-of-use)

### Custom / uploaded pictograms

You are responsible for having the required rights for uploads. Upload and tagging happen in the Admin instance settings. The adapter stores files locally in the instance only; they are not shipped in the npm/GitHub package.