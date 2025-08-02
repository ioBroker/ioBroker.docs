---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bluesound/README.md
title: ioBroker.bluesound
hash: PU3PlrEUB2NHsiR97M2AcniN3Tl/pOYngvNPCLHwh1g=
---
![Logo](../../../en/adapterref/iobroker.bluesound/admin/bluesound.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.bluesound.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bluesound.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bluesound-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/bluesound-stable.svg)
![NPM](https://nodei.co/npm/iobroker.bluesound.png?downloads=true)

# IoBroker.bluesound
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/bluesound/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Testen und Freigeben](https://github.com/Uwe1958/ioBroker.bluesound/workflows/Test%20and%20Release/badge.svg)

## Bluesound-Adapter für ioBroker
Adapter zur Steuerung von Bluesound-Geräten

## Enthaltene Funktionen
Der Adapter verwendet API-Aufrufe im Format: http://--playerAPI--:11000/xxx

Ein Timeout-Parameter wird durch den optionalen Parameter „config.TimeOut“ als Timeout für den API-Aufruf festgelegt. Der Standardwert beträgt 2 Sekunden.

Beim Start werden die Voreinstellungen gelesen und dem Kanal „Voreinstellungen“ hinzugefügt.
Playermodell und -name werden im Kanal „Info“ gespeichert.
Wenn der Player spielt, werden die Titel im Kanal „Info“ festgelegt.

Der Playerstatus wird im durch „config.pollingtime“ eingestellten Intervall abgefragt und das Ergebnis sowohl in „control.state“ als auch in „info.\*“ gespeichert.

PollingTime-Werte bis 120 Sekunden sind sinnvoll. Bei Werten über 300 Sekunden kann der Adapter nicht gestartet werden. Der Standardwert ist 30 Sekunden.

Folgende Funktionen sind implementiert:

- Spielerstopp (ausgelöst durch Setzen von „control.stop“ auf „true“)
- Playerstart (ausgelöst durch Setzen von „control.start“ auf „true“)
- Player-Pause (ausgelöst durch Setzen von „control.pause“ auf „true“, Umschaltmodus)
- Presetxxx abspielen (ausgelöst durch Setzen von '.presets.preset(x).start' auf true)
- Lautstärke ändern (ausgelöst durch Ändern von „control.volume“)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.4 (2025-01-03)

- (Uwe Nagel) Correct common.news

### 1.1.3 (2025-01-03)

- (Uwe Nagel) Changed year in README
- (Uwe Nagel) Bump prettier from 3.4.1 to 3.4.2
- (Uwe Nagel) Bump mocha from 10.8.2 to 11.0.1
- (Uwe Nagel) Bump chai-as-promised and @types/chai-as-promised
- (Uwe Nagel) Bump sinon from 18.0.0 to 19.0.2
- (Uwe Nagel) Bump globals from 15.9.0 to 15.14.0

### 1.1.1 (2024-12-01)

- (Uwe Nagel) README.md cosmetics
- (Uwe Nagel) Added Weblate translation badge
- (Uwe Nagel) Bump cross-spawn from 7.0.3 to 7.0.6
- (Uwe Nagel) Switch to adapter-core3.2.2
- (Uwe Nagel) Corrected logic for remote volume changes

### 1.1.0 (2024-10-19)

- (Uwe Nagel) Potentially invalid characters are replaced before creating an object
- (Uwe Nagel) setTimeout used instead of setInterval, clearTimeout added
- (Uwe Nagel) Check values for PollingTime and TimeOut
- (Uwe Nagel) Missing sizes added
- (Uwe Nagel) State roles reevaluated
- (Uwe Nagel) subscribeState calls eliminated
- (Uwe Nagel) Instance prefixes in ObjectIds are omitted when calling setState()
- (Uwe Nagel) State change now honors ack flag
- (Uwe Nagel) PollingTime and TimeOUT changed to type number
- (Uwe Nagel) onReady() stopped when no IP is set
- (Uwe Nagel) Testing extended to node 22.x
- (Uwe Nagel) Example code removed

### 1.0.3 (2024-09-26)

- (Uwe Nagel) Parsing of /State corrected

### 1.0.2 (2024-09-19)

- (Uwe Nagel) Modified due to adapter checks

### 1.0.1 (2024-05-24)

- (Uwe Nagel) Added config descriptions
- (Uwe Nagel) Added translations for object descriptions
- (Uwe Nagel) Added role definition for all objects
- (Uwe Nagel) Added Timeout config Parameter

### 1.0.0 (2024-05-17)

- (Uwe Nagel) initial release

## License

MIT License

Copyright (c) 2025 Uwe Nagel <uwenagel@kabelmail.de>

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