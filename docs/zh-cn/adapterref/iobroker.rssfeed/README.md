---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rssfeed/README.md
title: ioBroker 适配器，用于请求和显示不同标准（Atom、RSS、RDF）的 RSS 提要
hash: CUJE1vXzY4Olp+i/hUXHsA24LdITdLKRME/fHR+ZYKQ=
---
![标识](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed-logo.png)

![安装数量](http://iobroker.live/badges/rssfeed-installed.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.rssfeed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![特拉维斯](https://img.shields.io/travis/oweitman/ioBroker.rssfeed.svg)
![AppVeyor 构建状态](https://img.shields.io/appveyor/ci/oweitman/iobroker-rssfeed.svg)
![GitHub 问题](https://img.shields.io/github/issues/oweitman/ioBroker.rssfeed.svg)

# IoBroker Adapter 请求和显示不同标准的 RSS Feeds (Atom, RSS, RDF)
＃＃ 概述
用于请求和显示不同标准（Atom、RSS、RDF）的 RSS 提要的适配器。
您可以使用模板系统自定义提要的输出。在模板中，您可以包含 HTML、CSS 和 Javascript。

重要提示：由于iobroker自动翻译成其他语言存在错误，因此只有英文翻译有效

## 添加实例
安装后，适配器应显示在 iobroker 的适配器部分。
有时会发生更改不可见，尤其是 Web 更改（小部件/配置对话框），可能必须在命令行上执行以下命令：

```bash
iobroker upload rssfeed
```

在适配器行的右侧区域，可以使用加号按钮添加实例

＃＃ 配置
配置很简单。只有几个字段

|设置 |描述 |
| ------- | ----------- |
|默认刷新（分钟）|是在几分钟内应多久再次调用一次提要的一般规范。默认为 60 分钟 |
| Max Artikel (标准) |此处可以限制要处理的数据总量。|

然后对于每个新提要：

|设置 |描述 |
| ------- | ----------- |
|姓名 |数据点的名称。在文件夹内，名称不得出现两次。 |
|类别 |应出现数据点的子文件夹的名称。类别必须是唯一的 |
|网址 |提要的完整地址（带有 http:// 或 https://，请参见下面的示例）|
|刷新（分钟） |可以为此 Feed 指定不同的值。否则采用通用规范 |
|最大文章 |可以为此 Feed 指定不同的值。否则采用通用规范 |

如果您保存并关闭了配置，则可以在对象树中找到作为 JSON 数据点的提要数据。
如果删除条目，则不会删除数据点。

## 可见和小部件
以下小部件实际上存在

* `RSS Feed 小部件 2` - 显示单个提要
* `RSS Feed Multi widget` - 在一个小部件中显示多个聚合的提要。
* `RSS Feed Meta Helper` - 检查提要元数据的助手小部件
* `RSS Feed Article Helper 2` - 一个帮助小部件，用于检查提要的文章数据
* `RSS 提要标题选框 3` - 一个小部件，用于将提要的标题显示为选框
* `JSON 模板` - 一个 wdiget，与 RSS 提要无关，但使用相同的技术，您可以定义自定义模板以在 vis 中显示任何 JSON 数据。

vis 小部件的文档可在 vis 或 [Widget-文档/德语](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.rssfeed/blob/master/widgets/rssfeed/doc.html) 中找到

## 基于示例的模板
我使用以下 RSS 提要测试的示例：

* <http://www.tagesschau.de/xml/rss2>
* <https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html>

```html
<%= meta.title %>
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

模板系统适用于某些标签。
使用的标签含义如下

|标签 |描述 |
| ----- | --------------------------------------------------------------------- |
| <%= |包含的表达式/变量的内容将被转义。 |
| <%- |包含的表达式/变量的内容未转义。 |
| <% |无输出，用于封闭的 javascript 指令 |
| %> |通常是一个结束标记来完成前面的一个 |

这些标签之外的所有内容都将完全按原样显示，或者如果将 HTML 解释为 HTML。 （参见例如 p-tag、div-tag、small-tag 在模板中，您有 2 个可用的预定义变量

### `meta`
这包含有关提要的所有元信息。以下内容可用。我认为标识符是不言自明的。在帮助中，我将更详细地描述它们。或指定内容（有些是数组）

* `meta.title`
* `元描述`
* `元链接`
* `meta.xmlurl`
* `元日期`
* `meta.pubdate`
* `meta.author`
* `元语言`
*`元图像`
* `meta.favicon`
* `meta.copyright`
* `meta.generator`
* `meta.categories`

#### `articles`
是具有单个元素的数组（javascript 数组）。每个元素都具有以下属性。
为了使它适合，例如，我将在它前面做前缀项目。但如果你愿意，你可以自己选择。它只需要在循环（forEach）中相应地命名。在这里，标识符也是不言自明的。并非所有属性都填写在每个提要中。最重要的已经包含在上面的模板中。

* `item.title`
* `item.description`
* `item.summary`
* `item.link`
* `item.origlink`
* `item.permalink`
* `item.date`
* `item.pubdate`
* `item.author`
* `item.guid`
* `item.comments`
* `item.image`
* `item.categories`
* `item.source`
* `item.enclosures`

## 模板示例及详细说明
```html
<%= meta.title %>
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

各行中发生的情况的简要说明 Z1：提要标题的输出 Z2：无输出。循环遍历所有文章的 Javascript 命令，每轮将当前元素分配给变量 item。
Z3：日期和时间的输出是。它附有一个用于格式化的 p / 小标签。 vis-own 日期格式函数用于格式化。描述可以在适配器vis中找到。
Z4：文章标题的输出。 Header 3 - 标签用于格式化。
Z5：文章内容的输出。它附有一个 p 标记。在这里，至少在两个示例中，都包含了 HTML 代码，它通常带有图像和描述性文本 Z6：输出一个 div 标记，用于清除 feed-html 中的特殊格式（在 tagesschau 和 bild 的两个示例中都需要它。其他饲料可能不需要它。
Z7：没有输出。此行关闭了 javascript 循环。在 Z2 和 Z7 之间定义的所有内容都会在每篇文章中重复。

＃＃ 去做
* 通过保存在管理对话框中清理数据点 info.lastRequest 中未使用的条目。
* 用于清理管理对话框中未使用数据点的按钮
* ~~多小部件 RSS 源~~
* ~~多部件选框~~
* ~~Weitere Datenpunkte im Template verfügbar machen.~~
* ~~Widget für Laufschrift mit den Titeln <https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2>~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 2.6.1 (2022-07-30)

* add more informations to sentry

### 2.6.0 (2022-07-26)

* add sentry

### 2.4.0 (2022-07-25)

* add name option to marquee widget

### 2.0.0

* Rework of the admin dialog
* Fix some errors and glitches

### 1.0.0

* Release in stable

### 0.9.0

* fix/extend json template

### 0.8.0

* adapt configuration pages to react.
* Prepare for stable release

### 0.0.30

* add some template examples to the widget documentation

### 0.0.29

* improve error messages
* remove deprecated widget / change widget beta flag
* change createObject/setState logic due iobroker-controller >3.0

### 0.0.28

* remove customtab

### 0.0.27

* adapter configuration is now editable

### 0.0.26

* correct changelog size

### 0.0.25

* the error messages for the template are improved

### 0.0.24

* errors in the request of feeds are now real errors in the iobroker log
* loading of rules for ejs in the editor is improved
* marquee3 widget: options to show time and date

### 0.0.23

* republish to npm

### 0.0.22

* improvements in the configuration dialog
* remove unused admintab
* new RSS Feed multi widget. in this widget you can add your one or more datapoints, that are available in the template.
* New marquee widget 3 replaces the existing marquee widget 2.The marquee widget 3 is now a multi widget and can handle more than one feed. The Headlines are now aggregated.
* the existing widget JSON template is improved. in this widget you can add your one or more datapoints, that are available in the template.
* Remove several deprecated widgets (RSS Feed widget 1, Article Helper 1, Marquee 1, JSON template 1)

### 0.0.21

* add link option to marquee widget
* widget help added
* marquee widget: the divider characters (default: +++) are configurable

### 0.0.20

* add ejs syntax to template editor

### 0.0.19

* try to fix marquee widget.

### 0.0.18

* try to fix the wrong NoSave dialog

### 0.0.17

* rework setting objects and states

### 0.0.16

* improve logic adding rssfeed in configuration dialog
* fix wrong icon for marquee widget
* define default template for rssfeed widget
* deprecate existing and replace with new version of widgets to improve naming of the attributes in case of translation
* widget rss marquee: replace duration attribute with speed attribute and improved the calculation algorithm. now same number is same speed regardless of the length of the titles

### 0.0.15

* fix bug saving last request in adapter configuration / improve debug messages

### 0.0.14

* update package.json and install new tools for stream encoding/decoding detection
* implement encoding detection and stream encoding
* change the ejs lib with a real browserified lib

### 0.0.13

* new widget as a guest, because it is not directly related to the rssfeed functionality, but reuse the same code base. maybe later i transfer it to an own adapter. the new widget can take a json datapoint and you can visualize the data with the ejs template system.

### 0.0.12

* now you can download the adapter configuration in the admin dialog. upload is not possible due to security restrictions in modern browsers.

### 0.0.11

* improve admin layout
* implement a forceRefresh button

### 0.0.10

* fix bug a bug in marquee widget. not all styles should applied to the span tag.

### 0.0.9

* apply widget styles also to the inner span element, because they had not any effect on the marquee.
* renew the package-lock.json
* add categories to save feeds in subfolders
* improve mechanism to write only updated feeds to datapoint. the feed has new data if comparision of articles in title and description is different.

### 0.0.8

* improve lasrequest logic of the adapter
* fix problem with datapoint naming

### 0.0.7

* test with encapsulation of ejs.js, becaus of error in some browsers

### 0.0.6

* add attribute duration for widget marquee to control animation duration

### 0.0.5

* new widget marquee for article titles
* add filter function for articles. the filter searchs in title,description and categories, seceral filter criteria can be seperated by semicolon

### 0.0.4

* some adjustments in readme, io-package

### 0.0.3

* add addveyor build

### 0.0.2

* added widgets meta helper and article helper

### 0.0.1

* initial release

## License

MIT License

Copyright (c) 2021 oweitman <oweitman@gmx.de>

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