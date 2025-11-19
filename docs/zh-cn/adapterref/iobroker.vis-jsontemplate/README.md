---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-jsontemplate/README.md
title: JSONTemplate - 用于在 Vis/Vis2 中可视化 JSON 数据和其他数据的适配器
hash: 8D1piNLdCgFWCprb+78gzu5KYO6Dp/PO5cgqE2pijDk=
---
# JSONTemplate - 用于在 Vis/Vis2 中可视化 JSON 数据和其他数据的适配器
![标识](../../../en/adapterref/iobroker.vis-jsontemplate/admin/vis-jsontemplate.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.vis-jsontemplate.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-jsontemplate.svg)
![安装数量](https://iobroker.live/badges/vis-jsontemplate-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/vis-jsontemplate-stable.svg)
![NPM](https://nodei.co/npm/iobroker.vis-jsontemplate.png?downloads=true)

**测试：** ![测试与发布](https://github.com/oweitman/ioBroker.vis-jsontemplate/workflows/Test%20and%20Release/badge.svg)

＃＃ 概述
用于在 Vis/Vis2 中可视化 JSON 数据和其他数据的适配器。

您可以使用模板系统自定义数据输出。

您可以在模板中包含 HTML、CSS 和 Javascript。

jsontemplate 小部件之前可在 rssfeed（适用于 vis1）和 vis-2-widgets-ovarious 适配器中使用。这些小部件将在不久的将来从这些适配器中移除。

＃＃ 安装
请按照正常流程从稳定版软件源安装适配器。

如果您想测试新功能或错误修复，也可以从测试版软件源安装适配器。有关功能和最新消息，请参阅 iobroker 论坛中该适配器的“测试与支持”主题帖。

安装完成后，适配器应该会显示在 iobroker 的适配器部分。有时更改可能不会立即显示，尤其是在进行 Web 更改（小部件/配置对话框）时，可能需要在命令行中执行以下命令：

```bash
iobroker upload jsontemplate
```

在适配器线条的右侧区域，可以使用加号按钮添加实例。

＃＃ 配置
此适配器在管理区域中没有配置对话框。

## 可视化和小部件
以下组件实际存在

- [`JSON 模板`](#json-template) - 您可以定义自定义模板

在可视化界面中显示任何 JSON 数据。

### JSON 模板
使用此组件，可以按需显示任何包含 JSON 数据的数据点。

显示采用模板格式，可以将其理解为 HTML 代码、JavaScript、CSS 和控制 JSON 属性显示的特殊标签的组合。

JSONTemplate 现在支持使用 await 进行异步调用。

| 设置 | 描述 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| json_template | 此模板可用于确定 JSON 数据的显示方式。模板中可以使用所有有效的 HTML 标签（包括 style 标签中的 CSS 属性）。此外，还有一些特殊标签，用于显示 JSON 数据并执行 JavaScript 指令。 |
| json_oid | 选择具有对应 JSON 数据的数据点。 |
| json_dpCount | 模板中可用的数据点数量。 |
| json_dp | 待提供的数据点 ID。 |

有关模板系统的详细信息，请参阅“基于示例的模板”章节。

模板中可用的数据对象：

| 对象/变量 | 描述 |
| --------------- | ------------------------------------------------------------------------ |
| widgetID | 该小部件的 widgetID。 |
| 数据 | json_oid 中数据点引用的 JSON 对象。 |
| dp | 数据点数组，由附加数据点引用 |
| 小部件 | 内部小部件数据。包含所有可用小部件设置的对象 |
| 样式 | 内部样式数据。包含所有可用控件样式信息的对象 |

可以通过以下方式访问其他数据点：A）数据点名称

```javascript
<%- dp["0_userdata.0.test"] %>
<%- dp["0_userdata.0.abc"] %>
```

B) 数据点的索引号（编号始终从 0 开始）

```javascript
<%- dp[Object.keys(dp)[0]] %>
<%- dp[Object.keys(dp)[1]] %>
```

模板中数据、小部件和样式的示例输出

```ejs
<%- JSON
    .stringify(style, null, 4)
    .replace(/\n/g, '<br>')
    .replace(/ /g, '&nbsp;'); %>
```

#### 高级用例
以上示例仅涵盖了纯文本输出。

现在，还可以使用 HTML 标签来丰富模板，以实现特定的布局。以下是一个示例：

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

**结果：**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

（Markdown 中颜色不可见）

#### 异步调用的使用案例
**模块 1：**

使用 await 调用 sendToAsync 函数。此示例调用管理适配器中的测试函数。

**模块 2：**

将结果字符串化并输出为 HTML

**模块 3：**

sendToAsync 函数的定义

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

**结果：**

```text
[{"label":"Afghanistan","value":"AF"},{"label":"Åland Islands","value":"AX"},{"label":"Albania","value":"AL"}]
```

#### 数据库支持的任务列表的使用案例
＃＃＃＃＃ **介绍**
本用例描述了如何可视化并交互式地修改 `ioBroker` 中 MySQL 数据库中的待办事项列表。

重点在于通过按钮点击实现简单的状态更改。此概念作为**概念验证 (PoC)**，未来可将其纳入文档。

---

##### **数据库结构（MySQL）**
首先，创建一个名为 `test` 的 MySQL 数据库。

它包含一个名为 `test` 的表，该表包含以下字段：

- `id`：每个条目的唯一 ID
- `todo`：待办事项的标题
- `action`：条目的状态（0 = 进行中，1 = 已完成）

###### **创建表的 SQL 代码**
<details><summary>细节</summary><pre><code>

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

##### **集成到 ioBroker**
###### **SQL适配器**
要与数据库交互，需要使用适配器 `ioBroker.sql`。

它已配置为连接到 MySQL 数据库 `test`。

请注意，`ioBroker` 会自动在数据库中创建自己的结构来存储历史数据点。

###### **JSON模板小部件**
为了进行可视化，我们使用 `JSONTemplate` 小部件。

##### **集成到 VIS 中**
我们放置 `JSONTemplate` 小部件并填写以下字段：

###### **模板代码**
<details><summary>细节</summary><pre><code>

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

###### **用于刷新内容的数据点**
为确保状态变更后能够及时反映更新，我们添加了以下本地数据点：

```text
local_trigger
```

此数据点**无需显式创建**，因为 `local_?` 数据点在 VIS 内部进行处理（参见 `vis` 文档）。

##### **代码说明**
###### **模板结构**
| 行 | 内容 |
| ----- | ---------------------------------------------------------------------- |
| 1-5 | 按钮外观的 CSS 样式 |
| 6-11 | 表格标题，包含 ID、待办事项、操作三列 |
| 12-16 | 使用 `getTodo()` 从 MySQL 数据库获取数据 |
| 23-28 | `clicktodo()` 函数的全局参考 |
| 30-37 | `getButton()` 用于创建带有当前状态的按钮的函数 |
| 38-44 | `clicktodo()` 通过按钮点击更改状态的功能 |
| 45-48 | `getTodo()` 通过 SQL 适配器获取数据的函数 |
| 49-52 | `setAction()` 更新数据库条目的函数 |
| 53-58 | `sendToAsync()` 函数与 `async/await` 和 `vis.conn.sendTo()` 一起使用 |
| 53-58 | `sendToAsync()` 函数用于将 `async/await` 与 `vis.conn.sendTo()` 结合使用 |

## 模板系统
## 关于vis模板系统的重要说明
在 vis 中，以下形式的所有对象表示法都会被识别并替换为绑定。

因此，所有对象表示法的左括号和右括号必须分别放在不同的行上：

错误：

```json
{ "a": 1, "b": 2 }
```

正确的

```json
{
    "a": 1,
    "b": 2
}
```

## 标签
模板系统使用特定的标签。

所使用的标签含义如下。

| `tag` | 描述 |
| ----- | ------------------------------------------------------------------- |
| <%= | 包含的表达式/变量的内容将被转义。 |
| <%- | 包含的表达式/变量的内容未进行转义。 |
| <% | 无输出，用于包含 JavaScript 指令 |
| %> | 通常是一个结束标签，用于完成前面的某个标签 |

标签之外的所有内容都会按原样显示，如果是 HTML 代码，则会按 HTML 代码解释显示。

模板中预定义了两个变量。

### 示例对象
以下所有示例均使用以下 JSON 数据。

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

属性可以按如下方式输出

**模板：**

```ejs
<%- data.onenumber %>
<%- data.onetext %>
```

**结果：**

```text
    123 onetwothree
```

数组可以通过索引访问。索引总是从 0 开始。但是，也存在一些伪数组，它们的索引不从 0 开始，甚至可能包含文本。对于伪数组，则适用对象的访问规则。

在上面的例子中，这将是：

**模板：**

```ejs
<%- data.onearray[0] %>
<%- data.onearray[1] %>
```

**结果：**

```text
    one two
```

如果尝试直接输出数组而不指定索引，模板会输出所有元素，并用逗号分隔。

**模板：**

```ejs
<%- data.onearray %>
```

**结果：**

```text
    one,two
```

数组也可以包含对象集合。

这里的示例仅包含一个简单的数组。

稍后会给出包含对象的数组示例。

**模板：**

```ejs
<% for (var i = 0; i < data.onearray.length ; i++ ) { %>
<%- data.onearray[i] %>
<% } %>
```

**结果：**

```text
    one two
```

**对象**可以包含单个属性、数组或对象本身。

这意味着 JSON 数据可以嵌套任意深度。

对象的属性可以使用点号表示法或方括号表示法来访问。

点号表示法仅适用于符合特定命名规则的属性（第一个字符必须是字母，其余字符可以是数字、字母或下划线）。

方括号表示法也适用于不符合命名规则的属性。

**点表示法：**

**模板：**

```ejs
<%- data.oneobject.attribute1 %>
```

**括号表示法：**

**模板：**

```ejs
<%- data.oneobject["attribute1"] %>
```

**两个示例的结果：**

```text
    1
```

遍历对象的属性

**模板：**

```ejs
<% for (var prop in data.oneobject) { %>
<%- "data.oneobject." + prop + " = " + data.oneobject[prop] %>
<% } %>
```

**结果：**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## 开发和调试
### Vis1 小部件
安装开发服务器
- 使用 --noStart 选项启动开发服务器
- 首次启动时，安装额外的适配器 web 和 vis1
- 启动 vscode 启动配置“vis-1 编辑器”
- 如果小部件不可用，请在适配器页面以专家模式上传适配器。
现在你可以在 VS Code 的 jsontemplate.js 文件中设置断点了
- 如果您更改了 js 文件中的内容，则必须重新编译源代码。

使用 npm run build-vis1widgets 命令在 dist 文件夹中运行。

- 开发服务器会将更改后的文件上传到 iobroker，但对于 vis1 来说，您有

执行 iob visdebug 命令以重新加载控件

- 要翻译 en.json 中的其他条目，请使用 translate-widgets-vis1 命令

### Vis2 小部件
安装开发服务器
- 打开一个新的 VS Code 窗口（2. 实例）
- 克隆 vis2 存储库
- 请按照 vis2 仓库的 readme 文件中的说明进行操作。

在“开发与调试”章节中，您无需 fork 该代码库。

我们只需要一个正在运行的 vis2 适配器实例。

使用 npm run start 启动 vis 2
- 回到此适配器的 VS Code 实例中
- 使用 --noStart 选项启动开发服务器
- 启动 vscode 启动配置“vis-2 编辑器”
现在你可以在 VS Code 的 jsontemplate.js 文件中设置断点了
如果你更改了某些内容，你不需要做任何其他事情。

因为 Vite 支持热重载。有时用 F5 键重载 Vite2 会很有用。

- 要翻译 en.json 中的其他条目，请使用 translate-widgets-vis2 命令

## 待办事项
- 待定

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