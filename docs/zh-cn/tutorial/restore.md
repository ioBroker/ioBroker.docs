---
title: 执行ioBroker还原
lastChanged: 03.12.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/tutorial/restore.md
hash: 8fjKIZWSUsLvGl5MCIEitH5NfubgyMAmGcgUPK34OLg=
---
＃基础
如何在Linux系统上正确还原ioBroker安装？

###前言：
由于某些用户发现还原非常困难，因此在崩溃或硬件更改，系统更改或进行其他操作之后，进行还原的分步指南应对此有所帮助。

基本上，可以事先说一件事：如果正确完成还原，则可以在几分钟内完成还原，而无需担心。

最后，所有数据都可以再次使用，并且已经建立了一个新系统。

###准备：
可执行的ioBroker安装对于准备工作至关重要。

有两种方法可以做到这一点。
可以从[下载区](https://www.iobroker.net/#de/download)中获取完成的映像，然后根据此[说明](https://www.iobroker.net/#de/documentation/install/linux.md)设置自己的Linux操作系统并安装ioBroker。

###下一步
如果旧系统已在Redis中保存了状态和/或对象，则新系统必须首先配备Redis服务器。

如果不确定是否使用Redis并仍然存在对旧系统的访问权限，则使用`iobroker status`命令获取所需的信息。

```
iobroker is running on this host.

At least one iobroker host is running.

Objects type: redis
States  type: redis
```

如果对象类型和/或状态类型显示为“ redis”，则必须在新系统上安装Redis服务器。
如果两种类型都有“文件”，则不需要Redis服务器。

如果您无法再访问旧系统，并且不知道在那儿究竟配置了什么，请提前安装Redis服务器。

#### Redis已安装：
为此，请通过腻子转到终端并执行以下命令：

```
sudo apt-get update
sudo apt-get install redis-server
sudo usermod -a -G redis iobroker
sudo reboot now
```

如果系统上的所有权限都不适合某处，则下一步是运行安装程序修复程序。
此步骤仅是建议，并非绝对必要。

```
curl -sL https://iobroker.net/fix.sh | bash –
```

使用小型工具“ htop”，您可以很好地看到所有正在运行的进程，这不仅对还原很有趣，而且通常很有用。
安装如下：

在控制台中运行以下命令：

```
sudo apt-get install htop
```

完成此操作后，可能会发生实际还原。

###恢复：
这里也有两个选择：

#### ** 1。通过备份自动还原**
由于这里不需要Linux知识，并且不需要通过Iobroker Web界面进行整个操作，因此首先使用[BackItUp中](https://github.com/simatec/ioBroker.backitup/blob/master/README.md)来执行自动还原的变体。

为此，必须安装适配器Backitup。
这是通过“适配器”选项卡完成的。在此处搜索备份，然后使用（+）安装实例。

安装完成后，可以在路径/ opt / iobroker / backups中使用FileZilla或WinSCP等sftp程序将旧系统创建的“ ioBroker Backup”保存在新系统上。

Backitup也可以从NAS，Dropbox或Google云端硬盘还原，但是本地变体出现问题的机会最少。

如果您已经具有安装NAS的经验，也可以使用它，特别是因为您可以直接访问旧安装的现有目录。
但是，本教程涉及本地保存的备份。

如果已成功保存ioBroker Backup，则现在将打开Backitup并打开“还原”选项卡。
将“备份源”设置为本地，然后保存。

![还原标签](../../de/tutorial/media/restore/1575301096581-restoretab.jpg)

如果还原后应自动启动所有实例，则必须激活然后保存“还原后启动所有适配器”选项。
如果要在另一台主机上还原备份，则不应使用此选项，因为在启动各个实例之前可能必须调整IP地址。

保存后，可以使用“获取备份”按钮在本地路径上调用现有备份。

刚通过FTP复制的备份应出现在“ iobroker”下的列表中。
现在选择这个。

![选择备份](../../de/tutorial/media/restore/1575301146928-restoreliste.jpg)

选择后，将显示一条消息，指示iobroker已停止进行还原，然后再次启动。

![开始还原](../../de/tutorial/media/restore/1575301175231-restorestart.jpg)

在这里，您已经开始了实际的恢复过程。

![还原正在进行中](../../de/tutorial/media/restore/1575301208033-restore.jpg)

现在，将在浏览器中打开另一个选项卡，您可以在其中按照Backitup的WebUI中的控制台执行恢复过程。

![restoreWebUI.JPG](../../de/tutorial/media/restore/restorewebui.jpg)

成功完成还原后，您还将在还原的WebUi中收到消息。

![restoreWebUI_finish.JPG](../../de/tutorial/media/restore/restorewebui_finish.jpg)

恢复可能需要一些时间，具体取决于系统的性能和旧ioBroker安装的大小。
通常，还原应在大约10-15分钟后完成，并且ioBroker应该自动重新启动。

![恢复完成](../../de/tutorial/media/restore/1575301228008-restorefinish.jpg)

在极少数情况下，还原后ioBroker不会自动启动。
在这种情况下，您可以通过控制台使用以下命令手动启动iobroker。

```
iobroker start
```

现在，ioBroker应该再次启动，并且在“日志”选项卡中，您可以看到npm正在重新安装旧系统上安装的所有适配器。

现在，需要稍加耐心，并且可以轻松完成iobroker。
在实例中，您可以看到逐渐安装了哪些适配器。
仍在安装或处于保留状态的所有适配器在实例中都没有图标。
请不要重新启动ioBroker，至多不时使用F5刷新视图，直到所有实例都带有图标为止。

根据安装的大小以及计算机和Internet连接的速度，这可能很容易花费2-3个小时。

恭喜，新安装的系统现已完成，其中包含所有设置，脚本，可视化等。

使用Backitup，现在可以还原更多数据，前提是已在旧系统上预先备份了该数据。
您可以使用与上述相同的步骤还原Redis数据库，Zigbee数据库，mySql数据库和历史记录数据。

在示例中，检索到的备份的列表将如下所示。

![完整清单](../../de/tutorial/media/restore/1575362131512-fullliste.jpg)

*****************************************************************************************************************************************

#### ** 2。使用终端命令手动还原**
首先，必须通过腻子或类似方法发出一些命令。

首先，必须创建一个备份文件夹：

```
sudo mkdir /opt/iobroker/backups
```

这里也是sftp程序，例如FileZilla或WinSCP是在旧系统上创建的备份，可能还包括Redis备份，zigbee备份等。
存储在/ opt / iobroker / backups文件夹中。

如果状态和对象存储在Redis数据库中，则应首先在此处还原备份的Redis数据库。
如果只有州在Redis的领导下进行，则不必一定要提前。

完成此操作后，请按照以下步骤停止ioBroker：

```
iobroker stop
```

之后，请使用以下命令检查是否一切都已停止：

```
iobroker status
```

如果所有输出均正确并且iobroker已停止，则现在可以使用以下命令通过控制台执行还原：

```
cd /opt/iobroker
iobroker restore <Dateiname eures Backups>
```

！> **使用此方法只能还原ioBroker备份，这一点非常重要。
无法使用此命令**创建Redis备份，Zigbee备份，mySql备份或历史记录数据。

为此需要Backitup，因为这些是专门使用Backitup创建的。

根据系统的不同，现在可能要花几分钟。进度显示在终端中。
还原完成后，使用以下命令重新启动ioBroker：

```
iobroker start
```

同样，ioBroker通过npm单独重新安装了所有适配器。
这可能需要一段时间，具体取决于安装大小，互联网速度和系统性能。
可以在“日志”选项卡中跟踪当前状态。

现在已完成，新安装了系统，并还原了所有设置，脚本，可视化文件等。

结论：
基本上，两个变体都会导致相同的结果。
如果您几乎没有使用终端命令的经验，并且在那儿感到不安全，则Backitup是安全的方面。

但是，如果要准确查看系统上正在发生的情况，则应通过控制台选择手动变量。在这里，您可以在终端中详细查看每个进程。