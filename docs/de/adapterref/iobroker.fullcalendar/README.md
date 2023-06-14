---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fullcalendar/README.md
title: ioBroker.fullcalendar
hash: aK2B2glZDSol529TZiHY9yAAyRGwmFS9/XwsNgsuvEU=
---
![Logo](../../../en/adapterref/iobroker.fullcalendar/admin/fullcalendar.png)

![Anzahl der Installationen](http://iobroker.live/badges/fullcalendar-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.fullcalendar.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fullcalendar.svg)
![NPM](https://nodei.co/npm/iobroker.fullcalendar.png?downloads=true)

# IoBroker.fullcalendar
Fahrpläne mit [voller Kalender](https://fullcalendar.io).

## Planen Sie die Ereignisse (steuern Sie Ihre Geräte)
Sie müssen keine externen Ressourcen verwenden, die Terminplanung wird nur in ioBroker verarbeitet und wird nicht mit externen Diensten wie "Google Kalender" oder "iTunes" kombiniert.

![Beispiel](../../../en/adapterref/iobroker.fullcalendar/img/example.png)

Sie können Ihre Ereignisse mit dem Kalender steuern und planen, sie regelmäßig zu steuern.

## Ereignissimulation
Sie können Ihr Verhalten aufzeichnen und später wiedergeben.
So können Sie beispielsweise zwei Aufnahmen für Werktag und Wochenende erstellen und an entsprechenden Tagen wiedergeben.

Oder Sie nehmen die ganze Woche auf und spielen sie während Ihrer Abwesenheit in den nächsten Wochen ab.

Wie benutzt man:

- Gehen Sie zur Registerkarte Simulation
- Erstellen Sie die neue Simulation, indem Sie auf die Schaltfläche "+" klicken, und wählen Sie den Simulationstyp aus: Tag oder Woche
- Klicken Sie auf die Aufnahmeschaltfläche und warten Sie 24 Stunden oder 7 Tage, bis die Simulation stoppt, um Ereignisse aufzuzeichnen
- Jetzt können Sie die Simulation erneut abspielen, indem Sie auf die Wiedergabeschaltfläche klicken. Zusätzlich können Sie den Zeitpunkt festlegen, zu dem die Simulation gestartet werden soll.

## Machen
- Woche und Tag müssen zur aktuellen Uhrzeit scrollen

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
### 2.2.1 (2023-04-25)
* (bluefox) Corrected stop of the recording

### 2.2.0 (2023-04-24)
* (bluefox) Added simulation of events

### 2.0.8 (2023-03-24)
* (bluefox) Corrected vis-2 widgets

### 2.0.5 (2023-03-07)
* (bluefox) New material design
* (bluefox) License changed to MIT
* (bluefox) Allowed deletion of events

### 1.2.0 (2021-12-14)
* (bluefox) Updated to use with js-controller 3.3 and admin 5

### 1.1.0 (2020-01-12)
* (foxriver76) Updated to use with js-controller 2.x

### 1.0.0 (2019-11-17)
* (bluefox) Support of compact mode added

### 0.2.4 (2017-11-23)
* Translations

### 0.2.3 (2017-11-22)
* (bluefox) Fix interval settings
* (bluefox) Update fullcalendar library

### 0.2.1 (2017-09-25)
* (bluefox) Fixed error

### 0.2.0 (2017-08-06)
* (bluefox) Support of new admin

### 0.1.1 (2017-07-13)
* (bluefox) fix double event by creation

### 0.1.0 (2017-03-20)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2023 Bluefox <dogafox@gmail.com>

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