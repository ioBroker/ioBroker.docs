---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.accuweather/README.md
title: ioBroker.accuweather
hash: TadMzyLupLTq8YRjYAiMbsBteDVD8BaYJr2j8x5OzSo=
---
![Логотип](../../../en/adapterref/iobroker.accuweather/admin/accuweather.png)

![Количество установок](http://iobroker.live/badges/accuweather-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.accuweather.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.accuweather.svg)
![НПМ](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)

# IoBroker.accuweather
## Адаптер accuweather для ioBroker
Прогноз погоды с использованием API AccuWeather.

Адаптер получает

- Текущие условия (обновляется каждый час), (24 запроса)
- Ежедневный прогноз на 5 дней (обновление ежедневно примерно в 7:00 и 20:00), (2 запроса)
- и 12-часовой прогноз (обновляется каждые шесть часов в 12:00, 6:00, 12:00 и 18:00). (4 запроса)

По умолчанию адаптер обновляет только устаревшие данные при перезапуске.
Разрешено 50 запросов в день, каждый перезапуск потребует 3 запросов для обновления всех данных.

## Начиная
### Получить ключ API
Чтобы получить API Key, зарегистрируйтесь на https://developer.accuweather.com/ и создайте приложение в меню `My Apps`.
После создания приложения у вас будет сгенерирован API-ключ.
Для бесплатного использования можно сделать 50 запросов к API в день.
Было отмечено, что для работы API предпочтительны следующие настройки (пожалуйста, выберите свою страну!): ![настройки](../../../en/adapterref/iobroker.accuweather/admin/image.png)

### Получить ключ местоположения
Чтобы получить ключ местоположения, перейдите на https://www.accuweather.com/ и введите название вашего города или попробуйте ввести свои координаты (широту, долготу), как они у вас есть, например, в настройках ioBroker.
Ваш ключ местоположения будет представлять собой число в конце URL-адреса прогноза.

### Использование в визуализации Lovelace (начиная с версии 1.1.0)
Канал сводки содержит текущий и ежедневный прогноз с ролями/типами состояний, поддерживаемыми типом-детектором.
Новая функция может использоваться для отображения прогноза погоды в пользовательском интерфейсе Lovelace.
Для лучшего просмотра создана пользовательская карта Lovelace - см. https://github.com/algar42/IoB.lovelace.accuweather-card

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (ticaki) Missing Http error handling added
* (ticaki) For error codes from the 400 series, do not attempt any unscheduled reconnections. 

### 2.1.0-alpha.0 (2025-01-19)
* (ticaki) Change: min. js-controller to 6.0.11
* (ticaki) Change: Outdated data is updated at startup.
* (ticaki) New: Photo link added in current weather
* (ticaki) New: Metric and Imperial are available for selection - Will be taken into account with the next data update.
* (ticaki) New: In the event of a data retrieval error, an attempt is made again after 10 minute
* (ticaki) Remove admin option (restart blocking)
* (ticaki) Rewritten in Typescript

### 2.0.1 (2025-01-18)
* (ticaki) BREAKING: Requires Nodejs 20 or higher
* (ticaki) BREAKING: Command states are now buttons and only respond to ack=false. 
* (ticaki) admin option: No data is updated on adapter startup (default: true). 
* (ticaki) apikey renamed and encrypted
* (ticaki) Dependencies and eslint updated
* (devtronic) Add nextHour.CloudCover

### 1.5.0 (2024-06-23)
* (xdaamg) limit updates to once an hour, this fixes part of issue #273.
* (mcm1957) Adapter requires js-controller >= 5 and admin >= 6 now
* (mcm1957) Node 22 support has been added to testing
* (mcm1957) Dependencies have been updated

### 1.4.0 (2024-04-02)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.3.2 (2023-12-04)
* (ticaki) fixed: dependencies
* (ticaki) fixed: error message [object Object]

### 1.3.1 (2023-08-15)
* (isi07) added the Wind Direction Text und Cloud Cover
* (bluefox) Added json config

### 1.2.4 (2022-02-08)
* (algar42) Depency updates

### 1.2.3 (2021-12-29)
* (algar42) HoursOfSun Parameter added to the Daily forecast

### 1.2.1 (2021-07-22)
* (bluefox) Updated logo

### 1.2.0 (2021-07-03)
* (Garfonso) adjust roles to properly detect weather forecast in Summary folder. (Summary objects need to be deleted and adapter restarted after that)

### 1.1.7 (2021-06-24)
* (bluefox) Create device for device-detector

### v1.1.6 (2021-05-05)
Minor bug fixes to `Object.common` section

### 1.1.5 (2021-01-25)
* (algar42) Resolve log Warning for js-controller 3.2

### 1.1.4
* (HGlab01) small bugfix regarding setTimeout range

### 1.1.3 (2020-03-04)
* (algar42) Minor updates for compact mode

### 1.1.0 (2019-11-09)
* (algar42) Summary channel added to support type-detector and automatic weather device creation

### 1.0.2 (2019-09-12)
* (algar42) Production Release

## License
MIT License

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2021-2023 algar42 <igor.aleschenkov@gmail.com>

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