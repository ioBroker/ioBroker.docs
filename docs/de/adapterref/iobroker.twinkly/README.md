---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.twinkly/README.md
title: ioBroker.twinkly
hash: TkO67G2wpv+wIV3yhap/MVQbyPHJcQQlbzZ8rhjsixg=
---
![Logo](../../../en/adapterref/iobroker.twinkly/admin/twinkly.png)

![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/twinkly-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/twinkly-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.twinkly.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.twinkly.svg)
![Test und Freigabe](https://github.com/patrickbs96/ioBroker.twinkly/workflows/Test%20and%20Release/badge.svg)
![CodeQL](https://github.com/patrickbs96/ioBroker.twinkly/workflows/CodeQL/badge.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)

# ioBroker.twinkly

## Twinkly-Adapter für ioBroker

Adapter zur Kommunikation mit den [Twinkly-Lichtern](https://www.twinkly.com/) .

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Einstellungen

Folgende Einstellungen stehen zur Verfügung:![Administratoreinstellungen](../../../en/adapterref/iobroker.twinkly/img/admin.png)

In der Tabelle können Sie alle Twinkly-Lichter hinzufügen, die Sie steuern möchten.

| Spalte       | Beschreibung                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Enabled`    | Soll diese Verbindung genutzt werden?                                                                                                                   |
| `Name`       | Name der Verbindung in ioBroker                                                                                                                         |
| `IP Address` | IP-Adresse der Lichterkette                                                                                                                             |
| `Mode On`    | Welche`ledMode` sollte aktiviert werden, wenn der Zustand`on` ist aktiviert.<br/> Farbe, Effekt, Film, Musikreaktiv, Wiedergabeliste oder letzter Modus |

Folgende zusätzliche Status werden pro Gerät erstellt, wenn diese Option aktiviert ist:

- Geräteinformationen
- MQTT
- Netzwerkstatus

Folgende Bundesstaaten stehen zur Verfügung:

| Zustand       | Beschreibbar         | Beschreibung                                                                                                                                                                   |
| ------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `connected`   | :X:                  | Gerät angeschlossen                                                                                                                                                            |
| `details`     | :X:                  | Gerätedetails                                                                                                                                                                  |
| `firmware`    | :X:                  | Firmware-Version                                                                                                                                                               |
| `ledBri`      | :heavy\_check\_mark: | Helligkeit (Steuerung mit -1 deaktivieren)                                                                                                                                     |
| `ledColor`    | :heavy\_check\_mark: | Farbe der LEDs, HSV/RGB(W)/HEX (`Color` )                                                                                                                                      |
| `ledConfig`   | :heavy\_check\_mark: | LED-Konfiguration                                                                                                                                                              |
| `ledEffect`   | :heavy\_check\_mark: | Auswirkungen (`Effect` )                                                                                                                                                       |
| `ledLayout`   | :heavy\_check\_mark: | Anordnung der LEDs (für weitere Tests deaktiviert)                                                                                                                             |
| `ledMode`     | :heavy\_check\_mark: | Modus: Farbe, Effekt, Film, Musikreaktiv, Wiedergabeliste, Aus, Echtzeit (noch nicht unterstützt), Demo                                                                        |
| `ledMovie`    | :heavy\_check\_mark: | Aktiver Film: Wenn in der Wiedergabelistenfunktion mehrere Filme hinzugefügt wurden, können diese hier ausgewählt werden.`Movie` )                                             |
| `ledPlaylist` | :heavy\_check\_mark: | Aktiver Playlist-Eintrag, Wechsel zwischen Filmen.`Playlist` )                                                                                                                 |
| `ledSat`      | :heavy\_check\_mark: | Sättigung 0-100 (Steuerung mit -1 deaktivieren)                                                                                                                                |
| `mqtt`        | :heavy\_check\_mark: | MQTT-Verbindung                                                                                                                                                                |
| `name`        | :heavy\_check\_mark: | Name                                                                                                                                                                           |
| `network`     | :X:                  | Netzwerkinformationen                                                                                                                                                          |
| `on`          | :heavy\_check\_mark: | Ein-/Ausschalter                                                                                                                                                               |
| `paused`      | :heavy\_check\_mark: | Unterbrechen Sie die Verbindung zu Twinkly, um Änderungen in der App vornehmen zu können. Andernfalls könnte die Verbindung während der Arbeit in der App unterbrochen werden. |
| `timer`       | :heavy\_check\_mark: | Timer aktualisieren                                                                                                                                                            |

[Private API-Informationen](https://xled-docs.readthedocs.io/en/latest/) von [Pavol Babinčák](https://github.com/scrool)

## Bekannte Probleme

- Der Filmtitel darf maximal 15 Zeichen lang sein.

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

### Upload-Vorlage Film

Laden Sie einen vordefinierten Film hoch.

- 0: Funkelndes Blau-Weiß
- 1: Funkelndes Weihnachtsgrün-Rot

```
sendTo('twinkly.0', 'uploadTemplateMovie', {
    connection : 'Fenster',
    template   : 1
});

```

### Lade den Twinkle-Film hoch

```
sendTo('twinkly.0', 'uploadTwinkleMovie', {
    connection  : 'Fenster',
    baseColor   : '#00873f', // or {r: 0, g: 135, b: 62}
    secondColor : '#c30F15'  // or {r: 195, g: 15, b: 22}
});
```

<!--
### Send Realtime Frame
```
sendTo('twinkly.0', 'sendrealtimeframe', {
    connection : 'Fenster',
    frame      : [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
});
```
-->

### Rahmen in einer bestimmten Farbe generieren

Gibt ein vollständiges Bild in einer Farbe zurück. Die Farben werden in der Eigenschaft übergeben.`colors` Sie erhalten ein Array von Frames zurück.

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