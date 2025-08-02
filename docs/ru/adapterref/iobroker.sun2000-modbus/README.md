---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sun2000-modbus/README.md
title: ioBroker.sun2000-modbus
hash: 8yrcQc6l+uzMG8hBbB4bzkrUpIaEMC7/qfr8AAnOkHg=
---
![Логотип](../../../en/adapterref/iobroker.sun2000-modbus/admin/sun2000-modbus.png)

![Количество установок](https://iobroker.live/badges/sun2000-modbus-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/sun2000-modbus-stable.svg)
![НПМ-версия](https://img.shields.io/npm/v/iobroker.sun2000-modbus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sun2000-modbus.svg)
![НПМ](https://nodei.co/npm/iobroker.sun2000-modbus.png?downloads=true)

# IoBroker.sun2000-modbus
![Тестирование и выпуск](https://github.com/daolis/ioBroker.sun2000-modbus/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/sun2000-modbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.**\ Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!\ Отчеты Sentry используются, начиная с js-контроллера. 3.0.

##Инверторный адаптер Huawei SUN2000 для ioBroker
Считайте данные с инвертора Huawei SUN2000 и хранилища LUNA2000 с помощью Modbus TCP.

Страница продуктов Huawei: [Solar.huawei.com](https://solar.huawei.com/at/professionals/all-products)

## Документация
см. [страница документации](./docs/README.md)

## Changelog

### **WORK IN PROGRESS**

* ...

### 0.1.2 (2024-03-11)

* Add update interval to state description
* Update of  fixed 
* Fixed battery temperature gain (Reg: 37022, 'storage.batteryTemperature')

### 0.1.1 (2024-03-11)

* Fixed setting connected flag

### 0.1.0 (2024-03-10)

* [#34](https://github.com/daolis/ioBroker.sun2000-modbus/issues/34) Added Battery registers: totalCharge, totalDischarge, batteryTemperature
* [#32](https://github.com/daolis/ioBroker.sun2000-modbus/issues/32) Fixed: No data for ChargePower and CurrentDayChargeCapacity
* [#20](https://github.com/daolis/ioBroker.sun2000-modbus/issues/20) Read alarm registers from inverter (alarms = bits, alarmsJSON = json array with alarms (name, id, level))
* [#29](https://github.com/daolis/ioBroker.sun2000-modbus/issues/29) Added PVn Voltage and Current for available PV Strings 
* Added initial documentation - WIP
* [#26](https://github.com/daolis/ioBroker.sun2000-modbus/issues/26) Renamed stateOfCapacity to stateOfCharge\
  Migration of historical data: see [Migration of historical data (on state name change)](docs/migration.md)
* Blocked reading of registers - faster when fetching data from inverter

### 0.0.2 (2024-01-08)

* Added storage CurrentDayChargeCapacity and CurrentDayDischargeCapacity
* Changes from [Add sun2000-modbus to latest](https://github.com/ioBroker/ioBroker.repositories/pull/3038)

### 0.0.1 (2023-11-26)

* (daolis) initial release

## License
MIT License

Copyright (c) 2024 daolis <stephan.bechter@gmail.com>
