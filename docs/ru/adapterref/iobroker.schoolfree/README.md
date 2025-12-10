---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolfree
hash: S/xH1aaRxryOQeISBMFmoqEE1bY14AKbIcSqq5mJ0v4=
---
![Логотип](../../../en/adapterref/iobroker.schoolfree/admin/schoolfree.png)

![Количество установок](http://iobroker.live/badges/schoolfree-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.schoolfree.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.schoolfree?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.schoolfree
![Тестирование и выпуск](https://github.com/simatec/ioBroker.schoolfree/workflows/Test%20and%20Release/badge.svg)

Этот адаптер использует сервис Sentry.io для автоматического сообщения мне, как разработчику, об исключениях, ошибках в коде и новых схемах устройств. Подробнее см. ниже!

## Адаптер schoolfree для ioBroker
**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![[paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

*************************************************************************************************************************************

### Описание:
Schoolfree — это адаптер для установок iobroker.
С помощью адаптера можно оценивать и передавать данные о школьных каникулах в точки данных.
Таким образом, эти точки данных можно оценивать и обрабатывать для других функций, таких как управление отоплением, жалюзи и контроль присутствия.

В настоящее время подписка на период школьных каникул осуществляется через API сайта https://www.mehr-schulferien.de

В настоящее время в Германии поддерживаются школьные каникулы и выходные дни.

Для дальнейшей обработки с помощью Schoolfree доступны следующие данные:

* info.current.end: Дата окончания текущих праздников
* info.current.name: название текущих школьных каникул
* info.current.start: Дата начала текущего отпуска
* info.next.end: Дата окончания следующих каникул
* info.next.name: название следующих школьных каникул
* info.next.start: Дата начала следующего отпуска
* info.today: Переключатель для отображения текущего статуса сегодня (true/false)
* info.tomorrow: переключатель для отображения текущего статуса завтра (true/false)

### Что такое Sentry.io и какая информация передается на серверы этой компании?
Sentry.io — это сервис для разработчиков, позволяющий получать обзор ошибок в их приложениях. И именно это реализовано в данном адаптере.

Когда адаптер зависает или возникает другая ошибка в коде, это сообщение об ошибке, которое также отображается в журнале ioBroker, отправляется в Sentry. Если вы разрешили iobroker GmbH собирать диагностические данные, то в них также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не зависают.

*************************************************************************************************************************************

## Changelog
<!--### __WORK IN PROGRESS__-->
### __WORK IN PROGRESS__
* (simatec) Readme updated

### 1.1.13 (2025-11-18)
* (simatec) dependencies updated
* (simatec) update npm publish

### 1.1.12 (2025-08-31)
* (simatec) small fix
* (simatec) dependencies updated

### 1.1.11 (2025-08-15)
* (simatec) dependencies updated

### 1.1.10 (2025-06-29)
* (simatec) dependencies updated
* (simatec) Ready for NodeJS 24.x

### 1.1.9 (2025-03-14)
* (simatec) Fix warning
* (simatec) Dependencies updated

### 1.1.8 (2025-02-22)
* (simatec) eslint-config fix
* (simatec) Dependencies updated
* (simatec) small Fix

### 1.1.7 (2024-12-31)
* (simatec) eslint-config fix
* (simatec) Dependencies updated
* (simatec) Fix States
* (simatec) Update License

### 1.1.6 (2024-11-25)
* (simatec) Dependencies updated
* (simatec) Issue Action added
* (simatec) eslint-config added

### 1.1.5 (2024-09-21)
* (simatec) Dependencies updated
* (simatec) small fix
* (simatec) Responsive Design added

### 1.1.4 (2024-02-06)
* (simatec) Dependencies updated
* (simatec) Design Fix
* (simatec) Gulp deleted
* (simatec) adapter-dev added
* (simatec) Translation updated

### 1.1.3 (2023-11-02)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.1.2 (2023-09-04)
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Translation updated

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

Copyright (c) 2019 - 2025 simatec

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