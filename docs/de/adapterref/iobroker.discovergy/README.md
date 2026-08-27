---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.discovergy/README.md
title: ioBroker.discovergy
hash: roGuB5x3KGimTK00m/5ItkGhDBupE5vGzTG4diF/2kw=
---
![Alternativtext](https://raw.githubusercontent.com/DrozmotiX/ioBroker.discovergy/master/admin/Discovergy_logo.png)

![Alternativtext](https://travis-ci.org/DrozmotiX/ioBroker.discovergy.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/discovergy-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.discovergy.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.discovergy.svg)

# IoBroker.discovergy
Dies ist ein ioBroker-Adapter für Ihren Discovergy-Stromzähler.
Er nutzt die Discovergy-API, um Daten Ihrer Zähler auszulesen und deren aktuelle Werte mit ioBroker zu synchronisieren.

https://api.discovergy.com/docs/

## Wächter
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Bitte fügen Sie gerne einen Issue hinzu, wenn Sie sich Funktionen wünschen oder Probleme feststellen, damit ich mir das ansehen kann!

Anmerkung: Mir stehen nicht alle möglichen Geräte zur Verfügung, und auch das Demokonto bietet nicht alle verfügbaren Gerätewerte.
Falls Sie die folgende Fehlermeldung erhalten:

„Von Discovergy erhaltene Informationen, die noch nicht Teil dieses Adapters sind.“ „Diese Informationen an den Entwickler senden: xxxxx“

Bitte laden Sie Ihre Logdatei herunter und erstellen Sie hier auf GitHub ein Issue mit den darin enthaltenen Werten. Bitte kopieren Sie die Daten nicht aus der Admin-Weboberfläche, da dort wichtige Informationen fehlen!

Sie können diesen Adapter mit den Demo-Zugangsdaten von Discovergy testen (oder mit Ihren eigenen :-)): Benutzername = demo@inexogy.com Passwort = demo

## Unterstützt mich
Wenn Ihnen meine Arbeit gefällt, freue ich mich über eine persönliche Spende (dies ist ein persönlicher Spendenlink für DutchmanNL, er steht in keiner Verbindung zum ioBroker-Projekt!). [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Mitwirkende
* AlCalzone
* zoernert

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings
* (DutchmanNL) **FIXED**: Removed non-existent version 0.6.1 from changelog to comply with ioBroker repository checker requirements (E2004)
* (DutchmanNL) **ENHANCED**: Cleaned up common.news entries in io-package.json to maintain only published versions

### 0.7.0 (2026-02-15)
* (DutchmanNL) release fixes and improvements in 0.7.0, resolved #316 #313

### 0.6.0 (2024-12-04) - API change to Inexogy
* (DutchmanNL) Bugfix: API change to Inexogy. Fixes #249
* (DutchmanNL) Migrate admin settings to JSON config. Fixes #211

### 0.5.13 (2023-10-31)
* (sbeh) Support more characters in login credentials fixes #117, #227

### 0.5.12 (2023-10-29)
* (DutchmanNL) Ignore meters not providing any data (like removed devices) fixes #84

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 DutchmanNL

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