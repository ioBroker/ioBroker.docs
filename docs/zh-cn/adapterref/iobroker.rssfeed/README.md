---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rssfeed/README.md
title: ioBroker 适配器，用于请求和显示不同标准的 RSS 提要（Atom、RSS、RDF）
hash: i+jcVs9I3OOvYfLijSmDY5U9Io4s5hOf4Cpp+4BOpMw=
---
![标识](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed-logo.png)

![安装数量](http://iobroker.live/badges/rssfeed-installed.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.rssfeed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![特拉维斯](https://img.shields.io/travis/oweitman/ioBroker.rssfeed.svg)
![AppVeyor 构建状态](https://img.shields.io/appveyor/ci/oweitman/iobroker-rssfeed.svg)
![GitHub 问题](https://img.shields.io/github/issues/oweitman/ioBroker.rssfeed.svg)

# IoBroker 适配器请求和显示不同标准的 RSS 提要（Atom、RSS、RDF）
＃＃ 概述
用于请求和显示不同标准（Atom、RSS、RDF）的 RSS 提要的适配器。
您可以使用模板系统自定义提要的输出。在模板中，您可以包含 HTML、CSS 和 Javascript。

重要提示：由于iobroker自动翻译成其他语言的错误，只有英文翻译是有效的

## 添加一个实例
安装后，适配器应显示在 iobroker 的适配器部分中。
有时会发生更改不可见的情况，尤其是 Web 更改（小部件/配置对话框），可能必须在命令行上执行以下命令：

```
iobroker upload rssfeed
```

在适配器行的右侧区域，可以使用加号按钮添加实例

＃＃ 配置
配置比较简单。只有几个字段

|设置 |说明 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
|刷新 |是在几分钟内再次调用提要的频率的一般规范。默认为 60 分钟 |
|数据点中的最大项目 |这里可以限制要处理的数据总量。 |

然后对于每个新提要：

|设置 |说明 |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
|姓名 |数据点的名称。在文件夹内，名称不得出现两次。 |
|分类 |应出现数据点的子文件夹的名称。类别必须是唯一的 |
|网址 |提要的完整地址（使用 http:// 或 https://，参见下面的示例）|
|刷新 |可以为此提要指定不同的值。否则采用通用规范 |
|编辑按钮 |选定的项目将被删除，值出现在添加部分 |
|删除按钮 |所选项目将被删除 |

如果您保存并关闭了配置，则可以在对象树中找到作为 JSON 数据点的提要数据。

## Vis 和小部件
以下小部件实际上存在

* RSS 提要小部件 - 显示单个提要
* RSS 提要多小部件 - 在一个小部件中显示多个聚合提要。
* RSS Feed meta Helper - 检查提要元数据的辅助小部件
* RSS 提要文章助手 - 检查提要文章数据的助手小部件
* RSS 提要选框 - 一个小部件，将提要的标题显示为选框
* JSON 模板 - 与 RSS 提要无关的 wdiget，但您可以定义自定义模板以在 vis 中显示任何 JSON 数据。

vis-widget 的文档在 vis 或 [小工具文档/德语](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.rssfeed/blob/master/widgets/rssfeed/doc.html) 中可用

## 基于示例的模板
我使用以下 RSS 提要测试的示例：

* http://www.tagesschau.de/xml/rss2
* https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html

```
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

|标签 |说明 |
| ----- | --------------------------------------------------------------------- |
| <%= |包含的表达式/变量的内容将被转义。 |
| <%- |包含的表达式/变量的内容是未转义的。 |
| <% |无输出，用于内嵌的javascript 指令|
| %> |通常是一个结束标签来完成前面的一个 |

这些标签之外的所有内容都完全按原样显示，或者是否将 HTML 解释为 HTML。 （参见例如 p-tag、div-tag、small-tag 在模板中，您有 2 个可用的预定义变量

####元
这包含有关提要的所有元信息。以下内容可用。我认为标识符是不言自明的。在帮助中，我将更详细地描述它们。或指定内容（有些是数组） meta.title meta.description meta.link meta.xmlurl meta.date meta.pubdate meta.author meta.language meta.image meta.favicon meta.copyright meta.generator meta.categories

####文章
是具有单个元素的数组（javascript 数组）。每个元素都具有以下属性。
例如，为了适合它，我将在它前面做前缀项。但如果你愿意，你可以自己选择。它只需要在循环中相应地命名（forEach）。在这里，标识符也是不言自明的。并非所有属性都填充在每个提要中。最重要的已经包含在上面的模板中。

item.title item.description item.summary item.link item.origlink item.permalink item.date item.pubdate item.author item.guid item.comments item.image item.categories item.source item.enclosures

##模板示例和详细说明
```
<%= meta.title %>
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

各行中发生的情况的简要说明 Z1：提要标题 Z2 的输出：无输出。 Javascript 命令循环遍历所有文章，每轮一次，当前元素被分配给变量 item。
Z3：日期和时间的输出是。它包含一个 p / small 标签，用于格式化。 vis-own 日期格式函数用于格式化。描述可以在适配器 vis 中找到。
Z4：文章标题的输出。 Header 3 - 标签用于格式化。
Z5：文章内容的输出。它包含一个 p 标签。在这里，至少在两个示例中，包含了 HTML 代码，该代码通常带有图像和描述性文本 Z6：输出一个 div 标签，用于清除 feed-html 中的特殊格式（在 tagesschau 和 bild 的两个示例中都需要它。其他饲料可能不需要它。
Z7：无输出。这一行关闭了 javascript 循环。 Z2 和 Z7 之间定义的所有内容都会为每篇文章重复。

＃＃ 去做
* 通过保存在管理对话框中清除数据点 info.lastRequest 中未使用的条目。
* 用于清理管理对话框中未使用的数据点的按钮
* ~~多小部件RSS提要~~
* ~~多小部件选框~~
* ~~Weitere Datenpunkte im Template verfügbar machen.~~
* ~~小工具为 Laufschrift mit den Titeln https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2~~

## Changelog

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