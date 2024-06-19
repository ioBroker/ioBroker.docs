---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.smartthings/README.md
title: ioBroker.smartthings
hash: Q47BVVpyPnZejeYC0pAFCqs/NiNWvj6Zwvwp8fmtZpE=
---
![Logo](../../../en/adapterref/iobroker.smartthings/admin/smartthings.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.smartthings.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.smartthings.svg)
![Anzahl der Installationen](https://iobroker.live/badges/smartthings-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/smartthings-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.smartthings.svg)
![NPM](https://nodei.co/npm/iobroker.smartthings.png?downloads=true)

# IoBroker.smartthings
**Tests:** ![Testen und Freigeben](https://github.com/TA2k/ioBroker.smartthings/workflows/Test%20and%20Release/badge.svg)

## Smartthings-Adapter für ioBroker
Adapter für Samsung Smartthings

## Anmeldevorgang:
Besuchen Sie den Link. https://account.smartthings.com/tokens Melden Sie sich mit Ihrem Samsung-Konto an, um zur Seite „Persönliche Zugriffstoken“ zu gelangen.

Tippen Sie auf die Schaltfläche „Neues Token generieren“, um zur Seite „Neues Zugriffstoken“ zu gelangen.

Geben Sie einen Namen für das neue Token ein. Wählen Sie im Abschnitt „Autorisierte Bereiche“ alle Funktionen aus, die Sie für das Token autorisieren möchten.

Tippen Sie auf die Schaltfläche „Token generieren“, wenn Sie fertig sind, und Sie werden zur Seite „Persönliche Zugriffstoken“ zurückgeleitet. Kopieren Sie das neu generierte Token und bewahren Sie es an einem sicheren Ort auf. Dies ist Ihre einzige Möglichkeit, den neu generierten Tokenwert abzurufen.

## Lenken
smartthings.0.id.capabilities entweder auf true setzen oder einen vordefinierten Wert festlegen

## Diskussion und Fragen:
https://forum.iobroker.net/topic/48091/test-adapter-samsung-smartthings-v-0-0-x

## Changelog
### 0.1.2 (2024-05-19)

- Update Dependencies

- 0.1.0 Added object excluding to reduce cpu usage

- 0.0.4 Reduced cpu load while writing states

- 0.0.3 (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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