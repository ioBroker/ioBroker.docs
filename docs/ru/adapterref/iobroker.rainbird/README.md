---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rainbird/README.md
title: ioBroker.rainbird
hash: /YJXlyBSaILis+KUmtEyaDLpid6UsaLyP988L8RtQrQ=
---
![Логотип](../../../en/adapterref/iobroker.rainbird/admin/rainbird.png)

![Количество установок](http://iobroker.live/badges/rainbird-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rainbird.svg)
![НПМ](https://nodei.co/npm/iobroker.rainbird.png?downloads=true)
![Стабильный](http://iobroker.live/badges/rainbird-stable.svg)
![НПМ-версия](https://img.shields.io/npm/v/iobroker.rainbird.svg)
![Статус сборки](https://travis-ci.org/StrathCole/ioBroker.rainbird.svg?branch=master)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.rainbird
Адаптер ioBroker для Rain Bird с адаптером LNK WiFi. Этот проект не имеет никакого отношения к Rain Bird.

Основан на библиотеке Python «pyrainbird» с https://github.com/jbarrancos/pyrainbird и полностью портирован на NodeJS. Адаптер подключается к устройству напрямую через соединение Wi-Fi и не использует облачный сервис Rain Bird.

## Состояния
`rainbird.X.device.commands.advanceZone` - Когда текущая программа запущена, перейдите к следующей зоне полива и остановите текущую.
`rainbird.X.device.commands.runProgram` — Запустите указанную программу вручную (от 1 до X), как ранее было настроено в устройстве.
`rainbird.X.device.commands.stopIrrigation` — Немедленно остановить полив во всех зонах.

`rainbird.X.device.irrigation.active` - В данный момент орошение активно. Если значение false, это может означать, что вы установили переключатель на устройстве в положение «Стоп».
`rainbird.X.device.irrigation.station` — Номер зоны, которая в данный момент орошается.

`rainbird.X.device.sensors.rain` — истинно, если подключен датчик дождя и обнаружен дождь.

`rainbird.X.device.settings.rainDelay` — Текущая задержка полива (в днях), установленная для устройства.
`rainbird.X.device.settings.seasonalAdjust` — текущая сезонная корректировка водного бюджета.

`rainbird.X.device.stations.Y.available` — True, если в устройстве доступна зона Y.
`rainbird.X.device.stations.Y.irrigation` — true, если зона Y в настоящее время орошается.
`rainbird.X.device.stations.Y.remaining` — Оставшееся время полива в секундах `rainbird.X.device.stations.Y.runZone` — Вручную запустить полив в зоне Y на указанное количество минут.
`rainbird.X.device.stations.Y.testZone` — Тестовая зона Y.

## Кредиты
Этот адаптер был бы невозможен без великой работы Мариуса Буркарда <m.burkard@pixcept.de>, который выпускал предыдущие выпуски этого адаптера.

## Пожертвовать
[![PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.1 (2024-06-06)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Adapter has been move to iobroker-community-adapters organization
* (mcm1957) Adapter-core has been adapter, adapter supports js-controller 6 now.
* (mcm1957) Dependencies have been updated

### 0.2.3
-   Fixed problem with sensor data
-   Added seasonal water budget adjust information

### 0.2.2

-   Added fixes for adapter crashes on failed connection to controller

### 0.2.1

-   Added support for run times on different controller model
-   Less polling for some states to reduce requests to controller

### 0.2.0

-   Added remaining irrigation time of zone
-   Fixed bug in decoding responses

## License

The MIT License (MIT)

Copyright (c) 2024, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2022 Marius Burkard m.burkard@pixcept.de

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