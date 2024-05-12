---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: X+YdpIAw4RaMRUYwa08X+jRrEXHIlrD+88onxnxrIjA=
---
![Logo](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![Anzahl der Installationen](http://iobroker.live/badges/philips-air-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.philips-air.svg)

# IoBroker.philips-air
![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Philips Luftreiniger-Adapter für ioBroker
Verbindet Philips-Luftreiniger mit ioBroker.
**Nur mit AC2729 getestet**, sollte aber mit neuen Luftreinigern funktionieren, die verschlüsselt über COAP kommunizieren.
![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[Link zur Philips-Website](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Verwendung
Es wird nur die IP-Adresse des Geräts benötigt. Diese finden Sie in Ihrem Router (z. B. `MiCO`).
Es kann vorkommen, dass einige Geräte nicht alle Variablen haben und diese im Objektbaum leer bleiben.

![Objekte](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2024-04-25)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.0.3 (2022-12-23)
* (Apollon77) Finalized and optimized HTTP communication protocol
* (Apollon77) Fixed type issues with device.error

### 1.0.2 (2022-11-16)
* (bluefox) Small fixes done
* (bluefox) Added HTTP communication protocol (untested!)
* (mdax82) Added `gentle/GT` for AC2939

### 0.1.7 (2022-05-19)
* (Apollon77) Upgrade coap library

### 0.1.4 (2022-03-23)
* (Apollon77) Downgrade coap library to restore functionality for some devices
* (Apollon77) Prevent crash case and make control more flexible
* (Apollon77) correctly handle `control.function` state

### 0.1.3 (2022-03-12)
* (Apollon77) General updates and optimizations

### 0.1.1 (2020-10-14)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2022 ioBroker <dogafox@gmail.com>

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