---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.signifylights/README.md
title: ioBroker.signifylights
hash: AAPv0ouEg+x/UJt9X/gThpZ8S/+ytwHIpuFoJ6Cw6l0=
---
![Logo](../../../en/adapterref/iobroker.signifylights/admin/signifylights.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.signifylights.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.signifylights.svg)
![Anzahl der Installationen](https://iobroker.live/badges/signifylights-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/signifylights-stable.svg)
![NPM](https://nodei.co/npm/iobroker.signifylights.png?downloads=true)
![Test und Freigabe](https://github.com/disaster123/ioBroker.signifylights/workflows/Test%20and%20Release/badge.svg)

# ioBroker.signifylights

## Signifylights-Adapter für ioBroker

Signify Lights Adapter für alle Arten von Signify WLAN-Leuchten wie WIZ, Philips WLAN und viele mehr...

Fragen und Diskussionen dazu finden Sie hier: <https://forum.iobroker.net/topic/69656/test-adapter-signifylights>

### HAFTUNGSAUSSCHLUSS

Dieses Projekt steht in keiner Verbindung zu WIZ, Signify oder Philips und wird weder von diesen Unternehmen finanziert noch ist es in irgendeiner Weise mit ihnen verbunden. Alle Marken- und Produktnamen sind Marken oder eingetragene Marken ihrer jeweiligen Inhaber. Die Nennung eines Unternehmens- oder Produktnamens stellt keine Empfehlung oder Befürwortung dieses Unternehmens oder Produkts unter Ausschluss anderer dar.

## Changelog
### 1.0.0 (2025-04-27)
* signifylights is now stable
* replaced the old device specific code with generic code
  to automatically support new devices without the need to get added

### 0.4.5 (2025-04-21)
* fix minimum deps

### 0.4.4 (2025-04-21)
* fix minimum deps

### 0.4.3 (2025-03-25)
* added ESP25_MHORGB_01
* added ESP24_SHRGB_01
* fix hex color

### 0.4.2 (2024-11-06)
* implement responsive design in config page (thx simatec)

### 0.4.1 (2024-11-02)
* fix eslint 9.x
* add ESP26_SHRGB_01: WIZ Wi-Fi BLE ST64 E27 822-65 RGB CL
* add ESP25_SHRGB_01: added (WiZ Wi-Fi BLE 60W A60 E27 822-65 RGB)
* various stuff from adapter check

### 0.3.1 (2023-11-27)
* fix scenes for ESP03_SHTWP_31, ESP24_SHRGBW_01, ESP06_SHTW1_01
* retry to release v0.3.1

### 0.3.0 (2023-10-27)
* several translation fixes
* replace logo
* use adapter interval instead of timeout
* new DEVICES: ESP24_SHRGBC_01 + ESP25_SHWRGB_01 + ESP15_SHRGB1S_01I
* config: allow to run without udp mac and ip set

### 0.2.0 (2023-05-02)
* more setTimeout fixes

### 0.1.1 (2023-05-01)
* fix setTimeout calls in async functions

### 0.1.0 (2023-05-01)
* various fixes and changes to become an official adapter

### 0.0.6 (2023-04-30)
* first release under new name

## License
MIT License

Copyright (c) 2025 disaster123 <stefan-iobroker@prie.be>

originally developed by Copyright (c) 2022 nxtstep <privat@konzeptplus.net>

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