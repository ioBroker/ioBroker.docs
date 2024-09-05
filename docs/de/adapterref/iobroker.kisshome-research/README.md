---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kisshome-research/README.md
title: ioBroker KISSHome-Recherche
hash: IaoRXgWR3mdcumGVGnenL+3KWpO7G+xiW+N6GrOq0EM=
---
![Logo](../../../en/adapterref/iobroker.kisshome-research/admin/kisshome-research.png)

![Anzahl der Installationen](http://iobroker.live/badges/kisshome-research-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.kisshome-research.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kisshome-research.svg)

# IoBroker KISSHome-Recherche
![Testen und Freigeben](https://github.com/ioBroker/ioBroker.kisshome-research/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/kisshome-research/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser Spezialadapter wurde für das Forschungsprojekt KISSHome entwickelt. Er ist nicht für den allgemeinen Gebrauch bestimmt.

Um diesen Adapter zu verwenden, müssen Sie sich zunächst auf der [KISSHome-Forschung](https://kisshome-feldversuch.if-is.net)-Website registrieren und die Bestätigungs-E-Mail erhalten.

Um diesen Adapter auszuführen, benötigen Sie:

- Mehr als 3 Smart-Home-Geräte
- Fritz!Box Router. Ohne „Fritz!Box“ funktioniert der Adapter nicht.
- iobroker muss unter Debian/Raspbian laufen (oder zumindest unter Linux, wo die folgenden Befehle verfügbar sind: „which“, „rsync“)

## Aufgaben
Erkennen Sie IP-Adressen von:

- [X] hm-rpc (Homematic CCU),
- [X] Loxon,
- [X] Shelly,
- [X] mqtt
- [X] tr-064,
- [-] alexa-2 - nicht möglich, da Alexa keine IP-Adressen liest
- [X] Sonoff,
- [X] Modbus,
- [X] Farbton (Philips-Farbton),
- [-] tuya - nicht möglich, Es kommuniziert mit der Cloud
- [X] mqtt-client,
- [-] Synology - es ist ein Multifunktionsgerät - ignoriere es,
- [X] Sonos,
- [X] mihome-Vakuum,
- [ ] hmip (Homematic Cloud),
- [ ] Heimverbindung,
- [ ] wled (ESP8266/ESP32),
- [ ] vereinen,
- [X] Harmonie,
- [-] Samsung (TV) - zu viele Daten,
- [-] onvif (Webkameras) - zu viele Daten,
- [-]Kameras (URL oder IP-Kameras) - zu viele Daten,
- [-] proxmox - nicht möglich, da Alexa keine IP-Adressen liest
- [ ] broadlink2,
- [-] lgtv - zu viele Daten,
- [ ] knx (KNX-Gateway),
- [ ] lcn,
- [ ] Homekit-Controller,
- [ ] upnp,
- [X] openknx,
- [ ] meross

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 0.3.1 (2024-08-31)
* (bluefox) Added detection of some IPs

### 0.2.1 (2024-08-28)
* (bluefox) used valid URL address

### 0.1.1 (2024-08-20)
* (bluefox) Used MD5 for the file consistency check

### 0.1.0 (2024-08-19)
* (bluefox) File upload was implemented

### 0.0.3 (2024-08-14)
* (bluefox) Added the recording enabled option

### 0.0.2 (2024-07-22)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2024 Denis Haev <dogafox@gmail.com>

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