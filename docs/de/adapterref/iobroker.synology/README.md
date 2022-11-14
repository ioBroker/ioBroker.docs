---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.synology/README.md
title: ioBroker Synology-Adapter
hash: WkVual2m2dT72rLqP5brHKeJT9eWswnA4uloqjj13Og=
---
![Logo](../../../en/adapterref/iobroker.synology/admin/synology.png)

![Anzahl der Installationen](http://iobroker.live/badges/synology-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.synology.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.synology.svg)

# IoBroker-Synology-Adapter
![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.synology/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/synology/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Beschreibung
Mit dem Treiber können Sie Daten empfangen und Ihren Synology NAS-Server verwalten.

### 2FA-Einstellungen
Wenn Sie 2FA in DSM6/7 verwenden, siehe Anleitung [hier](docs/en/template.md)

### Neustart und Herunterfahren
Der Adapter tut dies seit v2.1.4 über SSH, also stellen Sie bitte den SSH-Port in den Adaptereinstellungen ein. Sie können es in den Synology-Einstellungen sehen: ![Grafik](https://user-images.githubusercontent.com/6681528/161436776-bd04b0c6-cfb2-47ab-9bee-7ea700575bbb.png) ![Grafik](https://user-images.githubusercontent.com/6681528/161436897-174f3396-c2bb-4248-b91c-707005f7d2a8.png)

### SendMethod
Sie können jeden Befehl (Methode) senden, indem Sie das sendMethod-Objekt festlegen, zum Beispiel: Get the SurveillanceStation info ist eine getInfo-Methode ohne zusätzliche Parameter.

```{"method": "getInfo", "params": {}}```

### Kontrolle
**commands.reboot** - NAS neu starten

**commands.shutdown** - NAS herunterfahren

***SurveillanceStation.cameras.{NAMECAM}***:

* aktiviert – Aktueller Status und Kamera aktivieren/deaktivieren
* linkSnapshot - URL für Schnappschuss

***SurveillanceStation.HomeMode.status_on*** – Aktueller Status und Homemode aktivieren/deaktivieren

***SurveillanceStation.getSnapshotCamera*** - Schnappschuss nach Kameranummer erhalten, die Datei wird im Verzeichnis ``...iobroker-data\synology_0\snapshotCam_2.jpg`` gespeichert

***AudioStation.players.{PLAYERID}***:

* play, pause, stop, next, prev - Steuerung der Wiedergabe (Taste, nur wahr)
* wiederholen - Wiederholungssteuerung (Aus, Alle, Eins)
* shuffle - Shuffle-Steuerung (true/false)
* Lautstärke - Lautstärke des Remote-Players (0-100)
* seek - Steuerung der Wiedergabesuche (0-100)
* play_folder - Tracks aus dem Ordner zur Playlist hinzufügen (id folder z.B. ``dir_5816``)
* play_track - Titel nach seiner ID abspielen (z. B. ``music_120847``)
* current_play - Steuerung und Status des aktuellen Tracks durch seine Nummer in der Playlist (z.B. ``14``)

***Downloadstation***:

* activeTask - Anzahl unvollständiger Downloads
* listTasks - ein Array mit unvollständigen Downloads
* shedule_enabled, shedule_emule_enabled - Status und Kontrolle von geplanten oder sofortigen Downloads
* add_hash_download - zu Hash-Downloads hinzufügen (z. B. ``8BD3CAD02FC9ECB661A12378414FA310D3F3FE03``)
* add_url_download - Download-URL oder Magnet-Link hinzufügen
* Ordner - Der herunterzuladende Ordner, der vor dem Hinzufügen des Downloads festgelegt wird, andernfalls wird er in den Standardordner geladen
* pause_task, resume_task - Unterbrechen Sie den Download und setzen Sie ihn fort. (zB ``dbid_170`` oder ``170`` oder ``all``)

### Nachrichtenbox
```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## __IN ARBEIT__
-->

### 2.1.12 (2022-10-26) *(McM1957) Protokollierung des Passworts im Klartext wurde entfernt.
### 2.1.11 (2022-10-24)
*(McM1957) Der Adapter wurde angepasst, um mit node14 kompatibel zu sein.

### 2.1.10 (2022-10-23)
*(McM1957) Umgang mit Passwörtern, die Sonderzeichen (z. B. ein Dollarzeichen) enthalten, wurde korrigiert (#180) *(McM1957) Basismodule wurden aktualisiert, wie von dependentabot vorgeschlagen.

### 2.1.9 (2022-07-01)
* (Apollon77) Versuchen Sie, Kontosperren zu verhindern, wenn Sie 2FA bei Neustarts des NAS verwenden

### 2.1.8 (2022-06-12)
* (Apollon77) verlangsamt Wiederverbindungen zum DSM

### 2.1.7 (2022-04-26)
* (Apollon77) Versuchen Sie, Kontosperren zu verhindern, wenn Sie 2FA bei Neustarts des NAS verwenden

### 2.1.6 (2022-04-04)
* (Apollon77) 2FA korrigieren

### 2.1.5 (2022-04-03)
* (Apollon77) Korrektur der DSM-Versionserkennung

### 2.1.4 (2022-04-03)
* (arteck) Problemumgehung für das Herunterfahren und Neustarten (konfigurieren Sie Ihren SSH-Port in den Einstellungen)
* (Apollon77) verhindert Fehler beim einmaligen Setzen von FileStation.info.items beim Start

### 2.1.1 (2022-03-26)
* (Apollon77) Optimieren Sie die Objekttypbestimmung und Anpassungen

### 2.1.0 (2022-03-25)
* WICHTIG: Nach der Installation dieser Version müssen Sie das Passwort einmalig neu eingeben!
* (Apollon77) Kameraschnappschüsse werden jetzt auch im ioBroker-Speicher gespeichert, um sie einfacher in Visualisierungen verwenden zu können!
* (foxriver76) Passwortanzeige in Admin ausblenden, wenn Admin5 verwendet wird
* (Apollon77) Datenträgerbeschreibung korrigiert
* (Apollon77) Typprobleme seit js-controller 3.3 behoben

### 2.0.1 (2021-09-17)
* (MeisterTR) Problemumgehung JSON-Konfigurationskennwort

### 2.0.0
* (Installationsprogramm) DSM7-Unterstützung

### 1.1.3 (2021-08-23)
* (MeisterTR) 2FA behoben

### 1.1.2 (2021-08-12)
* (MeisterTR) Feste Datentypen
* (MeisterTR) neuen ConfigJson hinzugefügt (wenn Sie 2FA verwenden, bitte erneut in Config eingeben)
* (MeisterTR) Snapshot wieder korrigiert

### 1.1.1 (2021-08-09)
* (MeisterTR) Art der Betriebszeit behoben
* (MeisterTR) defekten Snapshot-Link behoben

### 1.1.0 (2021-08-07)
* (MeisterTR) Korrekturen für DSM7
* (MeisterTR) Release-Skript hinzugefügt
* (MeisterTR) Änderungstest
* (MeisterTR) Syno-Repo auf Standard ändern

### 1.0.1
* (thost96) Korrektur für falsche Typennummer [Problem 78](https://github.com/instalator/ioBroker.synology/issues/78)

### 1.0.0
* (Instalator) Namensobjekte in hdd_info geändert [issues 51](https://github.com/instalator/ioBroker.synology/issues/51)
* (Apollon77) BREAKING CHANGE: Bitte Passwort im Admin neu setzen!
* (Apollon77) js-controller 3.0 wird jetzt mindestens benötigt!
* (Apollon77 Store-Passwort jetzt verschlüsselt)

### 0.1.20
* (Installationsprogramm) behobener Fehler

### 0.1.18
* (Instalator) Link für Albumcover ändern

### 0.1.17
* (Instalator) Sentry-Plugin-Unterstützung hinzugefügt

### 0.1.16
* (Installationsprogramm) behobener Fehler

### 0.1.15
* (Instalator) Fehler beim Parsen von Info behoben
* (Instalator) API undefiniert behoben

### 0.1.14
* (Instalator) fehlende [Datenpunkte] behoben (https://github.com/instalator/ioBroker.synology/issues/43)
* (Instalator) Refactoring
* (Instalator) Protokollierung einiger Fehler geändert
* (Instalator) Sitzungsformat im Syno-Paket geändert

### 0.1.11
* (Installateur) Bewegungserkennungsstatus hinzugefügt
* (SpectreKr*) Hinzufügen zur FS-Freigabe

### 0.1.10
* (Installationsprogramm) Cover-Datei mit fester Kopie
* (Instalator) Fix zum Abrufen von Paketen für DSM 5.x
* (Instalator) Option hinzugefügt, um Dienste zum Empfangen von Daten auszuwählen

### 0.1.8
* (Installationsprogramm) Fehler beheben addDownload
* (Instalator) feste ListeRadios
* (Installateur) behobene Abdeckung erhalten

### 0.1.7
* (Installateur) 2FA behoben
* (Installationsprogramm) Einrichtungsanleitung 2FA hinzugefügt

### 0.1.6
* (Installationsprogramm) Fix für 2fa
* (Installationsprogramm) Fehler behoben
* (Installationsprogramm) Fehlerprotokoll ändern
* (Installationsprogramm) io-Paket reparieren
* (Instalator) Fehlerstatus-Player beheben

### 0.1.4
* (Installations-)Änderung für DownloadStation
* (Instalator) Playlist Lieblingsradio hinzugefügt
* (Instalator) ClearPlaylist-Schaltfläche hinzugefügt
* (Instalator) Refactoring

### 0.1.3
* (Instalator) ändere obj für ss info fix für Coversong
* (Instalator) Fix für info.connection
* (Installationsprogramm) 6.2.3 Fix für Player-Browser-Dateien hinzugefügt
* (Installationsprogramm) Fix für 2FA
* (Installationsprogramm) Fehler beim Hinzufügen des Downloads behoben
* (Installationsprogramm) DownloadStation-Aufgabenliste hinzugefügt

### 0.1.2
* (Installationsprogramm) behobener Fehler

### 0.1.1
* (Instalator) Messagebox für Snapshot hinzugefügt
* (Instalator) Update-Readme
* (Instalator) SS-Link für verschiedene Streams hinzugefügt
* (Installationsprogramm) Fehler behoben
* (Instalator) Refactoring

### 0.1.0
* (Installateur) HomeMode-Schalter hinzugefügt
* (Installations-)Änderung für Audiostation
* (installateur) ändern für as und ss
* (Instalator) Snapshot-Funktion hinzugefügt
* (Installateur) feste systemConfig
* (Installationsprogramm) viele Fehler behoben

### 0.0.4 (2018-10-07)
* (Installationsprogramm) Изменен репозиторий библиотеки
* (Installationsprogramm) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (Installateur) Anfangsbuchstabe

## Changelog
<!--

## License
The MIT License (MIT)

Copyright (c) 2021-2022 instalator <vvvalt@mail.ru>, ioBroker Community-Developers

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