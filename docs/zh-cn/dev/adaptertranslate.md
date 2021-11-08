---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adaptertranslate.md
title: 适配器的翻译
hash: 8XvB1Gq0qo9gVlIP2+QfpMZ3OQTE+OfKgPD94WrJdcQ=
---
# 适配器的翻译
＃＃ 介绍
ioBroker 在 [许多不同的语言](https://www.iobroker.net/#en/statistics) 中在国际上使用，因此翻译非常重要。

适配器有多个需要翻译的部分：

1. 管理用户界面中的字符串
1. io-package.json 中的标题和描述
1.在`io-package.json`中发布消息

## 语言
所有这些短字符串**必须**翻译成以下语言：

- 英语 (en)
- 德语 (de)

它们**应该**也被翻译成以下其他语言：

- 俄罗斯 (ru)
- 葡萄牙语 (pt)
- 荷兰语（荷兰语）
- 法语 (fr)
- 意大利语（它）
- 西班牙语
- 波兰语 (pl)
- 中文（zh-cn）

## 自动翻译
所有适配器都应使用 `gulp` 使用自动翻译。

当使用 [适配器创建者](https://github.com/ioBroker/create-adapter) 创建适配器时，将创建正确的 gulp 文件。

每当您添加一些字符串时，您只需使用 `gulp translateAndUpdateWordsJS` 即可添加所有缺失的翻译。

为了自动翻译发行说明，使用 [来自@AlCalzone 的发布脚本](https://github.com/AlCalzone/release-script) 是一个简单的选项，可以从英文书面更改日志中自动翻译。

## 托管翻译
自动翻译通常不够好或令人困惑，因此 ioBroker 为托管社区翻译提供 Weblate 平台：

https://weblate.iobroker.net/

在 Weblate 中，社区成员可以轻松管理所有包含的 ioBroker 适配器的任意数量语言的翻译。

要将您的适配器添加到 Weblate，请遵循 [这些指南](https://github.com/ioBrokerTranslator/doc/blob/master/README.md)。

Weblate 目前仅在管理用户界面中管理字符串。它不会改变 `io-package.json` 或对您的文档做任何事情。