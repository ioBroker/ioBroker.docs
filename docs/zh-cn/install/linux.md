---
title: Linux
lastChanged: 23.10.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/linux.md
hash: 2xmu9mKiW1SUwp64fE7C7to9UpCt4bn7nFN/0dAXYfk=
---
# Linux 下和 Raspberry Pi 上的 ioBroker 安装
ioBroker 使用脚本进行安装，该脚本执行必要的安装步骤并重新加载可能需要的任何软件包。

## 检查要求
安装之前，请检查系统是否满足所有必要的[安装要求](./#de/documentation/install/requirements.md)。

## 重要注意事项
- 无需以 **root** 用户身份安装 ioBroker！执行安装脚本**必须**以普通用户身份完成，

该系统将来也将由该用户管理。 `normale` 用户不应称为`iobroker`，它应该是在基本安装过程中创建的用户。

- 所需硬件：具有 Raspberry OS 的 Raspberry Pi 或具有通用 Linux 的任何其他硬件。但是，建议使用 Debian、Ubuntu 或基于它们的发行版之一
- 初学者应该从 Debian / Raspberry Pi OS / Armbian 开始，无需额外的虚拟化层（例如 Docker 或 Proxmox），因为每个额外的层都会增加额外的管理工作和可能的问题来源
- 将操作系统安装为没有桌面的服务器变体
  - ioBroker 作为服务器 24/7 工作，并通过 Putty、Powershell 或类似程序等终端程序进行管理。桌面环境会消耗不必要的资源并增加出现错误的可能性
- 硬件 Raspberry Pi：使用良好的电源非常重要。电源弱（如手机电源）

稳定性问题是预料之中的

## 树莓派
在 Raspberry Pi 上安装 ioBroker 的说明：https://forum.iobroker.net/topic/51869/installation-auf-raspi-einfacher-gehen-s-nicht

## Linux
* 根据所使用的硬件安装所需的当前基本操作系统（Debian、Ubuntu 等）。

  相关支持页面、YouTube 等上提供了各个版本的帮助和说明。

* 通过控制台执行系统更新，具体取决于使用``sudo apt update && sudo apt full-upgrade`` 的操作系统。

* ioBroker 使用命令``curl -sLf https://iobroker.net/install.sh | bash -``安装。

  执行安装脚本。根据硬件的不同，安装可能需要一些时间。

  应为“`curl`` fehlen, kann das Paket einfach nachinstalliert werden: ``sudo apt install curl`”。

  安装分 4 个步骤进行，可以在控制台中看到：

  ``Installing prerequisites (1/4)``

  ``Creating ioBroker user and directory (2/4)``

  ``Installing ioBroker (3/4)``

  ``Finalizing installation (4/4)``

  最后有一条消息

  ``ioBroker was installed successfully``

  ``Open http://localhost:8081 in a browser and start configuring!``

现在可以通过网络浏览器“`http://<IP-Adresse>:8081`”中的指定 IP 访问 ioBroker 并进行设置。

# Docker下ioBroker安装
## 检查要求
安装之前，请检查系统是否满足所有必要的[安装要求](./#de/documentation/install/requirements.md)。

＃＃ 安装
在此页面上，您可以找到在 Docker 上安装 ioBroker 的官方文档：https://docs.buanet.de/de/iobroker-docker-image/