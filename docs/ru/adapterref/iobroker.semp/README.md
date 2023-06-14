---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.semp/README.md
title: ioBroker.semp
hash: I2Oh/vLz4Xwex8EVaxD1Vtc8hLFRcWS67WPe/8QxK2o=
---
![Логотип](../../../en/adapterref/iobroker.semp/admin/semp.png)

![Количество установок](http://iobroker.live/badges/semp-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.semp.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.semp.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.semp/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.semp.png?downloads=true)

# IoBroker.semp
![Действия на GitHub](https://github.com/rg-engineering/ioBroker.semp/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

**Если вам это нравится, рассмотрите пожертвование:**

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

## Адаптер SMA SEMP для ioBroker
Интерфейс к SMA SunnyPortal через SunnyHomeManager и SEMP

Добавьте свои устройства из ioBroker в SunnyPortal.
Затем SunnyPortal может лучше оценить потребление энергии и, таким образом, сделать более точные прогнозы и рекомендации. Но вы также можете управлять своими устройствами с помощью SunnyPortal. Если солнечной энергии достаточно, SunnyPortal может включить ваши устройства или, если солнечной энергии недостаточно, снова их выключить. Таким образом, вы оптимизируете собственное потребление, но не зависите от нескольких устройств, поддерживаемых SunnyPortal. С помощью адаптера любое устройство от ioBroker можно интегрировать в SunnyPortal.
Даже не обязательно измерять потребление одного устройства. Достаточно даже оценочных значений.

## Пользовательская документация
см. [документ](docu/docu_en.md)

Подробную информацию о протоколе и использовании см. в [документ SMA](docu/SMA/SEMP-11ZE3315-Specification-1.0.6.pdf).

Описание общего использования запросов энергии см. в [документ SMA](docu/SMA/SSH_KANN-Zeitfenster-TI-de-10.pdf). (только немецкий)

## Функции
* добавить устройства от ioBroker в SunnyPortal через SMA SEMP
* информирует SunnyPortal о текущем потреблении
* разрешить SunnyPortal управлять этими устройствами (включать, когда достаточно солнечной энергии, и выключать, когда солнечной энергии недостаточно)

## Требования
* узел v16 или выше

## Известные вопросы
* пожалуйста, создавайте задачи на [github](https://github.com/rg-engineering/ioBroker.semp/issues), если вы обнаружите ошибки или хотите добавить новые функции

## Changelog

### 1.1.0 (in progress)
* (René) issue #30: URL as another option for configuring the wallboy interface

### 1.0.0 (2023-04-07)
* (René) dependencies updated

### 0.4.2 (2023-04-02)
* (René) fast charge is now a boolean and can be enabled/disabled
* (René) wallbox charge time can be defined as 12h, 24h, endles or userdefined

### 0.4.1 (2023-03-24)
* (René) bug fix: avoid exception when no switch is defined for wallbox
* (René) limit to switch between 1phase and 3phase charging of wallbox is adjustable now
* (René) allow one minute disconnected before state change. Sometimes when wallbox switches from 1phase to 3phase it sends "disconnected", but cable is still connected

### 0.4.0 (2023-03-15)
* (René) redesign wallbox feature
* (René) add status ExcessEnergy in timeframes to show when excess energy is used
* (René) bug fix for "cannot read data undefined" when new device was created

### 0.3.1 (2023-02-26)
* (René) issue #27: wallbox fast charging added
* (René) wallbox: some bug fixes

### 0.2.1 (2023-02-17)
* (René) wallboxes: bug fix MinEnergy set to 0

### 0.2.0 (2023-02-16)
* (René) wallboxes: add switch to enable 3phase charge

### 0.1.1 ()
* (René) wallboxes: some bug fixes

### 0.1.0 (2023-01-20)
* (René) wallboxes: see issue #23: wallbox OID can be configured (DP type and set or check value)
* (René) wallboxes: minimum and maximum energy for charging is adjustable by datapoint, default: battery capacity (10% and 100%)
* (René) see issue #24: delete csv logs if older then three days

### 0.0.5 (2022-12-27)
* (René) MinPowerConsumption added
* (René) see issue #20: support of wallboxes

### 0.0.4 (2022-11-07)
* (René) see issue #15: support of more then one time periods for energy requests
* (René) some bug fixes (0.0.3)

### 0.0.2 (2022-10-16)
* (René) threshold for status detection with timer
* (René) csv logger for data to be sent to SHM (for debugging)
* (René) see issue #14: cancel request if device does not turn on
* (René) bug fix issue #19: turn off device at the end of maximum operation time


### 0.0.1 (2022-10-01)
* (René) initial release

## License
MIT License

Copyright (c) 2022-2023 rg-engineering info@rg-engineering.eu

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