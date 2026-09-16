---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
---
#### Use case for a database-supported task list

##### **Introduction**

This use case describes how to visualize and interactively modify
a to-do list from a MySQL database in `ioBroker`.
The focus is on implementing a simple
status change via a button click. This concept serves as
a **Proof of Concept (PoC)** and can be included in future documentation.

---

##### **Database Structure (MySQL)**

First, a MySQL database named `test` is created.
It contains a table `test` with the following fields:

- `id`: Unique ID for each entry
- `todo`: Title of the to-do entry
- `action`: Status of the entry (0 = in progress, 1 = completed)

###### **SQL Code for Table Creation**

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

##### **Integration into ioBroker**

###### **SQL Adapter**

To interact with the database, the `ioBroker.sql` adapter is required.
It is configured accordingly to connect to the MySQL database `test`.
Note that `ioBroker` automatically creates its own structures in the
database to store history data points.

###### **JSONTemplate Widget**

For visualization, we use the `JSONTemplate` widget.

##### **Integration into VIS**

We place the `JSONTemplate` widget and fill in the following fields:

###### **Template Code**

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

###### **Data Point for Refreshing Content**

To ensure updates are reflected after a status change,
we add the following local data point:

```text
local_trigger
```

This data point **does not need to be explicitly created**,
as `local_?` data points are processed internally within VIS (see `vis` documentation).

##### **Code Explanation**

###### **Template Structure**

| Line  | Content                                                                |
| ----- | ---------------------------------------------------------------------- |
| 1-5   | CSS styles for button appearance                                       |
| 6-11  | Table header with columns ID, Todo, Action                             |
| 12-16 | Fetching data from the MySQL database using `getTodo()`                |
| 17-21 | Loop to display to-do entries with buttons                             |
| 23-28 | Global reference of the `clicktodo()` function                         |
| 30-37 | `getButton()` function to create a button with the current status      |
| 38-44 | `clicktodo()` function to change the status via button click           |
| 45-48 | `getTodo()` function to fetch data via the SQL adapter                 |
| 49-52 | `setAction()` function to update the database entry                    |
| 53-58 | `sendToAsync()` function to use `async/await` with `vis.conn.sendTo()` |