---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md
title: Записать ячейку
hash: 3Jem5HlP0oC+J1EFfL4htrnDkoeABjZVJXxNzwkq5HU=
---
# Записать ячейку

➡️ См. [документацию по API sendTo](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) для получения информации об общем использовании и всех доступных командах. Функция записи в ячейку позволяет записывать данные в определенную ячейку в электронной таблице Google.

Использованная конечная точка API: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update>

Данная функция принимает следующие параметры:

- `sheetName` Название листа.
- `cell` Адрес ячейки (например):`A1` ).
- `data` : Значение, которое нужно записать.
- `alias` (необязательно): псевдоним электронной таблицы, если у вас настроено несколько электронных таблиц.

**Результат обратного вызова:**`{ success: true }` в случае успеха или`{ error: string }` при неудаче.

## Блокли

![Блокли](../../../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-write-cell.png)

В Blockly параметры`sheetName` и`cell` Они объединяются для формирования параметра диапазона для API Google. Параметр диапазона может принимать имя листа и ячейку в формате A1. Например, вы можете использовать 'Sheet1!A1' для выбора конкретной ячейки.

## JavaScript

Приведённый фрагмент кода записывает данные в определённую ячейку электронной таблицы.

```javascript
sendTo(
  "google-spreadsheet", 
  "writeCell", {  
    "sheetName": "nameOfTab", 
    "cell": "A1",
    "data": "Hello, World!"
  }
);
```