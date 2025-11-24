---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cmicoe/README.md
title: ioBroker.cmicoe
hash: GgOdBJHikNsOHVmqZN1dQ/hCzXa6H+gkuRZOxCyJ3T8=
---
![Logo](../../../en/adapterref/iobroker.cmicoe/admin/cmicoe.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.cmicoe.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cmicoe.svg)
![Anzahl der Installationen](https://iobroker.live/badges/cmicoe-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/cmicoe-stable.svg)
![NPM](https://nodei.co/npm/iobroker.cmicoe.png?downloads=true)

# IoBroker.cmicoe
**Tests:** ![Test und Freigabe](https://github.com/FreDeko06/ioBroker.cmicoe/workflows/Test%20and%20Release/badge.svg)

## Cmicoe-Adapter für ioBroker
Adapter zur Kommunikation mit [CMI von Technische Alternative über CoE](https://www.ta.co.at/x2-bedienung-schnittstellen/cmi)

### HAFTUNGSAUSSCHLUSS
Diese Anwendung ist ein unabhängiges Produkt und steht in keiner Verbindung zu Technische Alternative. Sie wird weder von Technische Alternative unterstützt noch gesponsert. Alle Marken, Logos und Markennamen sind Eigentum ihrer jeweiligen Inhaber.
Diese Anwendung ist für die Verwendung mit dem C.M.I. konzipiert, jedoch kein offizielles Produkt von Technische Alternative. Die Kompatibilität mit allen Geräteversionen kann nicht garantiert werden.

## CMI-Einrichtung
### CoE V2 aktivieren
Gehen Sie in der CMI-Weboberfläche zu Einstellungen > CAN und wählen Sie `CoE V2 (4byte)` als CoE-Version aus.

### Ausgabe konfigurieren
Gehen Sie in der CMI-Weboberfläche zu Einstellungen > Ausgänge > CoE und fügen Sie einen analogen oder digitalen Ausgang mit folgenden Einstellungen hinzu:

#### IP
Geben Sie die IP-Adresse des iobroker-Servers ein.

#### Knotennummer / Netzwerkausgabe
Geben Sie dieselbe Zahl ein, die Sie in den Eingangseinstellungen des Adapters angegeben haben.

## Adapter einrichten
### Einstellungen
#### Lokale IP
Die IP-Adresse, iobroker lauscht auf CoE-Pakete von C.M.I.

#### Lokaler Hafen
Der Port iobroker empfängt CoE-Pakete vom CMI.

Standardmäßig sendet der CMI alle CoEv2-Pakete über Port 5442. **Dieser Adapter unterstützt ausschließlich CoE V2!**

#### CMI-IP-Adresse
Die IP-Adresse, an die iobroker die CoE-Pakete sendet

#### CMI-Port
Der Port iobroker sendet die CoE-Pakete an

#### Sendeintervall
Das Intervall in Sekunden, in dem alle Ausgänge an das CMI gesendet werden.

#### Wechselgeld senden
Wenn diese Option aktiviert ist, sendet der Adapter auch dann eine Ausgabe, wenn er sich ändert.

## Changelog
### 1.2.3 (2025-10-25)
* migrate to npm trusted publishing

### 1.2.2 (2025-10-18)
* added export/import to config tables

### 1.2.1 (2025-10-12)
* Bump @types/node to 24.7.2
* Bump @alcalzone/release-script-plugin-license to 4.0.0
* Bump rimraf to 6.0.1
* updated other dependencies
* fixed forbidden chars in ids

### 1.2.0 (2025-10-11)
* used iobroker prettier config
* changed title
* improved state roles and attributes
* limited send interval to 1 day
* fixed deletion of empty node channels
* removed old node string config

### 1.1.3 (2025-09-23)
* used @iobroker/eslint
* changed .vscode schema
* updated adapter-core dependency

### 1.1.2 (2025-09-23)
* fixed delete unused states

### 1.1.1 (2025-09-23)
* added logo
* upgrade to node 20
* updated dependencies

### 1.1.0 (2025-08-18)
* added units from https://fci.ta.co.at/docu/developer
* removed factors, decimals are computed automatically from the unit
* fixed problems with negative numbers

### 1.0.5 (2025-08-14)
* fixed layout

### 1.0.4 (2025-08-14)
* update dependencies

### 1.0.3 (2025-08-14)
* added factors to inputs/outputs settings
* update README

### 1.0.2 (2025-08-13)
* fixed degree, cubic meter symbol

### 1.0.1 (2025-08-13)
* fixed adapter crash on first start

### 1.0.0 (2025-08-13)
* improved config ui
* added support for units
* added support for names and descriptions for inputs/outputs
* BREAKING: state names now contain names from config

### 0.3.1 (2025-02-18)
* fix: negative values crashed adapter

### 0.3.0 (2025-02-17)
* added support for multiple messages in one packet (receiving and sending)
* added error handling

### 0.2.0 (2025-02-17)
* created bind and port options

### 0.1.2 (2025-02-17)
* downgrade to node 18
* create channel/devices before states
* performance improvements

### 0.1.1 (2025-02-16)
* improved log messages
* added log message if address/ip are already in use (probably two instances started)

### 0.1.0 (2025-02-16)
* (FreDeko) initial release

## License
MIT License

Copyright (c) 2025 FreDeko <freddegenkolb@gmail.com>

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