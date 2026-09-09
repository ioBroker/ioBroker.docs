---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md
title: Запишите несколько ячеек
hash: qhTx5XTL6yp7H0GGCwBhREMW+yf+p+TUw6YZLpY+j24=
---
# Запишите несколько ячеек

➡️ Для получения информации об общем использовании и всех доступных командах см. [документацию по API sendTo](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) .

С`writeCells` С помощью этого блока вы можете записывать значения одновременно в несколько ячеек вашей электронной таблицы Google.

## Блокли

![Блокли](../../../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-write-cells.png)

Используйте блок **записи ячеек в ячейки \[экземпляра]** и добавьте один или несколько блоков ячеек.\
&#x20;Каждый блок ячеек позволяет указать:

- **Лист** : Название листа
- **Ячейка** : адрес ячейки (например)`A1` )
- **Данные** : значение, которое нужно записать.

Пример настройки Blockly:

- записать ячейки в`google-spreadsheet.0`
  - Лист:`Log` , Клетка:`A1` , Данные:`Hello`
  - Лист:`Log` , Клетка:`B1` , Данные:`World`

## JavaScript

Вы также можете вызвать функцию напрямую:

```javascript
sendTo("google-spreadsheet.0", "writeCells", {
    cells: [
        { sheetName: "Log", cell: "A1", data: "Hello" },
        { sheetName: "Log", cell: "B1", data: "World" }
    ]
});
```

## Параметры

- **instance** : Экземпляр вашего адаптера Google Таблиц.
- **cells** : Массив объектов со следующими свойствами:
  - **sheetName** : Название листа
  - **ячейка** : адрес ячейки (например)`A1` )
  - **данные** : значение для записи
- **alias** (необязательно): Псевдоним электронной таблицы, если у вас настроено несколько электронных таблиц.

**Результат обратного вызова:**`{ success: true }` в случае успеха или`{ error: string }` при неудаче.

## Пример

```javascript
sendTo("google-spreadsheet.0", "writeCells", {
    cells: [
        { sheetName: "Log", cell: "A1", data: "Temperature" },
        { sheetName: "Log", cell: "B1", data: 22.5 }
    ]
});
```

В ячейку A1 войдет значение "Температура", а в ячейку B1 на листе "Log" — значение 22,5.