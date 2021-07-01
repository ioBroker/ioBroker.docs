---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vodafone-speedtest/README.md
title: ioBroker.vofo-speedtest
hash: 2OWK9bGidtbE4CoRu0md2lqebVJMbzOBGqPSf3kx2Iw=
---
![Логотип](../../../en/adapterref/iobroker.vodafone-speedtest/admin/vofo-speedtest.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.vofo-speedtest.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vofo-speedtest.svg)
![Количество установок (последнее)](http://iobroker.live/badges/vofo-speedtest-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vofo-speedtest-stable.svg)
![Статус зависимости](https://img.shields.io/david/peterbaumert/iobroker.vofo-speedtest.svg)
![Известные уязвимости](https://snyk.io/test/github/peterbaumert/ioBroker.vofo-speedtest/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vofo-speedtest.png?downloads=true)

# IoBroker.vofo-speedtest
** Этот адаптер использует службу [Sentry.io](https://sentry.io) для автоматического сообщения мне как разработчику об исключениях, ошибках кода и новых схемах устройств. ** Подробнее см. Ниже!

## Адаптер vofo-speedtest для ioBroker
Спидтест Vodafone.de

Реализует ту же технику, что и https://speedtest.vodafone.de.

## Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io - это сервис, позволяющий разработчикам получать информацию об ошибках в своих приложениях. Именно это и реализовано в этом адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешили iobroker GmbH собирать диагностические данные, включается также ваш установочный идентификатор (это просто уникальный идентификатор **без** дополнительной информации о вас, электронной почты, имени и т. Д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуты такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не дают сбоев.

## Заявление об ограничении ответственности
Vodafone является товарным знаком Vodafone GmbH. Я никоим образом не поддерживаю и не являюсь аффилированным лицом Vodafone GmbH или каких-либо связанных дочерних компаний, логотипов или товарных знаков.

## Changelog

### 0.0.7 (2021-05-21)
* Fixed some vulnerabilities in dev-dependencies
* Fixed js-controller 3* issues
* Fixed node 16 compatability

### 0.0.6 (2021-01-21)
* Added Sentry.io Integration

### 0.0.5 (2020-05-26)
* Added ping results
* Added calculated values by actual raw data

### 0.0.4 (2020-04-30)
* Changed Adapter start type to scheduled (reinstallation might be needed)
* Bug fixes and feedback implementation

### 0.0.3 (2020-04-24)
* Implemented feedback from Forum and github issue

### 0.0.2 (2020-04-19)
* Added actual settings in Admin interface
* first version ready for testing

### 0.0.1 (2020-04-18)
* (Peter Baumert) initial release

## License
MIT License

Copyright (c) 2021 Peter Baumert <ioBroker.vofo-speedtest@outlook.com>

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