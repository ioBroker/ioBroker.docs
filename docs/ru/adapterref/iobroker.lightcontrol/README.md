---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lightcontrol/README.md
title: ioBroker.lightcontrol
hash: 2C8lox7QJJk3YWndhJjKQTbbN03SjxFzwB2yH3gvwgI=
---
![Логотип](../../../en/adapterref/iobroker.lightcontrol/admin/lightcontrol.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.lightcontrol.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lightcontrol.svg)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.lightcontrol?style=flat-square)
![GitHub](https://img.shields.io/github/license/schmakus/iobroker.lightcontrol?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![НПМ](https://nodei.co/npm/iobroker.lightcontrol.png?downloads=true)
![Бета](https://img.shields.io/npm/v/iobroker.lightcontrol.svg?color=red&label=beta)
![Стабильный](http://iobroker.live/badges/lightcontrol-stable.svg)
![Установлен](http://iobroker.live/badges/lightcontrol-installed.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)

# IoBroker.lightcontrol
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/lightcontrol/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

![Тестирование и выпуск](https://github.com/Schmakus/ioBroker.lightcontrol/workflows/Test%20and%20Release/badge.svg)

## Версии
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Если вам нравится моя работа:
## Монтаж
Пожалуйста, используйте «список адаптеров» и стабильный репозиторий в ioBroker, чтобы установить версию этого адаптера. Вы также можете использовать CLI для установки этого адаптера:

```
iobroker add lightcontrol
```

## Документация
[🇺🇸 Документация](./en/lightcontrol.md)

[🇩🇪 Документация](./docs/de/lightcontrol.md)

## Делать
- Выберите более одной LightGroup для одного идентификатора объекта (ошибка с jsonCustom Select multible)
- Доступность уведомления с более низкой яркостью и определенными секундами до автоматического выключения.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.5.0 (2024-03-01)

-   (Schmakus) update dependencies
-   (Schmakus) update license year
-   (Schmakus) fixed AutoOnLux (Cannot read properties of undefined (reading 'minLux'))

### 0.4.0 (2023-08-16)

-   (Schmakus) Node >=16 and NPM >=7 necessary!
-   (Schmakus) fixed rampOff.time
-   (Schmakus) update dependencies

### 0.3.0 (2023-07-17)

-   (Schmakus) (thoml95) Changed conversion of color-temperature (edit of ct-states required)
-   (Schmakus) (thoml95) fixed some bugs related to powerCleaningLight
-   (Schmakus) Some code improvements
-   (Schmakus) Update Docu

### 0.2.18 (2023-07-08)

-   (Schmakus) Fixed CtReverse [#149]
-   (Schmakus) Fixed translation for light [#136]
-   (Schmakus) Fixed warning min/max of ct-state [#148]
-   (Schmakus) Fixed Set Color-Temperature (set null value)

### 0.2.17 (2023-05-17)

-   (Schmakus) Fix error by init of customConfig, if no light description is available
-   (Schmakus) Fix error by set Ct, Color,... if no lights or groups defined
-   (Schmakus) Some code improvements

## License

MIT License

Copyright (c) 2024 Schmakus <schmakus@gmail.com>

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
