---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vaillant/README.md
title: ioBroker.vaillant
hash: 9aO1Zs6Gb5A6XPN1mvnCrHMTXChgIJKAn8BmtSnKhmw=
---
![Логотип](../../../en/adapterref/iobroker.vaillant/admin/vaillant.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.vaillant.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vaillant.svg)
![Количество установок (последние)](http://iobroker.live/badges/vaillant-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vaillant-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.vaillant.svg)
![Известные уязвимости](https://snyk.io/test/github/TA2k/ioBroker.vaillant/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vaillant.png?downloads=true)

# IoBroker.vaillant
## Адаптер vaillant для ioBroker
Vaillant multiMatic и адаптер myVaillant

### Начиная
В Instanzoptionen почта и пароль der multimatic /senso oder myVaillant app eingeben.

Конфигурация können geändert werde in dem sie unter dem Unterpunkt конфигурация angepasst werden. Настройка Manche werden erst angewendet wenn der Modus auf ON или MANUAL ist und nicht AUTO oder TIME_CONTROLLED

## **Мультиматический лейбл Beispiel:**
**Warmwasser**: vaillant.0.serialnummer.systemcontrol/tli.dhw.hotwater.configuration.hotwater_temperature_setpoint **Heizung**: Erst auf MANUAL vaillant.0.serialnumber.systemcontrol/tli.zones03.heating.configuration.operation_mode MANUAL Dann die Temperatur vaillant.0.serial.systemcontrol/tli.zones03.heating.configuration.manual_mode_temperature_setpoint Und am Ende operation_mode auf TIME_CONTROLLED

Параметр können über den Punkt parameterValue angepasst werden dabei beachten welche Werte im Objekt определение erlaubt sind.

## **Показать мой Vaillant:**
vaillant.0.id.systemControlState.controlState.domesticHotWater01.boost auf true/false setzen um den Boost для активации или деактивации vaillant.0.id.systemControlState.controlState.zones01.desiredRoomTemperatureSetpoint для RaumTemperatur для настройки vaillant.0.id.systemControlState .controlState.zones01.setBackTemperature vaillant.0.id.systemControlState.controlState.zones01.heatingOperationMode OFF РУЧНОЙ TIME_CONTROLLED vaillant.0.id.systemControlState.controlState.domesticHotWater01.operationMode OFF MANUAL TIME_CONTROLLED

## Changelog
### 0.0.15

-   bugfixes
### 0.0.14

-   add rooms support
### 0.0.13

-   fix livereport order
### 0.0.11

-   fix issue with js-controller 3.2
### 0.0.10

-   fix issue with js-controller 3

### 0.0.8

-   (TA2k) Fix Authorization problem and missing configuration states

### 0.0.6

-   (TA2k) initial release

## License

MIT License

Copyright (c) 2020 TA2k <tombox2020@gmail.com>

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