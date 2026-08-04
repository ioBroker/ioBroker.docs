---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bestway/README.md
title: ioBroker.bestway
hash: apGwzfF2poEGb49C0SsMpbAiTa1ZPGSNkYwhVWEIx8M=
---
![Logo](../../../en/adapterref/iobroker.bestway/admin/bestway.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.bestway.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bestway.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bestway-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/bestway-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.bestway.svg)
![NPM](https://nodei.co/npm/iobroker.bestway.png?downloads=true)

# IoBroker.bestway
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.bestway/workflows/Test%20and%20Release/badge.svg)

## Bestway-Adapter für ioBroker
Adapter für Bestway Smart Hub (V1) und Bestway Connect / Smart Spa (V2).

Es werden zwei Gerätegenerationen unterstützt, die in den Adaptereinstellungen ausgewählt werden:

- **V1 – Bestway Smart Hub** (ältere Modelle, Gizwits-Backend): Melden Sie sich mit der App-E-Mail-Adresse und dem Passwort an und wählen Sie das Land aus.
- **V2 – Bestway Connect / Smart Spa** (UltraFit-Modelle ab 2025, AWS IoT-Backend): Kopplung über QR-Code oder Android-ID und Auswahl der Region.

## Wächter
Dieser Adapter verwendet die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Anmeldeablauf:
### V1 (Bestway Smart Hub)
Die Bestway Smart Hub App Mail und Passwort eingeben und das Land auswählen.

### V2 (Bestway Connect / Smart Spa)
Generation „V2“ auswählen und die Region wählen. Dann eine der beiden Kopplungsmethoden nutzen:

- **QR-Code** (iOS und Android): In der Bestway Connect App unter Geräteeinstellungen > Gerätefreigabe den QR-Code anzeigen, ihn dekodieren (z.B. über https://scanqr.org/) und den Text (beginnt mit `RW_Share_`) in den Adapter eintragen. Der Code ist nur wenige Minuten gültig und wird einmalig zur Kopplung verwendet.
- **Android-ID** (nur Android): Die in der Bestway Connect App unter dem Profil angezeigte ID eintragen. Damit wird das bestehende Konto samt gekoppelter Geräte direkt verwendet, ohne QR-Code.

## Steuern
- V1: `bestway.0.<id>.remote.*` bzw. `remotev2.*` setzt den jeweiligen Befehl.
- V2: `bestway.0.<id>.remotev3.*` setzt steuert den jeweiligen Befehl (power, heat, filter, jet, wave, temp_set, Locked).

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