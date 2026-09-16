---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wifilight/README.md
title: ioBroker.wifilight
hash: gUKpuilzpmoSVpPu3JBnVMlvhSmGQR+h+f2breqFYxA=
---
![Logo](../../../en/adapterref/iobroker.wifilight/admin/wifilight.png)

![Anzahl der Installationen](http://iobroker.live/badges/wifilight-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.wifilight.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.wifilight/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/wifilight/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wifilight.svg)

# ioBroker.wifilight

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Beschreibung

ioBroker-Adapter für WLAN-Licht

## Info

Unterstützt LW12, LD382 und LD382A. Unterstützung für Mi-Light/LimitlessLED RGBW hinzugefügt.

## Erste Erstellung

Dieser Adapter wurde ursprünglich von @soef unter <https://github.com/soef/ioBroker.wifilight> erstellt, wird aber nicht mehr weiterentwickelt. Daher haben wir ihn in die iobroker-community verschoben, damit Fehler behoben werden können. Vielen Dank an @soef für seine Arbeit.

### So verwenden Sie den Befehl „Status“:

- Mögliche Kennungen sind:`red, r, green, g, blue, b, bri, sat, transition, on, off`
- Die Zeichenkette kann ein JSON-Objekt mit oder ohne Klammern sein.
- Sie können auch einen Wert zuweisen mit =
- Farbpalette:`0..255`
- Bri-Bereich:`0..100`

Einige Beispiele:

```
r = 100; g = 250, b = 100
r: 0, g: 0, b = 255
red: 200, green: 0, blue: 0
{r:100, b: 200, transition: 20}
off
on
{on:0}
```

Um die Farbe zu ändern, müssen Sie nicht alle drei Werte verwenden. Zum Beispiel:`red = 0` Die Farben Blau und Grün bleiben unverändert.

### r, g, b, w Staaten:

- Werte 0..255
- \#rrggbb\[ww]

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 2.0.3 (2025-01-29)
* (bluefox) Trying to reconnect after the EHOSTUNREACH error code
* (mcm1957) Dependencies have been updated

### 2.0.1 (2024-09-06)
* (bluefox) Corrected error with array comparison
* (bluefox) Added tests

### 2.0.0 (2024-09-05)
* (bluefox) The adapter was completely refactored
* (bluefox) Added compact mode
* (bluefox) JSON config GUI added

### 1.3.5 (2024-09-04)
* (bluefox) Formatting of the code

### 1.3.3 (2024-09-03)
* (bluefox) Just renamed some functions

### 1.3.2 (2024-08-12)
* (mcm1957) files section has been fixed

### 1.3.1 (2024-08-12)
* (p-kehling) Added ignorance of acknowledgement messages for on/off commands
* (bluefox) refactoring

### 1.2.2 (2024-04-15)
* (mcm1957) Fix js-controller dependency

### 1.2.1 (2024-04-13)
* (mcm1957) Dependencies have been updated

### 1.2.0 (2024-04-13)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.4 (2022-06-17)
* (Apollon77) Prevent a crash case reported by sentry

### 1.1.3 (2022-04-27)
* (Apollon77) Prevent a crash case reported by sentry

### 1.1.2 (2022-04-19)
* (Apollon77) Prevent crashes when states are controlled with null as value

### 1.1.1 (2022-04-17)
* (Apollon77) Prevent error logs with js-controller 3+
* (Apollon77) Added sentry for error reporting

### 1.1.0 (2020-04-09)
* (foxriver76) compatibility for js-c 3

### 1.0.0 (2019-10-18)
* (ldittmar) first version for the community

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/iobroker.wifilight/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2020-2022 ioBroker Community Developers, 2019-2020 soef <soef@gmx.net>, 

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