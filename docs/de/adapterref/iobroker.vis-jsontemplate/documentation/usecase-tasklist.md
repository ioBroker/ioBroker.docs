---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md
title: kein Titel
hash: pNMDP0JZRQNDjfqPuMWNf/sfGGeAJcaMpp4gI6SyQEk=
---
#### Anwendungsfall für eine datenbankgestützte Aufgabenliste

##### **Einführung**

Dieser Anwendungsfall beschreibt, wie man eine Aufgabenliste aus einer MySQL-Datenbank visualisiert und interaktiv bearbeitet.`ioBroker` Der Fokus liegt auf der Implementierung einer einfachen Statusänderung per Knopfdruck. Dieses Konzept dient als **Machbarkeitsnachweis (Proof of Concept, PoC)** und kann in zukünftige Dokumentationen aufgenommen werden.

---

##### **Datenbankstruktur (MySQL)**

Zunächst eine MySQL-Datenbank namens`test` wird erstellt. Es enthält eine Tabelle.`test` mit den folgenden Feldern:

- `id` : Eindeutige ID für jeden Eintrag
- `todo` Titel des Aufgabeneintrags
- `action` Status des Eintrags (0 = in Bearbeitung, 1 = abgeschlossen)

###### **SQL-Code zur Tabellenerstellung**

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

##### **Integration in ioBroker**

###### **SQL-Adapter**

Um mit der Datenbank zu interagieren,`ioBroker.sql` Ein Adapter ist erforderlich. Er ist entsprechend konfiguriert, um eine Verbindung zur MySQL-Datenbank herzustellen.`test` . Beachten Sie, dass`ioBroker` Erstellt automatisch eigene Strukturen in der Datenbank, um historische Datenpunkte zu speichern.

###### **JSONTemplate-Widget**

Zur Visualisierung verwenden wir die`JSONTemplate` Widget.

##### **Integration in VIS**

Wir platzieren die`JSONTemplate` Widget und füllen Sie die folgenden Felder aus:

###### **Vorlagencode**

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

###### **Datenpunkt für Aktualisierungsinhalte**

Um sicherzustellen, dass Aktualisierungen nach einer Statusänderung wirksam werden, fügen wir den folgenden lokalen Datenpunkt hinzu:

```text
local_trigger
```

Dieser Datenpunkt **muss nicht explizit erstellt werden** , da`local_?` Die Datenpunkte werden intern innerhalb von VIS verarbeitet (siehe`vis` Dokumentation).

##### **Code-Erklärung**

###### **Vorlagenstruktur**

| Linie | Inhalt                                                                           |
| ----- | -------------------------------------------------------------------------------- |
| 1-5   | CSS-Stile für das Aussehen von Schaltflächen                                     |
| 6-11  | Tabellenkopf mit Spalten ID, Aufgabe, Aktion                                     |
| 12-16 | Abrufen von Daten aus der MySQL-Datenbank mithilfe von`getTodo()`                |
| 17-21 | Schleife zur Anzeige von Aufgabeneinträgen mit Schaltflächen                     |
| 23-28 | Globale Referenz der`clicktodo()` Funktion                                       |
| 30-37 | `getButton()` Funktion zum Erstellen einer Schaltfläche mit dem aktuellen Status |
| 38-44 | `clicktodo()` Funktion zum Ändern des Status per Knopfdruck                      |
| 45-48 | `getTodo()` Funktion zum Abrufen von Daten über den SQL-Adapter                  |
| 49-52 | `setAction()` Funktion zum Aktualisieren des Datenbankeintrags                   |
| 53-58 | `sendToAsync()` zu verwendende Funktion`async/await` mit`vis.conn.sendTo()`      |