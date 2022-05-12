---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.extron/README.md
title: ioBroker.extron
hash: MirW0DDWwLaw0/zTVl5RhrSemyrcN4OX4ivf2C5Pl9M=
---
![标识](../../../en/adapterref/iobroker.extron/admin/extron.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.extron.svg)
![下载](https://img.shields.io/npm/dm/iobroker.extron.svg)
![安装数量（最新）](http://iobroker.live/badges/extron-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/extron-stable.svg)
![依赖状态](https://img.shields.io/david/Bannsaenger/iobroker.extron.svg)
![已知漏洞](https://snyk.io/test/github/Bannsaenger/ioBroker.extron/badge.svg)
![新PM](https://nodei.co/npm/iobroker.extron.png?downloads=true)

# IoBroker.extron
## 用于 ioBroker 的 extron 适配器
Extron SIS 适配器

Extron 的控制设备。
此适配器旨在通过 **Simple **I**nstruction **S**et 协议控制某些 Extron 音频视频产品。
这些设备的功能范围是巨大的。并非所有功能都可以通过适配器支持以及与 iobroker 交互。

**注意：** 在适配器配置中选择设备类型后，以后无法更改！

在 iobroker 安装中，此适配器可以有多个不同或相同类型的实例。对于未来的版本，您必须为每个实例的适配器配置添加一个有效的许可证。
如果您是非商业组织或将其用于私人用途，您可以免费获得许可证。请联系作者。

### 支持的设备
- 8x2 演示矩阵切换器 (DTP2 CrossPoint 82)
- H.264 流媒体播放器和解码器 (SMD 202)
- 流媒体编码器 (SME 211)
- 12x8 ProDSP 处理器 w/Dante (DMP 128 Plus AT)
- 12x8 ProDSP 处理器，带 AEC、VoIP 和 Dante（DMP 128 Plus C V AT）

＃＃ 去做
- 在对话开始时检查设备类型。这有时会失败。必须改成更可靠的机制。
- 对使用的输入和输出进行更精细的选择，以减少 DSP 设备的数据库大小
- 在数据库端添加更多命令及其实现

## Changelog

### 0.1.12
* (mschlgl) added support for channel preset selection in SMD202
### 0.1.11
* (Bannsaenger) fixed support for groups in DSP DMP128

### 0.1.10
* (mschlgl) added support for groups in DSP DMP128

### 0.1.9
* (Bannsaenger) fixed setting of info.connection in telnet mode

### 0.1.7
* (mschlgl) added plain Telnet communication

### 0.1.6
* (mschlgl) added limiter section for DMP128

### 0.1.5
* (mschlgl) fixes on device communication sme211

### 0.1.4
* (mschlgl) fixes on device communication cp82 and smd202

### 0.1.3
* (mschlgl) fixes on device communication and user flash file management

### 0.1.2
* (mschlgl) extend device/database structure to add user flash memory

### 0.1.1
* (mschlgl) extend device/database structure to add devices CP82, SME211, SMD202

### 0.1.0
* (mschlgl) extend device/database structure to cover all controllable elements

### 0.0.3
* (Bannsaenger) fix dependencies for integration test

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.0.1
* (Bannsaenger) initial release

## License
Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

Copyright (c) 2021 Bannsaenger, https://github.com/bannsaenger <bannsaenger@gmx.de>

![CC BY-NC License](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)

This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License
http://creativecommons.org/licenses/by-nc/4.0/

Short content:
This is a human-readable summary of (and not a substitute for) the license. Disclaimer.
You are free to:

Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material

The licensor cannot revoke these freedoms as long as you follow the license terms.

Under the following terms:

Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

NonCommercial — You may not use the material for commercial purposes.

No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.