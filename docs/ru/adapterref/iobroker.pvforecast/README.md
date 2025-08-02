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
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pvforecast/README.md
title: ioBroker.pvforecast
hash: EgyBBS1zyr5QAu9ZAleVQaCYPNzWLRNI2WG+IcTiDbw=
---
![логотип](../../../de/admin/pvforecast.png)

# IoBroker.pvforecast
Этот адаптер заменяет JavaScript из [форум ioBroker](https://forum.iobroker.net/topic/26068/forecast-solar-mit-dem-systeminfo-adapter).

Адаптер получает основные данные из https://api.forecast.solar со следующими данными:

## Настройки
1. Долгота (-180 (запад) … 180 (восток))
2. Широта -90 (юг)… 90 (север).
3. Ссылка на страницу
4. API-ключ
5. Диаграмма этапов по оси Y
6. Расписание запроса данных (мин) — запланируйте каждые x минут получение данных с сервера.

![параметры пвпрогноза](https://user-images.githubusercontent.com/76852173/155196476-8c8210d9-bdb2-456b-a0aa-1dd411efea5e.JPG)

Погоду также можно получить с помощью ключа API.

1. datetime — дата и время
2. небо — значение от 0 до 1 в процентах для ясного неба [1 = ясное небо].
3. Температура [°С]
4. Условие - текст
5. иконка - текст + номер
6. Скорость ветра - [км/ч]
7. Угол ветра - Северный 0° по часовой стрелке. (Если скорость ветра равна нулю, значение не определяется)
8. Направление ветра – краткое название
9. Более высокое временное разрешение

## Для системы доступны следующие настройки
1. Наклон (0°-90°)
2. Азимут (-180 = север, -90 = восток, 0 = юг, 90 = запад, 180 = север)
3. Мощность системы (кВтч)
4. Название растения
5. Название легенды диаграммы
9. Цвет диаграммы
10. Цвет метки диаграммы

![пвпрогноз](https://user-images.githubusercontent.com/76852173/155196535-6828775a-8234-4a6a-b2a3-03d7fd88c80d.JPG)

Вся эта информация необходима для обеспечения правильной работы адаптера.

Если долгота и широта уже сохранены в системе, система автоматически вносит данные в поля.

## Пример ВИС
Прежде чем пример можно будет загрузить, установите: [Материальный дизайн](https://github.com/Scrounger/ioBroker.vis-materialdesign).
Если вы хотите использовать диаграммы и таблицы Json в ioBroker Vis, вы найдете [Пример](./vis.md) здесь.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.9.0 (2023-10-28)
* (klein0r) Updated conversion for Solcast
* (klein0r) Store JSON state values in prettified format

### 2.8.2 (2023-10-28)
* (klein0r) Added icons in admin tabs

### 2.8.1 (2023-09-16)
* (klein0r) Fixed graph limits in summary
* (klein0r) Added options for summary graph and label color

### 2.8.0 (2023-09-16)
* (klein0r) Graphs are limited to maximum power (max)
* (klein0r) Installed power is Wp or kWp (as configured)

### 2.7.1 (2023-05-10)
* (klein0r) Summary channel should not be deleted

## License
MIT License

Copyright (c) 2021-2023 Patrick-Walther
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
