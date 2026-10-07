---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.evcc/README.md
title: ioBroker.evcc
hash: E4kx+OqH3dq0I2dJq8IWxjrTJGxQYP/X9ePHv6k+ixA=
---
![Logo](../../../en/adapterref/iobroker.evcc/admin/evcc.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.evcc.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.evcc.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/evcc-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/evcc-stable.svg)
![NPM](https://nodei.co/npm/iobroker.evcc.png?downloads=true)
![Test und Freigabe](https://github.com/Newan/ioBroker.evcc/workflows/Test%20and%20Release/badge.svg)

# ioBroker.evcc

## evcc-Adapter für ioBroker

Steuerung von EVCC über die REST-API

Forum: <https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc>

## Lademodus (evcc >= 0,316,0)

evcc 0.316.0 hat den Modus umbenannt `pv` Zu `smart` und ersetzt `minpv` mit der separaten Einstellung `alwaysCharge` ( [evcc PR #32490](https://github.com/evcc-io/evcc/pull/32490) ). Der Adapter erkennt die evcc-Version automatisch und funktioniert auch mit älteren Versionen.

| Zustand                                     | Werte                                                  | Notiz                                                                              |
| ------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `loadpoint.X.control.off` /`.now` /`.smart` | Taste                                                  | Modus einstellen                                                                   |
| `loadpoint.X.control.alwaysCharge`          | `off`, `on`, `once`                                    | evcc >= 0.316.0 only, `once` Wird zurückgesetzt, wenn das Fahrzeug abgeklemmt wird. |
| `loadpoint.X.control.pvControl`             | `0` aus, `1` schlau, `2` Smart + immer aufladen `3` Jetzt | spiegelt nun auch den aktuellen EVCC-Modus wider.                                  |
| `loadpoint.X.control.pv` /`.min`            | Taste                                                  | veraltet, zugeordnet zu smart + alwaysCharge aus / ein                             |

**Fehler bei Skripten/Visualisierungen:** mit evcc >= 0.316.0, `loadpoint.X.status.mode` Berichte `smart` anstatt `pv` /`minpv`. Verwenden `loadpoint.X.status.alwaysCharge` oder `loadpoint.X.control.pvControl` um den früheren min+pv-Modus zu unterscheiden.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (arteck) Dependencies have been updated

### 0.3.0 (2026-10-02)
* (Schimi1983) support evcc 0.316 mode redesign: new `control.smart` and `control.alwaysCharge`, `pvControl` reflects the evcc mode
* (Schimi1983) fix: request timeout was sent as POST body and never applied
* (arteck) Dependencies have been updated

### 0.2.10 (2026-07-15)
* (arteck) add configurable weather forcast grid

### 0.2.9 (2026-07-15)
* (arteck) add grid request

### 0.2.8 (2026-03-09)
* (arteck) reduce read request, static dp read only once

### 0.2.7 (2026-03-09)
* (arteck) delete big arrays feedin, grid, planner
* (arteck) refactor tests

## License
MIT License

Copyright (c) 2025-2026 Newan <info@newan.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and asSociated documentation files (the "Software"), to deal
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