---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
---
# Read Cell

➡️ See the [sendTo API documentation](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) for general usage and all available commands.
The read cell feature allows you to read data from a specific cell in a Google spreadsheet.

Used API endpoint: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get


The feature accepts the following parameters:
- `sheetName`: The name of the sheet.
- `cell`: The cell address (e.g. `A1`).
- `alias` (optional): The spreadsheet alias if you have multiple spreadsheets configured.

**Callback result:** `{ value: any }` with the cell value, or `{ error: string }` on failure.

## Blockly

![Blockly](../img/blockly-read-cell.png)

In Blockly, the parameters `sheetName` and `cell` are combined to form the range-parameter for the Google API. The range-parameter can accept a sheet name and a cell in A1 notation. For instance, you can use 'Sheet1!A1' to target a specific cell.

## Javascript

The given code snippet reads data from a specific cell in the spreadsheet.

```javascript
sendTo(
  "google-spreadsheet", 
  "readCell", {  
    "sheetName": "nameOfTab", 
    "cell": "A1"
  },
  (response)=>{console.log(response);}
);