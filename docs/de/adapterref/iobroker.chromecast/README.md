---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.chromecast/README.md
title: ioBroker.chromecast
hash: hNhxuqqE8fbmTaOUucEB3d5swRihcwAX07Ew3F/fnA4=
---
![Logo](../../../en/adapterref/iobroker.chromecast/admin/home.png)

![Anzahl der Installationen](http://iobroker.live/badges/chromecast-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.chromecast.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.chromecast/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/chromecast/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.chromecast.svg)

# ioBroker.chromecast

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
4. Schreiben Sie eine URL wie <http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3> auf den chromecast.0.`<your chromecast name>` .player.url2play
5. Die URL sollte nun auf Ihrem Gerät abgespielt werden.

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
  - Wiedergabe-URL (chromecast.0.`<your Google Home name>` .player.url2play)
    - getestet mit MP3
      - Die vollständige Liste der Formate [finden Sie hier](https://developers.google.com/cast/docs/media) .
    - Wenn die URL nicht mit http beginnt, gehen Sie davon aus, dass es sich um eine lokale Datei handelt.
      - Datei über den ioBroker-Webserver exportieren
    - Es spielt nur die erste Datei aus Wiedergabelistendateien wie .m3u ab.
- Vis-Widget
  - HINWEIS: Erfordert [einen gepatchten Vis-Adapter](https://github.com/angelnu/ioBroker.vis) .
- Erste Unterstützung für Chromecast-Audiogruppen
  - Hinweis: Dies funktioniert nicht mit SSDP -> in den Adaptereinstellungen standardmäßig deaktivieren
- Den zuletzt wiedergegebenen Stream erneut abspielen: Einfach _chromecast.0 einstellen.`<your device>` .status.playing_ auf _true setzen_

## Was fehlt?

- Füge eine Zustandsmaschine hinzu, um Zustände zu verfolgen: erkannt -> verbunden -> Player-Ladebildschirm -> Wiedergabe
- Wiederholungsversuche hinzufügen: Manchmal reagiert Google Home nicht auf eine Anfrage.
- weitere Tests

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

## Changelog
### 4.2.0 (2026-05-04)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Logging technical deatils reduced to debug level
- (mcm1957) Dependencies have been updated
-

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

### 3.4.1 (2024-07-02)
* (foxriver76) migrated binary state to file

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.chromecast/blob/master/CHANGELOG_OLD.md)

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