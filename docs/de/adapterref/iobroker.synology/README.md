---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.synology/README.md
title: ioBroker Synology-Adapter
hash: r9VVnVypmDX5q/4gTy9yNfoMJmm5TimtUA6puWDSGlI=
---
![Logo](../../../en/adapterref/iobroker.synology/admin/synology.png)

![Anzahl der Installationen](http://iobroker.live/badges/synology-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.synology.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.synology.svg)

# IoBroker Synology-Adapter
![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.synology/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/synology/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Beschreibung
Der Treiber ermöglicht Ihnen, Daten zu empfangen und Ihren Synology NAS-Server zu verwalten.

### 2FA-Einstellungen
Wenn Sie 2FA in DSM6/7 verwenden, lesen Sie die Anweisungen [Hier](docs/en/template.md)

### Wichtiger Hinweis für Windows-Installationen
Dieser Adapter erfordert die Installation von Git auf dem Hist-System. Installationsmedien finden Sie unter https://git-scm.com/download/win.

### Neustart und Herunterfahren
Der Adapter macht dies seit v2.1.4 über SSH, also stellen Sie bitte den SSH-Port in den Adaptereinstellungen ein. Sie können ihn in den Synology-Einstellungen sehen: ![grafik](https://user-images.githubusercontent.com/6681528/161436776-bd04b0c6-cfb2-47ab-9bee-7ea700575bbb.png) ![grafik](https://user-images.githubusercontent.com/6681528/161436897-174f3396-c2bb-4248-b91c-707005f7d2a8.png)

### Sendemethode
Sie können jeden beliebigen Befehl (jede beliebige Methode) senden, indem Sie das sendMethod-Objekt festlegen, zum Beispiel: „Get the SurveillanceStation info“ ist eine getInfo-Methode ohne zusätzliche Parameter.

```{"method": "getInfo", "params": {}}```

### Kontrolle
**commands.reboot** - NAS neu starten

**commands.wake** - Wake On Lan an NAS senden

**commands.shutdown** - NAS herunterfahren

***SurveillanceStation.cameras.{NAMECAM}***:

* aktiviert - Aktueller Status und Kamera aktivieren/deaktivieren
* linkSnapshot – URL für Snapshot

***SurveillanceStation.HomeMode.status_on*** - Aktueller Status und Homemode aktivieren/deaktivieren

***SurveillanceStation.getSnapshotCamera*** - Schnappschuss nach Kameranummer abrufen, die Datei wird in einem Verzeichnis ``...iobroker-data\synology_0\snapshotCam_2.jpg`` gespeichert

***AudioStation.players.{PLAYERID}***:

* Play, Pause, Stop, Weiter, Zurück - Steuerung der Wiedergabe (Button, nur True)
* repeat - Wiederholungssteuerung (Aus, Alle, Eins)
* shuffle - Shuffle-Steuerung (true/false)
* Lautstärke - Lautstärke des Remote-Players (0-100)
* seek - Steuerung der Wiedergabesuche (0-100)
* play_folder – Titel aus dem Ordner zur Playlist hinzufügen (Ordner-ID z. B. „dir_5816“)
* play_track – Titel anhand seiner ID abspielen (z. B. „music_120847“)
* current_play – Steuerung und Status des aktuellen Titels über seine Nummer in der Playlist (z. B. „14“)

***DownloadStation***:

* activeTask - Anzahl unvollständiger Downloads
* listTasks – ein Array mit unvollständigen Downloads
* schedule_enabled, schedule_emule_enabled - Status und Kontrolle geplanter oder sofortiger Downloads
* add_hash_download – zu Hash-Downloads hinzufügen (z. B. „8BD3CAD02FC9ECB661A12378414FA310D3F3FE03“)
* add_url_download – Download-URL oder Magnet-Link hinzufügen
* Ordner - Der herunterzuladende Ordner, der vor dem Hinzufügen des Downloads festgelegt wird, andernfalls wird er in den Standardordner geladen
* pause_task, resume_task – Download anhalten und fortsetzen. (z. B. „dbid_170“ oder „170“ oder „all“)

### Nachrichtenbox
```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## Changelog
<!--
     ### **WORK IN PROGRESS**
-->
### 3.1.0 (2024-04-07)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 3.0.1 (2023-10-01)
* (Standarduser) A Typo in RegEx for Mac-Address has been corrected.
* (McM1957) Dependencies have been updated.

### 3.0.0 (2023-09-07)
* (Standarduser) Added WOL to awake Synology NAS server
* (bluefox) Only node 16 or higher supported

### 2.1.13 (2022-11-05)
*(McM1957) Code has been prepared for upcoming js-controller release. Reference to utils.controllerDir has been removed. (#198)
*(McM1957) Several base modules have been updated.

### 2.1.12 (2022-10-26)
*(McM1957) Logging of password in clear text has been removed.

### 2.1.11 (2022-10-24)
*(McM1957) The adapter has been adapted to be compatible with node14.

### 2.1.10 (2022-10-23)
*(McM1957) Handling of passwords containing special characters (i.e. a dollar sign) has been fixed (#180)
*(McM1957) Base modules have been updated as suggested by dependabot.

### 2.1.9 (2022-07-01)
* (Apollon77) Try to prevent account locks when using 2FA on restarts of the NAS

### 2.1.8 (2022-06-12)
* (Apollon77) slow down reconnects to the DSM

### 2.1.7 (2022-04-26)
* (Apollon77) Try to prevent account locks when using 2FA on restarts of the NAS

### 2.1.6 (2022-04-04)
* (Apollon77) Fix 2FA

### 2.1.5 (2022-04-03)
* (Apollon77) fix DSM version detection

### 2.1.4 (2022-04-03)
* (arteck) workaround for shutdown and reboot(configure your ssh port in the settings)
* (Apollon77) prevent error when setting FileStation.info.items on start once

### 2.1.1 (2022-03-26)
* (Apollon77) Optimize object type determination and adjustments

### 2.1.0 (2022-03-25)
* IMPORTANT: You need to re-enter the password once after installing this version!
* (Apollon77) Camera snapshots are now also stored in ioBroker storage to be easier used in visualizations!
* (foxriver76) Hide password display in Admin when using Admin5
* (Apollon77) Fix volume description
* (Apollon77) Fix type issues since js-controller 3.3

### 2.0.1 (2021-09-17)
* (MeisterTR) Workaround JSON config Password

### 2.0.0
* (instalator) DSM7 support

### 1.1.3 (2021-08-23)
* (MeisterTR) Fixed 2FA

### 1.1.2 (2021-08-12)
* (MeisterTR) Fixed datatypes
* (MeisterTR) added new ConfigJson (if you use 2FA pleease retype in config)
* (MeisterTR) Fixed snapshot again

### 1.1.1 (2021-08-09)
* (MeisterTR) fix type of uptime
* (MeisterTR) fix broken snapshot link

### 1.1.0 (2021-08-07)
* (MeisterTR) fixes for DSM7
* (MeisterTR) added release-script
* (MeisterTR) change testing
* (MeisterTR) change syno repo to default

### 1.0.1
* (thost96) fix for wrong type number [issue 78](https://github.com/instalator/ioBroker.synology/issues/78)

### 1.0.0
* (instalator) changed name objects in hdd_info [issues 51](https://github.com/instalator/ioBroker.synology/issues/51)
* (Apollon77) BREAKING CHANGE: Please set password new in admin!
* (Apollon77) js-controller 3.0 is now needed minimum!
* (Apollon77 store password now encrypted)

### 0.1.20
* (instalator) fixed error

### 0.1.18
* (instalator) change link for album cover

### 0.1.17
* (instalator) added Sentry plugin support

### 0.1.16
* (instalator) fixed error

### 0.1.15
* (instalator) fixed error in parse Info
* (instalator) fixed api undefined

### 0.1.14
* (instalator) fixed missing [datapoints](https://github.com/instalator/ioBroker.synology/issues/43)
* (instalator) refactoring
* (instalator) Changed the logging of some errors
* (instalator) Changed format session in syno package

### 0.1.11
* (instalator) added motionDetected state
* (SpectreKr*) Adding to FS Sharing

### 0.1.10
* (instalator) fixed copy cover file
* (instalator) fix get packages for DSM 5.x
* (instalator) Added option to select services for receiving data

### 0.1.8
* (instalator) fix error addDownload
* (instalator) fixed listRadios
* (instalator) fixed get cover

### 0.1.7
* (instalator) fixed 2FA
* (instalator) Added setup guide 2FA

### 0.1.6
* (instalator) fix for 2fa
* (instalator) fix error
* (instalator) change error log
* (instalator) fix io-package
* (instalator) fix error status player

### 0.1.4
* (instalator) change for DownloadStation
* (instalator) added playlist favorite radio
* (instalator) added clearPlaylist button
* (instalator) refactoring

### 0.1.3
* (instalator) change obj for ss info fix for cover song 
* (instalator) fix for info.connection 
* (instalator) add 6.2.3 fix for player browser files 
* (instalator) fix for 2FA
* (instalator) fixed error add download 
* (instalator) added DownloadStation task list

### 0.1.2
* (instalator) fixed error

### 0.1.1
* (instalator) added messagebox for snapshot
* (instalator) update readme
* (instalator) added ss link for different streams
* (instalator) fix error
* (instalator) refactoring

### 0.1.0
* (instalator) added HomeMode switch 
* (instalator) change for audiostation 
* (instalator) change for as and ss
* (instalator) added snapshot functional 
* (instalator) fixed systemConfig 
* (instalator) fixed many error

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2024, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2021-2023 instalator <vvvalt@mail.ru>, ioBroker Community-Developers

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