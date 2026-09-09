---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.homee/README.md
title: ioBroker Home Adapter
hash: tCImDdFqUQGqp7ihBeQg/KvfGb+DDf2wJGdC6TZAxlg=
---
![Logo](../../../en/adapterref/iobroker.homee/admin/homee.png)

![Anzahl der Installationen](http://iobroker.live/badges/homee-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.homee.svg)
![Test und Freigabe](https://github.com/Apollon77/iobroker.homee/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/homee/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.homee.svg)

# ioBroker Home Adapter

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Beschreibung

Dieser Adapter verbindet ioBroker mit homee und bietet folgende Funktionen:

- ermöglicht die Verbindung über IP-Adresse oder Home-ID und Benutzername/Passwort
- Alle Geräte (Knoten) und Zustände (Attribute) lesen und deren Werte einschließlich Aktualisierungen in ioBroker anzeigen.
- Ermöglichen Sie das Ändern von Werten in ioBroker und senden Sie diese zurück an Homee, um Geräte zu steuern.
- Fungiert als ioBroker-Historienanbieter für alle Geräte, bei denen die Historienfunktion in homee aktiviert ist. Das bedeutet, dass Sie die in homee gespeicherten Historienwerte in ioBroker mithilfe von flot, Admin oder auch JavaScript anzeigen können, einschließlich aller Aggregationen auf Datenebene, wie sie beispielsweise vom History-Adapter bekannt sind.

(Noch) nicht unterstützt:

- Gruppen, weil sie keine Funktionen wie einen Gruppenstatus oder das gleichzeitige Schreiben auf alle Geräte in Home bieten.
- Heizungspläne

Dieser Adapter basiert auf der hervorragenden Arbeit von [stfnhmplr](http://twitter.com/stfnhmplr) und seiner [homee-api](https://github.com/stfnhmplr/homee-api) .

## Bekannte Probleme

- Bei js-controller <1.5.0 kann es zu seltsamen Effekten kommen, wenn andere Verlaufsanbieter für bestimmte Rollen aktiviert werden (z. B. "switch").

## Wie man Probleme und Funktionswünsche meldet

Bitte nutzen Sie hierfür die GitHub-Issues.

Am besten stellen Sie den Adapter auf Debug-Log-Modus ein (Instanzen -> Expertenmodus -> Spaltenprotokollierung). Laden Sie anschließend die Logdatei von Ihrer Festplatte herunter (Unterverzeichnis „log“ im ioBroker-Installationsverzeichnis, nicht aus dem Admin-Bereich, da dieser die Zeilen abschneidet). Falls Sie die Datei nicht in einem GitHub-Issue bereitstellen möchten, können Sie sie mir auch per E-Mail senden ( <iobroker@fischer-ka.de> ). Bitte fügen Sie einen Verweis auf das entsprechende GitHub-Issue hinzu und beschreiben Sie, welche Einträge in der Logdatei zu welchem Zeitpunkt angezeigt werden.

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