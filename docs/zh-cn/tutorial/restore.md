---
title: 运行 ioBroker 恢复
lastChanged: 03.12.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/tutorial/restore.md
hash: 6M6JLNd7LLD21j0ulNOqyghHCguiQLMi21AkSJnTYyY=
---
# 基础知识
如何在Linux系统上正确恢复ioBroker安装？

### 前言：
由于某些用户发现恢复非常困难，因此以下是崩溃后、硬件更改、系统更改或其他情况后恢复的分步说明。

基本上，可以提前说一件事：如果操作正确，只需几分钟即可完成恢复，没有人需要害怕它。

最后，所有数据再次可用，并且新系统已经建立。

＃＃＃ 准备：
可执行的 ioBroker 安装对于准备工作是绝对必要的。

有两种方法可以实现这一目标。
从[下载区](https://www.iobroker.net/#de/download)获取完成的映像，设置您自己的Linux操作系统并在此[指示](https://www.iobroker.net/#de/documentation/install/linux.md)之后安装ioBroker。

### 下一步
如果旧系统将状态和/或对象存储在Redis中，则新系统必须首先配备Redis服务器。

如果不确定是否使用了 Redis 并且仍然可以访问旧系统，则使用命令 `iobroker status` 检索所需信息。”使用 Redis 时的输出如下所示：

```
iobroker is running on this host.

At least one iobroker host is running.

Objects type: redis
States  type: redis
```

如果对象类型和/或状态类型显示“redis”，则必须在新系统上安装 Redis 服务器。
如果两种类型都显示“文件”，则不需要 Redis 服务器。

如果你无法再访问旧系统并且不知道之前到底配置了什么，那么一定要提前安装Redis服务器。

#### Redis 安装：
为此，请使用 Putty 转到终端并执行以下命令：

```
sudo apt-get update
sudo apt-get install redis-server
sudo usermod -a -G redis iobroker
sudo reboot now
```

接下来，如果系统上的所有权限在某处不正确，您应该运行安装程序修复。
此步骤只是建议，并非绝对必要。

```
curl -sL https://iobroker.net/fix.sh | bash –
```

使用小工具“htop”，您可以轻松查看所有正在运行的进程，这不仅对于恢复很有趣，而且通常非常有用。
安装如下：

在控制台中运行以下命令：

```
sudo apt-get install htop
```

完成此操作后，即可进行实际恢复。

＃＃＃ 恢复：
这里还有 2 个选项：

#### **1。通过备份自动恢复**
由于此处不需要 Linux 知识，并且整个过程都是通过 Iobroker Web 界面完成的，因此首先使用[备份](https://github.com/simatec/ioBroker.backitup/blob/master/README.md) 完成自动恢复变体。

为此，必须安装 Backuptup 适配器。
这是通过“适配器”选项卡完成的。在那里搜索 Backitup 并使用 (+) 安装实例。

安装完成后，使用 FileZilla 或 WinSCP 等 sftp 程序将之前从旧系统创建的“ioBroker 备份”存储在新系统的路径 /opt/iobroker/backups 中。

备份还可以从 NAS、Dropbox 或 Google Drive 恢复，但本地版本出现问题的可能性最小。

如果您已经有从 NAS 挂载的经验，您也可以使用它，特别是因为您可以直接访问旧安装的现有目录。
但是，本教程指的是本地存储的备份。

如果 ioBroker 备份已成功存储，备份现在将打开，并且“恢复”选项卡将打开。
将“备份源”设置为本地，然后保存。

![恢复选项卡](../../de/tutorial/media/restore/1575301096581-restoretab.jpg)

如果您希望所有实例在恢复后自动启动，则必须激活“恢复后启动所有适配器”选项，然后保存。
如果要将备份恢复到另一台主机，则不应使用此选项，因为在启动各个实例之前可能需要调整 IP 地址。

保存后，可以使用“检索备份”按钮从本地路径检索现有备份。

您刚刚通过 FTP 复制的备份应该出现在“iobroker”下的列表中。
现在选择这个。

![选择备份](../../de/tutorial/media/restore/1575301146928-restoreliste.jpg)

选择后，有一个注释，iobroker将被停止以进行恢复，然后再次启动。

![开始恢复](../../de/tutorial/media/restore/1575301175231-restorestart.jpg)

这是您开始实际恢复过程的地方。

![恢复正在运行](../../de/tutorial/media/restore/1575301208033-restore.jpg)

现在，您的浏览器中将打开另一个选项卡，您可以在其中按照 Backitup 的 WebUI 中的恢复过程进行操作，就像在控制台上一样。

![恢复WebUI.JPG](../../de/tutorial/media/restore/restoreWebUI.JPG)

恢复成功完成后，您还将在恢复的 WebUI 中收到消息。

![恢复WebUI_finish.JPG](../../de/tutorial/media/restore/restoreWebUI_finish.JPG)

恢复可能需要一些时间，具体取决于系统的性能和旧 ioBroker 安装的大小。
通常恢复应在大约 10-15 分钟后完成，并且 ioBroker 应自动重新启动。

![恢复完成](../../de/tutorial/media/restore/1575301228008-restorefinish.jpg)

在极少数情况下，ioBroker 在恢复后不会自动启动。
如果是这种情况，您可以通过控制台使用以下命令手动启动 iobroker。

```
iobroker start
```

现在 ioBroker 应该再次启动，在“日志”选项卡中您可以看到旧系统上安装的所有适配器当前正在由 npm 重新安装。

你必须在这里有一点耐心，让 iobroker 做它的事情。
在实例中，您可以看到逐步安装了哪些适配器。
仍在安装或队列中的所有适配器在实例中尚未有图标。
请不要重新启动 ioBroker，只需时不时地使用 F5 刷新视图，直到所有实例都有图标为止。

根据安装的大小以及计算机和互联网连接的速度，这很容易需要 2-3 小时。

恭喜，新安装的系统现已准备好所有设置、脚本、可视化等。

通过备份，如果以前在旧系统上备份过其他数据，现在可以恢复这些数据。
您可以使用与上述相同的步骤来恢复 Redis 数据库、Zigbee 数据库、mySql 数据库和您的历史数据。

检索到的备份列表将类似于此示例。

![完整列表](../../de/tutorial/media/restore/1575362131512-fullliste.jpg)

*****************************************************************************************************************************************

#### **2。使用终端命令手动恢复**
首先，必须通过 Putty 或类似的东西发出一些命令。

首先您需要创建一个备份文件夹：

```
sudo mkdir /opt/iobroker/backups
```

在这里，也会使用 FileZilla 或 WinSCP 等 sftp 程序创建在旧系统上创建的备份，如有必要，还可以创建 Redis 备份、zigbee 备份等。
存储在 /opt/iobroker/backups 文件夹中。

如果状态和对象存储在Redis DB中，则应首先在此处恢复备份的Redis数据库。
如果只有状态在 Redis 下运行，则不一定必须提前这样做。

完成此操作后，按如下方式停止 ioBroker：

```
iobroker stop
```

然后请使用以下命令检查一切是否已停止：

```
iobroker status
```

如果所有输出正确并且 iobroker 已停止，现在可以使用以下命令通过控制台执行恢复：

```
cd /opt/iobroker
iobroker restore <Dateiname eures Backups>
```

!> **使用此方法只能恢复 ioBroker 备份，这一点非常重要。
无法使用此命令创建 Redis 备份、Zigbee 备份、mySql 备份或历史数据**。

为此需要备份，因为这些是使用备份专门创建的。

根据您的系统，这可能需要几分钟。进度将显示在终端中。
恢复完成后，使用以下命令再次启动 ioBroker：

```
iobroker start
```

在这里，所有适配器现在都由 ioBroker 通过 npm 单独重新安装。
这可能需要一段时间，具体取决于您的安装大小、互联网速度和系统性能。
可以在“日志”选项卡中跟踪当前状态。

现在已完成，系统已重新安装，所有设置、脚本、可视化等均已恢复。

＃＃＃ 结论：
基本上，两种变体都会导致相同的结果。
如果您对终端命令缺乏经验并且不确定，那么使用 Backitup 是安全的。

但是，如果您想准确了解系统上当前发生的情况，您应该通过控制台选择手动版本。在这里您可以看到终端中每个进程的详细信息。