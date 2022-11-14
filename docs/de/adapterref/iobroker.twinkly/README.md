---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.twinkly/README.md
title: ioBroker.twinkly
hash: NeaLj4EuJTdrK+PZyNzW0zSgaTV7E5ZftXt0jEvJWCM=
---
![Logo](../../../en/adapterref/iobroker.twinkly/admin/twinkly.png)

![Anzahl der Installationen (neueste)](http://iobroker.live/badges/twinkly-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/twinkly-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.twinkly.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.twinkly.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/patrickbs96/ioBroker.twinkly?branch=master&svg=true)
![Gesamtwarnungen](https://img.shields.io/lgtm/alerts/g/patrickbs96/ioBroker.twinkly.svg?logo=lgtm&logoWidth=18)
![Bekannte Schwachstellen](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)

# IoBroker.twinkly
[![Test und Freigabe](https://github.com/patrickbs96/ioBroker.twinkly/workflows/Test%20and%20Release/badge.svg)](https://github.com/patrickbs96/ioBroker.twinkly/actions?query=workflow%3A%22Test+and+Release%22++) [![CodeQL](https://github.com/patrickbs96/ioBroker.twinkly/workflows/CodeQL/badge.svg)](https://github.com/patrickbs96/ioBroker.twinkly/actions?query=workflow%3ACodeQL)

## Twinkly-Adapter für ioBroker
Adapter zur Kommunikation mit dem [Funkelnde Lichter](https://www.twinkly.com/).

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Einstellungen
Folgende Einstellungen stehen zur Verfügung: ![Admin-Einstellungen](../../../en/adapterref/iobroker.twinkly/img/admin.png)

In der Tabelle können Sie alle Twinkly-Leuchten hinzufügen, die Sie steuern möchten.

| Spalte | Beschreibung |
|--------------|-----------------------------------------------------------------------------------------------------------------|
| `Enabled` | Soll auf diese Verbindung zugegriffen werden |
| `IP Address` | IP-Adresse des Twinkly Lights |
| `Mode On` | Welche `ledMode` aktiviert werden sollen, wenn der Zustand `on` aktiviert ist.<br/> Farbe, Effekt, Film, Wiedergabeliste oder letzter Modus |
| `Modus Ein` | Welcher „ledMode“ soll aktiviert werden, wenn der Zustand „on“ aktiviert ist.<br/> Farbe, Effekt, Film, Wiedergabeliste oder letzter Modus |

Die folgenden zusätzlichen Zustände werden pro Gerät erstellt, wenn sie aktiviert sind:

* Geräteinformationen
* MQTT
* Netzwerkstatus

Folgende Zustände sind verfügbar:

| Zustand | Beschreibbar | Beschreibung |
|---------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `connected` | :x: | Gerät verbunden |
| `firmware` | :x: | Firmware-Version |
| `ledBri` | :heavy_check_mark: | Helligkeit (Regelung mit -1 deaktivieren) |
| `ledColor` | :heavy_check_mark: | Farbe der LEDs, HSV/RGB(W)/HEX (`Color`) |
| `ledConfig` | :heavy_check_mark: | Konfiguration der LEDs |
| `ledEffect` | :heavy_check_mark: | Effekte (`Effect`) |
| `ledLayout` | :heavy_check_mark: | Layout der LEDs (für weitere Tests deaktiviert) |
| `ledMode` | :heavy_check_mark: | Modus: Film, Farbe, Effekt, Playlist, Aus, RealTime (noch nicht unterstützt), Demo |
| `ledMovie` | :heavy_check_mark: | Aktiver Film, wenn mehrere Filme in der Playlist-Funktion hinzugefügt wurden, können sie hier ausgewählt werden. (`Movie`) |
| `ledPlaylist` | :heavy_check_mark: | Aktiver Playlist-Eintrag, Wechseln zwischen Filmen. (`Playlist`) |
| `ledSat` | :heavy_check_mark: | Sättigung 0-100 (Regelung mit -1 deaktivieren) |
| `mqtt` | :heavy_check_mark: | MQTT-Verbindung |
| `name` | :heavy_check_mark: | Name |
| `network` | :x: | Netzwerk-Informationen |
| `on` | :heavy_check_mark: | Ein-/Ausschalter |
| `paused` | :heavy_check_mark: | Unterbrechen Sie die Verbindung zu Twinkly, damit Sie Änderungen in der App vornehmen können. Andernfalls könnte die Verbindung während der Arbeit in der App | unterbrochen werden |
| `timer` | :heavy_check_mark: | Aktualisieren Sie den Timer |
| "Zeitgeber" | :heavy_check_mark: | Aktualisieren Sie den Timer |

[Private API-Informationen] (https://xled-docs.readthedocs.io/en/latest/) von [Pavol Babinčák](https://github.com/scrool)

## Bekannte Probleme
* Die maximale Länge für den Filmnamen beträgt 15 Zeichen

## Codebeispiele
### Film hochladen
```
sendTo('twinkly.0', 'uploadMovie', {
    connection: 'Fenster',
    movie: {
        frames: [
            [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...],
            [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...],
            ...
        ],
        delay: 250
    }
});
```

### Vorlagenfilm hochladen
Laden Sie einen vordefinierten Film hoch.

- 0: Twinkle Blau-Weiß
- 1: Twinkle Christmas-Grün-Rot

```
sendTo('twinkly.0', 'uploadTemplateMovie', {
    connection: 'Fenster',
    index: 0,1
});
```

<!--

### Echtzeit-Frame senden
```
sendTo('twinkly.0', 'sendrealtimeframe', {
    connection: 'Fenster',
    frame: [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
});
```

-->

### Rahmen in einer bestimmten Farbe generieren
Gibt ein Vollbild in einer Farbe zurück.
Durch Senden der Farben in der Eigenschaft `colors` bekommt man ein Array von Frames zurück.

```
sendTo('twinkly.0', 'generateFrame', {
    connection: 'Fenster',
    color : '#dd0055' // or {r: 221, g: 0, b: 85}
}, response => {
    // [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
    ...
});

sendTo('twinkly.0', 'generateFrame', {
    connection: 'Fenster',
    colors : ['#dd0055', ...] // or [{r: 221, g: 0, b: 85}, ...]
}, response => {
    // [[{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...], ..]
    ...
});
```

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* Fixed polling (ledBri, ledSat)

### 1.0.5 (2022-10-16)
* Fixed error when changing active movie (#173)

### 1.0.4 (2022-10-15)
* Upload Movies
* Upload Generated Movies
* --Send Realtime Frame
* Generate Full Frame in one color (create own frames)
* Update deprecated states to fw 2.6.6
* Update twinkly API Issues from Sentry

### 1.0.3 (2022-07-31)
* Add Online-Status to object-view
* Ignore `*.uid` values, unknown in which release they are available (IOBROKER-TWINKLY-1Q)

### 1.0.2 (2022-07-07)
* Add new values `details.uid` and `details.group.uid` fw >= 2.8.4, fwFamily=G (IOBROKER-TWINKLY-1G, IOBROKER-TWINKLY-1N)

### 1.0.1 (2022-07-05)
* Remove deprecated values from mode

### 1.0.0 (2022-07-03)
* Change refresh logic after State-Change
* Added depcrecated logic to remove states when no longer filled with data from api
* Check new and deprecated values from api response to update state information

### 0.3.1 (2022-07-02)
* Update translations logic i18n

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