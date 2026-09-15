---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md
title: без названия
hash: pNMDP0JZRQNDjfqPuMWNf/sfGGeAJcaMpp4gI6SyQEk=
---
#### Пример использования списка задач, поддерживаемого базой данных.

##### **Введение**

В этом примере описывается, как визуализировать и интерактивно изменять список дел из базы данных MySQL.`ioBroker` Основное внимание уделяется реализации простого изменения статуса с помощью нажатия кнопки. Эта концепция служит **подтверждением работоспособности (Proof of Concept, PoC)** и может быть включена в будущую документацию.

---

##### **Структура базы данных (MySQL)**

Во-первых, база данных MySQL с именем`test` создана. Она содержит таблицу.`test` со следующими полями:

- `id` : Уникальный идентификатор для каждой записи
- `todo` Заголовок записи в списке дел
- `action` Статус записи (0 = в процессе, 1 = завершено)

###### **SQL-код для создания таблицы**

<details>
  <summary>Details</summary>
  <pre><code>

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

Для взаимодействия с базой данных необходимо...`ioBroker.sql` Требуется адаптер. Он настроен соответствующим образом для подключения к базе данных MySQL.`test` . Обратите внимание, что`ioBroker` Автоматически создает собственные структуры в базе данных для хранения исторических данных.

###### **Виджет JSONTemplate**

Для визуализации мы используем`JSONTemplate` виджет.

##### **Интеграция в VIS**

Мы размещаем`JSONTemplate` Заполните следующие поля виджета:

###### **Код шаблона**

<details>
  <summary>Details</summary>
  <pre><code>

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

Эту точку данных **не нужно создавать явно** , поскольку`local_?` Данные обрабатываются внутри системы VIS (см.`vis` документация).

##### **Пояснение к коду**

###### **Структура шаблона**

| Линия | Содержание                                                                  |
| ----- | --------------------------------------------------------------------------- |
| 1-5   | CSS-стили для отображения кнопок                                            |
| 6-11  | Заголовок таблицы со столбцами ID, Todo, Action                             |
| 12-16 | Получение данных из базы данных MySQL с помощью`getTodo()`                  |
| 17-21 | Цикл для отображения пунктов списка дел с кнопками.                         |
| 23-28 | Глобальный справочник`clicktodo()` функция                                  |
| 30-37 | `getButton()` функция для создания кнопки с текущим статусом                |
| 38-44 | `clicktodo()` функция для изменения статуса по нажатию кнопки               |
| 45-48 | `getTodo()` функция для получения данных через SQL-адаптер                  |
| 49-52 | `setAction()` функция для обновления записи в базе данных                   |
| 53-58 | `sendToAsync()` функция для использования`async/await` с`vis.conn.sendTo()` |