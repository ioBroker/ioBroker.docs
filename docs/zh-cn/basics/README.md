---
title: ioBroker 基础知识
lastChanged: 24.08.2024
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/README.md
hash: 5wxuyky5vspeQkc94/LiK5OVQbxsmSHDzwO2rtoQh+c=
---
ioBroker 是一个纯软件解决方案，用于将不同的物联网系统连接成一个整体系统。
因此，每个系统仍然需要一个控制中心（网关/接口），以便能够集成其设备。

在特殊情况下，可以使用软件重新创建控制中心或将其作为硬件（USB 记忆棒或类似设备）插入 ioBroker 服务器。

## 模块化
ioBroker 具有模块化结构。这些模块在 ioBroker 称为***适配器***。
有超过 600 个 [适配器](http://download.iobroker.net/list.html) 用于连接各种硬件或集成各种信息，例如天气、日历等。

因此，安装时只需安装满足个人需要的适配器。
这节省了存储空间和计算能力。

所谓的***实例***是为每个适配器创建的。
这些是适配器的“工作版本”。
根据适配器的不同，可以创建任意数量的实例来区分不同的子系统或不同的任务区域。

相应的配置发生在这些实例中。

＃＃ 建筑学
### 服务器
ioBroker 的一个特殊功能是任务**可以**分布在多个服务器上。
在这种情况下，我们称之为***多主机系统***。
划分的原因可能是空间原因或性能分布原因。

### 硬件要求
ioBroker 服务器几乎可以安装在任何硬件上。
唯一的条件是相应操作系统有 [节点js](https://nodejs.org/en/download/) 的最新版本。

!> 自 2024 年 8 月起，ioBroker 建议使用 Node.js 20.x。

对于较大的安装，建议工作内存 (RAM) 至少为 2 GB，最好为 4 GB。具有 1 GB RAM 的 Raspberry Pi 2/3 足以进行测试；甚至更小的小型计算机也足以作为多主机环境中的几个适配器的从属计算机。

＃＃＃ 软件
ioBroker 管理数据库中的数据。数据的结构是相应组织的。

对于每个适配器，都有一个所谓的命名空间，其中包含有关适配器实例的所有数据。
因此，命名空间的名称例如：***AdapterName.0***

在此区域内，ioBroker 创建设备、其通道及其数据点及其值（状态）。

![对象结构](../../de/admin/media/ADMIN_Objekte_status_tree.png)

此示例是为您自己的测量值自行创建的命名空间。

[Adapter]: http://download.iobroker.net/list.html

[nodejs]: https://nodejs.org