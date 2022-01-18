---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.twinkly/README.md
title: ioBroker.twinkly
hash: 2AkzmgVU11hLrQ0iNNizIIa/Kkg91b7iLSv0X1jkkBQ=
---
![Logo](../../../en/adapterref/iobroker.twinkly/admin/twinkly.png)

![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/twinkly-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/twinkly-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.twinkly.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.twinkly.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/patrickbs96/iobroker.twinkly.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)
![NPM](https://nodei.co/npm/iobroker.twinkly.png?downloads=true)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/patrickbs96/ioBroker.twinkly?branch=master&svg=true)

#ioBroker.twinkly
**Tests:** Linux/Mac: [![Travis-CI](https://travis-ci.com/patrickbs96/ioBroker.twinkly.svg)](https://travis-ci.com/github/patrickbs96/ioBroker.twinkly)

## Twinkly-Adapter für ioBroker
Adapter zur Kommunikation mit den [Funkelnde Lichter](https://www.twinkly.com/).

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Einstellungen
Folgende Einstellungen stehen zur Verfügung: ![admin.png](../../../en/adapterref/iobroker.twinkly/img/admin.png)

In der Tabelle können Sie alle Twinkly-Leuchten hinzufügen, die Sie steuern möchten.

| Spalte | Beschreibung |
|--------------|----------------------------------------------------------------|
| `Enabled` | Soll auf diese Verbindung zugegriffen werden |
| `IP Address` | IP-Adresse zu den Twinkly Lights |
| `State On` | Welche `ledMode` sollen aktiviert werden, wenn der Zustand `on` aktiviert ist |
| `Zustand ein` | Welcher `ledMode` soll aktiviert werden, wenn der Status `on` aktiviert ist |

Die folgenden zusätzlichen Status werden pro Gerät erstellt, wenn sie aktiviert sind:

* Geräteinformationen
* Netzwerkstatus
* MQTT

Folgende Staaten stehen zur Verfügung:

| Staat | Beschreibbar | Beschreibung |
|---------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `connected` | :x: | Gerät verbunden |
| `firmware` | :x: | Firmware-Version |
| `ledBri` | :heavy_check_mark: | Helligkeit (Steuerung mit -1 deaktivieren) |
| `ledColor` | :heavy_check_mark: | Farbe der LEDs, HSV/RGB(W)/HEX (`Color`) |
| `ledConfig` | :heavy_check_mark: | Konfiguration der LEDs |
| `ledEffect` | :heavy_check_mark: | Effekte (`Effect`) |
| `ledLayout` | :heavy_check_mark: | Anordnung der LEDs (für weitere Tests deaktiviert) |
| `ledMode` | :heavy_check_mark: | Modus: Film, Farbe, Effekt, Playlist, Aus, RealTime (noch nicht unterstützt), Demo |
| `ledMovie` | :heavy_check_mark: | Aktiver Film, Wenn mehrere Filme in der Playlist-Funktion hinzugefügt wurden, können sie hier ausgewählt werden. (`Movie`) |
| `ledPlaylist` | :heavy_check_mark: | Aktiver Playlist-Eintrag, Wechsel zwischen Filmen. (`Playlist`) |
| `ledSat` | :heavy_check_mark: | Sättigung 0-100 (Steuerung mit -1 deaktivieren) |
| `mqtt` | :heavy_check_mark: | MQTT-Verbindung |
| `name` | :heavy_check_mark: | Name |
| `network` | :x: | Netzwerk-Informationen |
| `on` | :heavy_check_mark: | Ein/Aus-Schalter |
| `paused` | :heavy_check_mark: | Unterbrechen Sie die Verbindung zu Twinkly, damit Sie Änderungen in der App vornehmen können. Andernfalls könnten Sie die Verbindung während der Arbeit in der App verlieren |
| `timer` | :heavy_check_mark: | Aktualisieren Sie den Timer |
| `Timer` | :heavy_check_mark: | Aktualisieren Sie den Timer |

[Private API-Informationen](https://xled-docs.readthedocs.io/en/latest/) von [Pavol Babinčák](https://github.com/scrool)

## Bekannte Probleme
* Die maximale Länge des Filmnamens beträgt 15 Zeichen

## Changelog

### 0.2.11 (2022-01-02)
* (patrickbs96) Add setting to select which ledMode should be activated

### 0.2.10 (2021-12-31)
* (patrickbs96) Add setting to enable automatically switching of Mode after State change (color, effect, movie, playlist)

### 0.2.8 (2021-12-20)
* (patrickbs96) Rename mode On to movie as it's a better representation

### 0.2.7 (2021-12-19)
* (patrickbs96) Hex without Hash. Option to not use ping for reachability.

### 0.2.6 (2021-12-09)
* (patrickbs96) Renamed States with led control. Now starting with "led".
* (patrickbs96) Add new State `ledLayout`/`ledPlaylist`

### 0.2.4 (2021-12-03)
* (patrickbs96) Handle wrong input so it does not cause exceptions
* (patrickbs96) Add new State `ledEffect`

### 0.2.2 (2021-11-30)
* (patrickbs96) Add new State `ledColor`

### 0.2.0 (2021-11-28)
* (patrickbs96) Add new Value `color` from API-Response (Sentry IOBROKER-TWINKLY-J, IOBROKER-TWINKLY-K, IOBROKER-TWINKLY-M, IOBROKER-TWINKLY-N, IOBROKER-TWINKLY-P)
* (patrickbs96) Add Pause-Feature, to work with app. (Twinkly only allows one active connection...)
* (patrickbs96) Add Feature, activate uploaded Movies (Playlist) 

### 0.1.15 (2021-10-26)
* (patrickbs96) Add new Value `network.accesspoint.password_changed` from API-Response (Sentry IOBROKER-TWINKLY-A)

### 0.1.14 (2021-10-23)
* (patrickbs96) Add new Value `network.station.status` from API-Response (Sentry IOBROKER-TWINKLY-A, IOBROKER-TWINKLY-B)
* (patrickbs96) Add new Value `network.details.product_version` from API-Response (Sentry IOBROKER-TWINKLY-E)
* (patrickbs96) Add new Value `network.details.rssi` from API-Response (Sentry IOBROKER-TWINKLY-D)
* (patrickbs96) Add new Value `color` from API-Response (Sentry IOBROKER-TWINKLY-7)

### 0.1.13 (2021-10-13)
* (patrickbs96) Add new Value `network.station.rssi` from API-Response (Sentry IOBROKER-TWINKLY-8)

### 0.1.12 (2021-09-13)
* (patrickbs96) Added new Values from Response (Sentry IOBROKER-TWINKLY-7)
* (patrickbs96) Prevent excessive Sentry Logging 

### 0.1.10 (2021-09-04)
* (patrickbs96) Update API values to Firmware 2.7.1

### 0.1.8 (2021-02-06)
* (patrickbs96) Changes from the Review

### 0.1.6
* (patrickbs96) Update dependencies

### 0.1.5
* (patrickbs96) Prevent Crash Case at HTTP Error (Sentry IOBROKER-TWINKLY-3)

### 0.1.4
* (patrickbs96) Temporary removing Reset as API path not exists

### 0.1.1
* (patrickbs96) Prevent Crash Case at HTTP Error (Sentry IOBROKER-TWINKLY-3)

## License
MIT License

Copyright (c) 2022 patrickbs96 <patrickbsimon96@gmail.com>

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