---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapter-dev-faq.md
title: 适配器开发常见问题
hash: xBifYSMkiSeEcOHVKuK3c1SR01Qr030mxrhtOv9htBA=
---
# 适配器开发常见问题
＃＃ 介绍
本页面的目的是收集有关 ioBroker 适配器开发的常见问题。
这个想法是由 Ralf 于 2020 年 11 月 24 日在 ioBroker #adapter Discord 频道与 Mic 的一个问题进行讨论时产生的。

## 请贡献（这真的很容易！）
您可以随意在本页面添加任何问题和答案。唯一的限制是：确保在答案中添加日期。无需完美主义，只需发布在适配器开发中对您有帮助的内容即可。也非常欢迎提供实现问题的适配器的链接。我们开发人员喜欢看到实现示例 :-)

*注意：*这不是一份官方文档。欢迎提供任何提示、解决方法、甚至更早的论坛帖子链接等。目的是快速支持和帮助开发人员解决常见的开发问题。如果您在这里用英语写作时遇到问题，请使用您的本地语言，如德语、俄语等，我们将很乐意提供帮助和翻译。

要更新目录，您可以使用 TOC 生成器，例如 [luciopaiva.com/markdown-toc](https://luciopaiva.com/markdown-toc/)

＃ 目录
- [适配器更新](#adapter-updates)
- [发布适配器更新](#publishing-adapter-updates)
- [适配器测试和错误报告](#adapter-testing-and-error-reporting)
- [紧凑模式](#compact-mode)
- [哨兵](#哨兵)
- [适配器配置 UI (admin/index_m.html)](#adapter-configuration-ui-adminindexmhtml)
- [输入验证](#input-validation)
- [适配器函数](#adapter-functions)
- [写入文件](#writing-files)

---

### 适配器更新
#### 发布适配器更新
**问题：**我需要在哪些文件中更改版本号？

**答案**基本上，您需要接触 3 个文件：

* `io-package.json`：更改版本号并添加最近的变更日志
* `package.json`：仅更改版本号
* `README.md`: 添加新版本号和变更日志

请注意，必须使用[语义版本控制](https://semver.org/)，请参阅 [版本控制](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning)。<br> （2020 年 11 月 25 日）

**问题：**我的适配器在最新的存储库中。我在 Github 上更新了适配器，并在 NPM 上发布了它。用户什么时候能在管理员中看到新版本？

**答案**：ioBroker 每天两次扫描任何版本变化。<br> （2020 年 11 月 25 日）

**问题**：如何将新适配器添加到最新的存储库？

**答案：**参见[将新适配器添加到最新存储库](https://github.com/ioBroker/ioBroker.repositories#add-a-new-adapter-to-the-latest-repository)<br> （2020 年 11 月 25 日）

### 适配器测试和错误报告
#### 紧凑模式
**问题**：我如何测试紧凑模式？

**答案**：参见[紧凑模式测试](https://forum.iobroker.net/topic/32789/anleitung-f%C3%BCr-adapter-entwickler-compact-mode-testen)（德语）<br> （2020 年 11 月 25 日）

哨兵
**问题**：如何将 Sentry 添加到我的适配器？

**答案：**参见[Sentry 自述文件](https://github.com/ioBroker/plugin-sentry#readme)<br> （2020 年 11 月 25 日）

### 适配器配置 UI (admin/index_m.html)
输入验证
**问题：**我想使用核心适配器方法以及 node.js 适配器代码的类/方法来验证适配器配置的字段。验证应在用户点击适配器配置中的“保存”后进行，然后调用 `admin/index_m.html` 的 `save()`。

**答案：**您可以使用`sendTo()` 方法将变量`obj` 从`admin/index_m.html` 发送到适配器代码，在那里验证内容，然后通过回调将结果提供给`admin/index_m.html` 的`sendTo()`。<br>示例：这是在适配器[法赫尔普兰](https://github.com/gaudes/ioBroker.fahrplan)中实现的。<br>注意：您可能需要更改您的`io-package.json`，例如参见[ioBroker-论坛：sendTo() 功能不存在](https://forum.iobroker.net/topic/5205/gel%C3%B6st-sendto-in-eigenem-adapter-funktioniert-nicht/)<br> （2020 年 11 月 24 日）

### 适配器功能
写入文件
**问题**：适配器应该使用 axios 下载文件，并能够将其写入 iobroker-data/files/<adapter>

**答案**：这是此操作的一小段代码片段：

```
const WebCall = await axios.get(url,{responseType: "arraybuffer"});
await Helper.Adapter.writeFileAsync(Helper.Adapter.namespace, `picture.jpg`, WebCall.data)
```

随后ioBroker日志中出现一条警告：<br> `writeFile will not write this file (picture.jpg) in future versions: <adapter> is not an object of type "meta"`<br>在 io-package.json 中，必须在 instanceObjects 中包含一个 meta.user 对象：<br>

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