---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapter-dev-faq.md
title: 常见的适配器开发问题
hash: eYLJSbvcCz8wYyj3Pa+wrDSZhMY78b6yn9YUWmOxv0E=
---
# 常见的适配器开发问题
＃＃ 介绍
此页面的目的是收集有关 ioBroker 适配器开发的常见问题。
这个想法是由 Ralf 于 2020 年 11 月 24 日在 ioBroker #adapter Discord 频道与 Mic 提出的问题进行讨论时提出的。

## 请贡献（这真的很容易！）
随意添加任何问题并根据此页面的答案。唯一的限制是：确保在答案中添加日期。无需完美主义，只需发布在适配器开发中对您有帮助的内容即可。也非常欢迎链接到实施该问题的适配器。我们开发人员喜欢看到实现示例:-)

*注意：* 这不是官方文档。欢迎提供任何提示、解决方法、指向更旧论坛帖子的链接等。目的是在常见的开发问题上快速支持和帮助开发人员。如果您在此处用英语写作有问题，请使用您当地的语言，如德语、俄语等，我们将很乐意稍后提供帮助和翻译。

要更新目录，您可以使用 TOC 生成器，例如[luciopaiva.com/markdown-toc](https://luciopaiva.com/markdown-toc/)

＃ 目录
- [适配器更新](#adapter-updates)
  - [发布适配器更新](#publishing-adapter-updates)
- [适配器测试和错误报告](#adapter-testing-and-error-reporting)
  - [紧凑模式](#compact-mode)
  - [哨兵](#哨兵)
- [适配器配置 UI (admin/index_m.html)](#adapter-configuration-ui-adminindexmhtml)
  - [输入验证](#input-validation)
- [适配器功能](#adapter-functions)
  - [写文件](#writing-files)

---

### 适配器更新
#### 发布适配器更新
**问题：** 我需要在哪些文件中更改版本号？

**答案：** 基本上，你需要接触 3 个文件：

 * `io-package.json`：更改版本号并添加最近的更改日志
 * `package.json`: 只更改版本号
 * `README.md`：添加新版本号和更改日志

请注意，需要使用 [语义版本控制](https://semver.org/)，见[版本控制](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning)。<br> （2020 年 11 月 25 日）

**问题：** 我的适配器位于最新的存储库中。我在 Github 上更新了适配器并在 NPM 上发布。用户何时会在 Admin 中看到新版本？

**答案：** ioBroker 每天两次扫描任何版本更改。<br> （2020 年 11 月 25 日）

**问题：** 如何将新适配器添加到最新存储库？

**答案：**见[将新适配器添加到最新存储库](https://github.com/ioBroker/ioBroker.repositories#add-a-new-adapter-to-the-latest-repository)<br> （2020 年 11 月 25 日）

### 适配器测试和错误报告
#### 紧凑模式
**问题：** 如何测试紧凑模式？

**答案：** 参见 [紧凑模式测试](https://forum.iobroker.net/topic/32789/anleitung-f%C3%BCr-adapter-entwickler-compact-mode-testen)（德语）<br> （2020 年 11 月 25 日）

####哨兵
**问题：** 如何将 Sentry 添加到我的适配器？

**答案：**见[哨兵自述文件](https://github.com/ioBroker/plugin-sentry#readme)<br> （2020 年 11 月 25 日）

### 适配器配置 UI (admin/index_m.html)
#### 输入验证
**问题：** 我想通过使用核心适配器方法以及 node.js 适配器代码的类/方法来验证适配器配置的字段。一旦用户在适配器配置中点击“保存”，就会进行验证，然后调用 `admin/index_m.html` 的 `save()`。

**答案：** 您可以使用 `sendTo()` 方法将变量 `obj` 从 `admin/index_m.html` 发送到适配器代码，验证那里的内容，然后通过回调将结果提供回`sendTo()` 的 `admin/index_m.html`。<br>示例：这是在适配器 [法尔计划](https://github.com/gaudes/ioBroker.fahrplan) 中实现的。<br>注意：您可能需要更改您的 `io-package.json`，参见例如 [ioBroker-Forum：sendTo() funktioniert nicht](https://forum.iobroker.net/topic/5205/gel%C3%B6st-sendto-in-eigenem-adapter-funktioniert-nicht/)<br> （2020 年 11 月 24 日）

### 适配器功能
####写入文件
**问题：** 适配器应该使用 axios 下载一个文件并能够将其写入 iobroker-data/files/<adapter>

**答案：** 下面是此操作的一小段代码：

```
const WebCall = await axios.get(url,{responseType: "arraybuffer"});
await Helper.Adapter.writeFileAsync(Helper.Adapter.namespace, `picture.jpg`, WebCall.data)
```

之后在ioBroker日志中有一个警告：<br> `writeFile will not write this file (picture.jpg) in future versions: <adapter> is not an object of type "meta"`<br>在 io-package.json 中，必须在 instanceObjects 中包含一个 meta.user 对象：<br>

```
"instanceObjects": [
  {
    "_id": "",
    "type": "meta",
    "common": {
      "name": "User files for <Adapter>",
      "type": "meta.user"
    },
    "native": {}
  }
]
```

（2020 年 12 月 9 日）