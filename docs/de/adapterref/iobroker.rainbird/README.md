---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rainbird/README.md
title: ioBroker.rainbird
hash: 7AXCQlCf4CrfwWtJqg/Wx7fNVwGuYvBwdeVZa2VjcgQ=
---
![Logo](../../../en/adapterref/iobroker.rainbird/admin/rainbird.png)

![Anzahl der Installationen](http://iobroker.live/badges/rainbird-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rainbird.svg)
![NPM](https://nodei.co/npm/iobroker.rainbird.png?downloads=true)
![Stabil](http://iobroker.live/badges/rainbird-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.rainbird.svg)
![Build-Status](https://travis-ci.org/StrathCole/ioBroker.rainbird.svg?branch=master)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.rainbird
Ein ioBroker-Adapter für Rain Bird mit LNK-WLAN-Adapter. Dieses Projekt steht in keiner Verbindung zu Rain Bird.

Basierend auf der Python-Bibliothek „pyrainbird“ von https://github.com/jbarrancos/pyrainbird und vollständig nach NodeJS portiert. Der Adapter stellt eine direkte Verbindung zum Gerät über WLAN her und nutzt nicht den Rain Bird Cloud-Dienst.

## Staaten
`rainbird.X.device.commands.advanceZone` – Während das aktuelle Programm läuft, wird zur nächsten Bewässerungszone gewechselt und die aktuelle gestoppt.

`rainbird.X.device.commands.runProgram` – Das angegebene Programm (1 bis X) wird manuell ausgeführt, wie zuvor im Gerät konfiguriert.

`rainbird.X.device.commands.stopIrrigation` – Die Bewässerung in allen Zonen wird sofort gestoppt.

`rainbird.X.device.irrigation.active` – Die Bewässerung ist aktuell aktiv. Der Wert „false“ bedeutet, dass der Schalter am Gerät auf „Stopp“ steht.

`rainbird.X.device.irrigation.station` – Nummer der aktuell bewässerten Zone.

`rainbird.X.device.sensors.rain` - Wahr, wenn ein Regensensor angeschlossen ist und Regen erkannt wird.

`rainbird.X.device.settings.rainDelay` – Die aktuell für das Gerät eingestellte Bewässerungsverzögerung (in Tagen).

`rainbird.X.device.settings.seasonalAdjust` – Die aktuelle saisonale Anpassung des Wasserhaushalts.

`rainbird.X.device.stations.Y.available` – Wahr, wenn Zone Y im Gerät verfügbar ist.

`rainbird.X.device.stations.Y.irrigation` – Wahr, wenn Zone Y aktuell bewässert wird.

`rainbird.X.device.stations.Y.remaining` – Verbleibende Bewässerungszeit in Sekunden.
`rainbird.X.device.stations.Y.runZone` – Manuelle Bewässerung von Zone Y für die angegebene Minutenanzahl.

`rainbird.X.device.stations.Y.testZone` – Zone Y testen.

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von Marius Burkard <m.burkard@pixcept.de>, der frühere Versionen dieses Adapters entwickelt hat, nicht möglich gewesen.

## IQ4 Cloud-Geräte
Da das LNK-Gerät nur eine gleichzeitige Verbindung zulässt, müssen Sie es von der IQ4-Cloud trennen, damit es ordnungsgemäß funktioniert. Dazu benötigen Sie eine Firewall, die beispielsweise den gesamten Internetverkehr nur für Ihre LNK-IP-Adresse blockiert. Anschließend können Sie sich wie erwartet mit diesem Adapter verbinden.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.1 (2026-05-10)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mobster80) Https support for Rainbird LNK added. Migrated LNK devices to IQ4 cloud, please see additional information in section "IQ4 Cloud devices".

### 2.0.2 (2024-12-27)
* (Feuersturm) @strathcole/iob-lib has been migrated to local repository (#27)
* (mcm1957) Dependencies have been updated

### 2.0.1 (2024-12-15)
* (Feuersturm) Some minor corrections to installations news and some internal changes at pacakging have been applied.

### 2.0.0 (2024-12-13)
* (Feuersturm) BREAKING: The password is stored encrypted now. Please reenter you password at configuration page. This is required only once after migration from release < 2.0.0 to release 2.0.0 or newer.
* (mcm1957) Adapter requires node.js 20 now
* (mcm1957) Adapter requires js-controller 5 and admin 6  now
* (Feuersturm) switch adapter config to jsonconfig
* (mcm1957) Dependencies have been updated

### 1.0.1 (2024-06-06)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Adapter has been move to iobroker-community-adapters organization
* (mcm1957) Adapter-core has been adapter, adapter supports js-controller 6 now.
* (mcm1957) Dependencies have been updated

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022 Marius Burkard m.burkard@pixcept.de

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.