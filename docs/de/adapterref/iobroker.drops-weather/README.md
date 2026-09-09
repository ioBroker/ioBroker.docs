---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.drops-weather/README.md
title: ioBroker.drops-weather
hash: 40tXgZj1aVz7JlwHmrJxm1fJY3EGB7u4QkkuFFAoOLc=
---
![Logo](../../../en/adapterref/iobroker.drops-weather/admin/drops-weather.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.drops-weather.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.drops-weather.svg)
![Anzahl der Installationen](https://iobroker.live/badges/drops-weather-installed.svg)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.drops-weather?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.drops-weather?style=flat-square)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.drops-weather/workflows/Test%20and%20Release/badge.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/drops-weather-stable.svg)
![NPM](https://nodei.co/npm/iobroker.drops-weather.png?downloads=true)

# ioBroker.drops-weather

## Drops-Wetter-Adapter für ioBroker

Dieser Adapter liefert Regendaten von <https://www.drops.live>

## Merkmale

Dieser Adapter liest die Regendaten alle 5 Minuten von der Website aus. Es gibt einen Diagrammdatenpunkt, der direkt vom Balkendiagramm-Widget aus den Material-Design-Widgets verwendet werden kann.![Logo](../../../en/adapterref/iobroker.drops-weather/img/ChartDrops2.png)

Die 5-Minuten- und 1-Stunden-Daten werden in unterschiedlichen Zuständen gespeichert.![Logo](../../../en/adapterref/iobroker.drops-weather/img/statesDrops.png)

## Konfiguration

Die GPS-Position ist auf der Webseite drops.live nicht mehr verfügbar.

Sie benötigen den Ortscode Ihrer Stadt. Um diesen Code zu erhalten, geben Sie einfach Ihren Stadtnamen (oder Ihren Standort) unter <https://www.drops.live> ein.

Sie finden Ihren Stadtcode in der URL:

![Logo](../../../en/adapterref/iobroker.drops-weather/img/citycode.png)

In diesem Beispiel finden Sie die Zahl 6573 für Berlin.

## Hinweis für Benutzer der ARM-Architektur (z. B. Raspberry Pi)

Dieser Adapter versucht, das Paket „chromium-browser“ unter Linux/ARM-Architektur zu installieren. Dies ist erforderlich, da die Standardinstallation von Puppeteer auf dieser Architektur keinen funktionierenden Headless-Browser bereitstellt. Falls die Installation fehlschlägt, kann ein beliebiger kompatibler Browser installiert und dessen Pfad in der Instanzkonfiguration angegeben werden.

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @inbux ( <https://github.com/inbux> ) nicht möglich gewesen, der Vorversionen dieses Adapters (vor V1.xx) erstellt hat.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.3.0 (2026-03-03)
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Dependencies have been updated

### 1.2.10 (2025-12-23)
- (arteck) Dependencies have been updated

### 1.2.9 (2025-10-23)
- (arteck) skip download chrome if installed

### 1.2.8 (2025-10-23)
- (arteck) Dependencies have been updated

### 1.2.7 (2025-07-11)
- (arteck) fix adapter stop after wrong request

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.drops-weather/blob/main/CHANGELOG_OLD.md)

## License

MIT License


Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 inbux <inbux.development@gmail.com>

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