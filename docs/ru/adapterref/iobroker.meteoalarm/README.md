---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.метеоаларм
hash: me8TkQFULVxyMbpJjYpqSYrGcAilUysqCKL2D1+NPxg=
---
![Логотип](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![Количество установок](http://iobroker.live/badges/meteoalarm-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

# IoBroker.метеоаларм
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Адаптер meteoalarm для ioBroker ------------------------------------------------------------------------------ Этот адаптер получает оповещения о погоде с https://meteoalarm.org, включая данные о ветре, снеге, дожде, высокой и низкой температуре и т. д. Эта информация доступна на местном языке и для подробных регионов.

ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ: Возможны задержки во времени между этим сайтом и сайтом www.meteoalarm.org. Для получения самой актуальной информации об уровнях оповещения, опубликованной участвующими национальными метеорологическими службами, используйте https://www.meteoalarm.org.

Разработчик не может гарантировать, что предупреждения будут обработаны вовремя или что возникнут ошибки и проблемы, из-за которых предупреждения не будут обработаны вообще!

## Как это использовать
Выберите свою страну, а затем регион, для которого вы хотите получать предупреждения. Если вы не уверены в названии своего региона, перейдите на https://meteoalarm.org и попробуйте найти его на карте.

[Описание на английском языке](docs/en/meteoalarm.md)

[Deutsche Anleitung](docs/de/meteoalarm.md)

## Кредиты
Создание этого адаптера было бы невозможно без выдающейся работы @jack-blackson (https://github.com/jack-blackson)", который создал версии этого адаптера до V4.x.x.

Значок колокольчика разработан Freepik с сайта www.flaticon.com

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 4.0.0 (2025-06-06)
* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation.
* (mcm1957) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.4.10 now.
* (mcm1957) @iobroker/eslint-config has been added and linter error have been fixed.
* (mcm1957) Dependencies have been updated.

### 3.0.3 (2024-08-11)
* (jack-blackson) Updated repositories
* (jack-blackson) Small adjustments in package settings

### 3.0.2 (2024-02-24)
* (jack-blackson) Bugfix for notification text - missing space
* (jack-blackson) Bugfix for notification text - fix to just show "warning level in words" in the notification if it is ticked in the setup

### 3.0.1 (2024-02-29)
* (jack-blackson) Bugfix for location names
* (jack-blackson) Removed necessity to choose country, this is now automatically detected

### 3.0.0 (2024-02-26)
* (jack-blackson) Breaking change: switch to locations instead of choosing geocodes to be able to also handle warnings coming with polygons (e.g. Switzerland)

## License
The MIT License (MIT)

Copyright (c) 2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2019-2024 jack-blackson <blacksonj7@gmail.com>

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