---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: 6a/jPRtdR/DfVuGhoLx+Fo57e3c0pWDg9gcKiVUJKmo=
---
![Logo](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![Anzahl der Installationen](http://iobroker.live/badges/philips-air-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.philips-air.svg)

# IoBroker.philips-air
![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Philips Luftreinigeradapter für ioBroker
Verbindet Philips Luftreiniger mit ioBroker.
**Nur mit AC2729 getestet**, sollte aber mit neuen Reinigern funktionieren, die über COAP mit Verschlüsselung kommunizieren.
![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[Link zur Philips-Website](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Verwendungszweck
Nur die IP-Adresse des Geräts ist erforderlich. Finden Sie es in Ihrem Router (z. B. `MiCO`).
Es kann vorkommen, dass einige Geräte nicht alle Variablen haben und diese im Objektbaum ungefüllt bleiben.

![Objekte](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## Changelog
### 0.1.3 (2022-03-12)
* (Apollon77) General updates and optimizations

### 0.1.1 (2020-10-14)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2022 ioBroker <dogafox@gmail.com>

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