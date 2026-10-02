---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md":{"title":{"en":"Get Last Row"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-range.md":{"title":{"en":"Read Range"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-range.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-range.md":{"title":{"en":"Write Range"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-range.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/clear-range.md":{"title":{"en":"Clear Range"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/clear-range.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/set-cell-format.md":{"title":{"en":"Set Cell Format"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/set-cell-format.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-chart.md":{"title":{"en":"Create Chart"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-chart.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/update-chart.md":{"title":{"en":"Update Chart"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/update-chart.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md
title: sendTo-API für ioBroker.google-spreadsheet
hash: 950ckpsWl2LGWk9g9ajEvVfXNNKfrKBU9INOJHFl5MI=
---
# sendTo-API für ioBroker.google-spreadsheet

Dieses Dokument beschreibt die `sendTo` API für den ioBroker-Adapter **Google Tabellen** . Die API verwendet die `command` Parameter zur Unterscheidung verschiedener Tabellenkalkulationsoperationen. Jeder Befehl erwartet eine spezifische Nutzlast. Die Rückruffunktion ist optional und kann verwendet werden, um das Ergebnis der Operation zu erhalten.

## Verwendung

```js
sendTo('google-spreadsheet.<instance>', <command>, <message>[, callback]);
```

- `<instance>` Die Instanznummer Ihres Adapters (z. B. `0`)
- `<command>` Einer der unten aufgeführten unterstützten Befehle.
- `<message>` Ein Objekt mit den erforderlichen Parametern für den Befehl
- `[callback]` (optional): Funktion zur Verarbeitung des Ergebnisses

## Unterstützte Befehle

| Befehl           | Beschreibung                                             | Erforderliche Parameter               | Ergebnis / Rückrufantwort                                               |
| ---------------- | -------------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| `append`         | Daten an ein Tabellenblatt anhängen                      | `sheetName`, `data`, `alias?`         | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `deleteRows`     | Zeilen aus einem Tabellenblatt löschen                   | `sheetName`, `start`, `end`, `alias?` | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `createSheet`    | Neues Tabellenblatt erstellen                            | `sheetName`, `alias?`                 | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `deleteSheet`    | Löschen Sie ein Blatt                                    | `sheetName`, `alias?`                 | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `deleteSheets`   | Mehrere Tabellenblätter löschen                          | `sheetNames`, `alias?`                | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `duplicateSheet` | Ein Blatt duplizieren                                    | `source`, `target`, `index`, `alias?` | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `getLastRow`     | Ermitteln Sie die Nummer der letzten nicht leeren Zeile. | `sheet`, `alias?`                     | Die Zeilennummer, `{ error: string }` im Fehlerfall                      |
| `upload`         | Laden Sie eine Datei in Google Drive hoch.               | `target`, `parentFolder`, `source`    | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `writeCell`      | In eine einzelne Zelle schreiben                         | `sheetName`, `cell`, `data`, `alias?` | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `writeCells`     | In mehrere Zellen schreiben                              | `cells`, `alias?`                     | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `readCell`       | Eine einzelne Zelle lesen                                | `sheetName`, `cell`, `alias?`         | `{ value: any }` mit dem Zellwert oder `{ error: string }` im Fehlerfall |
| `readRange`      | Lesen Sie einen rechteckigen Bereich                     | `sheet`, `range`, `alias?`            | `{ values: any[][] }` auf Erfolg oder `{ error: string }` im Fehlerfall  |
| `writeRange`     | Schreibe einen rechteckigen Bereich                      | `sheet`, `range`, `values`, `alias?`  | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `clearRange`     | Rechteckigen Bereich freiräumen                          | `sheet`, `range`, `alias?`            | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `setCellFormat`  | Formatierung für einen Bereich festlegen                 | `sheet`, `range`, `format`, `alias?`  | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `createChart`    | Erstellen Sie ein Diagramm                               | `sheet`, `chart`, `alias?`            | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |
| `updateChart`    | Aktualisieren Sie ein bestehendes Diagramm               | `sheet`, `chartId`, `chart`, `alias?` | `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall    |

### Ergebnisdetails

- Bei den meisten Befehlen wird, sofern eine Callback-Funktion angegeben ist, ein Objekt empfangen. `{ success: true }` wenn die Operation erfolgreich war, oder `{ error: string }` falls ein Fehler aufgetreten ist.
- Für `readCell` Wenn ein Callback angegeben wird, empfängt er `{ value: any }` mit dem Zellwert oder `{ error: string }` falls das Lesen fehlschlägt.

### Parameterdetails

- `alias` ist optional und bezieht sich auf den Tabellenalias, falls Sie mehrere Tabellen konfiguriert haben.
- Für `writeCells`, `cells` ist ein Array von Objekten: `{ sheetName, cell, data }` Die

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
- [Letzte Zeile abrufen](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md)
- [Zelle lesen](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md)
- [Lesebereich](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/read-range.md)
- [Zelle schreiben](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md)
- [Zellen schreiben](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md)
- [Schreibbereich](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/write-range.md)
- [Freie Reichweite](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/clear-range.md)
- [Zellenformat festlegen](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/set-cell-format.md)
- [Diagramm erstellen](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/create-chart.md)
- [Diagramm aktualisieren](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/update-chart.md)

---

Zurück zur [README.md](/#/adapters/google-spreadsheet)