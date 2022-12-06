---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.teslamateapi/README.md
title: ioBroker.teslamateapi
hash: soSS6WongH1psOFoLEVVCZ66r0DQCoIomBjbzTHWKbA=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.teslamateapi.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.teslamateapi.svg)
![Anzahl der Installationen](https://iobroker.live/badges/teslamateapi-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/teslamateapi-stable.svg)
![NPM](https://nodei.co/npm/iobroker.teslamateapi.png?downloads=true)

<img src="/admin/teslamate.svg" alt="Logo" style="max-width: 100%;" width="100">

# IoBroker.teslamateapi
**Tests:** ![Testen und freigeben](https://github.com/virusbrain/ioBroker.teslamateapi/workflows/Test%20and%20Release/badge.svg)

## Teslamateapi-Adapter für ioBroker
Steuern Sie Ihr Auto über die TeslaMateApi!

TeslaMateApi ist eine RESTful-API zum Abrufen von Daten, die vom selbst gehosteten Datenlogger TeslaMate in JSON gesammelt wurden. Die Anwendung finden Sie hier: https://github.com/tobiasehlert/teslamateapi

Dieser Adapter liefert den Status Ihres Autos über TeslaMateApi und Telsmate. Sie können auch einige Befehle an Ihr Auto senden. Aktuell werden folgende Befehle unterstützt:

- Wach auf
- Blitzlichter
- charge_port_door_open
- charge_port_door_close
- charge_start
- charge_stop
- Türschloss
- door_unlock
- auto_conditioning_start
- auto_conditioning_stop

Mit diesem Adapter können Sie auch einige Einstellungen Ihres Autos vornehmen. Derzeit sind diese implementiert:

- charge_limit
- Lade_Ampere

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.7 (2022-11-09)
* (virusbrain) Fix automatic wake_up

### 0.0.6 (2022-11-09)
* (virusbrain) Fixed axios import

### 0.0.5 (2022-11-09)
* (virusbrain) Updated dependencies

### 0.0.4 (2022-11-09)
* (virusbrain) Fixed forced wake up.

### 0.0.3 (2022-10-11)
* (virusbrain) Second try to make intervals unload safe

### 0.0.2 (2022-09-27)
* (virusbrain) Fixed clearInterval
* (virusbrain) Fixed logo size

### 0.0.1 (2022-09-24)
* (virusbrain) Intial beta elease

## License
MIT License

Copyright (c) 2022 virusbrain <github@eideo.de>

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