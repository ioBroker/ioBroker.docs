---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alexa-timer-vis/README.md
title: ioBroker.alexa-timer-vis
hash: 4Ij+03Go4FeVDjHwOfuQyBO8lIuVcDAz5t/G/aneARI=
---
![Logo](../../../en/adapterref/iobroker.alexa-timer-vis/admin/alexa-timer-vis.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.alexa-timer-vis.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alexa-timer-vis.svg)
![Anzahl der Installationen](https://iobroker.live/badges/alexa-timer-vis-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/alexa-timer-vis-stable.svg)
![NPM](https://nodei.co/npm/iobroker.alexa-timer-vis.png?downloads=true)

# IoBroker.alexa-timer-vis
![Test und Freigabe](https://github.com/MiRo1310/ioBroker.alexa-timer-vis/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Informationen und Anweisungen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Verwendung der Sentry-Berichterstattung beginnt mit js-controller 3.0.

## Alexa-timer-vis-Adapter für ioBroker
Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in der Sentry-Plugin-Dokumentation! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Alexa-Timer-Ausgabe zur Anzeige im Display

**Wenn es Ihnen gefällt, erwägen Sie bitte eine Spende:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

### Dies ist ein Beispiel meiner Sichtweise
![img.png](../../../en/adapterref/iobroker.alexa-timer-vis/admin/timer1.png)

## Funktionalität
Per Spracheingabe über Alexa wird ein oder mehrere Timer erstellt. Diese werden vom Adapter ausgewertet und in Zuständen gespeichert, um sie in der Benutzeroberfläche sichtbar zu machen. So behalten Sie den Überblick, wenn mehrere Timer gleichzeitig aktiv sind.

- ---- Alexa2-Adapter erforderlich ----
- Das Vis-Widget ist noch nicht integriert.
Jeder Timer verfügt über eine Stopptaste. Dadurch wird der Timer sowohl in Alexa als auch im Adapter gestoppt.
- Mit Alexa lassen sich per Sprachbefehl unbegrenzt viele Timer erstellen.
- Beim Start des Adapters werden 4 Ordner mit allen Zuständen erstellt.
- Zusätzliche Ordner werden automatisch erstellt, sobald über die Spracheingabe von Alexa ein fünfter oder weitere Timer erstellt werden.

### Timer hinzufügen ( Beispiele )
Alexa, Timer 5 Minuten
Alexa, Pommes frites. Timer: 9 Minuten.
Alexa, stelle einen Timer auf 1 Stunde und 30 Minuten.
Alexa, stelle einen Timer auf 2 Stunden.
Alexa, Timer für 120 Minuten
Alexa, Timer 9 Minuten Spaghetti

### Timer löschen ( Beispiele )
Alexa, lösche alle Timer.
Alexa, Pommes löschen Timer
Alexa, lösche den 5-Minuten-Timer.

### Wenn Sie Verbesserungsvorschläge oder Anregungen zur Hinzufügung weiterer Funktionen haben, kontaktieren Sie uns gerne.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.0.3 (2026-06-12)

- FIX: #295 Extend timer
- CHORE: Update dependencies

### 3.0.2 (2026-05-30)

- CHORE: Repository checker
- FIX: #288 Stop timer

### 3.0.1 (2026-05-23)

- FIX: Update connection state to true when initializing AlexaTimer

### 3.0.0 (2026-05-23)

- (copilot) Adapter requires node.js >= 22 now
- CHORE: Update dependencies
- FIX: #270 Errors has no existing object 
- FEAT: Complete refactored with new logic, it should work with all languages which are supported by Alexa2 adapter
- Chore: Alexa2 adapter version >= 3.28.1

### 2.2.2 (2025-12-12)

- FIX: Errors reported by sentry

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2021-2026 Michael Roling <michael.roling@gmx.de>

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