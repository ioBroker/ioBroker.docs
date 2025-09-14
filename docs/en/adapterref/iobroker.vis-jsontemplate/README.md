# JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2

![Logo](admin/vis-jsontemplate.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-jsontemplate.svg)](https://www.npmjs.com/package/iobroker.vis-jsontemplate)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-jsontemplate.svg)](https://www.npmjs.com/package/iobroker.vis-jsontemplate)
![Number of Installations](https://iobroker.live/badges/vis-jsontemplate-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-jsontemplate-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.vis-jsontemplate.png?downloads=true)](https://nodei.co/npm/iobroker.vis-jsontemplate/)

**Tests:** ![Test and Release](https://github.com/oweitman/ioBroker.vis-jsontemplate/workflows/Test%20and%20Release/badge.svg)

## Overview

Adapter to visualize JSON data and other data in Vis/Vis2.
You can customize the output of the data with a template system.
In the templates you can include HTML, CSS and Javascript.

The jsontemplate widget was previously available in the rssfeed (for vis1) and
vis-2-widgets-ovarious adapters. The widgets will be removed from these
adapters in the near future.

## Installation

Install the adapter as normal from the stable repository.
If you want to test new features or bug fixes you can also install
the adapter from the beta repository. For Features and news,
please see the Test and Support thread for this adapter in the iobroker forum.

After Installation the adapter should then be displayed in the
adapter section in the iobroker. Sometimes it happens that the changes
are not visible, especially with web changes (widgets / configuration dialog),
the following command may have to be executed on the command line:

```bash
iobroker upload jsontemplate
```

In the right area in the line of the adapter, an instance can be
added using the plus button

## Configuration

This adapter does not have a configuration dialog in the admin area.

## vis and widgets

The following widgets actually exists

- [`JSON Template`](#json-template) - you can define a custom template
  to show any JSON-Data in vis.

### JSON Template

Using this widget, any data point with JSON data can be displayed as desired.
The display is done using a template format, which can be thought of as
a combined form of HTML code + JavaScript + CSS + special tags that control
the display of the JSON attributes.
JSONTemplate now supports async calls with await.

| Setting       | description                                                                                                                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| json_template | The template can be used to determine the appearance of the JSON data. All valid HTML tags (including CSS attributes in style tags) can be used in the template. There are also special tags within which the JSON data is displayed and JavaScript instructions can be executed. |
| json_oid      | Selection of the data point with the corresponding JSON data.                                                                                                                                                                                                                     |
| json_dpCount  | Number of data points to be made available in the template.                                                                                                                                                                                                                       |
| json_dp       | Datapoint ID to be made available.                                                                                                                                                                                                                                                |

For details on the template system, see chapter Template based on examples

The JSON data is passed to the template with the prefix data. In addition,
the current widgetID is also available as a variable so that it can be
specified in individual CSS instructions.

#### Advanced use case

In the examples above, only the pure output was covered.
The template can now also be enriched with HTML tags to achieve
a specific layout. Here is an example:

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

**Result:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

(In Markdown colors aren't visible)

#### Use case for async calls

**Block 1:**

call sendToAsync Function with await. This example calls a test function
in the admin adapter.

**Block 2:**

stringify the result and output to html

**Block 3:**

definition of the sendToAsync function

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

**Result:**

```text
[{"label":"Afghanistan","value":"AF"},{"label":"Åland Islands","value":"AX"},{"label":"Albania","value":"AL"}]
```

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

## Templatesystem

## Tags

The template system works with certain tags.
The tags used mean the following

| `tag` | description                                                         |
| ----- | ------------------------------------------------------------------- |
| <%=   | The content of the contained expression / variable will be escaped. |
| <%-   | The content of the contained expression / variable is unescaped.    |
| <%    | No output, is used for enclosed javascript instructions             |
| %>    | is generally a closing tag to complete one of the previous ones     |

Everything that is outside of these tags is displayed exactly as it is or
if it is HTML interpreted as HTML.
Within the template you have 2 predefined variables available

### Example object

For all the following examples the following json is used.

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

Attributes could be output as follows

**Template:**

```ejs
<%- data.onenumber %>
<%- data.onetext %>
```

**Result:**

```text
    123 onetwothree
```

Arrays can be accessed via an index. The index always starts with 0. However,
there are also fake arrays where the index does not start with 0 or
even consists of text. Here the rules for objects apply.
In the example above, this would be

**Template:**

```ejs
<%- data.onearray[0] %>
<%- data.onearray[1] %>
```

**Result:**

```text
    one two
```

If you try to output an array directly without an index,
the template outputs all elements separated by commas

**Template:**

```ejs
<%- data.onearray %>
```

**Result:**

```text
    one,two
```

Arrays can also consist of a collection of objects.
The example here contains only a simple array.
An example of arrays with objects will be given later.

**Template:**

```ejs
<% for (var i = 0; i < data.onearray.length ; i++ ) { %>
<%- data.onearray[i] %>
<% } %>
```

**Result:**

```text
    one two
```

**Objects** can contain individual attributes, arrays or objects again.
This means that JSON data can be nested to any depth.

Attributes of an object can be addressed using dot notation or bracket notation.
The dot notation only works if the attribute conforms to certain
naming conventions (first character must be a letter, rest numbers or letters or
underscore).
The bracket notation also works for attributes that do not conform to the
naming convention.

**Dot notation:**

**Template:**

```ejs
<%- data.oneobject.attribute1 %>
```

**Bracket notation:**

**Template:**

```ejs
<%- data.oneobject["attribute1"] %>
```

**Result for both examples:**

```text
    1
```

Loop over the attributes of an object

**Template:**

```ejs
<% for (var prop in data.oneobject) { %>
<%- "data.oneobject." + prop + " = " + data.oneobject[prop] %>
<% } %>
```

**Result:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## Development and Debugging

### Vis1 Widgets

- Install dev-server
- Start dev-server with --noStart option
- On first start install additional adapter web and vis1
- start vscode launch configuration "vis-1 editor"
- if widgets are not available, upload adapter in expert mode on the adapter page
- now you can set breakpoints in vscode in the jsontemplate.js file
- if you change something in the js file the source must be compiled to
  the dist folder with npm run build-vis1widgets command.
- the dev-server uploads the changed files to iobroker, but for vis1 you have
  to execute the iob visdebug command to reload the widgets
- to translate additional entries in en.json use the translate-widgets-vis1 command

### Vis2 Widgets

- Install dev-server
- Open a new vscode window (2. instance)
- clone vis2 repository
- follow the instructions in the readme of the vis2 repository
  in chapter Development and Debugging. you don't have to fork the repository.
  we only need a running instance of the vis2 adapter
- start vis 2 with npm run start
- back in in the vscode instance of this adapter
- Start dev-server with --noStart option
- start vscode launch configuration "vis-2 editor"
- now you can set breakpoints in vscode in the jsontemplate.js file
- if you change something you don't have to do anything else,
  because vite supports hot reload. sometimes it is useful to reload vis2 with F5
- to translate additional entries in en.json use the translate-widgets-vis2 command

## Todo

- tbd

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
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
