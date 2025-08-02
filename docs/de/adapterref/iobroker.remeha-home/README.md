---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.remeha-home/README.md
title: ioBroker.remeha-home
hash: yRxbFwyeNohf5COQOHuVehlHQWjT6q4kachmpUbjgco=
---
![Logo](../../../en/adapterref/iobroker.remeha-home/admin/remeha-home.png)

![Anzahl der Installationen](http://iobroker.live/badges/remeha-home-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.remeha-home.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.remeha-home.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/simatec/ioBroker.remeha-home/badge.svg)
![Lizenz](https://img.shields.io/github/license/simatec/ioBroker.remeha-home?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.remeha-home
![Testen und Freigeben](https://github.com/simatec/ioBroker.remeha-home/workflows/Test%20and%20Release/badge.svg)

Dieser Adapter nutzt den Dienst `Sentry.io`, um mir als Entwickler automatisch Ausnahmen, Codefehler und neue Geräteschemata zu melden. Weitere Details siehe unten!

---

## Adapterentwicklung unterstützen
**Wenn Ihnen ioBroker.remeha-home gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Remeha Home-Adapter für ioBroker
---

## Beschreibung
Der ioBroker.remeha-home Adapter ermöglicht die Integration und Steuerung von Remeha-Heizungssystemen über die [Remeha Home-Plattform](https://www.remeha.de/produkte/speicher-und-zubehoer/regelungen/home-app). Der Adapter verbindet sich kontinuierlich mit der Remeha Home API und ruft aktuelle Daten ab, um diese im ioBroker-System bereitzustellen. So lässt sich die Heizungsanlage optimal überwachen und steuern.

## Funktionen
* Datenabruf: Kontinuierlicher Abruf von Heizungsdaten wie Raumtemperatur, Außentemperatur, Heizungsstatus und mehr.
* Regelzonenmodus: Aktivierung und Deaktivierung von Heizzonen (z. B. für verschiedene Räume oder Etagen).
* Zieltemperatur einstellen: Einstellen der gewünschten Raumtemperatur für verschiedene Zonen.
* Kaminmodus umschalten: Aktivierung des Kaminmodus zur Anpassung der Heizung an externe Wärmequellen wie beispielsweise einen Kamin.

## Adapterkonfiguration
Die Konfiguration des Adapters ist denkbar einfach.
Es werden lediglich der Benutzername (E-Mail-Adresse) und das Passwort des Remeha Home-Kontos benötigt.

Diese müssen Sie in der Konfiguration des Adapters eintragen.

---

## Changelog
<!-- ### **WORK IN PROGRESS** -->
### 1.0.4 (2025-03-07)
* (simatec) Fix Post Update

### 1.0.3 (2025-03-07)
* (simatec) Fix Post Update

### 1.0.2 (2025-03-06)
* (simatec) Code Fix
* (simatec) eslint Fix

### 1.0.1 (2025-03-04)
* (simatec) Code clean
* (simatec) Dependencies updated

### 1.0.0 (2025-03-02)
* (simatec) Fix Update Settings
* (simatec) Rewrite in Typescript

### 0.2.8 (2025-02-22)
* (simatec) Dependencies updated
* (simatec) small Fix

### 0.2.7 (2025-01-09)
* (simatec) Fix Update Intervall

### 0.2.6 (2025-01-09)
* (simatec) eslint-config fix
* (simatec) Dependencies updated
* (simatec) Update License

### 0.2.5 (2024-11-27)
* (simatec) Dependencies updated
* (simatec) Fix jsonConfig
* (simatec) Issue Action added
* (simatec) eslint-config added

### 0.2.4 (2024-09-28)
* (simatec) Fix request error
* (simatec) Dependencies updated

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

Copyright (c) 2024 - 2025 simatec

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