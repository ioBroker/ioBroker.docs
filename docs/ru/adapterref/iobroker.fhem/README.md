---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fhem/README.md
title: ioBroker.fhem
hash: igYtZ/NfgmW0L1x8SIbwzI2ozrPkyAjQXaQBcR7yeN0=
---
![Логотип](../../../en/adapterref/iobroker.fhem/admin/fhem.png)

![Количество установок](http://iobroker.live/badges/fhem-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.fhem.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.fhem/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/fhem/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fhem.svg)

# ioBroker.fhem

Этот адаптер позволяет подключить FHEM к ioBroker.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Для установления соединения необходимо включить Telnet в FHEM. Чтобы включить его (по умолчанию включен), проверьте следующие настройки в`fhem.cfg` :

`define telnetPort telnet 7072 global`

Для настроек адаптера следует использовать тот же самый порт и IP-адрес хоста FHEM (или localhost, если FHEM и ioBroker работают на одном ПК).

ioBroker отправляет данные в начале процесса.`jsonlist2` команда для получения всех`Readings` из списка.

## Поддерживаемые устройства

Обычно поддерживаются все устройства. Но некоторые из них интегрированы лучше.

Проблемы возникают, в частности, при управлении состояниями. Поскольку отсутствует четкая структура атрибутов, ioBroker пытается угадать, какие именно состояния используются.`PossibleSets` Можно использовать поля. Фактически поддерживаются только следующие атрибуты:

- RGB: Если RGB существует в`PossibleSets` и в`Readings` Оно будет объединено в одно состояние, которое можно читать и записывать. Значения, такие как`#234567` будет автоматически преобразовано в`234567` .
- Состояние «вкл/выкл»: Если`on` и`off` существуют в`PossibleSets` и`state` в`Readings` оно будет объединено в один штат под названием`state` . Управление осуществляется с помощью значений true и false, и команды будут изменены.`set DEVICE on` и`set DEVICE off` .

## Функции и использование

- Если в FHEM существует комната "ioBroker", синхронизироваться будут только эти объекты.
- После синхронизации неиспользуемые объекты FHEM будут автоматически удалены.
- Внутренние компоненты, такие как`TYPE` ,`NAME` ,`PORT` ,`manufacturername` ,`modelid` ,`swversion` будет синхронизировано (`role=value.xxx` )
- Такие атрибуты, как`room` ,`alias` ,`disable` ,`comment` Будет выполнена синхронизация, и появится возможность редактировать атрибуты в ioBroker.`role=state.xxx` )
- Настройка роли и других параметров во время синхронизации.
  - `Readings xxx` с любым`PossibleSets` будет установлен`role=state.xxx`
  - `Readings xxx` Без PossibleSets будут установлены`role=value.xxx`
  - `Readings xxx` При использовании PossibleSets будет установлен параметр "noArg".`role=button.xxx`
  - `Readings xxx` При использовании PossibleSets будет установлен ползунок.`role=level.xxx, min=slider(min), max=slider(max)`
  - `Readings "desired-temp"` будет установлен`role=level.temperature, min=5, max=35, unit=°C` .
  - `Readings "pct, brightness,dim"` будет установлен`role=level.dimmer, min=0, max=100, unit=%`
  - `Readings "Volume, volume, GroupVolume"` будет установлен`role=level.volume, min=0, max=100, unit=%`
  - `Readings "GroupVolume"` будет установлен`role=level.volume.group` ,`min=0` ,`max=100` ,`unit=%`
- `SmartName` Для облачного адаптера он будет автоматически настроен с псевдонимом или именем (только).`fhem.0` и объекты с`role = level.temperature, level.dim, level.volume` )

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (@copilot) Adapter requires js-controller 6.0.11 now
- (mcm1957) Dependencies have been updated

### 3.0.0 (2024-07-22)
NodeJS >= 18.x and js-controller >= 5 is required

* (@LausiD) Removed warning from log
* (@klein0r) Updated tests and dependencies

### 2.0.5 (2023-08-13)
* (mcm1957) Dependencies have been updated
* (mcm1957) Adapter now requires node 16

### 2.0.4 (2023-08-13)
* (LausiD) Several problems have been fixed (#213, #214)

### 2.0.3 (2023-01-03)
* (Apollon77/LausiD) Made sure that all objects are initialized correctly

### 2.0.2 (2022-12-23)
* (bluefox) Corrected error with `members`

### 2.0.0 (2022-12-22)
* (bluefox) Refactoring
* (bluefox) Corrected some GitHub issues
* (bluefox) Added JSON config

### 1.6.3 (2021-07-26)
* (Apollon77) fix crash case

### 1.6.2 (2021-07-16)
* (LausiD) fix crash case

### 1.6.1 (2021-06-30)
* (LausiD) fix use Controller 3.3.x
* (Apollon77) js-controller 3.3 optimizations
* (Apollon77) Add Sentry crash reporting

### 1.6.0 (2021-04-09)
* (LausiD) Several fixes and changes

### 1.5.3 (2020-06-30)
* (LausiD) Several fixes

### 1.5.2 (2020-05-15)
* (Apollon77) Fix wrong method calls

### 1.5.0 (2020-05-08)
* (LausiD) Several fixes and changes

### 1.4.3 (2020-03-21)
* (LausiD) fix compact mode

### 1.4.2 (2020-01-10)
* (bluefox) Running timers will be stopped by unload

### 1.4.1 (2019-12-12)
* (LausiD) Several fixes and changes

### 1.4.0 (2019-10-22)
* (LausiD) Optimized adapter

### 1.3.0 (2019-07-14)
* (bluefox) Compact mode was added

### 1.2.2 (2019-06-12)
* (LausiD) Several fixes and changes

### 1.2.1 (2019-03-28)
* (LausiD) Several fixes and changes

### 1.2.0 (2019-02-16)
* (LausiD) Sync readingsGroup, set states ioBroker from FHEM, add different sensors

### 1.1.1 (2018-11-08)
* (LausiD) add debug mode

### 1.1.0 (2018-10-22)
* (LausiD) Sync objects from ioBroker to FHEM is possible

### 1.0.0 (2018-10-15)
* (LausiD) Min/max were defined as number

### 0.5.6 (2018-09-09)
* (LausiD) Some roles were updated

### 0.5.5 (2018-08-22)
* (LausiD) Several fixes and changes
* (bluefox) Admin3

### 0.5.0 (2018-04-29)
* (LausiD) Several fixes and changes

### 0.4.2 (2018-04-15)
* (TonyBostonTB) Fix wordings

### 0.4.1 (2017-04-14)
* (bluefox) add link to FHEM im admin

### 0.4.0 (2017-03-12)
* (LausiD) fix some types
* (bluefox) define custom prompt

### 0.3.0 (2017-02-25)
 * (LausiD) fix some types
 * (bluefox) add password for telnet

### 0.2.2 (2016-06-17)
* (bluefox) implement On/Off state and fix RGB
* (bluefox) add debug output by control

### 0.2.1 (2016-06-12)
* (bluefox) support of RGB values for control

### 0.2.0
* (bluefox) implemented write
* (bluefox) try to read meta information if unknown event received

### 0.1.0
* (bluefox) initial release

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.fhem/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2016-2025 bluefox <dogafox@gmail.com>

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