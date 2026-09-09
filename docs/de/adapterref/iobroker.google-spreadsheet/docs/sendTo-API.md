---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md
title: sendTo-API für ioBroker.google-spreadsheet
hash: xmruuXr1CoeZolr3kWjjmYqdIVhtm0AZPWqbyUWX3gI=
---
# sendTo-API für ioBroker.google-spreadsheet

Dieses Dokument beschreibt die`sendTo` API für den ioBroker-Adapter **Google Tabellen** . Die API verwendet die`command` Parameter zur Unterscheidung verschiedener Tabellenkalkulationsoperationen. Jeder Befehl erwartet eine spezifische Nutzlast. Die Rückruffunktion ist optional und kann verwendet werden, um das Ergebnis der Operation zu erhalten.

## Verwendung

```js
sendTo('google-spreadsheet.<instance>', <command>, <message>[, callback]);
```

- `<instance>` Die Instanznummer Ihres Adapters (z. B.`0` )
- `<command>` Einer der unten aufgeführten unterstützten Befehle.
- `<message>` Ein Objekt mit den erforderlichen Parametern für den Befehl
- `[callback]` (optional): Funktion zur Verarbeitung des Ergebnisses

## Unterstützte Befehle

| Befehl           | Beschreibung                               | Erforderliche Parameter               | Ergebnis / Rückrufantwort                                               |
| ---------------- | ------------------------------------------ | ------------------------------------- | ----------------------------------------------------------------------- |
| `append`         | Daten an ein Tabellenblatt anhängen        | `sheetName` ,`data` ,`alias?`         | `{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall    |
| `deleteRows`     | Zeilen aus einem Tabellenblatt löschen     | `sheetName` ,`start` ,`end` ,`alias?` | `{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall    |
| `createSheet`    | Neues Tabellenblatt erstellen              | `sheetName` ,`alias?`                 | `{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall    |
| `deleteSheet`    | Löschen Sie ein Blatt                      | `sheetName` ,`alias?`                 | `{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall    |
| `deleteSheets`   | Mehrere Tabellenblätter löschen            | `sheetNames` ,`alias?`                | `{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall    |
| `duplicateSheet` | Ein Blatt duplizieren                      | `source` ,`target` ,`index` ,`alias?` | `{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall    |
| `upload`         | Laden Sie eine Datei in Google Drive hoch. | `target` ,`parentFolder` ,`source`    | `{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall    |
| `writeCell`      | In eine einzelne Zelle schreiben           | `sheetName` ,`cell` ,`data` ,`alias?` | `{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall    |
| `writeCells`     | In mehrere Zellen schreiben                | `cells` ,`alias?`                     | `{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall    |
| `readCell`       | Eine einzelne Zelle lesen                  | `sheetName` ,`cell` ,`alias?`         | `{ value: any }` mit dem Zellwert oder`{ error: string }` im Fehlerfall |

### Ergebnisdetails

- Bei den meisten Befehlen wird, sofern eine Callback-Funktion angegeben ist, ein Objekt empfangen.`{ success: true }` wenn die Operation erfolgreich war, oder`{ error: string }` falls ein Fehler aufgetreten ist.
- Für`readCell` Wenn ein Callback angegeben wird, empfängt er`{ value: any }` mit dem Zellwert oder`{ error: string }` falls das Lesen fehlschlägt.

### Parameterdetails

- `alias` ist optional und bezieht sich auf den Tabellenalias, falls Sie mehrere Tabellen konfiguriert haben.
- Für`writeCells` ,`cells` ist ein Array von Objekten:`{ sheetName, cell, data }` Die

## Beispiel

```js
// Read a cell (with callback)
sendTo('google-spreadsheet.0', 'readCell', { sheetName: 'Sheet1', cell: 'A1' }, (result) => {
    console.log('Cell value:', result);
});

// Write to a cell (with callback)
sendTo('google-spreadsheet.0', 'writeCell', { sheetName: 'Sheet1', cell: 'A1', data: 'Hello' }, (result) => {
    console.log('Write result:', result);
});

// Write to a cell (without callback)
sendTo('google-spreadsheet.0', 'writeCell', { sheetName: 'Sheet1', cell: 'A1', data: 'Hello' });
```

## Funktionsdokumentation

Detaillierte Informationen zur Verwendung und Beispiele der einzelnen Befehle finden Sie in den folgenden Dokumenten:

- [Anhängen](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/append.md)
- [Arbeitsblatt erstellen](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md)
- [Zeilen löschen](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md)
- [Löschblatt](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md)
- [Tabellen löschen](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md)
- [Duplikatblatt](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md)
- [Zelle lesen](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md)
- [Zelle schreiben](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md)
- [Zellen schreiben](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md)

---

Zurück zur [README.md](/#/adapters/google-spreadsheet)