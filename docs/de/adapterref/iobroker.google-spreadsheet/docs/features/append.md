---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/docs/features/append.md
title: Anhängen
hash: x+VLLhQBwGR1iYnIgTOLBeFmJJtloO1SKMSPn2Mndpo=
---
# Anhängen

➡️ Die [Dokumentation der sendTo-API](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) enthält allgemeine Informationen zur Verwendung und alle verfügbaren Befehle. Mit der Funktion „Anhängen“ können Sie Daten an eine Google-Tabelle anhängen.

Verwendeter API-Endpunkt: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append>

Die Funktion akzeptiert folgende Parameter:

- `sheetName` : Der Name des Tabellenblatts, an das angehängt werden soll.
- `data` Die anzuhängenden Daten (Einzelwert oder eindimensionales Array).
- `alias` (optional): Der Tabellenalias, falls Sie mehrere Tabellen konfiguriert haben.

**Callback-Ergebnis:**`{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall.

## Blockly

![Blockly](../../../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-append.png)

In Blockly wird der Parameter „sheetname“ immer als Bereichsparameter an die Google API übergeben. Der Bereichsparameter kann jedoch nicht nur einen Tabellennamen, sondern auch eine Zelle in der A1-Notation akzeptieren. Wenn Sie Daten an eine bestimmte Zelle anhängen möchten, können Sie diese Zelle mithilfe des Bereichsparameters angeben. Beispielsweise können Sie „Sheet1!A1:A1“ verwenden, um eine bestimmte Zelle anzusprechen.

## Javascript

Der gegebene Codeausschnitt fügt der Tabelle eine neue Zeile hinzu. Jeder der drei Array-Werte erzeugt eine eigene Zelle in der Tabelle.

```javascript

sendTo(
  "google-spreadsheet", 
  "append", {  
    "sheetName": "nameOfTab", 
    "data":[
      formatDate(new Date(), 'hh:mm'), 
      getState('mqtt.0.inverter.total.YieldDay').val, 
      getState('mqtt.0.inverter.total.P_AC').val
    ]
  }
);
```