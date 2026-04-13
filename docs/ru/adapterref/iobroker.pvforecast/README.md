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
hash: RnzFvMyK05iDdvPpCZVyygS3oWkZedIRNwjB/iJZilg=
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
[pvnode](https://pvnode.com) — это немецкий сервис, предоставляющий высокоточные прогнозы солнечной активности с 15-минутными интервалами.

![pvforecast pvnode options](../../../de/adapterref/iobroker.pvforecast/img/pvforecast-pvnode-options.png)

### Конфигурация pvnode
1. **Ключ API**: Создайте ключ API на сайте https://pvnode.com/api-keys
2. **Платный аккаунт**: Включите эту опцию, если у вас платный аккаунт pvnode.
3. **Дни прогноза**: Количество дней прогноза (только для платных аккаунтов, максимум 7). Бесплатные аккаунты автоматически получают 1 день.
4. **Интервал запроса**: Рекомендуемый: 90 минут (pvnode обновляется 16 раз в день)
5. **Дополнительные параметры**: Необязательные параметры API, такие как `diffuse_radiation_model=perez&snow_slide_coefficient=0.5`

### Типы учетных записей pvnode
| Функции | Бесплатно | Платно |
|----------|-----------|---------|
| Количество запросов к API в месяц | 40 | 1000 |
| Количество дней прогноза | 1 (сегодня + завтра) | до 7 |
| Исторические данные | нет | да (-30 дней) |
| Места расположения | 1 | несколько |

**Важно**: Включайте опцию «Платный аккаунт» только в том случае, если у вас действительно есть платный аккаунт pvnode. В противном случае могут возникнуть ошибки API, поскольку адаптер не сможет автоматически определить, какой тип аккаунта вы используете.

### Дополнительные параметры pvnode
Следующие необязательные параметры API можно передать через поле "Дополнительные параметры":

| Параметры | Описание | Пример |
|-----------|--------------|---------|
| `diffuse_radiation_model` | Модель излучения | `perez` |
| `shading_config` | Конфигурация затенения | `7:2:3:1_1:1:0:0_0:0:0:0` |
| `shading_config` | Конфигурация затенения | `7:2:3:1_1:1:0:0_0:0:0:0` |

Формат: `key1=value1&key2=value2`

### Специальные возможности pvnode
- **15-минутное разрешение**: pvnode предоставляет прогнозные данные с 15-минутными интервалами.
- **Преобразование азимута**: Адаптер автоматически преобразует значение азимута (адаптер: 0 = Юг) в формат pvnode (180 = Юг).
- **Объединение запросов**: При настройке нескольких систем до двух систем автоматически объединяются в один API-запрос (функция `second_array` в pvnode). Это уменьшает количество вызовов API (например, две системы = один запрос вместо двух). Объединенные данные прогноза сохраняются в первой системе; вторая система помечается как объединенная.
- **Сводные данные**: JSON-файл со сводными данными содержит значения Clearsky (суммированные по всем системам), а также коды температуры и погоды (каждое значение соответствует первой системе).
- **Часовые пояса**: API pvnode предоставляет метки времени в формате UTC. Адаптер автоматически преобразует их в локальное системное время.
— Поля «Утреннее затухание» и «Вечернее затухание» не используются для pvnode.

## Пример VIS
Перед загрузкой примера установите: [Материальный дизайн](https://github.com/Scrounger/ioBroker.vis-materialdesign).

Если вы хотите использовать JSON-диаграммы и таблицы в ioBroker Vis, вы можете найти [Пример](./vis.md) здесь.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

### 4.1.0 (2024-11-15)

* (@klein0r) Added estimated energy: now until end of day
* (@simatec) Admin-UI has been adapted for small displays

### 4.0.1 (2024-10-22)

* (@klein0r) Fixed: Missing color settings for new Solcast table

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