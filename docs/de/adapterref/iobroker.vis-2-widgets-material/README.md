---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-material/README.md
title: Material-Widgets für ioBroker.vis 2.0
hash: cKHRTVBeG8kUHylekx+2Num3as39qjPPHxLFVCu95Ak=
---
![Logo](../../../en/adapterref/iobroker.vis-2-widgets-material/admin/vis-2-widgets-material.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-2-widgets-material-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-material.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-material.svg)
![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-material.png?downloads=true)

# Material-Widgets für ioBroker.vis 2.0
##Widgets
### Knöpfe und Schalter
![Schalter](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches.png)

![Schalter](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches-buttons.png)

![Schalter](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches-buttons-2.png)

### Uhr
- Analog

![Uhr analog](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-analog-1.png)

- Analoge Variante

![Uhr analog 2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-analog-2.png)

- Digital

![Digital](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-digital-1.png)

- Digital2 (SVG-Text)

![Digital2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-digital-2.png)

### Einfacher Zustand
Mit diesem Widget können Sie ein Gerät steuern. Boolesch oder Zahl.

- Nummer

![Einfacher Zustand](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-1.png)

- Kontrolle

![Einfacher Zustand](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-2.png)

### Im Widget anzeigen
![Im Widget anzeigen](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-1.png)

Nicht als Schaltfläche: Die Ansicht könnte in voller Größe angezeigt werden, und Sie können Elemente in der Ansicht steuern.

![Im Widget anzeigen - Schaltfläche](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-2.png)

Als Schaltfläche: Sie können ein kleines Miniaturbild der Ansicht anzeigen und durch Drücken darauf wird es in voller Größe angezeigt.

###Thermostat
![Thermostat](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-thermostat-1.png)

Zusätzlich kann es einen Verlauf anzeigen, wenn Sie es aktiviert haben.

### Aktueller Wert mit Diagramm
![Tatsächlicher Wert](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-actual-value-1.png)

![Istwert mit Diagramm](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-actual-value-2.png)

### Statische Informationen
![Statische Informationen](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-static-info-1.png)

![Statische Informationen](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-static-info-2.png)

### Sicherheitskontrolle
![Sicherheitskontrolle](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-0.png)

![Sicherheitskontrolle](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-1.png)

Sie können die Verzögerung in Sekunden definieren.

Bei Aktivierung wird die definierte ID mit der Anzahl der Verzögerungssekunden geschrieben und nach Ablauf der Verzögerung wird die definierte ID auf 0 und die Alarm-ID auf wahr gesetzt.

![Sicherheitskontrolle](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-2.png)

### Spieler
![Spieler](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-player.png)

### Karte
![Spieler](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-map-1.png)

### Kamera
![Spieler](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-camera-1.png)

### HTML-Vorlage
![Spieler](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-html-1.png)

### Jalousien
![Jalousie](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-1.png)

![Spieler](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-2.png)

### Farblampe
### Zeitauswahl
<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
### 0.2.9 (2023-02-27)
* (bluefox) Made this adapter singleton

### 0.2.2 (2023-02-22)
* (bluefox) Update packages

### 0.2.1 (2022-11-26)
* (bluefox) Implemented the blinds widget

### 0.1.5 (2022-10-27)
* (bluefox) First beta version

### 0.1.2 (2022-10-21)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2022-2023 bluefox <dogafox@gmail.com>

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