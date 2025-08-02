---
title: 风格指南文档
lastChanged: 13.06.2019
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/community/styleguidedoc.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: mfCPW6sFRTOA8DZNqHydfib2TK+qdfZMNwiFfig9vtw=
---
# 风格指南文档
* 该文档是使用 [Markdown][] 语言创建的。
* 文件和文件夹名称以小写字母书写。

允许使用字符`a-z`、`0-9`、下划线`_` 和小数点`.`。

* 文档应在 80 个字符处换行。
* 文本格式最好与“.editorconfig”文件中的格式相同

  描述的。

      * 自动应用这些规则的[插件][]可用于

        提供各种编辑器。

* 对于德语文本，需要遵守新的德语拼写

  首选。

* 人称代词的使用（例如

  应避免使用“我”、“你”、“我们”。

* 使用中性代词和复数名词。
    * 按顺序：“他们（几个）”、“他们（拥有）”、“人”、

      “人”、“开发者”

    * 不可以：“他的”、“她的”、“他”、“她（女人）”、“男孩”、“女孩”

* 是否使用了括号元素（所有括号形状和

  引号）、标点符号设置如下：

    * 如果括号元素是完整的，则在括号内

    句子包含（主语、谓语、宾语）。

    * 如果括号元素只是部分句子则在括号之外

    包含。

* 文档始终以 H1 级标题开始。
* 链接不是内联放置的（例如使用“[a link](http://example.com)”），

但在内联`[a link][]`和`[a link]: https://a.link/to/know`的帮助下放置在文档的末尾。

* 当使用破折号时，使用简写符号

  带有减号，而不是 OSX 中的“—”或 `Option+Shift+"-"`。

* 附加内容：
      * 二进制文件、图像、视频或音频记录等文档

      存储在文件夹`media`中。

      * 媒体集成到一般文件的文本中

使用`§§LLLLL_0§§`，对于图像使用`![媒体术语](../../de/community/media/{dateiname})`。

      * 图像最好以 SVG 格式存储。如果 SVG

如果不可能，则为 jpg 或 png 文件。请注意文件大小。

* 以下内容适用于源代码部分：
      * 根据源代码语言，必须选择适当的标记。对于

        JavaScript 的示例 ` ```js`。

      * 源代码可以但不一定是完整的。源代码块

因此，没有必要提供完全可执行的程序。如果仍需要提供完全可执行的程序，则可以在 `media/{code_beispieldatei}` 文件夹中以媒体文件的形式提供，并在文档中提供相应的链接。

* 如果使用下划线、引号、星号或反斜杠

必须设置正确的转义字符：`\_`、`\*`、`\\` 和 ``\` `` anstelle von `_`, `*`, `\` und `` ```。

*为了特别强调一个注意事项，以下是指导原则

  注意：

     - “Note:”标识符必须设置为斜体，即“*Note*:”。
     - 在“注意：”标识符之后，继续使用大写字母。
     - 注释应放置在新段落的开头，以便更明显。

* 适配器文档有单独的[风格指南][]。

[Plugin]: http://editorconfig.org/#download

[Style Guide]: https://www.iobroker.net/#de/documentation/dev/adapterdocstyleguide.md

[Markdown]: https://www.iobroker.net/#de/documentation/community/docmarkdown.md