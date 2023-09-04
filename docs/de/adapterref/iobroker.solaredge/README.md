---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solaredge/README.md
title: ioBroker.solaredge
hash: zlhrpvyeYWTS168uwVvoa9+Wkm0V54c4roTC+tUct18=
---
![Logo](../../../en/adapterref/iobroker.solaredge/admin/solaredge.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.solaredge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solaredge.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/solaredge-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/solaredge-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/92lleo/iobroker.solaredge.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/92lleo/ioBroker.solaredge/badge.svg)
![NPM](https://nodei.co/npm/iobroker.solaredge.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/92lleo/ioBroker.solaredge/master.svg)

# IoBroker.solaredge
## Solaredge-Adapter für ioBroker
Erhalten Sie Daten vom Solaredge-Überwachungsportal.
Derzeit wird nur der Datenpunkt /overview verwendet, um die aktuellen Leistungs- und Tages-/Monats-/Jahres-/Lebensenergiewerte abzurufen.

Sie können Modbus auch auf Ihrem Solaredge-Gerät aktivieren, wenn es neuer ist, und die Daten direkt auslesen.

Sie benötigen Ihre Site-ID und Ihren API-Schlüssel, um diesen Adapter verwenden zu können. Um diese zu erhalten, gehen Sie zu https://monitoring.solaredge.com Site-ID: Melden Sie sich an, Site-ID ist die „ID“ auf der rechten Seite, z. B. 12345 API-Schlüssel: Melden Sie sich an, gehen Sie zu den Admin-Einstellungen und aktivieren Sie dort den API-Zugriff . Wenn Sie keine Administratoreinstellungen sehen, senden Sie eine E-Mail an Solaredge, um den Administrator für Ihr Konto zu aktivieren.

Roadmap:

* Fügen Sie Leistungs- und Energiedetails hinzu
* Fügen Sie andere Geräte als Wechselrichter hinzu

## Changelog

### 0.3.0
* (Apollon77) Address review feedback from adapter review (see #19)

### 0.2.0
* (92lleo) Add default values for native config vars
* (92lleo) Set schedule to 15s to match api update rate
* (92lleo) Fix updating already created states (broken since new js-controller, see #9)
* (92lleo) Update dependencies
* (92lleo) Clear timer on unload
* (92lleo) Add connection type and dataSource

### 0.1.1
* (92lleo) fix "object data is invalid" issue, now works with new js-controller
* (92lleo) update dependencies

### 0.1.0
* (92lleo) first beta release. overview data from inteverters are available

### 0.0.1
* (92lleo) initial release

## License
MIT License

Copyright (c) 2019-2021 Leonhard Kuenzler <leonhard@kuenzler.io>

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