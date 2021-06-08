---
title: 建筑学
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/architecture.md
hash: TTswbQgdwOLTR0BcyqS/DxHorju+Hjp+KNRykl+NNVs=
---
# 系统结构
?> *** 这是一个占位符***。<br><br>帮助 ioBroker 并扩展这篇文章。请注意 [ioBroker 风格指南](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md) 以便可以更轻松地采用更改。

＃＃ 建筑学
ioBroker 是模块化的，即由许多单独的组件组成。每个模块都有一个特定的任务。为了跟踪事物，ioBroker 为其所有模块配备了一个中央协调器。这个协调器是在后台工作的`js-controller`。他负责中央数据存储以及所有模块之间的管理和通信。模块本身称为 `Adapter`。适配器仅在需要时由用户安装。基于 Web 的管理界面 `admin` 本身也是一个适配器。管理适配器或简称“Admin”是 ioBroker 系统的管理界面。通常使用地址 [http://本地主机：8081](http://localhost:8081) 调用管理员。

使用 Admin 安装新适配器时，首先从 Internet 下载适配器文件并写入服务器硬盘驱动器。如果要启动适配器，则首先生成适配器的 `Instanz`。每个适配器实例都可以单独配置，并由管理员独立停止和启动。因此，每个实例都在自己的进程中运行，该进程在后台与 ioBroker js-controller 进行通信。

在具有多个 ioBroker 服务器的 `Multihost` 系统中，适配器的实例也可以分布在不同的服务器上。这意味着可以分配负载或直接在现场连接额外的硬件（例如 IO 端口、USB）。

适配器、js 控制器、数据库和 Web 前端之间的通信通过多个 TCP/IP 连接进行。数据交换以纯文本或加密形式进行，具体取决于所选设置。

ioBroker 和适配器主要是用 JavaScript 编程语言编写的。运行 JavaScript 需要合适的运行时环境。因此，ioBroker 基于 `Node.js`。此运行时环境可用于各种软件平台，例如 Linux、Windows 和 macOS。 JavaScript 包管理器 `npm` 用于安装 ioBroker 和适配器。

@@@ 用架构层解释漂亮的图片@@@ @@@ JS 控制器和过渡到适配器和实例@@@