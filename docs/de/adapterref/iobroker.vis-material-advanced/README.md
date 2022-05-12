---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-material-advanced/README.md
title: ioBroker.vis-material-advanced
hash: rQGHx5wnsb7Uay3ZjyfpYEOtiL9vBKR7WN6iSDk6J40=
---
![Logo](../../../en/adapterref/iobroker.vis-material-advanced/admin/vis-material-advanced.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/vis-material-advanced-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)

# IoBroker.vis-material-advanced
## Vis-Material-Advanced-Adapter für ioBroker
Dieser Adapter stellt standardisierte Widgets für Vis in ioBroker bereit. Viele verschiedene vordefinierte Widgets

Die Grundlagen dieses Adapters wurden erstellt von:

* (nisio) https://github.com/iobroker-community-adapters/ioBroker.vis-material
* (pix---) https://github.com/Pix---/ioBroker.vis-material

aber zu 90% umgeschrieben

Mehrere Bugfixes und viele neue Widgets hinzugefügt.

## Folgende Widgets sind derzeit vorhanden
### Aktuell
 - Tür
 - Fenster
 - Temperatur
 - Feuchtigkeit
 - Druck
 - Temperatur und Luftfeuchtigkeit
 - Belegung
 - Hell
 - Dimmer
 - Lichttemperatur
 - Verschluss
 - Volumen
 -Thermostat
 - Boolesch
 - Anzahl
 - Texte
 - Ventil

### In Bearbeitung
Noch nicht final:

 - Garagentor
 - Radiosender

 Viele Widgets sind noch in Planung

## Optionen
    Die folgenden Optionen sind in den meisten Widgets verfügbar:

    - Textfarbe
    - cardIcon ( macht noch nicht überall Sinn, z.B. Dimmer )
    - Deckkraftfarbe (die Standard-Deckkraftfarbe)
    - colorizeByValue (abhängig von einigen Werten kann die Deckkraftfarbe geändert werden, z. B. wenn es zu heiß ist, mach es rot, zu kaltem Blau)
    - below,over, min, max (die Werte für colorizeByValue)
    - color-low/high,medium... (die zu verwendende Farbe, wenn der Rand erhöht ist)
    - schreibgeschützt (einige Widgets können nur zur Anzeige in den schreibgeschützten Modus versetzt werden)
    - Border-Radius zum Aktivieren und Ändern der runden Ecke
    - valueAlign Richtet das Wertefeld links, zentriert oder rechts aus
    - value-vertikal Richtet das Value-Feld oben, unten oder mittig aus
    - borderColor Farbe des Randes falls aktiviert

### Einstieg
Installieren Sie den Adapter und starten Sie VIS im Bearbeitungsmodus.
Wählen Sie auf der linken Seite vis-material-adapter und dann werden alle Widgets in der Vorschau angezeigt.

............. viele Dokumente fehlen ......................

**Dies ist example2.png, importieren und live ansehen** ![](../../../en/adapterref/iobroker.vis-material-advanced/widgets/door_example.png)

**Dank @sigi234 können Sie die example.json-Datei in vis importieren**

## Changelog
<!--
    Placeholder
    ### **WORK IN PROGRESS**
-->
### 1.7.3 (2022-04-11)
* (bluefox) Removed erroneous chars from HTML

### 1.7.2 (2021-07-02)
* bugfix 2 Temp Humidity

### 1.7.1 (2021-07-02)
* bugfix for Temp Humidity

### 1.7.0 (2021-04-19)
* added new Widget Window3 for possibility showing open/tilted/closed [0/1/2] windows

### 1.6.0 (2021-04-01)
* new Temperature widget with ONLY an icon from blue to red depending on temperature setting

## License
MIT License

Copyright (c) 2020-2022 EdgarM73 <edgar.miller@gmail.com>

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