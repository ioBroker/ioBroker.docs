---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rssfeed/README.md
title: ioBroker 适配器，用于请求和显示不同标准（Atom、RSS、RDF）的 RSS 源
hash: lyXFXr3Ju6dg0BPZZRhneQ+hOP4x0mGTAy7vzr/kM5E=
---
# IoBroker 适配器，用于请求和显示不同标准（Atom、RSS、RDF）的 RSS 源
![标识](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.rssfeed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![安装数量](https://iobroker.live/badges/rssfeed-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/rssfeed-stable.svg)
![NPM](https://nodei.co/npm/iobroker.rssfeed.png?downloads=true)

**测试：** ![测试与发布](https://github.com/oweitman/ioBroker.rssfeed/workflows/Test%20and%20Release/badge.svg)

＃＃ 概述
用于请求和显示不同标准（Atom、RSS、RDF）RSS订阅源的适配器。

您可以使用模板系统自定义订阅源的输出。模板中可以包含HTML、CSS和JavaScript代码。

重要提示：由于 iobroker 自动翻译成其他语言存在错误，因此只有英文翻译有效。

＃＃ 配置
请按照正常流程从稳定版软件源安装适配器。如果您想测试新功能或错误修复，也可以从测试版软件源安装适配器。有关功能和最新消息，请参阅 iobroker 论坛中该适配器的“测试与支持”主题帖。

安装完成后，适配器应该会显示在 iobroker 的适配器部分。

有时更改可能不会立即显示，尤其是在网页更改（小部件/配置对话框）的情况下，可能需要在命令行中执行以下命令：

```bash
iobroker upload rssfeed
```

在适配器线条的右侧区域，可以使用加号按钮添加实例。

配置很简单，只有几个字段。

| 设置 | 描述 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 默认刷新时间（分钟）| 是信息源再次加载的间隔时间（以分钟为单位）的一般规范。默认值为 60 分钟。 |
| Max Artikel（标准）| 此处可以限制待处理的数据总量。|

然后对于每个新的数据源：

| 设置 | 描述 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 名称 | 数据点的名称。在同一个文件夹内，名称不能出现两次。 |
| 类别 | 数据点应显示的子文件夹名称。 |
| URL | 信息源的完整地址（使用 http:// 或 https://，请参见以下示例） |
| 刷新（分钟）| 刷新/加载信息源所需的时间。可以为此信息源指定不同的值。否则，将采用通用设置。|
| 最大文章数 | 此数据点中应保存的文章数量。可以为此数据源指定不同的值。否则，将采用通用规范。 |

如果您保存并关闭了配置，则可以在对象树中找到以 JSON 数据点形式存在的 feed-data。

如果您删除某个条目，数据点不会自动删除。

## 可视化和小部件
以下组件实际存在

- [`RSS Feed widget 2`](#rss-feed-widget-2) - 用于显示单个订阅源
- [`RSS Feed Multi widget 3`](#rss-feed-multi-widget-3) - 在一个组件中显示多个聚合的订阅源。
- [`RSS Feed Meta Helper`](#rss-feed-meta-helper) - 一个用于检查订阅源元数据的辅助小部件
- [`RSS Feed Article Helper 2`](#rss-feed-article-helper) - 一个用于检查订阅源文章数据的辅助小部件
- [`RSS Feed Title marquee 4 (deprecated)`](#rss-feed-title-marquee-4-deprecated) - 一个用于以跑马灯形式显示订阅源标题的小部件
- [`RSS Feed Title marquee 5`](#rss-feed-title-marquee-5) - 一个用于以跑马灯形式显示订阅源标题的小部件
- [`JSON 模板 3`](#json-template3) - 一个与 RSS 源无关的小部件，但使用了相同的技术，您可以定义一个自定义模板以在可视化中显示任何 JSON 数据。

### RSS订阅小部件2
此小部件可用于在适配器的配置对话框中显示已订阅的 RSS 源。

借助模板系统，可以根据需要自定义输出。我们已提供一个简单的标准模板。

有关格式和语法的说明，请参阅以下页面。

| 设置 | 描述 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid | 选择具有相应 RSS 源的数据点。 |
| rss_template | 此模板决定 RSS 源的外观。所有有效的 HTML 标签（包括样式标签中的 CSS 属性）都可以在模板中使用。此外，还有一些特殊标签，用于显示源数据并执行 JavaScript 指令。为了更好地识别数据和属性名称，我们提供了两个小部件：rssfeed Meta helper 和 rssfeed Article helper。 |
| rss_maxarticles | 从 RSS 源显示的最大文章数 |
| rss_filter | 筛选功能允许在字段中输入一个或多个筛选条件，条件之间用分号 (;) 分隔。搜索将查找以下文章属性：标题、描述、分类。仅显示包含其中一项或多项的文章。 |

变量可用性：

- rss.meta：订阅源的元信息
- rss.articles：所有文章的数组
- widgetid：小部件的 widgetID
- style：如果您配置了其他样式信息，则此样式对象为 style 对象

有关这些变量的更多详细信息，请参阅“可用变量”章节。

有关模板系统的详细信息，请参阅“基于示例的模板”章节。

### RSS订阅多组件3
使用此组件，可以将多个订阅源聚合到一个订阅源中。

由于涉及多个订阅源，与普通的 RSS 订阅源组件相比，此模板中的数据可用性略有不同。

模板中不提供 meta 变量。但是，每篇文章都提供了三个 meta 属性：标题和描述，分别名为 meta_title 和 meta_description。

此外，可以在设置中为每个订阅源指定一个通用名称，该名称在模板中以 meta_name 的形式显示在每篇文章中，以便识别文章来源。

除此之外，此模板的规则与普通的 RSS 订阅源组件相同。

| 设置 | 组 | 描述 |
| --------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | 常规组 | 您可以在此处设置要配置的订阅源数量。每个订阅源都会在 vis 中创建一个单独的配置组。 |
| rss_template | | 此模板决定 RSS 源的外观。模板中可以使用所有有效的 HTML 标签（包括 style 标签中的 CSS 属性）。此外，还有一些特殊标签，用于显示源数据并执行 JavaScript 指令。为了更好地识别数据和属性名称，我们提供了两个小部件：rssfeed Meta helper 和 rssfeed Article helper。有关模板系统的详细信息，请参阅“基于示例的模板”章节。 |
| rss_dpCount | 常规组 | 您可以在此处指定模板中应提供的额外数据点数量。 |
| rss_dp[number] | 常规组 | 您可以在此处选择相应的数据点。数据点在模板中以变量 dp 的形式提供。这意味着可以在模板中按如下方式检索数据点。有关这些变量的详细信息，请参阅“可用变量”章节。 |
| rss_oid | 分组订阅源[数量] | 选择具有相应 RSS 源的数据点。 |
| rss_name | 群组订阅源[数量] | 您可以在此处输入一个名称，该名称将显示在每篇文章的模板中，属性名为 meta_name。 |
| rss_maxarticles | 分组订阅源[数字] | 从 RSS 订阅源显示的最大文章数量 |
| rss_filter | 群组订阅源[数量] | 有关这些变量的更多详细信息，请参阅“可用变量”章节。对于筛选功能，可以在字段中输入一个或多个筛选条件，以分号 (;) 分隔。搜索将查找以下文章属性：标题、描述、分类。仅显示包含这些术语之一的文章。 |

变量可用性：

- rss.articles：所有文章的数组。

- 文章中包含项目元信息的一个子集，以 **meta_name**、**meta_title** 和 **meta_description** 的形式提供。

- 如果配置了额外的数据点，则将 dp[] 作为数组
- widgetid：小部件的 widgetID
- style：如果您配置了其他样式信息，则此样式对象为 style 对象

### RSS订阅元助手
此组件可用于显示特定订阅源的元属性。它仅用作辅助组件，帮助创建模板，以便快速轻松地显示 RSS 订阅源数据的内容。

属性

| 设置 | 描述 |
| ------- | ------------------------------------------------------------ |
| rss_oid | 选择具有对应 RSS 源的数据点。 |

### RSS订阅文章助手
此组件可用于显示特定订阅源的文章属性。它仅用作辅助组件，用于创建模板，以便快速轻松地显示 RSS 订阅源数据的内容。

| 设置 | 描述 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid | 选择具有对应 RSS 源的数据点。 |
| rss_prefix | 为了方便通过复制/粘贴使用属性名称，可以在此处指定文章模板中使用的变量名称。 |
| rss_article | 此属性可用于在 RSS 源中的不同文章之间切换。 |

### RSS订阅源标题跑马灯4（已弃用）
使用此组件，所有标题属性都将以滚动文本的形式显示。作为从跑马灯组件 2 到 3 的升级，此组件现在是一个多组件，您可以在其中聚合多个 RSS 源。

| 设置 | 组 | 描述 |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | 常规组 | 您可以在此处设置要配置的订阅源数量。每个要配置的订阅源都会在 vis 中创建一个单独的组。 |
| rss_speed | 常规组 | 滚动文本的滚动速度属性 rss_divider - 常规组 您可以在此处输入用于分隔标题的字符。默认值为 +++。 |
| rss_pauseonhover | 常规组 | 如果启用此选项，当鼠标悬停在文本上时，滚动文本将停止。 |
| rss_link | 常规组 | 如果启用此选项，标题将显示为链接。点击或触摸标题，文章链接将在新窗口或标签页中打开。 |
| rss_withtime | 常规组 | 如果启用此选项，则会在相应标题前显示时间。属性 rss_withdate - 常规组 | 如果启用此选项，则会在相应标题前显示不带年份的日期和时间。 |
| rss_withyear | 常规组 | 如果启用此选项，则会在相应标题前显示日期（包含年份和时间）。 |
| rss_oid | Feeds[number] 组 | 选择具有相应 RSS 源的数据点。 |
| rss_maxarticles | Feeds[number] 组 | 从 RSS 源显示的最大文章数量 |
| rss_filter | Feeds[number] group | 筛选功能允许在字段中输入一个或多个筛选条件，条件之间用分号 (;) 分隔。搜索将查找以下文章属性：标题、描述、分类。仅显示包含其中一项或多项的文章。 |

### RSS订阅标题横幅 5
使用此组件，所有标题属性都将以滚动文本的形式显示。作为从跑马灯组件 2 到 3 的升级，此组件现在是一个多组件，您可以在其中聚合多个 RSS 源。

| 设置 | 组 | 描述 |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | 常规组 | 您可以在此处设置要配置的订阅源数量。每个要配置的订阅源都会在 vis 中创建一个单独的组。 |
| rss_speed | 常规组 | 滚动文本的滚动速度属性 rss_divider - 常规组 您可以在此处输入用于分隔标题的字符。默认值为 +++。 |
| rss_pauseonhover | 常规组 | 如果启用此选项，当鼠标悬停在文本上时，滚动文本将停止。 |
| rss_opentype | 常规组 | 链接打开方式的选择：`none`, `link`, `popup` |
| rss_withtime | 常规组 | 如果启用此选项，则会在相应标题前显示时间。属性 rss_withdate - 常规组 | 如果启用此选项，则会在相应标题前显示不带年份的日期和时间。 |
| rss_withyear | 常规组 | 如果启用此选项，则会在相应标题前显示日期（包含年份和时间）。 |
| rss_oid | Feeds[number] 组 | 选择具有相应 RSS 源的数据点。 |
| rss_maxarticles | Feeds[number] 组 | 从 RSS 源显示的最大文章数量 |
| rss_filter | Feeds[number] group | 筛选功能允许在字段中输入一个或多个筛选条件，条件之间用分号 (;) 分隔。搜索将查找以下文章属性：标题、描述、分类。仅显示包含其中一项或多项的文章。 |

### JSON 模板3
使用此组件，可以按需显示任何包含 JSON 数据的数据点。

显示采用模板格式，可以将其理解为 HTML 代码、JavaScript 和控制 JSON 属性显示的特殊标签的组合。

JSON Template3 现在支持使用 await 进行异步调用。JSON Template 2 将在未来版本中弃用。

| 设置 | 描述 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_template | 此模板可用于确定 JSON 数据的显示方式。模板中可以使用所有有效的 HTML 标签（包括 style 标签中的 CSS 属性）。此外，还有一些特殊标签，用于显示 JSON 数据并执行 JavaScript 指令。 |
| json_oid | 选择具有对应 JSON 数据的数据点。 |

有关模板系统的详细信息，请参阅“基于示例的模板”章节。

JSON 数据会以前缀形式传递给模板。此外，当前的 widgetID 也作为一个变量提供，以便在各个 CSS 指令中指定。

#### 高级用例
以上示例仅涵盖了纯文本输出。现在，还可以使用 HTML 标签来丰富模板，以实现特定的布局。以下是一个示例：

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

#### 异步调用的使用案例
**模块 1：**

使用 await 调用 sendToAsync 函数。此示例调用管理适配器中的测试函数。

**模块 2：**

将结果字符串化并输出为 HTML

**模块 3：**

sendToAsync 函数的定义

```html
<% req = await sendToAsync("admin.0","selectSendTo",{test:"test"}); %> <%- JSON.stringify(req) %> <% async function
sendToAsync(instance, command, sendData) { console.log(`sendToAsync ${command} ${sendData}`); return new
Promise((resolve, reject) => { try { vis.conn.sendTo(instance, command, sendData, function (receiveData) {
resolve(receiveData); }); } catch (error) { reject(error); } }); } %>
```

**结果：**

```text
[{"label":"Afghanistan","value":"AF"},{"label":"Åland Islands","value":"AX"},{"label":"Albania","value":"AL"}]
```

#### 数据库支持的任务列表的使用案例
＃＃＃＃＃ **介绍**
本用例描述了如何使用 `>=rssfeed 3.5.0` 适配器，在 `ioBroker` 中可视化并交互式地修改 MySQL 数据库中的待办事项列表。重点在于通过按钮点击实现简单的状态更改。此概念作为**概念验证 (PoC)**，未来可将其纳入文档。

---

##### **数据库结构（MySQL）**
首先，创建一个名为 `test` 的 MySQL 数据库。它包含一个名为 `test` 的表，该表包含以下字段：

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

###### **RSS订阅适配器和JSON模板小部件**
为了进行可视化，我们使用 `JSONTemplate` 小部件。

重要提示：

- 在 `vis 2` 中，该小部件包含在 `vis-2-widget-ovarious` 适配器中。
- 未来，一旦 `bluefox` 稳定了构建链，该小部件计划集成到 `ioBroker.jsontemplate` 中。

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
    window.jsontemplate = { clicktodo: clicktodo };

    function getButton(id, action) {
        let text = action === 0 ? 'In Progress' : 'Completed';
        return `<button class="btn" onclick="window.jsontemplate.clicktodo(this)" data-id="${id}" data-action="${action}">${text}</button>`;
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

```html
<%- data.onenumber %> <%- data.onetext %>
```

**结果：**

```text
    123 onetwothree
```

数组可以通过索引访问。索引总是从 0 开始。但是，也存在一些伪数组，它们的索引不从 0 开始，甚至可能包含文本。对于伪数组，则适用对象的访问规则。在上面的例子中，这将是：

**模板：**

```html
<%- data.onearray[0] %> <%- data.onearray[1] %>
```

**结果：**

```text
    one two
```

如果尝试直接输出数组而不指定索引，模板会输出所有元素，并用逗号分隔。

**模板：**

```html
<%- data.onearray %>
```

**结果：**

```text
    one,two
```

数组也可以包含对象集合。这里的示例仅包含一个简单的数组。稍后会给出包含对象的数组示例。

**模板：**

```html
<% for (var i = 0; i < data.onearray.length ; i++ ) { %> <%- data.onearray[i] %> <% } %>
```

**结果：**

```text
    one two
```

**对象**可以包含单个属性、数组或对象本身。这意味着 JSON 数据可以嵌套任意深度。

对象的属性可以使用点号表示法或方括号表示法来访问。点号表示法仅适用于符合特定命名规则的属性（第一个字符必须是字母，其余字符可以是数字、字母或下划线）。

方括号表示法也适用于不符合命名规则的属性。

**点表示法：**

**模板：**

```html
<%- data.oneobject.attribute1 %>
```

**括号表示法：**

**模板：**

```html
<%- data.oneobject["attribute1"] %>
```

**两个示例的结果：**

```text
    1
```

遍历对象的属性

**模板：**

```html
<% for (var prop in data.oneobject) { %> <%- "data.oneobject." + prop + " = " + data.oneobject[prop] %> <% } %>
```

**结果：**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## 模板中可用的变量
### `rss.meta`
这里包含有关订阅源的所有元信息。以下内容可用。我认为这些标识符的含义显而易见。我会在帮助文档中更详细地描述它们。或者您可以指定内容（有些是数组）。只有在 RSS 订阅源小部件 2 中，才能找到完整的元信息集。

模板的使用方法请参见**基于示例的模板**

- `meta.title`
- `meta.description`
- `meta.link`
- `meta.xmlurl`
- `meta.date`
- `meta.pubdate`
- `meta.author`
- `meta.language`
- `meta.image`
- `meta.favicon`
- `meta.copyright`
- `meta.generator`
- `meta.categories`

### `rss.articles or articles`
这是一个包含多个元素的数组（JavaScript 数组）。每个元素都具有以下属性。

为了方便起见，例如，我会在元素前面添加前缀。当然，您也可以自行选择前缀。只需在循环（forEach）中相应地命名即可。这里的标识符也一目了然。并非所有属性都会在每个 feed 中都填写。最重要的属性已包含在上面的模板中。

文章在 RSS 源小部件 2 中以 rss.articles 的形式提供，在 RSS 源多组件小部件 3 中以文章的形式提供。

模板的使用方法请参见**基于示例的模板**

- `item.title`
- `item.description`
- `item.summary`
- `item.link`
- `item.origlink`
- `item.permalink`
- `item.date`
- `item.pubdate`
- `item.author`
- `item.guid`
- `item.comments`
- `item.image`
- `item.categories`
- `item.source`
- `item.enclosures`

## 基于示例的模板
### 基础模板 RSS 源小部件 2
以下模板目前是 RSS 源小部件 2 的标准模板。

它已使用以下源进行测试。

- <http://www.tagesschau.de/xml/rss2> 或
- <https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html>

```html
<!--
    available variables:
    widgetid      ->  id of the widget
    rss.meta      ->  all meta informations of an feed, details see Meta Helper widget
    rss.articles  ->  all articles as array, details see Article Helper widget
    style         ->  all style settings for the widget

    all variables are read only
    -->
<style>
    #<%- widgetid % > img {
        width: calc(<%- style.width %> - 15px);
        height: auto;
    }
    #<%- widgetid % > img.rssfeed {
        width: auto;
        height: auto;
    }
</style>
<p><%- rss.meta.title %></p>
<% rss.articles.forEach(function(item){ %>
<div class="article">
    <p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
    <h3><%- item.title %></h3>
    <p><%- item.description %></p>
    <div style="clear:both;"></div>
</div>
<% }); %>
```

### 基础模板 RSS 源多组件 3
以下模板目前是 RSS 源多组件 3 的标准模板。

请注意变量使用上的细微差别。该模板已使用以下订阅源进行测试。

```html
<!--
    available variables:
    widgetid      ->  id of the widget
    articles      ->  all articles as array, details see Article Helper widget
                      only subset of meta information of the feed is available as
                      articles[0].meta_name
                      articles[0].meta_title
                      articles[0].meta_description
    style         ->  all style settings for the widget
    dp[]          ->  array of addition configured datapoints

    all variables are read only
    -->
<style>
    #<%- widgetid % > img {
        width: calc(<%- style.width || '230px' %> - 15px);
        height: auto;
    }
    #<%- widgetid % > img.rssfeed {
        width: auto;
        height: auto;
    }
</style>
<% rss.articles.forEach(function(item){ %>
<p><%- item.meta_name || item.meta_title || '' %></p>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

### RSS订阅多组件示例模板3，文章以幻灯片形式展示，并带有上一篇/下一篇按钮
```html
<!--
 available variables:
 widgetid      ->  id of the widget
 rss.articles  ->  all articles as array, details see Article Helper widget
 style         ->  all style settings for the widget

 all variables are read only
-->

<style>
    #<%- widgetid % > img {
        width: calc(<%- style.width || '230px' %> - 15px);
        height: auto;
    }
    #<%- widgetid % > img.rssfeed {
        width: auto;
        height: auto;
    }

    .container {
        overflow: hidden;
        height: 100%;
    }
    .content {
        position: relative;
        border: 1px solid #ccc;
        overflow: scroll;
        height: 90%;
    }

    .slide {
        position: absolute;
        display: none;
    }

    .slide.active {
        display: contents;
    }

    .controls {
        margin-top: 10px;
    }
</style>

<div class="container">
    <div class="content">
        <% rss.articles.forEach(function(item){ %>
        <div class="article slide">
            <p>
                <small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small>
            </p>
            <h3><%- item.title %></h3>
            <p><%- item.description %></p>
            <div style="clear:both;"></div>
        </div>
        <% }); %>
    </div>
    <div class="controls">
        <button onclick="prevSlide()">Zurück</button>
        <button onclick="nextSlide()">Weiter</button>
    </div>
</div>

<script>
    currentSlide = 0;
    slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function prevSlide() {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
        showSlide(currentSlide);
    }

    function nextSlide() {
        currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    }
    showSlide(currentSlide);
</script>
```

### 模板示例和详细描述
```html
<%= meta.title %> <% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

各行内容简述：Z1：输出信息标题；Z2：无输出。JavaScript 命令循环遍历所有文章，每次循环将当前元素赋值给变量 item。

Z3：输出日期和时间。使用 <p> 标签进行格式化。格式化使用 vis 的自带日期格式化函数。具体说明请参见适配器 vis。

Z4：输出文章标题。使用 <header 3> 标签进行格式化。

Z5：输出文章内容。使用 <p> 标签进行格式化。这里，至少在这两个例子中，都包含了 HTML 代码，通常包含图片和描述性文字。Z6：输出一个 div 标签，用于清除 feed-html 中的特殊格式（tagesschau 和 bild 这两个例子都需要它。其他 feed 可能不需要）。

Z7：没有输出。这一行代码结束了 JavaScript 循环。Z2 和 Z7 之间定义的所有内容都会在每篇文章中重复执行。

## 待办事项
- 通过在管理对话框中保存来清理数据点 info.lastRequest 中未使用的条目。
- 管理员对话框中用于清理未使用数据点的按钮
- ~~多组件 RSS 源~~
- ~~多组件跑马灯~~
- ~~Weitere Datenpunkte im Template verfügbar machen.~~
- ~~标题的Laufschrift小部件<https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2>~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.0.3 (2026-03-26)

- Update packages
- fix repochecker

### 4.0.2 (2026-03-07)

- fix repochecker

### 4.0.1 (2026-03-07)

- fix repochecker

### 4.0.0 (2026-03-05)

- update packages
- remove deprecated widgets

### 3.6.1 (2025-09-22)

- remove dist/ folder from lint

### 3.6.0 (2025-09-22)

- revert to node 18
- remove deprecated marquee4 widget
- improve widget build
- integrate translations and css into build process
- remove unused css
- deprecate JSON-Template widgets, please use new adapter iobroker.vis-jsontemplate
- add message for the update to inform users

### 3.5.2 (2025-03-20)

- improve build

### 3.5.1 (2025-03-20)

- improve build

### 3.5.0 (2025-03-18)

- make async function calls available in templates

### 3.4.1 (2025-02-18)

- fix eslint
- introducing a new attribute opentype to open the links in the marquee widget

### 3.3.1 (2025-01-23)

- add an accept request header, because axios send only application/json

### 3.3.0 (2025-01-21)

- upgrade version js-controller
- switch from request to axios

### 3.2.0 (2024-11-27)

- update jsonconfig responsive
- switch to iobroker/eslint
- improver adapter code
- improve widget code

### 3.1.0 (2024-08-11)

- adjust dependency to js-controller in a minor release

### 3.0.2 (2024-08-09)

- add keyword in package.json

### 3.0.1 (2024-08-09)

- add template example for articles as a Diashow
- adjust dependency to js-controller

### 3.0.0 (2024-07-24)

- update multifeed widget 3 and deprecate multifeed widget 2
- breaking change: in rssfeed widget 2: articles and meta have to be changed to rss.articles and rss.meta

### 2.10.0 (2024-07-11)

- fine tuning on templates and available variables
- fine tuning on format and translation
- move widget documentation form doc.html to readme

### 2.9.10 (2024-07-11)

- update images for dark and light theme

### 2.9.9 (2024-07-11)

- update packages
- update formating and improve error logging
- remove detailed sentry status reporting
- fix subscribing states

### 2.9.8 (2024-07-09)

- ignore widgets in vis-2
- add restart vis/vis2

### 2.9.7 (2024-06-22)

- formating code
- remove common.main from io-package.json

### 2.9.6 (2024-06-06)

- fix branch name in link

### 2.9.4 (2024-06-05)

- test release after rename branch from master to main

### 2.9.3 (2024-06-05)

- switch branchname from master to main
- add node 22 to tests

### 2.9.2 (2024-06-04)

- add some translations
- fix warning from adapter checker

### 2.9.1 (2024-06-03)

- update iobroker files and settings

### 2.8.2 (2024-04-21)

- (bluefox) Fixed loading of words.js in vis

### 2.8.1 (2023-03-15)

- (bluefox) Corrected vis widget
- admin changed to jsonConfig, dev-environment now devcontainer

### 2.7.0 (2022-12-11)

### 2.6.1 (2022-07-30)

- added more information to sentry

### 2.6.0 (2022-07-26)

- added sentry

### 2.4.0 (2022-07-25)

- added name option to marquee widget

### 2.0.0

- Rework of the admin dialog
- Fix some errors and glitches

### 1.0.0

- Released in stable

### 0.9.0

- fixed/extended json template

### 0.8.0

- adapted configuration pages to react.
- Prepared for stable release

### 0.0.30

- added some template examples to the widget documentation

### 0.0.29

- improved error messages
- removed deprecated widget / change widget beta flag
- changed createObject/setState logic due iobroker-controller >3.0

### 0.0.28

- removed customtab

### 0.0.27

- adapter configuration is now editable

### 0.0.26

- corrected changelog size

### 0.0.25

- the error messages for the template are improved

### 0.0.24

- errors in the request of feeds are now real errors in the iobroker log
- loading of rules for ejs in the editor is improved
- marquee3 widget: options to show time and date

### 0.0.23

- republish to npm

### 0.0.22

- improvements in the configuration dialog
- remove unused admintab
- new RSS Feed multi widget. in this widget you can add your one or more datapoints, that are available in the template.
- New marquee widget 3 replaces the existing marquee widget 2.The marquee widget 3 is now a multi widget and can handle more than one feed. The Headlines are now aggregated.
- the existing widget JSON template is improved. in this widget you can add your one or more datapoints, that are available in the template.
- Remove several deprecated widgets (RSS Feed widget 1, Article Helper 1, Marquee 1, JSON template 1)

### 0.0.21

- add link option to marquee widget
- widget help added
- marquee widget: the divider characters (default: +++) are configurable

### 0.0.20

- add ejs syntax to template editor

### 0.0.19

- try to fix marquee widget.

### 0.0.18

- try to fix the wrong NoSave dialog

### 0.0.17

- rework setting objects and states

### 0.0.16

- improve logic adding rssfeed in configuration dialog
- fix wrong icon for marquee widget
- define default template for rssfeed widget
- deprecate existing and replace with new version of widgets to improve naming of the attributes in case of translation
- widget rss marquee: replace duration attribute with speed attribute and improved the calculation algorithm. now same number is same speed regardless of the length of the titles

### 0.0.15

- fix bug saving last request in adapter configuration / improve debug messages

### 0.0.14

- update package.json and install new tools for stream encoding/decoding detection
- implement encoding detection and stream encoding
- change the ejs lib with a real browserified lib

### 0.0.13

- new widget as a guest, because it is not directly related to the rssfeed functionality, but reuse the same code base. maybe later i transfer it to an own adapter. the new widget can take a json datapoint and you can visualize the data with the ejs template system.

### 0.0.12

- now you can download the adapter configuration in the admin dialog. upload is not possible due to security restrictions in modern browsers.

### 0.0.11

- improve admin layout
- implement a forceRefresh button

### 0.0.10

- fix bug a bug in marquee widget. not all styles should applied to the span tag.

### 0.0.9

- apply widget styles also to the inner span element, because they had not any effect on the marquee.
- renew the package-lock.json
- add categories to save feeds in subfolders
- improve mechanism to write only updated feeds to datapoint. the feed has new data if comparision of articles in title and description is different.

### 0.0.8

- improve lasrequest logic of the adapter
- fix problem with datapoint naming

### 0.0.7

- test with encapsulation of ejs.js, because of error in some browsers

### 0.0.6

- add attribute duration for widget marquee to control animation duration

### 0.0.5

- new widget marquee for article titles
- add filter function for articles. the filter searches in title,description and categories, several filter criteria can be seperated by semicolon

### 0.0.4

- some adjustments in readme, io-package

### 0.0.3

- add addveyor build

### 0.0.2

- added widgets meta helper and article helper

### 0.0.1

- initial release

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