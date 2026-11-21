---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.chromecast/README.md
title: ioBroker.chromecast
hash: BEgsPai97BCvQFpkiD7k9SDFtpUfg09RVg/+sPZN3X4=
---
![Logo](../../../en/adapterref/iobroker.chromecast/admin/home.png)

![Anzahl der Installationen](https://iobroker.live/badges/chromecast-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.chromecast.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.chromecast/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/chromecast/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.chromecast.svg)

# ioBroker.chromecast

> \[!IMPORTANT] Dieser Adapter kann nicht von GitHub installiert werden.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Ein Google Home-Adapter für ioBroker

Dieses Plugin ermöglicht die Erkennung von Google Home-Geräten mit Video- und/oder Audiofunktion. Für jedes erkannte Home-Gerät wird ein ioBroker-Gerät erstellt. Dieses Gerät zeigt den Gerätestatus an und ermöglicht das Senden einer neuen URL zur Übertragung.

Bauen Sie auf den folgenden Projekten auf:

- [ioBroker](http://www.iobroker.net)
- [node-castv2-client](https://github.com/thibauts/node-castv2-client) als Home-Clientbibliothek.

## Anweisungen

1. Installieren Sie diesen Adapter in ioBroker.
2. (Optional) Wenn Sie lokale Dateien streamen möchten oder sich Ihre Chromecast-Geräte in einem anderen Subnetz befinden, müssen Sie den Adapter konfigurieren.
   - Sie benötigen eine ioBroker-Webserverinstanz, um lokale Dateien zu streamen.
   - Sie müssen die Informationen (Name, IP-Adresse, Port, AD-Typ) für jedes Gerät, das sich in einem anderen Subnetz als Ihr ioBroker-Server befindet, manuell hinzufügen. Wenn die Namen mit den Namen der automatisch gefundenen Geräte übereinstimmen sollen, verwenden Sie die MAC-Adresse als Namen. Sie können einen beliebigen Namen wählen. Achten Sie darauf, dass jeder Name eindeutig ist! Um Probleme zu vermeiden, dürfen Namen nur Großbuchstaben (AZ), Kleinbuchstaben (az), Ziffern (0–9), Minuszeichen (-) und Unterstriche (\_) enthalten.
3. Überprüfen Sie Ihr Protokoll: Dort sollten Einträge zu den erkannten Geräten zu finden sein.
4. Schreiben Sie eine URL wie <http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3> auf den chromecast.0. `<your chromecast name>`.player.url2play
5. Die URL sollte nun auf Ihrem Gerät abgespielt werden.

### Kein Gerät gefunden?

Die Geräte werden über mDNS (Multicast-DNS: UDP-Port 5353, Gruppe 224.0.0.251) gefunden. Der Adapter steuert sie über TCP-Port 8009.

- Erlauben Sie eingehende UDP-Verbindungen über Port 5353 in der Firewall des ioBroker-Hosts (z. B. `sudo ufw allow 5353/udp`).
- Docker: Führen Sie den Container im Netzwerkmodus aus `host` (oder macvlan); Multicast wird nicht über das Standard-Bridge-Netzwerk weitergeleitet.
- mDNS funktioniert nicht über Router: Geräte in einem anderen Subnetz oder VLAN werden nur gefunden, wenn auf dem Router ein mDNS-Reflektor installiert ist. Andernfalls müssen sie manuell im Tab „Geräte“ der Einstellungen hinzugefügt werden.

### Unerwünschte Geräte gefunden?

Geräte von Drittanbietern mit integriertem Google Cast (z. B. Denon/Marantz HEOS-Lautsprecher, AVRs oder Smart-TVs) melden sich über mDNS an, genau wie Google Home-/Chromecast-Geräte, und werden daher automatisch erkannt.

- Um zu verhindern, dass sich der Adapter mit einem unerwünschten Gerät verbindet, stellen Sie seinen Zustand ein. `chromecast.0.<device>.enabled` Zu `false` Die
- Eine Liste mit zu ignorierenden Erkennungsvorgängen ist derzeit nicht verfügbar.

## Merkmale

- Geräte mit Multicast-DNS erkennen
  - Optional können im Admin-Bereich auf der Registerkarte „Geräte“ weitere manuell konfigurierte Geräte hinzugefügt werden.
- Erstelle ioBroker-Objekte für jedes gefundene Gerät
- Status-, Player-, Medien- und Metadatenkanäle
- Google Home-Geräte über den Adapter steuern
  - Lautstärke einstellen
  - Stummschalten/Stummschaltung aufheben
  - Sendung einstellen
  - Pause
  - Wiedergabe-URL (chromecast.0. `<your Google Home name>`.player.url2play)
    - getestet mit MP3
      - Die vollständige Liste der Formate [finden Sie hier](https://developers.google.com/cast/docs/media) .
    - Wenn die URL nicht mit http beginnt, gehen Sie davon aus, dass es sich um eine lokale Datei handelt.
      - Exportdatei über den ioBroker-Webserver: Sie wird in den Dateispeicher kopiert (`chromecast.0/<device id>/exportedMedia.mp3` und spielte von dort aus weiter.
    - Es spielt nur die erste Datei aus Wiedergabelistendateien wie .m3u ab.
- Widget „Cast-Player“ für [ioBroker.devices](https://github.com/ioBroker/ioBroker.devices) : Wiedergabe der vom Gerät wiedergegebenen Inhalte (Cover, Titel, Interpret oder die App) mit Wiedergabe-, Pause- und Stopp-Funktionen; Auswahl der Instanz und des Geräts in den Einstellungen.
- Webkomponente `<iob-chromecast-player>` für vis-2, Geräte, Aura und Admin: Was spielt mit Fortschritt, Wiedergabe/Pause, Stopp, vorheriger/nächster Titel, Lautstärke und Stummschaltung; Gerät auswählen (`chromecast.0.<device>`) in seinen Einstellungen
- Vis-Widget
  - HINWEIS: Erfordert [einen gepatchten Vis-Adapter](https://github.com/angelnu/ioBroker.vis) .
- Erste Unterstützung für Chromecast-Audiogruppen
  - Hinweis: Dies funktioniert nicht mit SSDP -> in den Adaptereinstellungen standardmäßig deaktivieren
- Den zuletzt wiedergegebenen Stream erneut abspielen: Einfach _chromecast.0 einstellen. `<your device>`.status.playing_ auf _true setzen_

## Nachrichten für Skripte und KI-Agenten

`sendTo('chromecast.0', 'help', {})` Antworten `{ help, commands }`: eine Beschreibung des Geräts, das eine URL oder eine Ankündigung abspielt, den Player steuert und anzeigt, was abgespielt wird, für KI-Agenten (z. B. ioBroker.pi-agent) und Skriptautoren. `commands` listet jede Nachricht auf, mit der die Instanz antwortet `write: true` für diejenigen, die etwas ändern (keiner tut das: außer `help` Es gibt nur `chromecast:getDevices`, in der die Geräte für die Einstellungen des Geräte-Widgets aufgelistet sind, und `getWebServerIps` Und `checkWebInstance` (das der Einstellungsdialog verwendet).

## Was fehlt?

- Füge eine Zustandsmaschine hinzu, um Zustände zu verfolgen: erkannt -> verbunden -> Player-Ladebildschirm -> Wiedergabe
- Wiederholungsversuche hinzufügen: Manchmal reagiert Google Home nicht auf eine Anfrage.
- weitere Tests

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
- (meistermopper) README: document how to disable unwanted Cast devices (e.g. HEOS) [#377]
- (GermanBluefox) `npm run build` builds the complete adapter now: TypeScript, the devices widget and the web component (#573)
- (GermanBluefox) Used adapter timers in the cast classes and added dependabot entries for src-devices/src-webcomponents [#569]

### 4.3.0 (2026-11-20)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (raintonr) Move castv2-player 'info' logging to 'debug' [#550]
- (bluefox) Added the message "help": a description of the states for AI agents (e.g. pi-agent), and common.supportedMessages.help
- (bluefox) The adapter was refactored to TypeScript and the settings dialog to JsonConfig
- (bluefox) Fixed: the adapter crashed when the connection closed after a YouTube video, and the ack of `url2play` for YouTube went to `undefined.player.url2play`
- (bluefox) Fixed: a disabled device can be enabled again, the acks of `enabled`, `status.playing` and `playlist.jump` are written to the device, and a device no longer reacts to the states of another device whose name starts with its name
- (bluefox) Fixed: `vis-2` is restarted after an update of the adapter (`restartAdapters` said `VIS-2`)
- (bluefox) Fixed: warning "Default value has to be stringified" for `playlist.list`; existing objects are corrected [#333]
- (bluefox) Fixed: endless status requests (hundreds of log lines per second, high CPU load) while an app plays that reports no playlist, e.g. Android TV apps [#241]; "not enabled" is logged only once per disabled device; no more "Cannot get status" after the start for devices that play nothing
- (bluefox) Fixed: local files can be played again ("is not an object of type meta", and the URL pointed to a folder that the web server does not know) [#323]
- (bluefox) README: what mDNS discovery needs (firewall, Docker, subnets) [#164]
- (bluefox) The library castv2-player (archived) is now part of the adapter, in TypeScript
- (bluefox) Fixed: "Error disconnecting - TypeError: Cannot read properties of null (reading 'socket')" when a device closes the connection [#474, #204, #377]; the player is detached only once
- (bluefox) Fixed: a disabled device connected again when its address changed; the adapter could crash when the address of a device changed
- (bluefox) Fixed: an M3U playlist with lines the parser does not understand (e.g. HLS `.m3u8`) crashed the adapter; HLS is now played as one stream
- (bluefox) Fixed: a radio stream in a playlist was downloaded until the adapter stopped; a redirect to a relative URL failed
- (bluefox) Fixed: every played URL left a listener behind (MaxListenersExceededWarning after 10 URLs, more memory and CPU)
- (bluefox) Fixed: `player.mute` was emptied on every volume change; a command that could not reconnect within 10 seconds logged the error `undefined`
- (bluefox) Fixed: writing `player.shuffleMode` switches shuffle on and off (it only logged "update not supported"), and `player.shuffleMode` shows the shuffle of the device
- (bluefox) Fixed: `player.state` was always 1 (play); it is 0 while paused and 2 while idle
- (bluefox) mime-types 3: without a content type from the server, `.aac` is played as `audio/aac` and `.wav` as `audio/wav`; `.mts`, `.m2ts` and `.m4b` are known now
- (bluefox) Fixed: titles of M3U playlists: `#EXTINF:-1,Radio Bob` showed "-1,Radio Bob"; attributes (`tvg-logo=…`) and lines like `#EXTVLCOPT` ended up in the title, and "Artist - Song - Remastered" was split at the last dash
- (bluefox) Fixed: an entry of a playlist without file extension (e.g. the URL of a radio station) showed its URL instead of the title of the playlist; without an artist in the playlist the artist is "--" (was "unknown")
- (bluefox) Fixed: the queue of a playlist keeps the order of the file (entries without file extension came last, in the order their servers answered)
- (bluefox) Added the widget "Cast player" for ioBroker.devices (what plays, play, pause, stop) and the web component `<iob-chromecast-player>` for vis-2, devices, Aura and admin

### 4.2.0 (2026-05-04)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Logging technical deatils reduced to debug level
- (mcm1957) Dependencies have been updated

### 4.1.1 (2026-02-16)
- (mcm1957) Linting has been updated to @iobroker/eslint-config

### 4.1.0 (2026-02-16)
- (mcm1957) Adapetr requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 4.0.0 (2024-10-09)
* (neopholus) Release 3.4.0 added support for devices located in adifferent subnet. This introduced a problem due to changing some state-ids reported at issue #274. This problem has been fixed. This might be considered a breaking change for some people. 
* (mcm1957) Testing for node.js 22.x has been added.
* (mcm1957) Several issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2022 Vegetto <iobroker@angelnu.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.