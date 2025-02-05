---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.espresense/README.md
title: ioBroker.espresense
hash: 0wzSfVa/bvhNaLkZ3xPJ7rDX952BFJup94I9Ha/CZ9Q=
---
![Logo](../../../en/adapterref/iobroker.espresense/admin/espresense.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.espresense.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.espresense.svg)
![Anzahl der Installationen](https://iobroker.live/badges/espresense-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/espresense-stable.svg)
![NPM](https://nodei.co/npm/iobroker.espresense.png?downloads=true)

# IoBroker.espresense
**Tests:** ![Testen und Freigeben](https://github.com/ticaki/ioBroker.espresense/workflows/Test%20and%20Release/badge.svg)

## Espresense-Adapter für ioBroker
Verbinden mit [ESPresense](https://espresense.com)

- MQTT-Server und Clientmodul
- `Starte own mqtt server` aktiviere den Servermodus
- `Server-IP` nur für externe MQTT-Server verwenden
- „Port, Benutzername und Passwort“ des internen oder externen MQTT-Servers

- Wenn der Konfiguration Geräte hinzugefügt wurden, werden in den Objekten nur diese angezeigt.
- Die beiden Konfigurationszeitpunkte sind miteinander verknüpft, die Anwesenheitsprüfung läuft immer mit der Verarbeitung der MQTT-Nachrichten.

Best Practice: Koppeln Sie die zu überwachenden Geräte mit espresense und filtern Sie die Ausgabe, um unnötigen Netzwerkverkehr zu vermeiden.

#### Max_distance_iobroker
Die neu hinzugefügten Datenpunkte werden verwendet, um eine raumweise Erkennung im Adapter zu erreichen. Bei Verwendung von max_distance in esp32 erhält der Adapter keine Benachrichtigung, wenn das Gerät den Bereich verlässt. Bei Verwendung von max_distance_iobroker jedoch schon.
Wenn max_distance_iobroker verwendet wird, werden die beiden Presense-Datenpunkte davon gesteuert, ansonsten verhalten sie sich wie zuvor.
Presense unter dem Gerät ist wahr, wenn einer der Datenpunkte in den darunterliegenden Räumen wahr ist.

Für Hilfe verwenden Sie das Problem oder wenn Sie Deutsch verstehen: https://forum.iobroker.net/topic/71189/test-adapter-espresense

* Der verwendete MQTT-Server ist ein vollkompatibler MQTT 3.1 und 3.1.1 Server, der Adapter antwortet jedoch nur auf das Topic espresense/#

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.5.0 (2025-01-28)
* (ticaki) Simple room detection integrated
* (ticaki) Friendly room name added to devices
* (ticaki) global commands now work.
* (ticaki) Data point var added.

### 0.4.8 (2025-01-18)
* (ticaki) Devices can be renamed in the configuration.
* (ticaki) Removing devices works now!.

### 0.4.7 (2025-01-17)
* (ticaki) Removing devices now works.

### 0.4.6 (2024-11-29)
* (ticaki) repository checker problems fixed

### 0.4.5 (2024-11-29)
* (ticaki) dependencies updated

### 0.4.4 (2024-01-18)
* (ticaki) The time period over which incoming Mqtt messages are collected can be configured. min. 1 sec max. (2^31-1) / 1000 sec

### 0.4.3 (2024-01-14)
* (ticaki) Collect incoming MQTT messages and process them every 5 seconds

### 0.4.2 (2024-01-05)
* (ticaki) New state for actual distance/conversion factor and calculated distance

### 0.4.1 (2023-12-30)
* (ticaki) fixed: no names. (2. try)

### 0.4.0 (2023-12-30)
* (ticaki) fixed: no names.
* (ticaki) Added: global esp32 configuration (retained)

### 0.3.0 (2023-12-23)
* (ticaki) Breaking Change: move datadir from node_modules/iobroker.espresense/mydp to iobroker-data/espresense.0 (instance). move the files there and use iobroker fix after it.

### 0.2.1 (2023-12-21)
* (ticaki) fixed: object not exist sometimes.

### 0.2.0 (2023-12-21)
* (ticaki) Add/Remove Devices

### 0.1.3 (2023-12-21)
* (ticaki) prepare for lastest

### 0.1.2 (2023-12-21)
* (ticaki) add common.name to states

### 0.1.1 (2023-12-20)
* (ticaki) fixed: sometimes adapter crashed after login.

### 0.1.0 (2023-12-20)
* (ticaki) Added: send configuration datapoints to esp

### 0.0.3 (2023-12-19)
* (ticaki) Added: Mqtt Server with file db

### 0.0.2 (2023-12-18)
* (ticaki) initial release

## License
MIT License

Copyright (c) 2024-2025 ticaki <github@renopoint.de>

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