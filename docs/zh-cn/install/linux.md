---
title: Linux
lastChanged: 05.12.2020
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/linux.md
hash: IfM8p2R5hk9FlFrPpHyIakS8bpY9abMKtH1lxmBoo8w=
---
# IoBroker 在 Linux 上的安装
!> 这些说明不适用于网站的成品图片！但是，手动安装比映像更可取。

使用脚本执行安装，该脚本执行必要的安装步骤并加载可能仍需要的任何软件包。
在安装过程中，系统中会创建一个新用户“iobroker”以及相关的主目录（/home/iobroker）。
然后 ioBroker 在此用户下运行。

如果重新加载脚本对您来说太危险，您可以在[这个链接](https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/installer.sh)下事先检查脚本。

ioBroker 的这些安装说明使用具有 Raspberry OS 'Buster' 的 Raspberry Pi 示例显示了在 Linux 上的安装。

由于依赖于其他软件包或额外的安装，安装过程中总会有一些特殊性。

## 需要硬件
###树莓派 2/3/4
或任何其他具有通用 Linux 的硬件。但是，推荐使用 Debian、Ubuntu 或基于它的发行版之一。

我们不建议使用 Pi 1 作为主机。它只是不够强大（500 MB RAM 等）。由于硬件不同，这些说明无论如何都不适合 Pi 1。

Pi 2 或 Pi 3 最多也只有 1 GB 的 RAM。对于 15 个适配器实例，这应该仍然足够，但除此之外它可能会变得紧张。每个适配器实例需要大约 40MB（有时是 200MB 甚至更多）的 RAM。因此，在激活更多适配器实例之前，应始终关注 RAM 使用情况 - 1 GB RAM 是有限的。

因此，我们推荐 Raspberry4，它具有 4 个更好的 8 GB RAM，来自 Raspberry 系列。

＃＃＃ 电源适配器
拥有良好的电源很重要。电源较弱时会出现稳定性问题

＃＃＃ 存储卡
或 SSD、U 盘等（取决于使用的硬件）

## 需要/重要的链接
* 下载图片：https://www.raspberrypi.org/software/operating-systems/
* Win32DiskImager：https://sourceforge.net/projects/win32diskimager/ **或**
* Balena Etcher：https://www.balena.io/etcher/
* 腻子：http://www.putty.org/

＃＃ 安装指南
### 安装操作系统
* 安装所需的基本操作系统（Raspberry OS Bullseye、Ubuntu、Debian 等） - 取决于所使用的硬件。

相应版本的帮助和说明可在相应的支持页面、Youtube 等上找到。

* 仅当绝对需要通过 SSH 或 sftp 进行 root 访问时

可以解锁 SSH 的根访问权限。

由于众所周知的安全方面，我们建议不要这样做。对于 ioBroker 的安装，使用命令 sudo 并将其放在相应命令的前面就足够了。

### 安装 Node.js
!> 使用来自 ioBroker 的当前安装程序（见下文）**在没有 node.js 的系统上**当前推荐的 node.js 版本会自动安装！ **不再**需要之前单独安装 node.js。

降级时也将使用以下说明。

目前推荐的版本是node 14.x；对于步骤 4.1 中的其他所需版本。将“14.x”替换为 Y.x”。

!> 不再支持 Node.js < 12.x

<span style="color:red">通常不推荐使用奇怪的 nodejs 版本，因为它们是开发人员版本。</span>

<span style="color:red">npm 与 nodejs 一起正确安装。不建议手动安装或升级 npm！</span>

1.系统更新：``sudo apt-get update && sudo apt-get upgrade``

根据所使用的操作系统，也可以使用 ``sudo apt update && sudo apt upgrade`` 进行更新。

2. 测试现有版本的nodejs和npm。

    ``node -v``

    ``nodejs -v``

    ``npm -v``

仅当 **ALL** 这些命令没有带来任何结果（即不再显示版本号）时，继续执行本节的步骤 4.，否则，或者如果版本与所需版本不对应，请事先执行以下操作：

3. 卸载现有的node & node.js 版本

    ``sudo apt-get --purge remove node``（您可能会在此处收到错误消息。请继续！）

    ``sudo apt-get --purge remove nodejs``

    ``sudo apt-get autoremove``

    ``sudo reboot``

4. 重新安装适用于 Linux 和 Raspberry 2/3 的 Node.js

    ``curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -``

    ``sudo apt install -y nodejs``

    ``sudo reboot``

安装后，“node -v”和“nodejs -v”命令必须返回相同的版本号。

    如果 ``node -v`` 产生类似“未找到”的错误信息，请输入

    在控制台上运行 ``sudo ln -s /usr/local/bin/nodejs /usr/bin/node``。

在较新的安装中，命令 ``nodejs -v`` 可能会产生类似“未找到”的错误消息。
原则上，这是无害的，因为命令 ``nodejs`` 已很长时间没有使用，但可以通过符号链接使用命令 ``sudo ln -s /usr/bin/node /usr/bin/nodejs`` 进行“修复”。

---

如果版本不同，请再次阅读[安装 Node.js](#installation-nodejs)部分

作为最后的检查，请使用 ``npm -v`` 检查 npm 的版本。

如果这导致版本 < 6，请使用 ``sudo -H npm install -g npm@6`` 执行 npm 更新

---

### 安装ioBroker
可以使用用户 pi 进行安装，也可以使用用户 root 进行安装。

在控制台执行：

``curl -sLf https://iobroker.net/install.sh | bash -``

---

安装分 4 个步骤进行：

``Installing prerequisites (1/4)``

``Creating ioBroker user and directory (2/4)``

``Installing ioBroker (3/4)``

``Finalizing installation (4/4)``

最后有一条消息

``ioBroker was installed successfully``

``Open http://localhost:8081 in a browser and start configuring!``

---

现在通过网络浏览器中的指定 IP 调用 ioBroker：``http://<IP-Adresse>:8081``

**一个通知：**

对安装的更改可能会导致权限问题。

在这种情况下，请使用安装修复程序：

``curl -sL https://iobroker.net/fix.sh | bash -``

或短`iobroker fix`

论坛中的更多信息：

https://forum.iobroker.net/topic/20211/iobroker-installation-fixer-beta-available%C3%BCgbar