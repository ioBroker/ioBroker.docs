---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.elv-sup2/README.md
title: ioBroker.elv-sup2
hash: D1tL/XdUlmLnXmWIUr1eJW1S1CvM+IyKPgH5LT/yYBA=
---
![Logo](../../../en/adapterref/iobroker.elv-sup2/admin/elv-sup2.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.elv-sup2.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/elv-sup2-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.elv-sup2.svg)
![Anzahl der Installationen](https://iobroker.live/badges/elv-sup2-installed.svg)
![NPM](https://nodei.co/npm/iobroker.elv-sup2.png?data=d,s)

# IoBroker.elv-sup2
![Test und Freigabe](https://github.com/pdbjjens/ioBroker.elv-sup2/workflows/Test%20and%20Release/badge.svg)

## Elv-sup2-Adapter für ioBroker
Dieser Adapter verbindet den ELV HQ-Stereo-FM-Testgenerator SUP2 über die serielle USB-Schnittstelle mit ioBroker. Er ermöglicht das Abrufen und Einstellen bestimmter Konfigurationsparameter des Testgenerators, darunter RDS-Text, RDS-Programmname und -typ. SUP2-Updates werden nicht unterstützt. Verwenden Sie hierfür das von ELV bereitgestellte Windows-Programm.

## Konfiguration
Der einzige Konfigurationsparameter ist die serielle Port-ID des Ports, an den der SUP2 angeschlossen ist.
Das Format sollte beispielsweise /dev/ttyUSBx unter Linux oder COMx unter Windows-basierten ioBroker-Installationen lauten.

## Rechtliche Hinweise
ELV und andere sind Marken oder eingetragene Marken der ELV Elektronik AG, D-26787 Leer, Deutschland - <https://de.elv.com/>

Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.
Die Autoren stehen in keiner Verbindung zu ELV Elektronik AG oder deren Tochtergesellschaften, Logos oder Marken und werden von diesen auch nicht unterstützt.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.3 (2026-03-04) - 2026H1 maintenance release

* (pdbjjens) **Changed**: node>=20, js-controller>=7.0.7 and admin>=7.7.22 required
* (pdbjjens) **Fixed**: update release-script (#434)

### 0.2.2 (2025-12-15)

* (pdbjjens) **Fixed:** state roles corrected

### 0.2.1 (2025-11-27)

* (pdbjjens) Change: Migrate To Trusted Publishing

### 0.2.0 (2025-08-29) - 2025H2 maintenance release

* (pdbjjens) Change: node>=20, js-controller>=7.0.7 and admin>=7.6.17 required
* (pdbjjens) Change: Updated to ESLint 9 and serialport 13
* (pdbjjens) Change: Cleanup devDependencies

### 0.1.1 (2024-11-24) - 2025H1 maintenance release

* (pdbjjens) New: Tested with node.js 22
* (pdbjjens) Fix: Responsive Design tweaks
* (pdbjjens) New: Updated dependencies

## License

MIT License

Copyright (c) 2026 pdbjjens <jjensen@t-online.de>

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