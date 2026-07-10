---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.parcel/README.md
title: ioBroker.parcel
hash: B5JuvLe0ZuWJA2tA5w6LYfLaK6giYB51FW7kHwJg0ck=
---
![Logo](../../../en/adapterref/iobroker.parcel/admin/parcel.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.parcel.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.parcel.svg)
![Anzahl der Installationen](https://iobroker.live/badges/parcel-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/parcel-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.parcel.svg)
![NPM](https://nodei.co/npm/iobroker.parcel.png?downloads=true)

# IoBroker.parcel
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.parcel/workflows/Test%20and%20Release/badge.svg)

## Paketverfolgungsadapter für ioBroker
Verfolgen Sie Pakete von Amazon, DHL, DPD, Hermes, UPS und GLS mit Ihrem ioBroker Smart Home. Auch die Sendungsverfolgung der Deutschen Post wird unterstützt. Benachrichtigungen können direkt via Telegram, Pushover oder Signal versendet werden.

Dieser Adapter verwendet die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Anmeldevorgang
**DHL:**

- DHL-App-Login eingeben
- SMS-/E-Mail-Code erhalten
- Geben Sie den Code in den Instanzeinstellungen ein und speichern Sie ihn.

**Amazonas:**

- Geben Sie die Anmeldedaten ein.
- Geben Sie gegebenenfalls vor der ersten Anmeldung ein OTP-Token aus Ihrer 2FA-App ein.

**DPD, GLS, UPS, 17Track-Nutzer:**

Geben Sie Benutzername und Passwort ein.

**Telegram-Benachrichtigung für Pakete und Briefe**

Aktivieren Sie die Option in den Instanzeinstellungen und geben Sie beispielsweise `telegram.0` ein.

## Vis
**Grundstücke in einer Vis-Tabelle anzeigen**

Datenpunkt für alle Parzellen: `parcel.0.allProviderJson`

Datenpunkt für Pakete in Zustellung: `parcel.0.inDelivery`

**Widget: JSON-Tabelle**

Anleitung: https://www.smarthome-tricks.de/software-iobroker/iobroker-vis-json-table-widget-teil-1-basics/

**DHL-Sendungsverfolgung in Vis anzeigen**

Weisen Sie den Datenpunkt `parcel.0.dhl.briefe....image` einem "String img src"-Element als Objekt-ID zu.

## Diskussion und Fragen
<https://forum.iobroker.net/topic/51795/test-adapter-parcel-paketverfolgung-dhl-v0-0-1>

## Changelog
### 0.3.2 (2026-07-08)
- Fix for DPD
- Fix for GLS

### 0.3.1 (2026-07-07)

- DHL: New login via browser code (dhllogin://)
- Amazon: Login fix and captcha detection with note

### 0.3.0 (2026-04-05)

- DHL: New login via browser code (dhllogin://)
- Amazon: Login fix and captcha detection with note

### 0.2.10 (2025-01-15)

- add alternative way for dhl login
- move dhl connections error to info level

### 0.2.8 (2024-10-18)

- fix amazon login

### 0.0.30

- Fix hermes login

### 0.0.25

- Fix amazon UI parsing

### 0.0.19

- Fix GLS Parcel

### 0.0.18

- Fix UPS/GLS Login

### 0.0.1

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022-2026 TA2k <tombox2020@gmail.com>

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