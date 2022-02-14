---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: sNPkORaSVOs312S5OrbFo1j7SheCbsjHx0Y1bd/1zH0=
---
# IoBroker.myvbus
![Logo](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![Anzahl der Installationen (neueste)](http://iobroker.live/badges/myvbus-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/myvbus-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.myvbus.svg)
![NPM](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)

**Tests:** ![Testen und freigeben](https://github.com/iobroker-community-adapters/iobroker.myvbus/workflows/Test%20and%20Release/badge.svg)

## IoBroker-Adapter für Resol VBus
Dieser Adapter verbindet ioBroker mit verschiedenen VBus-basierten Geräten unter Verwendung von resol-vbus, einer JavaScript-Bibliothek zur Erfassung von RESOL VBus-Daten, bereitgestellt von Daniel Wippermann.

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

## Merkmale
* Ermöglicht das Auslesen der Messdaten verschiedener RESOL(R) VBus(R)-Geräte - vorzugsweise Solar- und Systemregler der DeltaSol(R)-Serie inkl. eingebautem Wärmemengenzähler (WMZ) - mittels Datenlogger DL3 oder DL2, KM2 Kommunikationsmodule, VBus/LAN-Schnittstellenadapter oder Seriell/LAN-Gateways lokal über TCP/IP.
* Der Gerätezugriff über den seriellen VBus/USB-Schnittstellenadapter oder über VBus.net(R) mit DLx/KMx wird ebenfalls unterstützt.
* Verarbeitet Live-VBus-Datenströme und stellt sie als ioBroker-Zustände zur Verfügung.
* Werte werden mit einer konfigurierbaren Zykluszeit aktualisiert.
* Das Lesen oder Einstellen der VBus-Gerätekonfigurationsparameter wird nicht unterstützt. Hierfür sollten die von Resol bereitgestellten Tools verwendet werden, z. B. über VBus.net oder das Parametriertool RPT.
* Das Lesen von DL3-Kanal 0 (direkt an das DL3-Gerät angeschlossene Sensoren) wird aufgrund von Einschränkungen der DL3-Schnittstelle nicht unterstützt.

## Konfigurationshinweise
* Die Standardeinstellung für die Verbindungsart ist VBus/LAN, muss aber auch für VBus/LAN explizit ausgewählt werden, sonst kommt keine Verbindung zustande.
* Die korrekten Einstellungen für den direkten LAN-Zugriff für VBus/LAN, DL3, DL2, KM2 sind:
  * Verbindungstyp: VBus/LAN oder KM2 oder DL2 oder DL3
  * Verbindungskennung: IP-Adresse (z. B. 192.168.178.188) oder FullyQualifiedHostName (z. B. host1.example.com)
  * VBus-Passwort: YourVBusPassword (Standard: vbus)
  * Verbindungsport: Die Standardeinstellung 7053 sollte nicht geändert werden
  * DL3-Kanal: Nur relevant für DL3 (Werte 1-6, Kanal 0 kann nicht ausgelesen werden)
  * Aktualisierungsintervall: Zeit zwischen Aktualisierungen der Messwerte (Standard 30s)
* Die korrekten Einstellungen für den DL3-, DL2-, KM2-Zugriff über VBus.net sind:
  * Verbindungstyp: DL3 oder DL2 oder KM2
  * Verbindungskennung: vbus.net (oder vbus.io) - beide ohne http:// und Via-Kennung!
  * Verbindungsport: Die Standardeinstellung 7053 sollte nicht geändert werden
  * VBus-Passwort: YourVBusPassword (Standard: vbus)
  * DL3-Kanal: Nur für DL3 relevant (Werte: 1-6, Kanal 0 kann nicht ausgelesen werden)
  * Via-Kennung: YourViaIdentifier (z. B. d1234567890) - ohne http:// davor oder .vbus.io dahinter
  * Aktualisierungsintervall: Zeit zwischen der Aktualisierung der Messwerte (Standard 30s)

## Rechtliche Hinweise
RESOL, VBus, VBus.net, DeltaSol und andere sind Warenzeichen oder eingetragene Warenzeichen der RESOL - Elektronische Regelungen GmbH <https://www.resol.de/de>

Alle anderen Warenzeichen sind Eigentum ihrer jeweiligen Inhaber.
Die Autoren werden in keiner Weise von RESOL GmbH oder verbundenen Tochterunternehmen, Logos oder Marken unterstützt oder sind mit ihnen verbunden.

## Changelog
### 0.2.2 (2022-02-11)
* Updated dependencies
* Compatibility check for js-controller 4.0
* Support for js-controller 1.x dropped

### 0.2.1 (2021-08-18)
* Update dependencies
* Changed allowed range of temperature values to include the error values for short circuit and open circuit

### 0.2.0 (2021-06-25)
* Dropped node.js 10 support, added node.js 14 and 16 support

### 0.1.1 (2021-05-18)
* Fixes for supporting js-controller >=3.2.x

### 0.1.0
* (grizzelbee) Fix: config page shows current settings now (not default anymore)
* (grizzelbee) Fix: "Connected" state is updated correctly now if connection is disrupted.
* (grizzelbee) New: Added Badge for latest(npm) version to readme
* (grizzelbee) Fix: removed default password from config to ensure it's encrypted on first config
* (grizzelbee) Fix: removed Force-ReInit
* (grizzelbee) Fix: sensor maintenance indicators are booleans now
* (grizzelbee) New: added activity indicator states for relays
* (pdbjjens) Fix: Prevent warnings regarding non-existent objects upon adapter instance creation and start-up with js-controller 3.2.x
* (pdbjjens) Fix: updated dependencies and vulnerabilities

## License

MIT License

Copyright (c) 2022 Jens-Peter Jensen <jjensen@t-online.de>

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