---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.eufy-security/README.md
title: ioBroker.eufy-Sicherheit
hash: cEwbuVh0ESWcs7RKS4gY8WFx0kUKseQ91JtyK5S1GIs=
---
![Logo](../../../en/adapterref/iobroker.eufy-security/admin/eufy-security.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.eufy-security.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.eufy-security.svg)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/eufy-security-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/eufy-security-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/bropat/iobroker.eufy-security.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/bropat/ioBroker.eufy-security/badge.svg)
![Build-Status](https://travis-ci.org/bropat/ioBroker.eufy-security.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/bropat/ioBroker.eufy-security?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.eufy-security.png?downloads=true)

# IoBroker.eufy-security
Dieser Adapter verwendet die Bibliothek [eufy-security-client](https://github.com/bropat/eufy-security-client), um mit Eufy-Geräten zu kommunizieren.

Wenn Sie meine Arbeit und meinen Fortschritt schätzen und mich unterstützen möchten, können Sie dies hier tun:

[![ko-fi] (https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E332Q6Z)

## Beschreibung
Mit diesem Adapter können Sie [Eufy Sicherheitsgeräte](https://us.eufylife.com/collections/security) steuern, indem Sie eine Verbindung zu den Eufy-Cloud-Servern und lokalen / Remote-Stationen herstellen.

Sie müssen Ihre Cloud-Anmeldeinformationen angeben. Der Adapter stellt eine Verbindung zu Ihrem Cloud-Konto her und fragt alle Gerätedaten über HTTPS ab. Jetzt wird auch eine lokale oder Remote-P2P-Verbindung zu den Eufy-Stationen / -Geräten unterstützt. Eine Verbindung zur Eufy Cloud ist jedoch immer Voraussetzung.

Eine Adapterinstanz zeigt alle Geräte eines Eufy Cloud-Kontos an und ermöglicht deren Steuerung.

## Eigenschaften
* Unterstützt die lokale und Remote-P2P-Verbindung zur Station
* Zwei-Faktor-Authentifizierung
* Livestream als HLS-Stream (unterstützt alle Plattformen, führt jedoch zu einer Latenz)
* Der letzte HLS-Live-Stream wird immer zur späteren Anzeige gespeichert
* Lädt das Ereignisvideo herunter, wenn eine Push-Benachrichtigung empfangen wird (asynchron).
* Nimmt ein JPEG-Miniaturbild des Livestreams oder des heruntergeladenen Videos auf
* Basisstation:
    * Zustände:
        * Konfigurierter Guard-Modus
        * Aktueller Guard-Modus
        * Name
        * Modell
        * Ordnungsnummer
        * Softwareversion
        * Hardware Version
        * MAC-Adresse
        * LAN-IP-Adresse
    * Aktionen:
        * Wachmodus ändern
        * Starten Sie die Station neu
    * Veranstaltungen:
        * Alarmmodusänderung
* Kamera:
    * Zustände:
        * Online / Offline etc.
        * Batterie %
        * Batterietemperatur
        * Name
        * Modell
        * Ordnungsnummer
        * Softwareversion
        * Hardware Version
        * MAC-Adresse
        * Wifi RSSI
        * Gefilterte falsche Ereignisse seit der letzten Aufladung
        * Gespeicherte / aufgezeichnete Ereignisse seit der letzten Aufladung
        * Gesamtzahl der Ereignisse seit der letzten Aufladung
        * Verwendete Tage seit der letzten Aufladung
    * Aktionen:
        * Livestream starten (hls; unterstützt auch lokalen Livestream)
        * Stoppen Sie den Livestream (hls)
        * Gerät aktivieren / deaktivieren
        * Aktivieren / Deaktivieren der automatischen Nachtsicht
        * LED aktivieren / deaktivieren (nur Produkte von Kamera 2, Innenkameras, Flutlichtkameras, Solokameras und Türklingeln)
        * Aktivieren / Deaktivieren der Diebstahlsicherung (nur Produkte von Kamera 2)
        * Aktivieren / Deaktivieren der Bewegungserkennung
        * Aktivieren / Deaktivieren der Haustiererkennung (nur Innenkameras)
        * Aktivieren / Deaktivieren der Tonerkennung (nur Innenkameras)
        * Aktivieren / Deaktivieren des RTSP-Streams (nur camera2-Produkte, Innenkameras und Solokameras)
        * Ändern Sie die Video-Wasserzeicheneinstellung
    * Veranstaltungen:
        * Bewegung erkannt
        * Person erkannt
        * Klingeln (nur Türklingel)
        * Weinen erkannt (nur Innenkameras)
        * Ton erkannt (nur Innenkameras)
        * Haustier erkannt (nur Innenkameras)
* Sensor
    * Eingangssensor:
        * Zustände:
            * Online / Offline etc.
            * Niedriger Batteriestatus
            * Name
            * Modell
            * Ordnungsnummer
            * Softwareversion
            * Hardware Version
        * Veranstaltungen:
            * Offen geschlossen
    * Bewegungssensor:
        * Zustände:
            * Online / Offline etc.
            * Niedriger Batteriestatus
            * Name
            * Modell
            * Ordnungsnummer
            * Softwareversion
            * Hardware Version
        * Veranstaltungen:
            * Bewegung erkannt
* Tastatur:
    * Zustände:
        * Online / Offline etc.
        * Niedriger Batteriestatus
        * Name
        * Modell
        * Ordnungsnummer
        * Softwareversion
        * Hardware Version
* Sperren:
    * Zustände:
        * Online / Offline etc.
        * Batterie %
        * Sperrstatus
        * Name
        * Modell
        * Ordnungsnummer
        * Softwareversion
        * Hardware Version
        * Wifi RSSI
    * Aktionen:
        * Schliessen aufmachen
* da kommt noch mehr...

## Aufbau
Siehe [Hier](./docs/en/README.md)

## Bekannte Arbeitsgeräte
* HomeBase (T8001)
* HomeBase E (T8002)
* HomeBase 2 (T8010)
* Smart Lock Wi-Fi Bridge (T8021)
* eufyCam (T8111)
* eufyCam E (T8112)
* eufyCam 2 (T8114)
* eufyCam 2C (T8113)
* eufyCam 2 Pro (T8140)
* eufyCam 2C Pro (T8141)
* Flutlicht (T8420)
* Kabelklingel 2k (T8200)
* Kabelklingel 1080p (T8201)
* Batterie Türklingel 2K (T8210)
* Batterie Türklingel 1080p (T8222)
* Eingangssensor (T8900)
* Bewegungssensor (T8910)
* Indoor Cam Pan & Tilt 2K (T8410)
* Innenkamera 2K (T8400)
* Indoor Cam Pan & Tilt 1080p (T8411)
* Innenkamera 1080p (T8401)
* Smart Lock Vordertür (T8500)

Wenn mehr Geräte funktionieren (oder auch nicht), melden Sie diese bitte, indem Sie ein GitHub-Problem öffnen.

## So melden Sie Probleme und Funktionsanforderungen
Bitte verwenden Sie dazu GitHub-Probleme.

Am besten stellen Sie den Adapter auf den Debug-Protokollmodus (Instanzen -> Expertenmodus -> Spaltenprotokollstufe oder siehe [Hier](https://github.com/bropat/ioBroker.eufy-security/wiki/Howto-enable-debug)). Dann holen Sie sich bitte die Protokolldatei von der Festplatte (Unterverzeichnis "log" im ioBroker-Installationsverzeichnis und nicht von Admin, da Admin die Zeilen abschneidet).

## Changelog

### 0.5.4 (2021-05-26)
* (bropat) Fixed issue with video corruption in p2p livestream
* (bropat) Updated versions of the package dependencies

### 0.5.3 (2021-05-14)
* (bropat) Fixed issue [#121](https://github.com/bropat/ioBroker.eufy-security/issues/121)
* (bropat) Fixed push notification for indoor and floodlight cams (issue [#130](https://github.com/bropat/ioBroker.eufy-security/issues/130))
* (bropat) Fixed refresh of properties/settings of standalone devices (issue [#130](https://github.com/bropat/ioBroker.eufy-security/issues/130))
* (bropat) Updated versions of the package dependencies

### 0.5.2 (2021-04-02)
* (bropat) Try to add support for FreeBSD - issue [#106](https://github.com/bropat/ioBroker.eufy-security/issues/106)
* (bropat) Updated package dependency ffmpeg-static for FreeBSD support

### 0.5.1 (2021-04-01)
* (bropat) Fixed issue [#105](https://github.com/bropat/ioBroker.eufy-security/issues/105)

### 0.5.0 (2021-03-30)
* (bropat) Added support for smart lock products
* (bropat) Added new P2P feature: lock/unlock smart lock products
* (bropat) Optimized speed of P2P connection establishment
* (bropat) New setting: P2P connection setup preference: local prefered, local only or quickest connection
* (bropat) Dropped support for NodeJS 10.x (min. requirement 12)
* (bropat) Updated versions of the package dependencies

### 0.4.3 (2021-03-19)
* (bropat) Code enhancements for publishing the adapter to the central repository
* (bropat) Updated versions of the package dependencies

### 0.4.2 (2021-03-14)
* (bropat) Fixed roles of states according to ioBroker documentation

### 0.4.1 (2021-03-14)
* (bropat) Removed legacy password encryption support for admin adapter (requires admin adapter >= 4.0.9)
* (bropat) Added admin adapter as global dependency
* (bropat) Updated license

### 0.4.0 (2021-03-11)
* (bropat) Added handling of adapter updates with breaking changes
* (bropat) Added new P2P feature: enable/disable pet detection for indoor cameras
* (bropat) Added new P2P feature: enable/disable sound detection for indoor cameras
* (bropat) Added new P2P feature: enable/disable led for wired doorbell
* (bropat) Unlocked state: last_event_video_url
* (bropat) Fixed parsing of push notification to download video events for battery doorbells and indoor cameras
* (bropat) Fixed enable/disable device (for wired doorbells, indoor cameras, floodlight camera and solo cameras)
* (bropat) Fixed enable/disable led (for battery doorbells, indoor cameras, floodlight camera and solo cameras)
* (bropat) Fixed enable/disable motion detection (for indoor cameras, floodlight camera and solo cameras)
* (bropat) Fixed change video watermark setting (for indoor cameras and floodlight camera)
* (bropat) Updated versions of the package dependencies

### 0.3.1 (2021-03-06)
* (bropat) Fixed regression on livestream with h265 codec

### 0.3.0 (2021-03-05)
* (bropat) Implemented feature request [#88](https://github.com/bropat/ioBroker.eufy-security/issues/88): Enable/disable motion detection for camera products
* (bropat) Implemented feature request [#81](https://github.com/bropat/ioBroker.eufy-security/issues/81): Enable/disable RTSP stream (added also RTSP stream url)
* (bropat) Implemented asynchronous download of event videos when receiving a push notification
* (bropat) Optimized ffmpeg implementation to only muxing video data to HLS
* (bropat) Optimized HLS livestream video start delay (10-15 sec.)
* (bropat) Fixed possible race condition with ffmpeg when using fallback to Eufy RTMP live stream
* (bropat) Fixed issue with livestream when p2p connection is lost
* (bropat) Updated versions of the package dependencies

### 0.2.5 (2021-02-20)
* (bropat) Fixed possible race condition that brokes sometime the livestream
* (bropat) Updated versions of the package dependencies

### 0.2.4 (2021-02-20)
* (bropat) Fixed issue [#86](https://github.com/bropat/ioBroker.eufy-security/issues/86)
* (bropat) Fixed not correctly identifying if the livestream is still active or not

### 0.2.3 (2021-02-17)
* (bropat) Fixed wired doorbell p2p livestream (should fix also indoor, floodlight and solo cameras)
* (bropat) Fixed issue that treats known push notifications as unknown
* (bropat) Fixed relative path for state last_event_pic_url
* (bropat) Updated versions of the package dependencies

### 0.2.2 (2021-02-16)
* (bropat) Fixed web extension settings for serving videos and pictures (issue [#79](https://github.com/bropat/ioBroker.eufy-security/issues/78))

### 0.2.1 (2021-02-15)
* (bropat) Fixed device_enable state
* (bropat) Fixed battery doorbell start livestream over p2p (issue [#78](https://github.com/bropat/ioBroker.eufy-security/issues/78))
* (bropat) Implemented fallback for failed P2P livestream to RTMP livestream

### 0.2.0 (2021-02-14)
* (bropat) Implemented P2P livestream over HLS
* (bropat) Last livestream is always saved and is still available later
* (bropat) Implemented device and station parameter refresh over P2P
* (bropat) Revised push notification implementation
* (bropat) Fixed issue [#71](https://github.com/bropat/ioBroker.eufy-security/issues/71) by implementing retry mechanism on HTTP error 404 (max. 5 retries with increasing delay) 
* (bropat) Fixed issue [#12](https://github.com/bropat/ioBroker.eufy-security/issues/12)
* (bropat) Eufy client library extracted as standalone library and adapters ported to new shared library: [eufy-security-client](https://www.npmjs.com/package/eufy-security-client)
* (bropat) Removed following states: last_captured_pic_url, last_captured_pic_html
* (bropat) Updated versions of the package dependencies

### 0.1.5 (2021-01-14)
* (bropat) Fixed issue [#50](https://github.com/bropat/ioBroker.eufy-security/issues/50) and [#53](https://github.com/bropat/ioBroker.eufy-security/issues/53)
* (bropat) Updated versions of the package dependencies

### 0.1.4 (2021-01-05)
* (bropat) Fixed: Accept only valid modes for station guard mode (for invalid mode, an error is logged)
* (bropat) Fixed reset of an event (motion, ringing, etc.)
* (bropat) Updated versions of the package dependencies

### 0.1.3 (2021-01-02)
* (bropat) Fixed issue [#37](https://github.com/bropat/ioBroker.eufy-security/issues/37) and [#41](https://github.com/bropat/ioBroker.eufy-security/issues/41)
* (bropat) Updated versions of the package dependencies

### 0.1.2 (2021-01-02)
* (bropat) Revised captured_pic_url state (renamed to last_captured_pic_url and added last_captured_pic_html)
* (bropat) Fixed p2p issue passing wrong user id (action_user_id instead of admin_user_id)
* (bropat) Revised push notification to properly support doorbell notifications
* (bropat) Updated versions of the package dependencies

### 0.1.1 (2020-12-29)
* (bropat) Fixed issue [#37](https://github.com/bropat/ioBroker.eufy-security/issues/37)
* (bropat) Fixed version numbering
* (bropat) Updated versions of the package dependencies

### 0.0.9 (2020-12-28)
* (bropat) Finished implementation for feature request: [#1](https://github.com/bropat/ioBroker.eufy-security/issues/1)
* (bropat) Little progress for feature request: [#5](https://github.com/bropat/ioBroker.eufy-security/issues/5)
* (bropat) Now supports also cloud P2P communication if local P2P comunication isn't possible
* (bropat) Implemented set Guard Mode with CMD_SET_PAYLOAD for certain devices
* (bropat) Added back USA ip addresses for P2P cloud discovery
* (bropat) Using the correct local time zone for communication with the Eufy Cloud
* (bropat) HUB filtering by device type 0 (station) removed
* (bropat) Added documentation for 2FA
* (bropat) Updated versions of the package dependencies

### 0.0.8 (2020-12-13)
* (bropat) Fixed issue [#16](https://github.com/bropat/ioBroker.eufy-security/issues/16)
* (bropat) P2P communication revisited
* (bropat) Added reconnect functionality for P2P communication
* (bropat) Added heartbeat for P2P communication
* (bropat) Added local caching of last event picture as image url or html image (removed old state: last_camera_url)
* (bropat) Updated versions of the package dependencies

### 0.0.7 (2020-12-08)
* (bropat) Fixed issue [#11](https://github.com/bropat/ioBroker.eufy-security/issues/11)

### 0.0.6 (2020-12-06)
* (bropat) Fixed issue [#13](https://github.com/bropat/ioBroker.eufy-security/issues/13)

### 0.0.5 (2020-12-05)
* (bropat) Added event states for camera (motion detected, person detected)
* (bropat) Added event states for entry sensor (open/closed)
* (bropat) Added event states for motion sensor (motion detected)
* (bropat) Added event states for doorbell (motion detected, person detected, ringing)
* (bropat) Added event states for indoor camera (motion detected, person detected, crying detected, sound detected, pet detected)
* (bropat) Added entry sensor state (online, offline, etc.)
* (bropat) Added entry sensor low battery
* (bropat) Added motion sensor state (online, offline, etc.)
* (bropat) Added motion sensor low battery
* (bropat) Added keypad state (online, offline, etc.)
* (bropat) Added keypad low battery

### 0.0.4 (2020-12-03)
* (bropat) Better exception handling
* (bropat) Fixed push token handling
* (bropat) Added push connection retry mechanism
* (bropat) Added camera state (online, offline, etc.)
* (bropat) Added camera wifi RSSI
* (bropat) Added camera total events since last charge
* (bropat) Added camera saved/recorded events since last charge
* (bropat) Added camera filtered false events since last charge
* (bropat) Added camera used days since last charge
* (bropat) Added camera battery temperature

### 0.0.3 (2020-11-21)
* (bropat) Fixed issue with push notification credentials initialization

### 0.0.2 (2020-11-21)
* (bropat) Added push notification support for event notification (raw notifications!)
* (bropat) Added 2FA (token renewal needs manual intervention)
* (bropat) Added P2P communication with station (event: Alarm mode change)
* (bropat) Added more device classes (sensors, locks, keypads) with no actions (at the moment! WIP!)
* (bropat) Added all eufy camera devices release to date
* (bropat) Added battery state to eufy cameras

### 0.0.1 (2020-10-04)
* (bropat) initial release

## License
MIT License

Copyright (c) 2021 bropat <patrick.broetto@gmail.com>

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