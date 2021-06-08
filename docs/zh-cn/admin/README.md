---
title: 行政
lastChanged: 14.05.2021
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/README.md
hash: 5er2O4sYaQKEffMa00REXFvb4Dq6YvMu/Fh8S9B1Ln0=
---
# 管理界面
!> ** 由于文档的范围，这只是一个概述；详细信息在通过章节标题链接到选项卡的页面上提供。请点击标题。**

Adapter Admin 用于操作整个 ioBroker 安装。
他提供了一个网络界面。这在 ``<IP-Adresse des Servers>:8081`` 下调用。

这个适配器是在ioBroker安装的时候直接创建的——不需要手动安装

![磁贴视图中的管理员](../../de/admin/media/ADMIN_Adapter_Kachel.png)

可以通过适配器提供的 GUI 访问以下功能：

* 进入系统范围的设置
* 安装更多的适配器和实例
* 访问实例的配置
*访问属性概述
* 访问对象的状态概览
*访问用户和组的管理
* 访问日志文件
* 主机管理

适配器视图分为三个区域：

1 - [菜单栏](#menüleiste)

2 - [主窗口](#das-hauptfenster)

3 - [系统设置](#systemeinstellungen)

![管理员结构](../../de/admin/media/ADMIN_Screen_numbers.png)

＃＃ 菜单栏
菜单栏包含多个菜单项。在基本安装中，这些点的显示如图所示。安装附加适配器后，可以使用左上角的三角形图标 (1) 激活或停用附加点以获得更好的概览。

![菜单项](../../de/admin/media/ADMIN_Screen01_menuitems_numbers.png)

带有选项卡的菜单栏可以通过 **X** (2) 隐藏，以便在移动设备上创建更多空间。

![菜单折叠](../../de/admin/media/ADMIN_Screen01_menucollapsed.png)

菜单栏可以通过“汉堡图标”再次显示

##主窗口
主窗口显示属于所选菜单项的内容。

有关此内容的详细信息可在通过标题链接的页面上找到。

[概述](https://www.iobroker.net/#de/documentation/admin/overview.md) 此处显示所有带有自己的 Web 界面和主机信息的页面。

[适配器](https://www.iobroker.net/#de/documentation/admin/adapter.md) 可用和已安装的适配器在此处显示和管理。

[实例](https://www.iobroker.net/#de/documentation/admin/instances.md) 此处列出了已安装在“适配器”选项卡上的实例，并且可以进行相应的配置。

[对象](https://www.iobroker.net/#de/documentation/admin/objects.md) 通过适配器集成的设备的管理对象结构和数据点。可以在此处创建和删除对象。可以使用“向上箭头”和“向下箭头”按钮上传或下载整个对象结构。

如果值显示为红色，则它们尚未被接收者确认（ack = false）。

[枚举](https://www.iobroker.net/#de/documentation/admin/enums.md) 此处列出了 Homematic-CCU 的收藏夹、交易和房间。

[日志](https://www.iobroker.net/#de/documentation/admin/log.md) 日志显示在这里

在 Instances 选项卡中，可以为各个实例设置要记录的日志级别。在选择菜单中选择要显示的最低日志级别。如果发生错误，选项卡上的标签显示为红色。

[活动](https://www.iobroker.net/#de/documentation/admin/events.md) 当前状态更新列表。

[用户](https://www.iobroker.net/#de/documentation/admin/users.md) 在这里可以创建用户并将其添加到现有组中。

[脚本](scripts.md) 如果安装了 Java 脚本适配器，您可以在此页面上使用 javascript、blockly 或 typescript 创建自己的脚本。

[主机](https://www.iobroker.net/#de/documentation/admin/hosts.md) 有关安装 ioBroker 的计算机的信息。如果有新版本可用，菜单栏中的此条目中会显示一条消息。

＃＃ 系统设置
在此处打开的菜单中，进行了[系统设置](https://www.iobroker.net/#de/documentation/admin/settings.md) 诸如语言、时间和日期格式以及其他系统范围的设置。

也可以在此处设置存储库和安全设置。

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