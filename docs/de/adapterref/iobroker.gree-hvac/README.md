---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.gree-hvac/README.md
title: iobroker.gree-hvac
hash: MsbsiEqqFGmnBK3nPZW4/lrI1zumEhj+80UUJ3NPpNY=
---
![Logo](../../../en/adapterref/iobroker.gree-hvac/admin/air-conditioner.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.gree-hvac.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.gree-hvac.svg)
![Anzahl der Installationen](https://iobroker.live/badges/template-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/gree-hvac-stable.svg)

# Iobroker.gree-hvac
**Tests:** [![Testen und Freigeben](https://github.com/xhunter74/ioBroker.gree-hvac/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/xhunter74/ioBroker.gree-hvac/actions/workflows/test-and-release.yml)

Adapter für Klimaanlagen von Gree und C&H

## Unterstützte Geräte
Alle Geräte, die über die EWPE Smart App gesteuert werden können, sollten unterstützt werden, darunter:

- Gree Smart-Serie
- Cooper&Hunter: Supreme, Vip Inverter, ICY II, Arctic, Alpha, Alpha NG, Veritas, Veritas NG-Serie
- EcoAir X-Serie
- ProKlima

**Bitte beachten Sie, dass neue und möglicherweise auch alte Klimaanlagen ohne Internetzugang nicht funktionieren. Sie reagieren einfach nicht mehr auf Adapteranfragen.**

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Danksagungen
- [tomikaa87](https://github.com/tomikaa87) für das Reverse Engineering des Gree-Protokolls
- [stas-demydiuk](https://github.com/stas-demydiuk) für den Code von DeviceManager
- Sizenko Alexander für Digital-7-Schriftarten

## Changelog
### 1.0.0 (2024-05-31)
 - Small fixes. Ready to production.
### 0.0.14 (2024-04-15)
 - First version of the adapter

## License
MIT License

Copyright (c) 2024 Serhiy Krasovskyy xhunter74@gmail.com

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