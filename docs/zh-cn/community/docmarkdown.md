---
title: 降价
lastChanged: 23.04.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/community/docmarkdown.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: 9qginu+6BT6Cm5JzwTYlJJ+LmFCjpyS0LVuttJtXxqc=
---
# Markdown：语法
?> 为了确保ioBroker的文档能够快速创建并且易于阅读，选择Markdown作为简化的标记语言。以下说明将帮助您了解 Markdown 的语法和可能性，并将其转换为出色的文档。

从技术上讲，文档系统仅支持以下功能：

- 标题
-桌子
- 内联 HTML
- 列表
- 左边
-图片
- 粗体文字
- 斜体文本

＃＃ 概述
＃＃＃ 哲学
Markdown 的设计理念是尽可能易于阅读和编写。

可读性是这里的主要目标。 Markdown 格式的文档应该能够以其基本形式发布，而不会出现被标记或格式化的情况（就像 HTML 的情况一样）。

因此，Markdown 的语法仅由精心选择的字符组成，以便它们的外观与其含义相对应。例如，单词周围的星号实际上看起来像\*emphasis\*。 Markdown 中的列表看起来像列表。甚至引用块看起来也像您在电子邮件中看到的引用的文本段落。

### 内联 HTML
Markdown 的语法只有一个目的：用于为网络“编写”。

Markdown 并不是 HTML 的替代品，甚至还远远不够。该语法的范围很小，仅对应于所有 HTML 标签的一小部分。 Markdown 的目的并不是让插入 HTML 标签变得更容易。 HTML 已经足够简单了。 Markdown 背后的想法是让阅读、书写和编辑文本尽可能简单。 HTML 是一种*发布格式*； Markdown 是一种*书写格式*。因此，其语法仅考虑可以使用纯文本传达的内容。

对于无法使用 Markdown 完成的任何格式，您可以简单地使用 HTML。无需突出显示 HTML 来将其与其余部分分开。
它只是简单地写入文本中。

唯一的限制是块元素，例如`<div>`、`<table>`、`<pre>`、`<p>` 等。它们必须用空行与周围的内容分开，并且开始和结束标记不应使用空格或制表符缩进。 Markdown 足够智能，不会在 HTML 块周围放置额外的（不需要的）`<p>` 标签。

例如，您可以将 HTML 表格合并到 Markdown 文章中：

    这是一个正常的段落。

<table><tr><td>富</td></tr></table>

    这仍然是一个正常的段落。

应该注意的是，Markdown 的语法不会在 HTML 块中解释。例如，*emphasis* 不能在 HTML 块中使用。

内联 HTML 标签（例如 `<span>`、`<cite>` 或 `<del>`）可以用在 Markdown 段落、项目符号点或标题中的任何位置。
甚至可以使用 HTML 标签来代替相应的 Markdown 格式。简单地使用 `<a>` 或 `<img>` 代替 Markdow 的链接或图形语法是没有问题的。

与块标签不同，Markdown 语法*在内联标签中进行解释。

### 自动屏蔽特殊字符
在 HTML 中，有两个字符需要特殊处理：`<` 和 `&`。
左尖括号用于打开 HTML 标签，& 符号用于描述命名字符（实体）。如果这些字符要在 HTML 文档中用作“自身”，则必须将它们作为实体转义，即 `&lt;` 和 `&amp;`。

对于 Web 开发人员来说，& 符号尤其不方便。如果您想写“AT&T”，则必须写“`AT&amp;T`”。即使在 URL 中，也必须对 & 符号进行转义。在页面链接中

`http://images.google.com/images?num=30&q=larry+bird`

URL 必须按如下方式编码：

`http://images.google.com/images?num=30&amp;q=larry+bird`

这很容易被忘记，并且可能是验证格式良好的 HTML 文档时最常见的错误。

Markdown 可以让这些字符正常使用。它规定编码本身。如果在实体中使用 & 符号，则不会对其进行编码，否则将转换为`&amp;`。

例如，如果您想输入版权符号，您可以

`&copy;`

写，Markdown 不会修改它。但出来

`AT&T`

变成 Markdown

`AT&amp;T`

制作。由于 Markdown 支持内联 HTML，因此在这种情况下尖括号被视为 HTML。只是从类似的事情

`4 < 5`

变成 Markdown

`4 &lt; 5`

制作。但是，在代码或跨度块中，尖括号和“&”符号“始终”被编码。这使得在 Markdown 中编写 HTML 变得更加容易（与原始 HTML 不同，在原始 HTML 中，对每个 `<` 和 `&` 进行编码几乎是一场噩梦）。

## 块元素
### 段落和换行符
段落仅由一行或多行文本组成，并由一个或多个空行分隔。 （空行是任何“看起来”像空行的行——除了空格和制表符之外不包含任何内容的行被视为空白。）常规段落不应使用空格或制表符缩进。

“一行或多行”规则意味着一件事：Markdown 支持带有“硬中断”的段落。这与大多数其他文本到 HTML 格式化程序（包括 Movable Type 的“转换换行符”选项）有很大区别，后者将段落中的每个换行符格式化为`<br />`。

如果您*想要*有一个 `<br />` 作为中断，您可以简单地以两个或更多空格结束该行。

虽然创建 `<br />` 的开销很小，但简单的“每个换行符都是 `<br />`”规则在 Markdown 中不起作用。

Markdown 的多段落电子邮件样式 [引号](#quotes) 和 [列表条目](#listen) 在使用换行符格式化时效果最佳 - 并且看起来更好。

[bq]: #blockquote

[l]:  #list

### 标题
这里的 Markdown 只支持一种类型的标题格式：atx。
Atx 样式标头在行开头使用 1-6 个哈希字符，对应于级别 1-6。例如：

`# Dies ist ein H1`

`## Dies ist ein H2`

`###### Dies ist ein H6`

＃＃＃ 引号
与电子邮件一样，Markdown 使用字符 `>` 来表示引用块。如果您有在电子邮件中引用的经验，您也知道如何在 Markdown 中创建引用。如果您将每行文本换行并在每行前面放置 `>` ，效果会最好：

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `> consectetuer adipiscing elit. Aliquam hendrerit mi posuere` `> lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet` `> vitae, risus.` `>` `> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `> Suspendisse id sem consectetuer libero luctus adipiscing.`

但 Markdown 也允许你偷懒，只在硬包装段落的第一行使用 `>`：

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.` `Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae,` `risus.`

`> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.``Suspendisse id sem consectetuer libero luctus adipiscing.`

可以使用 more `>` 嵌套引号（即引号内的引号）：

`    > Dies ist die erste Zitat-Ebene.` `    >` `    > > Dies ist ein verschachteltes Zitat.` `    >` `    > Zurück auf der ersten Ebene.`

引号可以包含其他 Markdown 元素，包括标题、列表和代码块：

> ## 这是一个标题。
>> 1. 这是第一个列表项。
> 2. 这是第二个列表项。
>> 这是一些示例代码： >> return shell_exec("echo $input | $Markdown_script");

任何像样的文本编辑器都应该使电子邮件式的引用变得容易。例如，在 BBEdit 中，您可以进行选择并从菜单`Text`中选择`Increase Quote Level`。

### 列表
Markdown 支持排序（编号）和未排序列表（枚举）。

无序列表使用星号、加号和连字符（可互换）作为列表标记：

    *   红色的
    *   绿色的
    *   蓝色的

是一样的：

+ 红 + 绿 + 蓝

和：

    -   红色的
    -   绿色的
    -   蓝色的

排序列表使用数字后跟句点：

    1. 狗
    2. 猫
    3. 鼠标

重要的是要了解数字本身对 Markdown 的输出没有影响。 Markdown 从最后一个列表创建以下 HTML 代码：

<ol><li>狗</li><li>猫</li><li>老鼠</li></ol>

如果您像这样编写列表：

    1. 狗
    1. 猫
    1. 鼠标

或者甚至：

    3. 狗
    1. 猫
    8. 鼠标

每次仍然会出现相同的列表。如果需要，您可以手动对列表进行正确编号。但如果你想偷懒，你可以随时使用相同的号码。

但是，您仍应从数字 1 开始列表。将来，Markdown 可能想要为第一个列表条目设置起始编号。

列表条目通常从文档的左边缘开始，但可以向右缩进最多三个空格。
列表标记必须与以下文本用一个或多个空格或制表符分隔。

为了更好地格式化列表，可以进一步缩进各个条目，如下所示：

    * Lorem ipsum dolor sat amet，consectetuer adipiscing elit。

Aliquam hendrerit mi posere lectus。前庭 enim wisi、viverra nec、fringilla in、laoreet vitae、risus。

    * Donec 坐 amet nisl。 Aliquam semper ipsum sat amet velit。

        暂停 id sem consectetuer libero luctus adipiscing。

以下示例生成相同的代码，但不太整洁：

    * Lorem ipsum dolor sat amet，consectetuer adipiscing elit。

Aliquam hendrerit mi posere lectus。前庭 enim wisi、viverra nec、fringilla in、laoreet vitae、risus。

    * Donec 坐 amet nisl。 Aliquam semper ipsum sat amet velit。

    暂停 id sem consectetuer libero luctus adipiscing。

如果列表条目由空行分隔，Markdown 将用 `<p>` 和 `</p>` 包裹列表条目。

例如，这将：

    *沃斯坦纳
    * 国王

到

<ul><li>沃施泰纳</li><li>国王</li></ul>

但这：

    *沃斯坦纳

    * 国王

变得太

<ul><li><p>沃施泰纳</p></li><li><p>国王</p></li></ul>

列表项可以由多个段落组成。列表项中的以下每个段落必须缩进至少 4 个空格或制表符：

    1. 这是一个两段列表项。痛苦的洛雷姆

坐下来，conectetuer adipiscing elit。 Aliquam hendrerit mi posere lectus。

前庭 enim wisi、viverra nec、fringilla in、laoreet vitae、risus。多内克坐阿梅特尼斯尔。 Aliquam semper ipsum sat amet velit。

    2. 暂停 id sem consectetuer libero luctus adipiscing。

当以下段落的每一行都缩进时，看起来不错，但是 Markdown 又允许懒人只缩进第一行：

    *这是一个两段列表项

这是此列表项中的第二段。只有第一行需要缩进。 Lorem ipsum dolor 坐在 amet，consectetuer adipiscing elit。

    * 同一列表中的另一个项目。

要在列表点中使用引号，引号必须缩进：

    * 带有报价的列表项：

> 这是引用 > 在列表中。

要在列表项中使用代码块，它必须缩进两次——8 个空格或两个制表符：

    * 带有代码示例的列表项：

            <在此插入代码>

可能会无意中创建列表，例如
写下以下内容：

    1986 年，多么美好的一年。

换句话说：行开头的序列 *number-dot-space*。为了避免此问题，可以使用反斜杠屏蔽句点：

    1986年\.多么美好的一年啊。

<h3 id="precode">代码块</h3>

预格式化代码块用于重写程序或标记源代码。代码块中的行不会形成正常的段落，而是被解释为找到的行。 Markdown 包含带有标签 `<pre>` 和 `<code>` 的代码块。

要在 Markdown 中创建代码块，只需将代码块的每一行缩进至少 4 个空格或一个制表符即可。从以下输入...

    这是一个正常的段落。

        这是一个代码块。

...Markdown 执行以下操作：

    <p>这是一个正常的段落。</p>

<pre><code>Dies ist ein Code-Block.
</code></pre>

每行缩进中删除一级缩进（4 个空格或 1 个制表符）。例如，以下...

    AppleScript 中的示例：

告诉应用程序“Foo”嘟嘟声结束告诉

...也变得

    <p>AppleScript 中的示例：</p>

<pre><code>tell application "Foo" beep end tell </code></pre>

代码块结束于第一行未缩进的位置（或文档末尾）。

在代码块中，与号 (`&`) 和尖括号（`<` 和 `>`）会自动转换为 HTML 实体。这使得合并 HTML 片段变得更加容易——只需将 HTML 复制到文档中，缩进它，Markdown 就会对 & 符号和尖括号进行编码。例如：

<div class="footer">© 2004 Foo 公司</div>

变成：

<pre><code>&lt;div class="footer"&gt; &amp;copy; 2004 Foo Corporation &lt;/div&gt; </code></pre>

正常的 Markdown 语法不会在代码块中处理。 IE。
星号只是代码块中的星号，并不是突出显示文本的信号。结果是在 Markdown 中谈论“Markdown”变得很容易。

<a id="hr"></a>

### 水平线 水平线标签（`<hr />`）可以通过在一行上单独写入 3 个或更多连字符或星号来生成。字符之间也允许有空格。以下所有示例都会生成一条水平线：
    * * *

    ***

    *****

    - - -

    ---------------------------------------

* * *

<div id="span"></div>

## 跨度元素
<a id="link"></a>

### 链接
Markdown 支持两种类型的链接：*内联*和*引用*。

在这两种样式中，链接文本都用 [方括号] 标记。

要创建内联链接，请直接在右方括号后面写入普通括号。要链接到的 URL 写在这些括号中，并在引号中写有*可选*链接标题。示例：

这是内嵌链接的[一个例子](http://example.com/ "Der Linktitel")。

    [这个链接](http://example.net/) 没有标题属性。

这变成：

<p>这是内联链接的<a href="http://example.com/" title="标题">示例</a>。</p>

<p><a href="http://example.net/">该链接</a>没有标题属性。</p>

如果要引用同一服务器上的内容，可以使用相对路径：

    页面 [关于我](/about/) 上有更多信息。

参考链接使用第二组方括号，其中写入链接的任意标识符：

    这是参考链接的[示例][id]。

如果您愿意，还可以在括号之间插入空格：

    这是参考链接的[示例][id]。

然后，在文档中的某处，链接在其自己的行上定义，如下所示：

[id]: http://example.com/  "Optionalen Titel hier eintragen"

所以：

* 包含链接标识符的方括号（可选）

    最多缩进三个空格）；

* 后面跟一个冒号；
* 后跟一个或多个空格（或制表符）；
* 后跟链接的 URL；
* 可选地后跟链接标题属性的文本，

    用括号、单引号或双引号括起来。

以下三个定义是相同的：

[foo]: http://example.com/  "Optionaler Titel"

[foo]: http://example.com/  'Optionaler Titel'

[foo]: http://example.com/  (Optionaler Titel)

**注意：** Markdown 1.0.1 中存在一个已知错误，该错误会阻止单引号用作链接标题分隔符。

链接 URL 可以选择用尖括号括起来：

[id]: <http://example.com/>  "Optionaler Titel hier"

title 属性还可以设置为下一行并使用更多空格或制表符缩进。对于长 URL，这看起来更好：

[id]: http://example.com/langer/pfad/zu/seite

        “此处标题可选”

链接定义仅用于在 Markdown 处理文档时创建链接，并在输出 HTML 之前从文档中删除。

链接定义的标识符可以由字母、数字、空格和标点符号组成。它们“独立”于大小写字母：

[链接文本][a] [链接文本][A]

这两个链接定义是等效的。

*隐含链接标识符*允许省略链接标识符。在这种情况下，链接文本用作标识符。只需在链接文本中添加一组空方括号即可：

	[谷歌][]

然后定义链接：

[Google]: http://google.com/

由于链接标识符可以包含空格，因此该缩写甚至适用于链接文本中的多个单词：

	访问[大胆火球][]了解更多信息。

然后定义链接：

[Daring Fireball]: http://daringfireball.net/

链接定义可以在 Markdown 文档中的任何位置进行。一般来说，最好在使用它们的段落之后进行这些操作。它们也可以像脚注一样一起列出在文档的末尾。

一个小例子：

我从 [Google] [1] 获得的流量是从 [Yahoo] [2] 或 [MSN] [3] 获得的流量的十倍。

[1]: http://google.com/        "Google"

[2]: http://search.yahoo.com/  "Yahoo Search"

[3]: http://search.msn.com/    "MSN Search"

通过隐含链接标识符使用缩写，您还可以编写以下内容：

我从 [Google][] 获得的流量是从 [Yahoo][] 或 [MSN][] 获得的流量的十倍。

[google]: http://google.com/       "Google"

[yahoo]: http://search.yahoo.com/  "Yahoo Search"

[msn]: http://search.msn.com/      "MSN Search"

这两个示例都会生成以下 HTML 代码：

<p>我从<a href="http://google.com/" title="谷歌">Google</a>获得的流量是从<a href="http://search.yahoo.com/" title="雅虎搜索">Yahoo</a>或<a href="http://search.msn.com/" title="MSN 搜索">MSN</a>获得的流量的十倍。</p>

为了进行比较，以下是使用 Markdown 内联链接的同一段落：

我从 [谷歌](http://google.com/ "Google") 获得的流量是从 [雅虎](http://search.yahoo.com/ "Yahoo Search") 或 [微软网络](http://search.msn.com/ "MSN Search") 获得的流量的十倍。

参考链接背后的想法并不是它们更容易编写。他们的想法是让文档更具可读性。示例段落只有 80 个字符长（带有参考链接），完整的 181 个字符长（带有参考链接）； HTML 则有 239 个字符，标记多于内容。

通过 Markdown 的参考链接，源文档更加类似于浏览器中显示的最终输出格式。从段落中提取标记元数据的能力意味着可以将链接集成到文本中，而不会减慢文本的流动。

<a id="em"></a>

### 强调 Markdown 将星号 (`*`) 和下划线 (`_`) 视为强调指示符。打包到单个 `*` 或 `_` 中的文本使用 HTML 标签 `<em>` 进行包装，双 `*` 或 `_` 中使用标签 `<strong>` 进行标记。以下面的文字为例：
    *单个星号*

    _单下划线_

    **双星号**

    __双下划线__

将输出以下内容：

    <em>单星号</em>

    <em>单下划线</em>

    <strong>双星号</strong>

    <strong>双下划线</strong>

样式可以任意选择。唯一的限制是必须使用相同的字符来打开和关闭强调区域。

重音可以用在单词的中间：

    主*神*圣礼

但如果 `*` 或 `_` 被空格包围，则它被视为简单的星号或简单的下划线。

要在被理解为强调的地方编写星号或下划线，可以使用反斜杠进行转义：

    \*此文本被星号包围。\*

<a id="code"></a>

### 代码 要标记代码区域，请使用反引号字符 (`` ` ``) 括起来。与代码块不同，代码区域格式化普通段落中的代码：
    使用函数`printf()`输出文本。

变成：

    <p>使用<code>printf()</code>函数打印文本。</p>

如果要在代码区显示反引号，则可以在代码区前后使用多个反引号：

    ``Irgendwo hier (`) 是隐藏的反引号。``

这变成：

    <p><code>irgendwo hier (`) ist ein Backtick versteckt.</code></p>

代码区域周围的反引号分隔符可以包含空格——一个在左反引号之后，一个在右反引号之前。这允许在代码区域内使用反引号，即使在开头或结尾：

	代码区域中的单个反引号：`` ```

	代码部分中反引号包裹的字符串：`` `foo` ``

变成：

	<p>代码区域中的单个反引号： <code>`</code></p>

	<p>代码区域中反引号包裹的字符串： <code>`foo`</code></p>

在代码区域中，& 号和尖括号被编码为 HTML 实体。

    没有人使用`<blink>`标签。

这变成：

    <p>没有人使用<code>&lt;blink&gt;</code>标签。</p>

以下也适用：

    `&#8212;` 是 `&mdash;` 的十进制编码等效项。

这也将是

<p><code>&amp;#8212;</code>是十进制编码等价的<code>&amp;mdash;</code> 。</p>

<a id="img"></a>

### 图形 诚然，找到一种“自然”语法将图形合并到文本中是相当困难的。
Markdown 使用的语法旨在类似于链接的样式。这允许两种类型：内联和引用。

内联语法如下所示：

    ![替代文本](../../de/community/pfad/zum/bild.jpg)

    ![替代文本](../../de/community/pfad/zum/bild.jpg "可选标题")

所以：

* 感叹号：`!`;
* 后跟一组方括号，表示值

    `alt` 所包含图形的属性；

* 后面的括号表示图形的 URL 或路径

以及可选的 `title` 属性的值（用引号引起来）。

参考样式图像参考如下所示：

    ![替代文本][id]

这里的“id”是定义的图像引用的名称。图像引用的定义语法与链接引用相同：

[id]: url/zur/grafik  "Optionales title-Attribut"

Markdown 目前没有用于指定图形大小的语法。如果有必要，您可以简单地使用普通的 HTML 标记`<img>`。

* * *

<div id="misc"></div>

＃＃ 各种各样的
<a id="backslash"></a>

### 反斜杠转义
Markdown 允许您使用反斜杠转义来写入在 Markdown 语法中具有特定含义的字符。
例如，如果您想用星号包围单词（而不是 HTML 标记`<em>`），则可以在星号前面添加反斜杠：

    \*被星星包围\*

Markdown 为以下字符提供此选项：

\ 反斜杠 ` 反引号

    * 星号

_ 下划线 {} 大括号 [] 方括号 () 圆括号

# 哈希+加号
    - 减号（连字符）

。   观点 ！   感叹号

* * *

<a id="lizenz"></a>

＃＃＃ 执照
本作品根据 [知识共享署名-相同方式共享 (BY-SA) 4.0 国际许可证][by-sa] 获得许可。

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

?>这是 [John Grubers][jg] [Markdown][md] 对 [原始语法文档][osd] 的翻译。本翻译截至 2013 年 12 月 15 日（Markdown 版本 1.0.1）。不保证翻译的准确性。如果翻译有任何错误，请发送短信至<lasar@liepins.net>。
也欢迎任何其他类型的反馈。*

[jg]: http://daringfireball.net/

[md]: http://daringfireball.net/projects/markdown/

[osd]: http://daringfireball.net/projects/markdown/syntax