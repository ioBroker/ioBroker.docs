---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.parcel/README.md
title: ioBroker.parcel
hash: 7cvQOyLX+zcsJH5PADrSXGdkIjUUz0EpuPHPuEHFYD4=
---
![Logo](../../../en/adapterref/iobroker.parcel/admin/parcel.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.parcel.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.parcel.svg)
![Anzahl der Installationen](https://iobroker.live/badges/parcel-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/parcel-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.parcel.svg)
![NPM](https://nodei.co/npm/iobroker.parcel.png?downloads=true)

# IoBroker.parcel
**Tests:** ![Testen und freigeben](https://github.com/TA2k/ioBroker.parcel/workflows/Test%20and%20Release/badge.svg)

##Paketverfolgung/Sendungsverfolgung Adapter für ioBroker
Paketverfolgung / Sendungsverfolgung Folgen mit deinem ioBroker SmartHome Pakete deine von Amazon, DHL, DPD, Hermes, UPS und GLS. Außerdem wirst du über die Briefverfolgung von der deutschen Post informiert. Direkt per Push auf Telegram, Pushover oder Signal.

## Anmeldeablauf
**DHL:**

* DHL-App-Login eingeben
* SMS/EMail-Code erhalten
* In die Instanzeinstellungen eingeben und speichern

**Amazonas:**

* Anmelden eingeben
* Wenn nötig vorab ein OTP-Token aus der 2FA-App vor dem ersten Login eingeben.

**DPD, GLS, UPS, 17Track-Benutzer:**

Login und Passwort eingeben

**Telegramm Benachrichtigun für Sendungen und Briefe**

In den Instanz Einstellung aktivieren und z.B. Telegramm.0 eingeben

## Sicht ##
**Sendungen als Vis Table darstellen**

Datenpunkte alle Sendungen: packet.0.allProviderJson

Datenpunkte in Zustellung: packet.0.inDelivery

**Widget: json-Tabelle**

Anleitung: https://www.smarthome-tricks.de/software-iobroker/iobroker-vis-json-table-widget-teil-1-basics/

**DHL Briefverfolgung in Vis anzeigen.**

Den Datenpunkt packet.0.dhl.briefe....image ein "String img src"-Element als Objekt-ID zuordnen

##Diskussion und Fragen
<https://forum.iobroker.net/topic/51795/test-adapter-parcel-paketverfolgung-dhl-v0-0-1>

## Changelog

### 0.0.1

* (TA2k) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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