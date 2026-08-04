![Logo](admin/bestway.png)

# ioBroker.bestway

[![NPM version](https://img.shields.io/npm/v/iobroker.bestway.svg)](https://www.npmjs.com/package/iobroker.bestway)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bestway.svg)](https://www.npmjs.com/package/iobroker.bestway)
![Number of Installations](https://iobroker.live/badges/bestway-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/bestway-stable.svg)
[![Dependency Status](https://img.shields.io/david/TA2k/iobroker.bestway.svg)](https://david-dm.org/TA2k/iobroker.bestway)

[![NPM](https://nodei.co/npm/iobroker.bestway.png?downloads=true)](https://nodei.co/npm/iobroker.bestway/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.bestway/workflows/Test%20and%20Release/badge.svg)

## bestway adapter for ioBroker

Adapter for Bestway Smart Hub (V1) and Bestway Connect / Smart Spa (V2).

Two device generations are supported, selected in the adapter settings:

- **V1 – Bestway Smart Hub** (older models, Gizwits backend): log in with the app email and password and select the country.
- **V2 – Bestway Connect / Smart Spa** (UltraFit models from 2025, AWS IoT backend): pair via QR code or Android ID and select the region.

## Sentry

This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers. For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Loginablauf:

### V1 (Bestway Smart Hub)

Die Bestway Smart Hub App Mail und Passwort eingeben und das Land auswählen.

### V2 (Bestway Connect / Smart Spa)

Generation "V2" auswählen und die Region wählen. Dann eine der beiden Kopplungsmethoden nutzen:

- **QR-Code** (iOS und Android): In der Bestway Connect App unter Geräteeinstellungen > Gerätefreigabe den QR-Code anzeigen, ihn dekodieren (z.B. über https://scanqr.org/) und den Text (beginnt mit `RW_Share_`) im Adapter eintragen. Der Code ist nur wenige Minuten gültig und wird einmalig zur Kopplung verwendet.
- **Android-ID** (nur Android): Die in der Bestway Connect App unter Profil angezeigte ID eintragen. Damit wird das bestehende Konto samt gekoppelter Geräte direkt verwendet, ohne QR-Code.

## Steuern

- V1: `bestway.0.<id>.remote.*` bzw. `remotev2.*` setzen steuert den jeweiligen Befehl.
- V2: `bestway.0.<id>.remotev3.*` setzen steuert den jeweiligen Befehl (power, heat, filter, jet, wave, temp_set, locked).

## Diskussion und Fragen:

https://forum.iobroker.net/topic/48023/test-adapter-bestway-v0-0-x

## Changelog

### 0.1.0

Support for Bestway Connect / Smart Spa (V2, AWS IoT backend) with QR code or Android ID pairing and realtime WebSocket updates.

### 0.0.5

Support for v2 pump version

### 0.0.1

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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
