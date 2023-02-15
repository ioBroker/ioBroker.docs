---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: cmVxVpq3UMsRhfTVdYicobqMo+jdDShWAGi3WSwRSes=
---
![Логотип](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba.svg)
![Известные уязвимости](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba/badge.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.kostal-piko-ba?branch=master&svg=true)
![НПМ](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)

# IoBroker.kostal-piko-ba
![Версия NPM (стабильная)](http://ioBroker.live/badges/kostal-piko-ba-stable.svg) ![Количество установок (последние)](http://ioBroker.live/badges/kostal-piko-ba-installed.svg)

CI-тесты: ![Node.js CI](https://github.com/hombach/ioBroker.kostal-piko-ba/workflows/Node.js%20CI/badge.svg)

## Адаптер для чтения данных Kostal Piko & Piko BA для iOBroker
Адаптер для чтения данных Kostal Piko & Piko BA. Адаптер создает несколько состояний и последовательно их обновляет.
Адаптер для инверторов Kostal Piko 6.0BA, 8.0BA, 10.0BA, 3.0, 5.5, 7.0, 10, 12, 15, 17 и 20.
Буду очень признателен, если вы проверите работоспособность других инверторов и отправьте мне сообщение.

## Настройки
Имейте в виду, что ваш инвертор должен быть обновлен до версии Kostal UI >= 6.11! Для подключения к инвертору Kostal Pico (BA) установка его IP-адреса в конфиге обязательна.
Вы также можете изменить частоту обновления данных в реальном времени, ежедневную статистику и статистику в реальном времени.
При необходимости также установите метку для считывания 4 аналоговых значений.

## Примечания
Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам. Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Changelog

! Note that missing version entries are typically dependency updates for security.

### 2.2.2 (14.02.2023)
* (HombachC) fixed error with missing grid limitation response; bumped dependencies
### 2.2.1 (07.02.2023)
* (HombachC) fixing error with missing grid limitation response
### 2.2.0 (03.02.2023)
* (HombachC) added support for phase 1-3 of homeconsumption power
* (HombachC) enhanced sentry support
### 2.1.3 (03.02.2023)
* (HombachC) optimized debug data
### 2.1.2 (29.01.2023)
* (HombachC) fixed errors with single phase inverters (Piko 3)
* (HombachC) bumped dependencies
### 2.1.1 (29.12.2022)
* (HombachC) year 2023 changes
* (HombachC) bumped dependencies
### 2.1.0 (04.11.2022)
* (HombachC) added ukrainian translations
* (HombachC) bumped dependencies
### 2.0.2 (16.10.2022)
* (HombachC) fixed small sentry reported error
* (HombachC) optimized error logging
* (HombachC) bumped dependencies
### 2.0.1 (11.10.2022)
* (HombachC) optimized error logging
* (HombachC) bumped dependencies
### 2.0.0 (28.08.2022)
* (HombachC) BREAKING: Dropped support for Node.js 12
* (HombachC) changed the minimal required js-controller version to 3.2.16
* (HombachC) added state of inverter as string
* (HombachC) bumped dependencies
### 1.5.0 (05.08.2022)
* (HombachC) added minimum values for poll times to prevent communication errors
* (HombachC) bumped dependencies
### 1.4.7 (26.06.2022)
* (HombachC) bumped dependency because of security vulnerability
### 1.4.6 (06.06.2022)
* (HombachC) removed gulp, bumped dependencies, added tests for node.js 18
* (HombachC) removed tests for node.js 12 -> it's recommended to switch to node.js 14, adapter still working with node 12
### 1.4.5 (03.05.2022)
* (HombachC) added UI version to sentry feedback and documentation
### 1.4.4 (01.05.2022)
* (HombachC) optimized sentry feedback and documentation
### 1.4.3 (24.04.2022)
* (HombachC) normalizing of analog values added, bumped dependencies
### 1.4.2 (01.02.2022)
* (HombachC) added support for inverter type, version and name
* (HombachC) fixed timing error
### 1.4.1 (31.01.2022)
* (HombachC) optimized logging; bumped dependencies
### 1.4.0 (30.01.2022)
* (HombachC) added support for grid 1-3 current, voltage and power
* (HombachC) bumped dependencies
### 1.3.1 (23.01.2022)
* (HombachC) correct rounding of analog values; bumped dependencies
* (HombachC) added validation of configured IPv4 address
### 1.3.0 (01.01.2022)
* (HombachC) added optional support for analog inputs
### 1.2.1 (24.12.2021)
* (HombachC) introduced rounding of battery temp
### 1.2.0 (16.12.2021)
* (HombachC) dropped node.js 10 support; bumped dependencies; fixed vulnerability
### 1.1.13 (16.10.2021)
* (HombachC) bumped dependencies; fixed vulnerability
### 1.1.12 (07.10.2021)
* (GermanBlueFox) fixed icon link
* (HombachC) bumped dependencies
### 1.1.7 (09.05.2021)
* (HombachC) added tests for node.js 16; fixed vulnerability
### 1.1.3 (23.11.2020)
* (HombachC) added battery.Voltage; added additional error handler; bumped dependencies
### 1.1.1 (09.10.2020) stable
* (HombachC) minor documentation tweaks; DC current accuracy changed to mA
### 1.1.0 (09.10.2020)
* (tobstare) added DC1-3 current, voltage and power
* (HombachC) added battery.ChargeCycles
* (HombachC) bumped dependencies; added battery.temperature
### 1.0.2 (23.09.2020)
* (HombachC) public release for stable repo
### 0.8.0 (18.08.2020)
* (HombachC) seperate editable poll timer for statistics data
### 0.7.4 (03.07.2020)
* (HombachC) added sentry.io support
### 0.6.1 (28.06.2020)
* (HombachC) poll of statistics data separated
### 0.1.0 (15.05.2020)
* (HombachC) initial working release

## License
MIT License

Copyright (c) 2020 - 2023 HombachC

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