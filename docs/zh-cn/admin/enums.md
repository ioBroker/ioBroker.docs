---
title: 枚举
lastChanged: 10.05.2021
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/enums.md
hash: 5LCK8RCA84PxnY0TduRY5974VRbvoURNcBCWsXe4xEc=
---
收藏夹、交易和房间都在此处列出。如果有 HomeMatic 安装，则采用其中包含的列表。
例如，您还可以创建自己的枚举，然后可以在脚本中使用这些枚举。

![平铺视图中的枚举](../../de/admin/media/ADMIN_Aufzaehlungen_kachel.png)

标题栏中的第一个图标可用于切换到列表视图。此视图用于以下情况：

![列表视图中的枚举](../../de/admin/media/ADMIN_Aufzaehlungen_liste_numbers.png)

## 标题行
标题栏包含最重要进程的图标。每个图标都有上下文帮助。只需将鼠标放在图标上一会儿。

### 1 - 切换视图
此按钮可用于在平铺视图和列表视图之间切换（切换功能）

### 2 - 创建一个新的枚举
此按钮创建一个新列表。将为此目的打开一个新窗口

![创建一个新的枚举](../../de/admin/media/ADMIN_Aufzaehlungen_liste_erstellen.png)

**姓**

在此处输入所需的枚举名称。或者，也可以将此列表的图标拖放到此字段中。

**保留身份证**

创建新枚举时默认取消选中此复选框，因为此处创建了新 ID。

在现有枚举的编辑模式（见下文）中，可以在不更改 ID 的情况下更改名称。

**预览**

枚举的完整 ID 显示在此处。

**颜色**

此时，可以选择要标记枚举的颜色。

在平铺视图中，平铺以这种颜色着色，在列表视图中，带有枚举名称的行以这种颜色加下划线。

### 3 - 创建新类别
使用此按钮，以与枚举相同的方式创建新类别（例如功能/房间等）。

### 4 - 编辑
可以使用此按钮管理枚举的数据点。
首先，通过鼠标单击标记所需的枚举，然后激活编辑模式。

屏幕现在一分为二：

![编辑枚举](../../de/admin/media/ADMIN_Aufzaehlungen_liste_hinzufuegen.png)

右半部分的结构对应于[对象页面][]的结构。

只需拖动即可将数据点从右侧拖动到左侧所需的枚举。

使用垃圾桶图标删除列表中的数据点。

[Objekte-Seite]: https://www.iobroker.net/#de/documentation/admin/objects.md