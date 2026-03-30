---
title: Node.js 和 npm
lastChanged: 13.10.2025
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/nodejs.md
hash: 38xyrXo/C1YwLwdNL8ZM8DCwvUJijKb+SFiC8oRyvO4=
---
使用 iobroker 安装脚本后，在推荐的 Linux 系统上不再需要单独安装 Node.js 和 npm！参见 [Linux 系统下的安装](https://www.iobroker.net/#de/documentation/install/linux.md)

ioBroker及其适配器主要使用JavaScript编程语言编写。由于计算机无法直接执行JavaScript，因此需要一个运行时环境——Node.js提供了这种环境。

建议使用基于 Debian 和 Ubuntu 的发行版。

目前，ioBroker 推荐使用 LTS 版本 **Node.js 22**。请勿使用奇数版本。

## Node.js 的标准更新
从 js-controller 5.5.x 版本开始，新增了一个用于更新 Node.js 的控制台命令：

```
iobroker nodejs-update
```

此命令会自动下载并安装推荐的 LTS 版本 **Node.js 22** 以及相应的 npm。

如果要切换到不同的版本（例如 Node.js 24），请将所需的版本指定为参数：

```
iobroker nodejs-update 24
```

## 手动安装替代方案
如果需要手动安装或使用特定版本，请使用 Nodesource 仓库：

```
curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

对于不同的版本，请相应地调整 `setup_22.x`（例如 `setup_24.x`）。