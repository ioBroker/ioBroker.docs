---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md":{"title":{"en":"Get Last Row"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/get-last-row.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-range.md":{"title":{"en":"Read Range"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-range.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-range.md":{"title":{"en":"Write Range"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-range.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/clear-range.md":{"title":{"en":"Clear Range"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/clear-range.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/set-cell-format.md":{"title":{"en":"Set Cell Format"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/set-cell-format.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-chart.md":{"title":{"en":"Create Chart"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-chart.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/update-chart.md":{"title":{"en":"Update Chart"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/update-chart.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.google-spreadsheet/docs/features/set-cell-format.md
title: Установить формат ячейки
hash: lpp+6Cx7/qdHzUIDQjlTuUSIIWE70+h+f7qpNcw2Q30=
---
# Установить формат ячейки

➡️ См. [документацию по API sendTo](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) для получения информации об общем использовании и всех доступных командах. Функция установки формата ячейки применяет форматирование к диапазону ячеек.

Используемая конечная точка API: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate>

Данная функция принимает следующие параметры:

- `sheet` Название листа.
- `range` Например, серия A1. `A1:B5`.
- `format`: Параметры форматирования, такие как `backgroundColor`, `textFormat`, `horizontalAlignment`, `verticalAlignment`, и `numberFormat`.
- `alias` (необязательно): псевдоним электронной таблицы, если у вас настроено несколько электронных таблиц.

В Blockly введите `format` в виде JSON-объекта в блоке форматирования, например. `{"backgroundColor":{"red":1,"green":0,"blue":0},"textFormat":{"bold":true}}`.

**Результат обратного вызова:** `{ success: true }` в случае успеха или `{ error: string }` при неудаче.

## Javascript

### 1) Выделите строку заголовка

В этом примере первая строка таблицы окрашивается, текст выделяется жирным шрифтом, а сам текст выравнивается по центру.

```javascript
sendTo(
  'google-spreadsheet.0',
  'setCellFormat',
  {
    sheet: 'Sheet1',
    range: 'A1:F1',
    format: {
      backgroundColor: '#1f4e78',
      textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
      horizontalAlignment: 'CENTER',
      verticalAlignment: 'MIDDLE',
    },
    alias: 'main',
  },
  response => {
    console.log(response);
  },
);
```

### 2) Отметьте просроченные платежи красным цветом.

Используйте это, например, для таблицы статусов или KPI, чтобы выделить отрицательные или отсутствующие значения.

```javascript
sendTo(
  'google-spreadsheet.0',
  'setCellFormat',
  {
    sheet: 'Sheet1',
    range: 'B2:B30',
    format: {
      backgroundColor: { red: 1, green: 0.8, blue: 0.8 },
      textFormat: { bold: true, italic: false },
      horizontalAlignment: 'LEFT',
    },
    alias: 'main',
  },
  response => {
    console.log(response);
  },
);
```

### 3) Задайте формат чисел для диапазона значений.

Это полезно для отображения валюты, процентов или временных меток.

```javascript
sendTo(
  'google-spreadsheet.0',
  'setCellFormat',
  {
    sheet: 'Sheet1',
    range: 'C2:C100',
    format: {
      numberFormat: {
        type: 'CURRENCY',
        pattern: '€#,##0.00',
      },
      horizontalAlignment: 'RIGHT',
    },
    alias: 'main',
  },
  response => {
    console.log(response);
  },
);
```

### 4) Отформатируйте одну ячейку, добавив пользовательский фон.

Используйте диапазон из одной ячейки, если хотите выделить определенный результат.

```javascript
sendTo(
  'google-spreadsheet.0',
  'setCellFormat',
  {
    sheet: 'Sheet1',
    range: 'E5',
    format: {
      backgroundColor: '#d9ead3',
      textFormat: { bold: true },
      horizontalAlignment: 'CENTER',
      verticalAlignment: 'MIDDLE',
    },
    alias: 'main',
  },
  response => {
    console.log(response);
  },
);
```

### 5) Примените одинаковые стили к нескольким разделам.

Вы можете оставить диапазон в виде блока, например, всей области таблицы, и изменять только объект стиля.

```javascript
sendTo(
  'google-spreadsheet.0',
  'setCellFormat',
  {
    sheet: 'Dashboard',
    range: 'A2:D20',
    format: {
      backgroundColor: { red: 0.94, green: 0.97, blue: 1 },
      horizontalAlignment: 'CENTER',
      verticalAlignment: 'MIDDLE',
    },
    alias: 'dashboard',
  },
  response => {
    console.log(response);
  },
);
```

## Примечания

- `backgroundColor` может быть предоставлена в виде шестнадцатеричной строки, например: `'#ff0000'` или как объект с `red`, `green`, `blue` и опционально `alpha` ценности.
- `textFormat` поддерживает такие поля, как `bold`, `italic`, `foregroundColor` а также аналогичные текстовые свойства в Google Sheets.
- `numberFormat` Может использоваться для отображения валют, процентов, дат или пользовательских форматов.
- Если не указано допустимое свойство форматирования, вызов завершится с ошибкой, например, такой: `No valid format properties provided`.