---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rssfeed/README.md
title: ioBroker 适配器用于请求和显示不同标准的 RSS 提要（Atom、RSS、RDF）
hash: has9xS5uJI8QfTDwC7Q+OTCPNtY8AVMvFoIMJCYS1Rk=
---
# IoBroker 适配器用于请求和显示不同标准的 RSS 提要（Atom、RSS、RDF）
![标识](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.rssfeed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![安装数量](https://iobroker.live/badges/rssfeed-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/rssfeed-stable.svg)
![新平台](https://nodei.co/npm/iobroker.rssfeed.png?downloads=true)

**测试：**![测试与发布](https://github.com/oweitman/ioBroker.rssfeed/workflows/Test%20and%20Release/badge.svg)

＃＃ 概述
适配器用于请求和显示不同标准（Atom、RSS、RDF）的 RSS 源。
您可以使用模板系统自定义源的输出。在模板中，您可以包含 HTML、CSS 和 Javascript。

重要提示：由于 iobroker 自动翻译成其他语言时存在错误，因此只有英文翻译有效

＃＃ 安装
从稳定存储库正常安装适配器。如果您想测试新功能或错误修复，也可以从测试存储库安装适配器。有关功能和新闻，请参阅 iobroker 论坛中有关此适配器的测试和支持主题。

安装后，适配器应显示在 iobroker 的适配器部分中。
有时，更改不可见，尤其是 Web 更改（小部件/配置对话框）时，可能必须在命令行上执行以下命令：

```bash
iobroker upload rssfeed
```

在适配器行的右侧区域中，可以使用加号按钮添加实例

＃＃ 配置
配置很简单。只有几个字段

| 设置 | 描述 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 默认刷新（分钟）| 是多久一次再次调用 feed 的一般规范（以分钟为单位）。默认值为 60 分钟 |
| Max Artikel（标准）| 可以在此处限制要处理的数据总量。|

然后对于每个新的 feed：

| 设置 | 描述 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 名称 | 数据点的名称。文件夹内的名称不得出现两次。|
| 类别 | 数据点应出现的子文件夹的名称。|
| Url | feed 的完整地址（使用 http:// 或 https://，见下文示例）|
| 刷新（分钟）| 刷新/加载 feed 的时间。可以为此 feed 指定不同的值。否则将采用一般规范 |
| 最大文章数 | 数据点中应保存的文章数。可以为此供稿指定不同的值。否则将采用一般规范 |

如果您保存并关闭配置，则可以在对象树中找到 feed-data 作为 JSON 数据点。
如果您删除条目，数据点不会自动删除。

## Vis 和小部件
以下小部件确实存在

- [`RSS Feed widget 2`](#rss-feed-widget-2) - 显示单个 feed
- [`RSS Feed Multi widget 3`](#rss-feed-multi-widget-3) - 在一个小部件中显示多个聚合的 feed。
- [`RSS Feed Meta Helper`](#rss-feed-meta-helper) - 用于检查 feed 元数据的辅助小部件
- [`RSS Feed Article Helper 2`](#rss-feed-article-helper) - 用于检查 feed 文章数据的辅助小部件
- [`RSS Feed Title marquee 3`](#rss-feed-title-marquee-3) - 一个用于将 Feed 的标题显示为字幕的小部件
- [`JSON 模板`(#json-template)] - 一个与 RSS 提要无关的小部件，但使用相同的技术，您可以定义自定义模板以在 vis 中显示任何 JSON 数据。

### RSS 源小部件 2
此小部件可用于在适配器的配置对话框中显示订阅的 RSS 源。
使用模板系统，可以根据需要自定义输出。已经提供了一个简单的标准模板。
可以在以下页面中找到格式和语法的描述。

| 设置 | 描述 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid | 选择具有相应 RSS 提要的数据点。|
| rss_template | 模板决定了 RSS 源的外观。模板中可以使用所有有效的 HTML 标签（包括 style 标签中的 CSS 属性）。此外，还有一些特殊标签，其中显示源数据并可执行 JavaScript 指令。为了更好地识别数据和使用的属性名称，有两个小部件，rssfeed Meta helper 和 rssfeed Article helper。|
| rss_maxarticles | 从 RSS 源显示的单个文章的最大数量 |
| rss_filter | 对于过滤功能，可以在字段中输入一个或多个过滤条件，以分号 (;) 分隔。搜索时会搜索以下文章属性：标题、描述、类别。仅显示包含其中一个术语的文章。|

**变量的可用性：**

- rss.meta：feed 的元信息
- rss.articles：所有文章的数组
- widgetid: 小部件的 widgetID
- style：如果你配置了附加样式信息，则为样式对象

有关这些变量的更多详细信息，请参阅章节**可用变量**

有关模板系统的详细信息，请参阅基于示例的模板章节

### RSS Feed 多窗口小部件 3
使用此小部件，可以将多个提要聚合到一个提要中。
由于有多个提要，与普通的 RSS 提要小部件相比，模板中的数据可用性存在一些差异。
模板中没有元变量。但是，每个单独的文章中都有 3 个元属性标题和说明，名称为 meta_title 和 meta_description。
此外，可以在设置中为每个提要分配一个通用名称，该名称在模板中以 meta_name 的名称提供，以便可以识别文章的来源。
否则，模板适用与 RSS 提要小部件相同的规则。

| 设置 | 组 | 描述 |
| --------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | 常规组 | 您可以在此处设置要配置的 feed 数量。在 vis 中为每个 feed 创建一个单独的配置组。|
| rss_template | | 模板决定了 RSS 源的外观。所有有效的 HTML 标签（包括 style 标签中的 CSS 属性）都可以在模板中使用。此外，还有一些特殊标签，其中显示源数据并可执行 JavaScript 指令。为了更好地识别数据和所使用的属性名称，有两个小部件，rssfeed Meta helper 和 rssfeed Article helper。有关模板系统的详细信息，请参阅基于示例的模板一章 |
| rss_dpCount | 常规组 | 您可以在此处指定模板中应提供的附加数据点的数量。|
| rss_dp[number] | 常规组 | 您可以在此处选择相应的数据点。数据点在模板中的变量 dp 下可用。这意味着可以在模板中按如下方式检索数据点。有关这些变量的详细信息，请参阅章节可用变量 |
| rss_oid | Group feeds[number] | 选择具有相应 RSS feed 的数据点。|
| rss_name | Group feeds[number] | 您可以在此处输入一个名称，该名称将在模板中为属性名称 meta_name 下的每篇文章提供。|
| rss_maxarticles | Group feeds[number] | 从 RSS feed 中显示的最大单独文章数量 |
| rss_filter | Group feeds[number] | 有关这些变量的详细信息，请参阅章节可用变量对于过滤功能，可以在字段中输入一个或多个过滤条件，以分号 (;) 分隔。搜索将搜索以下文章属性：标题、描述、类别。仅显示包含其中一个术语的文章。|

**变量的可用性：**

- rss.articles：所有文章的数组。

- 文章中提供了项目元信息的子集，形式为 **meta_name**、**meta_title** 和 **meta_description**

- dp[] 作为数组，如果你配置额外的数据点
- widgetid: 小部件的 widgetID
- style：如果你配置了附加样式信息，则为样式对象

### RSS 源元助手
此小部件可用于显示特定提要的元属性。它只是用作帮助小部件，用于创建模板以快速轻松地显示 RSS 提要数据的内容。
属性

| 设置 | 描述 |
| ------- | ------------------------------------------------------------ |
| rss_oid | 选择具有相应 RSS 提要的数据点。|

### RSS Feed 文章助手
此小部件可用于显示特定提要的文章属性。它只是用作帮助小部件，用于创建模板以快速轻松地显示 RSS 提要数据的内容。

| 设置 | 描述 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid | 选择具有相应 RSS 提要的数据点。|
| rss_prefix | 为了更容易通过复制/粘贴使用属性名称，可以在此处指定文章模板中使用的变量名称。|
| rss_article | 此属性可用于在 RSS 提要中的各种现有文章之间切换。|

### RSS 源标题框 3
使用此小部件，所有标题属性都将显示为滚动文本。作为从 Marquee 小部件 2 到 3 的更改的一部分，此小部件现在是一个多小部件，您可以在其中聚合多个 RSS 源。

| 设置 | 组 | 描述 |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | 常规组 | 您可以在此处设置要配置的 feed 数量。在 vis 中为每个要配置的 feed 创建一个单独的组。|
| rss_speed | 常规组 | 滚动文本的滚动速度 属性 rss_divider - 常规组 您可以在此处输入用于分隔标题的字符。默认值为+++。|
| rss_pauseonhover | 常规组 | 如果打开此选项，则只要将鼠标悬停在文本上，滚动文本就会停止。|
| rss_link | 常规组 | 如果启用此选项，标题将显示为链接。如果您单击或触摸标题，则文章的链接将在新窗口或选项卡中打开。|
| rss_withtime | 常规组 | 如果打开此选项，则会在相应标题前显示时间。 属性 rss_withdate - 常规组 如果启用此选项，则会在相应标题前显示不带年份的日期和时间。|
| rss_withyear | 常规组 | 如果启用此选项，则会在相应的标题前显示带有年份的日期和时间。|
| rss_oid | Feeds[number] 组 | 选择具有相应 RSS feed 的数据点。|
| rss_maxarticles | Feeds[number] group | 从 RSS feed 中显示的最大单独文章数量 |
| rss_filter | Feeds[number] group | 对于过滤功能，可以在字段中输入一个或多个过滤条件，以分号 (;) 分隔。搜索时会搜索以下文章属性：标题、描述、类别。仅显示包含其中一个术语的文章。|

### JSON 模板2
使用此小部件，可以根据需要显示任何具有 JSON 数据的数据点。
显示使用模板格式完成，可以将其视为 HTML 代码 + JavaScript + 控制 JSON 属性显示的特殊标签的组合形式。

| 设置 | 描述 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_template | 模板可用于确定 JSON 数据的外观。模板中可以使用所有有效的 HTML 标签（包括 style 标签中的 CSS 属性）。还有一些特殊标签，可在其中显示 JSON 数据并执行 JavaScript 指令。|
| json_oid | 选择具有相应 JSON 数据的数据点。|

有关模板系统的详细信息，请参阅基于示例的模板章节

JSON 数据以前缀 data 的形式传递给模板。此外，当前 widgetID 也可用作变量，以便在单独的 CSS 指令中指定。

**高级用例：**

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
  <span class="mycssclassproperty"
    ><%- "data.oneobject." + prop + " = " %></span
  >
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

## 模板系统
## 标签
模板系统与某些标签配合使用。
使用的标签含义如下

| `tag` | 描述 |
| ----- | ------------------------------------------------------------------- |
| <%= | 包含的表达式/变量的内容将被转义。|
| <%- | 所包含的表达式/变量的内容未转义。|
| <% | 无输出，用于封闭的 javascript 指令 |
| %> | 通常是一个结束标签，用于完成前面的一个标签 |

这些标签之外的所有内容都会按原样显示，或者如果是 HTML 则解释为 HTML。
在模板中，您有 2 个预定义变量可用

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

```html
<%- data.onenumber %> <%- data.onetext %>
```

**结果：**

```text
    123 onetwothree
```

数组可以通过索引访问。索引始终从 0 开始。但是，也存在伪数组，其中索引不从 0 开始，甚至由文本组成。这里适用对象的规则。在上面的例子中，这将是

**模板：**

```html
<%- data.onearray[0] %> <%- data.onearray[1] %>
```

**结果：**

```text
    one two
```

如果你尝试直接输出没有索引的数组，模板将输出以逗号分隔的所有元素

**模板：**

```html
<%- data.onearray %>
```

**结果：**

```text
    one,two
```

数组也可以由对象集合组成。此处的示例仅包含一个简单的数组。稍后将给出带有对象的数组的示例。

**模板：**

```html
<% for (var i = 0; i < data.onearray.length ; i++ ) { %> <%- data.onearray[i] %>
<% } %>
```

**结果：**

```text
    one two
```

**对象** 可以再次包含单个属性、数组或对象。这意味着 JSON 数据可以嵌套到任意深度。

对象的属性可以使用点符号或括号符号来表示。只有当属性符合某些命名约定（第一个字符必须是字母，其余为数字或字母或下划线）时，点符号才有效。
括号符号也适用于不符合命名约定的属性。

**点符号：**

**模板：**

```html
<%- data.oneobject.attribute1 %>
```

**括号表示法：**

**模板：**

```html
<%- data.oneobject["attribute1"] %>
```

**两个例子的结果：**

```text
    1
```

循环遍历对象的属性

**模板：**

```html
<% for (var prop in data.oneobject) { %> <%- "data.oneobject." + prop + " = " +
data.oneobject[prop] %> <% } %>
```

**结果：**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## 模板中可用的变量
###`rss.meta`
这包含有关 feed 的所有元信息。以下内容可用。我认为标识符是不言自明的。在帮助中，我将更详细地描述它们。或指定内容（一些是数组）只有在 Rss Feed 小部件 2 中，才有完整的元信息集

模板中的使用见**基于示例的模板**

-`meta.title`
-`meta.description`
- `meta.link`
-`meta.xmlurl`
-`meta.date`
-`meta.pubdate`
-`meta.author`
-`meta.language`
-`meta.image`
- `meta.favicon`
- `meta.copyright`
-`meta.generator`
-`meta.categories`

###`rss.articles or articles`
是一个包含单个元素的数组（javascript 数组）。每个元素都具有以下属性。
例如，为了适合，我将在其前面添加前缀 item。但是如果您愿意，您可以自己选择。只需在循环（forEach）中相应地命名即可。在这里，标识符也是不言自明的。并非所有属性都在每个 feed 中都填写。最重要的属性已包含在上面的模板中。

文章可在 RSS feed 小部件 2 中以 rss.articles 形式获取，也可在 RSS feed 多部件 3 中以 articles 形式获取

模板中的使用见**基于示例的模板**

- `项目.title`
-`项目.描述`
-`项目.摘要`
- `item.link`
- `item.origlink`
- `item.permalink`
- `项目.日期`
- `item.pubdate`
-`item.author`
-`item.guid`
- `item.comments`
- `项目.图像`
-`item.categories`
- `item.source`
-`item.enclosures`

## 基于示例的模板
### 基本模板 RSS-Feed 小部件 2
以下模板目前在 RSS feed 小部件 2 中用作标准。
已使用以下 feed 进行了测试

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

### 基本模板 RSS-Feed 多窗口小部件 3
以下模板目前在 RSS feed 多窗口小部件 3 中用作标准。
请注意变量使用中的细微差别 它已使用以下提要进行了测试

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
  #<%- widgetid %> img {
    width: calc(<%- style.width || "230px" %> - 15px);
    height: auto;
  }
  #<%- widgetid %> img.rssfeed {
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

### RSS-Feed 多窗口小部件 3 的示例模板，其中文章以幻灯片形式显示，并带有上一个/下一个按钮
```html
<!--
 available variables:
 widgetid      ->  id of the widget
 rss.articles  ->  all articles as array, details see Article Helper widget
 style         ->  all style settings for the widget

 all variables are read only
-->

<style>
  #<%- widgetid %> img {
    width: calc(<%- style.width || "230px" %> - 15px);
    height: auto;
  }
  #<%- widgetid %> img.rssfeed {
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
  slides = document.querySelectorAll(".slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
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

### 模板示例及详细说明
```html
<%= meta.title %> <% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

各行内容的简要说明 Z1：输出 feed 标题 Z2：无输出。Javascript 命令循环遍历所有文章，每次循环时将当前元素分配给变量 item。
Z3：输出日期和时间。它用 p / small 标签括起来用于格式化。vis-own 日期格式函数用于格式化。说明可在适配器 vis 中找到。
Z4：输出文章标题。Header 3 - 标签用于格式化。
Z5：输出文章内容。它用 p 标签括起来。这里，至少在两个示例中，包含 HTML 代码，通常带有图像和描述性文本 Z6：输出一个 div 标签，用于清除 feed-html 中的特殊格式（在 tagesschau 和 bild 的两个示例中都需要它。其他 feed 可能不需要它。
Z7：无输出。此行关闭了 javascript 循环。在 Z2 和 Z7 之间定义的所有内容都会针对每一篇文章重复。

待办事项
- 通过在管理对话框中保存来清理数据点 info.lastRequest 中未使用的条目。
- 管理对话框中的清理未使用的数据点按钮
- ~~多部件 RSS 源~~
- ~~多部件选框~~
- ~~Weitere Datenpunkte im Template verfügbar machen.~~
- ~~标题的Laufschrift小部件<https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2>~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
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

Copyright (c) 2021-2024 oweitman <oweitman@gmx.de>

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