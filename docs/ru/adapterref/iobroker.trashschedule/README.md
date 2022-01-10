---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trashschedule/README.md
title: ioBroker.trashschedule
hash: HzReN+JOVPEEh3wnCJAo+P8x/PtOIm9cg/0hlBgLAl8=
---
![Логотип](../../../en/adapterref/iobroker.trashschedule/admin/trashschedule.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.trashschedule.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.trashschedule.svg)
![Стабильный](http://iobroker.live/badges/trashschedule-stable.svg)
![установлен](http://iobroker.live/badges/trashschedule-installed.svg)
![Статус зависимости](https://img.shields.io/david/klein0r/iobroker.trashschedule.svg)
![Известные уязвимости](https://snyk.io/test/github/klein0r/ioBroker.trashschedule/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.trashschedule.png?downloads=true)

# IoBroker.trashschedule
![Тестируйте и выпускайте](https://github.com/klein0r/ioBroker.trashschedule/workflows/Test%20and%20Release/badge.svg)

Сканирует календарный календарь, чтобы рассчитать количество дней, оставшихся до следующего вывоза мусора.

## При финансовой поддержке
[![ioBroker Master Kurs](https://haus-automatisierung.com/images/ads/ioBroker-Kurs.png)](https://haus-automatisierung.com/iobroker-kurs/?refid=iobroker-trashschedule)

## Установка
Пожалуйста, используйте «список адаптеров» в ioBroker, чтобы установить стабильную версию этого адаптера. Вы также можете использовать CLI для установки этого адаптера:

```
iobroker add trashschedule
```

## Документация
[🇺🇸 Документация](./docs/en/basics.md)

[🇩🇪 Документация](./docs/de/basics.md)

## Кредиты
- SVG: https://pixabay.com/de/vectors/behälter-kann-deckel-offen-grün-310937/

## Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.4.1 (2021-12-23)

* (klein0r) Updated dependencies

### 1.4.0 (2021-12-10)

* (klein0r) Allow to hide "not found" warnings for single trash types (like christmas tree pickup)
* (klein0r) Added limit option for VIS widget
* (klein0r) Added option for VIS widget to hide the name

### 1.3.6 (2021-11-24)

* (klein0r) Require new version for translated instance objects
* (klein0r) Fixed timeout issues

### 1.3.5 (2021-11-15)

* (klein0r) Added checks for calendar description

### 1.3.4 (2021-11-14)

* (klein0r) Translated all objects

### 1.3.3 (2021-11-13)

* (klein0r) Translated admin table headers

### 1.3.2 (2021-11-07)

* (klein0r) Fixed missing VIS widget

### 1.3.1 (2021-11-06)

* (klein0r) Fixed missing translations

### 1.3.0 (2021-11-05)

* (klein0r) Admin 5 Support

### 1.2.0 (2021-07-16)

* (klein0r) Added compatibility with iCal 1.10.0
* (klein0r) Added color of type to channel object

### 1.1.3 (2021-05-02)

* (klein0r) Fixed weekday state type (string -> number)

### 1.1.2 (2021-03-15)

* (klein0r) Nodejs 12 required

### 1.1.1 (2021-02-24)

* (klein0r) Ignore trash types with empty match pattern
* (klein0r) Added log message if the match pattern contains leading or trailing whitespaces

### 1.1.0 (2021-01-25)

* (klein0r) Just allow clean trash type names **(BREAKING CHANGE - CHECK YOUR SCRIPTS AND VIS)**

### 1.0.6 (2021-01-24)

* (klein0r) Fixed async object creation

### 1.0.5 (2021-01-24)

* (klein0r) Added automatic refresh every full hour

### 1.0.4 (2021-01-22)

* (klein0r) Delete unsed states

### 1.0.3 (2020-11-10)

* (klein0r) Improved VIS widget options

### 1.0.2 (2020-11-10)

* (klein0r) Added color picker
* (klein0r) Fixed null reference exception

### 1.0.1 (2020-11-07)

* (klein0r) Fixed date calculation issue in VIS

### 1.0.0 (2020-11-06)

* (klein0r) Renamed data types **(BREAKING CHANGE - CHECK YOUR SCRIPTS AND VIS)**
* (klein0r) First **stable** release
* (klein0r) Added iobroker sentry

### 0.0.11 (2020-08-11)

* (klein0r) Better error reporting

### 0.0.10 (2020-07-22)

* (klein0r) Added CSS classes for easier customization
* (klein0r) Added optional glow on due date for vis widget

### 0.0.9 (2020-05-23)

* (klein0r) Fixed color correction calculation issue

### 0.0.8 (2020-05-15)

* (klein0r) Fixed missing VIS translations

### 0.0.7 (2020-05-13)

* (klein0r) Improved logging
* (klein0r) Several fixes, improved admin and vis (automatic color correction, resizeable widget)
* (ivosch68) Reset of states if no event matches

### 0.0.6 (2020-05-13)

* (klein0r) updated dependencies

### 0.0.5 (2020-03-07)

* (klein0r) added pickup dates after next date

### 0.0.4 (2020-03-07)

* (klein0r) added VIS templates

### 0.0.3 (2020-02-26)

* (klein0r) fixed issue with events after time change date

### 0.0.2 (2019-11-26)

* (klein0r) added global offset in days
* (klein0r) added exact match for types

### 0.0.1 (2019-11-24)

* (klein0r) initial release

## License

MIT License

Copyright (c) 2021 Matthias Kleine <info@haus-automatisierung.com>

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