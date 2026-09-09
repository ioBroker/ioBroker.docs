---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md
title: Zeilen löschen
hash: G/7xlYwCyoebbOPL+CWq8VwL8IHEWY0BXeyGJKX43Eo=
---
# Zeilen löschen

➡️ Die [Dokumentation zur sendTo-API](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) enthält allgemeine Informationen zur Verwendung und alle verfügbaren Befehle.

Mit der Funktion „Zeilen löschen“ können Sie bestimmte Zeilen aus einer Google-Tabelle löschen.

Verwendeter API-Endpunkt: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate>

Die Funktion akzeptiert folgende Parameter:

- `sheetName` : Der Name des Tabellenblatts, aus dem Zeilen gelöscht werden sollen.
- `start` Der Index der ersten zu löschenden Zeile (beginnend bei 0).
- `end` : Der Index der zuletzt zu löschenden Zeile (exklusiv, nullbasiert).

**Callback-Ergebnis:**`{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall.

## Blockly

![Blockly](../../../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-delete-rows.png)

In Blockly sind die Parameter`sheetName` ,`start` , Und`end` werden an die Google API übergeben.

## Javascript

Der angegebene Codeausschnitt löscht Zeilen aus der Tabelle innerhalb des angegebenen Zeilenbereichs.

```javascript
sendTo(
  "google-spreadsheet", 
  "deleteRows", {  
    "sheetName": "yourSheetName",
    "start": startRow,
    "end": endRow
  }
);
```