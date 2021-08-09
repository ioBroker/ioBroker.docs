---
title: 降价
lastChanged: 23.04.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/community/docmarkdown.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: 9qginu+6BT6Cm5JzwTYlJJ+LmFCjpyS0LVuttJtXxqc=
---
# Markdown: 语法
?> 为了使ioBroker 的文档快速且易于阅读，我们选择了Markdown 作为简化的标记语言。以下指南将帮助您学习 Markdown 的语法和功能，并将它们翻译成优秀的文档。

从技术上讲，文档系统仅支持以下功能：

- 标题
- 表
- 内联 HTML
- 列表
- 剩下
- 图片
- 粗体
- 斜体文字

＃＃ 概述
＃＃＃ 哲学
Markdown 的设计考虑了基本思想，即尽可能易于阅读和编写。

可读性是这里的重中之重。 Markdown 格式的文档应该能够以其基本形式发布而不会出现标记或格式（就像 HTML 的情况）。

因此，Markdown 的语法仅由精心选择以匹配其含义的字符组成。例如，单词周围的星号实际上看起来像\ *重音\* Markdown 中的列表看起来像列表。甚至引用块看起来也像引用的文本段落，正如您从电子邮件中知道的那样。

### 内联 HTML
Markdown 的语法有一个目的：用于*为网络编写*。

Markdown 不能替代 HTML，甚至不能替代。语法的范围非常小，只对应于所有 HTML 标签的一小部分。 Markdown 并不打算让 HTML 标记更容易。 HTML 已经足够简单了。 Markdown 背后的想法是使文本尽可能易于阅读、编写和编辑。 HTML是*发布格式*； Markdown 是一种*书写格式*。因此，其语法仅考虑可以使用纯文本传达的内容。

任何 Markdown 不可行的格式都可以简单地使用 HTML。无需标记 HTML 以将其与其他部分分开。
它只是写在文本中。

唯一的限制是块元素，例如 `<div>`、`<table>`、`<pre>`、`<p>` 等。它们必须通过空行与周围的内容分开，并且开始和结束标签不应使用空格或制表符缩进。 Markdown 足够智能，不会在 HTML 块周围设置任何额外的（不需要的）`<p>` 标签。

例如，要在 Markdown 文章中包含一个 HTML 表格：

    这是一个正常的段落。

<table><tr><td>富</td></tr></table>

    这仍然是一个正常的段落。

应该注意的是，Markdown 的语法不会在 HTML 块中进行解释。例如，*强调 * 不能在 HTML 块中使用。

内嵌 HTML 标签，例如 `<span>`、`<cite>` 或 `<del>` 可用于 Markdown 段落、列表项或标题中的任何位置。
HTML 标签甚至可以用来代替适当的 Markdown 格式。简单地使用 `<a>` 或 `<img>` 代替 Markdow 的链接或图形语法是没有问题的。

与块标记相反，Markdown 语法是在内联标记中解释的。

###特殊字符的自动屏蔽
HTML 中有两个字符需要特殊处理：`<` 和 `&`。
左尖括号用于打开 HTML 标签，与号用于描述命名字符（实体）。如果这些字符要在 HTML 文档中用作“它们自己”，则它们必须作为实体进行屏蔽，即作为 `&lt;` 和 `&amp;`。

＆符号对于 Web 开发人员来说尤其不切实际。如果你想写“AT&T”，你必须写“`AT&amp;T`”。甚至必须在 URL 中屏蔽与号。在页面链接中

`http://images.google.com/images?num=30&q=larry+bird`

URL 必须编码如下：

`http://images.google.com/images?num=30&amp;q=larry+bird`

这很容易忘记，并且可能是验证其他格式良好的 HTML 文档时最常见的错误。

Markdown 允许这些字符正常使用。它规定了编码本身，如果实体中使用了＆符号，则不进行编码，否则转换为`&amp;`。

因此，如果您想输入版权符号，例如，您可以简单地

`&copy;`

写，Markdown 不会修改它。但是关

`AT&T`

变成降价

`AT&amp;T`

做。由于 Markdown 支持内联 HTML，因此在适当的情况下将尖括号视为 HTML。只是从诸如

`4 < 5`

变成降价

`4 &lt; 5`

做。但是，尖括号和与号 *总是* 编码在代码或跨度块中。这简化了在 Markdown 中编写 HTML（与原始 HTML 不同，原始 HTML 对每个 `<` 和 `&` 进行编码几乎是一场噩梦）。

##块元素
### 段落和换行符
段落只是由一个或多个空行分隔的一行或多行文本。 （空行是 *看起来* 像空行的任何行 - 仅包含空格和制表符的行被视为空白。）正常段落不应使用空格或制表符缩进。

“一行或多行”规则意味着一件事：Markdown 支持“硬中断”段落。这与大多数其他文本到 HTML 格式器（包括 Movable Type 的“转换换行符”选项）非常不同，后者将段落中的每个换行符格式化为 `<br />`。

如果您 *希望* 有一个 `<br />` 作为中断，您可以简单地以两个或多个空格结束该行。

这是生成 `<br />` 的一些额外工作，但简单的“每个换行符都是 `<br />`”规则在 Markdown 中不起作用。

Markdown 的类似电子邮件的多段 [引用] (#quotes) 和 [列表条目](#listen) 效果最好 - 并且看起来更好 - 当格式化为换行符时。

[bq]: #blockquote

[l]:  #list

### 标题
这里的 Markdown 只支持一种类型的标题格式：atx。
类似 Atx 的标题在行首使用 1-6 个哈希符号，对应于 1-6 级。例如：

`# Dies ist ein H1`

`## Dies ist ein H2`

`###### Dies ist ein H6`

＃＃＃ 引号
Markdown 使用 - 就像电子邮件一样 - 字符 `>` 用于引号块。如果您有使用电子邮件引用的经验，您也会知道如何在 Markdown 中创建引用。如果您将文本每行换行并在每行前面放置一个 `>` ，则效果最佳：

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,``> consectetuer adipiscing elit. Aliquam hendrerit mi posuere``> lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet``> vitae, risus.``>``> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.``> Suspendisse id sem consectetuer libero luctus adipiscing.`

Markdown 还允许你偷懒，只在硬断的段落的第一行使用 `>`：

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.` `Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae,` `risus.`

`> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `Suspendisse id sem consectetuer libero luctus adipiscing.`

通过使用更多 `>` 可以嵌套引用（即引用中的引用）：

`    > Dies ist die erste Zitat-Ebene.``    >``    > > Dies ist ein verschachteltes Zitat.``    >``    > Zurück auf der ersten Ebene.`

引号可以包含其他 Markdown 元素，包括标题、列表和代码块：

> ## 这是一个标题。
>> 1. 这是列表中的第一项。
> 2. 这是列表中的第二项。
>> 下面是一些示例代码：>> return shell_exec ("echo $ input | $ Markdown_script");

任何合理的文本编辑器都应该使电子邮件式引用变得容易。例如，在 BBEdit 中，您可以进行选择并从菜单 `Text` 中选择 `Increase Quote Level`。

### 列表
Markdown 支持排序（编号）和未排序列表（项目符号列表）。

未排序列表使用星号、加号和连字符 - 可互换 - 作为列表标记：

    * 红色的
    * 绿色的
    * 蓝色的

等于：

+ 红色 + 绿色 + 蓝色

和：

    - 红色的
    - 绿色
    - 蓝色的

排序列表使用数字后跟一个句点：

    第一只狗
    第二只猫
    3. 鼠标

重要的是要了解数字本身对 Markdown 的输出没有影响。 Markdown 从最后一个列表创建以下 HTML：

<ol><li>狗</li><li>猫</li><li>鼠</li></ol>

如果你改为这样写列表：

    第一只狗
    第一只猫
    1. 鼠标

甚至：

    第三只狗
    第一只猫
    8. 鼠标

每次都会出现相同的列表。如果需要，您可以手动正确编号列表。但如果你想偷懒，你总是可以使用相同的数字。

但是，即使这样，您也应该以数字 1 开始列表。将来，Markdown 可能希望为列表中的第一个条目设置一个起始编号。

列表条目通常从文档的左边缘开始，但它们最多可以向右缩进三个空格。
必须使用一个或多个空格或制表符将列表标记与以下文本分开。

为了很好地格式化列表，可以缩进各个条目，如下所示：

    * Lorem ipsum dolor 坐 amet，consectetuer adipiscing 精英。

Aliquam hendrerit mi posuere lectus。 Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus。

    * Donec 坐在 amet nisl。 Aliquam semper ipsum 坐 amet velit。

        Suspendisse id sem consectetuer libero luctus adipiscing。

以下示例生成相同的代码，但不太整洁：

    * Lorem ipsum dolor 坐 amet，consectetuer adipiscing 精英。

Aliquam hendrerit mi posuere lectus。 Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus。

    * Donec 坐在 amet nisl。 Aliquam semper ipsum 坐 amet velit。

    Suspendisse id sem consectetuer libero luctus adipiscing。

如果列表条目由空行分隔，Markdown 将用 `<p>` 和 `</p>` 包裹列表条目。

例如，这将是：

    * 沃斯坦纳
    * 国王

至

<ul><li>瓦尔施泰纳</li><li>国王</li></ul>

但是这个：

    * 沃斯坦纳

    * 国王

变成

<ul><li><p>瓦尔施泰纳</p></li><li><p>国王</p></li></ul>

列表项可以由多个段落组成。列表项中的每个以下段落必须缩进至少 4 个空格或一个制表符：

    1. 这是一个包含两个段落的列表项。 Lorem ipsum dolor

坐下来，consectetuer adipiscing 精英。 Aliquam hendrerit mi posuere lectus。

Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus。 Donec 坐在 amet nisl。 Aliquam semper ipsum 坐 amet velit。

    2. Suspendisse id sem consectetuer libero luctus adipiscing。

下一段的每一行都缩进看起来很好，但同样，Markdown 允许懒人只缩进第一行：

    * 这是一个包含两段的列表项

这是此列表项中的第二段。只有第一行需要缩进。 Lorem ipsum dolor 坐 amet，consectetuer adipiscing 精英。

    * 同一列表中的另一个项目。

要在列表项中使用引用，引用必须缩进：

    * 带引号的列表项：

> 这是引用 > 在列表中。

要在列表项中使用代码块，它必须缩进 *两次* - 8 个空格或两个制表符：

    * 带有代码示例的列表项：

            <在此处插入代码>

可能会意外创建列表，例如
以下写道：

    1986. 多么美好的一年。

换句话说：行首的序列 *number-period-space* 为了避免这个问题，这个点可以用反斜杠屏蔽：

    1986 \.多么美妙的一年。

<h3 id="precode">代码块</h3>

预格式化的代码块用于覆盖程序或标记源代码。代码块中的行被解释为找到，而不是形成正常的段落。 Markdown 包含带有标签 `<pre>` 和 `<code>` 的代码块。

要在 Markdown 中创建代码块，只需将代码块的每一行缩进至少 4 个空格或一个制表符。从以下输入...

    这是一个正常的段落。

        这是一个代码块。

... Markdown 执行以下操作：

<p>这是一个正常的段落。</p>

<pre><code>Dies ist ein Code-Block.
</code></pre>

从每一行缩进中删除一级缩进 - 4 个空格或 1 个制表符。例如 ...

    AppleScript 中的一个例子：

告诉应用程序“Foo”哔结束告诉

……变成

<p>AppleScript 中的一个例子：</p>

<pre><code>tell application "Foo" beep end tell </code></pre>

代码块在未缩进的第一行（或文档末尾）结束。

在代码块中，与号 (`&`) 和尖括号 (`<` 和 `>`) 会自动转换为 HTML 实体。这使得 HTML 片段的集成更容易 - 只需将 HTML 复制到文档中，缩进它，Markdown 就会对与号和尖括号进行编码。例如：

<div class="footer">© 2004 Foo Corporation</div>

变成：

<pre><code>&lt;div class="footer"&gt; &amp;copy; 2004 Foo Corporation &lt;/div&gt; </code></pre>

正常的 Markdown 语法不在代码块中处理。 IE。
星号只是代码块中的星号，并不是突出显示文本的信号。结果是在 Markdown 中很容易谈论 *关于* Markdown。

<a id="hr"></a>

### 水平线 水平线的标记 (`<hr />`) 可以通过在一行上单独写入 3 个或更多连字符或星号来生成。字符之间也允许有空格。以下所有示例都会生成一条水平线：
    * * *

    ***

    *****

    - - -

    ---------------------------------------

* * *

<div id="span"></div>

## 跨度元素
<a id="link"></a>

＃＃＃ 剩下
Markdown 支持两种类型的链接：* 内联 * 和 * 引用 *。

在这两种样式中，链接文本都用 [方括号] 标记。

要创建内联链接，请直接在右方括号之后编写普通括号。要链接到的 URL 写在这些括号中，并在引号中带有 *可选的* 链接标题。例子：

这是内联链接的 [一个例子](http://example.com/ "Der Linktitel")。

    [这个链接](http://example.net/) 没有标题属性。

这变成：

<p>这是内联链接<a href="http://example.com/" title="标题">的示例。</a></p>

<p><a href="http://example.net/">此链接</a>没有标题属性。</p>

如果要引用同一服务器上的内容，可以使用相对路径：

    在页面 [关于我](/about/) 上有更多信息。

参考链接使用第二组方括号，其中写入链接的任何标识符：

    这是参考链接的[示例] [id]。

如果您愿意，还可以在括号之间插入一个空格：

    这是参考链接的[示例] [id]。

然后，在文档中的某处，链接在其自己的行上定义如下：

[id]: http://example.com/  "Optionalen Titel hier eintragen"

所以：

* 包含链接标识符的方括号（可选带有

    最多缩进三个空格）；

* 后跟一个冒号；
* 后跟一个或多个空格（或制表符）；
* 后跟链接的 URL；
* 可选后跟链接标题属性的文本，

    括在方括号、单引号或双引号中。

以下三个定义是相同的：

[foo]: http://example.com/  "Optionaler Titel"

[foo]: http://example.com/  'Optionaler Titel'

[foo]: http://example.com/  (Optionaler Titel)

** 注意：** Markdown 1.0.1 中存在一个已知错误，该错误阻碍了单引号作为链接标题分隔符的功能。

链接 URL 可以选择打包在尖括号中：

[id]: <http://example.com/>  "Optionaler Titel hier"

title 属性也可以放在下一行并用更多空格或制表符缩进。这对于长网址看起来更好：

[id]: http://example.com/langer/pfad/zu/seite

        “此处为可选标题”

链接定义仅用于在 Markdown 处理文档时创建链接，并在输出 HTML 之前从文档中删除。

链接定义的标识符可以由字母、数字、空格和标点符号组成。它们*独立*大写和小写：

[链接文本] [a] [链接文本] [A]

这两个链接定义是等效的。

* 隐含链接标识符 * 允许省略链接标识符。在这种情况下，链接文本用作标识符。一组空的方括号只是简单地附加到链接文本：

[谷歌] []

然后定义链接：

[Google]: http://google.com/

由于链接标识符可以包含空格，这个缩写甚至适用于链接文本中的几个词：

访问 [大胆的火球] [] 了解更多信息。

然后定义链接：

[Daring Fireball]: http://daringfireball.net/

链接定义可以在 Markdown 文档中的任何位置进行。通常，最好在使用它们的段落之后执行它们。但是，就像脚注一样，它们都可以一起列在文档末尾。

一个小例子：

我从 [Google] [1] 获得的流量是 [Yahoo] [2] 或 [MSN] [3] 的十倍。

[1]: http://google.com/        "Google"

[2]: http://search.yahoo.com/  "Yahoo Search"

[3]: http://search.msn.com/    "MSN Search"

使用隐含链接标识符上方的缩写，您还可以编写以下内容：

我从 [Google] [] 获得的流量是从 [Yahoo] [] 或 [MSN] [] 获得的流量的十倍。

[google]: http://google.com/       "Google"

[yahoo]: http://search.yahoo.com/  "Yahoo Search"

[msn]: http://search.msn.com/      "MSN Search"

这两个示例都将生成以下 HTML 代码：

<p><a href="http://google.com/" title="谷歌">我从 Google</a>获得的流量是来自<a href="http://search.yahoo.com/" title="雅虎搜索">Yahoo</a>或<a href="http://search.msn.com/" title="MSN 搜索">MSN 的</a>十倍。</p>

为了进行比较，使用 Markdown 的内联链接遵循相同的段落：

我从 [谷歌](http://google.com/ "Google") 获得的流量是来自 [雅虎](http://search.yahoo.com/ "Yahoo Search") 或 [MSN](http://search.msn.com/ "MSN Search") 的流量的十倍。

参考链接背后的想法并不是它们更容易编写。这个想法是它们使文档更具可读性。示例段落的参考链接长度仅为 80 个字符，参考链接的长度为 181 个字符； 239 个字符作为 HTML，标记多于内容。

使用 Markdown 的参考链接，源文档看起来更像是浏览器中显示的最终输出格式。由于能够从段落中提取标记元数据，链接可以集成到文本中，而不会减慢文本的流动速度。

<a id="em"></a>

### 强调 Markdown 将星号 (`*`) 和下划线 (`_`) 视为强调的指标。文字装入个人`*`或`_`内附HTML标签`<em>`，双`*`或`_`都标有标签`<strong>`。下面的文字，例如：
    *单星号*

    _单下划线_

  **双星号**

    __双下划线__

将输出以下内容：

<em>单星号</em>

<em>单下划线</em>

<strong>双星号</strong>

<strong>双下划线</strong>

样式可以任意选择。唯一的限制是必须使用相同的符号来打开和关闭应力区域。

Stress 可以用在单词中间：

    主*神*圣礼

但是，如果 `*` 或 `_` 被空格包围，则将其视为简单的星号或下划线。

要在被理解为强调的地方写星号或下划线，可以用反斜杠掩盖它：

  \ *此文本被星号包围。\*

<a id="code"></a>

### 代码 为了标记一个代码区域，它用反引号字符括起来（`` ` ` ''）。与代码块相反，代码区在普通段落中格式化代码：
    使用函数 `printf()` 输出文本。

变成：

<p>使用函数<code>printf()</code>输出文本。</p>

如果要在代码区显示反引号，可以在代码区前后使用几个反引号：

    `` `Irgendwo hier (`) 隐藏反引号。''

这变成：

<p><code>irgendwo hier (`) ist ein Backtick versteckt.</code></p>

代码区域周围的反引号分隔符可以包含空格 - 一个在开始反引号之后，一个在结束反引号之前。这使得可以在代码区域内使用反引号，即使在开头或结尾：

代码区域中的单个反引号：`` ` ` ''

代码区域中的反引号包围的字符串：`` `foo` ``

变成：

<p>代码区域中的单个反引号： <code>`</code></p>

<p>代码区域中的反引号包围的字符串： <code>`foo`</code></p>

在代码区域中，与号和尖括号被编码为 HTML 实体。

    没有人使用 `<blink>` 标签。

这变成：

<p>没有人使用<code>&lt;blink&gt;</code>标签。</p>

以下也有效：

    `&#8212;` 是 `&mdash;` 的十进制编码等效项。

这将

<p><code>&amp;#8212;</code>是十进制编码的<code>&amp;mdash;</code> .</p>

<a id="img"></a>

### 图形 诚然，很难找到将图形包含在文本中的“自然”语法。
Markdown 使用设计为类似于链接样式的语法来做到这一点。这允许两种类型：内联和引用。

内联语法如下所示：

    ![替代文字](../../de/community/pfad/zum/bild.jpg)

    ![替代文字](../../de/community/pfad/zum/bild.jpg "可选标题")

所以：

* 感叹号：`!`;
* 后跟一组表示值的方括号

    包含图形的 `alt` 属性；

* 后跟圆括号表示 URL 或图形的路径

以及可选的 `title` 属性的值，用引号括起来。

参考样式的图像参考如下所示：

    ! [替代文字] [id]

“id”是定义的图片参考的名称。图像引用的定义与链接引用的语法相同：

[id]: url/zur/grafik  "Optionales title-Attribut"

目前，Markdown 没有用于指定图形大小的语法。如果有必要，可以使用普通的 HTML 标签 `<img>`。

* * *

<div id="misc"></div>

＃＃ 各种各样的
<a id="backslash"></a>

###反斜杠屏蔽
Markdown 允许使用反斜杠屏蔽来编写在 Markdown 语法中具有特定含义的字符。
例如，如果你想用星号包围一个单词（而不是 HTML 标签 `<em>`），你可以在星号前加上反斜杠：

  \ *被星号包围 \*

Markdown 为以下字符提供此选项：

\ 反斜杠`反引号

    * 星号

_下划线{}大括号[]方括号()圆括号

# 哈希 + 加号
    - 减号（连字符）

.观点 ！感叹号

* * *

<a id="lizenz"></a>

＃＃＃ 执照
本作品根据 [知识共享署名 - 相同方式共享 (BY-SA) 4.0 国际许可] [by-sa] 获得许可。

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

?> 这是 [John Grubers] [jg] [Markdown] [md] 对 [原始语法文档] [osd] 的翻译。本翻译参考2013年12月15日的状态（Markdown Version 1.0.1）。不保证翻译的正确性。如果翻译有错误，请发短信至<lasar@liepins.net>。
也欢迎任何其他类型的反馈。*

[jg]: http://daringfireball.net/

[md]: http://daringfireball.net/projects/markdown/

[osd]: http://daringfireball.net/projects/markdown/syntax