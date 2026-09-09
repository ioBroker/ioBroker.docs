---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md
title: Mehrere Zellen schreiben
hash: qhTx5XTL6yp7H0GGCwBhREMW+yf+p+TUw6YZLpY+j24=
---
# Mehrere Zellen schreiben

➡️ Die [Dokumentation zur sendTo-API](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) enthält allgemeine Informationen zur Verwendung und alle verfügbaren Befehle.

Mit dem`writeCells` Mit dem Block können Sie gleichzeitig Werte in mehrere Zellen Ihrer Google-Tabelle schreiben.

## Blockly

![Blockly](../../../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-write-cells.png)

Verwenden Sie den Block " **Zellen in \[Instanz] Zellen schreiben"** und fügen Sie einen oder mehrere Zellblöcke hinzu.\
&#x20;In jedem Zellenblock können Sie Folgendes angeben:

- **Blatt** : Der Name des Blattes
- **Zelle** : Die Zelladresse (z. B.`A1` )
- **Daten** : Der zu schreibende Wert

Beispielhafte Blockly-Konfiguration:

- Zellen schreiben`google-spreadsheet.0`
  - Blatt:`Log` Zelle:`A1` Daten:`Hello`
  - Blatt:`Log` Zelle:`B1` Daten:`World`

## JavaScript

Sie können die Funktion auch direkt aufrufen:

```javascript
sendTo("google-spreadsheet.0", "writeCells", {
    cells: [
        { sheetName: "Log", cell: "A1", data: "Hello" },
        { sheetName: "Log", cell: "B1", data: "World" }
    ]
});
```

## Parameter

- **Instanz** : Die Instanz Ihres Google-Tabellen-Adapters.
- **Zellen** : Array von Objekten mit folgenden Eigenschaften:
  - **Blattname** : Name des Blattes
  - **Zelle** : Zelladresse (z. B.`A1` )
  - **Daten** : Zu schreibender Wert
- **Alias** (optional): Der Tabellenkalkulationsalias, falls Sie mehrere Tabellenkalkulationen konfiguriert haben.

**Callback-Ergebnis:**`{ success: true }` auf Erfolg oder`{ error: string }` im Fehlerfall.

## Beispiel

```javascript
sendTo("google-spreadsheet.0", "writeCells", {
    cells: [
        { sheetName: "Log", cell: "A1", data: "Temperature" },
        { sheetName: "Log", cell: "B1", data: 22.5 }
    ]
});
```

Dadurch wird in Zelle A1 „Temperatur“ und in Zelle B1 22,5 in das Tabellenblatt „Log“ geschrieben.