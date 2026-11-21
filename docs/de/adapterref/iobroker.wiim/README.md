---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wiim/README.md
title: ioBroker.wiim
hash: pfu2j7yodwtNQQwdEcU/cw3xliwnhGLoTD/cIikkpb8=
---
![Logo](../../../en/adapterref/iobroker.wiim/admin/wiim.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.wiim.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wiim.svg)
![Anzahl der Installationen](https://iobroker.live/badges/wiim-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/wiim-stable.svg)
![NPM](https://nodei.co/npm/iobroker.wiim.png?downloads=true)
![Test und Freigabe](https://github.com/KaiIOB/ioBroker.wiim/workflows/Test%20and%20Release/badge.svg)

# ioBroker.wiim

## Wiim-Adapter für ioBroker

Adapter für den Zugriff auf Wiim/Arylic und andere Geräte, die auf der Linkplay-Streaming-/Multiroom-Technologie basieren.

## Unterstützte Geräte

Der Adapter wurde getestet mit:

```
Wiim Amp 
Wiim Mini
Arylic up2stream v3
Arylic S10+
Audiocast M5
August WR320B (after firmware upgrade to 4.6.415156.0)
August WS350K
Audio Pro Addon C5A
Müzo Cobblestone
```

Wiim-Geräte verwenden HTTPS-Kommunikation, Arylic-Geräte HTTP-Kommunikation. Mindestens eine Funktion (playPromptUrl) funktioniert nur mit Arylic-Geräten ab Firmware-Version 4.6.415145. Aktuell sind nur die wichtigsten API-Funktionen implementiert. Bitte teilen Sie mir mit, ob Ihnen weitere Funktionen nützlich sind.

Hier finden Sie Informationen zu den Geräten:

WiiM: <https://www.wiimhome.com/wiimvibelink/overview> Arylic: <https://www.arylic.com/> Audiocast: <https://audiocast.io/> Hinweis: Der Audicast M5 wird unter vielen verschiedenen Markennamen verkauft. Ich gehe davon aus, dass alle mit dem Adapter funktionieren. August: <https://augustint.com/> Hinweis: Der WR320B scheint nicht mehr erhältlich zu sein.

## Adapterkonfiguration

```
interval for refresh of player data in seconds: time between two requests for updated data
```

## Staaten und Kontrollkanäle

Der Adapter erstellt automatisch Zustände für jedes erkannte WiiM-, Arylic- oder Linkplay-basierte Streaming-Gerät. Die Zustände werden in schreibgeschützte Metadatenzustände und Lese-/Schreibsteuerungszustände unterteilt.

### Metadaten & Status (schreibgeschützt)

Diese Zustände repräsentieren die aktuellen Wiedergabeinformationen und Hardware-Metriken, die vom Gerät abgerufen werden.

| Staats-ID     | Typ          | Rolle          | Einheit  | Beschreibung                                                                           |
| :------------ | :----------- | :------------- | :------- | :------------------------------------------------------------------------------------- |
| `artist`      | Zeichenkette | `media.artist` | -        | Name des aktuell spielenden Künstlers.                                                 |
| `album`       | Zeichenkette | `media.album`  | -        | Name des aktuellen Albums.                                                             |
| `title`       | Zeichenkette | `media.title`  | -        | Titel des aktuellen Tracks.                                                            |
| `albumArtURI` | Zeichenkette | `media.cover`  | -        | HTTP-URL oder URI, die auf das Albumcover verweist.                                    |
| `mode`        | Zeichenkette | `media.input`  | -        | Aktueller Audioquellenmodus (z. B. Bluetooth, Wi-Fi, Line-In).                         |
| `loop_mode`   | Nummer       | `value`        | -        | Vom Hardwaresystem zurückgegebener numerischer Rohdaten-Schleifen-/Wiederholungsmodus. |
| `sampleRate`  | Nummer       | `value`        | Hz       | Audio-Abtastrate des aktuell wiedergegebenen Streams (z. B. 44100).                    |
| `bitDepth`    | Nummer       | `value`        | bisschen | Audio-Bittiefe des Streams (z. B. 16 oder 24 Bit).                                     |
| `lastRefresh` | Zeichenkette | `text`         | -        | Zeitstempel der letzten erfolgreichen Datenaktualisierung vom Gerät.                   |

### Wiedergabesteuerung (Lesen/Schreiben)

Nutzen Sie diese Zustände, um die Wiedergabe, das Routing und die Systemparameter Ihrer Streamer zu steuern.

| Staats-ID       | Typ             | Rolle                    | Werte / Bereich  | Beschreibung                                                                                                                                                                                                                           |
| :-------------- | :-------------- | :----------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Play_Pause`    | boolescher Wert | `button`                 | auslösen         | Schaltet zwischen Wiedergabe- und Pausenmodus um.                                                                                                                                                                                      |
| `next`          | boolescher Wert | `button`                 | auslösen         | Springt zum nächsten Titel in der Warteschlange oder Wiedergabeliste.                                                                                                                                                                  |
| `previous`      | boolescher Wert | `button`                 | auslösen         | Kehrt zum vorherigen Titel zurück.                                                                                                                                                                                                     |
| `volume`        | Nummer          | `level.volume`           | `0` Zu `100` %    | Steuert die Gesamtlautstärke des Geräts.                                                                                                                                                                                               |
| `loopmode`      | Nummer          | `level`                  | `0` Zu `5`        | Auswahlmenü für Wiederholungs- und Zufallswiedergabemodus festlegen:<br>`0`: Wiederhole alles<br>`1`: Einmal wiederholen<br>`2` Mischen + Wiederholen<br>`3`: Mischen<br>`4` Keine Wiederholung<br>`5` Mischen + Einmal wiederholen |
| `jumptopos`     | Nummer          | `media.elapsed`          | MS               | Strebt eine bestimmte Position (in ms) innerhalb der aktuellen Spur an.                                                                                                                                                                |
| `play_preset`   | Nummer          | `media.playid`           | ganze Zahl       | Aktiviert einen voreingestellten Favoriten-Slot, der in der WiiM/Aryl-App vorkonfiguriert ist.                                                                                                                                         |
| `play_URL`      | Zeichenkette    | `media.url`              | URL-Zeichenfolge | Spielt eine direkte benutzerdefinierte Audiostream-URL ab (z. B. einen HTTP-Roh-MP3-Link).                                                                                                                                             |
| `playPromptUrl` | Zeichenkette    | `media.url.announcement` | URL-Zeichenfolge | Spielt sofort einen Audio-Hinweis oder Benachrichtigungston ab (z. B. für Glockenspiele/TTS).                                                                                                                                          |
| `switchmode`    | Zeichenkette    | `media.input`            | Eingangsmodus    | Der aktive Eingangsquellenkanal wird manuell geändert.                                                                                                                                                                                 |
| `setShutdown`   | Nummer          | `level.timer`            | Sekunden         | Legt den integrierten Sleep-Timer (in Sekunden) fest, nach dessen Ablauf sich das Gerät ausschaltet.                                                                                                                                   |

### Multiroom & Synchronisierung (Lesen/Schreiben)

Verwalten Sie Ihre Gerätegruppierung und synchronen Multiroom-Zonen direkt.

| Staats-ID                | Typ             | Rolle    | Beschreibung                                                                                                                                  |
| :----------------------- | :-------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `setMaster`              | Zeichenkette    | `text`   | Geben Sie die Ziel-IP-Adresse ein, um diesen Player als Mitglied einer Multiroom-Slave-Gruppe zu koppeln.                                     |
| `leaveSyncGroup`         | boolescher Wert | `button` | Veranlasst das Gerät, die aktuelle Multiroom-Synchronisierungsgruppe sofort zu verlassen.                                                     |
| `multiroom_slave_volume` | Zeichenkette    | `text`   | Passt die relativen Lautstärke-Offsets für aktive Multiroom-Slave-Instanzen an, Format "ip:volume".                                           |
| `multiroom_slave_mute`   | Zeichenkette    | `text`   | Schaltet alle angeschlossenen Slave-Clients in der synchronisierten Gruppe stumm oder hebt die Stummschaltung auf, Format "ip:0" oder "ip:1". |
| `multiroom_kickout`      | boolescher Wert | `button` | Entfernt einen vordefinierten Gerätekontext aus der aktiven Multiroom-Struktur.                                                               |

## Changelog
<!-- Placeholder for the next version (at the beginning of the line): ### **WORK IN PROGRESS** -->
### 0.6.1 (2026-10-18)
Migration to seconds instead of ms, corrected bonjour name handling

### 0.6.0 (2026-10-06)
* (KaiIOB) Addition of most API features, code optimization

### 0.5.0 (2026-02-22)
* First release with frequent auto-detection of new streamers in network

### 0.4.3 (2026-02-04)
* corrections based on test feedback, simplyfied streamer detection, simplified state subscription, state roles corrected, r/w of state correted

### 0.4.1
* (KaiIOB) minor correction

For older releases, see CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2025-2026 KaiIOB <Kaibrendel@kabelmail.de>

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