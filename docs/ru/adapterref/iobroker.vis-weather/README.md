---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-weather/README.md
title: ioBroker.vis-погода
hash: 3zzpR4fJsEXG5VXKbOJWUmUSdij8fjkArHeHpMItnZc=
---
![Логотип](../../../en/adapterref/iobroker.vis-weather/admin/vis-weather.png)

![Количество установок](http://iobroker.live/badges/vis-weather-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-weather.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.vis-weather.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.vis-weather/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-weather.png?downloads=true)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.vis-weather?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.vis-weather?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.vis-weather?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.vis-weather?logo=github&style=flat-square)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.vis-weather?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.vis-weather?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/rg-engineering/ioBroker.vis-weather?logo=github&style=flat-square)

# IoBroker.vis-weather
![Действия GitHub](https://github.com/rg-engineering/ioBroker.vis-weather/workflows/Test%20and%20Release/badge.svg)

**Если вам это нравится, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Этот виджет показывает данные прогноза погоды с DasWetter.com или WeatherUnderground. Вам также понадобится работающий DasWetter-Adpater или WeatherUnderground-Adapter...

В WeatherUnderground вам нужен включенный прогноз на следующие 36 часов.
В DasWetter.com вам необходимо включить одну из четырех структур прогнозных данных. Вы можете выбрать тот, который хотите отобразить.

## Совместимость с вис-2
Этот виджет НЕ совместим с vis-2.
Новая версия под названием [vis-2-виджеты-погода](https://github.com/rg-engineering/ioBroker.vis-2-widgets-weather) находится в стадии подготовки.

## Заметки/вики
### Определить часы прогноза
По умолчанию диаграмма прогноза показывает 40 часов (DasWetter) или 36 часов (wunderground). Если вы предпочитаете показывать только, например. Прогноз на 10 часов, просто удалите ненужные OID в разделе oid_groups в vis-edit.

### OID не создаются автоматически при использовании DasWetter
Обычно OID создаются автоматически при выборе экземпляра или структуры данных. Когда вы получите сообщение «нет доступных OID», проверьте, используете ли вы «NextDaysDetailed» в DasWetter.
Возможно, вам придется включить «NextDaysDetailed».

## Известные вопросы
* создавайте проблемы на [github](https://github.com/rg-engineering/ioBroker.vis-weather/issues), если вы обнаружите ошибки или захотите новых функций.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (René) 

### 2.5.9 (2024-01-13)
* (René) dependencies update

### 2.5.6 (2022-08-18)
* (René) tooltip with value added as an option
* (René) flot update
* (René) dependencies update

### 2.5.5 (2021-11-07)
* (René) bug fix color of labels in widget

### 2.5.4 (2021-10-30)
* (René) see issue #37: avoid endless loop
* (René) update flot to 4.2.2

### 2.5.3 (2021-03-21)
* (René) dependencies updated

### 2.5.2 (2019-12-12)
* (René) some changes to make it compatible with widgets in sbfspot and ebus

### 2.5.1 (2019-12-08)
* (René) alignment of bars with marking
* (René) position of tick labels of Y axis changed

### 2.5.0 (2019-12-07)
* (René) see issue #20: scaling problem solved 
* (René) see issue #22: bugfix colors for axis labeling 
* (René) color adjustment for axis and tick lables 
* (René) more adjustments for ticks on Y axis
* (René) see issue #23: names for legend adjustable

### 2.4.0 (2019-10-31)
* (René) legend added

### 2.3.2 (2019-10-24)
* (René) add logs for issue #20
* (René) update flot to version 3.0

### 2.3.1 (2019-07-13)
* (René) bug fix: missing timer added

### 2.3.0 (2019-03-25)
* (René) markings added

### 2.2.2 (2018-12-30)
* (René) bug fix: If oid_date is not set when using weatherunderground, an unnecessary error message was issued and the plot was not shown

### 2.2.1 (2018-12-23)
* (René) bug fix issue #12: unnecessary code removed

### 2.2.0 (2018-08-25)
* (René) OID's for different data structures (only DasWetter 2.x)

### 2.1.1 (2018-08-24)
* (René) bug fixes

### 2.1.0 (2018-08-18)
* (René) support of 2.x of weatherundergruond

### 2.0.0
* (René) support of 2.x of daswetter.com

### 1.2.0
* (René) background color and border

### 1.1.2
* (René) Support of admin3

### 1.1.1
* (René) Y axis with units

### 1.1.0
* (René) logs auskommentiert
* (René) Berechnung min / max für Temperaturgraph optimiert
* (René) Y-Achse automatisch ausblenden, wenn Graph nicht dargestellt wird
* (gitbock) konfigurierbare Y-Achsen je Graph (anzeigen/nicht anzeigen)
* (gitbock) Y-Achsen Beschriftung in der Farbe des Graphen
* (gitbock) Max.-/Min Werte für Temperatur Y-Achse
* (gitbock) konfigurierbares Datumsformat für X-Achse

### 1.0.0
* (René) first stable version

### 0.0.7
* (René) bug fix for android app > 1.0.6
* (René) color adjustment for ticks and tick lable (from sbfspot)

### 0.0.6
* (René) css removed

### 0.0.5
* (René) number of labels on X axis adjustable

### 0.0.4
* (René) bug fixes

### 0.0.3
* (René) support of DasWetter.com and weatherunderground

### 0.0.2
* (René) bug fixes
	- in live mode nothing was shown

### 0.0.1
* (René) initial release

## License
MIT License

Copyright (c) 2017-2024 René G. <info@rg-engineering.eu>

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
