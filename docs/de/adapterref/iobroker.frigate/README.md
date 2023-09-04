---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.frigate/README.md
title: ioBroker.frigate
hash: j0s/xrvbFuZGzEpPCJYqWJqQjZ/SuuGz8QlwiqbVc3s=
---
![Logo](../../../en/adapterref/iobroker.frigate/admin/frigate.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.frigate.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.frigate.svg)
![Anzahl der Installationen](https://iobroker.live/badges/frigate-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/frigate-stable.svg)
![NPM](https://nodei.co/npm/iobroker.frigate.png?downloads=true)

# IoBroker.frigate
## Fregattenadapter für ioBroker
Frigate ist ein Open-Source-NVR, der auf der Erkennung von KI-Objekten in Echtzeit basiert.
Dieser Adapter analysiert die MQTT-Nachrichten von Frigate und erstellt daraus Datenobjekte

## Anweisungen
MQTT muss in Frigate aktiviert und in den ioBroker integriert werden.
In den Adaptereinstellungen werden der MQTT-Datenpunkt (normalerweise „mqtt.0.frigate“), die Fregatten-URL und die Anzahl der Web-URLs eingetragen.

_Automatisch erstellte Objekte:_

- Objekte für Einstellungen in Frigate
- Bewegungsereignisse für jede Kamera
- die letzte Kamera-Schnappschuss-/Clip-URL im Ringpuffer

Diese Objekte können im ioBroker weiterverarbeitet werden, z.B. im Vis.

## Verknüpfung
- [ioBroker-Forum-Adapter-Thread](https://forum.iobroker.net/topic/64928/test-frigate-adapter-v0-0-1-alpha)
- [Fregatte-Videoprojekt](https://frigate.video)

## Changelog

### 0.2.6

-   (bettman66) add camid

### 0.2.5

-   (bettman66) fix https

### 0.2.4

-   (bettman66) add v0.2.4 to npm

### 0.2.3

-   (bettman66) merge pull request

### 0.2.2

-   (bettman66) settings translate

### 0.2.1

-   (bettman66) add version

### 0.2.0

-   (bettman66) add uptime and more

### 0.1.9

-   (bettman66) add online

### 0.1.8

-   (bettman66) add storage info

### 0.1.7

-   (bettman66) add switch

### 0.1.6

-   (bettman66) Number of web url

### 0.1.5

-   (bettman66) new npm package

### 0.1.4

-   (bettman66) update readme

### 0.1.3

-   (bettman66) bug web objects

### 0.1.2

-   (bettman66) ready to test

### 0.1.1

-   (bettman66) translate

### 0.1.0

-   (bettman66) objects add

## License

MIT License

Copyright (c) 2023 Bettman66 <w.zengel@gmx.de>

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