---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alexa-timer-vis/README.md
title: ioBroker.alexa-timer-vis
hash: AuT8DX8it/GlkmAdRra+MlOI/sxo9pysMT/QqPxHB80=
---
![Logo](../../../en/adapterref/iobroker.alexa-timer-vis/admin/alexa-timer-vis.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.alexa-timer-vis.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alexa-timer-vis.svg)
![Anzahl der Installationen](https://iobroker.live/badges/alexa-timer-vis-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/alexa-timer-vis-stable.svg)
![NPM](https://nodei.co/npm/iobroker.alexa-timer-vis.png?downloads=true)

# IoBroker.alexa-timer-vis
![Testen und Freigeben](https://github.com/MiRo1310/ioBroker.alexa-timer-vis/workflows/Test%20and%20Release/badge.svg)

## Alexa-Timer-Vis-Adapter für ioBroker
Dieser Adapter verwendet Sentry-Bibliotheken, um Exceptions und Codefehler automatisch an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in der Sentry-Plugin-Dokumentation! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Ausgabe des Alexa-Timers zur Anzeige im Vis

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

### Dies ist ein Beispiel für meinen Besuch
![](../../../en/adapterref/iobroker.alexa-timer-vis/admin/timer.png)

## Funktionalität
Wird ein Timer oder mehrere per Spracheingabe, über Alexa angelegt, wird dieser vom Adapter ausgewertet und in Zustände geschrieben um diese im Vis sichtbar zu machen. So hat man eine bessere Übersicht wenn man mehrere Timer gleichzeitig aktiv hat.

- ---- Alexa2-Adapter wird benötigt ----
- Das Vis Widget ist noch nicht integriert
- Jeder Timer hat eine Taste zum Stoppen. Stoppt den Timer in Alexa und im Adapter
- Mit Alexa können per Sprachbefehl unbegrenzt viele Timer erstellt werden.
- Beim Start des Adapters werden 4 Ordner mit allen Zuständen erstellt.
- Weitere Ordner werden erstellt, sobald ein 5. und mehr Timer über die Spracheingabe von Alexa erstellt werden.
- Es funktioniert mit deutscher Eingabe

### Timer hinzufügen (Beispiele)
- Alexa, Timer 5 Minuten
- Alexa, Pommes Timer 9 Minuten
- Alexa, stelle einen Timer auf 1 Stunde und 30 Minuten
- Alexa, stelle einen Timer auf 2 Stunden
- Alexa, Timer für 120 Minuten
- Alexa, Timer 9 Minuten Spaghetti

### Timer löschen (Beispiele)
- Alexa, lösche alle Timer
- Alexa, lösche den Pommes-Timer
- Alexa, lösche den 5-Minuten-Timer

### Wenn Sie Vorschläge zur Verbesserung oder zum Hinzufügen weiterer Funktionen haben, können Sie sich gerne an uns wenden

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- FEAT: Add more config
- CHORE: Update dependencies

### 2.0.8 (2024-12-04)

- CHORE: Update dependencies
- CHORE: Migration to ESLint 9 and @iobroker/eslint-config

### 2.0.7 (2024-11-19)

- FIX: #157 Add size attribute xl for text in jsonConfig
- FIX: #156 Error in decomposeInputValue

### 2.0.6 (2024-10-19)

- FEAT: #151 Responsive Design

### 2.0.5 (2024-09-26)

- FIX: #142 Timeout error
- FIX: #137 Reset timer name
- FEAT: Add json state

### 2.0.4 (2024-09-18)

- FIX: #132 Second timer button reset deletes timer one

### 2.0.3 (2024-09-13)

- FIX: #133 Timer names are not correct
- FIX: #134 All timer alive at start

### 2.0.2 (2024-09-12)

- FIX: #130 Sting_2 remains empty

### 2.0.1 (2024-09-10)

- FIX: #128 Timer creating error

### 2.0.0 (2024-09-08)

- FIX: #119 Error "has no existing object" on first start
- FEAT: Use Typescript
- FEAT: #118 get name from activeTimerList
- FIX: #117 createDevice is deprecated

### 1.0.0 (2024-08-09)

- Js-controller >=5.0.19 is required

### 0.3.0 (2023-12-23)

- FIX: #82 Delete Timer by Button
- FIX: #74 Start time
- FEAT: #71 Name of Echo in data tree
- FEAT: #75 Percent from 0% to 100%
- Breaking change: minimal supported node.js version is 16.x
- FEAT: #58 Another String Variation

### 0.2.0 (2023-07-27)

- create Timer with Alexa2 TextCommand, fixed
- lengthen and shorten timers

### 0.1.15 (22.09.2022)

- Include creation time to avoid creating duplicate timers

### 0.1.14 (17.07.2022)

- Added debouncing in the adapter configuration

### 0.0.13 (06.03.2022)

- Delete of Timers with the same value, fixed

### 0.1.12 (15.02.2022)

- Delete of Timer fixed

### 0.1.11 (12.02.2022)

- Delete of Timer with same Inputvalue, fixed
- User can set the Intervall in admin

### 0.1.9 (30.1.2022)

- Bugfix

### 0.1.8 (28.01.2022)

- Bugfix
- Button added to stop the Timer

### 0.1.7 (22.06.2022)

- New State, "Input Device"

### 0.1.6 (17.01.2022)

- numbers from 1-9 are always displayed as two digits, 1 => 01
- When you update to this or a newer Version, please delete the timer folders or delete the whole adapter, otherwise
  errors will occur

### 0.1.5 (08.01.2022)

- New keywords added

### 0.1.4 (05.01.2022)

- States will be reset on adapter unload
- Bugfix

### 0.1.3 (02.01.2022)

- Start and EndTime added

### 0.1.2 (31.12.2021)

- Bugfix (A double created Intervall, fixed)

### 0.1.1 (29.12.2021)

- Adaptation to the English language (experimental)
- Anpassung an die Englische Sprache (experimentell)

### 0.1.0 (28.12.021)

- Fixed bug when deleting intervals and timeouts after shutdown
- Fehler beim Löschen von Intervallen und Timeouts nach dem Shutdown, behoben

### 0.0.4 (27.12.2021)

- Adaptation to various options for entering a timer
- Anpassung an verschiedener Möglichkeiten der Eingabe eines Timers

### 0.0.3 (26.12.2021)

- Bugfix

### 0.0.2 (26.12.2021)

- Bugfix

### 0.0.1 (25.12.2021)

- initial release

## License

Copyright (c) 2021-2025 Michael Roling <michael.roling@gmx.de>

MIT License

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