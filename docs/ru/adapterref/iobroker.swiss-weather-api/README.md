---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.swiss-weather-api/README.md
title: ioBroker.swiss-погода-api
hash: udF67rX2FAX29ZcoIzOeAsDYEDd9rB4xWzwy1ajzloA=
---
![Логотип](../../../en/adapterref/iobroker.swiss-weather-api/admin/swiss-weather-api.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)
![Количество установок (последние)](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/swiss-weather-api-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)

# IoBroker.swiss-weather-api
**Тесты:** ![Тестируйте и выпускайте](https://github.com/baerengraben/ioBroker.swiss-weather-api/workflows/Test%20and%20Release/badge.svg)

## Адаптер swiss-weather-api для ioBroker
Подключается к великолепному API погоды SRF (https://developer.srgssr.ch/apis/srf-weather).
SRF Weather REST API позволяет получать прогнозы погоды и отчеты из более чем 25 000 мест по всей Швейцарии. Подписка «Freemium» позволяет получать 50 запросов в день.

##**Пожалуйста, будьте осторожны:
1. что этот адаптер поддерживает только местоположения в Швейцарии. И
1. что этот адаптер поддерживает только RF Weather REST API версии 1 — скоро появится версия 2.

**Процедура обновления версии 1.0.1 до 1.0.x**

- Просто обновитесь в ioBroker. Никаких специальных дополнительных действий не требуется

### Начиная
1. Получите бесплатный аккаунт на https://developer.srgssr.ch/
1. Перейдите в «Мои приложения» и создайте новое приложение. Здесь вы можете выбрать Продукт. «Freemium» — их бесплатный продукт. Если вам нужен прогноз только для одного местоположения и вы получаете только 50 запросов в день (каждые 30 минут) и/или не хотите платить за дополнительные запросы в день, вам следует выбрать Freemium. Теперь это создаст определенные ConsumerKey и ConsumerSecret.
1. Узнайте долготу/широту (десятичные градусы) выбранного места, для которого нужен прогноз. Эта информация не является обязательной, если вы указали свое местоположение в настройках ioBroker (основные настройки) (через карту). В этом случае вы можете оставить поля широты и долготы пустыми. Затем адаптер принимает настройки ioBroker. Широта и долгота, введенные в конфигурации адаптера, переопределяют настройки ioBroker.
1. Установите этот адаптер на ioBroker => Это может занять несколько минут (~ 7 минут на Raspberry Pi 3)
1. В разделе «Конфигурация адаптера» заполните
   1. Название приложения
   1. ConsumerKey приложения
   1. Потребительский секрет приложения
   1. Долгота/широта выбранного швейцарского местоположения, для которого необходим прогноз. => Пожалуйста, используйте десятичные градусы (например, Цюрих: 47,36667 / 8,5)
   1. Интервал опроса в минутах (по умолчанию 30 минут - 50 запросов/день)

Первый запрос делается через 10 секунд после запуска адаптера. После первого запуска запрос будет регулярно выполняться в соответствии с параметром конфигурации (интервал опроса в минутах).
Объекты в прогнозе.current_hour будут созданы через 30 секунд после первого запуска и будут обновляться каждый час путем копирования соответствующих значений из прогноза.60минут.

### Пример визуализации
###### Условие:
* Адаптер [виджеты Material Design] (https://github.com/Scrounger/ioBroker.vis-materialdesign) >= 0.5.7
* Адаптер [Vis](https://github.com/iobroker/iobroker.vis/blob/master/README.md)
* [Импорт представлений в Vis] (https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views)

###### Пример
![планшет](../../../en/adapterref/iobroker.swiss-weather-api/doc/Wettervorhersage_visu_anim.gif)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 1.0.6
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/78
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/93
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/97

### 1.0.5
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/81
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/76
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/75

### 1.0.4
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/85
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/82

### 1.0.3
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/67
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/66
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/52

### 1.0.2
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/51
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/53

### 1.0.1
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/57
This change makes it necessary to regenerate IDs. So, to install version 1.0.1, the currently running adapter instance must be completely removed and replaced with a new instance.

### 1.0.0
* (baerengraben) Bugfix https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/64

## License
MIT License

Copyright (c) 2023 baerengraben <baerengraben@intelli.ch>

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