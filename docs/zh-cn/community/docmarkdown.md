---
title: 降价
lastChanged: 23.04.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/community/docmarkdown.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: mjGgkxRz/ltg4/3OhZi5c/N+GKM1nmTaj+xCAMTAblo=
---
# Markdown：语法
?> 为确保 ioBroker 文档可以快速创建且易于阅读，我们选择 Markdown 作为简化标记语言。以下指南将帮助您了解 Markdown 的语法和可能性，并将其转换为出色的文档。

从技术上讲，文档系统仅支持以下功能：

- 标题
- 表
- 内联 HTML
- 列表
- 剩下
- 图片
- 粗体文字
- 斜体文字

＃＃ 概述
＃＃＃ 哲学
Markdown 被设计为尽可能易于阅读和编写。

可读性是这里的主要目标。 Markdown 格式的文档应该能够以其基本形式发布，而不会出现被标记或格式化（与 HTML 一样）。

因此，Markdown 的语法只包含经过仔细选择的字符，以便它们的外观与其含义相匹配。例如，单词周围的星号实际上看起来像 \*stress\*。 Markdown 中的列表看起来像列表。正如您从电子邮件中了解的那样，即使引用块看起来也像引用的文本段落。

### 内联 HTML
Markdown 的语法有一个目的：用于为 Web 编写 *。

Markdown 不是 HTML 的替代品，甚至不是远程的。语法的范围非常小，只对应于所有 HTML 标签的一小部分。 Markdown 的目的不是让插入 HTML 标记变得容易。 HTML 已经足够简单了。 Markdown 背后的想法是使文本尽可能易于阅读、编写和编辑。 HTML 是一种*发布格式*； Markdown 是一种*写作格式*。因此，它的语法只考虑可以用纯文本传达的内容。

任何 Markdown 无法完成的格式都可以简单地在 HTML 中使用。无需标记 HTML 以将其与其他内容分开。
它简单地写在文本中。

唯一的限制是块元素，例如`<div>`、`<table>`、`<pre>`、`<p>`等。它们必须用空行与周围的内容隔开，并且开始和结束标记不应使用空格或制表符缩进。 Markdown 足够智能，不会在 HTML 块周围放置额外的（不需要的）`<p>`标签。

例如，要在 Markdown 文章中包含 HTML 表格：

    这是一个正常的段落。

<table><tr><td>富</td></tr></table>

    这仍然是一个正常的段落。

应该注意的是，Markdown 的语法不会在 HTML 块中解释。例如，*emphasis* 不能在 HTML 块中使用。

内联 HTML 标记（例如 `<span>`、`<cite>` 或 `<del>`）可用于降价段落、项目符号或标题中的任何位置。
甚至可以使用 HTML 标签代替等效的 Markdown 格式。可以简单地使用 `<a>` 或 `<img>` 而不是 Markdow 的链接或图形语法。

与块标签不同，markdown 语法 *is* 在内联标签内解释。

### 自动屏蔽特殊字符
HTML 中有两个字符需要特殊处理：`<` 和 `&`。
左尖括号用于打开 HTML 标签，和号用于描述命名字符（实体）。如果要在 HTML 文档中将这些字符用作“自身”，则必须将它们作为实体进行转义，即 `&lt;` 和 `&amp;`。

& 符号对于 Web 开发人员来说尤其不切实际。如果你想写“AT&T”，你必须写“`AT&amp;T`”。即使在 URL 中，也必须对 & 符号进行转义。在页面的链接中

`http://images.google.com/images?num=30&q=larry+bird`

URL 必须编码如下：

`http://images.google.com/images?num=30&amp;q=larry+bird`

这很容易忘记，并且可能是验证其他格式良好的 HTML 文档时最常见的错误。

Markdown 允许这些字符正常使用。它自己处理编码。如果在实体中使用 & 符号，则不对其进行编码，否则将转换为 `&amp;`。

因此，如果您想输入版权符号，例如，您可以

`&copy;`

写，Markdown 不会修改这个。但是关

`AT&T`

变成 Markdown

`AT&amp;T`

做。因为 Markdown 支持内联 HTML，所以尖括号被视为普通 HTML。只是从像这样的东西

`4 < 5`

变成 Markdown

`4 &lt; 5`

做。但是，在代码或跨度块中，尖括号和 & 符号*总是*编码。这简化了在 Markdown 中编写 HTML（与原始 HTML 不同，在原始 HTML 中，对每个 `<` 和 `&` 进行编码几乎是一场噩梦）。

## 块元素
### 段落和换行符
段落只是一行或多行文本，由一个或多个空行分隔。 （空行是*看起来*像空行的任何行——只包含空格和制表符的行被视为空白。）普通段落不应使用空格或制表符缩进。

“一行或多行”规则意味着一件事：Markdown 支持“硬中断”段落。这与大多数其他文本到 HTML 格式化程序（包括 Movable Type 的“转换换行符”选项）形成鲜明对比，后者将段落中的每个换行符格式化为 `<br />`。

如果你*想要*有一个 `<br />` 作为休息，你可以用两个或更多空格结束该行。

虽然生成 `<br />` 的开销很小，但简单的“每个换行符都是 `<br />`”规则在 Markdown 中不起作用。

带有多个段落的 Markdown 电子邮件样式 [引号](#quotes) 和 [列出条目](#listen) 效果最好 - 并且看起来更好 - 当使用换行符格式化时。

[bq]: #blockquote

[l]:  #list

### 标题
这里的 Markdown 只支持一种类型的 header 格式：atx。
Atx 样式的标题在行首使用 1-6 个哈希字符，对应于级别 1-6。例如：

`# Dies ist ein H1`

`## Dies ist ein H2`

`###### Dies ist ein H6`

### 语录
Markdown 使用 - 就像电子邮件一样 - 字符 `>` 用于引用块。如果您有电子邮件引用的经验，您也知道如何在 Markdown 中创建引用。如果您将文本每行换行并在每行前面放置一个 `>`，看起来效果最好：

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `> consectetuer adipiscing elit. Aliquam hendrerit mi posuere` `> lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet` `> vitae, risus.` `>` `> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `> Suspendisse id sem consectetuer libero luctus adipiscing.`

但是 Markdown 也允许偷懒，只在硬中断段落的第一行使用 `>`：

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,``consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.``Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae,``risus.`

`> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.``Suspendisse id sem consectetuer libero luctus adipiscing.`

可以通过使用更多`>`来嵌套引用（即引用中的引用）：

`    > Dies ist die erste Zitat-Ebene.``    >``    > > Dies ist ein verschachteltes Zitat.``    >``    > Zurück auf der ersten Ebene.`

引用可以包含其他 Markdown 元素，包括标题、列表和代码块：

> ## 这是一个标题。
>> 1. 这是列表中的第一项。
> 2. 这是列表中的第二项。
> > 下面是一些示例代码： > > return shell_exec("echo $input | $Markdown_script");

任何理智的文本编辑器都应该使电子邮件式引用变得容易。例如，在 BBEdit 中，您可以进行选择并从 `Text` 菜单中选择 `Increase Quote Level`。

### 列表
Markdown 支持排序（编号）和无序（枚举）列表。

无序列表使用星号、加号和连字符（可互换）作为列表标记：

    *   红色的
    *   绿
    *   蓝色的

等于：

+ 红色 + 绿色 + 蓝色

和：

    -   红色的
    -   绿
    -   蓝色的

排序列表使用数字后跟一个点：

    第一条狗
    2.猫
    3.鼠标

重要的是要了解数字本身对 Markdown 的输出没有影响。 Markdown 从最后一个列表创建以下 HTML 代码：

<ol><li>狗</li><li>猫</li><li>老鼠</li></ol>

如果您改为这样编写列表：

    第一条狗
    1.猫
    1.鼠标

甚至：

    3. 狗
    1.猫
    8.鼠标

每次都会出现相同的列表。如果需要，您可以手动正确编号列表。但如果你想偷懒，你总是可以使用相同的数字。

但是，即使那样，您也应该以数字 1 开始列表。将来，Markdown 可能希望为第一个列表项设置一个起始数字。

列表条目通常从文档的左边距开始，但最多可以向右缩进三个空格。
列表标记必须用一个或多个空格或制表符与以下文本隔开。

为了更好地格式化列表，可以进一步缩进各个条目，如下所示：

    * Lorem ipsum dolor sit amet，consectetuer adipiscing elit。

Aliquam hendrit mi posuere lectus。 Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus。

    * Donec 坐在amet nisl。 Aliquam semper ipsum 坐在amet velit。

        暂停 id sem consectetuer libero luctus adipiscing。

以下示例生成相同的代码，但不太整洁：

    * Lorem ipsum dolor sit amet，consectetuer adipiscing elit。

Aliquam hendrit mi posuere lectus。 Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus。

    * Donec 坐在amet nisl。 Aliquam semper ipsum 坐在amet velit。

    暂停 id sem consectetuer libero luctus adipiscing。

如果列表项用空行分隔，markdown 将用 `<p>` 和 `</p>` 包装列表项。

例如，这将：

    * 沃斯坦纳
    * 王

到

<ul><li>沃施泰纳</li><li>王</li></ul>

但是这个：

    * 沃斯坦纳

    * 王

变成

<ul><li><p>沃施泰纳</p></li><li><p>王</p></li></ul>

列表项可以由多个段落组成。列表项中的每个后续段落必须缩进至少 4 个空格或一个制表符：

    1. 这是一个两段的要点。 Lorem ipsum dolor

坐在 amet，consectetuer adipiscing 精英。 Aliquam hendrit mi posuere lectus。

Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus。 Donec 坐在amet nisl。 Aliquam semper ipsum 坐在amet velit。

    2. 暂停 id sem consectetuer libero luctus adipiscing。

如果以下段落的每一行都缩进看起来不错，但是 Markdown 再次允许懒惰的人只缩进第一行：

    * 这是一个两段的要点

这是此列表项中的第二段。只有第一行需要缩进。 Lorem ipsum dolor sit amet，consectetuer adipiscing elit。

    * 同一列表中的另一个项目。

要在列表项中使用引号，引号必须缩进：

    * 带引号的列表项：

> 这是一个报价 > 在一个列表中。

要在列表项中使用代码块，它必须缩进 *两次* -- 8 个空格或两个制表符：

    * 带有代码示例的列表点：

            <在此处插入代码>

可能会无意中创建列表，例如
写道：

    1986 年。多么美好的一年。

换句话说：行首的序列*number-dot-space*。为了避免这个问题，点可以用反斜杠掩盖：

    1986 年\。多么美好的一年。

<h3 id="precode">代码块</h3>

预格式化的代码块用于覆盖程序或标记源代码。代码块中的行在找到时被解释，而不是形成正常的段落。 Markdown 包含带有 `<pre>` 和 `<code>` 标签的代码块。

要在 Markdown 中创建代码块，只需将代码块的每一行缩进至少 4 个空格或一个制表符。从以下输入...

    这是一个正常的段落。

        这是一个代码块。

...markdown 执行以下操作：

<p>这是一个正常的段落。</p>

<pre><code>Dies ist ein Code-Block.
</code></pre>

从每一行缩进中删除一级缩进——4 个空格或 1 个制表符。例如下面...

    AppleScript 中的一个示例：

告诉应用程序“Foo”哔声结束告诉

...成为

<p>AppleScript 中的一个示例：</p>

<pre><code>tell application "Foo" beep end tell </code></pre>

代码块在未缩进的第一行（或文档末尾）处结束。

在代码块中，与号 (`&`) 和尖括号 (`<` 和 `>`) 会自动转换为 HTML 实体。这使得合并 HTML 块变得更加容易——只需将 HTML 复制到文档中，缩进它，然后让 Markdown 对 & 和尖括号进行编码。例如：

<div class="footer">© 2004 富公司</div>

变成：

<pre><code>&lt;div class="footer"&gt; &amp;copy; 2004 Foo Corporation &lt;/div&gt; </code></pre>

代码块中不处理正常的 Markdown 语法。 IE。
星号只是代码块中的星号，而不是强调文本的信号。因此，在 Markdown 中谈论 *于* Markdown 很容易。

<a id="hr"></a>

### 水平线 水平线标签（`<hr />`）可以通过在一行上单独写入 3 个或更多破折号或星号来生成。字符之间也允许有空格。以下所有示例都会生成一条水平线：
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
Markdown 支持两种类型的链接：*inline* 和 *references*。

在这两种样式中，链接文本都用 [方括号] 标记。

要创建内联链接，请在右方括号后直接写普通括号。在这些括号中写入要链接到的 URL，以及带引号的链接的*可选*标题。例子：

对于内联链接，这是 [一个例子](http://example.com/ "Der Linktitel")。

    [这个链接](http://example.net/)没有标题属性。

这变成：

<p>这是内联链接<a href="http://example.com/" title="标题">的示例</a>。</p>

<p><a href="http://example.net/">此链接</a>没有标题属性。</p>

如果要指向同一服务器上的内容，可以使用相对路径：

    [关于我](/about/)页面上有更多信息。

参考链接使用第二组方括号，其中写入了任意选择的链接标识符：

    这是参考链接的[示例][id]。

如果您愿意，还可以在括号之间添加一个空格：

    这是参考链接的[示例][id]。

然后，在文档的某处，链接被定义在自己的行中，如下所示：

[id]: http://example.com/  "Optionalen Titel hier eintragen"

所以：

* 包含链接标识符的方括号（可选地

    缩进最多三个空格）；

* 后跟一个冒号；
* 后跟一个或多个空格（或制表符）；
* 后跟链接的 URL；
* 可选地后跟链接标题属性的文本，

    括在括号、单引号或双引号中。

以下三个定义是相同的：

[foo]: http://example.com/  "Optionaler Titel"

[foo]: http://example.com/  'Optionaler Titel'

[foo]: http://example.com/  (Optionaler Titel)

**注意：** Markdown 1.0.1 中有一个已知错误，它破坏了单引号作为链接标题分隔符的功能。

链接 URL 可以选择用尖括号括起来：

[id]: <http://example.com/>  "Optionaler Titel hier"

title 属性也可以设置为下一行，并用更多的空格或制表符缩进。使用长 URL 看起来会更好：

[id]: http://example.com/langer/pfad/zu/seite

        “此处为可选标题”

链接定义仅用于在 Markdown 处理文档时创建链接，并在呈现 HTML 之前从文档中删除。

链接定义的标识符可以由字母、数字、空格和标点符号组成。它们*独立*大小写：

[链接文本][a] [链接文本][A]

这两个链接定义是等价的。

*隐含的链接标识符*允许省略链接标识符。在这种情况下，链接文本用作标识符。它只是在链接文本中添加了一组空方括号：

[谷歌][]

然后定义链接：

[Google]: http://google.com/

由于链接标识符可以包含空格，因此此缩写甚至适用于链接文本中的多个单词：

访问 [大胆火球][] 了解更多信息。

然后定义链接：

[Daring Fireball]: http://daringfireball.net/

链接定义可以放在 Markdown 文档中的任何位置。一般来说，在使用它们的段落之后执行它们是个好主意。但是，就像脚注一样，它们也可以一起列在文档的末尾。

一个小例子：

我从 [Google][1] 获得的流量是 [Yahoo][2] 或 [MSN][3] 的十倍。

[1]: http://google.com/        "Google"

[2]: http://search.yahoo.com/  "Yahoo Search"

[3]: http://search.msn.com/    "MSN Search"

通过隐含链接标识符的缩写，还可以写成以下内容：

我从 [Google][] 获得的流量是 [Yahoo][] 或 [MSN][] 的十倍。

[google]: http://google.com/       "Google"

[yahoo]: http://search.yahoo.com/  "Yahoo Search"

[msn]: http://search.msn.com/      "MSN Search"

这两个示例都将生成以下 HTML 代码：

<p>我从<a href="http://google.com/" title="谷歌">Google</a>获得的流量是<a href="http://search.yahoo.com/" title="雅虎搜索">Yahoo</a>或<a href="http://search.msn.com/" title="MSN 搜索">MSN</a>的十倍。</p>

为了比较，使用 Markdown 的内联链接的同一段落如下：

我从 [谷歌](http://google.com/ "Google") 获得的流量是 [雅虎](http://search.yahoo.com/ "Yahoo Search") 或 [微信](http://search.msn.com/ "MSN Search") 的十倍。

参考链接背后的想法并不是它们更容易编写。这个想法是它们使文档更具可读性。示例段落只有 80 个字符长，带有参考链接，参考链接是完整的 181 个字符；作为 HTML，它有 239 个字符，标记多于内容。

使用 Markdown 的参考链接，源文档更接近于在浏览器中查看的最终输出格式。从段落中获取用于标记的元数据的能力允许将链接集成到文本中，而不会减慢文本的流动速度。

<a id="em"></a>

### 强调 Markdown 将星号（`*`）和下划线（`_`）视为强调指标。以 `*` 或 `_` 包裹的文本用 HTML 标签 `<em>` 包裹，重复的 `*` 或 `_` 用标签 `<strong>` 标记。例如以下文本：
    *单个星号*

    _单下划线_

    **双星号**

    __双下划线__

将输出：

<em>单个星号</em>

<em>单下划线</em>

<strong>双星号</strong>

<strong>双下划线</strong>

风格可以任意选择。唯一的限制是必须使用相同的字符来打开和关闭重音区域。

强调可以用在单词中间：

    主*神*圣礼

但如果 `*` 或 `_` 被空格包围，则将其视为单个星号或下划线。

要写一个星号或下划线，它会被解释为强调，它可以用反斜杠转义：

    \*此文本被星号包围。\*

<a id="code"></a>

### 代码 为了标记代码范围，它用反引号字符括起来（`` ` ``）。与代码块不同，代码区域在常规段落中格式化代码：
    使用 `printf()` 函数输出文本。

变成：

<p>使用<code>printf()</code>函数打印文本。</p>

如果要在代码区显示反引号，则可以在代码区前后使用多个反引号：

    ``Irgendwo hier (`) 是一个隐藏的反引号。``

这变成：

<p><code>irgendwo hier (`) ist ein Backtick versteckt.</code></p>

代码区域周围的反引号分隔符可以包含空格——一个在开始反引号之后，一个在结束反引号之前。这允许在代码区域的开头或结尾使用反引号：

代码范围内的单个反引号：`` ```

代码部分中包含反引号的字符串：`` `foo` ``

变成：

<p>一段代码中的单个反引号： <code>`</code></p>

<p>代码段中的反引号字符串： <code>`foo`</code></p>

在代码区域中，与号和尖括号被编码为 HTML 实体。

    没有人使用`<blink>`标签。

这变成：

<p>没有人使用<code>&lt;blink&gt;</code>标签。</p>

以下也有效：

    `&#8212;` 是 `&mdash;` 的十进制编码等价物。

这变成

<p><code>&amp;#8212;</code>是与<code>&amp;mdash;</code>等效的十进制编码.</p>

<a id="img"></a>

### 图形 诚然，很难找到一种“自然”的语法来将图形包含在文本中。
为此，Markdown 使用了一种类似于链接样式的语法。这允许两种类型：内联和引用。

内联语法如下所示：

    ![替代文本](../../de/community/pfad/zum/bild.jpg)

    ![替代文本](../../de/community/pfad/zum/bild.jpg "可选标题")

所以：

* 感叹号：`!`;
* 后跟一组方括号，将值括起来

    `alt`图形的属性包含；

* 后跟括号，是图形的 URL 或路径

以及可选的 `title` 属性的值，用双引号括起来。

参考样式的图像参考如下所示：

    ![替代文本][id]

这里的“id”是定义的图像引用的名称。图像引用使用与链接引用相同的语法定义：

[id]: url/zur/grafik  "Optionales title-Attribut"

目前，Markdown 没有用于指定图像大小的语法。如果有必要，可以使用普通的 HTML 标签`<img>`。

* * *

<div id="misc"></div>

＃＃ 各种各样的
<a id="backslash"></a>

### 反斜杠屏蔽
Markdown 允许使用反斜杠转义来编写在 Markdown 语法中具有特定含义的字符。
例如，如果你想用星号包围一个词（而不是 HTML 标记 `<em>`），你可以在星号前面加上反斜杠：

    \*被星号包围\*

Markdown 为以下字符提供了这种可能性：

\反斜杠`反引号

    * 星号

_ 下划线 {} 大括号 [] 方括号 () 括号

# 哈希 + 加号
    - 减号（连字符）

.观点 ！感叹号

* * *

<a id="lizenz"></a>

＃＃＃ 执照
本作品根据 [Creative Commons Attribution-Share Alike (BY-SA) 4.0 International License][by-sa] 获得许可。

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

?>这是 [John Grubers][jg] [Markdown][md] 的 [原始语法文档][osd] 的翻译。该翻译是截至 2013 年 12 月 15 日的最新版本（Markdown 版本 1.0.1）。不保证翻译的正确性。如翻译有误，请发短信至<lasar@liepins.net>。
也欢迎任何其他类型的反馈。*

[jg]: http://daringfireball.net/

[md]: http://daringfireball.net/projects/markdown/

[osd]: http://daringfireball.net/projects/markdown/syntax