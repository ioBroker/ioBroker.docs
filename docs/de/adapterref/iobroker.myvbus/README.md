---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: aF4K57u2d/78Cw2v4pkxrJUrcmi9N7upgA12YFtYMP4=
---
# IoBroker.myvbus
![Logo](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/myvbus-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/myvbus-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.myvbus.svg)
![NPM](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)

**Tests:** ![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.myvbus/workflows/Test%20and%20Release/badge.svg)

## IoBroker-Adapter für Resol VBus
Dieser Adapter verbindet ioBroker mit verschiedenen VBus-basierten Geräten über resol-vbus, eine JavaScript-Bibliothek zur Erfassung von RESOL VBus-Daten, bereitgestellt von Daniel Wippermann.

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

## Merkmale
* Ermöglicht das Auslesen der Messdaten verschiedener RESOL(R) VBus(R)-Geräte – vorzugsweise Solar- und Systemregler der DeltaSol(R)-Serie inklusive eingebautem Wärmemengenzähler (HQM) – mittels Datenlogger DL3 oder DL2, KM2 Kommunikationsmodule, VBus/LAN-Schnittstellenadapter oder Seriell/LAN-Gateways lokal über TCP/IP.
* Der Gerätezugriff über den seriellen VBus/USB-Schnittstellenadapter oder über VBus.net(R) mit DLx/KMx wird ebenfalls unterstützt.
* Verarbeitet Live-VBus-Datenströme und stellt sie als ioBroker-Status zur Verfügung.
* Werte werden mit einer konfigurierbaren Zykluszeit aktualisiert.
* Das Lesen oder Einstellen der VBus-Gerätekonfigurationsparameter wird nicht unterstützt. Hierzu sollten die von Resol bereitgestellten Tools genutzt werden, z.B. über VBus.net oder das Parametriertool RPT.

Eine abgeleitete Version dieses Adapters, der die Steuerung von VBus-Geräten unterstützt, ist unter <https://github.com/Grizzelbee/ioBroker.resol> verfügbar

* Das Lesen von DL3-Kanal 0 (direkt an das DL3-Gerät angeschlossene Sensoren) wird aufgrund von Einschränkungen der DL3-Schnittstelle nicht unterstützt.

## Konfigurationshinweise
* Der Typ des Verbindungsgeräts, z. VBus/LAN oder DL2 muss explizit ausgewählt werden, sonst kommt keine Verbindung zustande.
* TCP-Verbindungsport: Die Standardeinstellung 7053 sollte nicht geändert werden
* Gerätepasswort: Das Passwort, das Sie in Ihrem Verbindungsgerät festgelegt haben (Standard: vbus)
* DL3-Kanal: Nur relevant für DL3/DL2Plus – für alle anderen Anschlussgeräte auf „Keine“ belassen.

(erlaubte Werte: 1-6, Kanal 0 kann nicht ausgelesen werden)

* Aktualisierungsintervall: Die Zeit zwischen Aktualisierungen der Messwerte (Standard 30s)
* Die korrekten Einstellungen für den direkten LAN-Zugriff für VBus/LAN, DL3, DL2, KM2 sind:
  * Verbindungsgerät: VBus/LAN oder KM2/DL2 oder DL3/DL2Plus
  * Geräteadresse: IP-Adresse (z. B. 192.168.178.188) oder FullyQualifiedHostName (z. B. myKM2.fritz.box)
* Die korrekten Einstellungen für den DL3-, DL2-, KM2-Zugriff über VBus.net sind:
  * Verbindungsgerät: DL3/DL2Plus oder DL2/KM2
  * Geräteadresse: vbus.net (oder vbus.io) – beide ohne http:// und Via-Kennung!
  * Über Tag: YourViaIdentifier (z. B. d1234567890) – ohne http:// davor oder .vbus.io dahinter

## Rechtliche Hinweise
RESOL, VBus, VBus.net, DeltaSol und andere sind Marken oder eingetragene Marken der RESOL - Elektronische Regelungen GmbH <https://www.resol.de/de>

Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.
Die Autoren werden in keiner Weise von der RESOL GmbH oder den damit verbundenen Tochtergesellschaften, Logos oder Marken unterstützt oder sind mit ihnen verbunden.

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.3.0 (2024-01-24) - 2024 maintenance release

* (pdbjjens) New: Use JSON config UI
* (pdbjjens) New: Support ioBroker discovery
* (pdbjjens) Change: node>=16, js-contoller>=4 and admin>=6 required
* (pdbjjens) Updated dependencies
* (pdbjjens) Fix: Set info.connection false when reconnecting

### 0.2.5 (2023-03-14)

* (pdbjjens) Updated dependencies
* (pdbjjens) Fix: reconnect handling for serial connections

### 0.2.4 (2023-03-01)

* (pdbjjens) Fix password check

### 0.2.3 (2023-02-27) - 2023 maintenance release

* (pdbjjens) Updated dependencies
* (pdbjjens) New: Use adapter-dev instead of gulp translate
* (pdbjjens) Fix: error handling for serial connections

### 0.2.2 (2022-02-11)

* Updated dependencies
* Compatibility check for js-controller 4.0
* Support for js-controller 1.x dropped

## License

MIT License

Copyright (c) 2024 Jens-Peter Jensen <jjensen@t-online.de>

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