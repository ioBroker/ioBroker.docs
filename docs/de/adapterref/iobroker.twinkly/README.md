---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.twinkly/README.md
title: ioBroker.twinkly
hash: dODv9tmcKhbNghm0cBDTpPSkyux3dBm+iwVC+hwqq5g=
---
![Logo](../../../en/adapterref/iobroker.twinkly/admin/twinkly.png)

![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/twinkly-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/twinkly-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.twinkly.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.twinkly.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)

# IoBroker.twinkly
[![Testen und Freigeben](https://github.com/patrickbs96/ioBroker.twinkly/workflows/Test%20and%20Release/badge.svg)](https://github.com/patrickbs96/ioBroker.twinkly/actions?query=workflow%3A%22Test+and+Release%22++) [![CodeQL](https://github.com/patrickbs96/ioBroker.twinkly/workflows/CodeQL/badge.svg)](https://github.com/patrickbs96/ioBroker.twinkly/actions?query=workflow%3ACodeQL)

## Twinkly-Adapter für ioBroker
Adapter zur Kommunikation mit [Funkelnde Lichter](https://www.twinkly.com/).

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Einstellungen
Folgende Einstellungen sind verfügbar: ![Admin-Einstellungen](../../../en/adapterref/iobroker.twinkly/img/admin.png)

In der Tabelle können Sie alle Twinkly-Lichter hinzufügen, die Sie steuern möchten.

| Spalte | Beschreibung |
|--------------|---------------------------------------------------------------------------------------------------------------------------------|
| `Enabled` | Soll auf diese Verbindung zugegriffen werden? |
| `IP Address` | IP-Adresse für die Twinkly Lights |
| `Mode On` | Welches `ledMode` soll aktiviert werden, wenn der Status `on` aktiviert ist.<br/> Farbe, Effekt, Film, Musikreaktiv, Playlist oder letzter Modus |
| „Modus ein“ | Welcher „LED-Modus“ soll aktiviert werden, wenn der Status „ein“ aktiviert ist.<br/> Farbe, Effekt, Film, Musikreaktiv, Playlist oder letzter Modus |

Wenn diese Option aktiviert ist, werden die folgenden zusätzlichen Zustände pro Gerät erstellt:

* Geräteinfo
* MQTT
* Netzwerkstatus

Die folgenden Staaten sind verfügbar:

| Status | Schreibbar | Beschreibung |
|---------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `connected` | :x: | Gerät verbunden |
| `firmware` | :x: | Firmware-Version |
| `ledBri` | :heavy_check_mark: | Helligkeit (Regler mit -1 deaktivieren) |
| `ledColor` | :heavy_check_mark: | Farbe der LEDs, HSV/RGB(W)/HEX (`Color`) |
| `ledConfig` | :heavy_check_mark: | Konfiguration der LEDs |
| `ledEffect` | :heavy_check_mark: | Effekte (`Effect`) |
| `ledLayout` | :heavy_check_mark: | Anordnung der LEDs (für weitere Tests deaktiviert) |
| `ledMode` | :heavy_check_mark: | Modus: Farbe, Effekt, Film, Musikreaktiv, Wiedergabeliste, Aus, Echtzeit (noch nicht unterstützt), Demo |
| `ledMovie` | :heavy_check_mark: | Aktiver Film. Wenn der Playlist-Funktion mehrere Filme hinzugefügt wurden, können sie hier ausgewählt werden. (`Movie`) |
| `ledPlaylist` | :heavy_check_mark: | Aktiver Playlist-Eintrag, zwischen Filmen wechseln. (`Playlist`) |
| `ledSat` | :heavy_check_mark: | Sättigung 0-100 (Steuerung mit -1 deaktivieren) |
| `mqtt` | :heavy_check_mark: | MQTT-Verbindung |
| `name` | :starkes_Häkchen: | Name |
| `network` | :x: | Netzwerk-Informationen |
| `on` | :heavy_check_mark: | Ein-/Ausschalter |
| `paused` | :heavy_check_mark: | Unterbrechen Sie die Verbindung zu Twinkly, damit Sie Änderungen in der App vornehmen können. Andernfalls kann die Verbindung während der Arbeit in der App verloren gehen |
| `timer` | :heavy_check_mark: | Timer aktualisieren |
| `timer` | :heavy_check_mark: | Aktualisiere den Timer |

[Private API-Informationen](https://xled-docs.readthedocs.io/en/latest/) von [Pavol Babinčák](https://github.com/scrool)

## Bekannte Probleme
* Die maximale Länge des Filmtitels beträgt 15 Zeichen

## Codebeispiele
### Film hochladen
```
sendTo('twinkly.0', 'uploadMovie', {
    connection : 'Fenster',
    frames     : [
        [{"r":18,"g":105,"b":58},{"r":18,"g":105,"b":58}, ...],
        [{"r":18,"g":105,"b":58},{"r":18,"g":105,"b":58}, ...],
        ...
    ],
    delay : 250
});
```

### Vorlagefilm hochladen
Laden Sie einen vordefinierten Film hoch.

- 0: Funkelndes Blau-Weiß
- 1: Twinkle Christmas-Grün-Rot

```
sendTo('twinkly.0', 'uploadTemplateMovie', {
    connection : 'Fenster',
    template   : 1
});

```

### Twinkle-Film hochladen
```
sendTo('twinkly.0', 'uploadTwinkleMovie', {
    connection  : 'Fenster',
    baseColor   : '#00873f', // or {r: 0, g: 135, b: 62}
    secondColor : '#c30F15'  // or {r: 195, g: 15, b: 22}
});
```

<!--

### Echtzeit-Frame senden
```
sendTo('twinkly.0', 'sendrealtimeframe', {
    connection : 'Fenster',
    frame      : [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
});
```

-->

### Rahmen in einer bestimmten Farbe generieren
Gibt einen vollständigen Frame in einer Farbe zurück.
Durch Senden der Farben in der Eigenschaft `colors` erhalten Sie ein Array von Frames zurück.

```
sendTo('twinkly.0', 'generateFrame', {
    connection : 'Fenster',
    color      : '#12693a' // or {"r": 18,"g":105,"b":58}
});
response => {
    // [{"r":18,"g":105,"b":58},{"r":18,"g":105,"b":58}, ...]
    ...
}

sendTo('twinkly.0', 'generateFrame', {
    connection : 'Fenster',
    colors     : ['#12693a', ...] // or [{"r":18,"g":105,"b":58}, ...]
});
response => {
    // [[{"r":18,"g":105,"b":58},{"r":18,"g":105,"b":58}, ...], ..]
    ...
}
```

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* Update dependencies

### 1.0.14 (2023-07-19)
* Add formatting to some states (hex-values -> uppercase, uptime in hours)
* Handle Sentry message (IOBROKER-TWINKLY-8P)
* Update dependencies

### 1.0.13 (2023-02-01)
* Update dependencies

### 1.0.12 (2022-12-22)
* Slave can write ledBri and ledSat

### 1.0.11 (2022-12-13)
* Extend Sentry logging for details.groups when "deprecated"
* Cancel active pause not working after startup if active beforehand
* Merge libraries request and twinkly
* Optimized Code in requests
* Updated Sentry logging for better viewability

### 1.0.10 (2022-12-05)
* Add sendTo message `uploadTwinkleMovie` to upload a twinkle movie with own colors
* Update Release Integration in Github Actions and Sentry

### 1.0.9 (2022-11-27)
* Now detects if Twinkly is in a group (firmware >= 2.8.3). If so, the group can only be controlled by the master, the states from the slave are read-only.

### 1.0.8 (2022-11-26)
* Add `musicreactive` Mode
* Add Ukrainian translation
* Rework how objects are created, objects are now created after first connect after startup and updated after a firmware update

## License
MIT License

Copyright (c) 2024 patrickbs96 <patrickbsimon96@gmail.com>

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