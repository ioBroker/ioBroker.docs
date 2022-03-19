---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.snmp/README.md
title: ioBroker.snmp
hash: D6Ehnm9VxRfXBY2U36r8YLIy8Omlq15Atc6y2A3ACIU=
---
![Логотип](../../../en/adapterref/iobroker.snmp/admin/snmp.png)

![Количество установок](http://iobroker.live/badges/snmp-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.snmp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.snmp.svg)

# IoBroker.snmp
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/iobroker.snmp/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/snmp/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Информация
Этот адаптер запрашивает информацию с SNMP-устройства, такую как принтеры, сеть...

## Changelog
### __WORK IN PROGRESS__
* IMPORTANT: This release will change the object structures!!
* (McM1957) reduce latency for update of info.connection 
* (McM1957) avoid excessive error logs if target is unreachable, optimize logging
* (McM1957) add additional online at ip base to indicate target is reachable
* (McM1957) output warning if OIDs specify different communities for one device
* (Apollon77) Add Sentry for crash reporting

### 0.5.0
* (Marcolotti) Add documentation (de,en,ru)
* (Marcolotti) Add languages (de,en,ru)

### 0.0.3
* (Apollon77)  Fix Object Type

### 0.0.2
* (Bluefox)    Fixes

### 0.0.1
* (Bluefox)    refactoring
* (Marcolotti) initial release

## License
The MIT License (MIT)

Copyright (c) 2017-2022 Marcolotti <info@ct-j.de>, ioBroker Community Developers 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.