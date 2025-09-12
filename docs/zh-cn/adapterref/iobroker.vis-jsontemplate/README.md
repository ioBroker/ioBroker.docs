---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-jsontemplate/README.md
title: JSONTemplate - 用于在 Vis/Vis2 中可视化 JSON 数据和其他数据的适配器
hash: zTK7roAooVi0nFZ7a9E423aplRW1uZfPZZV1uMu0exI=
---
# JSONTemplate - 用于在 Vis/Vis2 中可视化 JSON 数据和其他数据的适配器
![标识](../../../en/adapterref/iobroker.vis-jsontemplate/admin/vis-jsontemplate.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.vis-jsontemplate.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-jsontemplate.svg)
![安装数量](https://iobroker.live/badges/vis-jsontemplate-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/vis-jsontemplate-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.vis-jsontemplate.png?downloads=true)

**测试：**![测试和发布](https://github.com/oweitman/ioBroker.vis-jsontemplate/workflows/Test%20and%20Release/badge.svg)

＃＃ 概述
用于在 Vis/Vis2 中可视化 JSON 数据和其他数据的适配器。
您可以使用模板系统自定义数据输出。
模板中可以包含 HTML、CSS 和 JavaScript。

jsontemplate 小部件之前在 rssfeed（适用于 vis1）和 vis-2-widgets-ovarious 适配器中可用。这些小部件将在不久的将来从这些适配器中移除。

＃＃ 安装
照常从稳定仓库安装适配器。
如果您想测试新功能或错误修复，也可以从测试仓库安装适配器。有关功能和新闻，请参阅 iobroker 论坛中此适配器的测试和支持主题。

安装完成后，适配器应该会显示在 iobroker 的适配器部分。有时，更改不可见，尤其是在 Web 更改（小部件/配置对话框）时，可能需要在命令行中执行以下命令：

```bash
iobroker upload jsontemplate
```

在适配器行右侧区域，可以使用加号按钮添加实例

＃＃ 配置
此适配器在管理区域中没有配置对话框。

## Vis 和小部件
以下小部件确实存在

- [`JSON 模板`](#json-template) - 你可以定义自定义模板

在 vis 中显示任何 JSON 数据。

### JSON 模板
使用此小部件，可以根据需要显示任何包含 JSON 数据的数据点。
显示使用模板格式完成，模板格式可以理解为 HTML 代码 + JavaScript + CSS + 控制 JSON 属性显示的特殊标签的组合形式。
JSONTemplate 现在支持使用 await 进行异步调用。

| 设置 | 描述 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| json_template | 该模板可用于确定 JSON 数据的外观。所有有效的 HTML 标签（包括 style 标签中的 CSS 属性）均可在模板中使用。此外，还有一些特殊标签，用于显示 JSON 数据并执行 JavaScript 指令。|
| json_oid | 选择具有相应 JSON 数据的数据点。|
| json_dpCount | 模板中可用的数据点的数量。|
| json_dp | 要提供的数据点 ID。|

有关模板系统的详细信息，请参阅基于示例的模板章节

JSON 数据以前缀 data 的形式传递给模板。此外，当前 WidgetID 也可作为变量使用，以便在单独的 CSS 指令中指定。

#### 高级用例
以上示例仅涵盖了纯输出。
现在，模板还可以添加 HTML 标签，以实现特定的布局。以下是示例：

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

（在 Markdown 中颜色不可见）

#### 异步调用的用例
**区块 1：**

使用 await 调用 sendToAsync 函数。此示例在管理适配器中调用一个测试函数。

**区块 2：**

将结果字符串化并输出为 html

**区块 3：**

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

#### 数据库支持的任务列表的用例
＃＃＃＃＃ **介绍**
本用例描述了如何在`ioBroker`中可视化并以交互方式修改 MySQL 数据库中的待办事项列表。
重点是如何通过点击按钮实现简单的状态更改。此概念可作为**概念验证 (PoC)**，并可包含在未来的文档中。

---

##### **数据库结构（MySQL）**
首先，创建一个名为`test`的 MySQL 数据库。
该数据库包含一个表`test`，其中包含以下字段：

- `id`: 每个条目的唯一ID
- `todo`: 待办事项的标题
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

</详情>

---

##### **集成到 ioBroker**
###### **SQL 适配器**
要与数据库交互，需要`ioBroker.sql`适配器。
它已进行相应配置，可连接到 MySQL 数据库`test`。
请注意，`ioBroker` 会自动在数据库中创建自己的结构来存储历史数据点。

###### **JSON模板小部件**
为了实现可视化，我们使用`JSONTemplate`小部件。

##### **集成到 VIS**
我们放置`JSONTemplate`小部件并填写以下字段：

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

</详情>

###### **刷新内容的数据点**
为了确保状态改变后更新能够反映出来，我们添加了以下本地数据点：

```text
local_trigger
```

此数据点**不需要明确创建**，因为`local_?`数据点在 VIS 内部处理（参见`vis`文档）。

代码解释
###### **模板结构**
| 行 | 内容 |
| ----- | ---------------------------------------------------------------------- |
| 1-5 | 按钮外观的 CSS 样式 |
| 6-11 | 表头包含 ID、Todo、Action 列 |
| 12-16 | 使用`getTodo()`从 MySQL 数据库获取数据 |
| 23-28 | `clicktodo()` 函数的全局引用 |
| 30-37 | `getButton()` 函数创建一个具有当前状态的按钮 |
| 38-44 | `clicktodo()` 通过按钮点击更改状态的功能 |
| 45-48 | `getTodo()` 函数通过 SQL 适配器获取数据 |
| 49-52 | `setAction()` 函数更新数据库条目 |
| 53-58 | `sendToAsync()` 函数将 `async/await` 与 `vis.conn.sendTo()` 结合使用 |
| 53-58 | `sendToAsync()` 函数将 `async/await` 与 `vis.conn.sendTo()` 结合使用 |

## 模板系统
## 标签
模板系统需要配合特定的标签使用。
所用标签的含义如下

| `tag` | 描述 |
| ----- | ------------------------------------------------------------------- |
| <%= | 所包含的表达式/变量的内容将被转义。|
| <%- | 所包含的表达式/变量的内容未转义。|
| <% | 无输出，用于包含 JavaScript 指令 |
| %> | 通常是一个结束标签，用于完成前面的一个标签 |

这些标签之外的所有内容都会按原样显示，或者如果是 HTML 则解释为 HTML。
模板中有 2 个预定义变量可用

### 示例对象
对于以下所有示例，均使用以下 json。

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

属性可以输出如下

**模板：**

```ejs
<%- data.onenumber %>
<%- data.onetext %>
```

**结果：**

```text
    123 onetwothree
```

数组可以通过索引访问。索引始终从 0 开始。但是，也存在伪数组，其索引不从 0 开始，甚至包含文本。这时，对象的规则适用。
在上面的例子中，这将是

**模板：**

```ejs
<%- data.onearray[0] %>
<%- data.onearray[1] %>
```

**结果：**

```text
    one two
```

如果您尝试直接输出不带索引的数组，模板将输出以逗号分隔的所有元素

**模板：**

```ejs
<%- data.onearray %>
```

**结果：**

```text
    one,two
```

数组也可以由对象集合组成。
此处的示例仅包含一个简单的数组。
稍后将提供包含对象的数组的示例。

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

**对象** 可以包含单独的属性、数组或对象。
这意味着 JSON 数据可以嵌套到任意深度。

对象的属性可以用点符号或括号符号来表示。
只有当属性符合某些命名约定（首字符必须是字母，其余字符为数字、字母或下划线）时，点符号才有效。
括号符号也适用于不符合命名约定的属性。

**点符号：**

**模板：**

```ejs
<%- data.oneobject.attribute1 %>
```

**括号表示法：**

**模板：**

```ejs
<%- data.oneobject["attribute1"] %>
```

**两个例子的结果：**

```text
    1
```

循环遍历对象的属性

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
- 安装开发服务器
- 使用 --noStart 选项启动 dev-server
- 首次启动时安装附加适配器 web 和 vis1
- 启动 vscode 启动配置“vis-1 编辑器”
- 如果小部件不可用，请在适配器页面上以专家模式上传适配器
- 现在您可以在 vscode 中的 jsontemplate.js 文件中设置断点
- 如果你在 js 文件中更改了某些内容，则必须将源代码编译为

使用 npm run build-vis1widgets 命令在 dist 文件夹中运行。

- dev-server 将更改的文件上传到 iobroker，但对于 vis1，您有

执行 iob visdebug 命令来重新加载小部件

- 要翻译 en.json 中的其他条目，请使用 transform-widgets-vis1 命令

### Vis2 小部件
- 安装开发服务器
- 打开一个新的 vscode 窗口（实例二）
- 克隆 vis2 存储库
- 按照 vis2 存储库自述文件中的说明进行操作

在“开发和调试”一章中，您无需 fork 代码库。
我们只需要一个 vis2 适配器的运行实例

- 使用 npm run start 启动 vis 2
- 返回此适配器的 vscode 实例
- 使用 --noStart 选项启动 dev-server
- 启动 vscode 启动配置“vis-2 编辑器”
- 现在您可以在 vscode 中的 jsontemplate.js 文件中设置断点
- 如果你改变了某些东西，你就不需要做任何其他事情，

因为 vite 支持热重载。有时使用 F5 重新加载 vis2 很有用

- 要翻译 en.json 中的其他条目，请使用 transform-widgets-vis2 命令

## 待办事项
- 待定

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