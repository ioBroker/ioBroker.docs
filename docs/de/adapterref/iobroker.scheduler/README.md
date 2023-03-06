---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.scheduler/README.md
title: ioBroker Scheduler-Adapter
hash: jaR2G1Z9ybzfi/jsgg5FlS2Ynf3eN1g9q1TD0/IjCbY=
---
![Logo](../../../en/adapterref/iobroker.scheduler/admin/scheduler.png)

![Anzahl der Installationen](http://iobroker.live/badges/scheduler-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.scheduler.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.scheduler.svg)
![NPM](https://nodei.co/npm/iobroker.scheduler.png?downloads=true)

# IoBroker Scheduler-Adapter
Dieser Adapter wurde entwickelt, um Geräte nach einem Zeitplan zu steuern. Zum Beispiel Heizungs- oder Bewässerungssteuerung.

Sie können die Profile mit unterschiedlicher Priorität erstellen: normal (z. B. Werktage), hoch (z. B. Wochenende) und am höchsten (z. B. für Feiertage).
Das Profil mit der höheren Priorität überlastet andere Profile.

Für jedes Profil wird die aktive Variable erstellt. Der Benutzer kann jedoch eine eigene Aktivierungsvariable auswählen, z. Feiertage zu kontrollieren.

Der Benutzer sollte Geräte zum Profil hinzufügen und alle Geräte im Profil werden auf denselben Wert gesetzt.

Dieser Adapter hat ein vis2-Widget.

![Bildschirmfoto](../../../en/adapterref/iobroker.scheduler/img/scheduler.png)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
### 1.1.2 (2023-03-02)
* (bluefox) Added widget for vis-2

### 1.0.4 (2022-12-23)
* (bluefox) Updated GUI packages

### 1.0.3 (2022-06-22)
* (bluefox) Made it work with ioBroker cloud

### 1.0.2 (2022-06-20)
* (bluefox) Corrected the problem with `socket.io`

### 1.0.1 (2022-06-20)
* (bluefox) Allowed to work behind reverse proxy

### 1.0.0 (2022-03-22)
* (bluefox) GUI migrated to material@5

### 0.1.3 (2022-03-22)
* (bluefox) Just the packages were updated

### 0.1.2 (2021-09-14)
* (bluefox) "Sentry" was added

### 0.1.1 (2021-09-13)
* (bluefox) Initial release

### 0.1.0 (2021-05-19)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2021-2023 bluefox <dogafox@gmail.com>

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