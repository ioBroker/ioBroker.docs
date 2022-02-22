---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apcups/README.md
title: ioBroker.apcups
hash: PsNp0J2WZMaXgUdZhR9Qe29ydrcYuGzOxMfZjSauqWY=
---
![Логотип](../../../en/adapterref/iobroker.apcups/admin/ups.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.apcups.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.apcups.svg)
![Количество установок (последние)](https://iobroker.live/badges/apcups-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.apcups.png?downloads=true)

# IoBroker.apcups
**Тесты:** [![Тестирование и выпуск] (https://github.com/xhunter74/ioBroker.apcups/actions/workflows/main.yml/badge.svg)](https://github.com/xhunter74/ioBroker.apcups/actions/workflows/main.yml)

## Адаптер ИБП Apc для ioBroker
Адаптер для ioBroker для получения информации от ИБП APS через apcupsd.

Домашняя страница apcupsd: http://www.apcupsd.org/

apcupsd — это демон для управления ИБП APC. С помощью этого адаптера вы можете отслеживать состояние ИБП и принимать решения на основе предоставленной информации.

**Установите apcupsd на Ubuntu:**

sudo apt-get -y установить apcupsd

Более полезную информацию о конфигурации apcupsd для Ubuntu вы можете найти на странице https://help.ubuntu.com/community/apcupsd.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Changelog

### 0.0.9 (2022-02-21)
 - Changed adapter type
### 0.0.8 (2022-02-18)
 - Fixed review issues
### 0.0.7 (2022-02-18)
 - Changed default log level to 'info'
### 0.0.6 (2022-02-17)
 - Cleanup code.
 - Sentry integration
### 0.0.5 (2022-02-16)
 - Fixed issues with uncaught exception.
### 0.0.4 (2022-01-12)
 - Fixed issue with polling interval greater than 15 sec.
### 0.0.3 (2021-10-18)
 - Fixed parse values bugs.
### 0.0.2 (2021-09-13)
 - Initial commit. Alpha Version. 

### **WORK IN PROGRESS**
* (Author) initial release

## License
MIT License

Copyright (c) 2022 Serhiy Krasovskyy xhunter74@gmail.com"

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