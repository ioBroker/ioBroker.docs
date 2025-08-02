---
title: 建筑学
lastChanged: 24.08.2024
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/architecture.md
hash: fBfqIkwe2R088CwuRMCh53RGxixMmytK+tGKMdHsiV0=
---
# 系统搭建
＃＃ 建筑学
ioBroker 是模块化的，即由许多单独的组件组成。每个模块都有特定的任务。为了保持概览，ioBroker 因此为其所有模块都有一个中央协调器。该协调员是在后台工作的`js-controller`。他负责中央数据存储以及所有模块之间的管理和通信。这些模块本身称为`Adapter`。
适配器仅在必要时由用户安装。基于 Web 的管理界面`admin` 本身也是一个适配器。管理适配器或简称“Admin”是ioBroker系统的管理界面。 [Admin](https://www.iobroker.net/#de/documentation/admin/README.md)通常使用地址[http://localhost:8081](http://localhost:8081) 被调用。

当使用 Admin 安装新适配器时，首先从 Internet 下载适配器文件并将其写入服务器硬盘驱动器。如果要启动适配器，则首先创建该适配器的`Instanz`。每个适配器实例都可以由管理员单独配置、停止和启动。这就是为什么每个实例都在自己的进程中运行，该进程在后台与 ioBroker js 控制器进行通信。

在具有多个 ioBroker 服务器的`Multihost`系统中，适配器的实例也可以分布在不同的服务器上。这允许分布负载或直接在现场连接附加硬件（例如 IO 端口、USB）。

适配器、js 控制器、数据库和 Web 前端之间的通信通过多个 TCP/IP 连接进行。根据所选的设置，数据以纯文本或加密形式交换。

ioBroker 和适配器主要用 JavaScript 编程语言编写。要执行 JavaScript，您需要适当的运行时环境。因此，ioBroker 依赖[Node.js](https://github.com/nodesource/distributions#installation-instructions)。该运行时环境适用于多种软件平台，例如 Linux、Windows 和 macOS。

节点包管理器（简称 `npm`）用于安装 ioBroker 和适配器。这可以搜索、安装、删除、编译和更新模块及其依赖项。
没有 Node.js，ioBroker 就无法工作。无需手动安装 Node.js；ioBroker 安装程序会直接执行此操作。

与许多开源技术一样，Node.js 正在快速发展。提高稳定性和安全性甚至添加新功能的较小更新会定期出现。

主版本号为偶数的 Node.js 版本称为 LTS 版本（长期支持），并且会维护几年（例如 12.x）。每年都会有一个新版本进入 LTS - 2021 年是 Node.js 16，该版本于 4 月发布，将从 2021 年 10 月起成为 LTS 版本。

与此同时，早期的 LTS 版本已达到生命周期结束 (EOL)。 Node.js 10 于 2021 年 4 月收到 EOL 状态，因此将不再接收更新，Nodejs 12.x 将于 2022 年 4 月结束其生命周期。所以不会有更多的安全更新！

ioBroker 使用 JavaScript 开源场景中的许多模块和扩展，经常发生 EOL 版本很快就不再受支持的情况。这在第一步中没有真正的影响，但从中期来看，将会出现适配器，稍后还会出现不再支持 Node.js EOL 版本的 js 控制器。

## 适配器和实例
适配器是将各种设备、服务或协议集成到ioBroker系统中的特殊模块。它们充当 ioBroker 与您控制或收集数据的外部系统之间的接口。适配器可以分为不同的类别，例如设备适配器、协议适配器、服务适配器、数据库适配器、可视化适配器、脚本适配器和特殊适配器。

每个适配器实例都可以单独配置，并由管理员独立停止和启动。这使得各种设备和服务能够灵活且可扩展地集成到 ioBroker 系统中。适配器实例在自己的进程中运行，并在后台与 js 控制器通信。

## 多主机系统
在多主机系统中，多个 ioBroker 服务器可以相互连接以分配负载或连接现场其他硬件。这使得 ioBroker 系统具有更好的可扩展性和灵活性。适配器实例可以分布在不同的服务器上，以充分利用系统资源。

服务器之间的通信通过 TCP/IP 连接进行，数据交换可以是纯文本形式，也可以是加密形式，具体取决于设置。多主机系统为具有许多设备和服务的大型安装提供了强大且可扩展的解决方案。

## 安全和更新
使用 ioBroker 时，安全性和定期更新是重要的方面。 Node.js 是底层运行时环境，正在快速发展并定期更新，以提高稳定性和安全性。使用 Node.js 的 LTS 版本非常重要，因为它们会随着时间的推移进行维护并接收安全更新。

ioBroker 及其适配器使用来自 JavaScript 开源社区的许多模块和扩展。定期更新这些模块以受益于最新的安全性和稳定性改进非常重要。节点包管理器 (npm) 可以轻松管理和更新这些模块。

＃＃ 概括
ioBroker 是一个模块化、可扩展的系统，用于集成和控制各种设备、服务和协议。中央协调器 js 控制器管理适配器并确保系统各个组件之间的通信。适配器支持设备和服务的灵活集成，多主机系统提供额外的可扩展性和灵活性。安全性和定期更新是保证ioBroker系统稳定性和可靠性的重要方面。