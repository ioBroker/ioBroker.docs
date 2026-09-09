---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.remeha-home/README.md
title: ioBroker.remeha-home
hash: HZe7K5t32/vkjAjPjgWJr5OtUp6Vl/JCZ1SM7NcYL7U=
---
![Logo](../../../en/adapterref/iobroker.remeha-home/admin/remeha-home.png)

![Anzahl der Installationen](http://iobroker.live/badges/remeha-home-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.remeha-home.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.remeha-home.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/simatec/ioBroker.remeha-home/badge.svg)
![Test und Freigabe](https://github.com/simatec/ioBroker.remeha-home/workflows/Test%20and%20Release/badge.svg)
![Lizenz](https://img.shields.io/github/license/simatec/ioBroker.remeha-home?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.remeha-home

Dieser Adapter nutzt den Dienst`Sentry.io` Ausnahmen, Codefehler und neue Geräteschemata werden mir als Entwickler automatisch gemeldet. Weitere Details finden Sie unten!

---

## Unterstützung der Adapterentwicklung

**Wenn Ihnen ioBroker.remeha-home gefällt, erwägen Sie bitte eine Spende:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Remeha Home-Adapter für ioBroker

---

## Beschreibung

Der ioBroker.remeha-home-Adapter ermöglicht die Integration und Steuerung von Remeha-Heizsystemen über die [Remeha Home-Plattform](https://www.remeha.de/produkte/speicher-und-zubehoer/regelungen/home-app) . Der Adapter stellt eine kontinuierliche Verbindung zur Remeha Home-API her und ruft aktuelle Daten ab, um diese im ioBroker-System bereitzustellen. Dadurch lässt sich das Heizsystem optimal überwachen und steuern.

## Funktionen

- Datenabruf: Kontinuierlicher Abruf von Heizungsdaten wie Raumtemperatur, Außentemperatur, Heizungsstatus und mehr.
- Steuerzonenmodus: Aktivierung und Deaktivierung von Heizzonen (z. B. für verschiedene Räume oder Etagen).
- Zieltemperatur einstellen: Die gewünschte Raumtemperatur für verschiedene Zonen festlegen.
- Kaminmodus umschalten: Aktivierung des Kaminmodus zur Anpassung der Heizung an externe Wärmequellen wie einen Kamin.

## Adapterkonfiguration

Die Konfiguration des Adapters ist sehr einfach. Es werden lediglich der Benutzername (E-Mail-Adresse) und das Passwort des Remeha Home-Kontos benötigt.

Diese Werte müssen Sie in der Konfiguration des Adapters eingeben.

---

## Changelog
<!-- ### **WORK IN PROGRESS** -->
### 1.1.0 (2026-08-19)
* (copilot) Adapter requires node.js >= 22 now
* (simatec) dependencies updated
* (simatec) small Bugfixes

### 1.0.10 (2026-03-29)
* (simatec) Fix License
* (simatec) dependencies updated
* (simatec) Fix automerge

### 1.0.9 (2025-11-22)
* (simatec) dependencies updated
* (simatec) Fix Test & Release

### 1.0.8 (2025-08-31)
* (simatec) Dependencies updated

### 1.0.7 (2025-06-25)
* (simatec) Dependencies updated
* (simatec) Ready for NodeJS 24.x

[Older changelogs can be found there](https://github.com/simatec/ioBroker.remeha-home/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024 - 2026 simatec

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