---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ikettle2/README.md
title: ioBroker.ikettle2
hash: cMO+RpaDdkvLmHNr84/MJCvLPK2UqsoTCBY2kHS/22s=
---
![Logo](../../../en/adapterref/iobroker.ikettle2/admin/ikettle2.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ikettle2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ikettle2.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/ikettle2-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/ikettle2-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/jey-cee/iobroker.ikettle2.svg)
![NPM](https://nodei.co/npm/iobroker.ikettle2.png?downloads=true)

# IoBroker.ikettle2
**Tests:** ![Testen und Freigeben](https://github.com/jey-cee/ioBroker.ikettle2/workflows/Test%20and%20Release/badge.svg)

## Ikettle2-Adapter für ioBroker
Steuern Sie Ihren Smarter iKettle 2.0 mit ioBroker.

## Treten Sie dem Discord-Server bei, um alles über ioBroker zu besprechen!
<a href="https://discord.gg/HwUCwsH"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende tätigen (dies ist ein persönlicher Spendenlink für Jey Cee, keine Verbindung zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

---

## Manuell
### Objektbeschreibung **on** - Schaltet den Wasserkocher ein. set_temperature muss vorher eingestellt werden.
**on_formula** - Schaltet den Wasserkocher ein, heizt auf und hält die Formeltemperatur für die Aufwärmzeit.
Formeltemperatur und Aufwärmzeit müssen vorher eingestellt werden.

**Kalibrieren** – Basiskalibrierung starten.

**on_plate** – Gibt an, ob der Wasserkocher auf der Grundplatte steht.

**set_temperature** – Die Zieltemperatur zum Erhitzen von Wasser.

**Formeltemperatur** – Die Zieltemperatur nach dem Erhitzen des Wassers auf die Solltemperatur.

**Wassertemperatur** – Die tatsächliche Temperatur des Wassers.

**Wasserstand** – Tatsächliche Wassermenge im Kessel. Hinweis: Die Genauigkeit ist nicht besonders gut und könnte völlig falsch sein. Überprüfen Sie daher mit Ihren Augen, ob sich Wasser im Kessel befindet.

**Aufwärmzeit** – Die Zeit, die der Wasserkocher das Wasser auf der gewünschten Temperatur hält, bevor er sich abschaltet.
Hinweis: 0 = Nicht verwendet, die Mindestzeit beträgt 5 Minuten und die Höchstzeit 30 Minuten.

**get_preset** - Auslesen der Vorgabewerte zur manuellen Steuerung (ohne APP) aus dem Wasserkocher.

**set_preset** - Stellen Sie die voreingestellten Werte am Wasserkocher für die manuelle Steuerung (ohne App) ein.
Formeltemperatur, Temperatur und Aufwärmzeit müssen vorher im Voreinstellungsordner eingestellt werden.

---

### Kalibrieren Nehmen Sie den Wasserkocher von der Basisstation und setzen Sie dann das Objekt „Kalibrieren“ auf „True“.
Nach dem Piepton der Basisstation können Sie den Wasserkocher wieder auf die Basisstation stellen und verwenden.
---

## Changelog

### **WORK IN PROGRESS**
* (Jey Cee) Correct size of ip input on xl displays

### 1.0.2
* (Jey Cee) Add watchdog for connection to prevent adapter freeze
* (Jey Cee) Migrate config to JSON Config
* (Jey Cee) Update dependencies 
* (Jey Cee) Fix issues found by adapter checker

### 1.0.1
* (Jey Cee) fixes for Beta release

### 1.0.0
* (Jey Cee) initial release

## License
MIT License

Copyright (c) 2021-2025 Jey Cee <jey-cee@live.com>

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