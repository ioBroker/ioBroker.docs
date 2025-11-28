---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.freeair/README.md
title: ioBroker.freeair
hash: 071HoZn58gexhUgL6j0Qf1IiGB9GHN+qih2FWHUiBS8=
---
![Logo](../../../en/adapterref/iobroker.freeair/admin/freeair.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.freeair.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.freeair.svg)
![Anzahl der Installationen](https://iobroker.live/badges/freeair-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/freeair-stable.svg)
![NPM](https://nodei.co/npm/iobroker.freeair.png?downloads=true)

# IoBroker.freeair
**Tests:** ![Testen und Freigeben](https://github.com/Scrounger/ioBroker.freeair/workflows/Test%20and%20Release/badge.svg)

## Freeair-Adapter für ioBroker
lokale Verbindung zu Ihrem [BluMartin FreeAir 100](https://blumartin.de/wohnraumlueftung-freeair-dezentral-mit-waermerueckgewinnung/) Lüftungssystem

## Einstellungen
### FreeAir 100
![Bildinformationen](../../../en/adapterref/iobroker.freeair/doc/freeair_config.png)

- Fügen Sie unter „bluHome“ die IP-Adresse Ihres ioBrokers hinzu

### Adapter
![Bildinformationen](../../../en/adapterref/iobroker.freeair/doc/adapter_config.png)

#### Servereinstellungen
- Adapteradresse: die IP-Adresse Ihres ioBrokers
- Port: Der Standardport ist 80, da die FreeAir 100-Geräte ihre Daten an Port 80 senden<br> **_HINWEIS:_** Sie können den Port ändern, z. B. indem Sie eine DNAT-Regel in Ihrem Gateway konfigurieren
- Alive-Check-Intervall: Wenn in diesem Intervall keine Daten empfangen werden, werden Geräte als offline angezeigt

#### Geräteanmeldeinformationen
- Fügen Sie die Seriennummer Ihres FreeAir 100-Geräts hinzu
- Fügen Sie das Passwort hinzu, das Sie in Ihrem FreeAir 100-Gerät festgelegt haben

#### Datenpunkte Blacklist / Whitelist
- Datenpunkte auf die schwarze oder weiße Liste setzen.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.6 (2025-10-19)

- (Scrounger) auto translation bug fix
- (Scrounger) bug fixes

### 1.0.5 (2025-09-30)

- (Scrounger) dependencies updated
- (Scrounger) bug fixes

### 1.0.4 (2025-09-27)

- (Scrounger) bug fixes

### 1.0.3 (2025-09-21)

- (Scrounger) if only one devices is configured, show device online status as adapter status
- (Scrounger) dependencies updated
- (Scrounger) bug fixes

### 1.0.2 (2025-09-11)

- (Scrounger) automatic role assignment implemented
- (Scrounger) code optimizations
- (Scrounger) bug fixes

### 1.0.1 (2025-09-06)

- (Scrounger) bug fixes

### 1.0.0 (2025-09-03)

- (Scrounger) latest fun

### 1.0.0-beta.1 (2025-08-31)

- (Scrounger) i18n translation
- (Scrounger) dependencies updated

### 1.0.0-beta.0 (2025-08-31)

- (Scrounger) initial release

## License

MIT License

Copyright (c) 2025 Scrounger <scrounger@gmx.net>

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