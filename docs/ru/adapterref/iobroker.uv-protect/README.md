---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.uv-protect/README.md
title: ioBroker.uv-protect
hash: TBTR4bXR4tlxEmBan4NHvnFreUDxvOBPdQY2zMnGLFE=
---
![Логотип](../../../en/adapterref/iobroker.uv-protect/admin/uv-protect.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.uv-protect.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.uv-protect.svg)
![Количество установок (последнее)](http://iobroker.live/badges/uv-protect-installed.svg)
![Статус зависимости](https://img.shields.io/david/simatec/iobroker.uv-protect.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.uv-protect/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.uv-protect.png?downloads=true)
![Количество установок (стабильно)](http://iobroker.live/badges/uv-protect-stable.svg)

# IoBroker.uv-protect
![Тестирование и выпуск](https://github.com/simatec/ioBroker.uv-protect/workflows/Test%20and%20Release/badge.svg)

## УФ-защита адаптер для ioBroker
УФ-защита от openUV-API

**************************************************************************************************************

### Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io - это сервис, позволяющий разработчикам получать информацию об ошибках в своих приложениях. Именно это и реализовано в этом адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешили iobroker GmbH собирать диагностические данные, включается также ваш идентификатор установки (это просто уникальный идентификатор **без** дополнительной информации о вас, электронной почты, имени и т. Д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуты такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не дают сбоев.

**************************************************************************************************************

** Если вам это нравится, рассмотрите возможность пожертвования: **

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

**************************************************************************************************************

## Changelog
<!-- ### __WORK IN PROGRESS__ -->

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

Copyright (c) 2021 simatec

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