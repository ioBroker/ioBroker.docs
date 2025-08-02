---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lupusec/README.md
title: ioBroker.lupusec
hash: aeqUro9fi8zPyF3STAgowIBvf/mvR9OB99/ovH0riTA=
---
![标识](../../../en/adapterref/iobroker.lupusec/admin/lupusec.png)

![稳定版本](http://iobroker.live/badges/lupusec-stable.svg)
![安装数量](http://iobroker.live/badges/lupusec-installed.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.lupusec.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lupusec.svg)
![新平台](https://nodei.co/npm/iobroker.lupusec.png?downloads=true)

# IoBroker.lupusec
**需要 node.js 20.0 或更高版本和 Admin v5！**

此适配器将 Lupusec 报警系统 XT1 Plus、XT2、XT2 Plus 和 XT3 与 ioBroker 连接。
XT1（不带 Plus）不受支持。您可以读取 Lupusec 传感器的状态，如门、窗、水、烟雾传感器和报警系统的状态。
例如，您可以打开开关、控制百叶窗并布防/撤防报警系统。
由于适配器必须多次调用报警系统才能获取有关状态和设备的所有信息，因此 CPU 负载和内存使用率很高。要降低 CPU 负载，您可以增加轮询时间。

您可以在此处找到详细信息：[狼疮](https://www.lupus-electronics.de/en)

＃＃ 安装
1. 安装适配器

最简单的方法是通过 ioBroker 中的发现适配器配置 lupusec.iobroker 适配器。发现适配器会搜索 Lupusec 警报系统的正确 IP 地址。另一种方法是手动配置

2. 手动配置适配器

从 Lupusec 警报系统选择 IP 地址或主机名和端口。如果您使用 https，请激活 https 标志。使用 https 比不使用 http 时 CPU 负载更高。
如果仅读取状态，请选择没有写权限的用户。如果您想更改状态（例如，打开/关闭灯或布防/撤防警报），请选择具有写权限的用户。
使用轮询时间，您可以配置应多久调用一次警报系统。较高的轮询时间会降低 CPU 负载。

![管理员主页](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin.png) 如果您的 Lupusec 报警系统连接有监控摄像头，您可以在 ioBroker 中提供它们。Lupusec 适配器会自行查找所有 Lupusec 摄像头。您必须输入地址（您的 ioBroker IP 地址或 0.0.0.0）和端口，以便稍后连接到摄像头。
![admin_webcam](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin_webcam.png) 如果您的 Nuki 开门器连接到 Lupusec 报警系统，您也可以从 ioBroker 使用它。在 ioBroker 实例管理菜单上，您可以输入安装在 Nuki 门上的 Lupusec 门传感器。如果您现在打开安装 Nuki 的门，您将看到额外的状态“门已打开”，而不是只有“未锁定”。如果 Nuki 门上没有 Lupusec 门传感器，您将只看到“已锁定”或“已锁定”状态。
![admin_nuki](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin_nuki.png)

默认情况下，所有 Lupusec 设备都将显示在 ioBroker 对象选项卡上。
完全支持并单独调整以下设备：

- 门触点/窗触点（类型 4）
- 水传感器（类型 5）
- 紧急按钮（类型 7）
- 运动探测器/360 度运动探测器（类型 9）
- CO 传感器（类型 13）
- 烟雾探测器/热探测器（类型 14）
- 温度传感器 V2（类型 20）
- 内置警报器（21 型）
- 状态指示灯/迷你室内警报器（类型 22）
- 电源开关（类型 24）
- 1 通道中继，带 ZigBee 中继器（类型 24）
- 带 ZigBee 中继器的 2 通道中继（类型 24）
- Repater V2（类型 26）
键盘（类型 37）
- 玻璃传感器（39 型）
- 内置警报器（45 型）
- 室外警报器（48 型）
- 电力开关表（48型）
- 电表（50型）
- 通用红外控制器（类型 52）
- 房间传感器 V1（类型 54）
- LCD 温度传感器（54 型）
- 迷你温度（54 型）
- Nuki 开门器（57 型）
- 热探测器（58 型）
- 调光器（66 型）
- 电灯开关 V2（66 型）
- 色相（类型 74）
- 卷帘门继电器 V1（76 型）
- 散热器恒温器（79 型）
- 散热器恒温器 V2（79 型）
- 光传感器（78 型）
- 场景切换 V2（类型 81）
- 冲击传感器（93型）
- 烟雾探测器 V2（类型 14）
- 带调光器的入墙式继电器 V3（66 型）
- 户外键盘 V2（类型 17）

Apple Homekit 适配器 yahka 支持两种状态 apple_home_a1 和 lupusec.0.status.apple_home_a2。除了 lupusec 状态之外，您还可以打开和关闭区域 1 和 2 的警报系统。

如果您拥有的设备未在上述列表中列出，请通过 Thorsten Stueben <thorsten@stueben.de> 与我联系。

## 从适配器版本 1.x.x 迁移到 2.x.x
如果您已经安装了 1.x.x 版本，并且想要切换到 2.0.0 或更高版本，很遗憾，您必须再次配置 Lupusec 实例。
不采用 1.x.x 版本的旧配置值。

这是因为配置界面已经彻底修改了。

要设置 Nuki 锁，首先必须输入主机名、用户名和密码，然后保存。实例现在将重新启动。一旦启动无误，请再次打开实例配置。您现在可以在 Nuki 选项卡上配置您的 Nuki 锁。

## 对象
### Lupusec 状态
ioBroker 为您提供与 Lupusec 应用程序中相同的状态对象。
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_status.png)

### Lupusec 设备
您可以在“设备”下找到所有受支持的 Lupsec 传感器和设备。如果缺少设备，请联系我。
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices.png) 传感器或设备的详细视图。在此示例中，您可以看到 CO 传感器。在 CO 警报上，状态“alarm_status_ex”更改为 true，而“alarm_status”更改为“CO”。
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices_type09.png)

### Lupusec 网络摄像头
您可以在“网络摄像头”下找到所有已连接的监控摄像头。您可以将“图像”和“流”状态中提供的链接复制到您的网络浏览器中打开。
![lupusec_obj_webcam](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_webcam.png)

### 鲁普塞克·努基
您可以在 Lupusec 设备等“设备”下找到您的 Nuki 开门器。Nuki 提供 2 种状态。状态 nuki_state 显示 Nuki 开门器的实际状态，例如门是锁定还是解锁。使用状态 nuki_action，您可以打开、锁定或解锁您的门。
![卢普塞克_obj_nuki](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_nuki.png)

### 鲁普赛克短信
如果您使用带有 SMS SIM 卡的 Lupusec XT1+、XT2+ 或 XT3，您可以发送具有以下状态的短信：![删除 lupusec_obj_sms](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_sms.png)

或者，您可以使用以下命令从 JavaScript 发送短信：

```
sendTo('lupusec.0', 'sms', { number: '+4917247114711', text: 'Test message' });
```

如果您使用 SMS 网关，则可以在脚本中使用以下命令：

```
sendTo('lupusec.0', 'smsgw', { number: '+4917247114711', text: 'Test message' });
```

故障排除
如果您启动 Lupusec 适配器并收到无法访问警报系统的错误，请尝试从 ioBroker 系统的终端窗口 ping 系统。

```
ssh <user>@<iobroker-ip-address>
sudo -u iobroker ping <lupsec-ip-address>
```

如果您收到错误“ping：icmp open socket：操作不允许”，请执行以下操作，然后重新启动 Lupusec 适配器。

```
ls -l `which ping`
sudo chmod u+s `which ping`
```

## 已计划
未来计划如下：

- 支持更多传感器/设备
- 为每个传感器 / 设备编写一份 [文档](docs/en/info.md)

## Changelog
### 2.0.4 (2025-01-05)

- (Stübi) Adjustments of test and release yml
- (Stübi) Readme expanded to include migration instructions (Issue #97)
- (Stübi) Fixed error with HUE lights (Issue #104)
- (Stübi) Added the following values ​​for type 54: air pressure, wind strength, wind angle, wind gust, co2, wind speed
- (Stübi) Added for HUE the values mode (hue or temperature) and tempererature
- (Stübi) Added not used states will be not be shwon.
- (Stübi) Fixed value range for HUE to 0 to 360 degree, saturation from 0% to 100% and temperature from 2200 to 6500 kelvin

### 2.0.3 (2024-12-29)

- (Stübi) Adjustments due to migration from ESLint 8x≤ to 9.x.x (Issue #91)
- (Stübi) Redesign - changed everything from JavaScript to TypeScript
- (Stübi) Using axios for http requests
- (Stübi) the configuration changed. You have to edit the configuration
- (Stübi) js-controller in version 6 and 7 will be supported (Issue #83, #84, #95)
- (Stübi) nodejs 20 and nodejs 22 will be suported (Issue #87)

## License

The MIT License (MIT)

Copyright (c) 2025 Thorsten Stueben <thorsten@stueben.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.