---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/downloads/ioBroker_Image_Rock64_20190209_stretch.md
title: Rock64 的 ioBroker 图像，带有拉伸 20190730
hash: iKUnPNsY/BdQC6+H7je2Ml0XpgM4jQD3NQFoiELmEmQ=
---
# 用于 Rock64 的 ioBroker 图像，带有拉伸 20190730
这是 Rock64 的最小 SD 卡映像。它适用于 4 GB 及更大的卡。由于它已经只适合 2GB 卡，因此 4GB 是推荐的最小尺寸。无论如何，建议使用 16GB 或更大的卡，这样就不会总是写入相同的单元格。

图像被解压，然后使用 Balena Etcher 程序写入 SD 卡。
这适用于不同的操作系统。

该图像包含 Armbian 5.90，基于 2019 年 6 月 28 日从 [https://dl.armbian.com/rock64/Debian_stretch_default.7z](https://dl.armbian.com/rock64/Debian_stretch_default.7z) 下载后的 Debian “Stretch”。

已创建以下用户：

- **用户：** `root`，**密码：** 1234
- **用户：** `pi`，**密码：** `raspberry`

此外，截至 2019 年 7 月 30 日，安装了 node-js v 10.16..0，当然还有带有 js-controller 的 iobroker。

**只有管理员和发现适配器**是预安装的，并为他们创建了实例。
[这里](/tutorial/adapter.md)中描述了其他适配器及其实例的创建

-----------------

*本文档反映了创建映像时的状态。更新可能会导致更改。*

该图像已本地化为德国。如果在其他环境中使用，请进行相应调整。 （armbian-config；个人）

##第一次启动后
如果第一次启动Rock后没有提示为root和新用户创建新密码，出于安全考虑，请执行以下操作：

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

由于在下载时创建映像可能已经过去了一段时间，因此您应该首先检查是否已经对已安装的适配器和 js 控制器进行了更新（请参阅主机选项卡）。

除了图像的最小尺寸之外，这也是只有少数适配器已经预安装的原因。

在这种情况下，请始终根据 Hosts 选项卡中的说明首先通过控制台运行 js-controller，然后在必要时运行 Adapter Admin，然后再运行所有其他适配器。

## 安装 Redis
这些图像不再包含用于存储状态的 Redis 数据库。由于计算机较弱且 RAM 很少，使用 Redis 有时会显着提高性能。使用更快的计算机，它可以减少写入访问，从而延长 SD 卡的使用寿命。

如果要安装 Redis，则必须对当前映像进行以下操作。

### 安装 Redis 服务器
命令后：

`sudo apt install redis-server`

Redis 服务器是否已准备好并在端口 6379 上可用

### 将状态更改为 Redis
使用 Redis 在 ioBroker 中存储状态必须在控制台中配置：

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

为用户 iobroker 释放 redis 以便备份适配器，例如，也可以访问 redis，用户必须被赋予必要的权限：

`sudo usermod -a -G redis iobroker`