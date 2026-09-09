---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md
title: Zelle lesen
hash: OWQCArvgC+zcfTBmXrCmPjnIYqBcoUjNbNSnCyePdc8=
---
# Zelle lesen

➡️ Die [Dokumentation der sendTo-API](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) enthält allgemeine Informationen zur Verwendung und alle verfügbaren Befehle. Mit der Funktion „Zelle lesen“ können Sie Daten aus einer bestimmten Zelle in einer Google-Tabelle auslesen.

Verwendeter API-Endpunkt: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get>

Die Funktion akzeptiert folgende Parameter:

- `sheetName` : Der Name des Blattes.
- `cell` Die Zelladresse (z. B.`A1` ).
- `alias` (optional): Der Tabellenalias, falls Sie mehrere Tabellen konfiguriert haben.

**Callback-Ergebnis:**`{ value: any }` mit dem Zellwert oder`{ error: string }` im Fehlerfall.

## Blockly

![Blockly](../../../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-read-cell.png)

In Blockly sind die Parameter`sheetName` Und`cell` Diese werden kombiniert, um den Bereichsparameter für die Google API zu bilden. Der Bereichsparameter akzeptiert einen Tabellennamen und eine Zelle in der A1-Notation. Beispielsweise können Sie „Tabelle1!A1“ verwenden, um eine bestimmte Zelle anzusprechen.

## Javascript

Der angegebene Codeausschnitt liest Daten aus einer bestimmten Zelle in der Tabelle.

```javascript
sendTo(
  "google-spreadsheet", 
  "readCell", {  
    "sheetName": "nameOfTab", 
    "cell": "A1"
  },
  (response)=>{console.log(response);}
);
```