---
title: 建筑学
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/architecture.md
hash: tRt6MnfQ7NhW3HVZYiIHrRBTqLWlqKrd6ES9IOnC1ic=
---
＃系统结构
？&gt; ***这是一个占位符***。<br><br>帮助ioBroker并扩展本文。请注意[ioBroker样式指南](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md)，以便可以更轻松地采用更改。

＃＃ 建筑学
ioBroker是模块化的，即由许多单独的组件组成。每个模块都有特定的任务。为了跟踪事物，ioBroker的所有模块都有一个中央协调器。该协调员是在后台工作的`js-controller`。他负责中央数据存储以及所有模块之间的管理和通信。这些模块本身称为`Adapter`。适配器仅在需要时由用户安装。基于Web的管理界面`admin`本身也是一个适配器。管理适配器或简称为“ Admin”是ioBroker系统的管理界面。通常使用地址[HTTP：//本地主机：8081](http://localhost:8081)调用管理员。

当使用Admin安装新适配器时，首先从Internet下载适配器文件并将其写入服务器硬盘驱动器。如果要启动适配器，则首先生成该适配器的`Instanz`。可以分别配置每个适配器实例，并分别由管理员停止和启动。因此，每个实例都在自己的进程中运行，该进程在后台与ioBroker js-controller进行通信。

在具有多个ioBroker服务器的`Multihost`系统中，适配器的实例也可以分布在不同的服务器上。这意味着可以分配负载或可以在现场直接连接其他硬件（例如IO端口，USB）。

适配器，js控制器，数据库和Web前端之间的通信通过几个TCP / IP连接进行。数据交换以纯文本或加密方式进行，具体取决于所选设置。

ioBroker和适配器主要用JavaScript编程语言编写。需要适当的运行时环境才能运行JavaScript。因此，ioBroker基于`Node.js`。该运行时环境可用于各种软件平台，例如Linux，Windows和macOS。 JavaScript软件包管理器`npm`用于安装ioBroker和适配器。

@@@带有架构层的漂亮图片的说明@@@ @@@ JS控制器并过渡到适配器和实例@@@