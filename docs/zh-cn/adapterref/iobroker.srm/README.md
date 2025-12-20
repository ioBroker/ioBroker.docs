---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.srm/README.md
title: ioBroker Synology 路由器管理器适配器
hash: M0CLe8zC9gc+ByUUQoyZ21zktYfOPF7LTy/GWB45jKU=
---
![标识](../../../en/adapterref/iobroker.srm/admin/srm.png)

![安装数量](http://iobroker.live/badges/srm.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.srm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.srm.svg)

# IoBroker Synology 路由器管理器适配器
![测试与发布](https://github.com/iobroker-community-adapters/iobroker.srm/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/srm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

＃＃ 描述
这是一个用于连接 [群晖](https://www.synology.com/) 路由器的 iobroker 适配器。该适配器使用 Synology API 获取数据。该适配器已在 SRM 版本 1.3.1 和路由器型号 RT6600 上测试通过，但也应该适用于其他型号。

＃＃ 用法
＃＃＃ 安装
创建一个新的适配器实例，并输入路由器的 IP 地址。默认端口为 8001。输入路由器的用户名和密码。确保该用户未启用双因素身份验证 (2FA)。

### 对象
适配器会创建以下对象：

#### 路由器
* IPv4_IP：路由器的 IPv4 地址
* IPV4_status：IPv4 连接的状态
* IPv6_IP：路由器的 IPv6 地址
* IPV6_status：IPv4 连接的状态

#### 设备
以下设备状态的 JSON 表格：

* 全部：所有已知设备
* 网状网络：所有网状网络设备
* 在线：所有联网设备
* online_ethernet：所有通过以太网连接的在线设备
* 在线无线网络：所有通过无线网络连接的在线设备

每个 JSON 表都包含以下每个设备对应的对象：

* 连接方式：连接类型（互联网、无线网络）
* dev_type：设备类型（计算机、移动设备等）
* 主机名：设备的主机名
* ip6_addr：设备的IPv6地址
* ip_addr：设备的 IPv4 地址
* is_banned：该设备是否被禁用
* is_beamforming_on：是否启用波束成形
* is_high_qos_on：是否启用高QoS
* is_low_qos_on：是否启用低 QoS
* is_manual_device_type：设备类型是否手动设置
* is_manual_hostname：主机名是否手动设置
* is_online：设备是否在线
* is_qos_on：是否启用 QoS
* is_wireless：设备是否通过 Wi-Fi 连接
* mac：设备的 MAC 地址
* mesh_node_id：网格节点的 ID
* mesh_node_name：网格节点的名称

#### 信息
* 连接状态：与路由器的连接状态

＃＃＃＃ 网
网格节点列表。每个网格节点包含以下对象：

* 频段：上行链路频段
* connected_devices：已连接设备的数量
* current_tx_rate：当前传输速率
* current_rx_rate：当前接收速率
* 名称：网格节点的名称
* network_status：网络状态
* node_id：网格节点的 ID
* node_status：网格节点的状态
* parent_node_id：父节点的 ID
* signal_strength：信号强度

＃＃＃＃ 无线上网
Wi-Fi 网络及其设置列表。为避免冲突，Wi-Fi 设置每 3 秒才能更改一次。每个网状网络节点包含以下对象：

* 启用：启用无线网络（读/写）
* enable_client_isolation: 启用客户端隔离（读/写）
* hide_ssid：隐藏 WIFI SSID（读/写）
* mac_filter：启用 MAC 地址过滤（读取）
* schedule_enable：启用网络（读/写）调度

## 鸣谢
如果没有 @stephan1827 (https://github.com/stephan18277) 的出色工作，这个适配器是不可能实现的，他开发了该适配器的原始版本。

谢谢

* [Nocilas](https://github.com/nioc)，他们为 Synology API 提供连接器。
* 我用作模板的无数 iobroker 适配器，特别是 [asuswrt](https://github.com/mcdhrts/ioBroker.asuswrt)。

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 1.0.0 (2024-12-12)
- (mcm1957) Adapter has been moved into iobroker-community-adapters organization
- (mcm1957) Adapter requires node.js 20 now.
- (mcm1957) Adapter requires js-controller 5 and admin 6 now.
- (mcm1957) Dependencies have been updated.

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

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 stephan stricker <stephan.stricker@outlook.com>

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