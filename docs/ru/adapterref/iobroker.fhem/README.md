---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fhem/README.md
title: ioBroker.fhem
hash: bffB6fPUVd7gXMnqL4+H/0xbklbZRyDpdCutMtV09j0=
---
![Логотип](../../../en/adapterref/iobroker.fhem/admin/fhem.png)

![Количество установок](http://iobroker.live/badges/fhem-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.fhem.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fhem.svg)

# IoBroker.fhem
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.fhem/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/fhem/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Этот адаптер позволяет подключить FHEM к ioBroker.

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

Для включения соединения в FHEM должен быть включен telnet. Чтобы включить его (включено по умолчанию), проверьте следующие настройки в fhen.cfg:

```define telnetPort telnet 7072 global```

Точно такой же порт и IP-адрес хоста FHEM (или localhost, если FHEM и ioBroker работают на одном ПК) должны использоваться для настроек адаптера.

ioBroker отправляет в начале команду «jsonlist2», чтобы получить все «чтения» из списка.

## Поддерживаемые устройства
Обычно поддерживаются все устройства. Но некоторые из них лучше интегрированы.

Проблемы возникают особенно при управлении состояниями.
Поскольку нет четкой структуры атрибутов, ioBroker пытается угадать, какие поля «PossibleSets» можно использовать.
Фактически поддерживаются только следующие атрибуты:

- RGB: если RGB существует в *PossibleSets* и в *Readings* он будет объединен в одно состояние, которое можно читать и записывать. Такие значения, как `` # 234567`` будут автоматически преобразованы в `` 234567``.
- on off state: если **on** и **off** существуют в *PossibleSets* и **state** в *Readings* они будут объединены в состояние on под именем **state** Его можно контролировать с помощью true и false, а команды будут изменены на `` включить УСТРОЙСТВО '' и `` установить УСТРОЙСТВО выключено ''.

## Возможности и использование
* Если в FHEM существует комната «ioBroker», синхронизируются только эти объекты
* После синхронизации неиспользуемые объекты FHEM будут автоматически удалены.
* Внутренние параметры, такие как TYPE, NAME, PORT, Manufacturername, modelid, swversion, будут синхронизированы (role = value.xxx)
* Атрибуты, такие как комната, псевдоним, отключение, комментарий, будут синхронизированы, и в ioBroker можно будет редактировать атрибуты. (роль = состояние.xxx)
* Установить роль и прочее во время синхронизации
  * Показания xxx с любыми возможными наборами будут установлены role = state.xxx
  * Показания xxx без PossibleSets будут установлены role = value.xxx
  * Показания xxx с PossibleSets "noArg" будут установлены role = button.xxx
  * Показания xxx с «ползунком» PossibleSets будут установлены role = level.xxx, min = slider (min), max = slider (max)
  * Показания «желаемая температура» будут установлены роль = уровень.температура, мин. = 5, макс = 35, единица измерения = °C.
  * Показания "процент, яркость, тусклость" будут установлены роль = уровень. Диммер, мин = 0, макс = 100, единица =%
  * Показания «Volume, volume, GroupVolume» будут установлены role = level.volume, min = 0, max = 100, unit =%
  * Показания "GroupVolume" будут установлены role = level.volume.group, min = 0, max = 100, unit =%
* SmartName для облачного адаптера будет автоматически установлен с псевдонимом или именем (только fhem.0 и объекты с ролью = level.temperature, level.dim, level.volume)

## Changelog

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

## License
The MIT License (MIT)

Copyright (c) 2016-2021 bluefox <dogafox@gmail.com>

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