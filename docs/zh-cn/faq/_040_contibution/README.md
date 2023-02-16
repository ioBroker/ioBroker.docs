---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/faq/_040_contibution/README.md
title: 贡献
hash: B+xY42m31y1RW45SPTaSuNKZTq+l++EXSVaUgJPKI+g=
---
＃ 贡献
您可以通过多种方式为 ioBroker 的开发做出贡献。
我们总结了本章中最重要的选项。

## 文档
文档是 ioBroker 的重要组成部分。她是希望参与 ioBroker 的新用户的第一站。

文档可以在这个 GitHub 存储库中找到，例如，必须在此处编辑此文本：[文档/en/faq_040_contribution/README.md](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/de/faq/_040_contibution/README.md)。

文档可以用 3 种语言中的一种编写：英语（首选）、德语和俄语。

文本和页面是用 Markdown 编写的，可以使用任何文本编辑器或直接在 GitHub 上的浏览器中进行编辑。

您可以使用您最喜欢的语言。
如果您不会说一种语言，您也可以使用 Google 的翻译。
然后，我们将更正文本。最重要的是文本是可以理解的，它们不仅会留在你的脑海中，还会保存在纸上（在 GitHub 上）。

注意记录现有文档的语言。如果 `translatedFrom: XX` 位于顶部，则此文档将从另一种语言翻译而来，然后您的所有更改将被再次覆盖。
但是，如果您想要完全以这种语言编辑文档，请删除 `translatedFrom` 条目，以免再次翻译该文档。

但最好编辑原始语言，因为这样我们可以更容易地实现语言之间的同步。

## 报错
如果您在 ioBroker 中发现错误，则可以将其报告给 GutHub 上的相应适配器。

为此，您需要一个免费的 GitHub 帐户。如果您还没有，可以在这里注册：[github.com](https://github.com)。
注册只需要几秒钟，但这将极大地帮助我们维护和修复错误。

请记住，开发人员无法读懂您的想法。
报告错误时，请准确描述您的操作、发生的情况以及您的预期。
如果还附上错误日志，它会有很大帮助。屏幕截图也很有帮助。

请不要忘记提及适配器的版本号和 `ioBroker.js-controller` 的版本。

如何报告图形错误（发生在浏览器中）参见[这里](./010_how_to_debug_gui.md)。

请不要忘记，您还可以在 CLI 中查看 ioBroker 日志：

- `iob logs` 显示最后 100 行日志，
- `iob logs --w` 实时显示日志。

＃＃ 发展
您可能想自己开发一个适配器，甚至想在 ioBroker 核心上工作。

两者都是可能的。 :)

要开发适配器，有一个 [指示](../dev/adapterdev.md)。

## 在 ioBroker 论坛上回答问题
您还可以通过在 ioBroker 论坛上回答问题来帮助解决这个问题。
每天都有新用户来，他们有疑问，因为文档不充分或看不懂。

##贡献想法
如果您有关于如何改进 ioBroker 的想法，那么您可以在 ioBroker 论坛上进行讨论或许下一个 [这里](https://github.com/ioBroker/AdapterRequests/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3AReleased) 愿望。
如果您的想法得到足够的支持，它将包含在路线图中。