---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.pvforecast?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.pvforecast?label=npm%20downloads&style=flat-square
BADGE-Snyk Vulnerabilities for npm package: https://img.shields.io/snyk/vulnerabilities/npm/iobroker.pvforecast?label=npm%20vulnerabilities&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.pvforecast?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.pvforecast?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.pvforecast?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/workflow/status/iobroker-community-adapters/iobroker.pvforecast/Test%20and%20Release?label=Test%20and%20Release&logo=github&style=flat-square
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/iobroker-community-adapters/iobroker.pvforecast?label=repo%20vulnerabilities&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.pvforecast.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/pvforecast-stable.svg
BADGE-Installed: http://iobroker.live/badges/pvforecast-installed.svg
chapters: {"pages":{"de/adapterref/iobroker.pvforecast/README.md":{"title":{"de":"ioBroker.pvforecast - Adapter zu vorhersage eurer PV Erträge"},"content":"de/adapterref/iobroker.pvforecast/README.md"},"de/adapterref/iobroker.pvforecast/vis.md":{"title":{"de":"ioBroker.pvforecast - VIS"},"content":"de/adapterref/iobroker.pvforecast/vis.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pvforecast/README.md
title: ioBroker.pvforecast — Адаптер для прогнозирования доходности PV
hash: kQNDm9uYOhsvTD/sCeFl6v42W8PvzYrkiUJSXzG+738=
---
![логотип](../../../de/admin/pvforecast.png)

# IoBroker.pvforecast - Адаптер для прогнозирования доходности PV
**Если вам нравится адаптер, буду рад пожертвованию:**

[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UYB92ZVNEFNF6&source=url)

Этот адаптер заменяет JavaScript из [ioBroker форум](https://forum.iobroker.net/topic/26068/forecast-solar-mit-dem-systeminfo-adapter)

Адаптер извлекает основные данные из https://api.forecast.solar со следующими данными:

## Настройки
1. Долгота (-180 (запад) … 180 (восток))
2. Широта -90 (юг) … 90 (север)
3. Ссылка на страницу
4. API-ключ
5. Диаграмма этапа оси Y
6. Запланировать извлечение данных (мин.) — Запланируйте получение данных с сервера каждые x минут.

![параметры прогноза](https://user-images.githubusercontent.com/76852173/155196476-8c8210d9-bdb2-456b-a0aa-1dd411efea5e.JPG)

Погоду также можно получить с помощью ключа API.

1. datetime - дата и время
2. небо — значение от 0 до 1 процента для ясного неба [1 = ясное небо].
3. Температура [°C]
4. состояние - текст
5. иконка - текст + цифра
6. Скорость ветра - [км/ч]
7. Угол ветра - север 0°[по часовой стрелке]. (Если скорость ветра равна нулю, значение не определено)
8. Направление ветра - Краткое название
9. Более высокое временное разрешение

## Для системы доступны следующие настройки
1. Наклон (0°-90°)
2. Азимут (-180 = север, -90 = восток, 0 = юг, 90 = запад, 180 = север)
3. Мощность установки (кВтч)
4. Название растения
5. Название легенды диаграммы
9. Цвет графика
10. Цвет метки диаграммы

![pvforecast pvsystem](https://user-images.githubusercontent.com/76852173/155196535-6828775a-8234-4a6a-b2a3-03d7fd88c80d.JPG)

Вся эта информация необходима для обеспечения правильной работы адаптера.

Если долгота и широта уже сохранены в системе, система автоматически вводит данные в поля.

## Пример ВИС
Перед загрузкой примера установите: [дизайн материалов](https://github.com/Scrounger/ioBroker.vis-materialdesign).
Если вы хотите использовать диаграммы и таблицы Json в ioBroker Vis, вы найдете здесь [пример](./vis.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (stromdao) Added SolarPredictionAPI  

### 2.3.0 (2022-06-26)
* (klein0r) Add summary values to InfluxDB
* (klein0r) Use cron to ensure update on day change
* (klein0r) Removed visibility from weather data (doesn't exist in response)

### 2.2.1 (2022-06-23)
* (klein0r) Fixed tilt validation - allow zero tilt (0)

### 2.2.0 (2022-06-09)
* (klein0r) Added raw JSON data states for own graphs
* (klein0r) Improved debug log
* (klein0r) Updated azimuth image for dark theme

### 2.1.5 (2022-06-03)
* (klein0r) Added installed peak power as state
* (klein0r) Fixed time shift when using solcast

### 2.1.4 (2022-05-27)
* (klein0r) Added option for label text size (charting)

## License
MIT License

Copyright (c) 2022 Patrick-Walther
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