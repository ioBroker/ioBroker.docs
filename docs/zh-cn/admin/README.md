---
title: 行政
lastChanged: 14.05.2021
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/README.md
hash: 8QIadDWLLIIZKQI36XihWSBAgZURM6srhXzxg/rnSH0=
---
＃管理界面
！> **由于文档的范围，这仅是概述；在通过各节标题链接至选项卡的页面上提供了详细信息。请单击标题。**

Adapter Admin用于操作整个ioBroker安装。
他提供了一个Web界面。这在“`<IP-Adresse des Servers>:8081`”下调用。

该适配器是在安装ioBroker时直接创建的-无需手动安装

![平铺视图中的管理员](../../de/admin/media/ADMIN_Adapter_Kachel.png)

可以通过适配器提供的GUI调用以下功能以及其他功能：

*输入系统范围的设置
*安装更多的适配器和实例
*访问实例的配置
*访问属性概述
*访问对象的状态概述
*访问用户和组的管理
*访问日志文件
*主机管理

适配器视图分为三个区域：

1-[菜单栏](#menüleiste)

2-[主视窗](#das-hauptfenster)

3-[系统设置](#systemeinstellungen)

![管理员的结构](../../de/admin/media/ADMIN_Screen_numbers.png)

＃＃ 菜单栏
菜单栏包含几个菜单项。在基本安装中，这些点如图所示。安装其他适配器后，可以使用左上角的三角形图标（1）激活或禁用其他点，以便更好地查看。

![菜单项](../../de/admin/media/ADMIN_Screen01_menuitems_numbers.png)

带有选项卡的菜单栏可以通过** X **（2）隐藏，以便在移动设备上创建更多空间。

![菜单已折叠](../../de/admin/media/ADMIN_Screen01_menucollapsed.png)

菜单栏可以通过“汉堡图标”再次显示

##主窗口
主窗口显示属于所选菜单项的内容。

通过标题链接的页面上提供了有关此内容的详细信息。

[概述](https://www.iobroker.net/#de/documentation/admin/overview.md)此处显示具有自己的Web界面以及有关主机的所有页面。

[适配器](https://www.iobroker.net/#de/documentation/admin/adapter.md)此处显示和管理可用和已安装的适配器。

[实例数](https://www.iobroker.net/#de/documentation/admin/instances.md)此处列出了已经安装在“适配器”选项卡上的实例，可以对其进行相应配置。

[对象](https://www.iobroker.net/#de/documentation/admin/objects.md)通过适配器集成的设备的管理对象，结构和数据点。可以在此处创建和删除对象。可以使用“向上箭头”和“向下箭头”按钮上载或下载整个对象结构。

如果值以红色显示，则表示接收者尚未确认它们（ack = false）。

[枚举](https://www.iobroker.net/#de/documentation/admin/enums.md)这里列出了Homematic-CCU的收藏夹，交易和房间。

[日志](https://www.iobroker.net/#de/documentation/admin/log.md)此处显示日志

在“实例”选项卡中，可以为各个实例设置要记录的日志级别。在选择菜单中选择要显示的最小日志级别。如果发生错误，选项卡上的标签将显示为红色。

[大事记](https://www.iobroker.net/#de/documentation/admin/events.md)当前状态更新的列表。

[用户](https://www.iobroker.net/#de/documentation/admin/users.md)可以在此处创建用户并将其添加到现有组。

[剧本](scripts.md)§如果安装了Java脚本适配器，则可以在此页面上使用javascript，blockly或typescript创建自己的脚本。

[主持人](https://www.iobroker.net/#de/documentation/admin/hosts.md)有关安装ioBroker的计算机的信息。如果有新版本可用，则会在菜单栏中的此条目中显示一条消息。

＃＃ 系统设置
在此处打开的菜单中，进行了[系统设置](https://www.iobroker.net/#de/documentation/admin/settings.md)之类的操作，例如语言，时间和日期格式以及其他系统范围的设置。

还可以在此处设置存储库和安全设置。

[Übersicht]: https://www.iobroker.net/#de/documentation/admin/overview.md

[Adapter]: https://www.iobroker.net/#de/documentation/admin/adapter.md

[Instanzen]: https://www.iobroker.net/#de/documentation/admin/instances.md

[Objekte]: https://www.iobroker.net/#de/documentation/admin/objects.md

[Aufzählungen]: https://www.iobroker.net/#de/documentation/admin/enums.md

[Log]: https://www.iobroker.net/#de/documentation/admin/log.md

[Ereignisse]: https://www.iobroker.net/#de/documentation/admin/events.md

[Benutzer]: https://www.iobroker.net/#de/documentation/admin/users.md

[Hosts]: https://www.iobroker.net/#de/documentation/admin/hosts.md

[Systemeinstellungen]: https://www.iobroker.net/#de/documentation/admin/settings.md