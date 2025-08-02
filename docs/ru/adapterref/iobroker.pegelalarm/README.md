---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pegelalarm/README.md
title: ioBroker.pegelalarm
hash: gpgOAXloS3MWETkfQ01J/pUhdJfwJGU/vF1SRGt1Nd0=
---
![Логотип](../../../en/adapterref/iobroker.pegelalarm/admin/pegelalarm.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.pegelalarm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pegelalarm.svg)
![Количество установок (последние)](http://iobroker.live/badges/pegelalarm-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/pegelalarm-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.pegelalarm/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.pegelalarm?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.pegelalarm
![Тестируйте и выпускайте](https://github.com/simatec/ioBroker.pegelalarm/workflows/Test%20and%20Release/badge.svg)

## Адаптер Pegelalarm для ioBroker
Предоставляет данные от Pegelalarm-API (v1.0)

API-документацию для API 1.1 можно найти здесь https://github.com/SOBOS-GmbH/pegelalarm_public_pas_doc/wiki/Download-current-water-data

**************************************************************************************************************

### Что такое Sentry.io и что сообщается серверам этой компании?
Sentry.io — это сервис для разработчиков, позволяющий получить обзор ошибок их приложений. И именно это реализовано в данном адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешаете iobroker GmbH собирать диагностические данные, также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне создавать безошибочные адаптеры, которые практически никогда не дают сбоев.

**************************************************************************************************************

**Если вам это нравится, рассмотрите пожертвование:**

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

**************************************************************************************************************

## Changelog
<!--### __WORK IN PROGRESS__-->
### 1.3.0 (2023-03-18)
* (simatec) Dependencies updated
* (simatec) Repo updated

### 1.2.9 (2022-11-01)
* (simatec) Dependencies updated

### 1.2.8 (2022-06-27)
* (simatec) Bugfix delete stations
* (simatec) Bugfix stations
* (simatec) Dependencies updated

### 1.2.7 (2022-04-25)
* (simatec) Bugfix delete stations

### 1.2.6 (2022-04-25)
* (simatec) Bugfix delete stations
* (simatec) Dependencies updated

### 1.2.5 (2021-12-08)
* (simatec) Bugfix Adapter stop after request error
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.2.4 (2021-11-17)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 1.2.3 (2021-09-02)
* (simatec) Bugfix States

### 1.2.2 (2021-09-02)
* (simatec) Bugfix States

### 1.2.1 (2021-09-02)
* (simatec) Bugfix API-Request
* (simatec) dependencies updated
* (simatec) small Bugfixes

### 1.2.0 (2021-04-29)
* (simatec) Redesign Gui

### 1.1.7 (2021-04-10)
* (simatec) Bugfix Adapter stop
* (simatec) Bugfix clean old stations

### 1.1.6 (2021-04-09)
* (simatec) Bugfix for latest Repo

### 1.1.5 (2021-04-07)
* (simatec) fetch added
* (simatec) sentry added

### 1.1.4 (2021-04-02)
* (simatec) Improved code for request from measuring stations

### 1.1.3 (2021-03-31)
* (simatec) Settings for 5 measuring station added
* (simatec) Bugfix

### 1.1.2 (2021-03-29)
* (simatec) allStationsJSON state added
* (simatec) code rewritten
* (simatec) small Bugfix
* (simatec) axios added

### 1.1.1 (2021-03-28)
* (simatec) json state added
* (simatec) Configuration menu redesigned
* (simatec) unit added
* (simatec) many small Bugfix
* (simatec) Translations added

### 1.1.0 (2021-03-27)
* (simatec) fork from bazidibavaria
* (simatec) code rewritten
* (simatec) dependencies updated
* (simatec) Bugfix setState
* (simatec) Bugfix getState
* (simatec) License updated

### 1.0.0 (2020-09-01)
* (bazidibavaria) updated packages

### 0.0.1 (2020-08-27)
* (bazidibavaria) released

### 0.0.1-2 (2020-08-10)
* (bazidibavaria) fix api-count in index_m.html

### 0.0.1-1 (2020-08-10)
* (bazidibavaria) added travis support
* (bazidibavaria) add images to readme

### 0.0.1-0 (2020-08-10)
* (bazidibavaria) prerelease

## License
MIT License

Copyright (c) 2020 - 2023 simatec

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
