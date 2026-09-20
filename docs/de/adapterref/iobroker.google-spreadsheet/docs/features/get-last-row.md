---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md":{"title":{"en":"Get Last Row"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md
title: Letzte Zeile abrufen
hash: aeHuJEQUuKiSXSFYd7xwfAs+Ylm1l+uorgXmPU2VmrE=
---
# Letzte Zeile abrufen

Die [Dokumentation zur sendTo-API](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) enthält allgemeine Informationen zur Verwendung und alle verfügbaren Befehle.

Die Funktion „Letzte Zeile abrufen“ gibt die Nummer der letzten nicht leeren Zeile in einem Google Sheets-Tabellenblatt zurück. Sie ermittelt lediglich die Zeilennummer; das Auslesen der Werte aus dieser Zeile erfolgt in einem separaten Vorgang.

Verwendeter API-Endpunkt: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get>

Die Funktion akzeptiert folgende Parameter:

- `sheet`: Der Name des Blattes.
- `alias` (optional): Der Tabellenalias, wenn mehrere Tabellen konfiguriert sind.

**Callback-Ergebnis:** Die Zeilennummer als Zahl. Ein leeres Tabellenblatt wird zurückgegeben. `0` Im Fehlerfall empfängt der Callback `{ error: string }` Die

## Blockly

Der Blockly-Block gibt die letzte nicht leere Zeilennummer als numerischen Wert zurück. Er kann als Eingabe für andere Blöcke verwendet werden, beispielsweise um einen Bereich für einen späteren Lesevorgang zu erstellen.

## JavaScript

Das folgende Beispiel liest die Nummer der letzten nicht leeren Zeile aus:

```javascript
sendTo(
  'google-spreadsheet.0',
  'getLastRow',
  { sheet: 'Sheet1' },
  (response) => console.log('Last row:', response),
);
```