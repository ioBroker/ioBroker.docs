---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/README.md
title: ioBroker.google-spreadsheet
hash: MssUCif+KG4f/HBQvWsc5nwuhJzpp2bvx8Uj7G21D70=
---
![Logo](../../../en/adapterref/iobroker.google-spreadsheet/admin/google-spreadsheet.png)

![GitHub-Lizenz](https://img.shields.io/github/license/ThomasPohl/ioBroker.google-spreadsheet)
![Downloads](https://img.shields.io/npm/dm/iobroker.google-spreadsheet.svg)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/ThomasPohl/ioBroker.google-spreadsheet)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/ThomasPohl/ioBroker.google-spreadsheet)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/ThomasPohl/ioBroker.google-spreadsheet/latest)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/ThomasPohl/ioBroker.google-spreadsheet)
![GitHub-Probleme](https://img.shields.io/github/issues/ThomasPohl/ioBroker.google-spreadsheet)
![NPM-Version](https://img.shields.io/npm/v/iobroker.google-spreadsheet.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/google-spreadsheet-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/google-spreadsheet-installed.svg)

# IoBroker.google-spreadsheet
**Version:** **Tests:** [![Test und Freigabe](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/actions/workflows/test-and-release.yml)

## Google-Tabellen-Adapter für ioBroker
Dieser Adapter ermöglicht die automatische Interaktion mit Google Sheets.

## API
* [sendTo-API-Dokumentation](docs/sendTo-API.md)

## Merkmale
* [Daten an Tabellenkalkulation anhängen](docs/features/append.md)
* [Zeilen aus einer Tabellenkalkulation löschen](docs/features/delete-rows.md)
* [Erstellungsblätter](docs/features/create-sheet.md)
* [Löschblatt](docs/features/delete-sheet.md)
* [Blätter löschen](docs/features/delete-sheets.md)
* [Doppelte Tabellenblätter](docs/features/duplicate-sheet.md)
* [Zelle lesen](docs/features/read-cell.md)
* [Zelle schreiben](docs/features/write-cell.md)
* [Zellen schreiben](docs/features/write-cells.md)

## Verwendung
### Aufstellen
#### API-Zugriff aktivieren
1. Besuchen Sie die [Google Cloud Console](https://console.cloud.google.com/flows/enableapi?apiid=sheets.googleapis.com).

2. Erstellen Sie ein Projekt oder wählen Sie ein bestehendes Projekt aus, das Sie mit der API verwenden möchten.

3. Aktivieren Sie die Google Sheets API für Ihr Projekt.

#### Dienstkonto erstellen
Erstellen Sie für das im vorherigen Schritt ausgewählte Projekt ein neues Dienstkonto in Google Cloud IAM, indem Sie die folgenden Schritte ausführen:

1. Navigieren Sie in der [Google Cloud Console](https://console.cloud.google.com/iam-admin/iam) zur Seite „IAM & Administration“.

2. Klicken Sie auf „Dienstkonten“ und dann auf „Dienstkonto erstellen“.

3. Geben Sie einen Namen für das Dienstkonto an und wählen Sie die Rolle „Projekt“ > „Editor“ aus.

4. Klicken Sie auf „Weiter“, um zum nächsten Schritt zu gelangen.

5. Klicken Sie auf der Registerkarte „Schlüssel“ auf „Schlüssel erstellen“ und wählen Sie als Format „JSON“ aus. Klicken Sie anschließend auf „Weiter“.

6. Ihr privater Schlüssel wird generiert und automatisch heruntergeladen. Bewahren Sie diese Datei sicher auf, da Sie sie später benötigen.

#### Zugriff auf die Tabelle gewähren
Öffnen Sie die gewünschte Tabelle und teilen Sie sie mit der E-Mail-Adresse Ihres neu erstellten Servicekontos:

1. Öffnen Sie die gewünschte Tabelle in Google Sheets.

2. Klicken Sie oben rechts auf „Teilen“.

3. Geben Sie die E-Mail-Adresse des Dienstkontos im Feld „Personen hinzufügen“ ein und erteilen Sie die erforderlichen Berechtigungen (z. B. „Bearbeiten“ oder „Anzeigen“).

4. Klicken Sie auf „Senden“, um den Freigabevorgang abzuschließen.

#### Konfigurieren der Adapterinstanz
Fügen Sie die folgenden Informationen zur Konfiguration Ihrer Adapterinstanz in ioBroker hinzu:

- **Tabellenkalkulations-ID** - Die ID finden Sie in der URL Ihrer Tabellenkalkulation.
- **Dienstkonto** - Die E-Mail-Adresse des von Ihnen erstellten Dienstkontos.
- **Privater Schlüssel** - Öffnen Sie die heruntergeladene JSON-Datei und suchen Sie den privaten Schlüssel darin. Kopieren Sie nur den Teil, der mit "-----BEGIN PRIVATE KEY-----" beginnt.

![Einstellungen](../../../en/adapterref/iobroker.google-spreadsheet/docs/img/settings.png)

#### Tabellen-ID in der URL finden
Um die „Tabellenblatt-ID“ in der URL Ihres Google Sheets-Dokuments zu finden, gehen Sie wie folgt vor:

1. Wenn Sie Ihr Google Sheets-Dokument in einem Webbrowser öffnen, sieht die URL in der Adressleiste etwa so aus:

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

2. Die "SPREADSHEET_ID" ist die lange Zeichenkette aus Buchstaben und Zahlen zwischen den Teilen "/d/" und "/edit" der URL.

### Blockly
Nutzen Sie die verfügbaren Blöcke, um automatisch mit Ihrer Tabellenkalkulation zu interagieren.

![Blockly](../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-append.png)

## Fehlerbehebung
### Fehler beim Senden von Daten an Google Sheets:Fehler: error:0909006C:PEM routines:get_name:no start line
Achten Sie beim Kopieren des privaten Schlüssels in die Konfiguration darauf, dass keine Zeilenumbrüche (\n) vorhanden sind. Sollten Zeilenumbrüche im Schlüssel enthalten sein, ersetzen Sie diese bitte durch normale Zeilenumbrüche.

### Fehler beim Senden von Daten an Google Sheets: Fehler: Der Aufrufer hat keine Berechtigung
Stellen Sie sicher, dass das Dienstkonto über ausreichende Berechtigungen zum Schreiben in die Tabelle verfügt. Beachten Sie dazu den Abschnitt „Zugriff auf die Tabelle gewähren“ weiter oben.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-01-06)
* (Thomas Pohl) Support for multiple spreadsheets with aliases
* (Thomas Pohl) Automatic migration of old configs
* (Thomas Pohl) Improved tests, error handling, and logging
* (Thomas Pohl) Better async handling in Blockly blocks

### 0.6.0 (2025-12-26)
- (Thomas Pohl) Added deleteSheets functionality (delete multiple sheets in one call)
- (Thomas Pohl) Added blockly block for deleteSheets
- (Thomas Pohl) Add write cells functionality (write multiple cells in one call)
- (Thomas Pohl) Added blockly block for writeCells

### 0.5.0
* (Thomas Pohl) Minimum node.js version is now 20
* (Thomas Pohl) Display connection state

### 0.4.0
* (Thomas Pohl) The privateKey is saved now encrypted
* (Thomas Pohl) Support for node.js 22

### 0.3.1
* (Thomas Pohl) Fixed reading cells and added error handling

## License

   Copyright (c) 2024-2026 Thomas Pohl

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.