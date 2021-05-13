---
title: 枚举
lastChanged: 10.05.2021
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/enums.md
hash: YnndBRm2DXksgY6BJgZQ8FZZrKWnc5B4a4TWESq/mWk=
---
这里列出了我的最爱，行业和房间。如果安装了HomeMatic，则会采用其中包含的列表。
您还可以创建自己的列表，然后将其用于脚本中。

![磁贴视图中的列表](../../de/admin/media/ADMIN_Aufzaehlungen_kachel.png)

您可以使用标题栏中的第一个图标切换到列表视图。该视图用于以下方面：

![列表视图中的列表](../../de/admin/media/ADMIN_Aufzaehlungen_liste_numbers.png)

##标题行
标题行中有最重要过程的图标。每个图标都有上下文帮助。为此，只需将鼠标放在图标上一会儿即可。

### 1-切换视图
此按钮可用于在图块视图和列表视图之间切换（切换功能）

### 2-创建一个新列表
使用此按钮创建一个新列表。为此将打开一个新窗口

![建立新清单](../../de/admin/media/ADMIN_Aufzaehlungen_liste_erstellen.png)

**姓**

在此输入所需的列表名称。 （可选）也可以将该列表的图标拖放到该字段中。

**保留ID **

创建新列表时，默认情况下会取消选中此复选框，因为此处会创建一个新ID。

在现有列表的编辑模式（请参见下文）中，可以更改名称而无需更改ID。

**预习**

枚举的完整ID在此处显示。

**颜色**

此时，可以选择一种颜色来标记列表。

在图块视图中，图块以这种颜色着色，在列表视图中，带有枚举名称的行在此颜色下划线。

### 3-创建一个新类别
使用此按钮，类似于列表，将创建一个新类别（例如功能/房间等）。

### 4-编辑
枚举的数据点可以通过此按钮进行管理。
首先，用鼠标单击标记所需的列表，然后激活编辑模式。

屏幕现在分为两部分：

![编辑清单](../../de/admin/media/ADMIN_Aufzaehlungen_liste_hinzufuegen.png)

右半部分的结构与[对象页面] []的结构相对应。

只需将数据点拖动，就可以将它们从右侧拖到左侧的所需枚举中。

使用垃圾箱图标删除列表中的数据点。

[Objekte-Seite]: https://www.iobroker.net/#de/documentation/admin/objects.md