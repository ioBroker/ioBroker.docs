---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-jsontemplate/README.md
title: JSONTemplate — адаптер для визуализации данных JSON и других данных в Vis/Vis2
hash: 8D1piNLdCgFWCprb+78gzu5KYO6Dp/PO5cgqE2pijDk=
---
# JSONTemplate — адаптер для визуализации данных JSON и других данных в Vis/Vis2
![Логотип](../../../en/adapterref/iobroker.vis-jsontemplate/admin/vis-jsontemplate.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.vis-jsontemplate.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-jsontemplate.svg)
![Количество установок](https://iobroker.live/badges/vis-jsontemplate-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/vis-jsontemplate-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-jsontemplate.png?downloads=true)

**Тесты:** ![Тестирование и выпуск](https://github.com/oweitman/ioBroker.vis-jsontemplate/workflows/Test%20and%20Release/badge.svg)

## Обзор
Адаптер для визуализации данных JSON и других данных в Vis/Vis2.
Вы можете настроить вывод данных с помощью системы шаблонов.
В шаблоны можно включать HTML, CSS и Javascript.

Виджет jsontemplate ранее был доступен в адаптерах rssfeed (для vis1) и vis-2-widgets-ovarious. В ближайшем будущем виджеты будут удалены из этих адаптеров.

## Установка
Установите адаптер как обычно из стабильного репозитория.
Если вы хотите протестировать новые функции или исправить ошибки, вы также можете установить адаптер из бета-репозитория. Информация о функциях и новостях представлена в теме «Тестирование и поддержка» для этого адаптера на форуме iobroker.

После установки адаптер должен отобразиться в разделе адаптеров в iobroker. Иногда изменения не видны, особенно при веб-изменениях (виджеты/диалог конфигурации). В этом случае может потребоваться выполнить следующую команду в командной строке:

```bash
iobroker upload jsontemplate
```

В правой части строки адаптера можно добавить экземпляр с помощью кнопки «плюс»

## Конфигурация
Этот адаптер не имеет диалогового окна настройки в области администратора.

## Vis и виджеты
Следующие виджеты действительно существуют

- [`Шаблон JSON`](#json-template) - вы можете определить собственный шаблон

для отображения любых JSON-данных в vis.

### Шаблон JSON
С помощью этого виджета можно отобразить любую точку данных с данными JSON.
Отображение осуществляется с использованием шаблона, который можно представить как комбинацию HTML-кода, JavaScript, CSS и специальных тегов, управляющих отображением атрибутов JSON.
JSONTemplate теперь поддерживает асинхронные вызовы с await.

| Сеттинг | описание |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| json_template | Шаблон может использоваться для определения внешнего вида JSON-данных. В шаблоне можно использовать все допустимые HTML-теги (включая атрибуты CSS в тегах стилей). Существуют также специальные теги, внутри которых отображаются JSON-данные и могут выполняться инструкции JavaScript. |
| json_oid | Выбор точки данных с соответствующими данными JSON. |
| json_dpCount | Количество точек данных, которые будут доступны в шаблоне. |
| json_dp | Идентификатор точки данных, который будет предоставлен. |

Подробную информацию о системе шаблонов см. в главе «Шаблон на основе примеров».

Доступные объекты данных в шаблоне:

| объект/переменная | описание |
| --------------- | ------------------------------------------------------------------------ |
| widgetID | widgetID виджета. |
| данные | Объект JSON, на который ссылается точка данных в json_oid. |
| dp | Массив данных точек данных, на которые ссылаются дополнительные точки данных |
| виджет | внутренние данные виджета. объект со всеми доступными настройками виджета |
| стиль | внутренние данные стиля. объект со всей доступной информацией о стиле виджета |

Доступ к дополнительным точкам данных можно получить, введя A) имя точки данных.

```javascript
<%- dp["0_userdata.0.test"] %>
<%- dp["0_userdata.0.abc"] %>
```

B) Индексный номер точки данных (номер всегда начинается с 0)

```javascript
<%- dp[Object.keys(dp)[0]] %>
<%- dp[Object.keys(dp)[1]] %>
```

Пример вывода данных, виджета и стиля в шаблоне

```ejs
<%- JSON
    .stringify(style, null, 4)
    .replace(/\n/g, '<br>')
    .replace(/ /g, '&nbsp;'); %>
```

#### Расширенный вариант использования
В приведенных выше примерах рассматривался только чистый вывод.
Теперь шаблон можно дополнить HTML-тегами для создания нужного макета. Вот пример:

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

(В Markdown цвета не видны)

#### Пример использования асинхронных вызовов
**Блок 1:**

Вызов функции sendToAsync с ожиданием. В этом примере вызывается тестовая функция в адаптере администратора.

**Блок 2:**

преобразовать результат в строку и вывести в HTML

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

#### Пример использования списка задач, поддерживаемого базой данных
##### **Введение**
В этом примере использования описывается, как визуализировать и интерактивно изменять список дел из базы данных MySQL в `ioBroker`.
Основное внимание уделяется реализации простого изменения статуса нажатием кнопки. Данная концепция служит **Proof of Concept (PoC)** и может быть включена в будущую документацию.

---

##### **Структура базы данных (MySQL)**
Сначала создаётся база данных MySQL с именем `test`.
Она содержит таблицу `test` со следующими полями:

- `id`: уникальный идентификатор для каждой записи
- `todo`: Название записи в списке дел
- `action`: Статус записи (0 = в процессе, 1 = завершено)

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

</код></pre>

</подробности>

---

##### **Интеграция в ioBroker**
###### **Адаптер SQL**
Для взаимодействия с базой данных требуется адаптер `ioBroker.sql`.
Он настроен соответствующим образом для подключения к базе данных MySQL `test`.
Обратите внимание, что `ioBroker` автоматически создаёт собственные структуры в базе данных для хранения точек исторических данных.

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

</код></pre>

</подробности>

###### **Точка данных для обновления контента**
Чтобы гарантировать отражение обновлений после изменения статуса, мы добавляем следующую локальную точку данных:

```text
local_trigger
```

Эту точку данных **не нужно явно создавать**, поскольку точки данных `local_?` обрабатываются внутри VIS (см. документацию `vis`).

##### **Пояснение кода**
###### **Структура шаблона**
| Линия | Содержание |
| ----- | ---------------------------------------------------------------------- |
| 1-5 | Стили CSS для внешнего вида кнопки |
| 6-11 | Заголовок таблицы со столбцами ID, Todo, Action |
| 12-16 | Извлечение данных из базы данных MySQL с помощью `getTodo()` |
| 23-28 | Глобальная ссылка функции `clicktodo()` |
| 30-37 | `getButton()` функция для создания кнопки с текущим статусом |
| 38-44 | `clicktodo()` функция для изменения статуса с помощью нажатия кнопки |
| 45-48 | `getTodo()` функция для извлечения данных через адаптер SQL |
| 49-52 | Функция `setAction()` для обновления записи в базе данных |
| 53-58 | Функция `sendToAsync()` для использования `async/await` с `vis.conn.sendTo()` |
| 53-58 | Функция `sendToAsync()` для использования `async/await` с `vis.conn.sendTo()` |

## Система шаблонов
## Важное примечание для системы шаблонов в vis
В vis все обозначения объектов в следующем виде распознаются и заменяются как привязки.

Поэтому открывающие и закрывающие скобки всех обозначений объектов должны располагаться на отдельных строках:

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
Система шаблонов работает с определёнными тегами.
Используемые теги означают следующее:

| `tag` | описание |
| ----- | ------------------------------------------------------------------- |
| <%= | Содержимое содержащегося выражения/переменной будет экранировано. |
| <%- | Содержимое содержащегося выражения/переменной не экранировано. |
| <% | Нет вывода, используется для вложенных инструкций JavaScript |
| %> | обычно является закрывающим тегом, завершающим один из предыдущих |

Всё, что находится за пределами этих тегов, отображается в точности так, как есть, или, если это HTML, интерпретируется как HTML.
В шаблоне доступны две предопределённые переменные.

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

Атрибуты могут быть выведены следующим образом

**Шаблон:**

```ejs
<%- data.onenumber %>
<%- data.onetext %>
```

**Результат:**

```text
    123 onetwothree
```

К массивам можно обращаться по индексу. Индекс всегда начинается с 0. Однако существуют и фиктивные массивы, индекс которых не начинается с 0 или даже состоит из текста. В этом случае действуют правила для объектов.
В примере выше это будет:

**Шаблон:**

```ejs
<%- data.onearray[0] %>
<%- data.onearray[1] %>
```

**Результат:**

```text
    one two
```

Если попытаться вывести массив напрямую без индекса, шаблон выведет все элементы, разделенные запятыми.

**Шаблон:**

```ejs
<%- data.onearray %>
```

**Результат:**

```text
    one,two
```

Массивы также могут состоять из коллекции объектов.
В данном примере представлен только простой массив.
Пример массивов с объектами будет приведён позже.

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

**Объекты** могут содержать отдельные атрибуты, массивы или объекты.
Это означает, что данные JSON могут иметь любую глубину вложенности.

К атрибутам объекта можно обращаться с помощью точечной или квадратной нотации.
Точечная нотация работает только в том случае, если атрибут соответствует определённым правилам именования (первым символом должна быть буква, остальные — цифры, буквы или подчёркивание).
Квадратная нотация также работает для атрибутов, не соответствующих правилам именования.

**Точечная нотация:**

**Шаблон:**

```ejs
<%- data.oneobject.attribute1 %>
```

**Обозначение скобок:**

**Шаблон:**

```ejs
<%- data.oneobject["attribute1"] %>
```

**Результат для обоих примеров:**

```text
    1
```

Перебрать атрибуты объекта

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
- Установка dev-сервера
- Запустите dev-сервер с опцией --noStart
- При первом запуске установите дополнительный адаптер web и vis1
- запуск vscode запуск конфигурации "vis-1 editor"
- если виджеты недоступны, загрузите адаптер в экспертном режиме на странице адаптера
- теперь вы можете устанавливать точки останова в vscode в файле jsontemplate.js
- если вы что-то меняете в js-файле, исходный код должен быть скомпилирован в

папку dist с командой npm run build-vis1widgets.

- dev-сервер загружает измененные файлы в iobroker, но для vis1 у вас есть

выполнить команду iob visdebug для перезагрузки виджетов

- для перевода дополнительных записей в en.json используйте команду translate-widgets-vis1

### Виджеты Vis2
- Установка dev-сервера
- Открыть новое окно vscode (2. экземпляр)
- клонировать репозиторий vis2
- следуйте инструкциям в файле readme репозитория vis2

в главе «Разработка и отладка». Вам не нужно создавать форк репозитория.
Нам нужен только работающий экземпляр адаптера vis2.

- запустите vis 2 с помощью npm run start
- обратно в экземпляр vscode этого адаптера
- Запустите dev-сервер с опцией --noStart
- запуск vscode запуск конфигурации "vis-2 editor"
- теперь вы можете устанавливать точки останова в vscode в файле jsontemplate.js
- если вы что-то меняете, вам больше ничего делать не нужно,

потому что vite поддерживает горячую перезагрузку. иногда полезно перезагрузить vis2 с помощью F5

- для перевода дополнительных записей в en.json используйте команду translate-widgets-vis2

## Задача
- подлежит уточнению

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
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

Copyright (c) 2021-2025 oweitman <oweitman@gmx.de>

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