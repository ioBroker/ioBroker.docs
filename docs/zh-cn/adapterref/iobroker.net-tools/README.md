---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.net-tools/README.md
title: ioBroker.net-工具
hash: aywaAn2IRpd3JJOaTlGfgxStQY9zTrvOOPPb/jdf4TQ=
---
![标识](../../../en/adapterref/iobroker.net-tools/admin/net-tools.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.net-tools.svg)
![下载](https://img.shields.io/npm/dm/iobroker.net-tools.svg)
![安装数量](https://iobroker.live/badges/net-tools-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/net-tools-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)

# IoBroker.net-工具
**测试：** ![测试与发布](https://github.com/jey-cee/ioBroker.net-tools/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的网络工具适配器
该适配器循环轮询配置的 IP，可以发送 LAN 唤醒包并扫描开放端口。

此发现功能由发现适配器提供，这意味着如果未安装发现功能，则将安装发现功能，并且必须运行发现功能。
备注：此功能仅限于 ioBroker 主机的子网。

### 重要提示：您必须购买许可证才能使用此适配器。您可以在这里购买 -> https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/
### Wichtig：Für die Nutzung dieses Adapters müssen Sie eine Lizenz erwerben。 Sie können eine hier kaufen -> https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/
### 自动发现
有自动搜索功能来查找设备。也可以按计划执行。
注意：如果您在 docker 容器中使用 ioBroker，则此功能将不起作用，具体取决于您的网络配置。

### Ping 配置的 IP 地址
按定义的时间间隔 Ping 指定的 IP 地址并监控结果。 (alive, rps, time) 可以在设备级别指定 ping 间隔。

### 局域网唤醒
将 wol 对象设置为 true，并将 3 个 WOL 数据包发送到您的设备，暂停时间为 750 毫秒。

### 端口扫描
您可以在配置中输入默认情况下应扫描的端口列表或范围。如果此字段为空，则默认范围为 0-65535。
还可以为将用于单次扫描的每个设备指定列表或范围。

如果需要，请在对象 portList 中输入端口列表或端口范围。这会覆盖 config 中的设置。
将 scan 设置为 true，这将扫描 0-65535 范围内的所有开放端口或 portList 中定义的端口。这个过程需要一段时间。
结果将写入对象端口。

---

＃＃＃ iPhone
iPhone 试图在更改 Mac 地址时保护用户免遭跟踪。
了解有关它以及如何禁用专用网络的更多信息：https://support.apple.com/en-us/102509

---

## 对于开发者
#### 获取特定设备的 mac
`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

备注：此功能仅限于 ioBroker 主机的子网。

#### Ping 特定 IP 地址
`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### 局域网唤醒
`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.0.6 04.03.2024
* (Jey Cee) Reduce system load during discovery process to prevent adapter crash

### 1.0.5 04.02.2024
* (Jey Cee) remove discovery adapter as dependency
* (Jey Cee) add possibility to choose the interface which will be used for ping operations
* (Jey Cee) add possibility to enter IP range for device discovery
* (Jey Cee) add auto search by configurable schedule
* (Jey Cee) fix/catch crash if device was deleted in objects and not in device management
* (Jey Cee) fix ping rights on lxc containers which prevent to ping devices

### 1.0.2 20.01.2024
* (Jey Cee) bugfix require

### 1.0.1 19.01.2024
* (Jey Cee) add device manager to configuration
* (Jey Cee) add use of license

## License
Attribution-NonCommercial 4.0 (CC BY-NC 4.0)

Copyright (c) 2024 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).