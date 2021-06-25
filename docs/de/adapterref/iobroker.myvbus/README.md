---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: vrblLAmPDLheq6IrG8M5j1mev6UNtfmV+UTYNM4yR74=
---
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/myvbus-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/myvbus-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.myvbus.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.myvbus.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.myvbus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.myvbus/master.svg)

#ioBroker.myvbus
![Logo](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

## IoBroker-Adapter für Resol VBus
Dieser Adapter verbindet ioBroker mit verschiedenen VBus-basierten Geräten unter Verwendung von resol-vbus, einer JavaScript-Bibliothek zur Erfassung von RESOL-VBus-Daten, bereitgestellt von Daniel Wippermann.

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

## Eigenschaften
* Ermöglicht das Auslesen der Messdaten verschiedener RESOL(R) VBus(R) Geräte - vorzugsweise Solar- und Anlagenregler der DeltaSol(R) Serie inkl. Einbau-Wärmemengenzähler (HQM) - mittels DL3 oder DL2 Datenlogger, KM2 Kommunikationsmodule, VBus/LAN-Schnittstellenadapter oder serielle/LAN-Gateways lokal über TCP/IP.
* Der Gerätezugriff über den seriellen Schnittstellenadapter VBus/USB oder über VBus.net(R) mit DLx/KMx wird ebenfalls unterstützt.
* Verarbeitet Live-VBus-Datenströme und stellt sie als ioBroker-Zustände zur Verfügung.
* Werte werden mit einer konfigurierbaren Zykluszeit aktualisiert.
* Das Lesen oder Einstellen der Konfigurationsparameter des VBus-Geräts wird nicht unterstützt. Hierzu sind die von Resol zur Verfügung gestellten Tools zu verwenden, z.B. über VBus.net oder das Parametriertool RPT.
* Das Lesen von DL3-Kanal 0 (Sensoren, die direkt mit dem DL3-Gerät verbunden sind) wird aufgrund von Einschränkungen der DL3-Schnittstelle nicht unterstützt.

## Konfigurationshinweise
* Die Standardeinstellung für die Verbindungsart ist VBus/LAN, muss aber auch für VBus/LAN explizit gewählt werden, sonst wird keine Verbindung aufgebaut.
* Die korrekten Einstellungen für den direkten LAN-Zugang für VBus/LAN, DL3, DL2, KM2 sind:
  * Verbindungstyp: VBus/LAN oder KM2 oder DL2 oder DL3
  * Verbindungskennung: IP-Adresse (z. B. 192.168.178.188) oder FullyQualifiedHostName (z. B. host1.example.com)
  * VBus-Passwort: YourVBusPassword (Standard: vbus)
  * Anschlussport: Standardeinstellung 7053 sollte nicht geändert werden
  * DL3-Kanal: Nur für DL3 relevant (Werte 1-6, Kanal 0 können nicht ausgelesen werden)
  * Aktualisierungsintervall: Zeit zwischen Aktualisierungen der Messwerte (Standard 30s)
* Die korrekten Einstellungen für den DL3-, DL2-, KM2-Zugang über VBus.net sind:
  * Anschlussart: DL3 oder DL2 oder KM2
  * Verbindungskennung: vbus.net (oder vbus.io) - beide ohne http:// und Via Kennung!
  * Anschlussport: Standardeinstellung 7053 sollte nicht geändert werden
  * VBus-Passwort: YourVBusPassword (Standard: vbus)
  * DL3-Kanal: Nur für DL3 relevant (Werte: 1-6, Kanal 0 nicht auslesbar)
  * Via Identifier: YourViaIdentifier (z.B. d1234567890) - ohne http:// davor oder .vbus.io dahinter
  * Aktualisierungsintervall: Zeit zwischen der Aktualisierung der Messwerte (Standard 30s)

## Rechtliche Hinweise
RESOL, VBus, VBus.net, DeltaSol und andere sind Marken oder eingetragene Marken der RESOL - Elektronische Regelungen GmbH <https://www.resol.de/de>

Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.
Die Autoren werden in keiner Weise von der RESOL GmbH oder verbundenen Tochtergesellschaften, Logos oder Marken unterstützt oder mit ihr verbunden.

## Changelog
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

### 0.0.6
* (pdbjjens) alpha 6 release updated dependencies

### 0.0.5
* (pdbjjens) alpha 5 release improved type and role mapping of adapter values

### 0.0.4
* (pdbjjens) alpha 4 release updated dependency on resol-vbus library to 0.21.0

### 0.0.3
* (pdbjjens) alpha 3 release tested with DL3 over local LAN and VBus.net and DeltaSol SLT (0x1001) incl. HQM (0x1011)

### 0.0.2
* (pdbjjens) alpha 2 release tested with VBus/LAN, KM2, VBus.net and DeltaSol E (0x7721 & 0x7722), DeltaSol M (0x7311 & 0x716), DeltaSol CS Plus (0x2211), Oventrop RQXXL (0x7541)

### 0.0.1

* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## License

MIT License

Copyright (c) 2021 Jens-Peter Jensen <jjensen@t-online.de>

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