---
title: 风格指南文档
lastChanged: 13.06.2019
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/community/styleguidedoc.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: Zmgjn4ZXZEX/lmxZOYDoitahdM5B6U5aczZS5gjD+Sk=
---
# 风格指南文档
* 文档是使用 [Markdown] [] 语言创建的。
* 文件和文件夹名称以小写字母书写。

允许使用字符 `a-z`、`0-9`、下划线 `_` 和小数点 `.`。

* 文件应有 80 个字符的换行符。
* 最好像在文件 `.editorconfig` 中那样完成文本格式化

  描述。

      * 自动应用这些规则的 [plugin] [] 是为了

        不同的编辑器可用。

* 对于德语文本，需要遵守新的德语拼写

  喜欢。

* 在参考文档中，人称代词的使用（例如

  应避免使用“我”、“你”、“我们”）。

* 使用中性代词和多个名词。
    * OK: "they (several)", "their (property)", "persons",

      “人”、“开发者”

    * 不好：“他的”、“她的”、“他”、“她（女人）”、“男孩”、“女孩”

* 如果使用括号元素（所有括号形式和

  引号），标点符号设置如下：

    * 如果括号元素是完整的，则在括号内

    句子包含（主语、谓语、宾语）。

    * 如果括号元素只是一个子集，则在括号之外

    包含。

* 文档总是以 H1 层的标题开头。
* 链接不是内嵌的（例如使用`[a link] (http://example.com)`），

但在内联 `[a link][]` 和 `[a link]: https://a.link/to/know` 的帮助下放置在文档的末尾。

* 当使用破折号时，使用短符号

  在 OSX 中使用减号而不是“-”或 `Option+Shift+"-"`。

* 附加内容：
      * 二进制文件、图像、视频或录音等文件将被

      存储在文件夹 `media` 中。

      * 媒体包含在一般文件的文本中

使用 `§§LLLLL_0§§` 和使用 `![媒体术语](../../de/community/media/{dateiname})` 的图像。

      * 图像最好以 SVG 格式存储。当 SVG

不可能，然后作为 jpg 或 png 文件。请注意文件大小。

* 以下适用于源代码部分：
      * 根据源代码语言，必须选择相应的标记。到

        JavaScript 的示例 ` ```js`。

      * 源文本可以但不必是完整的。源代码块

举例说明刚才描述的观点。因此不需要提供完全可执行的程序。但是，如果要提供完全可执行的程序，则可以将其作为文件夹 `media/{code_beispieldatei}` 中的媒体文件并在文档中提供相应链接。

* 如果使用下划线、引号、星号或反斜杠

正确的转义字符必须使用：`\_`，`\*`，`\\`和``\``` anstelle von `_`, `*§§SSSSS_6§ § \ ` und `` ` ``。

* 为了使笔记脱颖而出，以下准则是

  要注意：

     - "Note:" 标识符必须设置为斜体，即`* Note *:`。
     - 在“注意：”标识符之后，继续使用大写字母。
     - 注释应放在新段落的开头，以便更显眼。

* 适配器文档有单独的 [样式指南] []。

[Plugin]: http://editorconfig.org/#download

[Style Guide]: https://www.iobroker.net/#de/documentation/dev/adapterdocstyleguide.md

[Markdown]: https://www.iobroker.net/#de/documentation/community/docmarkdown.md