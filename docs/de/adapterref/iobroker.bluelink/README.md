---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bluelink/README.md
title: ioBroker.bluelink
hash: inkFQp6zwYo6kwaA+Xp8O0pg/F6hB6tYSDGyCnXCoWA=
---
![Logo](../../../en/adapterref/iobroker.bluelink/admin/bluelink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.bluelink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bluelink.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/bluelink-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/bluelink-stable.svg)
![Test und Freigabe](https://github.com/Newan/iobroker.bluelink/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/bluelink/svg-badge.svg)
![NPM](https://nodei.co/npm/iobroker.bluelink.png?downloads=true)

# ioBroker.bluelink

## Bluelink-Adapter für ioBroker

Adapter zur Steuerung von Hyundai- oder Kia-Fahrzeugen (bis 2023)

[Diskussion](https://forum.iobroker.net/topic/43592/adapter-hyundai-bluelink-oder-kia-uvo)

[Anmeldeinformationen](https://developers.kia.com/web/v1/kia/specification/account/account_authorize)

[Token-Generierung](https://github.com/Newan/ioBroker.bluelink/tree/master/py) oder [Workaround mit Token](https://forum.iobroker.net/topic/43592/adapter-hyundai-bluelink-oder-kia-uvo/2249?_=1761189451343)

[Wiki](https://github.com/Newan/ioBroker.bluelink/wiki)

---

## Spende

[![](https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=L55UBQJKJEUJL)

## Changelog
### 3.1.33 (2026-08-22)
* (ipod86) Fix EU Hyundai/Kia login

### 3.1.32 (2026-08-20)
* (ipod86) Fix EU Hyundai/Kia login

### 3.1.31 (2026-08-11)
* (arteck) Dependencies have been updated

### 3.1.30 (2026-08-11)
* (meistermopper) Fix vehicle location data extraction for Kia and Hyundai CCS2 vehicles and prioritize dedicated location API
* (meistermopper) Add control.force_location button and implement live telematics POST location/status polling directly from vehicle hardware
* (meistermopper) Fix TypeScript type definitions and unsafe property access in status parsing

### 3.1.29 (2026-08-05)
* (copilot) Adapter requires node.js >= 22 now
* (ipod86) add Tokenmanager

[Older changelogs can be found there](https://github.com/Newan/ioBroker.bluelink/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 Newan <info@newan.de>

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