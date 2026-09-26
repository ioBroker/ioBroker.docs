---
chapters: {"pages":{"en/adapterref/iobroker.vis-colorpicker/README.md":{"title":{"en":"ioBroker.vis-colorpicker"},"content":"en/adapterref/iobroker.vis-colorpicker/README.md"},"en/adapterref/iobroker.vis-colorpicker/docs/en/README.md":{"title":{"en":"Color picker widgets for vis-2"},"content":"en/adapterref/iobroker.vis-colorpicker/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-colorpicker/README.md
title: ioBroker.vis-Farbauswahl
hash: dSj+BXdJEmFrUQoV+cj3+IzSi1pmMybo4E135ATycY0=
---
![Logo](../../../en/adapterref/iobroker.vis-colorpicker/admin/colorpicker.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-colorpicker-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-colorpicker.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-colorpicker.svg)
![NPM](https://nodei.co/npm/iobroker.vis-colorpicker.png?downloads=true)

# ioBroker.vis-Farbauswahl

Farbauswahl-Widgets für [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis) und [ioBroker.vis-2](https://github.com/ioBroker/ioBroker.vis-2)

![Beispiel](../../../en/adapterref/iobroker.vis-colorpicker/docs/img/overview.png)

Neun Widgets zum Einstellen und Anzeigen einer Farbe: drei allgemeine Farbwähler, einer für Homematic-Lampen und fünf für Philips HUE-Lampen.

## vis und vis-2

Der Adapter liefert jedes Widget zweimal aus:

- **vis (vis-1)** verwendet das EJS/jQuery-Widget-Set in `widgets/colorpicker.html`, wodurch spectrum, jscolor, farbtastic und der CIE-Helfer von huepi geladen werden.
- **vis-2** verwendet das React-Widget-Set in `widgets/vis-2-widgets-colorpicker/`, gebaut aus `src-widgets/` Es benötigt weder jQuery noch einen externen Picker – die Picker werden mit CSS und einem einzigen Canvas gezeichnet.

Beide deklarieren die gleichen Widget-IDs (`tplRGBSpectrum`, `tplSpectrumHomematic`, `tplRGBFarbtastic`, `tplJscolor`, `tplHUEjscolor`, `tplHUEPickerXY`, `tplHUEIndicatorXY`, `tplHUEPickerCT`, `tplHUEIndicatorCT`) und dieselben Attributnamen, und vis-2 bevorzugt ein React-Widget gegenüber einem EJS-Widget. Daher funktioniert ein mit vis erstelltes Projekt auch nach dem Wechsel zu vis-2 weiterhin – die Widgets werden einfach mit der React-Implementierung gerendert.

Die React-Widgets benötigen vis-2 Version 2.12.8 oder neuer. Bei älteren vis-2-Versionen werden die EJS-Widgets verwendet.

## Dokumentation

Alle Widgets mit ihren Einstellungen und Screenshots: [Englisch](/#/docs/adapterref/iobroker.vis-colorpicker/docs/en/README.md) | [Deutsch](https://github.com/ioBroker/ioBroker.vis-colorpicker/blob/master/docs/de/README.md)

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) All nine widgets were ported to vis-2 as React widgets, without jQuery, spectrum, jscolor and farbtastic
* (bluefox) The widgets of a vis-1 project keep all their settings: same widget ids, same attribute names
* (bluefox) The CT indicator is a React widget as well, although its vis-1 template is marked with `data-vis-2-ignore`
* (bluefox) Added the setting "Picker in the widget", which shows the colour picker instead of a small colour box
* (bluefox) Added "Unit" (mired or Kelvin) and the range "Warmest"/"Coldest" to the two color temperature widgets
* (bluefox) The gamut letters A, B and C are recognized now, not only the model ids of the lamps
* (bluefox) The pickers follow touch and pen, and they no longer re-compute the whole colour field on every change
* (bluefox) The colour is only written every 200 ms while dragging, and once more when the pointer is released
* (bluefox) The widget settings are translated in eleven languages
* (bluefox) Added documentation with screenshots for every widget (English and German)
* (bluefox) Fixed the color wheel: it really writes and reads hue/saturation/brightness now
* (bluefox) Fixed the divisor of the Philips HUE widget, the rounding of saturation and lightness of the spectrum, and the hue, which was written as text
* (bluefox) "level" is only sent to a HUE lamp if a Level ID is configured, so a colour change does not set the brightness
* (bluefox) Updated the CI to the current ioBroker actions and added a CodeQL workflow

### 2.1.0 (2025-11-25)
* (oweitman) loaded an additional javascript file for the widget jscolorcie to fix

### 2.0.3 (2023-03-17)
* (bluefox) Made it work with vis-2.0

### 1.2.0 (2020-04-14)
* (bluefox) Corrected html structure

### 1.1.1 (2016-11-30)
* (Pmant) add new hue bulbs and fix gamut

### 1.1.0 (2016-05-31)
* (Pmant) add homematic colorpicker

### 1.0.2 (2016-05-20)
* (bluefox) Fix Philips HUE Colorpicker

### 1.0.0 (2016-05-19)
* (bluefox) rewrite all widgets

### 0.2.0 (2016-05-15)
* (Pmant) add hue CIE picker

### 0.1.3 (2016-01-25)
* (bluefox) add precision

### 0.1.2 (2016-01-25)
* (bluefox) enable ID Select dialog

### 0.1.1 (2015-09-27)
* (bluefox) update packets

### 0.1.0 (2015-07-09)
* (bluefox) initial checkin

## License
The MIT License (MIT)

Copyright (c) 2013-2026 Bluefox https://github.com/GermanBluefox,
              2013-2014 hobbyquaker https://github.com/hobbyquaker

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