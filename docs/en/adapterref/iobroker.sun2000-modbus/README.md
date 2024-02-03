![Logo](admin/sun2000-modbus.png)
# ioBroker.sun2000-modbus

![Number of Installations](https://iobroker.live/badges/sun2000-modbus-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/sun2000-modbus-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.sun2000-modbus.svg)](https://www.npmjs.com/package/iobroker.sun2000-modbus)

![Test and Release](https://github.com/daolis/ioBroker.sun2000-modbus/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/sun2000-modbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sun2000-modbus.svg)](https://www.npmjs.com/package/iobroker.sun2000-modbus)

[![NPM](https://nodei.co/npm/iobroker.sun2000-modbus.png?downloads=true)](https://nodei.co/npm/iobroker.sun2000-modbus/)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**\
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!\
Sentry reporting is used starting with js-controller 3.0.

## Huawei SUN2000 inverter adapter for ioBroker

Read data from Huawei SUN2000 inverter and LUNA2000 Storage using Modbus TCP.

Huawei products page: [solar.huawei.com](https://solar.huawei.com/at/professionals/all-products)

## Settings

* `address`: Inverters IP address
* `port`: Inverter modbus port (default: 502)
* `modbusUnitId`: Modbus unit id (default: 1)
* `updateIntervalHigh`: Fast update interval (default: 5 sec)
* `updateIntervalLow`: Slower update interval (default: 20 sec)


## Changelog
### **WORK IN PROGRESS**

### 0.0.2 (2024-01-08)

* Added storage CurrentDayChargeCapacity and CurrentDayDischargeCapacity
* Changes from [Add sun2000-modbus to latest](https://github.com/ioBroker/ioBroker.repositories/pull/3038)

### 0.0.1 (2023-11-26)

* (daolis) initial release

## License
MIT License

Copyright (c) 2024 daolis <stephan.bechter@gmail.com>
