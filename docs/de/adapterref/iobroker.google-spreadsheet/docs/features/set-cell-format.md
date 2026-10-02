---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md":{"title":{"en":"Get Last Row"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-range.md":{"title":{"en":"Read Range"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-range.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-range.md":{"title":{"en":"Write Range"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-range.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/clear-range.md":{"title":{"en":"Clear Range"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/clear-range.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/set-cell-format.md":{"title":{"en":"Set Cell Format"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/set-cell-format.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-chart.md":{"title":{"en":"Create Chart"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-chart.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/update-chart.md":{"title":{"en":"Update Chart"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/update-chart.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/docs/features/set-cell-format.md
title: Zellenformat festlegen
hash: lpp+6Cx7/qdHzUIDQjlTuUSIIWE70+h+f7qpNcw2Q30=
---
# Zellenformat festlegen

➡️ Die [Dokumentation der sendTo-API](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) enthält allgemeine Informationen zur Verwendung und alle verfügbaren Befehle. Mit der Funktion „Zellformat festlegen“ wird ein Zellbereich formatiert.

Verwendeter API-Endpunkt: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate>

Die Funktion akzeptiert folgende Parameter:

- `sheet`: Der Name des Blattes.
- `range` Die A1-Reihe zum Beispiel `A1:B5` Die
- `format` Formatierungsoptionen wie z. B. `backgroundColor`, `textFormat`, `horizontalAlignment`, `verticalAlignment`, Und `numberFormat` Die
- `alias` (optional): Der Tabellenalias, falls Sie mehrere Tabellen konfiguriert haben.

In Blockly eingeben `format` als JSON-Objekt im Formatblock, zum Beispiel `{"backgroundColor":{"red":1,"green":0,"blue":0},"textFormat":{"bold":true}}` Die

**Callback-Ergebnis:** `{ success: true }` auf Erfolg oder `{ error: string }` im Fehlerfall.

## Javascript

### 1) Eine Kopfzeile hervorheben

Dieses Beispiel färbt die erste Zeile einer Tabelle ein, formatiert den Text fett und zentriert ihn.

```javascript
sendTo(
  'google-spreadsheet.0',
  'setCellFormat',
  {
    sheet: 'Sheet1',
    range: 'A1:F1',
    format: {
      backgroundColor: '#1f4e78',
      textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
      horizontalAlignment: 'CENTER',
      verticalAlignment: 'MIDDLE',
    },
    alias: 'main',
  },
  response => {
    console.log(response);
  },
);
```

### 2) Überfällige Beträge rot markieren.

Verwenden Sie dies für eine Status- oder KPI-Tabelle, zum Beispiel um negative oder fehlende Werte hervorzuheben.

```javascript
sendTo(
  'google-spreadsheet.0',
  'setCellFormat',
  {
    sheet: 'Sheet1',
    range: 'B2:B30',
    format: {
      backgroundColor: { red: 1, green: 0.8, blue: 0.8 },
      textFormat: { bold: true, italic: false },
      horizontalAlignment: 'LEFT',
    },
    alias: 'main',
  },
  response => {
    console.log(response);
  },
);
```

### 3) Legen Sie ein Zahlenformat für einen Wertebereich fest

Dies ist nützlich für Währungen, Prozentsätze oder Zeitstempel.

```javascript
sendTo(
  'google-spreadsheet.0',
  'setCellFormat',
  {
    sheet: 'Sheet1',
    range: 'C2:C100',
    format: {
      numberFormat: {
        type: 'CURRENCY',
        pattern: '€#,##0.00',
      },
      horizontalAlignment: 'RIGHT',
    },
    alias: 'main',
  },
  response => {
    console.log(response);
  },
);
```

### 4) Formatieren Sie eine einzelne Zelle mit einem benutzerdefinierten Hintergrund

Verwenden Sie einen einzelnen Zellbereich, wenn Sie ein bestimmtes Ergebnis hervorheben möchten.

```javascript
sendTo(
  'google-spreadsheet.0',
  'setCellFormat',
  {
    sheet: 'Sheet1',
    range: 'E5',
    format: {
      backgroundColor: '#d9ead3',
      textFormat: { bold: true },
      horizontalAlignment: 'CENTER',
      verticalAlignment: 'MIDDLE',
    },
    alias: 'main',
  },
  response => {
    console.log(response);
  },
);
```

### 5) Wenden Sie die gleiche Formatierung auf mehrere Abschnitte an.

Sie können den Bereich als Block beibehalten, z. B. einen ganzen Tabellenbereich, und nur das Stilobjekt variieren.

```javascript
sendTo(
  'google-spreadsheet.0',
  'setCellFormat',
  {
    sheet: 'Dashboard',
    range: 'A2:D20',
    format: {
      backgroundColor: { red: 0.94, green: 0.97, blue: 1 },
      horizontalAlignment: 'CENTER',
      verticalAlignment: 'MIDDLE',
    },
    alias: 'dashboard',
  },
  response => {
    console.log(response);
  },
);
```

## Anmerkungen

- `backgroundColor` kann als Hexadezimalzeichenkette angegeben werden, z. B. `'#ff0000'` oder als Objekt mit `red`, `green`, `blue` und optional `alpha` Werte.
- `textFormat` unterstützt Felder wie `bold`, `italic`, `foregroundColor` und ähnliche Texteigenschaften von Google Sheets.
- `numberFormat` Kann für Währungen, Prozentsätze, Datumsangaben oder benutzerdefinierte Anzeigeformate verwendet werden.
- Wird keine gültige Formatierungseigenschaft angegeben, schlägt der Aufruf mit einer Fehlermeldung wie der folgenden fehl: `No valid format properties provided` Die