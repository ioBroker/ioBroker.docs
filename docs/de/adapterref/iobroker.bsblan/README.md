---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bsblan/README.md
title: ioBroker.bsblan
hash: aqqhGzhfFCM2Aptm7WyQ/ZDbNPadxuZkMPh5Dd1JyLU=
---
![Logo](../../../en/adapterref/iobroker.bsblan/admin/bsblan.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.bsblan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bsblan.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/hacki11/iobroker.bsblan.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/hacki11/ioBroker.bsblan/badge.svg)
![NPM](https://nodei.co/npm/iobroker.bsblan.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/hacki11/ioBroker.bsblan/master.svg)

# IoBroker.bsblan
## Bsb_lan-Adapter für ioBroker
Dieser Adapter verbindet den [BSB_LAN-Schnittstelle](https://github.com/fredlcore/bsb_lan) mit ioBroker.
Die BSB_LAN-Schnittstelle bringt den BSB (Boiler System Bus) ins LAN. Dieser Adapter verbindet ihn mit ioBroker.

[BSB_LAN Interface Benutzerhandbuch](https://docs.bsb-lan.de)

## Unterstützte Geräte
- BSB/LPB-kompatible Geräte (z. B. Brötje, Elco, MHG, Fujitsu)
- Einzelheiten finden Sie unter: [Unterstützte Geräte](https://docs.bsb-lan.de/supported_heating_systems.html)

## Verwendung
- BSB_LAN-Schnittstelle ist aktiv
- Adapter installieren
- Konfigurieren
- IP
- Benutzername und Passwort (sofern Basisauthentifizierung aktiviert ist)
- Polling-Intervall in Sekunden (10 ist das Minimum)
- IDs die abgefragt oder geändert werden sollen (durch Komma oder Zeilenumbruch getrennt, verfügbare IDs finden Sie im Webinterface von BSB_LAN)

## Werte schreiben
- Aktivieren Sie alle oder bestimmte IDs als beschreibbar in
* en: [Nur-Lese- oder Lese-/Schreibzugriff](https://1coderookie.github.io/BSB-LPB-LAN_EN/chap05.html)
  * de: [Zugriff des Adapters auf den Regler](https://1coderookie.github.io/BSB-LPB-LAN/kap05.html)
* für alle: `bsb_lan_config.h: #define DEFAULT_FLAG 0`
* kompilieren & hochladen
- IDs hinzufügen, die in die Adapterinstanzkonfiguration geschrieben werden sollen (siehe Verwendung)
- Zahlen, Enums und hr:min-Typen sind jetzt beschreibbar (natürlich können nur beschreibbare IDs geschrieben werden)

## Credits
- Symbol erstellt von [Freepik](https://www.freepik.com/home) von www.flaticon.com

## Changelog
### 0.3.4
* Fix order of individual destinations (They need to be queried sorted by destination, starting with default destination)
### 0.3.3
* Support for individual destinations e.g. `710!7`
### 0.3.2
* Support dot-separated parameter ids like `20200.0`, `20200.1`. `.0` is omitted from object view as it is also omitted in the bsb_lan response.

### 0.3.1
* Code Quality Improvements
### 0.3.0
* Add support for BSB_LAN 2.x
* BREAKING: Names of 24h Average values changed (e.g. Außentemperatur_(8700) => 24h Durchschnittswert. Außentemperatur_(20050))


### 0.2.2
* Replace invalid characters: https://github.com/ioBroker/ioBroker.js-controller/issues/198

### 0.2.1
* Fix write issue with new bsb_lan2 firmware

### 0.2.0
* Add 24h averages (needs BSB_LAN FW 1.1)

### 0.1.2
* Support INF interface for setting external room temperatures

### 0.1.1
* Support unit micro
* Made robust against invalid or non existing IDs

### 0.1.0
* Support write access

### 0.0.3
* dynamically create states
* IDs without whitespaces
* add textarea for configuration

### 0.0.1
* (hacki11) initial release

## License
MIT License

Copyright (c) 2024 hacki11

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