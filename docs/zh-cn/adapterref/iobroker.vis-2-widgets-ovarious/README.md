---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-ovarious/README.md
title: Vis 2 (o)各种小部件
hash: 9kE+Av1tIRAcEsL/crz1sRamAiY2YQUNh6SxcJx9+/k=
---
![安装数量](http://iobroker.live/badges/vis-2-widgets-ovarious-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vis-2-widgets-ovarious.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-ovarious.svg)
![新平台](https://nodei.co/npm/iobroker.vis-2-widgets-ovarious.png?downloads=true)

<!-- markdownlint-禁用 MD036 -->

# Vis 2 (o)各种小部件
![标识](../../../en/adapterref/iobroker.vis-2-widgets-ovarious/admin/vis-2-widgets-ovarious.png)

该适配器包含各种 vis-2 小部件。

好的，实际上只有一个 vis-2 小部件，但我的路线图上还有一些。

## JSON 模板小部件
使用此小部件，可以根据需要显示任何具有 JSON 数据的数据点。
显示使用模板格式完成，可以将其视为 HTML 代码 + JavaScript + 控制 JSON 属性显示的特殊标签的组合形式。

### 属性 JSON 数据点
选择具有相应 JSON 数据的数据点。

#### 属性模板
模板可用于确定 JSON 数据的外观。模板中可使用所有有效的 HTML 标签（包括 style 标签中的 CSS 属性）。
还有一些特殊标签，可在其中显示 JSON 数据并执行 JavaScript 指令。

模板系统与某些标签配合使用。
使用的标签具有以下含义

| `tag` | 描述 |
| ----- | ------------------------------------------------------------------- |
| <%= | 包含的表达式/变量的内容将被转义。|
| <%- | 所包含的表达式/变量的内容未转义。|
| <% | 无输出，用于封闭的 javascript 指令 |
| %> | 通常是一个结束标签，用来完成前面的一个标签 |

这些标签之外的所有内容都会按原样显示，或者将其解释为 HTML。（例如，参见模板中的 p 标签、div 标签、small 标签，您有 2 个预定义变量可用

JSON 数据以前缀 data 的形式传递给模板。此外，当前 widgetID 也可用作变量，以便在单独的 CSS 指令中指定。

示例对象
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

对于上面的例子，属性可以输出如下

```html
<%- data.onenumber %> <%- data.onetext %>
```

**结果**

```html
123 onetwothree
```

数组可以通过索引访问。索引始终从 0 开始。但是，也存在伪数组，其中索引不从 0 开始，甚至由文本组成。这里适用对象的规则。在上面的例子中，这将是

```html
<%- data.onearray[0] %> <%- data.onearray[1] %>
```

＃＃＃＃＃ 结果
```html
one two
```

如果你尝试直接输出没有索引的数组，模板将输出以逗号分隔的所有元素

```html
<%- data.onearray %>
```

**结果**

```html
one,two
```

数组也可以由对象集合组成。此处的示例仅包含一个简单的数组。稍后将给出带有对象的数组的示例。

```html
<% for (var i = 0; i < data.onearray.length ; i++ ) { %> <%- data.onearray[i] %> <% } %>
```

**结果**

```html
one two
```

**对象** 可以再次包含单个属性、数组或对象。这意味着 JSON 数据可以嵌套到任意深度。

对象的属性可以使用点符号或括号符号来表示。只有当属性符合某些命名约定（第一个字符必须是字母，其余为数字或字母或下划线）时，点符号才有效。
括号符号也适用于不符合命名约定的属性。

**点符号**

```html
<%- data.oneobject.attribute1 %>
```

**括号表示法**

```html
<%- data.oneobject["attribute1"] %>
```

**两个示例的结果**

```html
1
```

循环遍历对象的属性

```html
<% for (var prop in data.oneobject) { %> <%- "data.oneobject." + prop + " = " + data.oneobject[prop] %> <% } %>
```

**结果**

```html
data.oneobject.attribute1 = 1 data.oneobject.attribute2 = 2
```

**高级用例**

上面的示例中仅涵盖了纯输出。现在还可以使用 HTML 标签丰富模板，以实现特定布局。以下是示例：

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

**结果**

```html
data.oneobject.attribute1 = 1 data.oneobject.attribute2 = 2
```

## Changelog

<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 0.1.8 (2024-07-28)

- improve icon
- remove versions from io-package.json

### 0.1.7 (2024-07-28)

- fix widget addressing

### 0.1.6 (2024-07-28)

- fix widget addressing

### 0.1.5 (2024-07-28)

- fix adapter checker issues

### 0.1.4 (2024-07-28)

- fix things from adapter checker

### 0.1.3 (2024-07-27)

- add icon
- add documentation

### 0.1.2 (2024-07-27)

- prepare release

### 0.1.1 (2024-07-27)

- fix widget addressing

### 0.1.0 (2024-07-27)

- initial Release

## License

The MIT License (MIT)

Copyright (c) 2024 oweitman <oweitman@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.