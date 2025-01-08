---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/downloads/ioBroker_Image_RPi_2-3-4_20191127_buster.md
title: 适用于 Raspberry Pi2/3/4 Buster 的 ioBroker 映像 20191127
hash: NpNX09q/cxysJvJptolRsFtxi4rBhgFAkCb+5zdnbJo=
---
# Raspberry Pi2/3/4 Buster 的 ioBroker 镜像 20191127
## 创建 µ-SD 卡
这是 Raspberry Pi2、Pi3、Pi3 B+ 或 Pi4 的 SD 卡映像。

该映像是在具有 4GB RAM 的 Raspberry Pi4 上创建的，但也应该在上述所有设备上运行。它适用于 8GB 及更大的卡。但是，16GB 是建议的最小大小。
无论如何，建议使用 16GB 卡，这样就不会总是写入相同的单元。

图像被解压，然后使用 Balena Etcher 程序写入 SD 卡。 Etcher 可用于不同的操作系统。

## 图像的组成部分
该镜像包含 Raspbian lite，基于 2019 年 9 月 26 日的 Debian 10 “Buster”，从 http://www.raspberrypi.org/downloads 下载后。

此外，还安装了某些适配器所需的软件包。

已创建以下用户：

* 用户：`pi`，
* 密码：`覆盆子`

截至 2019 年 11 月 27 日，Node-js 已安装在版本 10.17.0 中，当然还有 iobroker 通过带有 js 控制器 **v2.1.1** 的安装程序安装。

这是**最小安装**，仅包含管理、信息和发现适配器**。
仍需要创建和配置其他适配器及其实例。

[这里](/tutorial/adapter.md) 中描述了其他适配器及其实例的创建。

**注意！** 以下说明是根据我们所知并根据创建图像时的信息创建的。通过更新软件包或内核，事情可能随时发生变化。

该图像已本地化为德国。如果在其他环境下使用，请进行相应调整。 （`sudo raspi-config`；4.）本地化选项）

## 第一次启动后
首次启动Rapberry Pi后，请使用`sudo raspi-config`进行以下设置：

* 第1点：`更改用户密码`（为用户`Pi`分配您自己的密码）

* 第 2 点：`网络选项 – 主机名`（如有必要，更改 Raspberry Pi 的名称。默认为 `raspberrypi`）

如果更改主机名，请在安装目录的控制台中输入`iobroker host this`

* 第 7 点：`高级选项 – 扩展文件系统`（将根文件系统扩展至所用 SD 卡的最大大小）

* 如有必要，请在第 4 点“本地化选项”下进行调整。默认设置适用于德国

## 系统更新
由于下载时创建映像可能已经过去了一段时间，因此您应该做的第一件事就是更新系统。

要将Linux和nodejs更新到最新版本，请在控制台上执行以下操作：

```sudo apt-get update && sudo apt-get upgrade -y```

您还应该检查已安装的适配器和 js 控制器是否有更新（请参阅“主机”选项卡）。

除了尽可能最小的图像尺寸之外，这也是只预安装了少量适配器的原因。

在这种情况下，请始终首先根据“主机”选项卡中的说明通过控制台运行 js 控制器，然后（如有必要）运行管理适配器，然后运行所有其他适配器。

## 安装 Redis
这些镜像不再包含用于存储状态的 Redis 数据库。在性能较弱且 RAM 较低的计算机上，使用 Redis 有时可以显着提高性能。在速度更快的计算机上，它可以减少写入访问，从而延长 SD 卡的使用寿命。

如果要安装Redis，则必须针对当前镜像进行如下操作。

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