---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.victron-cerbo/README.md
title: ioBroker Victron Cerbo
hash: 8lGajSv+FK+1M5bIPQWcSTn8vbnGvLbpVix9DTk4ZpI=
---
![Logo](../../../en/adapterref/iobroker.victron-cerbo/admin/victron-cerbo.png)

![Anzahl der Installationen](http://iobroker.live/badges/victron-cerbo-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.victron-cerbo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.victron-cerbo.svg)

# IoBroker Victron Cerbo
![Test und Freigabe](https://github.com/ioBroker/ioBroker.victron-cerbo/workflows/Test%20and%20Release/badge.svg)

## Beschreibung
Dieser Adapter verbindet Victron Cerbo GX-Geräte über MQTT mit ioBroker.

Der Victron Cerbo GX ist eine fortschrittliche Überwachungs- und Steuerungszentrale für Victron Energy-Systeme, einschließlich Solarladegeräte, Batteriemonitore, Wechselrichter und andere Energiekomponenten.

## Konfiguration
- **IP**: IP-Adresse des MQTT-Brokers
- **Port**: MQTT-Broker-Port (Standard: 1883)
- **Benutzername/Passwort**: MQTT-Authentifizierungsdaten
- **Client-Timeout**: Timeout in Sekunden für MQTT-Clientverbindungen

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 0.2.1 (2026-04-12)
* (@GermanBluefox) Implemented the tests

### 0.1.0 (2026-04-11)
* (@GermanBluefox) Corrected some states

### 0.0.1
* Initial release

## License

The MIT License (MIT)

Copyright (c) 2026, Denis Haev <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.