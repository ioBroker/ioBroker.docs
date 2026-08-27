---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.wiegand-tcpip.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.wiegand-tcpip.svg
BADGE-Number of Installations: https://iobroker.live/badges/wiegand-tcpip-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/wiegand-tcpip-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/kbrausew/iobroker.wiegand-tcpip.svg
BADGE-NPM: https://nodei.co/npm/iobroker.wiegand-tcpip.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wiegand-tcpip/README.md
title: **设置**
hash: TqYWNxlG8KIYJ/l1891qdT8wP67uB10q1BP8g2US/zw=
---
＃ **设置**
- [初始启动](#initial-start-up) 首次访问设备
- [设置适配器](#door-access-controllers-settings) 设置 ioBroker 适配器
- [TCP/IP 网络设置](#tcpip-network-settings) 设置适配器网络
- [控制器设置](#controllers-settings) 设备设置
- [广播](#broadcast)
- [序列号](#serial-number)
- [专用网络设置](#dedicated-network-setup)
- [序列号](#serial-number)
- [设备网络地址](#device-network-address)
- [已暴露的服务器主机地址](#exposed-server-host-address)
- [暴露的服务器主机端口](#exposed-server-host-port)

## **初始启动**
首次连接设备时，输入网络数据可能会有所帮助。

这些步骤是可选的，仅当需要在 ioBroker 实例本地网络之外的另一个远程网络上使用该设备时才需要执行。

* 为此……
- 将设备连接到与 ioBroker 相同的网络。不要使用 Docker、VPN 或其他子网。[^1]
- 使用默认设置安装并启动适配器。
- 进入配置界面，切换到“设备远程设置”选项卡
- 运行设备扫描。

![按钮设备扫描](../../../en/adapterref/iobroker.wiegand-tcpip/images/device-scan.png) 有两种可能的错误信息会导致找不到设备[^3], [^4]

- 如果您有多个处于活动状态的设备，请在“设备 ID”下拉框中选择您想要的设备。
- 将所需的地址数据填入相应的输入字段[^2]
现在将设备安装到目标网络中

## **门禁控制器设置**
### **TCP/IP 网络设置**
#### **网络接口**
从列表中选择您已连接设备的网络主机适配器。[^2]

- 特殊地址
- `0.0.0.0` 所有可用接口（默认）
- `127.0.0.1` 仅限本地主机网络（用于[模拟器](https://github.com/uhppoted/uhppote-simulator)）
- 其他工具只要你清楚自己想要什么，都可以使用。例如：VPN、Docker 等。

#### **发送端口**
默认值为 60000。如果没有网络错误信息，则无需更改此值。

#### **接收器端口**
默认值为 60099。如果没有网络错误信息，则无需更改。

#### **连接超时时间（毫秒）**
默认值为 2500（2.5 秒）。

网络通信超时时间。

未经许可，请勿更改。

低于 1000 或高于 10000 的值目前可能暂时有效，但在实际运行中始终会导致错误。

#### **心跳间隔（毫秒）**
默认值为 300000（300 秒 = 5 分钟）。

两次尝试建立与设备的标准连接以判断其是否在线的时间间隔。

低于 60000 或高于 900000 的值可能会导致难以分析的不良副作用。

#### **最大时间偏差（毫秒）**
默认值为 60000（60 秒等于 1 分钟），表示最大时间偏差，单位为毫秒。

如果偏差过大，则会重新校准控制器时钟。

低于 1200 毫秒的值将被忽略，校准功能将被关闭。

#### **底层调试**
默认关闭。如果启用，原始网络通信数据将被记录到调试日志中。

无需在未收到开发人员请求的情况下进行更改。

### **控制器设置**
通过网络设置设备正向和反向通道。

使用**+ / 添加**按钮和**删除**按钮添加或删除每个可用设备。

主机 (ioBroker) 和设备之间有两种通信方式：

有限广播和专用网络设置（单播和定向广播）。[^7]

＃＃＃＃ **序列号**
您设备的序列号。

#### **型号**
进入门模型

#### **有限广播** [^7]
仅添加序列号和型号，无需添加其他地址/网络数据。

>在这种情况下，所有组件必须位于同一子网中。

>这包括发送方（控制器）和接收方（ioBroker）。

>可以通过两个组件上相同的网关地址和网络掩码来识别这一点。

>在所有其他情况下，务必使用“专用网络设置”。

#### **专用网络设置（单播和定向广播）** [^7]
请输入所有地址信息……

#### **设备网络地址** [^7]
远程网络上设备的公开 IP 地址（单播）。[^2][^8]

#### **暴露的服务器主机地址** [^7]
远程网络上 ioBroker 实例的公开 IP 地址（单播）。[^2] [^8]

#### **暴露的服务器主机端口** [^7]
经过 NAT [^5] 和 Docker 暴露 [^6] 后，远程网络上 ioBroker 实例的公开 IP 端口。

[^1]: If you are unable to connect the device to the same local network as the ioBroker instance,

您必须以另一种方式设置 IP 地址。

[^2]: The device only allows IPv4 addresses.

[^3]: ![Error message: No Device found](../../../en/adapterref/iobroker.wiegand-tcpip/images/no-devices-found.png)

[^4]: ![Error message: Adapter not started](../../../en/adapterref/iobroker.wiegand-tcpip/images/adapter-not-run.png)

[^5]: [NAT RFC#2663](https://datatracker.ietf.org/doc/html/rfc2663)

[^6]: [Docker CLI: Port](https://docs.docker.com/engine/reference/commandline/port/)

[^7]: ![Network Setup](../../../en/adapterref/iobroker.wiegand-tcpip/images/network-setup.png)

[^8]: You can replace the "Unicast Address" with the "Directed Broadcast Address" in the configuration.

## Changelog
### 1.0.0 (2026-07-07)
* Node.js >= 22 required (Node.js 20 EOL)
* js-controller >= 6.0.11 required
* Migrated to NPM Trusted Publishing (no more classic NPM tokens)
* Migrated to ESLint 9 with `@iobroker/eslint-config`
* Added Dependabot configuration with auto-merge
* TypeScript 5.x, removed deprecated `common.materialize`
* `node:` prefix added to all built-in module imports
* Added UHPPOTE simulator based regression tests and release preflight scripts

### 0.4.7 (2024-11-05)
* Fix for ioBroker.BOT see issues
* Changes to new dependencies Node 22.x, Admin 5 and JS-Controler 5.0.19...

### 0.4.6 (2022-03-18)
* Documentation
* Translations
* Cosmetic improvements
* Fix for [Repository PR1720](https://github.com/ioBroker/ioBroker.repositories/pull/1720).

### 0.4.5 (2022-03-11)
* Bugfix: error in workflow

### 0.4.4 (2022-03-11)
* Structur Native uAPI-Framework
* user action for setTime
* setup docs

### 0.4.3
* setTime if device is running out
* add per Controller the Model (1-, 2- and 4-Doors)
* add info direction

### 0.4.2 (Beta)
* Remote network setup
* Broadcast device communication
* Remote device communication
* Bug ::Found uncleared intervals:: change clearInterval to adapter.clearInterval
* special remoteDoorOpen (in other contex change net-access-mode unmotivated to broadcast)
* device lowlevel debug enabled (from UHPPOTE framework connect to ioBroker log)
* add various "silly" log messages

### 0.4.1-beta
* Small blemishes fixed and translation completed

### 0.4.0-alpha
* First working package

Initial release

## License
GPL-3.0-only

Copyright (c) 2024-2026 kbrausew <kbrausew@magenta.de>