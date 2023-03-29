---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolбесплатно
hash: BsSCPgTXnrYtW2QvtzPh2J6HOYP11s13WGmANTpaqbk=
---
![Логотип](../../../en/adapterref/iobroker.schoolfree/admin/schoolfree.png)

![Количество установок](http://iobroker.live/badges/schoolfree-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.schoolfree.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.schoolfree?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.schoolfree
![Тестируйте и выпускайте](https://github.com/simatec/ioBroker.schoolfree/workflows/Test%20and%20Release/badge.svg)

Этот адаптер использует службу Sentry.io, чтобы автоматически сообщать мне как разработчику об исключениях и ошибках кода, а также о новых схемах устройств. Подробнее смотрите ниже!

##schoolfree адаптер для ioBroker
**Если вам это нравится, рассмотрите пожертвование:**

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

### Deutsche Beschreibung:
Schoolfree является адаптером для установки iobroker.
Mit dem Adapter lassen sich die Schulferien auswerten und in Datenpunkte übergeben.
Die Datenpunkte können somit für weitere Funktionen wie Heizungssteuerungen, Rolladen- und Anwesenheitssteuerungen ausgewertet und verarbeitet werden.

Der aktuelle Bezug von Terminen für die Schulferien erfolgt über die API von https://www.mehr-schulferien.de

Aktuell werden die Schulferien und freien Tage für Deutschland unterstützt.

Folgende Datenpunkte stehen mit Schoolfree für die weitere Verarbeitung zur Verfügung:

* info.current.end: Datum für das Ende der aktuellen Ferien
* info.current.name: Bezeichnung der aktuellen Schulferien
* info.current.start: Startdatum der aktuellen Ferien
* info.next.end: Datum für das Ende der nächsten Ferien
* info.next.name: Bezeichnung der nächsten Schulferien
* info.next.start: Startdatum der nächsten Ferien
* info.today: Переключение между текущими статусами (true/false)
* info.tomorrow: Переключение между текущими событиями Status morgen (true/false)

*************************************************************************************************************************************

### Английское описание:
Schoolfree — это адаптер для установки iobroker.
С помощью адаптера школьные каникулы можно оценить и перенести в точки данных.
Таким образом, точки данных могут быть оценены и обработаны для других функций, таких как управление обогревом, жалюзи и контроль присутствия.

Текущая подписка на школьные каникулы осуществляется через API https://www.mehr-schulferien.de.

В настоящее время школьные каникулы и выходные для Германии поддерживаются.

Следующие точки данных доступны для дальнейшей обработки с помощью Schoolfree:

* info.current.end: Дата окончания текущих праздников
* info.current.name: название текущих школьных каникул
* info.current.start: Дата начала текущего праздника
* info.next.end: Дата окончания следующих праздников
* info.next.name: название следующих школьных каникул
* info.next.start: Дата начала следующего праздника
* info.today: Переключение на текущий статус сегодня (true/false)
* info.tomorrow: переключиться на текущий статус завтра (true/false)

### Что такое Sentry.io и что сообщается серверам этой компании?
Sentry.io — это сервис для разработчиков, позволяющий получить обзор ошибок их приложений. И именно это реализовано в данном адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешаете iobroker GmbH собирать диагностические данные, также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне создавать безошибочные адаптеры, которые практически никогда не дают сбоев.

*************************************************************************************************************************************

## Changelog
<!--### __WORK IN PROGRESS__-->
### 1.1.1 (2023-03-18)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.1.0 (2022-11-01)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.0.1 (2021-11-18)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.0.0 (06.05.2021)
* (simatec) GUI revised
* (simatec) Added support for admin5
* (simatec) code cleaned
* (simatec) dependencies updated
* (simatec) Github Test and Release added

### 0.7.0 (27.10.2020)
* (simatec) Changeover from request to axios for data retrieval
* (simatec) Conversion of the code structure
* (simatec) code cleaned
* (simatec) dependencies updated

### 0.6.4 (06.07.2020)
* (simatec) small Bugfixes

### 0.6.3 (02.07.2020)
* (simatec) Bugfix API Request error

### 0.6.2 (27.05.2020)
* (simatec) small Bugfixes at locations settings

### 0.6.1 (11.05.2020)
* (simatec) added errorhandling for sentry.io
* (simatec) added node 14 support

### 0.6.0 (04.05.2020)
* (simatec) added new features
* (simatec) Bugfix next day schoolfree
* (simatec) added sentry.io
* (simatec) added translations
* (simatec) added error handling

### 0.5.1 (25.03.2020)
* (simatec) added new features

### 0.5.0 (23.03.2020)
* (simatec) added public holidays
* (simatec) Bugfix next schoolfree for API 2.0
* (simatec) Bugfix schoolfree-name for API 2.0

### 0.4.1 (22.03.2020)
* (simatec) new query as adaptation to API v2.0
* (simatec) Adjustment of the federal state IDs"
* (simatec) Code fix for autochecker
* (simatec) update Dependencies

### 0.4.0 (21.03.2020)
* (simatec) added new api v2.0 from www.mehr-schulferien.de

### 0.3.1 (28.10.2019)
* (simatec) Fix start after install

### 0.3.0 (18.10.2019)
* (simatec) end of node 6 support
* (simatec) changed dateformat

### 0.2.2 (04.06.2019)
* (simatec)new object structure

### 0.2.1 (14.05.2019)
* (simatec) fix travis and appveyor

### 0.2.0 (13.05.2019)
* (simatec) Add Objects for next school holiday
* (simatec) cleaned code

### 0.1.0 (10.05.2019)
* (simatec) First Beta

### 0.0.1 (08.05.2019)
* (simatec) initial release

*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2019 - 2023 simatec

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