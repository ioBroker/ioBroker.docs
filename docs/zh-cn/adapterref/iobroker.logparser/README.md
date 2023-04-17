---
BADGE-GitHub license: https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.logparser
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.logparser.svg
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.logparser
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.logparser
BADGE-GitHub commits since latest release (by date): https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.logparser/latest
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.logparser
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.logparser
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.logparser.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/logparser-stable.svg
BADGE-Number of Installations: https://iobroker.live/badges/logparser-installed.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.logparser/README.md
title: 配置
hash: 5zs2X6FhpG3ahs4RzVTvqdP9xanfT3Sxx46uIvsWJ6Y=
---
## 用于解析（过滤）ioBroker 日志的日志解析器适配器
使用此适配器，可以相应地解析（即过滤）所有适配器的 ioBroker 日志。

＃ 配置
## 选项卡“解析器规则（过滤器）”
对于每个设置过滤器（规则），在 `logparser.[instance].filters` 下创建状态。

| **专栏** | **说明** |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|活跃|激活/停用过滤器 |
|名称 |任何名称（空格和特殊字符会自动删除），用作“过滤器”下的状态 |
|白名单：和 |所有这些表达式都必须存在。如果您输入通配符 `*` 或将其留空，则会跳过此规则。 |
|白名单：或 |这些表达式中至少有一个必须出现。如果您输入通配符“*”或将其留空，则会跳过此规则。 |
|黑名单|一旦出现这些表达式之一，日志就不会被接管，无论定义了其他什么过滤器。 |
|调试/信息/警告/错误 |应考虑哪些日志级别？ |
|清洁 |从日志行中删除不需要的字符串。 |
|合并 |这会合并具有相同内容的日志条目，并在它们前面加上一个计数器。<br>没有合并：<br> `2019-08-17 20:00:00 - Retrieve weather data.`<br> `2019-08-17 20:15:00 - Retrieve weather data.`<br> `2019-08-17 20:30:00 - Retrieve weather data.`<br>合并激活：<br> `2019-08-17 20:30:00 - [3 Entries] Retrieve weather data.` |
|日期格式 | `YYYY` = 4 位年份，`YY` = 2 位年份，`MM` = 月，`DD` = 日，`hh` = 小时，§§SSSSS_5§ § = 分钟，`ss` = 秒。 `#` 字符内的部分替换为“今天”或“昨天”。 |
|日期格式 | `YYYY` = 4 位年份，`YY` = 2 位年份，`MM` = 月，`DD` = 日，`hh` = 小时，`mm` = 分钟，`ss` = 秒。 `#` 字符内的部分替换为“今天”或“昨天”。 |

#### 字符串/正则表达式
在_Whitelist AND_、_Whitelist OR_、_Blacklist_ 和_Clean_ 列中，允许使用普通文本（字符串）和正则表达式。用逗号分隔多个表达式。请将正则表达式放在 `/` 和 `/` 之间，以便适配器识别它是否是正则表达式。 If String: 总是检查部分匹配。忽略/禁用：留空。

## 选项卡“更多设置”
- **删除 PID**：JS 控制器版本 2.0 或更高版本将括号中的 PID 添加到日志的前面，例如`（12234）终止：无故`。如果激活，包括括号的 PID，如 (1234)，将从日志行中删除。

- **将日期替换为“今天”/“昨天”**：在过滤器中，您可以使用井号 (#) 将今天或昨天的日期替换为日期格式列中的“今天”或“昨天”。在这些字段中，可以定义其他术语而不是“今天”/“昨天”。

- **“合并”文本** 如果激活合并，此文本将放置在每个日志行的前面。然后 # 字符将替换为具有相同内容的日志数。允许使用 `[](){}/\` 等特殊字符。示例（不带引号）：“`[# 条目] `”、“`(#) `”、“`# 条目：`”

## 选项卡“可视化”
- **VIS 中使用的 JSON 表数量**：

此选项添加其他状态以在 VIS 中实现更好的可视化。然后您将能够选择某些过滤器，这些过滤器随后会相应地显示在 JSON 表中（例如“Homematic”、“Warnings”、“Errors”等）。<br>指定您需要的不同 JSON 表的数量。这些状态正在“visualization.table0”、“visualization.table1”等下创建。输入 0 以停用。

- **JSON 表的列顺序**：您可以在此处更改列的顺序。作为附加列 ts（时间戳）总是被添加。在 VIS 等中，如有必要，只需将其隐藏。<br>如果您需要少于 4 列：只需选择您需要的第一列中的一个条目，然后使用 VIS JSON 表格小部件（或类似工具）隐藏其余部分。

- **排序**：如果激活：按降序排列日志条目，最新的在顶部。如果停用：按升序对日志条目进行排序，即最旧的在最上面。建议按降序排序，因此激活此选项。

## 选项卡“全局黑名单”
如果这些短语/术语之一包含在日志行中，则此适配器将忽略日志条目，无论解析器规则（过滤器）中设置了什么。允许使用字符串和正则表达式。如果是字符串：检查部分匹配，即如果您输入例如“echo”，那么每个包含“echo”的日志行都将被过滤掉，例如“命令发送到厨房回声”。
请将正则表达式放在 `/` 和 `/` 之间，以便适配器识别它是否是正则表达式。

在“评论”栏中，您可以根据需要评论/解释相应的条目，例如，以便您稍后了解为什么设置此黑名单条目。

## 选项卡“专家设置”
- **更新状态的间隔**：收集新的传入日志条目并定期将其写入数据点。由此可以定义间隔。注意：只有在发生变化时才会更新状态。但是，从性能的角度来看，在这里设置太短的间隔是没有意义的。不允许少于 2 秒。

- **最大日志条目数**：状态中保留的最大日志条目数（旧条目已删除）。请不要设置太大的数字，数字越大，适配器和 ioBroker 服务器的负载就越大。 100 已被证明是好的。

# 可视化（在 VIS 中显示日志）
这是 VIS 项目的示例，您可以将其导入 VIS：[vis-project-ex_logparser-adapter.zip](https://github.com/iobroker-community-adapters/ioBroker.logparser/raw/master/accessories/vis/vis-project-ex_logparser-adapter.zip)。
只需下载此 zip 文件。然后，在 VIS 中，导航到菜单 `Setup > Projekt-Export/Import > Import` 并相应地选择此 zip 文件。
请注意，您还需要 [材料设计小部件](https://github.com/Scrounger/ioBroker.vis-materialdesign) 才能使用此项目。

![主要.jpg](../../../en/adapterref/iobroker.logparser/img/visintro.gif)

# 更多功能
## 通过日志操作JSON列内容
此适配器提供了使用 JavaScript、Blockly 等的可能性，并影响将哪些内容放置在 JSON 表的日志列“日期”、“严重性”、“来自”、“消息”中。

**示例：**以下命令在 JavaScript 中执行：`log('[Alexa-Log-Script] ##{"message":"' + 'Command [Turn on music].' + '", "from":"' + 'Alexa Kitchen' + '"}##');`

`##{"message":"' + 'Command [Turn on music].' + '", "from":"' + 'Alexa Kitchen' + '"}##` 部分将被提取，日志消息将变为“命令 [打开音乐]”，源将是“Alexa Kitchen”（而不是 javascript.0）。

**语法：** 将以下内容添加到日志行：`##{"date":"", "severity":"", "from":"", "message":""}##` 可以删除单个参数，例如只是为了改变日志文本（消息），采取`##{"message": "text comes here."}##`

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.2 (2023-04-07)

-   (ciddi89) Fixed: Visualization tables was not working correctly
-   (ciddi89) Fixed: Issue if no dateformat was selected correctly

### 2.1.1 (2023-04-05)

-   (ciddi89) Fixed: [#25](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/25) Missing CSS class in date if it's older than today
-   (ciddi89) Changed: Moved Dateformat option from table to other settings
-   (ciddi89) Updated: Dependencies

### 2.1.0 (2023-03-05)

-   (ciddi89) Added: [#24](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/24) Option to remove 'COMPACT' in log entries
-   (ciddi89) Added: [#21](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/21) Option to remove only 'script.js' in log entries
-   (ciddi89) Fixed: [#46](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/46) Midnight function to change today/yesterday
-   (ciddi89) Fixed: [#23](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/23) When nothing selected in blacklist, adapter didn't work anymore
-   (ciddi89) Other: Small code and translation improvements

### 2.0.0 (2023-03-02)

-   (ciddi89) Dropped: Admin 5 support
-   (ciddi89) Changed: Admin html to jsonConfig [#36](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/36)
-   (ciddi89) Fixed: Issue with Midnight function
-   (ciddi89) Added: Translations of admin ui [#28](https://github.com/iobroker-community-adapters/ioBroker.logparser/issues/28)
-   (ciddi89) Updated: Readme

### 1.2.3 (2023-02-25)

-   (ciddi89) Fixed: Alexa-History script
-   (ciddi89) Fixed: adjusted links in admin/docs to new repo
-   (ciddi89) Rebuilded main.js

### 1.2.2 (2023-02-23)

-   (McM1957) sentry integration has been fixed

### 1.2.1 (2023-02-23)

-   (McM1957) Adapter has been moved to iobroker-community-adapters

### 1.1.0

-   (Mic-M) Fixed issue [#15](https://github.com/Mic-M/ioBroker.logparser/issues/15) regarding regex for tab "Parser Rules", column "Blacklist"
-   (Mic-M) Enhancement [#16](https://github.com/Mic-M/ioBroker.logparser/issues/16) - add specific CSS classes to any element of the JSON log per adapter option.
-   (Mic-M) Major improvement: Implemented entire documentation into adapter itself to significantly improve usability.
-   (Mic-M) A few improvements under the hood.

### 1.0.4

-   (Mic-M) Fixed 'Today/Yesterday' updating issue - https://forum.iobroker.net/post/469757. Thanks to (Kuddel) for reporting and (Glasfaser) for further debugging.

### 1.0.3

-   (Mic-M) Added [Sentry](https://github.com/ioBroker/plugin-sentry)

### 1.0.2

-   (Mic-M) Added debug logging for callAtMidnight() and updateTodayYesterday()

### 1.0.1

-   (Mic-M) Updated lodash dependency from 4.17.15 to 4.17.19

### 1.0.0

-   (Mic-M) No changes - just prepare versioning to add adapter to stable repository per [Adapter dev docu](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning)

## License

MIT License

Copyright (c) 2020 - 2023 Mic-M, McM1957 <mcm57@gmx.at>, ciddi89 <mail@christian-behrends.de>, ioBroker Community Developers

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