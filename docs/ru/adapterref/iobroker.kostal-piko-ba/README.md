---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: z2vTSHYACAYAKPB30EQQz5xNuEkkLXoI6VGlOaQSraA=
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
Адаптер для чтения данных Kostal Piko, Piko BA и PIKO MP plus. Адаптер создает несколько состояний и последовательно их обновляет.
Адаптер предназначен для инверторов Kostal Piko 6.0BA, 8.0BA, 10.0BA, BA.
Адаптер также работает с инверторами Kostal Piko 3.0, 4.2, 4.6, 5.5, 7.0, 8.5, 10, 12, 15, 17, 20 и 36.
НОВЫЙ! Адаптер теперь также работает с инверторами MP plus - проверено с Kostal PIKO 1.5-1, 2.0-1, 3.0-1 MP plus.
Буду очень признателен, если вы проверите работоспособность других инверторов и отправьте мне сообщение.

## Настройки
Имейте в виду, что ваш инвертор Piko или Piko BA должен быть обновлен до версии Kostal UI >= 6.11! Для подключения к инвертору Kostal Piko (BA/MP plus) установка его IP-адреса в конфиге обязательна.
При желании вы также можете отредактировать частоту обновления данных в реальном времени, ежедневную статистику и статистику в реальном времени.
Если это необходимо и поддерживается вашим оборудованием, установите также отметку для считывания 4 аналоговых значений.

## Примечания
Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам. Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 2.5.1 (25.04.2023)
* (HombachC) fixed a sentry reported error
### 2.5.0 (22.04.2023)
* (HombachC) implemented battery power calculation
### 2.4.7 (13.04.2023)
* (HombachC) improved error handling
### 2.4.6 (09.04.2023)
* (HombachC) fixed vulnerability in xml2js
### 2.4.5 (07.04.2023)
* (HombachC) improved error handling
### 2.4.4 (04.04.2023)
* (HombachC) improved error handling
### 2.4.3 (03.04.2023)
* (HombachC) improved error handling
### 2.4.2 (07.03.2023)
* (HombachC) fixed error in Piko MP Plus AC current
* (HombachC) added Piko MP Plus total yield
### 2.4.1 (06.03.2023)
* (HombachC) fixed Piko MP Plus support for two channel hardware
### 2.4.0 (06.03.2023)
* (HombachC) added support of AC and DC power values for Piko MP inverters
### 2.3.1 (05.03.2023)
* (HombachC) fix error with zero values in DC & AC
### 2.3.0 (26.02.2023)
* (HombachC) replaced got by axios
* (HombachC) added warning for not supported Piko MP inverters
* (HombachC) removed travis
### 2.2.2 (14.02.2023)
* (HombachC) fixed error with missing grid limitation response
### 2.2.0 (03.02.2023)
* (HombachC) added support for phase 1-3 of homeconsumption power
* (HombachC) enhanced sentry support
### 2.1.3 (03.02.2023)
* (HombachC) optimized debug data
### 2.1.2 (29.01.2023)
* (HombachC) fixed errors with single phase inverters (Piko 3)
### 2.1.1 (29.12.2022)
* (HombachC) year 2023 changes
### 2.1.0 (04.11.2022)
* (HombachC) added ukrainian translations
### 2.0.2 (16.10.2022)
* (HombachC) fixed small sentry reported error
* (HombachC) optimized error logging
### 2.0.1 (11.10.2022)
* (HombachC) optimized error logging
### 2.0.0 (28.08.2022)
* (HombachC) BREAKING: Dropped support for Node.js 12
* (HombachC) changed the minimal required js-controller version to 3.2.16
* (HombachC) added state of inverter as string
### 1.5.0 (05.08.2022)
* (HombachC) added minimum values for poll times to prevent communication errors
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
* (HombachC) normalizing of analog values added
### 1.4.2 (01.02.2022)
* (HombachC) added support for inverter type, version and name
* (HombachC) fixed timing error
### 1.4.1 (31.01.2022)
* (HombachC) optimized logging
### 1.4.0 (30.01.2022)
* (HombachC) added support for grid 1-3 current, voltage and power
### 1.3.1 (23.01.2022)
* (HombachC) correct rounding of analog values
* (HombachC) added validation of configured IPv4 address
### 1.3.0 (01.01.2022)
* (HombachC) added optional support for analog inputs
### 1.2.1 (24.12.2021)
* (HombachC) introduced rounding of battery temp
### 1.2.0 (16.12.2021)
* (HombachC) dropped node.js 10 support; fixed vulnerability
### 1.1.13 (16.10.2021)
* (HombachC) fixed vulnerability
### 1.1.12 (07.10.2021)
* (GermanBlueFox) fixed icon link
### 1.1.7 (09.05.2021)
* (HombachC) added tests for node.js 16; fixed vulnerability
### 1.1.3 (23.11.2020)
* (HombachC) added battery.Voltage; added additional error handler
### 1.1.1 (09.10.2020) stable
* (HombachC) minor documentation tweaks; DC current accuracy changed to mA
### 1.1.0 (09.10.2020)
* (tobstare) added DC1-3 current, voltage and power
* (HombachC) added battery.ChargeCycles
* (HombachC) added battery.temperature
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