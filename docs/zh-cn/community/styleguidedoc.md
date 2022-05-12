---
title: 样式指南文档
lastChanged: 13.06.2019
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/community/styleguidedoc.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: Zmgjn4ZXZEX/lmxZOYDoitahdM5B6U5aczZS5gjD+Sk=
---
# 样式指南文档
* 文档是使用 [Markdown][] 语言创建的。
* 文件和文件夹名称以小写形式书写。

允许使用字符 `a-z`、`0-9`、下划线 `_` 和小数点 `.`。

* 文档应在 80 个字符处有一个换行符。
* 文本格式最好在 `.editorconfig` 文件中完成

  描述。

      * 自动应用这些规则的 [plugin][] 可用于

        不同的编辑器可用。

* 对于德语文本，符合新的德语正字法

  喜欢。

* 在参考文档中，人称代词的使用（例如

  “我”、“你”、“我们”）避免。

* 使用中性代词和多个名词。
    *好吧：“他们（几个）”，“你的（拥有）”，“人”，

      “人”、“开发者”

    * 乱序：“his”、“her”、“he”、“she (woman)”、“boys”、“gals”

* 如果使用括号元素（所有括号形状和

  引号），标点符号设置如下：

    * 如果括号元素具有完整的括号，则在括号内

    句子包含（主语、谓语、宾语）。

    * 如果括号元素只是一个子句，则在括号之外

    包含。

* 文档总是以 H1 级别的标题开头。
* 链接不是内联放置的（例如，使用 `[a link](http://example.com)`），

但借助内联 `[a link][]` 和 `[a link]: https://a.link/to/know` 放置在文档的末尾。

* 使用破折号时，使用简写

  在 OSX 中使用减号而不是“-”或 `Option+Shift+"-"`。

* 附加内容：
      * 二进制文件、图像、视频或音频记录等文档

      存储在`media`文件夹中。

      * 文本中媒体的整合是针对一般文件完成的

使用 `§§LLLLL_0§§` 和使用 `![媒体术语](../../de/community/media/{dateiname})` 的图像。

      * 图像最好以 SVG 格式保存。如果 SVG

是不可能的，然后作为 jpg 或 png 文件。请留意文件大小。

* 以下适用于源代码部分：
      * 根据源代码语言，必须选择适当的标记。到

        JavaScript 示例` ```js`。

      * 源文本可以，但不必是完整的。代码块

提供示例来阐明刚刚描述的观点。因此，没有必要提供完全可执行的程序。但是，如果要提供完全可执行的程序，则可以在 `media/{code_beispieldatei}` 文件夹中以媒体文件的形式完成，并在文档中提供相应的链接。

* 如果使用下划线、逗号、星号或反斜杠

必须设置正确的转义字符：`\_`、`\*`、`\\`和``\``` anstelle von `_`, `*`, ` \` und `` ```。

* 为了强调注释，以下是指南

  要注意：

     - “Note:”标识符必须设置为斜体，即 `*Note*:`。
     - 在“提示：”标识符之后，继续使用大写字母。
     - 引用应放在新段落的开头，以便更明显。

* 适配器文档有一个单独的 [样式指南][]。

[Plugin]: http://editorconfig.org/#download

[Style Guide]: https://www.iobroker.net/#de/documentation/dev/adapterdocstyleguide.md

[Markdown]: https://www.iobroker.net/#de/documentation/community/docmarkdown.md