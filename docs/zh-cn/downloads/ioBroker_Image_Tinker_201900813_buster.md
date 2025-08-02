---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/downloads/ioBroker_Image_Tinker_201900813_buster.md
title: Rock64 的 ioBroker 镜像，带有 Stretch 20190730
hash: 9Z9xd+vvUyPPrI056FA2OykiFvn5Vd/65mf4xPOexqI=
---
# Rock64 的 ioBroker 图像，具有拉伸 20190730
这是 Tinkerboard 或 Tinkerboard S 的最小 SD 卡映像。它适用于 4 GB 及更大的卡。由于它仅适合 2 GB 卡，因此建议的最小大小为 4 GB。无论如何，建议使用 16GB 或更大的卡，这样就不会总是写入相同的单元，从而导致卡更快老化。

图像被解压，然后使用 Balena Etcher 程序写入 SD 卡。
这适用于不同的操作系统。

该镜像包含 Armbian 5.90，基于 2019 年 7 月 6 日从 [https://dl.armbian.com/tinkerboard/Debian_buster_default.7z](https://dl.armbian.com/tinkerboard/Debian_buster_default.7z) 下载的 Debian“Buster”。

已创建以下用户：

- **用户：** `root`，**密码：** 1234
- **用户：** `pi`，**密码：** `raspberry`

此外，截至 2019 年 8 月 13 日的稳定存储库，已安装 Node-js v 10.16.2，当然还安装了带有 js 控制器的 iobroker。

**仅预安装管理和发现适配器**并为其创建了实例。
[这里](/tutorial/adapter.md) 中描述了其他适配器及其实例的创建

-----------------

*本文档反映了创建图像时的状态。更新可能会导致更改。*

该图像已本地化为德国。如果在其他环境下使用，请进行相应调整。 （armbian-config；工作人员）

## 第一次启动后
如果首次启动 Tinkerboard 后系统未要求您为 root 和新用户创建新密码，出于安全原因，请按以下步骤操作：

- 要使用存储卡的完整大小，您必须使用“sudo /usr/lib/armbian/armbian-resize-filesystem”启动文件系统

  调整到SD卡的大小。

- 底层 Linux 和 Nodejs 的更新可能已经可用。更新此内容

在控制台上执行以下操作：`sudo apt-get update && sudo apt-get upgrade -y`

- 请务必使用“sudo passwd root”更改 root 密码，然后输入标准密码“1234”。

输入新密码并在下一步中确认。

- 这也适用于用户“pi”。您可以使用“sudo passwd pi”更改此密码，然后使用标准密码“raspberry”。

然后输入新密码并在下一步中确认。

可以使用配置实用程序进行进一步设置，您可以使用以下命令调用该实用程序：

`sudo armbian-config`

有关此实用程序的更多信息，请参见[https://docs.armbian.com/User-Guide_Armbian-Config/](https://docs.armbian.com/User-Guide_Armbian-Config/)

由于下载时创建映像可能已经过去了一段时间，因此您应该首先检查已安装的适配器和 js 控制器是否有更新（请参阅“主机”选项卡）。

除了尽可能减小图像大小之外，这也是只预安装了少量适配器的原因。

在这种情况下，请始终首先根据“主机”选项卡中的说明通过控制台运行 js 控制器，然后（如有必要）运行管理适配器，然后运行所有其他适配器。

## 安装 Redis
这些镜像不再包含用于存储状态的 Redis 数据库。在性能较弱且 RAM 较低的计算机上，使用 Redis 有时可以显着提高性能。在速度更快的计算机上，它可以减少写入访问，从而延长 SD 卡的使用寿命。

如果要安装Redis，则需要针对当前镜像进行如下操作。

### Redis服务器安装
命令后：

`sudo apt install redis-server`

Redis 服务器已准备就绪并可在端口 6379 上使用

### 将状态切换到 Redis
要使用 Redis 将状态存储在 ioBroker 中，必须在控制台中进行配置：

`iobroker setup custom`

在随后的对话框中，输入以下内容（注意第 4 行）：

```
Type of objects DB [file, couch, redis], default [file]: ENTER
Host of objects DB(file), default[127.0.0.1]: ENTER
Port of objects DB(file), default[9001]: ENTER
Type of states DB [file, redis], default [file]: r ENTER
Host of states DB (file), default[HostName]:ENTER
Port of states DB (file), default[9000]: ENTER
Host name of this machine [hostname]: ENTER
```

此处描述了在多主机系统中安装时的特殊功能：

[点击这里](config/multihost.md)

为用户 iobroker 释放 redis 例如，为了使备份适配器也可以访问 redis，必须向用户授予必要的权限：

`sudo usermod -a -G redis iobroker`