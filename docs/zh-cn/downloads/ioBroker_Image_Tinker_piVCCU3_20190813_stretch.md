---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/downloads/ioBroker_Image_Tinker_piVCCU3_20190813_stretch.md
title: 带有 piVCCU 20190813 的 Tinkerboard (S) 的 ioBroker 映像
hash: mHiUX/oxnSf2tCy61Uj1ypeAz84pWMwsfAcPokwbMyo=
---
# IoBroker Image for Tinkerboard (S) with piVCCU 20190813
## 创建 µ-SD 卡
这是在 Asus Tinkerboard 或 Tinkerboard S 上带有 ioBroker 的 Homematic 的一体化 SD 卡映像。

该图像是在 Tinkerboard 上创建的，但也应该在上述所有设备上运行。它适用于 4 GB 及更大的卡。但是，建议的最小大小为 8 GB。无论如何，建议使用 16GB 卡，这样不会总是写入相同的单元格，这会导致 SD 卡更快磨损。

图像被解压，然后使用 Balena Etcher 程序写入 SD 卡。 Etcher 可用于不同的操作系统。

## 图像的组成部分
该图像包含 Raspbian lite，基于 2019 年 4 月 3 日从 https://dl.armbian.com/tinkerboard/Debian_stretch_default.7z 下载后的 Debian 9 “Stretch”。

此外，还安装了一些适配器所需的软件包。

从 https://www.pivccu.de/images/?dir=piVCCU3 下载后，还包括 2019 年 7 月 19 日的 piVCCU3

创建了以下用户：

* 用户：`pi`，
* 密码：`覆盆子`

根据日期为 08/13/2019 的稳定存储库，Node-js 安装在版本 10.16.2 中，当然还有 iobroker 通过带有 js-controller 的安装程序安装。

这是一个**最小安装**，**仅包含管理员和发现适配器**。其他适配器及其实例仍然需要创建和配置。

[这里](/tutorial/adapter.md)中描述了其他适配器及其实例的创建。

**注意！** 以下说明是尽我们所知使用创建图像时可用的信息创建的。由于软件包或内核的更新，某些事情可能随时发生变化。

该图像已本地化为德国。如果在其他环境中使用，请进行相应调整。 （`sudo raspi-config`；4.）`Localisation Options`）

##第一次启动后
如果第一次启动 Tinkerboard 后没有提示为 root 和新用户创建新密码，出于安全原因，请按以下步骤操作：

- 要使用完整大小的存储卡，您必须使用 `sudo /usr/lib/armbian/armbian-resize-filesystem` 启动文件系统

  适应SD卡的大小。

- 底层 Linux 和 nodejs 可能已经有更新。更新此内容

在控制台上执行以下操作：`sudo apt-get update && sudo apt-get upgrade -y`

- 一定要用`sudo passwd root`更改root密码然后输入默认密码`1234`然后

输入新密码并在下一步中确认。

- 这也适用于用户 `pi`。这是用 `sudo passwd pi` 改变的 然后是默认密码 `raspberry`

输入然后输入新密码并在下一步中确认。

可以使用配置实用程序进行进一步设置，该实用程序通过以下方式调用：

`sudo armbian-config`

[https://docs.armbian.com/User-Guide_Armbian-Config/](https://docs.armbian.com/User-Guide_Armbian-Config/)下有关此实用程序的更多信息

＃＃ 系统更新
由于自下载时创建图像以来可能已经过去了一段时间，因此您应该做的第一件事是使系统保持最新。

要将 Linux 和 nodejs 更新到最新版本，请在控制台上执行以下操作：

```sudo apt-get update && sudo apt-get upgrade -y```

您还应该检查已安装的适配器和 js 控制器是否已经有更新（请参阅主机选项卡）。

除了图像的最小尺寸之外，这也是只有少数适配器已经预安装的原因。

在这种情况下，请始终根据 Hosts 选项卡中的说明首先通过控制台运行 js-controller，然后在必要时运行 Adapter Admin，然后再运行所有其他适配器。

## 安装 Redis
这些图像不再包含用于存储状态的 Redis 数据库。由于计算机较弱且 RAM 很少，使用 Redis 有时会显着提高性能。使用更快的计算机，它可以减少写入访问，从而延长 SD 卡的使用寿命。

如果要安装 Redis，则必须对当前图像进行如下处理。

### 安装 Redis 服务器
命令后：

`sudo apt install redis-server`

Redis 服务器是否已准备好并在端口 6379 上可用

### 将状态更改为 Redis
使用 Redis 将状态存储在 ioBroker 必须在控制台中配置：

`iobroker setup custom`

在接下来的对话框中，输入如下（注意第 4 行）：

```
Type of objects DB [file, couch, redis], default [file]: ENTER
Host of objects DB(file), default[127.0.0.1]: ENTER
Port of objects DB(file), default[9001]: ENTER
Type of states DB [file, redis], default [file]: r ENTER
Host of states DB (file), default[HostName]:ENTER
Port of states DB (file), default[9000]: ENTER
Host name of this machine [hostname]: ENTER
```

此处描述了多主机系统中安装的特殊功能：

[点击这里](config/multihost.md)

为用户 iobroker 释放 redis 例如，为了让备份适配器也可以访问 redis，用户必须被赋予必要的权限：

`sudo usermod -a -G redis iobroker`

## 安装好的piVCCU3
此映像中还安装了一个虚拟化 CCU3，这使得无需额外的单独硬件即可控制 Homematic 和 HM-IP 设备。
只需将无线电模块 HM-MOD-RPI-PCB 或 RPI-RF-MOD 插入 Raspberry Pi 的针排。

piVCCU 从 DHCP 服务器接收的 IP 地址与 RaspberryPi 本身不同。这是通过命令`sudo pivccu-info`获得的

调出该IP地址，即可登录CCU3界面。