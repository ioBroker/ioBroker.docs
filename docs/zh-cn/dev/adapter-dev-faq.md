---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapter-dev-faq.md
title: 适配器开发常见问题
hash: iRcUFx048IVzNc/ocxHTGchnsvUMOm4VnrymhlS21P0=
---
# 适配器开发常见问题
＃＃ 介绍
本页面旨在收集有关 ioBroker 适配器开发的常见问题。

这个想法源于 Ralf 在 ioBroker #adapter Discord 频道中于 2020 年 11 月 24 日与 Mic 的讨论。

请大家踊跃投稿（非常简单！）
欢迎在本页面添加任何问题和相应的答案。唯一的要求是：请务必在答案中添加日期。无需追求完美，只需分享您在适配器开发过程中遇到的问题即可。我们也非常欢迎提供已实现该问题的适配器链接。我们开发者很乐意看到实现示例 :-)

*注意：* 这并非正式文档。欢迎提供任何提示、解决方法、甚至更早的论坛帖子链接等。我们的目的是快速支持和帮助开发者解决常见问题。如果您在此处用英语写作遇到困难，请使用您的母语，例如德语、俄语等，我们很乐意提供帮助并稍后进行翻译。

要更新目录，您可以使用目录生成器，例如 [luciopaiva.com/markdown-toc](https://luciopaiva.com/markdown-toc/)

＃ 目录
- [适配器更新](#adapter-updates)
- [发布适配器更新](#publishing-adapter-updates)
- [适配器测试和错误报告](#adapter-tester-and-error-reporting)
- [紧凑模式](#compact-mode)
- [哨兵](#sentry)
- [适配器配置界面 (admin/index_m.html)](#adapter-configuration-ui-adminindexmhtml)
- [输入验证](#input-validation)
- [适配器函数](#adapter-functions)
- [正在写入文件](#writing-files)

---

### 适配器更新
#### 发布适配器更新
**问题：**我需要在哪些文件中更改版本号？

**答案：** 基本上，你需要修改 3 个文件：

* `io-package.json`：更改版本号并添加最近的变更日志
* `package.json`：仅更改版本号
* `README.md`：添加新的版本号和变更日志

请注意，必须使用 [语义化版本控制（https://semver.org/），参见[版本控制](https://semver.org/)。](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning)。<br> （2020年11月25日）

**问题：**我的适配器已更新到最新代码库。我已在 GitHub 上更新了适配器，并已发布到 NPM。用户何时才能在后台管理界面看到新版本？

**答案：** ioBroker 每天扫描两次版本变更。<br> （2020年11月25日）

**问题：**如何向最新存储库添加新的适配器？

**答案：**参见[向最新存储库添加新适配器](https://github.com/ioBroker/ioBroker.repositories#add-a-new-adapter-to-the-latest-repository)<br> （2020年11月25日）

### 适配器测试和错误报告
#### 紧凑模式
**问题：**如何测试紧凑模式？

**答案：** 请参阅 [紧凑模式测试](https://forum.iobroker.net/topic/32789/anleitung-f%C3%BCr-adapter-entwickler-compact-mode-testen)（德语）<br> （2020年11月25日）

#### 哨兵
**问题：**如何将 Sentry 添加到我的适配器中？

**答案：**参见[哨兵自述文件](https://github.com/ioBroker/plugin-sentry#readme)<br> （2020年11月25日）

### 适配器配置界面 (admin/index_m.html)
#### 输入验证
**问题：** 我想使用核心适配器方法以及 Node.js 适配器代码中的类/方法来验证适配器配置中的字段。验证应该在用户点击适配器配置中的“保存”按钮后进行，届时将调用 `save()` 或 `admin/index_m.html` 中的 §§SSSSS_0§§ 方法。

**答案：** 您可以使用 `sendTo()` 方法将变量 `obj` 从 `admin/index_m.html` 发送到适配器代码，在那里验证内容，然后通过回调将结果提供给 `sendTo()` 或 `admin/index_m.html`。<br>例如：这在适配器[飞行计划](https://github.com/gaudes/ioBroker.fahrplan)中实现。<br>注意：您可能需要更改 `io-package.json`，例如 [ioBroker-论坛：sendTo() 功能不存在](https://forum.iobroker.net/topic/5205/gel%C3%B6st-sendto-in-eigenem-adapter-funktioniert-nicht/)<br> （2020年11月24日）

### 适配器功能
#### 写入文件
**问题：** 适配器应该能够使用 axios 下载文件并将其写入 iobroker-data/files/<adapter> 目录。

**答案：** 以下是实现此操作的一小段代码：

```
const WebCall = await axios.get(url,{responseType: "arraybuffer"});
await Helper.Adapter.writeFileAsync(Helper.Adapter.namespace, `picture.jpg`, WebCall.data)
```

之后，ioBroker 日志中出现了一条警告信息：<br> `writeFile will not write this file (picture.jpg) in future versions: <adapter> is not an object of type "meta"`<br> io-package.json 文件中必须在 instanceObjects 中包含 meta.user 对象：<br>

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

有关文件存储、元对象和备份行为的详细信息，请参阅[文件存储文档](filestorage.md)。<br> （2020年12月9日）