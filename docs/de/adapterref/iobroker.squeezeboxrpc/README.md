---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.squeezeboxrpc/README.md
title: ioBroker Logitech/Lyrion Squeezebox Adapter über JSON/RPC-Protokoll
hash: 1FXGg6yCRjI6wLTdl6pM7NZQJUVnpljvXchtFitYDsc=
---
![Logo](../../../en/adapterref/iobroker.squeezeboxrpc/admin/squeezeboxrpc.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)
![Anzahl der Installationen](https://iobroker.live/badges/squeezeboxrpc-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/squeezeboxrpc-stable.svg)
![NPM](https://nodei.co/npm/iobroker.squeezeboxrpc.png?downloads=true)

# IoBroker Logitech/Lyrion Squeezebox Adapter über JSON/RPC-Protokoll
**Tests:** ![Testen und Freigeben](https://github.com/oweitman/ioBroker.squeezeboxrpc/workflows/Test%20and%20Release/badge.svg)

Dies ist ein alternativer Adapter, der das `JSON/RPC`-Protokoll verwendet, um Daten abzurufen und Befehle an den Logitech Media Server/Lyrion Media Server ([LMS](https://de.wikipedia.org/wiki/Lyrion_Music_Server)) zu senden und so angeschlossene Geräte zu steuern, wie

- native [Squeezebox](https://de.wikipedia.org/wiki/Squeezebox),
- Raspberry Pi mit zusätzlichem Audiomodul und kleinen Linux-basierten Firmwares

wie [picoreplayer](https://picoreplayer.org/) oder [max2play](https://www.max2play.com).

- WiiM Multiroom Audio ([kann mit einem LMS/Lyrion-Server kommunizieren](https://faq.wiimhome.com/en/support/solutions/articles/72000610226-how-to-stream-music-from-lms-to-your-wiim-device-with-squeezelite))
- mit Plugins Chromecast, Airplay oder `UPnP/DLNA`-Geräte

Der `LMS`-Server kann sehr große Musiksammlungen auf Festplatten oder `NAS` verwalten/bereitstellen und sich mit verschiedenen Streaming-Anbietern wie `Spotify`, `Deezer`, `Soundcloud`, `shoutcast`, `tunein`, `napster`, `pandora`, `tidal` und mehr verbinden

## Merkmale
- die meisten [Daten](#Server), die der `LMS`-Dienst bereitstellt, sind im Adapter verfügbar
- detaillierte [Informationen](#players) über den Player-Status, Songtitel, Künstler,

Album, Artwork, Playlist

- [viele Steuerfunktionen](#provided-states) zum Abspielen, Anhalten, Stoppen, Vorspulen,\

Zurückspulen, Wiederholen, Zufallswiedergabe, Favoriten abspielen, Zur Zeit springen (absolut und relativ), Zum Playlist-Index springen (absolut und relativ), Ein-/Ausschalten und Voreinstellungstasten

- alle [Favoriten](#Favoriten) und alle Unterebenen vom Server
- viele [Widgets](#widgets) für die iobroker-vis Komponente sind enthalten in\

Erstellen Sie eigene Benutzeroberflächen zur Steuerung (Player auswählen, Favoriten auswählen, Synchronisierungsgruppen verwalten, Schaltflächen für Wiedergabe/Pause, Vorspulen, Zurückspulen, Wiederholungsmodus und Auswahl des Zufallsmodus).

## Installation
- Installieren Sie das Paket
- Erstellen Sie eine Instanz
- Konfigurieren Sie die Instanz mit der IP des Logitech/Lyrion-Medienservers

und den Port (normalerweise 9000)

- Starten/Neustarten der Instanz

## Aktualisieren
- Nach der Installation oder Aktualisierung kann es manchmal notwendig sein\

um den folgenden Befehl auszuführen, wenn Probleme in vis-1 aufgetreten sind

`iobroker upload squeezeboxrpc`

## Bereitgestellte Zustände
### Server
| Bundesland | Beschreibung |
| ------------------ | ----------------------------- |
| `LastScan` | Zeitstempel des letzten Musikscans |
| `PlayerCountOther` | Anzahl bekannter anderer Spieler |
| `PlayerCountSN` | Anzahl bekannter SN-Spieler |
| `TotalAlbums` | Anzahl aller bekannten Alben |
| `TotalArtists` | Anzahl aller bekannten Interpreten |
| `TotalDuration` | Gesamtspielzeit aller Songs |
| `TotalGenres` | Anzahl aller bekannten Genres |
| `TotalSongs` | Anzahl aller bekannten Lieder |
| `SyncGroups` | Vorhandene Syncgroups |
| `Version` | Version von `LMS` |
| `mac` | MAC-ID des Servers |
| `uuid` | UUID der `LMS`-Instanz |
| `uuid` | UUID der `LMS`-Instanz |

zusätzlich ein definierter Button zum Aktualisieren der Favoriten

| Schaltfläche | Beschreibung |
| -------------- | --------------------------------- |
| `getFavorites` | alle Favoriten vom Server anfordern |

### Favoriten
Für jeden Favoriten sind alle Attribute schreibgeschützt

| Bundesland | Beschreibung |
| ---------- | ------------------------------------------ |
| `Name` | Name des Favoriten |
| `id` | ID des Favoriten |
| `image` | Bild/Symbol für Favoriten, falls verfügbar |
| `isaudio` | isaudio |
| `type` | Beispieltypen: Link, Text, Audio, Wiedergabeliste |
| `url` | URL des Titels |
| `url` | URL des Titels |

Alle Unterebenen (Unterverzeichnisse) der Favoriten sind verfügbar.

### Spieler
für jeden Spieler Der Modus zeigt an, ob Sie den Wert ändern können. Die ausgeführte Aktion wird beim Attribut beschrieben.

| Status | Modus | Beschreibung |
| ---------------------- | ---- | -------------------------------------------------------------------------------------------------------------------- |
| `Alarms` | R/- | Alle registrierten Alarme für diesen Player als JSON |
| `Artist` | R/- | Name des Künstlers |
| `ArtworkUrl` | R/- | URL zum Kunstwerk |
| `Bitrate` | R/- | Bitrate des Titels |
| `Connected` | R/- | Verbindungsstatus des Spielers (0/1) |
| `Duration` | R/- | Dauer des Titels |
| `Genre` | R/- | Genre des Titels |
| `IP` | R/- | IP des Spielers |
| `Mode` | R/- | Wiedergabe / Pause / Stopp |
| `Playername` | R/- | Name des Spielers |
| `PlayerID` | R/- | Spieler-ID |
| `Playlist` | R/- | Die aktuelle Playlist als JSON |
| `PlaylistCurrentIndex` | R/W | Gehe zu einer absoluten Position, indem du den Trackindex angibst, oder gehe relativ, indem du am Anfang ein + oder - eingibst. Beispiel 10,-3,+2 |
| `PlaylistRepeat` | R/W | Lied(1)/Playlist(2)/Nicht wiederholen(0) wiederholen |
| `PlaylistShuffle` | R/W | Zufallswiedergabe der Wiedergabeliste (1)/Zufallswiedergabe des Albums (2)/Nicht Zufallswiedergabe (0) |
| `Power` | R/W | Energiestatus des Players aus(0)/an(1) holen/setzen |
| `RadioName` | R/- | Name des Radiosenders |
| `Rate` | R/- | Bewertung des Songs |
| `Remote` | R/- | Wenn Remote-Stream (1) |
| `SyncMaster` | R/- | ID/MAC von Syncmaster |
| `SyncSlaves` | R/- | ID/Mac der Spieler in der Syncgroup |
| `Time` | R/- | verstrichene Liedzeit |
| `Title` | R/- | Songtitel |
| `Type` | R/- | Medientyp (zB MP3-Radio) |
| `Url` | R/- | URL des Titels/Streams |
| `Volume` | R/W | Lautstärke des Players abrufen/einstellen (0-100) |
| `state` | R/W | Wiedergabestatus abrufen/einstellen: Pause(0),Wiedergabe(1),Stopp(2) |
| `state` | R/W | Wiedergabestatus abrufen/festlegen: Pause(0),Wiedergabe(1),Stopp(2) |

Die Playlist enthält die folgenden Attribute, sofern sie in `LMS` verfügbar sind.
Einige Attribute hängen vom Songtyp (Stream/Datei/...) ab. Alle Attribute sind schreibgeschützt.

| Attribut | Beschreibung |
| ------------ | --------------------------------- |
| `Album` | Name des aktuellen Albums |
| `ArtworkUrl` | URL zum Kunstwerk |
| `Bitrate` | Bitrate des Titels |
| `Duration` | Dauer des Titels |
| `RadioName` | Name des Radiosenders |
| `Rate` | Bewertung des Songs |
| `title` | Songtitel |
| `Type` | Medientyp (zB MP3-Radio) |
| `url` | URL des Titels/Streams |
| `index` | Index des Songs in der Playlist |
| `id` | ID des Lieds |
| `id` | ID des Liedes |

zusätzlich definierte Schaltflächen:

| Schaltfläche | Beschreibung |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `btnForward` | Nächstes Lied |
| `btnPreset\_\*` | 1–6 Schaltflächen zum Definieren im Player oder Server |
| `cmdGeneral` | Ein allgemeines Befehlsfeld zum Senden von Befehlen an den Spieler. Jedes Feld muss in Anführungszeichen gesetzt werden. Parameter müssen durch Kommas getrennt werden. Beispiel: "play","1" |
| `cmdPlayFavorite` | um einen Favoriten abzuspielen, legen Sie die ID des Favoriten fest |
| `cmdPlayUrl` | um eine URL abzuspielen, Beispiel "<http://50.7.77.114:8101/>;" |
| `cmdGoTime` | Springe zu einer absoluten Position durch Angabe einer Sekundenzahl oder springe relativ mit einem + oder - am Anfang der Sekunden. Beispiel 100,-50,+50 |
| `cmdGoTime` | springe zu einer absoluten Position durch Angabe einer Sekundenzahl oder springe relativ mit einem + oder - am Anfang der Sekunden. Beispiel 100,-50,+50 |

#### Anmerkungen zu Datenpunkten abhängig von der Einstellung TPE2 im LMS
Je nach Einstellung werden den Datenpunkten unterschiedliche MP3-Tags übergeben.
Die großgeschriebenen Namen sind die Namen der MP3-Tags.

| TPE2 in LMS einstellen | Künstler | Albumkünstler | Trackkünstler | Band |
| ------------------------------ | ----------- | ----------- | ----------- | ----------- |
| als Band | KÜNSTLER | leer | TRACKARTIST | ALBUMARTIST |
| als Interpreten des Albums | ALBUMARTIST | ALBUMARTIST | leer | leer |

Zu beachten ist außerdem, dass nach einer Änderung im LMS die gesamte Bibliothek neu durchsucht und indexiert werden muss, sowie ein Song gestoppt und neu gestartet werden muss, bevor das LMS weitere Daten liefert.

### Weitere API-Dokumentation
Weitere Informationen finden Sie in der CLI-Dokumentation:

<https://github.com/oweitman/LMS-CLI-Documentation/blob/master/LMS-CLI.md>

## Widgets
### Player-Schaltflächenleiste
![Player-Schaltflächenleiste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/players.png)

Über dieses Widget können alle Player ausgewählt werden, die in Ihren Logitech/Lyrion Media Server integriert sind. Nach Auswahl einer `squeezerpc.?`-Instanz werden die verfügbaren Player im Widget angezeigt.

#### Attribute
| Gruppe | Attribut | Beschreibung |
| ----------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SqueezeboxRPC-Instanz | Gruppe „Allgemein“ | Wählen Sie eine Instanz des SqueezeboxRPC-Adapters aus. Nur diese werden hier als gültig erkannt. |
| Widget-Format | Gruppe Allgemein | Hier kann der Widget-Typ ausgewählt werden. Der Typ „formatbutton“ verfügt über den vollen Funktionsumfang und funktioniert auch mit dem SyncGroup-Widget. Der Typ „formatselect“ ist eine einfache Auswahlbox. Als Name wird der Spielername oder ein individueller Text verwendet. |
| Index anzeigen | Gruppe Allgemein | Einzelne Schaltflächen können durch Löschen des Indexes ausgeblendet oder in anderer Reihenfolge angezeigt werden. Dazu wird die jeweilige Indexposition inklusive Komma gelöscht. Indexnummern werden im Bearbeitungsmodus auf der jeweiligen Schaltfläche angezeigt, sofern die Hilfefunktion aktiviert ist. |
| Zeilenumbruch in CamelCase | Gruppe Allgemein | Wenn der Spielername in CamelCase geschrieben ist, kann hier ein Zeilenumbruch aktiviert werden, damit der Spielername größer auf dem Button erscheint. |
| Hilfe zum Bearbeitungsmodus | Gruppe „Allgemein“ | Wenn diese Hilfe aktiviert ist, werden Indexnummern auf der jeweiligen Schaltfläche angezeigt und die Einstellung „Transparenz“ in den Schaltflächeneinstellungen hat keine Auswirkung. |
| Bildbreite | Schaltflächeneinstellungen | Bildbreite einer Schaltfläche |
| Bildhöhe | Schaltflächeneinstellungen | Bildhöhe einer Schaltfläche |
| Transparenz | Schaltflächeneinstellungen | Wenn die Schaltfläche nicht aktiviert ist, wird sie vor dem Hintergrund verborgen. 0 = Unsichtbar, 1 = Vollständig sichtbar |
| Rahmenbreite | Schaltflächeneinstellungen | Rahmenbreite in Pixeln um die Schaltfläche |
| Rahmendarstellung | Schaltflächeneinstellungen | Art der Rahmendarstellung, z. B. durchgezogen, gestrichelt. |
| Normale Rahmenfarbe | Schaltflächeneinstellungen | Wenn die Schaltfläche nicht aktiviert ist, wird sie in dieser Farbe angezeigt. |
| Rahmenfarbe aktiv | Buttoneinstellungen | Wenn der Button aktiviert ist, wird er mit dieser Farbe dargestellt. |
| Rahmenradius | Schaltflächeneinstellungen | Für abgerundete Rahmenecken kann hier ein Radius in Pixeln eingegeben werden. |
| Hintergrundfarbe | Schaltflächeneinstellungen | Hintergrundfarbe für Text |
| Bild | button[x] | Hier kann ein Bild individuell definiert werden. Das Bild hat Vorrang vor dem Text. |
| Text | button[x] | Hier kann der Text individuell definiert werden. Das Bild hat Vorrang vor dem Text. |

### Favoriten-Schaltflächenleiste
![Favoriten-Schaltflächenleiste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/favorites.png)

Mit diesem Widget können Sie alle Favoriten auswählen, die auf Ihrem Logitech/Lyrion Media Server erstellt wurden.
Nach Auswahl des Player-Widgets werden die verfügbaren Favoriten im Widget angezeigt.

| Gruppe | Attribut | Beschreibung |
| ------------------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Wählen Sie das Player-Widget aus. |
| Index anzeigen | Gruppe Allgemein | Über den Index können einzelne Schaltflächen ausgeblendet oder in anderer Reihenfolge angezeigt werden. |
| Hilfe zum Bearbeitungsmodus | Gruppe „Allgemein“ | Wenn diese Hilfe aktiviert ist, werden auf den jeweiligen Schaltflächen Indexnummern angezeigt. |
| Bildbreite | Schaltflächeneinstellungen | Bildbreite einer Schaltfläche |
| Bildhöhe | Schaltflächeneinstellungen | Bildhöhe einer Schaltfläche |
| Transparenz | Schaltflächeneinstellungen | Wenn die Schaltfläche nicht aktiviert ist, wird sie vor dem Hintergrund verborgen. 0 = Unsichtbar, 1 = Vollständig sichtbar |
| Rahmenbreite | Schaltflächeneinstellungen | Rahmenbreite in Pixeln um die Schaltfläche |
| Rahmendarstellung | Schaltflächeneinstellungen | Art der Rahmendarstellung, z. B. durchgezogen, gestrichelt. |
| Normale Rahmenfarbe | Schaltflächeneinstellungen | Wenn die Schaltfläche nicht aktiviert ist, wird sie mit dieser Farbe angezeigt. |
| Rahmenfarbe aktiv | Buttoneinstellungen | Wenn der Button aktiviert ist, wird er mit dieser Farbe angezeigt. |
| Rahmenradius | Schaltflächeneinstellungen | Für abgerundete Rahmenecken kann hier ein Radius in Pixeln eingegeben werden. |
| Hintergrundfarbe | Schaltflächeneinstellungen | Hintergrundfarbe für Text |
| Bild | button[x] | Hier kann ein Bild individuell definiert werden. Das Bild hat Vorrang vor dem Text. |
| Text | button[x] | Hier kann der Text individuell definiert werden. Das Bild hat Vorrang vor dem Text. |

### Wiedergabetaste
![Wiedergabetaste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/play.png)

Der Play-Button startet bzw. stoppt die Musik auf dem ausgewählten Player.\ Zur Vorbereitung müssen Sie den Button mit dem Player-Widget verbinden.\ Der Button verfügt über eine eigene Grafik (SVG),\ alternativ können Sie auch eine eigene Grafik auswählen.

#### Attribute für die Wiedergabetaste
| Gruppe | Attribut | Beschreibung |
| ------------- | ------------------ | ------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Bild anhalten | Gruppe allgemein | Bild für Pause |
| Bild abspielen | Allgemeine Gruppe | Bild zum Abspielen |
| Haltestellenbild | Allgemeine Gruppe | Bild für Haltestelle |
| Füllfarbe | SVG-Einstellungsgruppe | Füllfarbe der Schaltfläche |
| Strichfarbe | SVG-Einstellungsgruppe | Farbe für den Rahmen |
| Strichbreite | SVG-Einstellungsgruppe | Breite des Rahmens in Pixeln |

### Nach vorne
![Nach vorne](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/fwd.png)

Mit dem Vorwärts-Widget können Sie im aktuellen Titel vorwärts springen. Die Schaltfläche kann so konfiguriert werden, dass sie um eine bestimmte Zeitspanne vorwärts springt, wenn der Player diese Funktion unterstützt.

#### Attribute für die Schaltfläche „Weiter“
| Gruppe | Attribut | Beschreibung |
| ------------- | ------------- | ---------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Schrittweite | Gruppe „Allgemein“ | Gibt die Zeit in Sekunden an, um vorwärts zu springen. |
| Schaltflächenbeschriftung | Gruppe „Allgemein“ | Anpassbare Beschriftung für die Schaltfläche. |
| Schaltflächensymbol | Gruppe Allgemein | Auswahl eines Symbols für die Schaltfläche, z. B. zum Vorwärtsspringen. |

### Zurückspulen
![Zurückspulen](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/rew.png)

Mit dem Widget „Zurückspulen“ können Sie im aktuellen Titel zurückspringen. Ähnlich wie beim Widget „Vorspulen“ kann ein Zeitraum eingestellt werden.

#### Attribute für die Schaltfläche „Zurückspulen“
| Gruppe | Attribut | Beschreibung |
| ------------- | ------------- | ------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Schrittweite | Gruppe „Allgemein“ | Gibt die Zeitspanne in Sekunden an, um die zurückgesprungen werden soll. |
| Schaltflächenbeschriftung | Gruppe „Allgemein“ | Anpassbare Beschriftung für die Schaltfläche. |
| Schaltflächensymbol | Gruppe Allgemein | Auswahl eines Symbols für die Schaltfläche, z. B. zum Zurückspringen. |

### Wiederholen
![Wiederholen](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/repeat0.svg)

Mit dem Repeat-Widget können Sie die Wiederholungsfunktion für den aktuellen Titel oder die Playlist aktivieren oder deaktivieren, sofern diese Funktion vom Player unterstützt wird.

#### Attribute für die Schaltfläche „Wiederholen“
| Gruppe | Attribut | Beschreibung |
| ------------- | ------------- | ------------------------------------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Schaltflächenbeschriftung | Gruppe „Allgemein“ | Anpassbare Beschriftung für die Schaltfläche. |
| Schaltflächensymbol | Gruppe Allgemein | Auswahl eines Symbols für die Schaltfläche, z. B. für Wiederholen. |
| Wiederholungsmodus | Gruppe Allgemein | Hier kann der Modus ausgewählt werden, zum Beispiel Einzelwiederholung (Titel) oder Listenwiederholung (Playlist). |

### Mischen
![Shuffle](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/shuffle0.svg)

Das Shuffle-Widget aktiviert oder deaktiviert die Zufallswiedergabe für die aktuelle Wiedergabeliste, sofern diese Funktion vom Player unterstützt wird.

#### Attribute für die Shuffle-Schaltfläche
| Gruppe | Attribut | Beschreibung |
| ------------- | ------------- | ------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Schaltflächenbeschriftung | Gruppe „Allgemein“ | Anpassbare Beschriftung für die Schaltfläche. |
| Schaltflächensymbol | Gruppe „Allgemein“ | Auswahl eines Symbols für die Schaltfläche, z. B. für Shuffle. |
| Aktivierter Status | Allgemeine Gruppe | Farbe oder Stil der Schaltfläche, wenn die Zufallswiedergabe aktiviert ist. |

### Lautstärke
![Volumen](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/volume.png)

Das Lautstärke-Widget zeigt die aktuelle Lautstärke des Players an und ermöglicht Ihnen, die Lautstärke anzupassen.

#### Attribute für die Lautstärketaste
| Gruppe | Attribut | Beschreibung |
| --------------------------- | ------------- | ----------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Lautstärkeschrittweite | Gruppe „Allgemein“ | Gibt die Schrittweite zum Erhöhen oder Verringern der Lautstärke an. |
| Maximale Lautstärke | Gruppe Allgemein | Legt den Maximalwert für die Lautstärke fest, z. B. 100. |
| Hauptfarbe des Lautstärkebalkens | Gruppe „Allgemein“ | Farbe für den Bereich des Balkens, der die aktuelle Lautstärke darstellt. |
| Hintergrundfarbe des Lautstärkebalkens | Gruppe „Allgemein“ | Farbe für den Bereich des Balkens, der nicht vom Volumen abgedeckt wird. |
| Schaltflächensymbol | Gruppe Allgemein | Auswahl eines Symbols für die Lautstärkeregelung. |

### SyncGroup-Schaltflächenleiste
![SyncGroup-Schaltflächenleiste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/syncgroups.png)

Dieses Widget kann in Verbindung mit dem Player-Widget verwendet werden, um die Synchronisierung der Player untereinander zu steuern.
Die meisten Einstellungen für die Anzahl der Schaltflächen, Beschriftungen oder Bilder werden vom Player-Widget übernommen.
Zur Vorbereitung müssen Sie die Schaltfläche mit dem Player-Widget verbinden.
Nach Auswahl eines Players im Player-Widget wird die aktuelle Synchronisierung im SyncGroup-Widget angezeigt.
Der Synchronisierungsstatus wird anhand der verschiedenen einstellbaren Farben angezeigt.
Der im Player-Widget ausgewählte Player kann nicht im SyncGroup-Widget ausgewählt werden.
Wenn im SyncGroup-Widget ein Player ausgewählt wird, der sich bereits in einer anderen Gruppe befindet, wird er automatisch aus dieser Gruppe entfernt.

#### Attribute für die Schaltfläche „SyncGroup“
| Gruppe | Attribut | Beschreibung |
| ----------------------------- | --------------- | ---------------------------------------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Rahmenbreite | Schaltflächeneinstellungen | Rahmenbreite/Randbreite in Pixeln um die Schaltfläche herum. |
| Rahmendarstellung | Schaltflächeneinstellungen | Art der Rahmendarstellung, z.B. durchgezogen, gestrichelt. |
| Rahmenfarbe - Nicht in Gruppe | Buttoneinstellungen | Der Button bekommt einen Rahmen mit dieser Farbe, wenn der Spieler nicht in einer Gruppe ist. |
| Rahmenfarbe - In Gruppen | Schaltflächeneinstellungen | Die Schaltfläche erhält einen Rahmen mit dieser Farbe, wenn sich der Spieler mit dem ausgewählten Spieler in einer Gruppe befindet. |
| Rahmenfarbe - In anderer Gruppe | Buttoneinstellungen | Der Button bekommt einen Rahmen mit dieser Farbe, wenn sich der Spieler in einer anderen Gruppe befindet. |
| Rahmenradius | Schaltflächeneinstellungen | Für abgerundete Rahmenecken kann hier ein Radius in Pixeln eingegeben werden. |
| Hintergrundfarbe | Schaltflächeneinstellungen | Hintergrundfarbe für Text. |

### Spielzeitleiste
![Spielzeitleiste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/playtime.png)

Der Spielzeitbalken zeigt optisch den Fortschritt des aktuell gespielten Songs an, sofern eine Gesamtlaufzeit (Dauer) vom Server bereitgestellt wird. Dies ist bei Online-Streams in der Regel nicht der Fall. Die Breite des Balkens entspricht 100 % der Spieldauer des Songs. Durch Klicken auf einen Punkt im Balken können Sie zur gewünschten Stelle im Song springen. Zur Vorbereitung müssen Sie den Button mit dem Player-Widget verbinden.

#### Attribute für die Spielzeitleiste
| Gruppe | Attribut | Beschreibung |
| -------------- | ------------- | --------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Hauptfarbe der Leiste | Gruppe „Allgemein“ | Die Hintergrundfarbe der Leiste für noch nicht gespielte Zeiten. |
| Spielzeitfarbe | Gruppe „Allgemein“ | Die Farbe des Balkens für die Spielzeiten. |
| Rahmenbreite | Gruppe „Allgemein“ | Rahmenbreite/Randbreite in Pixeln um die Schaltfläche herum. |
| Rahmendarstellung | Gruppe Allgemein | Art der Rahmendarstellung, zB durchgezogen, gestrichelt. |
| Rahmenfarbe | Gruppe „Allgemein“ | Farbe des Rahmens um die Leiste. |
| Randradius | Gruppe Allgemein | Für abgerundete Kantenecken kann hier ein Radius in Pixeln eingegeben werden. |

### String/Zeichenfolge
![Zeichenfolge](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/string.png)

Anzeige playerspezifischer Zeichenfolgen. Zur Vorbereitung müssen Sie den Button mit dem Player-Widget verbinden.

#### Attribute für String
| Gruppe | Attribut | Beschreibung |
| ---------------- | ------------- | ----------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Spielerattribut | Gruppe „Allgemein“ | Auswahlliste aller verfügbaren Attribute eines Spielers. |
| Testtext | Gruppe Allgemein | Text, der zu Testzwecken im Editor angezeigt werden soll. |

### Nummer
![Nummer](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/number.png)

Anzeige von Zahlen mit zusätzlichen Formatierungsoptionen. Zur Vorbereitung müssen Sie den Button mit dem Player-Widget verbinden.

#### Attribute für Nummer
| Gruppe | Attribut | Beschreibung |
| --------------------- | ----------------- | ----------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Spielerattribut | Gruppe „Allgemein“ | Auswahlliste aller verfügbaren Attribute eines Spielers. |
| HTML voranstellen | Gruppe „Allgemein“ | Text oder HTML-Code, der vor die Zahl gesetzt wird. |
| HTML anhängen | Gruppe „Allgemein“ | Text oder HTML-Code, der an die Nummer angehängt wird. |
| Testtext | Gruppe Allgemein | Text, der zu Testzwecken im Editor angezeigt werden soll. |
| Zeichen nach dem Komma | Erweiterte Einstellungen | Anzahl der Dezimalstellen. |
| Komma als Trennzeichen | Erweiterte Einstellungen | Die Nachkommastellen werden durch ein Komma getrennt. |
| Tausendertrennzeichen | Erweiterte Einstellungen | Bei großen Zahlen wird alle 3 Stellen ein Trennzeichen eingefügt. |

### Wiedergabeliste
![Wiedergabeliste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/playlist.png)

Zeigt die Playlist vom Server an. Klickt man auf einen Eintrag, wird die Playlist geladen und der Player gestartet.
Das Fenster wird nicht automatisch aktualisiert, man muss lediglich auf die Schaltfläche „Aktualisieren“ klicken.

#### Attribute für Playlist
| Gruppe | Attribut | Beschreibung |
| ------------- | ------------- | ------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |

Das Widget selbst weist nur sehr wenige Formatierungen auf.
Für die Selbstformatierung stehen einige vordefinierte CSS-Klassen zur Verfügung:

| CSS-Klasse | Beschreibung |
| ----------- | ----------------------------------------- |
| plcontainer | Dem ul-Tag zugewiesener Klassenname |
| plentry | Dem Li-Tag zugewiesener Klassenname |
| plrefresh | Dem Tag „refresh-li“ zugewiesener Klassenname |
| pltext | Dem Playlist-Namen zugewiesener Klassenname |

Als Beispiel kann folgendes CSS für den Reiter vis-css dienen:

Dunkelmodus

```css
.plentry {
    border: 1px #505050 groove;
    margin: 1px 0px;
    padding: 5px;
    background-color: #202020;
}
.plrefresh {
    padding: 5px;
}
.plentry:hover {
    background-color: #404040;
}
.plrefresh svg {
    color: #cccccc;
}
.plrefresh svg:hover {
    color: #ffffff;
    filter: drop-shadow(0px 0px 1px #87ceeb);
}
```

Lichtmodus

```css
.plentry {
    border: 1px #b0b0b0 groove;
    margin: 1px 0px;
    padding: 5px;
    background-color: #c0c0c0;
}
.plrefresh {
    padding: 5px;
}
.plentry:hover {
    background-color: #e0e0e0;
}
.plrefresh svg {
    color: #444444;
}
.plrefresh svg:hover {
    color: #000000;
    filter: drop-shadow(0px 0px 1px #87ceeb);
}
```

### Browser
![Browser](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/browser.png)

Zeigt Musik, Alben, Interpreten, Radiosender, Apps usw. vom Server an.
Klicken Sie auf ein Element, um tiefer in die Hierarchie zu navigieren. Die verfügbaren Befehle werden mit zusätzlichen Schaltflächen angezeigt.
Sie gelangen eine Ebene höher, indem Sie auf den oben angezeigten Pfad klicken.

#### Attribute für Browser
| Gruppe | Attribut | Beschreibung |
| --------------------- | ------------- | ------------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| debug | Allgemeine Gruppe | Aktivieren Sie zusätzliches Debuggen (Funktionsreferenz) in der Browserkonsole. |
| debugwithfetchresults | Allgemeine Gruppe | Aktivieren Sie zusätzliches Debuggen (Objektreferenz) in der Browserkonsole. |

Das Widget selbst verfügt über eine gewisse Formatierung.
Für die Selbstformatierung stehen vordefinierte CSS-Klassen zur Verfügung:

| CSS-Klasse | Beschreibung |
| ------------------------------------------ | ------------------------------------- |
| sqbrowser-list-container | Container für das Widget |
| sqbrowser-parent-directory | Element zum Anzeigen des übergeordneten Verzeichnisses |
| sqbrowser-btn-svg | Klasse für alle SVG-Schaltflächen |
| sqbrowser-btn-svg-menu | Klasse für SVG-Menüs |
| sqbrowser-scrollable-area | Klasse für Scroll-Container |
| sqbrowser-list-item | Klasse für einzelnes Element |
| sqbrowser-list-item-content | Klasse für Artikeltitel |
| sqbrowser-button-group | Klasse für Schaltflächengruppe in einem Listenelement |
| sqbrowser-btn-svg sqbrowser-btn-svg-action | Klasse für Aktionsschaltfläche |

**Hinweis zum Alpha-Status dieses Widgets:**

- Die Implementierung von LMS/Lyrion zum Browsen ist die Hölle.
- Das technische Vorbild für dieses Widget ist das Theme-Plugin „Material“

im LMS/Lyrion-Server.

- Derzeit sind nicht alle Funktionen implementiert.
- Es sind noch nicht alle Eingabefeldtypen verfügbar.
- Möglicherweise wurden nicht alle Artikeltypen implementiert.
- Optional wurden umfangreiche Debug-Ausgaben zur Analyse hinzugefügt (siehe auch Attribute).
- Ausgabe der Funktionsreferenz: Alle Funktionsnamen werden ausgegeben in

Bestellung in der Browserkonsole.

- Ausgabe der Datenreferenz: Alle angeforderten und zurückgegebenen Daten

vom Server ausgegeben.

Sollten Tester auf Fehler/Probleme oder fehlende Implementierungen stoßen, geben Sie bitte eine möglichst detaillierte Beschreibung an:

- Woher kommen die Daten im LMS/Lyrion

(bereits integrierter Dienst/zusätzlich installiertes Plugin)

- Welche Schritte/Klicks wurden ausgeführt, um das Problem zu verursachen
- Was sind Funktionsreferenzen und Datenreferenzen?

## SendTo-Befehle
### CmdGeneral
Mit diesem Befehl können Sie einen beliebigen Befehl an den LMS-Server senden, um eine Antwort zu erhalten.

Beispiel:

**Alle Wiedergabelisten:**

```js
async function main() {
    let data = await sendToAsync('squeezeboxrpc.0', 'cmdGeneral', {
        playerid: '',
        cmdArray: ['playlists', '0', '999', 'tags:us'],
    });
    console.log(JSON.stringify(data));
}
main();
```

**Alle Favoriten:**

Dieser Befehl wird intern vom Adapter verwendet, um die Favoriten zu laden.

```js
async function main() {
    let data = await sendToAsync('squeezeboxrpc.0', 'cmdGeneral', {
        playerid: '',
        cmdArray: ['favorites', 'items', '0', '999', 'want_url:1', 'item_id:'],
    });
    console.log(JSON.stringify(data));
}
main();
```

Weitere Optionen und detaillierte Beschreibungen der Parameter finden Sie in der folgenden CLI-Dokumentation:

[CLI-Dokumentation](#further-api-documentation)

## Aufgaben
- mehr Tests/Reparaturen
- Abhängigkeiten zu anderen Paketen reduzieren (Squeezenode)
- mehr Konfigurationsmöglichkeiten zum optionalen Ein- und Ausschalten von Funktionen zur Verbesserung von Speicher und Leistung
- Playlist-Widget hinzufügen
- Browse-Widget zum Browsen im LMS-Menü hinzufügen
- Spielergesteuertes Kreisknopf-Widget hinzufügen
- Die Wiedergabe wird gestoppt, wenn die Favoritentaste erneut gedrückt wird.
- cmdGeneral für Server.
- ~~Telnet-Kommunikation hinzufügen, um Push-Ereignisse vom Server zu erhalten\

Optimieren Sie die Umfrage ~~

- ~~Implementieren Sie einen Befehlsstatus, um benutzerindividuelle Befehle zu platzieren (über JSON)\

für Server und Spieler~~

- ~~mehr Steuerungsfunktionen implementieren (Playlist-Position zum Abspielen auswählen, vorspulen, vorspulen, \

zu einer Zeitposition im Lied springen, Lied wiederholen, Lied zufällig abspielen)~~

- ~~Fügen Sie die Wiedergabeliste als JSON-Array zu den Spielerdaten hinzu~~
- ~~Grafiken (Senderlogo/Playlist-Cover) für Favoriten hinzufügen~~
- ~~mehr Ebenen (Unterverzeichnisse) von Favoriten implementieren~~
- ~~Logitech-Medienserver automatisch erkennen~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**

-->
### **WORK IN PROGRESS**

- revert to node 18

### 1.6.2 (2025-05-05)

- fix node version in github workflow

### 1.6.1 (2025-05-05)

- Fix eslint

### 1.6.0 (2025-05-05)

- upgrade dependency js-controller
- new widget, but only alpha version for testing and improvement
- fix issues of adapter checker

### 1.5.2 (2024-12-16)

- fix spelling of iobroker upload squeezeboxrpc in readme
- fix playtime bar

### 1.5.1 (2024-11-29)

- improve documentation
- remove margin from plcontainer
- improve textoverflow with ellipsis
- adjust initial widgetsize of playlist widget
- repair attributes for playlist widget
- add light mode css for playlist widget

### 1.5.0 (2024-11-28)

- Switch to iobroker/eslint
- New widget playlist

### 1.4.0 (2024-11-27)

- fix some missing objects errors
- sanitize more playernames in syncgroups
- add sendTo Command "cmdGeneral"
- sanitize more the playername
- improve translation
- if trackartist is avail then write to artist if empty
- improve handling for artwork_url
- move widget documentation from html to markdown
- adjust responsive tab style
- improve attribute widgets
- change TPE2 handling once more
- jsonConfig add sizing options for differenz screen sizes
- test implementation of TPE2 handling. switch in settings
- add datapoints album_artist, track_artist, artistOriginal

### 1.3.17 (2024-10-23)

- add edit button to the vie index field of favorites widget

### 1.3.16 (2024-10-23)

- fixed icons of the favorites widget

### 1.3.15 (2024-08-09)

- due to a adapter checker issue i have to remove the release 1.3.13 from npm.
  but changes from 1.3.13 are included in 1.3.14

### 1.3.14 (2024-08-05)

- fix formatting

### 1.3.13 (2024-08-05)

- revert the fix for artist handling due to negative effect of spotify

### 1.3.12 (2024-08-05)

- improve cmdGoto handling by kairauer, close PR #74
- fix issues from adapter checker
- integrate squeezenode lib

### 1.3.11 (2024-08-05)

- update adapter structure and switch to jsonconfig

### 1.3.10

- getalbumartist as artist if setting of TPE2/TPE3 in `LMS` are changed"

### 1.3.9

- fix error with deleting favorites
- fix wrong type for datapoint

### 1.3.8

- fix forward button widget

### 1.3.7

- fix object creation of states in player modul

### 1.3.6

- fix object creation of states

### 1.3.5

- fix object creation for favorites

### 1.3.4

- fix object creation for favorites / \* center widgets in sidebar

### 1.3.3

- repair imageproxy for image datapoints of favorites

### 1.3.2

- fix for Alarm contains only enabled Alarms

### 1.3.1

- fix problem with git dependency url

### 1.3.0

- fix problem wit setting own icon in player widget / \* add infos about\
   alarms to a player datapoint

### 1.2.1

- fix small issue in last version

### 1.2.0

- improve handling of imageproxy artwork

### 1.1.0

- make request of favorites configurable

### 1.0.1

- change setstate/createobject logic
- fix role and type for Mode-state
- update tests
- update dependency versions
- improve io-package.json

### 1.0.0

- prepare for stable repository

### 0.8.32

- the adapter function iobroker.deleteChannel didnt works as expected.\
   It didnt delete the whole subtree of states. now i implement my own delete function

### 0.8.31

- change behaviour of deleting favorites

### 0.8.30

- change from the issue of the adapter checker

### 0.8.29

- optimize handling of player state power and connected

### 0.8.28

- add advanced signaling function with telnet and fix some more authorization\
   issues with `LMS`

### 0.8.27

- initialization for the new calctype property if empty in volumebar

### 0.8.26

- more improvement and fixing at volumebar / remove playlist widget from\
   master. not ready yet

### 0.8.25

- fixing css-settings on volumebar

### 0.8.24

- volumebar didnt get events between the segments, change clickevent and calculation

### 0.8.23

- adjust dependencies to remove vulnerabilities in dependend packages.\
   also remove travis due of unresolvable build-failures for win+node10/12

### 0.8.22

- due to iobroker.controller 2.0 a command in the api changed (socket to vis.conn.\_socket)

### 0.8.21

- add command für playing urls

### 0.8.20

- remove node v6 test setting

### 0.8.19

- shorten news history

### 0.8.18 (2019-06-27)

- last minute changes.

### 0.8.17 (2019-06-26)

- add more widges: playtime bar, string, number, datetime, image.\
   add button margin to player and favorite widget, improve editing of viewindex.\
   do some refactoring.

### 0.8.16 (2019-06-24)

- resolve a cross browser issue for firefox. the style.\
   font attribute is empty and you have to construct the font string by yourself

### 0.8.15 (2019-06-19)

- minor issue with not ready states

### 0.8.14 (2019-06-19)

- add syncgroups as new server-datapoint,add syncgroup widget,/
  change some jquery event logic

### 0.8.13 (2019-06-16)

- rename widgetset from squeezeboxrpcwidgets to squeezeboxrpc

### 0.8.12 (2019-06-16)

- sync version with npm

### 0.8.11 (2019-06-15)

- try to integrate the widgets into the main adapter

### 0.8.10 (2019-05-15)

- another try to fix the EADDRINUSE error of the server discovery

### 0.8.9 (2019-05-15)

- try to fix the EADDRINUSE error of the server discovery

### 0.8.8 (2019-05-14)

- make discover configurable

### 0.8.7 (2019-05-11)

- more control features (select playlist pos to play,ffwd,frew,jump to/
  a time position in song,repeat song,random song)

### 0.8.6 (2019-05-10)

- move some configuration options into seperate tabs

### 0.8.5 (2019-05-08)

- change serverdiscovery interval method, remove some double cmd lines,/
  additional minor changes advised from eslint

### 0.8.4

- move some files to lib directory

### 0.8.3

- close port for discovery on unload

### 0.8.2

- sync version with npm

### 0.8.1

- set compact mode flag

### 0.8.0

- implementation of compact mode, change version to represent a realistic/
  feature completness

### 0.0.9

- debug options are now configurable

### 0.0.8

- More playlist attributes + remove trailing and leading spaces from source

### 0.0.7

- Add the playlist to each player as json

### 0.0.6

- More config options

### 0.0.5

- All levels/subdirectories of favorites are now available in iobroker

### 0.0.4

- added the cmdPlayFavorite for each player

### 0.0.3

- repair the no-data symbols for buttons in vis

### 0.0.2

- added autodiscovery

### 0.0.1

- initial release

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

Copyright (c) 2019-2025 oweitman