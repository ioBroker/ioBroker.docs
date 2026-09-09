---
chapters: {"pages":{"en/adapterref/iobroker.countdown/README.md":{"title":{"en":"ioBroker.countdown"},"content":"en/adapterref/iobroker.countdown/README.md"},"en/adapterref/iobroker.countdown/docs/en/countdown.md":{"title":{"en":"ioBroker.countdown"},"content":"en/adapterref/iobroker.countdown/docs/en/countdown.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: mixwTZB0DWtO4unou3v/Ea2riVej8uFSe40Y/9eaouI=
---
![Логотип](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![значок смотрителя поля](https://snyk.io/test/github/jack-blackson/ioBroker.countdown/badge.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.countdown.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![Количество установок](http://iobroker.live/badges/countdown-stable.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/countdown/svg-badge.svg)
![НПМ](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# ioBroker.countdown

[![Статус сборки Трэвис](https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Адаптер обратного отсчета для ioBroker

Цель адаптера — предоставить вам возможность запускать обратный отсчет будущих событий в годах, месяцах, днях, часах и минутах. Он будет предоставлять вам каждое из этих значений отдельно, а также две строки с короткой и длинной версиями даты.

## Как им пользоваться

[Английское описание](/#/docs/adapterref/iobroker.countdown/docs/en/countdown.md) [Deutsche Anleitung](https://github.com/iobroker-community-adapters/ioBroker.countdown/blob/master/docs/de/countdown.md)

## Дополнительные функции

- Возможность добавить скрипт в качестве параметра и запустить его по окончании обратного отсчета.
- Возможность использовать знаки плюс и минус в функции добавления минут и других функциях добавления.

## Кредиты

Создание этого адаптера было бы невозможно без замечательной работы @jack-blackson ( <https://github.com/jack-blackson> )", который создал предварительные версии этого адаптера (до V3.xx).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**0
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 3.1.0 (2026-02-23)
- (R3dRuM) Added option to sort countdowns by date in HTML and JSON output

### 3.0.1 (2026-02-23)
- (copilot) Adapter requires admin >= 7.7.22 now

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.countdown/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)


Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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