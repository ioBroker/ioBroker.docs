---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md":{"title":{"en":"Get Last Row"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-range.md":{"title":{"en":"Read Range"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-range.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-range.md":{"title":{"en":"Write Range"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-range.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/clear-range.md":{"title":{"en":"Clear Range"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/clear-range.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/set-cell-format.md":{"title":{"en":"Set Cell Format"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/set-cell-format.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-chart.md":{"title":{"en":"Create Chart"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-chart.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/update-chart.md":{"title":{"en":"Update Chart"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/update-chart.md"}}}
---
# Append

➡️ See the [sendTo API documentation](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) for general usage and all available commands.
The append feature allows you to append data to a Google spreadsheet.

Used API endpoint: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append

The feature accepts the following parameters:
- `sheetName`: The name of the sheet to append to.
- `data`: The data to append (single value or one-dimensional array).
- `alias` (optional): The spreadsheet alias if you have multiple spreadsheets configured.

**Callback result:** `{ success: true }` on success, or `{ error: string }` on failure.

## Blockly

![Blockly](../img/blockly-append.png)

In Blockly, the parameter sheetname is always passed as the range-parameter to the Google API. However, the range-parameter can accept not only a sheet name but also a cell in A1 notation. If you need to append data to a specific cell, you can specify the cell using the range-parameter. For instance, you can use 'Sheet1!A1:A1' to target a specific cell.

## Javascript

The given code snippet adds a new row to the spreadsheet. Each of the three array values will create a distinct cell in the spreadsheet.

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