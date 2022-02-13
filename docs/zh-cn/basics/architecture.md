---
title: 建筑学
lastChanged: 05.02.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/architecture.md
hash: jZqYj/4mln+jb61EwFIp1wUycLJZve7r3WzwzycvR1g=
---
# 系统构建
?> ***这是一个占位符***。<br><br>帮助 ioBroker 并扩展本文。请注意[ioBroker 风格指南](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md)，以便更容易地采用更改。

＃＃ 建筑学
ioBroker 是模块化的，即由许多单独的组件组成。每个模块都有一个特定的任务。为了保持概览，ioBroker 因此为其所有模块配备了一个中央协调器。该协调员是在后台工作的`js-controller`。他负责中央数据存储以及所有模块之间的管理和通信。这些模块本身被称为`Adapter`。适配器仅在需要时由用户安装。基于网络的管理界面`admin`本身就是一个适配器。 Admin Adapter或简称“Admin”是ioBroker系统的管理接口。 [Admin](https://www.iobroker.net/#de/documentation/admin/README.md)通常以地址[http://localhost:8081开头](http://localhost:8081) 呼叫。

使用 Admin 安装新适配器时，首先从 Internet 加载适配器文件并将其写入服务器硬盘驱动器。如果要启动适配器，则首先创建适配器的`Instanz`。每个适配器实例都可以单独配置，并由管理员独立停止和启动。因此，每个实例都在自己的进程中运行，该进程与后台的 ioBroker js-controller 进行通信。

在具有多个 ioBroker 服务器的 `Multihost` 系统中，适配器的实例也可以分布在不同的服务器上。这允许在现场直接连接负载或附加硬件（例如 IO 端口、USB）。

适配器、js 控制器、数据库和 Web 前端之间的通信通过多个 TCP/IP 连接进行。根据所选设置，数据以纯文本或加密形式交换。

ioBroker 和适配器主要是用 JavaScript 编程语言编写的。运行 JavaScript 需要相应的运行时环境。因此，ioBroker 依赖于[节点.js](https://github.com/nodesource/distributions#installation-instructions)。此运行时环境可用于各种软件平台，例如 Linux、Windows 和 macOS。

节点包管理器，简称`npm`，用于安装 ioBroker 和适配器。这可以搜索、安装、删除、编译和更新模块及其依赖项。
如果没有 Node.js，ioBroker 将无法工作。不需要手动安装 Node.js，这由 ioBroker 安装程序直接完成。

与许多开源技术一样，Node.js 正在迅速发展。提高稳定性和安全性甚至添加新功能的小更新会定期出现。

具有 **even** 主要版本号的 Node.js 版本称为 LTS 版本（长期支持），并会维护多年（例如 12.x）。每年都有一个新版本进入 LTS - 2021 年，即 Node.js 16，它于 4 月发布，将从 2021 年 10 月开始成为 LTS 版本。

同时，较早的 LTS 版本即将达到其生命周期的终点（EOL，End of Life）。 Node.js 10 于 2021 年 4 月获得 EOL 状态，因此将不再收到任何更新，Nodejs 12.x 将在 2022 年 4 月结束其生命周期。所以不会有更多的安全更新！

ioBroker 使用了 JavaScript 开源场景中的许多模块和扩展，在这些场景中，经常发生在不久之后不再支持 EOL 的版本。这在第一步没有实际影响，但在中期会有适配器，后来还有 js-controller，它不再支持 EOL 版本的 Node.js。

@@@ 架构层的漂亮图片@@@ @@@ 解释 JS 控制器并过渡到适配器和实例 @@@