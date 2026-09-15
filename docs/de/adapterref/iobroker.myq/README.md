---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.myq/README.md
title: ioBroker.myq
hash: Mca8nENc6cfG8gyDVhl8wRT2Vne85XVmANhqds1JIv0=
---
![Logo](../../../en/adapterref/iobroker.myq/admin/myq.png)

![Anzahl der Installationen](http://iobroker.live/badges/myq-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.myq.svg)
![NPM](https://nodei.co/npm/iobroker.myq.png?downloads=true)
![Stabil](http://iobroker.live/badges/myq-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.myq.svg)
![Build-Status](https://travis-ci.org/StrathCole/ioBroker.myq.svg?branch=master)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# ioBroker.myq

Ein ioBroker-Adapter für MyQ (Chamberlain/Liftmaster). Dieses Projekt steht in keiner Verbindung zu den genannten Unternehmen.\
&#x20;Um den Adapter zu verwenden, fügen Sie eine Instanz hinzu und geben Sie Ihren myQ-Benutzernamen und Ihr Passwort auf dem Konfigurationsbildschirm ein.

## Staaten

Nicht alle Bundesstaaten sind für alle Gerätetypen verfügbar.

`myq.0.devices.<id>.info.MyQDeviceTypeId` - Die Art des Geräts in numerischer Form\
`myq.0.devices.<id>.info.MyQDeviceTypeName` - Die für Menschen lesbare Typenbezeichnung des Geräts, z. B. Gateway oder Garagentoröffner\
`myq.0.devices.<id>.info.SerialNumber` - Die Seriennummer des Geräts\
`myq.0.devices.<id>.info.desc` - Der vom Benutzer angegebene Name des Geräts\
`myq.0.devices.<id>.info.fwver` - Die aktuelle Firmware-Version des Geräts\
`myq.0.devices.<id>.info.name` - Der interne Gerätename (nicht der vom Benutzer angegebene)\
`myq.0.devices.<id>.info.numdevices` - (Gateway) Die Anzahl der mit diesem Gateway verbundenen Geräte\
`myq.0.devices.<id>.info.online` Das Gerät ist aktuell mit der Cloud verbunden und erreichbar.\
`myq.0.devices.<id>.states.IsFirmwareCurrent` -`true` , vorausgesetzt, die Geräte-Firmware ist auf dem neuesten Stand\
`myq.0.devices.<id>.states.ishomekitactive` -`true` wenn die HomeKit-Nutzung für dieses Gerät aktiviert ist\
`myq.0.devices.<id>.states.ishomekitcapable` -`true` , sofern das Gerät HomeKit-fähig ist\
`myq.0.devices.<id>.states.doorstate` - (Garagentor) Zustand des Tores (siehe Torzustände)\
`myq.0.devices.<id>.states.moving` -`true` , wenn sich die Tür gerade bewegt

### Türzustände

- 1: Die Tür ist offen
- 2: Die Tür ist geschlossen
- 3: Die Tür wurde gestoppt
- 4: Die Tür öffnet sich
- 5: Die Tür schließt sich.
- 8: Die Tür bewegt sich
- 9: Die Tür befindet sich in einem undefinierten Zustand (nicht geschlossen).

## Befehle

`myq.0.devices.<id>.commands.close` - Tür schließen\
`myq.0.devices.<id>.commands.open` - Tür öffnen

## Spenden

[![PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=SFLJ8HCW9T698\&source=url)

## Changelog

### 0.4.0

-  Updated myq library @hjdhjd/myq to new major version
-  minimum NodeJS version is now 18.x

### 0.3.1

-  Updated myq library @hjdhjd/myq

### 0.3.0

-  Switched to myq library @hjdhjd/myq

### 0.2.0

-  Switched to myq-api library

### 0.1.2

-  Poll states after sending command

### 0.1.1

-  Code rework and several bugs fixed

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2020 Marius Burkard

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