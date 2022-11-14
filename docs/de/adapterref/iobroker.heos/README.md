---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heos/README.md
title: ioBroker.heos
hash: 8GG56U7Kr90ARv9XyLvx2epphAyQXbusXwpuEqMEfso=
---
![Logo](../../../en/adapterref/iobroker.heos/admin/heos.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.heos.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heos.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/heos-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/heos-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/withstu/iobroker.heos.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/withstu/ioBroker.heos/badge.svg)
![NPM](https://nodei.co/npm/iobroker.heos.png?downloads=true)

# IoBroker.heos
## Heos-Adapter für ioBroker
Der Adapter ermöglicht die Steuerung von HEOS über ioBroker

## Aufbau
* **AutoPlay**: Spielt automatisch Musik ab, nachdem der Player angeschlossen oder die Stummschaltung aufgehoben wurde. Kann global in der Konfiguration konfiguriert werden. Wenn es global aktiviert ist, können Sie es für einen bestimmten Spieler mit dem Status ```auto_play``` deaktivieren.
* **Command scope**: Legt fest, an welche Spieler der Befehl von ```scope/[cmd]``` gesendet wird. Es kann an alle Spieler, alle führenden Spieler oder an alle PIDs im kommagetrennten Zustand gesendet werden: ```heos.0.command_scope_pid```
* **Regex stummschalten**:

In der Konfiguration können Sie eine Funktion aktivieren, um den Player basierend auf einem Regex-Match auf die Songinformationen stummzuschalten. Dies kann verwendet werden, um Anzeigen automatisch stummzuschalten. Für Spotify können Sie beispielsweise die folgende Regex verwenden: ```spotify:ad:|Advertisement```.

* **ignore_broadcast_cmd**: Dieser Player State konfiguriert, ob der Player Befehle an alle Player ignorieren soll, z.B. player/set_mute&state=on oder Drücken der Play-Taste für Presets/Playlists

## Suchen
Die Suchfunktion funktioniert nicht bei allen Quellen. Spotify und Amazon Music unterstützen die Suche.

## Befehlsstatus
HEOS CLI-Spezifikation: http://rn.dmglobal.com/euheos/HEOS_CLI_ProtocolSpecification.pdf

### HEOS-Befehlsstatus (heos.0.command)
* „system/connect“: Versuchen Sie, sich mit HEOS zu verbinden
* „system/disconnect“: Verbindung zu HEOS trennen
* „system/reconnect“: Trennen und Verbinden
* "system/load_sources": Quellen neu laden
* "system/reboot": Angeschlossenen Player neu starten
* "system/reboot_all": Alle Spieler neu starten
* "group/set_group?pid=<pid1>,<pid2>,...": Setze Gruppe mit der Liste der Spieler-IDs, z.B. "group/set_group?pid=12345678,12345679".
* "group/set_group?pid=<pid1>" : Bestehende Gruppe löschen z.B. "group/set_group?pid=12345678"
* "group/ungroup_all" : Alle Gruppen löschen
* "group/group_all" : Gruppiere alle Spieler in einer Gruppe
* "player/[cmd]": Sende den Befehl an alle Spieler. z.B. player/set_mute&state=on
* "leader/[cmd]": Sende den Befehl an alle führenden Spieler. z.B. Leader/set_mute&state=on
* "scope/[cmd]": Sende den Befehl an den konfigurierten Bereich alle Spieler, führende Spieler oder kommagetrennte Spieler-PIDs in scope_pids
* "...": Alle anderen Befehle werden versucht an HEOS zu senden

### Player-Befehlsstatus (heos.0.players.123456789.command)
Hinweis: Mehrere Befehle sind möglich, wenn sie mit dem senkrechten Strich getrennt werden, z. set_volume&level=20|play_preset&preset=1

* "set_volume&level=0|1|..|100": Stellen Sie die Player-Lautstärke ein
* "set_play_state&state=play|pause|stop": Legt den Spielerstatus fest
* "set_play_mode&repeat=on_all|on_one|off&shuffle=on|off": Stellen Sie den Repeat- und Shuffle-Modus ein
* "set_mute&state=on|off": Spieler stumm schalten
* "volume_down&step=1..10": Lautstärke verringern
* "volume_up&step=1..10": Lautstärke erhöhen
* "play_next": Als nächstes spielen
* "play_ previous": Vorheriges abspielen
* "play_preset&preset=1|2|..|n": Preset n wiedergeben
* "play_stream&url=url_path": URL-Stream abspielen
* "add_to_queue&sid=1025&aid=4&cid=[CID]": Wiedergabeliste mit [CID] auf Player abspielen (Hilfe: 1 – jetzt spielen; 2 – als nächstes spielen; 3 – zum Ende hinzufügen; 4 – ersetzen und abspielen)

## Bildfarbextraktion
Mit Version 1.7.6 werden die markanten Farben des Songcovers extrahiert und in drei neue Player-Zustände gespeichert:

* **current_image_color_palette**: Auffällige Farben, ausgewählt von node-vibrant.
* **current_image_color_background**: Farbe mit der größten Population im Bild. Kann als Hintergrundfarbe für Player-Steuerelemente in VIS verwendet werden.
* **current_image_color_foreground**: Farbe mit der zweitgrößten Population im Bild und einem guten Lesekontrast zur Hintergrundfarbe. Kann als Textfarbe für Player-Steuerelemente in VIS verwendet werden.

## Sag es
[SayIt-Adapter](https://github.com/ioBroker/ioBroker.sayit) wird unterstützt.

![Sag es](docs/media/sayit.png) ![Sayit-Konfiguration](../../../en/adapterref/iobroker.heos/docs/media/sayit-config.png)

## Material-UI
[Material-UI-Adapter](https://github.com/ioBroker/ioBroker.material) wird unterstützt.

![Material](../../../en/adapterref/iobroker.heos/docs/media/material-ui.png)

## Voreinstellungen und Wiedergabelisten
Der Adapter fordert nicht automatisch die aktuellen Wiedergabelisten und Voreinstellungen an. Um die Daten zu aktualisieren/anzufordern und die Spielstände zu erstellen, müssen Sie zuerst die Quellen durchsuchen:

- Voreinstellungen/Favoriten: ```heos.0.sources.1028.browse```
- Wiedergabelisten: ```heos.0.sources.1025.browse```

## VIS
### Installation
* Erstellen Sie folgende String-Zustände:
    * 0_userdata.0.heos.queue_pid
    * 0_userdata.0.heos.queue_html
    * 0_userdata.0.heos.browse_result_html

### Spieleransicht
* Öffnen Sie die Datei: [player_view.json](docs/vis/views/player_view.json)
* Ersetzen Sie 123456789 durch die Spieler-PID
* Ansicht in VIS importieren

![Spieleransicht](../../../en/adapterref/iobroker.heos/docs/media/player-view.png)

### Voreinstellungen
* Klicken Sie auf die Schaltfläche ```heos.0.sources.1028.browse```, um Voreinstellungen zu laden
* Öffnen Sie die Datei: [presets_view.json](docs/vis/views/presets_view.json)
* Ansicht in VIS importieren

![Voreinstellungen Konfig](docs/media/presets-config.png) ![Voreinstellungen](../../../en/adapterref/iobroker.heos/docs/media/presets.png)

### Warteschlange
* Warteschlangen-Widget: [queue_player_widget.json](docs/vis/views/queue_player_widget.json)
* Warteschlangenansicht: [queue_view.json](docs/vis/views/queue_view.json)
* Warteschlangen-HTML-Generierungsskript: [queue.js](docs/vis/scripts/queue.js)

![Warteschlangen-Widget](../../../en/adapterref/iobroker.heos/docs/media/queue-widget.png)

### Quellen durchsuchen
* Durchsuchen-Widget: [browse_player_widget.json](docs/vis/views/browse_player_widget.json)
* Ansicht durchsuchen: [browse_view.json](docs/vis/views/browse_view.json)
* HTML-Generierungsskript durchsuchen: [browse.js](docs/vis/scripts/browse.js)

![Durchsuchen-Widget](docs/media/browse-widget.png) ![Quellen durchsuchen](docs/media/browse-sources.png) ![Durchsuchen Sie tunein](../../../en/adapterref/iobroker.heos/docs/media/browse-tunein.png)

Alternativ können Sie das Skript von Uhula verwenden: https://forum.iobroker.net/post/498779

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (withstu) optimize scope handling

### 1.11.4 (2022-11-04)
* (withstu) improve play all button in browse feature

### 1.11.3 (2022-11-04)
* (withstu) update some dependencies
* (withstu) improve failure handling
* (withstu) improve play all button in browse feature

### 1.11.2 (2022-10-16)
* (withstu) adopt to new adapter structure

### 1.11.1 (2022-10-16)
* (withstu) fix release

### 1.11.0 (2022-10-16)
* (withstu) improve player failure detection
* (withstu) fix bug in regex mute
* (withstu) fix upnp NaN warning #192

### 1.10.0 (2022-06-16)
* (foxriver76) fix default value of `sid` (closes #174)

### 1.9.2 (2022-01-22)
* (withstu) add volume lock

### 1.9.1 (2021-08-17)
* (withstu) fix type issues
* (withstu) fix roles and repeat state

### 1.9.0 (2021-07-27)
* (stephanritscher) add option to configure udp source port

### 1.8.6 (2021-06-13)
* (withstu) test fixed pipeline

### 1.8.4 (2021-06-13)
* (withstu) improve stability

### 1.8.3 (2021-05-13)
* (withstu) fix upnp values on failure

### 1.8.2 (2021-05-12)
* (withstu) BREAKING: add queue paging
* (withstu) BREAKING: volume_max -> volume_limit
* (foxriver76) Fix type issues and some more minor changes

### 1.8.1 (2021-05-07)
* (withstu) fix reboot loop

### 1.8.0 (2021-04-24)
* (withstu) add reboot on failure configuration

### 1.7.9 (2021-04-07)
* (withstu) fix reboot
* (withstu) add power state

### 1.7.8 (2021-04-05)
* (withstu) add reboot

### 1.7.7 (2021-02-25)
* (withstu) add creation of missing version state

### 1.7.6 (2021-02-24)
* (withstu) add image color extraction

### 1.7.5 (2021-02-12)
* (withstu) add bit depth

### 1.7.4 (2021-02-01)
* (withstu) fix upnp init bug

### 1.7.3 (2021-02-01)
* (withstu) add upnp module and support bitrate, audio format and sample rate

### 1.7.2 (2021-01-30)
* (withstu) fix seek in groups

### 1.7.1 (2021-01-30)
* (withstu) add seek

### 1.7.0 (2021-01-29)
* (withstu) reboot not responding players
* (withstu) delete old presets and playlists

### 1.6.2 (2021-01-02)
* (withstu) fix "user not logged in" handling

### 1.6.1 (2020-11-25)
* (withstu) clear timeout and interval on unload; fix roles; remove sleep in tts module

### 1.6.0 (2020-11-22)
* (withstu) add regex mute

### 1.5.6 (2020-11-22)
* (withstu) add source images & optimize auto play

### 1.5.5 (2020-11-01)
* (withstu) update some packages and add sources event

### 1.5.4 (2020-10-24)
* (withstu) ignore invalid now playing responses

### 1.5.3 (2020-10-18)
* (withstu) minor improvements related to auto play feature

### 1.5.2 (2020-10-11)
* (withstu) improve tts stop method

### 1.5.1 (2020-10-11)
* (withstu) improve tts and don't update queue during tts

### 1.5.0 (2020-10-10)
* (withstu) add tts support and maximum volume

### 1.4.0 (2020-10-10)
* (withstu) add more play and queue settings
* (withstu) bugfixing for invalid heos responses (empty player name)

### 1.3.4 (2020-10-04)
* (withstu) remove sorting and available filter and fix browse play

### 1.3.3 (2020-10-04)
* (withstu) fix previous page button in browse feature

### 1.3.2 (2020-10-04)
* (withstu) fix preset sorting

### 1.3.1 (2020-10-03)
* (withstu) add back button to browse feature

### 1.3.0 (2020-10-03)
* (withstu) add queue and some browse improvements

### 1.2.4 (2020-09-29)
* (withstu) minor bugfix

### 1.2.3 (2020-09-29)
* (withstu) improve browse feature (add pictures and sources view)

### 1.2.2 (2020-09-28)
* (withstu) rename browse command

### 1.2.1 (2020-09-28)
* (withstu) introduce browse_result state

### 1.2.0 (2020-09-27)
* (withstu) Breaking change: restructure playlists/presets (you should delete the devices playlists, presets and sources before installation)

### 1.1.2 (2020-09-26)
* (withstu) log browse parameters

### 1.1.1 (2020-09-26)
* (withstu) add source browse feature (Click the button in the sources. You can find the possible next commands in the log.)

### 1.1.0 (2020-09-26)
* (withstu) encrypt password

### 1.0.1 (2020-09-21)
* (withstu) remove connected state, because it is included in the info channel

### 1.0.0 (2020-09-21)
* (withstu) initial release

## License
MIT License

Copyright (c) 2022 withstu <withstu@gmx.de>

derived from https://forum.iobroker.net/topic/10420/vorlage-denon-heos-script by Uwe Uhula
TTS derived from https://github.com/ioBroker/ioBroker.sonos

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