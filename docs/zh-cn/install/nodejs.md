---
title: Node.js 和 npm
lastChanged: 29.10.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/nodejs.md
hash: sAI2l1MMLvhgR6/dOfnrhGREXZ03D0oGEqcHGFA3cJQ=
---
!> 随着安装脚本的引入，不再需要在标准 Linux 系统上单独安装 Node.js 和 npm！见[在 Linux 上安装](https://www.iobroker.net/#de/documentation/install/linux.md)

ioBroker 和适配器主要是用 JavaScript 编程语言编写的，由于计算机不能直接执行 JavaScript，因此需要 Node.js 运行时环境来执行。

?> 我们建议在基于 Debian 和 Ubuntu 的 Linux 发行版上安装 ioBroker。

如果需要，可以使用以下命令在此处安装 Node.js：

```curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

!> 自 2022 年 10 月起，推荐 ioBroker 使用 Node.js 版本 16！

!> 可能无法使用奇怪的 Node.js 版本。

有关为各种操作系统安装 Node.js 的更多信息，请参见此处[Node.js 基金会](https://nodejs.org/en/download/package-manager/)。