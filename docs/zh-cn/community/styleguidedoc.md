---
title: 样式指南文档
lastChanged: 13.06.2019
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/community/styleguidedoc.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: mfCPW6sFRTOA8DZNqHydfib2TK+qdfZMNwiFfig9vtw=
---
＃样式指南文档
*本文档是使用[Markdown] []语言创建的。
*文件和文件夹名称以小写字母书写。

允许使用字符`a-z`，`0-9`，下划线`_`和小数点`.`。

*文件应具有80个字符的换行符。
*最好像在`.editorconfig`文件中一样进行文本格式化。

  描述。

      *自动应用这些规则的[插件] []用于

        提供不同的编辑器。

*对于德语文本，必须符合新的德语拼写

  喜欢。

*在参考文件中，人称代词的使用（例如

  应避免使用“我”，“您”，“我们”）。

*使用不分性别的代词和多个名词。
    *确定：“他们（几个）”，“他们（财产）”，“人”，

      “人”，“开发者”

    *不正确：“他”，“她”，“他”，“她（女人）”，“男孩”，“女孩”

*如果使用括号元素（所有括号形式和

  引号），标点符号设置如下：

    *如果方括号元素完整，则在方括号内

    句子包含（主语，谓语，宾语）。

    *如果方括号元素仅是子集，则在方括号之外

    包含。

*文档始终以标题H1开头。
*链接不是内联放置的（例如，使用`[a link]（http://example.com）`），

但在内联`[a link][]`和`[a link]: https://a.link/to/know`的帮助下放在文档末尾。

*如果使用破折号，请使用短记号

  在OSX中带有减号，而不是“-”或`Option+Shift+"-"`。

*附加内容：
      *诸如二进制文件，图像，视频或音频记录之类的文档将被保存

      存储在文件夹`media`中。

      *媒体包含在常规文件的文本中

通过`§§LLLLL_0§§`来实现，对于图像则通过`![媒体术语](../../de/community/media/{dateiname})`来实现。

      *图像最好以SVG格式存储。当SVG

是不可能的，然后是jpg或png文件。请注意文件大小。

*以下内容适用于源代码部分：
      *根据源代码语言，必须选择相应的标记。到

        JavaScript的示例` ```js`。

      *源文本可以但不是必须完整。源代码块

代表示例以阐明上述观点，因此无需交付完全可执行的程序。但是，如果要提供一个完全可执行的程序，则将其作为文件夹文件`media/{code_beispieldatei}`中的媒体文件来完成，并在文档中提供相应的链接。

*如果使用下划线，逗号，星号或反斜杠

正确的转义字符必须使用：`\_`，`\*`，`\\`和``\``` anstelle von `_`, `*§§SSSSS_6§ §\§SSSSS_7§§` ```。

*为了强调注释，以下准则是

  要注意：

     -“注意：”标识符必须以斜体设置，即为“ *注意*：”。
     -在“注意：”标识符之后，继续输入大写字母。
     -注释应放在新段落的开头，以便更清晰可见。

*适配器文档有单独的[样式指南] []。

[Plugin]: http://editorconfig.org/#download

[Style Guide]: https://www.iobroker.net/#de/documentation/dev/adapterdocstyleguide.md

[Markdown]: https://www.iobroker.net/#de/documentation/community/docmarkdown.md