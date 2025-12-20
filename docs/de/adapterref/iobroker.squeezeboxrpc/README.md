---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.squeezeboxrpc/README.md
title: ioBroker Logitech/Lyrion Squeezebox Adapter über JSON/RPC-Protokoll
hash: O2jezqaszJ9T2f0UI86YdPQf8yiJ7hE+AbUKP3pTifc=
---
![Logo](../../../en/adapterref/iobroker.squeezeboxrpc/admin/squeezeboxrpc.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)
![Anzahl der Installationen](https://iobroker.live/badges/squeezeboxrpc-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/squeezeboxrpc-stable.svg)
![NPM](https://nodei.co/npm/iobroker.squeezeboxrpc.png?downloads=true)

# IoBroker Logitech/Lyrion Squeezebox Adapter über JSON/RPC-Protokoll
**Tests:** ![Test und Freigabe](https://github.com/oweitman/ioBroker.squeezeboxrpc/workflows/Test%20and%20Release/badge.svg)

Dies ist ein alternativer Adapter, der das `JSON/RPC`-Protokoll verwendet, um Daten zu empfangen und Befehle an den Logitech Media Server/Lyrion Media Server ([LMS](https://de.wikipedia.org/wiki/Lyrion_Music_Server)) zu senden, um angeschlossene Geräte wie z. B. zu steuern.

- native [Squeezebox](https://de.wikipedia.org/wiki/Squeezebox),
- Raspberry Pi mit zusätzlichem Audiomodul und kleiner Linux-basierter Firmware

wie [picoreplayer](https://picoreplayer.org/) oder [max2play](https://www.max2play.com).

- WiiM Multiroom-Audio ([kann mit einem LMS/Lyrion-Server kommunizieren](https://faq.wiimhome.com/en/support/solutions/articles/72000610226-how-to-stream-music-from-lms-to-your-wiim-device-with-squeezelite))
- mit Chromecast-, AirPlay- oder UPnP/DLNA-Plugins

Der `LMS`-Server kann sehr große Musiksammlungen auf Festplatten oder `NAS` verwalten/bereitstellen und Verbindungen zu verschiedenen Streaming-Anbietern wie `Spotify`, `Deezer`, `Soundcloud`, `shoutcast`, `tunein`, `napster`, `pandora`, `tidal` und weiteren herstellen.

## Merkmale
- Die meisten Daten (Daten)(#server), die der `LMS`-Dienst bereitstellt, sind im Adapter verfügbar.
- detaillierte [Informationen](#Player) über den Spielerstatus, den Songtitel, den Interpreten,

Album, Cover, Playlist

- [viele Steuerungsfunktionen](#provided-states) zum Abspielen, Pausieren, Stoppen, Vorspulen,\

Zurückspulen, Wiederholen, Zufallswiedergabe, Favoriten abspielen, zu einer bestimmten Zeit springen (absolut und relativ), zu einem bestimmten Wiedergabelistenindex springen (absolut und relativ), Ein-/Ausschalter und Voreinstellungen

- alle [Favoriten](#Favoriten) und alle Unterebenen vom Server
- viele [Widgets](#widgets) für die iobroker-vis-Komponente sind enthalten

Eigene Steuerungsschnittstellen erstellen (Player auswählen, Favoriten auswählen, Synchronisierungsgruppen verwalten, Schaltflächen für Wiedergabe/Pause, Vorwärts, Rückwärts, Wiederholungsmodus und Zufallswiedergabemodus auswählen)

## Installation
- Installieren Sie das Paket
- Erstellen Sie eine Instanz
- Konfigurieren Sie die Instanz mit der IP-Adresse des Logitech/Lyrion-Medienservers.

und der Port (normalerweise 9000)

- Instanz starten/neu starten

## Aktualisieren
- Nach der Installation oder Aktualisierung kann es manchmal notwendig sein\

Führen Sie den folgenden Befehl aus, falls in vis-1 Probleme aufgetreten sind.

`iobroker upload squeezeboxrpc`

## Fehlerbehebung
### SLIMP3-Spieler
Es wurde berichtet, dass ältere SLIMP3-Player möglicherweise keine Verbindung zum Server herstellen können, während der Adapter nach neuen Servern sucht. Durch Deaktivieren der Suche unter „Instanzkonfiguration → Leistungseinstellungen → Suche nach anderen LMS-Servern“ sollte die Verbindung des Players wiederhergestellt werden.

## Bereitgestellte Zustände
### Server
| Bundesland | Beschreibung |
| ------------------ | ----------------------------- |
| `LastScan` | Zeitstempel des letzten Musikscans |
| `PlayerCountOther` | Anzahl bekannter anderer Spieler |
| `PlayerCountSN` | Anzahl bekannter SN-Spieler |
| `TotalAlbums` | Anzahl aller bekannten Alben |
| `TotalArtists` | Anzahl aller bekannten Künstler |
| `TotalDuration` | Gesamtspielzeit aller Lieder |
| `TotalGenres` | Anzahl aller bekannten Genres |
| `TotalSongs` | Anzahl aller bekannten Lieder |
| `SyncGroups` | Vorhandene Synchronisierungsgruppen |
| `Version` | Version von `LMS` |
| `mac` | MAC-Adresse des Servers |
| `uuid` | UUID der `LMS`-Instanz |
| `uuid` | UUID der `LMS`-Instanz |

zusätzlich eine definierte Schaltfläche zum Aktualisieren der Favoriten

| Schaltfläche | Beschreibung |
| -------------- | --------------------------------- |
| `getFavorites` | Alle Favoriten vom Server anfordern |

### Favoriten
Für jeden Favoriten sind alle Attribute schreibgeschützt.

| Bundesland | Beschreibung |
| ---------- | ------------------------------------------ |
| `Name` | Name des Favoriten |
| `id` | ID des Favoriten |
| `image` | Bild/Symbol für Favorit, falls verfügbar |
| `isaudio` | isaudio |
| `type` | Beispieltypen: Link, Text, Audio, Playlist |
| `url` | URL des Titels |
| `url` | URL des Titels |

Alle Unterebenen (Unterverzeichnisse) von Favoriten sind verfügbar.

### Spieler
Für jeden Spieler zeigt der Modus an, ob der Wert geändert werden kann. Die durchgeführte Aktion wird im Attribut beschrieben.

| Zustand | Modus | Beschreibung |
| ---------------------- | ---- | -------------------------------------------------------------------------------------------------------------------- |
| `Alarms` | R/- | Alle registrierten Alarme für diesen Spieler als JSON |
| `Artist` | R/- | Name des Künstlers |
| `ArtworkUrl` | R/- | URL zum Kunstwerk |
| `Bitrate` | R/- | Bitrate des Tracks |
| `Connected` | R/- | Verbindungsstatus des Spielers (0/1) |
| `Duration` | R/- | Dauer des Titels |
| `Genre` | R/- | Genre des Titels |
| `IP` | R/- | IP des Spielers |
| `Mode` | R/- | Wiedergabe / Pause / Stopp |
| `Playername` | R/- | Name des Spielers |
| `PlayerID` | R/- | Spieler-ID |
| `Playlist` | R/- | Die eigentliche Playlist als JSON |
| `PlaylistCurrentIndex` | R/W | Gehen Sie zu einer absoluten Position, indem Sie den Trackindex angeben, oder zu einer relativen Position mit einem + oder - am Anfang. Beispiel: 10,-3,+2 |
| `PlaylistRepeat` | R/W | Lied wiederholen(1)/Playlist(2)/Nicht wiederholen(0) |
| `PlaylistShuffle` | R/W | Playlist zufällig wiedergeben(1)/Album zufällig wiedergeben(2)/Nicht zufällig wiedergeben(0) |
| `Power` | R/W | Energiestatus des Spielers abrufen/setzen: aus (0)/ein (1) |
| `RadioName` | R/- | Name des Radiosenders |
| `Rate` | R/- | Bewertung des Liedes |
| `Remote` | R/- | Falls Remote-Stream (1) |
| `SyncMaster` | R/- | ID/MAC von Syncmaster |
| `SyncSlaves` | R/- | ID/MAC der Spieler in der Syncgroup |
| `Time` | R/- | verstrichene Songzeit |
| `Title` | R/- | Songtitel |
| `Type` | R/- | Medientyp (z. B. MP3 Radio) |
| `Url` | R/- | URL des Titels/Streams |
| `Volume` | R/W | Lautstärke des Players abrufen/einstellen (0-100) |
| `state` | R/W | Wiedergabestatus abrufen/setzen: Pause(0),Wiedergabe(1),Stopp(2) |
| `state` | R/W | Wiedergabestatus abrufen/setzen: Pause(0), Wiedergabe(1), Stopp(2) |

Die Wiedergabeliste stellt die folgenden Attribute bereit, sofern diese in `LMS` verfügbar sind.

Einige Attribute hängen vom Musiktyp ab (Stream/Datei/...). Alle Attribute sind schreibgeschützt.

| Attribut | Beschreibung |
| ------------ | --------------------------------- |
| `Album` | Name des aktuellen Albums |
| `ArtworkUrl` | URL zum Kunstwerk |
| `Bitrate` | Bitrate des Tracks |
| `Duration` | Dauer des Titels |
| `RadioName` | Name des Radiosenders |
| `Rate` | Bewertung des Liedes |
| `title` | Songtitel |
| `Type` | Medientyp (z. B. MP3-Radio) |
| `url` | URL des Titels/Streams |
| `index` | Index des Liedes in der Playlist |
| `id` | ID des Liedes |
| `id` | ID des Liedes |

zusätzlich definierte Schaltflächen:

| Schaltfläche | Beschreibung |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `btnForward` | Nächstes Lied |
| `btnPreset\_\*` | 1-6 Schaltflächen zur Belegung im Spieler oder Server |
| `cmdGeneral` | Ein allgemeines Befehlsfeld zum Senden von Befehlen an den Spieler. Jedes Feld muss in Anführungszeichen eingeschlossen werden. Parameter müssen durch Kommas getrennt werden. Beispiel: "play","1" |
| `cmdPlayFavorite` | Um einen Favoriten abzuspielen, muss die ID des Favoriten festgelegt werden. |
| `cmdPlayUrl` | um eine URL abzuspielen´Beispiel "<http://50.7.77.114:8101/>;" |
| `cmdGoTime` | Springe zu einer absoluten Position, indem du eine Anzahl von Sekunden angibst, oder zu einer relativen Position, indem du ein + oder - am Anfang der Sekunden einfügst. Beispiel: 100,-50,+50 |
| `cmdGoTime` | Springe zu einer absoluten Position, indem du eine Anzahl von Sekunden angibst, oder zu einer relativen Position mit einem + oder - am Anfang der Sekunden. Beispiel: 100,-50,+50 |

#### Anmerkungen zu Datenpunkten in Abhängigkeit von der Einstellung TPE2 im LMS
Je nach Einstellung werden den Datenpunkten unterschiedliche MP3-Tags zugewiesen.
Die großgeschriebenen Namen sind die Namen der MP3-Tags.

| TPE2 in LMS einstellen | Künstler | Albumkünstler | Titelkünstler | Band |
| ------------------------------ | ----------- | ----------- | ----------- | ----------- |
| als Band | KÜNSTLER | leer | TITELKÜNSTLER | ALBUMKÜNSTLER |
| als die Interpreten des Albums | ALBUMARTIST | ALBUMARTIST | leer | leer |

Es ist außerdem zu beachten, dass nach einer Änderung im LMS die gesamte Bibliothek erneut durchsucht und indiziert werden muss und ein Lied angehalten und neu gestartet werden muss, bevor das LMS andere Daten liefert.

### Weitere API-Dokumentation
Weitere Informationen finden Sie in der CLI-Dokumentation:

<https://github.com/oweitman/LMS-CLI-Documentation/blob/master/LMS-CLI.md>

## Widgets
### Spieler-Schaltflächenleiste
![Spieler-Schaltflächenleiste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/players.png)

Alle in Ihren Logitech/Lyrion Media Server integrierten Player können über dieses Widget ausgewählt werden. Nach Auswahl einer `squeezerpc.?`-Instanz werden die verfügbaren Player im Widget angezeigt.

#### Attribute
| Gruppe | Attribut | Beschreibung |
| ----------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SqueezeboxRPC-Instanz | Gruppe „Allgemein“ | Wählen Sie eine Instanz des SqueezeboxRPC-Adapters aus. Nur diese werden hier als gültig erkannt. |
| Widget-Format | Allgemeine Gruppe | Hier kann der Widget-Typ ausgewählt werden. Der Typ „Formatbutton“ bietet den vollen Funktionsumfang und ist auch mit dem SyncGroup-Widget kompatibel. Der Typ „Formatselect“ ist ein einfaches Auswahlfeld. Als Name wird der Spielername oder ein individueller Text verwendet. |
| Anzeigeindex | Allgemeine Gruppe | Einzelne Schaltflächen können durch Löschen ihres Index ausgeblendet oder in einer anderen Reihenfolge angezeigt werden. Zum Ausblenden löschen Sie einfach die jeweilige Indexposition einschließlich des Kommas. Indexnummern werden im Bearbeitungsmodus auf der jeweiligen Schaltfläche angezeigt, sofern die Bearbeitungshilfe aktiviert ist. |
| Zeilenumbruch in CamelCase | Allgemeine Gruppe | Wenn der Spielername in CamelCase geschrieben ist, kann hier ein Zeilenumbruch aktiviert werden, damit der Spielername auf dem Button größer erscheint. |
| Hilfe zum Bearbeitungsmodus | Gruppe Allgemein | Wenn diese Hilfe aktiviert ist, werden Indexnummern auf der jeweiligen Schaltfläche angezeigt, und die Einstellung „Transparenz“ in den Schaltflächeneinstellungen hat keine Auswirkung. |
| Bildbreite | Schaltflächeneinstellungen | Bildbreite einer Schaltfläche |
| Bildhöhe | Schaltflächeneinstellungen | Bildhöhe einer Schaltfläche |
| Transparenz | Schaltflächeneinstellungen | Wenn die Schaltfläche nicht aktiviert ist, hebt sie sich vom Hintergrund ab. 0 = Unsichtbar, 1 = Vollständig sichtbar |
| Rahmenbreite | Schaltflächeneinstellungen | Rahmenbreite in Pixeln um die Schaltfläche |
| Rahmendarstellung | Schaltflächeneinstellungen | Art der Rahmendarstellung, z. B. durchgezogen, gestrichelt. |
| Normale Rahmenfarbe | Schaltflächeneinstellungen | Wenn die Schaltfläche nicht aktiviert ist, wird sie in dieser Farbe angezeigt. |
| Rahmenfarbe aktiv | Schaltflächeneinstellungen | Wenn die Schaltfläche aktiviert ist, wird sie durch diese Farbe angezeigt. |
| border-radius | Schaltflächeneinstellungen | Hier kann ein Radius in Pixeln für abgerundete Ecken eingegeben werden. |
| Hintergrundfarbe | Schaltflächeneinstellungen | Hintergrundfarbe für Text |
| Bild | Schaltfläche[x] | Hier kann ein Bild individuell definiert werden. Das Bild hat Vorrang vor dem Text. |
| Text | button[x] | Hier kann der Text individuell definiert werden. Das Bild hat Vorrang vor dem Text. |

### Favoriten-Schaltflächenleiste
![Favoriten-Schaltfläche](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/favorites.png)

Mit diesem Widget können Sie alle in Ihrem Logitech/Lyrion Media Server erstellten Favoriten auswählen.
Nachdem Sie das Player-Widget ausgewählt haben, werden die verfügbaren Favoriten im Widget angezeigt.

| Gruppe | Attribut | Beschreibung |
| ------------------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| Player-Widget | Gruppe „Allgemein“ | Wählen Sie das Player-Widget aus. |
| Anzeigeindex | Allgemeine Gruppe | Einzelne Schaltflächen können mithilfe des Index ausgeblendet oder in einer anderen Reihenfolge angezeigt werden. |
| Hilfe zum Bearbeitungsmodus | Gruppe „Allgemein“ | Wenn diese Hilfe aktiviert ist, werden auf den jeweiligen Schaltflächen Indexnummern angezeigt. |
| Bildbreite | Schaltflächeneinstellungen | Bildbreite einer Schaltfläche |
| Bildhöhe | Schaltflächeneinstellungen | Bildhöhe einer Schaltfläche |
| Transparenz | Schaltflächeneinstellungen | Wenn die Schaltfläche nicht aktiviert ist, hebt sie sich vom Hintergrund ab. 0 = Unsichtbar, 1 = Vollständig sichtbar |
| Rahmenbreite | Schaltflächeneinstellungen | Rahmenbreite in Pixeln um die Schaltfläche |
| Rahmendarstellung | Schaltflächeneinstellungen | Art der Rahmendarstellung, z. B. durchgezogen, gestrichelt. |
| Normale Rahmenfarbe | Schaltflächeneinstellungen | Wenn die Schaltfläche nicht aktiviert ist, wird sie in dieser Farbe angezeigt. |
| Rahmenfarbe aktiv | Schaltflächeneinstellungen | Wenn die Schaltfläche aktiviert ist, wird sie in dieser Farbe angezeigt. |
| border-radius | Schaltflächeneinstellungen | Hier kann ein Radius in Pixeln für abgerundete Ecken eingegeben werden. |
| Hintergrundfarbe | Schaltflächeneinstellungen | Hintergrundfarbe für Text |
| Bild | Schaltfläche[x] | Hier kann ein Bild individuell definiert werden. Das Bild hat Vorrang vor dem Text. |
| Text | button[x] | Hier kann der Text individuell definiert werden. Das Bild hat Vorrang vor dem Text. |

### Wiedergabetaste
![Wiedergabetaste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/play.png)

Die Wiedergabetaste startet oder stoppt die Musikwiedergabe auf dem ausgewählten Player. Zur Vorbereitung müssen Sie die Taste mit dem Player-Widget verbinden. Die Taste verfügt über eine eigene Grafik (SVG); alternativ können Sie auch Ihre eigene Grafik auswählen.

#### Attribute für die Wiedergabetaste
| Gruppe | Attribut | Beschreibung |
| ------------- | ------------------ | ------------------------------- |
| Player-Widget | Gruppe „Allgemein“ | Auswahl des Player-Widgets. |
| Pausenbild | Allgemeine Gruppe | Bild zum Anhalten |
| Abspielbild | Allgemeine Gruppe | Abspielbild |
| Stoppbild | Allgemeine Gruppe | Stoppbild |
| Füllfarbe | SVG-Einstellungen | Füllfarbe der Schaltfläche |
| Strichfarbe | SVG-Einstellungen | Farbe für den Rahmen |
| Strichstärke | SVG-Einstellungen | Breite des Rahmens in Pixeln |

### Nach vorne
![Nach vorne](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/fwd.png)

Mit dem Vorwärts-Widget können Sie im aktuellen Titel vorwärts springen. Die Schaltfläche kann so konfiguriert werden, dass sie um eine bestimmte Zeitspanne vorwärts springt, sofern der Player diese Funktion unterstützt.

#### Attribute für die Weiter-Schaltfläche
| Gruppe | Attribut | Beschreibung |
| ------------- | ------------- | ---------------------------------------------------------------- |
| Player-Widget | Gruppe „Allgemein“ | Auswahl des Player-Widgets. |
| Schrittweite | Allgemeine Gruppe | Gibt die Zeit in Sekunden an, um die vorwärts gesprungen werden soll. |
| Schaltflächenbeschriftung | Allgemeine Gruppe | Anpassbare Beschriftung für die Schaltfläche. |
| Schaltflächensymbol | Gruppe „Allgemein“ | Auswahl eines Symbols für die Schaltfläche, z. B. zum Weiterspringen. |

### Zurückspulen
![Zurückspulen](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/rew.png)

Mit dem Zurückspulen-Widget können Sie zum aktuellen Titel zurückspringen. Ähnlich wie beim Vorspulen-Widget kann ein Zeitraum festgelegt werden.

#### Attribute für die Zurückspulen-Schaltfläche
| Gruppe | Attribut | Beschreibung |
| ------------- | ------------- | ------------------------------------------------------------- |
| Player-Widget | Gruppe „Allgemein“ | Auswahl des Player-Widgets. |
| Schrittweite | Allgemeine Gruppe | Gibt den Zeitraum in Sekunden an, um den zurückgesprungen werden soll. |
| Schaltflächenbeschriftung | Allgemeine Gruppe | Anpassbare Beschriftung für die Schaltfläche. |
| Schaltflächensymbol | Allgemeine Gruppe | Auswahl eines Symbols für die Schaltfläche, z. B. zum Zurückspringen. |

### Wiederholen
![Wiederholen](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/repeat0.svg)

Mit dem Repeat-Widget können Sie die Wiederholungsfunktion für den aktuellen Titel oder die aktuelle Wiedergabeliste aktivieren oder deaktivieren, sofern diese Funktion vom Player unterstützt wird.

#### Attribute für die Schaltfläche "Wiederholen"
| Gruppe | Attribut | Beschreibung |
| ------------- | ------------- | ------------------------------------------------------------------------------------------- |
| Player-Widget | Gruppe „Allgemein“ | Auswahl des Player-Widgets. |
| Schaltflächenbeschriftung | Allgemeine Gruppe | Anpassbare Beschriftung für die Schaltfläche. |
| Schaltflächensymbol | Allgemeine Gruppe | Auswahl eines Symbols für die Schaltfläche, z. B. für Wiederholen. |
| Wiederholungsmodus | Allgemeine Gruppe | Der Modus kann hier ausgewählt werden, z. B. Einzelwiederholung (Titel) oder Listenwiederholung (Playlist). |

### Mischen
![Shuffle](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/shuffle0.svg)

Das Shuffle-Widget aktiviert oder deaktiviert die Zufallswiedergabe für die aktuelle Playlist, sofern diese Funktion vom Player unterstützt wird.

#### Attribute für die Shuffle-Schaltfläche
| Gruppe | Attribut | Beschreibung |
| ------------- | ------------- | ------------------------------------------------------- |
| Player-Widget | Gruppe „Allgemein“ | Auswahl des Player-Widgets. |
| Schaltflächenbeschriftung | Allgemeine Gruppe | Anpassbare Beschriftung für die Schaltfläche. |
| Schaltflächensymbol | Allgemeine Gruppe | Auswahl eines Symbols für die Schaltfläche, z. B. für Zufallswiedergabe. |
| Aktivierter Status | Allgemeine Gruppe | Farbe oder Stil der Schaltfläche, wenn die Zufallswiedergabe aktiviert ist. |

### Lautstärke
![Volumen](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/volume.png)

Das Lautstärke-Widget zeigt den aktuellen Lautstärkepegel des Players an und ermöglicht die Anpassung der Lautstärke.

#### Attribute für die Lautstärketaste
| Gruppe | Attribut | Beschreibung |
| --------------------------- | ------------- | ----------------------------------------------------------------- |
| Player-Widget | Gruppe „Allgemein“ | Auswahl des Player-Widgets. |
| Lautstärke-Schrittweite | Allgemeine Gruppe | Legt die Schrittweite zum Erhöhen oder Verringern der Lautstärke fest. |
| Maximale Lautstärke | Allgemeine Gruppe | Legt den Maximalwert für die Lautstärke fest, z. B. 100. |
| Hauptfarbe des Lautstärkebalkens | Allgemeine Gruppe | Farbe für den Bereich des Balkens, der die aktuelle Lautstärke darstellt. |
| Hintergrundfarbe der Lautstärkeanzeige | Gruppe „Allgemein“ | Farbe für den Bereich der Anzeige, der nicht von der Lautstärke abgedeckt wird. |
| Schaltflächensymbol | Gruppe „Allgemein“ | Auswahl eines Symbols für die Lautstärkeregelung. |

### SyncGroup-Schaltflächenleiste
![SyncGroup-Schaltflächenleiste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/syncgroups.png)

Dieses Widget kann zusammen mit dem Player-Widget verwendet werden, um die Synchronisierung der Player untereinander zu steuern.
Die meisten Einstellungen für die Anzahl der Schaltflächen, Beschriftungen oder Bilder werden vom Player-Widget übernommen.
Zur Vorbereitung müssen Sie die Schaltfläche mit dem Player-Widget verbinden.
Nachdem Sie einen Player im Player-Widget ausgewählt haben, wird die aktuelle Synchronisierung im SyncGroup-Widget angezeigt.
Der Synchronisierungsstatus wird mithilfe verschiedener anpassbarer Farben dargestellt.
Der im Player-Widget ausgewählte Player kann nicht im SyncGroup-Widget ausgewählt werden.
Wenn im SyncGroup-Widget ein Player ausgewählt wird, der sich bereits in einer anderen Gruppe befindet, wird er automatisch aus dieser Gruppe entfernt.

#### Attribute für die Schaltfläche „SyncGroup“
| Gruppe | Attribut | Beschreibung |
| ----------------------------- | --------------- | ---------------------------------------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Rahmenbreite | Schaltflächeneinstellungen | Rahmenbreite/Rahmenbreite in Pixeln um die Schaltfläche herum. |
| Rahmendarstellung | Schaltflächeneinstellungen | Art der Rahmendarstellung, z. B. durchgezogen, gestrichelt. |
| Rahmenfarbe – Nicht in einer Gruppe | Schaltflächeneinstellungen | Die Schaltfläche erhält einen Rahmen in dieser Farbe, wenn sich der Spieler nicht in einer Gruppe befindet. |
| Rahmenfarbe - In Gruppe | Schaltflächeneinstellungen | Die Schaltfläche erhält einen Rahmen in dieser Farbe, wenn sich der Spieler in einer Gruppe mit dem ausgewählten Spieler befindet. |
| Rahmenfarbe – In anderer Gruppe | Schaltflächeneinstellungen | Die Schaltfläche erhält einen Rahmen in dieser Farbe, wenn sich der Spieler in einer anderen Gruppe befindet. |
| border-radius | Schaltflächeneinstellungen | Hier kann ein Radius in Pixeln für abgerundete Ecken eingegeben werden. |
| Hintergrundfarbe | Schaltflächeneinstellungen | Hintergrundfarbe für Text. |

### Spielzeitleiste
![Spielzeitleiste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/playtime.png)

Die Wiedergabezeitleiste zeigt den Fortschritt des aktuell abgespielten Liedes an, sofern der Server die Gesamtspielzeit (Dauer) angibt. Dies ist bei Online-Streams üblicherweise nicht der Fall. Die Breite der Leiste entspricht 100 % der Wiedergabezeit des Liedes. Durch Klicken auf einen Punkt der Leiste können Sie zur gewünschten Stelle im Lied springen. Zur Vorbereitung müssen Sie die Schaltfläche mit dem Player-Widget verbinden.

#### Attribute für die Wiedergabezeitleiste
| Gruppe | Attribut | Beschreibung |
| -------------- | ------------- | --------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Hauptfarbe der Leiste | Allgemeine Gruppe | Die Hintergrundfarbe der Leiste für noch nicht gespielte Zeiten. |
| Spielzeitfarbe | Allgemeine Gruppe | Die Farbe des Balkens für die Anzahl der gespielten Spiele. |
| Rahmenbreite | Gruppe „Allgemein“ | Rahmenbreite/Rahmenbreite in Pixeln um die Schaltfläche herum. |
| Rahmendarstellung | Allgemeine Gruppe | Art der Rahmendarstellung, z. B. durchgezogen, gestrichelt. |
| Rahmenfarbe | Allgemeine Gruppe | Farbe des Rahmens um den Balken. |
| Radius der Ecken | Allgemeine Gruppe | Hier kann ein Radius in Pixeln für abgerundete Ecken eingegeben werden. |

### Zeichenkette
![Zeichenkette](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/string.png)

Anzeige spielerspezifischer Zeichenketten. Zur Vorbereitung muss die Schaltfläche mit dem Spieler-Widget verbunden werden.

#### Attribute für String
| Gruppe | Attribut | Beschreibung |
| ---------------- | ------------- | ----------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Spielerattribute | Allgemeine Gruppe | Auswahlliste aller verfügbaren Attribute eines Spielers. |
| Testtext | Allgemeine Gruppe | Text, der zu Testzwecken im Editor angezeigt werden soll. |

### Nummer
![Nummer](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/number.png)

Anzeige von Zahlen mit zusätzlichen Formatierungsoptionen. Zur Vorbereitung müssen Sie die Schaltfläche mit dem Player-Widget verbinden.

#### Attribute für Zahlen
| Gruppe | Attribut | Beschreibung |
| --------------------- | ----------------- | ----------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| Spielerattribute | Allgemeine Gruppe | Auswahlliste aller verfügbaren Attribute eines Spielers. |
| HTML voranstellen | Allgemeine Gruppe | Text oder HTML-Code, der vor der Zahl platziert wird. |
| HTML anhängen | Allgemeine Gruppe | Text oder HTML-Code, der an die Zahl angehängt wird. |
| Testtext | Allgemeine Gruppe | Text, der zu Testzwecken im Editor angezeigt werden soll. |
| Zeichen nach Komma | Erweiterte Einstellungen | Anzahl der Dezimalstellen. |
| Komma als Trennzeichen | Erweiterte Einstellungen | Ein Komma wird verwendet, um die Dezimalstellen zu trennen. |
| Tausendertrennzeichen | Erweiterte Einstellungen | Bei großen Zahlen wird alle 3 Stellen ein Trennzeichen eingefügt. |

### Playlist
![Wiedergabeliste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/playlist.png)

Die vom Server geladene Playlist wird angezeigt. Wenn Sie auf einen Eintrag klicken, wird die Playlist geladen und der Player gestartet. Das Widget aktualisiert sich nicht automatisch; Sie müssen die Aktualisierungsschaltfläche drücken.

#### Attribute für die Wiedergabeliste
| Gruppe | Attribut | Beschreibung |
| ------------- | ------------- | ------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |

Das Widget selbst ist nur sehr einfach formatiert.
Für die automatische Formatierung stehen einige vordefinierte CSS-Klassen zur Verfügung:

| CSS-Klasse | Beschreibung |
| ----------- | ----------------------------------------- |
| plcontainer | Klassenname, der dem ul-Tag zugewiesen ist |
| plentry | Klassenname, der dem li-Tag zugewiesen wurde |
| plrefresh | Klassenname, der dem refresh-li-Tag zugewiesen ist |
| pltext | Klassenname, der dem Wiedergabelistennamen zugewiesen ist |

Das folgende CSS für den vis-css-Tab kann als Beispiel dienen:

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

Hellmodus

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

Hier werden Musik, Alben, Künstler, Radiosender, Apps usw. vom Server angezeigt.

Klicken Sie auf ein Element, um tiefer in die Hierarchie zu navigieren. Die verfügbaren Befehle werden mit zusätzlichen Schaltflächen angezeigt.
Sie können eine Ebene nach oben gelangen, indem Sie auf den oben angezeigten Pfad klicken.

#### Attribute für Browser
| Gruppe | Attribut | Beschreibung |
| --------------------- | ------------- | ------------------------------------------------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |
| debug | Allgemeine Gruppe | Zusätzliches Debugging (Funktionsreferenz) in der Browserkonsole aktivieren. |
| debugwithfetchresults | Allgemeine Gruppe | Zusätzliche Debugging-Informationen (Objektreferenz) in der Browserkonsole aktivieren. |

Das Widget selbst verfügt über eine gewisse Formatierung.
Für die automatische Formatierung stehen einige vordefinierte CSS-Klassen zur Verfügung:

| CSS-Klasse | Beschreibung |
| ------------------------------------------ | ------------------------------------- |
| sqbrowser-list-container | Container für das Widget |
| sqbrowser-parent-directory | Element zur Anzeige des übergeordneten Verzeichnisses |
| sqbrowser-btn-svg | Klasse für alle SVG-Schaltflächen |
| sqbrowser-btn-svg-menu | Klasse für SVG-Menüs |
| sqbrowser-scrollable-area | Klasse für Scrollcontainer |
| sqbrowser-list-item | Klasse für einzelnes Element |
| sqbrowser-list-item-content | Klasse für den Elementtitel |
| sqbrowser-button-group | Klasse für Schaltflächengruppen in einem Listenelement |
| sqbrowser-btn-svg sqbrowser-btn-svg-action | Klasse für Aktionsschaltfläche |

**Hinweis zum Alpha-Status dieses Widgets:**

- Die Implementierung von LMS/Lyrion für das Browsen ist die Hölle.
Das technische Modell für dieses Widget ist das „Material“-Theme-Plugin.

im LMS/Lyrion-Server.

- Noch sind nicht alle Funktionen implementiert.
- Noch sind nicht alle Eingabefeldtypen verfügbar.
- Möglicherweise wurden noch nicht alle Artikeltypen implementiert.
- Optional wurde eine umfangreiche Debug-Ausgabe zur Analyse hinzugefügt (siehe auch Attribute).
- Ausgabe der Funktionsreferenz: Alle Funktionsnamen werden ausgegeben in

Bestellung in der Browserkonsole.

- Ausgabe der Datenreferenz: Alle angeforderten und zurückgegebenen Daten

vom Server ausgegeben.

Falls Tester auf Fehler/Probleme oder fehlende Implementierungen stoßen, geben Sie bitte eine möglichst detaillierte Beschreibung an:

- Woher stammen die Daten im LMS/Lyrion?

(bereits integrierter Dienst/zusätzlich installiertes Plugin)

Welche Schritte/Klicks wurden ausgeführt, um das Problem zu verursachen?
- Was sind Funktions- und Datenreferenzen?

## SendTo-Befehle
### CmdGeneral
Mit diesem Befehl können Sie beliebige Befehle an den LMS-Server senden und eine Antwort erhalten.

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

## Todo
- weitere Tests/Fehlerbehebungen
- Abhängigkeiten zu anderen Paketen reduzieren (squeezenode)
- Mehr Konfigurationsmöglichkeiten zum optionalen Ein-/Ausschalten von Funktionen zur Verbesserung von Speicher und Leistung
- Playlist-Widget hinzufügen
- Füge ein Browser-Widget hinzu, um im `LMS`-Menü zu navigieren
- Widget für spielergesteuerte Drehknöpfe hinzufügen
- Die Wiedergabe wird gestoppt, wenn die Favoritentaste erneut gedrückt wird.
- cmdGeneral für Server.
- ~~Telnet-Kommunikation hinzufügen, um Push-Ereignisse vom Server zu empfangen an\

Optimiere die Abstimmung~~

- ~~Implementierung eines Befehlsstatus zur Speicherung benutzerdefinierter Befehle (via JSON)\

für Server und Spieler~~

- ~~weitere Steuerungsfunktionen implementieren (Wiedergabelistenposition auswählen, vorspulen, zurückspulen,\

(Zu einer bestimmten Stelle im Lied springen, Lied wiederholen, zufälliges Lied)

- ~~Füge die Playlist als JSON-Array zu den Spielerdaten hinzu~~
- ~~Füge Grafiken (Senderlogo/Playlist-Cover) für Favoriten hinzu~~
- ~~weitere Ebenen (Unterverzeichnisse) von Favoriten implementieren~~
- ~~automatische Erkennung des Logitech-Medienservers~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**

-->

### **WORK IN PROGRESS**

- test remove node 18,extend to node 24

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