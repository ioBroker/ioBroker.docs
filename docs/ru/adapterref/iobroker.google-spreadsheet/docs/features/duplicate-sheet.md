---
chapters: {"pages":{"en/adapterref/iobroker.google-spreadsheet/README.md":{"title":{"en":"ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/README.md"},"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md":{"title":{"en":"sendTo API for ioBroker.google-spreadsheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md":{"title":{"en":"Append"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/append.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md":{"title":{"en":"Delete Rows"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-rows.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md":{"title":{"en":"Create-Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/create-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md":{"title":{"en":"Delete Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md":{"title":{"en":"Delete multiple sheets"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/delete-sheets.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md":{"title":{"en":"Duplicate Sheet"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md":{"title":{"en":"Read Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/read-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md":{"title":{"en":"Write Cell"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cell.md"},"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md":{"title":{"en":"Write multiple cells"},"content":"en/adapterref/iobroker.google-spreadsheet/docs/features/write-cells.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.google-spreadsheet/docs/features/duplicate-sheet.md
title: Дубликат листа
hash: 0mZ2SR4IF6YJYMZ3FfSgTLJiZuSnfvbFrJ2PfJRMdIM=
---
# Дубликат листа

➡️ Для получения информации об общем использовании и всех доступных командах см. [документацию по API sendTo](/#/docs/adapterref/iobroker.google-spreadsheet/docs/sendTo-API.md) .

Функция дублирования листов позволяет создать копию определенного листа в электронной таблице Google. Это может быть особенно полезно, если у вас есть лист, который служит шаблоном. Дублируя лист-шаблон, вы можете сохранить оригинал, работая с копией, которая сохраняет все форматирование, формулы или даже диаграммы оригинала.

Используемая конечная точка API: <https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate>

Данная функция принимает следующие параметры:

- `source` : Название листа, который необходимо скопировать.
- `target` : Название нового листа.
- `index` : Место, куда следует вставить новый лист.
- `alias` (необязательно): псевдоним электронной таблицы, если у вас настроено несколько электронных таблиц.

**Результат обратного вызова:**`{ success: true }` в случае успеха или`{ error: string }` при неудаче.

## Блокли

![Блокли](../../../../../en/adapterref/iobroker.google-spreadsheet/docs/img/blockly-duplicate-sheet.png)

Блок Blockly — это блок-контейнер. Операторы внутри блока выполняются только в том случае, если лист успешно скопирован.

### Обработка ошибок

Вы можете добавить обработчик ошибок, используя значок шестеренки (мутатор, перетаскивание). Операторы в обработчике ошибок выполняются только в том случае, если ошибка возникает при дублировании листа.

**Поведение:**

- **Без обработчика ошибок:** операторы внутри блока всегда выполняются, независимо от результата.
- **С обработчиком ошибок:**
  - Операторы внутри блока выполняются только в случае успешного выполнения.
  - Операторы в обработчике ошибок выполняются только при возникновении ошибки.

Параметры`source` ,`target` ,`index` и опционально`alias` Проходят проверку как обычно.

### Пример

```javascript
sendTo(
  "google-spreadsheet.0",
  "duplicateSheet",
  { source: "originalName", target: "newName", index: 3 },
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

Приведённый фрагмент кода дублирует лист в электронной таблице, указывая имя исходного листа, имя целевого листа и индекс.

```javascript
sendTo(
  "google-spreadsheet", 
  "duplicateSheet", {  
    "source": "originalName",
    "target": "newName",
    "index": 3
  }
);
```