---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nissan/README.md
title: ioBroker.nissan
hash: fHaq67WTcGdx6gX9HJ/2bSHnCYDxG24GXLelW9Zh4Uc=
---
![Logo](../../../en/adapterref/iobroker.nissan/admin/nissan.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.nissan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nissan.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/nissan-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/nissan-stable.svg)
![NPM](https://nodei.co/npm/iobroker.nissan.png?downloads=true)
![Test und Freigabe](https://github.com/TA2k/ioBroker.nissan/workflows/Test%20and%20Release/badge.svg)

# ioBroker.nissan

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.**\
&#x20;Weitere Details und Informationen zur Deaktivierung der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) !

## Nissan-Adapter für ioBroker

Mit dem Nissan-Adapter können Sie von Ihrem Nissan-Fahrzeug die neuesten Daten abfragen, den aktuellen Batterie- und Ladezustand, den aktuellen Zustand der Klimaanlage anzeigen lassen, die Klimaanlage starten oder stoppen und den Ladevorgang aus der Ferne starten.

[Nissan Connect/App-Informationen](https://www.nissan.de/kunden/nissan-connect-apps.html)

## Forum

Sie können die Diskussionen im deutschen [iobroker-Forum](https://forum.iobroker.net/topic/46700/test-adapter-nissan-v-0-0-x) gerne verfolgen.

Bitte beachten Sie, dass dieser Adapter nur für Fahrzeuge geeignet ist, die die NissanConnect Services App verwenden, nicht für NissanConnect EV oder eine andere App.

## Unterstützte Regionen

Europa

Aktuell werden nur Nissan-Fahrzeuge innerhalb Europas unterstützt.

## Authentifizierung

Für die Anmeldung werden die Anmeldeinformationen der NissanConnect Services App (MyNISSAN OneID) verwendet.

Die Anmeldung per SRP (Secure Remote Password) wird nicht unterstützt. Derzeit sind keine öffentlich dokumentierten oder funktionsfähigen Nissan/Kamereon-SRP-Parameter (N, g, Hash-Algorithmus) verfügbar.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.19 (2026-09-13)
- (iobroker-bot) Adapter requires node.js >= 22 now.
- (bolliy/claude) Implemented MyNISSAN OneID authentication

### 0.1.18 (2026-05-03)
- (bolliy) add NissanConnect EV app service end notice

### 0.1.17 (2026-03-14)
- (bolliy) dependency and configuration updates

### 0.1.17-alpha.0 (2025-11-22)
- (bolliy) dependency and configuration updates
- (bolliy) NPM: migration to trusted publishing

### 0.1.16 (2025-07-03)
- (bolliy) dependency and configuration updates
- (bolliy) ConnectEV: update API endpoint and enhance password encryption method

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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