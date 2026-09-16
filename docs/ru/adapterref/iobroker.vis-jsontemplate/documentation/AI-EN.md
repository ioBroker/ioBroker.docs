---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md
title: Создание шаблонов с помощью ИИ
hash: pvDjgC9ngKq1lMCG/GmAswpzxrhMWtvfPNc0X60RQCM=
---
# Создание шаблонов с помощью ИИ

Адаптер _ioBroker.vis-jsontemplate_ отображает данные JSON в VIS или VIS-2 с использованием шаблона. Шаблон может объединять выражения HTML, CSS, JavaScript и EJS.

Искусственный интеллект может помочь в создании таких шаблонов. Крайне важно как можно точнее описать требования.

## Какую информацию требует искусственный интеллект?

По возможности включайте в задание следующие элементы:

### 1. Задание

Кратко опишите, что должно быть отображено.

Примеры:

- Данные о погоде в виде карточек
- Список устройств в виде таблицы.
- Назначения в виде списка
- Данные с датчиков в виде панели мониторинга

### 2. Пример данных

Приведите реалистичный пример точки данных в формате JSON.

```json
{
    "devices": [
        {
            "name": "Living Room",
            "temperature": 22.4,
            "online": true
        }
    ]
}
```

Без примеров данных ИИ приходится угадывать структуру данных.

### 3. Желаемое отображение

Опишите структуру и основное содержание.

Примеры:

- Адаптивные карточки
- Таблица с тремя столбцами
- Большой дисплей температуры
- Устройства с подключением к интернету: зелёный цвет, устройства без подключения к интернету: серый цвет.
- Подходит для смартфонов и планшетов.

### 4. Функции

Опишите, должен ли шаблон только отображать данные или также предоставлять возможность выполнения действий.

Примеры:

- Список фильтров
- Сортировка записей
- Отобразить кнопку
- Изменить точку данных через`vis.setValue()`
- Получение данных через адаптер

### 5. Технические характеристики

Искусственный интеллект должен соблюдать следующие правила:

- В шаблоне используется EJS.
- Содержимое JSON хранится в`data` переменная.
- Дополнительные данные доступны в`dp` .
- Вывод JavaScript генерируется, например, с использованием следующего кода:`<%- data.value %>` .
- Циклы и условные операторы размещаются внутри`<% ... %>` .
- Перед обращением к необязательным значениям или массивам необходимо проверить их наличие.
- VIS интерпретирует`{...}` на одной строке в качестве привязки точки данных. Поэтому никогда не размещайте открывающие и закрывающие фигурные скобки, содержащие какие-либо символы, на одной строке. Всегда размещайте их на разных строках. Пустые скобки (`{}` ) разрешены.
- Избегайте квантификаторов регулярных выражений (`{2}` ,`{1,2}` ,`{4}` Перепишите их без фигурных скобок, например:`\d{2}` →`\d\d` ,`\d{1,2}` →`\d\d?` ,`\d{4}` →`\d\d\d\d` .
- Не использовать`setInterval()` .
- Использовать`setTimeout()` вместо этого для повторяющихся процессов.
- Результат должен быть непосредственно копируемым в файл.`json_template` поле.
- Если вам необходимо передать данные из шаблона EJS в JavaScript на стороне браузера, не сериализуйте данные. Вместо этого используйте глобальную переменную внутри шаблона.`window` Выберите пространство имен и уникальную переменную, чтобы избежать конфликтов с другими скриптами.

## Шаблон для запроса ИИ

Скопируйте следующий текст и замените его в квадратных скобках.

```text
Create a complete template for the ioBroker widget
"JSON Template" from the vis-jsontemplate adapter.

TASK
[Describe what should be displayed.]

JSON EXAMPLE

[Insert the complete example data here.]

VISUALS
[Describe layout, colors, sizes, and desired elements.]

FUNCTIONS
[Describe filters, sorting, buttons, or other functions.
If no interaction is required, write: Display only.]

### TECHNICAL SPECIFICATIONS

- Use HTML, CSS, JavaScript, and EJS only as necessary.
- The JSON data is located in the `data` variable.
- Use `<%- ... %>` to output values.
- Use `<% ... %>` for loops and conditions.
- Check for the existence of optional values or arrays before accessing them.
- Do not use external libraries.
- Do not use `setInterval()`.
- VIS interprets `{...}` on a single line as a data point binding. Therefore,
  never place opening and closing curly braces containing any characters on
  the same line. Always put them on separate lines. Empty braces (`{}`) are
  allowed.
- Avoid regular expression quantifiers (`{2}`, `{1,2}`, `{4}`, ...). Rewrite
  them without curly braces, e.g. `\d{2}` → `\d\d`, `\d{1,2}` → `\d\d?`,
  `\d{4}` → `\d\d\d\d`.
- Limit CSS and JavaScript to this widget. Use the widget ID
  `#<%- widgetid %>` for this purpose.
- The result must be directly insertable into the `json_template` field.
- If you need to pass data from an EJS template to browser-side JavaScript,
  do not serialize the data. Instead, use a global variable within the
  `window` namespace and choose a highly unique variable name to avoid
  interference from other scripts.

OUTPUT FORMAT

1. First, output only the complete template within a code block.
2. Then, briefly explain the key sections.
3. Next, list the required widget settings and additional
   data points.
4. Do not invent fields that are not included in the JSON example.
```

## Пример подсказки

Примеры различных поставщиков решений в области искусственного интеллекта:

![КИ Beispiele](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/ai-examples.png)

```text

Create a complete template for the ioBroker widget
"JSON Template" from the vis-jsontemplate adapter. TASK
Display a list of rooms with their temperature and online status.

JSON EXAMPLE

{
  "devices": [
    {
      "name": "Living Room",
      "temperature": 22.4,
      "online": true
    },
    {
      "name": "Bedroom",
      "temperature": 19.8,
      "online": false
    }
  ]
}

### VISUALIZATION

Each room should be displayed as a compact card. The room name appears
at the top, with the temperature displayed in a large font below it. Online devices
get a green status dot; offline devices get a gray status dot. The cards
should automatically adjust to the available width.

### FUNCTIONS

Display only.

### TECHNICAL REQUIREMENTS

- Use HTML, CSS, JavaScript, and EJS only as necessary.
- The JSON data is contained in the variable `data`.
- Use `<%- ... %>` to output values.
- Use `<% ... %>` for loops and conditional statements.
- Check if `data.devices` exists and is an array.
- If data is missing, display the text "No device data available".
- Do not use external libraries.
- Do not use `setInterval()`.
- VIS interprets `{...}` on a single line as a data point binding. Therefore,
  never place opening and closing curly braces containing any characters on
  the same line. Always put them on separate lines. Empty braces (`{}`) are
  allowed.
- Avoid regular expression quantifiers (`{2}`, `{1,2}`, `{4}`, ...). Rewrite
  them without curly braces, e.g. `\d{2}` → `\d\d`, `\d{1,2}` → `\d\d?`,
  `\d{4}` → `\d\d\d\d`.
- Scope the CSS to `#<%- widgetid %>`.
- The result must be suitable for direct insertion into the `json_template` field.
- If you need to pass data from an EJS template to browser-side JavaScript,
  do not serialize the data. Instead, use a global variable within the
  `window` namespace and choose a highly unique variable name to avoid
  interference from other scripts.

### OUTPUT FORMAT

1. Complete template in a code block
2. Brief explanation
3. Required widget settings
```

## Объяснение примера задания

### Задача

В этом разделе определяется функциональная цель ИИ, позволяющая ему выявлять релевантную информацию.

### Пример JSON

В примере показана фактическая структура данных. Это позволяет ИИ распознать необходимость итерации.`data.devices` и доступ к таким свойствам, как`device.name` .

### Презентация

В этом разделе описываются правила компоновки и визуального оформления. Чем подробнее этот раздел, тем меньше предположений о дизайне потребуется сделать искусственному интеллекту.

### Функции

В этом разделе проводится различие между простым отображением и интерактивным шаблоном. Интерактивные функции обычно требуют дополнительного JavaScript и, возможно, дополнительных точек данных.

### Технические характеристики

Эти правила предотвращают распространенные ошибки в VIS и адаптере. Ключевые требования включают правильное использование тегов EJS, правильно настроенные CSS-стили и отказ от использования`setInterval()` .

### Формат вывода

Это означает, что ИИ должен сначала предоставить готовый к использованию блок кода и отделить от него любые дополнительные пояснения.

## Рекомендации по проведению рецензирования

Сгенерированный ИИ код следует проверить перед развертыванием в производственной среде:

- Соответствуют ли все названия полей данным в формате JSON?
- Обрабатываются ли пропущенные или пустые значения корректно?
- Применяется ли CSS только к текущему виджету?
- Избегает ли код предположения о существовании несуществующих точек данных или функций?
- В коде избегается использование`setInterval()` ?
- Работает ли шаблон с предоставленными примерами данных?

В случае возникновения ошибок простого сообщения ИИ о том, что шаблон не работает, недостаточно. Гораздо полезнее предоставить конкретное сообщение об ошибке, фактические данные в формате JSON и сгенерированный на данный момент шаблон.