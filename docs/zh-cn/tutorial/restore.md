---
title: 运行 ioBroker 还原
lastChanged: 03.12.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/tutorial/restore.md
hash: 9SyQw5gWCDpvFS0ksEa7NULgmuancyWYV7tkASkVhpg=
---
＃ 基本
在 Linux 系统上恢复 ioBroker 安装的正确方法是什么？

### 前言：
由于一些用户发现很难恢复，这里有在崩溃后或硬件更改、系统更改或其他后恢复的分步说明。

基本上，可以提前说一件事：如果做得正确，几分钟内就会完成恢复，没有人需要害怕它。

最后，所有数据再次可用，并建立了一个新系统。

＃＃＃ 准备：
一个可操作的 ioBroker 安装对于准备工作是绝对必要的。

有两种方法可以实现这一点。
从[下载区](https://www.iobroker.net/#de/download)获取完成的图像，设置您自己的 Linux 操作系统并在此[指示](https://www.iobroker.net/#de/documentation/install/linux.md)之后安装 ioBroker。

＃＃＃ 下一步
如果旧系统将状态和/或对象存储在 Redis 中，则新系统必须首先配备 Redis 服务器。

如果您不确定是否使用了 Redis，并且您仍然可以访问旧系统，则使用 `iobroker status` 命令调用所需的信息”。使用 Redis 时，输出如下所示：

```
iobroker is running on this host.

At least one iobroker host is running.

Objects type: redis
States  type: redis
```

如果 Objects 类型和/或 States 类型显示“redis”，则必须在新系统上安装 Redis 服务器。
如果这两种类型都显示“文件”，则不需要 Redis 服务器。

如果你不再能访问旧系统并且你不知道之前配置了什么，那么一定要提前安装 Redis 服务器。

#### Redis 安装：
使用 Putty 转到终端并运行以下命令：

```
sudo apt-get update
sudo apt-get install redis-server
sudo usermod -a -G redis iobroker
sudo reboot now
```

接下来，如果系统上的所有权限不适合某个地方，您应该运行 Installer Fix。
此步骤只是一个建议，不是强制性的。

```
curl -sL https://iobroker.net/fix.sh | bash –
```

使用小工具“htop”，您可以很好地查看所有正在运行的进程，这不仅对还原很有趣，而且总体上非常有用。
这是安装如下：

在控制台中运行以下命令：

```
sudo apt-get install htop
```

完成此操作后，即可进行实际还原。

＃＃＃ 恢复：
这里还有2个选项：

#### **1。使用备份自动恢复**
由于这里不需要任何 Linux 知识，并且整个过程都是通过 Iobroker 的 Web 界面完成的，因此首先使用 [备份](https://github.com/simatec/ioBroker.backitup/blob/master/README.md) 执行自动恢复的变体。

为此，必须安装适配器备份。
这是通过“适配器”选项卡完成的。在那里搜索备份并使用 (+) 安装实例。

安装完成后，您可以使用路径 /opt/iobroker/backups 中的 sftp 程序（例如 FileZilla 或 WinSCP）将之前从旧系统创建的“ioBroker 备份”存储在新系统上。

Backitup 还可以从 NAS、Dropbox 或 Google Drive 执行恢复，但本地变体出现问题的可能性最小。

如果您已经有从 NAS 安装的经验，也可以使用它，特别是因为您可以直接访问旧安装的现有目录。
但是，本教程指的是本地存储的备份。

如果 ioBroker Backup 已成功存储，Backitup 现在将打开并且“恢复”选项卡将打开。
将“备份源”设置为本地，然后保存。

![恢复选项卡](../../de/tutorial/media/restore/1575301096581-restoretab.jpg)

如果要在还原后自动启动所有实例，则必须激活“还原后启动所有适配器”选项然后保存。
如果要在不同的主机上恢复备份，则不应使用此选项，因为在启动各个实例之前可能必须调整 IP 地址。

保存后，可以使用“检索备份”按钮在本地路径上检索现有备份。

您刚刚通过 FTP 进行的备份应该出现在 iobroker 下的列表中。
现在选择这个。

![备份选择](../../de/tutorial/media/restore/1575301146928-restoreliste.jpg)

选择后，有一个说明iobroker会停止恢复，然后重新启动。

![开始还原](../../de/tutorial/media/restore/1575301175231-restorestart.jpg)

在这里，您已经开始了实际的恢复过程。

![恢复运行](../../de/tutorial/media/restore/1575301208033-restore.jpg)

另一个选项卡将在您的浏览器中打开，您可以在其中按照 Backitup 的 WebUI 中的控制台上的恢复过程进行操作。

![恢复WebUI.JPG](../../de/tutorial/media/restore/restoreWebUI.JPG)

恢复成功完成后，您还将在恢复的 WebUI 中收到消息。

![restoreWebUI_finish.JPG](../../de/tutorial/media/restore/restoreWebUI_finish.JPG)

根据系统性能和旧 ioBroker 安装的大小，恢复可能需要一些时间。
正常情况下，大约 10-15 分钟后应该会完成恢复，并且 ioBroker 应该会自动重新启动。

![恢复完成](../../de/tutorial/media/restore/1575301228008-restorefinish.jpg)

在极少数情况下，ioBroker 在恢复后不会自动启动。
如果是这种情况，您可以通过控制台使用以下命令手动启动 iobroker。

```
iobroker start
```

现在 ioBroker 应该重新启动，在“日志”选项卡中，您可以看到安装在旧系统上的所有适配器当前正在被 npm 重新安装。

这里需要一点耐心，让 iobroker 来做。
在这些实例中，您可以一一查看安装了哪些适配器。
仍在安装或在队列中的所有适配器在实例中还没有图标。
请不要重启 ioBroker，最多不时用 F5 刷新视图，直到所有实例都带有图标。

根据安装的大小以及计算机和互联网连接的速度，这可能需要 2-3 个小时。

恭喜，现在新安装的系统已完成所有设置、脚本、可视化等。

使用 Backitup，现在可以选择还原以前在旧系统上备份的其他数据。
您可以使用与上述相同的步骤恢复 Redis 数据库、Zigbee 数据库、mySql 数据库和您的历史数据。

检索到的备份列表将类似于此示例。

![完整清单](../../de/tutorial/media/restore/1575362131512-fullliste.jpg)

*****************************************************************************************************************************************

#### **2。使用终端命令手动恢复**
首先，必须使用 Putty 或类似的东西发出一些命令。

首先，必须创建一个备份文件夹：

```
sudo mkdir /opt/iobroker/backups
```

在这里，也有在旧系统上创建的备份，如有必要，还有 Redis 备份、zigbee 备份等。
放置在 /opt/iobroker/backups 文件夹中。

如果状态和对象保存在 Redis DB 中，则应先在此处恢复保存的 Redis 数据库。
如果只有州在 Redis 下运行，则不一定要提前。

完成此操作后，按如下方式停止 ioBroker：

```
iobroker stop
```

然后请使用以下命令检查是否一切都停止了：

```
iobroker status
```

如果所有输出都正确且 iobroker 已停止，则现在可以通过控制台使用以下命令执行恢复：

```
cd /opt/iobroker
iobroker restore <Dateiname eures Backups>
```

!> **使用此方法只能恢复 ioBroker 备份非常重要。
无法使用此命令创建 Redis 备份、Zigbee 备份、mySql 备份或历史数据**。

为此需要备份，因为它们是使用备份专门创建的。

根据系统的不同，这现在可能需要几分钟。进度显示在终端中。
还原完成后，使用以下命令再次启动 ioBroker：

```
iobroker start
```

同样，ioBroker 现在通过 npm 单独重新安装所有适配器。
这可能需要一段时间，具体取决于您的安装大小、互联网速度和系统性能。
可以在“日志”选项卡中跟踪当前状态。

现在已完成，系统已重新安装，所有设置、脚本、可视化等都已恢复。

＃＃＃ 结论：
原则上，两种变体都会导致相同的结果。
如果您对终端命令没有什么经验并且感到不安全，那么使用 Backitup 是安全的。

但是，如果您想确切了解系统上发生的情况，您应该通过控制台选择手动版本。在这里，您可以在终端中详细查看每个单独的过程。