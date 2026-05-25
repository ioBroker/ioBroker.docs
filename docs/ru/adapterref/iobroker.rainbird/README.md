---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rainbird/README.md
title: ioBroker.rainbird
hash: 7AXCQlCf4CrfwWtJqg/Wx7fNVwGuYvBwdeVZa2VjcgQ=
---
![Логотип](../../../en/adapterref/iobroker.rainbird/admin/rainbird.png)

![Количество установок](http://iobroker.live/badges/rainbird-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rainbird.svg)
![НПМ](https://nodei.co/npm/iobroker.rainbird.png?downloads=true)
![Стабильный](http://iobroker.live/badges/rainbird-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.rainbird.svg)
![Статус сборки](https://travis-ci.org/StrathCole/ioBroker.rainbird.svg?branch=master)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.rainbird
Адаптер ioBroker для Rain Bird с адаптером Wi-Fi LNK. Данный проект не имеет отношения к Rain Bird.

Основан на библиотеке Python "pyrainbird" с https://github.com/jbarrancos/pyrainbird и полностью портирован на NodeJS. Адаптер устанавливает прямое соединение с устройством через Wi-Fi и не использует облачный сервис Rain Bird.

## Штаты
`rainbird.X.device.commands.advanceZone` - Во время выполнения текущей программы перейти к следующей зоне орошения и остановить текущую.

`rainbird.X.device.commands.runProgram` - Запустить указанную программу вручную (от 1 до X), как было предварительно настроено в устройстве.

`rainbird.X.device.commands.stopIrrigation` - Немедленно остановить орошение во всех зонах.

`rainbird.X.device.irrigation.active` - В данный момент орошение активно. Если значение равно false, это может означать, что вы установили переключатель на устройстве в положение «Стоп».

`rainbird.X.device.irrigation.station` - Номер зоны, которая в данный момент орошается.

`rainbird.X.device.sensors.rain` - True, если подключен датчик дождя и обнаружен дождь.

`rainbird.X.device.settings.rainDelay` - Текущая задержка полива (в днях), установленная для устройства.

`rainbird.X.device.settings.seasonalAdjust` - Текущая сезонная корректировка водного баланса.

`rainbird.X.device.stations.Y.available` - True, если зона Y доступна в устройстве.

`rainbird.X.device.stations.Y.irrigation` - True, если зона Y в данный момент орошается.

`rainbird.X.device.stations.Y.remaining` - Оставшееся время орошения в секундах. `rainbird.X.device.stations.Y.runZone` - Вручную запустить орошение зоны Y на указанное количество минут.

`rainbird.X.device.stations.Y.testZone` - Проверить зону Y.

## Благодарности
Создание этого адаптера было бы невозможно без огромной работы Мариуса Буркарда <m.burkard@pixcept.de>, который ранее выпустил эту версию адаптера.

## Облачные устройства IQ4
Поскольку устройство LNK имеет ограничение на одно одновременное подключение, для корректной работы необходимо отключить его от облака IQ4. Для этого потребуется брандмауэр, который будет блокировать, например, весь трафик в Интернет только для вашего IP-адреса LNK. После этого вы сможете подключаться к этому адаптеру как положено.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.1 (2026-05-10)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mobster80) Https support for Rainbird LNK added. Migrated LNK devices to IQ4 cloud, please see additional information in section "IQ4 Cloud devices".

### 2.0.2 (2024-12-27)
* (Feuersturm) @strathcole/iob-lib has been migrated to local repository (#27)
* (mcm1957) Dependencies have been updated

### 2.0.1 (2024-12-15)
* (Feuersturm) Some minor corrections to installations news and some internal changes at pacakging have been applied.

### 2.0.0 (2024-12-13)
* (Feuersturm) BREAKING: The password is stored encrypted now. Please reenter you password at configuration page. This is required only once after migration from release < 2.0.0 to release 2.0.0 or newer.
* (mcm1957) Adapter requires node.js 20 now
* (mcm1957) Adapter requires js-controller 5 and admin 6  now
* (Feuersturm) switch adapter config to jsonconfig
* (mcm1957) Dependencies have been updated

### 1.0.1 (2024-06-06)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Adapter has been move to iobroker-community-adapters organization
* (mcm1957) Adapter-core has been adapter, adapter supports js-controller 6 now.
* (mcm1957) Dependencies have been updated

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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