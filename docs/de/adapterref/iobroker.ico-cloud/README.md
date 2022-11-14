---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ico-cloud/README.md
title: ioBroker.ico-cloud
hash: T+2EIi0pD5Qpi950YJ99I97o774PTIHtzfKQy4vWqoA=
---
![Logo](../../../en/adapterref/iobroker.ico-cloud/admin/ico-cloud.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ico-cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ico-cloud.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ico-cloud-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ico-cloud-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.ico-cloud.svg)
![NPM](https://nodei.co/npm/iobroker.ico-cloud.png?downloads=true)

# IoBroker.ico-Cloud
**Tests:** ![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.ico-cloud/workflows/Test%20and%20Release/badge.svg)

## Ico-Adapter für ioBroker
Der ICO-Poolsensor (von ondilo) ermöglicht es, den Zustand und die Temperatur des Wassers in Ihrem Pool zu überwachen und Maßnahmen zu empfehlen.

Der Adapter verbindet sich mit dem Ondilo Cloud-Service und ruft alle Messwerte ab.

### Aufbau
Das Abfrageintervall können Sie in den Einstellungen festlegen (in Minuten).
Auch in den Einstellungen muss der Anmeldevorgang gestartet werden.

### Namensnennung
Dieser Adapter wird **nicht** von Ondilo entwickelt oder gehört ihm, sondern der ioBroker-Community.

Symbol und Name von ICO und Ondilo sind Eigentum von Ondilo.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2022-07-01)
* (Garfonso) changed adapter to be schedule adapter.

### 0.0.7 (2022-07-01)
* (Garfonso) more dependencies & administrative stuff.

### 0.0.6 (2022-07-01)
* (Garfonso) dependencies & updates

### 0.0.5 (2021-07-30)
* (Garfonso) add necessary admin dependency.
* (Garfonso) Do not use unknown roles.

### 0.0.4 (2021-07-22)
* (Garfonso) change default poll interval to one hour, because it seems no more measurements are done.
* (Garfonso) fixed issue in polling

### 0.0.3 (2021-07-20)
* (Garfonso) Rename to ico-cloud

### 0.0.2 (2021-07-20)
* (Garfonso) initial release

## License
MIT License

Copyright (c) 2022 Garfonso <garfonso@mobo.info>

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