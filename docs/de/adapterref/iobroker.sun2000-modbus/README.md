---
chapters: {"pages":{"en/adapterref/iobroker.sun2000-modbus/README.md":{"title":{"en":"ioBroker.sun2000-modbus"},"content":"en/adapterref/iobroker.sun2000-modbus/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/README.md":{"title":{"en":"ioBroker SUN2000 Documentation"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/migration.md":{"title":{"en":"Migration of historical data (on state name change)"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/migration.md"},"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md":{"title":{"en":"Configuration"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sun2000-modbus/README.md
title: ioBroker.sun2000-modbus
hash: 9X87zOkNPMIKe6X8INPWqJXtPq63gidvNOfVVV9FZ2I=
---
![Logo](../../../en/adapterref/iobroker.sun2000-modbus/admin/sun2000-modbus.png)

![Anzahl der Installationen](https://iobroker.live/badges/sun2000-modbus-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/sun2000-modbus-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.sun2000-modbus.svg)
![Test und Freigabe](https://github.com/daolis/ioBroker.sun2000-modbus/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sun2000-modbus/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sun2000-modbus.svg)
![NPM](https://nodei.co/npm/iobroker.sun2000-modbus.png?downloads=true)

# ioBroker.sun2000-modbus

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.**\
&#x20;Weitere Details und Informationen zur Deaktivierung der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) !\
&#x20;Sentry Reporting wird ab js-controller 3.0 verwendet.

## Huawei SUN2000 Wechselrichteradapter für ioBroker

Daten vom Huawei SUN2000 Wechselrichter und dem LUNA2000 Speicher mittels Modbus TCP auslesen.

Huawei-Produktseite: [solar.huawei.com](https://solar.huawei.com/at/professionals/all-products)

## Dokumentation

Siehe die [Dokumentationsseite](/#/docs/adapterref/iobroker.sun2000-modbus/docs/README.md)

## Changelog
### 0.1.3 (2024-03-21)

* Small bug fix...
* Changed log message level (too verbose when inverter is in standby mode)

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
  Migration of historical data: see [Migration of historical data (on state name change)](/#/docs/adapterref/iobroker.sun2000-modbus/docs/migration.md)
* Blocked reading of registers - faster when fetching data from inverter

### 0.0.2 (2024-01-08)

* Added storage CurrentDayChargeCapacity and CurrentDayDischargeCapacity
* Changes from [Add sun2000-modbus to latest](https://github.com/ioBroker/ioBroker.repositories/pull/3038)

### 0.0.1 (2023-11-26)

* (daolis) initial release

## License
MIT License

Copyright (c) 2024 daolis <stephan.bechter@gmail.com>