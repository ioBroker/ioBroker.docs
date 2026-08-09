---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zwavews/README.md
title: ioBroker.zwavews
hash: c3DIl7iUjKXS61DgcIgwuMGaiFHGtV8JbOblN/mG93k=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.zwavews.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zwavews.svg)
![Anzahl der Installationen](https://iobroker.live/badges/zwavews-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/zwavews-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zwavews.png?downloads=true)

<img src="admin/zwavews.png" width="200" />

# IoBroker.zwavews
**Tests:** ![Test und Freigabe](https://github.com/arteck/ioBroker.zwavews/workflows/Test%20and%20Release/badge.svg) ![CodeQL](https://github.com/arteck/ioBroker.zwavews/actions/workflows/codeql.yml/badge.svg?branch=main)

## Zwave-WS-Adapter für ioBroker
Der Adapter `zwavews` verbindet ein [`zwave-js-ui`](https://zwave-js.github.io/zwave-js-ui/#/) mit ioBroker und erstellt entsprechende Datenpunkte für Geräte, Werte und Status. Dadurch lassen sich Z-Wave-Geräte komfortabel in Visualisierungen, Logik und Automatisierungen einsetzen.

### Merkmale
* **Echtzeitkommunikation**: Empfängt sofort Aktualisierungen von Gerätewerten und -status über WebSocket oder MQTT.
* **Automatische Erkennung**: Erstellt und aktualisiert automatisch die Geräte- und Statusstruktur in ioBroker anhand der `zwave-js-ui`-Knoten.
* **Geräteverwaltung**: Akkustand, Verbindungsstatus und detaillierte Gerätemetriken können direkt über die ioBroker-Oberfläche eingesehen werden.
* **Firmware-Updates**: Verfolgen Sie den Fortschritt von Firmware-Updates direkt über die Protokolle und Statusanzeigen des Adapters.
* **Zustandssteuerung**: Befehle senden und Werte nativ über den ioBroker-Objektbaum aktualisieren.
* **Unterstützung für mehrere Protokolle**: Sie können sich über WebSocket, externen MQTT-Server oder einen internen Dummy-MQTT-Server mit `zwave-js-ui` verbinden.

## Adapterdokumentation
Es ist erforderlich, zwave-js-ui zu installieren (es ist möglich, die zwave2-Geräte auf zwave-js-ui zu migrieren. Kopieren Sie die JSON-Cache-Datei von /opt/iobroker/iobroker-data/zwave2/ in das Speicherverzeichnis der Z-Wave JS UI. Starten Sie anschließend zwave-js-ui) und die WS-Kommunikation zu aktivieren.<br> Der Wechsel vom Z-Wave2-Adapter ist einfach, da alle Informationen auf dem Koordinator gespeichert sind.<br> Sie müssen die batteriebetriebenen Geräte nur einmal aufwecken, damit zwave-js-ui sie wieder lesen kann, oder Sie migrieren von zwave2.<br>

<img width="1444" height="740" alt="Grafik" src="https://github.com/user-attachments/assets/876a81d3-04ab-43c6-914e-86772d0188e1" /><p></p>

Aktivieren Sie die WS-Servereinstellungen in `zwave-js-ui`. Wir verwenden hierfür die Home Assistant-Einstellungen:

<img width="1887" height="479" alt="Grafik" src="https://github.com/user-attachments/assets/6ed8cf36-2d91-435f-91d7-86e430bb0c6c" />

### **IN BEARBEITUNG**
* (arteck) fix reconnect ws
* (arteck) Schaltfläche „Erneutes Vorstellungsgespräch hinzufügen“ hinzufügen

## Changelog
### 1.0.4 (2026-07-23)
* (arteck) reconnect optimization
* (arteck) notification handling
* (arteck) fix energy values

### 1.0.3 (2026-07-15)
* (arteck) fix thermostat set point

### 1.0.2 (2026-07-15)
* (arteck) fix notification messages (check you scripts)

### 1.0.1 (2026-07-15)
* (arteck) fix bulb set color
* (arteck) add delete null states button into adapter settings

### 1.0.0 (2026-07-08)
* (arteck) add notification

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Arthur Rupp <arteck@outlook.com>,

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