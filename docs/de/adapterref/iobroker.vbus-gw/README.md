---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vbus-gw/README.md
title: ioBroker.vbus-gw
hash: Mo9ceBCnAjZAZM2zIb/j7WLcWOFtT5pVhkrECFDRqJc=
---
# ioBroker.vbus-gw

![NPM-Version](https://img.shields.io/npm/v/iobroker.vbus-gw.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/vbus-gw-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vbus-gw-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vbus-gw.svg)
![Test und Freigabe](https://github.com/pdbjjens/ioBroker.vbus-gw/workflows/Test%20and%20Release/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vbus-gw.svg?data=d,s)

![Logo](../../../en/adapterref/iobroker.vbus-gw/admin/vbus-gw.png)

## vbus-gw-Adapter für ioBroker

Ermöglicht den TCP-Zugriff auf serielle, auf VBus basierende Geräte.

Dieser ioBroker-Adapter basiert auf der Arbeit von Daniel Wippermann.\
&#x20;<https://github.com/danielwippermann/resol-vbus/tree/master/examples/serial-to-tcp>\
&#x20;Urheberrecht und Lizenz siehe Abschnitt „Lizenz“.

## Überblick

Es gibt zwei Arten von VBus-Hardwareadaptern:

- TCP-basiert: DL2, DL3, KM2, VBus/LAN
- Serielle Schnittstelle: VBus/USB, USB-Anschluss des DeltaSol SLT und anderer Controller

Dieser ioBroker-Adapter verbindet sich mit einem oder mehreren seriellen Hardwareadaptern und stellt diese über TCP bereit. Dies ermöglicht Folgendes:

- Die Übertragung von VBus-Daten über größere Entfernungen, als sie normalerweise über USB- oder serielle Schnittstellen möglich wären, wird dadurch ermöglicht.
- Zugriff auf serielle Schnittstellenadapter von Anwendungen aus, die nur TCP-basierte Adapter unterstützen

## Konfiguration

Konfigurierbare Elemente sind:

- Der TCP-Port, an dem der Dienst auf eingehende Verbindungen wartet.\
  &#x20;Standardmäßig wird Port 7053 verwendet, der nicht geändert werden sollte.

- Der HTTP-Port, an dem der Dienst auf Erkennungsanfragen wartet.\
  &#x20;Standardmäßig wird Port 80 verwendet, alternativ kann Port 3000 ausgewählt werden.

- Das Passwort des VBus-Gateways.\
  &#x20;Ermöglicht den Zugriff auf alle an den seriellen Port angeschlossenen VBus-Geräte. Standardwert ist „vbus“.

- Eine Liste der seriellen Schnittstellen, zu denen eine Verbindung hergestellt werden kann, mit den folgenden Parametern für jede serielle Schnittstelle:

- Kanal: Der VBus-Kanal, dem die serielle Schnittstelle zugewiesen ist.\
  &#x20;Wenn Sie nur eine einzige serielle Schnittstelle verwenden möchten, empfiehlt es sich, diese auf Kanal 0 zu konfigurieren, da die meisten Anwendungen standardmäßig versuchen, eine Verbindung über Kanal 0 herzustellen.

- Pfad: Der Pfad zum seriellen Port, wie z. B.\
  &#x20;'/dev/ttyUSB0' oder\
  &#x20;'/dev/serial/by-id/usb-Silicon\_Labs\_USB-Modul\_UO2102\_TDEB6I8DAVDLGAGC-if00-port0' oder\
  &#x20;'/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.4.1:1.0-port0' oder\
  &#x20;'COM5'

- Baudrate: Die Baudrate der seriellen Schnittstelle. Standardwert ist 9600, was normalerweise nicht geändert werden muss.

## Bekannte Probleme

- Dieser Adapter unterstützt aktuell bis zu 3 VBus-Geräte, die über serielle Schnittstellen angeschlossen sind.
- Die Passwörter für alle an die seriellen Schnittstellen angeschlossenen VBus-Geräte sind gleich.
- VBus.net-Geräte werden nicht emuliert. Der Befehl CONNECT (über das Tag) gibt +OK zurück, obwohl keine Verbindung hergestellt wird.
- Das Senden des DATA-Befehls bei Auswahl eines nicht existierenden Kanals gibt +OK zurück, schließt die Verbindung aber anschließend sofort wieder.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 0.3.2 (2026-03-04) - 2026H1 maintenance release

- (pdbjjens) **Changed**: node>=20, js-controller>=7.0.7 and admin>=7.7.22 required
- (pdbjjens) **Fixed**: update release-script (#149)

### 0.3.2-alpha.0 (2025-10-20)

- (pdbjjens) Fix: Removed NPM_TOKEN secret from repository

### 0.3.1-alpha.0 (2025-10-20)

- (pdbjjens) Fix: Add GitHub as npm Trusted Publisher
- (pdbjjens) Change: Update dependencies

### 0.3.0 (2025-08-29) - 2025H1 maintenance release

- (pdbjjens) Change: node>=20, js-controller>=7.0.7 and admin>=7.6.17 required
- (pdbjjens) Change: Cleanup devDependencies

### 0.2.0 (2025-01-29) - 2025H1 maintenance release

- (pdbjjens) Change: Migration to ESLint 9
- (pdbjjens) New: Accept serial port paths /dev/serial/by-id/usb-xxxxxxxxxxxxxxxxxxx or /dev/serial/by-path/platform-xxxxxxxxxxxxxxxxxxx
- (pdbjjens) Change: Responsive Design optimizations

[Older changelogs can be found there](https://github.com/pdbjjens/ioBroker.vbus-gw/blob/main/CHANGELOG_OLD.md)

## License

MIT License  
Copyright (c) 2025-2026 Jens-Peter Jensen <jjensen@t-online.de>  
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