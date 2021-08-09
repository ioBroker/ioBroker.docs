---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ikettle2/README.md
title: ioBroker.ikettle2
hash: wEF/M5ePNGzhc8BjCcmBgAGYj+onZzFTGBl0QaEWKA4=
---
![Logo](../../../en/adapterref/iobroker.ikettle2/admin/ikettle2.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ikettle2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ikettle2.svg)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/ikettle2-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/ikettle2-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/jey-cee/iobroker.ikettle2.svg)
![NPM](https://nodei.co/npm/iobroker.ikettle2.png?downloads=true)

#ioBroker.ikettle2
**Tests:** ![Testen und freigeben](https://github.com/jey-cee/ioBroker.ikettle2/workflows/Test%20and%20Release/badge.svg)

## Ikettle2-Adapter für ioBroker
Steuern Sie Ihren Smarter iKettle 2.0 mit ioBroker.

## Treten Sie dem Discord-Server bei, um alles über ioBroker zu diskutieren!
<a href="https://discord.gg/HwUCwsH"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## [Sponsoren](./SPONSORS.md)
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende zukommen lassen (dies ist ein persönlicher Spendenlink für Jey Cee, kein Bezug zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

---

## Handbuch
### Objektbeschreibung **an** - Schaltet den Wasserkocher ein. set_temperature muss vorher eingestellt werden.
**on_formula** - Schaltet den Wasserkocher ein, heizt auf und hält die Formel_Temperatur für die Aufwärmzeit.
formula_temperature und warming_time müssen vorher eingestellt werden.

**kalibrieren** - Basiskalibrierung starten.

**on_plate** - Zeigt an, ob sich der Wasserkocher auf der Grundplatte befindet.

**set_temperature** - Die Zieltemperatur zum Erhitzen von Wasser.

**formula_temperature** - Die Solltemperatur nach dem Aufheizen des Wassers auf set_temperature.

**water_temperature** - Die tatsächliche Temperatur des Wassers.

**water_level** - Tatsächliche Wassermenge im Wasserkocher. Hinweis: Die Genauigkeit ist nicht so gut und könnte völlig falsch sein. Überprüfen Sie daher mit Ihren Augen, ob sich Wasser im Wasserkocher befindet.

**warming_time** - Die Zeit, in der der Wasserkocher das Wasser auf der Formeltemperatur hält, bevor er sich abschaltet.
Hinweis: 0 = Nicht verwendet, die Mindestdauer beträgt 5 Minuten und die Höchstdauer 30 Minuten.

**get_preset** - Lesen Sie die voreingestellten Werte für die manuelle Steuerung (ohne APP) aus dem Wasserkocher.

**set_preset** - Stellen Sie die voreingestellten Werte am Wasserkocher für die manuelle Steuerung ein (ohne APP).
formula_temperature, temperature und warming_time im voreingestellten Ordner müssen vorher eingestellt werden.

---

### Kalibrieren Nehmen Sie den Wasserkocher von der Basis und stellen Sie das Objekt kalibrieren auf wahr.
Nach dem Piepton von der Basis können Sie den Wasserkocher wieder auf die Basis stellen und verwenden.
---

## Changelog

* (Jey Cee) fixes for Beta release

### 1.0.0
* (Jey Cee) initial release

## License
MIT License

Copyright (c) 2021 Jey Cee <jey-cee@live.com>

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