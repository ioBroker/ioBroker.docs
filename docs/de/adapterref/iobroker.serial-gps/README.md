---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.serial-gps/README.md
title: ioBroker GPS (seriell/USB) Adapter
hash: K8Qrv0kNC7b0CxW/Cgrp70q/KaU7e56yOozTv+0c4rM=
---
![Anzahl der Installationen](https://iobroker.live/badges/serial-gps-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.serial-gps.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.serial-gps/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/serial-gps/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.serial-gps.svg)

<img src="admin/serial-gps.svg" style="width: 100px;"/>

# ioBroker GPS (seriell/USB) Adapter

Dieser Adapter liest GPS-Daten von einem seriellen oder USB-GPS-Gerät und stellt sie in ioBroker zur Verfügung.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Erste Schritte

Schließen Sie einen USB- oder seriellen GPS-Empfänger an Ihr ioBroker-Hostsystem an. Stellen Sie sicher, dass das Gerät vom Betriebssystem erkannt wird, und notieren Sie sich den zugewiesenen seriellen Port (z. B. COM3 unter Windows oder /dev/ttyUSB0 unter Linux). Rufen Sie die Konfigurationsseite des Adapters auf und wählen Sie den seriellen Port sowie gegebenenfalls weitere Parameter aus (die Standard-Baudrate beträgt üblicherweise 4800 oder 9600). Speichern Sie die Einstellungen und starten Sie den Adapter. Nach kurzer Zeit sollten GPS-Daten in den Datenpunkten des Adapters angezeigt werden.

## Aktuelle Position in der Verwaltung

Der Tab **„Aktuelle Position“** der Instanzeinstellungen zeigt die Position des Empfängers live auf einer OpenStreetMap-Karte an (Pfeil in Fahrtrichtung, Punkt im Stand, mit der seit dem Öffnen des Tabs verfolgten Strecke). Zusätzlich werden Verbindung, Positionsbestimmung, Satelliten, Koordinaten, Höhe, Geschwindigkeit, Kurs und DOP-Werte angezeigt. Die Karte wird nur während des Betriebs der Instanz angezeigt und benötigt eine Internetverbindung im Browser (Kartenkacheln und Leaflet-Bibliothek). Da die Werte der Datenpunkte angezeigt werden, gelten die unten aufgeführten Optionen auch für diese.

## Aktualisierung der Werte

Die meisten Empfänger senden jede Sekunde eine neue Positionsbestimmung, sodass sich auch die GPS-Datenpunkte jede Sekunde ändern. Diese Optionen in der Adapterkonfiguration reduzieren die Anzahl der Aktualisierungen (alle sind deaktiviert bei …). `0`):

- **Minimales Aktualisierungsintervall** (Sekunden): Jeder GPS-Wert wird innerhalb dieses Intervalls höchstens einmal geschrieben. Ein Wert, der sich zwischenzeitlich ändert, wird mit der nächsten Aktualisierung nach dem Intervall geschrieben.
- **Minimale Positionsänderung** (Meter): `latitude`, `longitude`, `position` Und `latlon` Die Daten werden erst aktualisiert, nachdem sich der Empfänger mindestens diese Entfernung von der zuletzt beschriebenen Position entfernt hat. Dadurch werden die Vibrationen eines stehenden Empfängers unterdrückt.
- **Minimale Richtungsänderung** (Grad): `course` wird nur aktualisiert, wenn sich der Wert gegenüber dem zuletzt geschriebenen Wert um mindestens diesen Winkel geändert hat (359° → 1° zählt als 2°).
- **Mindestgeschwindigkeit für die Richtung** (km/h): `course` wird nur aktualisiert, solange die Geschwindigkeit mindestens diesen Wert erreicht, z. B. `2` Ein stehender Empfänger meldet zufällige Richtungen; so bleibt die zuletzt zurückgelegte Richtung erhalten.

Das Intervall gilt zusätzlich zur Entfernung und Richtung, daher müssen alle vorgegebenen Bedingungen erfüllt sein, z. B. `10` s und `5` m: Die Position wird höchstens alle 10 Sekunden aktualisiert, und zwar nur dann, wenn sie sich um mehr als 5 Meter geändert hat. Andere Werte (Geschwindigkeit, Satelliten, Zeit usw.) werden ebenfalls nur innerhalb dieses Intervalls aktualisiert. `info.connection` wird immer sofort aktualisiert.

## Getestete Geräte

Normalerweise sollten alle Geräte funktionieren, die NMEA-Daten über die serielle Schnittstelle oder USB übertragen. Hier sind einige Geräte, die getestet wurden:

- GlobalSat BU-353N5 USB-GNSS-Empfänger
- VK-162 G-Mouse USB GPS
- G72 G-Mouse USB

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.1.0 (2026-11-05)
* (@GermanBluefox) Added options to limit the updates of the GPS values: a minimal update interval, a minimal position change, a minimal direction change and a minimal speed for the direction
* (@GermanBluefox) The settings are split into tabs. The new tab "Current position" shows the position on an OpenStreetMap map and the current GPS values. Admin 7.7.28+ is required

### 1.0.2 (2026-10-13)
* (@GermanBluefox) Admin 7.6.20+ is required. Corrected the roles of some states. Fixed the integration test
* (@GermanBluefox) The adapter reports the serial port it has open (and in test mode the UDP port 50547) to js-controller 8, which keeps a per-host registry of the occupied resources (`system.host.<name>.usedResources`). A second instance configured for the same GPS receiver is visible as a conflict, and the log names the other instance before the port is opened. An older js-controller is unaffected

### 1.0.1 (2026-10-07)
- (iobroker-bot) Adapter requires node.js >= 22 now.
- (@GermanBluefox) By test of the port that already used by same instance, the port will be released for tests.

### 1.0.0 (2026-05-29)
- (@GermanBluefox) Added possibility to select GPS device by name instead of path

### 0.0.4 (2025-12-03)
- (@GermanBluefox) Corrected issues for repo checker

## License

The MIT License (MIT)

Copyright (c) 2025-2026 bluefox <dogafox@gmail.com>

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