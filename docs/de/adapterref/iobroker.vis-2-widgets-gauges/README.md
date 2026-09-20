---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-gauges/README.md":{"title":{"en":"Gauge widgets for ioBroker.vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-gauges/README.md"},"en/adapterref/iobroker.vis-2-widgets-gauges/docs/en/README.md":{"title":{"en":"Gauges for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-gauges/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-gauges/README.md
title: Gauge-Widgets für ioBroker.vis-2
hash: +9afG0nZwNj65LEA6I1pwo175GkaGv6REDYvL6LH1iI=
---
![Logo](../../../en/adapterref/iobroker.vis-2-widgets-gauges/admin/vis-2-widgets-gauges.svg)

![Anzahl der Installationen](http://iobroker.live/badges/vis-2-widgets-gauges-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-gauges.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-gauges.svg)
![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-gauges.png?downloads=true)

# Gauge-Widgets für ioBroker.vis-2

Zehn Widgets für [ioBroker.vis-2](https://github.com/ioBroker/ioBroker.vis-2) , die einen Wert als Messinstrument anzeigen:

| Widget               | Ausweis                | Zum Beispiel                                                            |
| -------------------- | ---------------------- | ----------------------------------------------------------------------- |
| Farbskala            | `tplGauge2Color`       | ein Halbkreis aus farbigen Segmenten mit einer Nadel                    |
| Wasserstandsanzeiger | `tplGauge2Water`       | Luftfeuchtigkeit, Füllprozent                                           |
| Batterieanzeige      | `tplGauge2Battery`     | Batterie eines Sensors, Telefons oder Autos mit Ladeanzeige             |
| Radiallehre          | `tplGauge2Radial`      | Kraft, Geschwindigkeit, Druck – das klassische Instrument               |
| Lichtbogenmessgerät  | `tplGauge2Arc`         | jeder Wert mit einer Sollwertmarkierung, auch als LED-Segmente          |
| Lineare Messlehre    | `tplGauge2Linear`      | horizontaler oder vertikaler Balken, z. B. Netzleistung von -3 bis 6 kW |
| Thermometer          | `tplGauge2Thermometer` | Innen- und Außentemperatur                                              |
| Kompass              | `tplGauge2Compass`     | Windrichtung und -geschwindigkeit, Kurs                                 |
| Tank                 | `tplGauge2Tank`        | Heizöl, Zisterne, Pellets                                               |
| Ringe                | `tplGauge2Rings`       | bis zu fünf Werte gleichzeitig, z. B. PV, Verbrauch, Batterie           |

![Alle Widgets](../../../en/adapterref/iobroker.vis-2-widgets-gauges/docs/img/overview.png)

Die Widgets werden als einfache SVG-Grafiken mit React gezeichnet, ohne Diagramm- oder UI-Bibliotheken, und folgen dem hellen und dunklen Design von vis-2.

## Dokumentation

Alle Widgets mit ihren Einstellungen und Screenshots: [Englisch](/#/docs/adapterref/iobroker.vis-2-widgets-gauges/docs/en/README.md) | [Deutsch](https://github.com/ioBroker/ioBroker.vis-2-widgets-gauges/blob/master/docs/de/README.md)

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) Rewrote the color, water and battery gauge as plain SVG without react-gauge-chart, react-liquid-gauge, react-battery-gauge, d3 and MUI - the widget set works with the React 19 version of vis-2 again. Projects keep all their settings
* (bluefox) Added 7 new widgets: radial gauge, arc gauge, linear gauge, thermometer, compass, tank and rings
* (bluefox) Color gauge: the value is shown below the needle, minimum and maximum can be shown, the needle length works, `0` for corner radius, padding and margin is really 0
* (bluefox) Water gauge: digits after comma and color of the liquid; the value counts up during the rise animation
* (bluefox) Battery gauge: optional medium level, stroke width of the body, percent sign can be hidden, the text stays horizontal in a vertical battery
* (bluefox) Values that are not numbers are shown as text, a missing value as `–`
* (bluefox) All widgets follow the dark theme of vis-2
* (bluefox) Added documentation with screenshots (English and German)
* (bluefox) The adapter icon is an SVG now
* (bluefox) Updated packages and the build (vite 8, React 19 types)

### 2.0.3 (2026-06-04)
* (bluefox) Updated packages

### 2.0.2 (2025-08-26)
* (bluefox) Support for older Android devices

### 2.0.1 (2025-07-01)
* (bluefox) Rewritten with TypeScript

### 1.1.1 (2024-11-25)
* (bluefox) Allowed to define digits after comma for the color gauge

### 1.1.0 (2024-07-07)
* (bluefox) Removed withStyles package

### 1.0.4 (2024-05-26)
* (bluefox) updated packages

### 1.0.3 (2024-03-13)
* (bluefox) updated packages

### 1.0.2 (2024-01-02)
* (bluefox) Allowed showing text in every widget

### 1.0.0 (2023-12-05)
* (bluefox) updated packages
* (bluefox) Allowed showing text on battery

### 0.2.2 (2023-11-10)
* (bluefox) update packages

### 0.2.0 (2023-07-28)
* (bluefox) Changed layout of widgets
* (bluefox) Added text color settings to water widget

### 0.1.14 (2023-07-01)
* (bluefox) Changed layout of widgets

### 0.1.13 (2023-06-28)
* (bluefox) Better compatibility

### 0.1.12 (2023-03-22)
* (bluefox) update packages

### 0.1.9 (2023-03-02)
* (bluefox) Packages were updated

### 0.1.5 (2023-02-23)
* (bluefox) Packages were updated

### 0.1.4 (2022-11-13)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2022-2026 bluefox <dogafox@gmail.com>

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