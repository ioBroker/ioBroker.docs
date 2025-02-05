---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: ZiVALRmHECLNqlEbG+VupRJUNFp71+MElfgIjLt0HE4=
---
# IoBroker.myvbus
![Logo](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/myvbus-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/myvbus-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.myvbus.svg)
![NPM](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)

**Tests:** ![Testen und Freigeben](https://github.com/iobroker-community-adapters/iobroker.myvbus/workflows/Test%20and%20Release/badge.svg)

## IoBroker-Adapter für Resol VBus
Dieser Adapter verbindet ioBroker mit verschiedenen VBus-basierten Geräten unter Verwendung von resol-vbus, einer JavaScript-Bibliothek zum Erfassen von RESOL VBus-Daten, bereitgestellt von Daniel Wippermann.

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

## Merkmale
* Ermöglicht das Auslesen der Messdaten verschiedener RESOL(R) VBus(R)-Geräte - vorzugsweise Solar- und Systemregler der DeltaSol(R)-Reihe inkl. eingebautem Wärmemengenzähler (HQM) - mittels DL3- oder DL2-Datenloggern, KM2-Kommunikationsmodulen, VBus/LAN-Schnittstellenadaptern oder Seriell/LAN-Gateways lokal über TCP/IP.
* Der Gerätezugriff über den seriellen Schnittstellenadapter VBus/USB oder über VBus.net(R) mit DLx/KMx wird ebenfalls unterstützt.
* Verarbeitet Live-VBus-Datenströme und stellt sie als ioBroker-Status zur Verfügung.
* Werte werden mit einer konfigurierbaren Zykluszeit aktualisiert.
* Das Lesen oder Setzen der VBus-Gerätekonfigurationsparameter wird nicht unterstützt. Hierzu sollten die von Resol bereitgestellten Tools verwendet werden, z.B. über VBus.net oder das Parametriertool RPT.

Eine abgeleitete Version dieses Adapters, die die Steuerung von VBus-Geräten unterstützt, ist verfügbar unter <https://github.com/Grizzelbee/ioBroker.resol>

* Das Lesen von DL3-Kanal 0 (Sensoren, die direkt an das DL3-Gerät angeschlossen sind) wird aufgrund von Einschränkungen der DL3-Schnittstelle nicht unterstützt.

## Konfigurationshinweise
* Der Verbindungsgerätetyp z.B. VBus/LAN oder DL2. Muss explizit ausgewählt werden, sonst kommt keine Verbindung zustande.
* TCP-Verbindungsport: Nur relevanter oder LAN-basierter Zugriff. Die Standardeinstellung 7053 sollte nicht geändert werden
* Gerätepasswort: Das Passwort, welches Sie in Ihrem Anschlussgerät eingestellt haben (Standard: vbus)
* DL3-Kanal: Nur für DL3/DL2Plus relevant – für alle anderen Anschlussgeräte auf „Keine“ belassen.

(erlaubte Werte: 1-6, Kanal 0 kann nicht ausgelesen werden)

* Via-Tag: Nur relevant für DL3-, DL2-, KM2-Zugriff über VBus.net – für alle anderen Anschlussgeräte leer lassen.
* Aktualisierungsintervall: Die Zeitspanne zwischen den Aktualisierungen der Messwerte (Standard 30s)
* Die richtigen Einstellungen für den direkten seriellen Schnittstellenzugriff für VBus/USB sind:
* Anschlussgerät: VBus/USB
* Geräteadresse: Der Pfad zum seriellen Port, an den der serielle Schnittstellenadapter angeschlossen ist, wie

'/dev/ttyUSB0' oder '/dev/serial/by-id/usb-Silicon_Labs_USB-Modul_UO2102_TDEB6I8DAVDLGAGC-if00-port0' oder '/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.4.1:1.0-port0' für Linux oder 'COM5' für Windows-basierte ioBroker-Plattformen

* Die richtigen Einstellungen für den direkten LAN-Zugriff für VBus/LAN, DL3, DL2, KM2 sind:
* Anschlussgerät: VBus/LAN oder KM2/DL2 oder DL3/DL2Plus
* Geräteadresse: IP-Adresse (z. B. 192.168.178.188) oder FullyQualifiedHostName (z. B. myKM2.fritz.box)
* Die richtigen Einstellungen für den DL3, DL2, KM2 Zugriff über VBus.net sind:
* Anschlussgerät: DL3/DL2Plus oder DL2/KM2
* Geräteadresse: vbus.net (oder vbus.io) – beide ohne http:// und Via-Kennung!
* Via Tag: YourViaIdentifier (z.B. d1234567890) - ohne http:// davor oder .vbus.io dahinter

## Rechtliche Hinweise
RESOL, VBus, VBus.net, DeltaSol und andere sind Marken oder eingetragene Marken der RESOL - Elektronische Regelungen GmbH <https://www.resol.de/de>

Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.
Die Autoren werden in keiner Weise von der RESOL GmbH oder verbundenen Tochterunternehmen, Logos oder Marken unterstützt oder sind mit diesen verbunden.

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.5.0 (2025-01-30) - 2025H1 maintenance release

* (pdbjjens) New: Accept serial port paths /dev/serial/by-id/usb-xxxxxxxxxxxxxxxxxxx or /dev/serial/by-path/platform-xxxxxxxxxxxxxxxxxxx
* (pdbjjens) Change: Migration to ESLint 9
* (simatec) Responsive Design added

### 0.4.0 (2024-08-13) - 2024H2 maintenance release

* (pdbjjens) Change: node>=18, js-contoller>=5 and admin>=6 required
* (pdbjjens) Change: Removed .npmignore
* (pdbjjens) New: Updated dependencies

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

## License

MIT License

Copyright (c) 2025 Jens-Peter Jensen <jjensen@t-online.de>

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