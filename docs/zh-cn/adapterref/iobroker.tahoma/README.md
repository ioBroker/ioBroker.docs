---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tahoma/README.md
title: ioBroker.tahoma
hash: f3IyGRGAXDoHRJcAWd+pn4bYu3GiViFdyaMf/f0C9vw=
---
![标识](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![新公共管理](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![NPM 版本](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![安装数量（最新）](http://iobroker.live/badges/tahoma-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/tahoma-stable.svg)

![Github发布状态](https://github.com/Excodibur/iobroker.tahoma/workflows/Build%2C%20Test%20and%20Release/badge.svg)

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tahoma/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

# IoBroker.tahoma
Somfy Tahoma 的 ioBroker 适配器。该项目与 Somfy 无关。最初基于 https://forum.iobroker.net/post/336001 的脚本，并 fork 自 https://github.com/StrathCole/ioBroker.tahoma。

该适配器连接到 Tahomalink 终端用户 API 并控制设备。设置方式通过 Tahoma Box（很可能是 Connexoon）。
该适配器的功能尚不完善，但应该支持大多数控制百叶窗和遮光帘等的操作。

如果出现问题，请先阅读[常问问题](https://github.com/Excodibur/ioBroker.tahoma/blob/master/FAQ.md)。

## 目前测试的设备
一般来说，此适配器应该支持所有可通过 __tahomalink.com__ 访问的设备，但对于适配器开发者来说，很难保证这一点。主要是因为所使用的 Somfy API 的文档（至少是公开的）不存在，而且开发者只能测试自己拥有的 Somfy 设备，或者在有意愿的参与者支持下进行测试的设备。

此适配器通常也支持可通过 tahomalink.com 控制的设备。这些设备包括：

| 设备 | 支持在线 API | 支持本地 API |
|-|-|-|
| Tahoma 盒子 | ✓ | ✓ |
| Connexoon | ✓ | ✓ ([证明](https://github.com/Excodibur/ioBroker.tahoma/issues/241)) |
| Tahoma Switch | ✓ | ✓ |
| 连接套件 | ✓ ([证明](https://github.com/Excodibur/ioBroker.tahoma/issues/171)) | ✗ ([证明](https://service.somfy.com/downloads/fr_v5/fichecomparative_tahoma_switch_vs_kit_connectivite_a4_1221.pdf)) |

以下 Somfy 设备已验证可与该适配器配合使用：

-S&SO RS100 io
- Oximo io
- 太阳传感器 Sunis io
- 温度传感器
- 烟雾传感器
- 适配器插头io

＃＃ 配置
适配器支持以下配置参数。

| 参数 | （默认）值 | 描述 |
| 用户名 | _`<your Tahomalink user>`_ | 需要验证您的 Tahoma 帐户。|
| 密码 | _`<Your Tahomalink password>`_ | 需要验证您的 Tahoma 帐户。|
| 轮询间隔 | `20000` | 适配器尝试从 Tahomalink 获取新数据的时间（以毫秒为单位）。|
| Tahoma 盒子的 PIN 码 | 格式类似于 `1234-5678-9012` | __<sup>仅适用于 LocalAPI</sup> __ Somfy 提供的 Tahoma 盒子的唯一 PIN 码。更多关于如何激活/使用的信息，请参阅 [这里](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode) |
| Tahoma 盒子的 PIN 码 | 格式类似于 `1234-5678-9012` | __<sup>仅适用于 LocalAPI</sup> __ Somfy 提供的 Tahoma 盒子的唯一 PIN 码。更多关于如何激活/使用它的信息，请点击这里](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode) | | 使用 MDNS | `false` | __<sup>仅适用于 LocalAPI</sup> __ 如果设置为 true，将尝试使用 mDNS 解析 Tahoma-Box 的本地主机名。并非所有路由器都支持此功能，因此默认情况下处于停用状态。|
| 登录尝试次数<sup>1</sup> <sup>2</sup> | `3` | 登录失败后再次尝试登录的次数。|
| 登录尝试之间的延迟<sup>1</sup> <sup>2</sup> | `30` | 登录尝试之间等待的时间（以秒为单位）。|
| 登录失败后的延迟<sup>1</sup> <sup>2</sup> | `120` | 所有连续登录尝试失败后等待的时间（以秒为单位）。|
| applyqueue 重试之前的延迟<sup>1</sup> <sup>2</sup> | `1500` | 在第二次尝试将更改从内部应用队列发送到 Tahoma 之前等待的时间（以毫秒为单位），以防丢失。|
| applyqueue 重试之前的延迟<sup>1</sup> <sup>2</sup> | `1500` | 在第二次尝试将更改从内部应用队列发送到 Tahoma 之前等待的时间（以毫秒为单位），以防丢失。|

 <sup>1</sup>这些配置值仅在 Admin 5（新 GUI）或更高版本中可见和可配置。

 <sup>2</sup>所有值都与登录 Tahomalink 相关，从开发角度来看，这基本上是一个黑盒。经验表明，如果您在此处将数值配置得太低，Somfy 很可能会暂时锁定您的帐户，因此请谨慎降低此处的默认值！

## 州
### Tahoma.X.位置
该树中的状态包含用户的个人信息，如城市、街道地址和经度/纬度。

### Tahoma.X.设备.*.设备URL
此状态包含 Tahoma 用于识别设备的设备 URL。

### Tahoma.X.设备.*.命令
这些状态包含用于控制设备的按钮命令。大多数设备支持`close`和`open`等命令，但也可能支持其他命令。
如果设备支持，某些命令的末尾会带有`:slow`。使用这些命令可以启用低速模式或所谓的静音模式。

### Tahoma.X.设备.*.状态
这些状态包含设备的当前状态，如下所示。如果设备支持，某些状态末尾会显示`:slow`。设置这些状态可以启用低速模式或所谓的静音模式。

| 设备状态 | 可编辑 | 目的/描述 |
|-------------------------------------------------------------|----------|---------------------|
| _tahoma.X.devices.*.states.core:DeploymentState_ | &#10003; | 提供有关当前部署状态的信息并控制其状态。100 表示完全部署，0 表示未部署。并非所有设备都具有此值，有些设备会显示 `ClosureState`。|
| _tahoma.X.devices.*.states.coreClosureState_ | &#10003; | 提供当前关闭状态信息并控制其状态。100 表示完全关闭，0 表示打开。并非所有设备都具有此值，有些设备会使用 `DeploymentState` 来代替。|
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | 参见`tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | 参见 `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | 参见`tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | 参见 `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | 如果设备 100% 关闭或 0% 部署，则包含 `closed`，否则包含 `open`。|
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | 如果设备 100% 关闭或 0% 部署，则包含“closed”，否则包含“open”。|
| _tahoma.X.devices.*.states.core:PriorityLockTimerState_ | | 如果传感器已锁定设备，则在此处说明，例如风传感器挡住了遮阳篷。|
| _tahoma.X.devices.*.states.core:StatusState_ | | `available` 如果设备当前可用。|
| _tahoma.X.devices.*.states.io:PriorityLockLevelState_ | | 参见`tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | 参见`tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | 参见 `tahoma.X.devices.*.states.core:PriorityLockTimerState` | | _tahoma.X.devices.*.states.moving_ | | 指示设备当前是否正在移动。`0 = stopped`、`1 = up/undeploy`、`2 = down/deploy`、`3 = unknown direction`<br/> **评论：**<br/>此操作仅在连接到 Tahoma（而非本地）API 时可靠，因为本地 API 无法提供足够的动作事件更新来正确计算此状态。不过，`core:MovingState` 在两种情况下都应该有效。 |

## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.tahoma/blob/master/CHANGELOG.md).

<!--
	Placeholder for the next version (add instead of version-number-headline below):
	## __WORK IN PROGRESS__
-->
### 0.11.0 (2025-04-15)
- Feature: Added option to specify IP address for access to local API (https://github.com/Excodibur/ioBroker.tahoma/issues/424)

### 0.10.4 (2024-04-28)
- Fixed: Warning resolved about invalid element in jsonConfig

### 0.10.3 (2024-01-29)
- Fixed: Some crashed caused by event-updates were fixed with a workaround.

### 0.10.2 (2023-03-25)
- Fixed: Improved core:MovingState. Should reflect moving blinds correctly now.

### 0.10.1 (2023-01-23)
- Fixed: Clear bearer token, if connection to local API fails, so new one can be fetched.

### 0.10.0 (2023-01-03)
- Fixed warnings about _Failed getting execution state_ when using the local API.

## License

The MIT License (MIT)

Copyright (c) 2020-2025 Marius Burkard & Excodibur

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