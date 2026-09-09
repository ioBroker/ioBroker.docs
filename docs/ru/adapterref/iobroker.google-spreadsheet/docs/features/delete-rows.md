---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md
title: Удалить строки
hash: G/7xlYwCyoebbOPL+CWq8VwL8IHEWY0BXeyGJKX43Eo=
---
# Удалить строки

➡️ Для получения информации об общем использовании и всех доступных командах см. [документацию по API sendTo](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) .

Функция удаления строк позволяет удалять определенные строки из электронной таблицы Google.

Используемая конечная точка API: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate>

Данная функция принимает следующие параметры:

- `sheetName` : Название листа, с которого необходимо удалить строки.
- `start` : Индекс первой строки для удаления (начиная с 0).
- `end` : Индекс последней удаляемой строки (без учета индексов, начиная с 0).

**Результат обратного вызова:**`{ success: true }` в случае успеха или`{ error: string }` при неудаче.

## Блокли

![Блокли](../../../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-delete-rows.png)

В Blockly параметры`sheetName` ,`start` , и`end` передаются в API Google.

## JavaScript

Приведённый фрагмент кода удаляет строки из электронной таблицы в пределах указанного диапазона строк.

```javascript
sendTo(
  "google-spreadsheet", 
  "deleteRows", {  
    "sheetName": "yourSheetName",
    "start": startRow,
    "end": endRow
  }
);
```