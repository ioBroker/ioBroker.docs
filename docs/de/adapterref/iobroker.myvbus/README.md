---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: YQKOpnnL0HSV9Y+Az1OkNKf5kj9pGCxDfv7pDYuzOjg=
---
# ioBroker.myvbus

![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/myvbus-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/myvbus-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.myvbus.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.myvbus/workflows/Test%20and%20Release/badge.svg)
![NPM](https://nodei.co/npm/iobroker.myvbus.svg?data=d,s)

![Logo](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

## ioBroker-Adapter für Resol VBus

Dieser Adapter verbindet ioBroker mit verschiedenen VBus-basierten Geräten mithilfe von resol-vbus, einer JavaScript-Bibliothek zur Erfassung von RESOL VBus-Daten, die von Daniel Wippermann bereitgestellt wird.

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

## Merkmale

- Ermöglicht das Auslesen der Messdaten von verschiedenen RESOL(R) VBus(R) Geräten - vorzugsweise Solar- und Systemreglern der DeltaSol(R) Serie einschließlich eingebauter Wärmemengenzähler (HQM) - unter Verwendung von DL3- oder DL2-Datenloggern, KM2-Kommunikationsmodulen, VBus/LAN-Schnittstellenadaptern oder seriellen/LAN-Gateways lokal über TCP/IP.
- Der Gerätezugriff über den seriellen Schnittstellenadapter VBus/USB oder über VBus.net(R) mit DLx/KMx wird ebenfalls unterstützt.
- Verarbeitet Live-VBus-Datenströme und stellt sie als ioBroker-Zustände zur Verfügung.
- Die Werte werden in einem konfigurierbaren Zyklus aktualisiert.
- Das Lesen oder Festlegen der VBus-Gerätekonfigurationsparameter wird nicht unterstützt. Verwenden Sie hierfür die von Resol bereitgestellten Tools, z. B. über VBus.net oder das Parametrierungstool RPT.\
  &#x20;Eine abgeleitete Version dieses Adapters, die die Steuerung von VBus-Geräten unterstützt, ist unter <https://github.com/Grizzelbee/ioBroker.resol> verfügbar.
- Das Auslesen des DL3-Kanals 0 (Sensoren, die direkt mit dem DL3-Gerät verbunden sind) wird aufgrund von Einschränkungen der DL3-Schnittstelle nicht unterstützt.

## Konfigurationshinweise

- Der Verbindungsgerätetyp, z. B. VBus/LAN oder DL2, muss explizit ausgewählt werden, andernfalls kann keine Verbindung hergestellt werden.
- TCP-Verbindungsport: Nur relevanter oder LAN-basierter Zugriff. Die Standardeinstellung 7053 sollte nicht geändert werden.
- Gerätepasswort: Das Passwort, das Sie in Ihrem Verbindungsgerät festgelegt haben (Standard: vbus).
- DL3-Kanal: Nur relevant für DL3/DL2Plus - für alle anderen Anschlussgeräte auf „Keine“ belassen.\
  &#x20;(Zulässige Werte: 1-6, Kanal 0 kann nicht ausgelesen werden)
- Via Tag: Nur relevant für DL3-, DL2- und KM2-Zugriff über VBus.net - Feld für alle anderen Verbindungsgeräte leer lassen.
- Aktualisierungsintervall: Die Zeit zwischen den Aktualisierungen der Messwerte (Standardwert 30 Sekunden)
- Die korrekten Einstellungen für den direkten seriellen Schnittstellenzugriff über VBus/USB lauten:
  - Anschlussgerät: VBus/USB
  - Geräteadresse: Der Pfad zum seriellen Port, an den der serielle Schnittstellenadapter angeschlossen ist, wie z. B.\
    &#x20;'/dev/ttyUSB0' oder\
    &#x20;'/dev/serial/by-id/usb-Silicon\_Labs\_USB-Modul\_UO2102\_TDEB6I8DAVDLGAGC-if00-port0' oder\
    &#x20;'/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.4.1:1.0-port0' für Linux oder\
    &#x20;'COM5' für Windows-basierte ioBroker-Plattformen
- Die korrekten Einstellungen für den direkten LAN-Zugriff für VBus/LAN, DL3, DL2, KM2 sind:
  - Anschlussgerät: VBus/LAN oder KM2/DL2 oder DL3/DL2Plus
  - Geräteadresse: IP-Adresse (z. B. 192.168.178.188) oder vollqualifizierter Hostname (z. B. myKM2.fritz.box)
- Die korrekten Einstellungen für den DL3-, DL2- und KM2-Zugriff über VBus.net lauten:
  - Anschlussgerät: DL3/DL2Plus oder DL2/KM2
  - Geräteadresse: vbus.net (oder vbus.io) - beide ohne http\:// und Via-Kennung!
  - Via-Tag: IhreVia-Kennung (z. B. d1234567890) – ohne „http\://“ davor oder „.vbus.io“ dahinter.

## Rechtliche Hinweise

RESOL, VBus, VBus.net, DeltaSol und andere sind Marken oder eingetragene Marken der RESOL - Elektronische Regelungen GmbH [https://www.resol.de/de](https://www.resol.de/en)

Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber. Die Autoren stehen in keiner Verbindung zu RESOL GmbH oder deren Tochtergesellschaften, Logos oder Marken und werden von diesen auch nicht unterstützt.

## Mitwirkende

- DutchmanNL
- grizzelbee <hanjo@hingsen.de>

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.6.1 (2026-03-03) - 2026H1 maintenance release

* (copilot) Adapter requires admin >= 7.7.22 now
* (pdbjjens) **Fixed**: update release-script (#786)

### 0.6.1-alpha.0 (2025-10-21)

* (pdbjjens) Fix: Add GitHub as npm Trusted Publisher
* (pdbjjens) Change: Update dependencies
* (pdbjjens) Change: Update npm badge

### 0.6.0 (2025-08-29) - 2025H2 maintenance release

* (pdbjjens) Change: node>=20, js-controller>=7.0.7 and admin>=7.6.17 required
* (pdbjjens) Change: Cleanup devDependencies

### 0.5.1 (2025-02-15)

* (pdbjjens) Fix: Removed attribute "contributor" from package.json (#718)

### 0.5.0 (2025-01-30) - 2025H1 maintenance release

* (pdbjjens) New: Accept serial port paths /dev/serial/by-id/usb-xxxxxxxxxxxxxxxxxxx or /dev/serial/by-path/platform-xxxxxxxxxxxxxxxxxxx
* (pdbjjens) Change: Migration to ESLint 9
* (simatec) Responsive Design added

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.myvbus/blob/master/CHANGELOG_OLD.md)

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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