![Logo](admin/parcel.png)

# ioBroker.parcel

[![NPM version](https://img.shields.io/npm/v/iobroker.parcel.svg)](https://www.npmjs.com/package/iobroker.parcel)
[![Downloads](https://img.shields.io/npm/dm/iobroker.parcel.svg)](https://www.npmjs.com/package/iobroker.parcel)
![Number of Installations](https://iobroker.live/badges/parcel-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/parcel-stable.svg)
[![Dependency Status](https://img.shields.io/david/TA2k/iobroker.parcel.svg)](https://david-dm.org/TA2k/iobroker.parcel)

[![NPM](https://nodei.co/npm/iobroker.parcel.png?downloads=true)](https://nodei.co/npm/iobroker.parcel/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.parcel/workflows/Test%20and%20Release/badge.svg)

## Paketverfolgung/Sendungsverfolgung Adapter für ioBroker

Parcel tracking / Sendungsverfolgung
Verfolge mit deinem ioBroker SmartHome deine Pakete von Amazon, DHL, DPD, Hermes, UPS und GLS. Außerdem wirst du über die Briefverfolgung von der deutschen Post informiert. Direkt per Push auf Telegram, Pushover oder Signal.

## Loginablauf

**DHL:**

- DHL App Login eingeben
- SMS/EMail Code erhalten
- In die Instanzeinstellungen eingeben und speichern

**Amazon:**

- Login eingeben
- Wenn nötig vorab ein OTP token aus der 2FA App vor dem ersten Login eingeben.

**DPD, GLS, UPS, 17Track User:**

Login und Passwort eingeben

**Telegram Benachrichtigun für Sendungen und Briefe**

In den Instanz Einstellung aktivieren und z.B. telegram.0 eingeben

## Vis

**Sendungen als Vis Table darstellen**

Datenpunkte alle Sendungen:
parcel.0.allProviderJson

Datenpunkte in Zustellung:
parcel.0.inDelivery

**Widget: json Table**

Anleitung:
https://www.smarthome-tricks.de/software-iobroker/iobroker-vis-json-table-widget-teil-1-basics/

**DHL Briefverfolgung in Vis anzeigen.**

Den Datenpunkt parcel.0.dhl.briefe....image ein "String img src" element als Object ID zuordnen

## Diskussion und Fragen

<https://forum.iobroker.net/topic/51795/test-adapter-parcel-paketverfolgung-dhl-v0-0-1>

## Changelog
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

Copyright (c) 2022-2030 TA2k <tombox2020@gmail.com>

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
