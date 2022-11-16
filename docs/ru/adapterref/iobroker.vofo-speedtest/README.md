---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vofo-speedtest/README.md
title: ioBroker.vofo-спидтест
hash: 7TIB/taVtq7D8Ws6DGCOa7cCjYfuEGuTjyDUlX0Bi4k=
---
![Логотип](../../../en/adapterref/iobroker.vofo-speedtest/admin/vofo-speedtest.png)

![Количество установок (последние)](http://iobroker.live/badges/vofo-speedtest-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vofo-speedtest-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.vofo-speedtest.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vofo-speedtest.svg)
![НПМ](https://nodei.co/npm/iobroker.vofo-speedtest.png?downloads=true)

# IoBroker.vofo-speedtest
![Тестируйте и выпускайте](https://github.com/peterbaumert/iobroker.vofo-speedtest/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует службу [Sentry.io](https://sentry.io), чтобы автоматически сообщать мне как разработчику об исключениях и ошибках кода, а также о новых схемах устройств.** Подробнее см. ниже!

## Адаптер vofo-speedtest для ioBroker
Тест скорости Vodafone.de

Реализует ту же технику, что и https://speedtest.vodafone.de.

## Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io — это сервис для разработчиков, позволяющий получить обзор ошибок их приложений. И именно это реализовано в данном адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешаете iobroker GmbH собирать диагностические данные, также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне создавать безошибочные адаптеры, которые практически никогда не дают сбоев.

## Отказ от ответственности
Vodafone является товарным знаком Vodafone GmbH. Я никоим образом не одобрен и не связан с Vodafone GmbH или любыми связанными дочерними компаниями, логотипами или товарными знаками.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.13 (2022-06-06)
* some more "already running" fixes

### 0.0.12 (2022-05-28)
* rerelease for 0.0.11 because of missing version in io-package.json

### 0.0.11 (2022-05-27)
* updating dependencies
* adding some timeouts trying to fix "already running with pid"
* fix extracting API key from js-code (thanks Zwer2k) [#112][pr112]

### 0.0.10 (2022-01-07)
* Fix version numbers

### 0.0.9 (2022-01-03)
* Fix to work with new Vodafone Endpoint

### 0.0.8 (2021-07-01)
* Renamed Adapter due to legal reasons
* Fixed some dependencies

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

Copyright (c) 2020-2022 Peter Baumert

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


[pr112]: https://github.com/peterbaumert/ioBroker.vofo-speedtest/pull/112