---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.devices/README.md
title: ioBroker.geräte
hash: +Ck9oiC/SbmbTzLAkZe4+RMCd+bz+FKryVfovfdUNEg=
---
![Logo](../../../en/adapterref/iobroker.devices/admin/devices.png)

![Anzahl der Installationen](http://iobroker.live/badges/devices-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.devices.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.devices.svg)

# IoBroker.devices
![Testen und Freigeben](https://github.com/ioBroker/iobroker.devices/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/devices/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Geräteadapter für ioBroker
Verwalten und erstellen Sie Geräte zur Verwendung in anderen Adaptern wie Material, IoT usw.

**Wichtig: Registerkarte im Admin aktivieren, wie Protokoll und Skripte**

![Bildschirm](../../../en/adapterref/iobroker.devices/img/screen.png)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Aufgaben
- Beschreibungen für Staaten hinzufügen

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->
### **IN ARBEIT**
* (@GermanBluefox) Aktualisierte Pakete
* (@GermanBluefox) Verwendetes Video
* (@GermanBluefox) Verwendete eslint-config von ioBroker

### 1.1.5 (06.06.2023)
* (Garfonso) behoben: Problem beim Bearbeiten importierter Staaten
* (Garfonso) behoben: Warnung
* (Garfonso) behoben: IoT erneut aktivieren (ohne einen benutzerdefinierten SmartName festzulegen)
* (Garfonso) behoben: möglicher Absturz/Tippfehler in 1.1.3.

### 1.1.4 (06.06.2023)
* (Bluefox) Aktualisierte Pakete

### 1.1.3 (16.05.2023)
* (Bluefox) Besseres Verhalten bei der Kategorieauswahl

### 1.1.2 (09.11.2022)
* (Garfonso) korrigierte die doppelten Zustände in Lichtgeräten
* (Garfonso) CIE-Farbtyp als Äquivalent zum Typ „rgbSingle“ hinzugefügt

### 1.1.1 (03.11.2022)
* (bluefox) Löschdialog korrigiert
* (Bluefox) Ukrainische Übersetzung hinzugefügt

### 1.1.0 (27.09.2022)
* (Bluefox) GUI auf Version 5 migriert

### 1.0.12 (09.06.2022)
* (Bluefox) Erlaubt die Arbeit mit Geräten hinter einem Reverse-Proxy
* (bluefox) Das Funktionssymbol wurde ersetzt

### 1.0.11 (08.06.2022)
* (Bluefox) Einige Bibliotheken aktualisiert

### 1.0.10 (13.02.2022)
* (bluefox) Korrigierte Bearbeitung von Ordnern
* (Bluefox) Einige Bibliotheken aktualisiert

### 1.0.9 (11.07.2021)
* (bluefox) Implementieren Sie die schmalen Reihen

### 1.0.8 (04.07.2021)
* (bluefox) Korrigierte Erstellung der Geräte

### 1.0.7 (30.06.2021)
* (bluefox) Korrigierte Erstellung der Ordner

### 1.0.6 (27.06.2021)
* (bluefox) Implementierte die Filter

### 1.0.5 (26.06.2021)
* (bluefox) Implementierung der Bearbeitung des Parameters „states“

### 1.0.4 (08.06.2021)
* (Bluefox) Einige GUI-Fehler behoben

### 1.0.1 (07.06.2021)
* (Bluefox) Wachposten hinzugefügt

### 1.0.0 (07.06.2021)
* (Bluefox) Neue Geräte hinzugefügt

### 0.3.16 (11.03.2021)
* (bluefox) Der Fehler für IDs mit den seltsamen Zeichen wurde behoben

### 0.3.15 (13.12.2020)
* (Bluefox) Der Dialog zur ID-Auswahl wurde aktualisiert.

### 0.3.13 (17.08.2020)
* (Bluefox) Fehler bei optionalen Zuständen behoben

### 0.3.12 (16.08.2020)
* (bluefox) hat den Staubsauger hinzugefügt

### 0.3.10 (12.08.2020)
* (bluefox) hat die Klimaanlage hinzugefügt

### 0.3.6 (17.04.2020)
* (Apollon77) Sentry-Fehlerberichterstattung für Frontend/React hinzugefügt

### 0.3.5 (17.04.2020)
* (Apollon77) Tippfehler behoben

### 0.3.4 (24.03.2020)
* (Bluefox) Fehler bei der Geräteerstellung behoben

### 0.3.2 (09.02.2020)
* (Apollon77) Nutzung mit allen Arten von Admin-Ports und Reverse-Proxys optimiert

### 0.3.1 (09.02.2020)
* (Apollon77) Kompatibilität mit Admin >4.0.0 hinzugefügt

### 0.2.0 (2019-12-20)
* (Bluefox) Backend wurde entfernt

### 0.1.8 (13.11.2019)
* (Bluefox) Erlaubt das Klonen von Geräten

### 0.1.7 (15.09.2019)
* (Bluefox) in Arbeit

### 0.1.2 (04.09.2019)
* (Bluefox) in Arbeit

### 0.1.0 (31.08.2019)
* (Bluefox) Erstveröffentlichung

## License
MIT License

Copyright (c) 2019-2025 bluefox <dogafox@gmail.com>

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