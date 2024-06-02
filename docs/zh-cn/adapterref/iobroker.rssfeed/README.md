---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rssfeed/README.md
title: ioBroker 适配器用于请求和显示不同标准的 RSS 提要（Atom、RSS、RDF）
hash: 6oGOIu4JOzmhPK4CsPEWl+x4BltfWPs2lJbBrk4MT5M=
---
![标识](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed-logo.png)

![安装数量](http://iobroker.live/badges/rssfeed-installed.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.rssfeed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![特拉维斯](https://img.shields.io/travis/oweitman/ioBroker.rssfeed.svg)
![AppVeyor 构建状态](https://img.shields.io/appveyor/ci/oweitman/iobroker-rssfeed.svg)
![GitHub 问题](https://img.shields.io/github/issues/oweitman/ioBroker.rssfeed.svg)

# IoBroker 适配器用于请求和显示不同标准的 RSS 提要（Atom、RSS、RDF）
＃＃ 概述
适配器用于请求和显示不同标准（Atom、RSS、RDF）的 RSS 源。
您可以使用模板系统自定义源的输出。在模板中，您可以包含 HTML、CSS 和 Javascript。

重要提示：由于 iobroker 自动翻译成其他语言时存在错误，因此只有英文翻译有效

## 添加实例
安装后，适配器应显示在 iobroker 的适配器部分中。
有时，更改不可见，尤其是 Web 更改（小部件/配置对话框）时，可能必须在命令行上执行以下命令：

```bash
iobroker upload rssfeed
```

在适配器行的右侧区域中，可以使用加号按钮添加实例

＃＃ 配置
配置很简单。只有几个字段

| 设置 | 描述 |
| ------- | ----------- |
| 默认刷新（分钟）| 是多久一次再次调用 feed 的一般规范（以分钟为单位）。默认值为 60 分钟 |
| Max Artikel（标准）| 可以在此处限制要处理的数据总量。|

然后对于每个新的 feed：

| 设置 | 描述 |
| ------- | ----------- |
| 名称 | 数据点的名称。文件夹内的名称不得出现两次。|
| 类别 | 数据点应出现的子文件夹的名称。类别必须是唯一的 |
| Url | feed 的完整地址（使用 http:// 或 https://，见下文示例）|
| 刷新率（分钟）| 可以为此 feed 指定不同的值。否则将采用一般规范 |
| 最大文章数 | 可以为此 feed 指定不同的值。否则将采用一般规范 |

如果您保存并关闭配置，则可以在对象树中找到 feed-data 作为 JSON 数据点。
如果您删除条目，则数据点不会被删除。

## Vis 和小部件
以下小部件确实存在

* `RSS Feed widget 2` - 显示单个 feed
* `RSS Feed Multi widget` - 在一个小部件中显示几个聚合的提要。
* `RSS Feed Meta Helper` - 用于检查 feed 元数据的辅助小部件
* `RSS Feed Article Helper 2` - 一个用于检查 feed 文章数据的辅助小部件
* `RSS Feed Title marquee 3` - 一个用于将 feed 的标题显示为字幕的小部件
* `JSON 模板` - 一个与 RSS 提要无关的小部件，但使用相同的技术，您可以定义自定义模板以在 vis 中显示任何 JSON 数据。

vis-widgets 的文档可以在 vis 或[Widget 文档/德语](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.rssfeed/blob/master/widgets/rssfeed/doc.html) 中找到

## 基于示例的模板
我已使用以下 RSS 源测试过的示例：

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

模板系统与某些标签配合使用。
使用的标签含义如下

| 标签 | 描述 |
| ----- | --------------------------------------------------------------------- |
| <%= | 包含的表达式/变量的内容将被转义。|
| <%- | 所包含的表达式/变量的内容未转义。|
| <% | 无输出，用于封闭的 javascript 指令 |
| %> | 通常是一个结束标签，用于完成前面的一个标签 |

这些标签之外的所有内容都会按原样显示，或者将其解释为 HTML。（例如，参见模板中的 p 标签、div 标签、small 标签，您有 2 个预定义变量可用

###`meta`
这包含有关 feed 的所有元信息。以下内容可用。我认为标识符是不言自明的。在帮助中，我将更详细地描述它们。或指定内容（有些是数组）

* `meta.title`
*`meta.description`
* `meta.link`
*`meta.xmlurl`
*`meta.date`
* `meta.pubdate`
* `meta.author`
*`元语言`
* `meta.image`
* `meta.favicon`
* `meta.版权`
*`meta.generator`
*`meta.categories`

#### `articles`
是一个包含单个元素的数组（javascript 数组）。每个元素都具有以下属性。
例如，为了适合，我将在其前面添加前缀 item。但是如果您愿意，您可以自己选择。只需在循环（forEach）中相应地命名即可。在这里，标识符也是不言自明的。并非所有属性都在每个 feed 中都填写。最重要的属性已包含在上面的模板中。

* `项目.标题`
*`项目.描述`
*`项目.摘要`
* `item.link`
* `item.origlink`
* `item.permalink`
* `项目.日期`
* `项目.发布日期`
* `项目.作者`
* `item.guid`
*`项目.评论`
* `项目.图像`
* `项目.类别`
* `项目.源`
*`项目.外壳`

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

各行内容的简要说明 Z1：输出 feed 标题 Z2：无输出。Javascript 命令循环遍历所有文章，每次循环时将当前元素分配给变量 item。
Z3：输出日期和时间。它用 p / small 标签括起来用于格式化。vis-own 日期格式函数用于格式化。说明可在适配器 vis 中找到。
Z4：输出文章标题。Header 3 - 标签用于格式化。
Z5：输出文章内容。它用 p 标签括起来。这里，至少在两个示例中，包含 HTML 代码，通常带有图像和描述性文本 Z6：输出一个 div 标签，用于清除 feed-html 中的特殊格式（在 tagesschau 和 bild 的两个示例中都需要它。其他 feed 可能不需要它。
Z7：无输出。此行关闭了 javascript 循环。在 Z2 和 Z7 之间定义的所有内容都会针对每一篇文章重复。

＃＃ 去做
* 通过在管理对话框中保存来清理数据点 info.lastRequest 中未使用的条目。
* 管理对话框中未使用的数据点清理按钮
* ~~多部件 RSS 提要~~
* ~~多个小部件选取框~~
* ~~模板中的更多信息已通过测试。~~
* ~~带有标题的报纸小部件 <https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2>~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.8.2 (2024-04-21)
* (bluefox) Fixed loading of words.js in vis

### 2.8.1 (2023-03-15)
* (bluefox) Corrected vis widget
* admin changed to jsonConfig, dev-environment now devcontainer

### 2.7.0 (2022-12-11)

### 2.6.1 (2022-07-30)

* added more information to sentry

### 2.6.0 (2022-07-26)

* added sentry

### 2.4.0 (2022-07-25)

* added name option to marquee widget

### 2.0.0

* Rework of the admin dialog
* Fix some errors and glitches

### 1.0.0

* Released in stable

### 0.9.0

* fixed/extended json template

### 0.8.0

* adapted configuration pages to react.
* Prepared for stable release

### 0.0.30

* added some template examples to the widget documentation

### 0.0.29

* improved error messages
* removed deprecated widget / change widget beta flag
* changed createObject/setState logic due iobroker-controller >3.0

### 0.0.28

* removed customtab

### 0.0.27

* adapter configuration is now editable

### 0.0.26

* corrected changelog size

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

* test with encapsulation of ejs.js, because of error in some browsers

### 0.0.6

* add attribute duration for widget marquee to control animation duration

### 0.0.5

* new widget marquee for article titles
* add filter function for articles. the filter searches in title,description and categories, several filter criteria can be seperated by semicolon

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