---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vbus-gw/README.md
title: ioBroker.vbus-gw
hash: 5+k0/b+7tSVJOEGcpAJOPLMp7fD1L31P1oQFo5jJ4hU=
---
# IoBroker.vbus-gw
![Logo](../../../en/adapterref/iobroker.vbus-gw/admin/vbus-gw.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.vbus-gw.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/vbus-gw-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vbus-gw-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vbus-gw.svg)
![NPM](https://nodei.co/npm/iobroker.vbus-gw.png?downloads=true)

**Tests:** ![Test und Freigabe](https://github.com/pdbjjens/ioBroker.vbus-gw/workflows/Test%20and%20Release/badge.svg)

## Vbus-gw-Adapter für ioBroker
Ermöglicht TCP-Zugriff auf serielle Port-basierte VBus-Geräte

Dieser ioBroker-Adapter basiert auf der Arbeit von Daniel Wippermann.
<https://github.com/danielwippermann/resol-vbus/tree/master/examples/serial-to-tcp> Urheberrecht und Lizenz siehe Abschnitt „Lizenz“

## Überblick
Es gibt zwei Arten von VBus-Hardwareadaptern:

- TCP-basiert: DL2, DL3, KM2, VBus/LAN
- Basierend auf seriellem Anschluss: VBus/USB, USB-Anschluss von DeltaSol SLT und anderen Controllern

Dieser ioBroker-Adapter stellt eine Verbindung zu einem oder mehreren seriellen Port-basierten Hardwareadaptern her und stellt diese über TCP zur Verfügung. Dies erlaubt:

- Übertragung von VBus-Daten über größere Entfernungen, als USB- oder serielle Anschlüsse normalerweise zulassen würden
- Zugriff auf auf seriellen Ports basierende Adapter von Anwendungen aus, die nur TCP-basierte Adapter unterstützen

## Aufbau
Konfigurierbare Elemente sind:

– Der TCP-Port, an dem der Dienst auf eingehende Verbindungen lauscht.

Der Standardport ist 7053 und sollte nicht geändert werden.

– Der HTTP-Port, an dem der Dienst auf Erkennungsanfragen lauscht.

Standardmäßig ist Port: 80, alternativ kann Port 3000 ausgewählt werden.

- Das Passwort des VBus-Gateways.

Ermöglicht den Zugriff auf alle über die serielle Schnittstelle angeschlossenen VBus-Geräte. Der Standardwert ist „vbus“.

– Eine Liste der seriellen Ports, zu denen eine Verbindung hergestellt werden soll, mit den folgenden Parametern für jeden seriellen Port:

- Kanal: Der Vbus-Kanal, dem der serielle Port zugewiesen ist.

Wenn Sie nur eine Verbindung zu einem einzigen seriellen Port herstellen möchten, wird empfohlen, diesen für die Verwendung von Kanal 0 zu konfigurieren, da die meisten Anwendungen standardmäßig versuchen, diesen Kanal 0 zu verbinden.

- Pfad: Der Pfad zur seriellen Schnittstelle wie „/dev/tty.usbmodem141301“ oder „COM5“
- Baudrate: Die Baudrate der seriellen Schnittstelle. Der Standardwert ist 9600, der normalerweise nicht geändert werden muss.

## Bekannte Probleme
- Dieser Adapter unterstützt derzeit bis zu 3 VBus-Geräte, die über serielle Anschlüsse verbunden sind.
- Die Passwörter für alle an die seriellen Ports angeschlossenen VBuss sind gleich.
- Mit VBus.net verbundene Geräte werden nicht emuliert. Das Senden des Befehls CONNECT (über Tag) gibt +OK zurück, obwohl keine Verbindung hergestellt wurde.
- Das Senden des DATA-Befehls bei ausgewähltem nicht vorhandenen Kanal gibt +OK zurück, schließt die Verbindung jedoch sofort danach.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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

### 0.0.4 (2023-10-03)

- (pdbjjens) New: Selectable discovery port
- (pdbjjens) New: Check for default password
- (pdbjjens) New: support for up to 3 serial ports

### 0.0.3 (2023-09-21)

- (pdbjjens) Fix: Disable SENTRY

## License

MIT License  
Copyright (c) 2024 Jens-Peter Jensen <jjensen@t-online.de>  
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