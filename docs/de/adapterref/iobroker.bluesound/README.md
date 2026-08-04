---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bluesound/README.md
title: ioBroker.bluesound
hash: iV2CHKkj7AxzPdppcXqxwCC+QBN4/7BamJrPp/TP0WI=
---
![Logo](../../../en/adapterref/iobroker.bluesound/admin/bluesound.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.bluesound.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bluesound.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bluesound-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/bluesound-stable.svg)
![NPM](https://nodei.co/npm/iobroker.bluesound.png?downloads=true)

# IoBroker.bluesound
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/bluesound/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Test und Freigabe](https://github.com/Uwe1958/ioBroker.bluesound/workflows/Test%20and%20Release/badge.svg)

## Bluesound-Adapter für ioBroker
Adapter zur Steuerung von Bluesound-Geräten

## Eingeschlossene Funktionen
Der Adapter verwendet API-Aufrufe im folgenden Format: http://--playerIP--:11000/xxx

Beim Start werden die Voreinstellungen vom Player ausgelesen und dem Kanal „Voreinstellungen“ hinzugefügt.
Player-Modell und -Name werden im Kanal „Info“ gespeichert.
Während der Wiedergabe werden die Titel im Kanal „Info“ festgelegt.

Der Spielerstatus wird im durch 'config.pollingtime' festgelegten Intervall abgefragt und das Ergebnis wird sowohl in 'control.state' als auch in 'info.\*' gespeichert.

PollingTime-Werte bis zu 120 Sekunden sind sinnvoll. Der Adapter kann nicht mit Werten über 300 Sekunden gestartet werden. Der Standardwert beträgt 30 Sekunden.

Der Timeout-Parameter wird über den optionalen Parameter 'config.TimeOut' als Timeout für den API-Aufruf festgelegt. Der Standardwert beträgt 2 Sekunden.

Folgende Funktionen sind implementiert:

- Spielerstopp (ausgelöst durch Setzen von 'control.stop' auf true)
- Spielerstart (ausgelöst durch Setzen von 'control.start' auf true)
- Spielerpause (ausgelöst durch Setzen von 'control.pause' auf true)
- Spielt Presetxxx ab (wird ausgelöst durch Setzen von '.presets.preset(x).start' auf true)
- Lautstärke ändern (ausgelöst durch Ändern von 'control.volume')
- Zufallswiedergabe (ausgelöst durch Setzen von 'control.shuffle' auf true, Umschaltmodus)
- Wiedergabelisten-Vorwärtssprung (ausgelöst durch Setzen von 'control.forward' auf true)
- Wiedergabeliste rückwärts abspielen (ausgelöst durch Setzen von 'control.backward' auf true)

Die Bibliothekssuche für LocalMusic wurde hinzugefügt. Eine dynamische Menüliste ist in „info.list“ verfügbar. Dieses Objekt sollte als „Objekt-ID“ für eine JSON-Tabelle festgelegt werden, um das aktuelle Menü anzuzeigen. Das Objekt „control.command“ wird verwendet, um den nächsten Befehl an den Player zu übergeben. Es wird aktualisiert, indem es als „Ausgewählte ID“ dieser Tabelle definiert wird. Die Tabellenüberschrift selbst wird mithilfe von „info.listheader“ über Objektbindung für den Namen der ersten Überschrift aktualisiert. Für eine bessere Darstellung sollte nur die erste Überschrift angezeigt und ihre Breite auf 100 % gesetzt werden.

Alle Inhalte werden bis auf Albumebene angezeigt (mit Ausnahme des Menüs „Songs“, in dem die Songs direkt aufgelistet werden). Wird ein Album ausgewählt, wird dessen Inhalt sofort abgespielt und ersetzt entweder den Inhalt der aktuellen Playlist oder wird ihr hinzugefügt. Dieses Verhalten hängt vom Wert von `info.playliststate` ab. Ist der Wert `true`, wird die Playlist ersetzt, andernfalls werden die neuen Inhalte hinzugefügt. Dieser Wert kann über `control.playlist` (Schaltfläche mit Umschaltfunktion) geändert werden. Bei jedem Drücken dieser Schaltfläche wird der Wert von `info.playliststate` invertiert.

Die Bibliothekssuche wurde hinzugefügt. Wenn in „control.search“ (über ein Eingabefeld im Browser) eine Suchanfrage eingegeben wird, werden die Suchergebnisse in „info.list“ angezeigt und können wie beim Durchsuchen der Bibliothek weiter verfeinert werden.

Es ist nun auch möglich, Musik von Radiosendern zu streamen. Die Sender sind in einer vom Player bereitgestellten Menüstruktur angeordnet. Nach Auswahl eines Senders wird die Musik sofort abgespielt.

Der Inhalt der aktuellen Playlist ist im Objekt `info.playlist` (JSON) verfügbar und kann so visualisiert werden. Er ist außerdem als HTML-Tabelle in `info.playlisthtml` enthalten und kann direkt in einem HTML-Widget angezeigt werden. Das Format der resultierenden Tabelle lässt sich per CSS anpassen.

```javascript
.playlist table {
    background-color: #514d4d;
    width: 100%;
    border-collapse: collapse;
    display: block;
    overflow-y: auto;
    max-height: 100%;
}
.playlist img {
    margin: 10px;
    height: 50px;
    width:  50px;
}

.playlist .title {
    color: #ffffff;
    font-size: 18px;
    padding-top: 10px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.playlist .artist {
    color: #888888;
    padding-bottom: 10px;
}

.playlist .current {
    color: #2f9bde;
    font-size: 18px;
    padding-top: 10px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.playlist div {
    height: 800px;
}
```

## Changelog

### **WORK IN PROGRESS**

- (Uwe Nagel) Amazon service added

### 1.4.0 (2026-07-25)

- (Uwe Nagel) Fixes @types/node version
- (Uwe Nagel) Corrected translation files
- (Uwe Nagel) Bump @iobroker/adapter-core from 3.3.2 to 3.4.1
- (Uwe Nagel) Translation converted to short format
- (dependabot) Bump @iobroker/eslint-config from 2.2.0 to 2.3.4
- (dependabot) Bump axios from 1.16.0 to 1.16.1
- (dependabot) Bump @types/node from 25.6.0 to 25.9.1
- (Uwe Nagel) Radio stations added

### 1.3.1 (2026-06-05)

- (copilot) Adapter requires node.js >= 22 now
- (Uwe Nagel) Code consolidation and update @alcalzone/release-script to 5.2.1
- (Uwe Nagel) Fixed issue 184
- (Uwe Nagel) Fixed issue 152
- (Uwe Nagel) Fixed issue 162

### 1.3.0 (2025-12-03)

- (Uwe Nagel) Library search added
- (Uwe Nagel) Add control.search
- (Uwe Nagel) Add info.playlisthtml
- (Uwe Nagel) Add info.playliststate
- (Uwe Nagel) Function setPlaylistToggle added
- (Uwe Nagel) Add control.playlist
- (Uwe Nagel) Function readPlaylist added
- (Uwe Nagel) Add info.playlist
- (Uwe Nagel) Library browsing added

### 1.2.1 (2025-10-18)

- (Uwe Nagel) Add info.list and control.command
- (Uwe Nagel) Changes according to ioBroker Check
- (Uwe Nagel) Bump @types/node from 24.5.2 to 24.6.1
- (Uwe Nagel) Bump chai from 6.0.1 to 6.2.0
- (Uwe Nagel) Bump typescript from 5.9.2 to 5.9.3
- (Uwe Nagel) Bump mocha from 11.7.2 to 11.7.3
- (Uwe Nagel) Correct error in main.js, update package-lock.json
- (Uwe Nagel) Update io-package.json and package.json
- (Uwe Nagel) Update .vscode/jsonConfig.json and .gitignore
- (Uwe Nagel) Resolve dependency errors
- (Uwe Nagel) Bump mocha from 11.1.0 to 11.7.1
- (Uwe Nagel) Bump globals from 16.2.0 to 16.3.0
- (Uwe Nagel) Bump @types/node from 24.0.8 to 24.1.0
- (Uwe Nagel) Bump typescript from 5.7.3 to 5.9.2
- (Uwe Nagel) Bump chai from 5.2.0 to 5.2.1
- (Uwe Nagel) Further code cleaning (apiclient, getStateAsync)
- (Uwe Nagel) @types/xml2js added
- (Uwe Nagel) Move to eslint 9 and fix subsequent issues

### 1.2.0 (2025-07-24)

- (Uwe Nagel) Logic added to shift playlist forward/backward
- (Uwe Nagel) State roles updated
- (Uwe Nagel) Logic added to shuffle playlist
- (Uwe Nagel) Translated using Weblate (Dutch)
- (Uwe Nagel) Update test-and.release.yml to node 24.x
- (Uwe Nagel) Update testing to minimum node.js version 20

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Uwe Nagel <uwenagel@kabelmail.de>

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