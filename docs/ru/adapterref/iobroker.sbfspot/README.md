---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: K0zxPpUHSF36PRinbqar1b3YfDXcTQDDno2TsC9KBRc=
---
![Логотип](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![Количество установок](http://iobroker.live/badges/sbfspot-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.sbfspot.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.sbfspot/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.sbfspot?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.sbfspot?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.sbfspot?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)

# IoBroker.sbfspot
![Действия GitHub](https://github.com/rg-engineering/ioBroker.sbfspot/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

**Если вам это нравится, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Этот адаптер считывает данные с инверторов SMA с помощью sbfspot.
Теперь поддерживаются оба типа баз данных (mySQL и sqlite).
Начиная с версии 0.2.3 доступен собственный виджет vis на основе флота для отображения исторических данных.

## Монтаж
следуйте инструкциям по установке sbfspot на странице https://github.com/SBFspot/SBFspot/wiki.

[детальная установка на системах на базе манипуляторов](docs/en/install_arm.md)

## Подсказки
* используйте последнюю версию sbfspot с https://github.com/SBFspot/SBFspot
* адаптер, sbfspot и базы данных (mySQL или sqlite) должны работать в одной системе, например. Raspberry Pi
* руководство по установке sbfspot на Raspberry Pi (или аналогичном) можно найти по адресу https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite или https://www.rg-engineering.eu/index. php/продукт/программное обеспечение/plugin-fuer-iobroker-sbfspot
* для Raspberry Pi существует инструмент полуавтоматической настройки, доступный по адресу https://github.com/SBFspot/sbfspot-config.

## Известные вопросы
* иногда установка пакета npm sqlite3 завершается неудачно.

в этом случае переустановите все пакеты npm

> cd /opt/iobroker/node_modules/iobroker.sbfspot > sudo npm install

иногда npm intall необходимо вызвать более одного раза, чтобы успешно установить все необходимые пакеты

* создавайте проблемы на [github](https://github.com/rg-engineering/ioBroker.sbfspot/issues), если вы обнаружите ошибки или захотите новых функций.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.2.1 (2023-12-11)
* (René) dependencies updated

### 4.2.0 (2023-12-11)
* (René) dependencies updated

### 4.1.6 (2023-07-30)
* (René) dependencies updated

### 4.1.4 (2023-04-07)
* (René) dependencies updated

### 4.1.3 (2023-01-31)
* (René) dependencies updated

### 4.1.2 (2022-08-20)
* (René) bug fix in AddObject

### 4.1.1 (2022-08-18)
* (René) tooltip in wizard added
* (René) flot and dependencies updated

### 4.0.8 (2021-07-11)
* (René) bug fix color of labels in widget

### 4.0.7 (2021-10-30)
* (René) see issue #62: avoid endless loop
* (René) update flot to 4.2.2

### 4.0.6 (2021-07-09)
* (René) bug fix data types

### 4.0.5 (2021-03-21)
* (René) dependencies updated

### 2.3.3 (2019-02-03)
* (René) due to install problems downgrade of sqlite3 package

### 2.3.1 (2019-02-02)
* (René) bug fix: with sqlite "today" data were not shown

### 2.3.0 (2019-01-20)
* (René) support of compact mode
* (René) add additional error information in log

### 2.2.5 (2018-11-26)
* (René) upgrade packages

### 2.2.5 (2018-11-04)
* (René) reset yield if no new value from today

### 2.2.4 (2018-08-19)
* (René) bugfix for ticks on X

### 2.2.3
* (René) the same as 2.2.2

### 2.2.2
* (René) add timestamp of last update

### 2.2.1
* (René) close of database connection after last query result is available (e.g. to support more than one inverter)

### 2.2.0
* (Nis) background color and border
* (René) bug fixes in admin3

### 2.1.0
* (René) Support MariaDB

### 2.0.1
* (René) Support of admin3

### 2.0.0
* (René) since we always use one graph per widget, only one is supported now
		Attention: widget is not compatible with version 1.x.x; just check settings in widget after installation!

### 1.1.0
* (René) autoscale of y axis
* (René) color for y axis 
* (René) adjustable date format

### 1.0.1
* (René) bug fix for sqlite

### 1.0.0
* (René) first stable release

### 0.2.6
* (René) bug fix for android app > 1.0.6

### 0.2.5
* (René) use install date to calculate historical values

### 0.2.4
* (René) logo changed

### 0.2.3
* (René) adding historical data as datapoint (JSON)
* (René) new vis widget to show historical data

### 0.2.2
* (René) renamed to sbfspot

### 0.2.1
* (René) index.html updated

### 0.2.0
* (René) support of sqlite and license changed to MIT

### 0.1.1
* (René) UTF8 coding

### 0.1.0
* (René) first release

### 0.0.1
* (René) initial release

## License
MIT License

Copyright (c) 2017-2023 rg-engineering info@rg-engineering.eu

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
