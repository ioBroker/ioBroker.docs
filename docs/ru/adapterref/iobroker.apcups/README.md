---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apcups/README.md
title: ioBroker.apcups
hash: FM26q1o/yfLjfIRKYni4eBA4ezWrIXiLWFHtxRiXLRI=
---
![Логотип](../../../en/adapterref/iobroker.apcups/admin/ups.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.apcups.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.apcups.svg)
![Количество установок (последних)](https://iobroker.live/badges/apcups-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/apcups-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.apcups.png?downloads=true)

# IoBroker.apcups
**Тесты:** [![Тестирование и выпуск] (https://github.com/xhunter74/ioBroker.apcups/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/xhunter74/ioBroker.apcups/actions/workflows/test-and-release.yml)

## Адаптер Apc UPS для ioBroker
Адаптер для ioBroker для получения информации от ИБП APS через apcupsd.

Домашняя страница apcupsd: http://www.apcupsd.org/

apcupsd — это демон для управления ИБП APC. С помощью этого адаптера вы сможете отслеживать состояние ИБП и принимать некоторые решения на основе предоставленной информации.

**Установите apcupsd в Ubuntu:**

sudo apt-get -y установить apcupsd

Более полезную информацию о конфигурации apcupsd для Ubuntu вы можете найти на https://help.ubuntu.com/community/apcupsd.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Changelog
### 4.0.0 (2024-05-10)
 - BREAKING! 
1. Added support of multiple UPS so states structure was changed. All existed states will be deleted. Please do backup before upgrade the adapter! Also existed configuration will be lost. Please re-configure the adapter and add one or more devices to it.
2. Minimal js-controller version is 5.0.19
3. Minimal admin version is 6.13.16
### 3.0.1 (2024-04-25)
 - Update dependencies
### 3.0.0 (2024-04-22)
 - BREAKING! Changed the minimal version of nodejs to 18, js-controller to 4.0.0
### 2.0.0 (2024-02-17)
 - BREAKING! Changed the minimal version of nodejs to 16 
### 1.0.15 (2023-04-25)
 - Changed approach how to states are creating
### 1.0.13 (2023-04-24)
 - Added 'END APC' and 'BATDATE' fields 
### 1.0.10 (2022-12-22)
 - Added Ukrainian language
### 1.0.9 (2022-12-12)
 - Optimized reconnection flow
### 1.0.8 (2022-11-16)
 - Added validation on config screen
### 1.0.7 (2022-11-14)
 - Added validation on config screen

## License
MIT License

Copyright (c) 2024 Serhiy Krasovskyy xhunter74@gmail.com"

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
