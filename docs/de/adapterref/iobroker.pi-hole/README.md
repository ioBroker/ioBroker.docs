---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pi-hole/README.md
title: ioBroker.pi-hole ![Logo](admin/pi-hole.png)
hash: zCjt4T3wLEz5S5KXUAHye39RlUmcbDMKsxvc6X1H+v0=
---
# IoBroker.pi-hole ![Logo](../../../en/adapterref/iobroker.pi-hole/admin/pi-hole.png)

![Anzahl der Installationen](http://iobroker.live/badges/pi-hole-stable.svg)
![Build-Status](https://api.travis-ci.org/unltdnetworx/ioBroker.pi-hole.svg?branch=master)
![NPM-Version](https://img.shields.io/npm/v/iobroker.pi-hole.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pi-hole.svg)
![NPM](https://nodei.co/npm/iobroker.pi-hole.png?downloads=true)

=================

Dieser Adapter dient dazu, Werte von einem laufenden Pi-hole auszulesen und das Gerät zu steuern (Start/Stopp).

[!WARNUNG] Dieser Adapter funktioniert nur mit Pi-hole-Versionen vor 6.0.0. Bitte verwenden Sie für Pi-hole-Versionen ab 6 den Adapter [ioBroker.pi-hole2](https://github.com/oweitman/ioBroker.pi-hole2).

Dieser Adapter wird nur noch sehr eingeschränkt gewartet, da Pi-hole 5 und ältere Versionen das Ende des Lebenszyklus erreicht haben.

## Schritte
1. Installieren Sie den Adapter

2. Füllen Sie die Felder des Adapter-Admins aus. Geben Sie die IP-Adresse des Pi-hole-Geräts, das API-Token (erhältlich über die Web-Oberfläche des Pi-hole-Geräts unter Einstellungen/API/Token abrufen) und das obligatorische Intervall für die Aktualisierung der Pi-hole-Werte (Statistiken in iobroker aktualisieren) an.

3. Einige der Objekte sind JSON-Tabellen, die Sie innerhalb von vis verwenden können.

4. Aktivieren Sie den Filter durch Klicken auf die Schaltfläche „Pi-hole aktivieren“, deaktivieren Sie den Filter, indem Sie den Wert von „Pi-hole deaktivieren“ ändern (0 für dauerhaft, Zahl für die Anzahl der Sekunden).

## Anforderungen
* Pi-hole-Gerät läuft

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von Michael Schuster <development@unltd-networx.de>, der frühere Versionen dieses Adapters erstellt hat, nicht möglich gewesen.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->
## Spenden
Kaffee spendieren/servieren Sie einen Kaffee <https://paypal.me/unltdnetworx>

## Changelog
### 2.0.0 (2025-12-04)

* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Dependencies have been updated

### 1.3.6

* (unltdnetworx) support for controller v5

### 1.3.4

* (unltdnetworx) disabled "getQueryTypes" for creating lots of spam entries

### 1.3.2

* (unltdnetworx) ready for Admin 5 and NodeJS 16

### 1.3.1

* (unltdnetworx) new adapter testing and security update

## License

MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Michael Schuster

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