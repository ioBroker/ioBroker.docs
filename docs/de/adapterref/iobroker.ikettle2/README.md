---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ikettle2/README.md
title: ioBroker.ikettle2
hash: +hiz9s4kj7xNWnWuB7sPLudqIK/Qz927+t/yqpv6Ju8=
---
![Logo](../../../en/adapterref/iobroker.ikettle2/admin/ikettle2.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ikettle2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ikettle2.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/ikettle2-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/ikettle2-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/jey-cee/iobroker.ikettle2.svg)
![NPM](https://nodei.co/npm/iobroker.ikettle2.png?downloads=true)
![Test und Freigabe](https://github.com/jey-cee/ioBroker.ikettle2/workflows/Test%20and%20Release/badge.svg)

# ioBroker.ikettle2

## ikettle2-Adapter für ioBroker

Steuern Sie Ihren Smarter iKettle 2.0 mit ioBroker.

## Tritt dem Discord-Server bei, um alles über ioBroker zu diskutieren!

<a href="https://discord.gg/HwUCwsH"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

Wenn Ihnen meine Arbeit gefällt, freue ich mich über eine persönliche Spende.\
&#x20;(Dies ist ein persönlicher Spendenlink für Jey Cee und steht in keiner Verbindung zum ioBroker-Projekt!)\
[![Spenden](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=95YZN2LR59Q64\&source=url)

---

## Handbuch

### Objektbeschreibung

**on** - Schaltet den Wasserkocher ein. Die Einstellung set\_temperature muss vorher vorgenommen werden.

**on\_formula** – Schaltet den Wasserkocher ein, erhitzt ihn und hält die Formeltemperatur für die angegebene Aufwärmzeit. Formeltemperatur und Aufwärmzeit müssen zuvor eingestellt werden.

**Kalibrieren** - Basiskalibrierung starten.

**on\_plate** - Zeigt an, ob der Wasserkocher auf der Bodenplatte steht.

**set\_temperature** - Die Zieltemperatur zum Erhitzen des Wassers.

**formula\_temperature** - Die Zieltemperatur nach dem Erhitzen des Wassers auf die eingestellte Temperatur.

**Wassertemperatur** - Die tatsächliche Temperatur des Wassers.

**Wasserstand** – Wassermenge im Wasserkocher in Litern. Der Gewichtssensor im Sockel verändert sich mit der Temperatur, daher wird der Wasserstand nur gemessen, wenn der Wasserkocher im Leerlauf ist und die Temperatur unter der in den Einstellungen festgelegten Temperatur (Standard 40 °C) liegt. Während des Aufheizens und wenn das Wasser heiß ist, wird der zuletzt gemessene Wert gespeichert. Siehe _„Wasserstandskalibrierung“_ weiter unten.

**water\_level\_raw** – Rohwert des Gewichtssensors (Median der letzten Werte). Wird zur Kalibrierung des Wasserstands verwendet.

**Aufwärmzeit** – Die Zeit, die der Wasserkocher das Wasser auf der eingestellten Temperatur hält, bevor er sich abschaltet. Hinweis: 0 = Nicht verwendet, Mindestzeit 5 Minuten, Höchstzeit 30 Minuten.

**get\_preset** - Liest die voreingestellten Werte für die manuelle Steuerung (ohne App) vom Wasserkocher.

**set\_preset** – Legt die voreingestellten Werte für den Wasserkocher zur manuellen Steuerung fest (ohne App). Die Werte für formula\_temperature, temperature und warming\_time müssen zuvor im Ordner „preset“ festgelegt werden.

---

### Kalibrieren

Nehmen Sie den Wasserkocher von der Basisstation und stellen Sie die Objektkalibrierung auf „Wahr“. Nach dem Signalton der Basisstation können Sie den Wasserkocher wieder auf die Basisstation stellen und verwenden.

### Wasserstandskalibrierung

Der Adapter wandelt den Rohwert des Sensors mithilfe von Kalibrierungspunkten aus den Instanzeinstellungen in Liter um. Die Standardwerte (2090 = 0 l, 2185 = 1,8 l) stammen aus früheren Versionen und sind nicht für jeden Wasserkocher geeignet.

Der Sensor arbeitet nicht linear: Bei einem getesteten Wasserkocher erhöhte der erste Liter den Rohwert um 64, die nächsten 0,8 l jedoch nur um 31 (leer: 2067, 1 l: 2131, 1,8 l: 2162). Daher kann optional ein dritter Messpunkt für den leeren Wasserkocher festgelegt werden; die Messpunkte sind durch Geraden verbunden.

1. Stellen Sie den leeren Wasserkocher auf den Sockel, warten Sie etwa eine Minute und notieren Sie `kettle.water_level_raw` wie _ein leerer Wasserkocher_ .
2. Füllen Sie eine bekannte Menge kaltes Wasser ein (z. B. 1 l) und notieren Sie den Wert als Punkt 1.
3. Füllen Sie bis zu einer zweiten Menge (z. B. 1,8 l bis zur Maximalmarkierung) und notieren Sie den Wert als Punkt 2.

Der Rohwert schwankt um einige Einheiten, daher sollte man ihn erst ablesen, nachdem der Wasserkocher eine Weile stillgestanden hat.

---

## Changelog
### **WORK IN PROGRESS**
- (sadam6752-tech) Fix: messages are split at the terminator 0x7e, answers to commands are no longer mixed up with status messages
- (sadam6752-tech) Fix: reconnect with a growing delay (5 s to 60 s) instead of reconnecting at once in a loop
- (sadam6752-tech) Fix: `kettle.preset.get_preset` works now (it was not subscribed)
- (sadam6752-tech) Fix: command states are confirmed only after the kettle accepted the command; invalid temperatures are not sent
- (sadam6752-tech) Water level only measured while the kettle is idle and cold, calibration with two or three points (optional empty kettle) in the instance settings, new state `kettle.water_level_raw`
- (copilot) Adapter requires node.js >= 22 now
### 1.0.11 (2026-11-03)
* chore(deps-dev): bump @types/node from 25.9.8 to 25.9.9

### 1.0.10 (2026-10-03)
* chore(deps-dev): bump @types/node from 25.9.5 to 25.9.8

### 1.0.9 (2026-09-03)
* chore(deps-dev): bump @tsconfig/node22 from 22.0.5 to 22.0.6
* chore(deps-dev): bump @alcalzone/release-script-plugin-license

### 1.0.8 (2026-08-03)
* chore(deps-dev): bump @iobroker/testing from 5.2.2 to 5.3.0
* chore(deps-dev): bump @types/node from 25.9.4 to 25.9.5

### 1.0.7 (2026-07-03)
* chore(deps-dev): bump @alcalzone/release-script-plugin-manual-review
* chore(deps-dev): bump @alcalzone/release-script from 5.2.0 to 5.2.1
* chore(deps-dev): bump @types/node from 25.9.1 to 25.9.4

### 1.0.6 (2026-06-03)
* chore(deps-dev): bump @alcalzone/release-script from 5.1.1 to 5.2.0
* chore(deps-dev): bump @alcalzone/release-script-plugin-iobroker
* chore(deps-dev): bump @types/node from 25.6.0 to 25.9.1
* chore(deps-dev): bump @iobroker/eslint-config from 2.2.0 to 2.3.4
* chore(deps-dev): bump @alcalzone/release-script-plugin-license
* Update from template: S6020-addChangelogOld
* Update from template: X0000-dropNode20
* Update from template: W8917-dependabot-addIgnoreTypesNode
* chore(deps-dev): bump typescript from 5.9.3 to 6.0.3

### 1.0.5 (2026-05-03)
* chore(deps-dev): bump @types/node from 25.5.0 to 25.6.0
* Update from template: X0000-updateNodeJsAtTestAndRelease

### 1.0.4 (2026-04-02)
* (jey-cee) fix some issues found by adapter checker

### 1.0.3 (2026-03-31)
* (iobroker-bot) Adapter requires node.js >= 20 now.
* (Jey Cee) Correct size of ip input on xl displays
* (Jey Cee) update dependencies
* (Jey Cee) fix issues found by adapter checker

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

Copyright (c) 2021-2026 Jey Cee <jey-cee@live.com>

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