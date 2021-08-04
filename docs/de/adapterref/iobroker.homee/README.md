---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.homee/README.md
title: ioBroker homee-Adapter
hash: UebqvVp7K22VBsbePxsF3E6xIrE8m0q27YxLhfpZWn0=
---
![Logo](../../../en/adapterref/iobroker.homee/admin/homee.png)

![Anzahl der Installationen](http://iobroker.live/badges/homee-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.homee.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.homee.svg)

# IoBroker homee-Adapter
![Testen und freigeben](https://github.com/Apollon77/iobroker.homee/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/homee/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Beschreibung
Dieser Adapter verbindet ioBroker mit homee und bietet folgende Funktionen:

* ermöglicht Verbindung über IP oder homee-ID und Benutzername/Passwort
* alle Geräte (Knoten) und Zustände (Attribute) lesen und deren Werte inklusive Updates in ioBroker anzeigen
* Erlaube das Ändern von Werten in ioBroker und sende sie zurück an homee, um Geräte zu steuern
* fungiert als ioBroker-Verlaufsanbieter für alle Statusgeräte, bei denen der Verlauf in homee aktiviert ist. Das heißt, Sie können die in homee hinterlegten Historienwerte zur Anzeige in ioBroker mittels flot, Admin oder auch JavaScript verwenden, inklusive aller Aggregationen auf Datenebene, wie sie z.B. Historienadapter

(noch) nicht unterstützt:

* Gruppen, da sie keine Funktionen wie einen Gruppenstatus oder echtes Schreiben auf alle Geräte gleichzeitig in homee bieten
* Heizpläne

Dieser Adapter basiert auf der hervorragenden Arbeit von [stfnhmplr](http://twitter.com/stfnhmplr) und seine [homee-api](https://github.com/stfnhmplr/homee-api).

## Bekannte Probleme
* Auf js-controller <1.5.0 kann es seltsame Auswirkungen haben, wenn andere Verlaufsanbieter für einige der Rollen aktiviert werden (z. B. "switch")

## So melden Sie Probleme und Funktionsanfragen
Bitte verwenden Sie dafür GitHub-Probleme.

Am besten setzen Sie den Adapter in den Debug-Log-Modus (Instanzen -> Expertenmodus -> Spaltenprotokoll-Ebene). Dann holen Sie sich bitte die Logdatei von der Festplatte (Unterverzeichnis "log" im ioBroker-Installationsverzeichnis und nicht vom Admin, da der Admin die Zeilen abschneidet). Wenn Sie es nicht in der GitHub-Ausgabe bereitstellen möchten, können Sie es mir auch per E-Mail (iobroker@fischer-ka.de) zusenden. Bitte fügen Sie einen Verweis auf das relevante GitHub-Problem hinzu UND beschreiben Sie auch, was ich zu welchem Zeitpunkt im Protokoll sehe.

## Changelog
### 1.2.0 (2021-08-01)
* (bluefox) Added admin5 support
* (Apollon77) Update to homee 2.33

### 1.1.1 (2021-04-10)
* (Apollon77) Update to homee 2.32

### 1.1.0 (2020-11-30)
* (Apollon77) Update to homee 2.30

### 1.0.7 (2020-06-12)
* (Apollon77) Fix Admin finally

### 1.0.6 (2020-06-12)
* (Apollon77) Fix Admin

### 1.0.5 (2020.04.12)
* (Apollon77) update homee lib to prevent a crash case

### 1.0.4 (2020.04.12)
* (Apollon77) fixes and optimizations
* (Apollon77) use js-controller 3.0 features if available 

### 1.0.2 (2020.03.22)
* (Apollon77) fixes and optimizations 

### 1.0.1 (2020.03.18)
* (Apollon77) fixes and optimizations 

### 1.0.0 (2020.03.13)
* (Seraphis411) fixed writing of HomeeMode
* (Seraphis411) bumped version of homee-api to 0.12.0 (no new features adopted)
* (Seraphis411) now support for nodejs 10 thanks to newer ws-library (^7.1.2) in homee-api
* (Apollon77) add sentry for error reporting
* (Apollon77) update homee api to 0.15.0

### 0.3.2 (2018.08.07)
* (Apollon77) corrected automatic role determination and added playing state for homeegrams

### 0.3.1 (2018.07.27)
* (Apollon77) Special handling for RGB values (delete objects and restart adapter)
* (Apollon77) Also allow enabling/disabling of Homeegrams (best delete objects unter Homee-0.Homeegrams!)
* (Apollon77) Optimize some roles, more Role feedback via Github issues please!

### 0.2.0 (2018.07.04)
* (Apollon77) Fix History logic (try) and add Homeegram support

### 0.1.1 (2018.07.04)
* (Apollon77) initial version

## License
The MIT License (MIT)

Copyright (c) 2018-2021 Apollon77 <iobroker@fischer-ka.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.