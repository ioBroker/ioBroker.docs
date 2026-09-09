---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ph803w/README.md
title: ioBroker.ph803w
hash: 4BBvRP4t6/Gb2GGP7pEMRXgwOS2S/3mp0+LcquROkAc=
---
![Logo](../../../en/adapterref/iobroker.ph803w/admin/ph803w.png)

![Anzahl der Installationen](http://iobroker.live/badges/ph803w-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ph803w.svg)
![Test und Freigabe](https://github.com/Apollon77/iobroker.ph803w/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/ph803w/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ph803w.svg)

# ioBroker.ph803w

## ph803w-Adapter für ioBroker

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Abfrage der pH- und Redoxwerte von PH803-W-Geräten in Ihrem Netzwerk.

## Konfiguration

Der Adapter benötigt keine Konfiguration. Er erkennt PH803W-Geräte automatisch über UDP-Pakete in Ihrem Netzwerk. Das bedeutet, dass sich der ioBroekr-Server und das Gerät im selben Netzwerk befinden müssen. Die Erkennung erfolgt beim Start des Adapters. Daher kann ein Neustart des Adapters erforderlich sein, um neu hinzugefügte Geräte zu erkennen, während der Adapter in Betrieb ist.

## Todo

- Tests verbessern: Zustandsprüfungen und setState-Methoden
- Bei Bedarf kann die lokale Netzwerkschnittstelle angegeben werden, die auf UDP-Pakete warten soll.
- Falls erforderlich, können eigene Geräte per IP-Adresse hinzugefügt werden, wenn die Geräteerkennung nicht funktioniert.
- Fügen Sie bei Bedarf einen Status hinzu, der während des Betriebs des Adapters ein weiteres Erkennungspaket sendet, um die Erkennung neuer Geräte ohne Neustart des Adapters zu ermöglichen.

## Wie man Probleme und Funktionswünsche meldet

Bitte nutzen Sie hierfür die GitHub-Issues.

Am besten stellen Sie den Adapter auf Debug-Log-Modus ein (Instanzen -> Expertenmodus -> Spaltenprotokollierung). Laden Sie anschließend die Logdatei von Ihrer Festplatte herunter (Unterverzeichnis „log“ im ioBroker-Installationsverzeichnis, nicht aus dem Admin-Bereich, da dieser die Zeilen abschneidet). Falls Sie die Datei nicht in einem GitHub-Issue bereitstellen möchten, können Sie sie mir auch per E-Mail senden ( <iobroker@fischer-ka.de> ). Bitte fügen Sie einen Verweis auf das entsprechende GitHub-Issue hinzu und beschreiben Sie, welche Einträge in der Logdatei zu welchem Zeitpunkt angezeigt werden.

## Changelog
### 1.2.0 (2024-04-21)
* IMPORTANT: The adapter requires at least Node.js 18.x
* (foxriver76) Fix write flag of redox switch indicator

### 1.1.1 (2022-06-03)
* (Apollon77) Fix potential crash case on the IP-changed detection logic

### 1.1.0 (2022-05-28)
* (Apollon77) Make sure adapter enters discovery mode even if an existing device cannot be connected to
* (Apollon77) Detect the same device ID under a new IP and adjust the objects accordingly
* (Apollon77) Add connected state for each device and also use it for Admin connection display

### 1.0.3 (2022-04-28)
* (Apollon77) Make sure devices have an id when initializing them

### 1.0.1 (2021-07-05)
* (Apollon77) Optimize connection status edge cases

### 1.0.0 (2021-07-01)
* Declare adapter as stable, so lets do a 1.0
* (Apollon77) Add tier for js-controller 3.3

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

Copyright (c) 2021-2024 Ingo Fischer <github@fischer-ka.de>

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