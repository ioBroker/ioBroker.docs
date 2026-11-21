---
chapters: {"pages":{"en/adapterref/iobroker.synology/README.md":{"title":{"en":"ioBroker Synology adapter"},"content":"en/adapterref/iobroker.synology/README.md"},"en/adapterref/iobroker.synology/docs/en/template.md":{"title":{"en":"2FA"},"content":"en/adapterref/iobroker.synology/docs/en/template.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.synology/README.md
title: ioBroker Synology-Adapter
hash: vAORVxNbS+kgucR7rGseu/Q5efleCD0vxS/Pk8714oI=
---
![Logo](../../../en/adapterref/iobroker.synology/admin/synology.png)

![Anzahl der Installationen](https://iobroker.live/badges/synology-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.synology.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.synology/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/synology/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.synology.svg)

# ioBroker Synology-Adapter

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Beschreibung

Der Treiber ermöglicht es Ihnen, Daten zu empfangen und Ihren Synology NAS-Server zu verwalten.

### 2FA-Einstellungen

Wenn Sie 2FA in DSM6/7 verwenden, finden Sie [hier](/#/docs/adapterref/iobroker.synology/docs/en/template.md) die entsprechenden Anweisungen.

### Kompatibilität

Dieser Adapter benötigt Node.js 24 oder neuer. DSM 5 wird nicht mehr unterstützt, da die aktuellen Synology-API-Definitionen nur DSM 6 und DSM 7 umfassen. Vorhandene DSM-5-Einstellungen werden nicht automatisch geändert; konfigurieren Sie eine unterstützte DSM-Version, bevor Sie den Adapter starten.

### Neustart und Herunterfahren

Der Adapter nutzt dafür ab Version 2.1.4 SSH. Bitte stellen Sie daher den SSH-Port in den Adaptereinstellungen ein. Sie finden ihn in den Synology-Einstellungen.![Grafik](https://user-images.githubusercontent.com/6681528/161436776-bd04b0c6-cfb2-47ab-9bee-7ea700575bbb.png)![Grafik](https://user-images.githubusercontent.com/6681528/161436897-174f3396-c2bb-4248-b91c-707005f7d2a8.png)

### sendMethod

Sie können jeden Befehl (jede Methode) senden, indem Sie das sendMethod-Objekt festlegen. Zum Beispiel: Das Abrufen der SurveillanceStation-Informationen ist eine getInfo-Methode ohne zusätzliche Parameter.

`{"method": "getInfo", "params": {}}`

### Kontrolle

**commands.reboot** - NAS neu starten

**commands.wake** - Wake-on-LAN an NAS senden

**commands.shutdown** - NAS herunterfahren

_**SurveillanceStation.cameras.{NAMECAM}**_ :

- aktiviert – Aktueller Status und Kamera aktivieren/deaktivieren
- linkSnapshot – URL für den Snapshot

_**SurveillanceStation.HomeMode.status\_on**_ - Aktueller Status und Aktivierung/Deaktivierung des Heimmodus

_**SurveillanceStation.getSnapshotCamera**_ - Erzeugt einen Schnappschuss anhand der Kameranummer; die Datei wird in einem Verzeichnis gespeichert. `...iobroker-data\synology_0\snapshotCam_2.jpg`

_**AudioStation.players.{PLAYERID}**_ :

- Wiedergabe, Pause, Stopp, nächster Titel, vorheriger Titel – Wiedergabesteuerung (Taste, nur wahr)
- Wiederholung - Wiederholungssteuerung (Aus, Alle, Einzeln)
- Zufallswiedergabe - Zufallswiedergabe steuern (ein-/ausschalten)
- Lautstärke - Lautstärke des Fernabspielgeräts (0-100)
- Suchfunktion - Steuerung der Wiedergabesuche (0-100)
- Wiedergabeordner - Fügt Titel aus dem Ordner zur Wiedergabeliste hinzu (z. B. Ordner-ID). `dir_5816`)
- play\_track - Spielt einen Titel anhand seiner ID ab (z. B. `music_120847`)
- current\_play - Steuerung und Status des aktuell abgespielten Titels anhand seiner Nummer in der Wiedergabeliste (z. B. `14`)

_**HyperBackup**_ :

- taskCount – Anzahl der konfigurierten Hyper Backup-Aufgaben
- listTasks – JSON-Array mit der ID, dem Namen, dem aktuellen Status und dem Fortschritt jeder Aufgabe sowie den letzten/nächsten Sicherungszeiten, dem letzten Ergebnis und, falls verfügbar, Fehlerdetails.
- tasks.{DSM-ID} – Schreibgeschützter Kanal pro Aufgabe, benannt nach der Aufgabe auf dem NAS, mit ihrer ID und separaten Zuständen für die verfügbaren Aufgabenwerte. Numerische IDs werden direkt verwendet (z. B. `tasks.3`); nicht-numerische IDs werden sicheren Bereichen zugeordnet `id_<hex>` Kanalsegmente, während die ursprüngliche ID erhalten bleibt `id` Bundesstaat. Die Anzeigenamen der Bundesstaaten lauten: `Task ID`, `Task name`, `Backup status`, `Task state`, `Current backup progress`, `Last backup time`, `Next scheduled backup`, `Last backup result`, `Last backup error`, `Last backup error code`, Und `Last backup progress details`; `last_bkp_time` Und `next_bkp_time` Verwenden Sie die `date` Rolle für datumsabhängige ioBroker-Anzeige.

Der Hyper Backup-Status ist schreibgeschützt. Der Adapter fragt das DSM ab. `SYNO.Backup.Task` Die API verwaltet die zusammenfassenden Statusinformationen parallel zu den dynamischen Aufgabenkanälen. Die Kanäle werden nach jeder gültigen Aufgabenlistenantwort synchronisiert, auch bei leeren Listen; fehlerhafte Listen lösen keine Bereinigung aus. Temporäre Statusfehler einzelner Aufgaben erhalten die bestehenden Statuswerte. Das Feld „Letzter Fortschritt“ wird, wenn möglich, aus dem JSON-kodierten Wert von DSM dekodiert.

_**DownloadStation**_ :

- aktive Aufgabe – Anzahl unvollständiger Downloads
- listTasks – ein Array mit unvollständigen Downloads
- schedule\_enabled, schedule\_enabled - Status und Steuerung geplanter oder sofortiger Downloads
- add\_hash\_download - zu Hash-Downloads hinzufügen (z. B. `8BD3CAD02FC9ECB661A12378414FA310D3F3FE03`)
- add\_url\_download – Download-URL oder Magnet-Link hinzufügen
- Ordner - Der Ordner, in den heruntergeladen werden soll. Dieser muss vor dem Hinzufügen des Downloads festgelegt werden, andernfalls wird der Download im Standardordner gespeichert.
- pause\_task, resume\_task – Download anhalten und fortsetzen. (z. B.) `dbid_170` oder `170` oder `all`)

### Messagebox

```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## Changelog
### **WORK IN PROGRESS**
- (Voodoo2man) Corrected object state defaults and bound the 2FA delay to the adapter lifecycle.

### 4.1.0 (2026-10-31)
- (Voodoo2man) Reduced 2FA first-start delays by reusing station sessions and skipping disabled or unavailable optional APIs.
- (Voodoo2man) Added Hyper Backup
- (Voodoo2man) Corrected object state defaults and sendMethod input handling.

### 4.0.0 (2026-10-24)
- (Voodoo2man) Added remaining free capacity for each storage volume.
- (Voodoo2man) Corrected Surveillance Station camera status mapping.
- (GermanBluefox) Fixed crash when polling interval is stored as string (#559)
- (Voodoo2man) Corrected adapter state defaults and polling interval handling.
- (Voodoo2man) Migrated Synology API access to the published syno library, retained automatic 2FA and adapter APIs, and required Node.js 24; DSM 5 support was removed.
- (Voodoo2man) Raised the minimum Admin and js-controller versions.

### 3.3.2 (2026-10-23)
- (Voodoo2man) Migrated the adapter to TypeScript, preserved legacy 2FA settings, and configured runtime builds during npm deployment.

### 3.3.1 (2026-10-18)
- (Voodoo2man) Improved polling defaults, connection logging, and handling of invalid credentials.
- (Voodoo2man) Filtered harmless SSH notices and bound timers to the adapter lifecycle.
- (Voodoo2man) Corrected semantic roles for system, volume, download, and surveillance states.
- (Voodoo2man) Corrected the hard disk capacity state role.
- (Voodoo2man) Migrated linting to ESLint 9 with the ioBroker standard configuration.

### 3.3.0 (2026-10-17)
- (Voodoo2man) Added a guarded FFmpeg fallback for H.265 camera snapshots.
- (Voodoo2man) Added optional SMART attribute polling over SSH.
- (Voodoo2man) Changed SSH error logging from debug to warn.

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.synology/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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