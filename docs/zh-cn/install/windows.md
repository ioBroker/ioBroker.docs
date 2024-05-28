---
title: 视窗
lastChanged: 21.05.2024
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/windows.md
hash: G2wervEILmAU3LoeQyL7+J2VcZk6xmau2UNkVKG17Jc=
---
# 检查需求
安装之前，请检查系统是否满足所有必要的[安装要求](./requirements.md)。

Windows Installer 的问题可以在论坛中讨论：https://forum.iobroker.net/topic/63610/test-iobroker-unter-windows-installieren-2023-edition

# IoBroker Windows 安装程序
借助 ioBroker Windows 安装程序，只需单击几下即可将 ioBroker 安装在 Windows PC 上。安装程序本身不附带任何软件包。安装过程中会自动下载所需的软件。因此，互联网连接是必需的。

安装 ioBroker 后，安装程序可用于以下操作：

1.更新Node.js到当前推荐版本
2.运行ioBroker修复程序
3.删除或创建Windows防火墙规则，以便外部也可以访问ioBroker
4.确定ioBroker是否在Windows启动时自动启动。

安装程序会自行安装，可以在 Windows 开始菜单的“ioBroker 自动化平台”-“ioBroker 安装”下找到。

## Windows 上的 ioBroker - 这有意义吗？
ioBroker 通常在 Windows 系统上运行得和在 Linux 系统上一样好。然而，用作 24/7 系统的 Windows 系统可能存在与系统相关的缺点，每个人都必须自己权衡。
Windows 特别适合在现有 Windows PC 上快速试用 ioBroker。

## 安装 ioBroker
首先，必须下载安装程序。当前版本始终可以在官方下载页面上找到：https://www.iobroker.net/#de/download

然后双击启动安装程序。首先我们选择要使用的语言：

![语言选择](../../de/install/media/windows/InstallWin_language.png "语言选择")

然后出现欢迎页面：

![欢迎页面](../../de/install/media/windows/InstallWin_welcome.png "欢迎页面")

单击“下一步”后，将出现许可证页面：

![许可证页面](../../de/install/media/windows/InstallWin_license.png "许可证页面")

我们必须接受许可证，然后再次单击“下一步”。在接下来的页面上，我们现在可以选择 ioBroker 安装的安装文件夹：

![安装文件夹](../../de/install/media/windows/InstallWin_folder.png "安装文件夹")

通常最好只使用默认值“C:\ioBroker”。单击“下一步”后，将执行一些检查：

![评论](../../de/install/media/windows/InstallWin_check.png "评论")

这可能需要一些时间。检查结果会自动出现：

![验证结果](../../de/install/media/windows/InstallWin_checkresult.png "验证结果")

在这个例子中一切都很好，我们可以继续。如果没有满足所有必要的要求，您必须首先明确需要做什么。安装和操作 ioBroker 所需的端口通常不可用。如果您遇到这种情况并且不知道该怎么办，您可以在 ioBroker 论坛 https://forum.iobroker.net/ 中找到帮助。单击“下一步”后，我们可以选择一些详细信息：

![选项](../../de/install/media/windows/InstallWin_options.png "选项")

在 ioBroker 的初始安装过程中，前三个选项是固定的：

1、ioBroker的运行环境Node.js下载并安装，推荐版本
2.ioBroker本身安装
3. ioBroker Fixer无法选择

接下来的两个选项可以更改，但通常建议保留默认设置。
最后，安装程序提供了采用现有安装配置的选项。这需要整个“iobroker-data”文件夹，如果存在 ioBroker 安装，则可以在 ioBroker 文件夹中找到该文件夹。这可以来自 Windows 或 Linux 下的 ioBroker 安装。安装期间从该文件夹中获取数据；该文件夹的内容不会更改。
单击“下一步”后，我们现在可以看到计划操作的摘要：

   ![选项](../../de/install/media/windows/InstallWin_summary.png "选项")

   单击“安装”现在将开始实际安装：

   ![选项](../../de/install/media/windows/InstallWin_downloadnode.png "选项")

   ![选项](../../de/install/media/windows/InstallWin_installnode.png "选项")

   ![选项](../../de/install/media/windows/InstallWin_installiobroker.png "选项")

   ![选项](../../de/install/media/windows/InstallWin_finish.png "选项")

单击“完成”，将打开 Web 浏览器，ioBroker 将引导您完成设置的第一步。

＃＃ 更新
!> 通常更新是完全没有问题且安全的。但为以防万一，在执行之前应进行数据备份。

- 在 Windows Installer 的帮助下，已安装的 Node.js 版本可以自动更新到推荐的级别。

  为此，只需从 Windows 开始菜单（“ioBroker 安装程序”）启动安装程序并按照说明进行操作即可。稍后会自动检测并提供 Node.js 的可用更新。

- 从 Windows Installer 版本 3.1.0 开始，Windows Installer 也可用于更新 JS 控制器。

  为此，只需从 Windows 开始菜单（“ioBroker 安装程序”）启动安装程序并按照说明进行操作即可。 JS 控制器的可用更新会自动检测并稍后提供。

- 也可以手动更新 JS 控制器。但是，明确建议使用 Windows Installer 执行更新。

  如果您仍想手动更新，可以使用以下命令进行更新：

  `iob stop`

  `iob update`

  `iob upgrade self`

  `iob start`

＃＃ 故障排除
**问题：** 由于端口 9001 被名为“System”的进程占用，安装无法完成。

**可能的解决方案：** 已知英特尔® 显卡命令中心会阻止端口 9001。
检查您的 PC 上是否有名为“图形命令中心”或类似的 Windows 服务。如果是，请停止并禁用该服务。
然后您应该能够安装 ioBroker。