---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
---
# sendTo API for ioBroker.google-spreadsheet


This document describes the `sendTo` API for the ioBroker adapter **google-spreadsheet**. The API uses the `command` parameter to distinguish between different spreadsheet operations. Each command expects a specific payload. The callback is optional and can be used to receive the result of the operation.

## Usage

```js
sendTo('google-spreadsheet.<instance>', <command>, <message>[, callback]);
```

- `<instance>`: The instance number of your adapter (e.g., `0`)
- `<command>`: One of the supported commands listed below
- `<message>`: An object with the required parameters for the command
- `[callback]` (optional): Function to handle the result

## Supported Commands

| Command         | Description                                 | Required Parameters                | Result / Callback Response |
|-----------------|---------------------------------------------|-------------------------------------|---------------------------|
| `append`        | Append data to a sheet                      | `sheetName`, `data`, `alias?`      | `{ success: true }` on success, or `{ error: string }` on failure |
| `deleteRows`    | Delete rows from a sheet                    | `sheetName`, `start`, `end`, `alias?` | `{ success: true }` on success, or `{ error: string }` on failure |
| `createSheet`   | Create a new sheet                          | `sheetName`, `alias?`              | `{ success: true }` on success, or `{ error: string }` on failure |
| `deleteSheet`   | Delete a sheet                              | `sheetName`, `alias?`              | `{ success: true }` on success, or `{ error: string }` on failure |
| `deleteSheets`  | Delete multiple sheets                      | `sheetNames`, `alias?`             | `{ success: true }` on success, or `{ error: string }` on failure |
| `duplicateSheet`| Duplicate a sheet                           | `source`, `target`, `index`, `alias?` | `{ success: true }` on success, or `{ error: string }` on failure |
| `upload`        | Upload a file to Google Drive               | `target`, `parentFolder`, `source` | `{ success: true }` on success, or `{ error: string }` on failure |
| `writeCell`     | Write to a single cell                      | `sheetName`, `cell`, `data`, `alias?` | `{ success: true }` on success, or `{ error: string }` on failure |
| `writeCells`    | Write to multiple cells                     | `cells`, `alias?`                  | `{ success: true }` on success, or `{ error: string }` on failure |
| `readCell`      | Read a single cell                          | `sheetName`, `cell`, `alias?`      | `{ value: any }` with the cell value, or `{ error: string }` on failure |

### Result Details

- For most commands, if a callback is provided, it receives an object `{ success: true }` if the operation was successful, or `{ error: string }` if an error occurred.
- For `readCell`, if a callback is provided, it receives `{ value: any }` with the cell value, or `{ error: string }` if reading failed.

### Parameter Details
- `alias` is optional and refers to the spreadsheet alias if you have multiple spreadsheets configured.
- For `writeCells`, `cells` is an array of objects: `{ sheetName, cell, data }`.

## Example

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

## Feature Documentation

For detailed usage and examples of each command, see the following documents:

- [Append](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/append.md)
- [Create Sheet](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md)
- [Delete Rows](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md)
- [Delete Sheet](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md)
- [Delete Sheets](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md)
- [Duplicate Sheet](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md)
- [Read Cell](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md)
- [Write Cell](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md)
- [Write Cells](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md)

---

Back to [README.md](/#/adapters/google-spreadsheet)