---
title: Linux
lastChanged: 05.12.2020
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/linux.md
hash: PK5UMbikLloEInPXeSNLqKXsZwkXi1dDURcZ8mTYljc=
---
# IoBroker 在 Linux 上的安装
!> 这些说明不适用于网站的成品图片！但是，手动安装比图像更可取。

安装是使用脚本执行的，该脚本执行所需的安装步骤并重新加载可能需要的任何软件包。
在安装过程中，系统中会创建一个新用户“iobroker”和一个关联的主目录（/home/iobroker）。
ioBroker 然后在这个用户下运行。

如果重新加载脚本对您来说太危险，您可以在 [这个链接](https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/installer.sh) 下预先检查脚本。

这些 ioBroker 安装说明使用带有 Raspberry OS 'Buster' 的 Raspberry Pi 示例显示了在 Linux 上的安装。

由于对其他软件包或附加安装的依赖性，在安装过程中可能会一次又一次地出现特殊功能。

## 所需的硬件
### 树莓派 2/3/4
或任何其他具有通用 Linux 的硬件。但是，建议使用 Debian、Ubuntu 或基于它们的发行版之一。

我们不建议使用 Pi 1 作为主机。它只是不够强大（500MB RAM 等）。由于硬件不同，这些说明无论如何都不适合 Pi 1。

即使是 Pi 2 或 Pi 3 也最多只有 1 GB RAM。对于 15 个适配器实例，这应该仍然足够，但除此之外可能会很紧张。每个适配器实例需要大约 40 MB（有时为 200 MB 甚至更多）的 RAM。因此，在激活其他适配器实例之前，您应该始终关注 RAM 使用情况 - 1 GB 的 RAM 是有限的。

因此，建议使用 Raspberry 系列中具有 4 个更好的 8 GB RAM 的 Raspberry4。

＃＃＃ 电源适配器
拥有良好的电源很重要。电源弱的情况下会出现稳定性问题

＃＃＃ 存储卡
或 SSD、U 盘等（取决于所使用的硬件）

##需要/重要的链接
* 下载图片：https://www.raspberrypi.org/software/operating-systems/
* Win32DiskImager: https://sourceforge.net/projects/win32diskimager/ **或**
* Balena Etcher：https://www.balena.io/etcher/
* 腻子：http://www.putty.org/

＃＃ 安装指南
###安装操作系统
* 安装所需的基本操作系统（Raspian Stretch、Ubuntu、Debian 等） - 取决于所使用的硬件。

各个版本的帮助和说明可在相应的支持页面、YouTube 等上找到。

* 仅当绝对需要通过 SSH 或 sftp 进行 root 访问时，** 也可以 **

可以激活 SSH 的根访问权限。

对于众所周知的安全方面，我们建议不要这样做。对于 ioBroker 的安装，使用命令 sudo 并为相应的命令添加前缀就足够了。

### 安装 Node.js
!> 使用当前的 ioBroker 安装程序（见下文）** 在没有 node.js 的系统上 ** 当前推荐的 node.js 版本会自动安装！ ** 不再需要预先单独安装 node.js **。

降级时也应使用以下说明。

目前推荐的版本是node 12.x；对于步骤 4.1 中的其他所需版本。用 Y.x 替换“12.x”。

!> Debian Buster 至少需要 node.js v10.x ！！

<span style="color:red">通常不推荐使用奇数的 nodejs 版本，因为它们是开发者版本。</span>

<span style="color:red">npm 与 nodejs 一起正确安装。不建议手动安装或升级 npm！</span>

1.系统更新：`` sudo apt-get update && sudo apt-get upgrade ''

根据所使用的操作系统，也可以使用 ``sudo apt update && sudo apt upgrade`` 执行更新。

2. 测试现有版本的 nodejs 和 npm。

    ``node -v``

    ``nodejs -v``

    ``npm -v``

仅当 **ALL** 这些命令没有产生结果（即不再显示版本号）时，继续本节的第 4 步，否则，或者如果版本与您想要的版本不对应，请事先执行以下操作：

3.卸载已有的node&node.js版本

    ``sudo apt-get --purge remove node``（可能是这里出现错误信息。请继续！）

    ``sudo apt-get --purge remove nodejs``

    ``sudo apt-get autoremove``

    ``sudo reboot``

4. 为 Linux 和 Raspberry 2/3 重新安装 Node.js

    ``curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -``

    ``sudo apt install -y nodejs``

    ``sudo reboot``

安装后，命令“node -v”和“nodejs -v”必须返回相同的版本号。

    如果 ``node -v`` 生成类似“未找到”的错误消息，则请输入

    在控制台上执行 ``sudo ln -s /usr/local/bin/nodejs /usr/bin/node``。

在较新的安装中，命令 ``nodejs -v`` 可能会生成类似“未找到”的错误消息。
原则上，这是无害的，因为命令 ``nodejs`` 已经很久没有使用了，但是可以通过带有命令 ``sudo ln -s /usr/bin/node /usr/bin/nodejs`` 的符号链接来“修复”。

---

如果版本不同，请再次阅读[安装 Node.js](#installation-nodejs)部分

作为最后的检查，请使用 ``npm -v`` 检查 npm 的版本。

如果这导致版本 <6，请使用 ``sudo -H npm install -g npm@6`` 执行 npm 更新

---

### 安装ioBroker
安装可以使用 pi 用户进行，也可以使用 root 用户进行。

在控制台上运行：

``curl -sLf https://iobroker.net/install.sh | bash -``

---

安装分 4 个步骤进行：

``Installing prerequisites (1/4)``

``Creating ioBroker user and directory (2/4)``

``Installing ioBroker (3/4)``

``Finalizing installation (4/4)``

最后有消息

``ioBroker was installed successfully``

``Open http://localhost:8081 in a browser and start configuring!``

---

现在通过 Web 浏览器中的指定 IP 调用 ioBroker：``http://<IP-Adresse>:8081``

**笔记：**

从 1 月初到中旬，这些命令与安装例程一起使用：

* iobroker 停止
* iobroker 启动
* iobroker 重启
* iobroker 状态

不再。这是 Linux 的一个特性——不是 ioBroker！

相反必须

* 须藤 systemctl 停止 iobroker

或者可以使用其他等价物

此外，可能存在权利问题。

在这种情况下，请使用安装固定器：

``curl -sL https://iobroker.net/fix.sh | bash -``

论坛中的更多信息：

https://forum.iobroker.net/topic/20211/iobroker-installation-fixer-beta-verf%C3%BCgbar