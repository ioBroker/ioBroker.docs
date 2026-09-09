---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md
title: Создать лист
hash: 4d+q79rbVnNUMlA1w580lJeSf9xXxY7Siocpdns1uso=
---
# Создать лист

➡️ См. [документацию по API sendTo](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) для получения информации об общем использовании и всех доступных командах. Функция создания листа позволяет добавить новый лист в электронную таблицу Google.

Используемая конечная точка API: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate>

Данная функция принимает следующие параметры:

- `sheetName` : Название нового листа, который будет добавлен.
- `alias` (необязательно): псевдоним электронной таблицы, если у вас настроено несколько электронных таблиц.

**Результат обратного вызова:**`{ success: true }` в случае успеха или`{ error: string }` при неудаче.

## Блокли

![Блокли](../../../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-create-sheet.png)

Блок Blockly — это блок-контейнер. Операторы внутри блока выполняются только в том случае, если лист успешно создан.

### Обработка ошибок

Вы можете добавить обработчик ошибок, используя значок шестеренки (мутатор, перетаскивание). Операторы в обработчике ошибок выполняются только в том случае, если ошибка возникает при создании листа.

**Поведение:**

- **Без обработчика ошибок:** операторы внутри блока всегда выполняются, независимо от результата.
- **С обработчиком ошибок:**
  - Операторы внутри блока выполняются только в случае успешного выполнения.
  - Операторы в обработчике ошибок выполняются только при возникновении ошибки.

Параметры`sheetName` и необязательно`alias` Проходят проверку как обычно.

### Пример

```javascript
sendTo(
  "google-spreadsheet.0",
  "createSheet",
  { sheetName: "nameOfNewSheet" },
  function (res) {
    if (res && res.error) {
      // Error handler code
    } else {
      // Success code
    }
  }
);
```

## JavaScript

Приведённый фрагмент кода добавляет в электронную таблицу новый лист с указанным заголовком.

```javascript

sendTo(
  "google-spreadsheet.0",
  "createSheet",
  { sheetName: "nameOfNewSheet" }
);
```