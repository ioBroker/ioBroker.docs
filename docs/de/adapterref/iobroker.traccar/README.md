---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.traccar/README.md
title: ioBroker.traccar
hash: KzFo/Cnh52M/l0QGTW7ilGEg965WWa1XO0TrbNyGHPg=
---
![Logo](../../../en/adapterref/iobroker.traccar/admin/traccar.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.traccar.svg?dummy=unused)
![Downloads](https://img.shields.io/npm/dm/iobroker.traccar.svg?dummy=unused)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/traccar-installed.svg?dummy=unused)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/traccar-stable.svg?dummy=unused)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/traccar/svg-badge.svg)
![NPM](https://nodei.co/npm/iobroker.traccar.png?downloads=true)

# ioBroker.traccar

## Traccar-Adapter für ioBroker

Dieser Adapter importiert in Echtzeit die Positionsdaten und die erweiterten Daten von [Traccar](https://www.traccar.org) und stellt sie in ioBroker zur Verfügung.

## Konfiguration

1. Erstellen Sie eine neue Instanz des Adapters.
2. Geben Sie die URL/IP-Adresse und den Port vom Traccar-Server ein.
3. Benutzername und Passwort konfigurieren
4. Einstellungen speichern
5. Viel Spaß :)

Das Aktualisierungsintervall wird in Sekunden angegeben (Standard: 120). Der Adapter verarbeitet außerdem weiterhin Live-Aktualisierungen, die über den Traccar WebSocket empfangen werden.

## Changelog
### 1.2.4 (2026-11-08)
* (arteck) fix geofence traccar version > 5.8 in some situations

### 1.2.2 (2026-10-17)
* (arteck) Dependencies have been updated
* (arteck) add geofence state
* (arteck) auto server version identification

### 1.2.1 (2026-08-06)
+ (copilot) Adapter requires node.js >= 22 now
* (arteck) add version check re-runs every 24 hours
* (arteck) Dependencies have been updated

### 1.2.0 (2026-04-23)
* (arteck) refactoring

### 1.1.7 (2026-04-14)
* (arteck) Dependencies have been updated

## License

MIT License

Copyright (c) 2024-2026  Arthur Rupp <arteck@outlook.com>,

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