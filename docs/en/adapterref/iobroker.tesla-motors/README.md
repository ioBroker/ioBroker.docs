![Logo](admin/tesla-motors.png)

# ioBroker.tesla-motors

[![NPM version](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)](https://www.npmjs.com/package/iobroker.tesla-motors)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)](https://www.npmjs.com/package/iobroker.tesla-motors)
![Number of Installations (latest)](https://iobroker.live/badges/tesla-motors-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/tesla-motors-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.tesla-motors)

[![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)](https://nodei.co/npm/iobroker.tesla-motors/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## Tesla adapter für ioBroker

Es werden alle Tesla Modelle und Powerwalls aus der Tesla App angezeigt und aktualisiert.

**Remote Befehle für Tesla und Powerwall sind möglich unter**
tesla-motors.0.id.remote

**Loginablauf:**

- In den Instanzoptionen den Auth Link klicken.
- Die Logindaten eingeben und gegebenenfalls Captcha/reCaptcha und MFA eingeben.
- Auf der Page not Found Seite die komplette URL aus dem Browser kopieren und in die Instanzoptionen einfügen und auf Speichen und Schließen klicken.
- Die ersten Daten kommen unter Umständen erst nach der ersten Fahrt

**Field Description**

- df driver front
- dr driver rear
- pf passenger front
- pr passenger rear
- ft front trunk
- rt rear trunk

[Option Codes Erklärung](https://tesla-api.timdorr.com/vehicle/optioncodes)

## Fragen und Diskussionen:

https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.5 (2023-10-24)

- fix vehicle update

### 1.3.4 (2023-10-24)

- add wall_connector devices

### 1.3.4-alpha.0 (2023-10-18)

- (mcm1957) Standard iobroker release environment has been added.
- (mcm1957) Some dependencies have been updated.

### 1.3.2

- Create history elements by index not by date

### 1.3.1

- login url and ordered car fix

### 1.0.2

- (iobroker-community-adapters) ALLE DATENPUNKTE SIND NEU, Vis muss angepasst werden. Neue Version mit neuen Zuständen für Tesla und Powerwalls.

## License

MIT License

Copyright (c) 2021-2023 iobroker-community

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
