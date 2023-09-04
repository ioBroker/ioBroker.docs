---
title: Node.js 和 npm
lastChanged: 11.08.2023
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/nodejs.md
hash: /hSnG0OLvcDTR6X3kHdCsXwqL6zIPClPDIsPLmmynDI=
---
!> 引入安装脚本后，不再需要在标准 Linux 系统上单独安装 Node.js 和 npm！请参阅[在 Linux 上安装](https://www.iobroker.net/#de/documentation/install/linux.md)

ioBroker和适配器主要是用JavaScript编程语言编写的，由于计算机无法直接执行JavaScript，因此需要Node.js运行环境来执行。

?> 我们建议在基于 Debian 和 Ubuntu 的 Linux 发行版上安装 ioBroker。

如果需要，可以使用以下命令在此处安装 Node.js：

```curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

!> 自 2023 年 3 月起，ioBroker 建议使用 Node.js 版本 18！

!> 不得使用奇怪的 Node.js 版本。

有关为各种操作系统安装 Node.js 的更多信息，请参阅此处[Node.js 基金会](https://nodejs.org/en/download/package-manager/)。