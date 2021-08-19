---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.synology/README.md
title: ioBroker Synology-Adapter
hash: t5T/fzOgQKNpdGG0clmho59rs1eVvk6s5dKa7HwZgis=
---
![Logo](../../../en/adapterref/iobroker.synology/admin/synology.png)

![Anzahl der Installationen](http://iobroker.live/badges/synology-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.synology.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.synology.svg)
![NPM](https://nodei.co/npm/iobroker.synology.png?downloads=true)

# IoBroker Synology-Adapter
[![Tests](https://github.com/iobroker-community-adapters/iobroker.synology/workflows/Test%20and%20Release/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.synology/actions/)

## Beschreibung
Mit dem Treiber können Sie Daten empfangen und Ihren Synology NAS-Server verwalten.

### 2FA-Einstellungen
Wenn Sie 2FA verwenden, siehe Anweisungen [hier](docs/en/template.md)

### SendMethod
Sie können jeden Befehl (eine Methode) senden, indem Sie das sendMethod-Objekt setzen, zum Beispiel: Get the SurveillanceStation info ist eine getInfo-Methode ohne zusätzliche Parameter.

```{"method": "getInfo", "params": {}}```

### Steuerung
**commands.reboot** - NAS neu starten

**commands.shutdown** - NAS herunterfahren

***SurveillanceStation.cameras.{NAMECAM}***:

* aktiviert - Aktueller Status und Kamera aktivieren/deaktivieren
* linkSnapshot - URL für Snapshot

***SurveillanceStation.HomeMode.status_on*** - Aktueller Status und Homemode aktivieren/deaktivieren

***SurveillanceStation.getSnapshotCamera*** - Schnappschuss nach Kameranummer abrufen, die Datei wird in einem Verzeichnis ``...iobroker-data\synology_0\snapshotCam_2.jpg`` . gespeichert

***AudioStation.player.{PLAYERID}***:

* Play, Pause, Stop, Next, Prev - Steuerung der Wiedergabe (Button, nur true)
* wiederholen - Wiederholungssteuerung (Aus, Alle, Eins)
* Shuffle - Shuffle-Steuerung (true/false)
* Lautstärke - Lautstärke Remote-Player (0-100)
* seek - Steuerung der Wiedergabesuche (0-100)
* play_folder - Füge Tracks aus dem Ordner zur Playlist hinzu (ID-Ordner z.B. ``dir_5816``)
* play_track - Titel nach seiner ID abspielen (z. B. ``music_120847``)
* current_play - Kontrolle und Status des aktuellen Tracks anhand seiner Nummer in der Playlist (z.B. ``14``)

***DownloadStation***:

* activeTask - Anzahl unvollständiger Downloads
* listTasks - ein Array mit unvollständigen Downloads
* shedule_enabled, shedule_emule_enabled - Status und Kontrolle von geplanten oder sofortigen Downloads
* add_hash_download - zu Hash-Downloads hinzufügen (z. B. ``8BD3CAD02FC9ECB661A12378414FA310D3F3FE03``)
* add_url_download - Download-URL oder Magnetlink hinzufügen
* Ordner - Der herunterzuladende Ordner, der vor dem Hinzufügen des Downloads festgelegt wird, andernfalls wird er in den Standardordner geladen
* pause_task, restart_task - Unterbrechen Sie den Download und setzen Sie ihn fort. (z.B. ``dbid_170`` oder ``170`` oder ``all``)

### Nachrichtenbox
```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## Changelog
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

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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