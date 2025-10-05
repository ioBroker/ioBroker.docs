---
title: Node.js 和 npm
lastChanged: 28.09.2025
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/nodejs.md
hash: 5VmhgF6IZVKJAoCC+lc8+082z7AVOORazHpIunSfxIg=
---
!> 随着安装脚本的引入，在标准 Linux 系统上不再需要单独安装 Node.js 和 npm！请参阅[Linux下安装](https://www.iobroker.net/#de/documentation/install/linux.md)

ioBroker 和适配器主要用 JavaScript 编程语言编写，由于计算机无法直接执行 JavaScript，因此需要 Node.js 运行时环境。

?> 我们建议在基于 Debian 和 Ubuntu 的 Linux 发行版上安装 ioBroker。

如果需要，可以使用以下命令在此处安装 Node.js：

```curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

!> 自 2025 年 9 月起，建议 ioBroker 使用 Node.js 22 版本！

!> 不得使用奇怪的 Node.js 版本。

有关为不同操作系统安装 Node.js 的更多信息，请参见此处[Node.js 基金会](https://nodejs.org/en/download/package-manager/)。