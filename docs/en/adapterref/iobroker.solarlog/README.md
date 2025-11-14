![Logo](admin/solarlog.png)

# ioBroker.solarlog

![Number of Installations](http://iobroker.live/badges/solarlog-installed.svg) ![Number of Installations](http://iobroker.live/badges/solarlog-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.solarlog.svg)](https://www.npmjs.com/package/iobroker.solarlog)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solarlog.svg)](https://www.npmjs.com/package/iobroker.solarlog)

[![NPM](https://nodei.co/npm/iobroker.solarlog.png?downloads=true)](https://nodei.co/npm/iobroker.solarlog/)

An ioBroker adapter for Solarlog - devices

## Solarlog - Settings

The open JSON-interface (offene Json-Schnittstelle) has to be activated in the Solarlog's configuration menu (Konfiguration - System - Zugangskontrolle - Offene Json-Schnittstelle: aktivieren.)

## Adapter - Settings

### Basic settings

Set Solarlog - IP-address (192.XXX.X.XXX), port (optional) and polling - interval for consumption/production in seconds ('live'- data, min 10s).

Security: you can activate the 'user' - password in your Solarlog and the 'user login activated' checkbox & add your password in the adapter config or you can run Solarlog and adapter without user password. If user-login is activated, it is recommended to stop the adapter while using the solarlog - user interface (otherwise you need to re-login after every request of the adapter).

### Advanced settings

Check if all inverter / submeters / devices / smart energy - data is to be collected.

Set polling - interval for average & sum up values in minutes (min 5min).

Check if historical data is to be collected and set the time of day when the historical data objects will be updated.

Forecast: optionally, the adapter gets forecast - data using the Forecast.Solar API. Actually, the today's and tomorrow's total kWh are predicted, refreshing every hour. More detailed or additional data is available on request (pls open an issue).

## Hardware

Tested on:
Solarlog 200PM+ / 300PM+ / 500 / 1200Meter / 50

SolarLog 50: There is no open JSON-Interface @ SolarLog 50 devices. So certain values in the 'info' and the 'status' channel will be 'ACCESS DENIED'. If you prefer another solution, please open an issue or post your preferences in a corresponding issue.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.4.0 (2025-10-21)
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17
* (it-busch) login fix for solarlog firmware >= 6.1.1
* (mcm1957) Dependencies have been updated

### 2.3.0 (2024-04-28)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.2.8

-   ready for js-controller 5.0, enhanced error-handling, dependecies updated

### 2.2.6

-   bug in 'forecast' fixed, dependecies updated

### 2.2.5

-   testing fixed

## License

The MIT License (MIT)

Copyright (c) 2023-2025 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 forelleblau marceladam@gmx.ch

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
