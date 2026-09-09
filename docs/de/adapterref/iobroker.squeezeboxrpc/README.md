---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.squeezeboxrpc/README.md
title: ioBroker Logitech/Lyrion Squeezebox Adapter über JSON/RPC-Protokoll
hash: ut0bLHsdqqE6PIJgATddxuzF+NU8uumMNXaV+tHJinc=
---
![Logo](../../../en/adapterref/iobroker.squeezeboxrpc/admin/squeezeboxrpc.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)
![Anzahl der Installationen](https://iobroker.live/badges/squeezeboxrpc-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/squeezeboxrpc-stable.svg)
![NPM](https://nodei.co/npm/iobroker.squeezeboxrpc.png?downloads=true)

# ioBroker Logitech/Lyrion Squeezebox Adapter über JSON/RPC-Protokoll

**Tests:** ![Test und Freigabe](https://github.com/oweitman/ioBroker.squeezeboxrpc/workflows/Test%20and%20Release/badge.svg)

Dies ist ein alternativer Adapter, der Folgendes verwendet: `JSON/RPC`-Protokoll zum Abrufen von Daten und Senden von Befehlen an den Logitech Media Server/Lyrion Media Server ([LMS](https://de.wikipedia.org/wiki/Lyrion_Music_Server)) zur Steuerung angeschlossener Geräte wie

- einheimisch [Squeezebox](https://de.wikipedia.org/wiki/Squeezebox),
- Raspberry Pi mit zusätzlichem Audiomodul und kleinen Linux-basierten Firmwares wie [picoreplayer](https://picoreplayer.org/) oder [max2play](https://www.max2play.com).
- WiiM Multiroom-Audio ([kann mit einem LMS/Lyrion-Server kommunizieren](https://faq.wiimhome.com/en/support/solutions/articles/72000610226-how-to-stream-music-from-lms-to-your-wiim-device-with-squeezelite))
- mit Chromecast-, AirPlay- oder Plugins `UPnP/DLNA`-Geräte

Der `LMS`-Der Server kann sehr große Musiksammlungen auf Festplatten verwalten/bereitstellen oder `NAS`, Verbindung zu verschiedenen Streaming-Anbietern herstellen wie `Spotify`, `Deezer`,
`Soundcloud`, `shoutcast`, `tunein`, `napster`, `pandora`, `tidal` und mehr

## Inhaltsverzeichnis

- [Merkmale](#features)
- [Installation](#installation)
- [Konfiguration](#configuration)
- [Aktualisieren](#update)
- [Fehlerbehebung](#trouble-shooting)
- [Bereitgestellte Staaten](#provided-states)
  - [Server](#server)
  - [Favoriten](#favorites)
  - [Spieler](#players)
- [Widgets](#widgets)
  - [VIS 1 Widget-Dokumentation](docs/vis1-widgets.md)
  - [VIS 2 Widget-Dokumentation](docs/vis2-widgets.md)
- [SendTo-Befehle](#sendto-commands)
- [Todo](#todo)
- [Änderungsprotokoll](#changelog)
- [Lizenz](#license)

## Merkmale

- die meisten [Daten](#server) dass `LMS`Der Dienst ist im Adapter verfügbar.
- detailliert [Information](#players) Informationen zum Abspielstatus, Songtitel, Interpret, Album, Cover, Wiedergabeliste
- [viele Steuerungsfunktionen](#provided-states) Wiedergabe, Pause, Stopp, Vorwärts\
  Zurückspulen, Wiederholen, Zufallswiedergabe, Favoriten auswählen, zu einer bestimmten Zeit springen\
  (absolut und relativ), zum Wiedergabelistenindex springen (absolut und relativ),\
  Ein-/Ausschalter und Voreinstellungstasten
- alle [Favoriten](#favorites) und alle Unterebenen vom Server
- viele [Widgets](#widgets) für die iobroker-vis-Komponente sind enthalten\
  Eigene Steuerungsschnittstellen erstellen (Player auswählen, Favoriten auswählen, Synchronisierungsgruppen verwalten, Schaltflächen für Wiedergabe/Pause, Vorwärts, Rückwärts, Wiederholungsmodus und Zufallswiedergabemodus auswählen)

## Installation

- Installieren Sie das Paket
- Erstellen Sie eine Instanz
- Konfigurieren Sie die Instanz mit der IP-Adresse des Logitech/Lyrion-Medienservers und dem Port (normalerweise 9000).
- Instanz starten/neu starten

## Konfiguration

### Haupteinstellungen

| Option          | Standard   | Beschreibung                                                                                                         |
| --------------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| LMS-Server      | `0.0.0.0`  | Hostname oder IP-Adresse des Logitech/Lyrion Medienservers. Ein automatisch erkannter Server kann ausgewählt werden. |
| LMS-Port        | `9000`     | Der HTTP-Port, der von JSON-RPC oder dem experimentellen WebSocket-Plugin verwendet wird.                            |
| Verbindungstyp  | `JSON-RPC` | Verwendet stabiles HTTP JSON-RPC oder das experimentelle LMS WebSocket-Plugin.                                       |
| WebSocket-URL   | leer       | Optionale, unabhängige Plugin-Webserver-URL, zum Beispiel `http://192.168.1.87/`.                                    |
| LMS Telnet-Port | `9090`     | CLI/Telnet-Port. Wird nur bei JSON-RPC verwendet, wenn die Telnet-Signalisierung aktiviert ist.                      |
| Benutzername    | leer       | Optionaler LMS-Benutzername.                                                                                         |
| Passwort        | leer       | Optionales LMS-Passwort.                                                                                             |

Der WebSocket-Modus erfordert die experimentelle
[LMS WebSocket-Plugin](https://github.com/LMS-Community/slimserver/tree/d1d0a683d8301c04e64be0425e0aec51fc4e8397/Slim/Plugin/WebSocket)Es überträgt Befehle und Benachrichtigungen über dieselbe Verbindung, daher werden die Telnet-Einstellungen in diesem Modus ignoriert. Die reguläre Player-Abfrage bleibt als Ausweichlösung für fehlende oder unvollständige Benachrichtigungen aktiviert. HTTP(S)-WebSocket-URLs werden in WS(S) konvertiert. `/ws` wird automatisch hinzugefügt, wenn nur eine Stamm-URL konfiguriert ist.

### Timer-Einstellungen

| Option                                   | Standard | Minimum | Beschreibung                                                          |
| ---------------------------------------- | -------- | ------- | --------------------------------------------------------------------- |
| Serveraktualisierung (Sekunden)          | `30`     | `15`    | Intervall für die Aktualisierung der LMS-Serverinformationen.         |
| Player-Aktualisierung (ms)               | `950`    | `200`   | Intervall für die Aktualisierung der Spielerstatusinformationen.      |
| Bevorzugte Aktualisierung (Minuten)      | `720`    | `1`     | Intervall zum Auffrischen des Favoritenbaums.                         |
| Aktualisierung der Entdeckung (Sekunden) | `30`     | `10`    | Intervall für die Suche nach anderen LMS-Servern im lokalen Netzwerk. |

Kurze Aktualisierungsintervalle erhöhen die Anzahl der an das LMS gesendeten Anfragen.

### Leistungseinstellungen

| Option                               | Standard    | Beschreibung                                                                                         |
| ------------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------- |
| Playlist-Informationen bereitstellen | ermöglicht  | Erstellt und aktualisiert die `Playlist` JSON-Status für jeden Spieler.                              |
| Suche nach anderen LMS-Servern       | ermöglicht  | Ermöglicht die Erkennung anderer LMS-Server im lokalen Netzwerk.                                     |
| Telnet-Signalisierung verwenden      | deaktiviert | Mit JSON-RPC wird LMS CLI/Telnet für zusätzliche Spielerverbindungs- und Trennungssignale verwendet. |
| Favoriten anfordern                  | ermöglicht  | Ruft regelmäßig den Favoritenbaum vom LMS ab.                                                        |

Deaktivieren Sie nicht benötigte Informationen, um die LMS-Anfragen und die Adapterverarbeitung zu reduzieren.

### Ankündigungseinstellungen

| Option                  | Standard    | Beschreibung                                                                                                                             |
| ----------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| ioBroker Web-Basis-URL  | leer        | Basis-URL einer ioBroker-Webinstanz, zum Beispiel `http://192.168.1.10:8082`Nur erforderlich für Benachrichtigungen aus lokalen Dateien. |
| Ankündigungsvolumen     | `50`        | Lautstärke während der Wiedergabe der Ansage. Gültiger Bereich: 0 bis 100.                                                               |
| Verwenden Sie FadeTools | deaktiviert | Verwendet die optionale [LMS FadeTools-Plugin](https://github.com/oweitman/LMS-FadeTools) Vor und nach den Ankündigungen.                |
| Ausblenddauer           | `2` S       | Ganze Sekunden wurden übergeben an `fadeout stop`Gültiger Bereich: 1 bis 60 Sekunden.                                                    |
| Einblenddauer           | `2` S       | Ganze Sekunden wurden übergeben an `fadein play`Gültiger Bereich: 1 bis 60 Sekunden.                                                     |

Für lokale Ansagedateien muss das LMS die konfigurierte ioBroker-Web-URL erreichen können. HTTP(S)-Ansage-URLs werden direkt an das LMS übermittelt und benötigen diese Einstellung nicht. FadeTools-Befehle werden nur gesendet, wenn die Option aktiviert ist. Ohne FadeTools werden alle Lautstärkewerte direkt festgelegt und mit dem LMS abgeglichen.

### Debug-Einstellungen

| Option                   | Standard    | Beschreibung                                                          |
| ------------------------ | ----------- | --------------------------------------------------------------------- |
| Player-Debug-Ausgabe     | deaktiviert | Aktiviert zusätzliche Debug-Meldungen für die Spielerverarbeitung.    |
| Spieler-Dummheitsausgabe | deaktiviert | Ermöglicht sehr detaillierte Spielernachrichten.                      |
| Server-Debug-Ausgabe     | deaktiviert | Aktiviert zusätzliche Debug-Meldungen für die LMS-Serververarbeitung. |
| Unsinnige Serverausgabe  | deaktiviert | Ermöglicht sehr detaillierte LMS-Servermeldungen.                     |

Debug-Protokollierung und insbesondere unnötige Protokollierung sollten normalerweise deaktiviert bleiben und nur zur Diagnose eines Problems aktiviert werden.

## Aktualisieren

- Nach der Installation oder Aktualisierung kann es manchmal erforderlich sein\
  Führen Sie den folgenden Befehl aus, falls in vis-1 Probleme aufgetreten sind.

`iobroker upload squeezeboxrpc`

## Fehlerbehebung

### SLIMP3-Spieler

Es wurde berichtet, dass ältere SLIMP3-Player möglicherweise keine Verbindung zum Server herstellen können, während der Adapter nach neuen Servern sucht. Durch Deaktivieren der Suche unter „Instanzkonfiguration → Leistungseinstellungen → Suche nach anderen LMS-Servern“ sollte die Verbindung des Players wiederhergestellt werden.

## Bereitgestellte Staaten

### Server

| Zustand            | Beschreibung                        |
| ------------------ | ----------------------------------- |
| `LastScan`         | Zeitstempel des letzten Musikscans  |
| `PlayerCount`      | Anzahl bekannter Spieler            |
| `PlayerCountOther` | Anzahl bekannter anderer Spieler    |
| `PlayerCountSN`    | Anzahl bekannter SN-Spieler         |
| `TotalAlbums`      | Anzahl aller bekannten Alben        |
| `TotalArtists`     | Anzahl aller bekannten Künstler     |
| `TotalDuration`    | Gesamtspielzeit aller Lieder        |
| `TotalGenres`      | Anzahl aller bekannten Genres       |
| `TotalSongs`       | Anzahl aller bekannten Lieder       |
| `SyncGroups`       | Vorhandene Synchronisierungsgruppen |
| `Version`          | Version von `LMS`                   |
| `mac`              | MAC-Adresse des Servers             |
| `uuid`             | UUID des `LMS`-Beispiel             |

zusätzlich eine definierte Schaltfläche zum Aktualisieren der Favoriten

| Taste          | Beschreibung                                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `getFavorites` | Alle Favoriten vom Server anfordern                                                                                                                                                                                      |
| `cmdGeneral`   | Ein allgemeines Befehlsfeld zum Senden von Befehlen an den Server. Jedes Feld muss in Anführungszeichen gesetzt werden. Parameter müssen durch Kommas getrennt werden. Beispiel: "playerid oder leer",\["para1","para2"] |

### Favoriten

Für jeden Favoriten sind alle Attribute schreibgeschützt.

| Zustand    | Beschreibung                                      |
| ---------- | ------------------------------------------------- |
| `Name`     | Name des Favoriten                                |
| `hasitems` | Gibt an, ob es sich um ein Verzeichnis handelt.   |
| `id`       | ID des Favoriten                                  |
| `image`    | Bild/Symbol für Favorit, falls verfügbar          |
| `isaudio`  | isaudio                                           |
| `type`     | Beispieltypen: Link, Text, Audio, Wiedergabeliste |
| `url`      | URL des Titels                                    |

Alle Unterebenen (Unterverzeichnisse) von Favoriten sind verfügbar.

### Spieler

Für jeden Spieler zeigt der Modus an, ob der Wert geändert werden kann. Die durchgeführte Aktion wird im Attribut beschrieben.

| Zustand                | Modus | Beschreibung                                                                                                                                                                                                                                             |
| ---------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Alarms`               | R/-   | Alle für diesen Player registrierten Alarme im JSON-Format                                                                                                                                                                                               |
| `Album`                | R/-   | Name des aktuellen Albums                                                                                                                                                                                                                                |
| `Announce`             | -/W   | Spielen Sie eine Audiodatei von einem absoluten Pfad oder einer HTTP(S)-URL ab und stellen Sie anschließend Wiedergabe und Lautstärke wieder her. Lokale Dateien benötigen die konfigurierte ioBroker-Web-URL (zum Beispiel `http://192.168.1.10:8082`). |
| `Artist`               | R/-   | Name des Künstlers                                                                                                                                                                                                                                       |
| `ArtworkUrl`           | R/-   | URL zum Kunstwerk                                                                                                                                                                                                                                        |
| `Bitrate`              | R/-   | Bitrate des Titels                                                                                                                                                                                                                                       |
| `Connected`            | R/-   | Verbindungsstatus des Spielers (0/1)                                                                                                                                                                                                                     |
| `Duration`             | R/-   | Dauer des Titels                                                                                                                                                                                                                                         |
| `Genre`                | R/-   | Genre des Titels                                                                                                                                                                                                                                         |
| `IP`                   | R/-   | IP-Adresse des Spielers                                                                                                                                                                                                                                  |
| `Mode`                 | R/-   | Wiedergabe / Pause / Stopp                                                                                                                                                                                                                               |
| `Playername`           | R/-   | Name des Spielers                                                                                                                                                                                                                                        |
| `PlayerID`             | R/-   | Spieler-ID                                                                                                                                                                                                                                               |
| `Playlist`             | R/-   | Die eigentliche Playlist als JSON                                                                                                                                                                                                                        |
| `PlaylistCurrentIndex` | R/W   | Um eine absolute Position anzusteuern, geben Sie den Trackindex an, oder verwenden Sie ein + oder - am Anfang, um eine relative Position zu erreichen. Beispiel: 10,-3,+2                                                                                |
| `PlaylistRepeat`       | R/W   | Lied wiederholen (1)/Playlist wiederholen (2)/Nicht wiederholen (0)                                                                                                                                                                                      |
| `PlaylistShuffle`      | R/W   | Wiedergabeliste zufällig wiedergeben (1) / Album zufällig wiedergeben (2) / Nicht zufällig wiedergeben (0)                                                                                                                                               |
| `Power`                | R/W   | Energiestatus des Spielers abrufen/setzen: aus (0) / ein (1)                                                                                                                                                                                             |
| `RadioName`            | R/-   | Name des Radiosenders                                                                                                                                                                                                                                    |
| `Rate`                 | R/-   | Bewertung des Liedes                                                                                                                                                                                                                                     |
| `Remote`               | R/-   | Wenn Remote-Stream (1)                                                                                                                                                                                                                                   |
| `SyncMaster`           | R/-   | ID/MAC-Adresse des Syncmasters                                                                                                                                                                                                                           |
| `SyncSlaves`           | R/-   | ID/MAC der Spieler in der Syncgroup                                                                                                                                                                                                                      |
| `Time`                 | R/-   | verstrichene Liedzeit                                                                                                                                                                                                                                    |
| `Title`                | R/-   | Songtitel                                                                                                                                                                                                                                                |
| `Type`                 | R/-   | Medientyp (z. B. MP3-Radio)                                                                                                                                                                                                                              |
| `Url`                  | R/-   | URL des Titels/Streams                                                                                                                                                                                                                                   |
| `Volume`               | R/W   | Lautstärke des Players abrufen/einstellen (0-100)                                                                                                                                                                                                        |
| `state`                | R/W   | Wiedergabestatus abrufen/setzen: Pause (0), Wiedergabe (1), Stopp (2)                                                                                                                                                                                    |

Die Wiedergabeliste bietet, sofern verfügbar, die folgenden Attribute: `LMS`Einige Attribute hängen vom Typ der Songs ab (Stream/Datei/...). Alle Attribute sind schreibgeschützt.

| Attribut     | Beschreibung                            |
| ------------ | --------------------------------------- |
| `Album`      | Name des aktuellen Albums               |
| `Artist`     | Name des Künstlers                      |
| `ArtworkUrl` | URL zum Kunstwerk                       |
| `Bitrate`    | Bitrate des Titels                      |
| `Duration`   | Dauer des Titels                        |
| `RadioName`  | Name des Radiosenders                   |
| `Rate`       | Bewertung des Liedes                    |
| `title`      | Songtitel                               |
| `Type`       | Medientyp (z. B. MP3-Radio)             |
| `url`        | URL des Titels/Streams                  |
| `index`      | Index des Liedes in der Wiedergabeliste |
| `id`         | ID des Liedes                           |

zusätzlich definierte Schaltflächen:

| Taste             | Beschreibung                                                                                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `btnForward`      | Nächstes Lied                                                                                                                                                                                                |
| `btnRewind`       | Vorheriges Lied                                                                                                                                                                                              |
| `btnPreset\_\*`   | 1-6 Tasten zur Belegung im Spieler oder Server                                                                                                                                                               |
| `cmdGeneral`      | Ein allgemeines Befehlsfeld zum Senden von Befehlen an den Spieler. Jedes Feld muss in Anführungszeichen gesetzt werden. Parameter müssen durch Kommas getrennt werden. Beispiel: "play","1"                 |
| `cmdPlayFavorite` | Um einen Favoriten abzuspielen, legen Sie die ID des Favoriten fest.                                                                                                                                         |
| `cmdPlayUrl`      | eine URL abspielen. Beispiel: "<http://50.7.77.114:8101/>;"                                                                                                                                                  |
| `cmdGoTime`       | Springen Sie zu einer absoluten Position, indem Sie eine Anzahl von Sekunden angeben, oder zu einer relativen Position, indem Sie ein + oder - am Anfang der Sekundenangabe verwenden. Beispiel: 100,-50,+50 |

Die Ansageeinstellungen definieren die Lautstärke und die optionale Integration mit dem/der/dem
[LMS FadeTools-Plugin](https://github.com/oweitman/LMS-FadeTools)Wenn der Adapter aktiviert ist, sendet er `fadeout stop`wartet die konfigurierte Ausblenddauer ab und setzt die Wiedergabe später fort. `fadein play`Wenn diese Option deaktiviert ist, werden die vorherigen und die Ankündigungsvolumes direkt festgelegt. Für lokale Dateien müssen Sie die Basis-URL einer ioBroker-Webinstanz konfigurieren (z. B. `http://192.168.1.10:8082`Der LMS-Host muss diese URL erreichen können. Remote-Streams werden ohne Suchfunktion wiederhergestellt, da sie in der Regel keine Wiedergabeposition unterstützen.

#### Anmerkungen zu Datenpunkten in Abhängigkeit von der Einstellung TPE2 im LMS

Je nach Einstellung werden den Datenpunkten unterschiedliche MP3-Tags zugewiesen. Die großgeschriebenen Namen sind die Namen der MP3-Tags.

| TPE2 im LMS einrichten         | Künstler      | Albumkünstler | Trackartist | Band          |
| ------------------------------ | ------------- | ------------- | ----------- | ------------- |
| als Band                       | KÜNSTLER      | leer          | TRACKER     | ALBUMKÜNSTLER |
| als die Interpreten des Albums | ALBUMKÜNSTLER | ALBUMKÜNSTLER | leer        | leer          |

Es ist außerdem zu beachten, dass nach einer Änderung des Lernmanagementsystems die gesamte Bibliothek umgestellt werden muss.\
erneut gesucht und indexiert werden, und ein Lied muss angehalten und neu gestartet werden.\
bevor das LMS andere Daten liefert.

### Weitere API-Dokumentation

Weitere Informationen finden Sie in der CLI-Dokumentation:

<https://github.com/oweitman/LMS-CLI-Documentation/blob/master/LMS-CLI.md>

## Widgets

Der Adapter enthält passende Widget-Sets für beide Visualisierungsgenerationen. Jede Widget-Referenz enthält ihren Zweck, ein Vorschaubild, alle codebasierten Konfigurationsoptionen und relevante Laufzeithinweise:

- [Vollständige VIS 1-Widget-Dokumentation](docs/vis1-widgets.md)
- [Vollständige VIS 2-Widget-Dokumentation](docs/vis2-widgets.md)

Beide Widget-Sets verwenden ein **Spieler** Verwenden Sie das Widget als zentrale Auswahlquelle. Konfigurieren Sie dieses Widget zuerst und wählen Sie es dann in Steuerelementen, Wertanzeigen, Favoriten, Wiedergabelisten, Wiedergabelistendetails, Browser und Synchronisierungsgruppen aus. VIS 2-Referenzen funktionieren in verschiedenen Ansichten.

<details>
<summary>Legacy widget overview retained for existing links</summary>

### Spieler-Schaltflächenleiste

![Spieler-Schaltflächenleiste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/players.png)

Alle in Ihren Logitech/Lyrion Media Server integrierten Player können ausgewählt werden.\
mit diesem Widget. Nach der Auswahl eines `squeezerpc.?` Instanz, die verfügbaren\
Die Spieler werden im Widget angezeigt.

#### Attribute

| Gruppe                      | Attribut            | Beschreibung                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SqueezeboxRPC-Instanz       | Allgemeine Gruppe   | Wählen Sie eine Instanz des SqueezeboxRPC-Adapters aus. Nur diese werden hier als gültig erkannt.                                                                                                                                                                                                                                           |
| Widget-Format               | Allgemeine Gruppe   | Der Widget-Typ kann hier ausgewählt werden. Der Typ „Formatbutton“ bietet den vollen Funktionsumfang und ist auch mit dem SyncGroup-Widget kompatibel. Der Typ „Formatselect“ ist ein einfaches Auswahlfeld. Als Name wird der Spielername oder ein individueller Text verwendet.                                                           |
| Anzeigeindex                | Allgemeine Gruppe   | Einzelne Schaltflächen lassen sich durch Löschen ihres Index ausblenden oder in einer anderen Reihenfolge anzeigen. Zum Ausblenden löschen Sie einfach die entsprechende Indexposition inklusive Komma. Die Indexnummern werden im Bearbeitungsmodus auf der jeweiligen Schaltfläche angezeigt, sofern die Bearbeitungshilfe aktiviert ist. |
| Zeilenumbruch in CamelCase  | Allgemeine Gruppe   | Wenn der Spielername in CamelCase geschrieben ist, kann hier ein Zeilenumbruch aktiviert werden, damit der Spielername auf dem Button größer erscheint.                                                                                                                                                                                     |
| Hilfe zum Bearbeitungsmodus | Allgemeine Gruppe   | Wenn diese Hilfe aktiviert ist, werden Indexnummern auf der jeweiligen Schaltfläche angezeigt, und die Einstellung „Transparenz“ in den Schaltflächeneinstellungen hat keine Auswirkung.                                                                                                                                                    |
| Bildbreite                  | Tasteneinstellungen | Bildbreite eines Buttons                                                                                                                                                                                                                                                                                                                    |
| Bildhöhe                    | Tasteneinstellungen | Bildhöhe eines Buttons                                                                                                                                                                                                                                                                                                                      |
| Transparenz                 | Tasteneinstellungen | Wenn die Schaltfläche nicht aktiviert ist, hebt sie sich vom Hintergrund ab. 0 = Unsichtbar, 1 = Vollständig sichtbar                                                                                                                                                                                                                       |
| Rahmenbreite                | Tasteneinstellungen | Rahmenbreite in Pixeln um die Schaltfläche                                                                                                                                                                                                                                                                                                  |
| Rahmenanzeige               | Tasteneinstellungen | Art der Rahmendarstellung, z. B. durchgezogen, gestrichelt.                                                                                                                                                                                                                                                                                 |
| Normale Randfarbe           | Tasteneinstellungen | Wenn der Knopf nicht aktiviert ist, wird dies durch diese Farbe angezeigt.                                                                                                                                                                                                                                                                  |
| Rahmenfarbe aktiv           | Tasteneinstellungen | Wenn der Knopf aktiviert ist, wird dies durch diese Farbe angezeigt.                                                                                                                                                                                                                                                                        |
| Rahmenradius                | Tasteneinstellungen | Hier kann ein Radius in Pixeln für abgerundete Ecken eingegeben werden.                                                                                                                                                                                                                                                                     |
| Hintergrundfarbe            | Tasteneinstellungen | Hintergrundfarbe für Text                                                                                                                                                                                                                                                                                                                   |
| Bild                        | Button\[x]          | Hier kann ein Bild individuell definiert werden. Das Bild hat Vorrang vor dem Text.                                                                                                                                                                                                                                                         |
| Text                        | Button\[x]          | Text kann hier individuell definiert werden. Das Bild hat Vorrang vor dem Text.                                                                                                                                                                                                                                                             |

### Favoriten-Schaltfläche

![Favoriten-Schaltfläche](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/favorites.png)

Mit diesem Widget können Sie alle Ihre Favoriten auswählen.\
Erstellt auf Ihrem Logitech/Lyrion Media Server. Nach Auswahl des Player-Widgets werden die verfügbaren Favoriten im Widget angezeigt.

| Gruppe                      | Attribut            | Beschreibung                                                                                                          |
| --------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Player-Widget               | Allgemeine Gruppe   | Wählen Sie das Player-Widget aus.                                                                                     |
| Anzeigeindex                | Allgemeine Gruppe   | Einzelne Schaltflächen können mithilfe des Index ausgeblendet oder in einer anderen Reihenfolge angezeigt werden.     |
| Hilfe zum Bearbeitungsmodus | Allgemeine Gruppe   | Wenn diese Hilfe aktiviert ist, werden auf den jeweiligen Schaltflächen Indexnummern angezeigt.                       |
| Bildbreite                  | Tasteneinstellungen | Bildbreite eines Buttons                                                                                              |
| Bildhöhe                    | Tasteneinstellungen | Bildhöhe eines Buttons                                                                                                |
| Transparenz                 | Tasteneinstellungen | Wenn die Schaltfläche nicht aktiviert ist, hebt sie sich vom Hintergrund ab. 0 = Unsichtbar, 1 = Vollständig sichtbar |
| Rahmenbreite                | Tasteneinstellungen | Rahmenbreite in Pixeln um die Schaltfläche                                                                            |
| Rahmenanzeige               | Tasteneinstellungen | Art der Rahmendarstellung, z. B. durchgezogen, gestrichelt.                                                           |
| Normale Randfarbe           | Tasteneinstellungen | Wenn die Schaltfläche nicht aktiviert ist, wird sie in dieser Farbe angezeigt.                                        |
| Rahmenfarbe aktiv           | Tasteneinstellungen | Wenn die Schaltfläche aktiviert ist, wird sie in dieser Farbe angezeigt.                                              |
| Rahmenradius                | Tasteneinstellungen | Hier kann ein Radius in Pixeln für abgerundete Ecken eingegeben werden.                                               |
| Hintergrundfarbe            | Tasteneinstellungen | Hintergrundfarbe für Text                                                                                             |
| Bild                        | Button\[x]          | Hier kann ein Bild individuell definiert werden. Das Bild hat Vorrang vor dem Text.                                   |
| Text                        | Button\[x]          | Der Text kann hier individuell definiert werden. Das Bild hat Vorrang vor dem Text.                                   |

### Wiedergabetaste

![Wiedergabetaste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/play.svg)

Mit der Wiedergabetaste wird die Musikwiedergabe auf dem ausgewählten Player gestartet oder gestoppt.\
Zur Vorbereitung müssen Sie den Button mit dem Player-Widget verbinden.\
Der Button verfügt über eigene Grafiken (SVG).\
Alternativ können Sie auch Ihre eigenen Grafiken auswählen.

#### Attribute für die Wiedergabetaste

| Gruppe         | Attribut               | Beschreibung                 |
| -------------- | ---------------------- | ---------------------------- |
| Player-Widget  | Allgemeine Gruppe      | Auswahl des Player-Widgets.  |
| Bild anhalten  | Allgemeine Gruppe      | Bild für Pause               |
| Bild abspielen | Allgemeine Gruppe      | Bild zum Spielen             |
| Stoppbild      | Allgemeine Gruppe      | Bild für Stopp               |
| Füllfarbe      | SVG-Einstellungsgruppe | Füllfarbe des Buttons        |
| Strichfarbe    | SVG-Einstellungsgruppe | Farbe für den Rand           |
| Strichstärke   | SVG-Einstellungsgruppe | Breite des Rahmens in Pixeln |

### Nach vorne

![Nach vorne](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/fwd.svg)

Mit dem Forward-Widget können Sie im aktuellen Titel vorwärts springen.\
Die Schaltfläche kann so konfiguriert werden, dass sie einen bestimmten Betrag vorspult.\
Zeit, sofern der Spieler diese Funktion unterstützt.

#### Attribute für die Schaltfläche „Weiter“

| Gruppe                    | Attribut          | Beschreibung                                                          |
| ------------------------- | ----------------- | --------------------------------------------------------------------- |
| Player-Widget             | Allgemeine Gruppe | Auswahl des Player-Widgets.                                           |
| Schrittgröße              | Allgemeine Gruppe | Gibt die Zeitspanne in Sekunden an, um die vorgespult werden soll.    |
| Schaltflächenbeschriftung | Allgemeine Gruppe | Anpassbare Beschriftung für die Schaltfläche.                         |
| Schaltflächensymbol       | Allgemeine Gruppe | Auswahl eines Symbols für die Schaltfläche, z. B. zum Weiterspringen. |

### Zurückspulen

![Zurückspulen](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/rew.svg)

Mit dem Rewind-Widget können Sie zum aktuellen Titel zurückspringen.\
Ähnlich wie beim Forward-Widget kann ein Zeitraum festgelegt werden.

#### Attribute für die Zurückspulen-Schaltfläche

| Gruppe                    | Attribut          | Beschreibung                                                           |
| ------------------------- | ----------------- | ---------------------------------------------------------------------- |
| Player-Widget             | Allgemeine Gruppe | Auswahl des Player-Widgets.                                            |
| Schrittgröße              | Allgemeine Gruppe | Gibt den Zeitraum in Sekunden an, um den zurückgesprungen werden soll. |
| Schaltflächenbeschriftung | Allgemeine Gruppe | Anpassbare Beschriftung für die Schaltfläche.                          |
| Schaltflächensymbol       | Allgemeine Gruppe | Auswahl eines Symbols für die Schaltfläche, z. B. für „Zurück“.        |

### Wiederholen

![Wiederholen](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/repeat0.svg)

Das Repeat-Widget ermöglicht es Ihnen, die Wiederholungsfunktion zu aktivieren oder zu deaktivieren.\
für den aktuellen Titel oder die aktuelle Wiedergabeliste, sofern diese Funktion vom Player unterstützt wird.

#### Attribute für die Schaltfläche „Wiederholen“

| Gruppe                    | Attribut          | Beschreibung                                                                                                       |
| ------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| Player-Widget             | Allgemeine Gruppe | Auswahl des Player-Widgets.                                                                                        |
| Schaltflächenbeschriftung | Allgemeine Gruppe | Anpassbare Beschriftung für die Schaltfläche.                                                                      |
| Schaltflächensymbol       | Allgemeine Gruppe | Auswahl eines Symbols für die Schaltfläche, z. B. für „Wiederholen“.                                               |
| Wiederholungsmodus        | Allgemeine Gruppe | Der Modus kann hier ausgewählt werden, zum Beispiel Einzelwiederholung (Titel) oder Listenwiederholung (Playlist). |

### Shuffle

![Shuffle](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/shuffle0.svg)

Das Shuffle-Widget aktiviert oder deaktiviert die Zufallswiedergabe für die aktuelle Wiedergabeliste.\
sofern diese Funktion vom Player unterstützt wird.

#### Attribute für die Shuffle-Taste

| Gruppe                    | Attribut          | Beschreibung                                                                |
| ------------------------- | ----------------- | --------------------------------------------------------------------------- |
| Player-Widget             | Allgemeine Gruppe | Auswahl des Player-Widgets.                                                 |
| Schaltflächenbeschriftung | Allgemeine Gruppe | Anpassbare Beschriftung für die Schaltfläche.                               |
| Schaltflächensymbol       | Allgemeine Gruppe | Auswahl eines Symbols für die Schaltfläche, z. B. für Zufallswiedergabe.    |
| Aktivierter Zustand       | Allgemeine Gruppe | Farbe oder Stil der Schaltfläche, wenn die Zufallswiedergabe aktiviert ist. |

### Volumen

![Volumen](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/volume.png)

Das Lautstärke-Widget zeigt den aktuellen Lautstärkepegel des Players an und\
Ermöglicht die Lautstärkeregelung.

#### Attribute für die Lautstärketaste

| Gruppe                                 | Attribut          | Beschreibung                                                                  |
| -------------------------------------- | ----------------- | ----------------------------------------------------------------------------- |
| Player-Widget                          | Allgemeine Gruppe | Auswahl des Player-Widgets.                                                   |
| Volumen-Schrittgröße                   | Allgemeine Gruppe | Legt die Schrittweite für die Erhöhung oder Verringerung der Lautstärke fest. |
| Maximales Volumen                      | Allgemeine Gruppe | Legt den Maximalwert für die Lautstärke fest, z. B. 100.                      |
| Hauptfarbe des Lautstärkereglers       | Allgemeine Gruppe | Farbe für den Bereich des Balkens, der das aktuelle Volumen darstellt.        |
| Hintergrundfarbe des Lautstärkereglers | Allgemeine Gruppe | Farbe für den Bereich des Balkens, der nicht vom Volumen abgedeckt wird.      |
| Schaltflächensymbol                    | Allgemeine Gruppe | Auswahl eines Symbols für die Lautstärkeregelung.                             |

### SyncGroup-Schaltflächenleiste

![SyncGroup-Schaltflächenleiste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/syncgroups.png)

Dieses Widget kann in Verbindung mit dem Player-Widget zur Steuerung verwendet werden.\
die Synchronisierung der Spieler untereinander. Die meisten Einstellungen für die Anzahl der Schaltflächen, Beschriftungen oder Bilder werden übernommen.\
über das Player-Widget. Zur Vorbereitung müssen Sie die Schaltfläche mit dem Player-Widget verbinden. Nach Auswahl eines Players im Player-Widget wird die aktuelle Synchronisierung durchgeführt.\
ist im SyncGroup-Widget sichtbar. Der Synchronisierungsstatus wird mithilfe verschiedener anpassbarer Farben angezeigt. Der im Player-Widget ausgewählte Player kann nicht im SyncGroup-Widget ausgewählt werden. Wenn im SyncGroup-Widget ein Player ausgewählt wird, der sich bereits in\
Wenn es einer anderen Gruppe angehört, wird es automatisch aus dieser Gruppe entfernt.

#### Attribute für die Schaltfläche „SyncGroup“

| Gruppe                            | Attribut            | Beschreibung                                                                                                                 |
| --------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Player-Widget                     | Allgemeine Gruppe   | Auswahl des Player-Widgets.                                                                                                  |
| Rahmenbreite                      | Tasteneinstellungen | Rahmenbreite/Rahmenbreite in Pixeln um die Schaltfläche herum.                                                               |
| Rahmenanzeige                     | Tasteneinstellungen | Art der Rahmendarstellung, z. B. durchgezogen, gestrichelt.                                                                  |
| Rahmenfarbe – Nicht in der Gruppe | Tasteneinstellungen | Der Button erhält einen Rahmen in dieser Farbe, wenn der Spieler keiner Gruppe angehört.                                     |
| Rahmenfarbe - In der Gruppe       | Tasteneinstellungen | Der Button erhält einen Rahmen in dieser Farbe, wenn sich der Spieler in einer Gruppe mit dem ausgewählten Spieler befindet. |
| Rahmenfarbe - In anderer Gruppe   | Tasteneinstellungen | Der Button erhält einen Rahmen in dieser Farbe, wenn sich der Spieler in einer anderen Gruppe befindet.                      |
| Rahmenradius                      | Tasteneinstellungen | Hier kann ein Radius in Pixeln für abgerundete Ecken eingegeben werden.                                                      |
| Hintergrundfarbe                  | Tasteneinstellungen | Hintergrundfarbe für Text.                                                                                                   |

### Spielzeitleiste

![Spielzeitleiste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/playtime.png)

Die Wiedergabezeitleiste zeigt den Fortschritt des aktuell abgespielten Liedes visuell an.\
vorausgesetzt, der Server stellt eine Gesamtlaufzeit (Dauer) bereit.\
Dies ist bei Online-Streams normalerweise nicht der Fall. Die Breite des Balkens\
entspricht 100 % der Spielzeit des Liedes. Durch Klicken auf einen Punkt auf\
Mit der Leiste können Sie zum gewünschten Punkt im Lied springen.\
Zur Vorbereitung müssen Sie den Button mit dem Player-Widget verbinden.

#### Attribute für die Spielzeitleiste

| Gruppe                 | Attribut          | Beschreibung                                                            |
| ---------------------- | ----------------- | ----------------------------------------------------------------------- |
| Player-Widget          | Allgemeine Gruppe | Auswahl des Player-Widgets.                                             |
| Hauptfarbe des Balkens | Allgemeine Gruppe | Die Hintergrundfarbe des Balkens für noch nicht gespielte Zeiten.       |
| Spielzeit Farbe        | Allgemeine Gruppe | Die Farbe des Balkens gibt die Anzahl der gespielten Spiele an.         |
| Rahmenbreite           | Allgemeine Gruppe | Rahmenbreite/Randbreite in Pixeln um die Schaltfläche herum.            |
| Rahmenanzeige          | Allgemeine Gruppe | Art der Rahmendarstellung, z. B. durchgezogen, gestrichelt.             |
| Rahmenfarbe            | Allgemeine Gruppe | Farbe des Rahmens um den Balken.                                        |
| Randradius             | Allgemeine Gruppe | Hier kann ein Radius in Pixeln für abgerundete Ecken eingegeben werden. |

### Zeichenkette

![Zeichenkette](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/string.png)

Anzeige spielerspezifischer Zeichenketten. Zur Vorbereitung müssen Sie eine Verbindung herstellen.\
die Schaltfläche zum Player-Widget.

#### Attribute für String

| Gruppe           | Attribut          | Beschreibung                                              |
| ---------------- | ----------------- | --------------------------------------------------------- |
| Player-Widget    | Allgemeine Gruppe | Auswahl des Player-Widgets.                               |
| Spielerattribute | Allgemeine Gruppe | Auswahlliste aller verfügbaren Attribute eines Spielers.  |
| Testtext         | Allgemeine Gruppe | Text, der zu Testzwecken im Editor angezeigt werden soll. |

### Nummer

![Nummer](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/number.png)

Anzeige von Zahlen mit zusätzlichen Formatierungsoptionen. Zur Vorbereitung:\
Sie müssen den Button mit dem Player-Widget verbinden.

#### Attribute für Zahlen

| Gruppe                 | Attribut                 | Beschreibung                                                      |
| ---------------------- | ------------------------ | ----------------------------------------------------------------- |
| Player-Widget          | Allgemeine Gruppe        | Auswahl des Player-Widgets.                                       |
| Spielerattribute       | Allgemeine Gruppe        | Auswahlliste aller verfügbaren Attribute eines Spielers.          |
| HTML voranstellen      | Allgemeine Gruppe        | Text oder HTML-Code, der vor der Zahl steht.                      |
| HTML anhängen          | Allgemeine Gruppe        | Text oder HTML-Code, der an die Zahl angehängt wird.              |
| Testtext               | Allgemeine Gruppe        | Text, der zu Testzwecken im Editor angezeigt werden soll.         |
| Zeichen nach dem Komma | Erweiterte Einstellungen | Anzahl der Dezimalstellen.                                        |
| Komma als Trennzeichen | Erweiterte Einstellungen | Ein Komma dient zur Trennung der Dezimalstellen.                  |
| Tausendertrennzeichen  | Erweiterte Einstellungen | Bei großen Zahlen wird alle 3 Stellen ein Trennzeichen eingefügt. |

### Wiedergabeliste

![Wiedergabeliste](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/playlist.png)

Die vom Server geladene Playlist wird angezeigt. Wenn Sie auf einen Eintrag klicken, wird die Playlist geladen und der Player gestartet. Das Widget aktualisiert sich nicht automatisch; Sie müssen die Aktualisierungsschaltfläche drücken.

#### Attribute für die Wiedergabeliste

| Gruppe        | Attribut          | Beschreibung                |
| ------------- | ----------------- | --------------------------- |
| Player-Widget | Allgemeine Gruppe | Auswahl des Player-Widgets. |

Das Widget selbst ist nur sehr einfach formatiert. Für die automatische Formatierung stehen einige vordefinierte CSS-Klassen zur Verfügung:

| CSS-Klasse  | Beschreibung                                         |
| ----------- | ---------------------------------------------------- |
| plcontainer | Klassenname, der dem ul-Tag zugewiesen wurde         |
| Fülle       | Klassenname, der dem li-Tag zugewiesen wurde         |
| plrefresh   | Klassenname, der dem refresh-li-Tag zugewiesen wurde |
| pltext      | Der Playlist-Name wurde der Klassenname zugewiesen.  |

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

![Browser](../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/browser.svg)

Hier werden Musik, Alben, Künstler, Radiosender, Apps usw. vom Server angezeigt. Klicken Sie auf ein Element, um tiefer in die Hierarchie zu navigieren. Die verfügbaren Befehle werden mit zusätzlichen Schaltflächen angezeigt. Sie können eine Ebene nach oben gelangen, indem Sie auf den oben angezeigten Pfad klicken.

#### Attribute für Browser

| Gruppe                | Attribut          | Beschreibung                                                                                  |
| --------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| Player-Widget         | Allgemeine Gruppe | Auswahl des Player-Widgets.                                                                   |
| debuggen              | Allgemeine Gruppe | Aktivieren Sie zusätzliche Debugging-Informationen (Funktionsreferenz) in der Browserkonsole. |
| debugwithfetchresults | Allgemeine Gruppe | Aktivieren Sie zusätzliche Debugging-Informationen (Objektreferenz) in der Browserkonsole.    |

Das Widget selbst verfügt über eine gewisse Formatierung. Für die automatische Formatierung stehen einige vordefinierte CSS-Klassen zur Verfügung:

| CSS-Klasse                                 | Beschreibung                                          |
| ------------------------------------------ | ----------------------------------------------------- |
| sqbrowser-list-container                   | Container für das Widget                              |
| sqbrowser-parent-directory                 | Element zur Anzeige des übergeordneten Verzeichnisses |
| sqbrowser-btn-svg                          | Klasse für alle SVG-Schaltflächen                     |
| sqbrowser-btn-svg-menu                     | Klasse für SVG-Menüs                                  |
| scrollbarer Bereich im Browserfenster      | Klasse für Scrollcontainer                            |
| sqbrowser-list-item                        | Klasse für einzelnes Element                          |
| sqbrowser-list-item-content                | Klasse für Artikeltitel                               |
| sqbrowser-button-group                     | Klasse für Schaltflächengruppe in einem Listenelement |
| sqbrowser-btn-svg sqbrowser-btn-svg-action | Klasse für Aktionsschaltfläche                        |

**Hinweis zum Alpha-Status dieses Widgets:**

- Die Implementierung von LMS/Lyrion für das Browsen ist die Hölle.
- Das technische Vorbild für dieses Widget ist das „Material“-Theme-Plugin im LMS/Lyrion-Server.
- Noch sind nicht alle Funktionen implementiert.
  - Noch sind nicht alle Eingabefeldtypen verfügbar.
  - Möglicherweise wurden noch nicht alle Artikeltypen implementiert.
- Zur Analyse wurde eine optionale, ausführliche Debug-Ausgabe hinzugefügt (siehe auch Attribute).
  - Ausgabe der Funktionsreferenz: Alle Funktionsnamen werden der Reihe nach in der Browserkonsole ausgegeben.
  - Ausgabe der Datenreferenz: Alle vom Server angeforderten und zurückgegebenen Daten werden ausgegeben.

Falls Tester auf Fehler/Probleme oder fehlende Implementierungen stoßen, geben Sie bitte eine möglichst detaillierte Beschreibung an:

- Woher stammen die Daten im LMS/Lyrion (bereits integrierter Dienst/zusätzlich installiertes Plugin)?
- Welche Schritte/Klicks wurden ausgeführt, um das Problem zu erzeugen?
- Was sind Funktions- und Datenreferenzen?

</details>

## SendTo-Befehle

### Spielernamen abrufen

Gibt die Namen aller aktuell im Adapter registrierten Spieler zurück. Die zurückgegebenen Namen sind die unten verwendeten, bereinigten Namen. `squeezeboxrpc.<instance>.Players`.

```js
async function main() {
    const playerNames = await sendToAsync('squeezeboxrpc.0', 'getPlayerNames', {});
    console.log(JSON.stringify(playerNames));
}
main();
```

Beispielergebnis:

```json
["Living_room", "Kitchen"]
```

### cmdGeneral

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

## Entwicklung

### vis-1

- start dev-server mit `dev-server watch --noStart`
- Adapter mit Startkonfiguration "default Launch ioBroker Adapter" starten
- Starte das Überwachungsskript im Widget-Verzeichnis mit `npm run watch`
- Vis-1-Editor oder Laufzeitumgebung öffnen
- Wenn Sie im vis-1-Widget etwas ändern, warten Sie einige Sekunden, bis die Änderungen auf den Entwicklungsserver hochgeladen sind.
- in vis-1 die Seite vis-1 neu laden
- Wenn sich etwas in der Datei squeeboxrpc.html geändert hat, müssen Sie den Vis-1-Adapter neu starten.

### vis-2

- Zum Debuggen des vis-2-Widgets müssen Sie vis-2 in einem zweiten vis-2-Fenster ausführen.
- Um die Installation und Ausführung durchzuführen, folgen Sie den Anweisungen in <https://github.com/ioBroker/ioBroker.vis-2#development-and-debugging>
- Adapter mit Startkonfiguration "default Launch ioBroker Adapter" starten
- Starten Sie den Vite-Entwicklungsserver im Verzeichnis src-widgets mit `npm run start`
- Im iobroker-Adminbereich/Registerkarte „Objekte“ bearbeiten Sie im Expertenmodus das Objekt von `system.adapter.squeezeboxrpc.0`
- Ändern Sie common.visWidgets.vis2vis-squeezeboxrpc.url von vis2squeezeboxrpc/customWidgets.js zu
  <http://localhost:4173/customWidgets.js>
  Dies ist die Adresse des Vite-Definitionsservers.
- Öffnen Sie vis im Bearbeitungs- oder Laufzeitmodus mit der Startkonfiguration "vis2 edit 3000" oder "vis2 runtime 3000".
- Wenn Sie etwas im Code des Vis-2-Widgets ändern, wird ein automatisches Neuladen ausgelöst, oder Sie drücken F5 im Browser.

### abschließender Laufzeittest

- stoppen `dev-server` und Ihr Adapter in VS Code
- Erstelle einen Produktions-Build und lade ihn mit dem Build auf den Entwicklungsserver hoch. `dev-server upload`
- iobroker starten mit `npm run start`
- Die Änderung in system.adapter.squeezeboxrpc.0 wird auf den ursprünglichen Wert zurückgesetzt.
- Öffnen Sie vis-1 oder vis-2 im Bearbeitungs- oder Laufzeitmodus.

### zusätzlicher Test auf einem echten iobroker-Server

- Erstellen Sie im Stammverzeichnis eine npm-Paketdatei mit `npm pack`
- Drücken Sie in iobroker auf der Registerkarte „Admin/Adapter“ im Expertenmodus die Schaltfläche „Katze“.
- Wählen Sie im Dialogfeld die Registerkarte aus. `from file`
- Wählen Sie die erstellte Paketdatei aus.
- Installationsanleitung drücken
- Wenn etwas nicht funktioniert, beim Start der Shell `iobroker upload all`

## Todo

- Widget „Spielergesteuerter Drehknopf“ hinzufügen
- ~~Die Wiedergabe wird gestoppt, wenn die Favoritentaste erneut gedrückt wird. (Nicht implementiert)~~
- ~~mehr Tests/Fehlerbehebungen~~
- ~~Mehr Konfigurationsmöglichkeiten zum optionalen Ein-/Ausschalten von Funktionen zur Verbesserung von Speicher und Leistung~~
- ~~Playlist-Widget hinzufügen~~
- ~~Widget zum Durchsuchen hinzufügen `LMS`-Speisekarte~~
- ~~Abhängigkeiten zu anderen Paketen reduzieren (squeezenode)~~
- ~~cmdGeneral für Server.~~
- ~~Fügen Sie eine Telnet-Kommunikation hinzu, um Push-Ereignisse vom Server zu erhalten.~~
  ~~die Abstimmung optimieren~~
- ~~Implementiere einen Befehlsstatus, um benutzerdefinierte Befehle (via JSON) zu platzieren.~~
  ~~für Server und Spieler~~
- ~~mehr Steuerungsfunktionen implementieren (Wiedergabelistenposition zum Abspielen auswählen, vorspulen, zurückspulen,~~
  ~~(Zu einer bestimmten Stelle im Lied springen, Lied wiederholen, zufälliges Lied abspielen)~~
- ~~Füge die Playlist als JSON-Array zu den Playerdaten hinzu.~~
- ~~Füge Grafiken (Senderlogo/Playlist-Cover) für Favoriten hinzu~~
- ~~Implementieren Sie weitere Ebenen (Unterverzeichnisse) von Favoriten~~
- ~~Logitech Media Server automatisch erkennen~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**

-->
### 3.0.0 (2026-09-07)

- complete rework of the LMS API
- add experimental websocket support, only usable with LMS 9.2 build after 5.9.2026

### 2.0.2 (2026-09-07)

- fix io-package.json

### 2.0.1 (2026-09-05)

- fix package-lock
- fix tests

### 2.0.0 (2026-09-05)

- power/connected state fixed
- players button font size fixed
- bring back fade in/out for Announcement with additional LMS plugin

### 2.0.0-alpha.5 (2026-08-31)

- fix tests

Older entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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

Copyright (c) 2019-2026 oweitman