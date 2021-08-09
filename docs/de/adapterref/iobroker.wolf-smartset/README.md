---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wolf-smartset/README.md
title: ioBroker.wolf-smartset
hash: bN4EaqQHjH+xkpBdJY/ae+/E/cw7hkfnSrA3rs6ob9A=
---
![Logo](../../../en/adapterref/iobroker.wolf-smartset/admin/wolf-smartset.png)

![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.wolf-smartset.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wolf-smartset.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/wolf-smartset-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.wolf-smartset.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset/badge.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/wolf-smartset-stable.svg)
![NPM](https://nodei.co/npm/iobroker.wolf-smartset.png?downloads=true)

# IoBroker.wolf-smartset
![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/workflows/Test%20and%20Release/badge.svg)

## Wolf-Smartset-Adapter für ioBroker
Verbinden Sie Ihre Wolfsheizung mit iobroker. Dieser Adapter ist mit der Wolf-Smartset-Cloud verbunden. Dies ist keine lokale Verbindung. Der Vorteil ist, dass Sie die Wolf-Smartset-App sowie die Daten in iobroker verwenden können.

## Hardware
Sie benötigen ein ISM7I-Modul oder andere, die mit der Wolf-Smartset-App kompatibel sind.

## Anmeldung
Um sich anzumelden, benötigen Sie nur Ihren Benutzernamen und Ihr Passwort von Ihrer Smartset-App. Nachdem Sie auf "Geräte abrufen" geklickt haben, können Sie Ihre Heizung auswählen. Das ist es.

## Changelog
### 0.2.2 (26.03.2021)
* (MeisterTR) fix timeouts, fix conection
### 0.2.1
* (MeisterTR) Rebuild api and objects, breaking change
### 0.1.2
* (MeisterTR) Poll and set Values
* (MeisterTR) Fix error at start

### 0.1.0
* (MeisterTR) First running Version, Poll Param Only

## License
MIT License

Copyright (c) 2021 MeisterTR <meistertr.smarthome@gmail.com>

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