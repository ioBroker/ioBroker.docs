---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.countdown/README.md
title: ioBroker.обратный отсчет
hash: Mshzbk4TQhCKT93kVH8aGuM+N/0LseiLQ95SkaHMHck=
---
![Логотип](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![Значок Гринкипера](https://snyk.io/test/github/jack-blackson/ioBroker.countdown/badge.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.countdown.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![Количество установок](http://iobroker.live/badges/countdown-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# IoBroker.обратный отсчет
[![Статус сборки Трэвиса](https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/countdown/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Адаптер обратного отсчета для ioBroker -------------------------------------------------------------------------------

Цель адаптера — предоставить вам возможность запускать обратные отсчеты для будущих событий с годами, месяцами, днями, часами и минутами. Он предоставит вам каждое из этих значений отдельно, а также две строки с короткой и длинной версией даты.

## Как это использовать
[Описание на английском языке](docs/en/countdown.md) [Deutsche Anleitung](docs/de/countdown.md)

## Возможности для добавления
* Возможность добавить скрипт в качестве параметра и запустить его по окончании обратного отсчета
* Возможность использования плюса и минуса в addminutes и других функциях add

## Кредиты
Создание этого адаптера было бы невозможно без выдающейся работы @jack-blackson (https://github.com/jack-blackson)", который создал версии этого адаптера до V3.x.x.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**0
-->
### 3.0.0 (2025-06-05)
* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation.
* (mcm1957) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.4.10 now.
* (mcm1957) @iobroker/eslint-config has been added and linter error have been fixed.
* (mcm1957) Dependencies have been updated.

### 2.3.0 (2024-09-20) 
* (jack-blackson) Compatibility for js-controller 7
* (jack-blackson/bagsik) Added new object fullJSON with all objects included - thanks to bagsik who had the idea and created the code!

### 2.2.1 (2024-09-14) 
* (jack-blackson) Additional check to avoid not allowed signs in countdown name
* (jack-blackson) Updated dependencies
* (jack-blackson) Small adjustments in package files

### 2.2.0 (2023-08-25) 
* (jack-blackson) Added ability to maintain, adjust and delete countdowns in adapter settings
* (jack-blackson) Bugfix with incorrect spaces as first character in "in words long" and "in words short"
* (jack-blackson) Bugfix incorrect calculation totalYears
* (bagsik) added "totalJSON" object in each countdown

### 2.1.0 (2023-07-22) 
* (jack-blackson) Ability to use the countdown "backwards" - e.g. for calculating age of a baby
* (jack-blackson) Adjustments for "in words" -> fixed year/years and adjusted which detail level is shown at which point of time

## License
The MIT License (MIT)

Copyright (c) 2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2019-2024 jack-blackson <blacksonj7@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.