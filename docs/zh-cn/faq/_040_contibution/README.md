---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/faq/_040_contibution/README.md
title: 贡献
hash: jF7fUHJzM+MGQoRv/pZopwAUovn8TAKFm15fp+wteEM=
---
＃ 贡献
您可以通过多种方式为 ioBroker 的开发做出贡献。
我们总结了本章中最重要的选项。

## 文档
文档是ioBroker的重要组成部分。这是想要参与 ioBroker 的新用户的第一个联系点。

该文档可以在此 GitHub 存储库中找到，例如，可以在此处编辑此文本：[文档/en/faq_040_contribution/README.md](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/de/faq/_040_contibution/README.md)。

该文档可以用 3 种语言之一编写：英语（首选）、德语和俄语。

文本和页面是用 Markdown 编写的，可以使用任何文本编辑器进行编辑，也可以直接在 GitHub 上的浏览器中进行编辑。

您可以使用您最喜欢的语言。
如果您不懂语言，也可以使用 Google 的翻译。
然后我们将更正文本。最重要的是这些文本是可以理解的，它们的意图不仅留在你的脑海中，而且还保存在纸上（在 GitHub 上）。

请注意现有文档的记录语言。如果顶部显示`translatedFrom: XX`，则该文档将从另一种语言翻译而来，并且您的所有更改都将被覆盖。
但是，如果您想完全使用该语言编辑文档，请删除`translatedFrom`条目，以免再次翻译该文档。

但最好编辑原始语言，因为这样我们可以更容易地实现语言之间的同步。

## 报告错误
如果您发现ioBroker出现错误，您可以将其报告给GutHub上相应的适配器。

为此，您需要一个免费的 GitHub 帐户。如果您还没有，可以在此处注册：[github.com](https://github.com)。
注册只需要几秒钟，但这将极大地帮助我们维护和修复错误。

请记住，开发人员无法读懂您的想法。
报告错误时，请准确描述您做了什么、发生了什么以及您的期望。
如果还附上错误日志，将会有很大帮助。屏幕截图也非常有帮助。

请不要忘记提及适配器的版本号和`ioBroker.js-controller`的版本。

如何报告图形错误（在浏览器中发生）可以在[这里](#fehlerindergrafischeoberflchemelden)中找到。

请不要忘记，您还可以在 CLI 中查看 ioBroker 日志：

- `iob logs` 显示最后 100 行日志，
- `iob messages --w` 实时查看日志。

＃＃ 发展
您可能想自己开发一个适配器，甚至想在 ioBroker Core 上工作。

两者皆有可能。 :)

要开发适配器，需要有[指示](../dev/adapterdev.md)。

## 在 ioBroker 论坛上回答问题
您还可以通过回答 ioBroker 论坛上的问题来提供帮助。
新用户每天都会来，并因为文档不充分或难以理解而提出疑问。

## 引入想法
如果您对如何改进 ioBroker 有任何想法，可以在 ioBroker 论坛上讨论或在 [这里](https://github.com/ioBroker/AdapterRequests/issues?q=is%3Aissue+sort%3Areactions-%2B1-desc+is%3Aopen) 提出请求。
如果您的想法得到足够的支持，它将被包含在路线图中。