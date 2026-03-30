---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-jsontemplate/README.md
title: JSONTemplate — адаптер для визуализации данных JSON и других данных в Vis/Vis2.
hash: 3qI1R14HZeXdNTbXjv2UmguTzNHwrVruYa0GYJZZgCs=
---
# JSONTemplate - Адаптер для визуализации данных JSON и других данных в Vis/Vis2
![Логотип](../../../en/adapterref/iobroker.vis-jsontemplate/admin/vis-jsontemplate.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.vis-jsontemplate.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-jsontemplate.svg)
![Количество установок](https://iobroker.live/badges/vis-jsontemplate-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/vis-jsontemplate-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-jsontemplate.png?downloads=true)

**Тесты:** ![Тестирование и выпуск](https://github.com/oweitman/ioBroker.vis-jsontemplate/workflows/Test%20and%20Release/badge.svg)

## Обзор
Адаптер для визуализации данных JSON и других данных в Vis/Vis2.
Вы можете настроить вывод данных с помощью системы шаблонов.
В шаблоны можно включать HTML, CSS и JavaScript.

Виджет jsontemplate ранее был доступен в адаптерах rssfeed (для vis1) и vis-2-widgets-ovarious. В ближайшем будущем эти виджеты будут удалены из этих адаптеров.

## Установка
Установите адаптер обычным способом из стабильного репозитория.
Если вы хотите протестировать новые функции или исправления ошибок, вы также можете установить адаптер из бета-репозитория. Информацию о новых функциях и новостях можно найти в теме «Тестирование и поддержка» для этого адаптера на форуме iobroker.

После установки адаптер должен отобразиться в разделе адаптеров в iobroker. Иногда изменения могут быть не видны, особенно при изменении веб-интерфейса (виджеты / диалоговое окно конфигурации), в этом случае может потребоваться выполнить следующую команду в командной строке:

```bash
iobroker upload jsontemplate
```

В правой части адаптера можно добавить экземпляр, используя кнопку «плюс».

## Конфигурация
В административной панели этого адаптера отсутствует диалоговое окно настройки.

## Визуализация и виджеты
Следующие виджеты действительно существуют.

- [`JSON Template`](#json-template) - вы можете определить собственный шаблон

для отображения любых данных в формате JSON в визуальном режиме.

### Шаблон JSON
С помощью этого виджета можно отображать любые данные в формате JSON по своему усмотрению.
Отображение осуществляется с использованием шаблонного формата, который можно рассматривать как комбинацию HTML-кода + JavaScript + CSS + специальных тегов, управляющих отображением атрибутов JSON.
JSONTemplate теперь поддерживает асинхронные вызовы с помощью await.

| Настройки | описание |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| json_template | Этот шаблон можно использовать для определения внешнего вида данных JSON. В шаблоне можно использовать все допустимые HTML-теги (включая атрибуты CSS в тегах style). Также существуют специальные теги, внутри которых отображаются данные JSON и могут выполняться инструкции JavaScript. |
| json_oid | Выбор точки данных с соответствующими данными в формате JSON. |
| json_dpCount | Количество точек данных, которые будут доступны в шаблоне. |
| json_dp | Идентификатор точки данных, который будет предоставлен. |
| json_scriptCount | Количество загружаемых URL-адресов JavaScript |
| json_script[] | URL JavaScript-кода для загрузки. См. пример ниже. |
| json_cssCount | Количество загружаемых CSS-ссылок. |
| json_css[] | URL CSS для загрузки. |

Подробную информацию о системе шаблонов см. в главе «Шаблоны на основе примеров».

Доступные объекты данных в шаблоне:

| объект/переменная | описание |
| --------------- | ------------------------------------------------------------------------ |
| widgetID | Идентификатор виджета. |
| данные | JSON-объект, на который ссылается точка данных в json_oid. |
| dp | Массив данных точек данных, на которые ссылаются дополнительные точки данных |
| виджет | внутренние данные виджета. Объект со всеми доступными настройками виджета |
| стиль | внутренние данные стиля. Объект со всей доступной информацией о стиле виджета |

Доступ к дополнительным точкам данных можно получить по A) названию точки данных.

```javascript
<%- dp["0_userdata.0.test"] %>
<%- dp["0_userdata.0.abc"] %>
```

B) Порядковый номер точки данных (число всегда начинается с 0)

```javascript
<%- dp[Object.keys(dp)[0]] %>
<%- dp[Object.keys(dp)[1]] %>
```

Пример вывода данных, виджета и стиля в шаблоне.

```ejs
<%- JSON
    .stringify(style, null, 4)
    .replace(/\n/g, '<br>')
    .replace(/ /g, '&nbsp;'); %>
```

#### Расширенный вариант использования
В приведенных выше примерах рассматривался только чистый вывод.
Теперь шаблон можно также дополнить HTML-тегами для достижения определенного макета. Вот пример:

```html
<h3>Output</h3>
<style>
    .mycssclassproperty {
        color: green;
    }
    .mycssclassdata {
        color: red;
    }
</style>
<% for (var prop in data.oneobject) { %>
<div>
    <span class="mycssclassproperty"><%- "data.oneobject." + prop + " = " %></span>
    <span class="mycssclassdata"><%- data.oneobject[prop] %></span>
</div>
<% } %>
```

**Результат:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

(В Markdown цвета не отображаются)

#### Варианты использования асинхронных вызовов
**Блок 1:**

Вызов функции sendToAsync с использованием await. В этом примере вызывается тестовая функция в административном адаптере.

**Блок 2:**

Преобразуйте результат в строку и выведите в HTML.

**Блок 3:**

определение функции sendToAsync

```ejs
<% req = await sendToAsync("admin.0","selectSendTo",{test:"test"}); %>
<%- JSON.stringify(req) %>
<% async function sendToAsync(instance, command, sendData) {
    console.log(`sendToAsync ${command} ${sendData}`);
    return new Promise((resolve, reject) => {
        try {
            vis.conn.sendTo(instance, command, sendData, function (receiveData) {
                resolve(receiveData);
            });
        } catch (error) {
            reject(error);
        }
    });
} %>
```

**Результат:**

```text
[{"label":"Afghanistan","value":"AF"},{"label":"Åland Islands","value":"AX"},{"label":"Albania","value":"AL"}]
```

#### Вариант использования для загрузки дополнительных скриптов
Дополнительные поля позволяют загружать библиотеки JavaScript (например, с CDN, таких как jsDelivr или cdnjs). Следующий пример демонстрирует это для библиотеки chartJS.

**Шаг 1:**

Создайте новую точку данных типа string или json с именем `0_userdata.0.chartData` и следующим содержимым.

```json
[12, 19, 3, 5, 2, 3]
```

**Шаг 2:**

Введите следующий URL-адрес в поле json_script[1]:

```text
https://cdn.jsdelivr.net/npm/chart.js
```

**Шаг 3:**

Введите имя созданной точки данных в поле «Точка данных JSON».

Введите следующий шаблон в поле «Шаблон JSON».

За исключением одной строки, это стандартный HTML + JavaScript.

```html
data: <%- JSON.stringify(data) %>,
```

Данные, считанные из точки данных, доступны в переменной JavaScript `data` и выводятся в инструкциях шаблона <%- ... %>.
После компиляции шаблона и его включения в HTML-документ он выполняется браузером, так что диаграмма отображается с помощью JavaScript.

```ejs
<div>
  <canvas id="myChart"></canvas>
</div>

<script>
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: <%- JSON.stringify(data) %>,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
</script>
```

![Пример](../../../en/adapterref/iobroker.vis-jsontemplate/img/example_extscripts.png)

#### Пример использования списка задач, поддерживаемого базой данных
##### **Введение**
В этом примере использования описывается, как визуализировать и интерактивно изменять список дел из базы данных MySQL в `ioBroker`.
Основное внимание уделяется реализации простого изменения статуса с помощью нажатия кнопки. Эта концепция служит **проверкой концепции (PoC)** и может быть включена в будущую документацию.

---

##### **Структура базы данных (MySQL)**
Сначала создаётся база данных MySQL с именем `test`.
Она содержит таблицу `test` со следующими полями:

- `id`: Уникальный идентификатор для каждой записи
- `todo`: Заголовок записи в списке дел
- `действие`: Статус записи (0 = в процессе, 1 = завершено)

###### **SQL-код для создания таблицы**
<details><summary>Подробности</summary><pre><code>

```sql

CREATE TABLE `test` (
`id` int(11) NOT NULL,
`todo` varchar(100) NOT NULL,
`action` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `test` (`id`, `todo`, `action`) VALUES
(1, 'Todo 1', 0),
(2, 'Todo 2', 1),
(3, 'Todo 3', 1),
(4, 'Todo 4', 0);

ALTER TABLE `test`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `id` (`id`),
ADD KEY `idx` (`id`);

ALTER TABLE `test`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

```

</code></pre>

</details>

---

##### **Интеграция в ioBroker**
###### **SQL-адаптер**
Для взаимодействия с базой данных требуется адаптер `ioBroker.sql`.
Он настроен соответствующим образом для подключения к базе данных MySQL `test`.
Обратите внимание, что `ioBroker` автоматически создает собственные структуры в базе данных для хранения исторических данных.

###### **Виджет JSONTemplate**
Для визуализации мы используем виджет `JSONTemplate`.

##### **Интеграция в VIS**
Размещаем виджет `JSONTemplate` и заполняем следующие поля:

###### **Код шаблона**
<details><summary>Подробности</summary><pre><code>

```html
<style>
    .btn {
        width: 100%;
    }
</style>
<table>
    <tr>
        <th>ID</th>
        <th>Todo</th>
        <th>Action</th>
    </tr>
    <% let todos = await getTodo(); for (let i = 0; i < todos.length; i++) { let todo = todos[i]; %>
    <tr>
        <td><%- todo.id %></td>
        <td><%- todo.todo %></td>
        <td><%- getButton(todo.id, todo.action) %></td>
    </tr>
    <% } %>
</table>

<script>
    window.vis-jsontemplate = { clicktodo: clicktodo };

    function getButton(id, action) {
        let text = action === 0 ? 'In Progress' : 'Completed';
        return `<button class="btn" onclick="window.vis-jsontemplate.clicktodo(this)" data-id="${id}" data-action="${action}">${text}</button>`;
    }

    function clicktodo(el) {
        let id = el.dataset.id;
        let action = el.dataset.action;
        let nextAction = action == 0 ? 1 : 0;
        setAction(id, nextAction);
    }

    async function getTodo() {
        let req = await sendToAsync('sql.0', 'query', 'SELECT * FROM test.test');
        return req.result;
    }

    async function setAction(id, action) {
        await sendToAsync('sql.0', 'query', `UPDATE test.test SET action = ${action} WHERE id = ${id}`);
        vis.setValue('local_trigger', Math.random());
    }

    async function sendToAsync(instance, command, sendData) {
        return new Promise((resolve, reject) => {
            try {
                vis.conn.sendTo(instance, command, sendData, receiveData => resolve(receiveData));
            } catch (error) {
                reject(error);
            }
        });
    }
</script>
```

</code></pre>

</details>

###### **Точка данных для обновления контента**
Чтобы обновления отражались после изменения статуса, мы добавляем следующую локальную точку данных:

```text
local_trigger
```

Эту точку данных **не нужно создавать явно**, поскольку точки данных `local_?` обрабатываются внутри VIS (см. документацию `vis`).

##### **Пояснение к коду**
###### **Структура шаблона**
| Строка | Содержание |
| ----- | ---------------------------------------------------------------------- |
| 1-5 | CSS-стили для внешнего вида кнопок |
| 6-11 | Заголовок таблицы со столбцами ID, Todo, Action |
| 12-16 | Получение данных из базы данных MySQL с помощью `getTodo()` |
| 23-28 | Глобальная ссылка на функцию `clicktodo()` |
| 30-37 | `getButton()` функция для создания кнопки с текущим статусом |
| 38-44 | `clicktodo()` функция для изменения статуса по нажатию кнопки |
| 45-48 | `getTodo()` функция для получения данных через SQL-адаптер |
| 49-52 | `setAction()` функция для обновления записи в базе данных |
| 53-58 | `sendToAsync()` функция для использования `async/await` с `vis.conn.sendTo()` |
| 53-58 | Функция `sendToAsync()` для использования `async/await` с `vis.conn.sendTo()` |

## Система шаблонов
## Важное замечание относительно системы шаблонов в vis
В Vis все обозначения объектов в следующем формате распознаются и заменяются в качестве привязок.

Следовательно, открывающая и закрывающая скобки всех обозначений объектов должны располагаться на отдельных строках:

Неверно:

```json
{ "a": 1, "b": 2 }
```

Правильный

```json
{
    "a": 1,
    "b": 2
}
```

## Теги
Система шаблонов работает с определенными тегами.
Используемые теги означают следующее:

| `tag` | описание |
| ----- | ------------------------------------------------------------------- |
| <%= | Содержимое содержащегося выражения/переменной будет экранировано. |
| <%- | Содержимое содержащегося выражения/переменной не экранировано. |
| <% | Нет вывода, используется для вложенных инструкций JavaScript |
| %> | обычно является закрывающим тегом, завершающим один из предыдущих |

Всё, что находится за пределами этих тегов, отображается точно так же, как есть, или, если это HTML, интерпретируется как HTML.
В шаблоне доступны 2 предопределенные переменные.

### Пример объекта
Во всех приведенных ниже примерах используется следующий JSON.

```json
{
    "onearray": ["one", "two"],
    "oneobject": {
        "attribute1": 1,
        "attribute2": 2
    },
    "onenumber": 123,
    "onetext": "onetwothree"
}
```

Атрибуты могут быть выведены следующим образом.

**Шаблон:**

```ejs
<%- data.onenumber %>
<%- data.onetext %>
```

**Результат:**

```text
    123 onetwothree
```

Доступ к массивам осуществляется по индексу. Индекс всегда начинается с 0. Однако существуют также фиктивные массивы, где индекс не начинается с 0 или даже состоит из текста. В этом случае применяются правила, действующие для объектов.
В приведенном выше примере это будет выглядеть так:

**Шаблон:**

```ejs
<%- data.onearray[0] %>
<%- data.onearray[1] %>
```

**Результат:**

```text
    one two
```

Если вы попытаетесь вывести массив напрямую, без указания индекса, шаблон выведет все элементы, разделенные запятыми.

**Шаблон:**

```ejs
<%- data.onearray %>
```

**Результат:**

```text
    one,two
```

Массивы также могут состоять из набора объектов.
Приведенный здесь пример содержит только простой массив.
Пример массивов с объектами будет приведен позже.

**Шаблон:**

```ejs
<% for (var i = 0; i < data.onearray.length ; i++ ) { %>
<%- data.onearray[i] %>
<% } %>
```

**Результат:**

```text
    one two
```

**Объекты** могут содержать отдельные атрибуты, массивы или снова объекты.
Это означает, что данные JSON могут быть вложены на любую глубину.

Атрибуты объекта можно указывать с помощью точечной или скобочной нотации.
Точечная нотация работает только в том случае, если атрибут соответствует определенным правилам именования (первый символ должен быть буквой, остальные – цифрами, буквами или подчеркиванием).
Скобочная нотация также работает для атрибутов, не соответствующих правилам именования.

**Точечная нотация:**

**Шаблон:**

```ejs
<%- data.oneobject.attribute1 %>
```

**Обозначение в скобках:**

**Шаблон:**

```ejs
<%- data.oneobject["attribute1"] %>
```

**Результат для обоих примеров:**

```text
    1
```

Прохождение цикла по атрибутам объекта

**Шаблон:**

```ejs
<% for (var prop in data.oneobject) { %>
<%- "data.oneobject." + prop + " = " + data.oneobject[prop] %>
<% } %>
```

**Результат:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## Разработка и отладка
### Виджеты Vis1
- Установите dev-сервер
- Запустите dev-сервер с опцией --noStart
- При первом запуске установите дополнительные веб-адаптеры и vis1.
- Запуск конфигурации запуска VS Code "редактор vis-1"
- Если виджеты недоступны, загрузите адаптер в экспертном режиме на странице адаптера.
— Теперь вы можете устанавливать точки останова в VS Code в файле jsontemplate.js.
- Если вы внесете изменения в файл js, исходный код должен быть скомпилирован.

в папке dist с помощью команды npm run build-vis1widgets.

- dev-сервер загружает измененные файлы в iobroker, но для vis1 у вас есть

выполнить команду iob visdebug для перезагрузки виджетов

- Для перевода дополнительных записей в файле en.json используйте команду translate-widgets-vis1

### Виджеты Vis2
- Установите dev-сервер
- Откройте новое окно VS Code (2-й экземпляр)
- клонировать репозиторий vis2
- Следуйте инструкциям в файле README репозитория vis2.

В главе «Разработка и отладка» вам не нужно создавать форк репозитория.
Нам нужен только работающий экземпляр адаптера vis2.

- Запуск Vis 2 с помощью npm run start
- вернуться к экземпляру этого адаптера в VS Code
- Запустите dev-сервер с опцией --noStart
- Запуск конфигурации запуска VS Code "редактор vis-2"
— Теперь вы можете устанавливать точки останова в VS Code в файле jsontemplate.js.
— Если вы что-то измените, вам больше ничего делать не нужно.

Потому что Vite поддерживает горячую перезагрузку. Иногда бывает полезно перезагрузить vis2 с помощью F5.

- Для перевода дополнительных записей в файле en.json используйте команду translate-widgets-vis2

## Todo
- будет определено позже

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.3.11 (2026-01-25)

- check test release workflow

### 4.3.10 (2026-01-25)

- update test and release script

### 4.3.1 (2026-01-24)

- try again to publish

### 4.3.0 (2026-01-24)

- The ability to load additional JavaScript and CSS files has been added.
  This is currently only available for vis1 for testing purposes.

### 4.2.0 (2025-11-14)

- Improve documentation for the object notation in a template
- fix some translations
- align attribute name to vis1
- add widget data to the available template objects in vis2
- add style and widget object to the available template objects in vis1
- improve documentation

### 4.1.3 (2025-11-03)

- fix race condition if more than one widget use the same datapoint
- switch to trusted publishing

### 4.1.2 (2025-09-13)

- new try of publish

### 4.1.0 (2025-09-12)

- rename widgetset of the vis2 widget

### 4.0.2 (2025-08-28)

- remove v4.0.0 from io-package

### 4.0.1 (2025-08-28)

- move vis1 and vis2 widgets to vis-jsontemplate adapter

## License

MIT License

Copyright (c) 2021-2026 oweitman <oweitman@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.