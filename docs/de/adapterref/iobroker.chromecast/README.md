---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.chromecast/README.md
title: ioBroker.chromecast
hash: Gy4OlsyXmVeAn2b1RDd6DJ7zM/aavhqL990dY2gwuoU=
---
![Logo](../../../en/adapterref/iobroker.chromecast/admin/home.png)

![Anzahl der Installationen](http://iobroker.live/badges/chromecast-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.chromecast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.chromecast.svg)

# IoBroker.chromecast
![Testen und Freigeben](https://github.com/iobroker-community-adapters/iobroker.chromecast/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/chromecast/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Ein Google Home-Adapter für ioBroker
Dieses Plugin ermöglicht die Erkennung von Video- und/oder Audio-Google-Home-Geräten. Für jedes erkannte Home-Gerät wird ein ioBroker-Gerät erstellt. Dieses Gerät zeigt den Status des Geräts an und ermöglicht die Übermittlung einer neuen URL zum Casten.

Bauen Sie auf den folgenden Projekten auf:

* [ioBroker](http://www.iobroker.net)
* [node-castv2-client](https://github.com/thibauts/node-castv2-client) als Home-Client-Bibliothek.

## Treten Sie dem Discord-Server bei, um alles zur ioBroker-Integration zu besprechen!
<a href="https://discord.gg/4EBGwBE"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## Anweisungen
1. Installieren Sie diesen Adapter in ioBroker
2. (optional) Wenn Sie vorhaben, lokale Dateien zu streamen oder wenn sich Ihre Chromecast-Geräte in einem anderen Subnetz befinden, müssen Sie den Adapter konfigurieren
* Sie benötigen eine ioBroker-Webserverinstanz, um lokale Dateien zu streamen
* Sie müssen für jedes Gerät, das sich in einem anderen Subnetz als Ihr ioBroker-Server befindet, manuell Informationen (Name, IP, Port, Anzeigentyp) hinzufügen. Wenn Sie möchten, dass die Namen den Namen der automatisch gefundenen Geräte entsprechen, verwenden Sie die MAC-Adresse als Namen. Sie können jeden beliebigen Namen definieren. Stellen Sie sicher, dass jeder Name eindeutig ist! Um Probleme zu vermeiden, sollten Namen nur Großbuchstaben A-Z, Kleinbuchstaben a-z, Ziffern 0-9, - (Minus) und _ (Unterstrich) enthalten.
3. Überprüfen Sie Ihr Protokoll: Sie sollten Protokolle über die erkannten Geräte sehen
4. Schreiben Sie eine URL wie [http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3](http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3) in chromecast.0.`<Ihr Chromecast-Name>`.player.url2play
5. Die URL sollte auf Ihrem Gerät abgespielt werden

## Merkmale
* Geräte mit Multicast-DNS erkennen
* Optional können Sie im Admin-Bereich unter der Registerkarte „Geräte“ weitere manuell konfigurierte Geräte hinzufügen.
* ioBroker-Objekte für jedes gefundene Gerät erstellen
* Status-, Player-, Medien- und Metadatenkanäle
* Google Home-Gerät über den Adapter steuern
* Lautstärke einstellen
* Stummschalten/Stummschaltung aufheben
* Sendung beenden
  * Pause
* Wiedergabe-URL (chromecast.0.`<Ihr Google Home-Name>`.player.url2play)
* getestet mit MP3
* Vollständige Liste der Formate [hier](https://developers.google.com/cast/docs/media).
* Wenn die URL nicht mit http beginnt, dann gehen Sie davon aus, dass es sich um eine lokale Datei handelt
* Datei über ioBroker-Webserver exportieren
* Es wird nur die erste Datei aus Wiedergabelistendateien wie .m3u abgespielt.
* Vis-Widget
* HINWEIS: erfordert [gepatchten Vis-Adapter](https://github.com/angelnu/ioBroker.vis).
* Erste Unterstützung für Chromecast-Audiogruppen
* Hinweis: dies funktioniert nicht mit SSDP -> standardmäßig in den Adaptereinstellungen deaktivieren
* Zuletzt abgespielten Stream erneut abspielen: Setzen Sie einfach _chromecast.0.`<Ihr Gerät>`.status.playing_ auf _true_

## Was fehlt?
* Zustandsmaschine hinzufügen, um Zustände zu verfolgen: erkannt -> verbunden -> Player-Loader -> Wiedergabe
* Wiederholungsversuche hinzufügen: Manchmal reagiert Google Home nicht auf eine Anfrage
* mehr Tests

## Changelog
<!--
    ### **WORK IN PROGRESS**
    - (neopholus) Breaking change: Bugfix for ([#154](https://github.com/iobroker-community-adapters/ioBroker.chromecast/issues/154)) and ([#160](https://github.com/iobroker-community-adapters/ioBroker.chromecast/issues/160)): manually configured devices in admin pannel (devices tab) are created correctly again (broke with 3.0.3) using the name defined in the admin panel, tab "devices".
-->
### 3.4.0 (2024-04-13)
* (neopholus) Support for devices located in different subnets has been added. [#154, #160]
* (mcm1957) Dependencies have been updated

### 3.3.0 (2024-04-07)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 3.2.0 (2024-01-22)
- (mcm1957) changed: Testing has been updated to use node.js 16/18/20
- (mcm1957) changed: Dependencies have been updated
* (raintonr) YouTube videos are allowed now ([#75](https://github.com/iobroker-community-adapters/ioBroker.chromecast/issues/75))
* (raintonr) AppId has been added to status ([#151](https://github.com/iobroker-community-adapters/ioBroker.chromecast/issues/151))
* (raintonr) Storing of webserver settings has been corrected if web instance listens on only one address ([#145](https://github.com/iobroker-community-adapters/ioBroker.chromecast/issues/145))

### 3.1.0 (2022-11-12)
* (bluefox) Refactoring done
* (bluefox) Removed dependency with nettools
* (bluefox) Added support of web port other than 8082

### 3.0.3 (2022-08-26)
* (jey cee) Breaking change: Object IDs are now mac addresses instead names
* (Bjoern3003) set album name as song if provided in icy-nlicame
* (Apollon77/aortmannm) Make compatible with Node.js 16+
* (Apollon77) Add Sentry for crash reporting

### 2.3.1 (2019-10-23)
* (angelnu) Tested compact mode works in Linux and Windows

### 2.2.3 (2019-03-19)
* news

### 2.2.2 (2019-02-01)
* Fix missing reference when mDNS update is received

### 2.2.1 (2019-01-29)
* Remove mandatory dependency on vis adapter

### 2.2.0 (2019-01-15)
* Option to configure device URLs manually (when devices are in a different subnetwork)

### 2.1.5 (2019-01-14)
* Reconnect on mDNS updates

### 2.0.2 (2019-01-06)
* (angelnu) compact mode support

### 2.0.0 (2018-07-22)
* (bluefox) refactoring and add new states for material

### 1.4.3 (2018-04-03)
* Added enabled flag so some adapters can be ignored

### 1.4.2 (2018-01-30)
* Always use volume parameter for announcements

### 1.4.1 (2018-01-06)
* Fix for languages in io-package

### 1.4.0 (2017.11.26)
* (angelnu) Support for additional languages
* (angelnu) Support for version 3 of the Admin adapter

### 1.3.4 (2017.11.26)
* (angelnu) Update to latest cast2-player - wait for announcement

### 1.3.4 (2017.11.25)
* (angelnu) Rename to Google Home

### 1.3.3 (2017.11.24)
* (bluefox) bump a version

### 1.3.2
* (Vegetto) recognize uncompleted playlist status and trigger a new getStatus

### 1.3.1
* (Vegetto) Fix updateStates to accept null values
* (Vegetto) Add playlist currentItemdId

### 1.3.0
* (Vegetto) Create playlist channel with raw playlist and repeat modes
* (Vegetto) Moved jump and repeatMode from player to plalist channel

### 1.2.2
* (Vegetto) Forgot to step up version.

### 1.2.2
* (Vegetto) Update to player 1.1.3 - support relative paths in playlists

### 1.2.1
* (Vegetto) Update to player 1.1.2 - reconnect on url2play

### 1.2.0
* (Vegetto) Mayor rework
  * Chromecast player and scanner splitted into a separated module
  * **Support for playlists**
  * Improved MIME detection - **OGG files work now**
  * Support for **announcements** - playlist resume after completing announcement
  * Support to **jump** between playlist entries

### 1.1.3
* (Vegetto) bugfix - media title was not kept to url when streamTitle not present

### 1.1.2
* (Vegetto) Update npm dependencies in package.json to latest versions

### 1.1.1
* (Vegetto) bugfix - not playing when another chromecast playing same url
* (Vegetto) added additional logs

### 1.1.0
* (Vegetto) **Added support for playlist m3u, asx and pls files - play first entry**

### 1.0.9
* (Vegetto) Do not use this in callbacks. Replaced with _that_
* (Vegetto) Fix contentId not being updated. This was breaking the _play last stream_ feature

### 1.0.8
* (Vegetto) Do not try to stop if not playing

### 1.0.7
* (Vegetto) Show MultizoneLeader as playing
* (Vegetto) Set pause state to false when modified and device is not playing

### 1.0.6
* (Vegetto) Fix widget crashing when devId is not set

### 1.0.2
* (Vegetto) Fix deprecation warning - use dns-txt instead of mdns-txt

### 1.0.1
* (Vegetto) Fix exception

### 1.0.0
* (Vegetto) **Try to play last played URL when setting playing state to true**
* (Vegetto) Fix jshint and jscs findings

### 0.2.1
* (Vegetto) Update readme
* (Vegetto) Integrated into iobroker: listed there

### 0.2.0
* (Vegetto) Add vis widget (Alpha)
* (Vegetto) Performance improvements

### 0.1.4
* (Vegetto) Stability fixes - error handling, race-condition fixes, etc
* (Vegetto) Clean getMediaInfo handler when disconnecting player
* (Vegetto) Added support to retrieve ICY metadata from https sources
* (Vegetto) Moved code for querying media info to a separate class
* (Vegetto) **Support dynamic IP/port changes (audio groups)**

### 0.1.3
* (Vegetto) Added re-connection with retries. Will try for up 42 hours.
* (Vegetto) Support for triggering a reconnection by writing to <device>.status.connected
* (Vegetto) Fixed race condition when playing local file
* (Vegetto) **Added support for playing local files**
* (Bluefox) Russian translations
* (Vegetto) Update stale metadata when not present in player status
* (Vegetto) **Initial support for audio groups**
* (Vegetto) **Retrieve media type and title from URLs that support ICY**
* (Vegetto) Added displayName, isActiveInput and isStandBy status

### 0.1.2
* (Vegetto) Merge base

### 0.1.1
* (Vegetto) Fix package syntax
* (Vegetto) Fix package dependencies

### 0.1.0
* (Vegetto) Initial release

## License
The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
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