---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md":{"title":{"en":"Get Last Row"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md
title: Добраться до последнего ряда
hash: aeHuJEQUuKiSXSFYd7xwfAs+Ylm1l+uorgXmPU2VmrE=
---
# Добраться до последнего ряда

Для получения информации об общем использовании и всех доступных командах см. [документацию по API sendTo](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) .

Функция получения последней строки возвращает номер последней непустой строки в таблице Google Sheets. Она определяет только номер строки; чтение значений из этой строки — отдельная операция.

Использованная конечная точка API: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get>

Данная функция принимает следующие параметры:

- `sheet` Название листа.
- `alias` (необязательно): псевдоним электронной таблицы, если настроено несколько электронных таблиц.

**Результат обратного вызова:** номер строки в числовом виде. Возвращается пустой лист. `0` В случае неудачи функция обратного вызова получает `{ error: string }`.

## Blockly

Блок Blockly возвращает номер последней непустой строки в виде числового значения. Его можно использовать в качестве входных данных для других блоков, например, для построения диапазона для последующей операции чтения.

## JavaScript

В следующем примере считывается номер последней непустой строки:

```javascript
sendTo(
  'google-spreadsheet.0',
  'getLastRow',
  { sheet: 'Sheet1' },
  (response) => console.log('Last row:', response),
);
```