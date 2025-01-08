---
title: 视觉系统
lastChanged: 04.11.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/viz/vis.md
hash: IOurisSrCf2GXRIDs/bHt7/nnV+lzS1EcU3sfyw6FtY=
---
?> ***此页面目前正在修订中。***。<br><br>帮助 ioBroker 并扩展本文。请注意[ioBroker 风格指南](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md)，以便更轻松地应用更改。

**使用 VIS 进行可视化**

VIS 是 ioBroker 的主要可视化工具，为可视化智能家居提供了广泛的选项。

＃＃ 配置
VIS 需要 WEB 适配器，该适配器在安装 VIS 时自动安装。除了输入可以在 https://iobroker.net/ 获取的许可证之外，无需进一步配置。该许可证免费供私人使用。<br> VIS实例只能有一个。

＃＃ 服务
安装后，可通过`<IPdesServers>:8082/vis/index.html`或管理适配器实例选项卡中的超链接访问该适配器，并显示可视化效果。

当您第一次打开它时，会自动创建一个 DemoView。

一个项目中有多个视图。
每个视图上可以自由放置多个小部件，用于显示或操作。可视化是使用编辑器创建和配置的。
通过 `<IPdesServers>:8082/vis/edit.html` 调用编辑器。
使用关闭窗口图标（右上角的 (x)）关闭编辑器后，最后编辑的视图将显示在功能视图中。
可以随时通过`<IPdesServers>:8082/vis/index.html#ViewName`访问该编辑器分为不同的区域。

![](../../de/viz/media/vis_ioBroker_vis_Editor_002-300x165.jpg)

* * *

## 头部区域的选项卡 (1)
### 观看次数
如果选择此选项卡，您可以从下面的下拉菜单中的现有视图中选择要编辑的视图。
![](../../de/viz/media/iobroker_vis_Editor_Widgets_Header.jpg)

右侧的四个图标是不言自明的，并引用视图。
单击工作区后，右侧属性侧栏中的视图将切换到“视图”选项卡并显示视图的设置。

### 小部件
如果激活“小部件”选项卡，下面的工具栏会发生变化![](../../de/viz/media/iobroker_vis_Editor_Views_Header.jpg)

出现小部件编辑工具。

#### 下拉菜单
您可以在此处选择要编辑的小部件，或者在此处显示所选的小部件。

#### 图标栏
当选择小部件时，删除、复制和信息三个图标将变为活动状态。

#### 对齐小部件
![](../../de/viz/media/iobroker_vis_Editor_Widgets_Ausrichten_Header.JPG)

如果您通过按住鼠标按钮（或按住 Ctrl 键单击）来选择多个小部件，则可以使用这些图标来对齐组（左对齐、右对齐、上对齐、下对齐、居中、垂直对齐）中间）。
您还可以将多个小部件放置在相同的距离（水平和垂直），并使用最后两个图标来调整多个小部件的大小。
如果您选择一个小部件，右侧属性侧栏中的视图将切换到“小部件”选项卡并显示该小部件的设置。
通过可能的多重选择，您可以通过右侧边栏同时更改多个小部件的属性。

#### 所有小部件
这两个小部件使编辑视图变得更加容易。
第一个确保小部件值不更新，第二个防止小部件被移动。

#### 导出小部件
如果某个小部件已激活，您可以使用此按钮导出该小部件的 CSS 代码。

#### 导入小部件
相反，您可以导入 vis 中未包含的小部件。
单击小部件后，右侧属性侧栏中的视图将切换到“小部件”选项卡，并显示所选小部件的设置。

＃＃＃工具
如果激活“工具”选项卡，下面的工具栏会发生变化![](../../de/viz/media/iobroker_vis_Editor_Tools_Header.JPG)

＃＃＃＃ 解决
此处显示了移动设备的许多预设屏幕分辨率，但还有一个“用户定义”项目，可以让您进行自己的设置。
如果您在此处选择某些内容，则会在工作区上绘制与所选屏幕分辨率相对应的框架。

＃＃＃＃ 默认
如果选中_default_，则如果 VIS 视图以上面设置的分辨率加载，则活动视图将成为默认视图并加载。
**示例：** 选择_iPad 肖像_ 显示并在_开始_ 视图中选中_默认_ 框。假设已从 iPad 上的项目中以横向格式加载名为 _Weather_ 的视图。如果 iPad 现在变成纵向格式，则之前设置为该分辨率（纵向格式）的标准（_默认_）的_开始_视图将自动显示。
对于移动设备，可以通过移动进行控制（例如“返回主菜单”或_up_显示与_quer_不同的视图）。

＃＃＃＃ 网格
这里有_inactive_、_Elements_ 和_Raster_ 选项。如果您选择元素，则当您使用鼠标移动时，小部件会捕捉到相邻元素。使用网格，您还可以指定小部件捕捉到的网格尺寸（以像素为单位）。

#### 实例 ID
此处显示唯一的 ID，例如，可以使用 VIS [控制命令](https://github.com/iobroker/ioBroker.vis/blob/master/README.md#control-interface) 通过脚本对其进行寻址。

#### 浏览器 ID
如果单击此按钮，将在之前的字段中创建一个新 ID。这意味着每个设备上的每个浏览器都可以被单独识别。

＃＃＃＃ 出口
您可以在此处导出视图，例如在其他安装中使用它。单击该按钮时，将打开一个窗口，其中以文本形式提供视图。可以使用 Ctrl-C 将该数据放置在剪贴板中并加载到编辑器中，然后保存

＃＃＃＃ 进口
单击后，将打开一个空窗口。您可以在此处复制使用 _export_ 函数获得的文本文件。然后在左下角输入视图的名称，然后单击_导入_按钮。从那时起，新的视图就可用了。此功能适合从论坛导入示例。

＃＃＃ 设置
![](../../de/viz/media/iobroker_vis_Editor_Setup_Header.gif)

＃＃＃＃ 主题
您可以在此处为编辑器选择配色方案。

＃＃＃＃ 语言
可以指定编辑器的操作语言

#### 项目
项目是 [意见](http://www.iobroker.net/?page_id=1193&lang=de) 的集合。
默认情况下，项目_main_已创建并通过`<IPdesServers>:8082/vis/index.html#ViewName`调用。
项目文件位于 ioBroker 安装中的`_ioBroker-Ordner_/iobroker-data/files/vis.0/main` 文件夹中。

#### 项目导出/导入
项目可以作为一个整体导出（例如，与其他用户共享）：创建一个 zip 文件，其中包含所使用的图像、样式表 vis-user.css 和实际定义 vis-views.json。
还可以选择匿名导出项目。 :construction：要导入其他项目，只需将上述导出的 zip 文件拖到窗口上，然后输入新项目的名称：![](../../de/viz/media/iobroker_vis_Editor_Setup_Projekt_ImportHeader.gif)

#### 新项目...
可以在这里创建一个新项目。
将打开一个窗口并询问项目名称。
确认后，编辑器将在以下地址加载新项目：`<IPdesServers>:8082/vis/_projektname_/index.html#ViewName.` 新项目的文件位于`_ioBroker-Ordner_/iobroker-data/files/vis.0/projektname`下的ioBroker安装中。
**提示**：您可以复制项目文件夹并在 VIS 编辑器`<IPdesServers>:8082/vis/_projektname_duplikat_/index.html`中编辑副本。

＃＃＃＃ 应用
加载项目时，该[项目] :construction: (http://www.iobroker.net/?page_id=1193&lang=de) 的所有[视图] :construction: (http://www.iobroker.net/?page_id=1193&lang=de) page_id =188&lang=de&preview_id=188&preview_nonce=d845a20ee2&preview=true#项目）。
有时这没有意义并且会减慢系统速度。
因此，属于同一组的视图可以在不同的项目中组合在一起。
例如，将具有不同屏幕分辨率的设备分开是有意义的。
您可以创建一个_智能手机_项目并在其中创建针对触摸操作和垂直方向进行优化的视图。
通过故意减少小部件的数量，该项目的数据量仍然很小，因此即使您在移动时（例如通过 VPN 和手机）也能快速加载。
另一个项目_Wall Tablet_，仅显示在墙上的平板电脑上，不需要从_Smartphone _项目加载任何视图。
用于显示所有数据的主项目 _main_ 通常仅在桌面 PC 上显示和编辑。
数据量和计算速度通常在这里不起作用。
如果要在多个项目中使用视图，可以使用命令 [出口](http://www.iobroker.net/?page_id=188&lang=de&preview_id=188&preview_nonce=d845a20ee2&preview=true#exportieren) :construction:/ [进口](http://www.iobroker.net/?page_id=188&lang=de&preview_id=188&preview_nonce=d845a20ee2&preview=true#importieren) :construction: 复制它们。
通过导航小部件从一个项目链接到另一个项目是不可能的。
**提示**：在尝试 CSS 命令时创建一个测试项目也很有意义。

#### 文件管理器... (6)
选择此菜单项后，可以方便地将文件复制到ioBroker文件系统中或从ioBroker文件系统中复制出来，而无需额外的程序。
文件管理器打开：![对齐=“对齐中心”宽度=“799”](media/iobroker_vis_Editor_Setup_Dateimanager.JPG) [caption id="attachment_6007"align="aligncenter" width="799"][![](img/ioBroker_Adapter_Vis_Editor_Setup_filemanager.jpg)](../../de/viz/img/ioBroker_Adapter_Vis_Editor_Setup_filemanager.jpg) *图像仅为示例图像，版权归相关公司所有。[ /标题]

该行为与任何文件管理器类似。
您可以通过单击文件夹，使用蓝色的“向左箭头”按钮向上移动层次结构级别。
可以使用“文件夹+”图标创建新文件夹。
到达所需目录后，选择一个文件，然后可以使用蓝色箭头将其下载到您的计算机上。如果单击绿色箭头，“Dropbox”将会打开。
![](../../de/viz/media/iobroker_vis_Editor_Setup_Dateimanager_Dropbox.JPG) 文件只需通过拖放即可存储在此处，然后通过单击_**上传**_ 按钮将其上传到 ioBroker 服务器。
或者，您可以单击该区域的任意位置，然后将打开文件选择。
文件列表清空，如果您不想再上传任何文件，可以使用 **_Close_** 按钮离开 Dropbox。

#### 设置... (7)
![](../../de/viz/media/iobroker_vis_Editor_Setup_Projekteinstellungen.JPG)

* _**如果没有连接长于则重新加载：**_ 活动视图完全重新加载，

如果前端（平板）与服务器之间的连接中断时间超过预设时间。
为了防止这种情况，这个时间也可以设置为_**never**_。

* _**重新连接间隔：**_ 前端尝试重新连接的时间

到达服务器。

* _**黑暗的重新连接屏幕：**_ 通常，当尝试重新加载视图时，页面为白色。

为了避免在黑暗的房间中造成干扰，可以使用此复选框将屏幕切换为黑暗。

* _**从 RAM 中删除非活动视图：**_ 为了使用前端宝贵的 RAM，

为了省钱（通常只有 1GB，特别是在便宜的平板电脑上），可以从 RAM 中删除长时间不需要的视图。
然而，当再次加载相应的视图时，这需要更长的时间。
此选项设置未使用的视图应在 RAM 中保留的时间。

#### 对象浏览器... (8)
![](../../de/viz/media/iobroker-vis_ioBroker_Adapter_Vis_Editor_Setup_objectbrowser.jpg) 您可以在此处搜索对象。
单击_**选择**_按钮后，这将被放置在剪贴板上。
列标题上方的过滤字段可用于更快地查找信息。

### 帮助 (5)
_快捷键_下有关键命令的概述，_关于项目_下有简要信息。

### 撤消按钮 (6)
使用此按钮您可以逐步撤消最后的操作。

* * *

## 小部件侧边栏 (2)
它用于选择小部件。
小部件显示为图标，可以拖放到工作区中或使用_插入_按钮放置在工作区上的位置 0.0 处。
![](../../de/viz/media/vis_iobroker_vis_Editor_Widgets_sidebar.jpg)

_Insert_ 按钮下方的字段是过滤字段。
您可以在此处输入一个术语来搜索它的图标。
显示包含该术语的所有图标。
如果删除最后一个过滤器（或 \*），您将获得一个包含可能的搜索词的下拉列表。
下面是小部件集的选择字段。
星号 (*) 代表所有小组件集。
按术语过滤时，会自动搜索所有小部件集。
另外，下拉菜单还提供各种小部件集作为过滤器。

* * *

## 工作区 (3)
视图的小部件位于此处。这可以使用鼠标或箭头键来完成。
如果“小部件”选项卡处于活动状态，则还可以使用一些对齐帮助。

* * *

## 设置侧边栏 (4)
视图和小部件的所有设置都通过相应的选项卡在此处输入。
CSS 选项卡还为高级用户提供了集成自己开发的机会。

* 数据点分配
* 小部件大小
* 字体大小和颜色
* 背景
* 边框、线条颜色、样式、粗细
* CSS参数

为了查看数据点或执行操作，必须将数据点分配给小部件。
该条目可以在_General_ 部分中找到。