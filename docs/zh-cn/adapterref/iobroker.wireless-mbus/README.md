---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wireless-mbus/README.md
title: ioBroker.无线-mbus
hash: aJWcyWPGZvst6S6R/ZIRSskOHipvPoYdZWa9fFWkaEg=
---
![标识](../../../en/adapterref/iobroker.wireless-mbus/admin/wireless-mbus.png)

![安装数量](https://iobroker.live/badges/wireless-mbus-installed.svg)
![稳定版本](https://iobroker.live/badges/wireless-mbus-stable.svg)

#ioBroker.wireless-mbus
此适配器允许从支持的接收器接收无线 M-Bus 数据。设备实现的范围各不相同，但可以为所有列出的设备配置 wMBus 模式。

* Embit WMB 模块
* Amber Wireless AMB8465（**注意**：命令模式（UART_CMD_Out_Enable）已启用！）
* IMST iM871A
* IMST iU891A-XL
* 加拿大

WMBUS 堆栈已从 FHEM 项目中“重新移植”，并进行了广泛的修复和重构。测试使用从互联网上获取的原始数据、OMS 样本数据和来自 jmbus 库的一些测试数据进行。一些边缘情况仍未测试。

设备创建、更新等主要基于 Apollon77 的 M-Bus 适配器（见下文）。

如果适配器收到加密电报，AES 密钥配置选项卡应自动列出设备 ID。

如果解析失败，原始电报数据将被保存到 info.rawdata 状态。

*注意：* Amber 接收器在 C 模式下经过一段时间（或接收一定量消息）后似乎会崩溃？硬件缺陷？

*IMST iM871A 变体：* 存在一个“RWE Smart Home”USB 接收器，其原则上是 IMST iM871A，但内核不会自动加载相应的驱动程序。这是创建 udev 规则以修复该问题的一行代码：

```shell
sudo bash -c "echo \$'ACTION==\"add\", ATTRS{idVendor}==\"10c4\", ATTRS{idProduct}==\"87ed\", RUN+=\"/sbin/modprobe cp210x\" RUN+=\"/bin/sh -c \\'echo 10c4 87ed > /sys/bus/usb-serial/drivers/cp210x/new_id\\'\"' > /etc/udev/rules.d/99-imst.rules"
```

链接：
* [WMBus 堆栈模块](https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/WMBus.pm)
* [ioBroker.mbus](https://github.com/Apollon77/ioBroker.mbus)
* [原始 WMBUS 堆栈: wm-bus](https://github.com/soef/wm-bus)
* [M-Bus 协议](http://www.m-bus.com/files/MBDOC48.PDF)
* [OMS 规范]（https://oms-group.org/en/download4all/oms-specification/）

## 初始设置
初始设置需要配置基本配置（与 wmbus 接收器的硬件连接）并为要收集的所有加密 wmbus 节点设置 AES 密钥。最棘手的部分是 AES 密钥。

### 基本设置
这需要选择适当的 USB 设备和正确的波特率（**通常** IMST iM871A：57600 波特；IMST iU891A-XL：115200 波特；Amber：9600 波特；Embit：9600 波特，CUL：38400 或 9600 波特）。大多数**仪表**将以“T 模式”发送。

从 0.9.0 版开始，适配器还支持通过 TCP 套接字连接到串行设备。但是，管理界面并没有真正反映这一点（目前），您必须选择“自定义端口”并输入主机为 `tcp://host:port`。

### 其他选项
* **更新不变的状态**：当电报到达时，所有状态都将被更新，即使它们的值没有改变。（默认值：开启）
* **紧凑帧支持缓存**：为了支持紧凑电报（由某些（Kamstrup？）设备使用），所有收到的电报的结构都会被缓存。这意味着每个设备通常只有一个缓存条目。如果您没有任何发送紧凑电报的设备，您可以禁用它以节省一些性能和内存。（默认：关闭）
* **强制能量单位为 kWh**：所有能量单位（Wh 和 J）将转换为 kWh。（默认：关闭）
* **连续失败后暂时阻止设备**：如果同一设备连续 10 个电报未成功解析，则将忽略该设备，直到适配器重新启动（默认值：开启）

### AES 密钥
设备标识符是制造商代码和设备 ID 的组合（例如 AAA-12345678）。密钥可以作为 16 个字符的纯文本密钥或 32 个字符（16 字节）的十六进制字符串输入。

设置密钥的最简单方法是启动适配器而不设置任何密钥，然后等待加密电报，之后适配器会生成一个带有“未知”密钥的条目。然后您可以填写相应的密钥并保存设置。如果您看到不认识的设备或只是想摆脱的设备（例如邻居的设备），您可以在阻止的设备选项卡中输入它们（见下文）。

### 阻止不需要的设备
通过“阻止的设备”选项卡，您可以完全停止适配器处理来自不需要的设备电报。

您只需输入设备 ID（例如 AAA-12345678），您可以在接收和解析电报后从对象树中获取该 ID，或者从（调试）日志中获取该 ID。

之后，当您从对象树中删除该设备时，适配器将不会再次重新创建它。

待办事项
* 向 S 模式接收器发送电报？
* 使用“多条电报”处理仪表

## Changelog

### 0.10.0
* (ChL) Add support for IMST iU891A-XL receiver

### 0.9.4
* (ChL) Upgrade dependencies and general package stuff

### 0.9.3
* (ChL) Fix handling of 64bit integer DIFs

### 0.9.2
* (ChL) Fix handling of frame type B without CRC

### 0.9.1
* (ChL) Fix custom port display in admin page if SerialPort returns no ports

### 0.9.0
* (ChL/kubax) Experimental! Enable serial over raw TCP socket for all devices - use `tcp://host:port` as custom serial port
* serialport is upgraded to v11 - this finally breaks node v12 support!

### 0.8.10
* (ChL) Use compact frame cache independently from manufacturer code

### 0.8.9
* (ChL) Fix display of non-default settings in admin page

### 0.8.8
* (ChL) Add datetime type I handling

### 0.8.7
* (ChL) Slightly improve handling of LVAR DIF values

### 0.8.3 / 0.8.4 / 0.8.5 / 0.8.6
* (ChL) Update dev dependencies - Attention CI test will no longer support <= NodeJS 12
* (ChL) Minor logging changes

### 0.8.2
* (ChL) C-mode support for CUL

### 0.8.1
* (ChL) Fix connection state
* (ChL) Re-add serial logging

### 0.8.0
* (ChL) Complete rewrite of serial communication - now includes unit tested device classes
* (ChL) Upgrade to SerialPort 10.x and dependency clean up
* (ChL) Improve PRIOS decoder

### 0.7.9
* (ChL) Add debug logging to all serial devices

### 0.7.8
* (ChL) Improve logging from receiver modules
* (ChL) fix rawdata state

### 0.7.7
* (ChL) Add support for Diehl PRIOS encoded telegrams (ported from wmbusmeters)

### 0.7.5 / 0.7.6
* (ChL) Fix timeout handling - if no problems occur this will be republished as 1.0.0

### 0.7.3 / 0.7.4
* (ChL) Try to improve CUL support

### 0.7.1 / 0.7.2
* (ChL) Rename to ioBroker.wireless-mbus to be able to publish to npm
* (ChL) Fix block list, admin page logo and repo url in package.json

### 0.7.0
* (ChL) Change main adapter code to class
* (ChL) Include actual (machine) translations besides English and German
* (ChL) Upgrade denpendencies
* (ChL) Add test for wmbus decoder
* (ChL) Add integration tests
* (ChL) Add github workflow

### 0.6.2
* (ChL) Improve admin page to handle custom serialport path
* (ChL) Add option to turn automatic blocking of devices off
* (ChL) Add "Simple Hexstring" receiver for testing purposes
* (ChL) Internal refactoring

### 0.6.0 / 0.6.1
* (ChL) Upgrade of serialport library to 9.2.0
* (ChL) experimental CUL support

### 0.5.2
* (ChL) fix for connection indicator with js-controller 2.x

### 0.5.1
* (ChL) Small fixes
* (ChL) Internal telegram parser now supports wired M-Bus frames (not used - for testing / developing purpose)
* (D Glaser) Added timestamp of last update to device info
* (D Glaser/ChL) Added some setup documentation to README

### 0.5.0
* (ChL) Basic support for Techem devices
* (ChL) Option to force energy units (Wh and J) to kWh - BEWARE this is not really backwards compatible. Old states will keep their "old" unit, but display the adjusted value!

### 0.4.7
* (ChL) Block devices after 10 consecutive failed parse attempts until adapter restart
* (ChL) Assign roles derived from units (as does the mbus adapter)

### 0.4.6
* (ChL) Support for (Kamstrup?) compact frames through data record cache (pre-defined frames have been removed!)

### 0.4.5
* (ChL) Append device ids with key "UNKNOWN" at startup to needskey

### 0.4.2 / 0.4.3 / 0.4.4
* (ChL) Small fixes

### 0.4.1
* (ChL) basic IMST iM871A support

### 0.4.0
* (ChL) better Amber Stick support
* (ChL) Compact mode?
* (ChL) Nicer state names
* (ChL) wMBus mode partially selectable

### 0.3.0
* (ChL) Implemented all VIF types from MBus doc
* (ChL) VIF extensions are handled better (again)
* (ChL) reorganised VIF info
* (ChL) reorganised receiver handling
* (ChL) blocking of devices possible

### 0.2.0 (not tagged)
* (ChL) Dramatically improved parser: support for security mode 7, frame type B, many small fixes
* (ChL) VIF extensions are handled better, but correct handling is still not fully clear
* (ChL) CRCs are checked and removed if still present
* (ChL) raw data is saved if parser fails

### 0.1.0
* (ChL) initial release

## License

Copyright (c) 2019 ISFH - Institute for Solar Energy Research www.isfh.de
Copyright (c) 2021 - 2025 Christian Landvogt

Licensed under GPLv2. See [LICENSE](LICENSE) and [NOTICE](NOTICE)