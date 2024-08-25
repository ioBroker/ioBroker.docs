---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.squeezeboxrpc/README.md
title: ioBroker Logitech Squeezebox Adapter über JSON/RPC-Protokoll
hash: ApQx3ISC5vhk8iOmN++3gMfLBg2a4pNQLkFTGh1r4eI=
---
![Logo](../../../en/adapterref/iobroker.squeezeboxrpc/admin/squeezeboxrpc.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)
![Anzahl der Installationen](https://iobroker.live/badges/squeezeboxrpc-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/squeezeboxrpc-stable.svg)
![NPM](https://nodei.co/npm/iobroker.squeezeboxrpc.png?downloads=true)

# IoBroker Logitech Squeezebox Adapter über JSON/RPC-Protokoll
**Tests:** ![Testen und Freigeben](https://github.com/oweitman/ioBroker.squeezeboxrpc/workflows/Test%20and%20Release/badge.svg)

Dies ist ein alternativer Adapter, der das JSON/RPC-Protokoll verwendet, um Daten abzurufen und Befehle an den Logitech Media Server ([LMS](https://de.wikipedia.org/wiki/Logitech_Media_Server)) zu senden, um angeschlossene Geräte zu steuern, wie

- native [Squeezebox](https://de.wikipedia.org/wiki/Squeezebox),
- Raspberry Pi mit zusätzlichem Audiomodul und kleinen Linux-basierten Firmwares

wie [picoreplayer](https://picoreplayer.org/) oder [max2play](https://www.max2play.com).

- mit Plugins Chromecast, Airplay oder UPnP/DLNA-Geräte

Der LMS-Server kann sehr große Musiksammlungen auf Festplatten oder NAS verwalten/bereitstellen und sich mit verschiedenen Streaming-Anbietern wie Spotify, Deezer, Soundcloud, Shoutcast, TuneIn, Napster, Pandora, Tidal und mehr verbinden.

Warum noch ein Quetschkommodenadapter?

Der vorhandene Adapter verwendet Telnet, um auf das LMS zuzugreifen. Telnet hat einige Nachteile.
Die eigentliche Hauptweboberfläche des LMS verwendet ebenfalls das RPC/JSON-Protokoll, um alle erforderlichen Informationen abzurufen oder Befehle an den Server/die Spieler zu senden.

## Merkmale
- die meisten Daten, die der LMS-Dienst bereitstellt, sind im Adapter verfügbar
- detaillierte Informationen über den Player-Status, Songtitel, Künstler,

Album, Cover, Playlist

- viele Steuerfunktionen zum Abspielen, Anhalten, Stoppen, Vorspulen, Zurückspulen, Wiederholen,

Zufallswiedergabe, Favoriten abspielen, zur Zeit springen (absolut und relativ), zum Playlist-Index springen (absolut und relativ), Ein-/Ausschalten und Voreinstellungstasten

- alle Favoriten und alle Unterebenen vom Server
- viele Widgets für die iobroker-vis Komponente sind enthalten, um eigene

Benutzeroberflächen steuern (Player auswählen, Favoriten auswählen, Synchronisierungsgruppen verwalten, Schaltflächen für Wiedergabe/Pause, Vorspulen, Zurückspulen, Wiederholungsmodus und Auswahl des Zufallsmodus)

Dokumentation für die Vis-Widgets finden Sie in Vis oder [Widget-Dokumentation/deutsch](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.squeezeboxrpc/blob/master/widgets/squeezeboxrpc/doc.html)

## Installation
- Installieren Sie das Paket
- Erstellen Sie eine Instanz
- Konfigurieren Sie die Instanz mit der IP des Logitech-Medienservers

und den Port (normalerweise 9000)

- Starten/Neustarten der Instanz

## Aktualisieren
- nach Änderungen im Widget-Code und Update des Adapters, iobroker

soll Webdateien auf den internen Webserver hochladen. Benutzer berichteten, dass dies manchmal nicht oder nur verzögert passierte. Sie können diese Aktion mit dem folgenden Befehl auslösen

iobroker-Upload SqueezeboxPC

## Bereitgestellte Staaten
### Server
| Status | Beschreibung |
| ---------------- | ----------------------------- |
| LastScan | Zeitstempel des letzten Musikscans |
| PlayerCount | Anzahl bekannter Spieler |
| PlayerCountOther | Anzahl bekannter anderer Spieler |
| PlayerCountSN | Anzahl bekannter SN-Spieler |
| TotalAlbums | Anzahl aller bekannten Alben |
| TotalArtists | Anzahl aller bekannten Interpreten |
| Gesamtdauer | Gesamtspieldauer aller Songs |
| TotalGenres | Anzahl aller bekannten Genres |
| TotalSongs | Anzahl aller bekannten Songs |
| SyncGroups | Vorhandene Syncgroups |
| Version | LMS-Version |
| mac | MAC-ID des Servers |
| UUID | UUID der LMS-Instanz |

zusätzlich ein definierter Button zum Aktualisieren der Favoriten

| Schaltfläche | Beschreibung |
| ------------ | --------------------------------- |
| getFavorites | alle Favoriten vom Server anfordern |

### Favoriten
Für jeden Favoriten sind alle Attribute schreibgeschützt.

| Status | Beschreibung |
| -------- | ------------------------------------------ |
| Name | Name des Favoriten |
| hasitems | gibt an, ob dies ein Verzeichnis ist |
| ID | ID des Favoriten |
| Bild | Bild/Symbol für Favorit, sofern verfügbar |
| isaudio | isaudio |
| Typ | Beispieltypen: Link, Text, Audio, Playlist |
| URL | URL des Titels |

Es sind sämtliche Unterebenen (Unterverzeichnisse) der Favoriten verfügbar.

### Spieler
für jeden Spieler Der Modus zeigt an, ob du den Wert ändern kannst. Die ausgeführte Aktion wird beim Attribut beschrieben.

| Zustand | Modus | Beschreibung |
| -------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------- |
| Alarme | R/- | Alle registrierten Alarme für diesen Spieler als JSON |
| Album | R/- | Name des aktuellen Albums |
| Künstler | R/- | Name des Künstlers |
| ArtworkUrl | R/- | URL zum Artwork |
| Bitrate | R/- | Bitrate des Titels |
| Verbunden | R/- | Verbindungsstatus des Spielers (0/1) |
| Dauer | R/- | Dauer des Tracks |
| Genre | R/- | Genre des Titels |
| IP | R/- | IP des Spielers |
| Modus | R/- | Wiedergabe / Pause / Stopp |
| Spielername | R/- | Name des Spielers |
| Spieler-ID | R/- | Spieler-ID |
| Playlist | R/- | Die eigentliche Playlist als JSON |
| PlaylistCurrentIndex | R/W | gehe zu einer absoluten Position durch Angabe des<br> Trackindex oder relativ mit einem + oder - am<br> Anfang. Beispiel 10,-3,+2 |
| PlaylistRepeat | R/W | Lied(1)/Playlist(2) wiederholen/nicht wiederholen(0) |
| PlaylistShuffle | R/W | Playlist zufällig abspielen (1)/Album zufällig abspielen (2)/Nicht zufällig abspielen (0) |
| Power | R/W | Energiestatus des Players abrufen/einstellen aus(0)/an(1) |
| RadioName | R/- | Name des Radiosenders |
| Bewerten | R/- | Bewertung des Liedes |
| Remote | R/- | Wenn Remote-Stream (1) |
| SyncMaster | R/- | ID/MAC von Syncmaster |
| SyncSlaves | R/- | ID/Mac von Spielern in der Sync-Gruppe |
| Zeit | R/- | verstrichene Songzeit |
| Titel | R/- | Liedtitel |
| Typ | R/- | Medientyp (zB MP3-Radio) |
| URL | R/- | URL des Titels/Streams |
| Lautstärke | R/W | Lautstärke des Players abrufen/einstellen (0-100) |
| Status | R/W | Wiedergabestatus abrufen/festlegen: Pause(0),Wiedergabe(1),Stopp(2) |

Die Playlist bietet aktuell die folgenden Attribute, sofern sie in LMS verfügbar sind.
Einige Attribute hängen von der Art der Songs ab (Stream/Datei/...). Alle Attribute sind schreibgeschützt.

| Attribut | Beschreibung |
| ---------- | --------------------------------- |
| Album | Name des aktuellen Albums |
| Künstler | Name des Künstlers |
| ArtworkUrl | URL zum Artwork |
| Bitrate | Bitrate des Titels |
| Dauer | Dauer des Tracks |
| RadioName | Name des Radiosenders |
| Bewerten | Bewertung des Liedes |
| Titel | Liedtitel |
| Typ | Medientyp (zB MP3-Radio) |
| URL | URL des Titels/Streams |
| Index | Index des Songs in der Playlist |
| ID | ID des Liedes |

zusätzlich definierte Schaltflächen:

| Schaltfläche | Beschreibung |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| btnWeiter | Nächstes Lied |
| btnRewind | Vorheriges Lied |
| btnPreset\_\* | 1–6 Schaltflächen zum Definieren im Player oder Server |
| cmdGeneral | ein allgemeines Befehlsfeld um Befehle an den Player zu senden. Jedes Feld muss in Anführungszeichen gesetzt werden. Parameter müssen durch Kommas getrennt werden. Beispiel: "play","1" |
| cmdPlayFavorite | um einen Favoriten abzuspielen, legen Sie die ID des Favoriten fest |
| cmdPlayUrl | um eine URL abzuspielen, Beispiel "<http://50.7.77.114:8101/>;" |
| cmdGoTime | springe zu einer absoluten Position durch Angabe einer Sekundenzahl oder springe relativ mit einem + oder - am Anfang der Sekunden. Beispiel 100,-50,+50 |

Weitere Informationen finden Sie in der CLI-Dokumentation:

<https://github.com/elParaguayo/LMS-CLI-Documentation/blob/master/LMS-CLI.md>

## Aufgaben
- mehr Tests/Korrekturen
- Abhängigkeiten zu anderen Paketen reduzieren (Squeezenode)
- mehr Konfigurationsmöglichkeiten zum optionalen Ein- und Ausschalten von Features zur Verbesserung von Speicher und Leistung
- Playlist-Widget hinzufügen
- Browse-Widget zum Browsen im LMS-Menü hinzufügen
- Spielergesteuertes Kreisknopf-Widget hinzufügen
- Die Wiedergabe wird gestoppt, wenn die Favoritentaste erneut gedrückt wird.
- cmdGeneral für Server.
- ~~Telnet-Kommunikation hinzufügen, um Push-Ereignisse vom Server abzurufen und so das Polling zu optimieren~~
- ~~Implementieren Sie einen Befehlsstatus, um benutzerindividuelle Befehle (über JSON) für Server und Spieler zu platzieren~~
- ~~weitere Steuerungsfunktionen implementieren (zum Abspielen Playlist-Position auswählen, vor- und zurückspulen, zu einer Zeitposition im Song springen, Song wiederholen, zufälliger Song)~~
- ~~Fügen Sie die Wiedergabeliste den Spielerdaten als JSON-Array hinzu~~
- ~~Grafiken (Senderlogo/Playlist-Cover) für Favoriten hinzufügen~~
- ~~mehr Ebenen (Unterverzeichnisse) von Favoriten implementieren~~
- ~~Logitech-Medienserver automatisch erkennen~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
-->
### 1.3.15 (2024-08-09)

-   due to a adapter checker issue i have to remove the release 1.3.13 from npm.
    but changes from 1.3.13 are included in 1.3.14

### 1.3.14 (2024-08-05)

-   fix formatting

### 1.3.13 (2024-08-05)

-   revert the fix for artist handling due to negative effect of spotify

### 1.3.12 (2024-08-05)

-   improve cmdGoto handling by kairauer, close PR #74
-   fix issues from adapter checker
-   integrate squeezenode lib

### 1.3.11 (2024-08-05)

-   update adapter structure and switch to jsonconfig

### 1.3.10

-   getalbumartist as artist if setting of TPE2/TPE3 in LMS are changed"

### 1.3.9

-   fix error with deleting favorites
-   fix wrong type for datapoint

### 1.3.8

-   fix forward button widget

### 1.3.7

-   fix object creation of states in player modul

### 1.3.6

-   fix object creation of states

### 1.3.5

-   fix object creation for favorites

### 1.3.4

-   fix object creation for favorites / \* center widgets in sidebar

### 1.3.3

-   repair imageproxy for image datapoints of favorites

### 1.3.2

-   fix for Alarm contains only enabled Alarms

### 1.3.1

-   fix problem with git dependency url

### 1.3.0

-   fix problem wit setting own icon in player widget / \* add infos about alarms to a player datapoint

### 1.2.1

-   fix small issue in last version

### 1.2.0

-   improve handling of imageproxy artwork

### 1.1.0

-   make request of favorites configurable

### 1.0.1

-   change setstate/createobject logic
-   fix role and type for Mode-state
-   update tests
-   update dependency versions
-   improve io-package.json

### 1.0.0

-   prepare for stable repository

### 0.8.32

-   the adapter function iobroker.deleteChannel didnt works as expected. it didnt delete the whole subtree of states. now i implement my own delete function

### 0.8.31

-   change behaviour of deleting favorites

### 0.8.30

-   change from the issue of the adapter checker

### 0.8.29

-   optimize handling of player state power and connected

### 0.8.28

-   add advanced signaling function with telnet and fix some more authorization issues with LMS

### 0.8.27

-   initialization for the new calctype property if empty in volumebar

### 0.8.26

-   more improvement and fixing at volumebar / remove playlist widget from master. not ready yet

### 0.8.25

-   fixing css-settings on volumebar

### 0.8.24

-   volumebar didnt get events between the segments, change clickevent and calculation

### 0.8.23

-   adjust dependencies to remove vulnerabilities in dependend packages. alos remove travis due of unresolvable build-failures for win+node10/12

### 0.8.22

-   due to iobroker.controller 2.0 a command in the api changed (socket to vis.conn.\_socket)

### 0.8.21

-   add command für playing urls

### 0.8.20

-   remove node v6 test setting

### 0.8.19

-   shorten news history

### 0.8.18 (2019-06-27)

-   last minute changes.

### 0.8.17 (2019-06-26)

-   add more widges: playtime bar, string, number, datetime, image. add button margin to player and favorite widget, improve editing of viewindex. do some refactoring.

### 0.8.16 (2019-06-24)

-   resolve a cross browser issue for firefox. the style.font attribute is empty and you have to construct the font string by yourself

### 0.8.15 (2019-06-19)

-   minor issue with not ready states

### 0.8.14 (2019-06-19)

-   add syncgroups as new server-datapoint,add syncgroup widget, change some jquery event logic

### 0.8.13 (2019-06-16)

-   rename widgetset from squeezeboxrpcwidgets to squeezeboxrpc

### 0.8.12 (2019-06-16)

-   sync version with npm

### 0.8.11 (2019-06-15)

-   try to integrate the widgets into the main adapter

### 0.8.10 (2019-05-15)

-   another try to fix the EADDRINUSE error of the server discovery

### 0.8.9 (2019-05-15)

-   try to fix the EADDRINUSE error of the server discovery

### 0.8.8 (2019-05-14)

-   make discover configurable

### 0.8.7 (2019-05-11)

-   more control features (select playlist pos to play,ffwd,frew,jump to a time position in song,repeat song,random song)

### 0.8.6 (2019-05-10)

-   move some configuration options into seperate tabs

### 0.8.5 (2019-05-08)

-   change serverdiscovery interval method, remove some double cmd lines, additional minor changes advised from eslint

### 0.8.4

-   move some files to lib directory

### 0.8.3

-   close port for discovery on unload

### 0.8.2

-   sync version with npm

### 0.8.1

-   set compact mode flag

### 0.8.0

-   implementation of compact mode, change version to represent a realistic feature completness

### 0.0.9

-   debug options are now configurable

### 0.0.8

-   More playlist attributes + remove trailing and leading spaces from source

### 0.0.7

-   Add the playlist to each player as json

### 0.0.6

-   More config options

### 0.0.5

-   All levels/subdirectories of favorites are now available in iobroker

### 0.0.4

-   added the cmdPlayFavorite for each player

### 0.0.3

-   repair the no-data symbols for buttons in vis

### 0.0.2

-   added autodiscovery

### 0.0.1

-   initial release

## License

MIT License

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

Copyright (c) 2019-2024 oweitman