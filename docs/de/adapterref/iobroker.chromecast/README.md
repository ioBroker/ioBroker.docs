---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.chromecast/README.md
title: ioBroker.chromecast
hash: wIV2SeZmUT9IJE69VtHdhs04inO7BmdwX6XkaGqCbeY=
---
![Logo](../../../en/adapterref/iobroker.chromecast/admin/home.png)

![Anzahl der Installationen](http://iobroker.live/badges/chromecast-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.chromecast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.chromecast.svg)

# IoBroker.chromecast
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.chromecast/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/chromecast/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Ein Google Home-Adapter für ioBroker
Dieses Plugin ermöglicht die Erkennung von Google Home-Geräten mit Video- und/oder Audiofunktion. Für jedes erkannte Home-Gerät wird ein ioBroker-Gerät erstellt. Dieses Gerät zeigt den Gerätestatus an und ermöglicht das Senden einer neuen URL zur Übertragung.

Bauen Sie auf den folgenden Projekten auf:

* [ioBroker](http://www.iobroker.net)
* [node-castv2-client](https://github.com/thibauts/node-castv2-client) als Home-Clientbibliothek.

## Anweisungen
1. Installieren Sie diesen Adapter in ioBroker.
2. (optional) Wenn Sie lokale Dateien streamen möchten oder sich Ihre Chromecast-Geräte in einem anderen Subnetz befinden, müssen Sie den Adapter konfigurieren.
* Sie benötigen eine ioBroker-Webserverinstanz, um lokale Dateien zu streamen.
Sie müssen die Informationen (Name, IP-Adresse, Port, Anzeigentyp) für jedes Gerät, das sich in einem anderen Subnetz als Ihr ioBroker-Server befindet, manuell hinzufügen. Wenn die Namen mit den Namen der automatisch gefundenen Geräte übereinstimmen sollen, verwenden Sie die MAC-Adresse als Namen. Sie können einen beliebigen Namen wählen. Achten Sie darauf, dass jeder Name eindeutig ist! Um Probleme zu vermeiden, dürfen Namen nur Großbuchstaben (A–Z), Kleinbuchstaben (a–z), Ziffern (0–9), Minuszeichen (-) und Unterstriche (_) enthalten.
3. Überprüfen Sie Ihr Protokoll: Dort sollten Sie Protokolleinträge zu den erkannten Geräten finden.
4. Geben Sie eine URL wie [http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3](http://edge.live.mp3.mdn.newmedia.nacamar.net/ps-dieneue_rock/livestream_hi.mp3) in chromecast.0.`<Ihr Chromecast-Name>`.player.url2play ein.
5. Die URL sollte nun auf Ihrem Gerät abgespielt werden.

## Merkmale
* Geräte mit Multicast-DNS erkennen
* Optional können im Admin-Bereich auf der Registerkarte „Geräte“ weitere manuell konfigurierte Geräte hinzugefügt werden.
* Erstellen Sie ioBroker-Objekte für jedes gefundene Gerät
* Status-, Player-, Medien- und Metadatenkanäle
* Google Home-Gerät über den Adapter steuern
* Lautstärke einstellen
* Stummschalten/Stummschaltung aufheben
* Sendung einstellen
* Pause
* Wiedergabe-URL (chromecast.0.`<Ihr Google Home-Name>`.player.url2play)
* getestet mit MP3
* Vollständige Liste der Formate [hier](https://developers.google.com/cast/docs/media).
* Wenn die URL nicht mit http beginnt, gehen Sie davon aus, dass es sich um eine lokale Datei handelt.
* Datei über den ioBroker-Webserver exportieren
* Es spielt nur die erste Datei aus Wiedergabelistendateien wie .m3u ab.
* Vis-Widget
* HINWEIS: Erfordert [gepatchten Vis-Adapter](https://github.com/angelnu/ioBroker.vis).
* Erste Unterstützung für Chromecast-Audiogruppen
* Hinweis: Dies funktioniert nicht mit SSDP -> in den Adaptereinstellungen standardmäßig deaktivieren
* Den zuletzt wiedergegebenen Stream erneut abspielen: Setzen Sie einfach _chromecast.0.`<Ihr Gerät>`.status.playing_ auf _true_.

## Was fehlt?
* Zustandsautomat zur Statusverfolgung hinzufügen: erkannt -> verbunden -> Player-Ladebildschirm -> Wiedergabe
* Wiederholungsversuche hinzufügen: Manchmal reagiert Google Home nicht auf eine Anfrage.
* weitere Tests

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Logging technical deatils reduced to debug level

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

### 3.4.0 (2024-04-13)
* (neopholus) Support for devices located in different subnets has been added. [#154, #160]
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