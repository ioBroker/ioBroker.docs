---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.srm/README.md
title: 无题
hash: pLlh+ui3ZfivVM1E7leCbSJ2rIsCIuyRLCK5yZuStuk=
---
![](../../../en/adapterref/iobroker.srm/admin/synology.png)

＃＃ 目录
- [简介](#简介)
- [用法](#用法)
- [修订历史](#Revision-History)

<a name="Introduction"></a>

＃＃ 介绍
这是一个 iobroker 适配器，用于连接到 [群晖科技](https://www.synology.com/) 路由器。适配器使用 Synology API 来获取数据。该适配器已使用 SRM 版本 1.3.1 进行测试。和路由器型号 RT6600，但也应该适用于其他型号。

谢谢

* [Nocilas](https://github.com/nioc)，为 Synology API 提供连接器。
* 我用作模板的无数iobroker适配器，尤其是[asuswrt](https://github.com/mcdhrts/ioBroker.asuswrt)。

<a name="Requirements"></a>

＃＃ 用法
＃＃＃ 安装
创建适配器的新实例并输入路由器的 IP 地址。端口默认为8001。输入路由器的用户名和密码。确保用户没有使用 2FA。

### 对象
适配器创建以下对象：

## 路由器
* IPV4_IP：路由器的IP4地址
* IPV4_status：IPV4连接的状态
* IPV6_IP：路由器的IP6地址
* IPV6_status：IPV4连接的状态

＃＃ 设备
以下设备状态的 JSON 表：

* all：所有已知设备
* mesh：所有mesh设备
* 在线：所有在线设备
* online_ethernet：所有通过以太网连接的在线设备
* 在线wifi：所有通过wifi连接的在线设备

每个 JSON 表对于每个设备都有以下对象：

* 连接：连接类型（以太网、Wifi）
* dev_type：设备类型（计算机、移动设备等）
* 主机名：设备的主机名
* ip6_addr: 设备的IP6地址
* ip_addr: 设备的IP4地址
* is_banned: 设备是否被禁止
* is_beamforming_on: 是否启用波束成形
* is_high_qos_on: 是否启用高QOS
* is_low_qos_on: 是否启用低QOS
* is_manual_device_type: 是否手动设置的设备类型
* is_manual_hostname: 主机名是否手动设置
* is_online: 设备是否在线
* is_qos_on: 是否启用QOS
* is_wireless: 设备是否通过wifi连接
* mac：设备的MAC地址
* mesh_node_id: 网格节点的ID
* mesh_node_name：网格节点的名称

## 信息
* 连接：与路由器的连接状态

＃＃ 网
网格节点列表。每个网格节点都有以下对象：

* 频段：上行频段
* connect_devices: 连接的设备数量
* current_tx_rate: 当前传输速率
* current_rx_rate: 当前接收速率
* name: 网格节点的名称
* network_status：网络状态
* node_id: 网格节点的ID
* node_status：网格节点的状态
*parent_node_id：父节点的ID
* signal_strength: 信号强度

＃＃ 无线上网
WiFi 网络和设置列表。 Wifi 设置只能每 3 秒更改一次，以避免更改发生冲突。每个网格节点都有以下对象：

*启用：启用wifi网络（读/写）
* enable_client_isolation：启用客户端隔离（读/写）
* hide_ssid：隐藏WIFI SSID（读/写）
* mac_filter：启用MAC过滤器（读取）
* Schedule_enable：启用网络调度（读/写）

### 哨兵
Sentry.io 是什么？向该公司的服务器报告什么？ `Sentry.io` 是一项服务，供开发人员获取有关其应用程序错误的概述。这正是在这个适配器中实现的。

当适配器崩溃或发生其他代码错误时，也会出现在 ioBroker 日志中的此错误消息会提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，您的安装 ID（这只是一个唯一的 ID **没有**关于您、电子邮件、姓名等的任何其他信息）也包含在内。这允许 Sentry 对错误进行分组并显示有多少唯一用户受到此类错误的影响。

<a name="Revision-History"></a>

## Changelog
### 0.2.0 (2023-12-27)
- Added new section for WIFI settings. Some settings can be changed via the adapter.
- Account for different API versions

### 0.1.6 (2023-12-26)
- Account for different API versions

### 0.1.5 (2023-12-10)
- minor bug fixes

### 0.1.3 (2023-12-06)
- minor bug fixes

### 0.1.2 (2023-12-05)
- minor bug fixes

### 0.1.1 (2023-12-05)

- enabled NPM deployment

### 0.1.0 (2023-12-05)

- first public release

### Version 0.0.1

- initial release

## License
MIT License

Copyright (c) 2023 stephan stricker <stephan.stricker@outlook.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.