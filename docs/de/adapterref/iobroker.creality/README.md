---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.creality/README.md
title: ioBroker-Adapter für CREALITY 3D-Drucker
hash: 03xHafKJgCX1Vnf1EUcczgmVLVNp9wRN5d/efv/usTQ=
---
![Logo](../../../en/adapterref/iobroker.creality/admin/creality.png)

![Anzahl der Installationen](https://iobroker.live/badges/creality-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/creality-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.creality.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.creality.svg)
![GEMEINSCHAFT](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![WARTUNGSKRAFT](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![KI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# IoBroker-Adapter für CREALITY 3D-Drucker
---

## Was dieser Adapter bewirkt
Verbindet Creality Klipper-Drucker (primäres Ziel: **[SPARKX i7](https://store.creality.com/products/sparkx-i7-3d-printer)** mit CFS lite) über zwei lokale APIs mit ioBroker:

1. **Moonraker HTTP** (Standardport `7125`) – Druckstatistiken, Temperaturen, Lüfter, CFS-Filamentbox, G-Code
2. **Creality WebSocket** (Standardport `9999`) — LED am Werkzeugkopf, Pause/Fortsetzen/Stoppen, Status der Nivellierung/des Selbsttests, verbleibende Zeit (`printLeftTime`)

Moonraker allein reicht nicht aus, um Creality UI-Zustände (z. B. Nivellierung, während Klipper noch `standby` meldet) oder die Werkzeugkopfbeleuchtung zu erfassen.

Hersteller: [Creality](https://www.creality.com/). Andere Creality Klipper-Modelle funktionieren möglicherweise nach bestem Wissen und Gewissen; bisher wurde nur der SPARKX i7 getestet.

## Konfiguration
| Einstellung | Standard | Beschreibung |
|---------|---------|-------------|
| Host / IP | — | Druckeradresse (erforderlich) |
| Moonraker HTTP-Port | `7125` | Fluidd Reverse-Proxy verwendet häufig `4408` |
| Abfrageintervall | `5` s | Moonraker-Umfrage (min. 2 s) |
| Abfrageintervall | `5` s | Moonraker-Umfrage (min. 2 s) |
| API-Schlüssel | leer | Optionale Moonraker-Authentifizierung |
| Drucksteuerung / CFS / Lüfter | ein | Funktionsumschalter für Zustandsbaum |

Ein Drucker pro Adapterinstanz.

## Datenpunkte
Unter `creality.<instance>.*` (Beispiele):

| Bundesland | Beschreibung |
|-------|-------------|
| `state` / `stateKlipper` / `selfTestStep` | UI/Klipper-Status |
| `info.*` | Modell, Firmware, Hostname, Seriennummer, Festplatte, Druckstunden/Aufträge, Fehler |
| `temp.*` | Düse, Bett, Kasten/Kammer |
| `fans.partCooling` | Teilekühlung **UI %** (entspricht der Anzeige des Slicers/Druckers; Creality `fan0_min` Neubelegung) |
| `fans.partCoolingPwm` | Teilekühlung **PWM %** (roher Hardware-Tastgrad von Moonraker) |
| `fans.*` / `cfs.*` | Andere Lüfter / CFS (optional) |
| `control.light` / `sleepMode` / `pause` / `resume` / `stop` | Steuerelemente |
| `webcam.available` | Kamera vorhanden (schreibgeschützt; lokale API kann sie auf SPARKX i7 nicht ausschalten) |
| `webcam.streamUrl` | URL für VIS iframe (Creality WebRTC-Seite, Standard `http://<host>:8000`) |
| `webcam.webrtcUrl` | WebRTC-Signalisierungsendpunkt |
| `webcam.webrtcUrl` | WebRTC-Signalisierungsendpunkt |

**Hinweis zur Webcam:** SPARKX verwendet WebRTC auf Port `8000`, nicht das klassische MJPEG. `webcam.streamUrl` verweist auf die Creality-Viewer-Seite – nutzbar in einem VIS-iFrame, sofern der Browser die IP-Adresse des Druckers erreichen kann. Für Home Assistant/go2rtc verwenden Sie `webcam.webrtcUrl`.

## Unterstützung
Wenn Ihnen unsere Arbeit gefällt und Sie uns unterstützen möchten, freuen wir uns über jede Spende.

(Dieser Link führt zu unserem PayPal-Konto und steht in keiner Verbindung zu ioBroker.)

[![Spenden](img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## Ältere Änderungen
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog

<!--
	### **WORK IN PROGRESS**
-->
### 0.4.1 (2026-08-25)
- (skvarel) Fixed `currentJob.filament*` for external spool holder (`filament_rack`) when CFS is not active

### 0.4.0 (2026-08-20)
- (skvarel) Adapter requires admin >= 7.8.23 now.

### 0.3.0 (2026-08-14)
- (skvarel) Fixed button states `control.pause|resume|stop` to use `read: false`
- (skvarel) Added manufacturer / SPARKX i7 product links to README
- (skvarel) Modified CFS temperature/humidity roles to `value.temperature` / `value.humidity`
- (skvarel) Modified Moonraker poll loop to use `setTimeout` chain instead of `setInterval`
- (skvarel) Modified `currentJob.finishAt` to include local date (`YYYY-MM-DD HH:MM`)

### 0.2.0 (2026-08-08)
- (skvarel) Fixed part cooling fan % to match slicer/display (Creality fan0_min remapping)
- (skvarel) Added `fans.partCoolingPwm` for raw PWM duty cycle

### 0.1.4 (2026-08-02)
- (skvarel) Fixed string state roles for repository object check

## License
MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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