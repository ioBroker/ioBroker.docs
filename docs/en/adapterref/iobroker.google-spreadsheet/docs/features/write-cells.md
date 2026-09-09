---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
---
# Write multiple cells

➡️ See the [sendTo API documentation](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) for general usage and all available commands.

With the `writeCells` block you can write values to multiple cells in your Google Spreadsheet at once.

## Blockly

![Blockly](../img/blockly-write-cells.png)

Use the block **write cells to [instance] cells** and add one or more cell blocks.  
Each cell block lets you specify:
- **Sheet**: The name of the sheet
- **Cell**: The cell address (e.g. `A1`)
- **Data**: The value to write

Example Blockly setup:
- write cells to `google-spreadsheet.0`
  - Sheet: `Log`, Cell: `A1`, Data: `Hello`
  - Sheet: `Log`, Cell: `B1`, Data: `World`

## JavaScript

You can also call the function directly:

```javascript
sendTo("google-spreadsheet.0", "writeCells", {
    cells: [
        { sheetName: "Log", cell: "A1", data: "Hello" },
        { sheetName: "Log", cell: "B1", data: "World" }
    ]
});
```

## Parameters

- **instance**: The instance of your google-spreadsheet adapter.
- **cells**: Array of objects with the following properties:
  - **sheetName**: Name of the sheet
  - **cell**: Cell address (e.g. `A1`)
  - **data**: Value to write
- **alias** (optional): The spreadsheet alias if you have multiple spreadsheets configured.

**Callback result:** `{ success: true }` on success, or `{ error: string }` on failure.

## Example

```javascript
sendTo("google-spreadsheet.0", "writeCells", {
    cells: [
        { sheetName: "Log", cell: "A1", data: "Temperature" },
        { sheetName: "Log", cell: "B1", data: 22.5 }
    ]
});
```

This will write "Temperature" to cell A1 and 22.5 to cell B1 in the sheet "Log".