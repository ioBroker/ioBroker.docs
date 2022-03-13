---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.geofency/README.md
title: ioBroker.geofency
hash: 9q400lKCLOrH3KroQdM2FDGS4Wtgr4+8ckgI1w7tR9o=
---
![Логотип](../../../en/adapterref/iobroker.geofency/admin/geofency.png)

![Количество установок](http://iobroker.live/badges/geofency-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.geofency.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.geofency.svg)

# IoBroker.geofency
====================

![Тестируйте и выпускайте](https://github.com/ioBroker/ioBroker.geofency/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/geofency/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Этот адаптер может получать события [геозона](http://www.geofency.com/) при входе или выходе из определенной области с помощью вашего мобильного устройства.
Все значения geofency-webhook запроса хранятся под именем локации в ioBroker.

## Конфигурация на мобильном устройстве:
* для любого местоположения -> свойства -> настройки вебхука:
 * URL для входа и выхода: &lt;ваш домен ioBroker&gt;:&lt;настроенный порт&gt;/&lt;любое имя местоположения&gt;
 * Формат сообщения: JSON-кодированный: включен
 * аутентификация: установить пользователя/пароль из конфига iobroker.geofency

## На форуме ioBroker (немецкий)
http://forum.iobroker.net/viewtopic.php?f=20&t=2076

## Примечание по безопасности:
Не рекомендуется размещать этот адаптер в открытом доступе в Интернете.
Перед ioBroker должен быть установлен какой-то WAF/прокси/входной сервер. (например, nginx удобен и прост в настройке).

## Changelog
### 1.1.0 (2022-03-11)
* IMPORTANT: Forbidden characters are now replaced by _ in generated State IDs. Because gave an error before should not be breaking 
* (Apollon77) Add new json state with the json of the last incoming data
* (Apollon77) Add new data channel under the user with all data fields from the incoming data as own states
* (Apollon77) Add Sentry for crash-reporting
* (Apollon77) Prevent some error cases reported

### 1.0.3 (2021-03-10)
* (Apollon77) Fix port checks

### 1.0.2 (2021-03-09)
* (Apollon77) optimize stop handling to really end the server

### 1.0.1 (2021-03-07)
* (Apollon77) prevent warnings with js-controller 3.2

### 1.0.0 (2021-02-26)
* (Apollon77) js-controller 2.0 is now needed at least
* (allesgutewarweg) Add more JSON decoded states
* (Apollon77) Update dependencies

### 0.3.2 (2018-03-07)
* (Apollon77) Fix Authentication

### 0.3.0 (2017-10-04)
* (Apollon77) BREAKING!!! Make sure 'entry' is really a boolean as defined in object

### 0.2.0 (2017-06-09)
* (Apollon77) Add missing authentication check
* (Apollon77) Add option to send in data as Message when received over other ways
* (Apollon77) Add option not to start a webserver for cases where data are received using messages

### 0.1.5 (2016-09-19)
* (soef) support of certificates

### 0.1.4 (2016-03-29)
* (dschaedl) replaced geofency Icon (on request of bluefox)

### 0.1.3 (2016-03-29)
* (soef) fixed atHome and atHomeCount state creation

### 0.1.2 (2016-02-13)
* (soef) Dots in location name will be replaced by an underscore

### 0.1.1 (2016-02-01)
* (Pmant) Fix config page

### 0.1.0 (2016-01-26)
* (soef) Fix error with "at home" settings

### 0.0.4 (2016-01-24)
* (soef) Added some new states

### 0.0.3 (2016-01-21)
* (soef) Some modifications
* (bluefox) change type

### 0.0.2
* (dschaedl) moved to iobroker/iobroker.geofency

### 0.0.1
* (dschaedl) initial release

## License

The MIT License (MIT)

Copyright (c) 2015-2022 dschaedl <daniel.schaedler@gmail.com>, iobroker-community

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