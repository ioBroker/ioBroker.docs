---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/README.md
title: ioBroker.google-Tabelle
hash: zy+ofgh7dMJwoc0bOUlmGuQN5HzfEYHW+pBRxXwNzMg=
---
![Logo](../../../en/adapterref/iobroker.google-spreadsheet/admin/google-spreadsheet.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.google-spreadsheet.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.google-spreadsheet.svg)
![Anzahl der Installationen](https://iobroker.live/badges/google-spreadsheet-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/google-spreadsheet-stable.svg)
![NPM](https://nodei.co/npm/iobroker.google-spreadsheet.png?downloads=true)

# IoBroker.google-Tabelle
**Tests:** ![Testen und Freigeben](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/workflows/Test%20and%20Release/badge.svg)

## Google-Spreadsheet-Adapter für ioBroker
Mit diesem Adapter kann automatisch mit Google Spreadsheets interagiert werden.

## Merkmale
* [Daten an Tabelle anhängen](features/append.md)
* [Zeilen aus einer Tabelle löschen](features/delete-rows.md)
* [Blätter erstellen](features/create-sheet.md)
* [Blätter löschen](features/delete-sheet.md)
* [Blätter duplizieren](features/duplicate-sheet.md)
* [Zelle lesen](features/read-cell.md)
* [Zelle schreiben](features/write-cell.md)

## Verwendung
### Aufstellen
#### API-Zugriff aktivieren
1. Besuchen Sie die [Google Cloud Console](https://console.cloud.google.com/flows/enableapi?apiid=sheets.googleapis.com).

2. Erstellen oder wählen Sie ein vorhandenes Projekt aus, das Sie mit der API verwenden möchten.

3. Aktivieren Sie die Google Spreadsheet API für Ihr Projekt.

#### Erstellen Sie ein Servicekonto
Erstellen Sie für das Projekt, das Sie im vorherigen Schritt ausgewählt haben, ein neues Dienstkonto in Google Cloud IAM, indem Sie die folgenden Schritte ausführen:

1. Navigieren Sie in der [Google Cloud Console](https://console.cloud.google.com/iam-admin/iam) zur IAM- und Admin-Seite.

2. Klicken Sie auf „Dienstkonten“ und dann auf „Dienstkonto erstellen“.

3. Geben Sie dem Dienstkonto einen Namen und wählen Sie die Rolle „Projekt“ > „Editor“.

4. Klicken Sie auf „Weiter“, um mit dem nächsten Schritt fortzufahren.

5. Klicken Sie auf der Registerkarte „Schlüssel“ auf „Schlüssel erstellen“ und wählen Sie das Format „JSON“. Klicken Sie dann auf „Weiter“.

6. Ihr privater Schlüssel wird generiert und automatisch heruntergeladen. Bewahren Sie diese Datei sicher auf, da Sie sie später benötigen.

#### Zugriff auf die Tabelle gewähren
Öffnen Sie die Tabelle, mit der Sie interagieren möchten, und geben Sie sie an die E-Mail-Adresse Ihres neu erstellten Servicekontos weiter:

1. Öffnen Sie die gewünschte Tabelle in Google Sheets.

2. Klicken Sie oben rechts auf „Teilen“.

3. Trage im Feld „Personen hinzufügen“ die E-Mail-Adresse des Dienstkontos ein und erteile ihm die nötigen Berechtigungen (z.B. „Bearbeiten“ oder „Anzeigen“).

4. Klicken Sie auf „Senden“, um den Freigabevorgang abzuschließen.

#### Konfigurieren Sie die Adapterinstanz
Fügen Sie der Konfiguration Ihrer Adapterinstanz in ioBroker die folgenden Informationen hinzu:

- **Tabellenkalkulations-ID** – Sie finden die ID in der URL Ihrer Tabelle.
- **Dienstkonto** – Die E-Mail-Adresse des von Ihnen erstellten Dienstkontos.
- **Privater Schlüssel** - Öffnen Sie die heruntergeladene JSON-Datei und suchen Sie den privaten Schlüssel in der Datei. Kopieren Sie nur den Teil, der mit „-----BEGIN PRIVATE KEY-----“ beginnt.

![Einstellungen](../../../en/adapterref/iobroker.google-spreadsheet/img/settings.png)

#### Suchen Sie die Tabellenkalkulations-ID in der URL
Um die „Spreadsheet-ID“ in der URL Ihres Google Sheets-Dokuments zu finden, folgen Sie diesen Schritten:

1. Wenn Sie Ihr Google Sheets-Dokument in einem Webbrowser öffnen, sieht die URL in der Adressleiste ungefähr so aus:

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

2. Die „SPREADSHEET_ID“ ist die lange Zeichenfolge aus Zeichen und Zahlen zwischen den Teilen „/d/“ und „/edit“ der URL.

### Blockly
Verwenden Sie die verfügbaren Blöcke, um automatisch mit Ihrer Tabelle zu interagieren.

![Blockly](../../../en/adapterref/iobroker.google-spreadsheet/img/blockly-append.png)

## Fehlerbehebung
### Fehler beim Senden der Daten an Google Spreadsheet:Fehler: error:0909006C:PEM routines:get_name:no start line
Beim Kopieren des privaten Schlüssels in die Konfiguration ist darauf zu achten, dass keine \n vorkommen. Wenn \n im Schlüssel vorkommen, ersetzen Sie diese bitte durch normale Zeilenumbrüche.

### Fehler beim Senden der Daten an Google Spreadsheet:Fehler: Der Anrufer hat keine Berechtigung
Stellen Sie sicher, dass das Dienstkonto über die erforderlichen Berechtigungen zum Schreiben in die Tabelle verfügt. Weitere Informationen finden Sie im Abschnitt „Zugriff auf die Tabelle gewähren“ weiter oben.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.0
* (Thomas Pohl) The privateKey is saved now encrypted
* (Thomas Pohl) Support for node.js 22
### 0.3.1
* (Thomas Pohl) Fixed reading cells and added error handling
### 0.3.0
* (Thomas Pohl) Added writing of single cells
* (Thomas Pohl) Added reading of single cells
* (Thomas Pohl) Documentation for all features
### 0.2.0
* (Thomas Pohl) Parsing of private keys is now more robust

### 0.1.0
* (Thomas Pohl) Preparation for first stable release
* (Thomas Pohl) Improve logging + Code cleanup

## License

   Copyright (c) 2024 Thomas Pohl

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.