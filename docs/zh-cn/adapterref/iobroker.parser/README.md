---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.parser/README.md
title: ioBroker 解析器适配器
hash: +XYwQT5Dyh/iO+GD5Kyw1Mv3LLzRKeJbJQ3SAlFwrrk=
---
![标识](../../../en/adapterref/iobroker.parser/admin/parser.png)

![安装数量](http://iobroker.live/badges/parser-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.parser.svg)
![下载](https://img.shields.io/npm/dm/iobroker.parser.svg)

# IoBroker 解析器适配器
![测试和发布](https://github.com/ioBroker/ioBroker.parser/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/parser/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

此适配器使用正则表达式解析通过 URL 或从文件接收的数据。对于在此适配器的设置中配置的每个规则，将在 `parser.<instance number>` 下创建一个状态，并使用解析的信息进行填充和更新。

## 设置
### 1. 默认轮询间隔
如果没有为配置表中的条目指定单独的轮询间隔值（列：“间隔”），则将使用此默认轮询间隔值。间隔以毫秒为单位，定义读取链接或文件的频率以及更新状态的频率。

**注意：** 不要使用过于激进的轮询间隔，尤其是对于网站 URL。例如，如果您想从某个网站检索您的股票价格，如果您不是日内交易者，您可能应该每隔 24 小时（= 86400000 毫秒）间隔一次。如果您过于频繁地尝试从某些 URL 检索数据，该网站可能会禁止您并将您列入服务器黑名单。所以请谨慎使用轮询间隔。

### 2. 请求超时
指定适配器在进行网站查询时等待 HTTP 响应的时间

### 3.请求之间的延迟
指定适配器在执行远程查询时在发出 HTTP 请求之间等待的时间。在从慢速主机或通过慢速连接检索数据以避免任何一个过载时很有用。零（默认）表示没有延迟。

此延迟基于每个主机。如果远程查询配置为从多个远程主机获取，每个主机将被并行查询。

延迟是发起每个请求之间的最小值。 IE。如果查询的读取时间超过此延迟参数，则下一个将立即开始读取完成。

### 4. 接受无效证书
指定在进行 HTTPS 请求时是接受还是拒绝自签名/无效 SSL/TLS 证书

### 5. 使用不安全的 HTTP 解析器
指定使用接受无效 HTTP 标头的不安全 HTTP 解析器。这可能允许与不符合标准的 HTTP 实现的互操作性。
应避免使用不安全的解析器。

### 6. 表
单击“加号”按钮将新条目添加到表中。

**性能说明：**如果在不同的表格行中多次输入相同的 URL 或文件名，并且如果“Interval”列的值相同，则只会检索 URL 或文件名的内容 **一次**并缓存以处理匹配 URL/文件名和间隔的多个表行。这允许您将多个正则表达式（即多个表行）应用于单个 URL 或文件名，而无需从源中多次检索数据。

**表格字段：**

- ***Name*** - 在 `parser.<instance number>` 下创建的状态名称。不允许有空格。您可以使用点“。”作为分隔符来创建子文件夹。示例：`Shares.Microsoft.Current` 将产生 `parser.<instance number>.Shares.Micosoft.Current`。
- ***URL 或文件名*** - 网站的 URL 或我们要检索其信息的文件的路径。示例`https://darksky.net/forecast/48.1371,11.5754/si24/de`（慕尼黑天气信息）或`/opt/iobroker/test/testdata.txt`（来自ioBroker的文件）。
- ***RegEx*** - 正则表达式，如何从链接中提取数据。有一个很好的服务来测试正则表达式：[regex101](https://regex101.com/)。例如。 *temp swip">(-?\d+)˚<* 对于上面的行。
- ***Item***（德语：“Num”）- 正则表达式可以找到（匹配）多个条目。使用此选项，您可以定义要选择的匹配项。 0 = 第一次匹配，1 = 第二次匹配，2 = 第三次匹配等。默认值为 0（第一次匹配）。
- ***角色*** - 角色之一：
    - 自定义 - 用户通过 *admin* 角色定义自己
    - 温度 - 值是温度
    - 值 - 值是一个数字（例如调光器）
    - 盲注 - 值是盲注位置
    - switch - 值是开关位置（真/假）
    - 按钮 - 值是一个按钮
    - 指标 - 布尔指标
- ***Type*** - 每个下拉菜单的变量类型。
- ***Unit*** - 可选：添加到状态条目的值的单位。例如。 `°C`、`€`、`GB`等。
- ***旧*** - 如果激活，如果在提供的日期（URL 或文件）中无法读取或找到该值，则状态将 *不* 更新，因此在这种情况下它将保留以前的值。
- ***Subs*** - 可选：替换 URL 或文件名。如果第一列的 URL/文件名不可用，则将使用此替代 URL/文件名。
- ***因子/偏移量***（仅适用于“类型”数字）-允许在设置为状态之前修改检索到的数据：
  - *计算值* = *提取值* * 因子 + 偏移量，立即修改值
- ***间隔*** - 以毫秒（毫秒）为单位的轮询间隔。如果为空或 0，将使用默认轮询间隔。请参阅上面的更多信息。

## 示例设置
|姓名 | URL 或文件名 |正则表达式 |角色 |类型 |单位 |间隔 |
|-------------------|:-----------------------------------------------------|:----------------------|--------------|---------|------|----------|
|温度慕尼黑 | `https://darksky.net/forecast/48.1371,11.5754/si24/de`| `temp swip">(-?\d+)˚<`|温度 |号码 | ℃ | 180000 |
|云跑 | `https://iobroker.net/`| `Privacy Notice`|指标 |布尔值 | | 60000 |
| cpu温度 | `/sys/devices/virtual/thermal/thermal_zone0/temp`| `(.*)`|温度 |号码 | ℃ | 30000 |
|股票价格.Visa | `https://www.finanzen.net/aktien/visa-aktie`| `\d{0,3},\d{2}(?=<span>EUR<\/span>)`|价值 |号码 |欧元 | 86400000 |
|股票价格.Visa | `https://www.finanzen.net/aktien/visa-aktie` | `\d{0,3},\d{2}(?= <span>EUR&lt;\/span&gt;)` |价值 |号码 |欧元 | 86400000 |</span> |

*注意：* 将正则表达式应用于检索的 URL/文件数据时，所有换行符将替换为空格以允许多行搜索。

## 关于正则表达式 (RegExp)
正则表达式是从字符串中解析和提取某些数据的强大工具，更重要的是：它允许通过应用规则从给定字符串（如网页的 HTML 或文件中的文本）中提取某些值/文本.

对于布尔类型，正则表达式相当简单。对于数字类型，您应该用括号标记数字 - “()”。例如。要从 *The temperature is 5°C* 中提取数字，您应该使用 " (\d+)" 表达式。

有关 RegExp 的更多信息：

  * [MDN/Mozilla 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  * [regex101：创建和测试正则表达式的在线工具](https://regex101.com/)

＃＃＃ 例子
- *.at* 匹配任何以“at”结尾的三个字符的字符串，包括“hat”、“cat”和“bat”。
- *[hc]at* 匹配“帽子”和“猫”。
- *[^b]at* 匹配所有由 .at 匹配的字符串，除了 "bat"。
- *[^hc]at* 匹配所有由 .at 匹配的字符串，除了 "hat" 和 "cat"。
- *^[hc]at* 匹配 "hat" 和 "cat"，但只匹配字符串或行的开头。
- *[hc]at$* 匹配 "hat" 和 "cat"，但仅在字符串或行的末尾。
- *\[.\]* 匹配由“[”和“]”包围的任何单个字符，因为括号被转义，例如：“[a]”和“[b]”。
- *s.\** 匹配 s 后跟零个或多个字符，例如：“s”、“saw”和“seed”。
- *[hc]+at* 匹配“hat”、“cat”、“hhat”、“chat”、“hcat”、“cchchat”等，但不匹配“at”。
- *[hc]?at* 匹配 "hat"、"cat" 和 "at"。
- *[hc]\*at* 匹配“hat”、“cat”、“hhat”、“chat”、“hcat”、“cchchat”、“at”等。
- *cat|dog* 匹配 "cat" 或 "dog"。
- *(\d+)* - 从字符串中获取数字
- *now (\w+)* later - 得到“now”和“later”之间的单词

### 其他有用的表达方式
- (-?\d+) 获取数字（负数和正数）
- [+-]?([0-9]+.?[0-9]|.[0-9]+) 得到一个带小数位的数字（和 . 作为小数分隔符）
- [+-]?([0-9]+,?[0-9]|,[0-9]+) 得到一个带小数位的数字（和，作为小数分隔符）

## 质量代码
值可以有质量代码：

- 0 - 好的
- 0x82 - 无法读取 URL 或文件。
- 0x44 - 文本中未找到数字或字符串值

＃＃ 支持
1. 一般：[ioBroker 论坛](https://forum.iobroker.net/)。德语用户：请参阅 [ioBroker 论坛主题 Parser-Adapter](https://forum.iobroker.net/topic/4494/adapter-parser-regex)。
2. 如有问题，请查看【ioBroker Parser Adapter: GitHub Issues】（https://github.com/ioBroker/ioBroker.parser/issues）。

<!--

### **正在进行中** -->

## Changelog
### 1.3.1 (2022-11-09)
* (raintonr) added delay option for slow connections
* (bluefox) added compact mode

### 1.2.1 (2022-09-15)
* (Apollon77) Always use raw response and not try to parse it

### 1.2.0 (2022-09-12)
* (Apollon77) Allow to specify if self-signed/invalid SSL certificates are ignored or not (default is to ignore as till now)
* (Apollon77) Allow to specify if an "insecure HTTP parser" is used which also enables HTTP implementations that are not compliant to specifications
* (Apollon77) Allow to specify the HTTP request timeout

### 1.1.8 (2022-06-27)
* (Apollon77) Check that a link is configured

### 1.1.7 (2022-06-16)
* (Apollon77) Fix potential crash cases reported by Sentry

### 1.1.6 (2022-05-28)
* (Apollon77) Set method to "GET" when requesting URLs

### 1.1.5 (2022-04-19)
* (Apollon77) Ignore objects without configuration for parser and log it

### 1.1.4 (2022-03-21)
* (Apollon77) Fix crash case reported by Sentry

### 1.1.3 (2022-03-20)
* (Apollon77) if regex did not match set defined replacement value (or null)

### 1.1.2 (2022-03-09)
* (Apollon77) Fix initialization of new parser objects

### 1.1.1 (2022-03-07)
* IMPORTANT: js-controller 2.0 is required at least now!
* (Apollon77) ignore self signed ssl certificates
* (Apollon77) make sure object changes do not block further updates of values
* (Apollon77) Add Sentry to get crash reports

### 1.0.7 (2018-10-08)
* (bluefox) Comma will be replaced automatically by point for the offset and for the factor

### 1.0.6 (2018-09-22)
* (bluefox) fix parser

### 1.0.5 (2018-08-30)
* (bluefox) Multi-line search allowed

### 1.0.2 (2018-08-06)
* (bluefox) Iterations in regex were corrected

### 1.0.1 (2017-12-10)
* (bluefox) Added additional option: old value

### 1.0.0 (2017-05-19)
* (bluefox) Allow set the number of found item

### 0.2.2 (2017-04-03)
* (Apollon77) fix handling of multiple fields for one URL

### 0.2.1 (2017-02-24)
* (bluefox) fix error with timestamp

### 0.2.0 (2017-02-01)
* (bluefox) Add visual test

### 0.1.1 (2017-01-30)
* (bluefox) move to common group

### 0.0.1 (2017-01-16)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2022 bluefox <dogafox@gmail.com>

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