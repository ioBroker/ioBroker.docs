---
title: Linux
lastChanged: 11.10.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/linux.md
hash: SxprV6MZeU8HOSJm14hYEgyv60ZTAt3c6tLkng7l5oM=
---
***Linux系统上的ioBroker安装***

!> 这些说明不适用于网站的成品图片！此处描述的手动安装比图像更可取！

＃＃ 一般的
ioBroker 使用脚本手动安装，该脚本执行必要的安装步骤并加载可能仍需要的任何软件包。
在安装过程中，系统中会创建一个新用户“iobroker”以及相关的主目录（/home/iobroker）。然后 ioBroker 在此用户下运行。

这些安装说明使用具有 Raspberry OS 'Bullseye' 的 Raspberry Pi 示例描述了 Linux 上 ioBroker 的*重新安装*。

## 需要硬件
***Raspberry Pi 2/3/4*** 与 Raspberry OS 或任何其他具有通用 Linux 的硬件。但是，推荐使用 Debian、Ubuntu 或基于它的发行版之一。

我们不建议使用 Pi 1 作为主机，因为它根本不够强大（500MB RAM 等）。由于硬件不同，这些说明无论如何都不适合 Pi 1。

Pi 2 或 Pi 3 最多也只有 1 GB 的 RAM。对于 15 个适配器实例，这应该仍然足够，但除此之外它可能会变得紧张。每个适配器实例需要大约 40MB（有时是 200MB 甚至更多）的 RAM。因此，在激活更多适配器实例之前，应始终牢记 RAM 使用情况 - 1 GB RAM 是有限的。

因此，我们推荐 Raspberry4 与 Raspberry 系列中的 4 个更好的 8 GB RAM。

拥有良好的***电源***很重要。弱电源单元（例如移动电话电源单元）会出现稳定性问题。

***内存卡***或SSD、U盘等（取决于使用的硬件）

## 需要/重要的链接
* 下载图片：https://www.raspberrypi.org/software/operating-systems/
* Win32DiskImager：https://sourceforge.net/projects/win32diskimager/ **或**
* Balena Etcher：https://www.balena.io/etcher/
* 腻子：http://www.putty.org/

＃＃ 安装指南
* 安装所需的基本操作系统（Raspberry OS Bullseye、Ubuntu、Debian 等） - 取决于所使用的硬件。

  相应版本的帮助和说明可在相应的支持页面、Youtube 等上找到。

?> ioBroker 作为服务器 24/7 工作，并通过 Putty 或类似的终端程序进行管理。安装桌面会占用资源并且没有必要！

?> 出于安全原因，我们建议不要为 SSH 启用 root 访问权限。对于 ioBroker 的安装，将 *sudo* 放在相应命令的前面就足够了。

* 通过控制台执行系统更新，具体取决于与 ``sudo apt-get update && sudo apt-get upgrade`` 或 ``sudo apt update && sudo apt upgrade`` 一起使用的操作系统。

* ioBroker 带有 ``curl -sLf https://iobroker.net/install.sh |重击-``安装。

  执行安装脚本。根据硬件，安装可能需要一些时间。

  安装分 4 个步骤进行，可以在控制台中看到：

  ``Installing prerequisites (1/4)``

  ``Creating ioBroker user and directory (2/4)``

  ``Installing ioBroker (3/4)``

  ``Finalizing installation (4/4)``

  最后有一条消息

  ``ioBroker was installed successfully``

  ``Open http://localhost:8081 in a browser and start configuring!``

现在可以通过指定的 IP ``http://<IP-Adresse>:8081``在网络浏览器中调用 ioBroker 并进行设置。