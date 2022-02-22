---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.uv-protect/README.md
title: ioBroker.uv-защита
hash: SIxeKRjYKbMmCUk8cjZHcIMhd9ErlfpX71Kgy/vLO/M=
---
![Логотип](../../../en/adapterref/iobroker.uv-protect/admin/uv-protect.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.uv-protect.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.uv-protect.svg)
![Количество установок (последние)](http://iobroker.live/badges/uv-protect-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/uv-protect-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.uv-protect/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.uv-protect?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# IoBroker.uv-защита
![Тестируйте и выпускайте](https://github.com/simatec/ioBroker.uv-protect/workflows/Test%20and%20Release/badge.svg)

## Адаптер с защитой от ультрафиолета для ioBroker
УФ-защита от openUV-API

**************************************************************************************************************

**Если вам это нравится, рассмотрите пожертвование:**

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

**************************************************************************************************************

### Что такое Sentry.io и что сообщается серверам этой компании?
Sentry.io — это сервис для разработчиков, позволяющий получить обзор ошибок их приложений. И именно это реализовано в данном адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешаете iobroker GmbH собирать диагностические данные, также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне создавать безошибочные адаптеры, которые практически никогда не дают сбоев.

**************************************************************************************************************

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 0.3.5 (2022-02-08)
* (simatec) Fix value types
* (simatec) Fix Axios Request
* (simatec) Dependencies updated

### 0.3.4 (2021-11-17)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 0.3.3 (31.07.2021)
* (simatec) Bugfix async/await function

### 0.3.2 (28.07.2021)
* (simatec) Bugfix

### 0.3.1 (28.06.2021)
* (simatec) Date / time formatted

### 0.3.0 (24.06.2021)
* (simatec) code cleaning
* (simatec) added translate to system language for states
* (simatec) Bugfix Timestamp
* (simatec) value formating
* (simatec) Dependencies updated
* (simatec) name for states updated

### 0.2.3 
* (simatec) apiKey auto encrypted

### 0.2.2
* (simatec) apiKey encrypted
* (simatec) fix async function

### 0.2.1
* (simatec) Fix for latest Repo

### 0.2.0
* (simatec) jsonConfig for Admin5 added

### 0.1.0
* (simatec) First Beta

### 0.0.1
* (simatec) initial release

## License
MIT License

Copyright (c) 2021 - 2022 simatec

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