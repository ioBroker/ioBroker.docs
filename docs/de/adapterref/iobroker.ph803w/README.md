---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ph803w/README.md
title: ioBroker.ph803w
hash: 8wZbHpuiBtQyAgZqIYG/VC/asesHfdIonX8K+2YJby0=
---
![Logo](../../../en/adapterref/iobroker.ph803w/admin/ph803w.png)

![Anzahl der Installationen](http://iobroker.live/badges/ph803w-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ph803w.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ph803w.svg)

# IoBroker.ph803w
![Testen und freigeben](https://github.com/Apollon77/iobroker.ph803w/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/ph803w/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Ph803w-Adapter für ioBroker
**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Fragen Sie PH- und Redox-Werte von PH803-W-Geräten in Ihrem Netzwerk ab.

## Aufbau
Der Adapter benötigt keine Konfiguration. Es erkennt automatisch PH803W-Geräte über UDP-Pakete in Ihrem Netzwerk. Dies bedeutet, dass sich der ioBroekr-Server und das Gerät im selben Netzwerk befinden müssen.
Die Erkennung erfolgt beim Start des Adapters, was bedeutet, dass zum Erkennen neuer Geräte, die während des Betriebs des Adapters hinzugefügt werden, möglicherweise ein Neustart des Adapters erforderlich ist.

## Machen
* Testen verbessern: Statusprüfungen und setState's
* Bei Bedarf die lokale Netzwerkschnittstelle angeben, die auf UDP-Pakete lauscht
* ggf. Hinzufügen eigener Geräte per IP erlauben, wenn die Erkennung nicht funktioniert
* Fügen Sie bei Bedarf einen Status hinzu, um während der Ausführung des Adapters ein weiteres Erkennungspaket zu senden, um die Erkennung neuer Geräte ohne Neustart des Adapters zu ermöglichen

## So melden Sie Probleme und Funktionsanfragen
Bitte verwenden Sie dafür GitHub-Probleme.

Am besten setzen Sie den Adapter in den Debug-Log-Modus (Instanzen -> Expertenmodus -> Spaltenprotokoll-Ebene). Dann holen Sie sich bitte die Logdatei von der Festplatte (Unterverzeichnis "log" im ioBroker-Installationsverzeichnis und nicht vom Admin, da der Admin die Zeilen abschneidet). Wenn Sie es nicht in der GitHub-Ausgabe bereitstellen möchten, können Sie es mir auch per E-Mail (iobroker@fischer-ka.de) zusenden. Bitte fügen Sie einen Verweis auf das relevante GitHub-Problem hinzu UND beschreiben Sie auch, was ich zu welchem Zeitpunkt im Protokoll sehe.

## Changelog

### 0.1.5 (2021-06-09)
* (Apollon77) Optimize edge cases on device connection and try reconnect and make sure connection status is correct
* (Apollon77) Better handle pingpong related reconnects

### 0.1.4 (2021-06-09)
* (Apollon77) Remove unit from PH again after feedback

### 0.1.3 (2021-06-09)
* (Apollon77) Add title property

### 0.1.2 (2021-06-09)
* (Apollon77) Add unit for PH value

### 0.1.1 (2021-06-09)
* (Apollon77) Initial commit

## License
MIT License

Copyright (c) 2021 Ingo Fischer <github@fischer-ka.de>

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