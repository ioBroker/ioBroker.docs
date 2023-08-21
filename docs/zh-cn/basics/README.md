---
title: ioBroker 基础知识
lastChanged: 11.08.2023
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/README.md
hash: OFLJIxPUGqZC8Thl+rB13dwO3QA5gP+alrK9ttB/3E8=
---
ioBroker 是一个纯软件解决方案，用于将不同的物联网系统连接到一个完整的系统。因此，每个系统仍然需要一个控制中心（网关/接口），以便能够集成其设备。

在特殊情况下，这样的控制中心可以使用软件模拟或作为硬件（USB 棒或类似设备）插入 ioBroker 服务器。

## 模块化
ioBroker 具有模块化结构。这些模块在 ioBroker 称为***适配器***。
有超过 400 个 [适配器](http://download.iobroker.net/list.html) 用于连接各种硬件或集成各种信息，例如天气、日历等。

因此，在安装中仅需要安装那些满足个人需要的适配器。这节省了存储空间和计算能力。

所谓的***实例***是为每个适配器创建的。这些是适配器的“工作版本”。根据适配器的不同，可以创建任意数量的实例，以便将不同的子系统或不同的职责区域彼此分开。

相应的配置发生在这些实例中。

＃＃ 建筑学
### 服务器
ioBroker 的一个特殊功能是任务**可以**分发到多个服务器。在这种情况下，我们称之为***多主机系统***。划分的原因可能是空间性质或权力分布。

### 硬件要求
ioBroker 服务器几乎可以安装在任何硬件上。唯一的条件是相应操作系统有 [节点js](https://nodejs.org/en/download/) 的最新版本。

!> 自 2023 年 3 月起，ioBroker 建议使用 Node.js 18.x。

对于较大的安装，还建议至少 2 GB 的工作内存 (RAM)，最好是 4 GB。具有 1 GB RAM 的 Raspberry Pi 2/3 足以进行测试，作为多主机环境中几个适配器的从属设备，甚至更小的计算机也足够了。

＃＃＃软件
ioBroker 管理数据库中的数据。数据的结构是相应组织的。

每个适配器都有一个所谓的命名空间，其中包含适配器实例的所有数据。因此，命名空间的名称例如：***AdapterName.0***

在这个区域内，ioBroker 创建设备、它们的通道以及它们的数据点及其值（状态）。

![对象结构](../../de/admin/media/ADMIN_Objekte_status_tree.png)

在此示例中，它是为您自己的测量值自行创建的命名空间。

[Adapter]: http://download.iobroker.net/list.html

[nodejs]: https://nodejs.org