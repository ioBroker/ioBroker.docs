---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.pvforecast?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.pvforecast?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.pvforecast?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.pvforecast?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.pvforecast?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.pvforecast/test-and-release.yml?branch=main&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.pvforecast.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/pvforecast-stable.svg
BADGE-Installed: http://iobroker.live/badges/pvforecast-installed.svg
chapters: {"pages":{"de/adapterref/iobroker.pvforecast/README.md":{"title":{"de":"ioBroker.pvforecast"},"content":"de/adapterref/iobroker.pvforecast/README.md"},"de/adapterref/iobroker.pvforecast/vis.md":{"title":{"de":"ioBroker.pvforecast - VIS"},"content":"de/adapterref/iobroker.pvforecast/vis.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pvforecast/README.md
title: ioBroker.pvforecast
hash: Kb3rKJpIxmN5wZW4IU5YysJr8bw4nL3CrHhkuKEOQ70=
---
![логотип](../../../de/admin/pvforecast.png)

# IoBroker.pvforecast
Этот адаптер заменяет JavaScript из [форум ioBroker](https://forum.iobroker.net/topic/26068/forecast-solar-mit-dem-systeminfo-adapter)

Адаптер получает основные данные из различных сервисов прогнозирования и предоставляет их в соответствии с указаниями ioBroker.

## Поддерживаемые сервисы прогнозирования
- **Forecast.solar** - https://forecast.solar
- **Solcast** - https://solcast.com
- **SolarPredictionAPI** - через RapidAPI
- **pvnode** - https://pvnode.com

## Настройки
1. Долгота (-180° (запад) … 180° (восток))
2-я параллель -90 (юг) … 90 (север)
3. Ссылка на страницу
4. Ключ API
5. Уровень оси Y диаграммы
6. График получения данных (мин) - Расписание получения данных с сервера каждые x минут.

![pvforecast options](https://user-images.githubusercontent.com/76852173/155196476-8c8210d9-bdb2-456b-a0aa-1dd411efea5e.JPG)

Информацию о погоде также можно получить, используя ключ API (только для Forecast.solar).

1. datetime - Дата и время
2. Небо - значение от 0 до 1 в процентах для ясного неба [1 = ясное небо].
3. Температура [°C]
4. Условие - текст
5. иконка - текст + число
6. Скорость ветра - [км/ч]
7. Угол ветра - Север 0° [по часовой стрелке]. (Если скорость ветра равна нулю, значение не определено)
8. Направление ветра - краткое название
9. Более высокое временное разрешение

## Для системы доступны следующие настройки
1. Наклон (0°-90°)
2. Азимут (-180 = север, -90 = восток, 0 = юг, 90 = запад, 180 = север)
3. Выходная мощность системы (кВтп)
4. Название растения
5. Название легенды диаграммы
9. Цвет диаграммы
10. Цвет подписи на диаграмме

![pvforecast pvsystem](https://user-images.githubusercontent.com/76852173/155196535-6828775a-8234-4a6a-b2a3-03d7fd88c80d.JPG)

Вся эта информация необходима для обеспечения корректной работы адаптера.

Если широта и долгота уже сохранены в системе, система автоматически внесет данные в соответствующие поля.

## Pvnode
[pvnode](https://pvnode.com) — это немецкий сервис для высокоточных прогнозов солнечной энергии с 15-минутными интервалами. Адаптер поддерживает как **API v1** (конфигурация системы в адаптере), так и **API v2** (конфигурация системы на портале pvnode через идентификатор сайта).

**Предупреждение**: API pvnode версии 1 будет отключен **31 декабря 2026 г.**. С **1 января 2027 г.** адаптер будет возвращать ошибку и прекратит опрос, если настроена версия 1. Требуется переход на API версии 2 — см. [API pvnode v2](#pvnode-api-v2-empfohlen) ниже.

### Уровни учетных записей pvnode
| Функция | Бесплатно | Свет | Плюс |
|----------|------|-------|------|
| API-запросов в месяц | 250 | 3000 | 3000 |
| Обновлений в день | 1 | 24 (ежечасно) | 144 (каждые 10 минут) |
| Прогнозируемые дни | 1-2 (сегодня + завтра) | 1-7 | 1-7 |
| Солнечные панели | до 4 | до 4 | до 8 |
| Исторические данные | нет | нет | 30 дней |

Интервал **запросов** устанавливается адаптером автоматически в зависимости от выбранного уровня учетной записи и не требует ручной настройки:

| Уровень | Автоматический интервал |
|-------|------------------------|
| Бесплатно | 24 часа |
| Светлый | 60 минут |
| Плюс | 10 минут (текущая трансляция) |

### API pvnode версии 2 (рекомендуется)
В API v2 вся конфигурация системы (ориентация, наклон, питание) управляется непосредственно на портале pvnode через **идентификатор сайта**. Адаптеру требуется только идентификатор сайта — информация об азимуте/наклоне/питании в самом адаптере не нужна.

**Предварительное условие:** Перед настройкой адаптера необходимо создать объект на портале pvnode: https://pvnode.com/sites/new. Там вводятся все солнечные батареи (цепочки), включая их ориентацию, наклон и пиковую мощность. После сохранения портал предоставит идентификатор объекта.

**Конфигурация:**

1. **Ключ API**: Создайте его на сайте https://pvnode.com/api-keys
2. **Использовать API pvnode версии 2**: включите флажок
3. **Идентификатор сайта pvnode**: Идентификатор сайта из портала pvnode (например, `site_xxxx…`)
4. **Уровень подписки**: Бесплатный / Облегченный / Плюс (интервал получения данных определяется автоматически)
5. **Прогнозируемые дни**: Количество прогнозируемых дней (Бесплатно: максимум 2 – сегодня и завтра; Легко/Плюс: максимум 7)

**Таблица установок (v2):** Требуется как минимум одна запись. Имя используется для отображения; необязательная пиковая мощность используется для состояния «Установленная мощность». Адаптер запрашивает строковые данные из API v2 и присваивает каждую строку настроенной установке в соответствии с ее положением (Установка 1 → Строка 0, Установка 2 → Строка 1 и т. д.). Это позволяет получать прогнозы по отдельным участкам. Если строковые данные отсутствуют, общее значение для площадки сохраняется под первой установкой.

### API pvnode v1
В API версии 1 азимут, наклон и мощность настраиваются непосредственно в адаптере для каждой системы. Каждая система получает свой собственный вызов API.

**Конфигурация:**

1. **Ключ API**: Создайте его на сайте https://pvnode.com/api-keys
2. **Используйте API pvnode версии 2**: Оставьте флажок снятым
3. **Уровень подписки**: Бесплатный / Облегченный / Плюс
4. **Дни прогноза**: Количество дней прогноза (Бесплатно: максимум 2 – сегодня и завтра; Легко/Плюс: максимум 7)
5. **Дополнительные параметры**: Необязательные параметры API (только для версии 1), например, `diffuse_radiation_model=perez&snow_slide_coefficient=0.5`

**Процедура ротационного запроса (версия 1):** Для нескольких систем каждая система запрашивается один раз при запуске. Затем за цикл (по ротации) запрашивается только одна система. При N системах и интервале T каждая система обновляется каждые N×T. Пример: 3 системы, облегченный уровень (60 мин) → каждая система каждые 3 часа, 1 вызов API в час.

### Дополнительные параметры pvnode (только для версии 1)
| Параметры | Описание | Пример |
|-----------|--------------|---------|
| `diffuse_radiation_model` | Модель излучения | `perez` |
| `shading_config` | Конфигурация затенения | `7:2:3:1_1:1:0:0_0:0:0:0` |
| `shading_config` | Конфигурация затенения | `7:2:3:1_1:1:0:0_0:0:0:0` |

Формат: `key1=value1&key2=value2`

### Специальные возможности pvnode
- **15-минутное разрешение**: pvnode предоставляет прогнозные данные с 15-минутными интервалами (v1 и v2)
- **Преобразование азимута**: Адаптер автоматически преобразует значение азимута (адаптер: 0 = Юг) в формат pvnode (180 = Юг).
- **Интервал запроса**: устанавливается автоматически в зависимости от уровня учетной записи — ручная настройка не требуется.
- **Прогнозы для отдельных зон (v2)**: Если учетная запись pvnode предоставляет строковые данные, каждая настроенная система получает свой собственный прогноз. Значения Clearsky, температура и код погоды берутся из общесистемных данных.
- **Сводные данные**: JSON-файл со сводными данными содержит значения Clearsky, а также коды температуры и погоды.
— Поля «Утреннее затухание» и «Вечернее затухание» не используются для pvnode.

## Пример VIS
Перед загрузкой примера установите: [Материальный дизайн](https://github.com/Scrounger/ioBroker.vis-materialdesign).

Если вы хотите использовать JSON-диаграммы и таблицы в ioBroker Vis, вы можете найти [Пример](./vis.md) здесь.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (@patricknitsch) Change Free Tier Forecast from only today to today and tomorrow

### 6.2.0 (2026-07-06)
- (@patricknitsch) pvnode API v2 support: plant configuration via Site ID in the pvnode portal — create a site at https://pvnode.com/sites/new
- (@patricknitsch) pvnode v2: per-string forecasts — each configured plant receives its own forecast matched by index (plant 1 → string 0, etc.)
- (@patricknitsch) pvnode subscription tiers (Free / Light / Plus) replace the old paid-account checkbox; poll interval is set automatically per tier
- (@patricknitsch) pvnode v1: rotating round-robin fetch — one plant per poll cycle instead of one combined request; each plant receives an individual API call
- (@patricknitsch) Poll interval field hidden for pvnode (auto-managed)
- (@patricknitsch) Update Documentation of pvnode
- (@patricknitsch) Include warning for v1 and error after 31.12.26. The adapter cannot use v1 after this date anymore

### 6.1.0 (2026-04-26)
- (@mcm1957) Adapter requires node.js >= 22, js-controller >= 6.0.11 and admin >= 7.7.22 now
- (@mcm1957) Dependencies have been updated

### 6.0.0 (2026-04-10)

- (@patricknitsch) Added pvnode als alternative Provider
- (copilot) Adapter requires admin >= 7.7.22 now

### 5.1.0 (2026-02-03)

* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required
* (@Scrounger) solcast user agent bug fix
* (@klein0r) Updated dependencies

### 5.0.0 (2025-04-23)

NodeJS >= 20.x and js-controller >= 6 is required

* (@klein0r) Minimum peak power is 0.1 kWp

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2025 Patrick-Walther
                        Matthias Kleine <info@haus-automatisierung.com>

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