---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.remeha-home/README.md
title: ioBroker.remeha-home
hash: uRi77+bePrsWGCD5xccnBWjbelxfrurWjfa1VJBWsxM=
---
![Logo](../../../en/adapterref/iobroker.remeha-home/admin/remeha-home.png)

![Anzahl der Installationen](http://iobroker.live/badges/remeha-home-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.remeha-home.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.remeha-home.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/simatec/ioBroker.remeha-home/badge.svg)
![Lizenz](https://img.shields.io/github/license/simatec/ioBroker.remeha-home?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.remeha-home
![Testen und Freigeben](https://github.com/simatec/ioBroker.remeha-home/workflows/Test%20and%20Release/badge.svg)

Dieser Adapter verwendet den Dienst `Sentry.io`, um mir als Entwickler automatisch Ausnahmen und Codefehler sowie neue Geräteschemata zu melden. Weitere Details siehe unten!

---

## Adapterentwicklung unterstützen
**Wenn Ihnen ioBroker.remeha-home gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Remeha Home-Adapter für ioBroker
---

## Beschreibung
Der Adapter ioBroker.remeha-home ermöglicht die Integration und Steuerung von Remeha-Heizungssystemen über die [Remeha Home-Plattform](https://www.remeha.de/produkte/speicher-und-zubehoer/regelungen/home-app). Der Adapter verbindet sich kontinuierlich mit der Remeha Home API und ruft aktuelle Daten ab, um diese im ioBroker-System bereitzustellen. So kann die Heizungsanlage optimal überwacht und gesteuert werden.

## Funktionen
* Datenabruf: Kontinuierlicher Abruf von Heizungsdaten wie Raumtemperatur, Außentemperatur, Heizungsstatus und mehr.
* Regelzonenmodus: Aktivierung und Deaktivierung von Heizzonen (zB. für unterschiedliche Räume oder Etagen).
* Zieltemperatur einstellen: Einstellen der gewünschten Raumtemperatur für verschiedene Zonen.
* Kaminmodus umschalten: Aktivierung des Kaminmodus zur Anpassung der Heizung an externe Wärmequellen wie beispielsweise einen Kamin.

## Adapterkonfiguration
Die Konfiguration des Adapters ist ganz einfach.
Es werden lediglich Benutzername (E-Mail-Adresse) und Passwort des Remeha Home-Kontos benötigt.

Diese müssen Sie in der Konfiguration des Adapters eintragen.

--- <!-- ### **IN ARBEIT** -->

## Changelog
### 0.2.3 (2024-09-26)
* (simatec) Fix jsonConfig
* (simatec) Fix for Admin 7.1.5

### 0.2.2 (2024-09-19)
* (simatec) small State Fix

### 0.2.1 (2024-09-18)
* (simatec) States Fix
* (simatec) Readme Fix
* (simatec) Test & Release Fix

### 0.2.0 (2024-09-16)
* (simatec) Translation Fix
* (simatec) Code cleaning
* (simatec) Ready for Betatest

### 0.1.3 (2024-09-12)
* (simatec) Fix Zonemode
* (simatec) Translation added

### 0.1.2 (2024-09-11)
* (simatec) Fix Zonemode

### 0.1.1 (2024-09-10)
* (simatec) Fix Release Script

### 0.1.0 (2024-09-10)
* (simatec) First Beta

### 0.0.1 (2024-09-09)
* (simatec) First Commit
---

## License

MIT License

Copyright (c) 2024 simatec

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