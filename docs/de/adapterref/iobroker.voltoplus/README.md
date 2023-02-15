---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.voltoplus/README.md
title: ioBroker.voltoplus
hash: PYDcxFBeBjqRqJEeAZ8P1dt2hnfLKBEdGgrk4xGKTkk=
---
![Logo](../../../en/adapterref/iobroker.voltoplus/admin/voltoplus.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.voltoplus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.voltoplus.svg)
![Anzahl der Installationen](https://iobroker.live/badges/voltoplus-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/voltoplus-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Jey-Cee/iobroker.voltoplus.svg)
![NPM](https://nodei.co/npm/iobroker.voltoplus.png?downloads=true)

# IoBroker.voltoplus
**Tests:** ![Testen und freigeben](https://github.com/Jey-Cee/ioBroker.voltoplus/workflows/Test%20and%20Release/badge.svg)

## VoltoPlus-Adapter für ioBroker
Erhalten Sie aktuelle Daten vom VoltoPlus-Energiezähler.

## Sponsoren
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende machen (dies ist ein persönlicher Spendenlink für Jey Cee, keine Verbindung zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

## Verwendung
Geben Sie einfach die IP-Adresse des VoltoPlus Energiezählers in den Adaptereinstellungen ein.
Der Adapter liest die Daten jede Sekunde.

## Haftungsausschluss
Die Entwickler dieses Moduls werden in keiner Weise von der Wallner Automation GmbH oder verbundenen Tochtergesellschaften, Logos oder Warenzeichen unterstützt oder sind mit ihnen verbunden.

## Links
[Produkt](https://www.voltoplus.com/shop/voltoplus/167/voltoplus?c=44)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.1 (2022-11-17)
* some fixes for relesase

### 0.1.0 (2022-10-18)
* Changed unit of energy_purchased & energy_supplied from W to kWh
* divide value of energy_purchased & energy_supplied by 10
* Update depenendencies

### 0.0.1
* (Jey Cee) initial release

## License
MIT License

Copyright (c) 2022 Jey Cee <jey-cee@live.com>

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