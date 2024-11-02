---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.traccar/README.md
title: ioBroker.traccar
hash: OFm1lXncX7HqJZ8Rc8bK6eA7dMOP9KvSDX7+HQY1cXU=
---
![Логотип](../../../en/adapterref/iobroker.traccar/admin/traccar.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.traccar.svg?dummy=unused)
![Загрузки](https://img.shields.io/npm/dm/iobroker.traccar.svg?dummy=unused)
![Количество установок (последнее)](https://iobroker.live/badges/traccar-installed.svg?dummy=unused)
![Количество установок (стабильно)](https://iobroker.live/badges/traccar-stable.svg?dummy=unused)
![Известные уязвимости](https://snyk.io/test/github/arteck/ioBroker.traccar/badge.svg?dummy=unused)
![НПМ](https://nodei.co/npm/iobroker.traccar.png?downloads=true)

# IoBroker.traccar
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/traccar/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Адаптер Traccar для ioBroker
Этот адаптер импортирует в режиме реального времени данные о положении и расширенные данные из [Траккар](https://www.traccar.org) и делает их доступными в ioBroker.

## Конфигурация
1. Создайте новый экземпляр адаптера
2. Заполните URL/IP и порт с сервера Traccar
3. Настройте имя пользователя и пароль.
4. Сохраните настройки.
5. Развлекайтесь :)

## Changelog
### 1.1.6 (2024-10-28)
-   (arteck) dependency update

### 1.1.5 (2024-09-26)
-   (arteck) transfer to arteck 
-   (arteck) add accuracy

### 1.1.4 (2023-10-30)
-   (arteck) fix last_update DP

### 1.1.3 (2023-10-28)
-   (arteck) geofances fix for Server >= 5.8 (check adapter Settings)

### 1.1.2 (2023-07-16)
-   (arteck) another fix for Traccar Server >= v5.8

### 1.1.1 (2023-07-01)
-   (arteck) fix translation

### 1.1.0 (2023-07-01)
-   (arteck) support for https/wss connections
-   (arteck) fix for Traccar Server < v5.8

### 1.0.1 (2023-06-22)
-   (arteck) fix deploy workflow

### 1.0.0 (2023-06-22)
-   (arteck) fix for Traccar Server >= v5.8

### 0.0.12 (2022-07-20)

-   (arteck) fix geofenceIds now nullable
-   (arteck) add Device datapoint Status

### 0.0.11 (2021-08-19)

-   (arteck) fix translation

### 0.0.10 (2021-08-18)

-   (arteck) change UI to JSONConfig

### 0.0.9 (2021-05-19)

-   (arteck) prevent unnecessary process attributes from being interrupted
-   (arteck) optimization of the link between device and incoming message

### 0.0.8 (2021-04-30)

-   (arteck) bugfix wrong value type
-   (Weblate) german language update

### 0.0.7 (2021-03-24)

-   (arteck) bugfix special characters in password or username
-   (arteck) code refactor
-   (arteck) better handling with new device or geolocation at runtime

### 0.0.6 (2021-03-19)

-   (arteck) adjustments according to the adapter review

### 0.0.5 (2021-03-08)

-   (arteck) add [release-script](https://github.com/AlCalzone/release-script)

### 0.0.4

-   (arteck) add datapoint address (https://www.traccar.org/reverse-geocoding/)

### 0.0.3

-   (arteck) workaround for unclean geofences in the database

### 0.0.2

-   (arteck) add websocket connection
-   (arteck) add position url
-   (arteck) add dynamic datapoints for attributes

### 0.0.1

-   (braindead1) initial release

## License

MIT License

Copyright (c) 2024  Arthur Rupp <arteck@outlook.com>,

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