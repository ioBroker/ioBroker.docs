---
title: 枚举
lastChanged: 10.05.2021
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/enums.md
hash: YnndBRm2DXksgY6BJgZQ8FZZrKWnc5B4a4TWESq/mWk=
---
此处列出了收藏夹、交易和房间。如果有 HomeMatic 安装，则将采用其中包含的列表。
例如，您还可以创建自己的列表，然后可以在脚本中使用该列表。

![平铺视图中的列表](../../de/admin/media/ADMIN_Aufzaehlungen_kachel.png)

您可以使用标题栏中的第一个图标切换到列表视图。该视图用于以下情况：

![列表视图中的项目符号](../../de/admin/media/ADMIN_Aufzaehlungen_liste_numbers.png)

## 标题行
标题栏中有最重要进程的图标。每个图标都有上下文帮助。为此，只需将鼠标放在图标上一段时间即可。

### 1 - 切换视图
该按钮可用于在平铺视图和列表视图之间切换（切换功能）

### 2 - 创建新枚举
此按钮创建一个新列表。将打开一个新窗口

![创建新枚举](../../de/admin/media/ADMIN_Aufzaehlungen_liste_erstellen.png)

**姓名**

此处输入所需的枚举名称。或者，也可以将该列表的图标拖放到该字段中。

**保留身份证件**

创建新列表时，默认情况下会取消选中此复选框，因为此处会创建新 ID。

在现有列表的编辑模式（见下文）中，可以更改名称而不更改 ID。

**预览**

此处显示枚举的完整 ID。

**颜色**

此时，您可以选择用于标记列表的颜色。

在图块视图中，图块以此颜色着色；在列表视图中，包含列表名称的行以该颜色加下划线。

### 3 - 创建新类别
此按钮创建一个类似于列表的新类别（例如功能/房间等）。

### 4 - 编辑
可以使用此按钮管理列表的数据点。
首先，用鼠标单击标记所需的列表，然后激活编辑模式。

屏幕现在将分为两部分：

![编辑枚举](../../de/admin/media/ADMIN_Aufzaehlungen_liste_hinzufuegen.png)

右半部分的结构与[对象页面][]的结构相对应。

只需拖动即可将数据点从右侧拖至左侧所需的枚举。

使用垃圾桶图标删除列表中的数据点。

[Objekte-Seite]: https://www.iobroker.net/#de/documentation/admin/objects.md