---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.witmotion/README.md
title: ioBroker WitMotion
hash: aiQstHCtBTep6w6TDMEZcwOqb+TMIMoQQZn56mt0azM=
---
![Logo](../../../en/adapterref/iobroker.witmotion/admin/witmotion.png)

![Anzahl der Installationen](http://iobroker.live/badges/witmotion-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.witmotion.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.witmotion.svg)

# IoBroker WitMotion
![Test und Freigabe](https://github.com/ioBroker/ioBroker.witmotion/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/witmotion/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

![WT901blecl](../../../en/adapterref/iobroker.witmotion/image/wit-wt901blecl-5-0.jpg)

Liest Daten vom WT901blecl 5.0 Bluetooth 5.0 9-Achsen IMU-Sensor (MPU9250) über USB und schreibt sie in ioBroker-Datenpunkte.

Folgende Daten werden in ioBroker gelesen und geschrieben:

- Beschleunigung X/Y/Z
- Gyroskop X/Y/Z
- Magnetometer X/Y/Z

## Unterstützte Geräte
- [WT901blecl 5.0](https://witmotion-sensor.com/products/bluetooth-5-0-accelerometer-inclinometer-wt901blecl-mpu9250-9-axis-imu-sensor)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 0.0.4 (2026-03-26)
* (@GermanBluefox) Tests fixed

### 0.0.3 (2026-01-23)
* (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2026, Denis Haev <dogafox@gmail.com>

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