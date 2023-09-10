---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-material-advanced/README.md
title: ioBroker.vis-material-advanced
hash: xKe23Xkj89gC/PCQFAdtUkjvEwhDFRyVl+a7nhnKC80=
---
![Logo](../../../en/adapterref/iobroker.vis-material-advanced/admin/vis-material-advanced.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/vis-material-advanced-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)

# IoBroker.vis-material-advanced
## Vis-material-advanced-Adapter für ioBroker
Dieser Adapter stellt standardisierte Widgets für vis in ioBroker bereit. Viele verschiedene vordefinierte Widgets

Die Grundlagen dieses Adapters wurden erstellt von:

* (nisio) https://github.com/iobroker-community-adapters/ioBroker.vis-material
* (pix---) https://github.com/Pix---/ioBroker.vis-material

aber zu 90 % umgeschrieben

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
 - Licht
 - Dimmer
 - Lichttemperatur
 - Verschluss
 - Lautstärke
 - Thermostat
 - Boolescher Wert
 - Nummer
 - Text
 - Ventil

### Im Gange
Noch nicht endgültig:

 - Garagentor
 - Radiosender

 Viele Widgets sind noch in Planung

## Optionen
Die folgenden Optionen sind in den meisten Widgets verfügbar:

    - Textfarbe
    - cardIcon (macht noch nicht überall Sinn, z.B. Dimmer)
    - Deckkraftfarbe (die Standard-Deckkraftfarbe)
    - colorizeByValue (abhängig von einigen Werten kann die Deckkraftfarbe geändert werden, z. B. wenn es zu heiß ist, machen Sie es rot, zu kaltem Blau)
    - unten, oben, min, max (die Werte für colorizeByValue)
    - Farbe niedrig/hoch, mittel... (die Farbe, die verwendet werden soll, wenn der Rand erhöht ist)
    - schreibgeschützt (einige Widgets können nur zur Anzeige auf den schreibgeschützten Modus eingestellt werden)
    - border-radius zum Aktivieren und Ändern der runden Ecke
    - valueAlign Richtet das Wertfeld links, zentriert oder rechts aus
    - value-vertikal Richten Sie das Wertfeld oben, unten oder in der Mitte aus
    - borderColor Farbe des Randes, falls aktiviert

### Erste Schritte
Installieren Sie den Adapter und starten Sie VIS im Bearbeitungsmodus.
Wählen Sie auf der linken Seite „vis-material-adapter“ und dann werden alle Widgets in der Vorschau angezeigt.

............. viele Dokumentationen fehlen ......................

**Das ist example2.png, importieren Sie es und sehen Sie es live** ![](../../../en/adapterref/iobroker.vis-material-advanced/widgets/door_example.png)

**Sie können die Datei example.json in vis importieren** dank @sigi234

## Changelog
<!--
    Placeholder
    ### **WORK IN PROGRESS**
-->
### 1.7.4 (2023-09-07)
* (DEV2DEV-DE) Subscribe to updates of both values (temperature, humidity)

### 1.7.3 (2022-04-11)
* (bluefox) Removed erroneous chars from HTML

### 1.7.2 (2021-07-02)
* bugfix 2 Temp Humidity

### 1.7.1 (2021-07-02)
* bugfix for Temp Humidity

### 1.7.0 (2021-04-19)
* added new Widget Window3 for possibility showing open/tilted/closed [0/1/2] windows

## License
MIT License

Copyright (c) 2020-2023 EdgarM73 <edgar.miller@gmail.com>

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