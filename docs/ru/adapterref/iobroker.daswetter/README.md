---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.daswetter/README.md
title: ioBroker.DasWetter.
hash: q/9dlqNh1YRO6gLgDcGx/WvxB4Ls0zllpjwny+txgxc=
---
![Логотип](../../../en/adapterref/iobroker.daswetter/admin/daswettercom.png)

![Количество установок](http://iobroker.live/badges/daswetter-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.daswetter.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.daswetter.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.daswetter/badge.svg)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.daswetter/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.daswetter.png?downloads=true)
![node-lts](https://img.shields.io/node/v-lts/iobroker.daswetter?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.daswetter?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.daswetter?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)

# ioBroker.DasWetter.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Этот адаптер считывает данные прогноза погоды с сайта DasWetter.com.

## подсказка обновления v4

Этот адаптер версии 4 использует новый API (2026). Структура данных теперь отличается от старых версий адаптера. Старые экземпляры необходимо удалить и создать новый экземпляр адаптера. Каждый пользователь должен включить новый API на веб-сайте DasWetter. Будет предоставлен ключ API, который необходимо использовать в настройках адаптера. С новым API также можно регистрировать новых пользователей на веб-сайте [DasWetter](https://dashboard.meteored.com/de/login) .

## общая функциональность

Сначала пользователь должен включить API на сервере [DasWetter](https://dashboard.meteored.com/de/login) . После этого, имея в конфигурации адаптера ключ API, почтовый индекс и название города, адаптер сможет получать данные прогноза погоды с сервера. Сначала, после запуска адаптера, выполняется проверка местоположения. По почтовому индексу мы пытаемся найти ближайшую метеостанцию. Обычно сервер отвечает разными местоположениями из разных стран из-за схожих почтовых индексов. Затем адаптер пытается найти нужную метеостанцию по названию города. Если ближайшая станция найдена, внутри сохраняется хэш местоположения, который впоследствии используется для запроса данных прогноза погоды. В данный момент доступны только два пути.

- Ежедневный прогноз погоды предоставляет общие данные о погоде на следующие 5 дней.

- Почасовой прогноз. Почасовой прогноз предоставляет более подробную информацию о погоде на 24 часа текущего дня.

Мы стараемся свести количество запросов к минимуму. Каждый пользователь также должен свести количество запросов к минимуму. Meteored предоставляет нам бесплатный базовый тарифный план...

### ограничения бесплатного плана

![ограничения бесплатного плана](../../../en/adapterref/iobroker.daswetter/docs/free_plan.png "ограничения бесплатного плана")

### альтернативы

Если прогноз необходимо отобразить только на визуализации, [виджет](https://www.daswetter.com/users/de/widget) также может стать хорошей альтернативой. [Виджет для Vis-2](https://github.com/rg-engineering/ioBroker.vis-2-widgets-weather-and-heating?tab=readme-ov-file#meteored-weather-widget) уже доступен.

## Подсказки

## известные проблемы

- Пожалуйста, создавайте запросы на [GitHub](https://github.com/rg-engineering/ioBroker.daswetter/issues) , если обнаружите ошибки или пожелаете добавить новые функции.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (René) dependency updates
 
### 4.5.9 (2026-07-05)
* (René) dependency updates and translations

### 4.5.6 (2026-06-17)
* (René) see issue #574 and #571: state roles adapted

### 4.5.4 (2026-05-31)
* (copilot) Adapter requires node.js >= 22 now
* (René) see issue 534: bug fix for current hour: time ends at forecast period
* (René) see issue 515: decimal places for temperature adjusable between 0 and 2 in admin
* (René) see issue 515: add a datapoint to show last time when data was downloaded from server

### 4.5.3 (2026-03-08)
* (René) solved lint errors and warnings based on adapter checker
* (René) dependency updates and fixes based on adapter checker recommendations

### 4.5.1 (2026-02-01)
* (René) bug fix: wind url was not set if wind speed was zero
* (René) bug fix: save selected icon type (svg, png or gif) in admin



[Older changelogs can be found there](https://github.com/rg-engineering/ioBroker.daswetter/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2017-2026 René G. <info@rg-engineering.eu>

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