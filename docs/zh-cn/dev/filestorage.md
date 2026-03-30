---
title: ioBroker适配器中的文件存储
lastChanged: 2025.01.13
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/filestorage.md
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: rZYjLZtcHGKr6b3Inzs9lQOkBV/1tGuWm7X2ieFLbuo=
---
# IoBroker 适配器中的文件存储
本文档解释了如何使用 `writeFileAsync` 将文件正确存储在 ioBroker 数据库中。它基于开发者的讨论，但采用**中立的文档风格**编写，并附有示例。

---

＃＃ 概述
ioBroker 适配器可以将文件存储在内部数据库中。要正确实现这一点，您需要定义**元对象**，它们充当存储命名空间。元对象的选择决定了文件是否包含在备份中。

---

## 元对象
元对象主要有两种类型：

- **`meta`**
- 此处存储的文件**不包含在备份中**。
- 适用于临时数据或可再生数据。

- **`meta.user`**
- 此处存储的文件**包含在备份中**。
- 适用于持久性用户数据，例如密钥、配置文件或上传的内容。

元对象的作用类似于文件的**挂载点**。

`writeFileAsync` 命令随后会根据此基本路径写入数据。

---

## 定义元对象
写入文件之前，请先创建元对象。例如：

```json
{
  "_id": "keys",
  "type": "meta",
  "common": {
    "name": "keys",
    "role": "meta.user"
  },
  "native": {}
}
```

这里：

- `_id`：定义存储命名空间（在本例中为 `keys`）。
- `type: "meta"`: 存储对象必需。
- `role: "meta.user"`: 确保数据包含在备份中。

---

## 写入文件
一旦元对象存在，就可以使用`writeFileAsync`写入文件。

### 示例：编写私钥
```js
// Store private key in namespace "adapter.namespace.keys"
await adapter.writeFileAsync(
  `${adapter.namespace}.keys`,    // meta object mount point
  'private-key.pem',              // relative file path
  keys.privateKey                 // file content
);
```

### 示例：写入临时文件
```js
// Store temporary data in namespace "adapter.namespace.temp"
await adapter.writeFileAsync(
  `${adapter.namespace}.temp`,    // meta object mount point
  'cache.json',                   // relative file path
  JSON.stringify(cacheData)       // file content
);
```

---

## 实用笔记
- 如果没有 meta 对象，`writeFileAsync` 将失败。
- 始终在 `meta` 和 `meta.user` 之间做出选择：
- 如果内容可以重新生成且不应备份，请使用**`meta`**。
- 对于必须在备份后仍然存在的持久性用户相关文件，请使用 **`meta.user`**。
- `writeFileAsync` 中的第一个参数是元对象（存储命名空间）。
- **第二个参数**是相对于该命名空间的路径。

---

## 来自 ioBroker Sayit 的示例
[Sayit适配器](https://github.com/ioBroker/ioBroker.sayit) 在其 `io-package.json` 中定义了两个存储命名空间：

1. `adapter.namespace`（临时存储，未备份）
2. `meta.user` 存储（持久化，已备份）

这种模式允许适配器将临时生成的文件与用户提供的内容分开。

---

＃＃ 概括
- 使用**元对象**在ioBroker中定义存储命名空间。
- 在以下选项中选择：
- `meta` → 临时，不包含在备份中。
- `meta.user` → 持久化，包含在备份中。
- 将元对象视为**挂载点**。
- 始终通过：
- **第一个参数** = 命名空间（例如，`adapter.namespace.keys`）。
- **第二个参数** = 相对文件路径。

正确使用可确保文件可靠存储，并在需要时包含在备份中。