---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md
title: Create-Sheet
hash: 4d+q79rbVnNUMlA1w580lJeSf9xXxY7Siocpdns1uso=
---
# Create-Sheet

➡️ Die [Dokumentation der sendTo-API](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) enthält allgemeine Informationen zur Verwendung und alle verfügbaren Befehle. Mit der Funktion „Tabelle erstellen“ können Sie einer Google-Tabelle ein neues Tabellenblatt hinzufügen.

Verwendeter API-Endpunkt: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate>

Die Funktion akzeptiert folgende Parameter:

- `sheetName` : Der Name des neu hinzuzufügenden Tabellenblatts.
- `alias` (optional): Der Tabellenalias, falls Sie mehrere Tabellen konfiguriert haben.

**Callback-Ergebnis:**`{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall.

## Blockly

![Blockly](../../../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-create-sheet.png)

Der Blockly-Block ist ein Container-Block. Die Anweisungen innerhalb des Blocks werden nur ausgeführt, wenn das Blatt erfolgreich erstellt wurde.

### Fehlerbehandlung

Sie können eine Fehlerbehandlungsroutine über das Zahnradsymbol (Mutator, Drag & Drop) hinzufügen. Anweisungen in der Fehlerbehandlungsroutine werden nur ausgeführt, wenn beim Erstellen des Tabellenblatts ein Fehler auftritt.

**Verhalten:**

- **Ohne Fehlerbehandlung:** Die Anweisungen im Block werden immer ausgeführt, unabhängig vom Ergebnis.
- **Mit Fehlerbehandlung:**
  - Die Anweisungen im Block werden nur im Erfolgsfall ausgeführt.
  - Die Anweisungen im Fehlerbehandlungsmechanismus werden nur im Fehlerfall ausgeführt.

Die Parameter`sheetName` und optional`alias` werden wie üblich weitergegeben.

### Beispiel

```javascript
sendTo(
  "google-spreadsheet.0",
  "createSheet",
  { sheetName: "nameOfNewSheet" },
  function (res) {
    if (res && res.error) {
      // Error handler code
    } else {
      // Success code
    }
  }
);
```

## Javascript

Der angegebene Codeausschnitt fügt der Tabelle ein neues Tabellenblatt mit dem angegebenen Titel hinzu.

```javascript

sendTo(
  "google-spreadsheet.0",
  "createSheet",
  { sheetName: "nameOfNewSheet" }
);
```