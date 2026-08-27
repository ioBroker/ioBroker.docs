---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.script-restore/README.md
title: ioBroker.script-restore
hash: lmh/JMN6R7yz8kyrDMfpGztJz6FqAXQQ1KUl8Zk2sgQ=
---
![Logo](../../../en/adapterref/iobroker.script-restore/admin/script-restore.svg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.script-restore.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.script-restore.svg)
![Anzahl der Installationen](https://iobroker.live/badges/script-restore-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/script-restore-stable.svg)
![NPM](https://nodei.co/npm/iobroker.script-restore.png?downloads=true)

# IoBroker.script-restore
**Tests:** ![Test und Freigabe](https://github.com/ipod86/ioBroker.script-restore/workflows/Test%20and%20Release/badge.svg)

## Script-restore-Adapter für ioBroker
Durchsuchen und Wiederherstellen einzelner Skripte aus ioBroker-Backup-Archiven – ohne das gesamte Backup wiederherstellen zu müssen.

## Beschreibung
Der Skript-Wiederherstellungsadapter fügt der ioBroker-Administrationsoberfläche einen Tab hinzu, über den Sie Backup-Archive öffnen und alle darin enthaltenen JavaScript-, TypeScript-, Blockly- und Rules-Skripte durchsuchen können. Sie können den Quellcode jedes Skripts anzeigen und ihn einzeln herunterladen oder kopieren.

Das Archiv wird vollständig im Browser analysiert – während des Browsens werden keine Dateien auf die Festplatte geschrieben.

## Merkmale
- Durchsuchen Sie Backup-Archive direkt über die ioBroker-Admin-Registerkarte.
- Lokale Sicherungsdateien aus dem Sicherungsverzeichnis laden (Standard: `/opt/iobroker/backups`)
- Laden Sie Archivdateien direkt von Ihrem Computer hoch.
- Unterstützte Formate: `.tar.gz`, `.tar`, `.json`, `.jsonl`
- Baumansicht aller Skripte, nach Ordnern geordnet
- Skripte nach Typ filtern: JS, TypeScript, Blockly, Regeln
- Volltextsuche in Skriptnamen, Pfaden und Quellcode
- Quellcode anzeigen (JS/TS/Blockly/Regeln)
- Quellcode in die Zwischenablage kopieren oder als Datei herunterladen
- **Wählen Sie mehrere Skripte** mit dem ☐-Kontrollkästchen aus und laden Sie sie als ZIP-Archiv herunter.
- **Importieren Sie ZIP-Archive** aus dem script-restore-Export oder aus der eigenen Sicherung des JS-Adapters (`2026-07-17-scripts.zip`)
- Vollständig browserbasiertes Parsen – kein Server-Roundtrip für Uploads
- **Skripte direkt in ioBroker wiederherstellen** mit einem konfigurierbaren Suffix (Standard: `_rcvr`) – vorhandene Skripte werden niemals überschrieben

## Konfiguration
| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Sicherungspfad | Verzeichnis, in dem die ioBroker-Sicherungsdateien gespeichert werden | `/opt/iobroker/backups` |

## Verwendung
### Laden einer lokalen Sicherungsdatei
1. Öffnen Sie den Tab **Script Restore** in der ioBroker-Administration.
2. Klicken Sie auf das Dropdown-Menü **Lokale Dateien**.
3. Wählen Sie eine Sicherungsdatei aus der Liste aus – Skripte werden automatisch geladen

### Hochladen einer Sicherungsdatei
1. Öffnen Sie den Tab **Script Restore** in der ioBroker-Administration.
2. Klicken Sie auf **Archiv hochladen** und wählen Sie eine Datei von Ihrem Computer aus.
3. Das Archiv wird im Browser analysiert und alle Skripte werden angezeigt.

### Skripte anzeigen und herunterladen
- Klicken Sie in der Baumstruktur auf ein Skript, um dessen Quellcode anzuzeigen.
- Verwenden Sie die Schaltfläche **Kopieren**, um den Quelltext in die Zwischenablage zu kopieren.
- Verwenden Sie die Schaltfläche **Herunterladen**, um das Skript als Datei zu speichern.
- Klicken Sie auf das ☐-Symbol links neben einem Skript, um es auszuwählen. Wählen Sie mehrere Skripte aus und klicken Sie auf **ZIP**, um alle in einem Archiv herunterzuladen.

## Unterstützte Sicherungsformate
| Format | Beschreibung |
|--------|-------------|
| `.tar.gz` | Standard ioBroker-Backup (`iobroker_YYYY-MM-DD-HH-mm_SS_backupiobroker.tar.gz`) |
| `.json` | JavaScript-Adapter-Skriptexport |
| `.jsonl` | ioBroker-Objekte exportieren (JSON-Zeilen) |
| `.zip` (scripts.zip) | Script-Restore-ZIP-Export (enthält die Dateien `.js`/`.ts`) |
| `.zip` (JS-Adapter-Backup) | Internes JS-Adapter-Backup (`YYYY-MM-DD-scripts.zip`, enthält `.json`-Dateien mit Skript-Metadaten) |
| `.zip` (JS-Adapter-Backup) | Internes JS-Adapter-Backup (`YYYY-MM-DD-scripts.zip`, enthält `.json`-Dateien mit Skript-Metadaten) |

## Changelog
### 0.1.13 (2026-07-22)
* (winnyschuster) fix: correct folder indentation in script tree for deeply nested folders
* (ipod86) chore: update dev dependencies (@types/tar, @iobroker/testing, @types/node)

### 0.1.12 (2026-07-18)
* (ipod86) fix: add 30s timeout to all WebDAV operations
* (ipod86) fix: remove redundant variable alias in handleListLocalFiles

### 0.1.11 (2026-07-18)
* (ipod86) fix: move @types/tar to devDependencies (W0050, W5060)

### 0.1.10 (2026-07-18)
* (ipod86) fix: replace shell tar command with pure Node.js tar library for Windows compatibility
* (ipod86) feat: test local backup path button with result feedback
* (ipod86) feat: suggest backup path button
* (ipod86) fix: jsonConfig sendTo result format validation

### 0.1.9 (2026-07-17)
* (ipod86) feat: checkbox multi-select for ZIP export — click ☐ to select, main click still views only
* (ipod86) feat: import scripts.zip (our adapter export) and JS adapter backup ZIP (2026-07-17-scripts.zip)
* (ipod86) fix: align script list item columns (checkbox, icon, name) with flex layout

### 0.1.8 (2026-07-15)
* (ipod86) fix: sanitize object IDs from backup paths to prevent invalid ioBroker state IDs
* (ipod86) fix: add 30s timeout to HTTP URL download
* (ipod86) fix: bundle jszip locally in admin tab — no CDN dependency
* (ipod86) fix: zip export now works in all browsers (script tag loading, DOM-append before click)
* (ipod86) fix: remove postinstall lifecycle script from package.json (E0093)

Older changelogs are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

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