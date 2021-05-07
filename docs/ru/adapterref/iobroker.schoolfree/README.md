---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolfree
hash: wN18juysKPSF8CRtXU2o7IO+98KeQ0F3ee1AtnacO50=
---
![Логотип](../../../en/adapterref/iobroker.schoolfree/admin/schoolfree.png)

![Количество установок](http://iobroker.live/badges/schoolfree-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.schoolfree.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)
![Статус зависимости](https://img.shields.io/david/simatec/iobroker.schoolfree.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)
![Трэвис-Си](http://img.shields.io/travis/simatec/ioBroker.schoolfree/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/simatec/ioBroker.schoolfree?branch=master&svg=true)
![НПМ](https://nodei.co/npm/iobroker.schoolfree.png?downloads=true)

# IoBroker.schoolfree
![Тестирование и выпуск](https://github.com/simatec/ioBroker.schoolfree/workflows/Test%20and%20Release/badge.svg)

Этот адаптер использует службу Sentry.io, чтобы автоматически сообщать мне как разработчику об исключениях, ошибках кода и новых схемах устройств. Подробнее см. Ниже!

## Школьный адаптер для ioBroker
** Если вам это нравится, рассмотрите возможность пожертвования: **

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

### Deutsche Beschreibung:
Школьный бесплатный адаптер для установки иоброкера.
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
* info.today: Switch für den aktuellen Status heute (true / false)
* info.tomorrow: Switch für den aktuellen Status morgen (true / false).

*************************************************************************************************************************************

### Описание на английском языке:
Schoolfree - это адаптер для установок iobroker.
С помощью адаптера можно оценивать школьные каникулы и передавать их в точки данных.
Таким образом, точки данных можно оценивать и обрабатывать для других функций, таких как управление обогревом, жалюзи и контроль присутствия.

Текущая подписка на школьные каникулы осуществляется через API https://www.mehr-schulferien.de.

В настоящее время поддерживаются школьные каникулы и выходные для Германии.

Следующие точки данных доступны для дальнейшей обработки в Schoolfree:

* info.current.end: Дата окончания текущих праздников
* info.current.name: название текущих школьных каникул
* info.current.start: Дата начала текущего праздника
* info.next.end: Дата окончания следующих праздников
* info.next.name: название следующих школьных каникул
* info.next.start: Дата начала следующего праздника
* info.today: переключить на текущий статус сегодня (true / false)
* info.tomorrow: переключить на текущий статус завтра (true / false)

### Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io - это сервис, позволяющий разработчикам получать информацию об ошибках в своих приложениях. Именно это и реализовано в этом адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешили iobroker GmbH собирать диагностические данные, включается также ваш установочный идентификатор (это просто уникальный идентификатор **без** дополнительной информации о вас, адрес электронной почты, имя и т. Д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуты такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не дают сбоев.

*************************************************************************************************************************************

## Changelog

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

Copyright (c) 2019 - 2021 simatec

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