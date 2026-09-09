---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md
title: API sendTo для ioBroker.google-spreadsheet
hash: xmruuXr1CoeZolr3kWjjmYqdIVhtm0AZPWqbyUWX3gI=
---
# API sendTo для ioBroker.google-spreadsheet

В этом документе описывается`sendTo` API для адаптера ioBroker **google-spreadsheet** . API использует`command` Параметр, позволяющий различать различные операции с электронными таблицами. Каждая команда ожидает определенную полезную нагрузку. Функция обратного вызова является необязательной и может использоваться для получения результата операции.

## Использование

```js
sendTo('google-spreadsheet.<instance>', <command>, <message>[, callback]);
```

- `<instance>` : Номер экземпляра вашего адаптера (например,`0` )
- `<command>` : Одна из поддерживаемых команд, перечисленных ниже.
- `<message>` Объект, содержащий необходимые параметры для команды.
- `[callback]` (необязательно): Функция для обработки результата

## Поддерживаемые команды

| Командование     | Описание                      | Необходимые параметры                 | Результат / Ответ на обратный звонок                                     |
| ---------------- | ----------------------------- | ------------------------------------- | ------------------------------------------------------------------------ |
| `append`         | Добавить данные в таблицу     | `sheetName` ,`data` ,`alias?`         | `{ success: true }` в случае успеха или`{ error: string }` при неудаче   |
| `deleteRows`     | Удаление строк из таблицы     | `sheetName` ,`start` ,`end` ,`alias?` | `{ success: true }` в случае успеха или`{ error: string }` при неудаче   |
| `createSheet`    | Создать новый лист            | `sheetName` ,`alias?`                 | `{ success: true }` в случае успеха или`{ error: string }` при неудаче   |
| `deleteSheet`    | Удалить лист                  | `sheetName` ,`alias?`                 | `{ success: true }` в случае успеха или`{ error: string }` при неудаче   |
| `deleteSheets`   | Удалить несколько листов      | `sheetNames` ,`alias?`                | `{ success: true }` в случае успеха или`{ error: string }` при неудаче   |
| `duplicateSheet` | Сделайте дубликат листа       | `source` ,`target` ,`index` ,`alias?` | `{ success: true }` в случае успеха или`{ error: string }` при неудаче   |
| `upload`         | Загрузите файл на Google Диск | `target` ,`parentFolder` ,`source`    | `{ success: true }` в случае успеха или`{ error: string }` при неудаче   |
| `writeCell`      | Запись в одну ячейку          | `sheetName` ,`cell` ,`data` ,`alias?` | `{ success: true }` в случае успеха или`{ error: string }` при неудаче   |
| `writeCells`     | Запись в несколько ячеек      | `cells` ,`alias?`                     | `{ success: true }` в случае успеха или`{ error: string }` при неудаче   |
| `readCell`       | Прочитать отдельную клетку    | `sheetName` ,`cell` ,`alias?`         | `{ value: any }` со значением ячейки, или`{ error: string }` при неудаче |

### Подробности результатов

- Для большинства команд, если указана функция обратного вызова, она получает объект.`{ success: true }` если операция прошла успешно, или`{ error: string }` если произошла ошибка.
- Для`readCell` Если указана функция обратного вызова, она получает`{ value: any }` со значением ячейки, или`{ error: string }` если чтение не удалось.

### Подробная информация о параметрах

- `alias` Этот параметр является необязательным и относится к псевдониму электронной таблицы, если у вас настроено несколько электронных таблиц.
- Для`writeCells` ,`cells` представляет собой массив объектов:`{ sheetName, cell, data }` .

## Пример

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

## Документация по функциональным возможностям

Подробное описание использования и примеры применения каждой команды см. в следующих документах:

- [Добавить](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/append.md)
- [Создать лист](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md)
- [Удалить строки](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md)
- [Удалить лист](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md)
- [Удалить листы](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md)
- [Дубликат листа](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md)
- [Прочитать ячейку](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md)
- [Записать ячейку](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md)
- [Запись ячеек](/#/docs/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md)

---

Вернуться к [файлу README.md](/#/adapters/google-spreadsheet)