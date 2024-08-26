---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.virtualpowermeter/README.md
title: без заголовка
hash: 4ktAMNVHWM/2JTIgq9IjSPEo+diFnUkzy1Po+M2YftA=
---
![узел](https://img.shields.io/node/v/iobroker.virtualpowermeter.svg)
![Количество установок](http://iobroker.live/badges/virtualpowermeter-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.virtualpowermeter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.virtualpowermeter.svg)
![Статус зависимости](https://img.shields.io/david/Omega236/iobroker.virtualpowermeter.svg)
![Известные уязвимости](https://snyk.io/test/github/Omega236/ioBroker.virtualpowermeter/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.virtualpowermeter.png?downloads=true)
![Лицензия](https://img.shields.io/npm/l/iobroker.virtualpowermeter.svg)

<h1><img src="admin/virtualpowermeter.png" width="64"/>ioBroker.virtualpowermeter</h1>

**Тесты:** ![Тестируйте и выпускайте](https://github.com/Omega236/ioBroker.testtheportal/workflows/Test%20and%20Release/badge.svg)

## Адаптер virtualpowermeter для ioBroker
Эрцегт Виртуэль Строммессер

Im Smarthome шапка человек прожил Geräte умереть человек zwar schalten kann, Diese aber keinen integrierten Powermeter haben (meist Lichter).

Mit diesem Adapter ist das Ziel zu jedem eingestelltem Datenpunkt (über Custom -> MaxWatt (z.B. 60W)) zwei zusätzliche Datenpunkte zu befüllen -> Energy_Power (z.B. 60 W) и Energy_Total (z.B. 2501,23 Wh).
Zusätzlich werden Gruppen gebildet (день, когда виртуальный powermeter.0.xxx abgelegt) die die die summe der einzelnen Datenpunkte darstellt

Mit diesen neuen Datenpunkten kann dann eine Einfache Visualiserung durchgeführt werden.

Die neuen Datenpunkte (besonders die Gruppen) könnten super mit valuetrackerovertime weiterverarbeitet werden

## Настройки экземпляра
![Настройки экземпляра](../../../en/adapterref/iobroker.virtualpowermeter/admin/InstanceSettings.PNG)

hier kan der Default-Name für das Power und Energy_Total Definiert werden.

Настройка по умолчанию для настройки: Datapoint Destination bestimmt die default Einstellung beim erstellen eines neuen Custom-Settings. В «папке состояния» появляются новые пользовательские настройки. Bei "in group" wird als Standardname die ObjectID Custom-DP (. durch _ ersetzt) als Unterverzeichnis + der Standardname für Power und Energie genutz. "в любом другом месте" nutzt ebenfalls den Standardname für Power und Engery muss aber für jeden Custom-DP manuell angepasst werden.

## Пользовательские настройки
![Пример](../../../en/adapterref/iobroker.virtualpowermeter/admin/DatapointSample.PNG) Активация пользовательских настроек 2 Datenpunkte. Power -> Watt, Energy(_Total) -> Wh Der Speicherort setzt sich aus dem Datapoint Destination + Datapointname zusammen.

Wichtig: Wenn Destination "in Group" bzw wenn mehere DP im gleichen Verzeichnis "in current state tree" braucht jeder Datenpunkt seinen eindeutigen Namen. wenn default-Destination "in Group" wird der Datenpunktname Automaticisch mit der ID des States ergänzt (. durch _ ersetzt). Hier kann aber Auch z.B. Wohnzimmer_Licht.Power и Wohnzimmer_Licht.Energy angegeben werden.

## Пользовательские настройки для определения мощности Angabe (Ватт) и количества ватт-часов.
Es gibt Geräte die nur eine Watt ausgabe haben und man aber wissen will wieiel Strom verbraucht wurde. Hierfür kann auch der VirtualPowermeter verwendet werden. Dafür muss nur der Max-Wert vom Datenpunkt und der Max-Power vom VirtualPowermeter gleich sein. Бейшпиль:<img src="BeispielPowerToEnergy.png">

Отслеживание стоимости с течением времени: ![Пример](../../../en/adapterref/iobroker.virtualpowermeter/MeinBeispiel2.jpg)

<!-- Заполнитель для следующей версии (в начале строки):

### __РАБОТА ВЫПОЛНЯЕТСЯ__ -->

## Changelog

### 1.4.6 (2022-02-14)
* (Omega236) Update Dependencies

### 1.4.5 (2022-01-30)
* (Omega236) add minimum/standby power usage

### 1.4.4 (2022-01-30)
* (Omega236) bugfix wrong datapoint name

### 1.4.3 (2022-01-16)
* (bluefox) added support for admin5

### 1.4.1 (2021-02-13)
* (Omega236) on unit '%' interpret common.max as 100 if common.max not set

### 1.4.0 (2021-02-12)
* (Omega236) adding OptionalSwitch for Dimmer with On/Off State

### 1.3.2 (2021-01-27)
* (Omega236) group total is now its own counter
* (Omega236) improved precision

### 1.3.1 (2021-01-25)
* (Omega236) reduce initializations and optimize group handling

### 1.3.0 (2021-01-15)
* (scrounger) default ids for power and energie configurable through adapter settings
* (scrounger) custom: autocomplete for group input added
* (scrounger) option added -> group energy values can only increase 
* (Omega236) Check duplicate Destination DP
* (Omega236) allows to Set Destination of DP

### 1.2.2 (2020-12-26
* (Omega236) Group Calculations only after InitialFinished

### 1.2.1 (2020-04-15)
* (Omega236) translation

### 1.2.0 (2020-04-15)
* (Omega236) js-controller 3.x support

### 1.1.1 (2020-04-07)
* (Omega236) bugfix translation

### 1.1.0 (2020-04-05)
* (Omega236) inverted added

### 1.0.1
* (Omega236) SecurityUpdates

### 1.0.0
* (Omega236) Final Release

### 0.2.8
* (Omega236) Bug found on travis unsubscribeStatesAsync

### 0.2.6
* (Omega236) texts adapted

### 0.2.5
* (Omega236) awaits missing

### 0.2.4
* (Omega236) var remove and SettingPage Info and dic in class and .bind(this) (Template 1.10)

### 0.2.3
* (Omega236) CodeOptimierung nach eslint

### 0.2.1
* (Omega236) CodeOptimierung und bild

### 0.2.0
* (Omega236) Alle Funktionen implementiert, code noch nicht überprüft/optimiert/getestet

### 0.1.0
* (Omega236) Erste Version mit Grundfunktionalität

### 0.0.1
* (Omega236) initial release

## License
MIT License

Copyright (c) 2022 Omega236 general.of.omega@googlemail.com

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
