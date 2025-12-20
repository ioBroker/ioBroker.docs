---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.serial-gps/README.md
title: ioBroker GPS (seriell/USB) Adapter
hash: irZI9P1HaevB1JfqsORV18PYiRQa6GtdObs6ErX+dS8=
---
![Anzahl der Installationen](http://iobroker.live/badges/serial-gps-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.serial-gps.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.serial-gps.svg)

<img src="admin/serial-gps.svg" style="width: 100px;"/>

# IoBroker GPS (seriell/USB) Adapter
![Test und Freigabe](https://github.com/ioBroker/ioBroker.serial-gps/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/serial-gps/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Dieser Adapter liest GPS-Daten von einem seriellen oder USB-GPS-Gerät und stellt sie in ioBroker zur Verfügung.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Erste Schritte
Schließen Sie einen USB- oder seriellen GPS-Empfänger an Ihr ioBroker-Hostsystem an. Stellen Sie sicher, dass das Gerät vom Betriebssystem erkannt wird, und notieren Sie sich den zugewiesenen seriellen Port (z. B. COM3 unter Windows oder /dev/ttyUSB0 unter Linux).
Gehen Sie zur Konfigurationsseite des Adapters und wählen Sie den seriellen Port sowie gegebenenfalls weitere Parameter aus (die Standard-Baudrate beträgt üblicherweise 4800 oder 9600). Speichern Sie die Einstellungen und starten Sie den Adapter. Nach kurzer Zeit sollten GPS-Daten in den Datenpunkten des Adapters angezeigt werden.

## Getestete Geräte
Normalerweise sollten alle Geräte funktionieren, die NMEA-Daten über die serielle Schnittstelle oder USB übertragen. Hier sind einige Geräte, die getestet wurden:

- GlobalSat BU-353N5 USB-GNSS-Empfänger
- VK-162 G-Mouse USB GPS
- G72 G-Mouse USB

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 0.0.4 (2025-12-03)
- (@GermanBluefox) Corrected issues for repo checker

### 0.0.3 (2025-12-01)
- (@GermanBluefox) Initial release

## License

The MIT License (MIT)

Copyright (c) 2025 bluefox <dogafox@gmail.com>

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