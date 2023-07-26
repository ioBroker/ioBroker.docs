---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tahoma/README.md
title: ioBroker.tahoma
hash: ol4x0rHy3INAcP+Q6hOW4O02EskWBI7/Af5wKSwTmHE=
---
![标识](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![国家公共管理](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![NPM版本](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![安装数量（最新）](http://iobroker.live/badges/tahoma-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/tahoma-stable.svg)

![Github 发布状态](https://github.com/Excodibur/iobroker.tahoma/workflows/Build%2C%20Test%20and%20Release/badge.svg)

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tahoma/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

# IoBroker.tahoma
适用于 Somfy Tahoma 的 ioBroker 适配器。该项目与尚飞没有任何关系。最初基于来自 https://forum.iobroker.net/post/336001 的脚本，并从 https://github.com/StrathCole/ioBroker.tahoma 分叉。

该适配器连接到 Tahomalink 最终用户 API 并控制设备。通过 Tahoma Box（很可能是 Connexoon）设置。
该适配器的功能尚不完整，但它应该支持大多数用于控制百叶窗和百叶窗等的操作。

如有问题，另请先阅读[常问问题](https://github.com/Excodibur/ioBroker.tahoma/blob/master/FAQ.md)。

## 当前测试的设备
一般来说，这个适配器应该支持所有可以通过__tahomalink.com__访问的设备，但是对于适配器开发者来说很难保证这一点。主要是因为所使用的 Somfy-API 的文档（至少公开地）不存在，并且开发人员只能测试他自己拥有的 Somfy 设备，或者能够在自愿参与者的支持下进行测试。

该适配器通常也支持可通过 tahomalink.com 控制的设备。这包括：

|设备|支持在线API |支持本地API |
|-|-|-|
|塔霍马盒子| ✓ | ✓ |
|联系我们 | ✓ | ✓ ([证明](https://github.com/Excodibur/ioBroker.tahoma/issues/241)) |
|塔霍马开关| ✓ | ✓ |
|连接套件| ✓ ([证明](https://github.com/Excodibur/ioBroker.tahoma/issues/171)) | ✗（[证明](https://service.somfy.com/downloads/fr_v5/fichecomparative_tahoma_switch_vs_kit_connectivite_a4_1221.pdf)) |

以下尚飞设备经验证可与此适配器配合使用：

- S&SO RS100 io
- 奥西莫奥
- 太阳传感器Sunis io
- 温度传感器io
- 烟雾传感器io
- 适配器插头io

＃＃ 配置
适配器支持以下配置参数。

|参数| （默认）值|描述 |
|用户名 | _`<your Tahomalink user>`_ |需要验证您的 Tahoma 帐户。 |
|密码 | _`<Your Tahomalink password>`_ |需要验证您的 Tahoma 帐户。 |
|轮询间隔 | `20000` |适配器尝试从 Tahomalink 获取新数据的时间（以毫秒为单位）。 |
| Tahoma 盒子的 PIN 码 |格式类似于`1234-5678-9012` | __<sup>仅适用于 LocalAPI</sup> __ 尚飞为您的 Tahoma 盒子提供的唯一 PIN 码。有关如何激活/使用它的更多信息[这里](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode) |
|使用 MDNS | `false` | __<sup>仅适用于 LocalAPI</sup> __ 如果设置为 true 将尝试使用 mDNS 来解析 Tahoma-Box 的本地主机名。可能并非所有路由器都支持，因此默认情况下禁用它。 |
|登录尝试<sup>1</sup> <sup>2</sup> | `3` |登录失败后尝试再次登录的次数。 |
|登录尝试之间的延迟<sup>1</sup> <sup>2</sup> | `30` |登录尝试之间等待的时间（以秒为单位）。 |
|登录失败后延迟<sup>1</sup> <sup>2</sup> | `120` |所有连续登录尝试失败后等待的时间（以秒为单位）。 |
| applyqueue 重试之前的延迟<sup>1</sup> <sup>2</sup> | `1500` |在第二次尝试将更改从内部应用队列发送到 Tahoma 之前等待的时间（以毫秒为单位），以防丢失。 |
| applyqueue 重试之前的延迟<sup>1</sup> <sup>2</sup> | `1500` |在第二次尝试将更改从内部应用队列发送到 Tahoma 之前等待的时间（以毫秒为单位），以防丢失。 |

<sup>1</sup>这些配置值仅在 Admin 5（新 GUI）或更高版本中可见和可配置。

<sup>2</sup>所有值都与登录 Tahomalink 相关，从开发的角度来看，它主要是一个黑匣子。如果您在此处配置的数字太低，经验表明尚飞很有可能会暂时锁定您的帐户，因此请小心降低此处的默认值！

＃＃ 状态
### Tahoma.X.位置
该树中的状态包含用户的个人信息，例如城市、街道地址和经度/纬度。

### Tahoma.X.devices.*.deviceURL
此状态包含 Tahoma 用于识别设备的设备 URL。

### Tahoma.X.devices.*.commands
这些状态包含用于控制设备的按钮命令。大多数设备都支持 `close` 和 `open` 等命令，但也支持更多命令。
如果设备支持，某些命令末尾有 `:slow`。使用这些可以实现低速或所谓的静音模式。

### Tahoma.X.devices.*.states
这些状态包含设备的当前状态，如下所示。如果设备支持，某些状态末尾有 `:slow`。设置这些可启用低速或所谓的静音模式。

|设备状态|可编辑|目的/描述|
|-------------------------------------------------------------|----------|---------------------|
| _tahoma.X.devices.*.states.core:部署状态_ | &#10003; |提供有关当前部署状态的信息并控制当前部署的状态。 100 表示完全部署，0 表示未部署。并非所有设备都具有此值，有些设备具有 `ClosureState`。 |
| _tahoma.X.devices.*.states.coreClosureState_ | &#10003; |提供有关当前关闭状态的信息并控制当前关闭的状态。 100表示全闭，0表示打开。并非所有设备都具有此值，有些设备具有 `DeploymentState`。 |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; |请参阅`tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; |请参阅 `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; |请参阅`tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; |请参阅 `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | |如果设备 100% 关闭或 0% 部署，则包含 `closed`，否则包含`open`。 |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | |如果设备 100% 关闭或 0% 部署，则包含“关闭”，否则包含“打开”。 |
| _tahoma.X.devices.*.states.core:PriorityLockTimerState_ | |如果传感器已锁定设备，则会在此处说明，例如。 G。挡住遮阳篷的风传感器。 |
| _tahoma.X.devices.*.states.core:StatusState_ | | `available`（如果设备当前可用）。 |
| _tahoma.X.devices.*.states.io:PriorityLockLevelState_ | |请参阅`tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | |请参阅`tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | |请参阅 `tahoma.X.devices.*.states.core:PriorityLockTimerState` | | _tahoma.X.devices.*.states.moving_ | |说明设备当前是否正在移动。 `0 = stopped`、`1 = up/undeploy`、`2 = down/deploy`、`3 = unknown direction`<br/> **评论：**<br/>仅当连接到 Tahoma（非本地）API 时，此功能才可靠，因为本地 API 不提供足够的操作事件更新来正确计算此状态。不过，`core:MovingState` 在这两种情况下都应该有效。 |

## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.tahoma/blob/master/CHANGELOG.md).

## License

The MIT License (MIT)

Copyright (c) 2020-2023 Marius Burkard & Excodibur

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