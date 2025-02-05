---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vbus-gw/README.md
title: ioBroker.vbus-gw
hash: 27jJv88V7+juZCeU0sCVgDG033Cz3ejMB0Xg5dK7yeI=
---
# IoBroker.vbus-gw
![Logo](../../../en/adapterref/iobroker.vbus-gw/admin/vbus-gw.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.vbus-gw.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/vbus-gw-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vbus-gw-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vbus-gw.svg)
![NPM](https://nodei.co/npm/iobroker.vbus-gw.png?downloads=true)

**Tests:** ![Testen und Freigeben](https://github.com/pdbjjens/ioBroker.vbus-gw/workflows/Test%20and%20Release/badge.svg)

## Vbus-gw-Adapter für ioBroker
Ermöglicht den TCP-Zugriff auf VBus-Geräte mit serieller Schnittstelle

Dieser ioBroker-Adapter basiert auf der Arbeit von Daniel Wippermann.
<https://github.com/danielwippermann/resol-vbus/tree/master/examples/serial-to-tcp> Copyright und Lizenz siehe Abschnitt „Lizenz“

## Übersicht
Es gibt zwei Arten von VBus-Hardwareadaptern:

- TCP-basiert: DL2, DL3, KM2, VBus/LAN
- Serieller Port basierend: VBus/USB, USB-Port von DeltaSol SLT und anderen Controllern

Dieser ioBroker-Adapter verbindet sich mit einem oder mehreren seriellen Hardwareadaptern und stellt sie über TCP bereit. Dies ermöglicht:

- Übertragung von VBus-Daten über größere Entfernungen als es USB- oder serielle Schnittstellen normalerweise erlauben würden
- Zugriff auf serielle Adapter aus Anwendungen, die nur TCP-basierte Adapter unterstützen

## Konfiguration
Konfigurierbare Elemente sind:

– Der TCP-Port, auf dem der Dienst auf eingehende Verbindungen wartet.

Standardmäßig ist Port 7053 eingestellt, dieser sollte nicht geändert werden.

- Der HTTP-Port, auf dem der Dienst auf Erkennungsanforderungen wartet.

Standardmäßig ist Port: 80, alternativ kann auch Port 3000 gewählt werden.

- Das Passwort des VBus-Gateways.

Ermöglicht den Zugriff auf alle über die serielle Schnittstelle angeschlossenen VBus-Geräte. Standard ist „vbus“.

- Eine Liste der seriellen Ports, mit denen eine Verbindung hergestellt werden kann, mit den folgenden Parametern für jeden seriellen Port:

- Kanal: Der VBus-Kanal, dem der serielle Port zugewiesen ist.

Wenn Sie nur eine Verbindung zu einem einzigen seriellen Port herstellen möchten, wird empfohlen, diesen für die Verwendung von Kanal 0 zu konfigurieren, da die meisten Anwendungen standardmäßig versuchen, eine Verbindung zu diesem Kanal 0 herzustellen.

- Pfad: Der Pfad zum seriellen Port wie

„/dev/ttyUSB0“ oder „/dev/serial/by-id/usb-Silicon_Labs_USB-Modul_UO2102_TDEB6I8DAVDLGAGC-if00-port0“ oder „/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.4.1:1.0-port0“ oder „COM5“

- Baudrate: Die Baudrate der seriellen Schnittstelle. Der Standardwert ist 9600 und muss normalerweise nicht geändert werden.

## Bekannte Probleme
- Dieser Adapter unterstützt derzeit bis zu 3 über serielle Schnittstellen angeschlossene VBus-Geräte.
- Die Passwörter für alle an die seriellen Schnittstellen angeschlossenen VBusse sind gleich.
- An VBus.net angeschlossene Geräte werden nicht emuliert. Das Senden des Befehls CONNECT (via Tag) gibt +OK zurück, obwohl keine Verbindung hergestellt wurde.
- Das Senden des DATA-Befehls mit einem ausgewählten nicht vorhandenen Kanal gibt +OK zurück, schließt die Verbindung anschließend jedoch sofort.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.0 (2025-01-29) - 2025H1 maintenance release

- (pdbjjens) Change: Migration to ESLint 9
- (pdbjjens) New: Accept serial port paths /dev/serial/by-id/usb-xxxxxxxxxxxxxxxxxxx or /dev/serial/by-path/platform-xxxxxxxxxxxxxxxxxxx
- (pdbjjens) Change: Responsive Design optimizations

### 0.1.0 (2024-08-13) - 2024H2 maintenance release

- (pdbjjens) Change: node>=18, js-contoller>=5 and admin>=6 required
- (pdbjjens) New: Updated dependencies
- (pdbjjens) New: Ensure that vbus-gw is started before myvbus or resol

### 0.0.7 (2024-02-24)

- (pdbjjens) Fix: VBus write fixed
- (pdbjjens) Fix: Password logging removed

### 0.0.6 (2024-01-23)

- (pdbjjens) New: Use resol-vbus v0.29.0
- (pdbjjens) New: Logging of denied connection events

### 0.0.5 (2024-01-21)

- (pdbjjens) New: Use resol-vbus v0.28.0
- (pdbjjens) New: Configurable password for the VBus gateway
- (pdbjjens) Fix: Channel forwarding to the requesting connections only

## License

MIT License  
Copyright (c) 2025 Jens-Peter Jensen <jjensen@t-online.de>  
Copyright (c) 2013-present, Daniel Wippermann.

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