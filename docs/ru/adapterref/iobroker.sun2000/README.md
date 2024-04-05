---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.sun2000.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sun2000.svg
BADGE-Number of Installations: https://iobroker.live/badges/sun2000-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/sun2000-stable.svg
BADGE-Documentation: https://img.shields.io/badge/Documentation-2D963D?logo=read-the-docs&logoColor=white
BADGE-Donate: https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg
BADGE-: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86
BADGE-NPM: https://nodei.co/npm/iobroker.sun2000.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sun2000/README.md
title: Адаптер ioBroker SUN2000 Документация
hash: Dz2NL0KVKXgnqXxR2r7idyDM8Pqi/YfDGUml99Kod7c=
---
# Адаптер ioBroker SUN2000 Документация
* [Настройка инверторов](./inverter.md)
* [Конфигурация адаптера](./configuration.md)
* [Расчет](./calculation.md)
* [Пример VIS](./vis.md)
* [Определения интерфейса](./definitions.md)

## Вики
Некоторые интересные вещи объяснены в [вики](https://github.com/bolliy/ioBroker.sun2000/wiki).

## Форум
Не стесняйтесь следить за обсуждениями в разделе [немецкий форум iobroker](https://forum.iobroker.net/topic/71768/test-adapter-sun2000-v0-1-x-huawei-wechselrichter).

## Вдохновение
Разработка этого адаптера была вдохновлена обсуждениями в ветке форума https://forum.iobroker.net/topic/53005/huawei-sun2000-iobroker-via-js-script-funktioniert и javascript iobroker https://github. com/ChrisBCH/SunLuna2000_iobroker.

Работа в процессе

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.7.0 (2024-04-03)
* breaking changes
	- Node.js 18.x or higher required
	- ioBroker host (js-controller) 5.x or higher

### 0.6.2 (2024-03-31)
* standby detection adjusted
* improvement of logs

### 0.6.1 (2024-03-23)
* Battery control: After the second failed attempt, the control event is discarded
* Battery control: Adjust the battery maxCharge and Discharge to the actual values

### 0.6.0 (2024-03-21)
* realization the "battery charge control" #61
* fix the standby detection #60

### 0.5.1 (2024-03-11)
* config page restructured
* read only the required string data
* fix interval medium

### 0.5.0 (2024-03-07)
* Integration of [Huawei SmartLogger](https://support.huawei.com/enterprise/de/doc/EDOC1100130069/d8a00460)
* some meter states the unit was changed (for example sun2000.0.meter.activePowerL1) (#56)
* sun2000 serie M2 or higher can also be processed

### 0.4.1 (2024-03-03)
* read PV string data slower (medium interval)

### 0.4.0 (2024-03-01)
* detect standby mode of inverters (#34)
* devices in standby often give incorrect values. These are assigned "0" (#40)
* the modbus register and the length are stored in the description of the states
* implemented modbus-proxy (read-only cache)
* read register data from SDongleA 
* additional loop interval medium (SDongle data)
* Integration of [NRGkick Wallbox](https://www.nrgkick.com)
* read string data faster (high interval)

### 0.3.1 (2024-02-12)
* state `sun2000.0.collected.chargeDischargePowercharge` is not always refreshed #47

### 0.3.0 (2024-02-10)
* add battery unit information for example temperature #40
* modbus timeout, connect delay and delay can be configured #34
* device status as plain text `sun2000.0.inverter.x.derived.deviceStatus`
* Introduction of a driver model. A separate driver can be created for each device #41

### 0.2.1 (2024-02-02)
* Requirements from [Add sun2000 to latest](https://github.com/ioBroker/ioBroker.repositories/pull/3219)

### 0.2.0 (2024-01-24)
* [Add sun2000 to latest](https://github.com/ioBroker/ioBroker.repositories/pull/3219)
* improve error handling (#34)
* add simple optimizer info 
* Riemann sum of input power with energy loss for new state `dailySolarYield`
* try to recreate the `yield today` from the fusion portal

### 0.1.3 (2024-01-17)
* display the data from PV strings (#27)
* optimize the timing of interval loop
* improved handling of read timeouts from more then 2 inverters

### 0.1.2 (2024-01-12)
* fix: no Data if interval less 20 sec (#24)
* prepare collected values more precisely
* expand up to 5 inverters #18
* fix: problems with multiple inverters

### 0.1.1 (2024-01-07)
* fix some collected values

### 0.1.0 (2024-01-06)
* watchdog implemented #11
* state values are cached - only changed data should be stored 
* derived and collected values for example `inputPowerEffective` or `inputYield`
* deploy more register

### 0.0.2 (2023-12-19)
Dependency and configuration updates

### 0.0.1 
initial release

## License
MIT License

Copyright (c) 2024 bolliy <stephan@mante.info>

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