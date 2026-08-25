---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.knmi-weather/README.md
title: ioBroker.knmi-weather
hash: 0R/wNtjz4kkUJDsvC8B9fxp3+luHbvhkJfU5G80ALE4=
---
![Логотип](../../../en/adapterref/iobroker.knmi-weather/admin/knmi-weather.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.knmi-weather.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.knmi-weather.svg)
![Количество установок (последние)](http://iobroker.live/badges/knmi-weather-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/knmi-weather-stable.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/ioBroker.knmi-weather.svg)
![НПМ](https://nodei.co/npm/ioBroker.knmi-weather.png?downloads=true)

# IoBroker.knmi-weather
![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Данные о погоде и оповещения KNMI для ioBroker
KNMI предоставляет API, данные которого обновляются каждые 10 минут на основе всех данных с датчиков, собираемых институтом.
Этот адаптер позволяет считывать данные из этого API (требуется регистрация!) и сохранять все соответствующие значения в удобном для пользователя формате для дальнейшей обработки в уведомлениях (например, в Telegram/Pushover) или визуализациях.

API можно использовать бесплатно до 300 раз в день, поэтому адаптер запускается каждые 5 минут.

Доступны следующие данные:

* Сигналы тревоги о погоде
* Текущие климатические условия
* Прогноз погоды на сегодня, завтра, послезавтра
* Карты текущих данных дождемера предоставлены компанией "[Buienradar](https://www.buienradar.nl)"

Данные о местоположении связаны с GPS-координатами, хранящимися в административной конфигурации.

Для получения дополнительной информации посетите: http://weerlive.nl/index.php Получите бесплатный API-ключ здесь: http://weerlive.nl/delen.php

## Поддержите меня
Если вам нравится моя работа, пожалуйста, не стесняйтесь сделать личное пожертвование (это личная ссылка для пожертвований DutchmanNL, не имеющая отношения к проекту ioBroker!). [![[Пожертвовать](https://raw.githubusercontent.com/DrozmotiX/ioBroker.knmi-weather/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings

### 1.0.2 (2021-08-30) - Optimize error message in case API limit is reached
* (DutchmanNL) Optimize error message in case API limit is reached

### 1.0.1 (2021-08-17)
* (DutchmanNL) Add support for windrgr
* (DutchmanNL) Minor fixes & dependency updates

### 1.0.0 (2020-09-15)
* (DutchmanNL) Final version release
* (DutchmanNL) Bugfixes

### 0.2.1
* (DutchmanNL) Updated dependency's
* (DutchmanNL) Release to stable repository
* (DutchmanNL) Bugfix : Solve incorrect Latitude/Longtitude configuration

### 0.2.0
* (DutchmanNL) improve propper adapter termination instead of guessing by timer
* (DutchmanNL) Release to stable repository

### 0.1.1
* (DutchmanNL) implement states for RainRadar

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2020-2026 DutchmanNL <rdrozda@hotmail.com>

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