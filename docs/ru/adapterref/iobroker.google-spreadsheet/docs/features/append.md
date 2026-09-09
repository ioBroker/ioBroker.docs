---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.google-spreadsheet/docs/features/append.md
title: Добавить
hash: x+VLLhQBwGR1iYnIgTOLBeFmJJtloO1SKMSPn2Mndpo=
---
# Добавить

➡️ См. [документацию по API sendTo](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) для получения информации об общем использовании и всех доступных командах. Функция добавления позволяет добавлять данные в электронную таблицу Google.

Использованная конечная точка API: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append>

Данная функция принимает следующие параметры:

- `sheetName` : Название листа, к которому нужно добавить данные.
- `data` Данные для добавления (одно значение или одномерный массив).
- `alias` (необязательно): псевдоним электронной таблицы, если у вас настроено несколько электронных таблиц.

**Результат обратного вызова:**`{ success: true }` в случае успеха или`{ error: string }` при неудаче.

## Блокли

![Блокли](../../../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-append.png)

В Blockly параметр sheetname всегда передается в API Google в качестве параметра диапазона. Однако параметр диапазона может принимать не только имя листа, но и ячейку в формате A1. Если вам нужно добавить данные в определенную ячейку, вы можете указать ячейку с помощью параметра диапазона. Например, вы можете использовать 'Sheet1!A1:A1' для указания конкретной ячейки.

## JavaScript

Приведённый фрагмент кода добавляет новую строку в электронную таблицу. Каждое из трёх значений массива создаст отдельную ячейку в электронной таблице.

```javascript

sendTo(
  "google-spreadsheet", 
  "append", {  
    "sheetName": "nameOfTab", 
    "data":[
      formatDate(new Date(), 'hh:mm'), 
      getState('mqtt.0.inverter.total.YieldDay').val, 
      getState('mqtt.0.inverter.total.P_AC').val
    ]
  }
);
```