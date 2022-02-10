---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.eusec/README.md
title: ioBroker.euSec
hash: cGFfbIQvnW4jEq5y0QnYfSvmS8lzNditO9yrExlTZY0=
---
![Logo](../../../en/adapterref/iobroker.eusec/docs/_media/ioBroker.euSec.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.eusec.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.eusec.svg)
![Knotenversionsanforderung](https://img.shields.io/node/v/iobroker.eusec)
![Anzahl der Installationen (neueste)](https://iobroker.live/badges/eusec-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/eusec-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.eusec)
![Bekannte Schwachstellen](https://snyk.io/test/github/bropat/ioBroker.eusec/badge.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/bropat/ioBroker.eusec?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.eusec.png?downloads=true)
![Spenden](https://img.shields.io/badge/Donate-PayPal-blue.svg)

# IoBroker.euSec
**Tests:** ![Testen und freigeben](https://github.com/bropat/ioBroker.eusec/workflows/Test%20and%20Release/badge.svg)

Dies ist eine [ioBroker](https://www.iobroker.net) Adapter, der den [eufy-security-client](https://github.com/bropat/eufy-security-client) Bibliothek zur Kommunikation mit Eufy-Geräten.

Wenn Sie meine Arbeit und Fortschritte schätzen und mich unterstützen möchten, können Sie dies hier tun:

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E332Q6Z)

**Dieses Projekt ist nicht mit Anker und Eufy (Eufy Security) verbunden. Es ist ein persönliches Projekt, das in der Freizeit gepflegt wird.**

## Beschreibung
Dieser Adapter ermöglicht die Steuerung von [Eufy Sicherheitsgeräte](https://us.eufylife.com/collections/security) durch Verbindung mit den Eufy-Cloud-Servern und lokalen/entfernten Stationen.

Sie müssen Ihre Cloud-Anmeldedaten angeben. Der Adapter verbindet sich mit Ihrem Cloud-Konto und fragt alle Gerätedaten über HTTPS ab. Jetzt wird auch eine lokale oder entfernte P2P-Verbindung zu den Eufy-Stationen/Geräten unterstützt. Voraussetzung ist jedoch immer eine Anbindung an die Eufy Cloud.

Eine Adapterinstanz zeigt alle Geräte eines Eufy Cloud-Kontos und ermöglicht deren Steuerung.

## Merkmale
* Unterstützt lokale und Remote-P2P-Verbindungen zur Station
* Zwei-Faktor-Authentifizierung
* Livestream als HLS-Stream (unterstützt alle Plattformen, führt aber zu einer Latenz)
* Der letzte HLS-Livestream wird immer zur späteren Anzeige gespeichert
* Lädt Ereignisvideo herunter, wenn Push-Benachrichtigung empfangen wird (asynchron)
* Nimmt eine JPEG-Miniaturansicht des Livestreams oder heruntergeladenen Videos
* Basisstation:
  * Zustände:
    * Konfigurierter Guard-Modus
    * Aktueller Guard-Modus
    * Name
    * Modell
    * Seriennummer
    * Softwareversion
    * Hardware Version
    * MAC-Adresse
    * LAN-IP-Adresse
  * Aktionen:
    * Wachmodus ändern
    * Alarmton auslösen
    * Alarmton zurücksetzen
    * Station neu starten
  * Veranstaltungen:
    * Änderung des Alarmmodus
* Kamera:
  * Zustände:
    * Online / Offline usw.
    * Batterie %
    * Batterietemperatur
    * Name
    * Modell
    * Seriennummer
    * Softwareversion
    * Hardware Version
    * MAC-Adresse
    * WLAN-RSSI
    * Gefilterte falsche Ereignisse seit der letzten Ladung
    * Gespeicherte/aufgezeichnete Ereignisse seit dem letzten Aufladen
    * Gesamtzahl der Ereignisse seit der letzten Aufladung
    * Nutzungstage seit der letzten Aufladung
    * Und vieles mehr...
  * Aktionen:
    * Livestream starten (hls; unterstützt auch lokalen Livestream)
    * Livestream stoppen (hls)
    * Gerät aktivieren/deaktivieren
    * Automatische Nachtsicht aktivieren/deaktivieren
    * LED aktivieren/deaktivieren (nur Kamera 2 Produkte, Innenkameras, Flutlichtkamera, Einzelkameras und Türklingeln)
    * Diebstahlerkennung aktivieren/deaktivieren (nur Kamera 2 Produkte)
    * Bewegungserkennung aktivieren/deaktivieren
    * Tiererkennung aktivieren/deaktivieren (nur Innenkameras)
    * Tonerkennung aktivieren/deaktivieren (nur Innenkameras)
    * RTSP-Stream aktivieren/deaktivieren (nur Kamera2-Produkte, Innenkameras und Einzelkameras)
    * Ändern Sie die Video-Wasserzeicheneinstellung
    * Und vieles mehr...
  * Veranstaltungen:
    * Bewegung erkannt
    * Person erkannt
    * Klingeln (nur Türklingel)
    * Weinen erkannt (nur Innenkameras)
    * Ton erkannt (nur Innenkameras)
    * Haustier erkannt (nur Innenkameras)
* Sensoren:
  * Eintrittssensor:
    * Zustände:
      * Online / Offline usw.
      * Niedriger Batteriestatus
      * Name
      * Modell
      * Seriennummer
      * Softwareversion
      * Hardware Version
    * Veranstaltungen:
      * Offen geschlossen
  * Bewegungssensor:
    * Zustände:
      * Online / Offline usw.
      * Niedriger Batteriestatus
      * Name
      * Modell
      * Seriennummer
      * Softwareversion
      * Hardware Version
    * Veranstaltungen:
      * Bewegung erkannt
* Tastatur:
  * Zustände:
    * Online / Offline usw.
    * Niedriger Batteriestatus
    * Name
    * Modell
    * Seriennummer
    * Softwareversion
    * Hardware Version
* Sperren:
  * Zustände:
    * Online / Offline usw.
    * Batterie %
    * Sperrstatus
    * Name
    * Modell
    * Seriennummer
    * Softwareversion
    * Hardware Version
    * WLAN-RSSI
  * Aktionen:
    * Verriegeln Entriegeln
* da kommt noch mehr...

## Dokumentation
Siehe [Hier](https://bropat.github.io/ioBroker.eusec/)

## Bekannte funktionierende Geräte
Informationen zu unterstützten Geräten finden Sie in [Hier](https://github.com/bropat/eufy-security-client#known-working-devices).

## So melden Sie Probleme und Funktionsanfragen
Bitte verwenden Sie hierfür GitHub-Issues.

Am besten stellen Sie den Adapter in den Debug-Log-Modus (siehe [Hier](https://bropat.github.io/ioBroker.eusec/#/debugging)). Dann holen Sie sich bitte die Logdatei von der Festplatte (Unterverzeichnis "log" im ioBroker-Installationsverzeichnis und nicht vom Admin, da der Admin die Zeilen kürzt).

## Changelog

### 0.8.4 (2022-02-08)

* (bropat) Fixed regression in authentication flow
* (bropat) Fixed issue #228
* (bropat) Updated version of the package eufy-security-client (1.6.5)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.6.5)

### 0.8.3 (2022-02-07)

* (bropat) Updated version of the package eufy-security-client (1.6.4)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.6.4)
* (bropat) Fixed issue #222
* (bropat) Fixed issue #224
* (bropat) Fixed issue #225

**Note:** Selecting the correct country in ioBroker is essential for the devices to be found (should match the setting in the Eufy app).

### 0.8.2 (2022-02-06)

* (bropat) Renamed Adapter to ioBroker.euSec
* (bropat) Updated version of the package eufy-security-client (1.6.3)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.6.3)
* (bropat) Fixed issue #221

### 0.8.1 (2022-02-05)

* (bropat) Fixed MQTT connection issue (error: 5; #219)
* (bropat) Updated version of the package eufy-security-client (1.6.2)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.6.2)

### 0.8.0 (2022-02-05)

* (bropat) Added support for Smart Lock Touch & Wifi (T8520; #138)
* (bropat) Added option to enable/disable "Automatically download video" (#180; #203)
* (bropat) Added new state to retrieve received captcha in HTML format "received_captcha_html" (#210)
* (bropat) Updated version of the package eufy-security-client (1.6.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.6.1)
* (bropat) Updated versions of the package dependencies
* (bropat) Fixed issue #199
* (bropat) Fixed issue #217
* (bropat) Some other small bugfixes

### 0.7.5 (2021-12-05)

* (bropat) Fixed issue #195
* (bropat) Fixed issue #202

### 0.7.4 (2021-11-22)

* (bropat) Implemented captcha authentication mechanism (API v2)
* (bropat) Updated version of the package eufy-security-client (1.4.0)

### 0.7.3 (2021-11-20)

* (bropat) Implemented new encrypted authentication mechanism (API v2)
* (bropat) Dropped old plaintext authentication mechanism (API v1)
* (bropat) Fixed issue #191
* (bropat) Updated version of the package eufy-security-client (1.3.0)

**Note:** If you have 2FA enabled, you will need to authenticate again after this update.

### 0.7.2 (2021-11-16)

* (bropat) Updated version of the package eufy-security-client (1.2.3)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.2.3)
* (bropat) Changed ioBroker.admin dependency to ">=4.0.10"
* (bropat) Updated versions of the package dependencies

### 0.7.1 (2021-10-23)

* (bropat) Updated version of the package eufy-security-client (1.2.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (1.2.1)

### 0.7.0 (2021-10-17)

* (bropat) Added support for Floodlight T8422
* (bropat) Added support for SoloCam E40 (T8131)
* (bropat) Added new properties for solo cameras: battery, batteryTemperature, wifiSignalLevel, state, chargingStatus, lastChargingDays, lastChargingRecordedEvents, lastChargingTotalEvents, batteryUsageLastWeek
* (bropat) Fixed issue #169
* (bropat) Fixed issue #167
* (bropat) Fixed issue #151
* (bropat) Fixed push notifications for solo cameras (motion and person detection)
* (bropat) Updated version of the package eufy-security-client (1.2.0)
* (bropat) Updated versions of the package dependencies
* (bropat) Further details can be found in the changelog of eufy-security-client (1.2.0)

### 0.6.2 (2021-08-19)

* (bropat) Updated version of the package eufy-security-client (1.1.2)

### 0.6.1 (2021-08-19)

* (bropat) Fixed issue in the function responsible for the version upgrade (non-updatable states; issue #159)
* (bropat) Tried to fix issue #157 and issue #140

### 0.6.0 (2021-08-13)

* (bropat) **Breaking Changes** Switched to the new managed driver class - All states will be dropped and recreated (Note: some states where renamed)
* (bropat) Supports Admin 5
* (bropat) Added new adapter setting "Accept incoming invitations" to automatically accept device invitations
* (bropat) Added new adapter setting "Alarm sound duration (sec)" used for triggering alarm sound on supported devices/stations ([#76](https://github.com/bropat/ioBroker.euSec/issues/76))
* (bropat) Added enable/disable led setting for camera 1 products
* (bropat) Added motion detection sensitivity setting for camera 1 products and wired doorbell
* (bropat) Added motion detection type setting for camera 1 products
* (bropat) Added motion audio recording setting for camera 1 products and wired doorbell
* (bropat) Added ringtone volume setting for wired doorbell
* (bropat) Added enable/disable indoor chime setting for wired doorbell ([#100](https://github.com/bropat/ioBroker.euSec/issues/100))
* (bropat) Added notification ring setting for wired doorbell
* (bropat) Added notification motion setting for wired doorbell
* (bropat) Added video streaming quality setting for wired doorbell
* (bropat) Added video recording quality setting for wired doorbell
* (bropat) Added video HDR setting for wired doorbell
* (bropat) Added video distortion correction setting for wired doorbell
* (bropat) Added video ring recording setting for wired doorbell
* (bropat) Added notification type setting for camera 1 products, solo cameras and wired doorbell
* (bropat) Added chirp volume setting for entry sensor
* (bropat) Added chirp tone setting for entry sensor
* (bropat) Added pan an tilt functionality to supported indoor cameras ([#129](https://github.com/bropat/ioBroker.euSec/issues/129))
* (bropat) Added error detection if stopping or starting stream that isn't running or already running
* (bropat) Added new setting "acceptInvitations" to "EufySecurity" to accept invitations automatically
* (bropat) Added floodlight camera light switch ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added motion detection sensitivity for indoor cameras, solo cameras, floodlight cameras, camera 2 products and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added motion detection type for indoor cameras, solo cameras, floodlight cameras, camera 2 products and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added motion tracking for indoor camera pan & tilt cameras
* (bropat) Added video stream quality setting for indoor cameras, solo cameras, floodlight cameras and battery doorbell ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added video recording quality setting for indoor cameras
* (bropat) Added WDR setting for battery doorbells
* (bropat) Added microphone mute setting for indoor cameras, solo cameras, floodlight cameras, camera 2 products and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added audio recording setting for indoor cameras, solo cameras, floodlight cameras, camera 2 products and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added enable/disable speaker setting for indoor cameras, solo cameras, floodlight cameras, camera 2 products ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added speaker volume setting for indoor cameras, solo cameras, floodlight cameras, camera 2 products and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added power source setting for camera 2 products cameras, eufy cameras and eufy E cameras
* (bropat) Added power working mode setting for solo cameras, camera 2 products, battery doorbells, eufy cameras and eufy E cameras
* (bropat) Added power custom working mode recording clip length setting for solo cameras, floodlight cameras, camera 2 products, battery doorbells, eufy cameras and eufy E cameras ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added power custom working mode recording retrigger interval setting for solo cameras, floodlight cameras, camera 2 products, battery doorbells, eufy cameras and eufy E cameras ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added power custom working mode recording ends if motion stops setting for solo cameras, floodlight cameras, camera 2 products, battery doorbells, eufy cameras and eufy E cameras ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added video streaming quality setting for indoor cameras, solo cameras, floodlight cameras, 2c pro cameras and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added video recording quality setting for indoor 2k cameras and 2c pro cameras
* (bropat) Added motion detection sensitivity setting for indoor cameras, floodlight cameras and camera 2 products ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added enable/disable motion tracking setting for indoor pan & tilt cameras
* (bropat) Added motion detection type setting for indoor cameras, solo cameras, floodlight cameras, camera 2 products and battery doorbells ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added enable/disable WDR setting for battery doorbells
* (bropat) Added ringtone volume setting for battery doorbells
* (bropat) Added enable/disable chime indoor setting for battery doorbells ([#100](https://github.com/bropat/ioBroker.euSec/issues/100))
* (bropat) Added enable/disable chime homebase setting for battery doorbells ([#100](https://github.com/bropat/ioBroker.euSec/issues/100))
* (bropat) Added chime homebase ringtone volume setting for battery doorbells
* (bropat) Added chime homebase ringtone type setting for battery doorbells
* (bropat) Added notification type setting for solo cameras, floodlight cameras, camera 2 products, battery doorbells, eufy cameras and eufy E cameras ([#133](https://github.com/bropat/ioBroker.euSec/issues/133))
* (bropat) Added enable/disable person notification setting for indoor cameras
* (bropat) Added enable/disable pet notification setting for indoor cameras
* (bropat) Added enable/disable all other motion notification setting for indoor cameras
* (bropat) Added enable/disable all sound notification setting for indoor cameras
* (bropat) Added enable/disable crying notification setting for indoor cameras
* (bropat) Added enable/disable motion notification setting for battery doorbells
* (bropat) Added enable/disable ring notification setting for battery doorbells
* (bropat) Added trigger alarm sound for camera 2 products, indoor cameras, solo cameras (incl. new) and floodlight cameras ([#76](https://github.com/bropat/ioBroker.euSec/issues/76))
* (bropat) Added reset alarm sound for camera 2 products, indoor cameras, solo cameras (incl. new) and floodlight cameras ([#76](https://github.com/bropat/ioBroker.euSec/issues/76))
* (bropat) Added trigger alarm sound for homebase 1+2 ([#76](https://github.com/bropat/ioBroker.euSec/issues/76))
* (bropat) Added reset alarm sound for homebase 1+2 ([#76](https://github.com/bropat/ioBroker.euSec/issues/76))
* (bropat) Added alarm tone setting for homebase 1+2
* (bropat) Added alarm volume setting for homebase 1+2
* (bropat) Added prompt volume setting for homebase 1+2
* (bropat) Added time format setting for homebase 1+2
* (bropat) Added enable/disable switch mode app notification setting for homebase 1+2
* (bropat) Added enable/disable switch mode geofence notification setting for homebase 1+2
* (bropat) Added enable/disable switch mode schedule notification setting for homebase 1+2
* (bropat) Added enable/disable switch mode keypad notification setting for homebase 1+2
* (bropat) Added enable/disable start alarm delay notification setting for homebase 1+2
* (bropat) Added new floodlight, solo and outdoor cameras (untested!)
* (bropat) Added brightness light setting for 2c/2c pro cameras, new solo cameras and new outdoor cameras
* (bropat) Added enable/disable light setting for 2c/2c pro cameras, new solo cameras and new outdoor cameras
* (bropat) Added battery charging state for keypad devices
* (bropat) Added wifi rssi state for keypad devices
* (bropat) Added nightvision setting for devices supporting the "light" nightvision mode
* (bropat) Added enable disable "switch mode with access code" for station with registered keypad
* (bropat) Added enable disable "auto end alarm" for station with registered keypad
* (bropat) Added enable disable "turn off alarm with button" for station with registered keypad
* (bropat) Fixed issue [#98](https://github.com/bropat/ioBroker.euSec/issues/98)
* (bropat) Fixed issue [#140](https://github.com/bropat/ioBroker.euSec/issues/140)
* (bropat) Fixed issue [#146](https://github.com/bropat/ioBroker.euSec/issues/146)
* (bropat) Fixed issue [#117](https://github.com/bropat/ioBroker.euSec/issues/117)
* (bropat) Many small bugfixes
* (bropat) Updated versions of the package dependencies

### 0.5.5 (2021-06-01)

* (bropat) Fixed regression in p2p protocol

### 0.5.4 (2021-05-26)

* (bropat) Fixed issue with video corruption in p2p livestream
* (bropat) Updated versions of the package dependencies

### 0.5.3 (2021-05-14)

* (bropat) Fixed issue [#121](https://github.com/bropat/ioBroker.euSec/issues/121)
* (bropat) Fixed push notification for indoor and floodlight cams (issue [#130](https://github.com/bropat/ioBroker.euSec/issues/130))
* (bropat) Fixed refresh of properties/settings of standalone devices (issue [#130](https://github.com/bropat/ioBroker.euSec/issues/130))
* (bropat) Updated versions of the package dependencies

### 0.5.2 (2021-04-02)

* (bropat) Try to add support for FreeBSD - issue [#106](https://github.com/bropat/ioBroker.euSec/issues/106)
* (bropat) Updated package dependency ffmpeg-static for FreeBSD support

### 0.5.1 (2021-04-01)

* (bropat) Fixed issue [#105](https://github.com/bropat/ioBroker.euSec/issues/105)

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

* (bropat) Implemented feature request [#88](https://github.com/bropat/ioBroker.euSec/issues/88): Enable/disable motion detection for camera products
* (bropat) Implemented feature request [#81](https://github.com/bropat/ioBroker.euSec/issues/81): Enable/disable RTSP stream (added also RTSP stream url)
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

* (bropat) Fixed issue [#86](https://github.com/bropat/ioBroker.euSec/issues/86)
* (bropat) Fixed not correctly identifying if the livestream is still active or not

### 0.2.3 (2021-02-17)

* (bropat) Fixed wired doorbell p2p livestream (should fix also indoor, floodlight and solo cameras)
* (bropat) Fixed issue that treats known push notifications as unknown
* (bropat) Fixed relative path for state last_event_pic_url
* (bropat) Updated versions of the package dependencies

### 0.2.2 (2021-02-16)

* (bropat) Fixed web extension settings for serving videos and pictures (issue [#79](https://github.com/bropat/ioBroker.euSec/issues/78))

### 0.2.1 (2021-02-15)

* (bropat) Fixed device_enable state
* (bropat) Fixed battery doorbell start livestream over p2p (issue [#78](https://github.com/bropat/ioBroker.euSec/issues/78))
* (bropat) Implemented fallback for failed P2P livestream to RTMP livestream

### 0.2.0 (2021-02-14)

* (bropat) Implemented P2P livestream over HLS
* (bropat) Last livestream is always saved and is still available later
* (bropat) Implemented device and station parameter refresh over P2P
* (bropat) Revised push notification implementation
* (bropat) Fixed issue [#71](https://github.com/bropat/ioBroker.euSec/issues/71) by implementing retry mechanism on HTTP error 404 (max. 5 retries with increasing delay)
* (bropat) Fixed issue [#12](https://github.com/bropat/ioBroker.euSec/issues/12)
* (bropat) Eufy client library extracted as standalone library and adapters ported to new shared library: [eufy-security-client](https://www.npmjs.com/package/eufy-security-client)
* (bropat) Removed following states: last_captured_pic_url, last_captured_pic_html
* (bropat) Updated versions of the package dependencies

### 0.1.5 (2021-01-14)

* (bropat) Fixed issue [#50](https://github.com/bropat/ioBroker.euSec/issues/50) and [#53](https://github.com/bropat/ioBroker.euSec/issues/53)
* (bropat) Updated versions of the package dependencies

### 0.1.4 (2021-01-05)

* (bropat) Fixed: Accept only valid modes for station guard mode (for invalid mode, an error is logged)
* (bropat) Fixed reset of an event (motion, ringing, etc.)
* (bropat) Updated versions of the package dependencies

### 0.1.3 (2021-01-02)

* (bropat) Fixed issue [#37](https://github.com/bropat/ioBroker.euSec/issues/37) and [#41](https://github.com/bropat/ioBroker.euSec/issues/41)
* (bropat) Updated versions of the package dependencies

### 0.1.2 (2021-01-02)

* (bropat) Revised captured_pic_url state (renamed to last_captured_pic_url and added last_captured_pic_html)
* (bropat) Fixed p2p issue passing wrong user id (action_user_id instead of admin_user_id)
* (bropat) Revised push notification to properly support doorbell notifications
* (bropat) Updated versions of the package dependencies

### 0.1.1 (2020-12-29)

* (bropat) Fixed issue [#37](https://github.com/bropat/ioBroker.euSec/issues/37)
* (bropat) Fixed version numbering
* (bropat) Updated versions of the package dependencies

### 0.0.9 (2020-12-28)

* (bropat) Finished implementation for feature request: [#1](https://github.com/bropat/ioBroker.euSec/issues/1)
* (bropat) Little progress for feature request: [#5](https://github.com/bropat/ioBroker.euSec/issues/5)
* (bropat) Now supports also cloud P2P communication if local P2P comunication isn't possible
* (bropat) Implemented set Guard Mode with CMD_SET_PAYLOAD for certain devices
* (bropat) Added back USA ip addresses for P2P cloud discovery
* (bropat) Using the correct local time zone for communication with the Eufy Cloud
* (bropat) HUB filtering by device type 0 (station) removed
* (bropat) Added documentation for 2FA
* (bropat) Updated versions of the package dependencies

### 0.0.8 (2020-12-13)

* (bropat) Fixed issue [#16](https://github.com/bropat/ioBroker.euSec/issues/16)
* (bropat) P2P communication revisited
* (bropat) Added reconnect functionality for P2P communication
* (bropat) Added heartbeat for P2P communication
* (bropat) Added local caching of last event picture as image url or html image (removed old state: last_camera_url)
* (bropat) Updated versions of the package dependencies

### 0.0.7 (2020-12-08)

* (bropat) Fixed issue [#11](https://github.com/bropat/ioBroker.euSec/issues/11)

### 0.0.6 (2020-12-06)

* (bropat) Fixed issue [#13](https://github.com/bropat/ioBroker.euSec/issues/13)

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

Copyright (c) 2022 bropat <patrick.broetto@gmail.com>

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