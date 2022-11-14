---
title: ioBroker 基础知识
lastChanged: 23.10.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/README.md
hash: +bZCouq04wYooLDZN2tuopO9UJJu5nB9b0nuUMsCRVc=
---
ioBroker 是一个纯软件解决方案，用于将不同的物联网系统连接到一个完整的系统。因此，每个系统仍然需要一个控制中心（网关/接口），以便能够集成其设备。

在特殊情况下，可以使用软件模拟这样的控制中心，也可以将其作为硬件（U 盘或类似设备）插入 ioBroker 服务器。

## 模块化
ioBroker 具有模块化结构。这些模块在 ioBroker 被称为 ***Adapter***。
有超过 400 个[适配器](http://download.iobroker.net/list.html)用于连接各种硬件或集成各种信息，如天气、日历等。

因此，只有那些满足个人需求的适配器才需要安装在安装中。这节省了存储空间和计算能力。

为每个适配器创建所谓的***实例***。这些是适配器的“工作版本”。根据适配器的不同，可以创建任意数量的实例，以便将不同的子系统或不同的责任区域彼此分开。

在这些情况下会进行相应的配置。

＃＃ 建筑学
### 服务器
ioBroker 的一个特殊功能是任务**可以**分发到多个服务器。在这种情况下，人们说的是***多主机系统***。划分的原因可以是空间性质或权力分布。

### 硬件要求
ioBroker 服务器几乎可以安装在任何硬件上。唯一的条件是对应操作系统有当前版本的[节点](https://nodejs.org/en/download/)。

!> 自 2022 年 10 月起，推荐 ioBroker 使用 Node.js 16.x。

对于较大的安装，建议使用至少 2GB 的工作内存 (RAM)，最好是 4GB。具有 1GB RAM 的 Raspberry Pi 2/3 足以进行测试，作为多主机环境中一些适配器的从属设备，即使更小的计算机也足够了。

＃＃＃软件
ioBroker 管理数据库中的数据。相应地组织数据的结构。

每个适配器都有一个所谓的命名空间，其中包含适配器实例的所有数据。因此，命名空间的名称是例如：***AdapterName.0***

在这个区域内，ioBroker 创建设备、它们的通道以及它们的数据点以及它们的值（状态）。

![对象结构](../../de/basics/../admin/media/ADMIN_Objekte_status_tree.png)

在本例中，它是为您自己的测量值创建的命名空间。

[Adapter]: http://download.iobroker.net/list.html

[nodejs]: https://nodejs.org