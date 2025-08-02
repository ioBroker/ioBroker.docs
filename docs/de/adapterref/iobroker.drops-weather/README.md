---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.drops-weather/README.md
title: ioBroker.drops-wetter
hash: 7+tfV2pZIo87TP/OQvVnoyhyu7Eg4jxVxPpBPVerwqI=
---
![Logo](../../../en/adapterref/iobroker.drops-weather/admin/drops-weather.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.drops-weather.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.drops-weather.svg)
![Anzahl der Installationen](https://iobroker.live/badges/drops-weather-installed.svg)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.drops-weather?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.drops-weather?style=flat-square)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/drops-weather-stable.svg)
![NPM](https://nodei.co/npm/iobroker.drops-weather.png?downloads=true)

# IoBroker.drops-weather
![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.drops-weather/workflows/Test%20and%20Release/badge.svg)

## Drops-Weather-Adapter für ioBroker
Dieser Adapter liefert Regendaten von https://www.drops.live

## Merkmale
Dieser Adapter liest die Regendaten im 5-Minuten-Takt von der Website.
Es gibt einen Diagrammdatenpunkt, der direkt vom BarChart-Widget der Material Designs-Widgets verwendet werden kann.
![Logo](../../../en/adapterref/iobroker.drops-weather/img/ChartDrops2.png)

Die 5-Minuten- und 1-Stunden-Daten werden in unterschiedlichen Zuständen gespeichert.
![Logo](../../../en/adapterref/iobroker.drops-weather/img/statesDrops.png)

## Konfiguration
Die GPS-Position ist auf der drops.live-Website nicht mehr verfügbar.

Sie benötigen den Ortscode Ihres Standorts bzw. Ihrer Stadt. Um diesen Code zu erhalten, geben Sie einfach Ihren Ortsnamen unter https://www.drops.live ein (oder verwenden Sie Ihren Standort).

Ihren Ortscode finden Sie in der URL:

![Logo](../../../en/adapterref/iobroker.drops-weather/img/citycode.png)

In diesem Beispiel finden Sie 6573 für Berlin.

## Hinweis für Benutzer der ARM-Architektur (z. B. Raspberry Pi)
Dieser Adapter versucht, das Paket „chromium-browser“ unter Linux/ARM-Architektur zu installieren. Dies ist erforderlich, da die Standardinstallation von Puppeteer auf dieser Architektur keinen funktionierenden Headless-Browser bereitstellt. Sollte die Installation fehlschlagen, kann ein beliebiger kompatibler Browser installiert und der Pfad in der Instanzkonfiguration angegeben werden.

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @inbux (https://github.com/inbux) nicht möglich gewesen, der Versionen dieses Adapters vor V1.x.x erstellt hat.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.4 (2025-06-04)
- (mcm1957) fix language default.
- (mcm1957) dependencies have been updated

### 1.2.3 (2025-03-29)
- (arteck) Text is now deleted if no text is available

### 1.2.2 (2025-03-29)
- (arteck) Puppeteer-extra and puppeteer-extra-plugin-stealth have been added

### 1.2.1 (2025-03-25)
- (arteck) Language support has been added.
- (mcm1957) Unused dependencies have been removed.

### 1.2.0 (2025-03-24)
- (mcm1957) Timeout has been encreased to 15s.
- (mcm1957) Logging has been reduced.
- (arteck) Adapter has been converted to scheduled operation. 
- (mcm1957) A spelling error blocking chromium-browser manual selection has been corrected.

## License

MIT License

Copyright (c) 2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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