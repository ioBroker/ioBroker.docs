---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md
title: Mehrere Tabellenblätter löschen
hash: 370JQ2ESBhqyMPL05a039vBQETsSLV0m4Bmg5bSw1Ks=
---
# Mehrere Tabellenblätter löschen

➡️ Die [Dokumentation zur sendTo-API](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) enthält allgemeine Informationen zur Verwendung und alle verfügbaren Befehle.

Mit dem`deleteSheets` Mit diesem Block können Sie mehrere Tabellenblätter gleichzeitig aus Ihrer Google-Tabelle löschen.

## Blockly

![Blockly](../../../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-delete-sheets.png)

Verwenden Sie den Block " **Löschen Sie Blätter in \[Instanz] die Blätter mit Namen (Array)"** und geben Sie ein Array von Blattnamen an, z. B.`["Sheet1", "Sheet2"]` Die

## JavaScript

Sie können die Funktion auch direkt aufrufen:

```javascript
sendTo("google-spreadsheet.0", "deleteSheets", { sheetNames: ["Sheet1", "Sheet2"] });
```

## Parameter

- **Instanz** : Die Instanz Ihres Google-Tabellen-Adapters.
- **sheetNames** : Ein Array von Zeichenketten mit den Namen der zu löschenden Tabellenblätter.
- **Alias** (optional): Der Tabellenkalkulationsalias, falls Sie mehrere Tabellenkalkulationen konfiguriert haben.

**Callback-Ergebnis:**`{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall.

## Beispiel

```javascript
sendTo("google-spreadsheet.0", "deleteSheets", { sheetNames: ["Log", "Backup"] });
```

Dadurch werden die Tabellenblätter mit den Namen „Log“ und „Backup“ aus Ihrer Tabelle gelöscht.