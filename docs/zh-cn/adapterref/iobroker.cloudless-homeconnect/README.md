---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.cloudless-homeconnect.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.cloudless-homeconnect.svg
BADGE-Number of Installations: https://iobroker.live/badges/cloudless-homeconnect-installed.svg
BADGE-GitHub: https://img.shields.io/github/license/eifel-tech/iobroker.cloudless-homeconnect?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/eifel-tech/iobroker.cloudless-homeconnect?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/eifel-tech/iobroker.cloudless-homeconnect?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/eifel-tech/iobroker.cloudless-homeconnect?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/eifel-tech/iobroker.cloudless-homeconnect?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/eifel-tech/iobroker.cloudless-homeconnect/test-and-release.yml?branch=master&logo=github&style=flat-square
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cloudless-homeconnect/README.md
title: ioBroker.cloudless-homeconnect
hash: Jg4oioGeertbryhpacD5b0c/6gfrbrOE4+hHXwH3fsc=
---
![标识](../../../de/admin/cloudless-homeconnect-880x800.png)

# IoBroker.cloudless-homeconnect
适用于无云通信的 Homeconnect 设备的适配器

## 没有云访问的 Homeconnect 适配器
该适配器不需要 Homeconnect (https://api-docs.home-connect.com/) API，该 API 需要设备连接到互联网。在此适配器中，设备的通信和控制在创建一次性配置后在本地进行。因此，设备在 Homeconnect 应用程序中注册后可以完全与互联网分离。为了加载正确的配置，必须有互联网连接。

该适配器的基本思想来自 https://github.com/osresearch/hcpy。此处的 Python 代码已移植到 JavaScript 并适用于 ioBroker。

## 安装前的先决条件
必须至少安装 Node.js **版本 18**。

对于适配器，对比使用官方API<ins>不</ins>ClientID 仅需要 Homeconnect 应用程序中使用的用户名和密码。设备必须通过 Homeconnect 应用程序注册一次。

必须在本地网络中的设备上启用端口 443。

加载配置后可能会出现设备无法寻址的情况。那么本地网络中就没有该设备域的 DNS 条目。除了在网络中进行此设置之外，您还可以在 `host` 的数据点 `info.config` 中输入设备的本地 IP。

＃＃ 配置
必须在适配器配置中输入 Homeconnect 应用程序用户名和密码。

解析的配置保存在数据点`info.config`中。这不应该改变。如果在网络中添加或删除设备，则必须通过 Homeconnect 应用程序注册它们，并且必须删除上述数据点的内容。然后适配器重新启动，连接到配置的帐户并再次读取配置。然后，与设备的通信再次纯粹在本地进行。

如果随着时间的推移出现连接错误，则会尝试与设备建立新的连接。默认情况下，此情况会发生 15 次，但可以针对实例进行设置。如果尝试永远不会中止，即如果您想继续尝试建立连接，则必须设置`0`。

## 数据点
这里描述了最重要的数据点。相应设备知道并使用的 UID 存储在名称中。如果更改的值对于当时的设备来说不可信，则会在调试模式下写入日志条目。例如，如果 `AbortProgram` 发生更改，即使当前没有程序处于活动状态，也会发生这种情况。该结构的构造例如如下：

```
<cloudless-homeconnect.0>
|
└── info
│       └── config
│
└── <Geräte-ID>
│       └── Command
│       |       └── AbortProgram
│       |       └── PauseProgram
│       |       └── ...
│       └── Event
│       |       └── ProgramFinished
│       |       └── CavityTemperatureTooHigh
│       |       └── ...
│       └── Option
│       |       └── ElapsedProgramTime
│       |       └── ProgramProgress
│       |       └── ...
│       └── Program
│       |       └── KeepWarm
|       |       |       └── Start
|       |       |       └── Duration
|       |       |       └── ...
│       |       └── Hot_Air
|       |       |       └── Start
|       |       |       └── Duration
|       |       |       └── ...
│       |       └── ...
│       └── Setting
│       |       └── ChildLock
│       |       └── PowerState
│       |       └── ...
│       └── Status
│       |       └── BackendConnected
│       |       └── CurrentTemperature
│       |       └── ...
|       └── ActiveProgram
|       └── SelectedProgram
```

### 信息连接
如果无法建立与**至少**一个设备的连接，即发生套接字错误，则该数据点将变为`false`。这也会使实例概述中的适配器变为“黄色”。与设备的新连接会自动尝试 15 次，最长等待时间为 5 分钟。然后必须手动重新启动适配器才能再次建立连接。但是，可以在实例设置中更改新连接的数量（请参阅[配置](#configuration)) 无法连接设备的原因以及具体是哪个设备可以在日志中的警告条目中找到。然后，您必须“手动”查看如何解决问题。数据点仅为适配器正在监视的设备设置（请参阅[观察](#observe)）。

### 信息配置
这里配置保存为 JSON。如果需要再次读入，例如因为添加了新设备，则必须删除该内容，并且必要时必须重新启动适配器。

### `ActiveProgram` 和 `SelectedProgram`
数据点包含当前正在运行的程序的 UID 作为值。 `ActiveProgram` 是 `readonly`。

＃＃＃ 观察
使用数据点`observe`，当更改为`false`时，可以排除设备对适配器的监控。例如，在发生错误的情况下，可以设置适配器仅考虑一个设备，并且不与其他设备“交互”。

＃＃＃命令
来自角色 `button` 的数据点在 `Command` 下收集，设备可将其用于远程控制。仅当命令合理时才能预期另一方的反应：仅当程序也处于活动状态时才会执行`AbortProgram`。

＃＃＃ 事件
如果发生诸如“程序完成”之类的特定事件，则触发`Event`文件夹中的相应数据点。

＃＃＃ 选项
影响程序的唯一可读数据点可以在选项下找到。可写选项可以在`Program`文件夹下找到。由于一次只能有一个程序处于活动状态，因此可读选项始终指当前正在运行的程序。

＃＃＃程序
相应的程序可以通过数据点`Start`启动。此外，还读取并传输程序支持的选项。因此，在点击`Start`之前**设置选项非常重要。如果程序正在运行，它将显示在`ActiveProgram`中。

如果在程序已经处于活动状态的情况下启动程序，则活动程序首先会被适配器终止。

＃＃＃ 环境
可以在此处进行设备的常规设置。例如，设置`Light_Cavity_001_Power`可用于打开或关闭烤箱的灯。 `Status` 下的数据点`InteriorIlluminationActive` 只能读取，并且仅显示照明状态。

＃＃＃地位
`Status` 包含设备状态的概述。这些只是可读的。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 1.3.0 (2024-12-02)

-   (eifel-tech) Dependency updates
-   (eifel-tech) common.min is only set if it is also present in the config (Issue #149)
-   (eifel-tech) Password in admin will be stored encrypted natively
    > [!CAUTION]
    > You have to reenter your password in admin config!

### 1.2.10 (2024-11-20)

-   (eifel-tech) Handle missing enums during parsing (Issue #148)

### 1.2.9 (2024-11-14)

-   (eifel-tech) Bugfix while reading program options (Issue #143)

### 1.2.8 (2024-11-05)

-   (eifel-tech) Prevent forbidden signs
-   (eifel-tech) More resolutions considered in instance settings
-   (eifel-tech) Number of connection attempts configurable (Issue #135)

### 1.2.7 (2024-10-24)

-   (eifel-tech) Notes from adapter checker

### 1.2.6 (2024-10-24)

-   (eifel-tech) Added translations

### 1.2.5 (2024-10-23)

-   (eifel-tech) Instance remains yellow when first started (Issue #129)

### 1.2.4 (2024-10-23)

-   (eifel-tech) Prevent message `undefined` from being sent

### 1.2.3

-   (eifel-tech) Added datapoint to indicate whether a socket connection exists

### 1.2.2

-   (eifel-tech) Using a persistent websocket connection

### 1.2.1

-   (eifel-tech) Abort the connection if errors occur in the socket connection to the device

### 1.2.0

-   (eifel-tech) Ability to exclude individual devices from control (Issue #117)
    > [!CAUTION]
    > The configuration had to be expanded for this, so the contents of the `info.config` data point have to be deleted and the adapter has to be restarted. Also delete the `General` object tree.

### 1.1.2

-   (eifel-tech) Washing machine: Program options are sent separately and not including the program to be started

### 1.1.1

-   (eifel-tech) Parsing the configuration simplified

### 1.1.0

-   (eifel-tech) Parsing of configuration for multiple devices revised

### 1.0.4

-   (eifel-tech) Dishwasher support

### 1.0.3

-   (eifel-tech) New socket connection after timeout

### 1.0.2

-   (eifel-tech) If a new program is started, any program that may be running will first be terminated

### 1.0.1

-   (eifel-tech) Increasing security with TLS

### 1.0.0

-   (eifel-tech) initial release

## License

MIT License

Copyright (c) 2024 eifel-tech <hikaso@gmx.net>

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