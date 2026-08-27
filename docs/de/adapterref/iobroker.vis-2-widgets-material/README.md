---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-material/README.md
title: Material-Widgets für ioBroker.vis 2.0
hash: eg0asaXUh8jpfpnLW9SfiV1420WHVv/HOambFcpKpME=
---
![Logo](../../../en/adapterref/iobroker.vis-2-widgets-material/admin/vis-2-widgets-material.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-2-widgets-material-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-material.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-material.svg)
![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-material.png?downloads=true)

# Material-Widgets für ioBroker.vis 2.0
## Widgets
### Knöpfe und Schalter
![Schalter](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches.png)

![Schalter](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches-buttons.png)

![Schalter](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches-buttons-2.png)

### Uhr
- Analog

![Uhr analog](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-analog-1.png)

- Analoge Variante

![Uhr Analog 2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-analog-2.png)

- Digital

![Digital](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-digital-1.png)

- Digital2 (SVG-Text)

![Digital2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-digital-2.png)

### Einfacher Zustand
Mit diesem Widget können Sie ein Gerät steuern. Boolescher Wert oder Zahl.

-   Nummer

![Einfacher Zustand](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-1.png)

-   Kontrolle

![Einfacher Zustand](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-2.png)

### Im Widget anzeigen
![Im Widget anzeigen](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-1.png)

Nicht als Schaltfläche: Die Ansicht kann in voller Größe angezeigt werden, und Sie können die Elemente in der Ansicht steuern.

![Im Widget anzeigen – Schaltfläche](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-2.png)

Als Schaltfläche: Sie können eine kleine Miniaturansicht anzeigen lassen, die durch Anklicken in voller Größe angezeigt wird.

### Thermostat
![Thermostat](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-thermostat-1.png)

Zusätzlich kann, falls aktiviert, ein Verlauf angezeigt werden.

### Tatsächlicher Wert mit Diagramm
![Tatsächlicher Wert](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-actual-value-1.png)

![Tatsächlicher Wert mit Diagramm](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-actual-value-2.png)

### Sicherheitskontrolle
![Sicherheitskontrolle](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-0.png)

![Sicherheitskontrolle](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-1.png)

Sie können die Verzögerung in Sekunden angeben.

Bei Aktivierung wird die definierte ID mit der Anzahl der Verzögerungssekunden beschrieben. Nach Ablauf der Verzögerung wird die definierte ID auf 0 gesetzt und die Alarm-ID auf „true“ gesetzt.

![Sicherheitskontrolle](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-2.png)

### Spieler
![Spieler](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-player.png)

### Karte
![Karte](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-map-1.png)

Die Position kann als kombinierter Zustand, wie `9.2344;41.374652` - `longitude;latitude`, oder als zwei separate Zustände definiert werden.

### Kamera
![Kamera](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-camera-1.png)

### HTML-Vorlage
![HTML](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-html-1.png)

Mit der HTML-Vorlage kann beliebiger HTML-Code angezeigt werden.
Zusätzlich können Sie mit diesem Widget auch ein Bild oder einen iFrame einbinden.

### Jalousien
![Jalousie](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-1.png)

![Jalousie](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-2.png)

### Farblampe
Mit dem RGB-Lampen-Widget können Sie verschiedene Arten von RGB-Lampen steuern. Hier einige Beispiele:

- RGB-Farben werden in einem Zustand wie '#RRGGBB' festgelegt.
- Die R/G/B-Farben werden in verschiedenen Zuständen von 0 bis 255 eingestellt.
- RGBW als eine Variable wie '#RRGGBBWW'
- Die R/G/B/W-Farben werden in verschiedenen Zuständen von 0 bis 255 eingestellt.
- Farbton/Sättigung/Helligkeit als 3 verschiedene Zustände
- Farbtemperatur als ein Zustand von 2700 bis 6500 oder definiert durch Minimum/Maximum des Objekts
- Der Weißmodus kann über einen speziellen Zustand verwendet werden, um zwischen RGB- und Weißmodus umzuschalten.

![RGB-Lampe 1](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-rgb-1.png)

![RGB-Lampe 2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-rgb-2.png)

### Türschloss
![Türschloss](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-lock.png)

### Staubsauger
Dieses Widget ist primär für Xiaomi-Staubsauger gedacht. Es kann aber auch für jeden anderen Staubsauger verwendet werden.

Der einzige Unterschied besteht darin, dass Xiaomi die Zimmerreinigung unterstützt.

![Staubsauger](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-vacuum.png)

### Zeitauswahl
## Todo
- Jalousien mit Rollladen erweitern

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 1.6.6 (2026-05-06)

-   (@GermanBluefox) Corrected error with button and alarm widget

### 1.6.1 (2026-03-14)

-   (@GermanBluefox) Corrected error with select value widget

### 1.6.0 (2025-09-03)

-   (@GermanBluefox) Corrected "Actual" widget

### 1.5.3 (2025-08-27)
-   (@GermanBluefox) Added support for older Android devices

### 1.5.0 (2025-05-19)

-   (bluefox) Corrected thermostat slider
-   (bluefox) Rewritten with TypeScript and vite
-   (bluefox) Corrected blinds control
-   (bluefox) Added disabled mode additionally to hidden mode in the 'switches and buttons' widget
-   (bluefox) Added `_ts=Date.now()` to camera URL to disable the browser cache
-   (bluefox) Simple state has a new option - step
-   (bluefox) Added new navigation widget: jump to view, url or list of views

### 1.4.10 (2024-08-09)

-   (Steiger04) Corrected recursive icon search on a channel, device, instance and adapter.

### 1.4.9 (2024-08-03)

-   (bluefox) Corrected blinds dialog
-   (bluefox) Added the invert option for blinds

### 1.4.8 (2024-07-12)

-   (bluefox) Small changes for SweetHome3D

### 1.4.7 (2024-07-11)

-   (bluefox) Corrected thermostat chart button

### 1.4.6 (2024-07-10)

-   (bluefox) Better detection of modes for thermostat
-   (bluefox) Round temperature in charts

### 1.4.1 (2024-07-07)

-   (bluefox) removed withStyles package
-   (bluefox) Better thermostat visualization by narrow height

### 1.3.33 (2024-06-10)

-   (bluefox) Wait for data before the map is shown
-   (bluefox) Round of value is possible now in the actual value widget (with chart)

### 1.3.32 (2024-05-14)

-   (bluefox) Corrected error with multi-language names

### 1.3.31 (2024-04-26)

-   (bluefox) Improved wizard layout

### 1.3.28 (2024-04-19)

-   (bluefox) Improved resolving of icons

### 1.3.27 (2024-04-09)

-   (bluefox) Updated packages
-   (bluefox) improved RGB widget

### 1.3.25 (2024-03-07)

-   (bluefox) Corrected filter property in the widget settings

### 1.3.23 (2024-03-05)

-   (bluefox) Added possibility to change the icon size in a simple widget

### 1.3.21 (2024-02-22)

-   (bluefox) Corrected small input fields

### 1.3.18 (2024-01-16)

-   (bluefox) Corrected long click for RGB widget on touch devices
-   (bluefox) Corrected dimmer widget

### 1.3.17 (2023-12-19)

-   (bluefox) Added an option to hide the line in the switches widget

### 1.3.15 (2023-12-17)

-   (foxriver76) Added an option to rotate video

### 1.3.14 (2023-12-05)

-   (bluefox) Allowed with on click on the widget toggling the ON/OFF state of the RGB widget
-   (bluefox) Added class names to ON/OFF widgets to allow styling

### 1.3.11 (2023-11-17)

-   (bluefox) Allowed opening/closing dialogs of some widgets by command

### 1.3.9 (2023-11-10)

-   (bluefox) updated packages

### 1.3.8 (2023-11-08)

-   (bluefox) Corrected RGB widget if minimal is equal with maximal

### 1.3.5 (2023-11-06)

-   (bluefox) Corrected layout of RGB widget
-   (bluefox) Added option for RGB widget to hide brightness control
-   (bluefox) Added option for white mode in the RGB widget

### 1.3.3 (2023-10-26)

-   (bluefox) Corrected layout of RGB widget
-   (bluefox) Added color settings to actual
-   (bluefox) Vacuum settings were hidden

### 1.3.2 (2023-10-14)

-   (bluefox) Small improvements done

### 1.3.1 (2023-10-13)

-   (bluefox) Added the vacuum cleaner widget

### 1.2.1 (2023-09-18)

-   (bluefox) Added door lock, rgb and thermostat to switches widget

### 1.1.3 (2023-09-10)

-   (bluefox) Door lock improved

### 1.1.0 (2023-09-08)

-   (bluefox) Added door lock

### 1.0.0 (2023-08-21)

-   (bluefox) Added RGB widget

### 0.8.5 (2023-08-11)

-   (bluefox) Improvement of the widget loading

### 0.8.4 (2023-08-10)

-   (bluefox) Improvement of wizard

### 0.8.3 (2023-07-30)

-   (bluefox) Font styles are applied to all buttons

### 0.8.2 (2023-07-19)

-   (bluefox) Corrected small layout problems

### 0.8.0 (2023-07-18)

-   (bluefox) Added wizard for widgets

### 0.7.1 (2023-07-02)

-   (bluefox) Added washer widget

### 0.6.2 (2023-06-29)

-   (bluefox) Allowed usage without a frame for all widgets

### 0.6.0 (2023-06-28)

-   (bluefox) Added blinds to switches widget
-   (bluefox) Allowed to place widgets in widgets

### 0.5.3 (2023-06-21)

-   (bluefox) Corrected errors with view in the widget

### 0.5.1 (2023-06-20)

-   (bluefox) Added widget to switch the theme
-   (bluefox) Improved HTML widget to show iframe and image

### 0.4.0 (2023-06-16)

-   (bluefox) Added button texts for switches widget
-   (bluefox) Removed static widget, as it was replaced by the switches widget

### 0.3.1 (2023-06-14)

-   (bluefox) Improved buttons widget

### 0.2.13 (2023-03-22)

-   (bluefox) BREAKING CHANGE: The names of widgets must be entered anew
-   (bluefox) update packages

### 0.2.9 (2023-02-27)

-   (bluefox) Made this adapter singleton

### 0.2.2 (2023-02-22)

-   (bluefox) Update packages

### 0.2.1 (2022-11-26)

-   (bluefox) Implemented the blinds widget

### 0.1.5 (2022-10-27)

-   (bluefox) First beta version

### 0.1.2 (2022-10-21)

-   (bluefox) initial commit

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2022-2026 Denis Haev <dogafox@gmail.com>

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